import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Layers, BarChart3, Image, FileText } from "lucide-react";

export function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Templates", icon: Layers, href: "/template" },
    { name: "SEO Tools", icon: BarChart3, href: "/seo" },
    { name: "Content", icon: FileText, href: "/content" },
    { name: "Images", icon: Image, href: "/images" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
      {/* Logo */}
      <div className="mb-8 text-2xl font-bold text-center">SIRA</div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}