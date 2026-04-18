/**
 * GameKingdom — script.js
 *
 * Game data, rendering, search, and category filtering.
 *
 * HOW TO ADD A GAME:
 * 1. Add an entry to the GAMES array below following the same shape.
 * 2. Drop your game HTML file into the games/ folder.
 * 3. Done — the card will appear automatically on the home page.
 */

'use strict';

// =====================================================
//  GAME DATA
// =====================================================

const GAMES = [
  // ----- Puzzle -----
  {
    id: 'bubble-burst',
    title: 'Bubble Burst',
    desc: 'Aim and shoot to match 3+ bubbles. Pop clusters, chain combos, and clear the board!',
    category: 'puzzle',
    icon: '🫧',
    path: 'games/bubble-burst.html',
    tags: [],
  },
  {
    id: 'sliding-puzzle',
    title: 'Sliding Puzzle',
    desc: 'Rearrange the scrambled tiles back into order.',
    category: 'puzzle',
    icon: '🧩',
    path: 'games/sliding-puzzle.html',
    tags: [],
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    desc: 'Clear the grid without hitting a single mine.',
    category: 'puzzle',
    icon: '💣',
    path: 'games/minesweeper.html',
    tags: [],
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    desc: 'Fill the 9×9 grid so every row, column and box has 1–9.',
    category: 'puzzle',
    icon: '🔢',
    path: 'games/sudoku.html',
    tags: [],
  },

  // ----- Action -----
  {
    id: 'space-shooter',
    title: 'Space Shooter',
    desc: 'Top-down shooter: blast waves of enemies, dodge bullets, and defeat epic bosses.',
    category: 'action',
    icon: '🛸',
    path: 'games/space-shooter.html',
    tags: [],
  },
  {
    id: 'pixel-runner',
    title: 'Pixel Runner',
    desc: 'Endless side-scrolling runner — jump, slide, and dodge obstacles as speed increases!',
    category: 'action',
    icon: '🏃',
    path: 'games/pixel-runner.html',
    tags: [],
  },
  {
    id: 'brick-blaster',
    title: 'Brick Blaster',
    desc: 'Break bricks with a bouncing ball, collect power-ups, and conquer 5 levels.',
    category: 'action',
    icon: '🧱',
    path: 'games/brick-blaster.html',
    tags: [],
  },
  {
    id: 'asteroid-dodge',
    title: 'Asteroid Dodge',
    desc: 'Steer your ship and survive the asteroid field as long as you can.',
    category: 'action',
    icon: '🚀',
    path: 'games/asteroid-dodge.html',
    tags: [],
  },
  {
    id: 'tap-ninja',
    title: 'Tap Ninja',
    desc: 'Tap fast to slice ninjas before they escape!',
    category: 'action',
    icon: '🥷',
    path: 'games/tap-ninja.html',
    tags: [],
  },

  // ----- Casual -----
  {
    id: 'snake-plus',
    title: 'Snake Plus',
    desc: 'Enhanced Snake with power-ups, game modes, obstacles, and visual effects.',
    category: 'casual',
    icon: '🐍',
    path: 'games/snake-plus.html',
    tags: [],
  },
  {
    id: 'balloon-pop',
    title: 'Balloon Pop',
    desc: 'Pop as many balloons as you can before time runs out.',
    category: 'casual',
    icon: '🎈',
    path: 'games/balloon-pop.html',
    tags: [],
  },
  {
    id: 'color-match',
    title: 'Color Match',
    desc: 'Match the tile colors before the timer reaches zero.',
    category: 'casual',
    icon: '🎨',
    path: 'games/color-match.html',
    tags: [],
  },

  // ----- Word -----
  {
    id: 'word-scramble',
    title: 'Word Scramble',
    desc: 'Unscramble the jumbled letters to form the hidden word.',
    category: 'word',
    icon: '🔤',
    path: 'games/word-scramble.html',
    tags: [],
  },
  {
    id: 'hangman',
    title: 'Hangman',
    desc: 'Guess the mystery word one letter at a time.',
    category: 'word',
    icon: '📝',
    path: 'games/hangman.html',
    tags: [],
  },

  // ----- Strategy -----
  {
    id: 'dungeon-rogue',
    title: 'Dungeon Rogue',
    desc: 'Turn-based roguelike: explore 5 floors, slay monsters, and defeat the Dragon.',
    category: 'strategy',
    icon: '🐉',
    path: 'games/dungeon-rogue.html',
    tags: ['rpg', 'roguelike'],
  },
  {
    id: 'card-quest',
    title: 'Card Quest',
    desc: 'A deck-building RPG. Fight 10 enemies, collect reward cards, defeat the Dragon Boss.',
    category: 'strategy',
    icon: '⚔️',
    path: 'games/card-quest.html',
    tags: [],
  },
  {
    id: 'tower-defense',
    title: 'Tower Defense',
    desc: 'Place towers and defend against waves of enemies before they reach the end.',
    category: 'strategy',
    icon: '🗼',
    path: 'games/tower-defense.html',
    tags: [],
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    desc: 'Classic X vs O — play against a friend or the AI.',
    category: 'strategy',
    icon: '⭕',
    path: 'games/tic-tac-toe.html',
    tags: [],
  },
  {
    id: 'connect-four',
    title: 'Connect Four',
    desc: 'Drop discs to get four in a row before your opponent.',
    category: 'strategy',
    icon: '🔴',
    path: 'games/connect-four.html',
    tags: [],
  },
  {
    id: 'chess',
    title: 'Chess',
    desc: 'Full chess with castling, en passant, and promotion. Play vs AI or a friend.',
    category: 'strategy',
    icon: '♟',
    path: 'games/chess.html',
    tags: [],
  },

  // ----- Math -----
  {
    id: 'math-blitz',
    title: 'Math Blitz',
    desc: 'Solve as many arithmetic problems as you can in 60 seconds.',
    category: 'math',
    icon: '➕',
    path: 'games/math-blitz.html',
    tags: [],
  },
];

