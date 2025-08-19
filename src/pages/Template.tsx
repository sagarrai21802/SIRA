// // import React, { useState, useEffect } from "react";
// // import { FileText,Sparkles, Copy, Download, Linkedin,  Twitter} from "lucide-react";
// // import { useAuth } from "../hooks/useAuth";
// // import { supabase } from "../lib/supabase";
// // import toast from "react-hot-toast";
// // import { GoogleGenerativeAI } from "@google/generative-ai";
// // import { ModernDropdown } from "../components/UI/ModernDropdown";

// // const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// // export default function GenerateTemplate() {
// //   const { user } = useAuth();
// //   const [loading, setLoading] = useState(false);
// //   const [prompt, setPrompt] = useState("");
// //   const [generatedTemplate, setGeneratedTemplate] = useState("");
// //   const [dailyCount, setDailyCount] = useState(0);
// //   const [selectedCard, setSelectedCard] = useState<"linkedin" | "xpost" | null>(
// //     null
// //   );

// //   // LinkedIn-specific inputs
// //   const [industry, setIndustry] = useState("");
// //   const [role, setRole] = useState("");

// //   const industries = [
// //     "Technology",
// //     "Finance",
// //     "Healthcare",
// //     "Education",
// //     "Marketing",
// //     "Other",
// //   ];
// //   const roles = [
// //     "Founder",
// //     "HR",
// //     "Employee",
// //     "Student",
// //     "Manager",
// //     "CEO",
// //     "Assistant Manager",
// //     "Accountant",
// //     "Team Lead",
// //   ];

// //   useEffect(() => {
// //     if (user) checkDailyQuota();
// //   }, [user]);

// //   const checkDailyQuota = async () => {
// //     if (!user) return;
// //     const today = new Date().toISOString().split("T")[0];
// //     const { count } = await supabase
// //       .from("template_generations")
// //       .select("*", { count: "exact", head: true })
// //       .eq("user_id", user.id)
// //       .gte("created_at", today + "T00:00:00.000Z")
// //       .lt("created_at", today + "T23:59:59.999Z");
// //     setDailyCount(count || 0);
// //   };

// //   const handleGenerate = async () => {
// //     let finalPrompt = prompt;

// //     if (selectedCard === "linkedin") {
// //       if (!industry || !role || !prompt.trim()) {
// //         return toast.error("Please fill all LinkedIn fields");
// //       }
// //       finalPrompt = `Write a professional LinkedIn post for the ${industry} industry, from the perspective of a ${role}, about: ${prompt}. 
// //       Include relevant and appropriate emojis naturally within the text.`;
// //     } else if (selectedCard === "xpost") {
// //       if (!prompt.trim()) return toast.error("Please enter a tweet idea");
// //       finalPrompt = `Write a short, engaging Twitter post (280 characters max) about: ${prompt}. 
// //       Add fitting emojis to make it engaging.`;
// //     }

// //     if (!finalPrompt.trim()) return toast.error("Please enter a prompt");
// //     if (dailyCount >= 5)
// //       return toast.error("Daily limit reached! Upgrade to generate more.");

// //     setLoading(true);
// //     setGeneratedTemplate("");

// //     try {
// //       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// //       const result = await model.generateContent({
// //         contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
// //       });
// //       const template = result.response.text();
// //       setGeneratedTemplate(template);

// //       if (user) {
// //         await supabase.from("template_generations").insert({
// //           user_id: user.id,
// //           prompt: finalPrompt,
// //           template_content: template,
// //         });
// //         setDailyCount((prev) => prev + 1);
// //       }
// //       toast.success("Template generated with emojis!");
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to generate template");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const copyToClipboard = () => {
// //     navigator.clipboard.writeText(generatedTemplate);
// //     toast.success("Copied to clipboard!");
// //   };

