"use client";

import { useEffect, useState } from "react";
import { Radio, Wifi, WifiOff, RefreshCw } from "lucide-react";

interface RealtimeIndicatorProps {
  isConnected: boolean;
  lastUpdate: Date | null;
  onlineUsers?: number;
  onRefresh?: () => void;
}

export default function RealtimeIndicator({
  isConnected,
  lastUpdate,
  onlineUsers,
  onRefresh
}: RealtimeIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!lastUpdate) return;

    const updateTimeAgo = () => {
      const seconds = Math.floor((Date.now() - lastUpdate.getTime()) / 1000);
      if (seconds < 5) {
        setTimeAgo("刚刚");
      } else if (seconds < 60) {
        setTimeAgo(`${seconds}秒前`);
      } else {
        setTimeAgo(`${Math.floor(seconds / 60)}分钟前`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);
    return () => clearInterval(interval);
  }, [lastUpdate]);

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
      {/* 连接状态 */}
      <div className="flex items-center gap-2">
        {isConnected ? (
          <>
            <div className="relative">
              <Wifi className="w-4 h-4 text-green-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <span className="text-xs text-green-600 font-medium">实时连接</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4 text-red-500" />
            <span className="text-xs text-red-600 font-medium">断开连接</span>
          </>
        )}
      </div>

      {/* 在线人数 */}
      {onlineUsers !== undefined && isConnected && (
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Radio className="w-3 h-3 text-blue-500 animate-pulse" />
          <span>{onlineUsers.toLocaleString()} 人在线</span>
        </div>
      )}

      {/* 更新时间 */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <RefreshCw className={`w-3 h-3 ${isConnected ? "animate-spin" : ""}`} style={{ animationDuration: '3s' }} />
        <span>{timeAgo}</span>
      </div>

      {/* 手动刷新按钮 */}
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="flex items-center gap-1 px-2 py-1 text-xs text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          刷新
        </button>
      )}
    </div>
  );
}
