// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const IMPOSTER_COUNT = { 3:1, 4:1, 5:1, 6:1, 7:2, 8:2, 9:2, 10:3, 11:3, 12:3 };
const CIRCUMFERENCE = 2 * Math.PI * 52; // for SVG timer ring (r=52)

// ─── STATE ────────────────────────────────────────────────────────────────────

let state = {
  players: [],          // [{ name, score }]
  secretWord: '',
  category: '',
  imposterIndices: [],
  phase: 'landing',
  currentRevealIndex: 0,
  currentVoteIndex: 0,
  votes: [],            // votes[voterIdx] = targetIdx
  timerDuration: 60,
  timerRemaining: 60,
  timerInterval: null,
  cardRevealed: false,
  round: 0,
};

// ─── SCREEN MANAGEMENT ────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('screen--active');
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('screen--active');
    // Scroll to top on each screen change
    window.scrollTo({ top: 0 });
  }
}

// ─── LANDING ──────────────────────────────────────────────────────────────────

function goHome() {
  clearInterval(state.timerInterval);
  showScreen('screen-landing');
  // Show "View Scores" if there are existing players with scores
  const hasScores = state.players.some(p => p.score > 0);
  document.getElementById('btn-view-scores').style.display = hasScores ? 'flex' : 'none';
}

// ─── SETUP ────────────────────────────────────────────────────────────────────

function initSetup() {
  showScreen('screen-setup');
  renderPlayerInputs();
  // Pre-fill names from previous round
  if (state.players.length > 0) {
    const count = state.players.length;
    document.getElementById('player-count').value = count;
    renderPlayerInputs();
    state.players.forEach((p, i) => {
      const el = document.getElementById(`pname-${i}`);
      if (el) el.value = p.name;
    });
  }
}

function onPlayerCountChange() {
  const count = parseInt(document.getElementById('player-count').value);
  document.getElementById('player-count-display').textContent = count;
  renderPlayerInputs();
  // Re-fill existing names
  state.players.forEach((p, i) => {
    const el = document.getElementById(`pname-${i}`);
    if (el) el.value = p.name;
  });
}

function renderPlayerInputs() {
  const count = parseInt(document.getElementById('player-count').value);
  const container = document.getElementById('player-inputs');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.className = 'input-row';
    div.innerHTML = `
      <label class="input-label">Player ${i + 1}</label>
      <input
        class="text-input"
        id="pname-${i}"
        type="text"
        placeholder="Enter name…"
        maxlength="18"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
      />
    `;
    container.appendChild(div);
  }
}

function startGame() {
  const count = parseInt(document.getElementById('player-count').value);
  const category = document.getElementById('category-select').value;
  const timerDuration = parseInt(document.getElementById('timer-select').value);

  // Collect names (fallback to Player N)
  const players = [];
  for (let i = 0; i < count; i++) {
    const raw = document.getElementById(`pname-${i}`)?.value.trim();
    const name = raw || `Player ${i + 1}`;
    const prev = state.players.find(p => p.name === name);
    players.push({ name, score: prev?.score ?? 0 });
  }

  // Validation: duplicate names
  const names = players.map(p => p.name);
  if (new Set(names).size !== names.length) {
    showToast('Each player must have a unique name!');
    return;
  }

  // Pick a random word
  const words = WORD_BANK[category];
  const secretWord = words[Math.floor(Math.random() * words.length)];

  // Assign imposters (randomly)
  const imposterCount = IMPOSTER_COUNT[count] ?? 1;
  const shuffled = [...Array(count).keys()].sort(() => Math.random() - 0.5);
  const imposterIndices = shuffled.slice(0, imposterCount);

  // Commit state
  state = {
    ...state,
    players,
    secretWord,
    category,
    imposterIndices,
    phase: 'reveal',
    currentRevealIndex: 0,
    currentVoteIndex: 0,
    votes: new Array(count).fill(-1),
    timerDuration,
    timerRemaining: timerDuration,
    timerInterval: null,
    cardRevealed: false,
    round: state.round + 1,
  };

  showRevealScreen();
}

// ─── REVEAL PHASE ─────────────────────────────────────────────────────────────

function showRevealScreen() {
  showScreen('screen-reveal');
  renderReveal();
}

function renderReveal() {
  const idx = state.currentRevealIndex;
  const player = state.players[idx];
  const total = state.players.length;

  document.getElementById('reveal-name').textContent = player.name;
  document.getElementById('reveal-progress').textContent = `${idx + 1} of ${total}`;

  // Reset card
  const card = document.getElementById('reveal-card');
  card.classList.remove('flipped');
  state.cardRevealed = false;

  document.getElementById('reveal-next-btn').style.display = 'none';
  document.getElementById('reveal-tap-hint').style.display = 'flex';
}

