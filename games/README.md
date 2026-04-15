# Adding a New Game to GameKingdom

Games are registered in **`js/games.js`** inside the `GAMES` array. No build
step needed — just add an object and the site updates automatically.

## Quick-Start: 3 Steps

### 1. Add a game object to `GAMES`

```js
{
  id: 'my-game',          // unique slug (URL-safe, lowercase, dashes OK)
  name: 'My Game',        // display name shown on the card
  icon: '🎯',             // emoji — pick one that fits the vibe
  desc: 'One-line teaser, max ~80 chars.',
  category: 'puzzle',     // see Categories below
  url: 'games/my-game/',  // path to your game — or null for "Coming Soon"
  tags: ['keyword1', 'keyword2'], // extra search keywords (optional)
},
```

### 2. Build the game

Create your game inside a new folder: `games/my-game/index.html`

A game is just an HTML file (+ any CSS/JS it needs). It can be as simple or
complex as you like. No framework required.

Minimal template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Game — GameKingdom</title>
</head>
<body>
  <a href="../../">← Back to GameKingdom</a>
  <!-- your game here -->
</body>
</html>
```

### 3. Set `url` in the registry

Change `url: null` → `url: 'games/my-game/'` once the game is playable. The
"Coming Soon" badge disappears automatically.

---

## Categories

| Value      | Use for                                   |
|------------|-------------------------------------------|
| `puzzle`   | Logic, math, memory, spatial reasoning    |
| `word`     | Spelling, typing, word association        |
| `action`   | Fast reflexes, dodging, shooting          |
| `strategy` | Planning, turn-based, resource management |
| `arcade`   | Classic twitch games, high-score chasers  |

Need a new category? Add a `<button>` pill in `index.html` and use the new
value as the `category` field in the game object.

---

## Tips

- Keep game files self-contained in their folder.
- Use relative paths for assets (`./sprites.png`, `./game.js`).
- Test on mobile — the site is mobile-first but your game should be too.
- Aim for games that work without any server (static files only).
