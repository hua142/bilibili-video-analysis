"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Eye, Heart, MessageSquare, Share2, Home } from "lucide-react";

const navItems = [
  { href: "/", label: "总览", icon: Home },
  { href: "/views", label: "浏览量分析", icon: Eye },
  { href: "/likes", label: "点赞量分析", icon: Heart },
  { href: "/comments", label: "评论分析", icon: MessageSquare },
  { href: "/shares", label: "分享分析", icon: Share2 },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BarChart3 className="w-8 h-8 text-pink-500" />
            <span className="text-xl font-bold gradient-text">B站数据分析</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-pink-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-pink-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <select
              value={pathname}
              onChange={(e) => {
                window.location.href = e.target.value;
              }}
              className="block w-full px-4 py-2 text-base border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            >
              {navItems.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
