

// import React, { useState, useEffect } from 'react';
// import { Plus, FileText, Image, BarChart3, Clock, TrendingUp, Layers, Megaphone } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { Card, CardContent, CardHeader } from '../components/UI/Card';
// import { Button } from '../components/UI/Button';
// import { useAuth } from '../hooks/useAuth';
// import { supabase } from '../lib/supabase';

// export function Dashboard() {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     contentCount: 0,
//     imageCount: 0,
//     projectCount: 0,
//     templateCount: 0,
//   });

//   // Animated numbers
//   const [animatedStats, setAnimatedStats] = useState(stats);

//   useEffect(() => {
//     if (user) loadStats();
//   }, [user]);

//   useEffect(() => {
//     // Animate stats count
//     const duration = 1000;
//     const steps = 20;
//     const intervalTime = duration / steps;

//     const incrementStats = () => {
//       setAnimatedStats(prev => {
//         const newStats: any = {};
//         for (const key in stats) {
//           const diff = stats[key as keyof typeof stats] - prev[key as keyof typeof stats];
//           newStats[key] = prev[key as keyof typeof stats] + diff / steps;
//         }
//         return newStats;
//       });
//     };

//     let step = 0;
//     const interval = setInterval(() => {
//       incrementStats();
//       step++;
//       if (step >= steps) clearInterval(interval);
//     }, intervalTime);

//     return () => clearInterval(interval);
//   }, [stats]);

//   const loadStats = async () => {
//     if (!user) return;
//     try {
//       const { count: contentCount } = await supabase
//         .from('content_generations')
//         .select('*', { count: 'exact', head: true })
//         .eq('user_id', user.id);

//       const { count: imageCount } = await supabase
//         .from('image_generations')
//         .select('*', { count: 'exact', head: true })
//         .eq('user_id', user.id);

//       const { count: projectCount } = await supabase
//         .from('projects')
//         .select('*', { count: 'exact', head: true })
//         .eq('user_id', user.id);

//       const { count: templateCount } = await supabase
//         .from('templates')
//         .select('*', { count: 'exact', head: true })
//         .eq('user_id', user.id);

//       setStats({
//         contentCount: contentCount || 0,
//         imageCount: imageCount || 0,
//         projectCount: projectCount || 0,
//         templateCount: templateCount || 0,
//       });
//     } catch (error) {
//       console.error('Error loading stats:', error);
//       setStats({
//         contentCount: 0,
//         imageCount: 0,
//         projectCount: 0,
//         templateCount: 0,
//       });
//     }
//   };

