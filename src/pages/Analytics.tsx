import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Users, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  Filter,
  Settings,
  ExternalLink,
  Clock,
  Zap,
  Star,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Send
} from 'lucide-react';
import { Button } from '../components/UI/Button';

interface AnalyticsData {
  totalViews: number;
  totalEngagement: number;
  totalPosts: number;
  totalFollowers: number;
  avgEngagementRate: number;
  topPerformingPost: {
    title: string;
    platform: string;
    views: number;
    engagement: number;
    date: string;
  };
  platformStats: {
    platform: string;
    posts: number;
    views: number;
    engagement: number;
    followers: number;
    growth: number;
  }[];
  monthlyData: {
    month: string;
    views: number;
    engagement: number;
    posts: number;
  }[];
  recentPosts: {
    id: string;
    title: string;
    platform: string;
    views: number;
    engagement: number;
    date: string;
    status: 'published' | 'scheduled' | 'draft';
  }[];
}

export function Analytics() {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalViews: 0,
    totalEngagement: 0,
    totalPosts: 0,
    totalFollowers: 0,
    avgEngagementRate: 0,
    topPerformingPost: {
      title: '',
      platform: '',
      views: 0,
      engagement: 0,
      date: ''
    },
    platformStats: [],
    monthlyData: [],
    recentPosts: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Mock data for demonstration
  const mockData: AnalyticsData = {
    totalViews: 45678,
    totalEngagement: 2345,
    totalPosts: 89,
    totalFollowers: 1234,
    avgEngagementRate: 5.2,
    topPerformingPost: {
      title: "How to Build a Successful Marketing Strategy",
      platform: "LinkedIn",
      views: 1250,
      engagement: 8.5,
      date: "2024-01-15"
    },
    platformStats: [
      {
        platform: "LinkedIn",
        posts: 25,
        views: 12500,
        engagement: 8.5,
        followers: 450,
        growth: 12.5
      },
      {
        platform: "Instagram",
        posts: 32,
        views: 18900,
        engagement: 6.2,
        followers: 520,
        growth: 8.3
      },
      {
        platform: "Facebook",
        posts: 18,
        views: 9800,
        engagement: 4.8,
        followers: 264,
        growth: 15.2
      },
      {
        platform: "Twitter",
        posts: 14,
        views: 4478,
        engagement: 3.1,
        followers: 0,
        growth: -2.1
      }
    ],
    monthlyData: [
      { month: 'Jan', views: 8500, engagement: 4.2, posts: 12 },
      { month: 'Feb', views: 9200, engagement: 4.8, posts: 15 },
      { month: 'Mar', views: 10800, engagement: 5.1, posts: 18 },
      { month: 'Apr', views: 12500, engagement: 5.5, posts: 22 },
      { month: 'May', views: 14200, engagement: 6.2, posts: 25 },
      { month: 'Jun', views: 16800, engagement: 6.8, posts: 28 }
    ],
    recentPosts: [
      {
        id: '1',
        title: '5 Tips for Better Content Marketing',
        platform: 'LinkedIn',
        views: 1250,
        engagement: 8.5,
        date: '2024-01-15',
        status: 'published'
      },
      {
        id: '2',
        title: 'Behind the Scenes: Our Creative Process',
        platform: 'Instagram',
        views: 890,
        engagement: 6.2,
        date: '2024-01-14',
        status: 'published'
      },
      {
        id: '3',
        title: 'Industry Trends 2024',
        platform: 'Facebook',
        views: 650,
        engagement: 4.8,
        date: '2024-01-13',
        status: 'scheduled'
      },
      {
        id: '4',
        title: 'Quick Marketing Tips',
        platform: 'Twitter',
        views: 320,
        engagement: 3.1,
        date: '2024-01-12',
        status: 'published'
      }
    ]
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRange, selectedPlatform]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'scheduled': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'draft': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return '💼';
      case 'instagram': return '📷';
      case 'facebook': return '📘';
      case 'twitter': return '🐦';
      default: return '📱';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track your content performance across all platforms
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Range:</span>
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    timeRange === range
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Views',
              value: formatNumber(analyticsData.totalViews),
              change: '+12.5%',
              changeType: 'positive',
              icon: Eye,
              color: 'text-blue-600',
              bgColor: 'bg-blue-50 dark:bg-blue-900/20',
              borderColor: 'border-blue-200 dark:border-blue-700'
            },
            {
              title: 'Total Engagement',
              value: formatNumber(analyticsData.totalEngagement),
              change: '+8.3%',
              changeType: 'positive',
              icon: Heart,
              color: 'text-red-600',
              bgColor: 'bg-red-50 dark:bg-red-900/20',
              borderColor: 'border-red-200 dark:border-red-700'
            },
            {
              title: 'Total Posts',
              value: analyticsData.totalPosts.toString(),
              change: '+15.2%',
              changeType: 'positive',
              icon: Send,
              color: 'text-green-600',
              bgColor: 'bg-green-50 dark:bg-green-900/20',
              borderColor: 'border-green-200 dark:border-green-700'
            },
            {
              title: 'Avg. Engagement Rate',
              value: `${analyticsData.avgEngagementRate}%`,
              change: '+2.1%',
              changeType: 'positive',
              icon: Target,
              color: 'text-purple-600',
              bgColor: 'bg-purple-50 dark:bg-purple-900/20',
              borderColor: 'border-purple-200 dark:border-purple-700'
            }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${metric.bgColor} rounded-xl p-6 shadow-sm border ${metric.borderColor} hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {metric.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {metric.value}
                  </p>
                  <div className="flex items-center">
                    {metric.changeType === 'positive' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      vs last period
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${metric.bgColor} border ${metric.borderColor}`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Platform Performance
              </h3>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
            <div className="space-y-4">
              {analyticsData.platformStats.map((platform, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getPlatformIcon(platform.platform)}</div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {platform.platform}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {platform.posts} posts • {formatNumber(platform.followers)} followers
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatNumber(platform.views)} views
                    </p>
                    <div className="flex items-center">
                      {platform.growth > 0 ? (
                        <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${
                        platform.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {platform.growth > 0 ? '+' : ''}{platform.growth}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Top Performing Post
              </h3>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View
              </Button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getPlatformIcon(analyticsData.topPerformingPost.platform)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {analyticsData.topPerformingPost.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {formatNumber(analyticsData.topPerformingPost.views)} views
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {analyticsData.topPerformingPost.engagement}% engagement
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(analyticsData.topPerformingPost.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Posts Performance
              </h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analyticsData.recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getPlatformIcon(post.platform)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {post.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {formatNumber(post.views)} views
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.engagement}% engagement
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
