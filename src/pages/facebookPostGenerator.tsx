import React, { useState } from "react";
import { generateTemplate, TemplateResult } from "../lib/template";
import { generateTemplateImage } from "../lib/templateImage";
import { Button } from "../components/UI/Button";
import { Card, CardContent } from "../components/UI/Card";
import { Loader2 } from "lucide-react";
import { ModernDropdown } from "../components/UI/ModernDropdown";

export default function FacebookPostGenerator() {
  const [industry, setIndustry] = useState("Select Industry");
  const [designation, setDesignation] = useState("Select Designation");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<TemplateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const industries = ["Technology", "Finance", "Healthcare", "Marketing"];
  const designations = ["Software Engineer", "Product Manager", "Marketing Head", "CEO"];

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setImage(null);

    try {
      const template = await generateTemplate({
        title: topic,
        description: `Industry: ${industry}, Designation: ${designation}`,
        tone: "casual", // Facebook is more friendly/casual
        style: "facebook-post",
      });
      setResult(template);
    } catch (err) {
      console.error("Template generation failed:", err);
      alert("Error generating Facebook post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!result) return;
    setImgLoading(true);

    try {
      const img = await generateTemplateImage(result.templateBody, "1200x630"); // FB recommended size
      setImage(img);
    } catch (err) {
      console.error("Image generation failed:", err);
      alert("Error generating image. Please try again.");
    } finally {
      setImgLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
        Facebook Post Generator
      </h1>

      {/* Form */}
      <div className="grid gap-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <ModernDropdown label="Industry" options={industries} selected={industry} onChange={setIndustry} />
        <ModernDropdown label="Designation" options={designations} selected={designation} onChange={setDesignation} />

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Topic</label>
          <input
            type="text"
            placeholder="Enter Topic"
            className="w-full p-3 rounded-xl border border-gray-300/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-900/40 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <Button onClick={handleGenerate} disabled={loading} className="w-full py-3 text-lg rounded-xl">
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "🚀 Generate Facebook Post"}
        </Button>
      </div>

      {/* Post Preview */}
      {result && (
        <Card className="mt-6 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{result.templateTitle}</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{result.templateBody}</p>
            <p className="font-semibold text-blue-600 dark:text-blue-400">{result.callToAction}</p>

            {result.tips?.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">Quick Tips:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {result.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
                </ul>
              </div>
            )}

            <div className="pt-4">
              <Button onClick={handleGenerateImage} disabled={imgLoading} className="w-full py-3 text-lg rounded-xl">
                {imgLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "🖼️ Generate Image from Content"}
              </Button>
            </div>

            {image && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Generated Facebook Image:</h3>
                <img src={image} alt="Generated Facebook Post" className="rounded-xl shadow-lg w-full border border-gray-200 dark:border-gray-700" />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}