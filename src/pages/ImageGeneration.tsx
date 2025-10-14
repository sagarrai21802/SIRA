import React, { useState, useEffect, useRef } from "react";
import { Loader2, Download, Copy, Cpu, Trash2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { ModernDropdown } from "../components/UI/ModernDropdown";
import { useAuth } from "../hooks/useAuth";
import { generateTemplateImage } from "../lib/templateImage";
import { API_BASE, API_ENDPOINTS } from "../lib/api";

const IMAGE_TYPES = ["Realistic", "Cartoon", "3D", "Anime", "Pixel Art"];
const IMAGE_SIZES = [
  { label: "256x256", width: 256, height: 256 },
  { label: "512x512", width: 512, height: 512 },
  { label: "1024x1024", width: 1024, height: 1024 },
  { label: "Instagram Post 1:1", width: 1080, height: 1080 },
  { label: "Instagram Story 9:16", width: 1080, height: 1920 },
  { label: "Facebook Post 1.91:1", width: 1200, height: 628 },
  { label: "Facebook Cover 16:9", width: 820, height: 312 },
  { label: "LinkedIn Post 1.91:1", width: 1200, height: 627 },
  { label: "LinkedIn Banner 4:1", width: 1584, height: 396 },
];

const IMAGE_QUALITY = ["Low", "Medium", "High"];

interface GeneratedImage {
  id: string;
  prompt: string;
  cloudinary_url: string;
  image_type: string;
  width: number;
  height: number;
  quality: string;
  created_at: string;
}

export const ImageGenerator: React.FC = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState(IMAGE_TYPES[0]);
  const [size, setSize] = useState(IMAGE_SIZES[1]);
  const [quality, setQuality] = useState(IMAGE_QUALITY[1]);
  const [loadingMessage, setLoadingMessage] = useState("Generating your image...");
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [sessionImages, setSessionImages] = useState<string[]>([]);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  // Load user's generated images
  const loadGeneratedImages = async () => {
    if (!user) return;
    setLoadingImages(true);
    try {
      const response = await fetch(`${API_BASE}${API_ENDPOINTS.IMAGE_GENERATIONS}?user_id=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setGeneratedImages(data.items || []);
      }
    } catch (err) {
      console.error('Failed to load images:', err);
    } finally {
      setLoadingImages(false);
    }
  };

  // Delete an image
  const handleDeleteImage = async (imageId: string) => {
    try {
      const response = await fetch(`${API_BASE}${API_ENDPOINTS.IMAGE_GENERATIONS_GET(imageId)}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setGeneratedImages(prev => prev.filter(img => img.id !== imageId));
        toast.success("Image deleted!");
      } else {
        toast.error("Failed to delete image");
      }
    } catch (err) {
      toast.error("Failed to delete image");
    }
  };

  // Load images on component mount
  useEffect(() => {
    loadGeneratedImages();
  }, [user]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError(null);
    setImage(null);
    setLoadingMessage("Initializing AI engine...");

    try {
      const messages = ["Analyzing your prompt...", "Generating visual...", "Rendering preview...", "Almost there..."];
      let i = 0;
      const msgInterval = setInterval(() => {
        setLoadingMessage(messages[i % messages.length]);
        i++;
      }, 1000);

      const sizeStr = `${size.width}x${size.height}`;
      const concept = `${type} style: ${prompt}`;
      const imgUrl = await generateTemplateImage(concept, sizeStr);
      setImage(imgUrl);
      if (!user) {
        setSessionImages((prev) => [imgUrl, ...prev]);
      }
      // ensure the gallery is visible after generation
      setTimeout(() => {
        galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      toast.success("Image generated!");

      // Auto-save to Cloudinary + MongoDB if logged in
      try {
        if (user) {
          const isDataUrl = imgUrl.startsWith('data:');
          if (isDataUrl) {
            const rawBase64 = imgUrl.split(',')[1] || '';
            const resp = await fetch(`${API_BASE}${API_ENDPOINTS.SAVE_IMAGE}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user_id: user.id,
                prompt,
                image_type: type,
                width: size.width,
                height: size.height,
                quality,
                image_base64: rawBase64,
                dataUrl: imgUrl
              })
            });
            const data = await resp.json().catch(() => ({}));
            if (resp.ok && (data as any)?.item) {
              // Immediately show in saved gallery list
              setGeneratedImages((prev) => [(data as any).item, ...prev]);
              // Also refresh from server to keep in sync (order, dedupe)
              loadGeneratedImages();
            } else {
              // Fallback: refresh from server
              loadGeneratedImages();
              const msg = (data as any)?.error || 'Failed to save image';
              toast.error(msg);
            }
          }
        }
      } catch (e) {
        toast.error('Failed to save image');
      }
      clearInterval(msgInterval);
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Check console.");
      toast.error("Image generation failed!");
    } finally {
      setLoading(false);
      setLoadingMessage("Generating your image...");
    }
  };

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = `generated-image-${Date.now()}.png`;
    link.target = "_blank";
    link.click();
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied!");
  };

  const handleCopyImageUrl = () => {
    if (!image) return;
    navigator.clipboard.writeText(image);
    toast.success("Image URL copied!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 relative z-20">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        AI Image Generator
      </h2>

      <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-xl rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 overflow-visible relative z-20">
        {/* Prompt */}
        <textarea
          className="w-full p-5 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-indigo-400/50 resize-none dark:bg-gray-900/70 dark:text-white transition-all text-lg shadow-sm"
          rows={4}
          placeholder="✨ Describe your creative vision..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-4 justify-center relative z-50">
          <ModernDropdown label="Style" options={IMAGE_TYPES} selected={type} onChange={setType} />
          <ModernDropdown label="Size" options={IMAGE_SIZES} selected={size} onChange={setSize} displayKey="label" />
          <ModernDropdown label="Quality" options={IMAGE_QUALITY} selected={quality} onChange={setQuality} />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Cpu className="w-5 h-5" />}
            {loading ? "Generating..." : "Generate Image"}
          </button>

          {image && (
            <button
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-800 shadow hover:scale-105 transition-transform"
              onClick={handleCopyPrompt}
            >
              <Copy className="w-4 h-4" /> Copy Prompt
            </button>
          )}
        </div>

        {error && <div className="text-red-500 text-center font-medium">{error}</div>}
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 space-y-4">
          <div className="animate-spin bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
            <Cpu className="w-7 h-7 text-white" />
          </div>
          <p className="text-lg font-medium">{loadingMessage}</p>
        </div>
      )}

      {/* Generated Image */}
      {image && (
        <div
          className="mt-10 relative rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform border-2 border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            aspectRatio: `${size.width} / ${size.height}`,
          }}
        >
          <img src={image} alt="Generated" className="w-full h-full object-contain rounded-2xl" />
          <div className="absolute bottom-4 left-4 flex gap-3">
            <button
              className="bg-green-500/90 backdrop-blur-md text-white px-3 py-2 rounded-lg hover:bg-green-600 shadow flex items-center gap-1"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" /> Download
            </button>
            <button
              className="bg-gray-700/80 backdrop-blur-md text-white px-3 py-2 rounded-lg hover:bg-gray-800 shadow flex items-center gap-1"
              onClick={handleCopyImageUrl}
            >
              <Copy className="w-4 h-4" /> Copy URL
            </button>
          </div>
        </div>
      )}

      {/* Generated Images Gallery */}
      <div className="mt-12" ref={galleryRef}>
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Your Generated Images
        </h3>

        {user && loadingImages ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Loading images...</span>
          </div>
        ) : null}

        {(!user && sessionImages.length === 0) || (user && generatedImages.length === 0 && sessionImages.length === 0) ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No images generated yet. Create your first image above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Session images generated on the client (show newest first at top) */}
            {sessionImages.map((url, i) => (
              <div
                key={`session-${i}`}
                className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img src={url} alt={`Session image ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-md shadow">Just generated</div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = `image-session-${i + 1}.png`;
                        link.target = "_blank";
                        link.click();
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(url);
                        toast.success("Image URL copied!");
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">Generated this session</p>
                </div>
              </div>
            ))}

            {/* Saved images from MongoDB (if logged in) */}
            {user && generatedImages.map((img) => (
              <div
                key={img.id}
                className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={img.cloudinary_url}
                    alt={img.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = img.cloudinary_url;
                        link.download = `image-${img.id}.png`;
                        link.target = "_blank";
                        link.click();
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(img.cloudinary_url);
                        toast.success("Image URL copied!");
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteImage(img.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">{img.prompt}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>{img.image_type}</span>
                    <span>{img.width}×{img.height}</span>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{new Date(img.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};