import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Building2, Users, Volume2, Briefcase, Trophy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
// import { getMongoDb } from '../../lib/realm';
import toast from 'react-hot-toast';

interface PersonalizationData {
  industry: string;
  businessType: string;
  location: string;
  companySize: string;
  targetAudience: string;
  brandVoice: string;
  companyName: string;
  goals: string[];
  linkedinUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  primaryBrandColor?: string;
  brandMotto?: string;
  brandMission?: string;
  brandAbout?: string;
  includeBrandLogoByDefault?: boolean;
  brandLogoUrl?: string;
  brandLogoPublicId?: string;
}

const INDUSTRIES = [
  'Healthcare & Medical',
  'Technology & Software',
  'Marketing & Advertising',
  'Education & Training',
  'E-commerce & Retail',
  'Finance & Banking',
  'Real Estate',
  'Food & Beverage',
  'Fashion & Beauty',
  'Travel & Tourism',
  'Non-profit & NGO',
  'Consulting & Services',
  'Manufacturing',
  'Entertainment & Media',
  'Other'
];

const BUSINESS_TYPES = [
  'Startup',
  'Small Business',
  'Medium Enterprise',
  'Large Corporation',
  'Agency',
  'Freelancer',
  'Non-profit',
  'Government',
  'Educational Institution'
];

const COMPANY_SIZES = [
  'Just me (1)',
  'Small team (2-10)',
  'Medium team (11-50)',
  'Large team (51-200)',
  'Enterprise (200+)'
];

