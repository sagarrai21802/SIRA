import React, { useState } from "react";
import { generateAds, AdRequest, AdVariant } from "../../lib/Ad";

interface Props {
  onDone: (payload: { campaign: AdRequest; variants: AdVariant[] }) => void;
  userId?: string;
}

export default function AdBriefForm({ onDone, userId }: Props) {
  const [platform, setPlatform] = useState<"google" | "meta">("google");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!product || !audience) return alert("Please fill all fields");
    setLoading(true);
    const req: AdRequest = { platform, product, audience, tone };
    const variants = await generateAds(req, userId);
    onDone({ campaign: req, variants });
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <select value={platform} onChange={(e) => setPlatform(e.target.value as any)} className="w-full border p-2 rounded">
        <option value="google">Google Ads</option>
        <option value="meta">Meta Ads</option>
      </select>
      <input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product/Service" className="w-full border p-2 rounded" />
      <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Target Audience" className="w-full border p-2 rounded" />
      <input value={tone} onChange={(e) => setTone(e.target.value)} placeholder="Tone (friendly, professional...)" className="w-full border p-2 rounded" />
      <button onClick={handleSubmit} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Generating..." : "Generate Ads"}
      </button>
    </div>
  );
}
