import { CONTACT } from "@/lib/constants";
import {
  extractLeadHints,
  formatConversationForLead,
  type ChatRoleMessage,
} from "@/lib/imuni-lead";

const UNKNOWN = "Não informado";

export type LeadEtapa = "contato" | "comercial";

export type LeadPayload = {
  nome: string;
  telefone: string;
  servico_interesse: string;
  cidade?: string;
  mensagem?: string;
};

export type PreparedLead = LeadPayload & {
  lead_completo: boolean;
  conversa: string;
};

export function isLeadPayload(value: unknown): value is LeadPayload {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.telefone !== "string") return false;
  const digits = candidate.telefone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export function hasRealLeadValue(value?: string): boolean {
  const text = value?.trim() ?? "";
  if (!text) return false;
  const normalized = text.toLowerCase();
  return normalized !== "não informado" && normalized !== "nao informado" && normalized !== "n/a";
}

export function normalizeLead(value: LeadPayload): LeadPayload & { lead_completo: boolean } {
  const nome = hasRealLeadValue(value.nome) ? value.nome.trim() : UNKNOWN;
  const servico = hasRealLeadValue(value.servico_interesse)
    ? value.servico_interesse.trim()
    : UNKNOWN;
  const cidade = hasRealLeadValue(value.cidade) ? value.cidade!.trim() : undefined;
  const mensagem = hasRealLeadValue(value.mensagem) ? value.mensagem!.trim() : undefined;

  return {
    nome,
    telefone: value.telefone.trim(),
    servico_interesse: servico,
    cidade,
    mensagem,
    lead_completo: nome !== UNKNOWN && servico !== UNKNOWN,
  };
}

export function prepareLeadForWebhook(lead: LeadPayload, messages: ChatRoleMessage[]): PreparedLead {
  const hints = extractLeadHints(messages);
  const merged = normalizeLead({
    nome: hasRealLeadValue(lead.nome) ? lead.nome : hints.nome ?? "",
    telefone: lead.telefone?.trim() || hints.telefone || "",
    servico_interesse: hasRealLeadValue(lead.servico_interesse)
      ? lead.servico_interesse
      : hints.servico ?? "",
    cidade: lead.cidade,
    mensagem: lead.mensagem,
  });

  return {
    ...merged,
    conversa: formatConversationForLead(messages),
  };
}

export function buildLeadWhatsappUrl(lead: LeadPayload): string {
  const lines = [
    "Olá! Acabei de preencher meus dados no chat da Imuni e gostaria de continuar por aqui.",
    "",
    `Nome: ${lead.nome}`,
    `Telefone: ${lead.telefone}`,
    lead.cidade ? `Cidade: ${lead.cidade}` : null,
    `Serviço de interesse: ${lead.servico_interesse}`,
    lead.mensagem ? `Mensagem: ${lead.mensagem}` : null,
  ].filter((line): line is string => line !== null);

  return CONTACT.whatsappUrlWithMessage(lines.join("\n"));
}

function composeMensagem(resumo: string | undefined, conversa: string): string {
  const parts: string[] = [];
  if (resumo?.trim()) parts.push(resumo.trim());
  if (conversa.trim()) {
    parts.push("--- Conversa com a Imuni ---");
    parts.push(conversa.trim());
  }
  return parts.join("\n\n");
}

export async function sendLeadToWebhook(
  lead: PreparedLead,
  options: { etapa: LeadEtapa },
): Promise<{ ok: boolean; lead_completo: boolean }> {
  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
  const leadCompleto = options.etapa === "comercial" ? lead.lead_completo : false;

  if (!webhookUrl) {
    console.warn("N8N_LEAD_WEBHOOK_URL não configurada — lead não foi enviado:", {
      ...lead,
      etapa: options.etapa,
    });
    return { ok: false, lead_completo: leadCompleto };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: lead.nome,
        telefone: lead.telefone,
        servico_interesse: lead.servico_interesse,
        cidade: lead.cidade ?? null,
        mensagem: composeMensagem(lead.mensagem, lead.conversa),
        conversa: lead.conversa || null,
        origem: "chat-imuni-site",
        lead_completo: leadCompleto,
        etapa: options.etapa,
        data_hora: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error(
        `Webhook do n8n respondeu com status ${response.status} ao enviar lead (${options.etapa}).`,
      );
      return { ok: false, lead_completo: leadCompleto };
    }

    return { ok: true, lead_completo: leadCompleto };
  } catch (error) {
    console.error("Erro ao enviar lead para o webhook do n8n:", error);
    return { ok: false, lead_completo: leadCompleto };
  }
}