const BRAND_VOICES = [
  { value: 'professional', label: 'Professional', description: 'Formal and authoritative' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
  { value: 'innovative', label: 'Innovative', description: 'Forward-thinking and creative' },
  { value: 'trustworthy', label: 'Trustworthy', description: 'Reliable and dependable' },
  { value: 'energetic', label: 'Energetic', description: 'Dynamic and enthusiastic' }
];

const TARGET_AUDIENCES = [
  'B2B Decision Makers',
  'Small Business Owners',
  'Entrepreneurs',
  'Young Professionals',
  'Students',
  'Parents & Families',
  'Seniors (55+)',
  'Tech Enthusiasts',
  'Health & Wellness Focused',
  'Budget-Conscious Consumers',
  'Luxury Market',
  'Local Community',
  'International Market',
  'Other'
];

const GOALS = [
  'Increase brand awareness',
  'Generate leads',
  'Drive sales',
  'Build community',
  'Educate audience',
  'Launch new product',
  'Improve customer retention',
  'Expand market reach',
  'Establish thought leadership',
  'Increase website traffic',
  'Other'
];

export function ProfilePersonalization() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSkipping, setIsSkipping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PersonalizationData>({
    industry: '',
    businessType: '',
    location: '',
    companySize: '',
    targetAudience: '',
    brandVoice: 'professional',
    companyName: '',
    goals: [],
    linkedinUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    primaryBrandColor: '#0033FF',
    brandMotto: '',
    brandMission: '',
    brandAbout: '',
    includeBrandLogoByDefault: false,
    brandLogoUrl: '',
    brandLogoPublicId: ''
  });

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/dashboard';

  const steps = [
    {
      id: 'company',
      title: 'Tell us about your company',
      icon: Building2,
      fields: ['companyName', 'industry', 'businessType']
    },
    {
      id: 'details',
      title: 'Company details',
      icon: Briefcase,
      fields: ['companySize', 'location']
    },
    {
      id: 'audience',
      title: 'Who is your audience?',
      icon: Users,
      fields: ['targetAudience']
    },
    {
      id: 'voice',
      title: 'What\'s your brand voice?',
      icon: Volume2,
      fields: ['brandVoice']
    },
    {
      id: 'brand',
      title: 'Brand identity (color, motto, mission)',
      icon: Sparkles,
      fields: []
    },
    {
      id: 'goals',
      title: 'What are your goals?',
      icon: Trophy,
      fields: ['goals']
    }
  ];

  const handleInputChange = (field: keyof PersonalizationData, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Auto-save after a short delay
    if (user) {
      clearTimeout(autoSaveTimeout);
      autoSaveTimeout = setTimeout(() => {
        saveProfileData();
      }, 1000); // Save after 1 second of inactivity
    }
  };

  let autoSaveTimeout: NodeJS.Timeout;

  const saveProfileData = async () => {
    if (!user) return;

    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
      await fetch(`${apiBase}/api/profiles/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          company_name: formData.companyName,
          industry: formData.industry,
          business_type: formData.businessType,
          location: formData.location,
          company_size: formData.companySize,
          target_audience: formData.targetAudience,
          brand_voice: formData.brandVoice,
          goals: formData.goals.join(', '),
          linkedin_url: formData.linkedinUrl || null,
          instagram_url: formData.instagramUrl || null,
          facebook_url: formData.facebookUrl || null,
          primary_brand_color: formData.primaryBrandColor || null,
          brand_motto: formData.brandMotto || null,
          brand_mission: formData.brandMission || null,
          brand_about: formData.brandAbout || null,
          brand_logo_url: formData.brandLogoUrl || null,
          brand_logo_public_id: formData.brandLogoPublicId || null,
          image_prefs: {
            include_brand_logo_by_default: Boolean(formData.includeBrandLogoByDefault),
            apply_brand_theme_by_default: true
          },
          updated_at: new Date().toISOString(),
        })
      });
      // Don't show toast for auto-save to avoid spam
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const handleBrandLogoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    // Convert to base64
    const toBase64 = (f: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1] || '';
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });
    try {
      const dataUrl = await toBase64(file);
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
      const resp = await fetch(`${apiBase}/api/upload-brand-logo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl })
      });
      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data?.error || 'Upload failed');
      setFormData(prev => ({
        ...prev,
        brandLogoUrl: data.image_url,
        brandLogoPublicId: data.public_id
      }));
      toast.success('Brand logo uploaded');
    } catch (err: any) {
      toast.error('Failed to upload brand logo: ' + (err?.message || 'Unknown error'));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
      const response = await fetch(`${apiBase}/api/profiles/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          company_name: formData.companyName,
          industry: formData.industry,
          business_type: formData.businessType,
          location: formData.location,
          company_size: formData.companySize,
          target_audience: formData.targetAudience,
          brand_voice: formData.brandVoice,
          goals: formData.goals.join(', '),
          linkedin_url: formData.linkedinUrl || null,
          instagram_url: formData.instagramUrl || null,
          facebook_url: formData.facebookUrl || null,
          primary_brand_color: formData.primaryBrandColor || null,
          brand_motto: formData.brandMotto || null,
          brand_mission: formData.brandMission || null,
          brand_about: formData.brandAbout || null,
          brand_logo_url: formData.brandLogoUrl || null,
          brand_logo_public_id: formData.brandLogoPublicId || null,
          image_prefs: {
            include_brand_logo_by_default: Boolean(formData.includeBrandLogoByDefault),
            apply_brand_theme_by_default: true
          },
          is_profile_complete: true,
          profile_completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
      }

      toast.success('Profile completed successfully!');
      console.log('Profile completion successful, navigating to:', returnTo);
      // Clear skip flag if it was set previously for this user
      try { if (user?.id) localStorage.removeItem(`skip_personalization_${user.id}`); } catch {}
      navigate(returnTo, { replace: true, state: { profileCompleted: true } });
    } catch (error: any) {
      toast.error('Failed to save profile: ' + error.message);
    }
    setLoading(false);
  };

  const handleSkip = async () => {
    if (!user) return;

    setIsSkipping(true);
    try {
      // Use backend API to mark profile as complete
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
      const response = await fetch(`${apiBase}/api/profiles/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          is_profile_complete: true,
          profile_completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
      }

      toast.success('You can complete your profile later from the Profile page');
      // Persist skip intent so guard will not re-open this flow on next navigation/login
      try { if (user?.id) localStorage.setItem(`skip_personalization_${user.id}`, 'true'); } catch {}
      navigate(returnTo, { replace: true, state: { profileCompleted: true } });
    } catch (error: any) {
      toast.error('Failed to skip setup: ' + error.message);
    }
    setIsSkipping(false);
  };

  const renderStep = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'company':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your company name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your industry</option>
                {INDUSTRIES.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {BUSINESS_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleInputChange('businessType', type)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      formData.businessType === type
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Size
              </label>
              <div className="space-y-3">
                {COMPANY_SIZES.map(size => (
                  <label key={size} className="flex items-center">
                    <input
                      type="radio"
                      name="companySize"
                      value={size}
                      checked={formData.companySize === size}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-gray-700 dark:text-gray-300">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location (Optional)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, State, Country"
              />
            </div>
          </div>
        );

      case 'audience':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Target Audience
              </label>
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {TARGET_AUDIENCES.map(audience => (
                  <button
                    key={audience}
                    type="button"
                    onClick={() => handleInputChange('targetAudience', audience)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      formData.targetAudience === audience
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500'
                    }`}
                  >
                    {audience}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'voice':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Voice & Tone
              </label>
              <div className="space-y-3">
                {BRAND_VOICES.map(voice => (
                  <label key={voice.value} className="flex items-start p-4 rounded-lg border cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <input
                      type="radio"
                      name="brandVoice"
                      value={voice.value}
                      checked={formData.brandVoice === voice.value}
                      onChange={(e) => handleInputChange('brandVoice', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-700 dark:text-gray-300">{voice.label}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{voice.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'brand':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Brand Color
              </label>
              <input
                type="color"
                value={formData.primaryBrandColor}
                onChange={(e) => handleInputChange('primaryBrandColor', e.target.value)}
                className="h-10 w-24 p-1 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Motto (short)
              </label>
              <input
                type="text"
                value={formData.brandMotto}
                onChange={(e) => handleInputChange('brandMotto', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Empowering growth through creativity"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Mission
              </label>
              <textarea
                rows={3}
                value={formData.brandMission}
                onChange={(e) => handleInputChange('brandMission', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your mission"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                About your brand/company
              </label>
              <textarea
                rows={4}
                value={formData.brandAbout}
                onChange={(e) => handleInputChange('brandAbout', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Anything else we should know to personalize content?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Logo (optional)
              </label>
              <div className="flex items-center space-x-4">
                {formData.brandLogoUrl ? (
                  <img src={formData.brandLogoUrl} className="w-16 h-16 rounded border border-gray-300 dark:border-gray-600 object-contain" alt="Brand logo" />
                ) : (
                  <div className="w-16 h-16 rounded border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs text-gray-500">No logo</div>
                )}
                <label className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">
                  Upload Logo
                  <input type="file" accept="image/*" hidden onChange={handleBrandLogoSelect} />
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="includeBrandLogoByDefault"
                type="checkbox"
                checked={!!formData.includeBrandLogoByDefault}
                onChange={(e) => handleInputChange('includeBrandLogoByDefault', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeBrandLogoByDefault" className="text-sm text-gray-700 dark:text-gray-300">
                Include my company logo on generated images by default (premium only)
              </label>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Goals (Select all that apply)
              </label>
              <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                {GOALS.map(goal => (
                  <label key={goal} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(goal)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData(prev => ({
                          ...prev,
                          goals: isChecked
                            ? [...prev.goals, goal]
                            : prev.goals.filter(g => g !== goal)
                        }));
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-gray-700 dark:text-gray-300">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={formData.instagramUrl}
                  onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Facebook URL</label>
                <input
                  type="url"
                  value={formData.facebookUrl}
                  onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isCurrentStepValid = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case 'company':
        return formData.companyName && formData.industry && formData.businessType;
      case 'details':
        return formData.companySize;
      case 'audience':
        return formData.targetAudience;
      case 'voice':
        return formData.brandVoice;
      case 'brand':
        return true; // Brand step is optional
      case 'goals':
        return formData.goals.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Let's personalize your experience
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Help us understand your business to create better content for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={handleSkip}
              disabled={isSkipping}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
            >
              Skip for now
            </button>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
              {React.createElement(steps[currentStep].icon, { className: "w-6 h-6 text-white" })}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {steps[currentStep].title}
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!isCurrentStepValid() || loading}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Saving...' : 'Complete Setup'}
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!isCurrentStepValid()}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

