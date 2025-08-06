import React, { useState } from 'react';
import { FileText, Copy, Download, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { TextArea } from '../components/UI/Input';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function ContentGenerator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('blog-post');
  const [tone, setTone] = useState('professional');
  const [generatedContent, setGeneratedContent] = useState('');

  const contentTypes = [
    { value: 'blog-post', label: 'Blog Post' },
    { value: 'social-media', label: 'Social Media Post' },
    { value: 'email', label: 'Email' },
    { value: 'ad-copy', label: 'Ad Copy' },
    { value: 'product-description', label: 'Product Description' },
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'creative', label: 'Creative' },
  ];

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      // Simulate AI content generation
      const sampleContent = generateSampleContent(contentType, tone, prompt);
      setGeneratedContent(sampleContent);

      // Save to database
      if (user) {
        await supabase.from('content_generations').insert({
          user_id: user.id,
          content_type: contentType,
          prompt,
          generated_content: sampleContent,
          tone,
        });
      }

      toast.success('Content generated successfully!');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const generateSampleContent = (type: string, tone: string, prompt: string) => {
    const contentTemplates = {
      'blog-post': `# ${prompt}\n\nThis is a sample blog post about ${prompt}. In a ${tone} tone, this article would explore the key aspects of the topic, providing valuable insights and actionable advice for readers.\n\n## Key Points\n\n- First important point about ${prompt}\n- Second crucial insight\n- Practical applications and benefits\n\n## Conclusion\n\nThis comprehensive guide to ${prompt} provides you with the foundation needed to understand and implement these concepts effectively.`,
      
      'social-media': `🚀 Exciting news about ${prompt}!\n\nDiscover how this game-changing topic can transform your approach. Here's what you need to know:\n\n✨ Key insight #1\n💡 Important tip #2\n🎯 Actionable strategy #3\n\nWhat's your experience with ${prompt}? Share below! 👇\n\n#Marketing #Innovation #Growth`,
      
      'email': `Subject: Unlock the Power of ${prompt}\n\nHi there!\n\nI hope this email finds you well. Today, I want to share something exciting about ${prompt} that could make a real difference for you.\n\nHere's what makes this special:\n\n• Benefit 1: Clear value proposition\n• Benefit 2: Practical application\n• Benefit 3: Long-term impact\n\nReady to get started? [Call-to-Action Button]\n\nBest regards,\nYour Marketing Team`,
      
      'ad-copy': `Transform Your Success with ${prompt}!\n\n${tone === 'professional' ? 'Discover the professional solution that delivers results.' : 'Ready to take things to the next level?'}\n\n✅ Proven results\n✅ Easy to implement\n✅ Trusted by thousands\n\nLimited Time Offer: Get started today and see the difference!\n\n[Learn More] [Get Started Now]`,
      
      'product-description': `${prompt} - Premium Quality & Performance\n\nExperience the perfect blend of innovation and reliability with our ${prompt}. Designed for those who demand excellence, this product delivers outstanding results every time.\n\nFeatures:\n• High-quality materials and construction\n• User-friendly design\n• Exceptional performance\n• Backed by our satisfaction guarantee\n\nOrder now and discover why customers choose us for their ${prompt} needs!`
    };

    return contentTemplates[type as keyof typeof contentTemplates] || contentTemplates['blog-post'];
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success('Content copied to clipboard!');
  };

  const downloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `content-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Content downloaded!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Content Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create high-quality content for your marketing campaigns using AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Content Settings
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content Type
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {contentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {tones.map(toneOption => (
                    <option key={toneOption.value} value={toneOption.value}>
                      {toneOption.label}
                    </option>
                  ))}
                </select>
              </div>

              <TextArea
                label="Content Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what content you want to generate..."
                rows={4}
              />

              <Button
                onClick={generateContent}
                loading={loading}
                className="w-full"
                icon={Sparkles}
              >
                Generate Content
              </Button>
            </CardContent>
          </Card>

          {/* Generated Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Generated Content
                </h2>
                {generatedContent && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Copy}
                      onClick={copyToClipboard}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Download}
                      onClick={downloadContent}
                    >
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-sans">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Generated content will appear here</p>
                  <p className="text-sm mt-2">Fill out the form and click "Generate Content" to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}