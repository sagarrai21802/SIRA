import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Github,
  ArrowRight,
  Heart,
  Zap,
  Shield,
  Globe,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Top section */}
        <div className="border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Brand section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      SYRA.io
                    </span>
                    <p className="text-sm text-gray-400 font-medium">AI Marketing Platform</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                  The future of content marketing is here. Create, optimize, and scale your content strategy with AI-powered tools designed for modern teams.
                </p>

                {/* Contact info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">hello@syra.io</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-purple-400 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-pink-400 transition-colors">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                </div>
              </motion.div>

              {/* Links sections */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Product */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-400" />
                    Product
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { to: '/content-generator', label: 'Content Generator' },
                      { to: '/image-generation', label: 'AI Images' },
                      { to: '/seo-toolkit', label: 'SEO Tools' },
                      { to: '/scheduler', label: 'Content Scheduler' },
                      { to: '/analytics', label: 'Analytics' },
                      { to: '/pricing', label: 'Pricing' },
                    ].map((link, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Link
                          to={link.to}
                          className="text-gray-400 hover:text-blue-400 transition-all duration-200 flex items-center group"
                        >
                          <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Company */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-purple-400" />
                    Company
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { to: '/about', label: 'About Us' },
                      { to: '/careers', label: 'Careers' },
                      { to: '/blog', label: 'Blog' },
                      { to: '/contact', label: 'Contact' },
                      { to: '/press', label: 'Press Kit' },
                      { to: '/partners', label: 'Partners' },
                    ].map((link, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Link
                          to={link.to}
                          className="text-gray-400 hover:text-purple-400 transition-all duration-200 flex items-center group"
                        >
                          <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Resources */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-pink-400" />
                    Resources
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { to: '/help', label: 'Help Center' },
                      { to: '/docs', label: 'Documentation' },
                      { to: '/tutorials', label: 'Tutorials' },
                      { to: '/api', label: 'API Reference' },
                      { to: '/status', label: 'Status Page' },
                      { to: '/changelog', label: 'Changelog' },
                    ].map((link, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Link
                          to={link.to}
                          className="text-gray-400 hover:text-pink-400 transition-all duration-200 flex items-center group"
                        >
                          <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Legal */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-400" />
                    Legal
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { to: '/privacy', label: 'Privacy Policy' },
                      { to: '/terms', label: 'Terms of Service' },
                      { to: '/cookies', label: 'Cookie Policy' },
                      { to: '/gdpr', label: 'GDPR' },
                      { to: '/security', label: 'Security' },
                      { to: '/compliance', label: 'Compliance' },
                    ].map((link, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Link
                          to={link.to}
                          className="text-gray-400 hover:text-green-400 transition-all duration-200 flex items-center group"
                        >
                          <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay ahead of the curve
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Get the latest AI marketing insights, product updates, and exclusive content delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-blue-500/25"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-sm mb-4 md:mb-0"
            >
              © {new Date().getFullYear()} <span className="font-semibold text-blue-400">SYRA.io</span>. All rights reserved.
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-6"
            >
              <span className="text-gray-500 text-sm mr-4">Follow us:</span>
              {[
                { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
                { icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
                { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                { icon: Github, href: '#', color: 'hover:text-gray-300' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-gray-500 ${social.color} transition-all duration-200`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Made with love */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-6 pt-6 border-t border-gray-700/30"
          >
            <p className="text-gray-500 text-sm flex items-center justify-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" /> by the SYRA team
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}