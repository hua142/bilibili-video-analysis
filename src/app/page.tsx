"use client";

import Navbar from "@/components/Navbar";
import RealtimeIndicator from "@/components/RealtimeIndicator";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { data, isConnected, lastUpdate, refresh } = useRealtimeData(5000);
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});

  // 数字动画效果
  useEffect(() => {
    if (!data) return;

    const newStats = {
      dailyViews: data.statistics.dailyViews,
      dailyLikes: data.statistics.dailyLikes,
      dailyCoins: data.statistics.dailyCoins,
      dailyFavorites: data.statistics.dailyFavorites,
      dailyShares: data.statistics.dailyShares,
      dailyComments: data.statistics.dailyComments,
    };

    setAnimatedStats(prev => {
      const result: Record<string, number> = {};
      for (const key in newStats) {
        const target = newStats[key as keyof typeof newStats];
        const current = prev[key] ?? target;
        // 快速过渡到新值
        result[key] = current + Math.round((target - current) * 0.3);
      }
      return result;
    });
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">正在连接实时数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 实时状态指示器 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">B站视频数据分析平台</h1>
            <p className="text-gray-600">实时监控与分析B站视频数据，掌握内容趋势</p>
          </div>
          <RealtimeIndicator
            isConnected={isConnected}
            lastUpdate={lastUpdate}
            onlineUsers={data.onlineUsers}
            onRefresh={refresh}
          />
        </div>

        {/* 当天日期和重置提示 */}
        <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-xl p-4 mb-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="font-medium text-lg">实时数据更新中（当日统计）</span>
            </div>
            <div className="text-sm opacity-90 space-y-1">
              <div>统计日期: {data.dateInfo.today}</div>
              <div>重置时间: 每日 00:00:00 | 今日进度: {data.dateInfo.progress}</div>
            </div>
          </div>
        </div>

        {/* 统计卡片 - 当日数据 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="当日播放量"
            value={animatedStats.dailyViews ?? data.statistics.dailyViews}
            delta={data.realtimeDelta.views}
            color="pink"
            icon="👁️"
          />
          <StatCard
            title="当日点赞数"
            value={animatedStats.dailyLikes ?? data.statistics.dailyLikes}
            delta={data.realtimeDelta.likes}
            color="blue"
            icon="❤️"
          />
          <StatCard
            title="当日投币数"
            value={animatedStats.dailyCoins ?? data.statistics.dailyCoins}
            delta={data.realtimeDelta.coins}
            color="purple"
            icon="🪙"
          />
          <StatCard
            title="当日收藏数"
            value={animatedStats.dailyFavorites ?? data.statistics.dailyFavorites}
            delta={data.realtimeDelta.favorites}
            color="green"
            icon="⭐"
          />
          <StatCard
            title="当日分享数"
            value={animatedStats.dailyShares ?? data.statistics.dailyShares}
            delta={data.realtimeDelta.shares}
            color="orange"
            icon="📤"
          />
          <StatCard
            title="当日评论数"
            value={animatedStats.dailyComments ?? data.statistics.dailyComments}
            delta={data.realtimeDelta.comments}
            color="cyan"
            icon="💬"
          />
        </div>

        {/* 实时增量展示 */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            当日实时增量（过去1分钟）
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-pink-50 rounded-lg">
              <p className="text-sm text-gray-600">播放增量</p>
              <p className="text-xl font-bold text-pink-600">+{data.realtimeDelta.views}</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">点赞增量</p>
              <p className="text-xl font-bold text-blue-600">+{data.realtimeDelta.likes}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">投币增量</p>
              <p className="text-xl font-bold text-purple-600">+{data.realtimeDelta.coins}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">收藏增量</p>
              <p className="text-xl font-bold text-green-600">+{data.realtimeDelta.favorites}</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">分享增量</p>
              <p className="text-xl font-bold text-orange-600">+{data.realtimeDelta.shares}</p>
            </div>
            <div className="text-center p-3 bg-cyan-50 rounded-lg">
              <p className="text-sm text-gray-600">评论增量</p>
              <p className="text-xl font-bold text-cyan-600">+{data.realtimeDelta.comments}</p>
            </div>
          </div>
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 当日趋势图 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              当日数据趋势（{data.dateInfo.today}）
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" fontSize={11} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#fb7299" strokeWidth={2} dot={{ fill: "#fb7299", r: 4 }} />
                <Line type="monotone" dataKey="likes" stroke="#23b8ff" strokeWidth={2} dot={{ fill: "#23b8ff", r: 4 }} />
                <Line type="monotone" dataKey="comments" stroke="#fa5a57" strokeWidth={2} dot={{ fill: "#fa5a57", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 分类分布饼图 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              当日视频分类分布
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.categoryData}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name }) => name}
                >
                  {data.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#fb7299", "#23b8ff", "#fa5a57", "#7c3aed", "#10b981"][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 实时视频数据 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            热门视频当日数据
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-pink-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">排名</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">视频标题</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">当日播放</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">当日点赞</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">点赞率</th>
                </tr>
              </thead>
              <tbody>
                {data.videoData.map((video, index) => {
                  const likeRate = ((video.likes / video.views) * 100).toFixed(2);
                  return (
                    <tr key={video.id} className="border-b border-gray-100 hover:bg-pink-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className={`inline-block w-6 h-6 rounded-full text-center text-white text-xs font-bold ${
                          index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-600" : "bg-pink-400"
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-800 font-medium">{video.title}</td>
                      <td className="py-3 px-4 text-right text-pink-600 font-bold">
                        {video.views.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-blue-600 font-bold">
                        {video.likes.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-green-600 font-medium">
                        {likeRate}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 分类播放量对比 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            各分类当日播放量对比
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="views" fill="#fb7299" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

// 统计卡片组件
interface StatCardProps {
  title: string;
  value: number;
  delta: number;
  color: string;
  icon: string;
}

function StatCard({ title, value, delta, color, icon }: StatCardProps) {
  const colorMap: Record<string, { bg: string; text: string; gradient: string }> = {
    pink: { bg: "bg-pink-50", text: "text-pink-600", gradient: "from-pink-500 to-pink-600" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", gradient: "from-blue-500 to-blue-600" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", gradient: "from-purple-500 to-purple-600" },
    green: { bg: "bg-green-50", text: "text-green-600", gradient: "from-green-500 to-green-600" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", gradient: "from-orange-500 to-orange-600" },
    cyan: { bg: "bg-cyan-50", text: "text-cyan-600", gradient: "from-cyan-500 to-cyan-600" },
  };

  const colors = colorMap[color] || colorMap.pink;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 card-hover overflow-hidden relative">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colors.gradient} opacity-10 rounded-bl-full`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl">{icon}</span>
          <span className={`text-xs ${colors.text} bg-white px-2 py-1 rounded-full font-medium`}>
            +{delta}/分钟
          </span>
        </div>

        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <p className={`text-2xl font-bold ${colors.text}`}>
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
