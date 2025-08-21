import React, { useState } from "react";
import { generatePrompt } from "../lib/Promptgenerator"; // your TS file
import { Copy, Check } from "lucide-react";

export default function PromptGeneratorUI() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState<"image" | "video" | "custom">("image");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await generatePrompt({ topic, type });
      setResult(res);
    } catch (err) {
      console.error(err);
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
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      {/* Tabs */}
      <div className="flex gap-3 mb-5">
        {["image", "video"].map((t) => (
          <button
            key={t}
            onClick={() => setType(t as any)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              type === t
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-105"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Input */}
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder={`Enter your ${type} idea...`}
        className="w-full p-3 border rounded-xl dark:bg-gray-800 dark:text-white mb-4"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        {loading ? "Generating..." : "Generate Prompt"}
      </button>

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Main Prompt */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl relative">
            <h3 className="font-bold mb-2">Main Prompt</h3>
            <p className="text-gray-700 dark:text-gray-300">{result.prompt}</p>
            <button
              onClick={() => handleCopy(result.prompt, "prompt")}
              className="absolute top-3 right-3 text-gray-500 hover:text-blue-500"
            >
              {copied === "prompt" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          {/* Variations */}
          {result.variations?.length > 0 && (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <h3 className="font-bold mb-2">Variations</h3>
              <ul className="space-y-2">
                {result.variations.map((v: string, i: number) => (
                  <li key={i} className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                    <span>{v}</span>
                    <button
                      onClick={() => handleCopy(v, `variation-${i}`)}
                      className="text-gray-500 hover:text-blue-500"
                    >
                      {copied === `variation-${i}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          {result.tips?.length > 0 && (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <h3 className="font-bold mb-2">Tips</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.tips.map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
