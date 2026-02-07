import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Search, MessageCircle, Mail, Phone, Video, BookOpen, ChevronDown, ChevronUp, Zap, Shield, CreditCard, Users, Settings, ExternalLink } from 'lucide-react';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = [
    { icon: Zap, title: 'Getting Started', description: 'Learn the basics and set up your account', color: 'from-blue-500 to-cyan-500' },
    { icon: Shield, title: 'Security', description: 'Keep your account and data secure', color: 'from-green-500 to-emerald-500' },
    { icon: CreditCard, title: 'Billing', description: 'Manage payments and subscriptions', color: 'from-purple-500 to-pink-500' },
    { icon: Users, title: 'Team Management', description: 'Add users and manage permissions', color: 'from-orange-500 to-red-500' },
    { icon: Settings, title: 'Integrations', description: 'Connect with your favorite tools', color: 'from-indigo-500 to-purple-500' },
    { icon: BookOpen, title: 'API Docs', description: 'Technical documentation and guides', color: 'from-teal-500 to-blue-500' },
  ];

  const faqs = [
    {
      question: 'How do I get started with SYRA.io?',
      answer: 'Getting started is easy! Simply create an account, complete your profile setup, and you can begin creating AI-powered marketing content right away. Our onboarding wizard will guide you through the key features and help you create your first campaign.',
    },
    {
      question: 'What AI models does SYRA.io use?',
      answer: 'SYRA.io leverages state-of-the-art AI models including GPT-4, Claude, and our proprietary marketing-trained models. We continuously update our AI stack to provide you with the best possible content generation capabilities.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. If you cancel, you\'ll continue to have access until the end of your current billing period. We also offer a 30-day money-back guarantee for new subscribers.',
    },
    {
      question: 'How do I invite team members?',
      answer: 'To invite team members, go to Settings > Team Management and click "Invite Member." You can send invitations via email and set specific permissions for each team member. We support role-based access control for better security.',
    },
    {
      question: 'Is my data secure with SYRA.io?',
      answer: 'Absolutely! We take security seriously. All data is encrypted at rest and in transit using AES-256 encryption. We\'re SOC 2 Type II certified and GDPR compliant. Your content and data are never used to train our AI models without your explicit consent.',
    },
    {
      question: 'Do you offer custom enterprise solutions?',
      answer: 'Yes! We offer custom enterprise plans with dedicated support, SLA guarantees, custom AI model training, and advanced security features. Contact our sales team to discuss your specific requirements and get a personalized quote.',
    },
  ];

  const contactMethods = [
    { icon: MessageCircle, title: 'Live Chat', description: 'Get instant help from our team', action: 'Start Chat', color: 'blue' },
    { icon: Mail, title: 'Email Support', description: 'support@syra.io', action: 'Send Email', color: 'purple' },
    { icon: Phone, title: 'Phone', description: '+1 (555) 123-4567', action: 'Call Now', color: 'green' },
    { icon: Video, title: 'Video Call', description: 'Book a demo or training session', action: 'Schedule', color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-6 py-20 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            Help Center
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            How Can We
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Help You?
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Find answers, get support, and learn how to make the most of SYRA.io
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 cursor-pointer group hover:shadow-2xl transition-all"
            >
              <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{category.description}</p>
              <div className="mt-4 flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                Learn more
                <ExternalLink className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to know about SYRA.io
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Still Need Help?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our support team is here to assist you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 text-center cursor-pointer hover:shadow-2xl transition-all"
            >
              <div className={`w-14 h-14 mx-auto mb-4 bg-${method.color}-100 dark:bg-${method.color}-900/30 rounded-full flex items-center justify-center`}>
                <method.icon className={`w-7 h-7 text-${method.color}-600 dark:text-${method.color}-400`} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{method.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 bg-${method.color}-600 hover:bg-${method.color}-700 text-white text-sm font-medium rounded-full transition-colors`}
              >
                {method.action}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Status Banner */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <div>
              <h3 className="font-semibold">All Systems Operational</h3>
              <p className="text-sm text-green-100">Last updated: Just now</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
          >
            View Status Page
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
