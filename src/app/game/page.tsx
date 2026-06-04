'use client';

import { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart, Bar, LineChart, Line, Legend } from 'recharts';
import Link from 'next/link';

export default function GameAnalysisPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/game').then(res => res.json()).then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const COLORS = ['#fb7299', '#23b8ff', '#ffd700', '#00ff88'];

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-400 hover:text-white mb-2 inline-block">← 返回首页</Link>
          <h1 className="text-2xl font-bold text-white">游戏数据聚类分析</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 数据概览 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">数据概览</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">游戏总数</p>
              <p className="text-2xl font-bold text-white">{data.summary.totalGames}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">平均评分</p>
              <p className="text-2xl font-bold text-yellow-500">{data.summary.avgRating.toFixed(1)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">总评论数</p>
              <p className="text-2xl font-bold text-blue-500">{formatNumber(data.summary.totalComments)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">总下载量</p>
              <p className="text-2xl font-bold text-green-500">{formatNumber(data.summary.totalDownloads)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">聚类数</p>
              <p className="text-2xl font-bold text-pink-500">4</p>
            </div>
          </div>
        </section>

        {/* K-Means聚类散点图 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">K-Means聚类散点图</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  type="number" 
                  dataKey="rating" 
                  name="评分" 
                  domain={[7, 10]}
                  stroke="#9ca3af"
                  label={{ value: '评分', position: 'bottom', fill: '#9ca3af' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="commentCount" 
                  name="评论数" 
                  stroke="#9ca3af"
                  tickFormatter={(v) => formatNumber(v)}
                  label={{ value: '评论数', angle: -90, position: 'left', fill: '#9ca3af' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                />
                <Legend />
                {[0, 1, 2, 3].map((cluster) => (
                  <Scatter
                    key={cluster}
                    name={data.clusterLabels[cluster] || `聚类${cluster + 1}`}
                    data={data.clusterResults.filter((r: any) => r.cluster === cluster)}
                    fill={COLORS[cluster]}
                  >
                    {data.clusterResults.filter((r: any) => r.cluster === cluster).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[cluster]} />
                    ))}
                  </Scatter>
                ))}
              </ScatterChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((cluster) => (
                <div key={cluster} className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[cluster] }}></div>
                    <span className="text-white">{data.clusterLabels[cluster]}</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {data.clusterResults.filter((r: any) => r.cluster === cluster).length} 款游戏
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 聚类详情 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">聚类分析结果</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((cluster) => {
              const games = data.clusterResults.filter((r: any) => r.cluster === cluster);
              const avgRating = games.reduce((sum: number, g: any) => sum + g.rating, 0) / games.length;
              const avgComments = games.reduce((sum: number, g: any) => sum + g.commentCount, 0) / games.length;
              
              return (
                <div key={cluster} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: COLORS[cluster] }}></div>
                    <h3 className="text-white font-semibold">{data.clusterLabels[cluster]}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-gray-400 text-xs">游戏数量</p>
                      <p className="text-xl font-bold text-white">{games.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-xs">平均评分</p>
                      <p className="text-xl font-bold text-yellow-500">{avgRating.toFixed(1)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-xs">平均评论数</p>
                      <p className="text-xl font-bold text-blue-500">{formatNumber(avgComments)}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {games.slice(0, 5).map((g: any) => (
                      <span key={g.gameId} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                        {g.gameName}
                      </span>
                    ))}
                    {games.length > 5 && (
                      <span className="text-gray-400 text-xs px-2 py-1">
                        +{games.length - 5} 更多
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 回归分析 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">回归分析：评分与评论数的关系</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white font-medium mb-4">回归参数</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">斜率 (Slope)</p>
                  <p className="text-xl font-bold text-blue-500">{data.regression.slope.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">截距 (Intercept)</p>
                  <p className="text-xl font-bold text-green-500">{data.regression.intercept.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">决定系数 (R²)</p>
                  <p className="text-xl font-bold text-pink-500">{(data.regression.rSquared * 100).toFixed(2)}%</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-700 rounded">
                <p className="text-gray-400 text-xs mb-1">回归方程</p>
                <p className="text-white font-mono text-sm">
                  log₁₀(评论数) = {data.regression.slope.toFixed(3)} × 评分 + {data.regression.intercept.toFixed(3)}
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 md:col-span-2">
              <h3 className="text-white font-medium mb-4">预测值对比</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.regression.predictions.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="gameId" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" tickFormatter={(v) => formatNumber(v)} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    formatter={(value: any) => formatNumber(value)}
                  />
                  <Legend />
                  <Bar dataKey="actual" name="实际评论数" fill="#fb7299" />
                  <Bar dataKey="predicted" name="预测评论数" fill="#23b8ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* 特征重要性 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">特征重要性图</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" domain={[0, 1]} stroke="#9ca3af" tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                <YAxis type="category" dataKey="feature" stroke="#9ca3af" width={120} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                  formatter={(value: any) => `${(value * 100).toFixed(2)}%`}
                />
                <Bar dataKey="importance" fill="#23b8ff">
                  {data.featureImportance.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {data.featureImportance.map((f: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-gray-400 w-32">{f.feature}</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full"
                      style={{ width: `${f.importance * 100}%`, backgroundColor: COLORS[i] }}
                    ></div>
                  </div>
                  <span className="text-gray-300 w-20 text-right">{(f.importance * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gray-700 rounded">
              <p className="text-gray-400 text-sm">
                <strong className="text-white">分析结论：</strong>
                评分与评论数存在较强的正相关关系，高评分游戏往往能获得更多用户评论。
                R² = {(data.regression.rSquared * 100).toFixed(1)}% 表明回归模型能解释约{(data.regression.rSquared * 100).toFixed(0)}%的数据变异。
              </p>
            </div>
          </div>
        </section>

        {/* 游戏列表 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">游戏数据详情</h2>
          <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 py-2">游戏名称</th>
                  <th className="text-left text-gray-400 py-2">平台</th>
                  <th className="text-right text-gray-400 py-2">评分</th>
                  <th className="text-right text-gray-400 py-2">评论数</th>
                  <th className="text-right text-gray-400 py-2">下载量</th>
                  <th className="text-left text-gray-400 py-2">类别</th>
                  <th className="text-left text-gray-400 py-2">聚类</th>
                </tr>
              </thead>
              <tbody>
                {data.games.map((game: any) => {
                  const cluster = data.clusterResults.find((r: any) => r.gameId === game.id)?.cluster;
                  return (
                    <tr key={game.id} className="border-b border-gray-700">
                      <td className="py-3 text-white">{game.name}</td>
                      <td className="py-3 text-gray-400">{game.platform}</td>
                      <td className="py-3 text-right text-yellow-500">{game.rating}</td>
                      <td className="py-3 text-right text-gray-300">{formatNumber(game.commentCount)}</td>
                      <td className="py-3 text-right text-gray-300">{formatNumber(game.downloadCount)}</td>
                      <td className="py-3 text-gray-400">{game.category}</td>
                      <td className="py-3">
                        <span 
                          className="px-2 py-1 rounded text-xs"
                          style={{ backgroundColor: COLORS[cluster] + '33', color: COLORS[cluster] }}
                        >
                          {data.clusterLabels[cluster]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
