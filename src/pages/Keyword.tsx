import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Key } from 'lucide-react';
import { generateKeywords } from '../lib/seoToolkitFixed';

type KeywordResult = {
  name: string;
  avgMonthlySearches: number;
  competition: string;
};

export default function KeywordGenerator() {
  const [keywordsPrompt, setKeywordsPrompt] = useState('');
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  const [keywordsResults, setKeywordsResults] = useState<KeywordResult[] | null>(null);
  const [keywordsError, setKeywordsError] = useState<string | null>(null);
  const [keywordType, setKeywordType] = useState<'short' | 'long'>('short');

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
          ? `Generate 10 short-tail keywords with avg monthly searches and competition for: ${keywordsPrompt}`
          : `Generate 10 long-tail keywords with avg monthly searches and competition for: ${keywordsPrompt}`;

      const result = await generateKeywords({ topic: typeInstruction });

      // Map result into proper structure for table
      const mappedResults: KeywordResult[] = result.keywords?.map((kw: any) => ({
        name: typeof kw.keyword === 'string' ? kw.keyword : JSON.stringify(kw.keyword),
        avgMonthlySearches: typeof kw.avgMonthlySearches === 'number' ? kw.avgMonthlySearches : 0,
        competition: typeof kw.competition === 'string' ? kw.competition : 'Unknown',
      })) || [];

      setKeywordsResults(mappedResults);
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
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
        <Key className="w-10 h-10 text-green-600" /> Keyword Generator
      </h1>

      <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Short/Long Tail Toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={keywordType === 'long' ? 'outline' : 'default'}
            onClick={() => handleTypeChange('short')}
          >
            Short Tail
          </Button>
          <Button
            variant={keywordType === 'short' ? 'outline' : 'default'}
            onClick={() => handleTypeChange('long')}
          >
            Long Tail
          </Button>
        </div>

        {/* Input and Generate Button */}
        <div className="space-y-4">
          <Input
            value={keywordsPrompt}
            onChange={(e) => setKeywordsPrompt(e.target.value)}
            placeholder={`Enter topic for ${keywordType} tail keywords...`}
            disabled={isGeneratingKeywords}
          />
          {keywordsError && <p className="text-red-600">{keywordsError}</p>}
          <Button
            onClick={() => handleGenerateKeywords(keywordType)}
            disabled={isGeneratingKeywords || !keywordsPrompt.trim()}
          >
            {isGeneratingKeywords ? <><LoadingSpinner size="sm" /> Generating...</> : 'Generate Keywords'}
          </Button>
        </div>

        {/* Keywords Table */}
        {keywordsResults && keywordsResults.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Keyword</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Avg Monthly Searches</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Competition</th>
                </tr>
              </thead>
              <tbody>
                {keywordsResults.map((kw, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{kw.name}</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{kw.avgMonthlySearches}</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{kw.competition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

