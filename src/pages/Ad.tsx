// // import React, { useState } from "react";
// // import { generateAdStrategy, AdRequest, AdOutput } from "../lib/Ad";
// // import toast from "react-hot-toast";

// // export default function AdGenerator() {
// //   const [campaignObjective, setCampaignObjective] = useState("traffic");
// //   const [budget, setBudget] = useState("");
// //   const [duration, setDuration] = useState("");
// //   const [creativeType, setCreativeType] = useState("image");
// //   const [declaration, setDeclaration] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [result, setResult] = useState<AdOutput | null>(null);

// //   const handleGenerate = async () => {
// //     if (!declaration) {
// //       toast.error("Please enter ad declaration/prompt!");
// //       return;
// //     }
// //     setLoading(true);

// //     const req: AdRequest = {
// //       platform: "meta",
// //       campaignObjective,
// //       budget,
// //       duration,
// //       creativeType,
// //       declaration,
// //     };

// //     try {
// //       const output = await generateAdStrategy(req);
// //       setResult(output);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to generate ads.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto py-10 px-4">
// //       <h1 className="text-3xl font-bold mb-6">Meta Ad Generator</h1>

// //       {/* Campaign Objective */}
// //       <div className="mb-4">
// //         <label className="block font-medium mb-2">Campaign Objective</label>
// //         <select
// //           value={campaignObjective}
// //           onChange={(e) => setCampaignObjective(e.target.value)}
// //           className="w-full border rounded-lg p-2"
// //         >
// //           <option value="traffic">Traffic</option>
// //           <option value="leads">Leads</option>
// //           <option value="engagement">Engagement</option>
// //           <option value="sales">Sales</option>
// //           <option value="app-downloads">App Downloads</option>
// //           <option value="app-installs">App Installs</option>
// //         </select>
// //       </div>

// //       {/* Budget + Duration */}
// //       <div className="grid grid-cols-2 gap-4 mb-4">
// //         <div>
// //           <label className="block font-medium mb-2">Budget ($)</label>
// //           <input
// //             type="number"
// //             placeholder="e.g. 500"
// //             value={budget}
// //             onChange={(e) => setBudget(e.target.value)}
// //             className="w-full border rounded-lg p-2"
// //           />
// //         </div>
// //         <div>
// //           <label className="block font-medium mb-2">Duration (Days)</label>
// //           <input
// //             type="number"
// //             placeholder="e.g. 30"
// //             value={duration}
// //             onChange={(e) => setDuration(e.target.value)}
// //             className="w-full border rounded-lg p-2"
// //           />
// //         </div>
// //       </div>

// //       {/* Creative Type */}
// //       <div className="mb-4">
// //         <label className="block font-medium mb-2">Creative Type</label>
// //         <select
// //           value={creativeType}
// //           onChange={(e) => setCreativeType(e.target.value)}
// //           className="w-full border rounded-lg p-2"
// //         >
// //           <option value="image">Image</option>
// //           <option value="carousal">Carousal</option>
// //           <option value="video">Video</option>
// //         </select>
// //       </div>

// //       {/* Declaration */}
// //       <div className="mb-6">
// //         <label className="block font-medium mb-2">
// //           Ad Declaration / Prompt
// //         </label>
// //         <textarea
// //           value={declaration}
// //           onChange={(e) => setDeclaration(e.target.value)}
// //           placeholder="Describe your product/service and what you want to advertise..."
// //           className="w-full border rounded-lg p-3 h-28"
// //         />
// //       </div>

// //       {/* Generate Button */}
// //       <button
// //         onClick={handleGenerate}
// //         disabled={loading}
// //         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
// //       >
// //         {loading ? "Generating..." : "Generate Ads"}
// //       </button>

// //       {/* Results */}
// //       {result && (
// //         <div className="mt-10 space-y-8">
// //           {/* Ad Set Section */}
// //           <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
// //             <h2 className="text-2xl font-semibold mb-4">Ad Set Suggestions</h2>
// //             <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
// //               <li>
// //                 <strong>Audience:</strong> {result.adSet.audience}
// //               </li>
// //               <li>
// //                 <strong>Demographics:</strong> {result.adSet.demographics}
// //               </li>
// //               <li>
// //                 <strong>Location:</strong> {result.adSet.location}
// //               </li>
// //               <li>
// //                 <strong>Placements:</strong> {result.adSet.placements}
// //               </li>
// //             </ul>
// //           </div>

