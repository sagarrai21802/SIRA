import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Download, ExternalLink, Image, FileText, Video, Mic, Calendar, Mail, ArrowRight, Copy, CheckCircle, Building2, TrendingUp, Users } from 'lucide-react';

export default function Press() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');

  const pressKitItems = [
    { icon: Image, title: 'Brand Assets', description: 'Logos, color palettes, and brand guidelines', size: '25 MB', format: 'ZIP' },
    { icon: FileText, title: 'Fact Sheet', description: 'Company overview and key statistics', size: '2 MB', format: 'PDF' },
    { icon: Newspaper, title: 'Press Releases', description: 'Latest news and announcements', size: '5 MB', format: 'PDF' },
    { icon: Video, title: 'Media Kit', description: 'Product videos and demo reels', size: '150 MB', format: 'ZIP' },
    { icon: Mic, title: 'Executive Bios', description: 'Leadership team bios and headshots', size: '8 MB', format: 'PDF' },
    { icon: Calendar, title: 'Event Calendar', description: 'Upcoming events and appearances', size: '1 MB', format: 'PDF' },
  ];

  const stats = [
    { value: '50K+', label: 'Active Users', icon: Users },
    { value: '$10M', label: 'Funding Raised', icon: TrendingUp },
    { value: '25+', label: 'Countries', icon: Building2 },
  ];

  const recentCoverage = [
    { publication: 'TechCrunch', title: 'SYRA.io Raises $10M to Revolutionize AI Marketing', date: 'Dec 15, 2025', link: '#' },
    { publication: 'Forbes', title: 'The Future of Content Creation is Here', date: 'Dec 10, 2025', link: '#' },
    { publication: 'Wired', title: 'How AI is Transforming Marketing Teams', date: 'Dec 5, 2025', link: '#' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('press@syra.io');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-6xl mx-auto px-6 py-20 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-6"
          >
            <Newspaper className="w-4 h-4" />
            Press Kit
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Media & Press
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Resources
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Everything you need to tell the SYRA.io story. Download our press kit, access brand assets, and get in touch with our media team.
          </p>

          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-full text-gray-900 dark:text-white hover:shadow-xl transition-all"
            >
              <Mail className="w-5 h-5" />
              press@syra.io
              {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
            <motion.a
              href="#press-kit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-colors"
            >
              Download Press Kit
              <Download className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Press Kit Downloads */}
      <div id="press-kit" className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Press Kit Downloads
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Official resources for media and press use
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pressKitItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 cursor-pointer group hover:shadow-2xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                  {item.format}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">{item.size}</span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400"
                >
                  <Download className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Coverage */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Coverage
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            SYRA.io in the news
          </p>
        </motion.div>

        <div className="space-y-4">
          {recentCoverage.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex-1">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1 block">
                  {article.publication}
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {article.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">{article.date}</span>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium"
              >
                Read Article
                <ExternalLink className="w-4 h-4" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Media Inquiries */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
              <p className="text-indigo-100 mb-6">
                Need additional information or want to schedule an interview? Our press team is here to help.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  press@syra.io
                  {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Subscribe to Press Releases</h3>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
