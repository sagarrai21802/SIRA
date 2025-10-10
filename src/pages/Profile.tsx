import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
// import { getMongoDb } from "../lib/realm";
import { uploadImage } from "../utils/uploadImage";
import { User, Mail, Phone, Camera, Building2, MapPin, Users, Volume2, Target, Trophy, Edit3, Save, X, Briefcase, Linkedin, Instagram, Facebook } from "lucide-react";
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
  // Social links
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");

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
        setCompanyName(existing.company_name || "");
        setIndustry(existing.industry || "");
        setBusinessType(existing.business_type || "");
        setLocation(existing.location || "");
        setCompanySize(existing.company_size || "");
        setTargetAudience(existing.target_audience || "");
        setBrandVoice(existing.brand_voice || "professional");
        setGoals(existing.goals || "");
        setBrandAbout(existing.brand_about || "");
        setBrandMotto(existing.brand_motto || "");
        setBrandMission(existing.brand_mission || "");
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
          brand_about: brandAbout,
          brand_motto: brandMotto,
          brand_mission: brandMission,
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <img
              src={avatarUrl || `https://api.dicebear.com/7.x/personas/png?seed=${encodeURIComponent(fullName || "User")}`}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600"
            />
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
              <Camera className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {fullName || "Your Name"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{(user as any)?.profile?.email || (user as any)?.customData?.email || ''}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              {companyName && industry ? `${companyName} • ${industry}` : 'Complete your profile to get started'}
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <User className="w-4 h-4" /> Full Name
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
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Phone className="w-4 h-4" /> Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <input
              type="email"
              value={(user as any)?.profile?.email || (user as any)?.customData?.email || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-600 dark:border-gray-500 text-gray-500"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Social Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Linkedin className="w-4 h-4" /> LinkedIn URL
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Instagram className="w-4 h-4" /> Instagram URL
            </label>
            <input
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://instagram.com/yourhandle"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Facebook className="w-4 h-4" /> Facebook URL
            </label>
            <input
              type="url"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://facebook.com/yourpage"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Optional. Add your social profiles to improve content suggestions.</p>
      </div>

      {/* Business Personalization */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Business Personalization
          </h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Building2 className="w-4 h-4" /> Company Name
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
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Target className="w-4 h-4" /> Industry
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Professional, Friendly"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Target className="w-4 h-4" /> Target Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What are your main business goals?"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                About your brand/company
              </label>
              <textarea
                value={brandAbout}
                onChange={(e) => setBrandAbout(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share more details for better personalization"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Brand Motto (short)
                </label>
                <input
                  type="text"
                  value={brandMotto}
                  onChange={(e) => setBrandMotto(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Empowering growth through creativity"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Brand Mission
                </label>
                <input
                  type="text"
                  value={brandMission}
                  onChange={(e) => setBrandMission(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Our mission is..."
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSavePersonalization}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
              >
                <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setEditingPersonalization(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {companyName || industry || businessType || location || companySize || targetAudience || goals ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companyName && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Building2 className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Company</p>
                      <p className="font-medium text-gray-900 dark:text-white">{companyName}</p>
                    </div>
                  </div>
                )}
                {industry && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Target className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Industry</p>
                      <p className="font-medium text-gray-900 dark:text-white">{industry}</p>
                    </div>
                  </div>
                )}
                {businessType && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Business Type</p>
                      <p className="font-medium text-gray-900 dark:text-white">{businessType}</p>
                    </div>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">{location}</p>
                    </div>
                  </div>
                )}
                {companySize && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Users className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Company Size</p>
                      <p className="font-medium text-gray-900 dark:text-white">{companySize}</p>
                    </div>
                  </div>
                )}
                {brandVoice && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Volume2 className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Brand Voice</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{brandVoice}</p>
                    </div>
                  </div>
                )}
                {targetAudience && (
                  <div className="md:col-span-2 flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Target className="w-5 h-5 text-cyan-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Target Audience</p>
                      <p className="font-medium text-gray-900 dark:text-white">{targetAudience}</p>
                    </div>
                  </div>
                )}
                {goals && (
                  <div className="md:col-span-2 flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Trophy className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Goals</p>
                      <p className="font-medium text-gray-900 dark:text-white">{goals}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Complete your business information to get personalized content recommendations.
                </p>
                <button
                  onClick={() => navigate('/personalization')}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Complete Personalization
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
