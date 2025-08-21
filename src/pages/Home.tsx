import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Target, BarChart3, Brain, Image, Users, Globe, Cpu, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';
import { Card, CardContent } from '../components/UI/Card';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { user } = useAuth();

  const features = [
    { icon: Brain, title: 'AI Content Generator', description: 'Generate high-quality blog posts, ads, emails, and social media content with advanced AI.' },
    { icon: Image, title: 'Image Creation', description: 'Create stunning visuals and graphics using DALL-E powered image generation.' },
    { icon: Target, title: 'SEO Optimization', description: 'Optimize your content for search engines with meta tags, descriptions, and keyword analysis.' },
  ];

  const scrollToAbout = () => {
    document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const testimonials = [
    { name: 'Amit Sharma', role: 'Startup Founder', feedback: 'SYRA.io transformed our content creation workflow! AI-generated content saved us hours each week.' },
    { name: 'Priya Verma', role: 'Marketing Manager', feedback: 'From SEO to social posts, everything is seamlessly integrated. Truly a one-stop marketing solution.' },
    { name: 'Rohit Singh', role: 'Freelancer', feedback: 'The AI-powered insights helped me optimize my campaigns and increase engagement by 30%.' },
  ];

  const faqs = [
    { question: 'Do I need technical skills to use SYRA.io?', answer: 'No, SYRA.io is designed for non-technical users. Our AI handles all the complex parts while you focus on creativity.' },
    { question: 'Can I customize AI-generated content?', answer: 'Yes! SYRA.io allows you to edit, tweak, and humanize AI-generated content before publishing.' },
    { question: 'Does SYRA.io support multiple languages?', answer: 'Absolutely! You can generate content in multiple languages and localize your campaigns easily.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -25, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 0.1 }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <motion.div className="text-center" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <motion.div className="flex items-center justify-center mb-6" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Sparkles className="w-10 h-10 text-white animate-spin-slow" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              AI-Powered Marketing
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <motion.p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
              SYRA.io empowers solo founders, startups, and content teams with intelligent marketing tools. Generate content, create images, optimize SEO, and manage campaigns—all in one place.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
              {user ? (
                <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:scale-105 transition-all duration-300" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:scale-105 transition-all duration-300" asChild>
                  <Link to="/signup">Get Started Free</Link>
                </Button>
              )}
              <Button variant="outline" size="lg" className="hover:scale-105 transition-all duration-300" onClick={scrollToAbout}>
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to scale your marketing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From content creation to performance tracking, SYRA.io provides all the tools you need to build and execute successful marketing campaigns.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                <Card hover className="text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                      <feature.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            What Our Users Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.2 }}>
                <p className="text-gray-700 dark:text-gray-300 mb-4">"{t.feedback}"</p>
                <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{t.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white flex justify-between items-center">
                    {faq.question}
                    <span className="ml-2 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}