// //   const downloadTemplate = () => {
// //     const blob = new Blob([generatedTemplate], { type: "text/plain" });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement("a");
// //     link.href = url;
// //     link.download = `template_${Date.now()}.txt`;
// //     link.click();
// //     URL.revokeObjectURL(url);
// //     toast.success("Downloaded!");
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-6">
// //       <div className="w-full max-w-3xl">
// //         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
// //           <h1 className="text-3xl font-bold mb-4 dark:text-white">Template Generator</h1>
// //           <div className="grid grid-cols-2 gap-4 mb-6">
// //             {/* LinkedIn Post Card */}
// //             <div
// //               onClick={() => setSelectedCard("linkedin")}
// //               className={`p-4 rounded-xl border cursor-pointer ${
// //                 selectedCard === "linkedin"
// //                   ? "border-blue-500 bg-blue-50"
// //                   : "border-gray-300 hover:bg-gray-50"
// //               }`}
// //             >
// //               <div className="flex items-center gap-3">
// //                 <Linkedin className="text-blue-700 w-6 h-6" />
// //                 <h3 className="font-semibold  ">LinkedIn Post</h3>
// //               </div>
// //               <p className="text-sm text-gray-600">
// //                 Craft engaging LinkedIn posts with emojis
// //               </p>
// //             </div>

// //             {/* X Post Card */}
// //             <div
// //               onClick={() => setSelectedCard("xpost")}
// //               className={`p-4 rounded-xl border cursor-pointer ${
// //                 selectedCard === "xpost"
// //                   ? "border-blue-500 bg-blue-50"
// //                   : "border-gray-300 hover:bg-gray-50"
// //               }`}
// //             >
// //               <div className="flex items-center gap-3">
// //                 <Twitter className="text-sky-500 w-6 h-6" />
// //                 <h3 className="font-semibold">X (Twitter) Post</h3>
// //               </div>
// //               <p className="text-sm text-gray-600">
// //                 Create impactful tweets with emojis
// //               </p>
// //             </div>
// //           </div>

// //           {/* LinkedIn Inputs */}
// //           {selectedCard === "linkedin" && (
// //             <div className="space-y-4 mb-4">
// //               <ModernDropdown
// //                 label="Select Industry"
// //                 options={industries}
// //                 selected={industry}
// //                 onChange={(val) => setIndustry(val)}
// //               />

// //               <ModernDropdown
// //                 label="Select Role"
// //                 options={roles}
// //                 selected={role}
// //                 onChange={(val) => setRole(val)}
// //               />

// //               <textarea
// //                 value={prompt}
// //                 onChange={(e) => setPrompt(e.target.value)}
// //                 placeholder="Write what you want your post to be about..."
// //                 rows={4}
// //                 className="w-full p-4 border rounded-lg"
// //               />
// //             </div>
// //           )}

// //           {/* Other cards prompt */}
// //           {selectedCard && selectedCard !== "linkedin" && (
// //             <textarea
// //               value={prompt}
// //               onChange={(e) => setPrompt(e.target.value)}
// //               placeholder="Describe the template you want to generate..."
// //               rows={5}
// //               className="w-full p-4 border rounded-lg mb-4"
// //             />
// //           )}

// //           <button
// //             onClick={handleGenerate}
// //             disabled={loading || dailyCount >= 5}
// //             className="w-full bg-blue-600 text-white p-3 rounded-lg"
// //           >
// //             {loading ? "Generating..." : "Generate Template"}
// //           </button>
// //         </div>

// //         {generatedTemplate && (
// //           <div className="bg-white p-6 rounded-2xl shadow-lg">
// //             {/* LinkedIn-style */}
// //             {selectedCard === "linkedin" && (
// //               <div className="border border-gray-300 rounded-lg p-4">
// //                 <div className="flex items-center gap-3 mb-3">
// //                   <img
// //                     src="https://randomuser.me/api/portraits/men/32.jpg"
// //                     alt="Profile"
// //                     className="w-10 h-10 rounded-full"
// //                   />
// //                   <div>
// //                     <h4 className="font-semibold">John Doe</h4>
// //                     <p className="text-xs text-gray-500">
// //                       1st • {industry} | {role}
// //                     </p>
// //                     <p className="text-xs text-gray-400">2h • 🌐</p>
// //                   </div>
// //                 </div>
// //                 <p className="text-gray-800 whitespace-pre-wrap">
// //                   {generatedTemplate}
// //                 </p>
// //               </div>
// //             )}

