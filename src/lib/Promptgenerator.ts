import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_ENDPOINTS, getApiUrl } from './api';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. Prompt generation will be disabled.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-2.0-flash' });

export interface PromptParams {
  type: 'image' | 'video';   // Whether to generate for image or video
  topic: string;             // What the prompt should be about
  style?: string;            // Artistic / cinematic style
  mood?: string;             // Mood or tone (calm, futuristic, energetic, etc.)
  details?: string;          // Extra details the user wants to add
  brandContext?: {
    industry?: string;
    targetAudience?: string;
    brandVoice?: string;
    primaryBrandColor?: string;
    brandMotto?: string;
  }
}

export interface PromptResult {
  prompt: string;            // Final ready-to-use prompt
  variations: string[];      // Alternative variations of the prompt
  tips: string[];            // Suggestions to improve generation
}

type CachedBrandContext = {
  industry?: string;
  targetAudience?: string;
  brandVoice?: string;
  primaryBrandColor?: string;
  brandMotto?: string;
} | null;

let cachedBrandContext: CachedBrandContext = null;

async function fetchBrandContext(): Promise<CachedBrandContext> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    const resp = await fetch(getApiUrl(API_ENDPOINTS.ME), {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    const u = data?.user || {};
    cachedBrandContext = {
      industry: u.industry || undefined,
      targetAudience: u.target_audience || undefined,
      brandVoice: u.brand_voice || undefined,
      primaryBrandColor: u.primary_brand_color || undefined,
      brandMotto: u.brand_motto || undefined
    };
    return cachedBrandContext;
  } catch {
    return null;
  }
}

export const generatePrompt = async ({
  type,
  topic,
  style = 'realistic',
  mood = 'neutral',
  details = '',
  brandContext,
}: PromptParams): Promise<PromptResult> => {
  if (!model) {
    throw new Error('Gemini model not initialized.');
  }

  // Resolve brand context automatically if not provided
  if (!brandContext) {
    brandContext = (cachedBrandContext || await fetchBrandContext()) || undefined;
  }

  const systemPrompt = `
You are an expert creative AI prompt engineer. Your task is to generate high-quality prompts 
that can be used for AI ${type} generation tools (like Stable Diffusion, DALL·E, Runway, etc.).

Instructions:
1. Create one main ready-to-use prompt string.
2. Provide 2–3 variations with slightly different styles.
3. Suggest 2–3 tips for improving the ${type} generation.

 If brand context is provided, you MUST incorporate it naturally into visual styling and content:
 - Industry: ${brandContext?.industry || 'N/A'}
 - Target audience: ${brandContext?.targetAudience || 'N/A'}
 - Brand voice: ${brandContext?.brandVoice || 'N/A'}
 - Primary brand color (if given, prefer palette coherence): ${brandContext?.primaryBrandColor || 'N/A'}
 - Motto (use as subtle theme, not literal text): ${brandContext?.brandMotto || 'N/A'}

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
