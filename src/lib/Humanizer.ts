import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. Humanizer will be disabled.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface HumanizerParams {
  text: string;
}

export interface HumanizerResult {
  originalText: string;
  humanizedText: string;
  suggestions: string[];
}

export const humanizeText = async ({ text }: HumanizerParams): Promise<HumanizerResult> => {
  if (!model) {
    throw new Error('Gemini model not initialized.');
  }

  const systemPrompt = `
You are an AI-to-Human text improver. Your job is to rewrite the input text so it feels like it was typed by a *real human*—not polished, not robotic, not like an essay generator. 
Stick to these rules:

1. **Preserve meaning.** Keep the ideas the same, don’t cut or add new stuff. 
2. **Human vibe.** Write casually, like someone chatting or typing naturally. Use contractions, throw in shorter sentences, sometimes start with "And" or "But". Not everything has to be grammatically perfect. 
3. **Imperfect touch.** It’s okay to have a bit of messiness: a missing comma, run-on thought, or slightly awkward phrasing—just don’t make it unreadable. 
4. **Unpolished formatting.** Avoid lists, structured formatting, or overly neat organization. Don’t make it look like AI notes or a textbook. 
5. **Original phrasing.** Don’t copy phrasing exactly—make it sound like something a friend or colleague would type. 
6. **Extra help.** At the end, give 3–5 quick casual tips for how a person could make it sound even more human if they wanted to tweak it.

Respond strictly in this JSON format:
{
  "originalText": "string",
  "humanizedText": "string",
  "suggestions": ["tip1", "tip2", "..."]
}

Input: ${text}
  `.trim();

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
      ],
    });

    const responseText = result.response.text();

    // Extract JSON only
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}') + 1;
    const jsonString = responseText.substring(jsonStart, jsonEnd);

    return JSON.parse(jsonString) as HumanizerResult;
  } catch (error) {
    console.error('Failed to humanize text:', error);
    throw new Error('Error humanizing text. Try again later.');
  }
};