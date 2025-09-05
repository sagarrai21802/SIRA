import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Search, Tags, Key } from 'lucide-react';
import { generateMetaTags, generateKeywords } from '../lib/seoToolkitFixed';

export default function SEOToolkit() {
  // Meta state
  const [metaPrompt, setMetaPrompt] = useState('');
  const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);
  const [metaResults, setMetaResults] = useState<{ title: string; description: string; slug?: string } | null>(null);
  const [metaError, setMetaError] = useState<string | null>(null);

  // Keywords state
  const [keywordsPrompt, setKeywordsPrompt] = useState('');
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  const [keywordsResults, setKeywordsResults] = useState<string[] | null>(null);
  const [keywordsError, setKeywordsError] = useState<string | null>(null);
  const [keywordType, setKeywordType] = useState<'short' | 'long'>('short');

  // Generate Meta Tags
  const handleGenerateMeta = async () => {
    if (!metaPrompt.trim()) {
      setMetaError('Please enter a prompt to generate meta tags');
      return;
    }
    setIsGeneratingMeta(true);
    setMetaError(null);
    setMetaResults(null);
    try {
      const result = await generateMetaTags({ topic: metaPrompt });
      setMetaResults({
        title: result.metaTitle || '',
        description: result.metaDescription || '',
        slug: result.slug || '',
      });
    } catch (err) {
      setMetaError(err instanceof Error ? err.message : 'Failed to generate meta tags');
    } finally {
      setIsGeneratingMeta(false);
    }
  };

  // Generate Keywords
  const handleGenerateKeywords = async (type: 'short' | 'long') => {
    if (!keywordsPrompt.trim()) {
      setKeywordsError('Please enter a prompt to generate keywords');
      return;
    }
    setIsGeneratingKeywords(true);
    setKeywordsError(null);
    setKeywordsResults(null);

    try {
      const typeInstruction =
        type === 'short'
          ? `Generate 10 short-tail keywords for: ${keywordsPrompt}`
          : `Generate 10 long-tail keywords for: ${keywordsPrompt}`;

      const result = await generateKeywords({ topic: typeInstruction });
      setKeywordsResults(result.keywords || []);
    } catch (err) {
      setKeywordsError(err instanceof Error ? err.message : 'Failed to generate keywords');
    } finally {
      setIsGeneratingKeywords(false);
    }
  };

  // ✅ Fix: Set state first, then run keywords generation with *new type*
  const handleTypeChange = (type: 'short' | 'long') => {
    setKeywordType(type);
    if (keywordsPrompt.trim()) {
      handleGenerateKeywords(type);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Search className="w-10 h-10 text-green-600" /> SEO Toolkit
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Generate <strong>meta tags</strong> and <strong>keywords</strong> for your website with professional formatting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Meta Tags Generator */}
        <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <Tags className="w-6 h-6 text-green-600 dark:text-white" /> Meta Tags Generator
          </h2>

          <div className="space-y-4">
            <Input
              value={metaPrompt}
              onChange={(e) => setMetaPrompt(e.target.value)}
              placeholder="Describe your webpage content..."
              disabled={isGeneratingMeta}
            />
            {metaError && <p className="text-red-600">{metaError}</p>}
            <Button onClick={handleGenerateMeta} disabled={isGeneratingMeta || !metaPrompt.trim()}>
              {isGeneratingMeta ? <><LoadingSpinner size="sm" /> Generating...</> : 'Generate Meta Tags'}
            </Button>

            {metaResults && (
              <div className="mt-6 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Meta Title</h3>
                  <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">{metaResults.title}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Meta Description</h3>
                  <p className="text-gray-800 dark:text-gray-300">{metaResults.description}</p>
                </div>
                {metaResults.slug && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">URL Slug</h3>
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      https://example.com/{metaResults.slug}
                    </p>
                  </div>
                )}
                {/* Google SERP Preview */}
                <div className="border border-gray-300 dark:border-gray-700 rounded p-4 mt-4 bg-white dark:bg-gray-900">
                  <a href="#" className="text-blue-600 dark:text-blue-400 text-lg font-semibold hover:underline">
                    {metaResults.title}
                  </a>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{metaResults.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    https://example.com/{metaResults.slug || ''}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Keywords Generator */}
        <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <Key className="w-6 h-6 text-green-600 dark:text-white" /> Keywords Generator
          </h2>

          {/* Short/Long toggle */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={keywordType === 'long' ? 'default' : 'outline'}
              onClick={() => handleTypeChange('short')}
            >
              Short Tail
            </Button>
            <Button
              variant={keywordType === 'short' ? 'default' : 'outline'}
              onClick={() => handleTypeChange('long')}
            >
              Long Tail
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              value={keywordsPrompt}
              onChange={(e) => setKeywordsPrompt(e.target.value)}
              placeholder={`Describe your webpage content for ${keywordType} tail keywords...`}
              disabled={isGeneratingKeywords}
            />
            {keywordsError && <p className="text-red-600">{keywordsError}</p>}
            <Button onClick={() => handleGenerateKeywords(keywordType)} disabled={isGeneratingKeywords || !keywordsPrompt.trim()}>
              {isGeneratingKeywords ? <><LoadingSpinner size="sm" /> Generating...</> : 'Generate Keywords'}
            </Button>

            {keywordsResults && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200 capitalize">
                  Generated {keywordType} Tail Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {keywordsResults.map((kw, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 rounded-full font-semibold text-sm shadow-sm"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}


// import React, { useState } from 'react';
// import { Card } from '../components/UI/Card';
// import { Button } from '../components/UI/Button';
// import { Input } from '../components/UI/Input';
// import { LoadingSpinner } from '../components/UI/LoadingSpinner';
// import { Search, Tags, Key } from 'lucide-react';
// import { generateMetaTags, generateKeywords } from '../lib/seoToolkitFixed';

// export default function SEOToolkit() {
//   // Meta state
//   const [metaPrompt, setMetaPrompt] = useState('');
//   const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);
//   const [metaResults, setMetaResults] = useState<{ title: string; description: string; slug?: string } | null>(null);
//   const [metaError, setMetaError] = useState<string | null>(null);

//   // Keywords state
//   const [keywordsPrompt, setKeywordsPrompt] = useState('');
//   const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
//   const [keywordsResults, setKeywordsResults] = useState<string[] | null>(null);
//   const [keywordsError, setKeywordsError] = useState<string | null>(null);
//   const [keywordType, setKeywordType] = useState<'short' | 'long'>('short');

//   // Generate Meta Tags
//   const handleGenerateMeta = async () => {
//     if (!metaPrompt.trim()) {
//       setMetaError('⚠️ Please enter a prompt to generate meta tags');
//       return;
//     }
//     setIsGeneratingMeta(true);
//     setMetaError(null);
//     setMetaResults(null);
//     try {
//       const result = await generateMetaTags({ topic: metaPrompt });
//       setMetaResults({
//         title: result.metaTitle || '',
//         description: result.metaDescription || '',
//         slug: result.slug || '',
//       });
//     } catch (err) {
//       setMetaError(err instanceof Error ? err.message : 'Failed to generate meta tags');
//     } finally {
//       setIsGeneratingMeta(false);
//     }
//   };

//   // Generate Keywords
//   const handleGenerateKeywords = async (type: 'short' | 'long') => {
//     if (!keywordsPrompt.trim()) {
//       setKeywordsError('⚠️ Please enter a prompt to generate keywords');
//       return;
//     }
//     setIsGeneratingKeywords(true);
//     setKeywordsError(null);
//     setKeywordsResults(null);

//     try {
//       const typeInstruction =
//         type === 'short'
//           ? `Generate 10 short-tail keywords for: ${keywordsPrompt}`
//           : `Generate 10 long-tail keywords for: ${keywordsPrompt}`;

//       const result = await generateKeywords({ topic: typeInstruction });
//       setKeywordsResults(result.keywords || []);
//     } catch (err) {
//       setKeywordsError(err instanceof Error ? err.message : 'Failed to generate keywords');
//     } finally {
//       setIsGeneratingKeywords(false);
//     }
//   };

//   // ✅ Keep type in sync
//   const handleTypeChange = (type: 'short' | 'long') => {
//     setKeywordType(type);
//     if (keywordsPrompt.trim()) {
//       handleGenerateKeywords(type);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-12">
//       {/* Header */}
//       <div className="text-center space-y-4">
//         <div className="flex items-center justify-center gap-3">
//           <Search className="w-12 h-12 text-green-600" />
//           <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
//             SEO Toolkit
//           </h1>
//         </div>
//         <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
//           Generate professional <strong>Meta Tags</strong> & <strong>Keywords</strong> that boost your website’s visibility.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* Meta Tags Generator */}
//         <Card className="p-8 shadow-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl hover:shadow-2xl transition">
//           <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
//             <Tags className="w-7 h-7 text-green-600" /> Meta Tags Generator
//           </h2>

//           <div className="space-y-5">
//             <Input
//               value={metaPrompt}
//               onChange={(e) => setMetaPrompt(e.target.value)}
//               placeholder="Describe your webpage content..."
//               disabled={isGeneratingMeta}
//               className="rounded-xl"
//             />
//             {metaError && <p className="text-red-600 font-medium">{metaError}</p>}
//             <Button
//               onClick={handleGenerateMeta}
//               disabled={isGeneratingMeta || !metaPrompt.trim()}
//               className="w-full py-3 rounded-xl font-semibold"
//             >
//               {isGeneratingMeta ? (
//                 <>
//                   <LoadingSpinner size="sm" /> <span className="ml-2">Generating...</span>
//                 </>
//               ) : (
//                 '✨ Generate Meta Tags'
//               )}
//             </Button>

//             {metaResults && (
//               <div className="mt-8 space-y-5">
//                 <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl shadow-sm">
//                   <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200">Meta Title</h3>
//                   <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{metaResults.title}</p>
//                 </div>
//                 <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl shadow-sm">
//                   <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200">Meta Description</h3>
//                   <p className="text-gray-800 dark:text-gray-300">{metaResults.description}</p>
//                 </div>
//                 {metaResults.slug && (
//                   <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl shadow-sm">
//                     <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200">URL Slug</h3>
//                     <p className="text-green-600 dark:text-green-400 font-semibold">
//                       https://example.com/{metaResults.slug}
//                     </p>
//                   </div>
//                 )}

//                 {/* Google SERP Preview */}
//                 <div className="border border-gray-300 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-900 shadow-md">
//                   <a href="#" className="text-blue-600 dark:text-blue-400 text-lg font-semibold hover:underline">
//                     {metaResults.title}
//                   </a>
//                   <p className="text-gray-600 dark:text-gray-400 mt-1">{metaResults.description}</p>
//                   <p className="text-sm text-gray-500 mt-1">
//                     https://example.com/{metaResults.slug || ''}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </Card>

//         {/* Keywords Generator */}
//         <Card className="p-8 shadow-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl hover:shadow-2xl transition">
//           <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
//             <Key className="w-7 h-7 text-green-600" /> Keywords Generator
//           </h2>

//           {/* Short/Long toggle */}
//           <div className="flex gap-3 mb-6">
//             <Button
//               variant={keywordType === 'short' ? 'default' : 'outline'}
//               onClick={() => handleTypeChange('short')}
//               className="flex-1 py-2 rounded-lg"
//             >
//               Short Tail
//             </Button>
//             <Button
//               variant={keywordType === 'long' ? 'default' : 'outline'}
//               onClick={() => handleTypeChange('long')}
//               className="flex-1 py-2 rounded-lg"
//             >
//               Long Tail
//             </Button>
//           </div>

//           <div className="space-y-5">
//             <Input
//               value={keywordsPrompt}
//               onChange={(e) => setKeywordsPrompt(e.target.value)}
//               placeholder={`Describe your webpage content for ${keywordType} tail keywords...`}
//               disabled={isGeneratingKeywords}
//               className="rounded-xl"
//             />
//             {keywordsError && <p className="text-red-600 font-medium">{keywordsError}</p>}
//             <Button
//               onClick={() => handleGenerateKeywords(keywordType)}
//               disabled={isGeneratingKeywords || !keywordsPrompt.trim()}
//               className="w-full py-3 rounded-xl font-semibold"
//             >
//               {isGeneratingKeywords ? (
//                 <>
//                   <LoadingSpinner size="sm" /> <span className="ml-2">Generating...</span>
//                 </>
//               ) : (
//                 '🔑 Generate Keywords'
//               )}
//             </Button>

//             {keywordsResults && (
//               <div className="mt-8">
//                 <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200 capitalize">
//                   Generated {keywordType} Tail Keywords
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {keywordsResults.map((kw, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 rounded-full font-medium text-sm shadow-sm"
//                     >
//                       {kw}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }