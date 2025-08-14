import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. Template generation will be disabled.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface TemplateParams {
  title: string;
  description?: string;
  tone?: string;       
  style?: string;      
}

export interface TemplateResult {
  templateTitle: string;
  templateBody: string;
  callToAction: string;
  tips: string[];
}

export const generateTemplate = async ({
  title,
  description = '',
  tone = 'neutral',
  style = 'standard',
}: TemplateParams): Promise<TemplateResult> => {
  if (!model) {
    throw new Error('Gemini model not initialized.');
  }

  const systemPrompt = `
You are a professional template designer. Based on the given parameters, create a ready-to-use template.

Include:
1. Template Title
2. Template Body (well-structured text)
3. Call-to-Action phrase
4. Tips (array of short suggestions for improving the template)

Return a valid JSON object in the following format:
{
  "templateTitle": "string",
  "templateBody": "string",
  "callToAction": "string",
  "tips": ["tip1", "tip2", "..."]
}

Context:
- Title: ${title}
- Description: ${description}
- Tone: ${tone}
- Style: ${style}
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

    // Extract only JSON part
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);

    return JSON.parse(jsonString) as TemplateResult;
  } catch (error) {
    console.error('Failed to generate template:', error);
    throw new Error('Error generating template. Try again later.');
  }
};
