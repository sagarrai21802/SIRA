import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Generate a refined, text-free image for template content
 * @param concept - A short description or keywords to visualize
 * @param size - Optional size hint like "1200x628" (LinkedIn) or "1080x1080" (Instagram)
 * @returns Base64 data URL string for rendering directly in <img src="..." />
 */
export async function generateTemplateImage(concept: string, size?: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });

    // Make the prompt clean & text-free
    // const finalPrompt = `
    //   Create a high-quality, professional illustration based on: "${concept}".
    //   The image should be refined, modern, and visually appealing.
    //   Do NOT include any text, words, numbers, or watermarks.
    //   Style: cinematic, sharp, clean, and realistic.
    //   ${size ? `Target dimensions: ${size}.` : ""}
    // `;


 const finalPrompt = `
  Create a high-quality, professional illustration based on: "${concept}".
  The image should be refined, modern, and visually appealing.
  If the image represents an infographic, ensure all text is perfectly clear, readable, and well-placed.
  Otherwise, do not include any text, words, numbers, or watermarks.
  Style: cinematic, sharp, clean, and realistic.
  ${size ? `Target dimensions: ${size}.` : ""}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [
        {
          role: "user",
          parts: [{ text: finalPrompt }],
        },
      ],
      config: {
        responseModalities: [Modality.TEXT,Modality.IMAGE], // Only request IMAGE
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate) throw new Error("No candidate returned");

    const imagePart = candidate.content.parts.find((p: any) => p.inlineData?.data);
    if (!imagePart) throw new Error("No image returned");

    return `data:image/png;base64,${imagePart.inlineData.data}`;
  } catch (err) {
    console.error("Template Image generation error:", err);
    throw err;
  }
}
