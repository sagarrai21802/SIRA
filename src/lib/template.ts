

import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_ENDPOINTS, getApiUrl } from "./api";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Template generation will be disabled.");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
// Use a supported text model
const model = genAI?.getGenerativeModel({ model: "gemini-2.0-flash" });

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
  description = "",
  tone = "neutral",
  style = "standard",
}: TemplateParams): Promise<TemplateResult> => {
  if (!model) throw new Error("Gemini model not initialized.");

  // Fetch brand/user context (optional)
  const ctx = await fetchBrandContext();
  const ctxBlock = buildContextBlock(ctx);

  const systemPrompt = `
You are a professional template designer. Based on the given parameters, create a ready-to-use template.

Include:
1. Template Title (max 100 characters)
2. Template Body (well-structured text, max 2000 characters for LinkedIn posts)
3. Call-to-Action phrase (max 100 characters)
4. Tips (array of 3-5 short suggestions, max 50 characters each)

IMPORTANT: Keep the templateBody under 2000 characters for social media posts.

 Output rules (strict):
 - Return ONLY the JSON object described below. No preface, no commentary, no explanations.
 - Do NOT wrap output in markdown/code fences.
 - Template fields must be content-only. No phrases like "Here is" / "Below is" / "Sure," etc.
 - Avoid bullets/stars in templateBody unless user explicitly requested list formatting.

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
${ctxBlock ? `- Personalization (use if helpful; ignore if irrelevant):\n${ctxBlock}` : ''}
`.trim();

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
    });

    const text = result.response.text();

    // Extract JSON safely
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    const parsed = JSON.parse(jsonString) as TemplateResult;
    return sanitizeTemplateResult(parsed);
  } catch (error) {
    console.error("Failed to generate template:", error);
    throw new Error("Error generating template. Try again later.");
  }
};
type BrandCtx = {
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

let cachedCtx: BrandCtx = null;
let cachedCtxAt: number | null = null;

async function fetchBrandContext(): Promise<BrandCtx> {
  if (cachedCtx && cachedCtxAt && Date.now() - cachedCtxAt < 120_000) return cachedCtx;
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (!token) return null;
    const res = await fetch(getApiUrl(API_ENDPOINTS.ME), { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return null;
    const data = await res.json();
    const u = data?.user || {};
    cachedCtx = {
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
    cachedCtxAt = Date.now();
    return cachedCtx;
  } catch {
    return null;
  }
}

function buildContextBlock(ctx: BrandCtx): string {
  if (!ctx) return '';
  const parts: string[] = [];
  if (ctx.company_name) parts.push(`  • Company: ${ctx.company_name}`);
  if (ctx.industry) parts.push(`  • Industry: ${ctx.industry}`);
  if (ctx.business_type) parts.push(`  • Business Type: ${ctx.business_type}`);
  if (ctx.location) parts.push(`  • Location: ${ctx.location}`);
  if (ctx.company_size) parts.push(`  • Company Size: ${ctx.company_size}`);
  if (ctx.target_audience) parts.push(`  • Target Audience: ${ctx.target_audience}`);
  if (ctx.brand_voice) parts.push(`  • Brand Voice: ${ctx.brand_voice}`);
  if (ctx.primary_brand_color) parts.push(`  • Primary Brand Color: ${ctx.primary_brand_color}`);
  if (ctx.brand_motto) parts.push(`  • Motto: ${ctx.brand_motto}`);
  if (ctx.brand_mission) parts.push(`  • Mission: ${ctx.brand_mission}`);
  if (ctx.goals) parts.push(`  • Goals: ${ctx.goals}`);
  if (ctx.brand_about) parts.push(`  • About: ${ctx.brand_about}`);
  return parts.length ? parts.join('\n') : '';
}

// ---------------- Output Sanitization ----------------
function sanitizeTemplateResult(r: TemplateResult): TemplateResult {
  const clean = (s: string): string => {
    if (!s) return '';
    let t = String(s);
    // Strip code fences
    t = t.replace(/^```[\s\S]*?\n?|```$/g, '');
    t = t.replace(/```[a-z]*\n([\s\S]*?)```/gi, '$1');
    // Remove common preface phrases at the start
    t = t.replace(/^(?:here(?:'|’)s|below is|sure[,\s]|certainly[,\s]|as an ai[,\s]|i can[,\s]|let me[,\s]|here you go[,\s]|here is[,\s]|here are[,\s])/i, '');
    // Remove leading labels
    t = t.replace(/^(?:output|answer|result|content)\s*:\s*/i, '');
    // Remove leading list markers like *, -, • at line starts when not explicitly desired
    t = t.replace(/^[\t ]*([*\-•]+)[\t ]+/gm, '');
    // Trim whitespace
    return t.trim();
  };
  return {
    templateTitle: clean(r.templateTitle),
    templateBody: clean(r.templateBody),
    callToAction: clean(r.callToAction),
    tips: Array.isArray(r.tips) ? r.tips.map(clean).filter(Boolean) : []
  };
}

