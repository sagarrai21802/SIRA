

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Layers,
//   BarChart3,
//   Image,
//   FileText,
//   UserCircle,
//   Megaphone,
//   Zap,
// } from "lucide-react";

// export function Sidebar() {
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
//     { name: "Templates", icon: Layers, href: "/template" },
//     { name: "SEO Tools", icon: BarChart3, href: "/seo" },
//     { name: "Content", icon: FileText, href: "/content" },
//     { name: "Images", icon: Image, href: "/images" },
//     { name: "Ad Generator", icon: Megaphone, href: "/ads" },
//     { name: "AI to Humanizer", icon: Zap, href: "/humanizer" },
//     { name: "Prompt Generator", icon: Zap, href: "/promptgenerator" },
//     { name: "Profile", icon: UserCircle, href: "/profile" },
//   ];

//   return (
//     <div className="h-screen w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col p-5 shadow-2xl">
//       {/* Logo */}
//       <div className="mb-10 text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
//         SYRA.io
//       </div>

//       {/* Menu */}
//       <nav className="flex flex-col gap-3">
//         {menuItems.map((item, index) => {
//           const isActive = location.pathname === item.href;
//           return (
//             <Link
//               key={index}
//               to={item.href}
//               className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 cursor-pointer transform
//                 ${
//                   isActive
//                     ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg scale-105"
//                     : "hover:bg-gradient-to-r hover:from-indigo-200 hover:via-purple-200 hover:to-pink-200 dark:hover:from-indigo-700 dark:hover:via-purple-700 dark:hover:to-pink-700 hover:scale-105 hover:shadow-md"
//                 }`}
//             >
//               <item.icon
//                 className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
//                   isActive ? "text-white" : "text-gray-700 dark:text-gray-300"
//                 }`}
//               />
//               <span className="font-medium">{item.name}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="mt-auto text-center text-gray-500 dark:text-gray-400 text-sm mt-10">
//         © 2025 SYRA.io
//       </div>
//     </div>
//   );
// }

import React from "react";
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
  Sparkles
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Templates", icon: Layers, href: "/template" },
    { name: "SEO Tools", icon: BarChart3, href: "/seo" },
    { name: "Content", icon: FileText, href: "/content" },
    { name: "Images", icon: Image, href: "/images" },
    { name: "Ad Generator", icon: Megaphone, href: "/ads" },
    { name: "AI to Humanizer", icon: Zap, href: "/humanizer" },
    { name: "Prompt Generator", icon: Sparkles, href: "/promptgenerator" },
    { name: "Profile", icon: UserCircle, href: "/profile" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col p-5 shadow-2xl">
      {/* Logo */}
      <div className="mb-10 text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        SYRA.io
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 cursor-pointer transform
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg scale-105"
                    : "hover:bg-gradient-to-r hover:from-indigo-200 hover:via-purple-200 hover:to-pink-200 dark:hover:from-indigo-700 dark:hover:via-purple-700 dark:hover:to-pink-700 hover:scale-105 hover:shadow-md"
                }`}
            >
              <item.icon
                className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-700 dark:text-gray-300"
                }`}
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center text-gray-500 dark:text-gray-400 text-sm mt-10">
        © 2025 SYRA.io All rights reserved.
      </div>
    </div>
  );
}