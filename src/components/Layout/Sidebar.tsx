import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Layers, BarChart3, Image, FileText ,UserCircle,Megaphone} from "lucide-react";

export function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Templates", icon: Layers, href: "/template" },
    { name: "SEO Tools", icon: BarChart3, href: "/seo" },
    { name: "Content", icon: FileText, href: "/content" },
    { name: "Images", icon: Image, href: "/images" },
     { name: "Ad Generator", icon: Megaphone, href: "/ads" }, 
    { name: "Profile", icon: UserCircle, href: "/profile" }, 
 
  ];

  return (
    <div className="h-screen w-64 bg-white text-gray-900 dark:bg-gray-900 dark:text-white flex flex-col p-4 shadow-lg">
      {/* Logo */}
      <div className="mb-8 text-2xl font-bold text-center">SIRA</div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
