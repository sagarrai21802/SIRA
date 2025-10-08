import { humanizeContent } from './gemini';

export interface HumanizerParams {
  text: string;
  readability?: string;
  purpose?: string;
  strength?: string;
  model?: string;
}

export interface HumanizerResult {
  originalText: string;
  humanizedText: string;
  suggestions: string[];
}

export interface UserCredits {
  baseCredits: number;
  boostCredits: number;
  credits: number;
}

export const checkUserCredits = async (): Promise<UserCredits> => {
  // Since we're using Gemini, return unlimited credits
  return {
    baseCredits: 999999,
    boostCredits: 999999,
    credits: 999999
  };
};

export const humanizeText = async ({
  text,
  readability = 'High School',
  purpose = 'General Writing',
  strength = 'More Human',
  model = 'v11'
}: HumanizerParams): Promise<HumanizerResult> => {
  try {
    // Validate minimum length
    if (text.length < 50) {
      throw new Error('Text must be at least 50 characters long');
    }

    // Use Gemini to humanize the text
    const humanizedText = await humanizeContent(text, purpose.toLowerCase());

    return {
      originalText: text,
      humanizedText,
      suggestions: [
        'Review the humanized text for natural flow',
        'Consider adding personal anecdotes if applicable',
        'Check if the tone matches your intended audience',
        'You can further adjust specific phrases to your style'
      ]
    };
  } catch (error) {
    console.error('Failed to humanize text:', error);
    throw error;
  }
};