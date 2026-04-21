"use client";

import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
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
import { statistics, videoData, trendData, categoryData } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">B站视频数据分析平台</h1>
          <p className="text-gray-600">实时监控与分析B站视频数据，掌握内容趋势</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="总播放量"
            value={statistics.totalViews}
            icon="views"
            change="+12.5%"
            color="pink"
          />
          <StatCard
            title="总点赞数"
            value={statistics.totalLikes}
            icon="likes"
            change="+8.3%"
            color="blue"
          />
          <StatCard
            title="总投币数"
            value={statistics.totalCoins}
            icon="coins"
            change="+15.2%"
            color="purple"
          />
          <StatCard
            title="总收藏数"
            value={statistics.totalFavorites}
            icon="favorites"
            change="+10.8%"
            color="green"
          />
          <StatCard
            title="总分享数"
            value={statistics.totalShares}
            icon="shares"
            change="+6.7%"
            color="orange"
          />
          <StatCard
            title="总评论数"
            value={statistics.totalComments}
            icon="comments"
            change="+9.1%"
            color="cyan"
          />
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 趋势图 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">数据趋势</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
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
                <Line type="monotone" dataKey="views" stroke="#fb7299" strokeWidth={2} dot={{ fill: "#fb7299" }} />
                <Line type="monotone" dataKey="likes" stroke="#23b8ff" strokeWidth={2} dot={{ fill: "#23b8ff" }} />
                <Line type="monotone" dataKey="comments" stroke="#fa5a57" strokeWidth={2} dot={{ fill: "#fa5a57" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 分类分布饼图 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">视频分类分布</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => entry.category}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#fb7299", "#23b8ff", "#fa5a57", "#7c3aed", "#10b981", "#f59e0b", "#06b6d4"][index % 7]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 分类数据柱状图 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">各分类播放量对比</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
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

        {/* 视频列表 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">热门视频数据</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-pink-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">视频标题</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">作者</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">播放量</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">点赞数</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">评论数</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">分类</th>
                </tr>
              </thead>
              <tbody>
                {videoData.slice(0, 5).map((video, index) => (
                  <tr key={video.id} className="border-b border-gray-100 hover:bg-pink-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className={`inline-block w-6 h-6 rounded-full text-center text-white text-xs font-bold mr-2 ${
                        index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-600" : "bg-pink-400"
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-gray-800 font-medium">{video.title.substring(0, 20)}...</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{video.author}</td>
                    <td className="py-3 px-4 text-right text-pink-600 font-bold">
                      {(video.views / 10000).toFixed(1)}w
                    </td>
                    <td className="py-3 px-4 text-right text-blue-600 font-bold">
                      {(video.likes / 10000).toFixed(1)}w
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {(video.comments / 10000).toFixed(1)}w
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
                        {video.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 功能说明 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">浏览量分析</h3>
            <p className="text-pink-100">深入了解视频播放趋势，分析播放高峰期和用户观看习惯</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">互动数据分析</h3>
            <p className="text-blue-100">追踪点赞、投币、收藏数据，评估内容质量和用户粘性</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">评论情感分析</h3>
            <p className="text-purple-100">分析评论内容，了解用户反馈和内容改进方向</p>
          </div>
        </div>
      </main>
    </div>
  );
}
