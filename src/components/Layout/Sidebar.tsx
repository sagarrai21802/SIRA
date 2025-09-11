import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Scheduler", icon: Calendar, href: "/scheduler" },
    {
      name: "Social Media",
      icon: Layers,
      href: "/linkedinpostgenerator",
      subItems: [
        { name: "LinkedIn Post", href: "/linkedinpostgenerator" },
        { name: "Facebook Post", href: "/facebookpostgenerator" },
        { name: "Instagram Post", href: "/instagrampotgenerator" },
      ],
    },
    { name: "Content", icon: FileText, href: "/content" },
    { name: "Images", icon: Image, href: "/images" },
    {
      name: "SEO Tools",
      icon: BarChart3,
      href: "/seo/metatags",
      subItems: [
        { name: "Meta Tag Generator", href: "/seo/metatags" },
        { name: "Keywords Generator", href: "/seo/keyword" },
        { name: "Schema Generator", href: "/seo/schemagenerator" },
      ],
    },

    { name: "Ad Generator", icon: Megaphone, href: "/ads" },
    { name: "AI to Humanizer", icon: Zap, href: "/humanizer" },
    { name: "Prompt Generator", icon: Sparkles, href: "/promptgenerator" },
    { name: "Profile", icon: UserCircle, href: "/profile" },
  ];

  return (
    <div
      className="fixed top-0 left-0 h-screen w-64 flex flex-col p-5 shadow-2xl overflow-y-auto z-30"
      style={{ backgroundColor: "#010516", color: "white" }}
    >
      {/* Logo */}
      <div className="mb-10 text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        SYRA.io
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.href);
          const isHovered = hoveredMenu === item.name;

          return (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredMenu(item.name)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to={item.href}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg"
                    : "hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:scale-[1.02]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.subItems && <ChevronRight className="w-4 h-4" />}
              </Link>

              {/* Submenu on hover */}
              {item.subItems && isHovered && (
                <div
                  className="ml-6 mt-2 flex flex-col gap-1 animate-fadeIn"
                  style={{
                    animation: "fadeInSlide 0.25s ease-out",
                  }}
                >
                  {item.subItems.map((sub, subIndex) => (
                    <Link
                      key={subIndex}
                      to={sub.href}
                      className="px-3 py-2 text-sm rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:translate-x-1"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center text-gray-400 text-sm mt-10">
        ©️ 2025 SYRA.io All rights reserved.
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInSlide {
            from {
              opacity: 0;
              transform: translateY(-5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}