import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer
      className="relative z-0 w-full border-t border-white/20 shadow-lg overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x" />

      <div className="relative w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/40">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                SYRA.io
              </span>
            </div>
            <p className="text-gray-300 max-w-xl leading-relaxed">
              AI-powered marketing platform for{' '}
              <span className="text-blue-400 font-semibold">solo founders</span>,{' '}
              <span className="text-purple-400 font-semibold">startups</span>, and{' '}
              <span className="text-pink-400 font-semibold">content teams</span>.  
              Generate content, optimize SEO, and manage your strategy in one futuristic workspace.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/content', label: 'Content Generator' },
                { to: '/images', label: 'Image Generator' },
                { to: '/seo', label: 'SEO Tools' },
                { to: '/pricing', label: 'Pricing' },
              ].map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
              ].map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-purple-400 transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-white/20 mt-10 pt-6 text-center"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} <span className="font-semibold text-blue-400">SYRA.io</span>. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}