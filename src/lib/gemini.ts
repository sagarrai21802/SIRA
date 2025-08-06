// // export async function generateWithGemini(prompt: string) {
// //   const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

// //   const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + geminiApiKey, {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //     body: JSON.stringify({
// //       contents: [
// //         {
// //           parts: [{ text: prompt }],
// //         },
// //       ],
// //     }),
// //   });

// //   const data = await res.json();
// //   return data;
// // }

// // src/lib/gemini.ts
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// if (!API_KEY) {
//   console.warn('Gemini API key not found. AI content generation will use fallback mode.');
// }

// const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// export interface ContentGenerationParams {
//   prompt: string;
//   contentType: string;
//   tone: string;
// }

// export const generateWithGemini = async ({
//   prompt,
//   contentType,
//   tone
// }: ContentGenerationParams): Promise<string> => {
//   if (!genAI) {
//     throw new Error('Gemini AI not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//     // Create a detailed prompt based on content type and tone
//     const systemPrompt = createSystemPrompt(contentType, tone);
//     const fullPrompt = `${systemPrompt}\n\nUser Request: ${prompt}`;

//     const result = await model.generateContent(fullPrompt);
//     const response = await result.response;
//     const text = response.text();

//     if (!text || text.trim().length === 0) {
//       throw new Error('Empty response from AI');
//     }

//     return text.trim();
//   } catch (error) {
//     console.error('Error generating content with Gemini:', error);
//     throw new Error('Failed to generate content. Please try again.');
//   }
// };

// const createSystemPrompt = (contentType: string, tone: string): string => {
//   const baseInstructions = `You are a professional marketing content writer. Write high-quality, engaging content that is ${tone} in tone.`;

//   const typeSpecificInstructions = {
//     'blog-post': `Create a comprehensive blog post with:
// - An engaging headline
// - Clear introduction
// - Well-structured body with subheadings
// - Key takeaways or bullet points
// - Strong conclusion
// - SEO-friendly content
// - Word count: 500-800 words`,

//     'social-media': `Create engaging social media content with:
// - Attention-grabbing hook
// - Clear value proposition
// - Relevant emojis (but not excessive)
// - Call-to-action
// - Relevant hashtags
// - Keep it concise and shareable
// - Platform: Instagram/LinkedIn style`,

//     'email': `Create an effective email with:
// - Compelling subject line
// - Personal greeting
// - Clear value proposition
// - Structured body with bullet points
// - Strong call-to-action
// - Professional closing
// - Keep it scannable and actionable`,

//     'ad-copy': `Create persuasive ad copy with:
// - Attention-grabbing headline
// - Clear benefits and features
// - Social proof elements
// - Urgency or scarcity
// - Strong call-to-action
// - Keep it concise and compelling`,

//     'product-description': `Create a detailed product description with:
// - Compelling product title
// - Key features and benefits
// - Technical specifications if relevant
// - Use cases and target audience
// - Clear value proposition
// - Purchase motivation
// - SEO-friendly content`
//   };

//   const specificInstructions = typeSpecificInstructions[contentType as keyof typeof typeSpecificInstructions] || typeSpecificInstructions['blog-post'];

//   return `${baseInstructions}\n\n${specificInstructions}\n\nTone: ${tone}\nContent Type: ${contentType}`;
// };
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. AI content generation will use fallback mode.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface ContentGenerationParams {
  prompt: string;
  contentType: string;
  tone: string;
}

// 🔮 General Content Generation with Gemini
export const generateWithGemini = async ({
  prompt,
  contentType,
  tone,
}: ContentGenerationParams): Promise<string> => {
  if (!genAI || !model) {
    throw new Error('Gemini AI not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
  }

  try {
    const systemPrompt = createSystemPrompt(contentType, tone);
    const fullPrompt = `${systemPrompt}\n\nUser Request: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const text = await result.response.text();

    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from AI');
    }

    return text.trim();
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
};

// 🎨 Enhance user prompt for image generation
export async function enhancePrompt(originalPrompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Make this a creative, visual image prompt: ${originalPrompt}` }] }]
    }),
  });

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || originalPrompt;
}

// ✍️ Prompt structuring based on content type and tone
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