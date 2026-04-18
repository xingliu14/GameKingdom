# GameKingdom

A collection of small, self-contained browser games — no frameworks, no build step, no dependencies.

## Core philosophy

**Zero dependencies.** Vanilla HTML/CSS/JS only. Nothing to install, nothing to compile.

**One file per game.** All CSS and JS for a game lives inside its `games/<id>.html`. No external imports from other game files.

## Adding a game

1. Copy `games/_template.html` → `games/<id>.html` and build the game inside it.
2. Add an entry to the `GAMES` array in `script.js` — the card appears automatically.

```js
{
  id:       'snake',
  title:    'Snake',
  desc:     'Short description shown on the card.',
  category: 'casual',   // puzzle | action | casual | word | strategy | math
  icon:     '🐍',
  path:     'games/snake.html',
  tags:     [],
}
```

## Theming

Use the CSS custom properties defined in `styles.css` for visual consistency:

| Property | Role |
|---|---|
| `--bg` | Page background |
| `--surface` | Card / panel background |
| `--accent` | Interactive highlights |
| `--text` | Primary text |

## Testing

Open `index.html` directly in a browser — no server needed.
