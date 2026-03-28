import "./HeroSection.css";

const EXAMPLES = [
  { jargon: "Gravitational tidal forces cause spaghettification near singularities", simple: "A cosmic tug-of-war stretches you like silly putty near a black hole! 🍝" },
  { jargon: "Mitochondrial ATP synthesis via oxidative phosphorylation", simple: "Your cell's tiny power plant burns food to make energy batteries! ⚡🔋" },
  { jargon: "Transformer self-attention mechanisms learn contextual embeddings", simple: "The AI reads a sentence like you scan a crowd — noticing who stands next to who! 👀" },
];

export default function HeroSection({ onStart }) {
  return (
    <div className="hero-wrap">
      <nav className="topnav">
        <div className="topnav-logo">🔬 <span>Dumb</span>Down
        </div>
        <span style={{ color: '#aaa', fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>
          ET AI Hackathon 2026
        </span>
      </nav>

      <div className="hero-main">
        <div className="hero-badge animate-pop">
          <span>✨</span> AI-Powered Science for Everyone
        </div>

        <h1 className="hero-title animate-pop animate-delay-1">
          Big Science.<br />
          <span className="hero-title-accent">Simple Words.</span>
        </h1>

        <p className="hero-sub animate-pop animate-delay-2">
          We take the most complex academic research papers from ArXiv and
          translate them into fun, easy stories — perfect for kids, teens, and
          curious adults. No PhD required. 🎓→😄
        </p>

        <div className="hero-cta animate-pop animate-delay-3">
          <button className="btn btn-yellow btn-large" onClick={onStart}>
            🚀 Start Translating
          </button>
          <span className="hero-free-tag">Free • No signup • 5 science categories</span>
        </div>

        <div className="hero-examples animate-pop animate-delay-4">
          <p className="examples-label">Real examples →</p>
          <div className="examples-grid">
            {EXAMPLES.map((ex, i) => (
              <div key={i} className="example-card">
                <div className="ex-before">
                  <span className="ex-label ex-label-red">😵 Before</span>
                  <p className="ex-text ex-jargon">"{ex.jargon}"</p>
                </div>
                <div className="ex-arrow">→</div>
                <div className="ex-after">
                  <span className="ex-label ex-label-green">😊 After</span>
                  <p className="ex-text ex-simple">"{ex.simple}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-stats animate-pop" style={{ animationDelay: '0.5s' }}>
          {[
            { num: '14+', label: 'Science fields' },
            { num: '3', label: 'Audience levels' },
            { num: '∞', label: 'Papers to explore' },
            { num: '0', label: 'Jargon allowed' },
          ].map((s, i) => (
            <div key={i} className="stat-box">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-deco hero-deco-1">⚛️</div>
      <div className="hero-deco hero-deco-2">🧬</div>
      <div className="hero-deco hero-deco-3">🌌</div>
      <div className="hero-deco hero-deco-4">🤖</div>
    </div>
  );
}
