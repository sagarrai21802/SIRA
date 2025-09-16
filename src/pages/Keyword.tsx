// import React, { useState } from 'react';
// import { Card } from '../components/UI/Card';
// import { Button } from '../components/UI/Button';
// import { Input } from '../components/UI/Input';
// import { LoadingSpinner } from '../components/UI/LoadingSpinner';
// import { Key } from 'lucide-react';
// import { generateKeywords } from '../lib/seoToolkitFixed';

// type KeywordResult = {
//   name: string;
//   avgMonthlySearches: number;
//   competition: string;
// };

// export default function KeywordGenerator() {
//   const [keywordsPrompt, setKeywordsPrompt] = useState('');
//   const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
//   const [keywordsResults, setKeywordsResults] = useState<KeywordResult[] | null>(null);
//   const [keywordsError, setKeywordsError] = useState<string | null>(null);
//   const [keywordType, setKeywordType] = useState<'short' | 'long'>('short');

//   const handleGenerateKeywords = async (type: 'short' | 'long') => {
//     if (!keywordsPrompt.trim()) {
//       setKeywordsError('Please enter a prompt to generate keywords');
//       return;
//     }
//     setIsGeneratingKeywords(true);
//     setKeywordsError(null);
//     setKeywordsResults(null);

//     try {
//       const typeInstruction =
//         type === 'short'
//           ? `Generate 10 short-tail keywords with avg monthly searches and competition for: ${keywordsPrompt}`
//           : `Generate 10 long-tail keywords with avg monthly searches and competition for: ${keywordsPrompt}`;

//       const result = await generateKeywords({ topic: typeInstruction });

//       // Map result into proper structure for table
//       const mappedResults: KeywordResult[] = result.keywords?.map((kw: any) => ({
//         name: typeof kw.keyword === 'string' ? kw.keyword : JSON.stringify(kw.keyword),
//         avgMonthlySearches: typeof kw.avgMonthlySearches === 'number' ? kw.avgMonthlySearches : 0,
//         competition: typeof kw.competition === 'string' ? kw.competition : 'Unknown',
//       })) || [];

//       setKeywordsResults(mappedResults);
//     } catch (err) {
//       setKeywordsError(err instanceof Error ? err.message : 'Failed to generate keywords');
//     } finally {
//       setIsGeneratingKeywords(false);
//     }
//   };

//   const handleTypeChange = (type: 'short' | 'long') => {
//     setKeywordType(type);
//     if (keywordsPrompt.trim()) {
//       handleGenerateKeywords(type);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-6">
//       <h1 className="text-4xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
//         <Key className="w-10 h-10 text-green-600" /> Keyword Generator
//       </h1>

//       <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//         {/* Short/Long Tail Toggle */}
//         <div className="flex gap-2 mb-4">
//           <Button
//             variant={keywordType === 'long' ? 'outline' : 'default'}
//             onClick={() => handleTypeChange('short')}
//           >
//             Short Tail
//           </Button>
//           <Button
//             variant={keywordType === 'short' ? 'outline' : 'default'}
//             onClick={() => handleTypeChange('long')}
//           >
//             Long Tail
//           </Button>
//         </div>

//         {/* Input and Generate Button */}
//         <div className="space-y-4">
//           <Input
//             value={keywordsPrompt}
//             onChange={(e) => setKeywordsPrompt(e.target.value)}
//             placeholder={`Enter topic for ${keywordType} tail keywords...`}
//             disabled={isGeneratingKeywords}
//           />
//           {keywordsError && <p className="text-red-600">{keywordsError}</p>}
//           <Button
//             onClick={() => handleGenerateKeywords(keywordType)}
//             disabled={isGeneratingKeywords || !keywordsPrompt.trim()}
//           >
//             {isGeneratingKeywords ? <><LoadingSpinner size="sm" /> Generating...</> : 'Generate Keywords'}
//           </Button>
//         </div>

//         {/* Keywords Table */}
//         {keywordsResults && keywordsResults.length > 0 && (
//           <div className="mt-6 overflow-x-auto">
//             <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
//               <thead className="bg-gray-100 dark:bg-gray-800">
//                 <tr>
//                   <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Keyword</th>
//                   <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Avg Monthly Searches</th>
//                   <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Competition</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {keywordsResults.map((kw, idx) => (
//                   <tr key={idx} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
//                     <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{kw.name}</td>
//                     <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{kw.avgMonthlySearches}</td>
//                     <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{kw.competition}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { Card } from '../components/UI/Card';
// import { Button } from '../components/UI/Button';
// import { Input } from '../components/UI/Input';
// import { LoadingSpinner } from '../components/UI/LoadingSpinner';
// import { Key } from 'lucide-react';
// import { generateKeywords } from '../lib/seoToolkitFixed';

// type KeywordResult = {
//   name: string;
//   avgMonthlySearches: number;
//   competition: string;
// };

