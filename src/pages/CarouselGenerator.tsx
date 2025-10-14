import React, { useState, useEffect } from "react";
import { Loader2, Download, Copy, Cpu, Trash2, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

interface CarouselImage {
  id: string;
  prompt: string;
  image_url: string;
  created_at: string;
}

export const CarouselGenerator: React.FC = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [numImages, setNumImages] = useState(3);
  const [loadingMessage, setLoadingMessage] = useState("Generating your carousel...");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [generatedCarousels, setGeneratedCarousels] = useState<any[]>([]);
  const [loadingCarousels, setLoadingCarousels] = useState(false);

  // Load user's generated carousels
  const loadGeneratedCarousels = async () => {
    if (!user) return;

    setLoadingCarousels(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com'}/api/carousel-generations?user_id=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setGeneratedCarousels(data.items || []);
      }
    } catch (err) {
      console.error('Failed to load carousels:', err);
    } finally {
      setLoadingCarousels(false);
    }
  };

  // Load carousels on component mount
  useEffect(() => {
    loadGeneratedCarousels();
  }, [user]);

  const generateVariations = (basePrompt: string, count: number): string[] => {
    const variations = [basePrompt];
    const modifiers = [
      "in a modern style",
      "with vibrant colors",
      "in a minimalist design",
      "with dramatic lighting",
      "in a vintage aesthetic",
      "with artistic composition",
      "in a futuristic theme",
      "with natural elements",
      "in a professional look",
      "with creative angles"
    ];

    for (let i = 1; i < count; i++) {
      const randomModifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      variations.push(`${basePrompt}, ${randomModifier}`);
    }

    return variations;
  };


  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    if (!user) {
      toast.error("Please log in to generate carousels");
      return;
    }

    setLoading(true);
    setError(null);
    setImages([]);
    setCurrentSlide(0);
    setLoadingMessage("Generating your carousel...");

    try {
      const variations = generateVariations(prompt, numImages);
      const generatedImages: CarouselImage[] = [];

      for (let i = 0; i < variations.length; i++) {
        setLoadingMessage(`Generating image ${i + 1} of ${numImages}...`);

        const response = await fetch(`${import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com'}/api/generate-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.id,
            prompt: variations[i],
            image_type: "Realistic", // Default type
            width: 512,
            height: 512,
            quality: "Medium"
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to generate image ${i + 1}`);
        }

        const data = await response.json();

        generatedImages.push({
          id: `img-${Date.now()}-${i}`,
          prompt: variations[i],
          image_url: data.image_url,
          created_at: new Date().toISOString()
        });
      }

      setImages(generatedImages);
      toast.success("Carousel generated successfully!");

      // Save to database
      await saveCarousel(generatedImages);

      // Refresh the carousels list
      loadGeneratedCarousels();
    } catch (err: any) {
      setError(err.message || "Failed to generate carousel. Check console.");
      toast.error("Carousel generation failed!");
    } finally {
      setLoading(false);
      setLoadingMessage("Generating your carousel...");
    }
  };

  const saveCarousel = async (carouselImages: CarouselImage[]) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com'}/api/carousel-generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user?.id,
          images: carouselImages,
          base_prompt: prompt
        })
      });

      if (!response.ok) {
        console.error('Failed to save carousel');
      }
    } catch (err) {
      console.error('Failed to save carousel:', err);
    }
  };

  const handleDownloadAll = () => {
    images.forEach((img, index) => {
      const link = document.createElement("a");
      link.href = img.image_url;
      link.download = `carousel-image-${index + 1}-${Date.now()}.png`;
      link.target = "_blank";
      link.click();
    });
    toast.success("All images downloaded!");
  };

  const handleCopyAllUrls = () => {
    const urls = images.map(img => img.image_url).join('\n');
    navigator.clipboard.writeText(urls);
    toast.success("All image URLs copied!");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 relative z-20">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-transparent bg-clip-text">
        AI Carousel Generator
      </h2>

      <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-xl rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 overflow-visible relative z-20">
        {/* Prompt */}
        <textarea
          className="w-full p-5 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-teal-400/50 resize-none dark:bg-gray-900/70 dark:text-white transition-all text-lg shadow-sm"
          rows={4}
          placeholder="✨ Describe your carousel theme..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Number of Images */}
        <div className="flex items-center gap-4 justify-center">
          <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Number of Images:
          </label>
          <select
            value={numImages}
            onChange={(e) => setNumImages(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-400"
          >
            {[3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Cpu className="w-6 h-6" />}
            {loading ? "Generating..." : "Generate Carousel"}
          </button>
        </div>

        {error && <div className="text-red-500 text-center font-medium">{error}</div>}
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 space-y-4">
          <div className="animate-spin bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl font-medium">{loadingMessage}</p>
        </div>
      )}

      {/* Carousel Display */}
      {images.length > 0 && (
        <div className="mt-10">
          <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-xl rounded-2xl p-8">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl max-w-2xl mx-auto">
                <img
                  src={images[currentSlide].image_url}
                  alt={`Carousel image ${currentSlide + 1}`}
                  className="w-full h-auto max-h-96 object-contain"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Slide Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentSlide + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex justify-center gap-2 mt-6 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentSlide
                        ? 'border-teal-500 shadow-lg scale-110'
                        : 'border-gray-300 dark:border-gray-600 hover:border-teal-400'
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg hover:scale-105 transition-transform"
                  onClick={handleDownloadAll}
                >
                  <Download className="w-5 h-5" /> Download All
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-800 shadow hover:scale-105 transition-transform"
                  onClick={handleCopyAllUrls}
                >
                  <Copy className="w-5 h-5" /> Copy All URLs
                </button>
              </div>

              {/* Current Image Prompt */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{images[currentSlide].prompt}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Carousels Gallery */}
      {user && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Your Generated Carousels
          </h3>

          {loadingCarousels ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin w-8 h-8 text-teal-500" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">Loading carousels...</span>
            </div>
          ) : generatedCarousels.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No carousels generated yet. Create your first carousel above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedCarousels.map((carousel) => (
                <div
                  key={carousel.id}
                  className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <div className="flex h-full">
                      {carousel.images.slice(0, 3).map((img: any, index: number) => (
                        <div key={index} className="flex-1 relative">
                          <img
                            src={img.image_url}
                            alt={`Carousel ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {index === 2 && carousel.images.length > 3 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">+{carousel.images.length - 3}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                      {carousel.base_prompt}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{carousel.images.length} images</span>
                      <span>{new Date(carousel.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};