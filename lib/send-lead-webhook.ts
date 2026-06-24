export type LeadPayload = {
  nome: string;
  telefone: string;
  servico_interesse: string;
  cidade?: string;
  mensagem?: string;
};

export async function sendLeadToWebhook(lead: LeadPayload): Promise<{ ok: boolean }> {
  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("N8N_LEAD_WEBHOOK_URL não configurada — lead não foi enviado:", lead);
    return { ok: false };
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
        data_hora: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error(`Webhook do n8n respondeu com status ${response.status} ao enviar lead.`);
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error("Erro ao enviar lead para o webhook do n8n:", error);
    return { ok: false };
  }
}
