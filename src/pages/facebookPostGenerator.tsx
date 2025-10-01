
import React, { useState, Fragment } from "react";
import { generateTemplate, TemplateResult } from "../lib/template";
import { generateTemplateImage } from "../lib/templateImage";
import { Button } from "../components/UI/Button";
import { Card, CardContent } from "../components/UI/Card";
import { Loader2, Copy, Check, AlertTriangle, Download, CalendarPlus } from "lucide-react";
import { ModernDropdown } from "../components/UI/ModernDropdown";
import { Dialog, Transition } from "@headlessui/react";
import { ScheduleGeneratedPostModal } from '../components/Scheduler/ScheduleGeneratedPostModal';
import toast from 'react-hot-toast';

// Error Modal Component
const ErrorModal = ({ isOpen, message, onRetry, onClose }: {
  isOpen: boolean;
  message: string;
  onRetry: () => void;
  onClose: () => void;
}) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-40" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" /> API Error
              </Dialog.Title>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={() => { onClose(); onRetry(); }}>Retry</Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

// Copyable Output Component
const CopyableOutput = ({ title, body, cta }: { title: string; body: string; cta: string }) => {
  const [copied, setCopied] = useState(false);
  const fullText = `${title}\n\n${body}\n\n${cta}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 p-6 shadow-lg font-inter">
      {/* Copy button */}
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
      </Button>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{body}</p>
      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 italic">{cta}</p>
    </div>
  );
};

// Suggestions Sidebar
const SuggestionsSidebar = ({ tips }: { tips: string[] }) => (
  <Card className="shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl font-inter">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4">Quick Tips:</h3>
      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
        {tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
      </ul>
    </CardContent>
  </Card>
);

export default function FacebookPostGenerator() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState(""); // ✅ Added description state
  const [imageStyle, setImageStyle] = useState("Realistic");
  const [imageSize, setImageSize] = useState("1200x630");
  const [imageCount, setImageCount] = useState("1");
  const [result, setResult] = useState<TemplateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imgLoading, setImgLoading] = useState(false);
  const [apiError, setApiError] = useState<{ message: string; onRetry: () => void } | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const imageStyles = ["3D", "Realistic", "Pixart", "Animated", "Cartoon"];
  const imageSizes = [
    { label: "Post (1200x630)", value: "1200x630" },
    { label: "Profile (400x400)", value: "400x400" },
    { label: "Background (1920x1080)", value: "1920x1080" }
  ];
  const imageCountOptions = ["1", "2", "3", "4"];

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setImages([]);
    setApiError(null);

    try {
      const template = await generateTemplate({
        title: topic,
        description: description || "Generate a Facebook post.", // ✅ includes description
        tone: "casual",
        style: "facebook-post",
      });
      setResult(template);
    } catch (err) {
      setApiError({
        message: "Error generating Facebook post. Please check your connection or API key.",
        onRetry: handleGenerate,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!result) return;
    setImgLoading(true);
    setImages([]);
    setApiError(null);

    try {
      const numImages = parseInt(imageCount, 10);
      const imagePromises = Array.from({ length: numImages }, () =>
        generateTemplateImage(`${imageStyle} style: ${result.templateBody}`, imageSize)
      );
      const generatedImages = await Promise.all(imagePromises);
      setImages(generatedImages.filter((img): img is string => !!img));
    } catch (err) {
      setApiError({
        message: "Error generating images. The service may be temporarily unavailable.",
        onRetry: handleGenerateImage,
      });
    } finally {
      setImgLoading(false);
    }
  };

  const fullPostContent = result ? `${result.templateTitle}\n\n${result.templateBody}\n\n${result.callToAction}` : '';

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 relative z-20 font-inter bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
        Facebook Post Generator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Post Form */}
          <div className="grid gap-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Topic</label>
              <input
                type="text"
                placeholder="e.g., 'The future of AI in marketing'"
                className="w-full p-3 rounded-xl border border-gray-300/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-900/40 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {/* ✅ Description Box */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                placeholder="Add extra context for your Facebook post..."
                className="w-full p-3 rounded-xl border border-gray-300/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-900/40 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button onClick={handleGenerate} disabled={loading} className="w-full py-3 text-lg rounded-xl">
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "🚀 Generate Facebook Post"}
            </Button>
          </div>

          {/* Post Preview */}
          {result && (
            <Card className="shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
              <CardContent className="p-6 space-y-6">
                <CopyableOutput title={result.templateTitle} body={result.templateBody} cta={result.callToAction} />

                {/* Image Controls */}
                <div className="flex flex-col gap-4 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <ModernDropdown
                      label="Image Style"
                      options={imageStyles}
                      selected={imageStyle}
                      onChange={setImageStyle}
                    />
                    <ModernDropdown
                      label="Image Size"
                      options={imageSizes.map(s => s.label)}
                      selected={imageSizes.find(s => s.value === imageSize)?.label || "Post (1200x630)"}
                      onChange={(label) =>
                        setImageSize(imageSizes.find(s => s.label === label)?.value || "1200x630")
                      }
                    />
                    <ModernDropdown
                      label="Number of Images"
                      options={imageCountOptions}
                      selected={imageCount}
                      onChange={setImageCount}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Button onClick={handleGenerateImage} disabled={imgLoading} className="flex-grow py-3 text-lg rounded-xl">
                      {imgLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "🖼️ Generate Image(s)"}
                    </Button>
                    <Button onClick={() => setIsScheduleModalOpen(true)} variant="outline" className="flex-grow py-3 text-lg rounded-xl">
                      <CalendarPlus className="h-5 w-5 mr-2" /> Schedule
                    </Button>
                  </div>
                </div>

                {/* Generated Images */}
                {images.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Generated Facebook Images:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {images.map((image, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                          <img src={image} alt={`Generated Facebook Post ${idx + 1}`} className="w-full h-full object-cover" />
                          <a
                            href={image}
                            download={`sira-facebook-image-${idx + 1}.png`}
                            className="absolute bottom-2 right-2 flex items-center justify-center w-10 h-10 bg-black bg-opacity-60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                          >
                            <Download className="h-5 w-5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {result && result.tips?.length > 0 && <SuggestionsSidebar tips={result.tips} />}
        </div>
      </div>

      <ErrorModal
        isOpen={!!apiError}
        message={apiError?.message || ""}
        onRetry={apiError?.onRetry || (() => {})}
        onClose={() => setApiError(null)}
      />

      {result && (
        <ScheduleGeneratedPostModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onPostScheduled={() => {
            setIsScheduleModalOpen(false);
            toast.success("Post scheduled! Check the Scheduler page.");
          }}
          content={fullPostContent}
          imageUrl={images.length > 0 ? images[0] : null}
          platform="Facebook"
        />
      )}
    </div>
  );
}
// FackbookPost Generator.tsx*