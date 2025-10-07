const API_BASE = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';

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
  try {
    const response = await fetch(`${API_BASE}/api/humanize/credits`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch user credits');
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch credits:', error);
    throw error;
  }
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

    // Step 1: Submit the text to be humanized
    const submitResponse = await fetch(`${API_BASE}/api/humanize/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: text,
        readability,
        purpose,
        strength,
        model
      })
    });

    const submitData = await submitResponse.json();
    
    // Handle errors from the API
    if (!submitResponse.ok) {
      if (submitResponse.status === 400 || submitResponse.status === 402) {
        // Payment required or insufficient credits
        throw new Error(submitData.error || 'Insufficient credits. Please top up your account.');
      } else if (submitResponse.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error(submitData.error || 'Failed to submit text for humanization');
      }
    }
    
    if (!submitData.id) {
      throw new Error(submitData.error || 'Failed to submit text for humanization');
    }

    const documentId = submitData.id;

    // Step 2: Poll for the document result
    const pollDocument = async (attempts = 0): Promise<HumanizerResult> => {
      // Timeout after 60 seconds (12 attempts × 5 seconds)
      if (attempts > 12) {
        throw new Error('Request timeout. Processing took too long. Please try again.');
      }

      const documentResponse = await fetch(`${API_BASE}/api/humanize/document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: documentId })
      });

      const documentData = await documentResponse.json();

      // Check if processing is complete
      if (documentData.output) {
        return {
          originalText: documentData.input || text,
          humanizedText: documentData.output,
          suggestions: [
            'Review the humanized text for natural flow',
            'Consider adding personal anecdotes if applicable',
            'Check if the tone matches your intended audience',
            'You can further adjust specific phrases to your style'
          ]
        };
      } else if (documentData.error) {
        throw new Error(documentData.error);
      } else {
        // Still processing, poll again after 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
        return pollDocument(attempts + 1);
      }
    };

    return await pollDocument();
  } catch (error) {
    console.error('Failed to humanize text:', error);
    throw error;
  }
};