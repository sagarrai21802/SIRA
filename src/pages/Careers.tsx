import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, Users, Zap, Heart, Globe, ArrowRight, Mail, Sparkles } from 'lucide-react';

export default function Careers() {
  const [email, setEmail] = useState('');

  const benefits = [
    { icon: Globe, title: 'Remote First', description: 'Work from anywhere in the world' },
    { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health coverage' },
    { icon: Zap, title: 'Growth Budget', description: '$2,000 annual learning stipend' },
    { icon: Users, title: 'Team Retreats', description: 'Quarterly meetups worldwide' },
  ];

  const roles = [
    { title: 'Senior Full Stack Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time' },
    { title: 'AI Product Designer', department: 'Design', location: 'Remote', type: 'Full-time' },
    { title: 'Customer Success Manager', department: 'Customer Success', location: 'Remote', type: 'Full-time' },
    { title: 'Content Marketing Lead', department: 'Marketing', location: 'Remote', type: 'Full-time' },
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
            <Sparkles className="w-4 h-4" />
            We're Hiring
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Join the Future of
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Marketing
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Help us build the next generation of AI-powered marketing tools. We're looking for passionate individuals who want to make a difference.
          </p>
          <motion.a
            href="#roles"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
          >
            View Open Roles
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Work With Us?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We believe in creating an environment where you can do your best work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Open Roles Section */}
        <div id="roles" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find your perfect role and join our growing team
            </p>
          </motion.div>

          <div className="space-y-4">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {role.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {role.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {role.type}
                    </span>
                  </div>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Get Notified
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
