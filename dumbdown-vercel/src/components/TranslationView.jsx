import { useState, useEffect } from "react";
import { translatePaper } from "../services/api";
import "./TranslationView.css";

const DIFF_COLORS = (n) => {
  if (n <= 3) return 'var(--teal)';
  if (n <= 6) return 'var(--yellow)';
  return 'var(--red)';
};

function DiffMeter({ value, max = 10 }) {
  return (
    <div className="diff-meter">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className="diff-dot"
          style={{ background: i < value ? DIFF_COLORS(value) : '#e0e0d0' }}
        />
      ))}
      <span className="diff-num">{value}/10</span>
    </div>
  );
}

export default function TranslationView({ paper, audience, translation, onTranslated, onQuiz, onBack }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const AUD_LABELS = { kid: '🧒 Kid (8-12)', teen: '👦 Teen (13-17)', adult: '🧑 Adult' };

  const translate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await translatePaper(paper.title, paper.summary, audience);
      onTranslated(result);
    } catch (e) {
      setError('Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!translation) { translate(); }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <nav className="topnav">
        <div className="topnav-logo">🔬 <span>Dumb</span>Down</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <span className="badge badge-teal">{AUD_LABELS[audience]}</span>
          <button className="btn btn-ghost" onClick={onBack} style={{ color: '#fff' }}>← Back</button>
        </div>
      </nav>

      <div className="page">
        {/* Original paper header */}
        <div className="orig-paper animate-pop">
          <div className="orig-label">📄 Original Paper</div>
          <h2 className="orig-title">{paper.title}</h2>
          <p className="orig-authors">✍️ {paper.authors?.slice(0, 80)}</p>
          <div className="orig-abstract">
            <span className="orig-abstract-label">Abstract (the scary version):</span>
            <p className="orig-abstract-text">{paper.summary?.slice(0, 300)}…</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="translate-arrow animate-pop animate-delay-1">
          <div className="arrow-line" />
          <div className="arrow-label">🪄 AI Magic Happening</div>
          <div className="arrow-line" />
        </div>

        {loading && (
          <div className="loading-state animate-pop">
            <div className="spinner" />
            <div className="loading-msgs">
              <p className="loading-main">Translating science into fun…</p>
              <p className="loading-sub">Finding the perfect analogy for <em>{audience === 'kid' ? 'an 8-year-old' : audience === 'teen' ? 'a teenager' : 'a non-scientist'}</em>…</p>
            </div>
            <div className="loading-steps">
              {['📥 Fetching the big idea…', '🗺️ Building analogy map…', '📖 Writing the story…', '✅ Simplifying jargon…'].map((s, i) => (
                <div key={i} className="loading-step" style={{ animationDelay: `${i * 0.4}s` }}>
                  <div className="step-dot" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="error-box" style={{ marginTop: 24 }}>
            ⚠️ {error}
            <button className="btn btn-orange" onClick={translate} style={{ marginLeft: 16 }}>Retry</button>
          </div>
        )}

        {translation && !loading && (
          <div className="translation-result animate-pop">
            {/* Headline */}
            <div className="tl-headline-card animate-pop animate-delay-1">
              <div className="tl-emoji">{translation.emoji_summary}</div>
              <h1 className="tl-headline">{translation.headline}</h1>
              <p className="tl-tldr">{translation.tldr}</p>
            </div>

            <div className="tl-grid animate-pop animate-delay-2">
              {/* Analogy */}
              <div className="thought-bubble tl-analogy">
                <div className="tl-section-label">💡 The Analogy</div>
                <p className="tl-analogy-text">{translation.analogy}</p>
              </div>

              {/* Story */}
              <div className="card tl-story">
                <div className="card-header" style={{ background: 'var(--yellow)' }}>
                  📖 The Story Version
                </div>
                <div className="card-body">
                  <p className="tl-story-text">{translation.story}</p>
                </div>
              </div>

              {/* Wow factor */}
              <div className="card tl-wow">
                <div className="card-header" style={{ background: 'var(--teal)' }}>
                  🌟 Why It Matters
                </div>
                <div className="card-body">
                  <p>{translation.wow_factor}</p>
                </div>
              </div>

              {/* Fun fact */}
              <div className="card tl-funfact">
                <div className="card-header" style={{ background: 'var(--orange)', color: 'white' }}>
                  🤯 Bonus Fun Fact
                </div>
                <div className="card-body">
                  <p>{translation.fun_fact}</p>
                </div>
              </div>
            </div>

            {/* Difficulty comparison */}
            <div className="diff-compare card animate-pop animate-delay-3">
              <div className="card-header">📊 Difficulty Meter</div>
              <div className="card-body diff-compare-body">
                <div className="diff-col">
                  <span className="diff-col-label">Original paper</span>
                  <DiffMeter value={translation.difficulty_before} />
                </div>
                <div className="diff-vs">→</div>
                <div className="diff-col">
                  <span className="diff-col-label">Our translation</span>
                  <DiffMeter value={translation.difficulty_after} />
                </div>
                <div className="diff-badge">
                  🎉 {translation.difficulty_before - translation.difficulty_after}x simpler!
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="tl-actions animate-pop animate-delay-4">
              <button className="btn btn-yellow btn-large" onClick={onQuiz}>
                🧠 Test Your Knowledge (Quiz!)
              </button>
              <button className="btn btn-ghost btn-large" onClick={onBack}>
                📚 Translate Another Paper
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
