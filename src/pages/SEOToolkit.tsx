'use client';

import React, { useState } from 'react';
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

  const generateMeta = async () => {
    if (!title) {
      toast.error('Please enter a title');
      setLoading(false);
      return;
    }

    try {
      const { metaTitle, metaDescription, slug } = await generateSEOContent({
        topic: title,
        industry: 'general',
        targetAudience: 'online users'
      });

      setResults({
        type: 'meta',
        metaTitle,
        metaDescription,
        slug,
        preview: {
          title: metaTitle,
          description: metaDescription,
          url: `https://yoursite.com/${slug}`
        }
      });

      toast.success('Meta tags generated!');
    } catch (error) {
      toast.error('Error generating meta tags.');
      console.error(error);
    }
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

  const generateSchema = async () => {
    if (!title) {
      toast.error('Please enter a topic');
      setLoading(false);
      return;
    }

    try {
      const { schemaMarkup } = await generateSEOContent({
        topic: title,
        industry: 'general',
        targetAudience: 'online users'
      });

      setResults({
        type: 'schema',
        schemaMarkup
      });

      toast.success('Schema markup generated!');
    } catch (error) {
      toast.error('Error generating schema markup.');
      console.error(error);
    }
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
              disabled={loading}
            >
              {loading ? 'Generating...' : `Generate ${tabs.find(t => t.id === activeTab)?.label}`}
            </Button>

            {results?.type === activeTab && (
              <div className="space-y-4">
                {activeTab === 'meta' && (
                  <>
                    <Input label="Meta Title" value={results.metaTitle} readOnly />
                    <TextArea label="Meta Description" value={results.metaDescription} readOnly rows={3} />
                    <Input label="URL Slug" value={results.slug} readOnly />
                    <div className="border rounded-lg p-4 text-sm bg-white dark:bg-gray-800">
                      <div className="text-blue-600 mb-1">{results.preview?.url}</div>
                      <div className="font-medium text-black dark:text-white">{results.preview?.title}</div>
                      <div className="text-gray-700 dark:text-gray-300">{results.preview?.description}</div>
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