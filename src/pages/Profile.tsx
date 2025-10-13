import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
// import { getMongoDb } from "../lib/realm";
import { uploadImage } from "../utils/uploadImage";
import { User, Mail, Phone, Camera, Building2, MapPin, Users, Volume2, Target, Trophy, Edit3, Save, X, Briefcase, Linkedin, Instagram, Facebook, Sparkles, Palette, FileText, Award, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
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
      { value: brandAbout, weight: 1 },
      { value: brandMotto, weight: 1 },
      { value: brandMission, weight: 1 },
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

  // Fetch or create profile data
  useEffect(() => {
    const fetchOrCreateProfile = async () => {
      if (!user) return;
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


  const handleConnectLinkedin = () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI || `${window.location.origin}/linkedin-callback`;
    const scope = encodeURIComponent('openid profile w_member_social');
    const state = Math.random().toString(36).slice(2);
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;

    window.location.href = authUrl;
  };

  //

  if (!user) return <div>No user logged in</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-blue-900/20 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 backdrop-blur-sm">
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
                  stroke="#d1d5db"
                  strokeWidth="3"
                  className="dark:stroke-gray-600"
                />
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray={`${calculateProfileCompletion()}, 100`}
                  className="dark:stroke-blue-400"
                  strokeLinecap="round"
                />
              </svg>
              <img
                src={avatarUrl || `https://api.dicebear.com/7.x/personas/png?seed=${encodeURIComponent(fullName || "User")}`}
                alt="Avatar"
                className="absolute inset-2 w-28 h-28 rounded-full border-4 border-white dark:border-gray-700 shadow-xl group-hover:scale-105 transition-transform duration-300 z-20"
              />
              <label className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2.5 rounded-full cursor-pointer hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 z-30">
                <Camera className="w-4 h-4" />
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
              </label>
            </div>
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {fullName || "Your Name"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">{(user as any)?.profile?.email || (user as any)?.customData?.email || ''}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                {companyName && industry ? `${companyName} • ${industry}` : 'Complete your profile to get started'}
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{calculateProfileCompletion()}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Profile Complete</div>
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">Premium</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Account Type</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info & Social */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Basic Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="w-4 h-4" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="w-4 h-4" /> Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="w-4 h-4" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={(user as any)?.profile?.email || (user as any)?.customData?.email || ''}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-600 dark:border-gray-500 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FileText className="w-4 h-4" /> Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Tell the world who you are..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Globe className="w-4 h-4" /> Locale
                    </label>
                    <select
                      value={locale}
                      onChange={(e) => setLocale(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="en-IN">English (India)</option>
                      <option value="en-US">English (US)</option>
                      <option value="hi-IN">Hindi (India)</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Globe className="w-4 h-4" /> Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="UTC">UTC</option>
                      <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                  <Linkedin className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Social Links
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Instagram className="w-4 h-4 text-pink-600" /> Instagram URL
                  </label>
                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Facebook className="w-4 h-4 text-blue-600" /> Facebook URL
                  </label>
                  <input
                    type="url"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Optional. Add your social profiles to improve content suggestions.</p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 transition-all font-medium shadow-lg hover:shadow-xl"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Business Personalization */}
          <div className="space-y-6">
            {/* Business Personalization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-3">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Business Personalization
                  </h2>
                </div>
                <button
                  onClick={() => setEditingPersonalization(!editingPersonalization)}
                  className="flex items-center gap-2 px-4 py-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
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
                        <Building2 className="w-4 h-4" /> Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Target className="w-4 h-4" /> Industry
                      </label>
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your industry"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Briefcase className="w-4 h-4" /> Business Type
                      </label>
                      <input
                        type="text"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., Startup, Small Business"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4" /> Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="City, State, Country"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Users className="w-4 h-4" /> Company Size
                      </label>
                      <input
                        type="text"
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., 1-10 employees"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Volume2 className="w-4 h-4" /> Brand Voice
                      </label>
                      <input
                        type="text"
                        value={brandVoice}
                        onChange={(e) => setBrandVoice(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., Professional, Friendly"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Target className="w-4 h-4" /> Target Audience
                      </label>
                      <input
                        type="text"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Who is your target audience?"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Trophy className="w-4 h-4" /> Primary Goals
                      </label>
                      <textarea
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="What are your main business goals?"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FileText className="w-4 h-4" /> About your brand/company
                      </label>
                      <textarea
                        value={brandAbout}
                        onChange={(e) => setBrandAbout(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Share more details for better personalization"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Sparkles className="w-4 h-4" /> Brand Motto (short)
                        </label>
                        <input
                          type="text"
                          value={brandMotto}
                          onChange={(e) => setBrandMotto(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Empowering growth through creativity"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Award className="w-4 h-4" /> Brand Mission
                        </label>
                        <input
                          type="text"
                          value={brandMission}
                          onChange={(e) => setBrandMission(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Our mission is..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSavePersonalization}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 disabled:opacity-50 transition-all font-medium shadow-lg hover:shadow-xl flex-1"
                    >
                      <Save className="w-4 h-4" /> {loading ? "Saving Business Info..." : "Save Business Info"}
                    </button>
                    <button
                      onClick={() => setEditingPersonalization(false)}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all font-medium shadow-lg hover:shadow-xl"
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
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Company</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{companyName}</p>
                          </div>
                        </div>
                      )}
                      {industry && (
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Industry</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{industry}</p>
                          </div>
                        </div>
                      )}
                      {businessType && (
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                          <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Business Type</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{businessType}</p>
                          </div>
                        </div>
                      )}
                      {location && (
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200/50 dark:border-red-700/50">
                          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{location}</p>
                          </div>
                        </div>
                      )}
                      {companySize && (
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50">
                          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Company Size</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{companySize}</p>
                          </div>
                        </div>
                      )}
                      {brandVoice && (
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-indigo-200/50 dark:border-indigo-700/50">
                          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                            <Volume2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Brand Voice</p>
                            <p className="font-semibold text-gray-900 dark:text-white capitalize">{brandVoice}</p>
                          </div>
                        </div>
                      )}
                      {targetAudience && (
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-200/50 dark:border-cyan-700/50">
                          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Target Audience</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{targetAudience}</p>
                          </div>
                        </div>
                      )}
                      {goals && (
                        <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50">
                          <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center mt-1">
                            <Trophy className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Goals</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{goals}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Complete your business information to get personalized content recommendations.
                      </p>
                      <button
                        onClick={() => navigate('/personalization')}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-medium shadow-lg hover:shadow-xl"
                      >
                        Complete Personalization
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
