// import React, { useState } from 'react';
// import { Image, Sparkles, Download, RefreshCw } from 'lucide-react';
// import { Card, CardContent, CardHeader } from '../components/UI/Card';
// import { Button } from '../components/UI/Button';
// import { Input } from '../components/UI/Input';
// import { TextArea } from '../components/UI/Input';
// import { useAuth } from '../hooks/useAuth';
// import { supabase } from '../lib/supabase';
// import toast from 'react-hot-toast';

// export function ImageGenerator() {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [prompt, setPrompt] = useState('');
//   const [style, setStyle] = useState('realistic');
//   const [size, setSize] = useState('1024x1024');
//   const [generatedImages, setGeneratedImages] = useState<string[]>([]);
//   const [dailyCount, setDailyCount] = useState(0);

//   const styles = [
//     { value: 'realistic', label: 'Realistic' },
//     { value: 'artistic', label: 'Artistic' },
//     { value: 'cartoon', label: 'Cartoon' },
//     { value: 'abstract', label: 'Abstract' },
//     { value: 'minimalist', label: 'Minimalist' },
//   ];

//   const sizes = [
//     { value: '1024x1024', label: 'Square (1024x1024)' },
//     { value: '1792x1024', label: 'Landscape (1792x1024)' },
//     { value: '1024x1792', label: 'Portrait (1024x1792)' },
//   ];

//   React.useEffect(() => {
//     if (user) {
//       checkDailyQuota();
//     }
//   }, [user]);

//   const checkDailyQuota = async () => {
//     if (!user) return;

//     try {
//       const today = new Date().toISOString().split('T')[0];
//       const { count, error } = await supabase
//         .from('image_generations')
//         .select('*', { count: 'exact', head: true })
//         .eq('user_id', user.id)
//         .gte('created_at', today + 'T00:00:00.000Z')
//         .lt('created_at', today + 'T23:59:59.999Z');

//       if (error) {
//         console.error('Error checking daily quota:', error);
//       }

//       setDailyCount(count || 0);
//     } catch (error) {
//       console.error('Error checking daily quota:', error);
//       setDailyCount(0);
//     }
//   };

//   const generateImage = async () => {
//     if (!prompt.trim()) {
//       toast.error('Please enter a prompt');
//       return;
//     }

//     if (dailyCount >= 5) {
//       toast.error('Daily limit reached! Upgrade to generate more images.');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Simulate image generation with sample images from Pexels
//       const sampleImages = [
//         'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
//         'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
//         'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
//         'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
//       ];

//       const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      
//       setGeneratedImages([randomImage]);

//       // Save to database
//       if (user) {
//         const { error } = await supabase.from('image_generations').insert({
//           user_id: user.id,
//           prompt,
//           image_url: randomImage,
//         });

//         if (error) {
//           console.error('Error saving image generation:', error);
//           toast.error('Image generated but failed to save to database');
//         } else {
//           setDailyCount(prev => prev + 1);
//         }
//       }

//       toast.success('Image generated successfully!');
//     } catch (error) {
//       console.error('Error generating image:', error);
//       toast.error('Failed to generate image');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadImage = (imageUrl: string) => {
//     const link = document.createElement('a');
//     link.href = imageUrl;
//     link.download = `generated-image-${Date.now()}.jpg`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     toast.success('Image downloaded!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Image Generator
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Create stunning visuals and graphics using AI-powered image generation.
//           </p>
//           <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
//             <p className="text-sm text-blue-600 dark:text-blue-400">
//               Daily quota: {dailyCount}/5 images used • Upgrade for unlimited generations
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Input Form */}
//           <Card>
//             <CardHeader>
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
//                 <Image className="w-5 h-5 mr-2" />
//                 Image Settings
//               </h2>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <TextArea
//                 label="Image Prompt"
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 placeholder="Describe the image you want to generate..."
//                 rows={4}
//               />

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Style
//                 </label>
//                 <select
//                   value={style}
//                   onChange={(e) => setStyle(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {styles.map(styleOption => (
//                     <option key={styleOption.value} value={styleOption.value}>
//                       {styleOption.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Size
//                 </label>
//                 <select
//                   value={size}
//                   onChange={(e) => setSize(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {sizes.map(sizeOption => (
//                     <option key={sizeOption.value} value={sizeOption.value}>
//                       {sizeOption.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <Button
//                 onClick={generateImage}
//                 loading={loading}
//                 className="w-full"
//                 icon={Sparkles}
//                 disabled={dailyCount >= 5}
//               >
//                 {dailyCount >= 5 ? 'Daily Limit Reached' : 'Generate Image'}
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Generated Images */}
//           <Card>
//             <CardHeader>
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Generated Images
//               </h2>
//             </CardHeader>
//             <CardContent>
//               {generatedImages.length > 0 ? (
//                 <div className="space-y-4">
//                   {generatedImages.map((imageUrl, index) => (
//                     <div key={index} className="relative group">
//                       <img
//                         src={imageUrl}
//                         alt={`Generated image ${index + 1}`}
//                         className="w-full h-64 object-cover rounded-lg"
//                       />
//                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
//                         <Button
//                           variant="secondary"
//                           icon={Download}
//                           onClick={() => downloadImage(imageUrl)}
//                           className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                         >
//                           Download
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 text-gray-500 dark:text-gray-400">
//                   <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                   <p>Generated images will appear here</p>
//                   <p className="text-sm mt-2">Fill out the form and click "Generate Image" to get started</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Image, Sparkles, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { TextArea } from '../components/UI/Input';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { enhancePrompt } from '../lib/gemini';

