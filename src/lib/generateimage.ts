// // generateImage.ts
// import { GoogleGenAI, Modality } from "@google/genai";

// export async function generateImage(prompt: string): Promise<string> {
//   try {
//     const ai = new GoogleGenAI({
//       apiKey: process.env.VITE_GEMINI_API_KEY, // Make sure this is exposed for frontend
//     });

//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash-preview-image-generation",
//       contents: prompt,
//       config: {
//         responseModalities: [Modality.TEXT, Modality.IMAGE],
//       },
//     });

//     // Extract first image from response
//     for (const part of response.candidates[0].content.parts) {
//       if (part.inlineData) {
//         const base64Data = part.inlineData.data;
//         const imageUrl = `data:image/png;base64,${base64Data}`;
//         return imageUrl; // Return as data URL for frontend rendering
//       }
//     }

//     throw new Error("No image returned from API.");
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// import { GoogleGenAI, Modality } from "@google/genai";

// export async function generateImage(prompt: string): Promise<string> {
//   try {
//     const ai = new GoogleGenAI({
//       apiKey: import.meta.env.VITE_GEMINI_API_KEY, // exposed via Vite
//     });

//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash-preview-image-generation",
//       contents: prompt,
//       config: {
//         responseModalities: [Modality.IMAGE],
//       },
//     });

//     // Extract first image from response
//     const candidate = response.candidates?.[0];
//     if (!candidate) throw new Error("No candidate returned");

//     const imagePart = candidate.content.parts.find((p: any) => p.inlineData?.data);
//     if (!imagePart) throw new Error("No image returned");

//     const base64Data = imagePart.inlineData.data;
//     return `data:image/png;base64,${base64Data}`; // Render directly in <img>
//   } catch (err) {
//     console.error("Image generation error:", err);
//     throw err;
//   }
// }

import { GoogleGenAI, Modality } from "@google/genai";

export async function generateImage(prompt: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE], // <- FIXED
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate) throw new Error("No candidate returned");

    const imagePart = candidate.content.parts.find((p: any) => p.inlineData?.data);
    if (!imagePart) throw new Error("No image returned");

    const base64Data = imagePart.inlineData.data;
    return `data:image/png;base64,${base64Data}`;
  } catch (err) {
    console.error("Image generation error:", err);
    throw err;
  }
}