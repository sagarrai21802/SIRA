
// import React, { useState, useEffect } from "react";
// import { FileText, Sparkles, Copy, Download, Linkedin, Image as ImageIcon } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";
// import { supabase } from "../lib/supabase";
// import toast from "react-hot-toast";
// import { generateTemplate } from "../lib/template";
// import { generateTemplateImage } from "../lib/templateImage";
// import { ModernDropdown } from "../components/UI/ModernDropdown";

// type Platform = "linkedin" | "facebook" | "instagram";


// export default function GenerateTemplate() {
  
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [prompt, setPrompt] = useState("");
//   const [generatedTemplate, setGeneratedTemplate] = useState("");
//   const [generatedImage, setGeneratedImage] = useState<string | null>(null);
//   const [dailyCount, setDailyCount] = useState(0);
//   const [selectedCard, setSelectedCard] = useState<Platform | null>(null);

//   const [industry, setIndustry] = useState("");
//   const [role, setRole] = useState("");

//   const industries = ["Technology", "Finance", "Healthcare", "Education", "Marketing", "Other"];
//   const roles = ["Founder", "HR", "Employee", "Student", "Manager", "CEO", "Assistant Manager", "Accountant", "Team Lead"];

//   const platforms: { key: Platform; label: string; icon: JSX.Element; description: string }[] = [
//     { key: "linkedin", label: "LinkedIn Post", icon: <Linkedin className="text-blue-700 dark:text-blue-400 w-6 h-6" />, description: "Craft engaging LinkedIn posts with emojis" },
//     { key: "facebook", label: "Facebook Post", icon: <FileText className="text-blue-600 w-6 h-6" />, description: "Write compelling Facebook posts" },
//     { key: "instagram", label: "Instagram Caption", icon: <Sparkles className="text-pink-500 w-6 h-6" />, description: "Create catchy Instagram captions" },
//   ];

//   useEffect(() => { if (user) checkDailyQuota(); }, [user]);

//   const checkDailyQuota = async () => {
//     if (!user) return;
//     const today = new Date().toISOString().split("T")[0];
//     const { count } = await supabase
//       .from("template_generations")
//       .select("*", { count: "exact", head: true })
//       .eq("user_id", user.id)
//       .gte("created_at", today + "T00:00:00.000Z")
//       .lt("created_at", today + "T23:59:59.999Z");
//     setDailyCount(count || 0);
//   };

//   const handleGenerateContent = async () => {
//     if (!selectedCard) return toast.error("Select a platform first!");
//     if (!prompt.trim()) return toast.error("Enter some text!");

//     let title = "";
//     let description = "";

//     switch (selectedCard) {
//       case "linkedin":
//         if (!industry || !role) return toast.error("Please fill all LinkedIn fields");
//         title = `LinkedIn Post about ${prompt}`;
//         description = `Industry: ${industry}, Role: ${role}`;
//         break;
//       case "facebook":
//         title = `Facebook Post about ${prompt}`;
//         description = "Relatable and emoji-friendly.";
//         break;
//       case "instagram":
//         title = `Instagram Caption about ${prompt}`;
//         description = "Catchy with hashtags and emojis.";
//         break;
//     }

//     if (dailyCount >= 5) return toast.error("Daily limit reached! Upgrade to generate more.");

//     setLoading(true);
//     setGeneratedTemplate("");
//     setGeneratedImage(null);

//     try {
//       const result = await generateTemplate({
//         title,
//         description,
//         tone: "professional",
//         style: selectedCard,
//       });

//       setGeneratedTemplate(`${result.templateBody}\n\n${result.callToAction}\n\n${result.tips.join(" • ")}`);

//       if (user) {
//         await supabase.from("template_generations").insert({
//           user_id: user.id,
//           platform: selectedCard,
//           prompt,
//           template_content: result.templateBody,
//         });
//         setDailyCount((prev) => prev + 1);
//       }

