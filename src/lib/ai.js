const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;async function askGemini(prompt) {
  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export async function breakdownTask(title) {
  const text = await askGemini(`
    You are a productivity assistant. Break down this task into 4-6 specific, actionable subtasks.
    Each subtask should be concrete and completable in one sitting.
    Task: "${title}"
    
    Respond ONLY with a JSON array of strings, no explanation, no markdown, no backticks.
    Example: ["Subtask 1", "Subtask 2", "Subtask 3"]
  `);
  try {
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return [];
  }
}

export async function suggestPriority(title) {
  const text = await askGemini(`
    You are a productivity assistant. Based on this task title, suggest a priority level.
    Task: "${title}"
    
    Respond ONLY with one word: high, medium, or low. Nothing else.
  `);
  const result = text.trim().toLowerCase();
  if (['high', 'medium', 'low'].includes(result)) return result;
  return 'medium';
}

export async function generateDescription(title) {
  const text = await askGemini(`
    You are a productivity assistant. Write a specific, actionable description (2-3 sentences) for this task.
    Include what needs to be done, why it matters, and any key steps or considerations.
    Task: "${title}"
    
    Respond ONLY with the description, no extra text, no labels.
  `);
  return text.trim();
}