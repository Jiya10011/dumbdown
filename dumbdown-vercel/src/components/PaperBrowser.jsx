import { useState, useEffect } from "react";
import { fetchPapers } from "../services/api";
import "./PaperBrowser.css";

const CATEGORIES = [
  { id: 'ai',      label: '🤖 AI & ML',       color: '#7b2d8b' },
  { id: 'space',   label: '🌌 Space',          color: '#0077b6' },
  { id: 'bio',     label: '🧬 Biology',        color: '#06d6a0' },
  { id: 'physics', label: '⚛️ Physics',        color: '#ff6b35' },
  { id: 'chem',    label: '🧪 Chemistry',      color: '#e63946' },
];

const AUDIENCES = [
  { id: 'kid',   label: '🧒 Kid (8-12)',    desc: 'Fun stories & analogies' },
  { id: 'teen',  label: '👦 Teen (13-17)',   desc: 'Deeper why + relevance' },
  { id: 'adult', label: '🧑 Adult',          desc: 'Smart non-expert' },
];

export default function PaperBrowser({ onSelect, audience, setAudience, onBack }) {
  const [category, setCategory] = useState('ai');
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async (cat) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPapers(cat);
      setPapers(data);
    } catch (e) {
      setError('Failed to load papers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(category); }, [category]);

  return (
    <div>
      <nav className="topnav">
        <div className="topnav-logo" onClick={onBack}>🔬 <span>Dumb</span>Down</div>
        <button className="btn btn-ghost" onClick={onBack} style={{ color: '#fff' }}>← Home</button>
      </nav>

      <div className="page-wide">
        <div className="browser-header animate-pop">
          <h2 className="browser-title">Choose a Paper to Translate</h2>
          <p className="browser-sub">Browse the latest research from ArXiv — we'll make it simple!</p>
        </div>

        {/* Audience picker */}
        <div className="section-block animate-pop animate-delay-1">
          <h3 className="section-label">👥 Who's reading?</h3>
          <div className="audience-grid">
            {AUDIENCES.map(a => (
              <button
                key={a.id}
                className={`audience-btn ${audience === a.id ? 'audience-btn-active' : ''}`}
                onClick={() => setAudience(a.id)}
              >
                <span className="audience-label">{a.label}</span>
                <span className="audience-desc">{a.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="section-block animate-pop animate-delay-2">
          <h3 className="section-label">📚 Science category</h3>
          <div className="cat-tabs">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`cat-tab ${category === c.id ? 'cat-tab-active' : ''}`}
                style={category === c.id ? { background: c.color, color: 'white', borderColor: '#1a1a2e' } : {}}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Papers */}
        {loading && (
          <div className="papers-loading">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="paper-skeleton">
                <div className="loading-skeleton" style={{ height: 20, width: '80%', marginBottom: 12 }} />
                <div className="loading-skeleton" style={{ height: 14, width: '100%', marginBottom: 8 }} />
                <div className="loading-skeleton" style={{ height: 14, width: '90%', marginBottom: 8 }} />
                <div className="loading-skeleton" style={{ height: 14, width: '60%' }} />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="error-box">
            ⚠️ {error}
            <button className="btn btn-orange" onClick={() => load(category)} style={{ marginLeft: 16 }}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid-3 animate-pop animate-delay-3">
            {papers.map((paper, i) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                index={i}
                onSelect={() => onSelect(paper)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PaperCard({ paper, index, onSelect }) {
  const [expanded, setExpanded] = useState(false);
  const shortSummary = paper.summary?.slice(0, 180) + (paper.summary?.length > 180 ? '…' : '');

  return (
    <div
      className="paper-card animate-pop"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className="paper-card-top">
        <div className="paper-meta">
          <span className="paper-date">📅 {paper.published}</span>
        </div>
        <h3 className="paper-title">{paper.title}</h3>
        <p className="paper-authors">✍️ {paper.authors?.slice(0, 60)}{paper.authors?.length > 60 ? '…' : ''}</p>
      </div>
      <div className="paper-summary">
        <p>{expanded ? paper.summary : shortSummary}</p>
        {paper.summary?.length > 180 && (
          <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? '▲ Less' : '▼ More'}
          </button>
        )}
      </div>
      <div className="paper-card-footer">
        <div className="jargon-meter">
          <span className="jargon-label">🔥 Jargon level:</span>
          <div className="jargon-dots">
            {[1,2,3,4,5].map(d => (
              <div
                key={d}
                className="jargon-dot"
                style={{ background: d <= 4 ? 'var(--red)' : '#eee' }}
              />
            ))}
          </div>
        </div>
        <button className="btn btn-yellow" onClick={onSelect}>
          🪄 Translate this!
        </button>
      </div>
    </div>
  );
}
