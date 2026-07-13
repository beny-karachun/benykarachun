# Beny Karachun — Portfolio

A zero-build static portfolio and project hub. The site is intentionally plain HTML, CSS, and JavaScript so it can be hosted on GitHub Pages, Netlify, Cloudflare Pages, or any standard web server without a build step.

## Preview locally

From this directory, run:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Main files

- `index.html` — portfolio, selected work, project directory, about, and contact
- `styles.css` — responsive visual system and motion
- `script.js` — navigation, reveal effects, progress indicator, and pointer detail
- `resume.html` / `resume.css` — accessible résumé generated from the newer `CV_Draft.md` content
- `benjamin-karachun-resume.pdf` — current two-page A4 download
- `CV_Draft.pdf` — older résumé retained only as a backup; it is not linked from the website

## Updating projects

Project cards live under `#work`, and the complete link hub lives under `#directory` in `index.html`. Add new websites to the directory even if they do not need a full visual card.

## Regenerating the résumé PDF

With the local server running and Chrome installed:

```bash
google-chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf="$PWD/benjamin-karachun-resume.pdf" \
  http://127.0.0.1:4173/resume.html
```
