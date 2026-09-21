import { CONTACT } from "@/lib/constants";

const UNKNOWN = "Não informado";

export type LeadPayload = {
  nome: string;
  telefone: string;
  servico_interesse: string;
  cidade?: string;
  mensagem?: string;
};

export function isLeadPayload(value: unknown): value is LeadPayload {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.telefone !== "string") return false;
  const digits = candidate.telefone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export function normalizeLead(value: LeadPayload): LeadPayload & { lead_completo: boolean } {
  const nome = value.nome?.trim() ? value.nome.trim() : UNKNOWN;
  const servico = value.servico_interesse?.trim() ? value.servico_interesse.trim() : UNKNOWN;
  const cidade = value.cidade?.trim() ? value.cidade.trim() : undefined;
  const mensagem = value.mensagem?.trim() ? value.mensagem.trim() : undefined;

  return {
    nome,
    telefone: value.telefone.trim(),
    servico_interesse: servico,
    cidade,
    mensagem,
    lead_completo: nome !== UNKNOWN && servico !== UNKNOWN,
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

export async function sendLeadToWebhook(
  lead: LeadPayload,
): Promise<{ ok: boolean; lead_completo: boolean }> {
  const normalized = normalizeLead(lead);
  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("N8N_LEAD_WEBHOOK_URL não configurada — lead não foi enviado:", normalized);
    return { ok: false, lead_completo: normalized.lead_completo };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: normalized.nome,
        telefone: normalized.telefone,
        servico_interesse: normalized.servico_interesse,
        cidade: normalized.cidade ?? null,
        mensagem: normalized.mensagem ?? null,
        origem: "chat-imuni-site",
        lead_completo: normalized.lead_completo,
        data_hora: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error(`Webhook do n8n respondeu com status ${response.status} ao enviar lead.`);
      return { ok: false, lead_completo: normalized.lead_completo };
    }

    return { ok: true, lead_completo: normalized.lead_completo };
  } catch (error) {
    console.error("Erro ao enviar lead para o webhook do n8n:", error);
    return { ok: false, lead_completo: normalized.lead_completo };
  }
}
