import { enhancePrompt } from './gemini';

export interface ImageGenerationParams {
  prompt: string;
  style: string;
  size: string;
}

export interface ImageGenerationResult {
  imageUrl: string;
  enhancedPrompt: string;
}

export const generateImageWithOpenAI = async ({
  prompt,
  style,
  size
}: ImageGenerationParams): Promise<ImageGenerationResult> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
  }

  try {
    // Enhance prompt with style context
    const stylePrompt = `${prompt}, ${style} style, high quality, professional`;
    const enhancedPrompt = await enhancePrompt(stylePrompt);

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        n: 1,
        size: size,
        quality: 'standard',
        response_format: 'url'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate image');
    }

    const data = await response.json();

    if (!data.data || !data.data[0]) {
      throw new Error('No image returned from API');
    }

    return {
      imageUrl: data.data[0].url,
      enhancedPrompt
    };
  } catch (error) {
    console.error('Image generation error:', error);
    throw error;
  }
};

// Fallback image generation using sample images
export const generateFallbackImage = (prompt: string): string => {
  const sampleImages = [
    'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
    'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
    'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
  ];

  // Use prompt hash to consistently return same image for same prompt
  const hash = prompt.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return sampleImages[Math.abs(hash) % sampleImages.length];
};