"use client";

import { Eye, Heart, Coins, Star, Share2, MessageSquare, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

interface RealtimeStatCardProps {
  title: string;
  value: number;
  icon: "views" | "likes" | "coins" | "favorites" | "shares" | "comments";
  delta?: number;
  color: string;
  prefix?: string;
  suffix?: string;
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

export default function RealtimeStatCard({
  title,
  value,
  icon,
  delta = 0,
  color,
  prefix = "",
  suffix = ""
}: RealtimeStatCardProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true);
      // 数字动画效果
      const diff = value - displayValue;
      const steps = 20;
      const stepValue = diff / steps;
      let current = displayValue;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        current += stepValue;
        setDisplayValue(Math.round(current));
        if (step >= steps) {
          clearInterval(interval);
          setDisplayValue(value);
          setTimeout(() => setIsAnimating(false), 200);
        }
      }, 20);

      return () => clearInterval(interval);
    }
  }, [value, displayValue]);

  const Icon = iconMap[icon];
  const gradientClass = colorMap[color] || colorMap.pink;
  const isPositive = delta >= 0;

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 card-hover overflow-hidden relative transition-all ${isAnimating ? "scale-105" : ""}`}>
      {/* 背景装饰 */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradientClass} opacity-10 rounded-bl-full`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientClass} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {delta !== 0 && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{isPositive ? "+" : ""}{delta}</span>
            </div>
          )}
        </div>

        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <p className={`text-3xl font-bold text-gray-800 transition-all ${isAnimating ? "text-pink-600" : ""}`}>
          {prefix}{displayValue.toLocaleString()}{suffix}
        </p>
      </div>
    </div>
  );
}
