'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, ComposedChart, Area } from 'recharts';
import Link from 'next/link';

export default function AnimeAnalysisPage() {
  const [data, setData] = useState<any>(null);
  const [selectedAnime, setSelectedAnime] = useState<string>('');
  const [animeDetail, setAnimeDetail] = useState<any>(null);

  useEffect(() => {
    fetch('/api/anime').then(res => res.json()).then(setData);
  }, []);

  useEffect(() => {
    if (selectedAnime) {
      fetch(`/api/anime?animeId=${selectedAnime}`).then(res => res.json()).then(setAnimeDetail);
    }
  }, [selectedAnime]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const COLORS = ['#fb7299', '#23b8ff', '#ffd700', '#00ff88', '#ff6b6b'];

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-400 hover:text-white mb-2 inline-block">← 返回首页</Link>
          <h1 className="text-2xl font-bold text-white">B站动漫视频分析</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 动漫选择 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">选择动漫</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data.animeList.map((anime: any) => (
              <button
                key={anime.id}
                onClick={() => setSelectedAnime(anime.id)}
                className={`p-4 rounded-lg text-left transition ${
                  selectedAnime === anime.id 
                    ? 'bg-pink-500/20 border-2 border-pink-500' 
                    : 'bg-gray-800 border-2 border-transparent hover:border-gray-600'
                }`}
              >
                <p className="text-white font-medium text-sm truncate">{anime.title}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {formatNumber(anime.playCount)} 播放
                </p>
              </button>
            ))}
          </div>
        </section>

        {animeDetail && (
          <>
            {/* 基本信息 */}
            <section className="mb-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">{animeDetail.anime.title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">播放量</p>
                    <p className="text-xl font-bold text-pink-500">{formatNumber(animeDetail.anime.playCount)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">点赞数</p>
                    <p className="text-xl font-bold text-blue-500">{formatNumber(animeDetail.anime.likeCount)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">弹幕数</p>
                    <p className="text-xl font-bold text-yellow-500">{formatNumber(animeDetail.anime.danmakuCount)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">投币数</p>
                    <p className="text-xl font-bold text-orange-500">{formatNumber(animeDetail.anime.coinCount)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">收藏数</p>
                    <p className="text-xl font-bold text-purple-500">{formatNumber(animeDetail.anime.favoriteCount)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">分享数</p>
                    <p className="text-xl font-bold text-green-500">{formatNumber(animeDetail.anime.shareCount)}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 情感分析 */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">弹幕情感分析</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-white font-medium mb-4">情感分布</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: '正面', value: animeDetail.sentiment.positive, color: '#22c55e' },
                          { name: '中性', value: animeDetail.sentiment.neutral, color: '#6b7280' },
                          { name: '负面', value: animeDetail.sentiment.negative, color: '#ef4444' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        label
                      >
                        {['#22c55e', '#6b7280', '#ef4444'].map((color, i) => (
                          <Cell key={i} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="text-center">
                      <p className="text-green-500 font-bold">{(animeDetail.sentiment.positiveRatio * 100).toFixed(1)}%</p>
                      <p className="text-gray-400 text-xs">正面情感</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 font-bold">{((animeDetail.sentiment.neutral / animeDetail.sentiment.total) * 100).toFixed(1)}%</p>
                      <p className="text-gray-400 text-xs">中性情感</p>
                    </div>
                    <div className="text-center">
                      <p className="text-red-500 font-bold">{(animeDetail.sentiment.negativeRatio * 100).toFixed(1)}%</p>
                      <p className="text-gray-400 text-xs">负面情感</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-white font-medium mb-4">情感指标</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">平均情感分数</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${animeDetail.sentiment.avgScore > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.abs(animeDetail.sentiment.avgScore) * 50 + 50}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-bold">{animeDetail.sentiment.avgScore.toFixed(3)}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-3 bg-gray-700 rounded-lg">
                        <p className="text-2xl font-bold text-white">{animeDetail.sentiment.total}</p>
                        <p className="text-gray-400 text-xs">总弹幕数</p>
                      </div>
                      <div className="text-center p-3 bg-gray-700 rounded-lg">
                        <p className="text-2xl font-bold text-green-500">{animeDetail.sentiment.positive}</p>
                        <p className="text-gray-400 text-xs">正面弹幕</p>
                      </div>
                      <div className="text-center p-3 bg-gray-700 rounded-lg">
                        <p className="text-2xl font-bold text-red-500">{animeDetail.sentiment.negative}</p>
                        <p className="text-gray-400 text-xs">负面弹幕</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 弹幕频率曲线 */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">弹幕频率曲线（按时间轴）</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={animeDetail.frequency}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="timeRange" stroke="#9ca3af" tick={{ fontSize: 10 }} />
                    <YAxis yAxisId="left" stroke="#9ca3af" />
                    <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" domain={[-1, 1]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                      labelStyle={{ color: '#9ca3af' }}
                    />
                    <Bar yAxisId="left" dataKey="count" fill="#fb7299" name="弹幕数量" />
                    <Line yAxisId="right" type="monotone" dataKey="avgSentiment" stroke="#22c55e" strokeWidth={2} name="情感分数" />
                  </ComposedChart>
                </ResponsiveContainer>
                <p className="text-gray-400 text-sm mt-4 text-center">
                  柱状图：弹幕数量 | 曲线：平均情感分数
                </p>
              </div>
            </section>

            {/* 情感热力图 */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">弹幕情感热力图</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="grid grid-cols-10 gap-1">
                  {animeDetail.frequency.map((item: any, i: number) => {
                    const intensity = (item.avgSentiment + 1) / 2; // 归一化到0-1
                    const bgColor = intensity > 0.5 
                      ? `rgba(34, 197, 94, ${(intensity - 0.5) * 2})` 
                      : `rgba(239, 68, 68, ${(0.5 - intensity) * 2})`;
                    return (
                      <div
                        key={i}
                        className="h-8 rounded"
                        style={{ backgroundColor: bgColor }}
                        title={`${item.timeRange}: ${item.count}条弹幕, 情感${item.avgSentiment.toFixed(2)}`}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-4 text-sm">
                  <span className="text-red-500">负面情感</span>
                  <span className="text-gray-400">中性</span>
                  <span className="text-green-500">正面情感</span>
                </div>
              </div>
            </section>

            {/* 高频词汇 */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">高频词汇分析</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={animeDetail.topWords} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9ca3af" />
                    <YAxis type="category" dataKey="word" stroke="#9ca3af" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    />
                    <Bar dataKey="count">
                      {animeDetail.topWords.map((entry: any, index: number) => (
                        <Cell 
                          key={index} 
                          fill={entry.sentiment === 'positive' ? '#22c55e' : entry.sentiment === 'negative' ? '#ef4444' : '#6b7280'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* 用户兴趣焦点 */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">用户兴趣焦点分析</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-green-500 font-medium mb-2">🔥 正面反馈热点</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {animeDetail.topWords
                        .filter((w: any) => w.sentiment === 'positive')
                        .slice(0, 5)
                        .map((w: any, i: number) => (
                          <li key={i}>• {w.word} ({w.count}次)</li>
                        ))}
                    </ul>
                    <p className="text-gray-400 text-xs mt-3">
                      用户对画面质量、剧情发展、角色表现给予高度评价
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-gray-400 font-medium mb-2">💬 中性讨论</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {animeDetail.topWords
                        .filter((w: any) => w.sentiment === 'neutral')
                        .slice(0, 5)
                        .map((w: any, i: number) => (
                          <li key={i}>• {w.word} ({w.count}次)</li>
                        ))}
                    </ul>
                    <p className="text-gray-400 text-xs mt-3">
                      用户积极参与互动，打卡签到行为频繁
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-red-500 font-medium mb-2">⚠️ 负面反馈</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {animeDetail.topWords
                        .filter((w: any) => w.sentiment === 'negative')
                        .slice(0, 5)
                        .map((w: any, i: number) => (
                          <li key={i}>• {w.word} ({w.count}次)</li>
                        ))}
                    </ul>
                    <p className="text-gray-400 text-xs mt-3">
                      少数用户对更新频率或部分情节有不满
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 弹幕列表 */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">弹幕样本（前30条）</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex flex-wrap gap-2">
                  {animeDetail.danmakus.slice(0, 30).map((d: any) => (
                    <span
                      key={d.id}
                      className={`px-2 py-1 rounded text-sm ${
                        d.sentiment === 'positive' 
                          ? 'bg-green-500/20 text-green-400' 
                          : d.sentiment === 'negative'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {d.content}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function formatNumber(num: number): string {
  if (!num) return '0';
  if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿';
  if (num >= 10000) return (num / 10000).toFixed(1) + '万';
  return num.toLocaleString();
}
