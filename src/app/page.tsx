'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [animeData, setAnimeData] = useState<any>(null);
  const [gameData, setGameData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/anime').then(res => res.json()),
      fetch('/api/game').then(res => res.json())
    ]).then(([anime, game]) => {
      setAnimeData(anime);
      setGameData(game);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">正在加载数据分析...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-pink-500">📊</span>
            数据分析实验报告
          </h1>
          <p className="text-gray-400 mt-1">B站动漫视频分析 & 游戏数据聚类分析</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Section 1: B站动漫分析 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-sm">1</span>
            B站动漫视频分析
          </h2>
          
          {/* 概览卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">分析动漫数</p>
              <p className="text-2xl font-bold text-white">{animeData?.summary?.totalAnime || 0}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">总播放量</p>
              <p className="text-2xl font-bold text-pink-500">{formatNumber(animeData?.summary?.totalPlayCount)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">总点赞量</p>
              <p className="text-2xl font-bold text-blue-500">{formatNumber(animeData?.summary?.totalLikeCount)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">总弹幕数</p>
              <p className="text-2xl font-bold text-yellow-500">{formatNumber(animeData?.summary?.totalDanmakuCount)}</p>
            </div>
          </div>

          {/* 动漫列表 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">动漫视频信息</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 py-2">动漫名称</th>
                    <th className="text-right text-gray-400 py-2">播放量</th>
                    <th className="text-right text-gray-400 py-2">点赞数</th>
                    <th className="text-right text-gray-400 py-2">弹幕数</th>
                    <th className="text-right text-gray-400 py-2">正面情感比例</th>
                  </tr>
                </thead>
                <tbody>
                  {animeData?.animeList?.map((anime: any) => (
                    <tr key={anime.id} className="border-b border-gray-700">
                      <td className="py-3 text-white">{anime.title}</td>
                      <td className="py-3 text-right text-gray-300">{formatNumber(anime.playCount)}</td>
                      <td className="py-3 text-right text-gray-300">{formatNumber(anime.likeCount)}</td>
                      <td className="py-3 text-right text-gray-300">{formatNumber(anime.danmakuCount)}</td>
                      <td className="py-3 text-right">
                        <span className="text-green-400">{(anime.sentiment.positiveRatio * 100).toFixed(1)}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4">
            <Link href="/anime" className="text-pink-500 hover:text-pink-400 flex items-center gap-1">
              查看详细分析 →
            </Link>
          </div>
        </section>

        {/* Section 2: 游戏数据分析 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm">2</span>
            游戏数据聚类分析
          </h2>
          
          {/* 概览卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">分析游戏数</p>
              <p className="text-2xl font-bold text-white">{gameData?.summary?.totalGames || 0}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">平均评分</p>
              <p className="text-2xl font-bold text-yellow-500">{gameData?.summary?.avgRating?.toFixed(1) || 0}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">总评论数</p>
              <p className="text-2xl font-bold text-blue-500">{formatNumber(gameData?.summary?.totalComments)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">回归R²</p>
              <p className="text-2xl font-bold text-green-500">{(gameData?.regression?.rSquared * 100)?.toFixed(1)}%</p>
            </div>
          </div>

          {/* 聚类结果 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">K-Means聚类结果</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {gameData?.clusterLabels?.map((label: string, i: number) => {
                const count = gameData?.clusterResults?.filter((r: any) => r.cluster === i)?.length || 0;
                return (
                  <div key={i} className="bg-gray-700 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">聚类 {i + 1}</p>
                    <p className="text-white font-semibold">{label}</p>
                    <p className="text-gray-400 text-sm">{count} 款游戏</p>
                  </div>
                );
              })}
            </div>
            
            {/* 特征重要性 */}
            <h4 className="text-md font-semibold text-white mb-3">特征重要性分析</h4>
            <div className="space-y-2">
              {gameData?.featureImportance?.map((f: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-gray-400 w-32">{f.feature}</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-4">
                    <div 
                      className="bg-blue-500 h-4 rounded-full" 
                      style={{ width: `${f.importance * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-300 w-16 text-right">{(f.importance * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Link href="/game" className="text-blue-500 hover:text-blue-400 flex items-center gap-1">
              查看详细分析 →
            </Link>
          </div>
        </section>

        {/* Section 3: 实验报告链接 */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">📄 实验报告</h3>
            <p className="text-gray-300 mb-4">
              本项目完成了以下分析任务：
            </p>
            <ul className="text-gray-400 space-y-2 mb-4">
              <li>✅ 爬取5部B站热门动漫的视频信息（播放量、点赞量、弹幕数）</li>
              <li>✅ 采集至少100条弹幕并进行情感分析</li>
              <li>✅ 绘制弹幕频率曲线和情感分布热力图</li>
              <li>✅ 提取高频词汇，分析用户兴趣焦点</li>
              <li>✅ 爬取20款游戏数据，进行K-Means聚类分析</li>
              <li>✅ 建立回归模型预测评分与评论数的关系</li>
              <li>✅ 绘制聚类散点图和特征重要性图</li>
            </ul>
            <Link 
              href="/report" 
              className="inline-block bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              查看完整实验报告
            </Link>
          </div>
        </section>
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