// =====================================================
//  STATE
// =====================================================

let currentCategory = 'all';
let currentSearch   = '';

// =====================================================
//  DOM REFERENCES
// =====================================================

const gameGrid    = document.getElementById('gameGrid');
const emptyState  = document.getElementById('emptyState');
const resultsCount = document.getElementById('resultsCount');
const searchInput  = document.getElementById('searchInput');
const searchClear  = document.getElementById('searchClear');
const categoryPills = document.getElementById('categoryPills');

// =====================================================
//  RENDER
// =====================================================

function createCard(game) {
  const a = document.createElement('a');
  a.href  = game.path;
  a.className = 'game-card';
  a.setAttribute('data-cat', game.category);
  a.setAttribute('aria-label', game.title);

  a.innerHTML = `
    <div class="game-thumb" data-cat="${game.category}" aria-hidden="true">
      ${game.icon}
    </div>
    <div class="game-info">
      <span class="game-title">${escHtml(game.title)}</span>
      <span class="game-desc">${escHtml(game.desc)}</span>
      <span class="game-tag">${escHtml(game.category)}</span>
    </div>
  `;
  return a;
}

function renderGames() {
  const needle = currentSearch.toLowerCase().trim();

  const filtered = GAMES.filter(g => {
    const catMatch  = currentCategory === 'all' || g.category === currentCategory;
    const textMatch = !needle
      || g.title.toLowerCase().includes(needle)
      || g.desc.toLowerCase().includes(needle)
      || g.category.toLowerCase().includes(needle);
    return catMatch && textMatch;
  });

  // Clear grid
  gameGrid.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.hidden = false;
    resultsCount.textContent = '';
  } else {
    emptyState.hidden = true;
    filtered.forEach(g => gameGrid.appendChild(createCard(g)));
    resultsCount.textContent = filtered.length === GAMES.length
      ? `${GAMES.length} games`
      : `${filtered.length} of ${GAMES.length} games`;
  }
}

// =====================================================
//  SEARCH
// =====================================================

searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value;
  searchClear.hidden = !currentSearch;
  renderGames();
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  currentSearch = '';
  searchClear.hidden = true;
  searchInput.focus();
  renderGames();
});

// =====================================================
//  CATEGORY FILTER
// =====================================================

categoryPills.addEventListener('click', e => {
  const pill = e.target.closest('.pill');
  if (!pill) return;

  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');

  currentCategory = pill.dataset.cat;
  renderGames();
});

// =====================================================
//  UTILITIES
// =====================================================

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// =====================================================
//  INIT
// =====================================================

renderGames();
