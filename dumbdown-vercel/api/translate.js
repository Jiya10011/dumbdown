const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { title, summary, audience = 'kid' } = req.body || {};
  if (!title || !summary) return res.status(400).json({ error: 'missing fields' });

  const personas = {
    kid:   'a fun 10-year-old using toy/food/animal analogies, Grade 3 level',
    teen:  'a curious teen, Grade 8 level, explain why it matters',
    adult: 'a smart non-scientist adult, Grade 10 level',
  };

  const prompt = `You are a science translator for ${personas[audience] || personas.kid}.
Paper: "${title}"
Abstract: "${summary.slice(0, 500)}"
You MUST reply with ONLY a raw JSON object. No markdown. No code blocks. No backticks. No explanation. Start your response with { and end with }.
Use this exact structure with short values (keep each field under 30 words):
{"headline":"exciting title max 12 words","tldr":"one simple sentence","analogy":"one fun everyday comparison","story":"two fun sentences","wow_factor":"one sentence why it matters","fun_fact":"one surprising fact","emoji_summary":"3 emojis","difficulty_before":9,"difficulty_after":2}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const { data } = await axios.post(url, {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    }, { headers: { 'Content-Type': 'application/json' }, timeout: 55000 });

    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Strip markdown code fences if present
    const cleaned = raw
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    // Try direct parse first, fall back to regex extraction
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (!match) throw new Error('No JSON found in: ' + raw.slice(0, 200));
      parsed = JSON.parse(match[0]);
    }

    res.json(parsed);
  } catch (err) {
    console.error('Translate error:', err.message);
    res.status(500).json({ error: 'Translation failed', details: err.message });
  }
};