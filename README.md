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

2. Abra o arquivo `.env.local` e preencha a chave da API da Anthropic:

   ```
   ANTHROPIC_API_KEY=sua_chave_aqui
   ```

   A chave é usada pela rota `app/api/chat/route.ts`, que alimenta o chatbot
   **Imuni** (a barra de assistente virtual no topo do site).

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
public/images/          Pasta para logo, fotos de serviços e da equipe
```
