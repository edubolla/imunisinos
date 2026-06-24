# Imunisinos — Site institucional

Site institucional da Imunisinos, empresa de controle de pragas no Vale dos
Sinos, Vale do Paranhana e Serra Gaúcha. Construído com Next.js 14 (App
Router), TypeScript e Tailwind CSS, com o assistente virtual **Imuni**
integrado via API da Anthropic (Claude).

## Pré-requisitos

- Node.js 18 ou superior
- Uma conta na [Anthropic](https://console.anthropic.com/) com uma chave de API

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo de exemplo de variáveis de ambiente:

   ```bash
   cp .env.local.example .env.local
   ```

2. Abra o arquivo `.env.local` e preencha as variáveis:

   ```
   ANTHROPIC_API_KEY=sua_chave_aqui
   N8N_LEAD_WEBHOOK_URL=https://n8n.metingertech.com.br/webhook/2f5c275e-e600-4940-9aae-3befd018d255
   ```

   - `ANTHROPIC_API_KEY` é usada pela rota `app/api/chat/route.ts`, que alimenta
     o chatbot **Imuni** (a barra de assistente virtual no topo do site).
   - `N8N_LEAD_WEBHOOK_URL` é o endpoint que recebe os leads coletados pela
     Imuni (nome, telefone, serviço de interesse etc.). Se não for configurada,
     a Imuni continua respondendo normalmente, mas os leads não são enviados
     a lugar nenhum (fica só um aviso no log do servidor).

### Como a Imuni envia os leads (contrato do webhook)

Durante a conversa, quando a Imuni já tiver coletado nome, telefone/WhatsApp e
o serviço de interesse do visitante, ela aciona uma ferramenta interna
(`enviar_lead`, definida em `lib/imuni-tools.ts`) que faz um `POST` para a URL
configurada em `N8N_LEAD_WEBHOOK_URL`, com o corpo:

```json
{
  "nome": "Maria Silva",
  "telefone": "(51) 99999-9999",
  "servico_interesse": "Controle de Cupins",
  "cidade": "Novo Hamburgo",
  "mensagem": "Notou cupins no madeiramento do telhado",
  "origem": "chat-imuni-site",
  "data_hora": "2026-06-24T19:32:00.000Z"
}
```

- `nome`, `telefone` e `servico_interesse` são sempre enviados (são obrigatórios
  para a Imuni acionar a ferramenta).
- `cidade` e `mensagem` podem vir como `null` quando o visitante não informou
  ou quando não foi possível identificar.
- `origem` é sempre a string fixa `"chat-imuni-site"` — útil para diferenciar
  de outras fontes de lead, caso o mesmo webhook receba de mais de um lugar.
- `data_hora` é o timestamp ISO 8601 de quando o servidor enviou o lead.
- A ferramenta é acionada **no máximo uma vez por conversa**.
- O envio é feito uma única vez por requisição (sem retry automático); falhas
  são apenas registradas no log do servidor (Vercel → Logs), sem interromper
  a conversa com o visitante.

## Rodando localmente

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Imagens

Logo, favicon e fotos da Imunisinos já estão em `public/images/` e em uso no
código. Veja [`public/images/README_IMAGENS.md`](public/images/README_IMAGENS.md)
para saber onde cada imagem é usada e como substituí-la. Caso algum arquivo
de imagem seja removido ou renomeado, o site exibe automaticamente um
placeholder estilizado no lugar, sem quebrar o layout.

## Deploy na Vercel

1. Suba o repositório para o GitHub (ou GitLab/Bitbucket).
2. Em [vercel.com](https://vercel.com), clique em **Add New → Project** e
   conecte o repositório.
3. Nas configurações do projeto, vá em **Settings → Environment Variables**
   e adicione:

   | Nome | Valor |
   | --- | --- |
   | `ANTHROPIC_API_KEY` | sua chave da API da Anthropic |
   | `N8N_LEAD_WEBHOOK_URL` | URL do webhook do n8n que recebe os leads coletados pela Imuni |

4. Clique em **Deploy**. A Vercel detecta automaticamente que é um projeto
   Next.js e configura o build (`next build`) e o start sem necessidade de
   configuração adicional.
5. Em atualizações futuras, basta fazer push para a branch principal — a
   Vercel publica automaticamente uma nova versão.

## Estrutura do projeto

```
app/                  Páginas e rotas (App Router)
  api/chat/route.ts    Rota da API do chatbot Imuni
  a-imunisinos/         Página "A Imunisinos"
  servicos/             Página de serviços (lista e detalhe por slug)
components/            Componentes React reutilizáveis
lib/data/               Conteúdo do site (serviços, certificações, depoimentos, equipe)
lib/constants.ts        Contato, redes sociais e links de navegação
lib/imuni-system-prompt.ts  System prompt do assistente virtual Imuni
lib/imuni-tools.ts          Definição da ferramenta enviar_lead (tool use)
lib/send-lead-webhook.ts    Envio do lead coletado para o webhook do n8n
public/images/          Pasta para logo, fotos de serviços e da equipe
```
