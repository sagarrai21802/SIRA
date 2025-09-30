// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// ---------------- API Setup ----------------
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Default text model (supported)
const textModel = genAI?.getGenerativeModel({ model: 'gemini-1.5-pro' });

// ---------------- Types ----------------
export interface ContentGenerationParams {
  prompt: string;
  contentType: string; // e.g. "ads", "blog-post", "email"
  top_p?: number;
  temperature?: number;
  tone: string;
}

// ---------------- Main Content Generator ----------------
export const generateWithGemini = async ({
  prompt,
  contentType,
  tone,
}: ContentGenerationParams): Promise<string> => {
  if (!genAI || !textModel) {
    throw new Error('Gemini AI not configured. Please add VITE_GEMINI_API_KEY.');
  }

  try {
    // Build system prompt
    const systemPrompt = createSystemPrompt(contentType, tone);
    const fullPrompt = `${systemPrompt}\n\nUser Request: ${prompt}`;

    // First pass: raw AI output
    const result = await textModel.generateContent(fullPrompt);
    let text = result.response.text();

    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from AI');
    }

    // Humanization pipeline (multi-pass)
    text = await humanizeContent(text, tone);

    return text.trim();
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
};

// ---------------- Humanization Layer ----------------
async function humanizeContent(text: string, tone: string): Promise<string> {
  // Pass 1: Make it sound less polished, more like a person typing
  text = await runGeminiPass(
    `Rewrite this text so it doesn’t sound like AI-polished content. 
Keep the meaning, but make it casual and human-like. Use contractions, short phrases, 
and slightly messy sentence flow (like someone writing fast). Text: ${text}`
  );

  // Pass 2: Adjust tone & storytelling (without over-structuring)
  text = await runGeminiPass(
    `Rewrite this in a ${tone} tone. Add a few relatable bits, maybe a casual analogy, 
but don’t overdo it. Keep it sounding like a natural human rant or note, not a formatted essay. Text: ${text}`
  );

  // Pass 3: Paraphrase for originality
  text = await runGeminiPass(
    `Paraphrase this text so it feels original, not copy-pasted. 
Change up sentence structures and word choices. Text: ${text}`
  );

  // Pass 4: Human quirks
  text = await runGeminiPass(
    `Rewrite this so it feels fully human-written. Mix sentence lengths, 
sometimes drop perfect grammar, use fillers like "Well," or "I mean,". 
Make it sound like a human typed it in one go. Text: ${text}`
  );

  return text;
}

// Generic helper to run multiple Gemini passes
async function runGeminiPass(instruction: string): Promise<string> {
  if (!textModel) return instruction;

  try {
    const res = await textModel.generateContent(instruction);
    const output = res.response.text();
    return output?.trim() || instruction;
  } catch (err) {
    console.error('Error in humanization pass:', err);
    return instruction;
  }
}

// ---------------- Image Utilities (unchanged) ----------------
export async function enhancePrompt(originalPrompt: string): Promise<string> {
  if (!API_KEY) return originalPrompt;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: `Make this a creative, visual image prompt: ${originalPrompt}` }] },
          ],
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
  const baseInstructions = `
You are a creative marketing content writer. 
Write in a ${tone} tone, but keep it casual and human-like.
Don’t make it sound like AI—avoid over-polished structure or textbook style.
Use contractions, varied sentence lengths, and keep it natural.
  `.trim();

  const typeSpecificInstructions = {
    'blog-post': `Make it like a blog that a real person would post. Headline, intro, story-like body, and a chill wrap-up. Avoid sounding like corporate whitepapers.`,
    'social-media': `Catchy hooks, a bit playful, throw in emojis/hashtags casually. Keep them short and scroll-stopping.`,
    'email': `Make it sound like a personal email, not a template. Add subject, greeting, and a CTA—but conversational, not salesy.`,
    'product-description': `Describe the product in a friendly way, highlight features, but keep it unique and conversational.`,
    'ads': `Generate ad variations that feel human, not templated. Each ad should have headline, description, and CTA. 
For Google Ads: follow Google’s limits but keep it natural. For Meta: more social vibe. Punchy and authentic.`,
  };

  const specificInstructions =
    typeSpecificInstructions[contentType as keyof typeof typeSpecificInstructions] ??
    typeSpecificInstructions['blog-post'];

  return `${baseInstructions}\n\n${specificInstructions}\n\nTone: ${tone}\nContent Type: ${contentType}`;
};