// import React, { useState } from "react";
// import { generateTemplate, TemplateResult } from "../lib/template";
// import { generateTemplateImage } from "../lib/templateImage";
// import { Button } from "../components/UI/Button";
// import { Card, CardContent } from "../components/UI/Card";
// import { Loader2 } from "lucide-react";

// export default function LinkedInPostGenerator() {
//   const [industry, setIndustry] = useState("");
//   const [designation, setDesignation] = useState("");
//   const [topic, setTopic] = useState("");
//   const [result, setResult] = useState<TemplateResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState<string | null>(null);
//   const [imgLoading, setImgLoading] = useState(false);

//   // Generate LinkedIn Post Content
//   const handleGenerate = async () => {
//     setLoading(true);
//     setResult(null);
//     setImage(null); // reset old image if new content is generated

//     try {
//       const template = await generateTemplate({
//         title: topic,
//         description: `Industry: ${industry}, Designation: ${designation}`,
//         tone: "professional",
//         style: "linkedin-post",
//       });
//       setResult(template);
//     } catch (err) {
//       console.error("Template generation failed:", err);
//       alert("Error generating LinkedIn post. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate Image based on Template Content
//   const handleGenerateImage = async () => {
//     if (!result) return;
//     setImgLoading(true);

//     try {
//       const img = await generateTemplateImage(result.templateBody, "1200x628");
//       setImage(img);
//     } catch (err) {
//       console.error("Image generation failed:", err);
//       alert("Error generating image. Please try again.");
//     } finally {
//       setImgLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">LinkedIn Post Generator</h1>

//       {/* Form Inputs */}
//       <div className="grid gap-4">
//         <select
//           className="p-2 border rounded-lg"
//           value={industry}
//           onChange={(e) => setIndustry(e.target.value)}
//         >
//           <option value="">Select Industry</option>
//           <option value="Technology">Technology</option>
//           <option value="Finance">Finance</option>
//           <option value="Healthcare">Healthcare</option>
//           <option value="Marketing">Marketing</option>
//         </select>

//         <select
//           className="p-2 border rounded-lg"
//           value={designation}
//           onChange={(e) => setDesignation(e.target.value)}
//         >
//           <option value="">Select Designation</option>
//           <option value="Software Engineer">Software Engineer</option>
//           <option value="Product Manager">Product Manager</option>
//           <option value="Marketing Head">Marketing Head</option>
//           <option value="CEO">CEO</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Enter Topic"
//           className="p-2 border rounded-lg"
//           value={topic}
//           onChange={(e) => setTopic(e.target.value)}
//         />

//         <Button onClick={handleGenerate} disabled={loading}>
//           {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Generate LinkedIn Post"}
//         </Button>
//       </div>

//       {/* Post Preview */}
//       {result && (
//         <Card className="mt-6 shadow-lg">
//           <CardContent className="p-4 space-y-4">
//             <h2 className="text-xl font-semibold">{result.templateTitle}</h2>
//             <p className="text-gray-700 whitespace-pre-line">{result.templateBody}</p>
//             <p className="font-medium text-blue-600">{result.callToAction}</p>

//             {/* Tips */}
//             {result.tips?.length > 0 && (
//               <ul className="list-disc list-inside text-sm text-gray-500">
//                 {result.tips.map((tip, idx) => (
//                   <li key={idx}>{tip}</li>
//                 ))}
//               </ul>
//             )}

//             {/* Image Generator */}
//             <div className="pt-4">
//               <Button onClick={handleGenerateImage} disabled={imgLoading}>
//                 {imgLoading ? (
//                   <Loader2 className="animate-spin h-4 w-4" />
//                 ) : (
//                   "Generate Image from Content"
//                 )}
//               </Button>
//             </div>

//             {image && (
//               <div className="mt-4">
//                 <h3 className="font-medium">Generated LinkedIn Image:</h3>
//                 <img
//                   src={image}
//                   alt="Generated LinkedIn Post"
//                   className="rounded-lg shadow-md w-full"
//                 />
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { generateTemplate, TemplateResult } from "../lib/template";
import { generateTemplateImage } from "../lib/templateImage";
import { Button } from "../components/UI/Button";
import { Card, CardContent } from "../components/UI/Card";
import { Loader2 } from "lucide-react";
import { ModernDropdown } from "../components/UI/ModernDropdown"; // import your custom dropdown

export default function LinkedInPostGenerator() {
  const [industry, setIndustry] = useState("Select Industry");
  const [designation, setDesignation] = useState("Select Designation");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<TemplateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const industries = ["Technology", "Finance", "Healthcare", "Marketing"];
  const designations = ["Software Engineer", "Product Manager", "Marketing Head", "CEO"];

  // Generate LinkedIn Post Content
  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setImage(null);

    try {
      const template = await generateTemplate({
        title: topic,
        description: `Industry: ${industry}, Designation: ${designation}`,
        tone: "professional",
        style: "linkedin-post",
      });
      setResult(template);
    } catch (err) {
      console.error("Template generation failed:", err);
      alert("Error generating LinkedIn post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate Image based on Template Content
  const handleGenerateImage = async () => {
    if (!result) return;
    setImgLoading(true);

    try {
      const img = await generateTemplateImage(result.templateBody, "1200x628");
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
      <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        LinkedIn Post Generator
      </h1>

      {/* Form Section */}
      <div className="grid gap-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <ModernDropdown
          label="Industry"
          options={industries}
          selected={industry}
          onChange={setIndustry}
        />

        <ModernDropdown
          label="Designation"
          options={designations}
          selected={designation}
          onChange={setDesignation}
        />

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Topic
          </label>
          <input
            type="text"
            placeholder="Enter Topic"
            className="w-full p-3 rounded-xl border border-gray-300/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-900/40 shadow-inner focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 text-lg rounded-xl"
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "✨ Generate LinkedIn Post"
          )}
        </Button>
      </div>

      {/* Post Preview */}
      {result && (
        <Card className="mt-6 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {result.templateTitle}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {result.templateBody}
            </p>
            <p className="font-semibold text-indigo-600 dark:text-indigo-400">
              {result.callToAction}
            </p>

            {/* Tips */}
            {result.tips?.length > 0 && (
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                  Quick Tips:
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {result.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Image Generator */}
            <div className="pt-4">
              <Button
                onClick={handleGenerateImage}
                disabled={imgLoading}
                className="w-full py-3 text-lg rounded-xl"
              >
                {imgLoading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "🖼️ Generate Image from Content"
                )}
              </Button>
            </div>

            {image && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Generated LinkedIn Image:
                </h3>
                <img
                  src={image}
                  alt="Generated LinkedIn Post"
                  className="rounded-xl shadow-lg w-full border border-gray-200 dark:border-gray-700"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}