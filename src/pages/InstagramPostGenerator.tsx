
import React, { useState, Fragment } from "react";
import { generateTemplate, TemplateResult } from "../lib/template";
import { generateTemplateImage } from "../lib/templateImage";
import { Button } from '../components/UI/Button';
import { Card, CardContent } from '../components/UI/Card';
import { Loader2, Copy, Check, AlertTriangle, Download, CalendarPlus } from "lucide-react";
import { ModernDropdown } from '../components/UI/ModernDropdown'; 
import { Dialog, Transition } from "@headlessui/react";
import { ScheduleGeneratedPostModal } from '../components/Scheduler/ScheduleGeneratedPostModal';
import toast from 'react-hot-toast';

// Error Modal
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

// Copyable Output (improved design)
const CopyableOutput = ({ title, body, cta }: { title: string; body: string; cta: string }) => {
  const [copied, setCopied] = useState(false);
  const fullText = `${title}\n\n${body}\n\n${cta}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-pink-50 dark:from-slate-800 dark:to-pink-900/30 rounded-2xl p-6 shadow-inner border border-slate-200/50 dark:border-slate-700/50">
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-200"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      </Button>
      <div className="pr-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{title}</h2>
        <div className="bg-white/70 dark:bg-slate-900/50 p-4 rounded-xl shadow-inner mb-4">
          <div className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-medium">
            {body}
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-4 py-3 rounded-xl font-semibold text-center shadow-md">
          {cta}
        </div>
      </div>
    </div>
  );
};

// Suggestions Sidebar
const SuggestionsSidebar = ({ tips }: { tips: string[] }) => (
  <Card className="shadow-xl rounded-3xl border border-slate-200/60 dark:border-slate-700/60 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl overflow-hidden">
    <CardContent className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center mr-3">
          💡
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Quick Tips</h3>
      </div>
      <ul className="space-y-3">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex items-start">
            <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{tip}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default function InstagramPostGenerator() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<TemplateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imgLoading, setImgLoading] = useState(false);
  const [imageCount, setImageCount] = useState("1");
  const [imageSize, setImageSize] = useState("Post");
  const [imageStyle, setImageStyle] = useState("Realistic");
  const [apiError, setApiError] = useState<{ message: string; onRetry: () => void } | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const imageCountOptions = ["1", "2", "3", "4"];
  const imageSizeOptions = ["Post", "Story", "Reel"];
  const imageStyleOptions = ["3D", "Cartoon", "Pixart", "Realistic"];

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setImages([]);
    setApiError(null);

    try {
      const template = await generateTemplate({
        title: topic,
        description: description || `Generate a creative Instagram post.`,
        tone: "creative",
        style: "instagram-post",
      });
      setResult(template);
    } catch (err) {
      setApiError({
        message: "Error generating Instagram post. Please check your connection or API key.",
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
        generateTemplateImage(
          `${imageStyle} style: ${result.templateBody}`,
          imageSize === "Post" ? "1080x1080" :
          imageSize === "Story" ? "1080x1920" :
          "1080x1080"
        )
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-pink-950 p-6">
      <div className="max-w-7xl mx-auto space-y-10 relative z-20">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            Instagram Post Generator
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Create visually stunning Instagram posts that captivate your followers and boost engagement.
          </p>
        </div>

        {!result ? (
          <div className="max-w-4xl mx-auto">
            {/* Form - Full Width */}
            <Card className="shadow-xl rounded-3xl border border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Post Details</h2>
                  <p className="text-slate-600 dark:text-slate-400">Fill in the information to generate your creative Instagram post.</p>
                </div>
                <div className="grid gap-6">
                  <div>
                    <label className="block mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Topic</label>
                    <input
                      type="text"
                      placeholder="e.g., 'A day in the life of a travel blogger'"
                      className="w-full p-4 rounded-xl border border-slate-300/60 dark:border-slate-600/60 bg-white/50 dark:bg-slate-900/50 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-all duration-200 hover:shadow-md"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Additional Context</label>
                    <textarea
                      placeholder="Add additional details for the post..."
                      className="w-full p-4 rounded-xl border border-slate-300/60 dark:border-slate-600/60 bg-white/50 dark:bg-slate-900/50 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-all duration-200 hover:shadow-md resize-none min-h-[120px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <Button onClick={handleGenerate} disabled={loading} className="w-full py-4 text-lg rounded-xl bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                    {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "✨ Generate Instagram Post"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Top Row: Form + Enhanced Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form - Shrunk */}
              <Card className="lg:col-span-2 shadow-xl rounded-3xl border border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Post Details</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Edit your inputs and regenerate.</p>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Topic</label>
                      <input
                        type="text"
                        placeholder="e.g., 'A day in the life of a travel blogger'"
                        className="w-full p-3 rounded-xl border border-slate-300/60 dark:border-slate-600/60 bg-white/50 dark:bg-slate-900/50 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-all duration-200 hover:shadow-md"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Additional Context</label>
                      <textarea
                        placeholder="Add additional details for the post..."
                        className="w-full p-3 rounded-xl border border-slate-300/60 dark:border-slate-600/60 bg-white/50 dark:bg-slate-900/50 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-all duration-200 hover:shadow-md resize-none min-h-[100px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <Button onClick={handleGenerate} disabled={loading} className="w-full py-3 text-base rounded-xl bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                      {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "🔄 Regenerate"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar with Image Controls */}
              <Card className="shadow-2xl rounded-3xl border border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-br from-pink-50 via-white to-yellow-50 dark:from-pink-900/20 dark:via-slate-800 dark:to-yellow-900/20 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-yellow-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                        <span className="text-lg">⚙️</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Image Settings</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Configure your visuals</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="relative z-[100]">
                        <ModernDropdown label="Image Size" options={imageSizeOptions} selected={imageSize} onChange={setImageSize} />
                      </div>
                      <div className="relative z-[100]">
                        <ModernDropdown label="Image Style" options={imageStyleOptions} selected={imageStyle} onChange={setImageStyle} />
                      </div>
                      <div className="relative z-[100]">
                        <ModernDropdown label="Number of Images" options={imageCountOptions} selected={imageCount} onChange={setImageCount} />
                      </div>
                      <Button onClick={handleGenerateImage} disabled={imgLoading} className="w-full py-3 text-sm rounded-xl bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200">
                        {imgLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : "🖼️ Generate Image(s)"}
                      </Button>
                      <Button onClick={() => setIsScheduleModalOpen(true)} variant="outline" className="w-full py-3 text-sm rounded-xl border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200">
                        <CalendarPlus className="h-4 w-4 mr-2" /> Schedule Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom: Generated Content */}
            <Card className="shadow-2xl rounded-3xl border border-slate-200/60 dark:border-slate-700/60 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">🌟 Generated Instagram Post</h3>
                  <CopyableOutput title={result.templateTitle} body={result.templateBody} cta={result.callToAction} />
                </div>


                {/* Generated Images */}
                {images.length > 0 && (
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">📸 Generated Images</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {images.map((image, idx) => (
                        <div key={idx} className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
                          <img src={image} alt={`Generated Instagram Post ${idx + 1}`} className="w-full h-48 object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <a
                              href={image}
                              download={`syra-instagram-image-${idx + 1}.png`}
                              className="inline-flex items-center justify-center w-full py-2 px-4 bg-white/90 hover:bg-white text-slate-800 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              <Download className="h-4 w-4 mr-2" /> Download
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

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
          platform="Instagram"
        />
      )}
      </div>
    </div>
  );
}
// InstagramPostGenerator.tsx