

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


// import React, { useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   ArrowRight,
//   Sparkles,
//   Target,
//   Brain,
//   Image as ImageIcon,
//   BarChart3,
//   Users,
//   Globe,
//   Cpu,
//   Calendar,
//   Zap,
// } from 'lucide-react';
// import { motion, useMotionValue, useTransform } from 'framer-motion';
// import { Button } from '../components/UI/Button';
// import { Card, CardContent } from '../components/UI/Card';
// import { useAuth } from '../hooks/useAuth';

// /**
//  * SIRA / SYRA Home — premium redesign
//  * - BIG cinematic hero with parallax, animated gradient orbs, glass card, marquee
//  * - Bolder feature grid with tilt + micro-interactions
//  * - Product stripe (highlights) with animated counters
//  * - Demo block with shimmering skeleton preview
//  * - Social proof band + testimonials carousel-like hover
//  * - FAQ accordion retained
//  * - About section added (to support scrollToAbout)
//  *
//  * NOTE: Functionality kept intact: same routes, same auth-based CTA, same data
//  */

// export function Home() {
//   const { user } = useAuth();

//   const features = [
//     { icon: Brain, title: 'AI Content Generator', description: 'Generate high-quality blog posts, ads, emails, and social media content with advanced AI.' },
//     { icon: ImageIcon, title: 'Image Creation', description: 'Create stunning visuals and graphics using DALL-E powered image generation.' },
//     { icon: Target, title: 'SEO Optimization', description: 'Optimize your content for search engines with meta tags, descriptions, and keyword analysis.' },
//     // Bonus tiles (purely visual; non-breaking)
//     { icon: BarChart3, title: 'Analytics Pulse', description: 'Understand what works with real-time performance insights and trends.' },
//     { icon: Calendar, title: 'Smart Scheduler', description: 'Plan, auto-post, and never miss prime engagement windows.' },
//     { icon: Cpu, title: 'Humanizer Engine', description: 'Polish tone & style with our AI humanizer before publishing.' },
//   ];

//   const testimonials = [
//     { name: 'Amit Sharma', role: 'Startup Founder', feedback: 'SYRA.io transformed our content creation workflow! AI-generated content saved us hours each week.' },
//     { name: 'Priya Verma', role: 'Marketing Manager', feedback: 'From SEO to social posts, everything is seamlessly integrated. Truly a one-stop marketing solution.' },
//     { name: 'Rohit Singh', role: 'Freelancer', feedback: 'The AI-powered insights helped me optimize my campaigns and increase engagement by 30%.' },
//   ];

//   const faqs = [
//     { question: 'Do I need technical skills to use SYRA.io?', answer: 'No, SYRA.io is designed for non-technical users. Our AI handles all the complex parts while you focus on creativity.' },
//     { question: 'Can I customize AI-generated content?', answer: 'Yes! SYRA.io allows you to edit, tweak, and humanize AI-generated content before publishing.' },
//     { question: 'Does SYRA.io support multiple languages?', answer: 'Absolutely! You can generate content in multiple languages and localize your campaigns easily.' },
//   ];

//   const scrollToAbout = () => {
//     document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // Parallax magic for hero card
//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);
//   const rotateX = useTransform(my, [-200, 200], [10, -10]);
//   const rotateY = useTransform(mx, [-200, 200], [-10, 10]);

//   const handleMouseMove = (e) => {
//     const { clientX, clientY, currentTarget } = e;
//     const rect = currentTarget.getBoundingClientRect();
//     const x = clientX - rect.left - rect.width / 2;
//     const y = clientY - rect.top - rect.height / 2;
//     mx.set(x);
//     my.set(y);
//   };

//   const heroStats = useMemo(
//     () => [
//       { label: 'Creators', value: '12k+' },
//       { label: 'Campaigns', value: '95k+' },
//       { label: 'Avg. Uplift', value: '38%' },
//       { label: 'Countries', value: '40+' },
//     ],
//     []
//   );

//   const fadeInUp = {
//     initial: { opacity: 0, y: 40 },
//     whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
//     viewport: { once: true },
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-950">
//       {/* ===== HERO ===== */}
//       <section className="relative overflow-hidden">
//         {/* gradient clouds */}
//         <div className="absolute inset-0 -z-10">
//           <div className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-3xl" />
//           <div className="absolute -bottom-32 -right-32 h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-fuchsia-500/20 to-sky-500/20 blur-3xl" />
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.35),transparent_60%)]" />
//           {/* subtle noise */}
//           <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:radial-gradient(1px_1px_at_1px_1px,rgba(0,0,0,0.4)_1px,transparent_0)] [background-size:12px_12px]" />
//         </div>

//         {/* floating sparkle field */}
//         <div className="pointer-events-none absolute inset-0">
//           {[...Array(36)].map((_, i) => (
//             <motion.span
//               key={i}
//               className="absolute h-1.5 w-1.5 rounded-full bg-white/70 dark:bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.65)]"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: [0.1, 1, 0.1], y: [0, -25, 0] }}
//               transition={{ duration: 6, delay: i * 0.12, repeat: Infinity }}
//               style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
//             />
//           ))}
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-36 lg:pb-28">
//           <div className="grid lg:grid-cols-12 gap-10 items-center">
//             <div className="lg:col-span-6 text-center lg:text-left">
//               <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//                 <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/60 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur dark:bg-white/10 dark:text-gray-200">
//                   <Sparkles className="h-3.5 w-3.5" />
//                   <span>New: Humanizer Engine + Smart Scheduler</span>
//                 </div>
//                 <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1]">
//                   AI-Powered Marketing
//                   <span className="block bg-gradient-to-r from-blue-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
//                     Made Simple — At Scale
//                   </span>
//                 </h1>
//                 <p className="mt-6 text-lg sm:text-xl text-gray-700/90 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
//                   SYRA.io helps founders and teams ideate, create, and ship content faster. Generate words, images, SEO, and strategy—then publish with confidence.
//                 </p>

