
import React, { useState } from 'react';
import { FileText, Copy, Download, Sparkles, AlertCircle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { TextArea } from '../components/UI/Input';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { generateWithGemini } from '../lib/gemini';
import toast from 'react-hot-toast';

export function ContentGenerator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('blog-post');
  const [tone, setTone] = useState('professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [useAI, setUseAI] = useState(true);
  const [aiAvailable, setAiAvailable] = useState(!!import.meta.env.VITE_GEMINI_API_KEY);

  const contentTypes = [
    { value: 'blog-post', label: 'Blog Post', icon: '📝', description: 'Comprehensive articles and guides' },
    { value: 'social-media', label: 'Social Media Post', icon: '📱', description: 'Engaging posts for social platforms' },
    { value: 'email', label: 'Email', icon: '✉️', description: 'Marketing emails and newsletters' },
    { value: 'ad-copy', label: 'Ad Copy', icon: '🎯', description: 'Persuasive advertising content' },
    { value: 'product-description', label: 'Product Description', icon: '🛍️', description: 'Compelling product pages' },
  ];

  const tones = [
    { value: 'professional', label: 'Professional', description: 'Formal and authoritative' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'formal', label: 'Formal', description: 'Official and structured' },
    { value: 'creative', label: 'Creative', description: 'Innovative and artistic' },
  ];

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      let content = '';

      if (useAI && aiAvailable) {
        // Use AI generation
        try {
          content = await generateWithGemini({
            prompt,
            contentType,
            tone
          });
          toast.success('AI content generated successfully!');
        } catch (aiError) {
          console.error('AI generation failed:', aiError);
          toast.error('AI generation failed, using fallback content');
          content = generateSampleContent(contentType, tone, prompt);
        }
      } else {
        // Use sample content
        content = generateSampleContent(contentType, tone, prompt);
        toast.success('Content generated successfully!');
      }

      setGeneratedContent(content);

      // Save to database
      if (user) {
        const { error } = await supabase.from('content_generations').insert({
          user_id: user.id,
          content_type: contentType,
          prompt,
          generated_content: content,
          tone,
        });

        if (error) {
          console.error('Error saving content generation:', error);
          toast.error('Content generated but failed to save to database');
        }
      }
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      toast.success('Content copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy content');
    }
  };

  const downloadContent = () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([generatedContent], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${contentType}-${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success('Content downloaded!');
    } catch (error) {
      toast.error('Failed to download content');
    }
  };

  const selectedContentType = contentTypes.find(type => type.value === contentType);
  const selectedTone = tones.find(t => t.value === tone);

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
          
          {/* AI Status Banner */}
          <div className={`mt-4 p-4 rounded-lg ${aiAvailable ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
            <div className="flex items-start">
              {aiAvailable ? (
                <Zap className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2" />
              )}
              <div>
                <p className={`text-sm font-medium ${aiAvailable ? 'text-green-800 dark:text-green-200' : 'text-yellow-800 dark:text-yellow-200'}`}>
                  {aiAvailable ? 'AI Content Generation Active' : 'AI Content Generation Unavailable'}
                </p>
                <p className={`text-sm ${aiAvailable ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                  {aiAvailable 
                    ? 'Using Google Gemini AI for intelligent content creation'
                    : 'Add VITE_GEMINI_API_KEY to your environment to enable AI generation'
                  }
                </p>
              </div>
            </div>
          </div>
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
              {/* AI Toggle */}
              {aiAvailable && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Use AI Generation
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Generate content using Google Gemini AI
                    </p>
                  </div>
                  <button
                    onClick={() => setUseAI(!useAI)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      useAI ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        useAI ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              )}

              {/* Content Type */}
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
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
                {selectedContentType && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedContentType.description}
                  </p>
                )}
              </div>

              {/* Tone */}
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
                {selectedTone && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedTone.description}
                  </p>
                )}
              </div>

              {/* Prompt */}
              <TextArea
                label="Content Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what content you want to generate... Be specific for better results!"
                rows={4}
              />

              {/* Generate Button */}
              <Button
                onClick={generateContent}
                loading={loading}
                className="w-full"
                icon={useAI && aiAvailable ? Zap : Sparkles}
              >
                {loading 
                  ? 'Generating...' 
                  : `Generate ${useAI && aiAvailable ? 'AI' : 'Sample'} Content`
                }
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
                  <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-sans bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Generated content will appear here</p>
                  <p className="text-sm">Fill out the form and click "Generate Content" to get started</p>
                  {aiAvailable && (
                    <p className="text-xs mt-2 text-blue-600 dark:text-blue-400">
                      ✨ AI-powered generation available
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}