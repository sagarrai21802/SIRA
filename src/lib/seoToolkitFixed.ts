import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_ENDPOINTS, getApiUrl } from './api';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. SEO content generation will be disabled.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-2.0-flash' });

export interface SEOContentParams {
  topic: string;
  industry?: string;
  targetAudience?: string;
  contentType?: 'meta' | 'keywords' | 'readability' | 'schema';
  brandVoice?: string;
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
async function resolveBrandSeoDefaults(input: Partial<SEOContentParams>): Promise<{ industry: string; targetAudience: string; brandVoice: string; }> {
  const defaults = { industry: 'general', targetAudience: 'online readers', brandVoice: 'neutral' };
  if (input.industry && input.targetAudience && input.brandVoice) return input as any;
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    const resp = await fetch(getApiUrl(API_ENDPOINTS.ME), {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
    });
    if (!resp.ok) return defaults;
    const data = await resp.json();
    const u = data?.user || {};
    return {
      industry: input.industry || u.industry || defaults.industry,
      targetAudience: input.targetAudience || u.target_audience || defaults.targetAudience,
      brandVoice: input.brandVoice || u.brand_voice || defaults.brandVoice
    };
  } catch {
    return defaults;
  }
}

export const generateMetaTags = async ({
  topic,
  industry = 'general',
  targetAudience = 'online readers',
  brandVoice = 'neutral',
}: Omit<SEOContentParams, 'contentType'>): Promise<Pick<SEOContentResult, 'metaTitle' | 'metaDescription' | 'slug'>> => {
  if (!model) throw new Error('Gemini model not initialized.');

  // Enrich defaults from profile when missing
  const resolved = await resolveBrandSeoDefaults({ industry, targetAudience, brandVoice });

  const systemPrompt = `
You are an SEO expert. Generate ONLY meta tags for the given topic.

Return as JSON:
{
  "metaTitle": "string",
  "metaDescription": "string", 
  "slug": "string"
}

Topic: ${topic}
Industry: ${resolved.industry}
Target Audience: ${resolved.targetAudience}
Brand Voice: ${resolved.brandVoice}
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

// // Keywords
// export const generateKeywords = async ({
//   topic,
//   industry = 'general',
//   targetAudience = 'online readers',
// }: Omit<SEOContentParams, 'contentType'>): Promise<Pick<SEOContentResult, 'keywords'>> => {
//   if (!model) throw new Error('Gemini model not initialized.');

//   const systemPrompt = `
// You are an SEO keyword research expert. Generate ONLY relevant keywords for the given topic.

// Return as JSON:
// {
//   "keywords": ["keyword1", "keyword2", "keyword3", ...]
// }

// Topic: ${topic}
// Industry: ${industry}
// Target Audience: ${targetAudience}
//   `.trim();

//   try {
//     const result = await model.generateContent(systemPrompt);
//     const text = await result.response.text();
//     const jsonStart = text.indexOf('{');
//     const jsonEnd = text.lastIndexOf('}') + 1;
//     const parsed = JSON.parse(text.substring(jsonStart, jsonEnd));
//     return { keywords: parsed.keywords };
//   } catch (error) {
//     console.error('Failed to generate keywords:', error);
//     throw new Error('Error generating keywords. Try again later.');
//   }
// };

// Keywords
export const generateKeywords = async ({
  topic,
  industry = 'general',
  targetAudience = 'online readers',
}: Omit<SEOContentParams, 'contentType'>): Promise<{
  keywords: { keyword: string; avgMonthlySearches: number; competition: string }[];
}> => {
  if (!model) throw new Error('Gemini model not initialized.');

  const systemPrompt = `
You are an SEO keyword research expert. Generate 10 relevant keywords for the given topic.
For each keyword, provide the average monthly searches (number) and competition (Low, Medium, High).

Return strictly in JSON format:
{
  "keywords": [
    { "keyword": "example1", "avgMonthlySearches": 1234, "competition": "Low" },
    { "keyword": "example2", "avgMonthlySearches": 567, "competition": "High" }
  ]
}

Topic: ${topic}
Industry: ${industry}
Target Audience: ${targetAudience}
  `.trim();

  try {
    const result = await model.generateContent(systemPrompt);
    const text = await result.response.text();

    // Extract JSON from the text response
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const parsed = JSON.parse(text.substring(jsonStart, jsonEnd));

    // Ensure returned structure matches your table
    const keywords = parsed.keywords.map((kw: any) => ({
      keyword: kw.keyword,
      avgMonthlySearches: kw.avgMonthlySearches,
      competition: kw.competition,
    }));

    return { keywords };
  } catch (error) {
    console.error('Failed to generate keywords:', error);
    throw new Error('Error generating keywords. Try again later.');
  }
};


// SCHEMAGENERATOR 
// // lib/seoToolkitFixed.ts
// export const generateSchema = async ({
//   websiteUrl,
//   socialMediaUrl,
//   contactEmail,
//   contactPhone,
//   industry = 'general',
//   targetAudience = 'online readers',
// }: {
//   websiteUrl: string;
//   socialMediaUrl?: string;
//   contactEmail?: string;
//   contactPhone?: string;
//   industry?: string;
//   targetAudience?: string;
// }): Promise<{ schema: string }> => {
//   if (!model) throw new Error('Gemini model not initialized.');

//   const systemPrompt = `
// You are an SEO expert and JSON-LD schema generator. 
// Generate structured data in JSON-LD format only, based on the provided business details.

// Return as JSON:
// {
//   "schema": "{ ...JSON-LD schema as string... }"
// }

// Website URL: ${websiteUrl}
// Social Media URL: ${socialMediaUrl || 'N/A'}
// Contact Email: ${contactEmail || 'N/A'}
// Contact Phone: ${contactPhone || 'N/A'}
// Industry: ${industry}
// Target Audience: ${targetAudience}
//   `.trim();

//   try {
//     const result = await model.generateContent(systemPrompt);
//     const text = await result.response.text();

//     // Extract JSON block
//     const jsonMatch = text.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) throw new Error('No JSON object found in response.');

//     let parsed = JSON.parse(jsonMatch[0]);

//     // Ensure schema is always returned as string
//     if (typeof parsed.schema !== 'string') {
//       parsed.schema = JSON.stringify(parsed.schema, null, 2);
//     }

//     return { schema: parsed.schema };
//   } catch (error) {
//     console.error('Failed to generate schema:', error);
//     throw new Error('Error generating schema. Try again later.');
//   }
// };

export const generateSchema = async ({
  websiteUrl,
  socialMediaUrl,
  contactEmail,
  contactPhone,
  industry = 'general',
  targetAudience = 'online readers',
}: {
  websiteUrl: string;
  socialMediaUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  industry?: string;
  targetAudience?: string;
}): Promise<{ schema: string }> => {
  if (!model) throw new Error('Gemini model not initialized.');

  const systemPrompt = `
You are an SEO expert and JSON-LD schema generator. 
Generate a valid JSON-LD schema for an Organization following Google’s structured data guidelines.

Rules:
- Always use "@context": "https://schema.org".
- Always use "@type": "Organization".
- Use "url" for the website.
- Use "sameAs" as an array for social media links (if provided).
- Put "email" and "telephone" inside "contactPoint".
- Use "description" instead of "industry".
- Ensure output is JSON-only, wrapped inside {"schema": "..."}.

Return exactly in this JSON format:
{
  "schema": "{ ...JSON-LD schema as string... }"
}

Website URL: ${websiteUrl}
Social Media URL: ${socialMediaUrl || 'N/A'}
Contact Email: ${contactEmail || 'N/A'}
Contact Phone: ${contactPhone || 'N/A'}
Description: ${industry}
Target Audience: ${targetAudience}
  `.trim();

  try {
    const result = await model.generateContent(systemPrompt);
    const text = await result.response.text();

    // Extract JSON block
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object found in response.');

    let parsed = JSON.parse(jsonMatch[0]);

    // Ensure schema is always returned as string
    if (typeof parsed.schema !== 'string') {
      parsed.schema = JSON.stringify(parsed.schema, null, 2);
    }

    return { schema: parsed.schema };
  } catch (error) {
    console.error('Failed to generate schema:', error);
    throw new Error('Error generating schema. Try again later.');
  }
};
