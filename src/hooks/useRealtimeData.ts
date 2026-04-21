"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface RealtimeData {
  timestamp: string;
  statistics: {
    totalViews: number;
    totalLikes: number;
    totalCoins: number;
    totalFavorites: number;
    totalShares: number;
    totalComments: number;
  };
  trendData: Array<{
    date: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
  }>;
  videoData: Array<{
    id: string;
    title: string;
    views: number;
    likes: number;
  }>;
  categoryData: Array<{
    category: string;
    count: number;
    views: number;
  }>;
  realtimeDelta: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    coins: number;
    favorites: number;
  };
  onlineUsers: number;
  refreshRate: number;
}

export function useRealtimeData(refreshInterval: number = 5000) {
  const [data, setData] = useState<RealtimeData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/realtime");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
      setLastUpdate(new Date());
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    // 立即获取一次数据
    fetchData();

    // 设置定时刷新
    intervalRef.current = setInterval(fetchData, refreshInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData, refreshInterval]);

  return {
    data,
    isConnected,
    lastUpdate,
    error,
    refresh: fetchData,
  };
}
