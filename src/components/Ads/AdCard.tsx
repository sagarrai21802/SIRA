import React from "react";
import { AdVariant } from "../../lib/Ad";
import { Copy, Download } from "lucide-react";
import toast from "react-hot-toast";

export default function AdCard({ ad }: { ad: AdVariant }) {
  const copy = () => {
    navigator.clipboard.writeText(`${ad.headline}\n${ad.description}\n${ad.callToAction}`);
    toast.success("Copied!");
  };

  const download = () => {
    const blob = new Blob([`${ad.headline}\n${ad.description}\n${ad.callToAction}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ad.txt";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-bold">{ad.headline}</h3>
      <p className="text-gray-700">{ad.description}</p>
      <p className="text-blue-600 font-semibold mt-2">{ad.callToAction}</p>
      <div className="flex gap-3 mt-3">
        <button onClick={copy} className="border px-3 py-1 rounded flex items-center gap-1"><Copy size={16}/> Copy</button>
        <button onClick={download} className="border px-3 py-1 rounded flex items-center gap-1"><Download size={16}/> Download</button>
      </div>
    </div>
  );
}
