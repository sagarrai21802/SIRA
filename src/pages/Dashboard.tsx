import React, { useState, useEffect } from 'react';
import { Plus, FileText, Image, BarChart3, Clock, TrendingUp, Layers, Megaphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { useAuth } from '../hooks/useAuth';
// import { getMongoDb } from '../lib/realm';
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
      const apiBase = 'http://localhost:4000';
      const params = new URLSearchParams({ user_id: user.id });
      const resp = await fetch(`${apiBase}/api/stats/counts?${params.toString()}`);
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();

      setStats({
        contentCount: data.content || 0,
        imageCount: data.image || 0,
        projectCount: data.project || 0,
        templateCount: data.template || 0,
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
      color: 'from-[#977DFF] to-[#0033FF]',
    },
    {
      title: 'Social Media',
      description: 'Access ready-made templates for your projects',
      icon: Layers,
      href: '/template',
      color: 'from-[#FFCCF2] to-[#977DFF]',
    },
    {
      title: 'Create Images',
      description: 'Generate AI-powered visuals and graphics',
      icon: Image,
      href: '/images',
      color: 'from-[#0033FF] to-[#0600AF]',
    },
    {
      title: 'Ad Generation',
      description: 'Generate compelling ad copies instantly',
      icon: Megaphone,
      href: '/ads',
      color: 'from-[#0600AB] to-[#00003D]',
    },
    {
      title: 'SEO Tools',
      description: 'Optimize your content for search engines',
      icon: BarChart3,
      href: '/seo',
      color: 'from-[#977DFF] to-[#FFCCF2]',
    },
    {
      title: 'AI to Humanizer',
      description: 'Transform AI text into natural human style',
      icon: Zap,
      href: '/humanizer',
      color: 'from-[#0033FF] to-[#977DFF]',
    },
    {
      title: 'Promp Generator',
      description: 'Transform AI text into natural human style',
      icon: Zap,
      href: '/promptgenerator',
      color: 'from-[#0600AF] to-[#00003D]',
    },
  ];

  return (

<div className="relative min-h-screen bg-gradient-to-br from-[#F2E6EE] via-[#FFCCF2] to-[#00003D] dark:from-[#00003D] dark:via-[#0600AF] dark:to-[#00003D] overflow-hidden">
  {/* Animated background grid */}
  <div className="absolute inset-0 opacity-20 dark:opacity-30">
    <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(151,125,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px] animate-[spin_60s_linear_infinite]" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Blue Background Section */}
    <div className="relative mb-32"> {/* 👈 Added margin-bottom to push content below */}
      <div className="bg-gradient-to-r from-[#977DFF] via-[#0033FF] to-[#0600AF] rounded-3xl p-8 pb-32 text-white relative z-0">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold">
            Welcome back{(user as any)?.profile?.email ? `, ${(user as any).profile.email.split('@')[0]}` : ''} 👋
          </h1>
          <p className="mt-2 text-lg text-[#FFCCF2]">
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
          { label: 'Content Generated', icon: FileText, value: animatedStats.contentCount, color: 'from-[#977DFF] to-[#0033FF]' },
          { label: 'Images Created', icon: Image, value: animatedStats.imageCount, color: 'from-[#FFCCF2] to-[#977DFF]' },
          { label: 'Active Projects', icon: TrendingUp, value: animatedStats.projectCount, color: 'from-[#0033FF] to-[#0600AF]' },
          { label: 'Templates Used', icon: Layers, value: animatedStats.templateCount, color: 'from-[#0600AB] to-[#00003D]' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="backdrop-blur-xl bg-white/90 dark:bg-[#00003D]/90 rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-[#977DFF]/30 hover:border-[#0033FF] transition-all duration-500"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-3xl font-bold text-[#00003D] dark:text-white">
                  {Math.round(stat.value)}
                </h3>
                <p className="text-[#0600AF] dark:text-[#FFCCF2]">{stat.label}</p>
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
      <h2 className="text-2xl font-bold text-[#00003D] dark:text-white mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="rounded-2xl backdrop-blur-xl bg-white/30 dark:bg-[#00003D]/40 border border-[#977DFF]/20 shadow-lg hover:shadow-2xl p-6"
          >
            <div className="flex items-start">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-[#00003D] dark:text-white mb-2">{action.title}</h3>
                <p className="text-[#0600AF] dark:text-[#FFCCF2] text-sm mb-4">{action.description}</p>
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
      <Card className="backdrop-blur-xl bg-white/30 dark:bg-[#00003D]/40 border border-[#977DFF]/20 shadow-xl hover:shadow-2xl rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#00003D] dark:text-white">📅 Recent Activity</h2>
            <Button variant="outline" size="sm" icon={Clock}>View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <Clock className="w-12 h-12 text-[#977DFF] mx-auto mb-4 animate-spin-slow" />
            <p className="text-[#0600AF] dark:text-[#FFCCF2]">Start creating content to see your recent activity here.</p>
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

