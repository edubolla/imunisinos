# Handoff — LP Ads Imunisinos

Atualizado em 19/08/2026.

## Onde está

Pasta **`LP/`** na raiz deste ambiente (`/workspace/LP` no Cloud Agent; no repo `edubolla/imunisinos`).

```
LP/insetos/   LP/ratos/   LP/cupins/   LP/cip/
LP/css/       LP/js/      LP/images/{marca,equipe,insetos,ratos,cupins,cip,campo}
```

## GitHub

| Destino | Status |
|---|---|
| `edubolla/imunisinos` branch `cursor/ads-lp-encerrar-2433` | **Sim** — arquivos da LP vão neste PR (backup) |
| `edubolla/lpimunisinos` | **Não** — repo vazio. Push 403 `cursor[bot]` |

Push no Mac do Edu, a partir desta pasta:

```bash
cd LP
git init
git checkout -b main
git remote add origin https://github.com/edubolla/lpimunisinos.git
git add .
git commit -m "LPs estáticas: insetos, ratos, cupins e CIP"
git push -u origin main
```

## Regras

- HTML/CSS/JS. Sem Next, sem Imuni chat.
- WhatsApp só Tintim.
- Não apontar Google Ads para Vercel.

Contexto Ads: `docs/ADS-CONTINUIDADE.md`.
