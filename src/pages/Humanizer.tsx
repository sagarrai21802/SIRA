// import React, { useState } from 'react';
// import { humanizeText, HumanizerResult } from '../lib/Humanizer';
// import { Button } from '../components/UI/Button';
// import { Card, CardContent, CardHeader } from '../components/UI/Card';
// import { motion } from 'framer-motion';

// export function Humanizer() {
//   const [input, setInput] = useState('');
//   const [result, setResult] = useState<HumanizerResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleHumanize = async () => {
//     if (!input.trim()) return;
//     setLoading(true);
//     try {
//       const res = await humanizeText({ text: input });
//       setResult(res);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to humanize text. Try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getAIDetectionScore = (original: string, humanized: string) => {
//     let diff = 0;
//     const origWords = original.split(' ');
//     const humWords = humanized.split(' ');
//     const len = Math.min(origWords.length, humWords.length);
//     for (let i = 0; i < len; i++) {
//       if (origWords[i] !== humWords[i]) diff++;
//     }
//     const score = ((diff / origWords.length) * 100).toFixed(1);
//     return score;
//   };

//   // Function to highlight differences
//   const highlightDiff = (original: string, comparison: string, isOriginal = true) => {
//     const origWords = original.split(' ');
//     const compWords = comparison.split(' ');
//     return origWords.map((word, idx) => {
//       const different = compWords[idx] !== word;
//       const className = different
//         ? isOriginal
//           ? 'bg-red-200 text-red-800 rounded px-1'
//           : 'bg-green-200 text-green-800 rounded px-1'
//         : '';
//       return (
//         <span key={idx} className={className}>
//           {word + ' '}
//         </span>
//       );
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Card className="bg-gradient-to-r from-purple-50 to-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl">
//           <CardHeader className="text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">AI to Humanizer</h2>
//             <p className="text-gray-500 mt-1">Transform AI text into natural, human-friendly content ✨</p>
//           </CardHeader>
//           <CardContent className="space-y-5">
//             <textarea
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Paste your AI text here..."
//               className="w-full p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300 hover:border-purple-400 text-gray-700"
//               rows={5}
//             />

//             <Button
//               onClick={handleHumanize}
//               disabled={loading}
//               className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
//             >
//               {loading ? 'Humanizing...' : 'Humanize Text'}
//             </Button>

//             {result && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="mt-6 space-y-6"
//               >
//                 {/* Humanized Output Card */}
//                 <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl">
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">✨ Humanized Output</h3>
//                   <p className="whitespace-pre-line text-gray-800">{result.humanizedText}</p>
//                 </div>

//                 {/* Suggestions Card */}
//                 <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6">
//                   <h4 className="text-lg font-semibold mb-3">💡 Suggestions</h4>
//                   <ul className="list-disc pl-5 text-gray-700 space-y-1">
//                     {result.suggestions.map((tip, i) => (
//                       <li key={i}>{tip}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Simple Comparison */}
//                 <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 space-y-4">
//                   <h4 className="text-lg font-semibold mb-2">🔍 AI Comparison</h4>
//                   <p className="text-sm text-gray-600 mb-2">
//                     AI Detection Score: <strong>{getAIDetectionScore(input, result.humanizedText)}%</strong>
//                   </p>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="p-4 bg-gray-50 rounded-xl border overflow-auto max-h-60">
//                       <h5 className="font-semibold mb-2">Original</h5>
//                       <p className="whitespace-pre-wrap">{highlightDiff(input, result.humanizedText, true)}</p>
//                     </div>
//                     <div className="p-4 bg-gray-50 rounded-xl border overflow-auto max-h-60">
//                       <h5 className="font-semibold mb-2">Humanized</h5>
//                       <p className="whitespace-pre-wrap">{highlightDiff(result.humanizedText, input, false)}</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { humanizeText, HumanizerResult } from '../lib/Humanizer';
import { Button } from '../components/UI/Button';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { motion } from 'framer-motion';

export function Humanizer() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<HumanizerResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleHumanize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await humanizeText({ text: input });
      setResult(res);
    } catch (err) {
      console.error(err);
      alert('Failed to humanize text. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getAIDetectionScore = (original: string, humanized: string) => {
    let diff = 0;
    const origWords = original.split(' ');
    const humWords = humanized.split(' ');
    const len = Math.min(origWords.length, humWords.length);
    for (let i = 0; i < len; i++) {
      if (origWords[i] !== humWords[i]) diff++;
    }
    const score = ((diff / origWords.length) * 100).toFixed(1);
    return score;
  };

  // Function to highlight differences
  const highlightDiff = (original: string, comparison: string, isOriginal = true) => {
    const origWords = original.split(' ');
    const compWords = comparison.split(' ');
    return origWords.map((word, idx) => {
      const different = compWords[idx] !== word;
      const className = different
        ? isOriginal
          ? 'bg-red-200 text-red-800 rounded px-1'
          : 'bg-green-200 text-green-800 rounded px-1'
        : '';
      return (
        <span key={idx} className={className}>
          {word + ' '}
        </span>
      );
    });
  };

  const handleCopy = () => {
    if (result?.humanizedText) {
      navigator.clipboard.writeText(result.humanizedText);
      alert('Humanized text copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl">
          <CardHeader className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">AI to Humanizer</h2>
            <p className="text-gray-500 mt-1">Transform AI text into natural, human-friendly content ✨</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your AI text here..."
              className="w-full p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300 hover:border-purple-400 text-gray-700"
              rows={5}
            />

            <Button
              onClick={handleHumanize}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {loading ? 'Humanizing...' : 'Humanize Text'}
            </Button>

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 space-y-6"
              >
                {/* Humanized Output Card */}
                <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">✨ Humanized Output</h3>
                  <p className="whitespace-pre-line text-gray-800">{result.humanizedText}</p>
                  <Button
                    onClick={handleCopy}
                    className="absolute top-4 right-4 bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-md text-sm transition-all duration-200"
                  >
                    Copy
                  </Button>
                </div>

                {/* Suggestions Card */}
                <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6">
                  <h4 className="text-lg font-semibold mb-3">💡 Suggestions</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {result.suggestions.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Simple Comparison */}
                <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 space-y-4">
                  <h4 className="text-lg font-semibold mb-2">🔍 AI Comparison</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    AI Detection Score: <strong>{getAIDetectionScore(input, result.humanizedText)}%</strong>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border overflow-auto max-h-60">
                      <h5 className="font-semibold mb-2">Original</h5>
                      <p className="whitespace-pre-wrap">{highlightDiff(input, result.humanizedText, true)}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border overflow-auto max-h-60">
                      <h5 className="font-semibold mb-2">Humanized</h5>
                      <p className="whitespace-pre-wrap">{highlightDiff(result.humanizedText, input, false)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}