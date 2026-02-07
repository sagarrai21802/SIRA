import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, Download, Copy, Cpu, Trash2, Image as ImageIcon, Edit, Sparkles, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ModernDropdown } from "../components/UI/ModernDropdown";
import { useAuth } from "../hooks/useAuth";
import { generateTemplateImage } from "../lib/templateImage";
import { API_BASE, API_ENDPOINTS } from "../lib/api";

const IMAGE_TYPES = ["Realistic", "Cartoon", "3D", "Anime", "Pixel Art"];
const IMAGE_SIZES = [
  { label: "1080x1080", width: 1080, height: 1080 },
  { label: "Instagram Post 4:5", width: 1080, height: 1350 },
  { label: "LinkedIn Post 1:1", width: 1200, height: 1200 },
  { label: "LinkedIn Background Cover 4:1", width: 1584, height: 396 },
  { label: "Banner 1000x500", width: 1000, height: 500 },
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
  const navigate = useNavigate();
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
    setLoadingMessage(user ? "Generating image on server..." : "Initializing AI engine...");

    try {
      if (user) {
        const response = await fetch(`${API_BASE}${API_ENDPOINTS.GENERATE_IMAGE}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            prompt,
            image_type: type,
            width: size.width,
            height: size.height,
            quality
          })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate image');
        }
        setImage(data.image_url);
        loadGeneratedImages();
      } else {
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
        setSessionImages((prev) => [imgUrl, ...prev]);
        clearInterval(msgInterval);
      }
      setTimeout(() => {
        galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      toast.success("Image generated!");
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

  const handleEditImage = () => {
    if (!image) return;
    navigate('/studio', { state: { imageUrl: image } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
      <div className="max-w-5xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-4"
            >
              <Wand2 className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-3">
              AI Image Generator
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Transform your ideas into stunning visuals with AI-powered image generation
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 overflow-visible relative z-20"
        >
          <div className="relative">
            <Sparkles className="absolute left-4 top-4 w-5 h-5 text-purple-500" />
            <textarea
              className="w-full p-5 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 resize-none dark:bg-gray-900/70 dark:text-white transition-all text-lg shadow-sm"
              rows={4}
              placeholder="Describe your creative vision..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center relative z-50">
            <ModernDropdown label="Style" options={IMAGE_TYPES} selected={type} onChange={setType} />
            <ModernDropdown label="Size" options={IMAGE_SIZES} selected={size} onChange={setSize} displayKey="label" />
            <ModernDropdown label="Quality" options={IMAGE_QUALITY} selected={quality} onChange={setQuality} />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Cpu className="w-5 h-5" />}
              {loading ? "Generating..." : "Generate Image"}
            </motion.button>

            {image && (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 shadow hover:shadow-md transition-all"
                  onClick={handleCopyPrompt}
                >
                  <Copy className="w-4 h-4" /> Copy Prompt
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow hover:shadow-md transition-all"
                  onClick={handleEditImage}
                >
                  <Edit className="w-4 h-4" /> Edit in Studio
                </motion.button>
              </>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-center font-medium bg-red-50 dark:bg-red-900/20 p-4 rounded-xl"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 space-y-4"
          >
            <div className="relative">
              <div className="animate-spin bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/50 scale-125"
              />
            </div>
            <p className="text-lg font-medium">{loadingMessage}</p>
          </motion.div>
        )}

        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-10 relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-4 border-white dark:border-gray-700"
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              aspectRatio: `${size.width} / ${size.height}`,
            }}
          >
            <img src={image} alt="Generated" className="w-full h-full object-contain rounded-2xl" />
            <div className="absolute bottom-4 left-4 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600/90 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-green-700 shadow-lg flex items-center gap-2 transition-colors"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" /> Download
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-700/80 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-gray-800 shadow-lg flex items-center gap-2 transition-colors"
                onClick={handleCopyImageUrl}
              >
                <Copy className="w-4 h-4" /> Copy URL
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600/90 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-purple-700 shadow-lg flex items-center gap-2 transition-colors"
                onClick={handleEditImage}
              >
                <Edit className="w-4 h-4" /> Edit
              </motion.button>
            </div>
          </motion.div>
        )}

        <div className="mt-16" ref={galleryRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Your Generated Images
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse through your creative collection
            </p>
          </motion.div>

          {user && loadingImages ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
              <span className="ml-3 text-gray-600 dark:text-gray-300 text-lg">Loading images...</span>
            </div>
          ) : null}

          {(!user && sessionImages.length === 0) || (user && generatedImages.length === 0 && sessionImages.length === 0) ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300 dark:border-gray-600"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 mb-4">
                <ImageIcon className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">No images generated yet.</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Create your first masterpiece above!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sessionImages.map((url, i) => (
                <motion.div
                  key={`session-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img src={url} alt={`Session image ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-md font-medium">Just generated</div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = url;
                          link.download = `image-session-${i + 1}.png`;
                          link.target = "_blank";
                          link.click();
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          navigator.clipboard.writeText(url);
                          toast.success("Image URL copied!");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/studio', { state: { imageUrl: url } })}
                        className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                        title="Edit in Studio"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">Generated this session</p>
                  </div>
                </motion.div>
              ))}

              {user && generatedImages.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (sessionImages.length + i) * 0.1 }}
                  className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={img.cloudinary_url}
                      alt={img.prompt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = img.cloudinary_url;
                          link.download = `image-${img.id}.png`;
                          link.target = "_blank";
                          link.click();
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          navigator.clipboard.writeText(img.cloudinary_url);
                          toast.success("Image URL copied!");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/studio', { state: { imageUrl: img.cloudinary_url } })}
                        className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                        title="Edit in Studio"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteImage(img.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">{img.prompt}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{img.image_type}</span>
                      <span>{img.width}×{img.height}</span>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{new Date(img.created_at).toLocaleDateString()}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