//                 <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                   {user ? (
//                     <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_8px_40px_rgba(99,102,241,0.45)] hover:scale-[1.03] transition-all">
//                       <Link to="/dashboard">Go to Dashboard</Link>
//                     </Button>
//                   ) : (
//                     <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_8px_40px_rgba(99,102,241,0.45)] hover:scale-[1.03] transition-all">
//                       <Link to="/signup">Get Started Free</Link>
//                     </Button>
//                   )}
//                   <Button variant="outline" size="lg" className="hover:scale-[1.03] hover:shadow-lg transition-all" onClick={scrollToAbout}>
//                     Learn More
//                   </Button>
//                 </div>

//                 {/* stats */}
//                 <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
//                   {heroStats.map((s, i) => (
//                     <motion.div
//                       key={s.label}
//                       className="rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/60 dark:bg-white/[0.06] backdrop-blur p-4 text-center"
//                       initial={{ opacity: 0, y: 24 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.1 * i, duration: 0.5 }}
//                     >
//                       <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{s.value}</div>
//                       <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{s.label}</div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>

//             {/* Parallax Glass Panel */}
//             <div className="lg:col-span-6">
//               <motion.div
//                 onMouseMove={handleMouseMove}
//                 style={{ rotateX, rotateY }}
//                 className="relative h-[420px] sm:h-[520px] lg:h-[560px] rounded-3xl border border-white/20 bg-white/40 dark:bg-white/[0.06] backdrop-blur-xl shadow-2xl overflow-hidden"
//               >
//                 {/* grid + glow */}
//                 <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />
//                 <motion.div
//                   className="absolute -inset-24 bg-gradient-to-tr from-blue-600/20 via-fuchsia-500/20 to-purple-600/20"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
//                 />

//                 {/* pseudo-preview tiles */}
//                 <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-4">
//                   <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
//                     <Zap className="h-5 w-5" />
//                     <span className="text-sm font-medium">Live Preview</span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     {[1, 2, 3, 4].map((i) => (
//                       <motion.div
//                         key={i}
//                         whileHover={{ scale: 1.03 }}
//                         className="rounded-2xl border border-white/30 bg-white/70 dark:bg-white/[0.08] p-4 backdrop-blur"
//                       >
//                         <div className="h-24 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 animate-pulse" />
//                         <div className="mt-3 h-2 w-3/5 rounded bg-gray-300/70 dark:bg-white/10" />
//                         <div className="mt-2 h-2 w-4/5 rounded bg-gray-300/60 dark:bg-white/10" />
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* action row */}
//                   <div className="mt-2 flex items-center gap-3">
//                     <div className="h-10 w-24 rounded-lg bg-blue-600/90 dark:bg-blue-500/90" />
//                     <div className="h-10 w-10 rounded-lg bg-purple-600/90" />
//                     <div className="h-10 flex-1 rounded-lg bg-gradient-to-r from-blue-500/80 to-purple-600/80" />
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           {/* marquee */}
//           <div className="mt-14 overflow-hidden">
//             <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-600/80 dark:text-gray-300/70 mb-3">
//               <Users className="h-4 w-4" /> Trusted by creators worldwide
//             </div>
//             <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
//               <motion.div
//                 className="flex gap-12 whitespace-nowrap text-gray-700 dark:text-gray-300"
//                 animate={{ x: ['0%', '-50%'] }}
//                 transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
//               >
//                 {Array.from({ length: 16 }).map((_, i) => (
//                   <div key={i} className="flex items-center gap-2 text-sm">
//                     <Globe className="h-4 w-4" />
//                     <span>Launch. Iterate. Grow.</span>
//                   </div>
//                 ))}
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== FEATURES ===== */}
//       <section className="relative py-20 bg-white dark:bg-gray-950">
//         <div className="pointer-events-none absolute inset-0 -z-10">
//           <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-2xl" />
//           <div className="absolute bottom-10 right-20 h-72 w-72 rounded-full bg-purple-500/10 blur-2xl" />
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div {...fadeInUp} className="text-center mb-14">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
//               Everything you need to scale your marketing
//             </h2>
//             <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               From ideation to analytics, SYRA.io is your full-stack content engine.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.06 }}
//                 viewport={{ once: true }}
//               >
//                 <Card hover className="group relative overflow-hidden rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-white/[0.05] backdrop-blur-xl shadow-xl">
//                   <CardContent className="p-7">
//                     <div className="flex items-center justify-between">
//                       <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center shadow">
//                         <feature.icon className="h-7 w-7 text-blue-600" />
//                       </div>
//                       <motion.div
//                         className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 opacity-70"
//                         animate={{ scale: [1, 1.15, 1] }}
//                         transition={{ duration: 2.4, repeat: Infinity }}
//                       />
//                     </div>
//                     <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
//                     <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
//                     <div className="mt-6 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
//                       <span>Explore</span>
//                       <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//                     </div>
//                     {/* glow on hover */}
//                     <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-600/10 via-fuchsia-600/10 to-purple-600/10" />
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== PRODUCT STRIPE / VALUE ===== */}
//       <section className="relative py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: BarChart3,
//                 title: 'Performance-first',
//                 body: 'Track CTR, conversions, and sentiment. Double-down on what moves the needle.',
//               },
//               {
//                 icon: Users,
//                 title: 'Team-ready',
//                 body: 'Workspace roles, comments, and shareable briefs keep everyone in sync.',
//               },
//               {
//                 icon: Globe,
//                 title: 'Multi-language',
//                 body: 'Localize copy with cultural nuance across 40+ locales in seconds.',
//               },
//             ].map((b, i) => (
//               <motion.div
//                 key={b.title}
//                 className="rounded-3xl border border-gray-200/60 dark:border-white/10 bg-gradient-to-br from-white to-white/70 dark:from-white/[0.06] dark:to-white/[0.03] p-6 shadow-xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: i * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="flex items-center gap-3">
//                   <b.icon className="h-6 w-6 text-blue-600" />
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{b.title}</h3>
//                 </div>
//                 <p className="mt-2 text-gray-600 dark:text-gray-300">{b.body}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== DEMO / PREVIEW BLOCK ===== */}
//       <section className="relative py-20 bg-gray-50 dark:bg-gray-900">
//         <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
//           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div {...fadeInUp} className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Create. Humanize. Ship.</h2>
//             <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               Draft a blog, transform tone, auto-generate images, and schedule in minutes—not hours.
//             </p>
//           </motion.div>

