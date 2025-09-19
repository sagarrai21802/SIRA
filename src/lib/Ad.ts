

import { generateWithGemini } from "../lib/gemini";
//nothing
export interface AdRequest {
  platform: "meta";
  campaignObjective: string;
  budget: string;
  duration: string;
  creativeType: string;
  declaration: string;
}

export interface AdVariant {
  headline: string;
  description: string;
  callToAction: string;
  tagline?: string;
  imagePlacement?: string;
}

export interface AdOutput {
  adSet: {
    audience: string;
    demographics: string;
    targetingType: string; // interest, demographic, or behavior
    placements: string;
    imageTips?: string;
  };
  adCopy: AdVariant[];
}

export async function generateAdStrategy(req: AdRequest): Promise<AdOutput> {
  const prompt = `
You are an expert Meta Ads strategist. Generate a **complete ad strategy** with two parts:

### 1) Ad Set Suggestions
- **Audience**: Describe the target audience clearly.
- **Demographics**: Always include age range and gender.
- **Targeting Type**: Explicitly say whether this is based on *Interests*, *Behaviors*, or *Demographics*.
- **Placements**: ALWAYS suggest placements (choose from: Reels, Feed, Stories, Timeline, Marketplace, Right Column, etc).
- **Image Tips**: Suggest how creatives should be styled.

### 2) Ad Copy Suggestions
Creative Type = ${req.creativeType}.
Generate **3 unique ads** with:
- Headline
- Description
- Call To Action
- Tagline
- Recommended Image Placement (e.g., "centered lifestyle shot", "product close-up with white background")

### Campaign Details
- Objective: ${req.campaignObjective}
- Budget: ${req.budget}
- Duration: ${req.duration}
- Product/Service: ${req.declaration}

⚠️ IMPORTANT:
- Do NOT skip any field.
- Provide demographics (age + gender) every time.
- Explicitly state targeting type (Interest / Behavior / Demographic).
- Placements must always be included.
`;

  const text = await generateWithGemini({
    prompt,
    contentType: "ads",
    tone: req.creativeType,
    temperature: 0.85, // makes results vary
    top_p: 0.9,
  });

  const adSet = {
    audience:
      text.match(/Audience:(.*)/i)?.[1]?.trim() || "General Interest Audience",
    demographics:
      text.match(/Demographics:(.*)/i)?.[1]?.trim() ||
      "18-45, All Genders",
    targetingType:
      text.match(/Targeting Type:(.*)/i)?.[1]?.trim() ||
      "Interest-based targeting",
    placements:
      text.match(/Placements:(.*)/i)?.[1]?.trim() ||
      "Meta Reels, Stories, Feed",
    imageTips:
      text.match(/Image Tips:(.*)/i)?.[1]?.trim() ||
      "Use high-resolution lifestyle images with bright colors.",
  };

  const adCopy: AdVariant[] = text
    .split(/\d+\./)
    .map((chunk) => {
      const headline = chunk.match(/Headline:(.*)/i)?.[1]?.trim() || "";
      const description =
        chunk.match(/Description:(.*)/i)?.[1]?.trim() || "";
      const callToAction =
        chunk.match(/(CTA|Call To Action):(.*)/i)?.[2]?.trim() || "";
      const tagline =
        chunk.match(/Tagline:(.*)/i)?.[1]?.trim() || "";
      const imagePlacement =
        chunk.match(/Image Placement:(.*)/i)?.[1]?.trim() || "";

      if (!headline && !description && !tagline) return null;

      return { headline, description, callToAction, tagline, imagePlacement };
    })
    .filter(Boolean) as AdVariant[];

  return { adSet, adCopy };
}