"use client";

import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { videoData, statistics, trendData } from "@/lib/data";

export default function SharesPage() {
  // 排序后的视频数据（按分享量）
  const sortedByShares = [...videoData].sort((a, b) => b.shares - a.shares);
  
  // 分享量数据
  const shareChartData = sortedByShares.map(video => ({
    title: video.title.substring(0, 15) + "...",
    shares: video.shares,
    views: video.views,
    ratio: parseFloat(((video.shares / video.views) * 100).toFixed(2))
  }));

  // 分享渠道分布（模拟数据）
  const shareChannelData = [
    { channel: "微信", count: 3456, color: "#07c160" },
    { channel: "QQ", count: 2345, color: "#1296db" },
    { channel: "微博", count: 1234, color: "#ff6b6b" },
    { channel: "朋友圈", count: 987, color: "#4ecdc4" },
    { channel: "其他", count: 654, color: "#95a5a6" }
  ];

  // 分享时间段分布
  const shareTimeDistribution = [
    { period: "上午", count: 2345 },
    { period: "下午", count: 3456 },
    { period: "晚间", count: 5678 },
    { period: "深夜", count: 1234 }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">分享分析</h1>
          <p className="text-gray-600">分析视频分享传播效果，了解内容社交影响力</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="总分享数"
            value={statistics.totalShares}
            icon="shares"
            change="+6.7%"
            color="pink"
          />
          <StatCard
            title="平均分享率"
            value={((statistics.totalShares / statistics.totalViews) * 100).toFixed(2) + "%"}
            icon="shares"
            color="blue"
          />
          <StatCard
            title="最高分享数"
            value={sortedByShares[0].shares}
            icon="shares"
            color="purple"
          />
          <StatCard
            title="传播指数"
            value="88.7"
            icon="shares"
            color="green"
          />
        </div>

        {/* 分享趋势和分布 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 分享趋势 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">分享数量趋势</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData.map(t => ({ ...t, shares: Math.round(t.views * 0.08) }))}>
                <defs>
                  <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb7299" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#fb7299" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="shares" stroke="#fb7299" fillOpacity={1} fill="url(#colorShares)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 分享渠道分布 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">分享渠道分布</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={shareChannelData}
                  dataKey="count"
                  nameKey="channel"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                >
                  {shareChannelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 分享量排名和时段分布 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 分享量排名 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">热门视频分享量 TOP 5</h2>
            <div className="space-y-4">
              {sortedByShares.slice(0, 5).map((video, index) => {
                const percentage = (video.shares / sortedByShares[0].shares) * 100;
                return (
                  <div key={video.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className={`w-6 h-6 rounded-full text-center text-white text-xs font-bold flex items-center justify-center ${
                          index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-600" : "bg-pink-400"
                        }`}>
                          {index + 1}
                        </span>
                        <span className="text-sm text-gray-700 font-medium">{video.title.substring(0, 20)}...</span>
                      </div>
                      <span className="text-pink-600 font-bold">{video.shares.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 分享时段分布 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">分享时段分布</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shareTimeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="period" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="count" fill="#23b8ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 分享量柱状图 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">视频分享量对比</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={shareChartData.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="title" 
                stroke="#888" 
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Bar dataKey="shares" fill="#fb7299" name="分享数" radius={[8, 8, 0, 0]} />
              <Bar dataKey="ratio" fill="#7c3aed" name="分享率(%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 详细数据表格 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">视频分享详情</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-pink-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">排名</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">视频标题</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">作者</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">分享数</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">分享率</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">传播等级</th>
                </tr>
              </thead>
              <tbody>
                {sortedByShares.map((video, index) => {
                  const shareRate = ((video.shares / video.views) * 100).toFixed(2);
                  const level = index < 2 ? "S级" : index < 4 ? "A级" : "B级";
                  const levelColor = index < 2 ? "text-purple-600 bg-purple-100" : index < 4 ? "text-pink-600 bg-pink-100" : "text-blue-600 bg-blue-100";
                  
                  return (
                    <tr key={video.id} className="border-b border-gray-100 hover:bg-pink-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold ${
                          index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-600" : "bg-pink-400"
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-800 font-medium">{video.title}</td>
                      <td className="py-3 px-4 text-gray-600">{video.author}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-pink-600 font-bold text-lg">
                          {video.shares.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-blue-600 font-medium">
                        {shareRate}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelColor}`}>
                          {level}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 分享分析洞察 */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-2xl font-bold mb-4">分享数据分析洞察</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <h4 className="font-bold text-lg mb-2">📱 分享渠道</h4>
              <p className="text-purple-100">微信是主要分享渠道，占比35%，其次是QQ(24%)和微博(13%)</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <h4 className="font-bold text-lg mb-2">⏰ 分享高峰</h4>
              <p className="text-purple-100">晚间(18-24点)是分享高峰期，占全天分享量的47%，与用户休闲时间高度吻合</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <h4 className="font-bold text-lg mb-2">🎯 传播策略</h4>
              <p className="text-purple-100">实用性和娱乐性内容分享率最高，建议在标题和封面增加分享引导语</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
