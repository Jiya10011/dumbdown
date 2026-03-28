# DumbDown — Science Translator 🔬

Turn complex academic papers from ArXiv into fun, simple stories for kids, teens, and adults. Powered by Gemini AI.

## 🚀 Deploy to Vercel (5 minutes)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/dumbdown.git
git push -u origin main
```

### 2. Import on Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. **No framework preset needed** — Vercel auto-detects Vite

### 3. Add Environment Variable
In Vercel → Project → **Settings → Environment Variables**:
| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | your key from [aistudio.google.com](https://aistudio.google.com/app/apikey) |

### 4. Deploy
Click **Deploy** — done! ✅

---

## 🛠️ Local Development

```bash
npm install
```

Create a `.env` file (never commit this):
```
GEMINI_API_KEY=your_key_here
```

Install Vercel CLI for local API testing:
```bash
npm i -g vercel
vercel dev
```

Or just run the frontend (API calls will fail without the key):
```bash
npm run dev
```

## 📁 Project Structure

```
dumbdown/
├── api/                  # Vercel serverless functions
│   ├── papers.js         # Fetches ArXiv papers
│   ├── translate.js      # Translates papers via Gemini
│   └── quiz.js           # Generates quiz questions
├── src/                  # React frontend
│   ├── components/       # UI components
│   ├── services/api.js   # Frontend API calls
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── vercel.json           # Vercel routing config
└── package.json
```

## 🔑 Getting a Gemini API Key (Free)
1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click **Create API Key**
3. Copy and add to Vercel environment variables