// //             {/* Twitter-style */}
// //             {selectedCard === "xpost" && (
// //               <div className="border border-gray-300 rounded-lg p-4">
// //                 <div className="flex items-center gap-3 mb-3">
// //                   <img
// //                     src="https://randomuser.me/api/portraits/women/44.jpg"
// //                     alt="Profile"
// //                     className="w-10 h-10 rounded-full"
// //                   />
// //                   <div>
// //                     <h4 className="font-semibold">
// //                       Jane Smith{" "}
// //                       <span className="text-gray-500">@janesmith</span>
// //                     </h4>
// //                     <p className="text-xs text-gray-400">· 1h</p>
// //                   </div>
// //                 </div>
// //                 <p className="text-gray-800 whitespace-pre-wrap">
// //                   {generatedTemplate}
// //                 </p>
// //               </div>
// //             )}

// //             <div className="flex gap-3 mt-4">
// //               <button
// //                 onClick={copyToClipboard}
// //                 className="border p-2 rounded-lg"
// //               >
// //                 Copy
// //               </button>
// //               <button
// //                 onClick={downloadTemplate}
// //                 className="border p-2 rounded-lg"
// //               >
// //                 Download
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect } from "react";
// import { FileText, Sparkles, Copy, Download, Linkedin, Twitter } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";
// import { supabase } from "../lib/supabase";
// import toast from "react-hot-toast";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { ModernDropdown } from "../components/UI/ModernDropdown";

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// export default function GenerateTemplate() {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [prompt, setPrompt] = useState("");
//   const [generatedTemplate, setGeneratedTemplate] = useState("");
//   const [dailyCount, setDailyCount] = useState(0);
//   const [selectedCard, setSelectedCard] = useState<"linkedin" | "xpost" | null>(null);

//   // LinkedIn-specific inputs
//   const [industry, setIndustry] = useState("");
//   const [role, setRole] = useState("");

//   const industries = [
//     "Technology",
//     "Finance",
//     "Healthcare",
//     "Education",
//     "Marketing",
//     "Other",
//   ];
//   const roles = [
//     "Founder",
//     "HR",
//     "Employee",
//     "Student",
//     "Manager",
//     "CEO",
//     "Assistant Manager",
//     "Accountant",
//     "Team Lead",
//   ];

//   useEffect(() => {
//     if (user) checkDailyQuota();
//   }, [user]);

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

//   const handleGenerate = async () => {
//     let finalPrompt = prompt;

//     if (selectedCard === "linkedin") {
//       if (!industry || !role || !prompt.trim()) {
//         return toast.error("Please fill all LinkedIn fields");
//       }
//       finalPrompt = `Write a professional LinkedIn post for the ${industry} industry, from the perspective of a ${role}, about: ${prompt}. 
//       Include relevant and appropriate emojis naturally within the text.`;
//     } else if (selectedCard === "xpost") {
//       if (!prompt.trim()) return toast.error("Please enter a tweet idea");
//       finalPrompt = `Write a short, engaging Twitter post (280 characters max) about: ${prompt}. 
//       Add fitting emojis to make it engaging.`;
//     }

//     if (!finalPrompt.trim()) return toast.error("Please enter a prompt");
//     if (dailyCount >= 5)
//       return toast.error("Daily limit reached! Upgrade to generate more.");

//     setLoading(true);
//     setGeneratedTemplate("");

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//       const result = await model.generateContent({
//         contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
//       });
//       const template = result.response.text();
//       setGeneratedTemplate(template);

