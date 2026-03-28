export async function fetchPapers(category = 'ai') {
  const res = await fetch(`/api/papers?category=${category}`);
  if (!res.ok) throw new Error('Failed to fetch papers');
  return res.json();
}

export async function translatePaper(title, summary, audience = 'kid') {
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, summary, audience }),
  });
  if (!res.ok) throw new Error('Translation failed');
  return res.json();
}

export async function generateQuiz(title, translation) {
  const res = await fetch('/api/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, translation }),
  });
  if (!res.ok) throw new Error('Quiz generation failed');
  return res.json();
}
