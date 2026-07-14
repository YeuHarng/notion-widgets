# notion-widgets

Small static HTML/JS widgets meant to be embedded into Notion pages via `/embed`, served through GitHub Pages.

Base URL: **https://yeuharng.github.io/notion-widgets/**

## Current widgets

| Widget | Live URL | Description |
|---|---|---|
| `vault/` | https://yeuharng.github.io/notion-widgets/vault/ | Account/password manager. Data lives in the visiting browser's `localStorage`; optional cross-device sync stores an AES-256-GCM-encrypted copy in a private GitHub Gist (set up via the Sync button — paste a GitHub token with only the `gist` scope on the first device, then the generated sync code on the others). Locally the data is unencrypted — anyone using the same device can see it. Nothing is ever stored in this repo. Supports isolated spaces via `?space=<name>` (e.g. `vault/?space=work`) — each space has its own data and its own sync. |

| `offwork/` | https://yeuharng.github.io/notion-widgets/offwork/ | Off-work countdown (打工人下班倒计时). Counts down to 6 pm with a workday progress bar and rotating jokes; celebrates after hours, mocks you on weekends. Configurable via `?start=9&end=18`. Stateless — no data stored. |
| `payday/` | https://yeuharng.github.io/notion-widgets/payday/ | Payday countdown. Counts down to the 27th of each month (configurable via `?day=27`), CSS/emoji money-counting mascot that changes mood by how close payday is, confetti + flying cash on payday itself. Zero external requests (system fonts, no image assets). Stateless. |

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
