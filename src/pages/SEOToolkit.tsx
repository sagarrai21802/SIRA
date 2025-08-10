import React, { useState } from 'react';
import { Search, Target, Hash, FileText, BarChart3, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { TextArea } from '../components/UI/Input';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import toast from 'react-hot-toast';
import { 
  generateMetaTags, 
  generateKeywords, 
  generateReadabilityTips, 
  generateSchemaMarkup 
} from '../lib/seoToolkitFixed';

export function SEOToolkit() {
  const [activeTab, setActiveTab] = useState('meta');
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('general');
  const [targetAudience, setTargetAudience] = useState('online users');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { 
      id: 'meta', 
      label: 'Meta Tags', 
      icon: FileText,
      description: 'Generate SEO-optimized meta titles and descriptions'
    },
    { 
      id: 'keywords', 
      label: 'Keywords', 
      icon: Hash,
      description: 'Research and generate relevant keywords'
    },
    { 
      id: 'readability', 
      label: 'Readability', 
      icon: BarChart3,
      description: 'Get tips to improve content readability'
    },
    { 
      id: 'schema', 
      label: 'Schema', 
      icon: Target,
      description: 'Generate structured data markup'
    }
  ];

  const industries = [
    'general', 'technology', 'healthcare', 'finance', 'education', 
    'retail', 'real estate', 'travel', 'food', 'fitness', 'marketing'
  ];

  const audiences = [
    'online users', 'professionals', 'students', 'consumers', 
    'business owners', 'developers', 'marketers', 'researchers'
  ];

  const handleGenerate = async () => {
    if (!title.trim()) {
      toast.error('Please enter a topic or title');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
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
    } catch (error) {
      console.error('Generation error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const generateMeta = async () => {
    const result = await generateMetaTags({
      topic: title,
      industry,
      targetAudience
    });
    
    setResults({
      type: 'meta',
      ...result,
      preview: {
        title: result.metaTitle,
        description: result.metaDescription,
        url: `https://yoursite.com/${result.slug}`
      }
    });
    
    toast.success('Meta tags generated successfully!');
  };

  const analyzeKeywords = async () => {
    const result = await generateKeywords({
      topic: title,
      industry,
      targetAudience
    });
    
    setResults({
      type: 'keywords',
      ...result
    });
    
    toast.success('Keywords generated successfully!');
  };

  const analyzeReadability = async () => {
    const result = await generateReadabilityTips({
      topic: title,
      industry,
      targetAudience
    });
    
    setResults({
      type: 'readability',
      ...result
    });
    
    toast.success('Readability tips generated successfully!');
  };

  const generateSchema = async () => {
    const result = await generateSchemaMarkup({
      topic: title,
      industry,
      targetAudience
    });
    
    setResults({
      type: 'schema',
      ...result
    });
    
    toast.success('Schema markup generated successfully!');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SEO Toolkit
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Optimize your content for search engines with AI-powered SEO tools.
          </p>
          
          {/* AI Status */}
          <div className={`mt-4 p-4 rounded-lg ${import.meta.env.VITE_GEMINI_API_KEY ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
            <div className="flex items-start">
              {import.meta.env.VITE_GEMINI_API_KEY ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2" />
              )}
              <div>
                <p className={`text-sm font-medium ${import.meta.env.VITE_GEMINI_API_KEY ? 'text-green-800 dark:text-green-200' : 'text-yellow-800 dark:text-yellow-200'}`}>
                  {import.meta.env.VITE_GEMINI_API_KEY ? 'AI SEO Tools Active' : 'AI SEO Tools Unavailable'}
                </p>
                <p className={`text-sm ${import.meta.env.VITE_GEMINI_API_KEY ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                  {import.meta.env.VITE_GEMINI_API_KEY 
                    ? 'Using Google Gemini AI for intelligent SEO optimization'
                    : 'Add VITE_GEMINI_API_KEY to enable AI-powered SEO tools'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setResults(null);
                setError(null);
              }}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-medium'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-soft'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                {activeTabData && <activeTabData.icon className="w-5 h-5 mr-2" />}
                {activeTabData?.label} Generator
              </h2>
              {activeTabData && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {activeTabData.description}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                label="Topic / Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your content topic or title..."
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {industries.map(ind => (
                      <option key={ind} value={ind}>
                        {ind.charAt(0).toUpperCase() + ind.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Audience
                  </label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {audiences.map(aud => (
                      <option key={aud} value={aud}>
                        {aud.charAt(0).toUpperCase() + aud.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-3 bg-error-50 dark:bg-error-900/20 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-error-600 dark:text-error-400 mt-0.5 mr-2" />
                    <p className="text-sm text-error-700 dark:text-error-300">{error}</p>
                  </div>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                className="w-full"
                icon={loading ? undefined : Search}
                disabled={loading || !import.meta.env.VITE_GEMINI_API_KEY}
                loading={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner size="sm" color="white" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  `Generate ${activeTabData?.label}`
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-medium">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Results
                </h2>
                {results?.type === activeTab && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const textToCopy = activeTab === 'meta' 
                        ? `Title: ${results.metaTitle}\nDescription: ${results.metaDescription}\nSlug: ${results.slug}`
                        : activeTab === 'keywords'
                        ? results.keywords?.join(', ')
                        : activeTab === 'readability'
                        ? results.readabilityTips
                        : results.schemaMarkup;
                      copyToClipboard(textToCopy);
                    }}
                  >
                    Copy All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {results?.type === activeTab ? (
                <div className="space-y-4">
                  {activeTab === 'meta' && (
                    <>
                      <Input 
                        label={`Meta Title (${results.metaTitle?.length || 0}/60)`}
                        value={results.metaTitle || ''} 
                        readOnly 
                        className={results.metaTitle?.length > 60 ? 'border-warning-500' : 'border-success-500'}
                      />
                      <TextArea 
                        label={`Meta Description (${results.metaDescription?.length || 0}/160)`}
                        value={results.metaDescription || ''} 
                        readOnly 
                        rows={3}
                        className={results.metaDescription?.length > 160 ? 'border-warning-500' : 'border-success-500'}
                      />
                      <Input 
                        label="URL Slug" 
                        value={results.slug || ''} 
                        readOnly 
                      />
                      
                      {/* SERP Preview */}
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Search Result Preview
                        </h3>
                        <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-soft">
                          <div className="text-primary-600 dark:text-primary-400 text-sm mb-1">
                            {results.preview?.url}
                          </div>
                          <div className="font-medium text-primary-800 dark:text-primary-200 text-lg mb-1 hover:underline cursor-pointer">
                            {results.preview?.title}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 text-sm">
                            {results.preview?.description}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'keywords' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Suggested Keywords ({results.keywords?.length || 0})
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {results.keywords?.map((keyword: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                            onClick={() => copyToClipboard(keyword)}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'readability' && (
                    <TextArea 
                      label="Readability Improvement Tips" 
                      value={results.readabilityTips || ''} 
                      readOnly 
                      rows={8}
                      className="font-mono text-sm"
                    />
                  )}

                  {activeTab === 'schema' && (
                    <div>
                      <TextArea 
                        label="Schema Markup (JSON-LD)" 
                        value={results.schemaMarkup || ''} 
                        readOnly 
                        rows={12}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Copy this code and paste it in the &lt;head&gt; section of your webpage.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  {activeTabData && <activeTabData.icon className="w-12 h-12 mx-auto mb-4 opacity-50" />}
                  <p className="text-lg font-medium mb-2">
                    {activeTabData?.label} results will appear here
                  </p>
                  <p className="text-sm">
                    Enter your topic and click "Generate {activeTabData?.label}" to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
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