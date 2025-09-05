

// // // import React from "react";
// // // import { Link, useLocation } from "react-router-dom";
// // // import {
// // //   LayoutDashboard,
// // //   Layers,
// // //   BarChart3,
// // //   Image,
// // //   FileText,
// // //   UserCircle,
// // //   Megaphone,
// // //   Zap,
// // // } from "lucide-react";

// // // export function Sidebar() {
// // //   const location = useLocation();

// // //   const menuItems = [
// // //     { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
// // //     { name: "Templates", icon: Layers, href: "/template" },
// // //     { name: "SEO Tools", icon: BarChart3, href: "/seo" },
// // //     { name: "Content", icon: FileText, href: "/content" },
// // //     { name: "Images", icon: Image, href: "/images" },
// // //     { name: "Ad Generator", icon: Megaphone, href: "/ads" },
// // //     { name: "AI to Humanizer", icon: Zap, href: "/humanizer" },
// // //     { name: "Prompt Generator", icon: Zap, href: "/promptgenerator" },
// // //     { name: "Profile", icon: UserCircle, href: "/profile" },
// // //   ];

// // //   return (
// // //     <div className="h-screen w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col p-5 shadow-2xl">
// // //       {/* Logo */}
// // //       <div className="mb-10 text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
// // //         SYRA.io
// // //       </div>

// // //       {/* Menu */}
// // //       <nav className="flex flex-col gap-3">
// // //         {menuItems.map((item, index) => {
// // //           const isActive = location.pathname === item.href;
// // //           return (
// // //             <Link
// // //               key={index}
// // //               to={item.href}
// // //               className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 cursor-pointer transform
// // //                 ${
// // //                   isActive
// // //                     ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg scale-105"
// // //                     : "hover:bg-gradient-to-r hover:from-indigo-200 hover:via-purple-200 hover:to-pink-200 dark:hover:from-indigo-700 dark:hover:via-purple-700 dark:hover:to-pink-700 hover:scale-105 hover:shadow-md"
// // //                 }`}
// // //             >
// // //               <item.icon
// // //                 className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
// // //                   isActive ? "text-white" : "text-gray-700 dark:text-gray-300"
// // //                 }`}
// // //               />
// // //               <span className="font-medium">{item.name}</span>
// // //             </Link>
// // //           );
// // //         })}
// // //       </nav>

