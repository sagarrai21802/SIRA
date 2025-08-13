// // import { useState, useCallback } from "react";

// // interface GenerationResponse {
// //   images?: string[];
// //   text?: string;
// //   error?: {
// //     message?: string;
// //   };
// //   message?: string;
// // }

// // export function useImageGenerator() {
// //   const [loading, setLoading] = useState(false);
// //   const [images, setImages] = useState<string[]>([]);
// //   const [error, setError] = useState<string | null>(null);
// //   const [generationText, setGenerationText] = useState<string | null>(null);
// //   const [lastPrompt, setLastPrompt] = useState<string | null>(null);
// //   const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem("geminiAuthToken"));

// //   // Update auth token in state & localStorage
// //   const setToken = useCallback((token: string) => {
// //     localStorage.setItem("geminiAuthToken", token);
// //     setAuthToken(token);
// //   }, []);

// //   // Clear auth token
// //   const clearToken = useCallback(() => {
// //     localStorage.removeItem("geminiAuthToken");
// //     setAuthToken(null);
// //   }, []);

// //   // Check if error is network related
// //   const isNetworkError = (error: Error): boolean => {
// //     return (
// //       error.message.includes("Failed to fetch") ||
// //       error.message.includes("NetworkError") ||
// //       error.message.includes("ETIMEDOUT") ||
// //       error.message.includes("ECONNRESET")
// //     );
// //   };

// //   // Generate image API call with retry logic for network errors
// //   const generateImage = useCallback(
// //     async (prompt: string, aspectRatio?: string, retryCount = 0): Promise<void> => {
// //       setLoading(true);
// //       setError(null);
// //       setLastPrompt(prompt);

// //       try {
// //         const apiEndpoint = "/api/generate-image";

// //         const headers: HeadersInit = {
// //           "Content-Type": "application/json",
// //           Accept: "application/json",
// //         };

// //         if (authToken) {
// //           headers["Authorization"] = `Bearer ${authToken}`;
// //         }

// //         const response = await fetch(apiEndpoint, {
// //           method: "POST",
// //           headers,
// //           credentials: "include",
// //           body: JSON.stringify({
// //             prompt,
// //             ...(aspectRatio && { aspect_ratio: aspectRatio }),
// //           }),
// //         });

// //         switch (response.status) {
// //           case 401:
// //           case 403:
// //             clearToken();
// //             throw new Error("Authentication required. Please sign in again.");
// //           case 429:
// //             throw new Error("Too many requests. Please wait before trying again.");
// //           case 500:
// //             throw new Error("Server error. Please try again later.");
// //           default:
// //             if (!response.ok) {
// //               throw new Error(`Request failed with status ${response.status}`);
// //             }
// //         }

// //         const data: GenerationResponse = await response.json();

// //         if (data.error) {
// //           throw new Error(data.error.message || "Image generation failed");
// //         }

// //         if (!data.images || data.images.length === 0) {
// //           throw new Error("No images were generated. Please try a different prompt.");
// //         }

// //         setImages(
// //           data.images.map((img) =>
// //             img.startsWith("data:image") ? img : `data:image/png;base64,${img}`
// //           )
// //         );
// //         setGenerationText(data.text || null);
// //       } catch (err) {
// //         const error = err as Error;
// //         console.error("Generation error:", error);

// //         if (retryCount < 1 && isNetworkError(error)) {
// //           setTimeout(() => generateImage(prompt, aspectRatio, retryCount + 1), 1000);
// //           return;
// //         }

// //         setError(error.message);
// //         setImages([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //     [authToken, clearToken]
// //   );

// //   // Regenerate with last prompt
// //   const regenerateImage = useCallback(async (): Promise<void> => {
// //     if (lastPrompt) {
// //       await generateImage(lastPrompt);
// //     }
// //   }, [generateImage, lastPrompt]);

// //   // Reset all generation state
// //   const resetGeneration = useCallback((): void => {
// //     setLoading(false);
// //     setImages([]);
// //     setError(null);
// //     setGenerationText(null);
// //   }, []);

// //   return {
// //     loading,
// //     images,
// //     error,
// //     generationText,
// //     authToken,
// //     setToken,
// //     clearToken,
// //     generateImage,
// //     regenerateImage,
// //     resetGeneration,
// //   };
// // }


// import { useState, useCallback } from "react";

// interface GenerationResponse {
//   images?: string[];
//   text?: string;
//   error?: { message?: string };
// }

// export function useImageGenerator() {
//   const [loading, setLoading] = useState(false);
//   const [images, setImages] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [generationText, setGenerationText] = useState<string | null>(null);
//   const [lastPrompt, setLastPrompt] = useState<string | null>(null);

//   const generateImage = useCallback(
//     async (prompt: string): Promise<void> => {
//       setLoading(true);
//       setError(null);
//       setLastPrompt(prompt);

//       try {
//         const response = await fetch("/api/generate-image", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ prompt }),
// });

// if (!response.ok) {
//   throw new Error(`HTTP error! status: ${response.status}`);
// }

// const data: GenerationResponse = await response.json();

// if (data.error) {
//   throw new Error(data.error.message || "Image generation failed");
// }

// // use data.images here

//         if (!data.images || data.images.length === 0) {
//           throw new Error("No images generated");
//         }

//         setImages(data.images);
//         setGenerationText(data.text || null);
//       } catch (err) {
//         setError((err as Error).message);
//         setImages([]);
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   const regenerateImage = useCallback(async (): Promise<void> => {
//     if (lastPrompt) {
//       await generateImage(lastPrompt);
//     }
//   }, [lastPrompt, generateImage]);

//   const resetGeneration = useCallback(() => {
//     setLoading(false);
//     setImages([]);
//     setError(null);
//     setGenerationText(null);
//   }, []);

//   return {
//     loading,
//     images,
//     error,
//     generationText,
//     generateImage,
//     regenerateImage,
//     resetGeneration,
//   };
// }

// import { useState } from 'react';

// export function useImageGen() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [imageUrl, setImageUrl] = useState('');

//   async function generate(prompt: string) {
//     setError('');
//     setLoading(true);
//     setImageUrl('');
//     try {
//       const res = await fetch('/api/generate-image', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt }),
//       });
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || 'Failed to generate image');
//       }
//       const data = await res.json();
//       setImageUrl(data.imageUrl);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return { loading, error, imageUrl, generate };
// }

import { useState } from 'react';

export function useImageGen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  async function generate(prompt: string) {
    setError('');
    setLoading(true);
    setImageUrl('');
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to generate image');
      }
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, imageUrl, generate };
}