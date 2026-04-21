"use client";

import Navbar from "@/components/Navbar";
import RealtimeIndicator from "@/components/RealtimeIndicator";
import RealtimeStatCard from "@/components/RealtimeStatCard";
import { useRealtimeData } from "@/hooks/useRealtimeData";
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

export default function HomePage() {
  const { data, isConnected, lastUpdate, refresh } = useRealtimeData(5000); // 5秒刷新一次

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
        <div className="flex justify-between items-center mb-6">
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

        {/* 实时数据更新提示 */}
        <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-xl p-4 mb-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="font-medium">实时数据更新中</span>
          </div>
          <div className="text-sm opacity-90">
            每 {data.refreshRate} 秒自动刷新 | 最后更新: {new Date(data.timestamp).toLocaleTimeString()}
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <RealtimeStatCard
            title="总播放量"
            value={data.statistics.totalViews}
            icon="views"
            delta={data.realtimeDelta.views}
            color="pink"
          />
          <RealtimeStatCard
            title="总点赞数"
            value={data.statistics.totalLikes}
            icon="likes"
            delta={data.realtimeDelta.likes}
            color="blue"
          />
          <RealtimeStatCard
            title="总投币数"
            value={data.statistics.totalCoins}
            icon="coins"
            delta={data.realtimeDelta.coins}
            color="purple"
          />
          <RealtimeStatCard
            title="总收藏数"
            value={data.statistics.totalFavorites}
            icon="favorites"
            delta={data.realtimeDelta.favorites}
            color="green"
          />
          <RealtimeStatCard
            title="总分享数"
            value={data.statistics.totalShares}
            icon="shares"
            delta={data.realtimeDelta.shares}
            color="orange"
          />
          <RealtimeStatCard
            title="总评论数"
            value={data.statistics.totalComments}
            icon="comments"
            delta={data.realtimeDelta.comments}
            color="cyan"
          />
        </div>

        {/* 实时增量展示 */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            实时增量（过去1分钟）
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">播放增量</p>
              <p className="text-xl font-bold text-green-600">+{data.realtimeDelta.views}</p>
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
          {/* 实时趋势图 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              实时数据趋势
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" fontSize={10} />
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
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              视频分类分布
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
            热门视频实时数据
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-pink-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">视频标题</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">实时播放量</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">实时点赞数</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">点赞率</th>
                </tr>
              </thead>
              <tbody>
                {data.videoData.map((video, index) => {
                  const likeRate = ((video.likes / video.views) * 100).toFixed(2);
                  return (
                    <tr key={video.id} className="border-b border-gray-100 hover:bg-pink-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className={`inline-block w-6 h-6 rounded-full text-center text-white text-xs font-bold mr-2 ${
                          index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-600" : "bg-pink-400"
                        }`}>
                          {index + 1}
                        </span>
                        <span className="text-gray-800 font-medium">{video.title}</span>
                      </td>
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
            各分类实时播放量对比
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
