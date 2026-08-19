# Continuidade — Google Ads + LP Imunisinos

Atualizado em **19/08/2026** (sessão que fechou as 4 LPs). Ler isto antes de qualquer tarefa de Ads ou landing.

## Como retomar

1. Abrir o repo `edubolla/imunisinos` (este).
2. A LP está na pasta **`LP/`** (criada neste ambiente). Destino oficial: [github.com/edubolla/lpimunisinos](https://github.com/edubolla/lpimunisinos).
3. `lpimunisinos` ainda está **vazio**. Push no Mac do Edu a partir de `LP/`. Cloud Agents tomam **403** `cursor[bot]` nesse repo — o token só escreve em `imunisinos`.
4. Não criar Cloud Agent no `lpimunisinos` até o `main` ter arquivos, ou então copiar desta pasta.

Push sugerido (no Mac, logado no GitHub do Edu):

```bash
cd LP
git init
git checkout -b main
git remote add origin https://github.com/edubolla/lpimunisinos.git
git add .
git commit -m "LPs estáticas: insetos, ratos, cupins e CIP"
git push -u origin main
```

Na Vercel: projeto **novo** só no `lpimunisinos`, framework Other, sem build. Não mexer no projeto da Imuni.

## GitHub — o que este ambiente conseguiu subir

| Destino | Resultado |
|---|---|
| `edubolla/imunisinos` branch `cursor/ads-lp-encerrar-2433` (PR #2) | **Sim.** Backup da pasta `LP/` está neste repo. |
| `edubolla/lpimunisinos` | **Não.** Repo continua vazio. `git push` retornou **403** (`cursor[bot]` sem write). |

## Conta Google Ads

| Item | Valor |
|---|---|
| Conta | Imunisinos 2024 |
| Customer ID | `704-609-1201` |
| MCC | EduardoMetinger_MKT `109-769-6801` |
| Credenciais API | MCC da agência (outros clientes, ex. `rs-motorsport/.env.local`). **Não** estão neste repo. Este workspace Cloud **não** tem `.env` de Ads. |
| Conversão primária WhatsApp | `[SITE] WhatsApp` (WEBPAGE, CONTACT, include in conversions) |
| GTM do site | `GTM-WVCBR3MV` |
| Tintim WhatsApp | `https://tintim.link/whatsapp/c988d7cb-a3e8-4c49-a6da-d6ad350d64ce/704cd8f7-a902-4cd6-ad47-855e6ae9b5d7` |
| Telefone | (51) 3524-1049 · `tel:+555135241049` |

Campanha ativa: **`em_11_pesquisa_serviços`** (`21868724583`), Search, Maximize Conversions.

## O que já foi feito no Ads (Edu executou no painel)

**P0**

- tCPA recolocado em **R$ 20,00** (tinha sido removido em 14/08 14h37; valor antigo era R$ 40,63 — isso explodiu CPC em 16–17/08, até R$ 150 no dia 17).
- Rede de parceiros de pesquisa **desligada**.
- Orçamento diário **R$ 50** (era R$ 75).

**P1**

- Phrase/exact das geos: combinado (Edu disse OK). Confirmar se salvou: `"dedetização novo hamburgo"`, `"dedetizadora novo hamburgo"`, `"dedetização são leopoldo"`, `"dedetizadora são leopoldo"`, `"dedetização campo bom"`, `"dedetizadora campo bom"` no grupo **Controle de Insetos**.
- Negativas **nível campanha** (Edu confirmou): DIY + how-to **e** concorrentes na campanha principal (vazavam na ampla, CPC alto, ~0 conv). Lista:

```
chumbinho
scorpmax
quanto tempo
como fazer
como eliminar
o que é
demarkus
"de markus"
"br control"
hoffmann
```

Concorrentes **não** são lixo; só não devem ficar na campanha principal. Campanha `[EM] [PESQUISA] Concorrentes` existe, **pausada**; religar depois com tCPA/orçamento próprios (CPA histórico ~R$ 42).

**P1 RSA — NÃO pausar ainda**

- RSA = anúncio responsivo (vários títulos/descrições; o Google combina).
- Força Poor/Excellent = variedade das peças, **não** conversão.
- Grupo Controle de Insetos, jun–ago: RSA **Poor** R$ 561 / 105 cliques / **19 conv** (CPA ~R$ 29,50). RSA Excellent: **0 impressões**.
- Google prioriza histórico. Excellent ativo; Poor só pausa se em ~7 dias o Excellent continuar com 0 impressões.

## Diagnóstico 6 meses (API, até 18/08/2026)

Conversão `[SITE] WhatsApp`:

| Mês | Invest. | Impr. | Cliques | WhatsApp | CPA | CPC |
|---|---:|---:|---:|---:|---:|---:|
| Fev | R$ 673 | 4.826 | 267 | 71 | R$ 9,48 | R$ 2,52 |
| Mar | R$ 2.055 | 7.007 | 419 | 93,5 | R$ 21,98 | R$ 4,91 |
| Abr | R$ 2.798 | 7.991 | 487 | 115,5 | R$ 24,22 | R$ 5,74 |
| Mai | R$ 1.616 | 4.463 | 234 | 54 | R$ 29,93 | R$ 6,91 |
| Jun | R$ 305 | 2.120 | 97 | 19 | R$ 16,04 | R$ 3,14 |
| Jul | R$ 401 | 2.506 | 121 | 19 | R$ 21,09 | R$ 3,31 |
| Ago 1–18 | R$ 458 | 1.748 | 92 | 13 | R$ 35,26 | R$ 4,98 |

CVR **mobile** 29,7% (fev) → 13,4% (ago). Desktop ~30% estável. Keyword que gasta: `serviço de dedetização` **ampla**, QS 6, criativo below average.

LPs atuais dos anúncios: WordPress/Elementor em `imunisinos.com.br/controle-de-insetos-desinsetizacao/` (e rato, cupim, CIP). CTA “Fale conosco”, sem botão flutuante, Tintim funciona, mensagem Tintim tem caracteres invisíveis. **Sem acesso WordPress/DNS/hospedagem** hoje.

## Decisão de produto (LP)

- 4 LPs de Ads, **não** refazer o site. As quatro estão no modelo estático.
- Stack: HTML + CSS + JS estático (Vercel MVP **novo** → depois FTP `imunisinos.com.br/lp/`).
- Repo separado: `edubolla/lpimunisinos`. Não Next.js. Backup neste repo: pasta **`LP/`**.
- Copy: guia da Imuni em `lib/imuni-system-prompt.ts`.
- Marca: verde `#79bb30`, fontes Comfortaa + Assistant.
- WhatsApp: só Tintim. GTM `GTM-WVCBR3MV`. Preview Vercel com `noindex`.

## LPs prontas (19/08/2026)

| Página | Arquivo | Intenção |
|---|---|---|
| Controle de insetos | `LP/insetos/index.html` | Gel vs líquido; barata/formiga/aranha |
| Controle de ratos | `LP/ratos/index.html` | Porta-iscas, 5 dias, assistência 60d |
| Controle de cupins | `LP/cupins/index.html` | Madeira/broca vs solo; rainha |
| CIP | `LP/cip/index.html` | Programa contínuo, relatórios, 24h |

## Próximos passos (ordem)

1. Push `LP/` → `edubolla/lpimunisinos` se o `main` ainda estiver vazio (Cloud Agent toma 403; push no Mac do Edu).
2. Preview: `python3 -m http.server 4173` dentro de `LP/`, ou Vercel **nova** só nesse repo. Validar mobile (CTA fixo, Tintim).
3. Ajustar copy com o Edu se pedir. **Não** apontar Ads para `*.vercel.app`.
4. Só então domínio/FTP `imunisinos.com.br/lp/` (sem DNS hoje).
5. RSA: revisar impressões do Excellent daqui a ~7 dias (`761459846572`). Poor `773077870771` converte — não pausar ainda.
6. Confirmar no painel se as phrase geos de NH / São Leopoldo / Campo Bom foram salvas no grupo Controle de Insetos.
7. WordPress: se um dia houver acesso, botão flutuante + limpar mensagem Tintim nas 4 URLs antigas.

## Arquivos

- LP: pasta `LP/` (`insetos/`, `ratos/`, `cupins/`, `cip/`, `css/`, `js/`, `images/`)
- Regra Cursor: `.cursor/rules/imunisinos-ads-continuidade.mdc`
- Prompt Imuni (copy): `lib/imuni-system-prompt.ts`
- Diagnóstico visual (máquina local anterior): canvas `google-ads-6m-diagnostico.canvas.tsx` no projeto Cursor local do Edu, se ainda existir