// //           {/* Ad Copy Section */}
// //           <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
// //             <h2 className="text-2xl font-semibold mb-4">Ad Copy Suggestions</h2>
// //             {result.adCopy.map((v, i) => (
// //               <div
// //                 key={i}
// //                 className="p-4 border rounded-lg bg-white dark:bg-gray-900 shadow-sm mb-3"
// //               >
// //                 <h4 className="font-semibold text-lg">Ad {i + 1}</h4>
// //                 <p>
// //                   <strong>Headline:</strong> {v.headline}
// //                 </p>
// //                 <p>
// //                   <strong>Description:</strong> {v.description}
// //                 </p>
// //                 <p>
// //                   <strong>CTA:</strong> {v.callToAction}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import { generateAdStrategy, AdRequest, AdOutput } from "../lib/Ad";
// import toast from "react-hot-toast";

// export default function AdGenerator() {
//   const [campaignObjective, setCampaignObjective] = useState("traffic");
//   const [budget, setBudget] = useState("");
//   const [duration, setDuration] = useState("");
//   const [creativeType, setCreativeType] = useState("image");
//   const [declaration, setDeclaration] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<AdOutput | null>(null);

//   const handleGenerate = async () => {
//     if (!declaration) {
//       toast.error("Please enter ad declaration/prompt!");
//       return;
//     }
//     setLoading(true);

//     const req: AdRequest = {
//       platform: "meta",
//       campaignObjective,
//       budget,
//       duration,
//       creativeType,
//       declaration,
//     };

//     try {
//       const output = await generateAdStrategy(req);
//       setResult(output);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to generate ads.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-10 px-4">
//       <h1 className="text-3xl font-bold mb-6">Meta Ad Generator</h1>

//       {/* Campaign Objective */}
//       <div className="mb-4">
//         <label className="block font-medium mb-2">Campaign Objective</label>
//         <select
//           value={campaignObjective}
//           onChange={(e) => setCampaignObjective(e.target.value)}
//           className="w-full border rounded-lg p-2"
//         >
//           <option value="traffic">Traffic</option>
//           <option value="leads">Leads</option>
//           <option value="engagement">Engagement</option>
//           <option value="sales">Sales</option>
//           <option value="app-downloads">App Downloads</option>
//           <option value="app-installs">App Installs</option>
//         </select>
//       </div>

//       {/* Budget + Duration */}
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="block font-medium mb-2">Budget ($)</label>
//           <input
//             type="number"
//             placeholder="e.g. 500"
//             value={budget}
//             onChange={(e) => setBudget(e.target.value)}
//             className="w-full border rounded-lg p-2"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-2">Duration (Days)</label>
//           <input
//             type="number"
//             placeholder="e.g. 30"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             className="w-full border rounded-lg p-2"
//           />
//         </div>
//       </div>

//       {/* Creative Type */}
//       <div className="mb-4">
//         <label className="block font-medium mb-2">Creative Type</label>
//         <select
//           value={creativeType}
//           onChange={(e) => setCreativeType(e.target.value)}
//           className="w-full border rounded-lg p-2"
//         >
//           <option value="image">Image</option>
//           <option value="carousal">Carousal</option>
//           <option value="video">Video</option>
//         </select>
//       </div>

//       {/* Declaration */}
//       <div className="mb-6">
//         <label className="block font-medium mb-2">
//           Ad Declaration / Prompt
//         </label>
//         <textarea
//           value={declaration}
//           onChange={(e) => setDeclaration(e.target.value)}
//           placeholder="Describe your product/service and what you want to advertise..."
//           className="w-full border rounded-lg p-3 h-28"
//         />
//       </div>

//       {/* Generate Button */}
//       <button
//         onClick={handleGenerate}
//         disabled={loading}
//         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//       >
//         {loading ? "Generating..." : "Generate Ads"}
//       </button>