//           <div className="grid lg:grid-cols-2 gap-8 items-center">
//             <motion.div
//               className="rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-white/[0.06] p-6 shadow-xl backdrop-blur"
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//               viewport={{ once: true }}
//             >
//               {/* faux editor */}
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
//                 <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" />
//                 <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
//               </div>
//               <div className="mt-4 h-56 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 animate-pulse" />
//               <div className="mt-4 grid grid-cols-3 gap-3">
//                 <div className="h-10 rounded-xl bg-blue-600/80" />
//                 <div className="h-10 rounded-xl bg-purple-600/80" />
//                 <div className="h-10 rounded-xl bg-fuchsia-600/80" />
//               </div>
//             </motion.div>

//             <motion.div
//               className="space-y-6"
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               viewport={{ once: true }}
//             >
//               {[
//                 { icon: Brain, title: 'Draft with AI', copy: 'Brief your idea and get on-brand long-form content in seconds.' },
//                 { icon: ImageIcon, title: 'Auto-generate visuals', copy: 'Turn concepts into scroll-stopping graphics and post art.' },
//                 { icon: Target, title: 'SEO & meta polish', copy: 'Meta tags, schema, and keywords dialed in for discoverability.' },
//                 { icon: Calendar, title: 'Schedule & publish', copy: 'Queue multi-platform posts with best-time recommendations.' },
//               ].map((row, i) => (
//                 <div key={row.title} className="flex gap-4">
//                   <div className="h-12 w-12 shrink-0 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
//                     <row.icon className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{row.title}</h4>
//                     <p className="text-gray-600 dark:text-gray-300">{row.copy}</p>
//                   </div>
//                 </div>
//               ))}

