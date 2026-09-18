import { CONTACT } from "@/lib/constants";
import type { LeadCanal } from "@/lib/imuni-lead";

export type LeadPayload = {
  nome: string;
  telefone: string;
  servico_interesse: string;
  cidade?: string;
  mensagem?: string;
};

export type LeadContext = {
  canal?: LeadCanal;
  pagina?: string | null;
};

export type WebhookSendResult = {
  ok: boolean;
  status?: number;
  error?: string;
};

const WEBHOOK_TIMEOUT_MS = 8000;

export function isLeadPayload(value: unknown): value is LeadPayload {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;

  if (
    typeof candidate.nome !== "string" ||
    typeof candidate.telefone !== "string" ||
    typeof candidate.servico_interesse !== "string"
  ) {
    return false;
  }

  if (!candidate.nome.trim() || !candidate.servico_interesse.trim()) return false;

  const digits = candidate.telefone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
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
  context: LeadContext = {},
): Promise<WebhookSendResult> {
  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("N8N_LEAD_WEBHOOK_URL não configurada — lead não foi enviado:", {
      canal: context.canal ?? "site",
      pagina: context.pagina ?? null,
    });
    return { ok: false, error: "N8N_LEAD_WEBHOOK_URL não configurada" };
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
        mensagem: lead.mensagem ?? null,
        origem: "chat-imuni-site",
        canal: context.canal ?? "site",
        pagina: context.pagina ?? null,
        data_hora: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error(
        `Webhook do n8n respondeu com status ${response.status} ao enviar lead.`,
        {
          canal: context.canal ?? "site",
          pagina: context.pagina ?? null,
          body: body.slice(0, 300),
        },
      );
      return { ok: false, status: response.status, error: `HTTP ${response.status}` };
    }

    console.info("Lead enviado ao n8n com sucesso.", {
      canal: context.canal ?? "site",
      pagina: context.pagina ?? null,
      status: response.status,
    });
    return { ok: true, status: response.status };
  } catch (error) {
    console.error("Erro ao enviar lead para o webhook do n8n:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "erro desconhecido",
    };
  }
}