//   const quickActions = [
//     {
//       title: 'Generate Content',
//       description: 'Create blog posts, ads, and social media content',
//       icon: FileText,
//       href: '/content',
//       color: 'bg-blue-500',
//     },
//     {
//       title: 'Create Images',
//       description: 'Generate AI-powered visuals and graphics',
//       icon: Image,
//       href: '/images',
//       color: 'bg-purple-500',
//     },
//     {
//       title: 'SEO Tools',
//       description: 'Optimize your content for search engines',
//       icon: BarChart3,
//       href: '/seo',
//       color: 'bg-green-500',
//     },
//     {
//       title: 'Templates',
//       description: 'Access ready-made templates for your projects',
//       icon: Layers,
//       href: '/template',
//       color: 'bg-orange-500',
//     },
//     {
//       title: 'Ad Generation',
//       description: 'Access ready-made templates for your projects',
//       icon: Megaphone,
//       href: '/ads',
//       color: 'bg-orange-500',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8 animate-fade-in-up">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">
//             Here's an overview of your marketing activities.
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           {[
//             { label: 'Content Generated', icon: FileText, value: animatedStats.contentCount, color: 'bg-blue-100', iconColor: 'text-blue-600' },
//             { label: 'Images Created', icon: Image, value: animatedStats.imageCount, color: 'bg-purple-100', iconColor: 'text-purple-600' },
//             { label: 'Active Projects', icon: TrendingUp, value: animatedStats.projectCount, color: 'bg-green-100', iconColor: 'text-green-600' },
//           ].map((stat, idx) => (
//             <Card key={idx} className="transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s` }}>
//               <CardContent className="p-6">
//                 <div className="flex items-center">
//                   <div className={`w-12 h-12 ${stat.color} dark:bg-opacity-30 rounded-lg flex items-center justify-center`}>
//                     <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
//                       {Math.round(stat.value)}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 animate-fade-in-up">Quick Actions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {quickActions.map((action, index) => (
//               <Card key={index} hover className="transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
//                 <CardContent className="p-6">
//                   <div className="flex items-start">
//                     <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center transform transition-all duration-500 group-hover:scale-110`}>
//                       <action.icon className="w-5 h-5 text-white" />
//                     </div>
//                     <div className="ml-4 flex-1">
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{action.title}</h3>
//                       <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{action.description}</p>
//                       <Button variant="outline" size="sm" className="transition-transform duration-300 hover:scale-105" asChild>
//                         <Link to={action.href}>Get Started</Link>
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <Card className="transform transition-all duration-500 hover:shadow-2xl animate-fade-in-up">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
//               <Button variant="outline" size="sm" icon={Clock}>View All</Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-center py-8 animate-float-slow">
//               <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin-slow" />
//               <p className="text-gray-500 dark:text-gray-400">Start creating content to see your recent activity here.</p>
//               <Button className="mt-4 transition-transform duration-300 hover:scale-105" icon={Plus} asChild>
//                 <Link to="/content">Create Your First Content</Link>
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Plus, FileText, Image, BarChart3, Clock, TrendingUp, Layers, Megaphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
// import { Humanizer } from '../pages/Humanizer'; // <-- import Humanizer

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    contentCount: 0,
    imageCount: 0,
    projectCount: 0,
    templateCount: 0,
  });

  const [animatedStats, setAnimatedStats] = useState(stats);

  useEffect(() => {
    if (user) loadStats();
  }, [user]);

  useEffect(() => {
    // Animate stats count
    const duration = 1000;
    const steps = 20;
    const intervalTime = duration / steps;

    const incrementStats = () => {
      setAnimatedStats(prev => {
        const newStats: any = {};
        for (const key in stats) {
          const diff = stats[key as keyof typeof stats] - prev[key as keyof typeof stats];
          newStats[key] = prev[key as keyof typeof stats] + diff / steps;
        }
        return newStats;
      });
    };

    let step = 0;
    const interval = setInterval(() => {
      incrementStats();
      step++;
      if (step >= steps) clearInterval(interval);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [stats]);

  const loadStats = async () => {
    if (!user) return;
    try {
      const { count: contentCount } = await supabase
        .from('content_generations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { count: imageCount } = await supabase
        .from('image_generations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { count: projectCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { count: templateCount } = await supabase
        .from('templates')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setStats({
        contentCount: contentCount || 0,
        imageCount: imageCount || 0,
        projectCount: projectCount || 0,
        templateCount: templateCount || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      setStats({
        contentCount: 0,
        imageCount: 0,
        projectCount: 0,
        templateCount: 0,
      });
    }
  };

  const quickActions = [
    {
      title: 'Generate Content',
      description: 'Create blog posts, ads, and social media content',
      icon: FileText,
      href: '/content',
      color: 'bg-blue-500',
    },
     {
      title: 'Templates',
      description: 'Access ready-made templates for your projects',
      icon: Layers,
      href: '/template',
      color: 'bg-orange-500',
    },
    {
      title: 'Create Images',
      description: 'Generate AI-powered visuals and graphics',
      icon: Image,
      href: '/images',
      color: 'bg-purple-500',
    },
    {
      title: 'Ad Generation',
      description: 'Access ready-made templates for your projects',
      icon: Megaphone,
      href: '/ads',
      color: 'bg-orange-500',
    },
    {
      title: 'SEO Tools',
      description: 'Optimize your content for search engines',
      icon: BarChart3,
      href: '/seo',
      color: 'bg-green-500',
    },
    {
      title: 'AI to Humanizer',
      description: 'Access ready-made templates for your projects',
      icon: Zap,
      href: '/humanizer',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Humanizer at the Top
        <div className="mb-8 animate-fade-in-up">
          <Humanizer />
        </div> */}

        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's an overview of your marketing activities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Content Generated', icon: FileText, value: animatedStats.contentCount, color: 'bg-blue-100', iconColor: 'text-blue-600' },
            { label: 'Images Created', icon: Image, value: animatedStats.imageCount, color: 'bg-purple-100', iconColor: 'text-purple-600' },
            { label: 'Active Projects', icon: TrendingUp, value: animatedStats.projectCount, color: 'bg-green-100', iconColor: 'text-green-600' },
          ].map((stat, idx) => (
            <Card key={idx} className="transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${stat.color} dark:bg-opacity-30 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(stat.value)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 animate-fade-in-up">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} hover className="transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center transform transition-all duration-500 group-hover:scale-110`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{action.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{action.description}</p>
                      <Button variant="outline" size="sm" className="transition-transform duration-300 hover:scale-105" asChild>
                        <Link to={action.href}>Get Started</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="transform transition-all duration-500 hover:shadow-2xl animate-fade-in-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              <Button variant="outline" size="sm" icon={Clock}>View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 animate-float-slow">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin-slow" />
              <p className="text-gray-500 dark:text-gray-400">Start creating content to see your recent activity here.</p>
              <Button className="mt-4 transition-transform duration-300 hover:scale-105" icon={Plus} asChild>
                <Link to="/content">Create Your First Content</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}