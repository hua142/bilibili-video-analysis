import { NextResponse } from "next/server";

// 生成带随机波动的数据
function generateRealtimeData() {
  const baseViews = 1500000;
  const baseLikes = 120000;
  const baseComments = 45000;
  const baseShares = 35000;
  const baseCoins = 68000;
  const baseFavorites = 89000;

  // 添加随机波动 (±10%)
  const fluctuate = (base: number) => {
    const change = base * (Math.random() * 0.2 - 0.1);
    return Math.round(base + change);
  };

  // 生成时间序列数据（最近10个时间点）
  const trendData = Array.from({ length: 10 }, (_, i) => {
    const factor = 1 + (i * 0.05);
    return {
      date: new Date(Date.now() - (9 - i) * 3600000).toISOString().slice(0, 16).replace("T", " "),
      views: fluctuate(baseViews * factor * (0.8 + Math.random() * 0.4)),
      likes: fluctuate(baseLikes * factor * (0.8 + Math.random() * 0.4)),
      comments: fluctuate(baseComments * factor * (0.8 + Math.random() * 0.4)),
      shares: fluctuate(baseShares * factor * (0.8 + Math.random() * 0.4)),
    };
  });

  // 视频数据
  const videoData = [
    { id: "BV1xx411c7mD", title: "React Hooks完全指南", views: fluctuate(baseViews * 1.2), likes: fluctuate(baseLikes * 1.1) },
    { id: "BV1GJyxmD7hp", title: "Python数据分析实战", views: fluctuate(baseViews * 0.9), likes: fluctuate(baseLikes * 0.8) },
    { id: "BV1kV4y1t7gR", title: "周末探店美食推荐", views: fluctuate(baseViews * 1.5), likes: fluctuate(baseLikes * 1.3) },
    { id: "BV1mV4y1t7gR", title: "原神新版本探索", views: fluctuate(baseViews * 2.0), likes: fluctuate(baseLikes * 1.8) },
    { id: "BV1nV4y1t7gR", title: "《起风了》翻唱", views: fluctuate(baseViews * 1.8), likes: fluctuate(baseLikes * 1.6) },
  ];

  // 分类数据
  const categoryData = [
    { category: "编程教程", count: fluctuate(45), views: fluctuate(baseViews * 0.6) },
    { category: "生活", count: fluctuate(32), views: fluctuate(baseViews * 0.5) },
    { category: "游戏", count: fluctuate(28), views: fluctuate(baseViews * 1.2) },
    { category: "音乐", count: fluctuate(25), views: fluctuate(baseViews * 1.0) },
    { category: "科技", count: fluctuate(22), views: fluctuate(baseViews * 0.7) },
  ];

  // 实时增量数据（过去1分钟的变化）
  const realtimeDelta = {
    views: Math.floor(Math.random() * 500) + 100,
    likes: Math.floor(Math.random() * 50) + 10,
    comments: Math.floor(Math.random() * 20) + 5,
    shares: Math.floor(Math.random() * 15) + 3,
    coins: Math.floor(Math.random() * 25) + 5,
    favorites: Math.floor(Math.random() * 30) + 8,
  };

  return {
    timestamp: new Date().toISOString(),
    statistics: {
      totalViews: fluctuate(baseViews),
      totalLikes: fluctuate(baseLikes),
      totalCoins: fluctuate(baseCoins),
      totalFavorites: fluctuate(baseFavorites),
      totalShares: fluctuate(baseShares),
      totalComments: fluctuate(baseComments),
    },
    trendData,
    videoData,
    categoryData,
    realtimeDelta,
    onlineUsers: Math.floor(Math.random() * 1000) + 500,
    refreshRate: 5, // 秒
  };
}

export async function GET() {
  const data = generateRealtimeData();
  
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
