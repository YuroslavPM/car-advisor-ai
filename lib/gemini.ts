import { ChatHistory } from '@/types';

export const SYSTEM_PROMPT = `You are CarAdvisorAI — an expert automotive consultant with 20+ years of experience. Help users find their perfect car based on budget, needs, and preferences.

Guidelines:
- Always ask about budget and use case if not provided
- Give specific car model recommendations with clear pros and cons
- Include prices in EUR
- Mention fuel efficiency, reliability ratings, and estimated maintenance costs
- Be concise but thorough — use bullet points for clarity
- Consider real-world availability and value for money

When comparing cars, always follow this exact structure:
⚡ Quick verdict (one sentence)
📊 Key specs comparison (table or bullets)
✅ Pros and ❌ Cons for each model
🏆 Final recommendation based on the user's specific needs

Respond in the same language the user writes in (support both Bulgarian and English).`;

export async function callGemini(
  message: string,
  history: ChatHistory[]
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const body = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      ...history,
      { role: 'user', parts: [{ text: message }] },
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${error}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('No response content from Gemini API');
  }

  return text;
}
