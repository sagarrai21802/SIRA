import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLayout } from "./LayoutContext";
import {
  LayoutDashboard,
  Layers,
  BarChart3,
  Image,
  FileText,
  UserCircle,
  Megaphone,
  Zap,
  Sparkles,
  Calendar,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Plus,
  TrendingUp,
  Activity,
  Moon,
  Sun,
  Palette,
  Shield,
  Database,
  Mail,
  Smartphone,
  Globe,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Lock,
  Key,
  Download,
  Upload,
  RefreshCw,
  Save,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  name: string;
  icon: any;
  href: string;
  badge: string | null;
  color: string;
  bgColor: string;
  subItems?: { name: string; href: string; icon: string }[];
};

export function Sidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isCollapsed, setIsCollapsed } = useLayout();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [searchQuery] = useState('');

  const menuItems = [
    { 
      name: "Dashboard", 
      icon: LayoutDashboard, 
      href: "/dashboard",
      badge: null,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    { 
      name: "Scheduler", 
      icon: Calendar, 
      href: "/scheduler",
      badge: "New",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      name: "Social Media",
      icon: Layers,
      href: "/linkedinpostgenerator",
      badge: null,
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      subItems: [
        { name: "LinkedIn Post", href: "/linkedinpostgenerator", icon: "💼" },
        { name: "Facebook Post", href: "/facebookpostgenerator", icon: "📘" },
        { name: "Instagram Post", href: "/instagrampostgenerator", icon: "📷" },
      ],
    },
    { 
      name: "Content", 
      icon: FileText, 
      href: "/content",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    { 
      name: "Images", 
      icon: Image, 
      href: "/images",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      name: "SEO Tools",
      icon: BarChart3,
      href: "/seo/metatags",
      badge: null,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      subItems: [
        { name: "Meta Tag Generator", href: "/seo/metatags", icon: "🏷️" },
        { name: "Keywords Generator", href: "/seo/keyword", icon: "🔍" },
        { name: "Schema Generator", href: "/seo/schemagenerator", icon: "📊" },
      ],
    },
    { 
      name: "Ad Generator", 
      icon: Megaphone, 
      href: "/ads",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    { 
      name: "AI Humanizer", 
      icon: Zap, 
      href: "/humanizer",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    { 
      name: "Prompt Generator", 
      icon: Sparkles, 
      href: "/promptgenerator",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20"
    },
    {
      name: "Analytics",
      icon: TrendingUp,
      href: "/analytics",
      badge: null,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      name: "Profile",
      icon: UserCircle,
      href: "/profile",
      badge: null,
      color: "text-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-900/20"
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/settings",
      badge: null,
      color: "text-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-900/20"
    },
  ];

  const toggleExpanded = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const isMenuExpanded = (menuName: string) => expandedMenus.includes(menuName);

  const settingsTabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'account', name: 'Account', icon: UserCircle },
    { id: 'billing', name: 'Billing', icon: Database },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.subItems && item.subItems.some(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] ${isCollapsed ? 'w-16' : 'w-72'} bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-30 shadow-xl backdrop-blur-sm transition-all duration-300`}>
      {/* Logo */}
      

      {/* Search removed */}

      {/* Navigation */}
      <nav className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'} space-y-2 overflow-y-auto`}>
        {filteredMenuItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.href);
          const isHovered = hoveredMenu === item.name;
          const isExpanded = isCollapsed ? isHovered : isMenuExpanded(item.name);

          return (
            <div key={index} className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.subItems ? (
                  <button
                    onClick={() => !isCollapsed && toggleExpanded(item.name)}
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-3 rounded-xl transition-all duration-200 group w-full ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                    onMouseEnter={() => setHoveredMenu(item.name)}
                    onMouseLeave={() => setHoveredMenu(null)}
                    title={isCollapsed ? item.name : ''}
                  >
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                      <div className={`p-2 rounded-lg ${isActive ? item.bgColor : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <item.icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-600 dark:text-gray-400'}`} />
                      </div>
                      <span className={`font-medium ${isCollapsed ? 'hidden' : ''}`}>{item.name}</span>
                      <span className={`px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full ${item.badge ? '' : 'hidden'} ${isCollapsed ? 'hidden' : ''}`}>
                        {item.badge || ''}
                      </span>
                    </div>
                    {!isCollapsed && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                    onMouseEnter={() => setHoveredMenu(item.name)}
                    onMouseLeave={() => setHoveredMenu(null)}
                    title={isCollapsed ? item.name : ''}
                  >
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                      <div className={`p-2 rounded-lg ${isActive ? item.bgColor : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <item.icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-600 dark:text-gray-400'}`} />
                      </div>
                      <span className={`font-medium ${isCollapsed ? 'hidden' : ''}`}>{item.name}</span>
                      <span className={`px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full ${item.badge ? '' : 'hidden'} ${isCollapsed ? 'hidden' : ''}`}>
                        {item.badge || ''}
                      </span>
                    </div>
                  </Link>
                )}
              </motion.div>

              {/* Submenu */}
              <AnimatePresence>
                {item.subItems && isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${isCollapsed ? 'absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-40' : 'ml-4 mt-2'} space-y-1 overflow-hidden`}
                  >
                    {item.subItems
                      .filter(sub => !searchQuery || sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          to={sub.href}
                          className={`flex items-center ${isCollapsed ? 'justify-start space-x-2' : 'space-x-3'} px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group`}
                        >
                          <span className="text-lg">{sub.icon}</span>
                          <span className={`text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${isCollapsed ? '' : ''}`}>
                            {sub.name}
                          </span>
                        </Link>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-gray-200 dark:border-gray-700`}>
        <div className="space-y-2">
          <h3 className={`text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 ${isCollapsed ? 'hidden' : ''}`}>
            Quick Actions
          </h3>
          <Link to="/new-project" className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group`} title={isCollapsed ? 'New Project' : ''}>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <Plus className="w-4 h-4 text-blue-600" />
            </div>
            <span className={`text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white ${isCollapsed ? 'hidden' : ''}`}>
              New Project
            </span>
          </Link>
          <Link to="/analytics" className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group`} title={isCollapsed ? 'Analytics' : ''}>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <span className={`text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white ${isCollapsed ? 'hidden' : ''}`}>
              Analytics
            </span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-gray-200 dark:border-gray-700`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group`}>
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="Profile"
              className={`w-8 h-8 rounded-full object-cover ${isCollapsed ? 'w-6 h-6' : ''}`}
            />
          ) : (
            <div className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center ${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'}`}>
              <span className={`text-white font-medium ${isCollapsed ? 'text-xs' : 'text-sm'}`}>U</span>
            </div>
          )}
          <div className={`flex-1 min-w-0 ${isCollapsed ? 'hidden' : ''}`}>
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.full_name || "User Name"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
          <div className={`flex space-x-1 ${isCollapsed ? 'hidden' : ''}`}>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={signOut}
              className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}