# Imunisinos — Site institucional

Site institucional da Imunisinos, empresa de controle de pragas no Vale dos
Sinos, Vale do Paranhana e Serra Gaúcha. Construído com Next.js 14 (App
Router), TypeScript e Tailwind CSS, com o assistente virtual **Imuni**
integrado via API da Anthropic (Claude).

## Como editar o que a Imuni fala (sem precisar programar)

Tudo que a Imuni sabe, o tom de voz dela e as regras de comportamento estão
em **um único arquivo**: [`lib/imuni-system-prompt.ts`](lib/imuni-system-prompt.ts).
Não existe "treinamento" nem busca em uma base de conhecimento — esse texto
inteiro é enviado para a IA em toda mensagem da conversa, então qualquer
edição nele muda o comportamento da Imuni a partir do próximo deploy.

**Para editar sem instalar nada no computador:**

1. Acesse [github.com/edubolla/imunisinos/blob/main/lib/imuni-system-prompt.ts](https://github.com/edubolla/imunisinos/blob/main/lib/imuni-system-prompt.ts)
2. Clique no ícone de lápis (✏️ **Edit this file**) no canto superior direito
3. Altere o texto: ajuste tom de voz, adicione regras, novas informações,
   o que ela pode/não pode falar — tudo em português, livremente. Na seção
   `OBSERVAÇÕES ADICIONAIS`, no final do arquivo, dá pra só ir acrescentando
   linhas novas sem se preocupar em entender o resto do arquivo
4. Role até o fim da página → escreva uma breve descrição da mudança →
   clique em **Commit changes...** → **Commit changes** (direto na `main`)
5. Em cerca de 1 minuto a Vercel publica a nova versão automaticamente —
   é só testar a Imuni de novo no site

**Único cuidado:** não use o caractere de crase (`` ` ``) nem a sequência `${`
dentro do texto — eles têm significado especial no código e quebram o site.
O próprio arquivo tem um aviso sobre isso no topo. Fora isso, qualquer texto
em português é seguro.

Se preferir, também pode simplesmente me dizer em uma frase o que quer mudar
("quero que ela pare de oferecer desconto", "adiciona que não atendemos
empresas") e eu edito, faço o commit e o deploy para você.

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

Durante a conversa, assim que o visitante informar um telefone/WhatsApp, a
Imuni aciona a ferramenta `enviar_lead` (mesmo que ainda faltem nome ou
serviço). Campos ausentes vão como `"Não informado"`. O POST para
`N8N_LEAD_WEBHOOK_URL` tem o corpo:

```json
{
  "nome": "Maria Silva",
  "telefone": "(51) 99999-9999",
  "servico_interesse": "Controle de Cupins",
  "cidade": "Novo Hamburgo",
  "mensagem": "Notou cupins no madeiramento do telhado",
  "origem": "chat-imuni-site",
  "lead_completo": true,
  "data_hora": "2026-06-24T19:32:00.000Z"
}
```

- `telefone` é o único campo obrigatório para disparar o webhook.
- `nome` e `servico_interesse` vão como `"Não informado"` quando ainda não
  foram coletados.
- `lead_completo` é `true` só quando nome e serviço realmente vieram na
  conversa; `false` indica lead parcial (telefone anotado para não perder
  o contato).
- `cidade` e `mensagem` podem vir como `null`.
- `origem` é sempre `"chat-imuni-site"`.
- O envio parcial acontece no máximo uma vez por conversa (quando o
  telefone aparece). Se depois a Imuni obter nome e serviço, ela pode
  chamar a ferramenta de novo com os dados completos.

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

## Widget no site da cliente (iframe)

O botão flutuante no site da cliente é só a casca (GTM). O lead do n8n
é disparado pelo chat em `https://imunisinos.vercel.app/widget`.

No GTM, a tag do botão pode continuar a antiga. Para o Google Analytics
receber os eventos do chat (que roda no iframe da Vercel), publique também
uma tag Custom HTML com [`public/gtm-imuni-analytics.html`](public/gtm-imuni-analytics.html)
(All Pages). Eventos no `dataLayer`:

- `imuni_start` — primeira mensagem do visitante
- `imuni_lead` — lead enviado ao n8n (pode ser parcial, só com telefone)

No GA4, crie eventos personalizados com esses nomes (ou marque-os como
conversão a partir do dataLayer).

O lead para o n8n dispara quando o visitante informa o telefone, mesmo que
nome ou serviço ainda estejam faltando (`lead_completo: false`).

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
