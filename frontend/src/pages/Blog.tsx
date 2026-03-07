import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Tag, Calendar, User, Search, Bell, TrendingUp, Zap, Sparkles } from 'lucide-react';

export default function Blog() {
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'AI Marketing', count: 12, icon: Zap },
    { name: 'Content Creation', count: 8, icon: Sparkles },
    { name: 'Strategy', count: 6, icon: TrendingUp },
    { name: 'Tutorials', count: 15, icon: BookOpen },
  ];

  const featuredPosts = [
    {
      title: 'The Future of AI in Marketing: 2026 Predictions',
      excerpt: 'Explore how artificial intelligence is reshaping the marketing landscape and what trends to watch for in the coming year.',
      category: 'AI Marketing',
      readTime: '8 min read',
      date: 'Jan 15, 2026',
      author: 'Sarah Chen',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: '10 Ways to Supercharge Your Content with AI',
      excerpt: 'Learn practical strategies for integrating AI tools into your content creation workflow for maximum impact.',
      category: 'Content Creation',
      readTime: '6 min read',
      date: 'Jan 12, 2026',
      author: 'Marcus Johnson',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Building a Data-Driven Marketing Strategy',
      excerpt: 'Discover how to leverage analytics and AI insights to create more effective marketing campaigns.',
      category: 'Strategy',
      readTime: '10 min read',
      date: 'Jan 10, 2026',
      author: 'Emily Rodriguez',
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/5 dark:to-blue-500/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-6xl mx-auto px-6 py-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6"
            >
              <BookOpen className="w-4 h-4" />
              Blog Coming Soon
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Insights &
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay ahead of the curve with the latest trends, strategies, and insights in AI-powered marketing
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-2xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-xl p-6 text-center cursor-pointer hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} articles</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Featured Posts */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Articles</h2>
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                <BookOpen className="w-16 h-16 text-white/30" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{post.author}</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
            <Bell className="w-4 h-4" />
            Stay Updated
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Be the First to Know</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest articles, insights, and exclusive content delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </motion.button>
          </div>
          <p className="text-sm text-purple-200 mt-4">
            Join 5,000+ marketers getting weekly insights. No spam, unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
