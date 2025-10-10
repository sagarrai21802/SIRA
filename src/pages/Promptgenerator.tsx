import React, { useState } from "react";
import { generatePrompt } from "../lib/Promptgenerator"; // your TS file
import { Copy, Check, Image, Video, Sparkles } from "lucide-react";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";

export default function PromptGeneratorUI() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState<"image" | "video">("image");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await generatePrompt({ topic, type });
      setResult(res);
    } catch (err) {
      console.error(err);
      setError("Failed to generate prompt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Prompt Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create stunning prompts for images and videos with AI assistance
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 justify-center">
        {["image", "video"].map((t, index) => {
          const icons = [<Image className="w-5 h-5 mr-2" />, <Video className="w-5 h-5 mr-2" />];
          return (
            <button
              key={t}
              onClick={() => setType(t as "image" | "video")}
              className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                type === t
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105"
              }`}
            >
              {icons[index]} {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Input Section */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Describe your idea
        </label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={`Describe your ${type} idea in detail...`}
          className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          rows={4}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading || !topic.trim()}
        className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mb-6"
      >
        {loading ? <LoadingSpinner size="sm" color="white" /> : <Sparkles className="w-5 h-5" />}
        {loading ? "Generating..." : "Generate Prompt"}
      </button>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-xl">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main Prompt */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl relative shadow-md">
            <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-500" /> Main Prompt
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{result.prompt}</p>
            <button
              onClick={() => handleCopy(result.prompt, "prompt")}
              className="absolute top-4 right-4 text-gray-500 hover:text-blue-500 transition-colors"
            >
              {copied === "prompt" ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
            </button>
          </div>

          {/* Variations */}
          {result.variations?.length > 0 && (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white flex items-center">
                <Image className="w-5 h-5 mr-2 text-blue-500" /> Variations
              </h3>
              <ul className="space-y-3">
                {result.variations.map((v: string, i: number) => (
                  <li key={i} className="flex justify-between items-start bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg shadow-sm">
                    <span className="flex-1 text-gray-700 dark:text-gray-300">{v}</span>
                    <button
                      onClick={() => handleCopy(v, `variation-${i}`)}
                      className="ml-3 text-gray-500 hover:text-blue-500 transition-colors flex-shrink-0"
                    >
                      {copied === `variation-${i}` ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          {result.tips?.length > 0 && (
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white flex items-center">
                💡 Tips
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {result.tips.map((tip: string, i: number) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
