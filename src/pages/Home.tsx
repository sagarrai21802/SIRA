import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Target, BarChart3, Brain, Image } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Card, CardContent } from '../components/UI/Card';

export function Home() {
  const features = [
    {
      icon: Brain,
      title: 'AI Content Generator',
      description: 'Generate high-quality blog posts, ads, emails, and social media content with advanced AI.',
    },
    {
      icon: Image,
      title: 'Image Creation',
      description: 'Create stunning visuals and graphics using DALL-E powered image generation.',
    },
    {
      icon: Target,
      title: 'SEO Optimization',
      description: 'Optimize your content for search engines with meta tags, descriptions, and keyword analysis.',
    },
    {
      icon: BarChart3,
      title: 'Marketing Strategy',
      description: 'Plan comprehensive marketing campaigns with scheduling, analytics, and performance tracking.',
    },
    {
      icon: Zap,
      title: 'Brand Management',
      description: 'Maintain consistent branding across all your marketing materials and campaigns.',
    },
    {
      icon: Sparkles,
      title: 'Project Organization',
      description: 'Organize your marketing assets, content, and campaigns in structured projects.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              AI-Powered Marketing
              <span className="block text-blue-600">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              SIRA empowers solo founders, startups, and content teams with intelligent marketing tools. 
              Generate content, create images, optimize SEO, and manage campaigns all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" icon={ArrowRight} asChild>
                <Link to="/signup">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              No credit card required • Start with 5 free AI generations
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to scale your marketing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From content creation to performance tracking, SIRA provides all the tools you need 
              to build and execute successful marketing campaigns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center">
                <CardContent className="pt-8">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to transform your marketing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of marketers using SIRA to create better content, faster.
          </p>
          <Button size="lg" variant="secondary" icon={ArrowRight} asChild>
            <Link to="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}