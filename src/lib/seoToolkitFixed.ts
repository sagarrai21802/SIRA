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
  contentType: 'meta' | 'keywords' | 'readability' | 'schema';
}

export interface SEOContentResult {
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  keywords?: string[];
  readabilityTips?: string;
  schemaMarkup?: string;
}

// Separate functions for each SEO tool to prevent cross-triggering
export const generateMetaTags = async ({
  topic,
  industry = 'general',
  targetAudience = 'online readers',
}: Omit<SEOContentParams, 'contentType'>): Promise<Pick<SEOContentResult, 'metaTitle' | 'metaDescription' | 'slug'>> => {
  if (!model) {
    throw new Error('Gemini model not initialized.');
  }

  const systemPrompt = `
You are an SEO expert. Generate ONLY meta tags for the given topic.

Generate:
1. Meta Title (max 60 characters, compelling and SEO-optimized)
2. Meta Description (max 160 characters, includes call-to-action)
3. URL Slug (lowercase, hyphen-separated, SEO-friendly)

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
    const jsonString = text.substring(jsonStart, jsonEnd);

    const parsed = JSON.parse(jsonString);
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

export const generateKeywords = async ({
  topic,
  industry = 'general',
  targetAudience = 'online readers',
}: Omit<SEOContentParams, 'contentType'>): Promise<Pick<SEOContentResult, 'keywords'>> => {
  if (!model) {
    throw new Error('Gemini model not initialized.');
  }

  const systemPrompt = `
You are an SEO keyword research expert. Generate ONLY relevant keywords for the given topic.

Generate a comprehensive list of:
- Primary keywords (2-3 words)
- Long-tail keywords (4+ words)
- LSI (Latent Semantic Indexing) keywords
- Question-based keywords
- Commercial intent keywords

Return as JSON:
{
  "keywords": ["keyword1", "keyword2", "keyword3", ...]
}

Topic: ${topic}
Industry: ${industry}
Target Audience: ${targetAudience}

Generate 15-20 diverse, relevant keywords.
  `.trim();

  try {
    const result = await model.generateContent(systemPrompt);
    const text = await result.response.text();

    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);

    const parsed = JSON.parse(jsonString);
    return {
      keywords: parsed.keywords
    };
  } catch (error) {
    console.error('Failed to generate keywords:', error);
    throw new Error('Error generating keywords. Try again later.');
  }
};

export const generateReadabilityTips = async ({
  topic,
  industry = 'general',
  targetAudience = 'online readers',
}: Omit<SEOContentParams, 'contentType'>): Promise<Pick<SEOContentResult, 'readabilityTips'>> => {
  if (!model) {
    throw new Error('Gemini model not initialized.');
  }

  const systemPrompt = `
You are a content readability expert. Generate ONLY readability improvement tips for content about the given topic.

Provide specific, actionable tips for:
- Sentence structure and length
- Paragraph organization
- Use of headings and subheadings
- Bullet points and lists
- Active vs passive voice
- Technical jargon simplification
- Reading level optimization
- Visual content suggestions

Return as JSON:
{
  "readabilityTips": "Detailed readability improvement recommendations as a single string with line breaks for formatting"
}

Topic: ${topic}
Industry: ${industry}
Target Audience: ${targetAudience}

Make tips specific to this topic and audience.
  `.trim();

  try {
    const result = await model.generateContent(systemPrompt);
    const text = await result.response.text();

    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);

    const parsed = JSON.parse(jsonString);
    return {
      readabilityTips: parsed.readabilityTips
    };
  } catch (error) {
    console.error('Failed to generate readability tips:', error);
    throw new Error('Error generating readability tips. Try again later.');
  }
};

export const generateSchemaMarkup = async ({
  topic,
  industry = 'general',
  targetAudience = 'online readers',
}: Omit<SEOContentParams, 'contentType'>): Promise<Pick<SEOContentResult, 'schemaMarkup'>> => {
  if (!model) {
    throw new Error('Gemini model not initialized.');
  }

  const systemPrompt = `
You are a structured data expert. Generate ONLY JSON-LD schema markup for the given topic.

Create appropriate schema.org markup for an article/blog post including:
- Article schema
- Author information
- Publisher details
- Date published/modified
- Main entity/topic
- Breadcrumb navigation
- FAQ schema if applicable

Return as JSON:
{
  "schemaMarkup": "Complete JSON-LD schema markup as a properly formatted JSON string"
}

Topic: ${topic}
Industry: ${industry}
Target Audience: ${targetAudience}

Use realistic placeholder data where needed.
  `.trim();

  try {
    const result = await model.generateContent(systemPrompt);
    const text = await result.response.text();

    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);

    const parsed = JSON.parse(jsonString);
    return {
      schemaMarkup: parsed.schemaMarkup
    };
  } catch (error) {
    console.error('Failed to generate schema markup:', error);
    throw new Error('Error generating schema markup. Try again later.');
  }
};