// export default function KeywordGenerator() {
//   const [keywordsPrompt, setKeywordsPrompt] = useState('');
//   const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
//   const [keywordsResults, setKeywordsResults] = useState<KeywordResult[] | null>(null);
//   const [keywordsError, setKeywordsError] = useState<string | null>(null);
//   const [keywordType, setKeywordType] = useState<'short' | 'long'>('short');

//   const handleGenerateKeywords = async (type: 'short' | 'long') => {
//     if (!keywordsPrompt.trim()) {
//       setKeywordsError('Please enter a prompt to generate keywords');
//       return;
//     }
//     setIsGeneratingKeywords(true);
//     setKeywordsError(null);
//     setKeywordsResults(null);

//     try {
//       const typeInstruction =
//         type === 'short'
//           ? `Generate 10 short-tail keywords with avg monthly searches and competition for: ${keywordsPrompt}`
//           : `Generate 10 long-tail keywords with avg monthly searches and competition for: ${keywordsPrompt}`;

//       const result = await generateKeywords({ topic: typeInstruction });

//       // Map result into proper structure for table
//       const mappedResults: KeywordResult[] = result.keywords?.map((kw: any) => ({
//         name: typeof kw.keyword === 'string' ? kw.keyword : JSON.stringify(kw.keyword),
//         avgMonthlySearches: typeof kw.avgMonthlySearches === 'number' ? kw.avgMonthlySearches : 0,
//         competition: typeof kw.competition === 'string' ? kw.competition : 'Unknown',
//       })) || [];

//       setKeywordsResults(mappedResults);
//     } catch (err) {
//       setKeywordsError(err instanceof Error ? err.message : 'Failed to generate keywords');
//     } finally {
//       setIsGeneratingKeywords(false);
//     }
//   };

//   const handleTypeChange = (type: 'short' | 'long') => {
//     setKeywordType(type);
//     if (keywordsPrompt.trim()) {
//       handleGenerateKeywords(type);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-6">
//       <h1 className="text-4xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
//         <Key className="w-10 h-10 text-green-600" /> Keyword Generator
//       </h1>

//       <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//         {/* Short/Long Tail Toggle */}
//         <div className="flex gap-2 mb-4">
//           <Button
//             variant={keywordType === 'long' ? 'outline' : 'default'}
//             onClick={() => handleTypeChange('short')}
//           >
//             Short Tail
//           </Button>
//           <Button
//             variant={keywordType === 'short' ? 'outline' : 'default'}
//             onClick={() => handleTypeChange('long')}
//           >
//             Long Tail
//           </Button>
//         </div>

//         {/* Input and Generate Button */}
//         <div className="space-y-4">
//           <Input
//             value={keywordsPrompt}
//             onChange={(e) => setKeywordsPrompt(e.target.value)}
//             placeholder={`Enter topic for ${keywordType} tail keywords...`}
//             disabled={isGeneratingKeywords}
//           />
//           {keywordsError && <p className="text-red-600">{keywordsError}</p>}
//           <Button
//             onClick={() => handleGenerateKeywords(keywordType)}
//             disabled={isGeneratingKeywords || !keywordsPrompt.trim()}
//           >
//             {isGeneratingKeywords ? <><LoadingSpinner size="sm" /> Generating...</> : 'Generate Keywords'}
//           </Button>
//         </div>

//         {/* Keywords Table */}
//         {keywordsResults && keywordsResults.length > 0 && (
//           <div className="mt-6 overflow-x-auto">
//             <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
//               <thead className="bg-gray-100 dark:bg-gray-800">
//                 <tr>
//                   <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Keyword</th>
//                   <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Avg Monthly Searches</th>
//                   <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Competition</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {keywordsResults.map((kw, idx) => (
//                   <tr key={idx} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
//                     <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{kw.name}</td>
//                     <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{kw.avgMonthlySearches}</td>
//                     <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{kw.competition}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Key } from 'lucide-react';
import { generateKeywords } from '../lib/seoToolkitFixed';

type KeywordResult = {
  name: string;
  avgMonthlySearches: number;
  competition: string;
};

