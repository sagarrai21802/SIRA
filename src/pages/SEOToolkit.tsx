
import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Search, BarChart3, Globe, TrendingUp } from 'lucide-react';

export default function SEOToolkit() {
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a URL to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Simulate SEO analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResults({
        score: Math.floor(Math.random() * 40) + 60,
        issues: [
          'Missing meta description',
          'Images without alt text',
          'Slow loading speed'
        ],
        suggestions: [
          'Add meta description',
          'Optimize images',
          'Improve page speed'
        ]
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze website');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Search className="w-8 h-8 text-green-600" />
          SEO Toolkit
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Analyze and optimize your website's search engine performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Website Analysis</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-2">
                Website URL
              </label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full"
                disabled={isAnalyzing}
              />
            </div>

            <div>
              <label htmlFor="keyword" className="block text-sm font-medium mb-2">
                Target Keyword (Optional)
              </label>
              <Input
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter target keyword..."
                className="w-full"
                disabled={isAnalyzing}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !url.trim()}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <LoadingSpinner size="sm" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analyze Website
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">SEO Analysis Results</h2>
          
          <div className="space-y-4">
            {isAnalyzing ? (
              <div className="text-center py-8">
                <LoadingSpinner size="lg" />
                <p className="mt-2 text-gray-500">Analyzing your website...</p>
              </div>
            ) : results ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-lg font-semibold">SEO Score: {results.score}/100</span>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Issues Found:</h3>
                  <ul className="space-y-1">
                    {results.issues.map((issue: string, index: number) => (
                      <li key={index} className="text-sm text-red-600">• {issue}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Suggestions:</h3>
                  <ul className="space-y-1">
                    {results.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-sm text-green-600">• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Globe className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p>Enter a URL and click analyze to see SEO insights</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}