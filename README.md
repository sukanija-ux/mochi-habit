# Mochi — A gentle habit coach

A Ghibli-inspired habit tracker. Habits grow as mochi creatures on a small island.

---

## Part 1 — Push to GitHub (5 min)

### 1. Create the repository
1. Open [github.com/new](https://github.com/new)
2. Repository name: `mochi-habit`
3. Set to **Public** (required for free GitHub Pages)
4. Click **Create repository** — do NOT add a README

### 2. Push from your Mac
Copy the two commands GitHub shows you after creating the repo. They look like:

```bash
git remote add origin https://github.com/YOUR_USERNAME/mochi-habit.git
git push -u origin main
```

Run them in Terminal inside this folder (`/Users/sukanijathillainadarasan/python`).

> The files are already staged and committed — just `git push`.

### 3. Enable GitHub Pages (free web hosting)
1. In your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)` → **Save**
4. In 1–2 minutes your app is live at:
   `https://YOUR_USERNAME.github.io/mochi-habit/`

---

## Part 2 — iOS app on TestFlight (30–60 min)

### What you need
- [Xcode](https://apps.apple.com/app/xcode/id497799835) — free, ~7 GB from the App Store
- [Apple Developer account](https://developer.apple.com/enroll/) — $99/year (required for TestFlight)

---

### Step 1 — Install Xcode
Download from the Mac App Store. Open it once to finish installation.

### Step 2 — Create a new Xcode project
1. Xcode → **File → New → Project**
2. Choose **iOS → App** → Next
3. Fill in:
   - Product Name: `Mochi`
   - Team: *(your Apple Developer team)*
   - Organization Identifier: `com.yourname` (e.g. `com.sukani`)
   - Bundle Identifier will become: `com.yourname.Mochi`
   - Interface: **SwiftUI**
   - Language: **Swift**
4. Save to a folder (e.g. Desktop)

### Step 3 — Replace the generated files
Delete `ContentView.swift` from the project (move to trash).

Then drag these files **into the Xcode project** (check ✅ "Copy items if needed"):
```
ios/Mochi/MochiApp.swift
ios/Mochi/ContentView.swift
```

### Step 4 — Add the web app
Drag `index.html` into the Xcode project:
- Check ✅ "Copy items if needed"
- Check ✅ "Add to target: Mochi"
- Click Finish

> This bundles the full app inside the iOS binary — works offline, no server needed.

### Step 5 — Set deployment target
1. Click the project name (top of the file tree) → **Mochi** target
2. General tab → Minimum Deployments → **iOS 16.0**

### Step 6 — Add the launch background colour (optional but clean)
1. Click `Assets.xcassets`
2. **+** → **New Color Set** → name it `LaunchBackground`
3. Set the colour to `#F7F2E5` (the app's cream background)

### Step 7 — Build and test on your iPhone
1. Plug in your iPhone
2. Select your device in the toolbar (top left of Xcode)
3. ▶ Run — the app installs on your phone
4. You may need to trust the developer certificate:  
   iPhone → Settings → General → VPN & Device Management → trust your email

### Step 8 — Archive for TestFlight
1. Unplug your phone (or keep it connected — either works)
2. In Xcode toolbar: select **Any iOS Device (arm64)** as destination
3. **Product → Archive** — this builds the release version (~2 min)
4. When the Organizer opens, click **Distribute App**
5. Choose **App Store Connect** → Next → Upload → Next → Next → Upload

### Step 9 — TestFlight
1. Open [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Your app will appear under **My Apps** (create it if first time)
3. Go to **TestFlight** tab → **Internal Testing**
4. Add yourself as a tester using your Apple ID
5. Open **TestFlight** app on your iPhone → install Mochi

---

## Cloudflare Worker (optional — enables Claude AI in Coach tab)

The Coach tab works with smart template responses without the worker.
To enable full Claude AI:

```bash
npm install -g wrangler
wrangler login
wrangler deploy          # deploys worker.js
wrangler secret put ANTHROPIC_API_KEY   # paste your sk-ant-… key
```

Then paste the worker URL into `index.html`:
```js
const MOCHI_COACH_URL = 'https://mochi-coach.YOUR_SUBDOMAIN.workers.dev';
```

Commit and push — GitHub Pages auto-updates. For the iOS app, drag the updated `index.html` back into Xcode and re-archive.

---

## Project structure

```
mochi-habit/
├── index.html          ← the entire web app (React, Babel, inline)
├── worker.js           ← Cloudflare Worker proxy for Claude API
├── wrangler.toml       ← Cloudflare deployment config
├── ios/
│   └── Mochi/
│       ├── MochiApp.swift      ← @main entry point
│       ├── ContentView.swift   ← WKWebView wrapper
│       └── Info.plist          ← iOS app config
└── README.md
```