export default function KeywordGenerator() {
  const [keywordsPrompt, setKeywordsPrompt] = useState('');
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  const [keywordsResults, setKeywordsResults] = useState<KeywordResult[] | null>(null);
  const [keywordsError, setKeywordsError] = useState<string | null>(null);
  const [keywordType, setKeywordType] = useState<'short' | 'long'>('short');

  const handleGenerateKeywords = async (type: 'short' | 'long') => {
    if (!keywordsPrompt.trim()) {
      setKeywordsError('⚠️ Please enter a prompt to generate keywords');
      return;
    }
    setIsGeneratingKeywords(true);
    setKeywordsError(null);
    setKeywordsResults(null);

    try {
      const typeInstruction =
        type === 'short'
          ? `Generate 10 short-tail keywords with avg monthly searches and competition for: ${keywordsPrompt}`
          : `Generate 10 long-tail keywords with avg monthly searches and competition for: ${keywordsPrompt}`;

      const result = await generateKeywords({ topic: typeInstruction });

      const mappedResults: KeywordResult[] =
        result.keywords?.map((kw: any) => ({
          name: typeof kw.keyword === 'string' ? kw.keyword : JSON.stringify(kw.keyword),
          avgMonthlySearches: typeof kw.avgMonthlySearches === 'number' ? kw.avgMonthlySearches : 0,
          competition: typeof kw.competition === 'string' ? kw.competition : 'Unknown',
        })) || [];

      setKeywordsResults(mappedResults);
    } catch (err) {
      setKeywordsError(err instanceof Error ? err.message : '❌ Failed to generate keywords');
    } finally {
      setIsGeneratingKeywords(false);
    }
  };

  const handleTypeChange = (type: 'short' | 'long') => {
    setKeywordType(type);
    if (keywordsPrompt.trim()) {
      handleGenerateKeywords(type);
    }
  };

  // Helper to style competition badge
  const getCompetitionBadge = (competition: string) => {
    switch (competition.toLowerCase()) {
      case 'high':
        return <span className="px-2 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">High</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-yellow-400 text-white rounded-full text-sm font-semibold">Medium</span>;
      case 'low':
        return <span className="px-2 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">Low</span>;
      default:
        return <span className="px-2 py-1 bg-gray-400 text-white rounded-full text-sm font-semibold">{competition}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black font-sans">
      <div className="max-w-6xl mx-auto p-10 space-y-10">
        {/* Title */}
        <h1 className="text-6xl font-extrabold tracking-tight mb-8 flex items-center gap-4 text-gray-900 dark:text-white font-serif drop-shadow-lg">
          <Key className="w-14 h-14 text-green-700" /> Keyword Generator
        </h1>

        {/* Card */}
        <Card className="p-10 shadow-2xl rounded-3xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all hover:shadow-green-400/30">
          
          {/* Short/Long Tail Toggle */}
          <div className="flex gap-6 mb-8 justify-center">
            {['short', 'long'].map((type) => (
              <Button
                key={type}
                variant={keywordType === type ? 'default' : 'outline'}
                onClick={() => handleTypeChange(type as 'short' | 'long')}
                className={`px-8 py-3 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                  keywordType === type
                    ? 'bg-green-600 text-white hover:bg-green-700 scale-105 shadow-lg'
                    : 'border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {type === 'short' ? ' Short Tail' : ' Long Tail'}
              </Button>
            ))}
          </div>

          {/* Input and Generate Button */}
          <div className="space-y-6">
            <Input
              value={keywordsPrompt}
              onChange={(e) => setKeywordsPrompt(e.target.value)}
              placeholder={` Enter topic for ${keywordType} tail keywords...`}
              disabled={isGeneratingKeywords}
              className="text-lg rounded-2xl px-5 py-4 border-2 border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-500"
            />
            {keywordsError && <p className="text-red-600 font-semibold">{keywordsError}</p>}
            <Button
              onClick={() => handleGenerateKeywords(keywordType)}
              disabled={isGeneratingKeywords || !keywordsPrompt.trim()}
              className="w-full py-4 text-xl font-bold rounded-2xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-green-400/40 transition-all"
            >
              {isGeneratingKeywords ? (
                <div className="flex items-center gap-3">
                  <LoadingSpinner size="sm" /> Generating...
                </div>
              ) : (
                ' Generate Keywords'
              )}
            </Button>
          </div>

          {/* Keywords Table */}
          {keywordsResults && (
            <div className="mt-10 overflow-x-auto rounded-3xl shadow-xl bg-white dark:bg-gray-900 p-6">
              {keywordsResults.length > 0 ? (
                <table className="min-w-full table-auto border-collapse rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-green-300 to-green-400 dark:from-green-800 dark:to-green-900 text-gray-900 dark:text-white">
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-700 px-6 py-4 text-left font-bold text-lg">Keyword</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-6 py-4 text-left font-bold text-lg">Avg Monthly Searches</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-6 py-4 text-left font-bold text-lg">Competition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywordsResults.map((kw, idx) => (
                      <tr
                        key={idx}
                        className={`transition-all duration-300 cursor-pointer ${
                          idx % 2 === 0
                            ? 'bg-white dark:bg-gray-900 hover:bg-green-50 dark:hover:bg-green-800/40'
                            : 'bg-gray-50 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-700/40'
                        }`}
                      >
                        <td className="border border-gray-300 dark:border-gray-700 px-6 py-4 text-lg font-medium">{kw.name}</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-6 py-4 text-lg">{kw.avgMonthlySearches}</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-6 py-4">{getCompetitionBadge(kw.competition)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 mt-6 italic text-lg text-center">
                  No keywords found. Try another prompt. 🌍
                </p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// *keyword Generator.tsx*