function tapCard() {
  if (state.cardRevealed) return;

  const idx = state.currentRevealIndex;
  const isImposter = state.imposterIndices.includes(idx);

  const back = document.getElementById('card-back');

  if (isImposter) {
    back.innerHTML = `
      <div class="card-role card-role--imposter">
        <div class="role-badge">IMPOSTER</div>
        <div class="role-category">Category: <strong>${state.category}</strong></div>
        <div class="role-hint">You don't know the word.<br>Blend in. Survive.</div>
      </div>
    `;
  } else {
    back.innerHTML = `
      <div class="card-role card-role--civilian">
        <div class="role-badge">CIVILIAN</div>
        <div class="role-word">${state.secretWord.toUpperCase()}</div>
        <div class="role-category">Category: <strong>${state.category}</strong></div>
        <div class="role-hint">Find the imposter.</div>
      </div>
    `;
  }

  document.getElementById('reveal-card').classList.add('flipped');
  state.cardRevealed = true;
  document.getElementById('reveal-next-btn').style.display = 'flex';
  document.getElementById('reveal-tap-hint').style.display = 'none';
}

function nextReveal() {
  if (!state.cardRevealed) return;

  // Flip back, then advance
  document.getElementById('reveal-card').classList.remove('flipped');
  document.getElementById('reveal-next-btn').style.display = 'none';
  state.cardRevealed = false;

  state.currentRevealIndex++;

  if (state.currentRevealIndex >= state.players.length) {
    setTimeout(() => startCluePhase(), 450);
  } else {
    setTimeout(() => renderReveal(), 450);
  }
}

// ─── CLUE PHASE ───────────────────────────────────────────────────────────────

function startCluePhase() {
  showScreen('screen-clue');
  state.timerRemaining = state.timerDuration;
  renderCluePlayerList();
  startTimer();
}

function renderCluePlayerList() {
  const container = document.getElementById('clue-player-list');
  container.innerHTML = state.players.map((p, i) => `
    <div class="clue-player" id="cp-${i}">
      <span class="clue-num">${i + 1}</span>
      <span class="clue-pname">${p.name}</span>
    </div>
  `).join('');
}

function startTimer() {
  updateTimerUI();
  state.timerInterval = setInterval(() => {
    state.timerRemaining--;
    updateTimerUI();
    if (state.timerRemaining <= 0) {
      clearInterval(state.timerInterval);
      onTimerEnd();
    }
  }, 1000);
}

function updateTimerUI() {
  const t = state.timerRemaining;
  const mins = Math.floor(t / 60);
  const secs = t % 60;
  document.getElementById('timer-text').textContent =
    `${mins}:${secs.toString().padStart(2, '0')}`;

  const pct = t / state.timerDuration;
  const offset = CIRCUMFERENCE * (1 - pct);
  const ring = document.getElementById('timer-ring');
  if (ring) ring.style.strokeDashoffset = offset;

  // Color: green → yellow → red
  let color;
  if (pct > 0.5) color = 'var(--cyan)';
  else if (pct > 0.25) color = 'var(--yellow)';
  else color = 'var(--red)';
  if (ring) ring.style.stroke = color;

  const timerText = document.getElementById('timer-text');
  if (t <= 10) timerText.classList.add('urgent');
  else timerText.classList.remove('urgent');
}

function onTimerEnd() {
  document.getElementById('timer-text').textContent = 'TIME!';
  setTimeout(() => startVotePhase(), 1200);
}

function skipToVote() {
  clearInterval(state.timerInterval);
  startVotePhase();
}

// ─── VOTE PHASE ───────────────────────────────────────────────────────────────

function startVotePhase() {
  state.phase = 'vote';
  state.currentVoteIndex = 0;
  state.votes = new Array(state.players.length).fill(-1);
  showScreen('screen-vote');
  renderVote();
}

function renderVote() {
  const idx = state.currentVoteIndex;
  const player = state.players[idx];
  const total = state.players.length;

  document.getElementById('vote-name').textContent = player.name;
  document.getElementById('vote-progress').textContent = `${idx + 1} of ${total}`;
  document.getElementById('vote-next-btn').style.display = 'none';

  const container = document.getElementById('vote-options');
  container.innerHTML = state.players.map((p, i) => {
    if (i === idx) return ''; // Can't vote for yourself
    return `
      <button class="vote-option" onclick="castVote(${i})">
        <span class="vote-option-name">${p.name}</span>
        <span class="vote-option-arrow">›</span>
      </button>
    `;
  }).join('');

  document.getElementById('vote-confirmed').style.display = 'none';
  container.style.display = 'flex';
}

