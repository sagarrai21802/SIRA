// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { 
//   User, Bell, Shield, Palette, Wallet, Link as LinkIcon, Trash2, Save, Mail, Phone, Globe,
// } from "lucide-react";

// // shadcn/ui components (assumes your project has these set up)
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "../components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { Separator } from "@/components/ui/separator";

// // Utility: simple section wrapper
// const Section: React.FC<React.PropsWithChildren<{ title: string; icon?: React.ReactNode; description?: string; }>> = ({ title, icon, description, children }) => (
//   <Card className="rounded-2xl shadow-sm">
//     <CardHeader className="space-y-1">
//       <div className="flex items-center gap-3">
//         <div className="p-2 rounded-xl bg-muted/60">{icon}</div>
//         <div>
//           <CardTitle className="text-xl">{title}</CardTitle>
//           {description ? (
//             <p className="text-sm text-muted-foreground mt-1">{description}</p>
//           ) : null}
//         </div>
//       </div>
//     </CardHeader>
//     <CardContent className="space-y-4">{children}</CardContent>
//   </Card>
// );

// export default function SettingsPage() {
//   // Basic profile state
//   const [profile, setProfile] = useState({
//     name: "Sagar Rai",
//     username: "sagarr",
//     email: "sagar@example.com",
//     phone: "+91-9000000000",
//     bio: "Aspiring iOS Developer. Building SIRA.",
//     locale: "en-IN",
//     timezone: "Asia/Kolkata",
//   });

//   // Preferences
//   const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
//   const [fontScale, setFontScale] = useState("100");
//   const [density, setDensity] = useState("comfortable");

//   // Notifications
//   const [notif, setNotif] = useState({
//     productUpdates: true,
//     marketingEmails: false,
//     smsAlerts: false,
//     pushMentions: true,
//     weeklySummary: true,
//   });

//   // Privacy & security
//   const [privacy, setPrivacy] = useState({
//     profileVisibility: "public", // public | followers | private
//     dataCollection: true,
//     twoFA: false,
//     loginAlerts: true,
//     sessionTimeout: "30",
//   });

//   const onSaveAll = () => {
//     // TODO: integrate with your API
//     console.log({ profile, theme, fontScale, density, notif, privacy });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.25 }}
//       className="max-w-6xl mx-auto p-4 md:p-8 space-y-8"
//     >
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
//           <p className="text-muted-foreground mt-1">Manage your account, preferences, and security.</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" onClick={() => window.location.reload()}>Reset</Button>
//           <Button onClick={onSaveAll} className="gap-2"><Save className="w-4 h-4"/> Save changes</Button>
//         </div>
//       </div>

//       <Tabs defaultValue="profile" className="space-y-6">
//         <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full rounded-2xl">
//           <TabsTrigger value="profile">Profile</TabsTrigger>
//           <TabsTrigger value="account">Account</TabsTrigger>
//           <TabsTrigger value="appearance">Appearance</TabsTrigger>
//           <TabsTrigger value="notifications">Notifications</TabsTrigger>
//           <TabsTrigger value="privacy">Privacy</TabsTrigger>
//           <TabsTrigger value="billing">Billing</TabsTrigger>
//         </TabsList>

//         {/* Profile */}
//         <TabsContent value="profile" className="space-y-6">
//           <Section title="Profile" icon={<User className="w-5 h-5"/>} description="Basic information visible to others.">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full name</Label>
//                 <Input id="name" value={profile.name} onChange={e=>setProfile(prev=>({...prev, name: e.target.value}))} placeholder="Your name"/>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input id="username" value={profile.username} onChange={e=>setProfile(prev=>({...prev, username: e.target.value}))} placeholder="@username"/>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-4 h-4"/> Email</Label>
//                 <Input id="email" type="email" value={profile.email} onChange={e=>setProfile(prev=>({...prev, email: e.target.value}))} placeholder="you@example.com"/>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="w-4 h-4"/> Phone</Label>
//                 <Input id="phone" value={profile.phone} onChange={e=>setProfile(prev=>({...prev, phone: e.target.value}))} placeholder="+91-"/>
//               </div>
//               <div className="space-y-2 md:col-span-2">
//                 <Label htmlFor="bio">Bio</Label>
//                 <Textarea id="bio" value={profile.bio} onChange={e=>setProfile(prev=>({...prev, bio: e.target.value}))} placeholder="Tell the world who you are…"/>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
//                 <div className="space-y-2">
//                   <Label>Locale</Label>
//                   <Select value={profile.locale} onValueChange={(v)=>setProfile(p=>({...p, locale: v}))}>
//                     <SelectTrigger><SelectValue placeholder="Select locale"/></SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="en-IN">English (India)</SelectItem>
//                       <SelectItem value="en-US">English (US)</SelectItem>
//                       <SelectItem value="hi-IN">Hindi (India)</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="flex items-center gap-2"><Globe className="w-4 h-4"/> Timezone</Label>
//                   <Select value={profile.timezone} onValueChange={(v)=>setProfile(p=>({...p, timezone: v}))}>
//                     <SelectTrigger><SelectValue placeholder="Select timezone"/></SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
//                       <SelectItem value="UTC">UTC</SelectItem>
//                       <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//           </Section>
//         </TabsContent>