// // //       {/* Footer */}
// // //       <div className="mt-auto text-center text-gray-500 dark:text-gray-400 text-sm mt-10">
// // //         © 2025 SYRA.io
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import {
// //   LayoutDashboard,
// //   Layers,
// //   BarChart3,
// //   Image,
// //   FileText,
// //   UserCircle,
// //   Megaphone,
// //   Zap,
// //   Sparkles
// // } from "lucide-react";

// // export function Sidebar() {
// //   const location = useLocation();

// //   const menuItems = [
// //     { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
// //     { name: "Templates", icon: Layers, href: "/template" },
// //     { name: "SEO Tools", icon: BarChart3, href: "/seo" },
// //     { name: "Content", icon: FileText, href: "/content" },
// //     { name: "Images", icon: Image, href: "/images" },
// //     { name: "Ad Generator", icon: Megaphone, href: "/ads" },
// //     { name: "AI to Humanizer", icon: Zap, href: "/humanizer" },
// //     { name: "Prompt Generator", icon: Sparkles, href: "/promptgenerator" },
// //     { name: "Profile", icon: UserCircle, href: "/profile" },
// //   ];

// //   return (
// //     <div className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col p-5 shadow-2xl">
// //       {/* Logo */}
// //       <div className="mb-10 text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
// //         SYRA.io
// //       </div>

// //       {/* Menu */}
// //       <nav className="flex flex-col gap-3">
// //         {menuItems.map((item, index) => {
// //           const isActive = location.pathname === item.href;
// //           return (
// //             <Link
// //               key={index}
// //               to={item.href}
// //               className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 cursor-pointer transform
// //                 ${
// //                   isActive
// //                     ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg scale-105"
// //                     : "hover:bg-gradient-to-r hover:from-indigo-200 hover:via-purple-200 hover:to-pink-200 dark:hover:from-indigo-700 dark:hover:via-purple-700 dark:hover:to-pink-700 hover:scale-105 hover:shadow-md"
// //                 }`}
// //             >
// //               <item.icon
// //                 className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
// //                   isActive ? "text-white" : "text-gray-700 dark:text-gray-300"
// //                 }`}
// //               />
// //               <span className="font-medium">{item.name}</span>
// //             </Link>
// //           );
// //         })}
// //       </nav>

// //       {/* Footer */}
// //       <div className="mt-auto text-center text-gray-500 dark:text-gray-400 text-sm mt-10">
// //         © 2025 SYRA.io All rights reserved.
// //       </div>
// //     </div>
// //   );
// // }


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
//   Sparkles,
//   Calendar // Import the Calendar icon
// } from "lucide-react";

// export function Sidebar() {
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
//     // Add the Scheduler link
//     { name: "Scheduler", icon: Calendar, href: "/scheduler" },
//     { name: "Social Media", icon: Layers, href: "/template" },
//     { name: "SEO Tools", icon: BarChart3, href: "/seo" },
//     { name: "Content", icon: FileText, href: "/content" },
//     { name: "Images", icon: Image, href: "/images" },
//     { name: "Ad Generator", icon: Megaphone, href: "/ads" },
//     { name: "AI to Humanizer", icon: Zap, href: "/humanizer" },
//     { name: "Prompt Generator", icon: Sparkles, href: "/promptgenerator" },
//     { name: "Profile", icon: UserCircle, href: "/profile" },
//   ];

//   return (
//     <div
//       className="fixed top-0 left-0 h-screen w-64 flex flex-col p-5 shadow-2xl"
//       style={{
//         backgroundColor: "#010516",
//         color: "white",
//       }}
//     >
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
//                     : "hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:scale-105 hover:shadow-md"
//                 }`}
//             >
//               <item.icon
//                 className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
//                   isActive ? "text-white" : "text-white"
//                 }`}
//               />
//               <span className="font-medium">{item.name}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="mt-auto text-center text-gray-400 text-sm mt-10">
//         © 2025 SYRA.io All rights reserved.
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
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
//   Sparkles,
//   Calendar,
//   ChevronRight
// } from "lucide-react";

// export function Sidebar() {
//   const location = useLocation();
//   const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

//   const menuItems = [
//     { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
//     { name: "Scheduler", icon: Calendar, href: "/scheduler" },
//     {
//       name: "Social Media",
//       icon: Layers,
//       href: "/social",
//       subItems: [
//         { name: "LinkedIn Post", href: "/social/linkedin" },
//         { name: "Facebook Post", href: "/social/facebook" },
//         { name: "Instagram Post", href: "/social/instagram" },
//       ],
//     },
//     {
//       name: "SEO Tools",
//       icon: BarChart3,
//       href: "/seo",
//       subItems: [
//         { name: "Meta Tag Generator", href: "/seo/meta" },
//         { name: "Keywords Generator", href: "/seo/keywords" },
//         { name: "Schema Generator", href: "/seo/schema" },
//       ],
//     },
//     { name: "Content", icon: FileText, href: "/content" },
//     { name: "Images", icon: Image, href: "/images" },
//     { name: "Ad Generator", icon: Megaphone, href: "/ads" },
//     { name: "AI to Humanizer", icon: Zap, href: "/humanizer" },
//     { name: "Prompt Generator", icon: Sparkles, href: "/promptgenerator" },
//     { name: "Profile", icon: UserCircle, href: "/profile" },
//   ];

//   return (
//     <div
//       className="fixed top-0 left-0 h-screen w-64 flex flex-col p-5 shadow-2xl"
//       style={{
//         backgroundColor: "#010516",
//         color: "white",
//       }}
//     >
//       {/* Logo */}
//       <div className="mb-10 text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
//         SYRA.io
//       </div>

//       {/* Menu */}
//       <nav className="flex flex-col gap-3 relative">
//         {menuItems.map((item, index) => {
//           const isActive = location.pathname.startsWith(item.href);

//           return (
//             <div
//               key={index}
//               className="relative"
//               onMouseEnter={() => setHoveredMenu(item.name)}
//               onMouseLeave={() => setHoveredMenu(null)}
//             >
//               <Link
//                 to={item.href}
//                 className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer transform ${
//                   isActive
//                     ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg scale-105"
//                     : "hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:scale-105 hover:shadow-md"
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <item.icon className="w-5 h-5" />
//                   <span className="font-medium">{item.name}</span>
//                 </div>
//                 {item.subItems && <ChevronRight className="w-4 h-4" />}
//               </Link>

//               {/* Submenu */}
//               {item.subItems && hoveredMenu === item.name && (
//                 <div className="absolute top-0 left-full ml-2 w-56 bg-gray-900 text-white rounded-lg shadow-lg flex flex-col">
//                   {item.subItems.map((sub, subIndex) => (
//                     <Link
//                       key={subIndex}
//                       to={sub.href}
//                       className={`px-4 py-2 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 rounded-lg`}
//                     >
//                       {sub.name}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="mt-auto text-center text-gray-400 text-sm mt-10">
//         © 2025 SYRA.io All rights reserved.
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
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
//   Sparkles,
//   Calendar,
//   ChevronDown,
//   ChevronRight,
// } from "lucide-react";

// export function Sidebar() {
//   const location = useLocation();
//   const [openMenu, setOpenMenu] = useState<string | null>(null);

//   const toggleMenu = (name: string) => {
//     setOpenMenu(openMenu === name ? null : name);
//   };

//   const menuItems = [
//     { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
//     { name: "Scheduler", icon: Calendar, href: "/scheduler" },
//     {
//       name: "Social Media",
//       icon: Layers,
//       href: "/social",
//       subItems: [
//         { name: "LinkedIn Post", href: "/social/linkedin" },
//         { name: "Facebook Post", href: "/social/facebook" },
//         { name: "Instagram Post", href: "/social/instagram" },
//       ],
//     },
//     {
//       name: "SEO Tools",
//       icon: BarChart3,
//       href: "/seo",
//       subItems: [
//         { name: "Meta Tag Generator", href: "/seo/meta" },
//         { name: "Keywords Generator", href: "/seo/keywords" },
//         { name: "Schema Generator", href: "/seo/schema" },
//       ],
//     },
//     { name: "Content", icon: FileText, href: "/content" },
//     { name: "Images", icon: Image, href: "/images" },
//     { name: "Ad Generator", icon: Megaphone, href: "/ads" },
//     { name: "AI to Humanizer", icon: Zap, href: "/humanizer" },
//     { name: "Prompt Generator", icon: Sparkles, href: "/promptgenerator" },
//     { name: "Profile", icon: UserCircle, href: "/profile" },
//   ];

//   return (
//     <div
//       className="fixed top-0 left-0 h-screen w-64 flex flex-col p-5 shadow-2xl overflow-y-auto"
//       style={{ backgroundColor: "#010516", color: "white" }}
//     >
//       {/* Logo */}
//       <div className="mb-10 text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
//         SYRA.io
//       </div>

//       {/* Menu */}
//       <nav className="flex flex-col gap-2">
//         {menuItems.map((item, index) => {
//           const isActive = location.pathname.startsWith(item.href);
//           const isOpen = openMenu === item.name;

//           return (
//             <div key={index}>
//               <div
//                 onClick={() => (item.subItems ? toggleMenu(item.name) : null)}
//                 className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
//                   isActive
//                     ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg"
//                     : "hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <item.icon className="w-5 h-5" />
//                   <span className="font-medium">{item.name}</span>
//                 </div>
//                 {item.subItems &&
//                   (isOpen ? (
//                     <ChevronDown className="w-4 h-4" />
//                   ) : (
//                     <ChevronRight className="w-4 h-4" />
//                   ))}
//               </div>

//               {/* Submenu (inside sidebar) */}
//               {item.subItems && isOpen && (
//                 <div className="ml-8 mt-1 flex flex-col gap-1">
//                   {item.subItems.map((sub, subIndex) => (
//                     <Link
//                       key={subIndex}
//                       to={sub.href}
//                       className="px-3 py-2 text-sm rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
//                     >
//                       {sub.name}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="mt-auto text-center text-gray-400 text-sm mt-10">
//         © 2025 SYRA.io All rights reserved.
//       </div>
//     </div>
//   );
// }



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
    {
      name: "SEO Tools",
      icon: BarChart3,
      href: "/seo",
      subItems: [
        { name: "Meta Tag Generator", href: "/seo/meta" },
        { name: "Keywords Generator", href: "/seo/keywords" },
        { name: "Schema Generator", href: "/seo/schema" },
      ],
    },
    { name: "Content", icon: FileText, href: "/content" },
    { name: "Images", icon: Image, href: "/images" },
    { name: "Ad Generator", icon: Megaphone, href: "/ads" },
    { name: "AI to Humanizer", icon: Zap, href: "/humanizer" },
    { name: "Prompt Generator", icon: Sparkles, href: "/promptgenerator" },
    { name: "Profile", icon: UserCircle, href: "/profile" },
  ];

  return (
    <div
      className="fixed top-0 left-0 h-screen w-64 flex flex-col p-5 shadow-2xl overflow-y-auto"
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
        © 2025 SYRA.io All rights reserved.
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