'use client';

import React, { useState } from 'react';
import { generateWithGemini } from '../lib/gemini';
import { Search, Target, Hash, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { TextArea } from '../components/UI/Input';
import toast from 'react-hot-toast';
import { generateSEOContent } from '../lib/seotoolkit.ts';

export function SEOToolkit() {
  const [activeTab, setActiveTab] = useState('meta');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [content, setContent] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'meta', label: 'Meta Tags', icon: FileText },
    { id: 'keywords', label: 'Keywords', icon: Hash },
    { id: 'readability', label: 'Readability', icon: BarChart3 },
    { id: 'schema', label: 'Schema', icon: Target }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    switch (activeTab) {
      case 'meta':
        await generateMeta();
        break;
      case 'keywords':
        await analyzeKeywords();
        break;
      case 'readability':
        await analyzeReadability();
        break;
      case 'schema':
        await generateSchema();
        break;
    }
    setLoading(false);
  };

  const generateMeta = () => {
    if (!title) {
      toast.error('Please enter a title');
      setLoading(false);
      return;
    }

    const metaTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
    const metaDesc = description || `Learn about ${title}. Comprehensive guide and insights.`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    setResults({
      type: 'meta',
      title: metaTitle,
      description: metaDesc.length > 160 ? metaDesc.substring(0, 157) + '...' : metaDesc,
      slug,
      preview: {
        title: metaTitle,
        description: metaDesc,
        url: `https://yoursite.com/${slug}`,
      }
    });

    toast.success('Meta tags generated!');
  };

  const analyzeKeywords = async () => {
    if (!title) {
      toast.error('Please enter a topic');
      setLoading(false);
      return;
    }

    try {
      const { keywords } = await generateSEOContent({
        topic: title,
        industry: 'general',
        targetAudience: 'online users'
      });

      setResults({
        type: 'keywords',
        keywords
      });

      toast.success('Keywords generated!');
    } catch (error) {
      toast.error('Error generating keywords.');
      console.error(error);
    }
  };

  const analyzeReadability = async () => {
    if (!title) {
      toast.error('Please enter a topic');
      setLoading(false);
      return;
    }

    try {
      const { readabilityTips } = await generateSEOContent({
        topic: title,
        industry: 'general',
        targetAudience: 'online users'
      });

      setResults({
        type: 'readability',
        readabilityTips
      });

      toast.success('Readability tips generated!');
    } catch (error) {
      toast.error('Error generating readability tips.');
      console.error(error);
    }
  };

  const generateSchema = () => {
    if (!title) {
      toast.error('Please enter a topic');
      setLoading(false);
      return;
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description || `Article about ${title}`,
      "author": {
        "@type": "Person",
        "name": "Your Name"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Your Site Name",
        "logo": {
          "@type": "ImageObject",
          "url": "https://yoursite.com/logo.png"
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
    };

    setResults({
      type: 'schema',
      schema: JSON.stringify(schema, null, 2),
    });

    toast.success('Schema markup generated!');
  };

  const handleGenerate = () => {
    switch (activeTab) {
      case 'meta':
        generateMeta();
        break;
      case 'keywords':
        analyzeKeywords();
        break;
      case 'readability':
        analyzeReadability();
        break;
      case 'schema':
        generateSchema();
        break;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex space-x-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              label="Topic / Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title or topic..."
            />

              <Button
                onClick={handleGenerate}
                className="w-full"
                icon={Search}
              >
                Generate {tabs.find(t => t.id === activeTab)?.label}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Results
              </h2>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  {results.type === 'meta' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Meta Title ({results.title.length}/60)
                        </label>
                        <Input value={results.title} readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Meta Description ({results.description.length}/160)
                        </label>
                        <TextArea value={results.description} readOnly rows={3} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          URL Slug
                        </label>
                        <Input value={results.slug} readOnly />
                      </div>
                      <div className="mt-6">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Search Preview</h3>
                        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                          <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                            {results.preview.title}
                          </div>
                          <div className="text-green-600 text-sm">
                            {results.preview.url}
                          </div>
                          <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                            {results.preview.description}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                {activeTab === 'keywords' && (
                  <TextArea label="Keywords" value={results.keywords?.join(', ') || ''} readOnly rows={3} />
                )}

                {activeTab === 'readability' && (
                  <TextArea label="Readability Tips" value={results.readabilityTips} readOnly rows={4} />
                )}

                {activeTab === 'schema' && (
                  <TextArea label="Schema Markup (JSON-LD)" value={results.schemaMarkup} readOnly rows={10} className="font-mono text-sm" />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
