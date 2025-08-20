import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. Prompt generation will be disabled.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface PromptParams {
  type: 'image' | 'video';   // Whether to generate for image or video
  topic: string;             // What the prompt should be about
  style?: string;            // Artistic / cinematic style
  mood?: string;             // Mood or tone (calm, futuristic, energetic, etc.)
  details?: string;          // Extra details the user wants to add
}

export interface PromptResult {
  prompt: string;            // Final ready-to-use prompt
  variations: string[];      // Alternative variations of the prompt
  tips: string[];            // Suggestions to improve generation
}

export const generatePrompt = async ({
  type,
  topic,
  style = 'realistic',
  mood = 'neutral',
  details = '',
}: PromptParams): Promise<PromptResult> => {
  if (!model) {
    throw new Error('Gemini model not initialized.');
  }

  const systemPrompt = `
You are an expert creative AI prompt engineer. Your task is to generate high-quality prompts 
that can be used for AI ${type} generation tools (like Stable Diffusion, DALL·E, Runway, etc.).

Instructions:
1. Create one main ready-to-use prompt string.
2. Provide 2–3 variations with slightly different styles.
3. Suggest 2–3 tips for improving the ${type} generation.

Return a valid JSON object in the following format:
{
  "prompt": "string",
  "variations": ["variation1", "variation2"],
  "tips": ["tip1", "tip2"]
}

Context:
- Type: ${type}
- Topic: ${topic}
- Style: ${style}
- Mood: ${mood}
- Extra details: ${details}
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

    const text = result.response.text();

    // Extract JSON part only
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);

    return JSON.parse(jsonString) as PromptResult;
  } catch (error) {
    console.error('Failed to generate prompt:', error);
    throw new Error('Error generating prompt. Try again later.');
  }
};



