import React, { useState, useEffect } from 'react';
import { Plus, FileText, Image, BarChart3, Clock, TrendingUp, Layers, Megaphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
//this file is for dashboard page
export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    contentCount: 0,
    imageCount: 0,
    projectCount: 0,
    templateCount: 0,
  });

  const [animatedStats, setAnimatedStats] = useState(stats);

  useEffect(() => {
    if (user) loadStats();
  }, [user]);

  useEffect(() => {
    // Animate stats count
    const duration = 1000;
    const steps = 20;
    const intervalTime = duration / steps;

    const incrementStats = () => {
      setAnimatedStats(prev => {
        const newStats: any = {};
        for (const key in stats) {
          const diff = stats[key as keyof typeof stats] - prev[key as keyof typeof stats];
          newStats[key] = prev[key as keyof typeof stats] + diff / steps;
        }
        return newStats;
      });
    };

    let step = 0;
    const interval = setInterval(() => {
      incrementStats();
      step++;
      if (step >= steps) clearInterval(interval);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [stats]);

  const loadStats = async () => {
    if (!user) return;
    try {
      const { count: contentCount } = await supabase
        .from('content_generations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { count: imageCount } = await supabase
        .from('image_generations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { count: projectCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { count: templateCount } = await supabase
        .from('templates')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setStats({
        contentCount: contentCount || 0,
        imageCount: imageCount || 0,
        projectCount: projectCount || 0,
        templateCount: templateCount || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      setStats({
        contentCount: 0,
        imageCount: 0,
        projectCount: 0,
        templateCount: 0,
      });
    }
  };

  const quickActions = [
    {
      title: 'Generate Content',
      description: 'Create blog posts, ads, and social media content',
      icon: FileText,
      href: '/content',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Social Media',
      description: 'Access ready-made templates for your projects',
      icon: Layers,
      href: '/template',
      color: 'from-orange-500 to-pink-500',
    },
    {
      title: 'Create Images',
      description: 'Generate AI-powered visuals and graphics',
      icon: Image,
      href: '/images',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Ad Generation',
      description: 'Generate compelling ad copies instantly',
      icon: Megaphone,
      href: '/ads',
      color: 'from-red-500 to-yellow-500',
    },
    {
      title: 'SEO Tools',
      description: 'Optimize your content for search engines',
      icon: BarChart3,
      href: '/seo',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'AI to Humanizer',
      description: 'Transform AI text into natural human style',
      icon: Zap,
      href: '/humanizer',
      color: 'from-pink-500 to-violet-500',
    },
    {
      title: 'Promp Generator',
      description: 'Transform AI text into natural human style',
      icon: Zap,
      href: '/promptgenerator',
      color: 'from-pink-500 to-violet-500',
    },
  ];

  return (

<div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black overflow-hidden">
  {/* Animated background grid */}
  <div className="absolute inset-0 opacity-20 dark:opacity-30">
    <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px] animate-[spin_60s_linear_infinite]" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Blue Background Section */}
    <div className="relative mb-32"> {/* 👈 Added margin-bottom to push content below */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 pb-32 text-white relative z-0">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''} 👋
          </h1>
          <p className="mt-2 text-lg text-blue-100">
            Here's an overview of your marketing activities.
          </p>
        </motion.div>
      </div>

      {/* Stats Cards Overlapping */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 absolute left-0 right-0 -bottom-20 px-6 md:px-12 z-10"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0, y: 30 },
          show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {[
          { label: 'Content Generated', icon: FileText, value: animatedStats.contentCount, color: 'from-blue-400 to-cyan-500' },
          { label: 'Images Created', icon: Image, value: animatedStats.imageCount, color: 'from-purple-400 to-pink-500' },
          { label: 'Active Projects', icon: TrendingUp, value: animatedStats.projectCount, color: 'from-green-400 to-emerald-500' },
          { label: 'Templates Used', icon: Layers, value: animatedStats.templateCount, color: 'from-orange-400 to-yellow-500' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="backdrop-blur-xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-white/20 hover:border-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-500"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {Math.round(stat.value)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* Quick Actions */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="rounded-2xl backdrop-blur-xl bg-white/20 dark:bg-gray-800/30 border border-white/10 shadow-lg hover:shadow-2xl p-6"
          >
            <div className="flex items-start">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{action.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{action.description}</p>
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform" asChild>
                  <Link to={action.href}>Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Recent Activity */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="backdrop-blur-xl bg-white/20 dark:bg-gray-800/30 border border-white/10 shadow-xl hover:shadow-2xl rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">📅 Recent Activity</h2>
            <Button variant="outline" size="sm" icon={Clock}>View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin-slow" />
            <p className="text-gray-500 dark:text-gray-400">Start creating content to see your recent activity here.</p>
            <Button className="mt-4 hover:scale-105 transition-transform" icon={Plus} asChild>
              <Link to="/content">Create Your First Content</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  </div>
</div>
  );
}

