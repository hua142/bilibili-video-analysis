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
  Cell
} from "recharts";
import { videoData, statistics, trendData } from "@/lib/data";

export default function CommentsPage() {
  // 排序后的视频数据（按评论量）
  const sortedByComments = [...videoData].sort((a, b) => b.comments - a.comments);
  
  // 评论量数据
  const commentChartData = sortedByComments.map(video => ({
    title: video.title.substring(0, 15) + "...",
    comments: video.comments,
    views: video.views,
    ratio: parseFloat(((video.comments / video.views) * 100).toFixed(2))
  }));

  // 评论时间分布
  const commentTimeDistribution = [
    { time: "0-6点", count: 1234 },
    { time: "6-9点", count: 2345 },
    { time: "9-12点", count: 5678 },
    { time: "12-14点", count: 4567 },
    { time: "14-18点", count: 7890 },
    { time: "18-21点", count: 10234 },
    { time: "21-24点", count: 8765 }
  ];

  // 评论情感分布（模拟数据）
  const sentimentData = [
    { name: "正面评价", value: 65, color: "#10b981" },
    { name: "中性评价", value: 25, color: "#f59e0b" },
    { name: "负面评价", value: 10, color: "#ef4444" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">评论分析</h1>
          <p className="text-gray-600">深入分析用户评论内容，了解用户反馈和内容改进方向</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="总评论数"
            value={statistics.totalComments}
            icon="comments"
            change="+9.1%"
            color="pink"
          />
          <StatCard
            title="平均评论率"
            value={((statistics.totalComments / statistics.totalViews) * 100).toFixed(2) + "%"}
            icon="comments"
            color="blue"
          />
          <StatCard
            title="最高评论数"
            value={sortedByComments[0].comments}
            icon="comments"
            color="purple"
          />
          <StatCard
            title="用户活跃度"
            value="85.3%"
            icon="comments"
            color="green"
          />
        </div>

        {/* 评论趋势和分布 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 评论趋势 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">评论数量趋势</h2>
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
                <Line type="monotone" dataKey="comments" stroke="#fb7299" strokeWidth={3} dot={{ fill: "#fb7299", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 评论时间分布 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">评论时间分布</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={commentTimeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#888" fontSize={11} />
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

        {/* 情感分析和评论排名 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 情感分布饼图 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">评论情感分析</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-4">
              <p className="text-green-800 text-sm">
                <strong>正面评价占比65%</strong>，说明内容质量获得用户广泛认可
              </p>
            </div>
          </div>

          {/* 评论量排名 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">热门视频评论量</h2>
            <div className="space-y-4">
              {sortedByComments.slice(0, 5).map((video, index) => {
                const percentage = (video.comments / sortedByComments[0].comments) * 100;
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
                      <span className="text-pink-600 font-bold">{video.comments.toLocaleString()}</span>
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
        </div>

        {/* 评论量柱状图 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">视频评论量对比</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={commentChartData.slice(0, 8)}>
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
              <Bar dataKey="comments" fill="#fb7299" name="评论数" radius={[8, 8, 0, 0]} />
              <Bar dataKey="ratio" fill="#23b8ff" name="评论率(%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 详细数据表格 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">视频评论详情</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-pink-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">排名</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">视频标题</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">作者</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">评论数</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">评论率</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">情感倾向</th>
                </tr>
              </thead>
              <tbody>
                {sortedByComments.map((video, index) => {
                  const commentRate = ((video.comments / video.views) * 100).toFixed(2);
                  const sentiment = index < 3 ? "正面" : index < 6 ? "中性" : "偏正面";
                  const sentimentColor = index < 3 ? "text-green-600 bg-green-100" : index < 6 ? "text-yellow-600 bg-yellow-100" : "text-blue-600 bg-blue-100";
                  
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
                          {video.comments.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-blue-600 font-medium">
                        {commentRate}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${sentimentColor}`}>
                          {sentiment}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 评论分析洞察 */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-2xl font-bold mb-4">评论数据分析洞察</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <h4 className="font-bold text-lg mb-2">⏰ 活跃时段</h4>
              <p className="text-blue-100">18-21点是评论高峰期，占全天评论量的28%，建议在该时段发布新内容</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <h4 className="font-bold text-lg mb-2">💬 内容偏好</h4>
              <p className="text-blue-100">生活类视频评论率最高，用户更愿意在日常内容下分享观点和经历</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <h4 className="font-bold text-lg mb-2">📈 增长潜力</h4>
              <p className="text-blue-100">评论互动可提升视频推荐权重，建议增加话题引导和问题互动</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
