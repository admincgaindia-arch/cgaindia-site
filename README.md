# cgaindia.com — Canjain Global Advisors

Static site served by GitHub Pages from the root of the `main` branch (custom domain in `CNAME`).
Every file in this repo is publicly reachable at https://cgaindia.com/<path>, so keep only site files here.

- `*.html` — pages (legal: privacy.html, terms.html, refund.html)
- `assets/` — CSS/JS/images, `data/` — JSON feeds updated daily by n8n
- `sitemap.xml`, `robots.txt`, `sw.js`, `manifest.webmanifest`

Deploys go through n8n: CGA Site Publish (pages), CGA Site Rollout (sitewide find/replace), CGA Site Files (add/replace/delete whole files).
