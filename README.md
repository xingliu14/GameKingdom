# 🎮 GameKingdom

> **Endless games to kill the time** — a mobile-first, no-framework arcade portal you can run by opening `index.html` in any browser.

**Live site →** https://xingliu14.github.io/GameKingdom

---

## Features

- **Real-time search** — filter by name, description, or tags
- **Category pills** — Puzzle / Word / Action / Strategy / Arcade
- **Responsive grid** — 2 columns on phones, 4+ on desktop
- **Dark mode** — follows system preference
- **"Coming Soon"** cards for unbuilt games — no broken links
- **Zero dependencies** — pure HTML/CSS/JS, no build step

---

## Project Structure

```
GameKingdom/
├── index.html          Main page (search + grid)
├── css/
│   └── style.css       Mobile-first dark theme
├── js/
│   └── games.js        Game registry + filter/render
└── games/
    ├── README.md       Guide: how to add a new game
    └── <game-slug>/    One folder per game (future)
        └── index.html
```

---

## Adding a Game

See **[games/README.md](games/README.md)** for the step-by-step guide.

**TL;DR:** Add one object to the `GAMES` array in `js/games.js`, create
`games/your-game/index.html`, set `url` when it's ready.

---

## Running Locally

No server needed:

```bash
open index.html   # macOS
# or just double-click index.html in your file manager
```

For live-reload during development:

```bash
npx serve .
```

---

## Deploying to GitHub Pages

1. Push to `master` (or `main`)
2. Go to **Settings → Pages** → Source: `Deploy from branch` → `master` / `(root)`
3. Done — live at `https://xingliu14.github.io/GameKingdom`

---

## License

MIT
