# GameKingdom ♛

A lightweight, mobile-friendly browser game hub. No frameworks, no build step — just HTML, CSS, and vanilla JS. Open `index.html` and play.

## Features

- **Dark theme** with a clean card grid
- **Real-time search** — filter games as you type
- **Category pills** — Puzzle, Action, Casual, Word, Strategy, Math
- **Responsive** — works great on phones and desktops
- **Zero dependencies** — no npm, no bundler

## Project Structure

```
GameKingdom/
├── index.html          ← Home page (game listing)
├── styles.css          ← All styles
├── script.js           ← Game data + UI logic
├── games/
│   ├── _template.html  ← Starter template for new games
│   └── <game>.html     ← Individual game pages
└── README.md
```

## How to Add a Game

### 1. Copy the template

```bash
cp games/_template.html games/my-new-game.html
```

### 2. Build your game

Open `games/my-new-game.html` and fill in the `TODO` sections:

- Update the `<title>` and `<meta name="description">`
- Replace the placeholder `<div id="gameContainer">` with your game UI
- Add your game logic in the `<script>` block

### 3. Register the game card

Open `script.js` and add an entry to the `GAMES` array at the top:

```js
{
  id:       'my-new-game',          // must match the file name (no .html)
  title:    'My New Game',
  desc:     'One-line description shown on the card.',
  category: 'casual',               // puzzle | action | casual | word | strategy | math
  icon:     '🎯',                   // emoji shown on the card thumbnail
  path:     'games/my-new-game.html',
  tags:     [],
},
```

### 4. Test locally

Open `index.html` in your browser. The new card appears instantly — no build step needed. Test search and category filters.

### 5. Commit & push

```bash
git add games/my-new-game.html script.js
git commit -m "feat: add My New Game"
git push
```

## Categories

| Key        | Emoji | Description                  |
|------------|-------|------------------------------|
| `puzzle`   | 🧩    | Logic, sorting, pattern games |
| `action`   | ⚡    | Reflex, timing, fast-paced   |
| `casual`   | 🌸    | Relaxed, low-pressure fun    |
| `word`     | 📝    | Vocabulary, spelling, typing |
| `strategy` | ♟️    | Planning, turn-based games   |
| `math`     | 🔢    | Numbers, arithmetic, logic   |

## Adding a New Category

1. Add a pill button in `index.html` inside `.category-pills`
2. Add a colour gradient for the new category in `styles.css` under `.game-thumb[data-cat="..."]`
3. Use the new key in `script.js` game entries

## Local Development

No server needed — just open the file:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html

# Or use any static server:
npx serve .
```

## License

MIT — do whatever you want with it.
