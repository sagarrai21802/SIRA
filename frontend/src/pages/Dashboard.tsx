import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLayout } from '../components/Layout/LayoutContext';
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
import { API_BASE, API_ENDPOINTS } from '../lib/api';

interface Stats {
  contentCount: number;
  imageCount: number;
  projectCount: number;
  templateCount: number;
  scheduledPostsCount: number;
  seoToolsCount: number;
  editedDesignCount: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const { isCollapsed } = useLayout();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    contentCount: 0,
    imageCount: 0,
    projectCount: 0,
    templateCount: 0,
    scheduledPostsCount: 0,
    seoToolsCount: 0,
    editedDesignCount: 0,
  });
  const [animatedStats, setAnimatedStats] = useState<Stats>(stats);
  const [loading, setLoading] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Profile state
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [gender, setGender] = useState('male');
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

  // Calculate profile completion percentage with weighted fields
  const calculateProfileCompletion = () => {
    const fields = [
      { value: fullName, weight: 2 }, // Basic info - higher weight
      { value: phoneNumber, weight: 1 },
      { value: avatarUrl, weight: 1 },
      { value: companyName, weight: 3 }, // Business info - higher weight
      { value: industry, weight: 2 },
      { value: businessType, weight: 2 },
      { value: location, weight: 1 },
      { value: companySize, weight: 1 },
      { value: targetAudience, weight: 2 },
      { value: brandVoice, weight: 1 },
      { value: goals, weight: 2 },
      { value: linkedinUrl, weight: 1 }, // Social links - lower weight
      { value: instagramUrl, weight: 1 },
      { value: facebookUrl, weight: 1 }
    ];

    const totalWeight = fields.reduce((sum, field) => sum + field.weight, 0);
    const filledWeight = fields
      .filter(field => field.value && field.value.trim() !== '')
      .reduce((sum, field) => sum + field.weight, 0);

    return Math.round((filledWeight / totalWeight) * 100);
  };

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
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
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
        editedDesignCount: data.edited_design || 0,
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
        setGender("male");
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
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
      const res = await fetch(`${apiBase}/api/profiles/${encodeURIComponent(user.id)}`);
      const existing = res.ok ? (await res.json()).profile : null;
      if (existing) {
        setFullName(existing.full_name || "");
        setPhoneNumber(existing.phone || existing.phone_number || "");
        setAvatarUrl(existing.avatar_url || "");
        setGender(existing.gender || "male");
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
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
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
          gender,
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

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      const url = await uploadImage(file, user.id);
      if (url) {
        setAvatarUrl(url);
        toast.success('Profile picture uploaded successfully!');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image');
    }
  };

  useEffect(() => {
    if (user) {
      loadStats();
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    const shouldShow = localStorage.getItem('showWelcome') === 'true';
    if (shouldShow) {
      setShowWelcome(true);
      localStorage.removeItem('showWelcome');
    }
  }, []);

  // Auto-resume LinkedIn connection (moved from Login to prevent blocking)
  useEffect(() => {
    const resumeLinkedInConnection = async () => {
      const pendingCode = localStorage.getItem('li_pending_code');
      if (!pendingCode || !user) return;

      // Use timeout to not block initial dashboard load
      setTimeout(async () => {
        try {
          toast.loading('Finishing LinkedIn connection...', { id: 'li-connect' });
          const token = localStorage.getItem('auth_token');
          const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI || `${window.location.origin}/linkedin-callback`;

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);

          const resp = await fetch(`${API_BASE}${API_ENDPOINTS.LINKEDIN_EXCHANGE_CODE}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify({ code: pendingCode, redirect_uri: redirectUri }),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          const data = await resp.json();
          if (!resp.ok) throw new Error(data.error || 'Failed to connect LinkedIn');

          toast.success('LinkedIn connected!', { id: 'li-connect' });
          localStorage.removeItem('li_pending_code');

          // If there is a pending post, publish it
          const pendingRaw = localStorage.getItem('li_pending_post');
          if (pendingRaw) {
            const pending = JSON.parse(pendingRaw);
            if (pending?.content) {
              toast.loading('Posting to LinkedIn...', { id: 'li-post' });
              const postController = new AbortController();
              const postTimeoutId = setTimeout(() => postController.abort(), 15000);

              const postResp = await fetch(`${API_BASE}${API_ENDPOINTS.LINKEDIN_POST}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ content: pending.content, image_url: pending.image_url || null }),
                signal: postController.signal
              });
              clearTimeout(postTimeoutId);

              const postData = await postResp.json();
              if (!postResp.ok) throw new Error(postData.error || 'Failed to post to LinkedIn');
              toast.success('Posted to LinkedIn!', { id: 'li-post' });
            }
            localStorage.removeItem('li_pending_post');
          }
        } catch (ex: any) {
          if (ex.name === 'AbortError') {
            toast.error('LinkedIn connection timed out. Please try again from the LinkedIn Post Generator.', { id: 'li-connect' });
          } else {
            toast.error(ex?.message || 'Failed to finish LinkedIn connection', { id: 'li-connect' });
          }
        }
      }, 2000); // Wait 2 seconds after dashboard loads
    };

    resumeLinkedInConnection();
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className={isCollapsed ? "py-2 sm:py-4 lg:py-6" : "p-4 sm:p-6 lg:p-8"}>
        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        </div>
      </div>
    </div>
  );
}