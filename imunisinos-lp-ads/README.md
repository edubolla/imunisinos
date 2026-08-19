# Landing pages de Ads — Imunisinos

Repositório GitHub: [edubolla/lpimunisinos](https://github.com/edubolla/lpimunisinos).  
**Separado** do site da Imuni (`edubolla/imunisinos` / Vercel atual).  
HTML + CSS + JS estático: sobe nesta Vercel (projeto **novo**) e, no futuro, copia para `imunisinos.com.br/lp/` por FTP.

Continuidade Ads: `HANDOFF.md` (neste repo) e `docs/ADS-CONTINUIDADE.md` no repo da Imuni.

## Páginas

| Arquivo | Serviço | URL limpa (Vercel) | Rewrite do slug WordPress |
| --- | --- | --- | --- |
| `index.html` | Controle de insetos | `/` | `/controle-de-insetos-desinsetizacao` |
| `ratos.html` | Controle de ratos | `/ratos` | `/controle-de-ratos-desratizacao` |
| `cupins.html` | Controle de cupins | `/cupins` | `/controle-de-cupins-descupinizacao` |
| `cip.html` | Controle Integrado de Pragas | `/cip` | `/controle-integrado-de-pragas-cip` |

Todas usam o mesmo Tintim, GTM `GTM-WVCBR3MV`, telefone `(51) 3524-1049` e CSS. Copy baseada no guia da Imuni (`lib/imuni-system-prompt.ts` no repo da Imuni).

- Mobile first, CTA WhatsApp fixo no celular
- WhatsApp só pelo **Tintim** (não usar `wa.me` — quebra a conversão `[SITE] WhatsApp`)
- Preview na Vercel leva `X-Robots-Tag: noindex` (não indexar `*.vercel.app`)

## Como ver localmente

Na pasta:

```bash
python3 -m http.server 4173
```

Abra http://127.0.0.1:4173/ — insetos, `/ratos.html`, `/cupins.html`, `/cip.html`.

## Como publicar na Vercel (MVP visual)

1. Importe **este** repositório (`lpimunisinos`), não o da Imuni
2. Framework: **Other** (estático)
3. Sem comando de build; pasta raiz
4. **Não** apontar Google Ads para `*.vercel.app`

## Não fazer neste repo

- Não colocar o chat da Imuni
- Não trocar Tintim por `wa.me`
- Não apontar anúncio até a LP estar em `imunisinos.com.br` (DNS/FTP ainda sem acesso)
