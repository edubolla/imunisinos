export type ChatRoleMessage = {
  role: "user" | "assistant";
  content: string;
};

const CONVERSA_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function createConversaId(): string {
  return crypto.randomUUID();
}

export function resolveConversaId(value: unknown): string {
  if (typeof value === "string" && CONVERSA_ID_RE.test(value.trim())) {
    return value.trim();
  }
  return createConversaId();
}

const PHONE_RE = /\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}/;
const NAME_RE = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'.\s-]{0,60}$/;
const GENERIC_REPLY_RE =
  /^(sim|não|nao|ok|obrigad[oa]|quero|oi|ol[aá]|bom dia|boa tarde|boa noite|tudo bem|por favor|valeu|certo|isso|pode ser)$/i;
const NOT_A_NAME_RE =
  /\b(quero|solicitar|orçamento|orcamento|interesse|serviço|servico|controle|tenho|preciso|gostaria|dúvida|duvida|problema|cupim|rato|inseto|barata|formiga|cidade|whatsapp|telefone|ligar)\b/i;
const CONVERSA_MAX_CHARS = 8000;

const SERVICE_HINTS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /cupins?|descupin/i, label: "Controle de Cupins" },
  { pattern: /ratos?|roedores?|desrat/i, label: "Controle de Ratos" },
  { pattern: /\bcip\b|controle integrado/i, label: "Controle Integrado de Pragas (CIP)" },
  { pattern: /sanitiza|mofo|fungos?/i, label: "Sanitização de Ambientes" },
  { pattern: /caixa.?d.?[aá]gua|reservat[oó]rios?/i, label: "Higienização de Reservatórios de Água" },
  {
    pattern: /fossa|desentup|ar[- ]condicionado/i,
    label: "Limpeza de fossa, desentupimento e limpeza de ar-condicionado",
  },
  { pattern: /bebedouros?/i, label: "Limpeza de bebedouros" },
  { pattern: /morcegos?|pombos?/i, label: "Inibição de morcegos e pombos" },
  {
    pattern: /baratas?|formigas?|aranhas?|tra[cç]as?|insetos?|desinset|dedetiza|pragas?/i,
    label: "Controle de Insetos",
  },
];

export function conversationHasPhone(messages: ChatRoleMessage[]): boolean {
  return messages.some((message) => message.role === "user" && PHONE_RE.test(message.content));
}

export function countUserMessages(messages: ChatRoleMessage[]): number {
  return messages.filter((message) => message.role === "user").length;
}

export function extractPhone(messages: ChatRoleMessage[]): string | null {
  for (const message of messages) {
    if (message.role !== "user") continue;
    const match = message.content.match(PHONE_RE);
    if (!match) continue;
    const digits = match[0].replace(/\D/g, "");
    if (digits.length >= 10 && digits.length <= 13) return match[0].trim();
  }
  return null;
}

export function conversationHasService(messages: ChatRoleMessage[]): boolean {
  return messages.some((message) => SERVICE_HINTS.some((hint) => hint.pattern.test(message.content)));
}

export function conversationHasLikelyName(messages: ChatRoleMessage[]): boolean {
  return messages.some((message) => message.role === "user" && isLikelyPersonName(message.content));
}

export function extractCityFromConversation(messages: ChatRoleMessage[]): string | undefined {
  for (let i = 1; i < messages.length; i += 1) {
    const previous = messages[i - 1];
    const current = messages[i];
    if (previous.role !== "assistant" || current.role !== "user") continue;
    if (!assistantAskedForCity(previous.content)) continue;
    const text = current.content.trim();
    if (isLikelyCityName(text)) return text;
  }
  return undefined;
}

export function conversationHasCity(messages: ChatRoleMessage[]): boolean {
  return Boolean(extractCityFromConversation(messages));
}

export function userJustProvidedCity(messages: ChatRoleMessage[]): boolean {
  if (messages.length < 2) return false;
  const last = messages[messages.length - 1];
  const previous = messages[messages.length - 2];
  if (last.role !== "user" || previous.role !== "assistant") return false;
  return assistantAskedForCity(previous.content) && isLikelyCityName(last.content);
}

export function conversationReadyForCompleteLead(messages: ChatRoleMessage[]): boolean {
  return (
    conversationHasPhone(messages) &&
    conversationHasService(messages) &&
    conversationHasLikelyName(messages) &&
    conversationHasCity(messages)
  );
}

export function shouldForceLeadTool(options: {
  hasPhone: boolean;
  leadEnviado: boolean;
  leadCompleto: boolean;
  readyForComercial: boolean;
  userJustProvidedCity?: boolean;
}): boolean {
  if (!options.hasPhone) return false;
  if (!options.leadEnviado) return true;
  if (options.userJustProvidedCity) return true;
  return !options.leadCompleto && options.readyForComercial;
}

export function extractLeadHints(messages: ChatRoleMessage[]): {
  nome?: string;
  telefone?: string;
  servico?: string;
  cidade?: string;
} {
  const telefone = extractPhone(messages) ?? undefined;
  let nome: string | undefined;
  let servico: string | undefined;
  let previousAssistant = "";

  for (const message of messages) {
    if (message.role === "assistant") {
      previousAssistant = message.content;
      continue;
    }
    if (!servico) {
      const hint = SERVICE_HINTS.find((item) => item.pattern.test(message.content));
      if (hint) servico = hint.label;
    }
    if (
      !nome &&
      message.role === "user" &&
      isLikelyPersonName(message.content) &&
      !assistantAskedForCity(previousAssistant)
    ) {
      nome = message.content.trim();
    }
  }

  return { nome, telefone, servico, cidade: extractCityFromConversation(messages) };
}

export function formatConversationForLead(messages: ChatRoleMessage[]): string {
  const lines = messages
    .filter((message) => message.content.trim())
    .map((message) => {
      const speaker = message.role === "user" ? "Visitante" : "Imuni";
      return `${speaker}: ${message.content.trim()}`;
    });

  const text = lines.join("\n");
  if (text.length <= CONVERSA_MAX_CHARS) return text;
  return `${text.slice(0, CONVERSA_MAX_CHARS)}\n[conversa truncada]`;
}

function isLikelyPersonName(value: string): boolean {
  const text = value.trim();
  if (!NAME_RE.test(text) || GENERIC_REPLY_RE.test(text) || NOT_A_NAME_RE.test(text)) return false;
  if (PHONE_RE.test(text)) return false;
  const words = text.split(/\s+/);
  return words.length >= 1 && words.length <= 6;
}

function assistantAskedForCity(content: string): boolean {
  return /\bcidade\b/i.test(content);
}

function isLikelyCityName(value: string): boolean {
  const text = value.trim();
  if (text.length < 2 || text.length > 60) return false;
  if (PHONE_RE.test(text) || GENERIC_REPLY_RE.test(text)) return false;
  if (SERVICE_HINTS.some((hint) => hint.pattern.test(text))) return false;
  return /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'.\s-]{1,59}$/.test(text);
}