//       if (user) {
//         await supabase.from("template_generations").insert({
//           user_id: user.id,
//           prompt: finalPrompt,
//           template_content: template,
//         });
//         setDailyCount((prev) => prev + 1);
//       }
//       toast.success("Template generated with emojis!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to generate template");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(generatedTemplate);
//     toast.success("Copied to clipboard!");
//   };

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
//           <h1 className="text-3xl font-bold mb-4 dark:text-white">Template Generator</h1>
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             {/* LinkedIn Post Card */}
//             <div
//               onClick={() => setSelectedCard("linkedin")}
//               className={`p-4 rounded-xl border cursor-pointer ${
//                 selectedCard === "linkedin"
//                   ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
//                   : "border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <Linkedin className="text-blue-700 dark:text-blue-400 w-6 h-6" />
//                 <h3 className="font-semibold dark:text-white">LinkedIn Post</h3>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-300">
//                 Craft engaging LinkedIn posts with emojis
//               </p>
//             </div>

//             {/* X Post Card */}
//             <div
//               onClick={() => setSelectedCard("xpost")}
//               className={`p-4 rounded-xl border cursor-pointer ${
//                 selectedCard === "xpost"
//                   ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
//                   : "border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <Twitter className="text-sky-500 dark:text-sky-400 w-6 h-6" />
//                 <h3 className="font-semibold dark:text-white">X (Twitter) Post</h3>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-300">
//                 Create impactful tweets with emojis
//               </p>
//             </div>
//           </div>

//           {/* LinkedIn Inputs */}
//           {selectedCard === "linkedin" && (
//             <div className="space-y-4 mb-4">
//               <ModernDropdown
//                 label="Select Industry"
//                 options={industries}
//                 selected={industry}
//                 onChange={(val) => setIndustry(val)}
//               />

//               <ModernDropdown
//                 label="Select Role"
//                 options={roles}
//                 selected={role}
//                 onChange={(val) => setRole(val)}
//               />

//               <textarea
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 placeholder="Write what you want your post to be about..."
//                 rows={4}
//                 className="w-full p-4 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
//               />
//             </div>
//           )}

//           {/* Other cards prompt */}
//           {selectedCard && selectedCard !== "linkedin" && (
//             <textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Describe the template you want to generate..."
//               rows={5}
//               className="w-full p-4 border rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
//             />
//           )}

//           <button
//             onClick={handleGenerate}
//             disabled={loading || dailyCount >= 5}
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Generating..." : "Generate Template"}
//           </button>
//         </div>

//         {generatedTemplate && (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
//             {/* LinkedIn-style */}
//             {selectedCard === "linkedin" && (
//               <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
//                 <div className="flex items-center gap-3 mb-3">
//                   <img
//                     src="https://randomuser.me/api/portraits/men/32.jpg"
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <h4 className="font-semibold dark:text-white">John Doe</h4>
//                     <p className="text-xs text-gray-500 dark:text-gray-300">
//                       1st • {industry} | {role}
//                     </p>
//                     <p className="text-xs text-gray-400 dark:text-gray-500">2h • 🌐</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
//                   {generatedTemplate}
//                 </p>
//               </div>
//             )}

//             {/* Twitter-style */}
//             {selectedCard === "xpost" && (
//               <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
//                 <div className="flex items-center gap-3 mb-3">
//                   <img
//                     src="https://randomuser.me/api/portraits/women/44.jpg"
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <h4 className="font-semibold dark:text-white">
//                       Jane Smith{" "}
//                       <span className="text-gray-500 dark:text-gray-400">@janesmith</span>
//                     </h4>
//                     <p className="text-xs text-gray-400 dark:text-gray-500">· 1h</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
//                   {generatedTemplate}
//                 </p>
//               </div>
//             )}

//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={copyToClipboard}
//                 className="border p-2 rounded-lg dark:border-gray-600 dark:text-white"
//               >
//                 Copy
//               </button>
//               <button
//                 onClick={downloadTemplate}
//                 className="border p-2 rounded-lg dark:border-gray-600 dark:text-white"
//               >
//                 Download
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { FileText, Sparkles, Copy, Download, Linkedin, Twitter } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";
// import { supabase } from "../lib/supabase";
// import toast from "react-hot-toast";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { ModernDropdown } from "../components/UI/ModernDropdown";

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// type Platform = "linkedin" | "xpost" | "thread" | "facebook" | "instagram";

