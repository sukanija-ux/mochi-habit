<div align="center">

# 🌊 Mochi

**A gentle, Ghibli-inspired habit tracker where your habits grow as living creatures.**

[![Live demo](https://img.shields.io/badge/Live%20demo-sukanija--ux.github.io-8FA77F?style=flat-square)](https://sukanija-ux.github.io/mochi-habit/)
[![iOS](https://img.shields.io/badge/iOS-16%2B-black?style=flat-square&logo=apple)](ios/)
[![License](https://img.shields.io/badge/license-MIT-B8A4C4?style=flat-square)](LICENSE)

</div>

---

## What is it?

Mochi is a habit tracker built around one idea from *Atomic Habits*: **identity over outcomes**. Instead of tracking streaks as numbers, each habit hatches a mochi creature that grows, drifts, and eventually transforms as you tend it over 90 days.

| Today | Garden | Insights | Coach |
|---|---|---|---|
| Island scene with your mochi floating in the sea | Village panorama with all creatures | Weekly bar chart, habit tips, friends leaderboard | AI-powered habit coach (Claude), template fallback offline |

### Features

- **5 mochi max** — the island only holds so many souls at once
- **6 growth stages** — Seed → Hatchling → Growing → Awake → Ascending → ✦ Transformed (90 days)
- **Daily or weekly habits** — not every practice needs every day
- **Habit hints** — curated tips and book recommendations per habit theme
- **Accountability circle** — friend-only leaderboard, no peer pressure
- **Japanese name styling** — your name gets a kanji companion character
- **Fully offline** — all data stays on device, no account needed
- **Ghibli palette** — *Kiki's Delivery Service* + *The Boy and the Heron* inspired

---

## Tech

| Layer | Stack |
|---|---|
| Web app | React 18 (Babel standalone, no build step) |
| Styling | Pure CSS custom properties, Newsreader serif |
| Storage | `localStorage` — no backend, no account |
| AI coach | Cloudflare Worker → Anthropic Claude API |
| iOS | SwiftUI `WKWebView` wrapper |
| Hosting | GitHub Pages |

The entire web app is a **single `index.html` file** — open it in any browser, drag it into Xcode, done.

---

## Run locally

```bash
python3 -m http.server 3000
# → open http://localhost:3000
```

---

## Deploy to GitHub Pages

Push to `main` and enable Pages in repo settings (Source: `main` / `/ root`). Every push auto-deploys in ~60 seconds.

**Live at:** `https://sukanija-ux.github.io/mochi-habit/`

---

## iOS app (TestFlight)

The `ios/` folder contains a SwiftUI wrapper that loads `index.html` from the app bundle — fully native, fully offline.

**You need:**
- [Xcode](https://apps.apple.com/app/xcode/id497799835) (free, Mac App Store, ~7 GB)
- [Apple Developer account](https://developer.apple.com/enroll/) ($99/year — required for TestFlight)

### Setup in Xcode

```
1.  File → New → Project → iOS → App
    Product Name: Mochi
    Interface: SwiftUI   Language: Swift

2.  Delete the generated ContentView.swift

3.  Drag in:
      ios/Mochi/MochiApp.swift
      ios/Mochi/ContentView.swift
    ✅ Copy items if needed

4.  Drag in: index.html
    ✅ Copy items if needed
    ✅ Add to target: Mochi

5.  Project settings → General → Minimum Deployments → iOS 16.0

6.  ▶ Run on your iPhone to test
```

### Upload to TestFlight

```
1.  Xcode toolbar → destination: Any iOS Device (arm64)
2.  Product → Archive  (~2 min)
3.  Organizer → Distribute App → App Store Connect → Upload
4.  appstoreconnect.apple.com → TestFlight → add yourself as tester
5.  Open TestFlight app on iPhone → install Mochi ✓
```

> **Updating:** when you change `index.html`, drag the new version into Xcode and re-archive. The GitHub Pages version updates automatically on push.

---

## Claude AI Coach (optional)

The Coach tab works offline with smart template responses. To enable full Claude AI, deploy the included Cloudflare Worker:

```bash
npm install -g wrangler
wrangler login
wrangler deploy
wrangler secret put ANTHROPIC_API_KEY    # paste your sk-ant-… key
```

Then set the worker URL in `index.html` (line 147):

```js
const MOCHI_COACH_URL = 'https://mochi-coach.YOUR_SUBDOMAIN.workers.dev';
```

Push → GitHub Pages updates automatically. Re-archive in Xcode for the iOS build.

The worker enforces **habit-coaching only** — Mochi won't discuss anything outside streaks, motivation, and tending habits.

---

## Project structure

```
mochi-habit/
├── index.html          ← entire web app (React + Babel, no build step)
├── worker.js           ← Cloudflare Worker — Claude API proxy
├── wrangler.toml       ← Cloudflare deploy config
├── ios/
│   └── Mochi/
│       ├── MochiApp.swift      ← @main SwiftUI entry point
│       ├── ContentView.swift   ← WKWebView wrapper
│       ├── Info.plist          ← iOS app configuration
│       └── Assets.xcassets/    ← app icon placeholder
└── README.md
```

---

## Roadmap

- [ ] App icon (mochi creature, Ghibli palette)
- [ ] Push notifications — stacked habit reminders
- [ ] Sign in with Apple + iCloud sync
- [ ] Friend invites for the accountability circle
- [ ] Native SwiftUI rebuild for App Store submission
- [ ] Mochi transformation animation at day 90

---

<div align="center">

*"You do not rise to the level of your goals. You fall to the level of your systems."*
— James Clear

</div>
