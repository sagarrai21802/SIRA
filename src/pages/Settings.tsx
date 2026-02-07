import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User, Bell, Shield, Palette, Wallet, Link as LinkIcon, Trash2, Save, Mail, Phone, Globe,
  Loader2, CheckCircle, AlertCircle, Moon, Sun, Monitor, Type, LayoutGrid, Eye, EyeOff,
  Smartphone, CreditCard, FileText, ExternalLink, RefreshCw, Download
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/UI/Card";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { Label } from "../components/UI/Label";
import { Switch } from "../components/UI/Switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/UI/Select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/UI/Tabs";
import { Textarea } from "../components/UI/Input";
import { Separator } from "../components/UI/Separator";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

// Utility: simple section wrapper
const Section: React.FC<React.PropsWithChildren<{ title: string; icon?: React.ReactNode; description?: string; }>> = ({ title, icon, description, children }) => (
  <Card className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
    <CardHeader className="space-y-1">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">{icon}</div>
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{title}</CardTitle>
          {description ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          ) : null}
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">{children}</CardContent>
  </Card>
);

export default function SettingsPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Basic profile state
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    locale: "en-IN",
    timezone: "Asia/Kolkata",
  });

  // Preferences
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const [fontScale, setFontScale] = useState("100");
  const [density, setDensity] = useState("comfortable");

  // Notifications
  const [notif, setNotif] = useState({
    productUpdates: true,
    marketingEmails: false,
    smsAlerts: false,
    pushMentions: true,
    weeklySummary: true,
  });

  // Privacy & security
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    dataCollection: true,
    twoFA: false,
    loginAlerts: true,
    sessionTimeout: "30",
  });

  // Load current profile
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        if (!user) return;
        // Prefill from auth when present
        setProfile(prev => ({
          ...prev,
          name: user.full_name || prev.name,
          email: user.email || prev.email,
          phone: user.phone || prev.phone,
        }));
        const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
        const resp = await fetch(`${apiBase}/api/profiles/${encodeURIComponent(user.id)}`);
        if (!resp.ok) return;
        const data = await resp.json();
        const p = data?.profile || {};
        setProfile(prev => ({
          ...prev,
          name: p.full_name || prev.name,
          username: p.username || "",
          bio: p.bio || "",
        }));
      } catch (e) {
        console.error('Error loading settings:', e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [user]);

  const onSaveAll = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-medium">Loading settings...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto p-4 md:p-8 space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account, preferences, and security.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </Button>
            <Button 
              onClick={onSaveAll} 
              disabled={isSaving}
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-1 shadow-sm border border-gray-200 dark:border-gray-700">
            <TabsTrigger value="account" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Account
            </TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Privacy
            </TabsTrigger>
            <TabsTrigger value="billing" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab - Redirect */}
          <TabsContent value="profile" className="space-y-6">
            <div className="text-center py-16">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 inline-block mb-4">
                <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Profile Settings Moved</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                All profile and personalization settings have been moved to the dedicated Profile page for a better user experience.
              </p>
              <Link to="/profile">
                <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <User className="w-4 h-4" />
                  Go to Profile Page
                </Button>
              </Link>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Section 
              title="Account Security" 
              icon={<Shield className="w-5 h-5 text-blue-600 dark:text-blue-400"/>} 
              description="Login, sessions, and security options."
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" /> Password
                  </Label>
                  <div className="relative">
                    <Input type="password" placeholder="••••••••" className="pl-10" />
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Use at least 12 characters, including numbers & symbols.</p>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                      <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Two-factor authentication (2FA)</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.twoFA} 
                    onCheckedChange={(v) => setPrivacy(p => ({ ...p, twoFA: v }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/30">
                      <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Login alerts</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get an email when a new device signs in.</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.loginAlerts} 
                    onCheckedChange={(v) => setPrivacy(p => ({ ...p, loginAlerts: v }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-gray-500" /> Auto sign-out (minutes)
                  </Label>
                  <div className="relative">
                    <Input 
                      type="number" 
                      min={5} 
                      max={240} 
                      value={privacy.sessionTimeout} 
                      onChange={(e) => setPrivacy(p => ({ ...p, sessionTimeout: e.target.value }))}
                      className="pl-10"
                    />
                    <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </Section>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Section 
              title="Appearance" 
              icon={<Palette className="w-5 h-5 text-purple-600 dark:text-purple-400"/>} 
              description="Theme, density, and accessibility."
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-gray-500" /> Theme
                  </Label>
                  <Select value={theme} onValueChange={(v) => setTheme(v as "system" | "light" | "dark")}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4" /> System
                        </div>
                      </SelectItem>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" /> Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" /> Dark
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-gray-500" /> Font scale
                  </Label>
                  <Select value={fontScale} onValueChange={(v) => setFontScale(v)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="100%" />
                    </SelectTrigger>
                    <SelectContent>
                      {([90, 100, 110, 120, 130] as const).map(size => (
                        <SelectItem key={size} value={String(size)}>{size}%</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-gray-500" /> Density
                  </Label>
                  <Select value={density} onValueChange={(v) => setDensity(v)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Comfortable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Theme Preview */}
              <div className="mt-6 p-6 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> Preview
                </h4>
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-blue-500 bg-white' : 'border-gray-300 dark:border-gray-600'}`}>
                    <Sun className="w-8 h-8 text-amber-500" />
                    <p className="text-xs text-center mt-2 text-gray-600">Light</p>
                  </div>
                  <div className={`p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-blue-500 bg-gray-800' : 'border-gray-300 dark:border-gray-600'}`}>
                    <Moon className="w-8 h-8 text-blue-400" />
                    <p className="text-xs text-center mt-2 text-gray-400">Dark</p>
                  </div>
                  <div className={`p-4 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-blue-500 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900' : 'border-gray-300 dark:border-gray-600'}`}>
                    <Monitor className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                    <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">System</p>
                  </div>
                </div>
              </div>
            </Section>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Section 
              title="Notifications" 
              icon={<Bell className="w-5 h-5 text-amber-600 dark:text-amber-400"/>} 
              description="Choose how you want to be notified."
            >
              <div className="space-y-4">
                {[
                  { key: "productUpdates", title: "Product updates", desc: "Release notes, changelogs, and important changes.", icon: RefreshCw },
                  { key: "marketingEmails", title: "Marketing emails", desc: "Occasional offers and newsletters.", icon: Mail },
                  { key: "smsAlerts", title: "SMS alerts", desc: "Critical alerts delivered via text message.", icon: Smartphone },
                  { key: "pushMentions", title: "Mentions & replies", desc: "Get notified when someone mentions or replies to you.", icon: Bell },
                  { key: "weeklySummary", title: "Weekly summary", desc: "A snapshot of your activity each week.", icon: FileText },
                ].map((row) => (
                  <motion.div 
                    key={row.key} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                        <row.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{row.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{row.desc}</p>
                      </div>
                    </div>
                    <Switch
                      checked={(notif as any)[row.key]}
                      onCheckedChange={(v) => setNotif((prev) => ({ ...(prev as any), [row.key]: v }))}
                    />
                  </motion.div>
                ))}
              </div>
            </Section>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Section 
              title="Privacy" 
              icon={<Shield className="w-5 h-5 text-green-600 dark:text-green-400"/>} 
              description="Control who can see your activity and data."
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-500" /> Profile visibility
                  </Label>
                  <Select value={privacy.profileVisibility} onValueChange={(v) => setPrivacy(p => ({ ...p, profileVisibility: v }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" /> Public
                        </div>
                      </SelectItem>
                      <SelectItem value="followers">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" /> Followers only
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center gap-2">
                          <EyeOff className="w-4 h-4" /> Private
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                      <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Help improve the product</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Share anonymous usage data and crash reports.</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.dataCollection} 
                    onCheckedChange={(v) => setPrivacy(p => ({ ...p, dataCollection: v }))}
                  />
                </div>
              </div>
            </Section>

            {/* Content Complaint Card */}
            <Card className="shadow-xl bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
                  <FileText className="w-5 h-5"/> Report or request deletion of generated content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  If our system generated content that you believe is inaccurate, harmful, or violates rights, you can submit a complaint for review.
                </p>
                <Link to="/complaint-deletion">
                  <Button variant="outline" className="gap-2 rounded-xl">
                    Go to complaint form
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Connected Apps */}
            <Section 
              title="Connected apps" 
              icon={<LinkIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400"/>} 
              description="Manage third-party integrations."
            >
              <div className="space-y-3">
                {[
                  { name: "GitHub", desc: "Used for syncing repositories.", icon: "🐙", color: "bg-gray-100 dark:bg-gray-700" },
                  { name: "Google", desc: "Used for sign-in and calendar access.", icon: "🔍", color: "bg-blue-50 dark:bg-blue-900/30" },
                ].map((app) => (
                  <motion.div 
                    key={app.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${app.color}`}>
                        <span className="text-lg">{app.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{app.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{app.desc}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">Disconnect</Button>
                  </motion.div>
                ))}
              </div>
            </Section>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Section 
              title="Billing & Subscription" 
              icon={<Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400"/>} 
              description="Manage your subscription and payment methods."
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-500" /> Current Plan
                  </Label>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Pro Plan</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Monthly billing</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500" /> Next invoice
                  </Label>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                    <p className="font-medium text-gray-900 dark:text-white">September 18, 2025</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">$29.00 will be charged</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-500" /> Card on file
                  </Label>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-end">
                  <Button variant="outline" className="gap-2 rounded-xl">
                    <CreditCard className="w-4 h-4" /> Update payment method
                  </Button>
                </div>
              </div>
            </Section>

            {/* Danger Zone */}
            <Card className="shadow-xl bg-red-50/50 dark:bg-red-900/20 backdrop-blur-sm rounded-2xl border border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
                  <Trash2 className="w-5 h-5"/> Danger zone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Deleting your account is irreversible. All data will be permanently removed.
                </p>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-3">
                  <Button variant="destructive" className="gap-2 rounded-xl">
                    <Trash2 className="w-4 h-4" /> Delete account
                  </Button>
                  <Button variant="outline" className="gap-2 rounded-xl">
                    <Download className="w-4 h-4" /> Export data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sticky Save Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="sticky bottom-4 md:bottom-6 shadow-2xl border bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl">
            <CardFooter className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
                Changes are saved locally until you click Save.
              </p>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="gap-2 rounded-xl"
                >
                  Back to top
                </Button>
                <Button 
                  size="sm" 
                  onClick={onSaveAll} 
                  disabled={isSaving}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Helper icon component for clock
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// Helper icon component for calendar
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
