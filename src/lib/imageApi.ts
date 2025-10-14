import { API_BASE, API_ENDPOINTS } from "./api";

export type GenerateImageParams = {
  userId: string;
  prompt: string;
  imageType: string;
  width: number;
  height: number;
  quality?: string;
};

export function parseSize(size: string): { width: number; height: number } {
  const match = String(size).match(/^(\d+)x(\d+)$/);
  if (!match) return { width: 1080, height: 1080 };
  return { width: parseInt(match[1], 10), height: parseInt(match[2], 10) };
}

export async function generateImageBackend(params: GenerateImageParams): Promise<string> {
  const { userId, prompt, imageType, width, height, quality = "high" } = params;
  const response = await fetch(`${API_BASE}${API_ENDPOINTS.GENERATE_IMAGE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      prompt,
      image_type: imageType,
      width,
      height,
      quality
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as any)?.error || 'Failed to generate image');
  }
  const url = (data as any)?.image_url as string | undefined;
  if (!url) throw new Error('No image_url returned');
  return url;
}


