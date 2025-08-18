

import React, { useState } from "react";
import { generateImage } from "../lib/generateimage";
import { Loader2, Download, Copy, Cpu } from "lucide-react";
import toast from "react-hot-toast";

const IMAGE_TYPES = ["Realistic", "Cartoon", "3D", "Anime", "Pixel Art"];
const IMAGE_SIZES = [
  { label: "256x256", width: 256, height: 256 },
  { label: "512x512", width: 512, height: 512 },
  { label: "1024x1024", width: 1024, height: 1024 },
  
  // Social Media Sizes
  { label: "Instagram Post 1:1", width: 1080, height: 1080 }, // square
  { label: "Instagram Story 9:16", width: 1080, height: 1920 }, // story
  { label: "Facebook Post 1.91:1", width: 1200, height: 628 }, // horizontal
  { label: "Facebook Cover 16:9", width: 820, height: 312 }, // cover
  { label: "LinkedIn Post 1.91:1", width: 1200, height: 627 },
  { label: "LinkedIn Banner 4:1", width: 1584, height: 396 },
];


export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState(IMAGE_TYPES[0]);
  const [size, setSize] = useState(IMAGE_SIZES[1]);
  const [loadingMessage, setLoadingMessage] = useState("Generating your image...");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError(null);
    setImage(null);
    setLoadingMessage("Initializing AI engine...");

    try {
      const fullPrompt = `${prompt} | Style: ${type} | Size: ${size.label}`;
      
      // Animate loading messages
      const messages = [
        "Analyzing your prompt...",
        "Generating visual...",
        "Almost there..."
      ];
      let i = 0;
      const msgInterval = setInterval(() => {
        setLoadingMessage(messages[i % messages.length]);
        i++;
      }, 1000);

      // Generate a single image
      const url = await generateImage(fullPrompt);
      setImage(url);
      toast.success("Image generated!");
      clearInterval(msgInterval);
    } catch (err) {
      setError("Failed to generate image. Check console.");
      toast.error("Image generation failed!");
    } finally {
      setLoading(false);
      setLoadingMessage("Generating your image...");
    }
  };

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated-image.png";
    link.click();
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied!");
  };

  const handleCopyImageUrl = () => {
    if (!image) return;
    navigator.clipboard.writeText(image);
    toast.success("Image URL copied!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gray-200 text-gray-900 dark:text-white dark:bg-gray-950">
        AI Image Generator
      </h2>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col gap-4 transition-all duration-300">
        <textarea
          className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-900 dark:text-white transition-all"
          rows={4}
          placeholder="Enter your creative prompt here... Example: 'A futuristic city skyline at sunset, cinematic lighting'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="flex flex-wrap gap-4 justify-center">
          <select
            className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white hover:border-blue-500 transition"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {IMAGE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
              className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white hover:border-blue-500 transition"
              value={size.label || ""}
              onChange={(e) => {
                const selected = IMAGE_SIZES.find((s) => s.label === e.target.value);
                if (selected) setSize(selected);
              }}
            >
              {/* Default heading option */}
              <option value="" disabled>
                Select Size
              </option>

              {IMAGE_SIZES.map((s) => (
                <option key={s.label} value={s.label}>
                  {s.label}
                </option>
              ))}
            </select>

        </div>

        <div className="flex flex-wrap gap-4 justify-center mt-2">
          <button
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>
                <Cpu className="w-5 h-5" /> Generate Image
              </>
            )}
          </button>

          {image && (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              onClick={handleCopyPrompt}
            >
              <Copy className="w-4 h-4" /> Copy Prompt
            </button>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-center font-medium mt-2">{error}</div>
        )}
      </div>

      {loading && (
        <div className="mt-6 flex flex-col items-center justify-center text-gray-500 dark:text-gray-300 space-y-4">
          <div className="animate-pulse bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full w-12 h-12 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-white animate-bounce" />
          </div>
          <p className="text-lg font-medium">{loadingMessage}</p>
        </div>
      )}

      {image && (
        <div className="mt-8 relative rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform">
          <img src={image} alt="Generated" className="w-full h-auto" />
          <div className="absolute bottom-2 left-2 flex gap-2">
            <button
              className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 flex items-center gap-1"
              onClick={handleDownload}
            >
              <Download className="w-3 h-3" /> Download
            </button>
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 flex items-center gap-1"
              onClick={handleCopyImageUrl}
            >
              <Copy className="w-3 h-3" /> Copy URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};