//               <div className="pt-2">
//                 {user ? (
//                   <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                     <Link to="/dashboard">Build your next post</Link>
//                   </Button>
//                 ) : (
//                   <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                     <Link to="/signup">Start free — no card</Link>
//                   </Button>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ===== TESTIMONIALS ===== */}
//       <section className="py-20 bg-white dark:bg-gray-950">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-12" {...fadeInUp}>
//             What Our Users Say
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((t, idx) => (
//               <motion.div
//                 key={idx}
//                 className="relative bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200/60 dark:border-white/10 shadow-xl text-left"
//                 initial={{ opacity: 0, y: 24 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: idx * 0.12 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -6 }}
//               >
//                 <div className="absolute -top-3 left-6 h-6 w-6 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600" />
//                 <p className="text-gray-700 dark:text-gray-300 mb-4 italic">“{t.feedback}”</p>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
//                     <span className="text-gray-500 dark:text-gray-400 text-sm">{t.role}</span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== FAQ ===== */}
//       <section className="py-20 bg-gray-50 dark:bg-gray-900">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center" {...fadeInUp}>
//             Frequently Asked Questions
//           </motion.h2>
//           <div className="space-y-4">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 16 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.45, delay: idx * 0.08 }}
//                 viewport={{ once: true }}
//                 className="border border-gray-200/70 dark:border-white/10 rounded-2xl bg-white/70 dark:bg-white/[0.05] backdrop-blur p-4"
//               >
//                 <details className="group">
//                   <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white flex justify-between items-center">
//                     {faq.question}
//                     <span className="ml-2 transition-transform group-open:rotate-45">+</span>
//                   </summary>
//                   <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</p>
//                 </details>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== ABOUT (for scroll link) ===== */}
//       <section id="about-section" className="py-24 bg-white dark:bg-gray-950">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-10 items-center">
//             <motion.div {...fadeInUp}>
//               <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">Why SYRA.io?</h3>
//               <p className="mt-4 text-gray-700 dark:text-gray-300">
//                 Because speed wins. Ship more content, test more ideas, and learn faster than your competitors—without sacrificing quality or brand voice.
//               </p>
//               <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
//                 <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" /> Human-grade copy with AI assist</li>
//                 <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" /> Workflow from ideation → publish</li>
//                 <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" /> Built for solo founders & teams</li>
//               </ul>
//               <div className="mt-8">
//                 {user ? (
//                   <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                     <Link to="/dashboard">Open Dashboard</Link>
//                   </Button>
//                 ) : (
//                   <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                     <Link to="/signup">Create your account</Link>
//                   </Button>
//                 )}
//               </div>
//             </motion.div>

//             <motion.div
//               className="rounded-3xl border border-gray-200/60 dark:border-white/10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 p-8 shadow-xl"
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <div className="grid grid-cols-2 gap-4">
//                 {[...Array(6)].map((_, i) => (
//                   <div key={i} className="h-28 rounded-2xl bg-white/70 dark:bg-white/[0.06] backdrop-blur border border-gray-200/60 dark:border-white/10" />
//                 ))}
//               </div>
//               <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
//                 Preview cards show how your assets look across channels. Drag-and-drop builders and presets keep you in flow.
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ===== FOOTER STRIPE ===== */}
//       <footer className="py-12 border-t border-gray-200/70 dark:border-white/10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
//             <Sparkles className="h-5 w-5" />
//             <span className="font-medium">SYRA.io</span>
//           </div>
//           <div className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} SYRA — All rights reserved.</div>
//           <div className="flex gap-4 text-sm">
//             <Link to="/privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Privacy</Link>
//             <Link to="/terms" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Terms</Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   ArrowRight,
//   Sparkles,
//   Target,
//   Brain,
//   Image as ImageIcon,
//   BarChart3,
//   Users,
//   Globe,
//   Cpu,
//   Calendar,
//   Zap,
// } from 'lucide-react';
// import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
// import { Button } from '../components/UI/Button';
// import { Card, CardContent } from '../components/UI/Card';
// import { useAuth } from '../hooks/useAuth';

// /**
//  * SIRA / SYRA Home — CINEMATIC EDITION
//  * - Layered parallax hero (scroll + pointer reactive)
//  * - Cursor spotlight & glass blur tracking
//  * - Animated gradient blobs + starfield artifacts + noise
//  * - Feature grid with tilt + glow sweep + pop tap
//  * - Product stripe with subtle morphing backgrounds
//  * - Live "AI editor" demo with typewriter effect
//  * - Draggable testimonials carousel with snap
//  * - Glossy FAQ with spring height & halo-on-open
//  * - Footer stripe w/ live year (unchanged)
//  *
//  * Notes:
//  * - No new packages. Uses Tailwind + Framer Motion + lucide-react.
//  * - Preserves routes, auth-based CTAs, copy, and structure.
//  */

// export function Home() {
//   const { user } = useAuth();

//   // ===== Data =====
//   const features = [
//     { icon: Brain, title: 'AI Content Generator', description: 'Generate high-quality blog posts, ads, emails, and social media content with advanced AI.' },
//     { icon: ImageIcon, title: 'Image Creation', description: 'Create stunning visuals and graphics using DALL-E powered image generation.' },
//     { icon: Target, title: 'SEO Optimization', description: 'Optimize your content for search engines with meta tags, descriptions, and keyword analysis.' },
//     { icon: BarChart3, title: 'Analytics Pulse', description: 'Understand what works with real-time performance insights and trends.' },
//     { icon: Calendar, title: 'Smart Scheduler', description: 'Plan, auto-post, and never miss prime engagement windows.' },
//     { icon: Cpu, title: 'Humanizer Engine', description: 'Polish tone & style with our AI humanizer before publishing.' },
//   ];

//   const testimonials = [
//     { name: 'Amit Sharma', role: 'Startup Founder', feedback: 'SYRA.io transformed our content creation workflow! AI-generated content saved us hours each week.' },
//     { name: 'Priya Verma', role: 'Marketing Manager', feedback: 'From SEO to social posts, everything is seamlessly integrated. Truly a one-stop marketing solution.' },
//     { name: 'Rohit Singh', role: 'Freelancer', feedback: 'The AI-powered insights helped me optimize my campaigns and increase engagement by 30%.' },
//     { name: 'Elena Gupta', role: 'Brand Consultant', feedback: 'The humanizer keeps copy on-tone across channels. Clients noticed the uplift immediately.' },
//     { name: 'Karan Mehta', role: 'Growth Lead', feedback: 'Scheduler + SEO polish = chef’s kiss. Our cadence finally feels effortless.' },
//   ];

//   const faqs = [
//     { question: 'Do I need technical skills to use SYRA.io?', answer: 'No, SYRA.io is designed for non-technical users. Our AI handles all the complex parts while you focus on creativity.' },
//     { question: 'Can I customize AI-generated content?', answer: 'Yes! SYRA.io allows you to edit, tweak, and humanize AI-generated content before publishing.' },
//     { question: 'Does SYRA.io support multiple languages?', answer: 'Absolutely! You can generate content in multiple languages and localize your campaigns easily.' },
//   ];

//   const heroStats = useMemo(
//     () => [
//       { label: 'Creators', value: '12k+' },
//       { label: 'Campaigns', value: '95k+' },
//       { label: 'Avg. Uplift', value: '38%' },
//       { label: 'Countries', value: '40+' },
//     ],
//     []
//   );

//   // ===== Motion Utils =====
//   // Parallax by scroll
//   const { scrollY } = useScroll();
//   const parallaxSlow = useTransform(scrollY, [0, 600], [0, -60]);
//   const parallaxMed = useTransform(scrollY, [0, 600], [0, -120]);
//   const parallaxFast = useTransform(scrollY, [0, 600], [0, -200]);

//   // Pointer parallax for hero card
//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);
//   const smoothedX = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.5 });
//   const smoothedY = useSpring(my, { stiffness: 120, damping: 20, mass: 0.5 });
//   const rotateX = useTransform(smoothedY, [-200, 200], [10, -10]);
//   const rotateY = useTransform(smoothedX, [-200, 200], [-10, 10]);

//   const handleMouseMove = (e) => {
//     const { clientX, clientY, currentTarget } = e;
//     const rect = currentTarget.getBoundingClientRect();
//     const x = clientX - rect.left - rect.width / 2;
//     const y = clientY - rect.top - rect.height / 2;
//     mx.set(x);
//     my.set(y);
//   };

//   // Cursor spotlight state
//   const [cursor, setCursor] = useState({ x: -9999, y: -9999 });
//   useEffect(() => {
//     const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
//     window.addEventListener('pointermove', move);
//     return () => window.removeEventListener('pointermove', move);
//   }, []);

//   // Typewriter demo
//   const demoLines = [
//     'Title: 5 Ways to Humanize Your Brand Voice in 2025',
//     'Intro: Consumers crave authenticity — not robotic marketing jargon.',
//     'Body: Start with intent, add story beats, keep sentences short. Use active voice.',
//     'CTA: Ship your next post with SYRA and learn faster than your competition.',
//   ];
//   const [typed, setTyped] = useState('');
//   const [lineIdx, setLineIdx] = useState(0);
//   const [charIdx, setCharIdx] = useState(0);
//   useEffect(() => {
//     const line = demoLines[lineIdx] ?? '';
//     const done = lineIdx >= demoLines.length;
//     if (done) return;
//     const t = setTimeout(() => {
//       setTyped(line.slice(0, charIdx + 1));
//       if (charIdx + 1 === line.length) {
//         // pause then go next line
//         setTimeout(() => {
//           setLineIdx((i) => i + 1);
//           setCharIdx(0);
//           setTyped('');
//         }, 600);
//       } else {
//         setCharIdx((c) => c + 1);
//       }
//     }, 18 + Math.random() * 40);
//     return () => clearTimeout(t);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [charIdx, lineIdx]);

//   // marquee items
//   const marqueePhrases = useMemo(() => Array.from({ length: 24 }).map(() => 'Launch. Iterate. Grow.'), []);

//   // scroll to about
//   const scrollToAbout = () => {
//     document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // Variants/helpers
//   const fadeInUp = {
//     initial: { opacity: 0, y: 40 },
//     whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
//     viewport: { once: true },
//   };

//   // drag carousel refs
//   const carouselRef = useRef(null);
//   const [dragWidth, setDragWidth] = useState(0);
//   useEffect(() => {
//     const el = carouselRef.current;
//     if (!el) return;
//     const update = () => {
//       const contentWidth = el.scrollWidth;
//       const viewportWidth = el.clientWidth;
//       setDragWidth(contentWidth - viewportWidth);
//     };
//     update();
//     const ro = new ResizeObserver(update);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-950 relative overflow-hidden">
//       {/* ===== GLOBAL ARTIFACTS ===== */}
//       {/* Cursor spotlight */}
//       <div
//         className="pointer-events-none fixed inset-0 z-[5]"
//         style={{
//           background: `radial-gradient(450px 450px at ${cursor.x}px ${cursor.y}px, rgba(99,102,241,0.18), transparent 60%)`,
//         }}
//       />
//       {/* Soft noise texture */}
//       <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:radial-gradient(1px_1px_at_1px_1px,rgba(0,0,0,0.6)_1px,transparent_0)] [background-size:12px_12px]" />
//       {/* slow starfield */}
//       <motion.div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 -z-10"
//         style={{ y: parallaxSlow }}
//       >
//         {[...Array(42)].map((_, i) => (
//           <motion.span
//             key={i}
//             className="absolute h-1.5 w-1.5 rounded-full bg-black/5 dark:bg-white/70 shadow-[0_0_14px_rgba(255,255,255,0.4)]"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: [0.15, 1, 0.15], y: [0, -30, 0] }}
//             transition={{ duration: 7, delay: i * 0.1, repeat: Infinity }}
//             style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
//           />
//         ))}
//       </motion.div>

//       {/* ===== HERO ===== */}
//       <section className="relative overflow-hidden">
//         {/* Gradient Clouds & Morphing Blobs */}
//         <motion.div className="absolute inset-0 -z-10" style={{ y: parallaxMed }}>
//           <motion.div
//             className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-[40%] bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-3xl"
//             animate={{ borderRadius: ['40%', '60%', '40%'] }}
//             transition={{ duration: 14, repeat: Infinity }}
//           />
//           <motion.div
//             className="absolute -bottom-32 -right-32 h-[42rem] w-[42rem] rounded-[45%] bg-gradient-to-tr from-fuchsia-500/20 to-sky-500/20 blur-3xl"
//             animate={{ borderRadius: ['45%', '65%', '45%'] }}
//             transition={{ duration: 16, repeat: Infinity }}
//           />
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.35),transparent_60%)]" />
//         </motion.div>

