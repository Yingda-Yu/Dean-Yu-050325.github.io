# Yingda Yu — Personal Website V3

Researcher × Builder editorial portfolio.

Live site: https://yingda-yu.github.io/Dean-Yu-050325.github.io/

## Tech Stack

- Static HTML + CSS + vanilla JavaScript (no framework, no build step)
- GitHub Pages hosting
- Editorial design with Newsreader (serif display) + Manrope (sans body) + JetBrains Mono (mono)
- Warm cream / terracotta light theme

## Project Structure

```
├── index.html                  Homepage (hero, updates, selected pubs, research, builds, about, contact)
├── publications.html           Full publications page with status filters
├── _config.yml                 Jekyll / GitHub Pages config
├── assets/
│   ├── css/
│   │   └── style.css           Complete design system & all page styles
│   ├── js/
│   │   ├── data.js             Bilingual content (EN / 中文) — UI text, about, builds, journey
│   │   ├── publications-data.js Publication dataset (language-independent metadata)
│   │   ├── app.js              Homepage rendering, navigation, interactions
│   │   └── publications.js     Publications page rendering & filtering
│   └── images/
│       └── profile-original.jpg  Hero portrait photo
└── README.md                   This file
```

## Content Architecture

### Bilingual Text — `assets/js/data.js`

All UI copy and bilingual content lives in `data.js` under two top-level keys:

- `I18N.en` — English content
- `I18N.zh` — 中文内容
- `SHARED` — language-independent shared data (URLs, social order, photo path)

To update any visible text on the site (navigation labels, section headings, about paragraphs, build descriptions, etc.), edit the corresponding key in `data.js`. Both language versions must be kept in sync.

### Publications — `assets/js/publications-data.js`

Publication metadata is **language-independent** — titles, authors, venues, DOI/arXiv links are the same in both languages. Only status labels and UI text are translated (in `data.js` under `statusLabels`, `presentationLabels`, and `pubPage`).

Each publication object supports:

```javascript
{
  id: "unique-id",
  year: 2026,
  title: "Paper Title",
  authors: "Yingda Yu*, Coauthor A, Coauthor B*",
  venue: {
    full: "Full Conference Name",
    short: "CONF 2026",
    location: "City, Country"
  },
  status: "published",        // published | accepted | preprint | under-review
  presentation: "oral",        // oral | poster | abstract-presentation | null
  links: {
    paper: "https://...",      // full text link
    doi: "10.xxxx/xxx",        // DOI number only (no URL prefix)
    arxiv: "2601.xxxxx",       // arXiv ID only
    code: "https://github...", // code repo
    project: "https://..."     // project page
  },
  topics: ["topic1", "topic2"],
  note: {                      // optional, bilingual
    en: "Preprint; submitted to XYZ 2027",
    zh: "预印本；已投稿 XYZ 2027"
  }
}
```

### Adding a New Publication

1. Open `assets/js/publications-data.js`
2. Add a new object to the `PUBS.data` array with complete metadata
3. If it should appear on the homepage, add its `id` to `PUBS.featuredIds` (max 6)
4. That's it — both the homepage and publications page will render it automatically

**Rules:**
- Set `status` accurately: `published`, `accepted`, `preprint`, or `under-review`
- Under-review papers must NOT look like accepted papers
- `presentation` is separate from `status` — use `oral`, `poster`, or `abstract-presentation`
- Do NOT invent DOIs, paper links, or metadata
- Keep author symbols (*, †, etc.) exactly as provided
- Always include the full author list — highlight "Yingda Yu" is automatic

### Featured (Homepage) Publications

The homepage shows 6 selected publications. To change which ones appear, edit the `featuredIds` array in `publications-data.js`.

## Local Preview

No build step required. Serve the directory with any static server:

```bash
# Python 3
python -m http.server 8080

# Node.js (if installed)
npx serve .
```

Then open `http://localhost:8080/`.

## Deployment

The site is hosted on **GitHub Pages** from the `main` branch. Pushing to `main` triggers an automatic deployment.

GitHub Pages project URL: `https://yingda-yu.github.io/Dean-Yu-050325.github.io/`

### Notes

- All internal links use relative paths (`./index.html`, `./publications.html`)
- The site works both at the project path and when previewed locally
- No server-side rendering or build pipeline is needed

## Accessibility

- Semantic HTML with proper heading hierarchy
- Visible keyboard focus styles (`:focus-visible`)
- `prefers-reduced-motion` disables non-essential animations
- Screen-reader friendly alt text on images
- Bilingual `lang` attribute on `<html>`

## What Was Removed in V3

- Particle hero canvas effect
- Visitor globe / "Around the World" section
- localStorage fake visitor counter
- AI-generated stylized portrait slider
- All related dead CSS and JS
