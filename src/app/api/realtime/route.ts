import { NextResponse } from "next/server";

// 获取当天的起始时间戳
function getTodayStartTimestamp() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  return todayStart.getTime();
}

// 获取当天已过去的秒数
function getElapsedSecondsToday() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return hours * 3600 + minutes * 60 + seconds;
}

// 生成当天实时数据（每天0点从0开始）
function generateDailyData() {
  const elapsedSeconds = getElapsedSecondsToday();
  const dayProgress = elapsedSeconds / 86400; // 0到1之间，代表今天的进度

  // 当天基础数据（根据当天进度计算）
  const dailyBaseViews = Math.floor(500000 + Math.random() * 200000 * dayProgress);
  const dailyBaseLikes = Math.floor(35000 + Math.random() * 15000 * dayProgress);
  const dailyBaseComments = Math.floor(12000 + Math.random() * 8000 * dayProgress);
  const dailyBaseShares = Math.floor(8000 + Math.random() * 5000 * dayProgress);
  const dailyBaseCoins = Math.floor(18000 + Math.random() * 12000 * dayProgress);
  const dailyBaseFavorites = Math.floor(25000 + Math.random() * 15000 * dayProgress);

  // 添加随机波动 (±5%)
  const fluctuate = (base: number) => {
    const change = base * (Math.random() * 0.1 - 0.05);
    return Math.round(base + change);
  };

  // 生成小时级趋势数据（当天每2小时一个点）
  const trendData = [];
  for (let i = 0; i < 12; i++) {
    const hourProgress = (i + 1) / 12;
    const hour = Math.floor(hourProgress * 24);
    const dateStr = `${hour.toString().padStart(2, '0')}:00`;
    
    trendData.push({
      date: dateStr,
      views: Math.floor(dailyBaseViews * hourProgress * (0.9 + Math.random() * 0.2)),
      likes: Math.floor(dailyBaseLikes * hourProgress * (0.9 + Math.random() * 0.2)),
      comments: Math.floor(dailyBaseComments * hourProgress * (0.9 + Math.random() * 0.2)),
      shares: Math.floor(dailyBaseShares * hourProgress * (0.9 + Math.random() * 0.2)),
    });
  }

  // 添加当前时间点
  const currentHour = new Date().getHours();
  const currentDateStr = `${currentHour.toString().padStart(2, '0')}:00`;
  
  // 更新最后一个数据点为当前时间
  trendData[Math.min(Math.floor(currentHour / 2), 11)] = {
    date: currentDateStr,
    views: fluctuate(dailyBaseViews),
    likes: fluctuate(dailyBaseLikes),
    comments: fluctuate(dailyBaseComments),
    shares: fluctuate(dailyBaseShares),
  };

  // 视频当天数据
  const videoData = [
    { id: "BV1xx411c7mD", title: "React Hooks完全指南", views: fluctuate(Math.floor(dailyBaseViews * 0.15)), likes: fluctuate(Math.floor(dailyBaseLikes * 0.12)) },
    { id: "BV1GJyxmD7hp", title: "Python数据分析实战", views: fluctuate(Math.floor(dailyBaseViews * 0.12)), likes: fluctuate(Math.floor(dailyBaseLikes * 0.10)) },
    { id: "BV1kV4y1t7gR", title: "周末探店美食推荐", views: fluctuate(Math.floor(dailyBaseViews * 0.18)), likes: fluctuate(Math.floor(dailyBaseLikes * 0.15)) },
    { id: "BV1mV4y1t7gR", title: "原神新版本探索", views: fluctuate(Math.floor(dailyBaseViews * 0.25)), likes: fluctuate(Math.floor(dailyBaseLikes * 0.22)) },
    { id: "BV1nV4y1t7gR", title: "《起风了》翻唱", views: fluctuate(Math.floor(dailyBaseViews * 0.20)), likes: fluctuate(Math.floor(dailyBaseLikes * 0.18)) },
  ];

  // 分类当天数据
  const categoryData = [
    { category: "编程教程", count: fluctuate(Math.floor(25 + 20 * dayProgress)), views: fluctuate(Math.floor(dailyBaseViews * 0.18)) },
    { category: "生活", count: fluctuate(Math.floor(20 + 15 * dayProgress)), views: fluctuate(Math.floor(dailyBaseViews * 0.15)) },
    { category: "游戏", count: fluctuate(Math.floor(18 + 12 * dayProgress)), views: fluctuate(Math.floor(dailyBaseViews * 0.28)) },
    { category: "音乐", count: fluctuate(Math.floor(15 + 10 * dayProgress)), views: fluctuate(Math.floor(dailyBaseViews * 0.22)) },
    { category: "科技", count: fluctuate(Math.floor(12 + 8 * dayProgress)), views: fluctuate(Math.floor(dailyBaseViews * 0.12)) },
  ];

  // 当天实时增量（过去1分钟的变化）
  const realtimeDelta = {
    views: Math.floor(Math.random() * 50) + 20,
    likes: Math.floor(Math.random() * 15) + 5,
    comments: Math.floor(Math.random() * 8) + 2,
    shares: Math.floor(Math.random() * 5) + 1,
    coins: Math.floor(Math.random() * 10) + 3,
    favorites: Math.floor(Math.random() * 12) + 4,
  };

  // 获取当前日期信息
  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  return {
    timestamp: new Date().toISOString(),
    date: today,
    dateInfo: {
      today: today,
      startTime: new Date(getTodayStartTimestamp()).toISOString(),
      elapsedSeconds: elapsedSeconds,
      progress: `${(dayProgress * 100).toFixed(1)}%`,
      resetTime: `${today} 00:00:00`
    },
    statistics: {
      // 当天累计数据
      dailyViews: fluctuate(dailyBaseViews),
      dailyLikes: fluctuate(dailyBaseLikes),
      dailyCoins: fluctuate(dailyBaseCoins),
      dailyFavorites: fluctuate(dailyBaseFavorites),
      dailyShares: fluctuate(dailyBaseShares),
      dailyComments: fluctuate(dailyBaseComments),
      // 当天峰值
      dailyPeakViews: Math.floor(dailyBaseViews * 1.2),
    },
    trendData,
    videoData,
    categoryData,
    realtimeDelta,
    onlineUsers: Math.floor(Math.random() * 500) + 200,
    refreshRate: 5,
  };
}

export async function GET() {
  const data = generateDailyData();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
