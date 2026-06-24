import type Anthropic from "@anthropic-ai/sdk";

export const ENVIAR_LEAD_TOOL: Anthropic.Tool = {
  name: "enviar_lead",
  description:
    "Registra os dados de contato de um visitante interessado em orçamento, agendamento ou atendimento, enviando-os para a equipe da Imunisinos. Use somente depois de já ter o nome completo, o telefone/WhatsApp e o serviço de interesse (ou motivo do contato) do visitante. Chame esta ferramenta apenas uma vez por conversa.",
  input_schema: {
    type: "object",
    properties: {
      nome: {
        type: "string",
        description: "Nome completo do visitante",
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
          "Serviço de interesse (ex.: Controle de Cupins, Controle Integrado de Pragas (CIP), Controle de Insetos, Controle de Ratos, Sanitização de Ambientes, Higienização de Reservatórios de Água) ou um resumo do motivo do contato, caso não se encaixe em um serviço específico",
      },
      mensagem: {
        type: "string",
        description:
          "Resumo da dúvida, pedido ou contexto adicional relatado pelo visitante durante a conversa",
      },
    },
    required: ["nome", "telefone", "servico_interesse"],
  },
};
