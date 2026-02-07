import { useState } from "react";
import { motion } from "framer-motion";
import { generateAdStrategy, AdRequest, AdOutput } from "../lib/Ad";
import toast from "react-hot-toast";
import { ModernDropdown } from "../components/UI/ModernDropdown";
import { Megaphone, Target, DollarSign, Calendar, Image, Sparkles, Users, MousePointer, Zap, Loader2, CheckCircle } from "lucide-react";

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
      toast.success("Ad strategy generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate ads.");
    } finally {
      setLoading(false);
    }
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
      <div className="max-w-5xl mx-auto">
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-4"
          >
            <Megaphone className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-3">
            Meta Ad Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Create powerful ad campaigns with AI-generated strategies, targeting, and copy
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Target className="w-4 h-4" />
                Campaign Objective
              </label>
              <ModernDropdown
                label=""
                options={["Traffic", "Leads", "Engagement", "Sales", "App-Installs"]}
                selected={campaignObjective}
                onChange={setCampaignObjective}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Image className="w-4 h-4" />
                Creative Type
              </label>
              <ModernDropdown
                label=""
                options={["Image", "Carousel", "Video"]}
                selected={creativeType}
                onChange={setCreativeType}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="w-4 h-4" />
                Budget
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 transition-all"
                />
                <div className="w-32">
                  <ModernDropdown
                    label=""
                    options={[
                      "USD", "EUR", "INR", "GBP", "AUD", "CAD", "JPY", "CNY", "SGD", "AED", "CHF", "NZD", "SEK", "ZAR", "BRL", "HKD"
                    ]}
                    selected={currency}
                    onChange={setCurrency}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4" />
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Sparkles className="w-4 h-4" />
              Ad Declaration / Prompt
            </label>
            <textarea
              value={declaration}
              onChange={(e) => setDeclaration(e.target.value)}
              placeholder="Describe your product/service and what you want to advertise..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-4 h-32 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center justify-center gap-2 mx-auto px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
              ) : (
                <><Zap className="w-5 h-5" /> Generate Ad Strategy</>
              )}
            </motion.button>
          </div>
        </motion.div>

        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center py-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300 dark:border-gray-600"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 mb-4">
              <Megaphone className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">Your ad strategy will appear here</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Fill in the details above and generate your campaign</p>
          </motion.div>
        )}

        {result && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-2xl shadow-xl border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  Ad Set Suggestions
                </h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Audience</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm font-semibold">
                    {result.adSet.audience}
                  </span>
                </div>
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Demographics</span>
                  <p className="text-gray-800 dark:text-gray-200">{result.adSet.demographics}</p>
                </div>
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Targeting Type</span>
                  <p className="text-gray-800 dark:text-gray-200">{result.adSet.targetingType}</p>
                </div>
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Placements</span>
                  <p className="text-gray-800 dark:text-gray-200">{result.adSet.placements}</p>
                </div>
                {result.adSet.imageTips && (
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-amber-800 dark:text-amber-300 text-sm">{result.adSet.imageTips}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-2xl shadow-xl border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <MousePointer className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  Ad Copy Suggestions
                </h2>
              </div>
              <div className="space-y-4">
                {result.adCopy.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-200 border border-purple-100 dark:border-purple-800"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-purple-500" />
                      <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                        Ad {i + 1}
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium text-gray-600 dark:text-gray-400">Headline:</span>{" "}
                        <span className="text-gray-800 dark:text-gray-200">{v.headline}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-gray-600 dark:text-gray-400">Description:</span>{" "}
                        <span className="text-gray-800 dark:text-gray-200">{v.description}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-gray-600 dark:text-gray-400">CTA:</span>{" "}
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold">
                          {v.callToAction}
                        </span>
                      </p>
                      {v.tagline && (
                        <p className="text-sm">
                          <span className="font-medium text-gray-600 dark:text-gray-400">Tagline:</span>{" "}
                          <span className="text-gray-800 dark:text-gray-200 italic">{v.tagline}</span>
                        </p>
                      )}
                      {v.imagePlacement && (
                        <p className="text-sm">
                          <span className="font-medium text-gray-600 dark:text-gray-400">Image Placement:</span>{" "}
                          <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-800 dark:text-pink-300 rounded-full text-xs font-semibold">
                            {v.imagePlacement}
                          </span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
