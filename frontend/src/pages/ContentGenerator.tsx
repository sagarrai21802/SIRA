import React, { useState } from 'react';
import { FileText, Copy, Download, Sparkles, Zap, PenTool, Smartphone, Mail, Briefcase, CheckCircle2, RefreshCw, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Textarea } from '../components/UI/Input';
import { useAuth } from '../hooks/useAuth';
import { generateWithGemini } from '../lib/gemini';
import toast from 'react-hot-toast';
import { ModernDropdown } from '../components/UI/ModernDropdown';
import { motion } from 'framer-motion';

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
    { value: 'blog-post', label: 'Blog Post', icon: PenTool, description: 'Comprehensive articles and guides', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    { value: 'social-media', label: 'Social Media Post', icon: Smartphone, description: 'Engaging posts for social platforms', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
    { value: 'email', label: 'Email', icon: Mail, description: 'Marketing emails and newsletters', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    { value: 'job-description', label: 'Job Description', icon: Briefcase, description: 'AI-powered professional job postings', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
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
          content = await generateWithGemini({
            prompt,
            contentType,
            tone
          });
          toast.success('AI content generated successfully!');
        } catch (aiError) {
          toast.error('AI generation failed, using fallback content');
          content = generateSampleContent(contentType, tone, prompt);
        }
      } else {
        content = generateSampleContent(contentType, tone, prompt);
        toast.success('Content generated successfully!');
      }

      setGeneratedContent(stripMarkdown(content));

      if (user) {
        try {
          const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
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
      'social-media': `Exciting news about ${prompt}!\n\nDiscover how this game-changing topic can transform your approach. Here's what you need to know:\n\nKey insight #1\nImportant tip #2\nActionable strategy #3\n\nWhat's your experience with ${prompt}? Share below!\n\n#Marketing #Innovation #Growth`,
      'email': `Subject: Unlock the Power of ${prompt}\n\nHi there!\n\nI hope this email finds you well. Today, I want to share something exciting about ${prompt} that could make a real difference for you.\n\nHere's what makes this special:\n\n• Benefit 1: Clear value proposition\n• Benefit 2: Practical application\n• Benefit 3: Long-term impact\n\nReady to get started? [Call-to-Action Button]\n\nBest regards,\nYour Marketing Team`,
      'job-description': `${prompt} - Exciting Career Opportunity\n\nWe are looking for a talented and motivated ${prompt} to join our dynamic team. In this role, you will play a key part in driving our success and contributing to impactful projects.\n\nResponsibilities:\n• Perform core duties related to ${prompt}\n• Collaborate with team members to achieve goals\n• Maintain high standards of quality and professionalism\n• Contribute innovative ideas and solutions\n\nQualifications:\n• Relevant education or experience in ${prompt}\n• Strong communication and teamwork skills\n• Ability to manage time and prioritize tasks effectively\n\nIf you're passionate about ${prompt} and eager to grow your career, apply today!`
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Content Generator
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-14">
            Create high-quality content for your marketing campaigns using AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Content Settings
                  </h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Content Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {contentTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => setContentType(type.value)}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            contentType === type.value
                              ? `border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-md`
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${type.bgColor} w-fit mb-2`}>
                            <Icon className={`w-5 h-5 ${type.color}`} />
                          </div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{type.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{type.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <ModernDropdown
                  label="Tone"
                  options={tones}
                  selected={selectedTone!}
                  onChange={(opt) => setTone(opt.value)}
                  displayKey="label"
                />
                {selectedTone && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 -mt-4">
                    {selectedTone.description}
                  </p>
                )}

                <Textarea
                  label="What would you like to create?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what content you want to generate... Be specific for better results!"
                  rows={4}
                  className="resize-none"
                />

                <Button
                  onClick={generateContent}
                  loading={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  icon={useAI && aiAvailable ? Wand2 : Sparkles}
                >
                  {loading 
                    ? 'Generating Amazing Content...' 
                    : `Generate ${useAI && aiAvailable ? 'AI' : 'Sample'} Content`
                  }
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/30">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Generated Content
                    </h2>
                  </div>
                  {generatedContent && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Copy}
                        onClick={copyToClipboard}
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Download}
                        onClick={downloadContent}
                        className="hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {generatedContent ? (
                  <div className="relative">
                    <div className="absolute -top-3 -right-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setGeneratedContent('')}
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          title="Clear content"
                        >
                          <RefreshCw className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-sans text-sm leading-relaxed">
                        {generatedContent}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 px-4">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-30"></div>
                      <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800">
                        <FileText className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Your content will appear here
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-4">
                      Fill out the form on the left and click generate to create amazing content with AI
                    </p>
                    {aiAvailable && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        AI-powered generation enabled
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
