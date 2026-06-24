# Imagens do site

Esta pasta guarda as imagens reais da Imunisinos usadas no site. As imagens
abaixo já foram adicionadas e estão em uso no código — esta página serve como
referência de onde cada uma é usada e como adicionar ou substituir imagens no
futuro.

Sempre que uma imagem referenciada no código estiver ausente, o site exibe
automaticamente um placeholder estilizado (com as cores da marca) no lugar —
ou seja, nada quebra visualmente caso um arquivo seja removido ou renomeado
por engano.

## logo/

| Arquivo | Onde é usado |
| --- | --- |
| `logo_imunisinos.webp` | Cabeçalho (header) e rodapé (footer) — ver `components/Header.tsx` e `components/Footer.tsx` |
| `favicon_imunisinos.webp` | Origem do ícone do site. O ícone publicado fica em `app/icon.png` (convenção de favicon do Next.js App Router) — para atualizar, gere um novo PNG a partir do logo e substitua `app/icon.png` |

## servicos/

Imagens usadas nas páginas de serviços (`lib/data/services.ts`, campo `image`
de cada serviço) e na seção de destaque (hero) da home (`components/sections/Hero.tsx`):

| Arquivo | Usado em |
| --- | --- |
| `controle_integrado_de_pragas_01.jpg` | Controle Integrado de Pragas (CIP) |
| `como-acabar-com-os-cupins.jpg` | Controle de Cupins |
| `dedetizacao_01.jpg` | Sanitização de Ambientes |
| `limpeza_agua_2.png` | Higienização de Reservatórios de Água |
| `dedetizacao_02.jpg` | Controle de Insetos |
| `controle_de_ratos_01.webp` | Controle de Ratos |
| `dedetizacao_04.webp` | Hero da página inicial |
| `controle_integrado_de_pragas_02.jpg` | Página "A Imunisinos" |

Arquivos adicionais já enviados e ainda não usados em nenhuma página (ficam
disponíveis para uso futuro — ex: trocar a imagem de algum serviço):
`barata_01.jpeg`, `formigas_01.jpeg`, `controle_de_ratos_02.webp`,
`controle_de_ratos_03.jpg`, `ratos_03.jpg`, `limpeza-agua1-1.webp`.

## equipe/

Fotos da equipe usadas na página "A Imunisinos" (`lib/data/team.ts`):

| Arquivo | Quem é |
| --- | --- |
| `alan-de-sa.webp` | Alan de Sá, sócio-gestor |
| `renata-de-sa.webp` | Renata de Sá, sócia-gestora |

---

## Como substituir uma imagem

Basta sobrescrever o arquivo com o mesmo nome na pasta correspondente — não é
necessário alterar nenhum código. Para usar um arquivo com nome diferente,
atualize o caminho correspondente em:

- `lib/data/services.ts` (campo `image` de cada serviço)
- `lib/data/team.ts` (campo `image` de cada integrante)
- `components/Header.tsx` e `components/Footer.tsx` (logo)
- `components/sections/Hero.tsx` (imagem de destaque da home)
- `app/a-imunisinos/page.tsx` (imagem da página institucional)
- `app/icon.png` (favicon — substitua o arquivo diretamente)
