
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Target, BarChart3, Brain, Image } from 'lucide-react';
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
    { icon: BarChart3, title: 'Marketing Strategy', description: 'Plan comprehensive marketing campaigns with scheduling, analytics, and performance tracking.' },
    { icon: Zap, title: 'Brand Management', description: 'Maintain consistent branding across all your marketing materials and campaigns.' },
    { icon: Sparkles, title: 'Project Organization', description: 'Organize your marketing assets, content, and campaigns in structured projects.' },
  ];

  const scrollToAbout = () => {
    document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
        {/* floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 0.2 }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="flex items-center justify-center mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
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

            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              SIRA empowers solo founders, startups, and content teams with intelligent marketing tools. 
              Generate content, create images, optimize SEO, and manage campaigns all in one place.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
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
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to scale your marketing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From content creation to performance tracking, SIRA provides all the tools you need 
              to build and execute successful marketing campaigns.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                      <feature.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to transform your marketing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of marketers using SIRA to create better content, faster.
          </p>
          {user ? (
            <Button size="lg" variant="secondary" icon={ArrowRight} className="hover:scale-105 transition-all duration-300" asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button size="lg" variant="secondary" icon={ArrowRight} className="hover:scale-105 transition-all duration-300" asChild>
              <Link to="/signup">Start Your Free Trial</Link>
            </Button>
          )}
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about-section" 
        className="py-20 bg-gray-100 dark:bg-gray-800"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Us</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            This platform is proudly developed and managed by <a href="https://brandsmashers.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">Brandsmasher Technologies</a>.  
            We are passionate about building AI-powered tools that make marketing simple, fast, and effective for everyone. 
          </p>
        </div>
      </motion.section>
    </div>
  );
}

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Sparkles, Zap, Target, BarChart3, Brain, Image } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Button } from '../components/UI/Button';
// import { Card, CardContent } from '../components/UI/Card';
// import { useAuth } from '../hooks/useAuth';

// export function Home() {
//   const { user } = useAuth();

//   const features = [
//     { icon: Brain, title: 'AI Content Generator', description: 'Generate high-quality blog posts, ads, emails, and social media content with advanced AI.' },
//     { icon: Image, title: 'Image Creation', description: 'Create stunning visuals and graphics using DALL-E powered image generation.' },
//     { icon: Target, title: 'SEO Optimization', description: 'Optimize your content for search engines with meta tags, descriptions, and keyword analysis.' },
//     { icon: BarChart3, title: 'Marketing Strategy', description: 'Plan comprehensive marketing campaigns with scheduling, analytics, and performance tracking.' },
//     { icon: Zap, title: 'Brand Management', description: 'Maintain consistent branding across all your marketing materials and campaigns.' },
//     { icon: Sparkles, title: 'Project Organization', description: 'Organize your marketing assets, content, and campaigns in structured projects.' },
//   ];

//   const scrollToAbout = () => {
//     document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900">
//         {/* floating particles */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="w-2 h-2 bg-emerald-400 rounded-full absolute"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: [0.2, 1, 0.2], y: [0, -20, 0] }}
//               transition={{ duration: 6, repeat: Infinity, delay: i * 0.2 }}
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//               }}
//             />
//           ))}
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
//           <motion.div 
//             className="text-center"
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div 
//               className="flex items-center justify-center mb-6"
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 4, repeat: Infinity }}
//             >
//               <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl">
//                 <Sparkles className="w-10 h-10 text-white animate-spin-slow" />
//               </div>
//             </motion.div>

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
//               AI-Powered Marketing
//               <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
//                 Made Simple
//               </span>
//             </h1>

//             <motion.p 
//               className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3, duration: 1 }}
//             >
//               SIRA empowers solo founders, startups, and content teams with intelligent marketing tools. 
//               Generate content, create images, optimize SEO, and manage campaigns all in one place.
//             </motion.p>

//             <motion.div 
//               className="flex flex-col sm:flex-row gap-4 justify-center"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.5, duration: 0.6 }}
//             >
//               {user ? (
//                 <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:scale-105 transition-all duration-300" asChild>
//                   <Link to="/dashboard">Go to Dashboard</Link>
//                 </Button>
//               ) : (
//                 <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:scale-105 transition-all duration-300" asChild>
//                   <Link to="/signup">Get Started Free</Link>
//                 </Button>
//               )}
//               <Button variant="outline" size="lg" className="hover:scale-105 transition-all duration-300" onClick={scrollToAbout}>
//                 Learn More
//               </Button>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white dark:bg-gray-900 relative">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div 
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//               Everything you need to scale your marketing
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               From content creation to performance tracking, SIRA provides all the tools you need 
//               to build and execute successful marketing campaigns.
//             </p>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <Card hover className="text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
//                   <CardContent className="pt-8">
//                     <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
//                       <feature.icon className="w-8 h-8 text-emerald-600" />
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300">
//                       {feature.description}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <motion.section 
//         className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
//             Ready to transform your marketing?
//           </h2>
//           <p className="text-xl text-emerald-100 mb-8">
//             Join thousands of marketers using SIRA to create better content, faster.
//           </p>
//           {user ? (
//             <Button size="lg" variant="secondary" icon={ArrowRight} className="hover:scale-105 transition-all duration-300" asChild>
//               <Link to="/dashboard">Go to Dashboard</Link>
//             </Button>
//           ) : (
//             <Button size="lg" variant="secondary" icon={ArrowRight} className="hover:scale-105 transition-all duration-300" asChild>
//               <Link to="/signup">Start Your Free Trial</Link>
//             </Button>
//           )}
//         </div>
//       </motion.section>

//       {/* About Section */}
//       <motion.section 
//         id="about-section" 
//         className="py-20 bg-gray-100 dark:bg-gray-800"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-5xl mx-auto text-center px-6">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Us</h2>
//           <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
//             This platform is proudly developed and managed by <a href="https://brandsmashers.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:underline">Brandsmasher Technologies</a>.  
//             We are passionate about building AI-powered tools that make marketing simple, fast, and effective for everyone. 
//           </p>
//         </div>
//       </motion.section>
//     </div>
//   );
// }