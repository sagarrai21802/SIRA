import React, { useState } from 'react';
import { FileText, Copy, Download, Sparkles, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { TextArea } from '../components/UI/Input';
import { useAuth } from '../hooks/useAuth';
// import { getMongoDb } from '../lib/realm';
import { generateWithGemini } from '../lib/gemini';
import toast from 'react-hot-toast';
import { ModernDropdown } from '../components/UI/ModernDropdown'; 

export function ContentGenerator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('blog-post');
  const [tone, setTone] = useState('professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [useAI, setUseAI] = useState(true);
  const [aiAvailable, setAiAvailable] = useState(!!import.meta.env.VITE_GEMINI_API_KEY);
  
  // Debug: Log the API key status
  console.log('VITE_GEMINI_API_KEY available:', !!import.meta.env.VITE_GEMINI_API_KEY);
  console.log('API Key value:', import.meta.env.VITE_GEMINI_API_KEY ? 'Found' : 'Not found');

  const contentTypes = [
    { value: 'blog-post', label: 'Blog Post', icon: '📝', description: 'Comprehensive articles and guides' },
    { value: 'social-media', label: 'Social Media Post', icon: '📱', description: 'Engaging posts for social platforms' },
    { value: 'email', label: 'Email', icon: '✉️', description: 'Marketing emails and newsletters' },
    { value: 'job-description', label: 'Job Description', icon: '💼', description: 'AI-powered professional job postings' },
  ];

  const tones = [
    { value: 'professional', label: 'Professional', description: 'Formal and authoritative' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'formal', label: 'Formal', description: 'Official and structured' },
    { value: 'creative', label: 'Creative', description: 'Innovative and artistic' },
  ];

  const stripMarkdown = (text: string) => {
    return text
      .replace(/[#*_`>~-]/g, '')             
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')    
      .trim();
  };

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      let content = '';

      if (useAI && aiAvailable) {
        try {
          console.log('Attempting AI generation with:', { prompt, contentType, tone });
          content = await generateWithGemini({
            prompt,
            contentType,
            tone
          });
          console.log('AI generation successful, content length:', content.length);
          toast.success('AI content generated successfully!');
        } catch (aiError) {
          console.error('AI generation failed:', aiError);
          toast.error('AI generation failed, using fallback content');
          content = generateSampleContent(contentType, tone, prompt);
        }
      } else {
        console.log('Using fallback content generation. AI available:', aiAvailable, 'Use AI:', useAI);
        content = generateSampleContent(contentType, tone, prompt);
        toast.success('Content generated successfully!');
      }

      // ✅ Strip Markdown before setting state
      setGeneratedContent(stripMarkdown(content));

      if (user) {
        try {
          const apiBase ='http://localhost:4000';
          const resp = await fetch(`${apiBase}/api/content-generations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: user.id,
              content_type: contentType,
              prompt,
              generated_content: stripMarkdown(content),
              tone
            })
          });
          if (!resp.ok) throw new Error(await resp.text());
        } catch (err) {
          console.error('Error saving content generation:', err);
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
      'blog-post': `${prompt}\n\nThis is a sample blog post about ${prompt}. In a ${tone} tone, this article would explore the key aspects of the topic, providing valuable insights and actionable advice for readers.\n\n Key Points\n\n- First important point about ${prompt}\n- Second crucial insight\n- Practical applications and benefits\n\n Conclusion\n\nThis comprehensive guide to ${prompt} provides you with the foundation needed to understand and implement these concepts effectively.`,
      'social-media': `🚀 Exciting news about ${prompt}!\n\nDiscover how this game-changing topic can transform your approach. Here's what you need to know:\n\n✨ Key insight #1\n💡 Important tip #2\n🎯 Actionable strategy #3\n\nWhat's your experience with ${prompt}? Share below! 👇\n\n#Marketing #Innovation #Growth`,
      'email': `Subject: Unlock the Power of ${prompt}\n\nHi there!\n\nI hope this email finds you well. Today, I want to share something exciting about ${prompt} that could make a real difference for you.\n\nHere's what makes this special:\n\n• Benefit 1: Clear value proposition\n• Benefit 2: Practical application\n• Benefit 3: Long-term impact\n\nReady to get started? [Call-to-Action Button]\n\nBest regards,\nYour Marketing Team`,
      'job-description': `${prompt} - Exciting Career Opportunity\n\nWe are looking for a talented and motivated ${prompt} to join our dynamic team. In this role, you will play a key part in driving our success and contributing to impactful projects.\n\nResponsibilities:\n• Perform core duties related to ${prompt}\n• Collaborate with team members to achieve goals\n• Maintain high standards of quality and professionalism\n• Contribute innovative ideas and solutions\n\nQualifications:\n• Relevant education or experience in ${prompt}\n• Strong communication and teamwork skills\n• Ability to manage time and prioritize tasks effectively\n\nIf you’re passionate about ${prompt} and eager to grow your career, apply today!`
    };
    return contentTemplates[type as keyof typeof contentTemplates] || contentTemplates['blog-post'];
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      toast.success('Content copied to clipboard!');
    } catch {
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
    } catch {
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
              {/* Content Type */}
              <ModernDropdown
                label="Content Type"
                options={contentTypes}
                selected={selectedContentType!}
                onChange={(opt) => setContentType(opt.value)}
                displayKey="label"
              />
              {selectedContentType && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {selectedContentType.description}
                </p>
              )}

              {/* Tone */}
              <ModernDropdown
                label="Tone"
                options={tones}
                selected={selectedTone!}
                onChange={(opt) => setTone(opt.value)}
                displayKey="label"
              />
              {selectedTone && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {selectedTone.description}
                </p>
              )}

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