//         {/* Subtle grid */}
//         <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-18 lg:pt-36 lg:pb-28">
//           <div className="grid lg:grid-cols-12 gap-10 items-center">
//             <div className="lg:col-span-6 text-center lg:text-left">
//               <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//                 <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/60 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur dark:bg-white/10 dark:text-gray-200">
//                   <Sparkles className="h-3.5 w-3.5" />
//                   <span>New: Humanizer Engine + Smart Scheduler</span>
//                 </div>

//                 {/* Cinematic Title */}
//                 <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1]">
//                   <span className="relative inline-block">
//                     <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-indigo-400/40 via-fuchsia-400/40 to-purple-400/40 rounded-xl" />
//                     <span className="relative">AI-Powered Marketing</span>
//                   </span>
//                   <span className="block bg-gradient-to-r from-blue-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent animate-[hue_10s_linear_infinite]">
//                     Made Simple — At Scale
//                   </span>
//                 </h1>

//                 <p className="mt-6 text-lg sm:text-xl text-gray-700/90 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
//                   SYRA.io helps founders and teams ideate, create, and ship content faster. Generate words, images, SEO, and strategy—then publish with confidence.
//                 </p>

//                 <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                   {user ? (
//                     <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_8px_40px_rgba(99,102,241,0.45)] hover:scale-[1.03] transition-all">
//                       <Link to="/dashboard">Go to Dashboard</Link>
//                     </Button>
//                   ) : (
//                     <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_8px_40px_rgba(99,102,241,0.45)] hover:scale-[1.03] transition-all">
//                       <Link to="/signup">Get Started Free</Link>
//                     </Button>
//                   )}
//                   <Button variant="outline" size="lg" className="hover:scale-[1.03] hover:shadow-lg transition-all" onClick={scrollToAbout}>
//                     Learn More
//                   </Button>
//                 </div>