export function ImageGenerator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState('1024x1024');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [dailyCount, setDailyCount] = useState(0);

  const styles = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'minimalist', label: 'Minimalist' },
  ];

  const sizes = [
    { value: '1024x1024', label: 'Square (1024x1024)' },
    { value: '1792x1024', label: 'Landscape (1792x1024)' },
    { value: '1024x1792', label: 'Portrait (1024x1792)' },
  ];

  React.useEffect(() => {
    if (user) {
      checkDailyQuota();
    }
  }, [user]);

  const checkDailyQuota = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const { count, error } = await supabase
        .from('image_generations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', today + 'T00:00:00.000Z')
        .lt('created_at', today + 'T23:59:59.999Z');

      if (error) {
        console.error('Error checking daily quota:', error);
      }

      setDailyCount(count || 0);
    } catch (error) {
      console.error('Error checking daily quota:', error);
      setDailyCount(0);
    }
  };

 const generateImage = async () => {
  if (!prompt.trim()) {
    toast.error('Please enter a prompt');
    return;
  }

  if (dailyCount >= 5) {
    toast.error('Daily limit reached! Upgrade to generate more images.');
    return;
  }

  setLoading(true);

  try {
    const enhancedPrompt = await enhancePrompt(prompt); // Optional: make prompt better using Gemini

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        n: 1,
        size: size, // '1024x1024', etc.
      }),
    });

    const data = await response.json();

    if (!data.data || !data.data[0]) {
      throw new Error('No image returned');
    }

    const imageUrl = data.data[0].url;
    setGeneratedImages([imageUrl]);

    // Save to Supabase if logged in
    if (user) {
      const { error } = await supabase.from('image_generations').insert({
        user_id: user.id,
        prompt,
        image_url: imageUrl,
      });

      if (error) {
        console.error('Error saving image:', error);
        toast.error('Image generated but failed to save.');
      } else {
        setDailyCount(prev => prev + 1);
      }
    }

    toast.success('Image generated!');
  } catch (error) {
    console.error('Image generation error:', error);
    toast.error('Failed to generate image');
  } finally {
    setLoading(false);
  }
};

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Image Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create stunning visuals and graphics using AI-powered image generation.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Daily quota: {dailyCount}/5 images used • Upgrade for unlimited generations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Image className="w-5 h-5 mr-2" />
                Image Settings
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <TextArea
                label="Image Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                rows={4}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {styles.map(styleOption => (
                    <option key={styleOption.value} value={styleOption.value}>
                      {styleOption.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {sizes.map(sizeOption => (
                    <option key={sizeOption.value} value={sizeOption.value}>
                      {sizeOption.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={generateImage}
                loading={loading}
                className="w-full"
                icon={Sparkles}
                disabled={dailyCount >= 5}
              >
                {dailyCount >= 5 ? 'Daily Limit Reached' : 'Generate Image'}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Images */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generated Images
              </h2>
            </CardHeader>
            <CardContent>
              {generatedImages.length > 0 ? (
                <div className="space-y-4">
                  {generatedImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <Button
                          variant="secondary"
                          icon={Download}
                          onClick={() => downloadImage(imageUrl)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Generated images will appear here</p>
                  <p className="text-sm mt-2">Fill out the form and click "Generate Image" to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}