function castVote(targetIdx) {
  state.votes[state.currentVoteIndex] = targetIdx;

  document.getElementById('vote-options').style.display = 'none';
  document.getElementById('vote-confirmed').style.display = 'flex';
  document.getElementById('vote-next-btn').style.display = 'flex';
}

function nextVote() {
  state.currentVoteIndex++;
  if (state.currentVoteIndex >= state.players.length) {
    showResults();
  } else {
    renderVote();
  }
}

// ─── RESULTS ──────────────────────────────────────────────────────────────────

function showResults() {
  showScreen('screen-results');

  // Tally votes
  const tally = new Array(state.players.length).fill(0);
  state.votes.forEach(v => { if (v >= 0) tally[v]++; });

  // Who got max votes?
  const maxVotes = Math.max(...tally);
  const mostVoted = tally.reduce((acc, v, i) => v === maxVotes ? [...acc, i] : acc, []);

  // Civilians win if ALL imposters are voted out (no ties that dilute it)
  const civiliansWin =
    state.imposterIndices.every(i => mostVoted.includes(i)) &&
    mostVoted.length === state.imposterIndices.length;

  // Award points
  if (civiliansWin) {
    state.players.forEach((p, i) => {
      if (!state.imposterIndices.includes(i)) p.score += 1;
    });
  } else {
    state.imposterIndices.forEach(i => state.players[i].score += 2);
  }

  // Banner
  const banner = document.getElementById('result-banner');
  const bannerTitle = document.getElementById('result-banner-title');
  const bannerSub = document.getElementById('result-banner-sub');
  banner.className = 'result-banner ' + (civiliansWin ? 'banner--civilians' : 'banner--imposter');
  bannerTitle.textContent = civiliansWin ? 'CIVILIANS WIN' : 'IMPOSTER WINS';
  bannerSub.textContent = civiliansWin
    ? 'The imposter has been exposed!'
    : 'The imposter stayed hidden!';

  // Word reveal
  document.getElementById('result-word-reveal').textContent =
    `The secret word was: ${state.secretWord.toUpperCase()}`;

  // Imposters reveal
  const imposterNames = state.imposterIndices.map(i => state.players[i].name).join(' & ');
  document.getElementById('result-imposters').textContent =
    `Imposter${state.imposterIndices.length > 1 ? 's' : ''}: ${imposterNames}`;

  // Vote breakdown
  const voteList = document.getElementById('vote-breakdown');
  voteList.innerHTML = tally
    .map((v, i) => ({
      name: state.players[i].name,
      votes: v,
      isImposter: state.imposterIndices.includes(i),
      idx: i,
    }))
    .sort((a, b) => b.votes - a.votes)
    .map(p => `
      <div class="tally-row ${p.isImposter ? 'tally-row--imposter' : ''}">
        <span class="tally-name">${p.name}</span>
        <span class="tally-right">
          ${p.isImposter ? '<span class="tally-tag">IMPOSTER</span>' : ''}
          <span class="tally-votes">${p.votes} vote${p.votes !== 1 ? 's' : ''}</span>
        </span>
      </div>
    `).join('');

  // Scoreboard
  renderScoreboard();
}

function renderScoreboard() {
  const sorted = [...state.players]
    .map((p, i) => ({ ...p, origIdx: i }))
    .sort((a, b) => b.score - a.score);

  const container = document.getElementById('scoreboard-list');
  container.innerHTML = sorted.map((p, rank) => `
    <div class="score-row ${rank === 0 ? 'score-row--first' : ''}">
      <span class="score-rank">${rank === 0 ? '🏆' : `#${rank + 1}`}</span>
      <span class="score-name">${p.name}</span>
      <span class="score-pts">${p.score} <small>pt${p.score !== 1 ? 's' : ''}</small></span>
    </div>
  `).join('');
}

function playAgain() {
  clearInterval(state.timerInterval);
  initSetup();
}

// ─── TOAST ────────────────────────────────────────────────────────────────────

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('toast--visible');
  setTimeout(() => toast.classList.remove('toast--visible'), 2800);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  showScreen('screen-landing');
  document.getElementById('btn-view-scores').style.display = 'none';
  // Seed player count display
  const countEl = document.getElementById('player-count');
  if (countEl) {
    document.getElementById('player-count-display').textContent = countEl.value;
  }
});
