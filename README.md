# 🔴 Who's the Imposter?

A dark, moody social deduction party game inspired by *Search the Imposter Who?*  
Built with plain HTML + CSS + JS. No frameworks. No installs. Just open and play.

---

## 🎮 How to Play

1. **Setup** — Enter player names, pick a category, set the timer
2. **Role Reveal** — Pass the phone. Each player taps to see their role:
   - 🟢 **Civilians** see the secret word
   - 🔴 **The Imposter** only sees the category — not the word
3. **Clue Phase** — Going around the table, each player gives **one word** as a clue. The timer counts down. The imposter must fake it without knowing the word.
4. **Vote** — Pass the phone. Each player secretly votes for who they think is the imposter.
5. **Results** — Votes are revealed. Imposter exposed? Civilians win. Imposter survives? Imposter wins.

### Scoring
| Outcome | Points |
|---|---|
| Civilians catch the imposter | Each civilian +1 pt |
| Imposter survives | Imposter +2 pts |

---

## 📁 File Structure

```
whos-the-imposter/
├── index.html   — all game screens (landing, setup, reveal, clue, vote, results)
├── style.css    — dark moody design (Among Us-inspired)
├── game.js      — all game logic and state machine
├── words.js     — word bank (8 categories × 15 words)
└── README.md    — this file
```

---

## 🚀 Running Locally

No build step needed. Just open `index.html` in your browser:

```bash
# Option A: double-click index.html

# Option B: use VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

# Option C: Python quick server
python3 -m http.server 3000
# then open http://localhost:3000
```

---

## ☁️ Deploy to Netlify

1. Push this folder to a GitHub repo
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Select your repo
4. Build command: *(leave blank)*
5. Publish directory: `.` (or the folder name)
6. Click **Deploy** — done ✅

### Deploy to Vercel
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import repo
3. Framework Preset: **Other**
4. Click **Deploy** ✅

---

## 🛠 Customizing

### Add more words
Edit `words.js` — each category is an array of strings. Add as many as you like.

### Add a new category
```js
"🎵 Music": [
  "guitar", "symphony", "vinyl", "bassline", "chorus", ...
],
```
Then add an `<option>` for it in `index.html` inside `#category-select`.

### Change the timer defaults
In `index.html`, edit the `<option>` values inside `#timer-select`.

### Change imposter count rules
In `game.js`, edit the `IMPOSTER_COUNT` object at the top:
```js
const IMPOSTER_COUNT = { 3:1, 4:1, 5:1, 6:1, 7:2, 8:2, 9:2, 10:3, 11:3, 12:3 };
```

---

## 🔜 Future: Online Multiplayer
The local mode is complete. Online mode (room codes, real-time sync) will use **Firebase Realtime Database**.  
See the `online-mode` branch when it's ready.

---

## 📄 License
MIT — do whatever you want with it.
