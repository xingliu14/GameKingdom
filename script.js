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
