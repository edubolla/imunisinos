import type Anthropic from "@anthropic-ai/sdk";

export const ENVIAR_LEAD_TOOL: Anthropic.Tool = {
  name: "enviar_lead",
  description:
    "Registra o lead para a equipe da Imunisinos. Chame assim que houver telefone/WhatsApp, mesmo que ainda faltem nome, cidade ou serviço (use \"Não informado\"). No campo mensagem, escreva um briefing para o comercial ligar com contexto: o que a pessoa precisa, o que foi conversado, recados. Quando depois você tiver nome E serviço, chame de novo obrigatoriamente com os dados completos e um briefing mais rico. Sem esse segundo envio, o comercial só vê nome e telefone e perde a conversa.",
  input_schema: {
    type: "object",
    properties: {
      nome: {
        type: "string",
        description: "Nome completo do visitante. Use \"Não informado\" se ainda não tiver.",
      },
      telefone: {
        type: "string",
        description: "Telefone ou WhatsApp informado pelo visitante, com DDD",
      },
      cidade: {
        type: "string",
        description: "Cidade onde o serviço seria realizado, se o visitante informou",
      },
      servico_interesse: {
        type: "string",
        description:
          "Serviço de interesse (ex.: Controle de Cupins, Controle Integrado de Pragas (CIP), Controle de Insetos, Controle de Ratos, Sanitização de Ambientes, Higienização de Reservatórios de Água) ou um resumo do motivo do contato. Use \"Não informado\" se ainda não tiver.",
      },
      mensagem: {
        type: "string",
        description:
          "Briefing para o comercial ligar: problema ou serviço, o que a pessoa já explicou no chat, cidade se houver, e qualquer recado útil. Não deixe vazio se já houver conversa.",
      },
    },
    required: ["telefone"],
  },
};
