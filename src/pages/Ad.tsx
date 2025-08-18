import React, { useState } from "react";
import AdBriefForm from "../components/Ads/AdBriefForm";
import AdResults from "../components/Ads/AdResults";
import { AdVariant, AdRequest } from "../lib/Ad";
import { useAuth } from "../hooks/useAuth";

export default function AdPage() {
  const { user } = useAuth();
  const [variants, setVariants] = useState<AdVariant[]>([]);
  const [campaign, setCampaign] = useState<AdRequest | null>(null);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Ad Generator</h1>
      <AdBriefForm
        userId={user?.id}
        onDone={({ campaign, variants }) => {
          setCampaign(campaign);
          setVariants(variants);
        }}
      />
      <AdResults variants={variants} />
    </div>
  );
}
