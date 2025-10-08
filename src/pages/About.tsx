

import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 border-b border-gray-300 dark:border-gray-700 pb-4">SYRA.io Documentation</h1>

        <nav className="mb-8">
          <ul className="space-y-2">
            <li><a href="#introduction" className="text-blue-600 hover:underline">Introduction</a></li>
            <li><a href="#getting-started" className="text-blue-600 hover:underline">Getting Started</a></li>
            <li><a href="#features" className="text-blue-600 hover:underline">Features</a></li>
            <li><a href="#api" className="text-blue-600 hover:underline">API Reference</a></li>
            <li><a href="#faq" className="text-blue-600 hover:underline">FAQ</a></li>
          </ul>
        </nav>

        <section id="introduction" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            SYRA.io is an AI-powered marketing platform designed to help solo founders, startups, agencies, and content teams create, optimize, and manage marketing content efficiently.
          </p>
          <p className="mb-4">
            The platform integrates multiple AI tools into a single, user-friendly interface, eliminating the need for multiple subscriptions and complex workflows.
          </p>
          <h3 className="text-2xl font-semibold mb-2">Key Capabilities</h3>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>AI-powered content generation for blogs, social media, ads, and emails</li>
            <li>Image creation using advanced AI models</li>
            <li>SEO optimization tools including keyword analysis and meta tag generation</li>
            <li>Content scheduling and automation</li>
            <li>Analytics and performance tracking</li>
            <li>Content humanization to avoid AI detection</li>
          </ul>
        </section>

        <section id="getting-started" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Getting Started</h2>
          <h3 className="text-2xl font-semibold mb-2">Account Setup</h3>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Visit <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">syra.io</code> and click "Get Started Free"</li>
            <li>Create an account using email or social login</li>
            <li>Complete your profile personalization</li>
            <li>Choose a pricing plan or start with the free tier</li>
          </ol>

          <h3 className="text-2xl font-semibold mb-2">First Content Generation</h3>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Navigate to the Content Generator from the dashboard</li>
            <li>Select content type (blog post, social media, etc.)</li>
            <li>Enter your topic and target audience</li>
            <li>Customize tone, length, and style preferences</li>
            <li>Generate and edit the content</li>
          </ol>
        </section>

        <section id="features" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Features</h2>

          <h3 className="text-2xl font-semibold mb-2">AI Content Generator</h3>
          <p className="mb-2">Generate high-quality written content for various marketing needs.</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Supports blog posts, social media posts, email campaigns, and advertisements</li>
            <li>Multi-language support</li>
            <li>Customizable tone and style</li>
            <li>SEO-optimized content options</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-2">Image Creation</h3>
          <p className="mb-2">Create professional images using AI-powered generation.</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>DALL-E integration for high-quality image generation</li>
            <li>Natural language prompts</li>
            <li>Multiple aspect ratios and resolutions</li>
            <li>Image editing and optimization tools</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-2">SEO Toolkit</h3>
          <p className="mb-2">Optimize content for search engines.</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Keyword research and analysis</li>
            <li>Meta tag generation</li>
            <li>SEO score checking</li>
            <li>Competitor analysis</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-2">Content Scheduler</h3>
          <p className="mb-2">Plan and automate content publishing.</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Multi-platform scheduling (Twitter, Facebook, LinkedIn, Instagram)</li>
            <li>Content calendar view</li>
            <li>Automated posting</li>
            <li>Performance tracking</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-2">Analytics Dashboard</h3>
          <p className="mb-2">Track marketing performance and ROI.</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Content engagement metrics</li>
            <li>Campaign performance reports</li>
            <li>Audience insights</li>
            <li>Custom reporting</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-2">Humanizer</h3>
          <p className="mb-2">Transform AI-generated content to sound more natural.</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>AI detection avoidance</li>
            <li>Natural language processing</li>
            <li>Multiple style options</li>
            <li>Quality preservation</li>
          </ul>
        </section>

        <section id="api" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">API Reference</h2>
          <p className="mb-4">
            SYRA.io provides a REST API for programmatic access to our AI tools. API access is available on paid plans.
          </p>

          <h3 className="text-2xl font-semibold mb-2">Authentication</h3>
          <p className="mb-2">All API requests require authentication using API keys.</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto">
            <code>
{`curl -X GET "https://api.syra.io/v1/content/generate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "blog_post",
    "topic": "AI Marketing Trends",
    "length": 1000
  }'`}
            </code>
          </pre>

          <h3 className="text-2xl font-semibold mb-2">Endpoints</h3>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li><code>POST /v1/content/generate</code> - Generate content</li>
            <li><code>POST /v1/images/generate</code> - Generate images</li>
            <li><code>POST /v1/seo/analyze</code> - SEO analysis</li>
            <li><code>GET /v1/analytics</code> - Retrieve analytics</li>
          </ul>
        </section>

        <section id="faq" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Do I need technical skills to use SYRA.io?</h3>
              <p>No, SYRA.io is designed for non-technical users. Our AI handles all complex parts while you focus on creativity.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Can I customize AI-generated content?</h3>
              <p>Yes! SYRA.io allows you to edit, tweak, and humanize AI-generated content before publishing.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Does SYRA.io support multiple languages?</h3>
              <p>Absolutely! You can generate content in multiple languages and localize your campaigns easily.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Is my data secure?</h3>
              <p>Yes, we use industry-standard encryption and security measures to protect your data. See our Privacy Policy for details.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">What are the pricing plans?</h3>
              <p>We offer flexible pricing starting with a free tier. Visit our Pricing page for current plans and features.</p>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-300 dark:border-gray-700 pt-8 mt-12">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            For more information, visit our <a href="/help" className="text-blue-600 hover:underline">Help Center</a> or contact <a href="/contact" className="text-blue-600 hover:underline">Support</a>.
          </p>
        </footer>
      </div>
    </div>
  );
}
