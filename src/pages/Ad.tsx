
// import  { useState } from "react";
// import { generateAdStrategy, AdRequest, AdOutput } from "../lib/Ad";
// import toast from "react-hot-toast";
// import { ModernDropdown } from "../components/UI/ModernDropdown";

// export default function AdGenerator() {
//   const [campaignObjective, setCampaignObjective] = useState("Traffic");
//   const [budget, setBudget] = useState("");
//   const [currency, setCurrency] = useState("USD");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [creativeType, setCreativeType] = useState("Image");
//   const [declaration, setDeclaration] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<AdOutput | null>(null);

//   const handleGenerate = async () => {
//     if (!declaration) {
//       toast.error("Please enter ad declaration/prompt!");
//       return;
//     }
//     setLoading(true);

//     const randomizer = Math.random().toString(36).substring(2, 8);

//     const req: AdRequest = {
//       platform: "meta",
//       campaignObjective,
//       budget: `${currency} ${budget}`,
//       duration: `${startDate} to ${endDate}`,
//       creativeType,
//       declaration: `${declaration}\n\n(Randomizer: ${randomizer})`,
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
//     <div className="max-w-5xl mx-auto py-10 px-6">
//       <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
//         <h1 className="text-3xl font-bold mb-10 text-center  dark:text-white">Meta Ad Generator</h1>

//         {/* Campaign Objective & Creative Type */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <ModernDropdown
//             label="Campaign Objective"
//             options={["Traffic", "Leads", "Engagement", "Sales", "App-Installs"]}
//             selected={campaignObjective}
//             onChange={setCampaignObjective}
//           />

//           <ModernDropdown
//             label="Creative Type"
//             options={["Image", "Carousal", "Video"]}
//             selected={creativeType}
//             onChange={setCreativeType}
//           />
//         </div>

//         {/* Budget + Currency */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div>
//             <label className="block font-medium mb-2 dark:text-white">Budget</label>
//             <input
//               type="number"
//               placeholder="e.g. 500"
//               value={budget}
//               onChange={(e) => setBudget(e.target.value)}
//               className="w-full border rounded-lg p-3"
//             />
//           </div>

//           <ModernDropdown
//             label="Currency"
//             options={[
//               "USD", "EUR", "INR", "GBP", "AUD", "CAD", "JPY", "CNY", "SGD", "AED", "CHF", "NZD", "SEK", "ZAR", "BRL", "HKD"
//             ]}
//             selected={currency}
//             onChange={setCurrency}
//           />
//         </div>

//         {/* Duration */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div>
//             <label className="block font-medium mb-2  dark:text-white">Start Date</label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="w-full border rounded-lg p-3"
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-2  dark:text-white">End Date</label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="w-full border rounded-lg p-3"
//             />
//           </div>
//         </div>

//         {/* Declaration */}
//         <div className="mb-8">
//           <label className="block font-medium mb-2  dark:text-white">Ad Declaration / Prompt</label>
//           <textarea
//             value={declaration}
//             onChange={(e) => setDeclaration(e.target.value)}
//             placeholder="Describe your product/service and what you want to advertise..."
//             className="w-full border rounded-lg p-3 h-28"
//           />
//         </div>

//         {/* Generate Button */}
//         <div className="text-center">
//           <button
//             onClick={handleGenerate}
//             disabled={loading}
//             className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 shadow-md"
//           >
//             {loading ? "Generating..." : "Generate Ads"}
//           </button>
//         </div>
//       </div>

//       {/* Results (Improved) */}
//       {result && (
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Ad Set Section */}
//           <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-xl border border-blue-200 dark:border-gray-600">
//             <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">
//                Ad Set Suggestions
//             </h2>
//             <div className="space-y-4">
//               <p>
//                 <span className="font-semibold text-gray-800 dark:text-gray-200">Audience:</span>{" "}
//                 <span className="px-2 py-1 bg-blue-200 dark:bg-blue-600 rounded-full text-sm">
//                   {result.adSet.audience}
//                 </span>
//               </p>
//               <p>
//                 <span className="font-semibold text-gray-800 dark:text-gray-200">Demographics:</span>{" "}
//                 {result.adSet.demographics}
//               </p>
//               <p>
//                 <span className="font-semibold text-gray-800 dark:text-gray-200">Targeting Type:</span>{" "}
//                 {result.adSet.targetingType}
//               </p>
//               <p>
//                 <span className="font-semibold text-gray-800 dark:text-gray-200">Placements:</span>{" "}
//                 {result.adSet.placements}
//               </p>
//               {result.adSet.imageTips && (
//                 <p className="italic text-gray-600 dark:text-gray-400">
//                   💡 {result.adSet.imageTips}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Ad Copy Section */}
//           <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-xl border border-purple-200 dark:border-gray-600">
//             <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300">
//               ✨ Ad Copy Suggestions
//             </h2>
//             <div className="grid gap-6">
//               {result.adCopy.map((v, i) => (
//                 <div
//                   key={i}
//                   className="p-5 rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-shadow duration-200"
//                 >
//                   <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">
//                      Ad {i + 1}
//                   </h4>
//                   <p><strong>Headline:</strong> {v.headline}</p>
//                   <p><strong>Description:</strong> {v.description}</p>
//                   <p>
//                     <strong>CTA:</strong>{" "}
//                     <span className="px-2 py-1 bg-green-200 dark:bg-green-700 rounded-full text-sm">
//                       {v.callToAction}
//                     </span>
//                   </p>
//                   {v.tagline && <p><strong>Tagline:</strong> {v.tagline}</p>}
//                   {v.imagePlacement && (
//                     <p>
//                       <strong>Image Placement:</strong>{" "}
//                       <span className="px-2 py-1 bg-pink-200 dark:bg-pink-700 rounded-full text-sm">
//                         {v.imagePlacement}
//                       </span>
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { generateAdStrategy, AdRequest, AdOutput } from "../lib/Ad";
import toast from "react-hot-toast";
import { ModernDropdown } from "../components/UI/ModernDropdown";