//                 {/* Stats */}
//                 <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
//                   {heroStats.map((s, i) => (
//                     <motion.div
//                       key={s.label}
//                       className="rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/60 dark:bg-white/[0.06] backdrop-blur p-4 text-center relative overflow-hidden"
//                       initial={{ opacity: 0, y: 24 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.1 * i, duration: 0.5 }}
//                     >
//                       {/* sweep */}
//                       <motion.span
//                         className="pointer-events-none absolute -left-10 top-0 h-full w-10 bg-white/20"
//                         animate={{ x: ['0%', '140%'] }}
//                         transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
//                       />
//                       <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{s.value}</div>
//                       <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{s.label}</div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>

//             {/* Parallax Glass Panel */}
//             <div className="lg:col-span-6">
//               <motion.div
//                 onMouseMove={handleMouseMove}
//                 style={{ rotateX, rotateY, y: parallaxFast }}
//                 className="relative h-[420px] sm:h-[520px] lg:h-[560px] rounded-3xl border border-white/20 bg-white/40 dark:bg-white/[0.06] backdrop-blur-xl shadow-2xl overflow-hidden"
//               >
//                 {/* grid + glow */}
//                 <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />
//                 <motion.div
//                   className="absolute -inset-24 bg-gradient-to-tr from-blue-600/20 via-fuchsia-500/20 to-purple-600/20"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
//                 />

