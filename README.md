# notion-widgets

Small static HTML/JS widgets meant to be embedded into Notion pages via `/embed`, served through GitHub Pages.

Base URL: **https://yeuharng.github.io/notion-widgets/**

## Current widgets

| Widget | Live URL | Description |
|---|---|---|
| `vault/` | https://yeuharng.github.io/notion-widgets/vault/ | Encrypted account/password vault. All data stays in the visiting browser's `localStorage`, encrypted with the Web Crypto API — nothing ever touches this repo or any server. |

## How to add a new widget

1. Create a new subfolder with its own `index.html`:

   ```
   notion-widgets/
   ├── vault/
   │   └── index.html
   └── my-new-widget/
       └── index.html
   ```

2. Commit and push to `main`.
3. GitHub Pages picks it up automatically (allow a minute or two for the build) at:

   ```
   https://yeuharng.github.io/notion-widgets/<folder-name>/
   ```

4. In Notion, type `/embed` and paste that URL.

## ⚠️ This repo is public

Never commit anything sensitive here — no API keys, real passwords, tokens, or personal config. Widgets must be purely static (HTML/CSS/JS, no backend, no database). Anything that needs credentials belongs in a private repo.
