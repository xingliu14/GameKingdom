/**
 * GameKingdom — Game Registry & UI
 *
 * To add a new game, add an object to the GAMES array below.
 * See games/README.md for the full guide.
 *
 * Fields:
 *   id        {string}  unique slug, used as URL fragment
 *   name      {string}  display name
 *   icon      {string}  emoji icon
 *   desc      {string}  one-line description (max ~80 chars)
 *   category  {string}  one of: puzzle | word | action | strategy | arcade
 *   url       {string|null} path to the game page; null = coming soon
 *   tags      {string[]} extra search keywords (optional)
 */
const GAMES = [
  {
    id: 'pixel-heist',
    name: 'Pixel Heist',
    icon: '🕵️',
    desc: 'Dodge guards and steal the pixel treasure without being spotted.',
    category: 'action',
    url: null,
    tags: ['stealth', 'dodge', 'run'],
  },
  {
    id: 'word-avalanche',
    name: 'Word Avalanche',
    icon: '🌨️',
    desc: 'Spell words before the falling letters bury you alive.',
    category: 'word',
    url: null,
    tags: ['spelling', 'typing', 'letters'],
  },
  {
    id: 'orbital-duel',
    name: 'Orbital Duel',
    icon: '🪐',
    desc: 'Sling gravity-bent projectiles to outmanoeuvre your opponent.',
    category: 'strategy',
    url: null,
    tags: ['gravity', '2-player', 'space'],
  },
  {
    id: 'number-crunch',
    name: 'Number Crunch',
    icon: '🔢',
    desc: 'Hit the target number using only the tiles on screen — fast!',
    category: 'puzzle',
    url: null,
    tags: ['math', 'arithmetic', 'quick'],
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    icon: '🃏',
    desc: 'Flip cards and find pairs before the clock runs out.',
    category: 'puzzle',
    url: null,
    tags: ['cards', 'memory', 'concentration'],
  },
  {
    id: 'bubble-pop',
    name: 'Bubble Pop',
    icon: '🫧',
    desc: 'Tap colour-matching bubbles to clear the board in time.',
    category: 'arcade',
    url: null,
    tags: ['tap', 'color', 'clear'],
  },
];

/* ── State ── */
let activeCategory = 'all';
let searchQuery = '';

/* ── DOM refs ── */
const grid = document.getElementById('game-grid');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search');
const pills = document.querySelectorAll('.pill');

/* ── Render ── */
function render() {
  const q = searchQuery.toLowerCase().trim();

  const filtered = GAMES.filter(g => {
    const matchCat = activeCategory === 'all' || g.category === activeCategory;
    const searchable = [g.name, g.desc, g.category, ...(g.tags || [])].join(' ').toLowerCase();
    const matchSearch = !q || searchable.includes(q);
    return matchCat && matchSearch;
  });

  grid.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  filtered.forEach(g => {
    const isReady = !!g.url;
    const tag = isReady ? 'a' : 'div';
    const card = document.createElement(tag);

    card.className = 'game-card' + (isReady ? '' : ' coming-soon');
    card.setAttribute('role', 'listitem');
    if (isReady) {
      card.href = g.url;
    }

    card.innerHTML = `
      <div class="game-icon">${g.icon}</div>
      <div class="game-name">${escHtml(g.name)}</div>
      <div class="game-desc">${escHtml(g.desc)}</div>
      <div class="game-meta">
        <span class="game-category">${escHtml(g.category)}</span>
        ${isReady ? '' : '<span class="badge-soon">Coming Soon</span>'}
      </div>
    `;

    grid.appendChild(card);
  });
}

function escHtml(str) {
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ── Events ── */
searchInput.addEventListener('input', e => {
  searchQuery = e.target.value;
  render();
});

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    activeCategory = pill.dataset.category;
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    render();
  });
});

/* ── Init ── */
render();