//                 {/* pseudo-preview tiles */}
//                 <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-4">
//                   <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
//                     <Zap className="h-5 w-5" />
//                     <span className="text-sm font-medium">Live Preview</span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     {[1, 2, 3, 4].map((i) => (
//                       <motion.div
//                         key={i}
//                         whileHover={{ scale: 1.03 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="group relative rounded-2xl border border-white/30 bg-white/70 dark:bg-white/[0.08] p-4 backdrop-blur overflow-hidden"
//                       >
//                         {/* glow sweep */}
//                         <motion.div
//                           className="pointer-events-none absolute -left-10 top-0 h-full w-10 bg-white/25"
//                           animate={{ x: ['0%', '130%'] }}
//                           transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
//                         />
//                         <div className="h-24 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 animate-pulse" />
//                         <div className="mt-3 h-2 w-3/5 rounded bg-gray-300/70 dark:bg-white/10" />
//                         <div className="mt-2 h-2 w-4/5 rounded bg-gray-300/60 dark:bg-white/10" />
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* action row */}
//                   <div className="mt-2 flex items-center gap-3">
//                     <div className="h-10 w-24 rounded-lg bg-blue-600/90 dark:bg-blue-500/90" />
//                     <div className="h-10 w-10 rounded-lg bg-purple-600/90" />
//                     <div className="h-10 flex-1 rounded-lg bg-gradient-to-r from-blue-500/80 to-purple-600/80" />
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           {/* marquee */}
//           <div className="mt-14 overflow-hidden">
//             <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-600/80 dark:text-gray-300/70 mb-3">
//               <Users className="h-4 w-4" /> Trusted by creators worldwide
//             </div>
//             <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
//               <motion.div
//                 className="flex gap-12 whitespace-nowrap text-gray-700 dark:text-gray-300"
//                 animate={{ x: ['0%', '-50%'] }}
//                 transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
//               >
//                 {marqueePhrases.map((txt, i) => (
//                   <div key={i} className="flex items-center gap-2 text-sm">
//                     <Globe className="h-4 w-4" />
//                     <span>{txt}</span>
//                   </div>
//                 ))}
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== FEATURES ===== */}
//       <section className="relative py-20 bg-white dark:bg-gray-950">
//         <div className="pointer-events-none absolute inset-0 -z-10">
//           <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-2xl" />
//           <div className="absolute bottom-10 right-20 h-72 w-72 rounded-full bg-purple-500/10 blur-2xl" />
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div {...fadeInUp} className="text-center mb-14">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
//               Everything you need to scale your marketing
//             </h2>
//             <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               From ideation to analytics, SYRA.io is your full-stack content engine.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.06 }}
//                 viewport={{ once: true }}
//               >
//                 <Card hover className="group relative overflow-hidden rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-white/[0.05] backdrop-blur-xl shadow-xl">
//                   {/* diagonal glow sweep */}
//                   <motion.div
//                     className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rotate-45 rounded-3xl bg-gradient-to-tr from-white/10 to-white/0"
//                     whileHover={{ x: 260, y: 260 }}
//                     transition={{ type: 'spring', stiffness: 60, damping: 12 }}
//                   />
//                   <CardContent className="p-7">
//                     <div className="flex items-center justify-between">
//                       <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center shadow">
//                         <feature.icon className="h-7 w-7 text-blue-600" />
//                       </div>
//                       <motion.div
//                         className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 opacity-70"
//                         animate={{ scale: [1, 1.15, 1] }}
//                         transition={{ duration: 2.4, repeat: Infinity }}
//                       />
//                     </div>
//                     <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
//                     <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
//                     <motion.div
//                       className="mt-6 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400"
//                       whileTap={{ scale: 0.96 }}
//                     >
//                       <span>Explore</span>
//                       <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//                     </motion.div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== PRODUCT STRIPE / VALUE ===== */}
//       <section className="relative py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: BarChart3,
//                 title: 'Performance-first',
//                 body: 'Track CTR, conversions, and sentiment. Double-down on what moves the needle.',
//               },
//               {
//                 icon: Users,
//                 title: 'Team-ready',
//                 body: 'Workspace roles, comments, and shareable briefs keep everyone in sync.',
//               },
//               {
//                 icon: Globe,
//                 title: 'Multi-language',
//                 body: 'Localize copy with cultural nuance across 40+ locales in seconds.',
//               },
//             ].map((b, i) => (
//               <motion.div
//                 key={b.title}
//                 className="relative overflow-hidden rounded-3xl border border-gray-200/60 dark:border-white/10 bg-gradient-to-br from-white to-white/70 dark:from-white/[0.06] dark:to-white/[0.03] p-6 shadow-xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: i * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 {/* morphing halo */}
//                 <motion.div
//                   className="pointer-events-none absolute -z-10 -inset-10 bg-gradient-to-tr from-blue-500/10 via-fuchsia-500/10 to-purple-500/10 blur-2xl"
//                   animate={{ rotate: [0, 30, 0], scale: [1, 1.06, 1] }}
//                   transition={{ duration: 10, repeat: Infinity }}
//                 />
//                 <div className="flex items-center gap-3">
//                   <b.icon className="h-6 w-6 text-blue-600" />
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{b.title}</h3>
//                 </div>
//                 <p className="mt-2 text-gray-600 dark:text-gray-300">{b.body}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== DEMO / PREVIEW BLOCK (Typewriter) ===== */}
//       <section className="relative py-20 bg-gray-50 dark:bg-gray-900">
//         <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
//           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div {...fadeInUp} className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Create. Humanize. Ship.</h2>
//             <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               Draft a blog, transform tone, auto-generate images, and schedule in minutes—not hours.
//             </p>
//           </motion.div>

//           <div className="grid lg:grid-cols-2 gap-8 items-center">
//             <motion.div
//               className="rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-white/[0.06] p-6 shadow-xl backdrop-blur relative overflow-hidden"
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//               viewport={{ once: true }}
//             >
//               {/* faux editor header */}
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
//                 <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" />
//                 <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
//                 <span className="ml-2 text-gray-400">/editor/post.md</span>
//               </div>

//               {/* typing area */}
//               <div className="mt-4 h-56 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-4 font-mono text-sm overflow-hidden relative">
//                 <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-100">{typed}</pre>
//                 <motion.span
//                   className="inline-block h-5 w-1 align-middle bg-blue-600"
//                   animate={{ opacity: [0, 1, 0] }}
//                   transition={{ duration: 1.0, repeat: Infinity }}
//                 />
//                 {/* shimmering line numbers */}
//                 <div className="absolute top-4 left-2 text-[10px] text-gray-400/70 select-none">
//                   {Array.from({ length: 10 }).map((_, i) => (
//                     <div key={i}>{i + 1}</div>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-4 grid grid-cols-3 gap-3">
//                 <div className="h-10 rounded-xl bg-blue-600/80" />
//                 <div className="h-10 rounded-xl bg-purple-600/80" />
//                 <div className="h-10 rounded-xl bg-fuchsia-600/80" />
//               </div>
//             </motion.div>

//             <motion.div
//               className="space-y-6"
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               viewport={{ once: true }}
//             >
//               {[
//                 { icon: Brain, title: 'Draft with AI', copy: 'Brief your idea and get on-brand long-form content in seconds.' },
//                 { icon: ImageIcon, title: 'Auto-generate visuals', copy: 'Turn concepts into scroll-stopping graphics and post art.' },
//                 { icon: Target, title: 'SEO & meta polish', copy: 'Meta tags, schema, and keywords dialed in for discoverability.' },
//                 { icon: Calendar, title: 'Schedule & publish', copy: 'Queue multi-platform posts with best-time recommendations.' },
//               ].map((row, i) => (
//                 <div key={row.title} className="flex gap-4">
//                   <div className="h-12 w-12 shrink-0 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
//                     <row.icon className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{row.title}</h4>
//                     <p className="text-gray-600 dark:text-gray-300">{row.copy}</p>
//                   </div>
//                 </div>
//               ))}

