import React, { useState, useEffect } from 'react';
import { Plus, FileText, Image, BarChart3, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    contentCount: 0,
    imageCount: 0,
    projectCount: 0,
  });

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    if (!user) return;

    try {
      // Get content count
      const { count: contentCount, error: contentError } = await supabase
        .from('content_generations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (contentError) {
        console.error('Error loading content count:', contentError);
      }

      // Get image count
      const { count: imageCount, error: imageError } = await supabase
        .from('image_generations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (imageError) {
        console.error('Error loading image count:', imageError);
      }

      // Get project count
      const { count: projectCount, error: projectError } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (projectError) {
        console.error('Error loading project count:', projectError);
      }

      setStats({
        contentCount: contentCount || 0,
        imageCount: imageCount || 0,
        projectCount: projectCount || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      // Set default values if database operations fail
      setStats({
        contentCount: 0,
        imageCount: 0,
        projectCount: 0,
      });
    }
  };

  const quickActions = [
    {
      title: 'Generate Content',
      description: 'Create blog posts, ads, and social media content',
      icon: FileText,
      href: '/content',
      color: 'bg-blue-500',
    },
    {
      title: 'Create Images',
      description: 'Generate AI-powered visuals and graphics',
      icon: Image,
      href: '/images',
      color: 'bg-purple-500',
    },
    {
      title: 'SEO Tools',
      description: 'Optimize your content for search engines',
      icon: BarChart3,
      href: '/seo',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's an overview of your marketing activities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.contentCount}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Content Generated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Image className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.imageCount}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Images Created</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.projectCount}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} hover>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {action.description}
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={action.href}>Get Started</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <Button variant="outline" size="sm" icon={Clock}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Start creating content to see your recent activity here.
              </p>
              <Button className="mt-4" icon={Plus} asChild>
                <Link to="/content">Create Your First Content</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}