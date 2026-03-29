# 🔬 DumbDown — Science Translator

> **ET AI Hackathon 2026 | Problem Statement 8 — AI-Native News Experience**

Turn complex academic research into fun, simple stories for kids, teens, and curious adults. No PhD required.

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-dumbdown.vercel.app-FF6B35?style=for-the-badge)](https://dumbdown.vercel.app)
[![PS 8](https://img.shields.io/badge/PS%208-AI--Native%20News%20Experience-1E3A5F?style=for-the-badge)](https://economictimes.com)
[![Built with React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

---

## 🏆 Hackathon Context

| Field | Details |
|-------|---------|
| **Event** | ET AI Hackathon 2026 |
| **Organizer** | The Economic Times |
| **Hiring Partner** | Avataar.ai |
| **Hackathon Partner** | Unstop |
| **Problem Statement** | **#8 — AI-Native News Experience** |
| **PS Direction** | Explainer-first content · Personalized newsroom · AI-adapted science stories |
| **Live URL** | [dumbdown.vercel.app](https://dumbdown.vercel.app) |

---

## 🎯 Problem Statement 8 — How We Address It

> *"Business news in 2026 is still delivered like it's 2005 — static text articles, one-size-fits-all homepage, same format for everyone. Build something that makes people say 'I can't go back to reading news the old way.'"*
> — ET AI Hackathon 2026, PS 8

DumbDown targets the **"My ET — explainer-first content"** direction of PS 8. Instead of a static, jargon-heavy science article, every ArXiv paper is transformed into a:

- 🧒 **Kid story** — Fun analogies, Grade 3 level, toy/food/animal comparisons
- 👦 **Teen explainer** — Real-world relevance, Grade 8 level, why it matters
- 🧑 **Adult brief** — Smart, jargon-free, Grade 10 level — no dumbing down

Plus an interactive **knowledge quiz** — making science discovery genuinely fun, not just readable.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📚 Live ArXiv Papers | Fetches today's latest research across 5 science categories |
| 🪄 AI Translation | Gemini 2.5 Flash generates 9-component personalized explanations |
| 👥 3 Audience Levels | Kid / Teen / Adult — separate AI personas, different reading levels |
| 📊 Difficulty Meter | Visual before/after complexity comparison |
| 🧠 Knowledge Quiz | 3-question AI quiz with explanations and scoring |
| 🔄 Smart Fallback | 16 curated landmark papers if ArXiv is unreachable |
| 📱 Fully Responsive | Works on mobile, tablet, and desktop |

---

## 🗂️ Science Categories

| Category | ArXiv Query |
|----------|------------|
| 🤖 AI & Machine Learning | cs.AI, cs.LG |
| 🌌 Space & Astrophysics | astro-ph, gr-qc |
| 🧬 Biology | q-bio, cond-mat.soft |
| ⚛️ Physics & Quantum | physics, quant-ph |
| 🧪 Chemistry & Materials | cond-mat, physics.chem-ph |

---

## 🛠️ Tech Stack

```
Frontend     →  React 18 + Vite 5 (SPA with client-side routing)
Styling      →  Custom CSS — neo-brutalist design system with CSS variables
Backend      →  Vercel Serverless Functions (Node.js CommonJS)
AI Engine    →  Google Gemini 2.5 Flash (JSON mode, engineered prompts)
Data Source  →  ArXiv.org Open API (live papers, XML → parsed JSON)
Deployment   →  Vercel — unified frontend + serverless, auto-deploy on push
```

---

## 📁 Project Structure

```
dumbdown/
├── api/                          # Vercel serverless functions (CommonJS)
│   ├── papers.js                 # GET  /api/papers — ArXiv fetch + XML parse
│   ├── translate.js              # POST /api/translate — Gemini AI translation
│   ├── quiz.js                   # POST /api/quiz — AI quiz generation
│   └── package.json              # Serverless runtime deps (axios, xml2js)
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx       # Landing page with examples and stats
│   │   ├── PaperBrowser.jsx      # Category tabs + paper cards
│   │   ├── TranslationView.jsx   # 9-component AI translation display
│   │   └── QuizView.jsx          # Interactive MCQ quiz with scoring
│   ├── services/
│   │   └── api.js                # Frontend API fetch wrappers
│   ├── App.jsx                   # Root — view state machine
│   └── App.css                   # Design tokens, animations, utilities
├── index.html
├── vite.config.js
├── vercel.json                   # /api/* → functions | /* → React SPA
├── package.json                  # Frontend deps (react, vite)
├── .gitignore                    # Blocks .env, node_modules, dist
└── .env.example                  # Documents GEMINI_API_KEY (no real values)
```

---

## 🔁 How It Works

```
User selects category & paper
          ↓
GET /api/papers?category=ai
          ↓
ArXiv XML API → xml2js parse → 6 latest papers returned
          ↓
User selects audience & clicks Translate
          ↓
POST /api/translate { title, summary, audience }
          ↓
Gemini 2.5 Flash (JSON mode) → 9-field structured response
{ headline, tldr, analogy, story, wow_factor,
  fun_fact, emoji_summary, difficulty_before, difficulty_after }
          ↓
User clicks "Test Your Knowledge"
          ↓
POST /api/quiz { title, translation }
          ↓
Gemini generates 3 MCQ questions → interactive quiz with score + explanations
```

---

## 🚀 Deploy Your Own (5 Minutes)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/dumbdown.git
git branch -M main
git push -u origin main
```

### 2. Import on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Leave all settings as default (Vercel auto-detects Vite)
4. Click **Deploy**

### 3. Add Environment Variable

Vercel → Project → **Settings → Environment Variables**:

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | Free key from [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |

Then **Deployments → Redeploy** to pick up the key. Done! 🎉

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Create local env (never commit this)
echo "GEMINI_API_KEY=your_key_here" > .env

# Run with Vercel CLI (includes local serverless functions)
npm install -g vercel
vercel dev

# Frontend only (API calls fail without local functions)
npm run dev
```

---

## 🐛 Issues Solved During Build

| Problem | Fix |
|---------|-----|
| Gemini returning JSON inside markdown code blocks | `responseMimeType: 'application/json'` + fence stripping |
| JSON truncated at 1024 tokens mid-response | Raised `maxOutputTokens` to 2048 |
| Serverless crash — `axios`/`xml2js` not found | Added `api/package.json` with runtime deps |
| Vercel 404 — wrong subfolder as project root | Set Root Directory in Vercel dashboard settings |
| ArXiv API timeouts | 7-second timeout + 16-paper curated fallback dataset |

---

## 📊 Impact Model

| Metric | Estimate |
|--------|----------|
| Time saved per paper | ~7-10 minutes vs. reading raw abstract |
| Papers translated/day (10k DAU) | ~25,000 translations |
| Time saved/day | ~175,000 minutes = 2,917 hours |
| AI cost per translation | ~$0.001 (Gemini Flash) |
| Target demographic | 260M+ Indian students, ET's Gen Z audience |

---

## 📋 Submission Checklist

- [x] ✅ **GitHub Repository** — Public repo, full source code, commit history
- [x] ✅ **README** — Setup instructions, architecture, deploy guide
- [x] ✅ **Working Demo** — Live at [dumbdown.vercel.app](https://dumbdown.vercel.app)
- [x] ✅ **Architecture Document** — See project report (Section 5)
- [x] ✅ **Impact Model** — See project report (Section 7)
- [ ] ⏳ **3-Minute Pitch Video** — Record walkthrough of live demo

---

## 🔑 Getting a Free Gemini API Key

1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with Google → **Create API Key**
3. Add to Vercel: Settings → Environment Variables → `GEMINI_API_KEY`

---

## 📄 License

MIT — free to use, modify, and deploy.

---

<p align="center">
  <strong>ET AI Hackathon 2026 · Problem Statement 8 · AI-Native News Experience</strong><br/>
  Built with React, Gemini AI, and deployed on Vercel<br/>
  <a href="https://dumbdown.vercel.app">dumbdown.vercel.app</a>
</p>