//         {/* Account */}
//         <TabsContent value="account" className="space-y-6">
//           <Section title="Account" icon={<Shield className="w-5 h-5"/>} description="Login, sessions, and security options.">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Password</Label>
//                 <Input type="password" placeholder="••••••••"/>
//                 <p className="text-xs text-muted-foreground">Use at least 12 characters, including numbers & symbols.</p>
//               </div>
//               <div className="flex items-center justify-between border rounded-xl p-3">
//                 <div>
//                   <p className="font-medium">Two‑factor authentication (2FA)</p>
//                   <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
//                 </div>
//                 <Switch checked={privacy.twoFA} onCheckedChange={(v)=>setPrivacy(p=>({...p, twoFA: v}))}/>
//               </div>
//               <div className="flex items-center justify-between border rounded-xl p-3">
//                 <div>
//                   <p className="font-medium">Login alerts</p>
//                   <p className="text-sm text-muted-foreground">Get an email when a new device signs in.</p>
//                 </div>
//                 <Switch checked={privacy.loginAlerts} onCheckedChange={(v)=>setPrivacy(p=>({...p, loginAlerts: v}))}/>
//               </div>
//               <div className="space-y-2">
//                 <Label>Auto sign‑out (minutes)</Label>
//                 <Input type="number" min={5} max={240} value={privacy.sessionTimeout} onChange={e=>setPrivacy(p=>({...p, sessionTimeout: e.target.value}))}/>
//               </div>
//             </div>
//           </Section>
//         </TabsContent>

//         {/* Appearance */}
//         <TabsContent value="appearance" className="space-y-6">
//           <Section title="Appearance" icon={<Palette className="w-5 h-5"/>} description="Theme, density, and accessibility.">
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="space-y-2">
//                 <Label>Theme</Label>
//                 <Select value={theme} onValueChange={(v: "system"|"light"|"dark") => setTheme(v)}>
//                   <SelectTrigger><SelectValue placeholder="Theme"/></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="system">System</SelectItem>
//                     <SelectItem value="light">Light</SelectItem>
//                     <SelectItem value="dark">Dark</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label>Font scale</Label>
//                 <Select value={fontScale} onValueChange={(v)=>setFontScale(v)}>
//                   <SelectTrigger><SelectValue placeholder="100%"/></SelectTrigger>
//                   <SelectContent>
//                     {([90,100,110,120,130] as const).map(size=> (
//                       <SelectItem key={size} value={String(size)}>{size}%</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label>Density</Label>
//                 <Select value={density} onValueChange={(v)=>setDensity(v)}>
//                   <SelectTrigger><SelectValue placeholder="Comfortable"/></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="compact">Compact</SelectItem>
//                     <SelectItem value="comfortable">Comfortable</SelectItem>
//                     <SelectItem value="spacious">Spacious</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </Section>
//         </TabsContent>

//         {/* Notifications */}
//         <TabsContent value="notifications" className="space-y-6">
//           <Section title="Notifications" icon={<Bell className="w-5 h-5"/>} description="Choose how you want to be notified.">
//             <div className="space-y-4">
//               {[
//                 {key: "productUpdates", title: "Product updates", desc: "Release notes, changelogs, and important changes."},
//                 {key: "marketingEmails", title: "Marketing emails", desc: "Occasional offers and newsletters."},
//                 {key: "smsAlerts", title: "SMS alerts", desc: "Critical alerts delivered via text message."},
//                 {key: "pushMentions", title: "Mentions & replies", desc: "Get notified when someone mentions or replies to you."},
//                 {key: "weeklySummary", title: "Weekly summary", desc: "A snapshot of your activity each week."},
//               ].map((row) => (
//                 <div key={row.key} className="flex items-center justify-between border rounded-xl p-3">
//                   <div>
//                     <p className="font-medium">{row.title}</p>
//                     <p className="text-sm text-muted-foreground">{row.desc}</p>
//                   </div>
//                   <Switch
//                     checked={(notif as any)[row.key]}
//                     onCheckedChange={(v)=>setNotif((prev)=>({ ...(prev as any), [row.key]: v }))}
//                   />
//                 </div>
//               ))}
//             </div>
//           </Section>
//         </TabsContent>