// export default function GenerateTemplate() {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [prompt, setPrompt] = useState("");
//   const [generatedTemplate, setGeneratedTemplate] = useState("");
//   const [dailyCount, setDailyCount] = useState(0);
//   const [selectedCard, setSelectedCard] = useState<Platform | null>(null);

//   // LinkedIn-specific inputs
//   const [industry, setIndustry] = useState("");
//   const [role, setRole] = useState("");

//   const industries = ["Technology", "Finance", "Healthcare", "Education", "Marketing", "Other"];
//   const roles = [
//     "Founder",
//     "HR",
//     "Employee",
//     "Student",
//     "Manager",
//     "CEO",
//     "Assistant Manager",
//     "Accountant",
//     "Team Lead",
//   ];

//   const platforms: { key: Platform; label: string; icon: JSX.Element; description: string }[] = [
//     {
//       key: "linkedin",
//       label: "LinkedIn Post",
//       icon: <Linkedin className="text-blue-700 dark:text-blue-400 w-6 h-6" />,
//       description: "Craft engaging LinkedIn posts with emojis",
//     },
//     {
//       key: "xpost",
//       label: "X (Twitter) Post",
//       icon: <Twitter className="text-sky-500 dark:text-sky-400 w-6 h-6" />,
//       description: "Create impactful tweets with emojis",
//     },
//     {
//       key: "thread",
//       label: "Threads Post",
//       icon: <Sparkles className="text-purple-500 w-6 h-6" />,
//       description: "Generate engaging Threads posts",
//     },
//     {
//       key: "facebook",
//       label: "Facebook Post",
//       icon: <FileText className="text-blue-600 w-6 h-6" />,
//       description: "Write compelling Facebook posts",
//     },
//     {
//       key: "instagram",
//       label: "Instagram Caption",
//       icon: <Sparkles className="text-pink-500 w-6 h-6" />,
//       description: "Create catchy Instagram captions",
//     },
//   ];

//   useEffect(() => {
//     if (user) checkDailyQuota();
//   }, [user]);

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

//   const handleGenerate = async () => {
//     if (!selectedCard) return toast.error("Select a platform first!");
//     if (!prompt.trim()) return toast.error("Enter some text!");

//     let finalPrompt = "";

//     switch (selectedCard) {
//       case "linkedin":
//         if (!industry || !role) return toast.error("Please fill all LinkedIn fields");
//         finalPrompt = `Write a professional LinkedIn post for the ${industry} industry, from the perspective of a ${role}, about: ${prompt}. Include relevant emojis naturally.`;
//         break;

//       case "xpost":
//         finalPrompt = `Write a short, engaging X (Twitter) post (280 characters max) about: ${prompt}. Add fitting emojis.`;
//         break;

//       case "thread":
//         finalPrompt = `Write an engaging Threads post about: ${prompt}. Use emojis and make it thread-friendly.`;
//         break;

//       case "facebook":
//         finalPrompt = `Write a Facebook post about: ${prompt}. Make it engaging and relatable. Include emojis naturally.`;
//         break;

//       case "instagram":
//         finalPrompt = `Write an Instagram caption about: ${prompt}. Make it catchy and include hashtags and emojis.`;
//         break;

//       default:
//         finalPrompt = prompt;
//     }

//     if (dailyCount >= 5) return toast.error("Daily limit reached! Upgrade to generate more.");

//     setLoading(true);
//     setGeneratedTemplate("");

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//       const result = await model.generateContent({
//         contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
//       });
//       const template = result.response.text();
//       setGeneratedTemplate(template);

