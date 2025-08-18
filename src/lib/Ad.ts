import { generateWithGemini } from "../lib/gemini";

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
}

export interface AdOutput {
  adSet: {
    audience: string;
    demographics: string;
    location: string;
    placements: string;
  };
  adCopy: AdVariant[];
}

export async function generateAdStrategy(req: AdRequest): Promise<AdOutput> {
  const prompt = `
Generate a Meta Ads strategy with two parts:

1) **Ad Set Suggestions**
- Suggest the ideal target audience (interests, behaviors).
- Suggest demographics (age, gender).
- Suggest locations.
- Suggest best ad placements (Reels, Feed, Stories, Timeline, etc).

2) **Ad Copy Suggestions**
Based on Creative Type = ${req.creativeType}.
Generate 3 ads with Headline, Description, and Call To Action.

Campaign Objective: ${req.campaignObjective}
Budget: ${req.budget}
Duration: ${req.duration} days
Product/Service Declaration: ${req.declaration}
`;

  const text = await generateWithGemini({
    prompt,
    contentType: "ads",
    tone: req.creativeType,
  });

  // Rough parsing
  const adSet = {
    audience:
      text.match(/Audience:(.*)/i)?.[1]?.trim() || "General Interest Audience",
    demographics:
      text.match(/Demographics:(.*)/i)?.[1]?.trim() ||
      "18-45, All Genders",
    location:
      text.match(/Location:(.*)/i)?.[1]?.trim() || "Urban Cities",
    placements:
      text.match(/Placements:(.*)/i)?.[1]?.trim() ||
      "Meta Reels, Stories, Feed",
  };

  const adCopy: AdVariant[] = text
    .split(/\d+\./) // split ads
    .map((chunk) => {
      const headline = chunk.match(/Headline:(.*)/i)?.[1]?.trim() || "";
      const description =
        chunk.match(/Description:(.*)/i)?.[1]?.trim() || "";
      const callToAction =
        chunk.match(/(CTA|Call To Action):(.*)/i)?.[2]?.trim() || "";
      if (!headline && !description) return null;
      return { headline, description, callToAction };
    })
    .filter(Boolean) as AdVariant[];

  return { adSet, adCopy };
}