//         {/* Privacy */}
//         <TabsContent value="privacy" className="space-y-6">
//           <Section title="Privacy" icon={<Shield className="w-5 h-5"/>} description="Control who can see your activity and data.">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Profile visibility</Label>
//                 <Select value={privacy.profileVisibility} onValueChange={(v)=>setPrivacy(p=>({...p, profileVisibility: v}))}>
//                   <SelectTrigger><SelectValue placeholder="Visibility"/></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="public">Public</SelectItem>
//                     <SelectItem value="followers">Followers only</SelectItem>
//                     <SelectItem value="private">Private</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex items-center justify-between border rounded-xl p-3">
//                 <div>
//                   <p className="font-medium">Help improve the product</p>
//                   <p className="text-sm text-muted-foreground">Share anonymous usage data and crash reports.</p>
//                 </div>
//                 <Switch checked={privacy.dataCollection} onCheckedChange={(v)=>setPrivacy(p=>({...p, dataCollection: v}))}/>
//               </div>
//             </div>
//           </Section>

//           <Section title="Connected apps" icon={<LinkIcon className="w-5 h-5"/>} description="Manage third‑party integrations.">
//             <div className="space-y-3">
//               <div className="flex items-center justify-between border rounded-xl p-3">
//                 <div>
//                   <p className="font-medium">GitHub</p>
//                   <p className="text-sm text-muted-foreground">Used for syncing repositories.</p>
//                 </div>
//                 <Button variant="outline">Disconnect</Button>
//               </div>
//               <div className="flex items-center justify-between border rounded-xl p-3">
//                 <div>
//                   <p className="font-medium">Google</p>
//                   <p className="text-sm text-muted-foreground">Used for sign‑in and calendar access.</p>
//                 </div>
//                 <Button variant="outline">Disconnect</Button>
//               </div>
//             </div>
//           </Section>
//         </TabsContent>

//         {/* Billing */}
//         <TabsContent value="billing" className="space-y-6">
//           <Section title="Billing" icon={<Wallet className="w-5 h-5"/>} description="Manage your subscription and payment methods.">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Plan</Label>
//                 <Input value="Pro (Monthly)" readOnly/>
//               </div>
//               <div className="space-y-2">
//                 <Label>Next invoice</Label>
//                 <Input value="Sep 18, 2025" readOnly/>
//               </div>
//               <div className="space-y-2">
//                 <Label>Card on file</Label>
//                 <Input value="•••• •••• •••• 4242" readOnly/>
//               </div>
//               <div className="flex items-end">
//                 <Button variant="outline">Update payment method</Button>
//               </div>
//             </div>
//           </Section>

//           <Card className="border-red-300/60">
//             <CardHeader>
//               <CardTitle className="text-red-600 flex items-center gap-2"><Trash2 className="w-5 h-5"/> Danger zone</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <p className="text-sm text-muted-foreground">Deleting your account is irreversible. All data will be permanently removed.</p>
//               <Separator/>
//               <div className="flex flex-wrap gap-2">
//                 <Button variant="destructive">Delete account</Button>
//                 <Button variant="outline">Export data</Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       <Card className="sticky bottom-4 md:bottom-6 shadow-xl border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-2xl">
//         <CardFooter className="flex items-center justify-between p-3 md:p-4">
//           <p className="text-xs md:text-sm text-muted-foreground">Changes are saved locally until you click Save.</p>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</Button>
//             <Button size="sm" onClick={onSaveAll} className="gap-2"><Save className="w-4 h-4"/> Save changes</Button>
//           </div>
//         </CardFooter>
//       </Card>
//     </motion.div>
//   );
// }

import React, { useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">⚙️ Settings</h1>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between mb-4">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="cursor-pointer"
          />
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between mb-4">
          <span>Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="cursor-pointer"
          />
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-between mb-6">
          <span>Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded p-1"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>

        {/* Save Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
