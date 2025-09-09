import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Tags } from 'lucide-react';
import { generateMetaTags } from '../lib/seoToolkitFixed';

export default function MetaTags() {
  const [metaPrompt, setMetaPrompt] = useState('');
  const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);
  const [metaResults, setMetaResults] = useState<{ title: string; description: string; slug?: string } | null>(null);
  const [metaError, setMetaError] = useState<string | null>(null);

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

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
        <Tags className="w-10 h-10 text-green-600" /> Meta Tags Generator
      </h1>

      <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-700">
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
    </div>
  );
}
