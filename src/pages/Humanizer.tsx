import { useState, useEffect } from 'react';
import { humanizeText, HumanizerResult, checkUserCredits, UserCredits } from '../lib/Humanizer';
import { Button } from '../components/UI/Button';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { motion } from 'framer-motion';

export function Humanizer() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<HumanizerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const userCredits = await checkUserCredits();
      setCredits(userCredits);
    } catch (err) {
      console.error('Failed to fetch credits:', err);
      // Don't show error to user, just fail silently for credits
      // The humanizer will still work, just won't show credit count
    }
  };

  const handleHumanize = async () => {
    if (!input.trim()) {
      setError('Please enter some text to humanize');
      return;
    }
    
    if (input.length < 50) {
      setError('Text must be at least 50 characters long');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const res = await humanizeText({ text: input });
      setResult(res);
      // Refresh credits after successful humanization
      await fetchCredits();
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to humanize text. Try again later.';
      setError(errorMessage);
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
    return ((diff / origWords.length) * 100).toFixed(1);
  };

  const highlightDiff = (original: string, comparison: string, isOriginal = true) => {
    const origWords = original.split(' ');
    const compWords = comparison.split(' ');
    return origWords.map((word, idx) => {
      const different = compWords[idx] !== word;
      const className = different
        ? isOriginal
          ? 'bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-200 rounded px-1'
          : 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 rounded px-1'
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
    <div className="max-w-4xl mx-auto p-6 space-y-6 dark:bg-gray-900 dark:text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">AI to Humanizer</h2>
              {credits && credits.credits !== undefined && (
                <div className="bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-lg">
                  <p className="text-sm font-semibold text-purple-800 dark:text-purple-200">
                    Credits: {credits.credits?.toLocaleString() ?? '0'}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-300">
                    Base: {credits.baseCredits?.toLocaleString() ?? '0'} | Boost: {credits.boostCredits?.toLocaleString() ?? '0'}
                  </p>
                </div>
              )}
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Transform AI text into natural, human-friendly content ✨</p>
          </CardHeader>
          <CardContent className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl p-4"
              >
                <p className="text-red-800 dark:text-red-200 font-medium">⚠️ {error}</p>
                {error.includes('Insufficient credits') && (
                  <a
                    href="https://undetectable.ai/developer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 dark:text-red-400 underline text-sm mt-2 inline-block hover:text-red-700 dark:hover:text-red-300"
                  >
                    Top up your credits here →
                  </a>
                )}
              </motion.div>
            )}
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Text (minimum 50 characters)
                </label>
                <span className={`text-sm ${input.length < 50 ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                  {input.length} / 50 characters
                </span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your AI text here..."
                className="w-full p-5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100"
                rows={5}
              />

            </div>

            <Button
              onClick={handleHumanize}
              disabled={loading || input.length < 50}
              className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing... (This may take up to 60 seconds)
                </span>
              ) : (
                'Humanize Text'
              )}
            </Button>

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 space-y-6"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl relative">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">✨ Humanized Output</h3>
                  <p className="whitespace-pre-line text-gray-800 dark:text-gray-200">{result.humanizedText}</p>
                  <Button
                    onClick={handleCopy}
                    className="absolute top-4 right-4 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white py-1 px-3 rounded-md text-sm transition-all duration-200"
                  >
                    Copy
                  </Button>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl p-6">
                  <h4 className="text-lg font-semibold mb-3">💡 Suggestions</h4>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 space-y-1">
                    {result.suggestions.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl p-6 space-y-4">
                  <h4 className="text-lg font-semibold mb-2">🔍 AI Comparison</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    AI Detection Score: <strong>{getAIDetectionScore(input, result.humanizedText)}%</strong>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border dark:border-gray-600 overflow-auto max-h-60">
                      <h5 className="font-semibold mb-2">Original</h5>
                      <p className="whitespace-pre-wrap">{highlightDiff(input, result.humanizedText, true)}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border dark:border-gray-600 overflow-auto max-h-60">
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