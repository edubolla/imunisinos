# Handoff — LP Ads Imunisinos

Atualizado em 19/08/2026 (sessão de encerramento das 4 LPs).

## Status

- Quatro páginas prontas: insetos (`index.html`), ratos, cupins, CIP.
- Copy do guia da Imuni (gel/líquido, porta-iscas, madeira vs solo, CIP contínuo).
- GTM `GTM-WVCBR3MV` + Tintim iguais nas quatro. Evento `lp_whatsapp_click` com `lp_servico`.
- Preview Vercel: `X-Robots-Tag: noindex`. Não apontar Ads.

## Regras

- HTML/CSS/JS apenas. Sem Next, sem Imuni chat.
- WhatsApp só pelo Tintim (ver qualquer HTML).
- Não apontar Google Ads para Vercel até estar em `imunisinos.com.br`.

## GitHub destino

https://github.com/edubolla/lpimunisinos.git — **ainda vazio**. Push desta sessão (19/08, agent novo) tomou **403** `cursor[bot]` (token só escreve em `imunisinos`). Precisa push no Mac do Edu:

```bash
cd imunisinos-lp-ads
# se não houver git interno:
git init && git checkout -b main
git remote add origin https://github.com/edubolla/lpimunisinos.git
git add .
git commit -m "LPs estáticas: insetos, ratos, cupins e CIP"
git push -u origin main
```

Contexto Ads completo: no repo da Imuni, `docs/ADS-CONTINUIDADE.md`.
