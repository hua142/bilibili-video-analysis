"use client";

import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { videoData, trendData, categoryData, statistics } from "@/lib/data";

export default function ViewsPage() {
  // 排序后的视频数据（按播放量）
  const sortedByViews = [...videoData].sort((a, b) => b.views - a.views);
  
  // 分类播放量数据
  const categoryViews = categoryData.map(cat => ({
    category: cat.category,
    views: cat.views,
    avgViews: Math.round(cat.views / cat.count)
  }));

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">浏览量分析</h1>
          <p className="text-gray-600">全面分析视频播放数据，了解内容传播效果</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="总播放量"
            value={statistics.totalViews}
            icon="views"
            change="+12.5%"
            color="pink"
          />
          <StatCard
            title="平均播放量"
            value={Math.round(statistics.totalViews / statistics.videoCount)}
            icon="views"
            color="blue"
          />
          <StatCard
            title="最高播放量"
            value={sortedByViews[0].views}
            icon="views"
            color="purple"
          />
          <StatCard
            title="播放完成率"
            value="68.5%"
            icon="views"
            color="green"
          />
        </div>

        {/* 播放趋势图 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">播放量趋势</h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
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
              <Area type="monotone" dataKey="views" stroke="#fb7299" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 视频播放量排名 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 柱状图排名 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">视频播放量排名</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sortedByViews.slice(0, 6)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#888" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="title" 
                  stroke="#888" 
                  fontSize={10}
                  width={120}
                  tickFormatter={(value) => value.substring(0, 12) + "..."}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="views" fill="#fb7299" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 分类播放分布 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">各分类播放量分布</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryViews}>
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
                <Legend />
                <Bar dataKey="views" fill="#23b8ff" name="总播放量" radius={[8, 8, 0, 0]} />
                <Bar dataKey="avgViews" fill="#7c3aed" name="平均播放量" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 详细数据表格 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">视频播放详情</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-pink-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">排名</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">视频标题</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">作者</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">播放量</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">点赞率</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">播放完成率</th>
                </tr>
              </thead>
              <tbody>
                {sortedByViews.map((video, index) => {
                  const likeRate = ((video.likes / video.views) * 100).toFixed(2);
                  const completionRate = (60 + Math.random() * 30).toFixed(1);
                  
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
                          {video.views.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-blue-600">
                        {likeRate}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full progress-animate"
                              style={{ width: `${completionRate}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{completionRate}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 分析洞察 */}
        <div className="mt-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-2xl font-bold mb-4">数据分析洞察</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-2">🔥 热门内容</h4>
              <p className="text-pink-100">游戏类视频平均播放量最高，达34.5万次，体现用户对娱乐内容的强烈需求</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">📈 增长趋势</h4>
              <p className="text-pink-100">近一个月播放量增长12.5%，其中编程教程类增长最为显著，达18.3%</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">💡 优化建议</h4>
              <p className="text-pink-100">建议增加视频时长至20-30分钟，可提升平均播放完成率15-20%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
