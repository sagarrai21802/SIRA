import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Image, Target, Calendar } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Card, CardContent } from '../components/UI/Card';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'AI Content',
      description: 'Generate high-quality content with advanced AI.',
    },
    {
      icon: Image,
      title: 'Image Creation',
      description: 'Create stunning visuals using DALL-E powered generation.',
    },
    {
      icon: Target,
      title: 'SEO Tools',
      description: 'Optimize your content for search engines.',
    },
    {
      icon: Calendar,
      title: 'Scheduler',
      description: 'Plan and schedule content across platforms.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - Simplified */}
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Marketing Made
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Simple
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Create content, generate images, optimize SEO, and manage campaigns—all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button size="lg" icon={ArrowRight} asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" icon={ArrowRight} asChild>
                    <Link to="/signup">Get Started Free</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - Simplified */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
