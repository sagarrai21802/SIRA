
import React, { useState, useEffect } from "react";
import {
  FileText,
  Sparkles,
  Linkedin,
  Image as ImageIcon,
  Copy,
  Download,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
// import { getMongoDb } from "../lib/realm";
import toast from "react-hot-toast";
import { generateTemplate } from "../lib/template";
import { generateTemplateImage } from "../lib/templateImage";
import { generateImageBackend, parseSize } from "../lib/imageApi";
import { ModernDropdown } from "../components/UI/ModernDropdown";

type Platform = "linkedin" | "facebook" | "instagram";

export default function GenerateTemplate() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedTemplate, setGeneratedTemplate] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [dailyCount, setDailyCount] = useState(0);
  const [selectedCard, setSelectedCard] = useState<Platform | null>(null);

  const [industry, setIndustry] = useState("");
  const [role, setRole] = useState("");

  const industries = ["Technology", "Finance", "Healthcare", "Education", "Marketing", "Other"];
  const roles = ["Founder", "HR", "Employee", "Student", "Manager", "CEO", "Assistant Manager", "Accountant", "Team Lead"];

  const platforms: {
    key: Platform;
    label: string;
    icon: JSX.Element;
    description: string;
  }[] = [
    {
      key: "linkedin",
      label: "LinkedIn Post",
      icon: <Linkedin className="text-blue-700 dark:text-blue-400 w-6 h-6" />,
      description: "Craft professional LinkedIn posts",
    },
    {
      key: "facebook",
      label: "Facebook Post",
      icon: <FileText className="text-blue-600 w-6 h-6" />,
      description: "Engaging Facebook updates",
    },
    {
      key: "instagram",
      label: "Instagram Caption",
      icon: <Sparkles className="text-pink-500 w-6 h-6" />,
      description: "Catchy captions with hashtags",
    },
  ];

  useEffect(() => {
    if (user) checkDailyQuota();
  }, [user]);

  const checkDailyQuota = async () => {
    if (!user) return;
    const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
    const resp = await fetch(`${apiBase}/api/template-generations/daily-count?user_id=${encodeURIComponent(user.id)}`);
    if (!resp.ok) throw new Error('failed to get count');
    const data = await resp.json();
    setDailyCount((data.count as number) || 0);
  };

  const handleGenerateContent = async () => {
    if (!selectedCard) return toast.error("Select a platform first!");
    if (!prompt.trim()) return toast.error("Enter some text!");

    let title = "";
    let description = "";

    switch (selectedCard) {
      case "linkedin":
        if (!industry || !role) return toast.error("Please fill all LinkedIn fields");
        title = `LinkedIn Post about ${prompt}`;
        description = `Industry: ${industry}, Role: ${role}`;
        break;
      case "facebook":
        title = `Facebook Post about ${prompt}`;
        description = "Relatable and emoji-friendly.";
        break;
      case "instagram":
        title = `Instagram Caption about ${prompt}`;
        description = "Catchy with hashtags and emojis.";
        break;
    }

    if (dailyCount >= 5) return toast.error("Daily limit reached! Upgrade to generate more.");

    setLoading(true);
    setGeneratedTemplate("");
    setGeneratedImage(null);

    try {
      const result = await generateTemplate({
        title,
        description,
        tone: "professional",
        style: selectedCard,
      });

      setGeneratedTemplate(
        `${result.templateBody}\n\n${result.callToAction}\n\n${result.tips.join(" • ")}`
      );

      if (user) {
        const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
        const resp = await fetch(`${apiBase}/api/template-generations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            platform: selectedCard,
            prompt,
            template_content: result.templateBody
          })
        });
        if (!resp.ok) throw new Error(await resp.text());
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

  const handleGenerateImage = async () => {
    if (!generatedTemplate) return toast.error("Generate content first!");
    if (!user) return toast.error("Please log in to generate images");

    try {
      setLoading(true);
      setGeneratedImage(null);

      const size = selectedCard === "linkedin" ? "1200x628" : "1080x1080";
      const { width, height } = parseSize(size);
      const imageType = selectedCard === "linkedin" ? "Professional" : "Modern";
      const imgUrl = await generateImageBackend({
        userId: user.id,
        prompt: generatedTemplate,
        imageType,
        width,
        height,
        quality: "high"
      });

      setGeneratedImage(imgUrl);
      toast.success("Image generated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate image");
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
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Social Media Post Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Generate ready-to-use posts & visuals for LinkedIn, Facebook, and Instagram.
          </p>
        </div>

        {/* Platform Selection */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {platforms.map((platform) => (
            <div
              key={platform.key}
              onClick={() => setSelectedCard(platform.key)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all hover:shadow-md ${
                selectedCard === platform.key
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                  : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                {platform.icon}
                <h3 className="mt-2 font-semibold dark:text-white">
                  {platform.label}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  {platform.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input fields */}
        {selectedCard && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-6">
            {selectedCard === "linkedin" && (
              <div className="space-y-4 mb-4">
                <ModernDropdown
                  label="Select Industry"
                  options={industries}
                  selected={industry}
                  onChange={setIndustry}
                />
                <ModernDropdown
                  label="Select Role"
                  options={roles}
                  selected={role}
                  onChange={setRole}
                />
              </div>
            )}

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                selectedCard === "linkedin"
                  ? "Write what you want your LinkedIn post to be about..."
                  : "Describe the post/caption you want to generate..."
              }
              rows={5}
              className="w-full p-4 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleGenerateContent}
              disabled={loading || dailyCount >= 5}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Template"}
            </button>
          </div>
        )}

        {/* Generated Output */}
        {generatedTemplate && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Generated Content:
            </h2>
            <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
              {generatedTemplate}
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <Download className="w-4 h-4" /> Download
              </button>
              <button
                onClick={handleGenerateImage}
                className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                <ImageIcon className="w-4 h-4" /> Generate Image
              </button>
            </div>

            {generatedImage && (
              <div className="mt-6">
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="rounded-xl shadow-md w-full"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}