import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { uploadImage } from "../utils/uploadImage";
import { 
  User, Mail, Phone, Camera, Building2, MapPin, Users, Volume2, Target, Trophy, Edit3, Save, X, 
  Briefcase, Linkedin, Instagram, Facebook, Sparkles, Palette, FileText, Award, Globe, Image as ImageIcon,
  Loader2, CheckCircle, AlertCircle, Crown, Shield, Zap
} from "lucide-react";
import toast from "react-hot-toast";

export default function Profile() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [editingPersonalization, setEditingPersonalization] = useState(false);
  
  // Personalization fields
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [location, setLocation] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [brandVoice, setBrandVoice] = useState("professional");
  const [goals, setGoals] = useState("");
  const [brandAbout, setBrandAbout] = useState("");
  const [brandMotto, setBrandMotto] = useState("");
  const [brandMission, setBrandMission] = useState("");
  const [primaryBrandColor, setPrimaryBrandColor] = useState<string>("#0033FF");
  const [brandLogoUrl, setBrandLogoUrl] = useState<string>("");
  const [brandLogoPublicId, setBrandLogoPublicId] = useState<string>("");
  const [includeLogoDefault, setIncludeLogoDefault] = useState<boolean>(false);
  // Social links
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  // Basic profile fields
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [locale, setLocale] = useState("en-IN");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  // Calculate profile completion percentage with weighted fields
  const calculateProfileCompletion = () => {
    const fields = [
      { value: fullName, weight: 2 },
      { value: phoneNumber, weight: 1 },
      { value: avatarUrl, weight: 1 },
      { value: companyName, weight: 3 },
      { value: industry, weight: 2 },
      { value: businessType, weight: 2 },
      { value: location, weight: 1 },
      { value: companySize, weight: 1 },
      { value: targetAudience, weight: 2 },
      { value: brandVoice, weight: 1 },
      { value: goals, weight: 2 },
      { value: brandAbout, weight: 1 },
      { value: brandMotto, weight: 1 },
      { value: brandMission, weight: 1 },
      { value: linkedinUrl, weight: 1 },
      { value: instagramUrl, weight: 1 },
      { value: facebookUrl, weight: 1 }
    ];

    const totalWeight = fields.reduce((sum, field) => sum + field.weight, 0);
    const filledWeight = fields
      .filter(field => field.value && field.value.trim() !== '')
      .reduce((sum, field) => sum + field.weight, 0);

    return Math.round((filledWeight / totalWeight) * 100);
  };

  // Fetch or create profile data
  useEffect(() => {
    const fetchOrCreateProfile = async () => {
      if (!user) return;
      try {
        const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
        const res = await fetch(`${apiBase}/api/profiles/${encodeURIComponent(user.id)}`);
        const existing = res.ok ? (await res.json()).profile : null;
        if (existing) {
          setFullName(existing.full_name || "");
          setPhoneNumber(existing.phone || existing.phone_number || "");
          setAvatarUrl(existing.avatar_url || "");
          setUsername(existing.username || "");
          setBio(existing.bio || "");
          setLocale(existing.locale || "en-IN");
          setTimezone(existing.timezone || "Asia/Kolkata");
          setCompanyName(existing.company_name || "");
          setIndustry(existing.industry || "");
          setBusinessType(existing.business_type || "");
          setLocation(existing.location || "");
          setCompanySize(existing.company_size || "");
          setTargetAudience(existing.target_audience || "");
          setBrandVoice(existing.brand_voice || "professional");
          setGoals(existing.goals || "");
          setPrimaryBrandColor(existing.primary_brand_color || "#0033FF");
          setBrandAbout(existing.brand_about || "");
          setBrandMotto(existing.brand_motto || "");
          setBrandMission(existing.brand_mission || "");
          setBrandLogoUrl(existing.brand_logo_url || "");
          setBrandLogoPublicId(existing.brand_logo_public_id || "");
          setIncludeLogoDefault(Boolean(existing.image_prefs?.include_brand_logo_by_default));
          setLinkedinUrl(existing.linkedin_url || "");
          setInstagramUrl(existing.instagram_url || "");
          setFacebookUrl(existing.facebook_url || "");
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchOrCreateProfile();
  }, [user]);

  // Save profile updates
  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
      const resp = await fetch(`${apiBase}/api/profiles/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          full_name: fullName,
          phone: phoneNumber,
          avatar_url: avatarUrl,
          username,
          bio,
          locale,
          timezone,
          linkedin_url: linkedinUrl || null,
          instagram_url: instagramUrl || null,
          facebook_url: facebookUrl || null,
        })
      });
      if (!resp.ok) throw new Error(await resp.text());
      toast.success("Profile updated successfully!");
    } catch (e: any) {
      toast.error("Update failed: " + (e?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Save personalization data
  const handleSavePersonalization = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
      const resp = await fetch(`${apiBase}/api/profiles/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          company_name: companyName,
          industry,
          business_type: businessType,
          location,
          company_size: companySize,
          target_audience: targetAudience,
          brand_voice: brandVoice,
          goals,
          primary_brand_color: primaryBrandColor,
          brand_about: brandAbout,
          brand_motto: brandMotto,
          brand_mission: brandMission,
          brand_logo_url: brandLogoUrl || null,
          brand_logo_public_id: brandLogoPublicId || null,
          image_prefs: {
            include_brand_logo_by_default: includeLogoDefault,
            apply_brand_theme_by_default: true
          },
          is_profile_complete: true,
          profile_completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      });
      if (!resp.ok) throw new Error(await resp.text());
      setEditingPersonalization(false);
      toast.success('Personalization updated successfully!');
    } catch (error: any) {
      toast.error('Failed to update personalization: ' + (error?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Handle avatar change
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !user) return;
    const file = e.target.files[0];
    const url = await uploadImage(file, user.id);
    if (url) setAvatarUrl(url);
  };

  // Handle brand logo upload
  const handleUploadBrandLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !user) return;
    const file = e.target.files[0];
    
    const toDataUrl = (f: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });

    try {
      const dataUrl = await toDataUrl(file);
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
      const resp = await fetch(`${apiBase}/api/upload-brand-logo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl })
      });
      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data?.error || 'Upload failed');
      setBrandLogoUrl(data.image_url);
      setBrandLogoPublicId(data.public_id);
      toast.success('Brand logo uploaded successfully!');
    } catch (error: any) {
      toast.error('Failed to upload brand logo: ' + (error?.message || 'Unknown error'));
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-medium">Loading profile...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-900/30 mb-4 inline-block">
            <AlertCircle className="w-12 h-12 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No User Logged In</h2>
          <p className="text-gray-600 dark:text-gray-400">Please log in to view your profile.</p>
        </motion.div>
      </div>
    );
  }

  const completionPercentage = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="relative group flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <svg
                className="relative w-32 h-32 transform -rotate-90 z-10"
                viewBox="0 0 36 36"
              >
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                  className="dark:stroke-gray-600"
                />
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeDasharray={`${completionPercentage}, 100`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                </defs>
              </svg>
              <img
                src={avatarUrl || `https://api.dicebear.com/7.x/personas/png?seed=${encodeURIComponent(fullName || "User")}`}
                alt="Avatar"
                className="absolute inset-2 w-28 h-28 rounded-full border-4 border-white dark:border-gray-700 shadow-xl group-hover:scale-105 transition-transform duration-300 z-20"
              />
              <label className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-2.5 rounded-full cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 z-30">
                <Camera className="w-4 h-4" />
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
              </label>
            </div>
            <div className="text-center lg:text-left flex-1">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {fullName || "Your Name"}
                </h1>
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full text-white text-xs font-semibold">
                  <Crown className="w-3 h-3" />
                  Premium
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                {(user as any)?.profile?.email || (user as any)?.customData?.email || ''}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                {companyName && industry ? `${companyName} • ${industry}` : 'Complete your profile to get started'}
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {completionPercentage}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Profile Complete</div>
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                    <Shield className="w-5 h-5" />
                    Active
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Account Status</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info & Social */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                  Basic Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="w-4 h-4 text-blue-500" /> Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="w-4 h-4 text-blue-500" /> Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="@username"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="w-4 h-4 text-blue-500" /> Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={(user as any)?.profile?.email || (user as any)?.customData?.email || ''}
                      readOnly
                      className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-500 cursor-not-allowed"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="w-4 h-4 text-blue-500" /> Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FileText className="w-4 h-4 text-blue-500" /> Bio
                  </label>
                  <div className="relative">
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell the world who you are..."
                    />
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Globe className="w-4 h-4 text-blue-500" /> Locale
                    </label>
                    <div className="relative">
                      <select
                        value={locale}
                        onChange={(e) => setLocale(e.target.value)}
                        className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                      >
                        <option value="en-IN">English (India)</option>
                        <option value="en-US">English (US)</option>
                        <option value="hi-IN">Hindi (India)</option>
                      </select>
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Globe className="w-4 h-4 text-blue-500" /> Timezone
                    </label>
                    <div className="relative">
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="UTC">UTC</option>
                        <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                      </select>
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Linkedin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                  Social Links
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Instagram className="w-4 h-4 text-pink-600" /> Instagram URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://instagram.com/yourhandle"
                    />
                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Facebook className="w-4 h-4 text-blue-700" /> Facebook URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://facebook.com/yourpage"
                    />
                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Optional. Add your social profiles to improve content suggestions.
              </p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl disabled:opacity-50 transition-all font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Business Personalization */}
          <div className="space-y-6">
            {/* Business Personalization */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/30">
                    <Building2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                    Business Personalization
                  </h2>
                </div>
                <button
                  onClick={() => setEditingPersonalization(!editingPersonalization)}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors font-medium"
                >
                  {editingPersonalization ? (
                    <>
                      <X className="w-4 h-4" /> Cancel
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" /> Edit
                    </>
                  )}
                </button>
              </div>

              {editingPersonalization ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Building2 className="w-4 h-4 text-blue-500" /> Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Target className="w-4 h-4 text-blue-500" /> Industry
                      </label>
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your industry"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Briefcase className="w-4 h-4 text-blue-500" /> Business Type
                      </label>
                      <input
                        type="text"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., Startup, Small Business"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 text-blue-500" /> Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="City, State, Country"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Users className="w-4 h-4 text-blue-500" /> Company Size
                      </label>
                      <input
                        type="text"
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., 1-10 employees"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Volume2 className="w-4 h-4 text-blue-500" /> Brand Voice
                      </label>
                      <input
                        type="text"
                        value={brandVoice}
                        onChange={(e) => setBrandVoice(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., Professional, Friendly"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Target className="w-4 h-4 text-blue-500" /> Target Audience
                      </label>
                      <input
                        type="text"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Who is your target audience?"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Trophy className="w-4 h-4 text-blue-500" /> Primary Goals
                      </label>
                      <textarea
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="What are your main business goals?"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FileText className="w-4 h-4 text-blue-500" /> About your brand/company
                      </label>
                      <textarea
                        value={brandAbout}
                        onChange={(e) => setBrandAbout(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Share more details for better personalization"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Sparkles className="w-4 h-4 text-blue-500" /> Brand Motto (short)
                        </label>
                        <input
                          type="text"
                          value={brandMotto}
                          onChange={(e) => setBrandMotto(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Empowering growth through creativity"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Award className="w-4 h-4 text-blue-500" /> Brand Mission
                        </label>
                        <input
                          type="text"
                          value={brandMission}
                          onChange={(e) => setBrandMission(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Our mission is..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Palette className="w-4 h-4 text-blue-500" /> Primary Brand Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={primaryBrandColor}
                          onChange={(e) => setPrimaryBrandColor(e.target.value)}
                          className="w-20 h-12 border border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer"
                        />
                        <input
                          type="text"
                          value={primaryBrandColor}
                          onChange={(e) => setPrimaryBrandColor(e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="#0033FF"
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        This color will be used in your generated content
                      </p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <ImageIcon className="w-4 h-4 text-blue-500" /> Brand Logo
                      </label>
                      <div className="flex items-center gap-4">
                        {brandLogoUrl ? (
                          <img src={brandLogoUrl} alt="Brand logo" className="w-16 h-16 object-contain border border-gray-300 dark:border-gray-600 rounded-xl" />
                        ) : (
                          <div className="w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl cursor-pointer transition-all font-medium shadow-lg hover:shadow-xl">
                          <Camera className="w-4 h-4" /> {brandLogoUrl ? 'Change Logo' : 'Upload Logo'}
                          <input type="file" accept="image/*" onChange={handleUploadBrandLogo} hidden />
                        </label>
                        {brandLogoUrl && (
                          <button
                            onClick={() => {
                              setBrandLogoUrl('');
                              setBrandLogoPublicId('');
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Upload your company logo to include in generated images
                      </p>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/30">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Include logo in images by default</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Automatically add your brand logo to generated images</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeLogoDefault}
                          onChange={(e) => setIncludeLogoDefault(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSavePersonalization}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl disabled:opacity-50 transition-all font-medium shadow-lg hover:shadow-xl flex-1"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {loading ? "Saving..." : "Save Business Info"}
                    </button>
                    <button
                      onClick={() => setEditingPersonalization(false)}
                      className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all font-medium shadow-lg hover:shadow-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {companyName || industry || businessType || location || companySize || targetAudience || goals ? (
                    <div className="grid grid-cols-1 gap-4">
                      {companyName && (
                        <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Company</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{companyName}</p>
                          </div>
                        </div>
                      )}
                      {industry && (
                        <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                          <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/30">
                            <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Industry</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{industry}</p>
                          </div>
                        </div>
                      )}
                      {businessType && (
                        <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                          <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                            <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Business Type</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{businessType}</p>
                          </div>
                        </div>
                      )}
                      {location && (
                        <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200/50 dark:border-red-700/50">
                          <div className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30">
                            <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{location}</p>
                          </div>
                        </div>
                      )}
                      {companySize && (
                        <div className="flex items-center gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50">
                          <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                            <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Company Size</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{companySize}</p>
                          </div>
                        </div>
                      )}
                      {brandVoice && (
                        <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200/50 dark:border-indigo-700/50">
                          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                            <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Brand Voice</p>
                            <p className="font-semibold text-gray-900 dark:text-white capitalize">{brandVoice}</p>
                          </div>
                        </div>
                      )}
                      {targetAudience && (
                        <div className="flex items-center gap-4 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-200/50 dark:border-cyan-700/50">
                          <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-900/30">
                            <Target className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Target Audience</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{targetAudience}</p>
                          </div>
                        </div>
                      )}
                      {goals && (
                        <div className="flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50">
                          <div className="p-2 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 mt-1">
                            <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Goals</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{goals}</p>
                          </div>
                        </div>
                      )}
                      {(primaryBrandColor || brandLogoUrl) && (
                        <div className="flex items-center gap-4 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-200/50 dark:border-pink-700/50">
                          <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-900/30">
                            <Palette className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                          </div>
                          <div className="flex-1 flex items-center gap-4">
                            {primaryBrandColor && (
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Brand Color</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div 
                                    className="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-sm"
                                    style={{ backgroundColor: primaryBrandColor }}
                                  />
                                  <span className="font-semibold text-gray-900 dark:text-white font-mono">{primaryBrandColor}</span>
                                </div>
                              </div>
                            )}
                            {brandLogoUrl && (
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Brand Logo</p>
                                <img src={brandLogoUrl} alt="Brand logo" className="w-12 h-12 object-contain border border-gray-300 dark:border-gray-600 rounded-lg" />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 inline-block mb-4">
                        <Building2 className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Complete Your Business Profile
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                        Add your business information to get personalized content recommendations and better results.
                      </p>
                      <button
                        onClick={() => setEditingPersonalization(true)}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                      >
                        <Zap className="w-4 h-4" />
                        Start Personalization
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
