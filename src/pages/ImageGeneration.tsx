import React, { useState } from "react";
import { generateImage } from "../lib/generateimage";

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (err) {
      setError("Failed to generate image. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h2 className="text-2xl font-semibold mb-4">Generate Image</h2>

      <textarea
        className="w-full p-2 border rounded-md mb-2"
        rows={4}
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Generated" className="rounded-md shadow-md mx-auto" />
        </div>
      )}
    </div>
  );
};