import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User, Bell, Shield, Palette, Wallet, Link as LinkIcon, Trash2, Save, Mail, Phone, Globe,
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
  <Card className="rounded-2xl shadow-sm">
    <CardHeader className="space-y-1">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700">{icon}</div>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
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
  // Basic profile state
  const [profile, setProfile] = useState({
    name: "Sagar Rai",
    username: "sagar",
    email: "sagar@example.com",
    phone: "+91-9000000000",
    bio: "Aspiring iOS Developer. Building SYRA.io.",
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
    profileVisibility: "public", // public | followers | private
    dataCollection: true,
    twoFA: false,
    loginAlerts: true,
    sessionTimeout: "30",
  });

  // Business & brand fields (mirror Profile page)
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [location, setLocation] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [brandVoice, setBrandVoice] = useState("professional");
  const [goals, setGoals] = useState("");
  const [primaryBrandColor, setPrimaryBrandColor] = useState<string>("#0033FF");
  const [brandMotto, setBrandMotto] = useState("");
  const [brandMission, setBrandMission] = useState("");
  const [brandAbout, setBrandAbout] = useState("");
  const [brandLogoUrl, setBrandLogoUrl] = useState<string>("");
  const [brandLogoPublicId, setBrandLogoPublicId] = useState<string>("");
  const [includeLogoDefault, setIncludeLogoDefault] = useState<boolean>(false);
  const [savingBusiness, setSavingBusiness] = useState(false);

  // Load current profile
  useEffect(() => {
    const load = async () => {
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
        setCompanyName(p.company_name || "");
        setIndustry(p.industry || "");
        setBusinessType(p.business_type || "");
        setLocation(p.location || "");
        setCompanySize(p.company_size || "");
        setTargetAudience(p.target_audience || "");
        setBrandVoice(p.brand_voice || "professional");
        setGoals(p.goals || "");
        setPrimaryBrandColor(p.primary_brand_color || "#0033FF");
        setBrandMotto(p.brand_motto || "");
        setBrandMission(p.brand_mission || "");
        setBrandAbout(p.brand_about || "");
        setBrandLogoUrl(p.brand_logo_url || "");
        setBrandLogoPublicId(p.brand_logo_public_id || "");
        setIncludeLogoDefault(Boolean(p.image_prefs?.include_brand_logo_by_default));
      } catch (e) {
        // ignore
      }
    };
    load();
  }, [user]);

  const handleUploadBrandLogo = async (file: File) => {
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
      toast.success('Brand logo uploaded');
    } catch (e: any) {
      toast.error('Failed to upload brand logo: ' + (e?.message || 'Unknown error'));
    }
  };

  const saveBusinessAndBrand = async () => {
    if (!user) return;
    setSavingBusiness(true);
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
          brand_motto: brandMotto,
          brand_mission: brandMission,
          brand_about: brandAbout,
          brand_logo_url: brandLogoUrl || null,
          brand_logo_public_id: brandLogoPublicId || null,
          image_prefs: {
            include_brand_logo_by_default: includeLogoDefault,
            apply_brand_theme_by_default: true
          },
          updated_at: new Date().toISOString(),
        })
      });
      if (!resp.ok) throw new Error(await resp.text());
      toast.success('Business & brand updated');
    } catch (e: any) {
      toast.error('Update failed: ' + (e?.message || 'Unknown error'));
    } finally {
      setSavingBusiness(false);
    }
  };

  const onSaveAll = () => {
    // TODO: integrate with your API
    console.log({ profile, theme, fontScale, density, notif, privacy });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-6xl mx-auto p-4 md:p-8 space-y-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account, preferences, and security.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>Reset</Button>
          <Button onClick={onSaveAll} className="gap-2"><Save className="w-4 h-4"/> Save changes</Button>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full rounded-2xl">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="space-y-6">
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Profile Settings Moved</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              All profile and personalization settings have been moved to the dedicated Profile page for a better user experience.
            </p>
            <Link to="/profile">
              <Button className="gap-2">
                <User className="w-4 h-4" />
                Go to Profile Page
              </Button>
            </Link>
          </div>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account" className="space-y-6">
          <Section title="Account" icon={<Shield className="w-5 h-5"/>} description="Login, sessions, and security options.">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••"/>
                <p className="text-xs text-gray-500 dark:text-gray-400">Use at least 12 characters, including numbers & symbols.</p>
              </div>
              <div className="flex items-center justify-between border rounded-xl p-3">
                <div>
                  <p className="font-medium">Two‑factor authentication (2FA)</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                </div>
                <Switch checked={privacy.twoFA} onCheckedChange={(v)=>setPrivacy(p=>({...p, twoFA: v}))}/>
              </div>
              <div className="flex items-center justify-between border rounded-xl p-3">
                <div>
                  <p className="font-medium">Login alerts</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get an email when a new device signs in.</p>
                </div>
                <Switch checked={privacy.loginAlerts} onCheckedChange={(v)=>setPrivacy(p=>({...p, loginAlerts: v}))}/>
              </div>
              <div className="space-y-2">
                <Label>Auto sign‑out (minutes)</Label>
                <Input type="number" min={5} max={240} value={privacy.sessionTimeout} onChange={e=>setPrivacy(p=>({...p, sessionTimeout: e.target.value}))}/>
              </div>
            </div>
          </Section>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Section title="Appearance" icon={<Palette className="w-5 h-5"/>} description="Theme, density, and accessibility.">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={(v) => setTheme(v as "system"|"light"|"dark")}>
                  <SelectTrigger><SelectValue placeholder="Theme"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Font scale</Label>
                <Select value={fontScale} onValueChange={(v)=>setFontScale(v)}>
                  <SelectTrigger><SelectValue placeholder="100%"/></SelectTrigger>
                  <SelectContent>
                    {([90,100,110,120,130] as const).map(size=> (
                      <SelectItem key={size} value={String(size)}>{size}%</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Density</Label>
                <Select value={density} onValueChange={(v)=>setDensity(v)}>
                  <SelectTrigger><SelectValue placeholder="Comfortable"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Section>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Section title="Notifications" icon={<Bell className="w-5 h-5"/>} description="Choose how you want to be notified.">
            <div className="space-y-4">
              {[
                {key: "productUpdates", title: "Product updates", desc: "Release notes, changelogs, and important changes."},
                {key: "marketingEmails", title: "Marketing emails", desc: "Occasional offers and newsletters."},
                {key: "smsAlerts", title: "SMS alerts", desc: "Critical alerts delivered via text message."},
                {key: "pushMentions", title: "Mentions & replies", desc: "Get notified when someone mentions or replies to you."},
                {key: "weeklySummary", title: "Weekly summary", desc: "A snapshot of your activity each week."},
              ].map((row) => (
                <div key={row.key} className="flex items-center justify-between border rounded-xl p-3">
                  <div>
                    <p className="font-medium">{row.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{row.desc}</p>
                  </div>
                  <Switch
                    checked={(notif as any)[row.key]}
                    onCheckedChange={(v)=>setNotif((prev)=>({ ...(prev as any), [row.key]: v }))}
                  />
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy" className="space-y-6">
          <Section title="Privacy" icon={<Shield className="w-5 h-5"/>} description="Control who can see your activity and data.">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Profile visibility</Label>
                <Select value={privacy.profileVisibility} onValueChange={(v)=>setPrivacy(p=>({...p, profileVisibility: v}))}>
                  <SelectTrigger><SelectValue placeholder="Visibility"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="followers">Followers only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between border rounded-xl p-3">
                <div>
                  <p className="font-medium">Help improve the product</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Share anonymous usage data and crash reports.</p>
                </div>
                <Switch checked={privacy.dataCollection} onCheckedChange={(v)=>setPrivacy(p=>({...p, dataCollection: v}))}/>
              </div>
            </div>
          </Section>

          <Card className="border-blue-300/60">
            <CardHeader>
              <CardTitle className="text-blue-600 flex items-center gap-2"><Trash2 className="w-5 h-5"/> Report or request deletion of generated content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                If our system generated content that you believe is inaccurate, harmful, or violates rights, you can submit a complaint for review.
              </p>
              <Link to="/complaint-deletion">
                <Button variant="outline" className="gap-2">
                  Go to complaint form
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Section title="Connected apps" icon={<LinkIcon className="w-5 h-5"/>} description="Manage third‑party integrations.">
            <div className="space-y-3">
              <div className="flex items-center justify-between border rounded-xl p-3">
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Used for syncing repositories.</p>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
              <div className="flex items-center justify-between border rounded-xl p-3">
                <div>
                  <p className="font-medium">Google</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Used for sign‑in and calendar access.</p>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
            </div>
          </Section>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6">
          <Section title="Billing" icon={<Wallet className="w-5 h-5"/>} description="Manage your subscription and payment methods.">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Plan</Label>
                <Input value="Pro (Monthly)" readOnly/>
              </div>
              <div className="space-y-2">
                <Label>Next invoice</Label>
                <Input value="Sep 18, 2025" readOnly/>
              </div>
              <div className="space-y-2">
                <Label>Card on file</Label>
                <Input value="•••• •••• •••• 4242" readOnly/>
              </div>
              <div className="flex items-end">
                <Button variant="outline">Update payment method</Button>
              </div>
            </div>
          </Section>

          <Card className="border-red-300/60">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2"><Trash2 className="w-5 h-5"/> Danger zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Deleting your account is irreversible. All data will be permanently removed.</p>
              <Separator/>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline">Delete account</Button>
                <Button variant="outline">Export data</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="sticky bottom-4 md:bottom-6 shadow-xl border bg-white dark:bg-gray-800/80 backdrop-blur rounded-2xl">
        <CardFooter className="flex items-center justify-between p-3 md:p-4">
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Changes are saved locally until you click Save.</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</Button>
            <Button size="sm" onClick={onSaveAll} className="gap-2"><Save className="w-4 h-4"/> Save changes</Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
