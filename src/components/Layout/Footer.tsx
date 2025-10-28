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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Brand section */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      SYRA.io
                    </span>
                    <p className="text-xs text-gray-400 font-medium">AI Marketing Platform</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-base leading-relaxed mb-4 max-w-md">
                  The future of content marketing is here. Create, optimize, and scale your content strategy with AI-powered tools designed for modern teams.
                </p>

                {/* Contact info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                    <Mail className="w-3 h-3" />
                    <span className="text-xs">hello@syra.io</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors">
                    <Phone className="w-3 h-3" />
                    <span className="text-xs">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 hover:text-pink-400 transition-colors">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">San Francisco, CA</span>
                  </div>
                </div>
              </div>

              {/* Links sections */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Product */}
                <div>
                  <h3 className="text-base font-semibold text-white mb-4 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-blue-400" />
                    Product
                  </h3>
                  <ul className="space-y-2">
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
                </div>

                {/* Company */}
                <div>
                  <h3 className="text-base font-semibold text-white mb-4 flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-purple-400" />
                    Company
                  </h3>
                  <ul className="space-y-2">
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
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-base font-semibold text-white mb-4 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-pink-400" />
                    Resources
                  </h3>
                  <ul className="space-y-2">
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
                </div>

                {/* Legal */}
                <div>
                  <h3 className="text-base font-semibold text-white mb-4 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-green-400" />
                    Legal
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { to: '/privacy', label: 'Privacy Policy' },
                      { to: '/terms', label: 'Terms of Service' },
                      { to: '/cookies', label: 'Cookie Policy' },
                      { to: '/gdpr', label: 'GDPR' },
                      { to: '/security', label: 'Security' },
                      { to: '/compliance', label: 'Compliance' },
                      { to: '/datadeletion', label: 'Data Deletion' },
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter section removed per request */}

        {/* Bottom section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} <span className="font-semibold text-blue-400">SYRA.io</span>. All rights reserved.
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-6">
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}