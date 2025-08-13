import React, { useState, useEffect } from "react";
import { FileText, Sparkles, Copy, Download } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function GenerateTemplate() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedTemplate, setGeneratedTemplate] = useState("");
  const [dailyCount, setDailyCount] = useState(0);

  useEffect(() => {
    if (user) checkDailyQuota();
  }, [user]);

  const checkDailyQuota = async () => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    const { count } = await supabase
      .from("template_generations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", today + "T00:00:00.000Z")
      .lt("created_at", today + "T23:59:59.999Z");
    setDailyCount(count || 0);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return toast.error("Please enter a prompt");
    if (dailyCount >= 5) return toast.error("Daily limit reached! Upgrade to generate more.");

    setLoading(true);
    setGeneratedTemplate("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });
      const template = result.response.text();
      setGeneratedTemplate(template);

      if (user) {
        await supabase.from("template_generations").insert({
          user_id: user.id,
          prompt,
          template_content: template,
        });
        setDailyCount((prev) => prev + 1);
      }
      toast.success("Template generated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate template");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTemplate);
    toast.success("Copied to clipboard!");
  };

  const downloadTemplate = () => {
    const blob = new Blob([generatedTemplate], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `template_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <FileText className="w-7 h-7 text-blue-500" />
            Template Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create ready-to-use templates for content, emails, or documents using AI.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 text-sm text-blue-600 dark:text-blue-400 p-3 rounded-lg mb-4">
            Daily quota: {dailyCount}/5 templates used
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the template you want to generate..."
            rows={5}
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-4"
          />

          <button
            onClick={handleGenerate}
            disabled={loading || dailyCount >= 5}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-white transition ${
              loading || dailyCount >= 5
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            {loading ? "Generating..." : "Generate Template"}
          </button>
        </div>

        {generatedTemplate && (
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-fadeIn"
            style={{ animation: "fadeIn 0.3s ease-in-out" }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Generated Template
            </h2>
            <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg mb-4">
              {generatedTemplate}
            </pre>
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <Copy className="w-5 h-5" /> Copy
              </button>
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <Download className="w-5 h-5" /> Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
