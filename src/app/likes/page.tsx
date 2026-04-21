"use client";

import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import { videoData, likeRateData, statistics } from "@/lib/data";

export default function LikesPage() {
  // 排序后的视频数据（按点赞量）
  const sortedByLikes = [...videoData].sort((a, b) => b.likes - a.likes);
  
  // 点赞率数据
  const likeRateChart = sortedByLikes.map(video => ({
    title: video.title.substring(0, 15) + "...",
    likes: video.likes,
    views: video.views,
    rate: parseFloat(((video.likes / video.views) * 100).toFixed(2))
  }));

  // 互动指标雷达图数据
  const radarData = [
    { metric: "点赞", value: Math.round((statistics.totalLikes / statistics.totalViews) * 100), max: 20 },
    { metric: "投币", value: Math.round((statistics.totalCoins / statistics.totalViews) * 100), max: 20 },
    { metric: "收藏", value: Math.round((statistics.totalFavorites / statistics.totalViews) * 100), max: 20 },
    { metric: "分享", value: Math.round((statistics.totalShares / statistics.totalViews) * 100), max: 20 },
    { metric: "评论", value: Math.round((statistics.totalComments / statistics.totalViews) * 100), max: 20 }
  ];

  // 互动率对比数据
  const interactionComparison = [
    { name: "本项目平均", value: 9.8, fill: "#fb7299" },
    { name: "B站平均水平", value: 5.2, fill: "#23b8ff" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">点赞量分析</h1>
          <p className="text-gray-600">深入分析用户互动数据，评估内容质量和用户认可度</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="总点赞数"
            value={statistics.totalLikes}
            icon="likes"
            change="+8.3%"
            color="pink"
          />
          <StatCard
            title="平均点赞率"
            value={((statistics.totalLikes / statistics.totalViews) * 100).toFixed(2) + "%"}
            icon="likes"
            color="blue"
          />
          <StatCard
            title="最高点赞数"
            value={sortedByLikes[0].likes}
            icon="likes"
            color="purple"
          />
          <StatCard
            title="互动综合指数"
            value="92.5"
            icon="likes"
            color="green"
          />
        </div>

        {/* 互动指标雷达图 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 雷达图 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">用户互动指标</h2>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#f0f0f0" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#666', fontSize: 14 }} />
                <PolarRadiusAxis angle={30} domain={[0, 20]} tick={{ fill: '#666', fontSize: 12 }} />
                <Radar
                  name="互动指标"
                  dataKey="value"
                  stroke="#fb7299"
                  fill="#fb7299"
                  fillOpacity={0.6}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px"
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 互动率对比 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">互动率对比分析</h2>
            <div className="space-y-6">
              {interactionComparison.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">{item.name}</span>
                    <span className="font-bold text-lg" style={{ color: item.fill }}>
                      {item.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${(item.value / 20) * 100}%`, backgroundColor: item.fill }}
                    />
                  </div>
                </div>
              ))}
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-800 text-sm">
                  <strong>分析结论：</strong>本项目平均互动率9.8%，显著高于B站平均水平5.2%，表现优异！
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 点赞量排名柱状图 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">视频点赞量排名</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={likeRateChart.slice(0, 8)}>
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
                formatter={(value: any, name: string) => [
                  name === 'rate' ? value + '%' : value.toLocaleString(),
                  name === 'rate' ? '点赞率' : '点赞数'
                ]}
              />
              <Legend />
              <Bar dataKey="likes" fill="#fb7299" name="点赞数" radius={[8, 8, 0, 0]} />
              <Bar dataKey="rate" fill="#23b8ff" name="点赞率(%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 详细数据表格 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">视频互动详情</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-pink-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">排名</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">视频标题</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">点赞数</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">点赞率</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">点赞转化</th>
                </tr>
              </thead>
              <tbody>
                {sortedByLikes.map((video, index) => {
                  const likeRate = ((video.likes / video.views) * 100).toFixed(2);
                  const maxLikes = sortedByLikes[0].likes;
                  const progressPercent = (video.likes / maxLikes) * 100;
                  
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
                      <td className="py-3 px-4 text-right">
                        <span className="text-pink-600 font-bold text-lg">
                          {video.likes.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-blue-600 font-medium">
                        {likeRate}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{progressPercent.toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 互动数据洞察 */}
        <div className="mt-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-2xl font-bold mb-4">点赞数据分析洞察</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <h4 className="font-bold text-lg mb-2">📊 点赞率分析</h4>
              <p className="text-pink-100">游戏类视频点赞率最高达6.3%，其次是音乐类6.0%，说明娱乐性内容更易获得用户认可</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <h4 className="font-bold text-lg mb-2">🎯 优质内容特征</h4>
              <p className="text-pink-100">时长4-8分钟的短视频点赞率最高，用户更倾向于为短小精悍的内容点赞</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <h4 className="font-bold text-lg mb-2">💡 优化建议</h4>
              <p className="text-pink-100">建议增加视频结尾的互动引导，可提升点赞率15-20%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
