# Landing pages de Ads — Imunisinos

Repositório GitHub: [edubolla/lpimunisinos](https://github.com/edubolla/lpimunisinos).  
**Separado** do site da Imuni (`edubolla/imunisinos` / Vercel atual).  
HTML + CSS + JS estático: sobe nesta Vercel (projeto novo) e, no futuro, copia para `imunisinos.com.br/lp/` por FTP.

Continuidade da sessão Ads: `HANDOFF.md` (neste repo) e `docs/ADS-CONTINUIDADE.md` no repo da Imuni.

## MVP

Uma página-modelo: **Controle de insetos** (`index.html`).

- Mobile first, CTA WhatsApp fixo no celular
- Copy baseada no guia da Imuni (gel vs líquido, isolamento, assistência, certificações)
- Fotos reais da Imunisinos (logo, equipe, aplicação)
- WhatsApp pelo **Tintim** (não usar `wa.me` direto — quebra a conversão do Google Ads)
- GTM `GTM-WVCBR3MV`

## Como ver localmente

Abra `index.html` no navegador ou, na pasta:

```bash
python3 -m http.server 4173
```

## Como publicar na Vercel (MVP)

1. Importe **este** repositório (não o da Imuni)
2. Framework: **Other** (estático)
3. Sem comando de build; pasta raiz

## Como duplicar para rato / cupim / CIP

1. Copie `index.html` para `ratos.html` (etc.)
2. Troque H1, métodos, FAQ e fotos
3. Mantenha o mesmo link Tintim, GTM, telefone e CSS

## Não fazer neste repo

- Não colocar o chat da Imuni
- Não apontar anúncio para cá até validar o layout (domínio `vercel.app` piora qualidade da landing no Google)