//       toast.success("Template generated!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to generate template");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerateImage = async () => {
//     if (!generatedTemplate) return toast.error("Generate content first!");

//     try {
//       setLoading(true);
//       setGeneratedImage(null);

//       const size = selectedCard === "linkedin" ? "1200x628" : "1080x1080"; // LinkedIn banner vs IG/FB square
//       const imgUrl = await generateTemplateImage(generatedTemplate, size);

//       setGeneratedImage(imgUrl);
//       toast.success("Image generated!");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to generate image");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = () => { navigator.clipboard.writeText(generatedTemplate); toast.success("Copied to clipboard!"); };
//   const downloadTemplate = () => {
//     const blob = new Blob([generatedTemplate], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `template_${Date.now()}.txt`;
//     link.click();
//     URL.revokeObjectURL(url);
//     toast.success("Downloaded!");
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="w-full max-w-3xl">
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
//           <h1 className="text-3xl font-bold mb-4 dark:text-white">Social Media Post Generator</h1>

//           {/* Platform Selection */}
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             {platforms.map((platform) => (
//               <div
//                 key={platform.key}
//                 onClick={() => setSelectedCard(platform.key)}
//                 className={`p-4 rounded-xl border cursor-pointer ${selectedCard === platform.key ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : "border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
//               >
//                 <div className="flex items-center gap-3">{platform.icon}<h3 className="font-semibold dark:text-white">{platform.label}</h3></div>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">{platform.description}</p>
//               </div>
//             ))}
//           </div>

//           {/* Input fields */}
//           {selectedCard === "linkedin" && (
//             <div className="space-y-4 mb-4">
//               <ModernDropdown label="Select Industry" options={industries} selected={industry} onChange={setIndustry} />
//               <ModernDropdown label="Select Role" options={roles} selected={role} onChange={setRole} />
//               <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Write what you want your post to be about..." rows={4} className="w-full p-4 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600" />
//             </div>
//           )}

//           {selectedCard && selectedCard !== "linkedin" && (
//             <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe the template you want to generate..." rows={5} className="w-full p-4 border rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600" />
//           )}

//           {selectedCard && (
//             <button onClick={handleGenerateContent} disabled={loading || dailyCount >= 5} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
//               {loading ? "Generating..." : "Generate Template"}
//             </button>
//           )}
//         </div>

//         {/* Generated Output */}
//         {generatedTemplate && (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
//             <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">{generatedTemplate}</p>
//             <div className="flex gap-3 mt-4">
//               <button onClick={copyToClipboard} className="border p-2 rounded-lg dark:border-gray-600 dark:text-white">Copy</button>
//               <button onClick={downloadTemplate} className="border p-2 rounded-lg dark:border-gray-600 dark:text-white">Download</button>
//               <button onClick={handleGenerateImage} className="border p-2 rounded-lg flex items-center gap-2 dark:border-gray-600 dark:text-white">
//                 <ImageIcon className="w-4 h-4" /> Generate Image
//               </button>
//             </div>
//             {generatedImage && (
//               <div className="mt-4">
//                 <img src={generatedImage} alt="Generated" className="rounded-lg shadow-md w-full" />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





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
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { generateTemplate } from "../lib/template";
import { generateTemplateImage } from "../lib/templateImage";
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
    const today = new Date().toISOString().split("T")[0];
    const { count } = await supabase
      .from("template_generations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", today + "T00:00:00.000Z")
      .lt("created_at", today + "T23:59:59.999Z");
    setDailyCount(count || 0);
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
        await supabase.from("template_generations").insert({
          user_id: user.id,
          platform: selectedCard,
          prompt,
          template_content: result.templateBody,
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

  const handleGenerateImage = async () => {
    if (!generatedTemplate) return toast.error("Generate content first!");

    try {
      setLoading(true);
      setGeneratedImage(null);

      const size = selectedCard === "linkedin" ? "1200x628" : "1080x1080";
      const imgUrl = await generateTemplateImage(generatedTemplate, size);

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