export default function AdGenerator() {
  const [campaignObjective, setCampaignObjective] = useState("Traffic");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [creativeType, setCreativeType] = useState("Image");
  const [declaration, setDeclaration] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdOutput | null>(null);

  const handleGenerate = async () => {
    if (!declaration) {
      toast.error("Please enter ad declaration/prompt!");
      return;
    }
    setLoading(true);

    const randomizer = Math.random().toString(36).substring(2, 8);

    const req: AdRequest = {
      platform: "meta",
      campaignObjective,
      budget: `${currency} ${budget}`,
      duration: `${startDate} to ${endDate}`,
      creativeType,
      declaration: `${declaration}\n\n(Randomizer: ${randomizer})`,
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
    <div className="max-w-5xl mx-auto py-10 px-6 dark:bg-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-10 text-center dark:text-white">
          Meta Ad Generator
        </h1>

        {/* Campaign Objective & Creative Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ModernDropdown
            label="Campaign Objective"
            options={["Traffic", "Leads", "Engagement", "Sales", "App-Installs"]}
            selected={campaignObjective}
            onChange={setCampaignObjective}
          />
          <ModernDropdown
            label="Creative Type"
            options={["Image", "Carousal", "Video"]}
            selected={creativeType}
            onChange={setCreativeType}
          />
        </div>

        {/* Budget + Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block font-medium mb-2 dark:text-white">Budget</label>
            <input
              type="number"
              placeholder="e.g. 500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none transition-all duration-300"
            />
          </div>
          <ModernDropdown
            label="Currency"
            options={[
              "USD", "EUR", "INR", "GBP", "AUD", "CAD", "JPY", "CNY", "SGD", "AED", "CHF", "NZD", "SEK", "ZAR", "BRL", "HKD"
            ]}
            selected={currency}
            onChange={setCurrency}
          />
        </div>

        {/* Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block font-medium mb-2 dark:text-white">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none transition-all duration-300"
            />
          </div>
          <div>
            <label className="block font-medium mb-2 dark:text-white">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Declaration */}
        <div className="mb-8">
          <label className="block font-medium mb-2 dark:text-white">Ad Declaration / Prompt</label>
          <textarea
            value={declaration}
            onChange={(e) => setDeclaration(e.target.value)}
            placeholder="Describe your product/service and what you want to advertise..."
            className="w-full border rounded-lg p-3 h-28 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none transition-all duration-300"
          />
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 shadow-md"
          >
            {loading ? "Generating..." : "Generate Ads"}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ad Set */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-xl border border-blue-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">
              Ad Set Suggestions
            </h2>
            <div className="space-y-4">
              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">Audience:</span>{" "}
                <span className="px-2 py-1 bg-blue-200 dark:bg-blue-600 rounded-full text-sm">
                  {result.adSet.audience}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">Demographics:</span>{" "}
                {result.adSet.demographics}
              </p>
              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">Targeting Type:</span>{" "}
                {result.adSet.targetingType}
              </p>
              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">Placements:</span>{" "}
                {result.adSet.placements}
              </p>
              {result.adSet.imageTips && (
                <p className="italic text-gray-600 dark:text-gray-400">
                  💡 {result.adSet.imageTips}
                </p>
              )}
            </div>
          </div>

          {/* Ad Copy */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-xl border border-purple-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300">
              ✨ Ad Copy Suggestions
            </h2>
            <div className="grid gap-6">
              {result.adCopy.map((v, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-shadow duration-200"
                >
                  <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">
                    Ad {i + 1}
                  </h4>
                  <p><strong>Headline:</strong> {v.headline}</p>
                  <p><strong>Description:</strong> {v.description}</p>
                  <p>
                    <strong>CTA:</strong>{" "}
                    <span className="px-2 py-1 bg-green-200 dark:bg-green-700 rounded-full text-sm">
                      {v.callToAction}
                    </span>
                  </p>
                  {v.tagline && <p><strong>Tagline:</strong> {v.tagline}</p>}
                  {v.imagePlacement && (
                    <p>
                      <strong>Image Placement:</strong>{" "}
                      <span className="px-2 py-1 bg-pink-200 dark:bg-pink-700 rounded-full text-sm">
                        {v.imagePlacement}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}