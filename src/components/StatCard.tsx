"use client";

import { Eye, Heart, Coins, Star, Share2, MessageSquare } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: "views" | "likes" | "coins" | "favorites" | "shares" | "comments";
  change?: string;
  color: string;
}

const iconMap = {
  views: Eye,
  likes: Heart,
  coins: Coins,
  favorites: Star,
  shares: Share2,
  comments: MessageSquare
};

const colorMap: Record<string, string> = {
  pink: "from-pink-500 to-pink-600",
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
  cyan: "from-cyan-500 to-cyan-600"
};

export default function StatCard({ title, value, icon, change, color }: StatCardProps) {
  const Icon = iconMap[icon];
  const gradientClass = colorMap[color] || colorMap.pink;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 card-hover overflow-hidden relative">
      {/* 背景装饰 */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradientClass} opacity-10 rounded-bl-full`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientClass} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {change && (
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              {change}
            </span>
          )}
        </div>
        
        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}
