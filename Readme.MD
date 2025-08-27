// ──────────────────────────────────────────────────────────────────────────────
// README.md (quick start)
// ──────────────────────────────────────────────────────────────────────────────
# Memorial Splash (Vite)

## Setup
```bash
# 1) Create folder & install
npm create vite@latest memorial-splash-vite -- --template react
cd memorial-splash-vite

# 2) Replace the generated files with the ones in this document
#    (package.json, vite.config.js, index.html, postcss/tailwind configs, src/*)

# 3) Install deps
npm i

# 4) Create your .env files (see below), then run dev
npm run dev
```

## Environment variables
Vite only exposes vars prefixed with `VITE_`. Create a **.env.local** (not committed) based on `.env.example`:

```
# Public config (safe to ship in the client bundle)
VITE_EVENT_ID=memorial-2025-demo
VITE_BRAND_ACCENT=#143427
VITE_GOOGLE_PHOTOS_URL=https://photos.app.goo.gl/your-shared-album-link
VITE_PAMPHLET_PDF_URL=https://your-cdn-or-drive-link/program.pdf

# Supabase (anon key is public by design, enforce security with RLS policies)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_TABLE=messages

# GitHub Pages base path
# If deploying to https://username.github.io/REPO -> '/REPO/'
# If deploying to https://username.github.io -> '/'
VITE_BASE=/YOUR_REPO_NAME/
```

> Note: On GitHub Pages, the build happens locally. Your `.env.local` is read at build time and the values get baked into the static JS bundle.
> Do **not** commit `.env.local`; commit `.env.example` only.

## Tailwind already configured
`tailwind.config.js`, `postcss.config.js`, and `src/index.css` are set up. Classes in `src/App.jsx` will work out of the box.

## Supabase (shared messages)
- Create a Supabase project, run the table + RLS SQL from our chat.
- Put your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`.

## Deploy to GitHub Pages (free)
- `vite.config.js` → set `base: '/YOUR_REPO_NAME/'`.
- Build & deploy:
```bash
npm run deploy
```
- In GitHub → Settings → Pages → choose `gh-pages` branch if needed.