import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. SEO content generation will be disabled.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface SEOContentParams {
  topic: string;
  industry?: string;
  targetAudience?: string;
}

export interface SEOContentResult {
  metaTitle: string;
  metaDescription: string;
  slug:String;
  keywords: string[];
  readabilityTips: string;
  schemaMarkup: string;
}

export const generateSEOContent = async ({
  topic,
  industry = 'general',
  targetAudience = 'online readers',
}: SEOContentParams): Promise<SEOContentResult> => {
  if (!model) {
    throw new Error('Gemini model not initialized.');
  }

  const systemPrompt = `
You are an expert SEO specialist and content strategist. Based on the given topic, generate the following:

1. Meta Title (max 60 characters)
2. Meta Description (max 160 characters)
3. SEO Keywords (include long-tail and LSI keywords) – as an array
4. Readability Tips – to improve SEO performance and accessibility
5. JSON-LD Schema Markup – for an article/blog using schema.org

Return the output as a valid JSON object using the following format:

{
  "metaTitle": "string",
  "metaDescription": "string",
  "keywords": ["kw1", "kw2", "..."],
  "readabilityTips": "string",
  "schemaMarkup": "string"
}

Context:
- Topic: ${topic}
- Industry: ${industry}
- Target Audience: ${targetAudience}
  `.trim();

  try {
    const result = await model.generateContent(systemPrompt);
    const text = await result.response.text();

    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);

    const parsed: SEOContentResult = JSON.parse(jsonString);
    return parsed;
  } catch (error) {
    console.error('Failed to generate SEO content:', error);
    throw new Error('Error generating SEO data. Try again later.');
  }
};
