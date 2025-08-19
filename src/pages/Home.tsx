
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { ArrowRight, Sparkles, Zap, Target, BarChart3, Brain, Image } from 'lucide-react';
// // import { Button } from '../components/UI/Button';
// // import { Card, CardContent } from '../components/UI/Card';

// // export function Home() {
// //   const features = [
// //     {
// //       icon: Brain,
// //       title: 'AI Content Generator',
// //       description: 'Generate high-quality blog posts, ads, emails, and social media content with advanced AI.',
// //     },
// //     {
// //       icon: Image,
// //       title: 'Image Creation',
// //       description: 'Create stunning visuals and graphics using DALL-E powered image generation.',
// //     },
// //     {
// //       icon: Target,
// //       title: 'SEO Optimization',
// //       description: 'Optimize your content for search engines with meta tags, descriptions, and keyword analysis.',
// //     },
// //     {
// //       icon: BarChart3,
// //       title: 'Marketing Strategy',
// //       description: 'Plan comprehensive marketing campaigns with scheduling, analytics, and performance tracking.',
// //     },
// //     {
// //       icon: Zap,
// //       title: 'Brand Management',
// //       description: 'Maintain consistent branding across all your marketing materials and campaigns.',
// //     },
// //     {
// //       icon: Sparkles,
// //       title: 'Project Organization',
// //       description: 'Organize your marketing assets, content, and campaigns in structured projects.',
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen animate-fade-in">
// //       {/* Hero Section */}
// //       <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
// //         {/* Animated floating particles */}
// //         <div className="absolute inset-0 pointer-events-none">
// //           {[...Array(20)].map((_, i) => (
// //             <div
// //               key={i}
// //               className={`w-2 h-2 bg-blue-400 rounded-full absolute animate-bounce-slow`}
// //               style={{
// //                 top: `${Math.random() * 100}%`,
// //                 left: `${Math.random() * 100}%`,
// //                 animationDelay: `${Math.random() * 2}s`,
// //               }}
// //             />
// //           ))}
// //         </div>

// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
// //           <div className="text-center">
// //             {/* Floating Hero Icon */}
// //             <div className="flex items-center justify-center mb-6 animate-float-slow">
// //               <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
// //                 <Sparkles className="w-10 h-10 text-white animate-spin-slow" />
// //               </div>
// //             </div>

// //             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
// //               AI-Powered Marketing
// //               <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                 Made Simple
// //               </span>
// //             </h1>

// //             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
// //               SIRA empowers solo founders, startups, and content teams with intelligent marketing tools. 
// //               Generate content, create images, optimize SEO, and manage campaigns all in one place.
// //             </p>

// //             <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
// //               <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transform transition-all duration-300" asChild>
// //                 <Link to="/signup">Get Started Free</Link>
// //               </Button>
// //               <Button variant="outline" size="lg" className="hover:scale-105 transform transition-all duration-300" asChild>
// //                 <Link to="/about">Learn More</Link>
// //               </Button>
// //             </div>

