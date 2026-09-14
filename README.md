# cgaindia.com — Canjain Global Advisors

Static website. No build step needed to deploy — the `docs/` folder is the finished
site and can be pushed to GitHub as-is.

```
docs/                  ← this is the website. Publish this folder.
  index.html           home
  services.html        full service register (all 6 practice areas)
  itr-filing.html      … 12 service pages
  about.html  team.html
  privacy.html  terms.html  refund.html
  404.html
  sitemap.xml  robots.txt  CNAME  .nojekyll
  assets/css/site.css
  assets/js/site.js
  assets/img/

build.py               regenerates docs/ from content.py (optional)
content.py             all site copy, prices-free, in one file
gen_assets.py          regenerates the logo tile and social-share image
assets/                source css + js (copied into docs/ on build)
```

---

## 1. Put it on GitHub

```bash
cd cga-site
git init
git add .
git commit -m "CGA website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 2. Turn on GitHub Pages

Repo → **Settings** → **Pages**

- Source: **Deploy from a branch**
- Branch: **main**, folder: **/docs**
- Save.

The site is live in a minute or two at
`https://<your-username>.github.io/<repo-name>/`

## 3. Point cgaindia.com at it

`docs/CNAME` already contains `cgaindia.com`, so GitHub will claim the domain.
On your DNS (GoDaddy):

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | `<your-username>.github.io` |

Then Settings → Pages → Custom domain → `cgaindia.com` → tick **Enforce HTTPS**.

> If you are **not** using cgaindia.com on this repo, delete `docs/CNAME`
> before pushing, or GitHub will try to serve the repo at that domain.

---

## 4. Add the real photographs

The site is built to look correct with no photographs at all — any missing image
is removed automatically and a fallback (initials, or a navy panel) is shown
instead. To use the real ones, drop these files into `docs/assets/img/` with
**exactly these names**:

| File | Used on |
|---|---|
| `cga-logo.jpeg` | header and footer on every page *(a placeholder is included — replace it)* |
| `og-cover.png` | WhatsApp / Facebook / LinkedIn share preview, 1200×630 *(placeholder included)* |
| `neeraj-advocate.jpg` | founder section on home and about |
| `neeraj-sq.jpg` | "Reviewed by" box on every service page (square) |
| `office-01.jpg`, `office-02.jpg`, `neeraj-office.jpg`, `neeraj-desk.jpg` | office strip on the home page |
| `neeraj.jpg`, `naveen-kumar.jpg`, `krishan-kumar.jpg`, `suresh-kumar.jpg`, `shrey-jain.jpg`, `pankaj.jpg`, `ranjay.jpg`, `ravi.jpg`, `hemant-sharma.jpg`, `sanjay-kumar.jpg`, `deepak.jpg`, `shubham.jpg`, `anurag.jpg`, `ankit.jpg`, `ritu.jpg`, `kafi.jpg`, `rahul.jpg`, `sushil.jpg`, `suman.jpg` | team page |

Keep team photos square and roughly 600×600. Anyone without a photo falls back
to their initial, which is why the team page never looks broken.

---

## 5. Capture your leads

GitHub Pages cannot run server code, so the enquiry form opens WhatsApp or email.
To also record every enquiry automatically, open `docs/assets/js/site.js`, find
the first line and paste your n8n webhook URL:

```js
var LEAD_WEBHOOK = "https://cga.app.n8n.cloud/webhook/site-enquiry";
```

Every submission then POSTs this JSON before the WhatsApp window opens:

```json
{"name":"","mobile":"","email":"","city":"","service":"","message":"","page":"","at":""}
```

Point that webhook at a Google Sheet and a WhatsApp alert and no enquiry is lost
if nobody checks the phone.

---

## 6. Editing the site later

**Small text change:** edit the HTML file in `docs/` directly and push. Done.

**Anything that repeats across pages** (phone number, a nav link, the footer, a
new service page) — edit `content.py` or `build.py` and run:

```bash
python3 build.py
python3 gen_assets.py    # only if you want the placeholder images regenerated
```

`build.py` rewrites the whole `docs/` folder. Because every page is generated
from one template, the `<title>` and the share-preview tags can never drift out
of sync again — which is what had gone wrong on the old `about` and `team`
pages, where both were still titled "Privacy policy".

### Adding a new service page

Add a dictionary to the `SERVICES` list in `content.py` — copy an existing one
and change the fields. Then add it to the right group in `REGISTER` so it shows
on `services.html`, and run `python3 build.py`. The page, its FAQ schema, its
sitemap entry and its internal links are all generated for you.

---

## What was fixed from the old site

1. `about.html` and `team.html` were both titled **"Privacy policy"** in the
   browser tab and in Google results. Now every page has its own title, and the
   title is generated, not copy-pasted.
2. Those two pages had **no og: tags**, so sharing them on WhatsApp produced a
   blank card. All 20 pages now carry full Open Graph and Twitter tags plus a
   share image.
3. `services.html` promised the full register but only rendered the tax section.
   All six practice areas — company, tax, trademark, licences, environment and
   legal — are now listed, 58 filings in total.
4. Eight of the twelve homepage tiles pointed at `#enquire` with no page behind
   them. Four new service pages were written (company registration, ROC annual
   compliance, trademark, FSSAI) and every tile now has a destination.
5. The team page showed three people as letter placeholders because their photo
   files were missing. Initials are now a deliberate, styled fallback.
6. The home page claimed "25–30 professionals" while the team page said
   nineteen. The site now says 19 everywhere.
7. Added: sitemap.xml, robots.txt, a 404 page, ProfessionalService and FAQ
   structured data, a sticky call/WhatsApp bar on mobile, keyboard focus styles
   and reduced-motion support.
