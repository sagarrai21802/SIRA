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
  contentType?: 'meta' | 'keywords' | 'readability' | 'schema';
}

export interface SEOContentResult {
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  keywords?: string[];
  readabilityTips?: string;
  schemaMarkup?: string;
}

// Meta Tags
export const generateMetaTags = async ({
  topic,
  industry = 'general',
  targetAudience = 'online readers',
}: Omit<SEOContentParams, 'contentType'>): Promise<Pick<SEOContentResult, 'metaTitle' | 'metaDescription' | 'slug'>> => {
  if (!model) throw new Error('Gemini model not initialized.');

  const systemPrompt = `
You are an SEO expert. Generate ONLY meta tags for the given topic.

Return as JSON:
{
  "metaTitle": "string",
  "metaDescription": "string", 
  "slug": "string"
}

Topic: ${topic}
Industry: ${industry}
Target Audience: ${targetAudience}
  `.trim();

  try {
    const result = await model.generateContent(systemPrompt);
    const text = await result.response.text();
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const parsed = JSON.parse(text.substring(jsonStart, jsonEnd));
    return {
      metaTitle: parsed.metaTitle,
      metaDescription: parsed.metaDescription,
      slug: parsed.slug
    };
  } catch (error) {
    console.error('Failed to generate meta tags:', error);
    throw new Error('Error generating meta tags. Try again later.');
  }
};

// Keywords
export const generateKeywords = async ({
  topic,
  industry = 'general',
  targetAudience = 'online readers',
}: Omit<SEOContentParams, 'contentType'>): Promise<Pick<SEOContentResult, 'keywords'>> => {
  if (!model) throw new Error('Gemini model not initialized.');

  const systemPrompt = `
You are an SEO keyword research expert. Generate ONLY relevant keywords for the given topic.

Return as JSON:
{
  "keywords": ["keyword1", "keyword2", "keyword3", ...]
}

Topic: ${topic}
Industry: ${industry}
Target Audience: ${targetAudience}
  `.trim();

  try {
    const result = await model.generateContent(systemPrompt);
    const text = await result.response.text();
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const parsed = JSON.parse(text.substring(jsonStart, jsonEnd));
    return { keywords: parsed.keywords };
  } catch (error) {
    console.error('Failed to generate keywords:', error);
    throw new Error('Error generating keywords. Try again later.');
  }
};