//       if (user) {
//         await supabase.from("template_generations").insert({
//           user_id: user.id,
//           platform: selectedCard,
//           prompt: finalPrompt,
//           template_content: template,
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

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(generatedTemplate);
//     toast.success("Copied to clipboard!");
//   };

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
//           <h1 className="text-3xl font-bold mb-4 dark:text-white">Template Generator</h1>
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             {platforms.map((platform) => (
//               <div
//                 key={platform.key}
//                 onClick={() => setSelectedCard(platform.key)}
//                 className={`p-4 rounded-xl border cursor-pointer ${
//                   selectedCard === platform.key
//                     ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
//                     : "border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   {platform.icon}
//                   <h3 className="font-semibold dark:text-white">{platform.label}</h3>
//                 </div>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">{platform.description}</p>
//               </div>
//             ))}
//           </div>

//           {/* LinkedIn Inputs */}
//           {selectedCard === "linkedin" && (
//             <div className="space-y-4 mb-4">
//               <ModernDropdown
//                 label="Select Industry"
//                 options={industries}
//                 selected={industry}
//                 onChange={(val) => setIndustry(val)}
//               />
//               <ModernDropdown
//                 label="Select Role"
//                 options={roles}
//                 selected={role}
//                 onChange={(val) => setRole(val)}
//               />
//               <textarea
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 placeholder="Write what you want your post to be about..."
//                 rows={4}
//                 className="w-full p-4 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
//               />
//             </div>
//           )}

//           {/* Other platform inputs */}
//           {selectedCard && selectedCard !== "linkedin" && (
//             <textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Describe the template you want to generate..."
//               rows={5}
//               className="w-full p-4 border rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
//             />
//           )}

//           <button
//             onClick={handleGenerate}
//             disabled={loading || dailyCount >= 5}
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Generating..." : "Generate Template"}
//           </button>
//         </div>

//         {generatedTemplate && (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
//             <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
//               <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">{generatedTemplate}</p>
//             </div>
//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={copyToClipboard}
//                 className="border p-2 rounded-lg dark:border-gray-600 dark:text-white"
//               >
//                 Copy
//               </button>
//               <button
//                 onClick={downloadTemplate}
//                 className="border p-2 rounded-lg dark:border-gray-600 dark:text-white"
//               >
//                 Download
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { FileText, Sparkles, Copy, Download, Linkedin, Twitter } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ModernDropdown } from "../components/UI/ModernDropdown";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

type Platform = "linkedin" | "xpost" | "thread" | "facebook" | "instagram";

export default function GenerateTemplate() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedTemplate, setGeneratedTemplate] = useState("");
  const [dailyCount, setDailyCount] = useState(0);
  const [selectedCard, setSelectedCard] = useState<Platform | null>(null);

  const [industry, setIndustry] = useState("");
  const [role, setRole] = useState("");

  const industries = ["Technology", "Finance", "Healthcare", "Education", "Marketing", "Other"];
  const roles = ["Founder", "HR", "Employee", "Student", "Manager", "CEO", "Assistant Manager", "Accountant", "Team Lead"];

  const platforms: { key: Platform; label: string; icon: JSX.Element; description: string }[] = [
    { key: "linkedin", label: "LinkedIn Post", icon: <Linkedin className="text-blue-700 dark:text-blue-400 w-6 h-6" />, description: "Craft engaging LinkedIn posts with emojis" },
    { key: "xpost", label: "X (Twitter) Post", icon: <Twitter className="text-sky-500 dark:text-sky-400 w-6 h-6" />, description: "Create impactful tweets with emojis" },
    { key: "thread", label: "Threads Post", icon: <Sparkles className="text-purple-500 w-6 h-6" />, description: "Generate engaging Threads posts" },
    { key: "facebook", label: "Facebook Post", icon: <FileText className="text-blue-600 w-6 h-6" />, description: "Write compelling Facebook posts" },
    { key: "instagram", label: "Instagram Caption", icon: <Sparkles className="text-pink-500 w-6 h-6" />, description: "Create catchy Instagram captions" },
  ];

  useEffect(() => { if (user) checkDailyQuota(); }, [user]);

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
    if (!selectedCard) return toast.error("Select a platform first!");
    if (!prompt.trim()) return toast.error("Enter some text!");

    let finalPrompt = "";
    switch (selectedCard) {
      case "linkedin":
        if (!industry || !role) return toast.error("Please fill all LinkedIn fields");
        finalPrompt = `Write a professional LinkedIn post for the ${industry} industry, from the perspective of a ${role}, about: ${prompt}. Include relevant emojis naturally.`;
        break;
      case "xpost":
        finalPrompt = `Write a short, engaging X (Twitter) post (280 characters max) about: ${prompt}. Add fitting emojis.`;
        break;
      case "thread":
        finalPrompt = `Write an engaging Threads post about: ${prompt}. Use emojis and make it thread-friendly.`;
        break;
      case "facebook":
        finalPrompt = `Write a Facebook post about: ${prompt}. Make it engaging and relatable. Include emojis naturally.`;
        break;
      case "instagram":
        finalPrompt = `Write an Instagram caption about: ${prompt}. Make it catchy and include hashtags and emojis.`;
        break;
      default:
        finalPrompt = prompt;
    }

    if (dailyCount >= 5) return toast.error("Daily limit reached! Upgrade to generate more.");

    setLoading(true);
    setGeneratedTemplate("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      });
      const template = result.response.text();
      setGeneratedTemplate(template);

      if (user) {
        await supabase.from("template_generations").insert({
          user_id: user.id,
          platform: selectedCard,
          prompt: finalPrompt,
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

  const copyToClipboard = () => { navigator.clipboard.writeText(generatedTemplate); toast.success("Copied to clipboard!"); };
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

  const getProfilePreview = () => {
    switch (selectedCard) {
      case "linkedin":
        return (
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
              <div>
                <h4 className="font-semibold dark:text-white">John Doe</h4>
                <p className="text-xs text-gray-500 dark:text-gray-300">1st • {industry} | {role}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">2h • 🌐</p>
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">{generatedTemplate}</p>
          </div>
        );
      case "xpost":
        return (
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
              <div>
                <h4 className="font-semibold dark:text-white">Jane Smith <span className="text-gray-500 dark:text-gray-400">@janesmith</span></h4>
                <p className="text-xs text-gray-400 dark:text-gray-500">· 1h</p>
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">{generatedTemplate}</p>
          </div>
        );
      case "thread":
      case "facebook":
      case "instagram":
        return (
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
              <div>
                <h4 className="font-semibold dark:text-white">Social User</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500">· 1h</p>
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">{generatedTemplate}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">Template Generator</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {platforms.map((platform) => (
              <div key={platform.key} onClick={() => setSelectedCard(platform.key)} className={`p-4 rounded-xl border cursor-pointer ${selectedCard === platform.key ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : "border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                <div className="flex items-center gap-3">{platform.icon}<h3 className="font-semibold dark:text-white">{platform.label}</h3></div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{platform.description}</p>
              </div>
            ))}
          </div>

          {selectedCard === "linkedin" && (
            <div className="space-y-4 mb-4">
              <ModernDropdown label="Select Industry" options={industries} selected={industry} onChange={setIndustry} />
              <ModernDropdown label="Select Role" options={roles} selected={role} onChange={setRole} />
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Write what you want your post to be about..." rows={4} className="w-full p-4 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600" />
            </div>
          )}

          {selectedCard && selectedCard !== "linkedin" && (
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe the template you want to generate..." rows={5} className="w-full p-4 border rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600" />
          )}

          <button onClick={handleGenerate} disabled={loading || dailyCount >= 5} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Generating..." : "Generate Template"}
          </button>
        </div>

        {generatedTemplate && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
            {getProfilePreview()}
            <div className="flex gap-3 mt-4">
              <button onClick={copyToClipboard} className="border p-2 rounded-lg dark:border-gray-600 dark:text-white">Copy</button>
              <button onClick={downloadTemplate} className="border p-2 rounded-lg dark:border-gray-600 dark:text-white">Download</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}