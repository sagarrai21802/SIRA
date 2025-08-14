
// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// Use environment variable for API key, fallback to your provided key temporarily if needed
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDw2c6Pec7Ws-e19__PryKZZdLNyJIl010';

if (!API_KEY) {
  console.warn('Gemini API key not found. AI content generation will use fallback mode.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Get text model for content generation (optional, you can swap models)
const textModel = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface ContentGenerationParams {
  prompt: string;
  contentType: string;
  tone: string;
}

// Generate marketing content with Gemini text model
export const generateWithGemini = async ({
  prompt,
  contentType,
  tone,
}: ContentGenerationParams): Promise<string> => {
  if (!genAI || !textModel) {
    throw new Error('Gemini AI not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
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

// Enhance prompt for creative image generation
export async function enhancePrompt(originalPrompt: string): Promise<string> {
  if (!API_KEY) {
    console.warn('Gemini API key not found for prompt enhancement.');
    return originalPrompt;
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Make this a creative, visual image prompt: ${originalPrompt}` }] }]
      }),
    });

    if (!res.ok) {
      throw new Error(`API call failed with status: ${res.status}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || originalPrompt;
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    return originalPrompt;
  }
}

// Generate image using Gemini 2.0 Flash Preview Image Generation model
export async function generateImageWithGemini(prompt: string): Promise<string | null> {
  if (!genAI) {
    throw new Error('Gemini AI not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
  }

  const imageModel = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-preview-image-generation',
    generationConfig: {
      responseMimeType: 'image/jpeg',
    },
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

// Helper: create system prompt based on content type and tone
const createSystemPrompt = (contentType: string, tone: string): string => {
  const baseInstructions = `You are a professional marketing content writer. Write high-quality, engaging content that is ${tone} in tone.`;

  const typeSpecificInstructions = {
    'blog-post': `Create a comprehensive blog post with:
- Engaging headline
- Clear introduction
- Structured body with subheadings
- Key takeaways or bullet points
- Strong conclusion
- SEO-friendly text
- Length: 500-800 words`,

    'social-media': `Create engaging social media content with:
- Attention-grabbing hook
- Clear value proposition
- Emojis (not overused)
- Call-to-action
- Relevant hashtags
- Short and catchy
- Platform: Instagram/LinkedIn`,

    'email': `Create an effective email with:
- Catchy subject line
- Personal greeting
- Clear benefits
- Bullet-point breakdown
- Call-to-action
- Professional closing`,

    'ad-copy': `Create persuasive ad copy with:
- Strong headline
- Key features/benefits
- Social proof or testimonials
- Urgency/Scarcity
- Call-to-action
- Compact & punchy`,

    'product-description': `Create a detailed product description with:
- Clear product title
- Key features and uses
- Audience appeal
- SEO keywords
- Motivation to buy
- 100-150 words`
  };

  const specificInstructions =
    typeSpecificInstructions[contentType as keyof typeof typeSpecificInstructions] ??
    typeSpecificInstructions['blog-post'];

  return `${baseInstructions}\n\n${specificInstructions}\n\nTone: ${tone}\nContent Type: ${contentType}`;
};