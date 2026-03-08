import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLayout } from "./LayoutContext";
import {
  LayoutDashboard,
  Layers,
  Image,
  Calendar,
  ChevronRight,
  LogOut,
  Linkedin,
  Facebook,
  Instagram,
  Images,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | null;
  color?: string;
  bgColor?: string;
  subItems?: { name: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
};

export function Sidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isCollapsed, setIsCollapsed } = useLayout();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

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
        { name: "LinkedIn Post", href: "/linkedinpostgenerator", icon: Linkedin },
        { name: "Facebook Post", href: "/facebookpostgenerator", icon: Facebook },
        { name: "Instagram Post", href: "/instagrampostgenerator", icon: Instagram },
      ],
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

  return (
    <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] ${isCollapsed ? 'w-16' : 'w-56 sm:w-64 md:w-72'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col z-30 shadow-2xl transition-all duration-300`}>
      {/* Navigation */}
      <nav className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'} space-y-2 overflow-y-auto`}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.href);
          const isHovered = hoveredMenu === item.name;
          const isExpanded = isCollapsed ? isHovered : isMenuExpanded(item.name);

          return (
            <div key={index} className="relative">
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.subItems ? (
                  <button
                    onClick={() => !isCollapsed && toggleExpanded(item.name)}
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-3 rounded-lg transition-all duration-200 group w-full relative ${isActive
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:shadow-sm"
                      }`}
                    onMouseEnter={() => setHoveredMenu(item.name)}
                    onMouseLeave={() => setHoveredMenu(null)}
                    title={isCollapsed ? item.name : ''}
                  >
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                      <div className={`p-2 rounded-lg transition-colors ${isActive ? item.bgColor + ' shadow-sm' : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'}`}>
                        <item.icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-600 dark:text-gray-400'}`} />
                      </div>
                      <span className={`font-medium ${isCollapsed ? 'hidden' : ''}`}>{item.name}</span>
                      <span className={`px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full font-semibold ${item.badge ? '' : 'hidden'} ${isCollapsed ? 'hidden' : ''}`}>
                        {item.badge || ''}
                      </span>
                    </div>
                    {!isCollapsed && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''
                          }`}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-3 rounded-lg transition-all duration-200 group relative ${isActive
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:shadow-sm"
                      }`}
                    onMouseEnter={() => setHoveredMenu(item.name)}
                    onMouseLeave={() => setHoveredMenu(null)}
                    title={isCollapsed ? item.name : ''}
                  >
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                      <div className={`p-2 rounded-lg transition-colors ${isActive ? item.bgColor + ' shadow-sm' : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'}`}>
                        <item.icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-600 dark:text-gray-400'}`} />
                      </div>
                      <span className={`font-medium ${isCollapsed ? 'hidden' : ''}`}>{item.name}</span>
                      <span className={`px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full font-semibold ${item.badge ? '' : 'hidden'} ${isCollapsed ? 'hidden' : ''}`}>
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
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`${isCollapsed ? 'absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 z-40 border border-gray-200 dark:border-gray-700' : 'ml-6 mt-2'} space-y-1 overflow-hidden`}
                  >
                    {item.subItems.map((sub, subIndex) => {
                      const SubIcon = sub.icon;
                      return (
                        <Link
                          key={subIndex}
                          to={sub.href}
                          className={`flex items-center ${isCollapsed ? 'justify-start space-x-2' : 'space-x-3'} px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 group hover:shadow-sm`}
                        >
                          <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                            <SubIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
                          </div>
                          <span className={`text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white font-medium ${isCollapsed ? '' : ''}`}>
                            {sub.name}
                          </span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50`}>
      </div>

      {/* Footer */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50`}>
        <motion.div
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md`}
          whileHover={{ scale: 1.02 }}
        >
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="Profile"
              className={`w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm ${isCollapsed ? 'w-6 h-6' : ''}`}
            />
          ) : (
            <div className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-600 shadow-sm ${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'}`}>
              <span className={`text-white font-medium ${isCollapsed ? 'text-xs' : 'text-sm'}`}>U</span>
            </div>
          )}
          <div className={`flex-1 min-w-0 ${isCollapsed ? 'hidden' : ''}`}>
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {user?.full_name || "User Name"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
          <button
            onClick={signOut}
            className={`p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group ${isCollapsed ? 'hidden' : ''}`}
            title="Logout"
          >
            <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}