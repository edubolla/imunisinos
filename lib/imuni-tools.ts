import type Anthropic from "@anthropic-ai/sdk";

export const ENVIAR_LEAD_TOOL: Anthropic.Tool = {
  name: "enviar_lead",
  description:
    "Registra os dados de contato de um visitante para a equipe da Imunisinos. Chame assim que o visitante informar um telefone/WhatsApp, mesmo que ainda faltem nome, cidade ou serviço. Se algum campo não tiver sido informado, use \"Não informado\". Chame de novo só se, depois de um envio parcial, você conseguir nome e serviço que ainda não tinha.",
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
          "Resumo da dúvida, pedido ou contexto adicional relatado pelo visitante durante a conversa",
      },
    },
    required: ["telefone"],
  },
};
