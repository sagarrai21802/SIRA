import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Search, Tags, Key, Globe, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { generateMetaTags, generateKeywords } from '../lib/seoToolkitFixed';

export default function SEOToolkit() {
  const [metaPrompt, setMetaPrompt] = useState('');
  const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);
  const [metaResults, setMetaResults] = useState<{ title: string; description: string; slug?: string } | null>(null);
  const [metaError, setMetaError] = useState<string | null>(null);

  const [keywordsPrompt, setKeywordsPrompt] = useState('');
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  const [keywordsResults, setKeywordsResults] = useState<string[] | null>(null);
  const [keywordsError, setKeywordsError] = useState<string | null>(null);
  const [keywordType, setKeywordType] = useState<'short' | 'long'>('short');

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

  const handleTypeChange = (type: 'short' | 'long') => {
    setKeywordType(type);
    if (keywordsPrompt.trim()) {
      handleGenerateKeywords(type);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
      <div className="max-w-5xl mx-auto">
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-lg mb-4"
          >
            <Search className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 text-transparent bg-clip-text mb-3">
            SEO Toolkit
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Generate <strong>meta tags</strong> and <strong>keywords</strong> for your website with professional formatting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Tags className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold dark:text-white">Meta Tags Generator</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Create SEO-optimized meta tags</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={metaPrompt}
                    onChange={(e) => setMetaPrompt(e.target.value)}
                    placeholder="Describe your webpage content..."
                    disabled={isGeneratingMeta}
                    className="pl-10"
                  />
                </div>
                
                {metaError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 p-3 rounded-lg text-sm"
                  >
                    {metaError}
                  </motion.div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateMeta}
                  disabled={isGeneratingMeta || !metaPrompt.trim()}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingMeta ? (
                    <><LoadingSpinner size="sm" /> Generating...</>
                  ) : (
                    <><Zap className="w-5 h-5" /> Generate Meta Tags</>
                  )}
                </motion.button>

                {metaResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 space-y-4"
                  >
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">Meta Title</h3>
                      <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">{metaResults.title}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">Meta Description</h3>
                      <p className="text-gray-800 dark:text-gray-200">{metaResults.description}</p>
                    </div>
                    
                    {metaResults.slug && (
                      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">URL Slug</h3>
                        <p className="text-green-600 dark:text-green-400 font-medium">
                          https://example.com/{metaResults.slug}
                        </p>
                      </div>
                    )}
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 mt-4 bg-white dark:bg-gray-900 shadow-md">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Google SERP Preview</h3>
                      <a href="#" className="text-blue-600 dark:text-blue-400 text-lg font-semibold hover:underline block mb-1">
                        {metaResults.title}
                      </a>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{metaResults.description}</p>
                      <p className="text-sm text-green-600 mt-1">
                        https://example.com/{metaResults.slug || ''}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold dark:text-white">Keywords Generator</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Discover high-value keywords</p>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTypeChange('short')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    keywordType === 'short'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Short Tail
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTypeChange('long')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    keywordType === 'long'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Long Tail
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={keywordsPrompt}
                    onChange={(e) => setKeywordsPrompt(e.target.value)}
                    placeholder={`Describe your webpage content for ${keywordType} tail keywords...`}
                    disabled={isGeneratingKeywords}
                    className="pl-10"
                  />
                </div>
                
                {keywordsError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 p-3 rounded-lg text-sm"
                  >
                    {keywordsError}
                  </motion.div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGenerateKeywords(keywordType)}
                  disabled={isGeneratingKeywords || !keywordsPrompt.trim()}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingKeywords ? (
                    <><LoadingSpinner size="sm" /> Generating...</>
                  ) : (
                    <><ArrowRight className="w-5 h-5" /> Generate Keywords</>
                  )}
                </motion.button>

                {keywordsResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6"
                  >
                    <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200 capitalize flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Generated {keywordType} Tail Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {keywordsResults.map((kw, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/40 dark:to-teal-900/40 text-green-800 dark:text-green-300 px-4 py-2 rounded-full font-semibold text-sm shadow-sm hover:shadow-md transition-shadow cursor-default"
                        >
                          {kw}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
