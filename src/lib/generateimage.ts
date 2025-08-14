
import { GoogleGenAI, Modality } from "@google/genai";

export async function generateImage(prompt: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE], // ✅ must request both
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate) throw new Error("No candidate returned");

    const imagePart = candidate.content.parts.find(
      (p: any) => p.inlineData?.data
    );
    if (!imagePart) throw new Error("No image returned");

    const base64Data = imagePart.inlineData.data;
    return `data:image/png;base64,${base64Data}`;
  } catch (err) {
    console.error("Image generation error:", err);
    throw err;
  }
}
