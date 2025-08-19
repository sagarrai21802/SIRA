// import React, { useState } from "react";
// import { generateImage } from "../lib/generateimage";
// import { Loader2, Download, Copy, Cpu } from "lucide-react";
// import toast from "react-hot-toast";
// import { ModernDropdown } from "../components/UI/ModernDropdown";

// const IMAGE_TYPES = ["Realistic", "Cartoon", "3D", "Anime", "Pixel Art"];
// const IMAGE_SIZES = [
//   { label: "256x256", width: 256, height: 256 },
//   { label: "512x512", width: 512, height: 512 },
//   { label: "1024x1024", width: 1024, height: 1024 },
//   { label: "Instagram Post 1:1", width: 1080, height: 1080 },
//   { label: "Instagram Story 9:16", width: 1080, height: 1920 },
//   { label: "Facebook Post 1.91:1", width: 1200, height: 628 },
//   { label: "Facebook Cover 16:9", width: 820, height: 312 },
//   { label: "LinkedIn Post 1.91:1", width: 1200, height: 627 },
//   { label: "LinkedIn Banner 4:1", width: 1584, height: 396 },
// ];

// export const ImageGenerator: React.FC = () => {
//   const [prompt, setPrompt] = useState("");
//   const [image, setImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [type, setType] = useState(IMAGE_TYPES[0]);
//   const [size, setSize] = useState(IMAGE_SIZES[1]);
//   const [loadingMessage, setLoadingMessage] = useState("Generating your image...");

//   const handleGenerate = async () => {
//     if (!prompt.trim()) {
//       toast.error("Please enter a prompt");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setImage(null);
//     setLoadingMessage("Initializing AI engine...");

//     try {
//       const fullPrompt = `${prompt} | Style: ${type} | Size: ${size.label}`;

//       const messages = ["Analyzing your prompt...", "Generating visual...", "Almost there..."];
//       let i = 0;
//       const msgInterval = setInterval(() => {
//         setLoadingMessage(messages[i % messages.length]);
//         i++;
//       }, 1000);

//       const url = await generateImage(fullPrompt);
//       setImage(url);
//       toast.success("Image generated!");
//       clearInterval(msgInterval);
//     } catch (err) {
//       setError("Failed to generate image. Check console.");
//       toast.error("Image generation failed!");
//     } finally {
//       setLoading(false);
//       setLoadingMessage("Generating your image...");
//     }
//   };

//   const handleDownload = () => {
//     if (!image) return;
//     const link = document.createElement("a");
//     link.href = image;
//     link.download = "generated-image.png";
//     link.click();
//   };

//   const handleCopyPrompt = () => {
//     navigator.clipboard.writeText(prompt);
//     toast.success("Prompt copied!");
//   };

//   const handleCopyImageUrl = () => {
//     if (!image) return;
//     navigator.clipboard.writeText(image);
//     toast.success("Image URL copied!");
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
//         AI Image Generator
//       </h2>

//       <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-xl rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300">
//         {/* Prompt box */}
//         <textarea
//           className="w-full p-5 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-indigo-400/50 resize-none dark:bg-gray-900/70 dark:text-white transition-all text-lg shadow-sm"
//           rows={4}
//           placeholder="✨ Describe your creative vision... Example: 'A futuristic city skyline at sunset, cinematic lighting'"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />

//         {/* Modern Dropdowns */}
//         <div className="flex flex-wrap gap-6 justify-center">
//           <ModernDropdown
//             label="Style"
//             options={IMAGE_TYPES}
//             selected={type}
//             onChange={setType}
//           />

//           <ModernDropdown
//             label="Size"
//             options={IMAGE_SIZES}
//             selected={size}
//             onChange={setSize}
//             displayKey="label"
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-wrap gap-4 justify-center">
//           <button
//             className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
//             onClick={handleGenerate}
//             disabled={loading}
//           >
//             {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Cpu className="w-5 h-5" />}
//             {loading ? "Generating..." : "Generate Image"}
//           </button>

//           {image && (
//             <button
//               className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-800 shadow hover:scale-105 transition-transform"
//               onClick={handleCopyPrompt}
//             >
//               <Copy className="w-4 h-4" /> Copy Prompt
//             </button>
//           )}
//         </div>

//         {error && <div className="text-red-500 text-center font-medium">{error}</div>}
//       </div>

//       {/* Loading animation */}
//       {loading && (
//         <div className="mt-8 flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 space-y-4">
//           <div className="animate-spin bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
//             <Cpu className="w-7 h-7 text-white" />
//           </div>
//           <p className="text-lg font-medium">{loadingMessage}</p>
//         </div>
//       )}

