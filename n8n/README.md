# n8n — Leads da Imuni

Fluxo pronto para importar: [`leads-imuni-bot-v2.json`](leads-imuni-bot-v2.json).

A Imuni dispara **dois POSTs** na mesma conversa (`contato` e `comercial`).
A planilha precisa de **uma linha por conversa**, não por POST e não por
telefone.

## Por que não atualizar pelo telefone

Se a chave for o telefone, um retorno daqui a dois meses (outro problema)
sobrescreve a linha antiga. A chave é o `conversa_id`: um UUID gerado no
início de cada chat. Mesma conversa = mesma linha. Conversa nova, mesmo
número = linha nova.

## O que o fluxo faz

| POST | CRM | Planilha |
| --- | --- | --- |
| `etapa: "contato"` | cria o lead | cria a linha (`ID Conversa`) |
| `etapa: "comercial"` | não dispara de novo | atualiza a mesma linha (nome, serviço, resumo) |

## Como aplicar

1. Na aba **Imuni** da planilha, crie as colunas `ID Conversa` e `Etapa`
   (o restante pode ficar como está: Data, Nome, Telefone, Serviço, Cidade,
   Mensagem).
2. No n8n: **Workflows → Import from File** e escolha
   `leads-imuni-bot-v2.json`.
   Se o fluxo já existir, substitua os nós (ou importe por cima) e
   reconecte a credencial do Sheets se pedir.
3. Ative o workflow. O webhook precisa responder **quando o último nó
   terminar** (`responseMode: lastNode`), para o POST comercial só sair
   depois da linha de contato já estar na planilha.

Não use *Update Row* casado só em Telefone.
