import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Handshake, ArrowRight, CheckCircle, Star, Zap, TrendingUp, Users, Globe, Mail, Sparkles, Building2, Award, Target } from 'lucide-react';

export default function Partners() {
  const [email, setEmail] = useState('');

  const partnerTypes = [
    {
      icon: Zap,
      title: 'Technology Partners',
      description: 'Integrate SYRA.io into your platform and offer AI-powered marketing to your customers.',
      benefits: ['API Access', 'Co-marketing opportunities', 'Technical support', 'Revenue sharing'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: 'Agency Partners',
      description: 'Supercharge your agency services with our AI marketing platform and white-label solutions.',
      benefits: ['White-label options', 'Client management tools', 'Priority support', 'Commission structure'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Referral Partners',
      description: 'Earn commissions by referring businesses to SYRA.io. Perfect for consultants and influencers.',
      benefits: ['30% recurring commission', 'Marketing materials', 'Performance dashboard', 'Fast payouts'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  const successStories = [
    { metric: '150%', label: 'Average Revenue Increase', icon: TrendingUp },
    { metric: '50+', label: 'Partner Integrations', icon: Zap },
    { metric: '$2M+', label: 'Partner Commissions Paid', icon: Award },
  ];

  const benefits = [
    { icon: Globe, title: 'Global Reach', description: 'Access to customers worldwide' },
    { icon: Target, title: 'Co-Marketing', description: 'Joint marketing initiatives' },
    { icon: Building2, title: 'Enterprise Ready', description: 'Solutions for large organizations' },
    { icon: Star, title: 'Premium Support', description: 'Dedicated partner success team' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5" />
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6"
          >
            <Handshake className="w-4 h-4" />
            Partner Program
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Partner With
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SYRA.io
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Join our partner ecosystem and grow your business with the power of AI marketing. Together, we can help businesses succeed.
          </p>
          <motion.a
            href="#apply"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
          >
            Become a Partner
            <ArrowRight className="w-5 h-5" />
          </motion.a>
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
          {successStories.map((story, index) => (
            <motion.div
              key={story.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <story.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {story.metric}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{story.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Partner Types */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Partnership Opportunities
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose the partnership model that works best for your business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {partnerTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 flex flex-col"
            >
              <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center`}>
                <type.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{type.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{type.description}</p>
              <ul className="space-y-3 mb-6">
                {type.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Partner With Us?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Benefits of joining the SYRA.io partner ecosystem
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div id="apply" className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Limited Spots Available
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Partner?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of partners already growing their business with SYRA.io. Apply now and our partnership team will get in touch within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email"
                className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </motion.button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            No commitment required. We'll review your application and schedule a call.
          </p>
        </motion.div>
      </div>

      {/* Testimonial */}
      <div className="max-w-4xl mx-auto px-6 py-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-6">
            "Partnering with SYRA.io has been transformative for our agency. The white-label solution and support team are exceptional. Our clients love the AI-powered results."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">JD</span>
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 dark:text-white">Jennifer Davis</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">CEO, Digital First Agency</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
