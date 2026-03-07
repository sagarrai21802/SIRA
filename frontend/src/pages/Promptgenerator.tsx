import React, { useState } from "react";
import { motion } from "framer-motion";
import { generatePrompt } from "../lib/Promptgenerator";
import { Copy, Check, Image, Video, Sparkles, Lightbulb, Wand2, Layers, Zap, ArrowRight, Loader2 } from "lucide-react";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-600 shadow-lg mb-4"
          >
            <Wand2 className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text mb-3">
            Prompt Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Create stunning prompts for images and videos with AI assistance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8"
        >
          <div className="flex gap-4 mb-8 justify-center">
            {[
              { type: "image", icon: Image, label: "Image" },
              { type: "video", icon: Video, label: "Video" }
            ].map(({ type: t, icon: Icon, label }) => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setType(t as "image" | "video")}
                className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  type === t
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <Icon className="w-5 h-5 mr-2" /> {label}
              </motion.button>
            ))}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Describe your idea
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={`Describe your ${type} idea in detail...`}
              className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-900 dark:text-white resize-none focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 transition-all duration-200"
              rows={4}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-6"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Generate Prompt</>
            )}
          </motion.button>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 rounded-xl flex items-start gap-3"
            >
              <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" />
              {error}
            </motion.div>
          )}

          {!result && !loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-600"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 mb-4">
                <Wand2 className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">Ready to generate amazing prompts</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Enter your idea above and click generate</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div
                variants={itemVariants}
                className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl relative shadow-md border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">Main Prompt</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pr-12">{result.prompt}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCopy(result.prompt, "prompt")}
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                >
                  {copied === "prompt" ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              </motion.div>

              {result.variations?.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl shadow-md border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-5 h-5 text-blue-500" />
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">Variations</h3>
                  </div>
                  <ul className="space-y-3">
                    {result.variations.map((v: string, i: number) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex justify-between items-start bg-white/70 dark:bg-gray-800/70 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600"
                      >
                        <span className="flex-1 text-gray-700 dark:text-gray-300 pr-4">{v}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCopy(v, `variation-${i}`)}
                          className="text-gray-500 hover:text-blue-500 p-1 rounded transition-colors flex-shrink-0"
                        >
                          {copied === `variation-${i}` ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        </motion.button>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {result.tips?.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-md border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-green-500" />
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {result.tips.map((tip: string, i: number) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <ArrowRight className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
