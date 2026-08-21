# Landing pages de Ads — Imunisinos

Pasta **`LP/`** neste ambiente (repo `edubolla/imunisinos`, só backup).  
Destino oficial no GitHub: [edubolla/lpimunisinos](https://github.com/edubolla/lpimunisinos) (`main` já publicado).  
Backup neste repo: pasta `LP/`.  
Para o Cursor commitar e a Vercel publicar: abrir o projeto **`lpimunisinos`**, não o da Imuni.

HTML + CSS + JS estático. Vercel **nova** (não a da Imuni). Depois: FTP `imunisinos.com.br/lp/`.

## Estrutura

```
LP/
  index.html          → redireciona para /insetos/
  insetos/index.html  Controle de insetos
  ratos/index.html    Controle de ratos
  cupins/index.html   Controle de cupins
  cip/index.html      Controle Integrado de Pragas
  css/lp.css
  js/lp.js
  images/
    marca/            logo, favicon
    equipe/           Alan, Renata
    insetos/          hero, aplicação, barata, formiga
    ratos/            hero, rato, estação
    cupins/
    cip/              hero, campo
    campo/            foto de equipe em campo
```

Todas usam o mesmo Tintim, GTM `GTM-WVCBR3MV`, telefone `(51) 3524-1049`. Copy do guia da Imuni.

- Mobile first, CTA WhatsApp fixo no celular
- WhatsApp só pelo **Tintim** (não usar `wa.me`)
- Preview Vercel: `X-Robots-Tag: noindex`

## Como ver localmente

Na pasta `LP/`:

```bash
python3 -m http.server 4173
```

- http://127.0.0.1:4173/ → insetos  
- http://127.0.0.1:4173/ratos/  
- http://127.0.0.1:4173/cupins/  
- http://127.0.0.1:4173/cip/

## Não fazer

- Não colocar o chat da Imuni
- Não trocar Tintim por `wa.me`
- Não apontar anúncio até a LP estar em `imunisinos.com.br`
