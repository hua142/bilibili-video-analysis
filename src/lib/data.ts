// B站视频分析模拟数据
// 实际项目中，这些数据可以通过爬虫或API获取

export interface VideoData {
  id: string;
  title: string;
  author: string;
  views: number;
  likes: number;
  coins: number;
  favorites: number;
  shares: number;
  comments: number;
  date: string;
  duration: string;
  category: string;
}

// 视频数据列表
export const videoData: VideoData[] = [
  {
    id: "BV1xx411c7mD",
    title: "【教程】React Hooks完全指南",
    author: "前端大佬",
    views: 125680,
    likes: 8965,
    coins: 3241,
    favorites: 5623,
    shares: 1234,
    comments: 2341,
    date: "2024-03-15",
    duration: "25:30",
    category: "编程教程"
  },
  {
    id: "BV1GJyxmD7hp",
    title: "Python数据分析实战项目",
    author: "数据分析师小王",
    views: 98765,
    likes: 7234,
    coins: 2567,
    favorites: 4231,
    shares: 987,
    comments: 1567,
    date: "2024-03-10",
    duration: "32:15",
    category: "编程教程"
  },
  {
    id: "BV1kV4y1t7gR",
    title: "【Vlog】周末探店美食推荐",
    author: "美食探店日记",
    views: 234567,
    likes: 15678,
    coins: 4532,
    favorites: 8765,
    shares: 3456,
    comments: 4567,
    date: "2024-03-08",
    duration: "15:42",
    category: "生活"
  },
  {
    id: "BV1mV4y1t7gR",
    title: "【游戏实况】原神新版本探索",
    author: "游戏主播小明",
    views: 456789,
    likes: 28976,
    coins: 8765,
    favorites: 12345,
    shares: 5678,
    comments: 7890,
    date: "2024-03-05",
    duration: "45:20",
    category: "游戏"
  },
  {
    id: "BV1nV4y1t7gR",
    title: "【翻唱】《起风了》女生版",
    author: "音乐达人小红",
    views: 345678,
    likes: 23456,
    coins: 6789,
    favorites: 10987,
    shares: 4567,
    comments: 6234,
    date: "2024-03-01",
    duration: "4:30",
    category: "音乐"
  },
  {
    id: "BV1pV4y1t7gR",
    title: "【科普】宇宙的奥秘探索",
    author: "科学探索者",
    views: 178965,
    likes: 12345,
    coins: 4567,
    favorites: 7890,
    shares: 2345,
    comments: 3456,
    date: "2024-02-28",
    duration: "28:15",
    category: "科技"
  },
  {
    id: "BV1qV4y1t7gR",
    title: "【健身】居家燃脂训练计划",
    author: "健身教练阿杰",
    views: 156789,
    likes: 10987,
    coins: 3456,
    favorites: 6789,
    shares: 2134,
    comments: 2876,
    date: "2024-02-25",
    duration: "35:00",
    category: "健身"
  },
  {
    id: "BV1rV4y1t7gR",
    title: "【穿搭】春夏时尚搭配指南",
    author: "时尚博主小美",
    views: 198234,
    likes: 14567,
    coins: 5234,
    favorites: 8901,
    shares: 3124,
    comments: 4123,
    date: "2024-02-20",
    duration: "12:45",
    category: "时尚"
  }
];

// 统计数据汇总
export const statistics = {
  totalViews: videoData.reduce((sum, v) => sum + v.views, 0),
  totalLikes: videoData.reduce((sum, v) => sum + v.likes, 0),
  totalCoins: videoData.reduce((sum, v) => sum + v.coins, 0),
  totalFavorites: videoData.reduce((sum, v) => sum + v.favorites, 0),
  totalShares: videoData.reduce((sum, v) => sum + v.shares, 0),
  totalComments: videoData.reduce((sum, v) => sum + v.comments, 0),
  videoCount: videoData.length,
};

// 点赞率数据（用于分析）
export const likeRateData = videoData.map(v => ({
  title: v.title.substring(0, 15) + "...",
  rate: ((v.likes / v.views) * 100).toFixed(2),
  likes: v.likes,
  views: v.views
}));

// 评论数据（用于分析）
export const commentData = videoData.map(v => ({
  title: v.title.substring(0, 15) + "...",
  comments: v.comments,
  views: v.views,
  ratio: ((v.comments / v.views) * 100).toFixed(2)
}));

// 分享数据（用于分析）
export const shareData = videoData.map(v => ({
  title: v.title.substring(0, 15) + "...",
  shares: v.shares,
  views: v.views,
  ratio: ((v.shares / v.views) * 100).toFixed(2)
}));

// 时间序列数据（用于趋势图）
export const trendData = [
  { date: "2024-02-01", views: 23456, likes: 1234, comments: 456 },
  { date: "2024-02-05", views: 34567, likes: 1567, comments: 523 },
  { date: "2024-02-10", views: 45678, likes: 1987, comments: 612 },
  { date: "2024-02-15", views: 52345, likes: 2345, comments: 734 },
  { date: "2024-02-20", views: 61234, likes: 2789, comments: 845 },
  { date: "2024-02-25", views: 72345, likes: 3124, comments: 923 },
  { date: "2024-03-01", views: 83456, likes: 3567, comments: 1045 },
  { date: "2024-03-05", views: 91234, likes: 3890, comments: 1167 },
  { date: "2024-03-10", views: 102345, likes: 4234, comments: 1289 },
  { date: "2024-03-15", views: 115678, likes: 4678, comments: 1412 }
];

// 分类统计数据
export const categoryData = [
  { category: "编程教程", count: 45, views: 234567, likes: 15678 },
  { category: "生活", count: 32, views: 198234, likes: 12345 },
  { category: "游戏", count: 28, views: 345678, likes: 23456 },
  { category: "音乐", count: 25, views: 289012, likes: 19234 },
  { category: "科技", count: 22, views: 178965, likes: 12345 },
  { category: "健身", count: 18, views: 156789, likes: 10987 },
  { category: "时尚", count: 15, views: 145678, likes: 9876 }
];