//       {/* Generated Image */}
//       {image && (
//         <div className="mt-10 relative rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform">
//           <img src={image} alt="Generated" className="w-full h-auto rounded-2xl" />
//           <div className="absolute bottom-4 left-4 flex gap-3">
//             <button
//               className="bg-green-500/90 backdrop-blur-md text-white px-3 py-2 rounded-lg hover:bg-green-600 shadow flex items-center gap-1"
//               onClick={handleDownload}
//             >
//               <Download className="w-4 h-4" /> Download
//             </button>
//             <button
//               className="bg-gray-700/80 backdrop-blur-md text-white px-3 py-2 rounded-lg hover:bg-gray-800 shadow flex items-center gap-1"
//               onClick={handleCopyImageUrl}
//             >
//               <Copy className="w-4 h-4" /> Copy URL
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useState } from "react";
import { generateImage } from "../lib/generateimage";
import { Loader2, Download, Copy, Cpu } from "lucide-react";
import toast from "react-hot-toast";
import { ModernDropdown } from "../components/UI/ModernDropdown";

const IMAGE_TYPES = ["Realistic", "Cartoon", "3D", "Anime", "Pixel Art"];
const IMAGE_SIZES = [
  { label: "256x256", width: 256, height: 256 },
  { label: "512x512", width: 512, height: 512 },
  { label: "1024x1024", width: 1024, height: 1024 },
  { label: "Instagram Post 1:1", width: 1080, height: 1080 },
  { label: "Instagram Story 9:16", width: 1080, height: 1920 },
  { label: "Facebook Post 1.91:1", width: 1200, height: 628 },
  { label: "Facebook Cover 16:9", width: 820, height: 312 },
  { label: "LinkedIn Post 1.91:1", width: 1200, height: 627 },
  { label: "LinkedIn Banner 4:1", width: 1584, height: 396 },
];

const IMAGE_QUALITY = ["Low", "Medium", "High"];
const IMAGE_LIGHTING = ["Natural", "Cinematic", "Dramatic", "Soft"];
const IMAGE_MOOD = ["Happy", "Sad", "Mysterious", "Energetic", "Calm"];

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState(IMAGE_TYPES[0]);
  const [size, setSize] = useState(IMAGE_SIZES[1]);
  const [quality, setQuality] = useState(IMAGE_QUALITY[1]);
  const [lighting, setLighting] = useState(IMAGE_LIGHTING[0]);
  const [mood, setMood] = useState(IMAGE_MOOD[0]);
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
      const fullPrompt = `${prompt} | Style: ${type} | Size: ${size.width}x${size.height} | Quality: ${quality} | Lighting: ${lighting} | Mood: ${mood}`;

      const messages = ["Analyzing your prompt...", "Generating visual...", "Almost there..."];
      let i = 0;
      const msgInterval = setInterval(() => {
        setLoadingMessage(messages[i % messages.length]);
        i++;
      }, 1000);

      const url = await generateImage(fullPrompt, size.width, size.height);
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
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        AI Image Generator
      </h2>

      <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-xl rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300">
        {/* Prompt */}
        <textarea
          className="w-full p-5 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-indigo-400/50 resize-none dark:bg-gray-900/70 dark:text-white transition-all text-lg shadow-sm"
          rows={4}
          placeholder="✨ Describe your creative vision..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-4 justify-center">
          <ModernDropdown label="Style" options={IMAGE_TYPES} selected={type} onChange={setType} />
          <ModernDropdown label="Size" options={IMAGE_SIZES} selected={size} onChange={setSize} displayKey="label" />
          <ModernDropdown label="Quality" options={IMAGE_QUALITY} selected={quality} onChange={setQuality} />
          <ModernDropdown label="Lighting" options={IMAGE_LIGHTING} selected={lighting} onChange={setLighting} />
          <ModernDropdown label="Mood" options={IMAGE_MOOD} selected={mood} onChange={setMood} />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Cpu className="w-5 h-5" />}
            {loading ? "Generating..." : "Generate Image"}
          </button>

          {image && (
            <button
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-800 shadow hover:scale-105 transition-transform"
              onClick={handleCopyPrompt}
            >
              <Copy className="w-4 h-4" /> Copy Prompt
            </button>
          )}
        </div>

        {error && <div className="text-red-500 text-center font-medium">{error}</div>}
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 space-y-4">
          <div className="animate-spin bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
            <Cpu className="w-7 h-7 text-white" />
          </div>
          <p className="text-lg font-medium">{loadingMessage}</p>
        </div>
      )}

      {/* Generated Image */}
      {image && (
        <div
          className="mt-10 relative rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform border-2 border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            aspectRatio: `${size.width} / ${size.height}`,
          }}
        >
          <img src={image} alt="Generated" className="w-full h-full object-contain rounded-2xl" />
          <div className="absolute bottom-4 left-4 flex gap-3">
            <button
              className="bg-green-500/90 backdrop-blur-md text-white px-3 py-2 rounded-lg hover:bg-green-600 shadow flex items-center gap-1"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" /> Download
            </button>
            <button
              className="bg-gray-700/80 backdrop-blur-md text-white px-3 py-2 rounded-lg hover:bg-gray-800 shadow flex items-center gap-1"
              onClick={handleCopyImageUrl}
            >
              <Copy className="w-4 h-4" /> Copy URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};