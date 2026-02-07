import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Rocket, Layers, BarChart3, Calendar, Shield, Code, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const sections = [
    { id: 'introduction', title: 'Introduction', icon: BookOpen },
    { id: 'getting-started', title: 'Getting Started', icon: Rocket },
    { id: 'features', title: 'Features', icon: Layers },
    { id: 'api', title: 'API Reference', icon: Code },
    { id: 'faq', title: 'FAQ', icon: HelpCircle },
  ];

  const features = [
    {
      title: 'AI Content Generator',
      icon: Sparkles,
      description: 'Generate high-quality written content for blogs, social media, ads, and emails.',
      items: ['Multi-language support', 'Customizable tone and style', 'SEO-optimized content']
    },
    {
      title: 'Image Creation',
      icon: Layers,
      description: 'Create professional images using AI-powered generation with DALL-E integration.',
      items: ['Natural language prompts', 'Multiple aspect ratios', 'Image editing tools']
    },
    {
      title: 'SEO Toolkit',
      icon: BarChart3,
      description: 'Optimize content for search engines with comprehensive SEO tools.',
      items: ['Keyword research', 'Meta tag generation', 'Competitor analysis']
    },
    {
      title: 'Content Scheduler',
      icon: Calendar,
      description: 'Plan and automate content publishing across multiple platforms.',
      items: ['Multi-platform scheduling', 'Content calendar view', 'Automated posting']
    },
    {
      title: 'Analytics Dashboard',
      icon: BarChart3,
      description: 'Track marketing performance and ROI with detailed insights.',
      items: ['Engagement metrics', 'Campaign reports', 'Audience insights']
    },
    {
      title: 'Security',
      icon: Shield,
      description: 'Enterprise-grade security to protect your data and content.',
      items: ['End-to-end encryption', 'SOC 2 compliant', 'Regular security audits']
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Documentation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            SYRA.io Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about using SYRA.io to supercharge your marketing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">On this page</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="lg:col-span-3 space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Introduction */}
            <section id="introduction" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Introduction</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  SYRA.io is an AI-powered marketing platform designed to help solo founders, startups, agencies, and content teams create, optimize, and manage marketing content efficiently.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  The platform integrates multiple AI tools into a single, user-friendly interface, eliminating the need for multiple subscriptions and complex workflows.
                </p>
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Rocket className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Getting Started</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Account Setup</h3>
                  <ol className="space-y-3">
                    {[
                      'Visit syra.io and click "Get Started Free"',
                      'Create an account using email or social login',
                      'Complete your profile personalization',
                      'Choose a pricing plan or start with the free tier'
                    ].map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* Features */}
            <section id="features">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Features</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* API Reference */}
            <section id="api" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Code className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">API Reference</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                SYRA.io provides a REST API for programmatic access to our AI tools. API access is available on paid plans.
              </p>
              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{`curl -X GET "https://api.syra.io/v1/content/generate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "blog_post",
    "topic": "AI Marketing Trends",
    "length": 1000
  }'`}</code>
                </pre>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <HelpCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-6">
                {[
                  { q: 'Do I need technical skills?', a: 'No, SYRA.io is designed for non-technical users. Our AI handles all complex parts.' },
                  { q: 'Can I customize AI-generated content?', a: 'Yes! Edit, tweak, and humanize AI-generated content before publishing.' },
                  { q: 'Does it support multiple languages?', a: 'Absolutely! Generate content in multiple languages and localize campaigns.' },
                  { q: 'Is my data secure?', a: 'Yes, we use industry-standard encryption and security measures.' },
                ].map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Need help? Visit our <Link to="/help" className="text-blue-600 hover:text-blue-700 font-medium">Help Center</Link> or <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</Link>
              </p>
            </footer>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
