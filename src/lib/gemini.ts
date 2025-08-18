// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Default text model
const textModel = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface ContentGenerationParams {
  prompt: string;
  contentType: string; // e.g. "ads", "blog-post", "email"
  tone: string;
}

export const generateWithGemini = async ({
  prompt,
  contentType,
  tone,
}: ContentGenerationParams): Promise<string> => {
  if (!genAI || !textModel) {
    throw new Error('Gemini AI not configured. Please add VITE_GEMINI_API_KEY.');
  }

  try {
    const systemPrompt = createSystemPrompt(contentType, tone);
    const fullPrompt = `${systemPrompt}\n\nUser Request: ${prompt}`;

    const result = await textModel.generateContent(fullPrompt);
    const text = result.response.text();

    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from AI');
    }

    return text.trim();
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
};

// ---------------- Image Utilities (kept same) ----------------
export async function enhancePrompt(originalPrompt: string): Promise<string> {
  if (!API_KEY) return originalPrompt;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Make this a creative, visual image prompt: ${originalPrompt}` }] }],
        }),
      }
    );

    if (!res.ok) throw new Error(`API call failed with status: ${res.status}`);

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || originalPrompt;
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    return originalPrompt;
  }
}

export async function generateImageWithGemini(prompt: string): Promise<string | null> {
  if (!genAI) throw new Error('Gemini AI not configured. Please add VITE_GEMINI_API_KEY.');

  const imageModel = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-preview-image-generation',
    generationConfig: { responseMimeType: 'image/jpeg' },
  });

  try {
    const result = await imageModel.generateContent(prompt);
    const response = result.response;

    if (response.candidates && response.candidates.length > 0) {
      const part = response.candidates[0].content.parts[0];
      if ('inlineData' in part && part.inlineData) {
        const imageData = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        return `data:${mimeType};base64,${imageData}`;
      }
    }
    return null;
  } catch (error) {
    console.error('Error generating image with Gemini:', error);
    throw new Error('Failed to generate image. Please try again.');
  }
}

// ---------------- System Prompt ----------------
const createSystemPrompt = (contentType: string, tone: string): string => {
  const baseInstructions = `You are a professional marketing content writer. Write engaging content in a ${tone} tone.`;

  const typeSpecificInstructions = {
    'blog-post': `Create a blog post with headline, intro, structured body, SEO keywords, and conclusion.`,
    'social-media': `Create catchy social media posts with hooks, emojis, hashtags, and CTA.`,
    'email': `Write persuasive emails with subject line, greeting, benefits, and strong CTA.`,
    'product-description': `Write detailed product descriptions with features, SEO keywords, and appeal.`,

    // ✅ New ads instructions
    'ads': `Generate multiple ad variations. Each ad must include:
- Headline
- Description
- Call To Action
Keep them short, punchy, and persuasive.
If platform = Google: follow Google Ads format.
If platform = Meta: follow social media ad style.`,
  };

  const specificInstructions =
    typeSpecificInstructions[contentType as keyof typeof typeSpecificInstructions] ??
    typeSpecificInstructions['blog-post'];

  return `${baseInstructions}\n\n${specificInstructions}\n\nTone: ${tone}\nContent Type: ${contentType}`;
};
