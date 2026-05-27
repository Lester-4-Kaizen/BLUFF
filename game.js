// ─── PLAYER COLORS ────────────────────────────────────────────────────────────

const PLAYER_COLORS = [
  '#c9a84c', // gold
  '#dc2626', // red
  '#2563eb', // blue
  '#16a34a', // green
  '#9333ea', // purple
  '#ea580c', // orange
  '#0891b2', // teal
  '#db2777', // pink
  '#65a30d', // lime
  '#d97706', // amber
  '#7c3aed', // violet
  '#059669', // emerald
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const IMPOSTER_COUNT = { 3:1, 4:1, 5:1, 6:1, 7:2, 8:2, 9:2, 10:3, 11:3, 12:3 };
const CIRCUMFERENCE = 2 * Math.PI * 52;

// ─── STATE ────────────────────────────────────────────────────────────────────

let state = {
  players: [],
  secretWord: '',
  category: '',
  imposterIndices: [],
  phase: 'landing',
  currentRevealIndex: 0,
  currentVoteIndex: 0,
  votes: [],
  clues: [],           // array of { playerIdx, text } per round
  timerDuration: 60,
  timerRemaining: 60,
  timerInterval: null,
  cardRevealed: false,
  round: 0,
  votingMode: 'digital',
  civiliansWon: null,
  buzzModalOpen: false,
  roundHistory: [],
  timerPaused: false,
};

// ─── SOUND ENGINE ─────────────────────────────────────────────────────────────

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudio() {
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

function playTone(freq, type, duration, gainVal = 0.18, delay = 0) {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch(e) {}
}

const SFX = {
  flip()    { playTone(300,'sine',0.12,0.1); playTone(180,'sine',0.15,0.06,0.06); },
  civilian(){ playTone(523,'triangle',0.3,0.15); playTone(659,'triangle',0.3,0.12,0.1); playTone(784,'triangle',0.4,0.10,0.2); },
  imposter(){ playTone(110,'sawtooth',0.5,0.08); playTone(146,'sawtooth',0.4,0.06,0.15); playTone(98,'sine',0.6,0.05,0.1); },
  tick()    { playTone(880,'square',0.06,0.08); },
  timesUp() { playTone(440,'sawtooth',0.12,0.12); playTone(330,'sawtooth',0.18,0.10,0.1); playTone(220,'sawtooth',0.3,0.08,0.22); },
  vote()    { playTone(392,'triangle',0.15,0.12); playTone(523,'triangle',0.2,0.10,0.1); },
  civWin()  { [523,659,784,1046].forEach((f,i) => playTone(f,'triangle',0.5,0.12,i*0.1)); },
  impWin()  { [220,185,155,130].forEach((f,i) => playTone(f,'sawtooth',0.5,0.09,i*0.12)); },
  buzz()    { playTone(660,'square',0.08,0.15); playTone(440,'square',0.12,0.12,0.07); },
  click()   { playTone(600,'sine',0.05,0.08); },
  clue()    { playTone(440,'sine',0.08,0.1); playTone(550,'sine',0.1,0.08,0.06); },
};

// ─── SCREEN ───────────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('screen--active'));
  const t = document.getElementById(id);
  if (t) { t.classList.add('screen--active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
}

// ─── LANDING ──────────────────────────────────────────────────────────────────

function goHome() {
  clearInterval(state.timerInterval);
  closeBuzzModal();
  showScreen('screen-landing');
  const hasScores = state.players.some(p => p.score > 0);
  document.getElementById('btn-view-scores').style.display = hasScores ? 'flex' : 'none';
  const hasHistory = state.roundHistory && state.roundHistory.length > 0;
  document.getElementById('btn-history').style.display = hasHistory ? 'flex' : 'none';
}

// ─── SETUP ────────────────────────────────────────────────────────────────────

function initSetup() {
  SFX.click();
  showScreen('screen-setup');
  setVoteMode(state.votingMode || 'digital');
  renderPlayerInputs();
  if (state.players.length > 0) {
    const count = state.players.length;
    document.getElementById('player-count').value = count;
    document.getElementById('player-count-display').textContent = count;
    renderPlayerInputs();
    state.players.forEach((p, i) => {
      const el = document.getElementById(`pname-${i}`);
      if (el) el.value = p.name;
    });
  }
}

function setVoteMode(mode) {
  state.votingMode = mode;
  document.querySelectorAll('.vote-mode-option').forEach(el => {
    el.classList.toggle('active', el.dataset.mode === mode);
  });
}

function renderPlayerInputs() {
  const count = parseInt(document.getElementById('player-count').value);
  const container = document.getElementById('player-inputs');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const color = PLAYER_COLORS[i % PLAYER_COLORS.length];
    const div = document.createElement('div');
    div.className = 'player-name-row input-row';
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <div class="player-dot" style="background:${color};box-shadow:0 0 6px ${color}55"></div>
        <label class="input-label">Player ${i + 1}</label>
      </div>
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

function pickRandomCategory() {
  SFX.click();
  const keys = Object.keys(WORD_BANK);
  const picked = keys[Math.floor(Math.random() * keys.length)];
  const select = document.getElementById('category-select');
  select.value = picked;
  // Flash animation
  select.style.borderColor = 'var(--gold)';
  select.style.boxShadow = '0 0 12px rgba(201,168,76,0.3)';
  setTimeout(() => { select.style.borderColor = ''; select.style.boxShadow = ''; }, 800);
}

function startGame() {
  SFX.click();
  const count = parseInt(document.getElementById('player-count').value);
  const category = document.getElementById('category-select').value;
  const timerDuration = parseInt(document.getElementById('timer-select').value);

  const players = [];
  for (let i = 0; i < count; i++) {
    const raw = document.getElementById(`pname-${i}`)?.value.trim();
    const name = raw || `Player ${i + 1}`;
    const prev = state.players.find(p => p.name === name);
    const color = PLAYER_COLORS[i % PLAYER_COLORS.length];
    players.push({ name, score: prev?.score ?? 0, color });
  }

  const names = players.map(p => p.name);
  if (new Set(names).size !== names.length) {
    showToast('Each player needs a unique name.');
    return;
  }

  // Pick word
  const words = WORD_BANK[category];
  const secretWord = words[Math.floor(Math.random() * words.length)];

  // Pick imposters
  const imposterCount = IMPOSTER_COUNT[count] ?? 1;
  const shuffled = [...Array(count).keys()].sort(() => Math.random() - 0.5);
  const imposterIndices = shuffled.slice(0, imposterCount);

  // Get hints from hardcoded HINTS dict (instant — no API call)
  const hints = getHints(secretWord, category);

  state = {
    ...state,
    players,
    secretWord,
    category,
    imposterIndices,
    hints,
    phase: 'reveal',
    currentRevealIndex: 0,
    currentVoteIndex: 0,
    votes: new Array(count).fill(-1),
    clues: [],
    timerDuration,
    timerRemaining: timerDuration,
    timerInterval: null,
    cardRevealed: false,
    round: state.round + 1,
    civiliansWon: null,
    buzzModalOpen: false,
    timerPaused: false,
    roundHistory: state.roundHistory || [],
  };

  showRevealScreen();
}

// ─── HINTS (hardcoded, instant) ───────────────────────────────────────────────

function getHints(word, category) {
  // Try exact match first
  if (HINTS[word]) return HINTS[word];
  // Try case-insensitive
  const lower = word.toLowerCase();
  for (const key of Object.keys(HINTS)) {
    if (key.toLowerCase() === lower) return HINTS[key];
  }
  // Fallback: pick 3 random words from same category
  const pool = WORD_BANK[category].filter(w => w.toLowerCase() !== lower);
  return pool.sort(() => Math.random() - 0.5).slice(0, 3);
}

// ─── THEME ────────────────────────────────────────────────────────────────────

function initTheme() {
  const saved = localStorage.getItem('bluff-theme') || 'dark';
  applyTheme(saved);
}

function toggleTheme() {
  SFX.click();
  const current = document.documentElement.dataset.theme || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('bluff-theme', next);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀ Light' : '🌙 Dark';
}

// ─── REVEAL ───────────────────────────────────────────────────────────────────

function showRevealScreen() {
  showScreen('screen-reveal');
  renderReveal();
}

function renderReveal() {
  const idx = state.currentRevealIndex;
  const player = state.players[idx];
  const total = state.players.length;

  document.getElementById('reveal-progress').textContent = `${idx + 1} of ${total}`;
  document.getElementById('reveal-name').innerHTML =
    `<span class="reveal-player-dot" style="background:${player.color};box-shadow:0 0 8px ${player.color}66"></span>${player.name}`;

  const card = document.getElementById('reveal-card');
  card.classList.remove('flipped');
  state.cardRevealed = false;

  document.getElementById('reveal-next-btn').style.display = 'none';
  document.getElementById('reveal-tap-hint').style.display = 'flex';
}

function tapCard() {
  if (state.cardRevealed) return;
  SFX.flip();

  const idx = state.currentRevealIndex;
  const isImposter = state.imposterIndices.includes(idx);
  const back = document.getElementById('card-back');

  if (isImposter) {
    const hintHTML = state.hints.map(w =>
      `<span class="hint-pill">${w}</span>`
    ).join('');

    back.className = 'flip-face card-back card-back--imposter';
    back.innerHTML = `
      <div class="role-stamp role-stamp--imposter">Imposter</div>
      <div class="role-redacted">[ REDACTED ]</div>
      <div class="role-category">Category: <strong>${state.category}</strong></div>
      <div class="role-hints">
        <div class="role-hints-label">Cover words — use these as clues</div>
        <div class="role-hints-words">${hintHTML}</div>
      </div>
      <div class="role-flavor">You don't know the word.<br>Blend in. Stay calm. Survive.</div>
    `;
    setTimeout(() => SFX.imposter(), 200);
  } else {
    back.className = 'flip-face card-back card-back--civilian';
    back.innerHTML = `
      <div class="role-stamp role-stamp--civilian">Civilian</div>
      <div class="role-word">${state.secretWord.toUpperCase()}</div>
      <div class="role-category">Category: <strong>${state.category}</strong></div>
      <div class="role-flavor">Give a clue. Find the imposter.<br>Don't make it too obvious.</div>
    `;
    setTimeout(() => SFX.civilian(), 200);
  }

  document.getElementById('reveal-card').classList.add('flipped');
  state.cardRevealed = true;
  document.getElementById('reveal-next-btn').style.display = 'flex';
  document.getElementById('reveal-tap-hint').style.display = 'none';
}

function nextReveal() {
  if (!state.cardRevealed) return;
  SFX.click();

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
  state.timerPaused = false;
  state.clues = state.players.map((p, i) => ({ playerIdx: i, text: '' }));
  renderClueList();
  startTimer();
  updatePauseBtn();
}

function renderClueList() {
  const container = document.getElementById('clue-list');
  container.innerHTML = state.players.map((p, i) => {
    const clue = state.clues[i]?.text || '';
    return `
      <div class="clue-player-row" id="clue-row-${i}">
        <div class="clue-player-dot" style="background:${p.color}"></div>
        <span class="clue-player-num">${i + 1}</span>
        <span class="clue-player-name">${p.name}</span>
        <input
          class="clue-input"
          id="clue-input-${i}"
          type="text"
          placeholder="one word…"
          maxlength="24"
          autocomplete="off"
          spellcheck="false"
          value="${clue}"
          onchange="saveClue(${i}, this.value)"
          onkeydown="if(event.key==='Enter'){event.target.blur();}"
        />
      </div>
    `;
  }).join('');
}

function saveClue(playerIdx, value) {
  state.clues[playerIdx].text = value.trim();
  SFX.clue();
}

function toggleTimer() {
  if (state.timerPaused) {
    // Resume
    state.timerPaused = false;
    startTimer();
  } else {
    // Pause
    state.timerPaused = true;
    clearInterval(state.timerInterval);
  }
  updatePauseBtn();
}

function updatePauseBtn() {
  const btn = document.getElementById('pause-btn');
  if (btn) btn.textContent = state.timerPaused ? '▶ Resume' : '⏸ Pause';
}

function startTimer() {
  clearInterval(state.timerInterval);
  updateTimerUI();
  state.timerInterval = setInterval(() => {
    if (state.timerPaused) return;
    state.timerRemaining--;
    updateTimerUI();
    if (state.timerRemaining <= 10 && state.timerRemaining > 0) SFX.tick();
    if (state.timerRemaining <= 0) {
      clearInterval(state.timerInterval);
      SFX.timesUp();
      onTimerEnd();
    }
  }, 1000);
}

function updateTimerUI() {
  const t = state.timerRemaining;
  const mins = Math.floor(t / 60);
  const secs = t % 60;
  document.getElementById('timer-text').textContent = `${mins}:${secs.toString().padStart(2,'0')}`;

  const pct = t / state.timerDuration;
  const offset = CIRCUMFERENCE * (1 - pct);
  const ring = document.getElementById('timer-ring');
  if (ring) ring.style.strokeDashoffset = offset;

  let color;
  if (pct > 0.5)       color = 'var(--gold)';
  else if (pct > 0.25) color = '#d97706';
  else                 color = 'var(--red-light)';
  if (ring) ring.style.stroke = color;

  const txt = document.getElementById('timer-text');
  if (t <= 10) txt.classList.add('urgent');
  else txt.classList.remove('urgent');
}

function onTimerEnd() {
  document.getElementById('timer-text').textContent = "TIME";
  setTimeout(() => goToVoting(), 1400);
}

function skipToVote() {
  SFX.click();
  clearInterval(state.timerInterval);
  goToVoting();
}

function goToVoting() {
  if (state.votingMode === 'inperson') {
    showInPersonScreen();
  } else {
    startVotePhase();
  }
}

// ─── BUZZ-IN ──────────────────────────────────────────────────────────────────

function openBuzzModal() {
  SFX.buzz();
  // Pause timer while modal is open
  if (!state.timerPaused) {
    state.timerPaused = true;
    clearInterval(state.timerInterval);
  }
  state.buzzModalOpen = true;
  document.getElementById('buzz-modal').classList.add('visible');
  document.getElementById('buzz-input').value = '';
  document.getElementById('buzz-input').focus();
}

function closeBuzzModal() {
  state.buzzModalOpen = false;
  const m = document.getElementById('buzz-modal');
  if (m) m.classList.remove('visible');
  // Resume timer
  if (state.phase === 'clue' && state.timerRemaining > 0) {
    state.timerPaused = false;
    startTimer();
    updatePauseBtn();
  }
}

function submitBuzz() {
  const guess = document.getElementById('buzz-input').value.trim().toLowerCase();
  const answer = state.secretWord.toLowerCase();
  state.buzzModalOpen = false;
  document.getElementById('buzz-modal').classList.remove('visible');
  clearInterval(state.timerInterval);

  if (guess === answer) {
    state.imposterIndices.forEach(i => state.players[i].score += 3);
    state.civiliansWon = false;
    SFX.impWin();
    showResults(false, true);
  } else {
    state.players.forEach((p, i) => {
      if (!state.imposterIndices.includes(i)) p.score += 1;
    });
    state.civiliansWon = true;
    SFX.civWin();
    showResults(true, false, true);
  }
}

// ─── IN-PERSON VOTING ─────────────────────────────────────────────────────────

function showInPersonScreen() {
  showScreen('screen-inperson');
}

function inPersonResult(civiliansWon) {
  SFX.click();
  if (civiliansWon) {
    state.players.forEach((p, i) => {
      if (!state.imposterIndices.includes(i)) p.score += 1;
    });
    SFX.civWin();
    showResults(true);
  } else {
    state.imposterIndices.forEach(i => state.players[i].score += 2);
    SFX.impWin();
    showResults(false);
  }
}

// ─── DIGITAL VOTE ─────────────────────────────────────────────────────────────

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

  document.getElementById('vote-progress').textContent = `${idx + 1} of ${total}`;
  document.getElementById('vote-name').innerHTML =
    `<span class="reveal-player-dot" style="background:${player.color};box-shadow:0 0 8px ${player.color}66;margin-right:8px;display:inline-block;width:10px;height:10px;border-radius:50%;vertical-align:middle;position:relative;top:-2px;"></span>${player.name}`;

  document.getElementById('vote-next-btn').style.display = 'none';
  document.getElementById('vote-confirmed').style.display = 'none';

  const list = document.getElementById('vote-list');
  list.style.display = 'flex';
  list.innerHTML = state.players.map((p, i) => {
    if (i === idx) return '';
    return `
      <button class="vote-option" onclick="castVote(${i})">
        <div class="vote-option-dot" style="background:${p.color}"></div>
        <span class="vote-option-name">${p.name}</span>
        <span class="vote-option-arrow">›</span>
      </button>
    `;
  }).join('');
}

function castVote(targetIdx) {
  SFX.vote();
  state.votes[state.currentVoteIndex] = targetIdx;
  document.getElementById('vote-list').style.display = 'none';
  document.getElementById('vote-confirmed').style.display = 'flex';
  document.getElementById('vote-next-btn').style.display = 'flex';
}

function nextVote() {
  SFX.click();
  state.currentVoteIndex++;
  if (state.currentVoteIndex >= state.players.length) {
    tallyAndShowResults();
  } else {
    renderVote();
  }
}

function tallyAndShowResults() {
  const tally = new Array(state.players.length).fill(0);
  state.votes.forEach(v => { if (v >= 0) tally[v]++; });

  const maxVotes = Math.max(...tally);
  const mostVoted = tally.reduce((acc, v, i) => v === maxVotes ? [...acc, i] : acc, []);

  const civiliansWon =
    state.imposterIndices.every(i => mostVoted.includes(i)) &&
    mostVoted.length === state.imposterIndices.length;

  if (civiliansWon) {
    state.players.forEach((p, i) => {
      if (!state.imposterIndices.includes(i)) p.score += 1;
    });
    SFX.civWin();
  } else {
    state.imposterIndices.forEach(i => state.players[i].score += 2);
    SFX.impWin();
  }

  showResults(civiliansWon);
}

// ─── RESULTS ──────────────────────────────────────────────────────────────────

function showResults(civiliansWon, buzzedCorrect = false, buzzedWrong = false) {
  showScreen('screen-results');
  state.civiliansWon = civiliansWon;

  state.roundHistory.push({
    round:       state.round,
    word:        state.secretWord,
    category:    state.category,
    imposters:   state.imposterIndices.map(i => ({
      name:  state.players[i].name,
      color: state.players[i].color,
    })),
    civiliansWon,
    buzzedCorrect,
    buzzedWrong,
    clues:   state.clues.filter(c => c.text).map(c => ({
      name:  state.players[c.playerIdx]?.name || '',
      color: state.players[c.playerIdx]?.color || '#888',
      text:  c.text,
    })),
    scores: state.players.map(p => ({ name: p.name, color: p.color, score: p.score })),
  });

  const banner = document.getElementById('result-banner');
  const title  = document.getElementById('result-banner-title');
  const sub    = document.getElementById('result-banner-sub');

  banner.className = 'result-banner ' + (civiliansWon ? 'banner--civilians' : 'banner--imposter');
  title.textContent = civiliansWon ? 'Civilians Win' : 'Imposter Wins';

  if (buzzedCorrect) sub.textContent = 'The imposter cracked the code!';
  else if (buzzedWrong) sub.textContent = 'Bad buzz — civilians win!';
  else sub.textContent = civiliansWon
    ? 'The imposter has been exposed.'
    : 'The imposter stayed in the shadows.';

  document.getElementById('result-word').textContent = state.secretWord.toUpperCase();
  const imposterNames = state.imposterIndices.map(i => state.players[i].name).join(' & ');
  document.getElementById('result-imposters').textContent = imposterNames;

  // Hints reveal section
  const hintsSection = document.getElementById('result-hints-section');
  if (hintsSection) {
    const pillsHTML = state.hints.map(h => `<span class="hint-pill">${h}</span>`).join('');
    hintsSection.innerHTML = `
      <div class="section-label">Imposter's Cover Words</div>
      <div class="role-hints-words" style="justify-content:flex-start;margin-top:6px;">${pillsHTML}</div>
    `;
  }

  // Clues replay section
  const cluesSection = document.getElementById('result-clues-section');
  const filledClues = state.clues.filter(c => c.text);
  if (cluesSection) {
    if (filledClues.length > 0) {
      cluesSection.style.display = 'block';
      document.getElementById('result-clues-list').innerHTML = filledClues.map(c => {
        const p = state.players[c.playerIdx];
        const isImposter = state.imposterIndices.includes(c.playerIdx);
        return `
          <div class="clue-replay-row ${isImposter ? 'clue-replay-row--imposter' : ''}">
            <div class="tally-dot" style="background:${p.color}"></div>
            <span class="clue-replay-name">${p.name}</span>
            ${isImposter ? '<span class="tally-tag">Imposter</span>' : ''}
            <span class="clue-replay-text">"${c.text}"</span>
          </div>
        `;
      }).join('');
    } else {
      cluesSection.style.display = 'none';
    }
  }

  // Vote tally
  const tallySection = document.getElementById('tally-section');
  if (state.votingMode === 'digital' && !buzzedCorrect && !buzzedWrong) {
    tallySection.style.display = 'block';
    const tally = new Array(state.players.length).fill(0);
    state.votes.forEach(v => { if (v >= 0) tally[v]++; });

    document.getElementById('tally-list').innerHTML = [...state.players]
      .map((p, i) => ({ ...p, votes: tally[i], isImposter: state.imposterIndices.includes(i) }))
      .sort((a, b) => b.votes - a.votes)
      .map(p => `
        <div class="tally-row ${p.isImposter ? 'tally-row--imposter' : ''}">
          <div class="tally-dot" style="background:${p.color}"></div>
          <span class="tally-name">${p.name}</span>
          ${p.isImposter ? '<span class="tally-tag">Imposter</span>' : ''}
          <span class="tally-votes">${p.votes}v</span>
        </div>
      `).join('');
  } else {
    tallySection.style.display = 'none';
  }

  renderScoreboard();
  document.getElementById('round-num').textContent = state.round;
}

function renderScoreboard() {
  const sorted = [...state.players]
    .map((p, i) => ({ ...p, origIdx: i }))
    .sort((a, b) => b.score - a.score);

  document.getElementById('score-list').innerHTML = sorted.map((p, rank) => `
    <div class="score-row ${rank === 0 ? 'score-row--first' : ''}">
      <span class="score-rank">${rank === 0 ? '✦' : `#${rank + 1}`}</span>
      <div class="score-dot" style="background:${p.color}"></div>
      <span class="score-name">${p.name}</span>
      <span class="score-pts" style="${rank !== 0 ? 'color:var(--muted-light)' : ''}">${p.score} <small style="font-size:0.6rem;font-weight:400;font-style:normal;color:var(--muted)">pts</small></span>
    </div>
  `).join('');
}

function playAgain() {
  SFX.click();
  clearInterval(state.timerInterval);
  initSetup();
}

// ─── ROUND HISTORY ────────────────────────────────────────────────────────────

function showHistory() {
  SFX.click();
  showScreen('screen-history');
  renderHistory();
}

function renderHistory() {
  const container = document.getElementById('history-list');

  if (!state.roundHistory || state.roundHistory.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:32px 0;color:var(--muted);font-style:italic;font-size:0.8rem;">
        No rounds played yet.
      </div>`;
    return;
  }

  container.innerHTML = [...state.roundHistory].reverse().map(r => {
    const outcome = r.buzzedCorrect
      ? { label: 'Imposter Buzzed In', cls: 'outcome--imposter' }
      : r.buzzedWrong
        ? { label: 'Bad Buzz — Civilians Win', cls: 'outcome--civilians' }
        : r.civiliansWon
          ? { label: 'Civilians Won', cls: 'outcome--civilians' }
          : { label: 'Imposter Won', cls: 'outcome--imposter' };

    const imposterDots = r.imposters.map(imp =>
      `<span class="hist-dot" style="background:${imp.color}" title="${imp.name}"></span>`
    ).join('');

    const imposterNames = r.imposters.map(i => i.name).join(' & ');

    // Clue replay
    const clueHTML = (r.clues && r.clues.length > 0)
      ? `<div class="hist-clues">
          ${r.clues.map(c => `
            <span class="hist-clue-chip" style="border-color:${c.color}22;color:var(--cream);">
              <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${c.color};margin-right:4px;vertical-align:middle;position:relative;top:-1px;"></span>${c.text}
            </span>
          `).join('')}
        </div>`
      : '';

    return `
      <div class="hist-card">
        <div class="hist-header">
          <div class="hist-round">Round ${r.round}</div>
          <div class="hist-outcome ${outcome.cls}">${outcome.label}</div>
        </div>

        <div class="hist-word">${r.word.toUpperCase()}</div>
        <div class="hist-category">${r.category}</div>

        <div class="hist-row">
          <span class="hist-label">Imposter</span>
          <span class="hist-val">
            ${imposterDots}
            <span style="margin-left:6px;">${imposterNames}</span>
          </span>
        </div>

        ${clueHTML}

        <div class="hist-scores">
          ${r.scores
            .sort((a, b) => b.score - a.score)
            .map((p, i) => `
              <div class="hist-score-row">
                <span class="hist-score-rank">${i === 0 ? '✦' : `#${i+1}`}</span>
                <span class="hist-score-dot" style="background:${p.color}"></span>
                <span class="hist-score-name">${p.name}</span>
                <span class="hist-score-pts" style="${i === 0 ? 'color:var(--gold)' : 'color:var(--muted-light)'}">${p.score}pts</span>
              </div>
            `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function clearHistory() {
  state.roundHistory = [];
  renderHistory();
  showToast('Round history cleared.');
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
  initTheme();
  showScreen('screen-landing');
  document.getElementById('btn-view-scores').style.display = 'none';
  document.getElementById('btn-history').style.display = 'none';
});
