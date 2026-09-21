import type Anthropic from "@anthropic-ai/sdk";

export const ENVIAR_LEAD_TOOL: Anthropic.Tool = {
  name: "enviar_lead",
  description:
    "Registra o lead para a equipe da Imunisinos. Chame assim que houver telefone/WhatsApp, mesmo que ainda faltem nome, cidade ou serviço (use \"Não informado\"). No campo mensagem, escreva um resumo curto da solicitação (1 a 3 frases). Nunca cole o diálogo. Quando tiver nome, serviço E cidade, chame de novo com os dados completos — esse segundo envio é o lead completo.",
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
          "Resumo curto da solicitação, em 1 a 3 frases, para o comercial. Ex.: \"Notou cupins no madeiramento do telhado em Campo Bom.\" Nunca cole o diálogo (linhas Visitante/Imuni).",
      },
    },
    required: ["telefone"],
  },
};
