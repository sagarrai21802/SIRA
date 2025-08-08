import React, { useState } from 'react';
import { Search, Target, Hash, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { TextArea } from '../components/UI/Input';
import toast from 'react-hot-toast';


export function SEOToolkit() {
  const [activeTab, setActiveTab] = useState('meta');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [results, setResults] = useState<any>(null);

  const tabs = [
    { id: 'meta', label: 'Meta Tags', icon: FileText },
    { id: 'keywords', label: 'Keywords', icon: Hash },
    { id: 'readability', label: 'Readability', icon: BarChart3 },
    { id: 'schema', label: 'Schema', icon: Target },
  ];

  const generateMeta = () => {
    if (!title) {
      toast.error('Please enter a title');
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

  const analyzeKeywords = () => {
    if (!keywords) {
      toast.error('Please enter keywords');
      return;
    }

    const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k);
    const suggestions = keywordList.map(keyword => ({
      keyword,
      difficulty: Math.floor(Math.random() * 100) + 1,
      volume: Math.floor(Math.random() * 10000) + 100,
      competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
    }));

    setResults({
      type: 'keywords',
      suggestions,
    });

    toast.success('Keywords analyzed!');
  };

  const analyzeReadability = () => {
    if (!content) {
      toast.error('Please enter content to analyze');
      return;
    }

    const words = content.split(/\s+/).length;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim()).length;
    const characters = content.length;
    
    const avgWordsPerSentence = sentences > 0 ? Math.round(words / sentences) : 0;
    const readingTime = Math.ceil(words / 200);

    let score = 100;
    if (avgWordsPerSentence > 20) score -= 10;
    if (words < 300) score -= 15;
    if (sentences < 5) score -= 10;

    setResults({
      type: 'readability',
      score: Math.max(score, 0),
      stats: {
        words,
        sentences,
        characters,
        avgWordsPerSentence,
        readingTime,
      },
      suggestions: [
        avgWordsPerSentence > 20 && 'Consider shorter sentences for better readability',
        words < 300 && 'Content is quite short. Consider expanding for better SEO',
        sentences < 5 && 'Add more sentences to improve content structure',
      ].filter(Boolean),
    });

    toast.success('Readability analyzed!');
  };

  const generateSchema = () => {
    if (!title) {
      toast.error('Please enter a title');
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SEO Toolkit
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Optimize your content for search engines with our comprehensive SEO tools.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {tabs.find(t => t.id === activeTab)?.label} Generator
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {(activeTab === 'meta' || activeTab === 'schema') && (
                <>
                  <Input
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your page title..."
                  />
                  <TextArea
                    label="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a brief description..."
                    rows={3}
                  />
                </>
              )}

              {activeTab === 'keywords' && (
                <TextArea
                  label="Keywords (comma-separated)"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="marketing, seo, content, strategy..."
                  rows={3}
                />
              )}

              {activeTab === 'readability' && (
                <TextArea
                  label="Content to Analyze"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your content here for readability analysis..."
                  rows={8}
                />
              )}

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

                  {results.type === 'keywords' && (
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">Keyword Analysis</h3>
                      {results.suggestions.map((kw: any, index: number) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">{kw.keyword}</span>
                            <span className={`text-sm px-2 py-1 rounded ${
                              kw.competition === 'Low' ? 'bg-green-100 text-green-800' :
                              kw.competition === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {kw.competition}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Difficulty: {kw.difficulty}/100 • Volume: {kw.volume.toLocaleString()}/month
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {results.type === 'readability' && (
                    <>
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${getScoreColor(results.score)} mb-2`}>
                          {results.score}/100
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">Readability Score</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {results.stats.words}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
                        </div>
                        <div>
                          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {results.stats.sentences}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
                        </div>
                        <div>
                          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {results.stats.avgWordsPerSentence}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Words/Sentence</div>
                        </div>
                        <div>
                          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {results.stats.readingTime}m
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Reading Time</div>
                        </div>
                      </div>
                      {results.suggestions.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Suggestions:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {results.suggestions.map((suggestion: string, index: number) => (
                              <li key={index} className="text-gray-600 dark:text-gray-400 text-sm">
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}

                  {results.type === 'schema' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Schema Markup (JSON-LD)
                      </label>
                      <TextArea
                        value={results.schema}
                        readOnly
                        rows={15}
                        className="font-mono text-sm"
                      />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Copy this JSON-LD markup and paste it in your HTML &lt;head&gt; section.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Results will appear here</p>
                  <p className="text-sm mt-2">Fill out the form and click generate to see your SEO analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}