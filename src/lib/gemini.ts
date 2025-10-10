
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_ENDPOINTS, getApiUrl } from './api';

// ---------------- API Setup ----------------
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

console.log('Environment check - VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY);
console.log('API_KEY value:', API_KEY);
console.log('API_KEY length:', API_KEY.length);

if (!API_KEY) {
  console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Default text model (supported)
// gemini-1.5-flash is not available, using gemini-2.0-flash instead
const textModel = genAI?.getGenerativeModel({ model: 'gemini-2.0-flash' });

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
  console.log('generateWithGemini called with:', { prompt, contentType, tone });
  console.log('genAI available:', !!genAI);
  console.log('textModel available:', !!textModel);
  console.log('API_KEY available:', !!API_KEY);
  
  if (!genAI || !textModel) {
    console.error('Gemini AI not configured. genAI:', !!genAI, 'textModel:', !!textModel, 'API_KEY:', !!API_KEY);
    throw new Error('Gemini AI not configured. Please add VITE_GEMINI_API_KEY.');
  }

  try {
    // Build system prompt
    const systemPrompt = createSystemPrompt(contentType, tone);

    // Fetch brand/user context (optional)
    const brandContext = await getCachedBrandContext();
    const brandContextBlock = buildBrandContextBlock(brandContext);

    const fullPrompt = `${systemPrompt}${brandContextBlock ? `\n\n${brandContextBlock}` : ''}\n\nUser Request: ${prompt}`;

    // First pass: raw AI output
    const result = await textModel.generateContent(fullPrompt);
    let text = result.response.text();

    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from AI');
    }

    // Humanization pipeline (multi-pass)
    text = await humanizeContent(text, tone);

    return cleanContent(text);
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
};

// ---------------- Humanization Layer ----------------
export async function humanizeContent(text: string, tone: string = 'casual'): Promise<string> {
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
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

Output rules (strict):
- Output ONLY the content. No preface or commentary like "Here is", "Below is", "Sure".
- Do NOT wrap in markdown/code fences.
- Do NOT include headings, labels, or meta text unless explicitly requested by the user.
- If the user asks for a structure (e.g., email), write it directly (subject/greeting/body/CTA) without labeling lines.
- Do NOT include disclaimers or instructions in the output.
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

// ---------------- Brand/User Context (optional) ----------------
type BrandContext = {
  company_name?: string;
  industry?: string;
  business_type?: string;
  location?: string;
  company_size?: string;
  target_audience?: string;
  brand_voice?: string;
  goals?: string;
  primary_brand_color?: string;
  brand_motto?: string;
  brand_mission?: string;
  brand_about?: string;
} | null;

let cachedBrandContext: BrandContext = null;
let cachedAt: number | null = null;

async function getCachedBrandContext(): Promise<BrandContext> {
  // Cache for 2 minutes
  if (cachedBrandContext && cachedAt && Date.now() - cachedAt < 120_000) return cachedBrandContext;
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (!token) return null;
    const resp = await fetch(getApiUrl(API_ENDPOINTS.ME), { headers: { Authorization: `Bearer ${token}` } });
    if (!resp.ok) return null;
    const data = await resp.json();
    const u = data?.user || {};
    const ctx: BrandContext = {
      company_name: u.company_name || undefined,
      industry: u.industry || undefined,
      business_type: u.business_type || undefined,
      location: u.location || undefined,
      company_size: u.company_size || undefined,
      target_audience: u.target_audience || undefined,
      brand_voice: u.brand_voice || undefined,
      goals: u.goals || undefined,
      primary_brand_color: u.primary_brand_color || undefined,
      brand_motto: u.brand_motto || undefined,
      brand_mission: u.brand_mission || undefined,
      brand_about: u.brand_about || undefined,
    };
    cachedBrandContext = ctx;
    cachedAt = Date.now();
    return ctx;
  } catch {
    return null;
  }
}

function buildBrandContextBlock(ctx: BrandContext): string {
  if (!ctx) return '';
  const parts: string[] = [];
  if (ctx.company_name) parts.push(`Company: ${ctx.company_name}`);
  if (ctx.industry) parts.push(`Industry: ${ctx.industry}`);
  if (ctx.business_type) parts.push(`Business Type: ${ctx.business_type}`);
  if (ctx.location) parts.push(`Location: ${ctx.location}`);
  if (ctx.company_size) parts.push(`Company Size: ${ctx.company_size}`);
  if (ctx.target_audience) parts.push(`Target Audience: ${ctx.target_audience}`);
  if (ctx.brand_voice) parts.push(`Brand Voice: ${ctx.brand_voice}`);
  if (ctx.primary_brand_color) parts.push(`Primary Brand Color: ${ctx.primary_brand_color}`);
  if (ctx.brand_motto) parts.push(`Motto: ${ctx.brand_motto}`);
  if (ctx.brand_mission) parts.push(`Mission: ${ctx.brand_mission}`);
  if (ctx.goals) parts.push(`Goals: ${ctx.goals}`);
  if (ctx.brand_about) parts.push(`About: ${ctx.brand_about}`);
  if (parts.length === 0) return '';
  return `Brand Context (use if helpful; ignore if irrelevant):\n- ${parts.join('\n- ')}`;
}

// ---------------- Output Sanitization ----------------
function cleanContent(text: string): string {
  if (!text) return '';
  let t = String(text);
  // Strip code fences
  t = t.replace(/^```[\s\S]*?\n?|```$/g, '');
  t = t.replace(/```[a-z]*\n([\s\S]*?)```/gi, '$1');
  // Remove common preface phrases at the start
  t = t.replace(/^(?:here(?:'|’)s|below is|sure[,\s]|certainly[,\s]|as an ai[,\s]|i can[,\s]|let me[,\s]|here you go[,\s]|here is[,\s]|here are[,\s])/i, '');
  // Remove leading meta lines like "Output:" or "Answer:"
  t = t.replace(/^(?:output|answer|result|content)\s*:\s*/i, '');
  // Trim excess whitespace
  t = t.trim();
  return t;
}

// ---------------- LinkedIn Post Editor ----------------
export interface LinkedInPostParts {
  title: string;
  body: string;
  cta: string;
}

export async function editLinkedInPostWithGemini(
  current: LinkedInPostParts,
  instruction: string,
  tone: string = 'professional'
): Promise<LinkedInPostParts> {
  if (!genAI || !textModel) {
    throw new Error('Gemini AI not configured. Please add VITE_GEMINI_API_KEY.');
  }

  const systemInstruction = [
    'You are an expert LinkedIn content editor.',
    `Rewrite the provided post according to the user's edit instruction while keeping a ${tone} tone and preserving factual details unless explicitly asked to change.`,
    'Return ONLY strict JSON with keys: "title", "body", "cta". No markdown fences, no commentary.',
    'Make the body concise and engaging for LinkedIn (roughly 80-220 words).'
  ].join(' ');

  const userPrompt = `Current Post:\nTitle: ${current.title}\nBody: ${current.body}\nCTA: ${current.cta}\n\nEdit Instruction: ${instruction}\n\nOutput: JSON with keys {"title","body","cta"} and nothing else.`;

  const res = await textModel.generateContent(`${systemInstruction}\n\n${userPrompt}`);
  const raw = res.response.text();

  const parsed = safeParseLinkedInJson(raw);
  if (!parsed) {
    throw new Error('AI returned an invalid response. Please try a clearer instruction.');
  }
  return parsed;
}

function safeParseLinkedInJson(text: string): LinkedInPostParts | null {
  if (!text) return null;
  // Strip common code fences if present
  const fencedMatch = text.match(/```(?:json)?([\s\S]*?)```/i);
  const candidate = fencedMatch ? fencedMatch[1] : text;

  // Find the first JSON object
  const objMatch = candidate.match(/\{[\s\S]*\}/);
  const jsonStr = objMatch ? objMatch[0] : candidate;

  try {
    const obj = JSON.parse(jsonStr);
    const title = String(obj.title ?? '').trim();
    const body = String(obj.body ?? '').trim();
    const cta = String(obj.cta ?? '').trim();
    if (!title && !body && !cta) return null;
    return { title: title || '', body: body || '', cta: cta || '' };
  } catch {
    return null;
  }
}