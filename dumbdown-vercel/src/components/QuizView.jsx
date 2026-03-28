import { useState, useEffect } from "react";
import { generateQuiz } from "../services/api";
import "./QuizView.css";

export default function QuizView({ paper, translation, onBack }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateQuiz(paper.title, translation);
      setQuiz(data);
    } catch (e) {
      setError('Could not generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAnswer = (qIdx, option) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: option }));
  };

  const handleSubmit = () => {
    if (!quiz) return;
    let s = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i]?.startsWith(q.answer)) s++;
    });
    setScore(s);
    setSubmitted(true);
  };

  const allAnswered = quiz && Object.keys(answers).length === quiz.questions.length;

  const MEDALS = ['🥇', '🥈', '🥉'];
  const scoreEmoji = score === quiz?.questions?.length ? '🏆' : score >= Math.ceil(quiz?.questions?.length / 2) ? '⭐' : '📚';

  return (
    <div>
      <nav className="topnav">
        <div className="topnav-logo">🔬 <span>Dumb</span>Down</div>
        <button className="btn btn-ghost" onClick={onBack} style={{ color: '#fff' }}>← Back</button>
      </nav>

      <div className="page" style={{ maxWidth: 700 }}>
        <div className="quiz-header animate-pop">
          <h2 className="quiz-title">🧠 Knowledge Check!</h2>
          <p className="quiz-sub">Test what you learned from the translation</p>
          <div className="thought-bubble" style={{ maxWidth: 500, margin: '16px auto 0', textAlign: 'left' }}>
            <strong>Paper: </strong>{paper.title?.slice(0, 80)}…
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="spinner" style={{ margin: '0 auto 16px' }} />
            <p style={{ fontWeight: 700 }}>Crafting quiz questions…</p>
          </div>
        )}

        {error && (
          <div className="error-box" style={{ marginTop: 24 }}>
            ⚠️ {error}
            <button className="btn btn-orange" onClick={load} style={{ marginLeft: 16 }}>Retry</button>
          </div>
        )}

        {quiz && !loading && (
          <div>
            {quiz.questions.map((q, qIdx) => {
              const selected = answers[qIdx];
              const correct  = q.answer;
              return (
                <div
                  key={qIdx}
                  className={`quiz-card animate-pop ${submitted ? (selected?.startsWith(correct) ? 'quiz-correct' : 'quiz-wrong') : ''}`}
                  style={{ animationDelay: `${qIdx * 0.12}s` }}
                >
                  <div className="quiz-q-header">
                    <span className="quiz-q-num">Q{qIdx + 1}</span>
                    {submitted && (
                      <span className={`quiz-result-badge ${selected?.startsWith(correct) ? 'badge-teal' : 'badge-orange'}`}>
                        {selected?.startsWith(correct) ? '✅ Correct!' : '❌ Wrong'}
                      </span>
                    )}
                  </div>
                  <p className="quiz-question">{q.question}</p>
                  <div className="quiz-options">
                    {q.options.map((opt, oIdx) => {
                      const letter = opt[0];
                      const isSelected = selected === opt;
                      const isCorrect  = letter === correct;
                      let optClass = 'quiz-opt';
                      if (submitted) {
                        if (isCorrect)  optClass += ' opt-correct';
                        else if (isSelected && !isCorrect) optClass += ' opt-wrong';
                      } else if (isSelected) {
                        optClass += ' opt-selected';
                      }
                      return (
                        <button
                          key={oIdx}
                          className={optClass}
                          onClick={() => handleAnswer(qIdx, opt)}
                          disabled={submitted}
                        >
                          <span className="opt-letter">{letter}</span>
                          <span className="opt-text">{opt.slice(3)}</span>
                        </button>
                      );
                    })}
                  </div>
                  {submitted && (
                    <div className="quiz-explanation animate-pop">
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {!submitted ? (
              <div className="quiz-submit animate-pop">
                <button
                  className={`btn btn-large ${allAnswered ? 'btn-teal' : 'btn-ghost'}`}
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                >
                  {allAnswered ? '🎯 Submit Answers' : `Answer all ${quiz.questions.length} questions first`}
                </button>
              </div>
            ) : (
              <div className="quiz-score card animate-pop">
                <div className="card-body quiz-score-body">
                  <div className="score-emoji">{scoreEmoji}</div>
                  <div className="score-text">
                    <span className="score-num">{score}</span>
                    <span className="score-out">/ {quiz.questions.length}</span>
                  </div>
                  <p className="score-msg">
                    {score === quiz.questions.length
                      ? "Perfect score! You're a science star! 🌟"
                      : score >= Math.ceil(quiz.questions.length / 2)
                      ? "Great job! Science is making sense! 👏"
                      : "Keep learning — every scientist started somewhere! 📚"}
                  </p>
                  <div className="score-actions">
                    <button className="btn btn-yellow" onClick={onBack}>
                      📚 Try Another Paper
                    </button>
                    <button className="btn btn-ghost" onClick={() => { setAnswers({}); setSubmitted(false); load(); }}>
                      🔄 New Quiz
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
