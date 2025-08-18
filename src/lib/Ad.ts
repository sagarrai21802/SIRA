import { supabase } from "./supabaseClient";
import { generateWithGemini } from "./gemini";

export interface AdRequest {
  platform: "google" | "meta";
  product: string;
  audience: string;
  tone: string;
}

export interface AdVariant {
  headline: string;
  description: string;
  callToAction: string;
}

export async function generateAds(req: AdRequest, userId?: string) {
  const prompt = `
Generate 3 ${req.platform === "google" ? "Google Search Ads" : "Meta (Facebook/Instagram) Ads"} 
for a product: "${req.product}".  
Target audience: ${req.audience}.  
Tone: ${req.tone}.
`;

  const text = await generateWithGemini({
    prompt,
    contentType: "ads",
    tone: req.tone,
  });

  // parse Gemini output
  const variants: AdVariant[] = text
    .split(/\d+\./)
    .map((chunk) => {
      const headline = chunk.match(/Headline:(.*)/i)?.[1]?.trim() || "";
      const description = chunk.match(/Description:(.*)/i)?.[1]?.trim() || "";
      const callToAction = chunk.match(/(CTA|Call To Action):(.*)/i)?.[2]?.trim() || "";
      if (!headline && !description) return null;
      return { headline, description, callToAction };
    })
    .filter(Boolean) as AdVariant[];

  if (userId) {
    await supabase.from("ads_generations").insert({
      user_id: userId,
      platform: req.platform,
      product: req.product,
      audience: req.audience,
      tone: req.tone,
      ads: variants,
    });
  }

  return variants;
}