//               <div className="pt-2">
//                 {user ? (
//                   <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                     <Link to="/dashboard">Build your next post</Link>
//                   </Button>
//                 ) : (
//                   <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                     <Link to="/signup">Start free — no card</Link>
//                   </Button>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ===== TESTIMONIALS — DRAGGABLE CAROUSEL ===== */}
//       <section className="py-20 bg-white dark:bg-gray-950">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center" {...fadeInUp}>
//             What Our Users Say
//           </motion.h2>

//           <div ref={carouselRef} className="overflow-hidden">
//             <motion.div
//               drag="x"
//               dragConstraints={{ left: -dragWidth, right: 0 }}
//               className="flex gap-6 cursor-grab active:cursor-grabbing"
//             >
//               {testimonials.map((t, idx) => (
//                 <motion.div
//                   key={idx}
//                   className="min-w-[320px] md:min-w-[360px] relative bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200/60 dark:border-white/10 shadow-xl"
//                   whileHover={{ y: -6 }}
//                 >
//                   <div className="absolute -top-3 left-6 h-6 w-6 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600" />
//                   <p className="text-gray-700 dark:text-gray-300 mb-4 italic">“{t.feedback}”</p>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
//                       <span className="text-gray-500 dark:text-gray-400 text-sm">{t.role}</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ===== FAQ ===== */}
//       <section className="py-20 bg-gray-50 dark:bg-gray-900">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center" {...fadeInUp}>
//             Frequently Asked Questions
//           </motion.h2>
//           <div className="space-y-4">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 16 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.45, delay: idx * 0.08 }}
//                 viewport={{ once: true }}
//                 className="relative border border-gray-200/70 dark:border-white/10 rounded-2xl bg-white/70 dark:bg-white/[0.05] backdrop-blur p-4 overflow-hidden"
//               >
//                 {/* halo on open */}
//                 <details className="group">
//                   <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white flex justify-between items-center select-none">
//                     {faq.question}
//                     <motion.span
//                       className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"
//                       animate={{ rotate: ['0deg', '90deg', '0deg'] }}
//                       transition={{ duration: 4, repeat: Infinity }}
//                     >
//                       +
//                     </motion.span>
//                   </summary>
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: 'auto', opacity: 1 }}
//                     transition={{ type: 'spring', stiffness: 120, damping: 18 }}
//                     className="overflow-hidden"
//                   >
//                     <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</p>
//                   </motion.div>
//                 </details>
//                 <motion.div
//                   className="pointer-events-none absolute inset-0 opacity-0 group-open:opacity-100 bg-gradient-to-r from-blue-600/5 via-fuchsia-600/5 to-purple-600/5"
//                   transition={{ duration: 0.3 }}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== ABOUT (for scroll link) ===== */}
//       <section id="about-section" className="py-24 bg-white dark:bg-gray-950">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-10 items-center">
//             <motion.div {...fadeInUp}>
//               <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">Why SYRA.io?</h3>
//               <p className="mt-4 text-gray-700 dark:text-gray-300">
//                 Because speed wins. Ship more content, test more ideas, and learn faster than your competitors—without sacrificing quality or brand voice.
//               </p>
//               <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
//                 <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" /> Human-grade copy with AI assist</li>
//                 <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" /> Workflow from ideation → publish</li>
//                 <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" /> Built for solo founders & teams</li>
//               </ul>
//               <div className="mt-8">
//                 {user ? (
//                   <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                     <Link to="/dashboard">Open Dashboard</Link>
//                   </Button>
//                 ) : (
//                   <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                     <Link to="/signup">Create your account</Link>
//                   </Button>
//                 )}
//               </div>
//             </motion.div>

//             <motion.div
//               className="rounded-3xl border border-gray-200/60 dark:border-white/10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 p-8 shadow-xl"
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <div className="grid grid-cols-2 gap-4">
//                 {[...Array(6)].map((_, i) => (
//                   <div key={i} className="h-28 rounded-2xl bg-white/70 dark:bg-white/[0.06] backdrop-blur border border-gray-200/60 dark:border-white/10 relative overflow-hidden">
//                     <motion.div
//                       className="pointer-events-none absolute -left-8 top-0 h-full w-8 bg-white/30"
//                       animate={{ x: ['0%', '160%'] }}
//                       transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.2 }}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
//                 Preview cards show how your assets look across channels. Drag-and-drop builders and presets keep you in flow.
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ===== FOOTER STRIPE ===== */}
//       <footer className="py-12 border-t border-gray-200/70 dark:border-white/10 relative">
//         {/* faint top glow */}
//         <div className="pointer-events-none absolute -top-8 inset-x-0 h-8 bg-gradient-to-b from-blue-500/10 to-transparent" />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
//             <Sparkles className="h-5 w-5" />
//             <span className="font-medium">SYRA.io</span>
//           </div>
//           <div className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} SYRA — All rights reserved.</div>
//           <div className="flex gap-4 text-sm">
//             <Link to="/privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Privacy</Link>
//             <Link to="/terms" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Terms</Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;