// //             <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
// //               No credit card required • Start with 5 free AI generations
// //             </p>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="py-20 bg-white dark:bg-gray-900 relative">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
// //               Everything you need to scale your marketing
// //             </h2>
// //             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
// //               From content creation to performance tracking, SIRA provides all the tools you need 
// //               to build and execute successful marketing campaigns.
// //             </p>
// //           </div>
          
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {features.map((feature, index) => (
// //               <Card
// //                 key={index}
// //                 hover
// //                 className="text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
// //                 style={{ animationDelay: `${0.1 * index}s` }}
// //               >
// //                 <CardContent className="pt-8">
// //                   <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4 transform transition-transform duration-500 group-hover:scale-110">
// //                     <feature.icon className="w-8 h-8 text-blue-600" />
// //                   </div>
// //                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
// //                     {feature.title}
// //                   </h3>
// //                   <p className="text-gray-600 dark:text-gray-300">
// //                     {feature.description}
// //                   </p>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
// //         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
// //           <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 animate-fade-in-up">
// //             Ready to transform your marketing?
// //           </h2>
// //           <p className="text-xl text-blue-100 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
// //             Join thousands of marketers using SIRA to create better content, faster.
// //           </p>
// //           <Button size="lg" variant="secondary" icon={ArrowRight} className="hover:scale-105 transform transition-all duration-300 animate-fade-in-up" asChild>
// //             <Link to="/signup">Start Your Free Trial</Link>
// //           </Button>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Sparkles, Zap, Target, BarChart3, Brain, Image } from 'lucide-react';
// import { Button } from '../components/UI/Button';
// import { Card, CardContent } from '../components/UI/Card';
// import { useAuth } from '../hooks/useAuth'; // ✅ import auth hook

// export function Home() {
//   const { user } = useAuth(); // ✅ check if user is logged in

//   const features = [
//     {
//       icon: Brain,
//       title: 'AI Content Generator',
//       description: 'Generate high-quality blog posts, ads, emails, and social media content with advanced AI.',
//     },
//     {
//       icon: Image,
//       title: 'Image Creation',
//       description: 'Create stunning visuals and graphics using DALL-E powered image generation.',
//     },
//     {
//       icon: Target,
//       title: 'SEO Optimization',
//       description: 'Optimize your content for search engines with meta tags, descriptions, and keyword analysis.',
//     },
//     {
//       icon: BarChart3,
//       title: 'Marketing Strategy',
//       description: 'Plan comprehensive marketing campaigns with scheduling, analytics, and performance tracking.',
//     },
//     {
//       icon: Zap,
//       title: 'Brand Management',
//       description: 'Maintain consistent branding across all your marketing materials and campaigns.',
//     },
//     {
//       icon: Sparkles,
//       title: 'Project Organization',
//       description: 'Organize your marketing assets, content, and campaigns in structured projects.',
//     },
//   ];

//   return (
//     <div className="min-h-screen animate-fade-in">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
//         {/* Animated floating particles */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className={`w-2 h-2 bg-blue-400 rounded-full absolute animate-bounce-slow`}
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 2}s`,
//               }}
//             />
//           ))}
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
//           <div className="text-center">
//             {/* Floating Hero Icon */}
//             <div className="flex items-center justify-center mb-6 animate-float-slow">
//               <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
//                 <Sparkles className="w-10 h-10 text-white animate-spin-slow" />
//               </div>
//             </div>

//             <h1
//               className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight animate-fade-in-up"
//               style={{ animationDelay: '0.2s' }}
//             >
//               AI-Powered Marketing
//               <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Made Simple
//               </span>
//             </h1>

//             <p
//               className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in-up"
//               style={{ animationDelay: '0.4s' }}
//             >
//               SIRA empowers solo founders, startups, and content teams with intelligent marketing tools. 
//               Generate content, create images, optimize SEO, and manage campaigns all in one place.
//             </p>

//             <div
//               className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
//               style={{ animationDelay: '0.6s' }}
//             >
//               {/* ✅ Conditionally render button based on user login */}
//               {user ? (
//                 <Button
//                   size="lg"
//                   icon={ArrowRight}
//                   className="bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transform transition-all duration-300"
//                   asChild
//                 >
//                   <Link to="/dashboard">Go to Dashboard</Link>
//                 </Button>
//               ) : (
//                 <Button
//                   size="lg"
//                   icon={ArrowRight}
//                   className="bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transform transition-all duration-300"
//                   asChild
//                 >
//                   <Link to="/signup">Get Started Free</Link>
//                 </Button>
//               )}

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="hover:scale-105 transform transition-all duration-300"
//                 asChild
//               >
//                 <Link to="/about">Learn More</Link>
//               </Button>
//             </div>

//             {!user && (
//               <p
//                 className="text-sm text-gray-500 dark:text-gray-400 mt-4 animate-fade-in-up"
//                 style={{ animationDelay: '0.8s' }}
//               >
//                 No credit card required • Start with 5 free AI generations
//               </p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white dark:bg-gray-900 relative">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
//               Everything you need to scale your marketing
//             </h2>
//             <p
//               className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up"
//               style={{ animationDelay: '0.2s' }}
//             >
//               From content creation to performance tracking, SIRA provides all the tools you need 
//               to build and execute successful marketing campaigns.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <Card
//                 key={index}
//                 hover
//                 className="text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
//                 style={{ animationDelay: `${0.1 * index}s` }}
//               >
//                 <CardContent className="pt-8">
//                   <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4 transform transition-transform duration-500 group-hover:scale-110">
//                     <feature.icon className="w-8 h-8 text-blue-600" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {feature.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
//         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 animate-fade-in-up">
//             Ready to transform your marketing?
//           </h2>
//           <p
//             className="text-xl text-blue-100 mb-8 animate-fade-in-up"
//             style={{ animationDelay: '0.2s' }}
//           >
//             Join thousands of marketers using SIRA to create better content, faster.
//           </p>
//           {user ? (
//             <Button
//               size="lg"
//               variant="secondary"
//               icon={ArrowRight}
//               className="hover:scale-105 transform transition-all duration-300 animate-fade-in-up"
//               asChild
//             >
//               <Link to="/dashboard">Go to Dashboard</Link>
//             </Button>
//           ) : (
//             <Button
//               size="lg"
//               variant="secondary"
//               icon={ArrowRight}
//               className="hover:scale-105 transform transition-all duration-300 animate-fade-in-up"
//               asChild
//             >
//               <Link to="/signup">Start Your Free Trial</Link>
//             </Button>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Target, BarChart3, Brain, Image } from 'lucide-react';
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

  // ✅ Function to scroll to "about-section"
  const scrollToAbout = () => {
    document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 bg-blue-400 rounded-full absolute animate-bounce-slow`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6 animate-float-slow">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
                <Sparkles className="w-10 h-10 text-white animate-spin-slow" />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              AI-Powered Marketing
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              SIRA empowers solo founders, startups, and content teams with intelligent marketing tools. 
              Generate content, create images, optimize SEO, and manage campaigns all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {user ? (
                <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transform transition-all duration-300" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transform transition-all duration-300" asChild>
                  <Link to="/signup">Get Started Free</Link>
                </Button>
              )}

              {/* ✅ Learn More scrolls to section */}
              <Button variant="outline" size="lg" className="hover:scale-105 transform transition-all duration-300" onClick={scrollToAbout}>
                Learn More
              </Button>
            </div>

            {!user && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                No credit card required • Start with 5 free AI generations
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
              Everything you need to scale your marketing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              From content creation to performance tracking, SIRA provides all the tools you need 
              to build and execute successful marketing campaigns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 animate-fade-in-up">
            Ready to transform your marketing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Join thousands of marketers using SIRA to create better content, faster.
          </p>
          {user ? (
            <Button size="lg" variant="secondary" icon={ArrowRight} className="hover:scale-105 transform transition-all duration-300 animate-fade-in-up" asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button size="lg" variant="secondary" icon={ArrowRight} className="hover:scale-105 transform transition-all duration-300 animate-fade-in-up" asChild>
              <Link to="/signup">Start Your Free Trial</Link>
            </Button>
          )}
        </div>
      </section>

      {/* ✅ About Section (scroll target) */}
      <section id="about-section" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Us</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            This platform is proudly developed and managed by <span className="font-semibold text-blue-600"><a href="https://brandsmashers.com" // 🔗 replace with actual URL
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-blue-600 hover:underline">Brandsmasher Technologies</a></span>.  
            We are passionate about building AI-powered tools that make marketing simple, fast, and effective for everyone. 
          </p>
        </div>
      </section>
    </div>
  );
}