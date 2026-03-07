import { useState } from 'react';
import { motion } from 'framer-motion';
import { humanizeText, HumanizerResult } from '../lib/Humanizer';
import { Button } from '../components/UI/Button';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Sparkles, Copy, Check, AlertTriangle, Lightbulb, ScanLine, FileText, ArrowRight, Loader2 } from 'lucide-react';

export function Humanizer() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<HumanizerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

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
          ? 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-200 rounded px-1 font-medium'
          : 'bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-200 rounded px-1 font-medium'
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-900 dark:to-purple-900/20 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg mb-4"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-3">
            AI to Humanizer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Transform AI-generated text into natural, human-friendly content
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Input Your Text</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Paste AI-generated content to humanize</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4 flex items-start gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 dark:text-red-200 font-medium text-sm">{error}</p>
                </motion.div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <ScanLine className="w-4 h-4" />
                  Your Text (minimum 50 characters)
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your AI text here..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-purple-400/50 focus:border-purple-500 resize-none transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
                  rows={5}
                />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{input.length} characters</span>
                  <span className={input.length < 50 ? 'text-red-500' : 'text-green-500'}>
                    {input.length < 50 ? 'Minimum 50 characters required' : 'Ready to humanize'}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleHumanize}
                disabled={loading || input.length < 50}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="animate-spin w-5 h-5" /> Processing...</>
                ) : (
                  <><Sparkles className="w-5 h-5" /> Humanize Text</>
                )}
              </motion.button>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 space-y-6"
                >
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 relative">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-purple-500" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Humanized Output</h3>
                    </div>
                    <p className="whitespace-pre-line text-gray-800 dark:text-gray-200 leading-relaxed">{result.humanizedText}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopy}
                      className="absolute top-4 right-4 flex items-center gap-2 bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-600 px-3 py-2 rounded-lg shadow-sm transition-all text-sm font-medium"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </motion.button>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">Suggestions</h4>
                    </div>
                    <ul className="space-y-2">
                      {result.suggestions.map((tip, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                        >
                          <ArrowRight className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                          <span>{tip}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <ScanLine className="w-5 h-5 text-blue-500" />
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">AI Comparison</h4>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold">
                        AI Detection Score: {getAIDetectionScore(input, result.humanizedText)}%
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                        <h5 className="font-semibold mb-2 text-red-800 dark:text-red-300 flex items-center gap-2">
                          <FileText className="w-4 h-4" /> Original
                        </h5>
                        <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{highlightDiff(input, result.humanizedText, true)}</p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                        <h5 className="font-semibold mb-2 text-green-800 dark:text-green-300 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> Humanized
                        </h5>
                        <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{highlightDiff(result.humanizedText, input, false)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">Highlighted text shows changes between versions</p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
