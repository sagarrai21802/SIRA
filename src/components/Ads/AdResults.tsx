import React from "react";
import { AdVariant } from "../../lib/Ad";
import AdCard from "../Ads/AdCard";

interface Props {
  variants: AdVariant[];
}

export default function AdResults({ variants }: Props) {
  if (!variants.length) return null;

  return (
    <div className="mt-6 space-y-4">
      {variants.map((ad, i) => (
        <AdCard key={i} ad={ad} />
      ))}
    </div>
  );
}
