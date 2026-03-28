const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { title, translation } = req.body || {};
  if (!title || !translation) return res.status(400).json({ error: 'missing fields' });

  const prompt = `Make a fun 3-question quiz about: "${title}"
Based on: ${translation.tldr} ${translation.story}
Reply with ONLY this JSON (no markdown, no code blocks):
{"questions":[{"question":"fun question 1?","options":["A) option","B) option","C) option","D) option"],"answer":"A","explanation":"short fun explanation"},{"question":"fun question 2?","options":["A) option","B) option","C) option","D) option"],"answer":"B","explanation":"short fun explanation"},{"question":"fun question 3?","options":["A) option","B) option","C) option","D) option"],"answer":"C","explanation":"short fun explanation"}]}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const { data } = await axios.post(url, {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
    }, { headers: { 'Content-Type': 'application/json' }, timeout: 55000 });

    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON found');
    res.json(JSON.parse(match[0]));
  } catch (err) {
    console.error('Quiz error:', err.message);
    res.status(500).json({ error: 'Quiz failed', details: err.message });
  }
};