//       {/* Results */}
//       {result && (
//         <div className="mt-10 space-y-8">
//           {/* Ad Set Section */}
//           <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Ad Set Suggestions</h2>
//             <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
//               <li>
//                 <strong>Audience:</strong> {result.adSet.audience}
//               </li>
//               <li>
//                 <strong>Demographics:</strong> {result.adSet.demographics}
//               </li>
//               <li>
//                 <strong>Location:</strong> {result.adSet.location}
//               </li>
//               <li>
//                 <strong>Placements:</strong> {result.adSet.placements}
//               </li>
//             </ul>
//           </div>

//           {/* Ad Copy Section */}
//           <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Ad Copy Suggestions</h2>
//             {result.adCopy.map((v, i) => (
//               <div
//                 key={i}
//                 className="p-4 border rounded-lg bg-white dark:bg-gray-900 shadow-sm mb-3"
//               >
//                 <h4 className="font-semibold text-lg">Ad {i + 1}</h4>
//                 <p>
//                   <strong>Headline:</strong> {v.headline}
//                 </p>
//                 <p>
//                   <strong>Description:</strong> {v.description}
//                 </p>
//                 <p>
//                   <strong>CTA:</strong> {v.callToAction}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { generateAdStrategy, AdRequest, AdOutput } from "../lib/Ad";
import toast from "react-hot-toast";

export default function AdGenerator() {
  const [campaignObjective, setCampaignObjective] = useState("traffic");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [creativeType, setCreativeType] = useState("image");
  const [declaration, setDeclaration] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdOutput | null>(null);

  const handleGenerate = async () => {
    if (!declaration) {
      toast.error("Please enter ad declaration/prompt!");
      return;
    }
    setLoading(true);

    const req: AdRequest = {
      platform: "meta",
      campaignObjective,
      budget: `${currency} ${budget}`,
      duration: `${startDate} to ${endDate}`,
      creativeType,
      declaration,
    };

    try {
      const output = await generateAdStrategy(req);
      setResult(output);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate ads.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Meta Ad Generator</h1>

      {/* Campaign Objective */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Campaign Objective</label>
        <select
          value={campaignObjective}
          onChange={(e) => setCampaignObjective(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="traffic">Traffic</option>
          <option value="leads">Leads</option>
          <option value="engagement">Engagement</option>
          <option value="sales">Sales</option>
          <option value="app-downloads">App Downloads</option>
          <option value="app-installs">App Installs</option>
        </select>
      </div>

      {/* Budget + Currency + Duration */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-2">Budget</label>
          <input
            type="number"
            placeholder="e.g. 500"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="INR">INR (₹)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <div>
            <label className="block font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>
      </div>

      {/* Creative Type */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Creative Type</label>
        <select
          value={creativeType}
          onChange={(e) => setCreativeType(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="image">Image</option>
          <option value="carousal">Carousal</option>
          <option value="video">Video</option>
        </select>
      </div>

      {/* Declaration */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Ad Declaration / Prompt
        </label>
        <textarea
          value={declaration}
          onChange={(e) => setDeclaration(e.target.value)}
          placeholder="Describe your product/service and what you want to advertise..."
          className="w-full border rounded-lg p-3 h-28"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Ads"}
      </button>

      {/* Results */}
      {result && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ad Set Section */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Ad Set Suggestions</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Audience:</strong> {result.adSet.audience}</li>
              <li><strong>Demographics:</strong> {result.adSet.demographics}</li>
              <li><strong>Location:</strong> {result.adSet.location}</li>
              <li><strong>Placements:</strong> {result.adSet.placements}</li>
              {result.adSet.imageTips && (
                <li><strong>Image Usage Tips:</strong> {result.adSet.imageTips}</li>
              )}
            </ul>
          </div>

          {/* Ad Copy Section */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Ad Copy Suggestions</h2>
            {result.adCopy.map((v, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg bg-white dark:bg-gray-900 shadow-sm mb-3"
              >
                <h4 className="font-semibold text-lg">Ad {i + 1}</h4>
                <p><strong>Headline:</strong> {v.headline}</p>
                <p><strong>Description:</strong> {v.description}</p>
                <p><strong>CTA:</strong> {v.callToAction}</p>
                {v.tagline && <p><strong>Tagline:</strong> {v.tagline}</p>}
                {v.imagePlacement && (
                  <p><strong>Image Placement:</strong> {v.imagePlacement}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}