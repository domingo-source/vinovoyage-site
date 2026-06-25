# VinoVoyage — Landing Site (v1)

A single-page, modern/minimal landing site. Static files, no build step.

## Files
- `index.html` — the page (structure + copy)
- `styles.css` — all styling. Edit the variables at the top to re-skin (colors, fonts, spacing).
- `script.js` — form handling, smooth scroll, scroll animations
- `README.md` — this file

## Preview locally
Just open `index.html` in any browser. (Fonts and the favicon load from the web, so keep an internet connection for the full look.)

## Edit the copy
All text lives in `index.html` — search for the section you want (Hero, Mission, Platform, etc.) and edit in place. This is first-pass copy; replace with your final mission statement and value props.

## Change the look
Open `styles.css` and edit the `:root` variables at the top:
- `--accent` / `--accent-ink` — the wine accent color
- `--font-display` / `--font-body` — typefaces
- `--bg`, `--ink`, `--muted` — background and text colors

## Turn on email collection
By default the waitlist form runs in demo mode (validates and confirms, but stores nothing).
To actually collect emails:
1. Create a free form endpoint at Formspree, Web3Forms, or Basin.
2. In `script.js`, set `FORM_ENDPOINT` to the URL they give you.
That's it — submissions will be sent there.

(If you deploy on Netlify, you can alternatively use Netlify Forms by adding `netlify` to the `<form>` tag — ask and I'll wire it up.)

## Deploy (free + HTTPS)
Pick one:

**Netlify (easiest):** go to app.netlify.com → "Add new site" → "Deploy manually" → drag this folder in. Live in ~30s. To use your domain, Site settings → Domain management → add `vinovoyage.ai` and follow the DNS steps.

**Vercel:** vercel.com → New Project → import the folder (or `vercel` CLI). Add your domain under Settings → Domains.

**GitHub Pages:** push this folder to a repo → Settings → Pages → deploy from the main branch root.

**Cloudflare Pages:** dash.cloudflare.com → Pages → upload the folder.

### Pointing vinovoyage.ai at the site
After deploying, the host gives you DNS records (an `A`/`ALIAS` record or a `CNAME`). Add them at your domain registrar. HTTPS is issued automatically. I can give you exact records once you pick a host.
