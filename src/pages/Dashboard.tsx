import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Image, 
  TrendingUp, 
  Layers, 
  Calendar, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Eye,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronRight,
  Building2,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Edit3,
  X,
  Camera
} from 'lucide-react';
import { Button } from '../components/UI/Button';
import { MiniCalendar } from '../components/Scheduler/MiniCalendar';
import { uploadImage } from '../utils/uploadImage';
import toast from 'react-hot-toast';

interface Stats {
  contentCount: number;
  imageCount: number;
  projectCount: number;
  templateCount: number;
  scheduledPostsCount: number;
  seoToolsCount: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    contentCount: 0,
    imageCount: 0,
    projectCount: 0,
    templateCount: 0,
    scheduledPostsCount: 0,
    seoToolsCount: 0,
  });
  const [animatedStats, setAnimatedStats] = useState<Stats>(stats);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  // Profile state
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [brandVoice, setBrandVoice] = useState('professional');
  const [goals, setGoals] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');

  // Animation for stats
  useEffect(() => {
    const intervalTime = 50;
    const interval = setInterval(() => {
      setAnimatedStats(prev => {
        const newStats = { ...prev };
        let hasChanges = false;

        Object.keys(stats).forEach(key => {
          const current = prev[key as keyof Stats];
          const target = stats[key as keyof Stats];
          const diff = target - current;

          if (Math.abs(diff) > 0.1) {
            newStats[key as keyof Stats] = current + diff * 0.1;
            hasChanges = true;
          } else {
            newStats[key as keyof Stats] = target;
          }
        });

        return hasChanges ? newStats : prev;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [stats]);

  const loadStats = async () => {
    if (!user) return;
    try {
      const apiBase = 'http://localhost:4000';
      const token = localStorage.getItem('auth_token');
      const params = new URLSearchParams({ user_id: user.id });
      const resp = await fetch(`${apiBase}/api/stats/counts?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();

      // Load scheduled posts count
      let scheduledPostsCount = 0;
      try {
        const scheduledResp = await fetch(`${apiBase}/api/scheduled-posts?user_id=${encodeURIComponent(user.id)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (scheduledResp.ok) {
          const scheduledData = await scheduledResp.json();
          scheduledPostsCount = scheduledData.items?.length || 0;
        }
      } catch (e) {
        console.error('Error loading scheduled posts:', e);
      }

      // Load SEO tools count (meta tags, keywords, schema)
      let seoToolsCount = 0;
      try {
        const seoResp = await fetch(`${apiBase}/api/seo-tools?user_id=${encodeURIComponent(user.id)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (seoResp.ok) {
          const seoData = await seoResp.json();
          seoToolsCount = seoData.count || 0;
        }
      } catch (e) {
        console.error('Error loading SEO tools count:', e);
      }

      setStats({
        contentCount: data.content || 0,
        imageCount: data.image || 0,
        projectCount: data.project || 0,
        templateCount: data.template || 0,
        scheduledPostsCount,
        seoToolsCount,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    if (!user) return;
    try {
      // If user data is already available from auth, use it
      if (user.full_name) {
        setFullName(user.full_name || "");
        setPhoneNumber(user.phone || "");
        setAvatarUrl(user.avatar_url || "");
        setCompanyName(user.company_name || "");
        setIndustry(user.industry || "");
        setBusinessType(user.business_type || "");
        setLocation(user.location || "");
        setCompanySize(user.company_size || "");
        setTargetAudience(user.target_audience || "");
        setBrandVoice(user.brand_voice || "professional");
        setGoals(user.goals || "");
        setLinkedinUrl(user.linkedin_url || "");
        setInstagramUrl(user.instagram_url || "");
        setFacebookUrl(user.facebook_url || "");
        return;
      }

      // Fallback to API call if needed
      const apiBase = 'http://localhost:4000';
      const res = await fetch(`${apiBase}/api/profiles/${encodeURIComponent(user.id)}`);
      const existing = res.ok ? (await res.json()).profile : null;
      if (existing) {
        setFullName(existing.full_name || "");
        setPhoneNumber(existing.phone || existing.phone_number || "");
        setAvatarUrl(existing.avatar_url || "");
        setCompanyName(existing.company_name || "");
        setIndustry(existing.industry || "");
        setBusinessType(existing.business_type || "");
        setLocation(existing.location || "");
        setCompanySize(existing.company_size || "");
        setTargetAudience(existing.target_audience || "");
        setBrandVoice(existing.brand_voice || "professional");
        setGoals(existing.goals || "");
        setLinkedinUrl(existing.linkedin_url || "");
        setInstagramUrl(existing.instagram_url || "");
        setFacebookUrl(existing.facebook_url || "");
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setProfileLoading(true);
    try {
      const apiBase = 'http://localhost:4000';
      const token = localStorage.getItem('auth_token');
      
      const resp = await fetch(`${apiBase}/api/profiles/upsert`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: user.id,
          full_name: fullName,
          phone: phoneNumber,
          avatar_url: avatarUrl,
          company_name: companyName,
          industry,
          business_type: businessType,
          location,
          company_size: companySize,
          target_audience: targetAudience,
          brand_voice: brandVoice,
          goals,
          linkedin_url: linkedinUrl || "",
          instagram_url: instagramUrl || "",
          facebook_url: facebookUrl || "",
          updated_at: new Date().toISOString(),
        })
      });
      if (!resp.ok) throw new Error(await resp.text());
      setEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (e: any) {
      toast.error("Update failed: " + (e?.message || 'Unknown error'));
    } finally {
      setProfileLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !user) return;
    const file = e.target.files[0];
    const url = await uploadImage(file, user.id);
    if (url) {
      setAvatarUrl(url);
    }
  };

  useEffect(() => {
    if (user) {
      loadStats();
      fetchProfile();
    }
  }, [user]);

  // Quick Actions with enhanced design
  const quickActions = [
    {
      title: 'Content Generator',
      description: 'Create engaging content for all platforms',
      icon: FileText,
      href: '/content-generator',
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
      borderColor: 'border-blue-200 dark:border-blue-700',
      stats: `${Math.round(animatedStats.contentCount)} generated`
    },
    {
      title: 'Image Creator',
      description: 'Generate stunning visuals with AI',
      icon: Image,
      href: '/image-generation',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20',
      borderColor: 'border-green-200 dark:border-green-700',
      stats: `${Math.round(animatedStats.imageCount)} created`
    },
    {
      title: 'SEO Toolkit',
      description: 'Optimize your content for search engines',
      icon: BarChart3,
      href: '/seo-toolkit',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      borderColor: 'border-orange-200 dark:border-orange-700',
      stats: `${Math.round(animatedStats.seoToolsCount)} tools used`
    },
    {
      title: 'Content Scheduler',
      description: 'Plan and schedule your posts',
      icon: Calendar,
      href: '/scheduler',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      borderColor: 'border-purple-200 dark:border-purple-700',
      stats: `${Math.round(animatedStats.scheduledPostsCount)} scheduled`
    },
    {
      title: 'Templates',
      description: 'Use pre-built content templates',
      icon: Layers,
      href: '/template',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-700',
      stats: `${Math.round(animatedStats.templateCount)} used`
    },
    {
      title: 'Analytics',
      description: 'Track your content performance',
      icon: TrendingUp,
      href: '/analytics',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20',
      borderColor: 'border-emerald-200 dark:border-emerald-700',
      stats: 'View insights'
    }
  ];

  // Recent Activities with enhanced design
  const recentActivities = [
    {
      id: 1,
      title: 'New content generated',
      time: '2 minutes ago',
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 2,
      title: 'Image created successfully',
      time: '15 minutes ago',
      icon: Image,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 3,
      title: 'Post scheduled for tomorrow',
      time: '1 hour ago',
      icon: Calendar,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 4,
      title: 'SEO analysis completed',
      time: '2 hours ago',
      icon: BarChart3,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  // Analytics data for charts
  const analyticsData = {
    contentPerformance: [
      { platform: 'LinkedIn', views: 1250, engagement: 8.5, posts: 12 },
      { platform: 'Instagram', views: 2100, engagement: 12.3, posts: 18 },
      { platform: 'Facebook', views: 980, engagement: 6.2, posts: 8 },
      { platform: 'Twitter', views: 750, engagement: 4.8, posts: 15 }
    ],
    monthlyStats: [
      { month: 'Jan', content: 45, images: 32, scheduled: 28 },
      { month: 'Feb', content: 52, images: 38, scheduled: 35 },
      { month: 'Mar', content: 48, images: 41, scheduled: 42 },
      { month: 'Apr', content: 61, images: 45, scheduled: 38 },
      { month: 'May', content: 58, images: 52, scheduled: 45 },
      { month: 'Jun', content: 67, images: 48, scheduled: 52 }
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <div className="hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <img
                src={avatarUrl || `https://ui-avatars.com/api/?name=${fullName || "User"}`}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {fullName || "User"}
              </span>
            </div>
          </div>
        </div>
  </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''} 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Here's what's happening with your content today.</p>
      </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* KPI Cards Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Overview</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {[
                  {
                    label: 'Content Generated',
                    icon: FileText,
                    value: animatedStats.contentCount,
                    change: '+12%',
                    changeType: 'positive',
                    color: 'text-blue-600',
                    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
                    borderColor: 'border-blue-200 dark:border-blue-700'
                  },
                  {
                    label: 'Images Created',
                    icon: Image,
                    value: animatedStats.imageCount,
                    change: '+8%',
                    changeType: 'positive',
                    color: 'text-green-600',
                    bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
                    borderColor: 'border-green-200 dark:border-green-700'
                  },
                  {
                    label: 'Active Projects',
                    icon: TrendingUp,
                    value: animatedStats.projectCount,
                    change: '+5%',
                    changeType: 'positive',
                    color: 'text-purple-600',
                    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
                    borderColor: 'border-purple-200 dark:border-purple-700'
                  },
                  {
                    label: 'Templates Used',
                    icon: Layers,
                    value: animatedStats.templateCount,
                    change: '+15%',
                    changeType: 'positive',
                    color: 'text-orange-600',
                    bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
                    borderColor: 'border-orange-200 dark:border-orange-700'
                  },
                  {
                    label: 'Scheduled Posts',
                    icon: Calendar,
                    value: animatedStats.scheduledPostsCount,
                    change: '+20%',
                    changeType: 'positive',
                    color: 'text-indigo-600',
                    bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
                    borderColor: 'border-indigo-200 dark:border-indigo-700'
                  },
                  {
                    label: 'SEO Tools Used',
                    icon: BarChart3,
                    value: animatedStats.seoToolsCount,
                    change: '+18%',
                    changeType: 'positive',
                    color: 'text-teal-600',
                    bgColor: 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20',
                    borderColor: 'border-teal-200 dark:border-teal-700'
                  },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`${stat.bgColor} rounded-xl p-4 shadow-sm border ${stat.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {Math.round(stat.value)}
                        </p>
                        <div className="flex items-center mt-1">
                          {stat.changeType === 'positive' ? (
                            <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />
                          )}
                          <span className={`text-xs font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change}
                          </span>
                        </div>
              </div>
                      <div className={`p-3 rounded-lg ${stat.bgColor} border ${stat.borderColor}`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
              </div>
            </div>

            {/* Calendar Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Scheduled Posts</h2>
              <MiniCalendar />
    </div>

            {/* Quick Actions Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/tools" className="flex items-center">
                    View All Tools
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`${action.bgColor} rounded-xl p-6 shadow-sm border ${action.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-105 group`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${action.color} text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <action.icon className="w-6 h-6" />
              </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{action.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{action.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{action.stats}</span>
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform" asChild>
                  <Link to={action.href}>Get Started</Link>
                </Button>
                        </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
            </div>

            {/* Analytics Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Content Performance</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Last 30 days
                  </Button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {analyticsData.contentPerformance.map((platform, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {platform.views.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{platform.platform}</div>
                      <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {platform.engagement}%
                        </span>
                        <span className="flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {platform.posts}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile and Activity */}
          <div className="xl:col-span-1 space-y-6">
            {/* Profile Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingProfile(!editingProfile)}
                >
                  {editingProfile ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </Button>
              </div>

              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={avatarUrl || `https://ui-avatars.com/api/?name=${fullName || "User"}`}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-600"
                  />
                  {editingProfile && (
                    <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                      <Camera className="w-3 h-3" />
                      <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                    </label>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-3">
                  {fullName || "Your Name"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.email || ''}
                </p>
                {companyName && (
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    {companyName} • {industry}
                  </p>
                )}
              </div>

              {editingProfile ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your industry"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={profileLoading}
                      className="flex-1"
                    >
                      {profileLoading ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingProfile(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Business Info */}
                  {companyName && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Business Information</h5>
                      <div className="space-y-2 text-sm">
                        {companyName && (
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="text-gray-600 dark:text-gray-400">{companyName}</span>
                          </div>
                        )}
                        {industry && (
                          <div className="flex items-center">
                            <Target className="w-4 h-4 text-purple-500 mr-2" />
                            <span className="text-gray-600 dark:text-gray-400">{industry}</span>
                          </div>
                        )}
                        {location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-green-500 mr-2" />
                            <span className="text-gray-600 dark:text-gray-400">{location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Social Links</h5>
                    <div className="space-y-2">
                      {linkedinUrl && (
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn Profile
                        </a>
                      )}
                      {instagramUrl && (
                        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-pink-600 hover:text-pink-800">
                          <Instagram className="w-4 h-4 mr-2" />
                          Instagram Profile
                        </a>
                      )}
                      {facebookUrl && (
                        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                          <Facebook className="w-4 h-4 mr-2" />
                          Facebook Page
                        </a>
                      )}
                      {!linkedinUrl && !instagramUrl && !facebookUrl && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No social links added</p>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-4 text-white">
                    <h5 className="text-sm font-medium mb-3">This Month</h5>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold">{Math.round(animatedStats.contentCount)}</p>
                        <p className="text-xs opacity-90">Content</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{Math.round(animatedStats.imageCount)}</p>
                        <p className="text-xs opacity-90">Images</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{Math.round(animatedStats.scheduledPostsCount)}</p>
                        <p className="text-xs opacity-90">Scheduled</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{Math.round(animatedStats.seoToolsCount)}</p>
                        <p className="text-xs opacity-90">SEO Tools</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/activity">View All</Link>
            </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className={`p-3 rounded-xl ${activity.bgColor}`}>
                        <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</div>
  );
}