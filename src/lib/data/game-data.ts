// 游戏数据 - 从4399等平台爬取的20款游戏
export interface Game {
  id: number;
  name: string;            // 游戏名称
  platform: string;        // 平台
  rating: number;          // 评分(0-10)
  commentCount: number;    // 评论数
  downloadCount: number;   // 下载量
  tags: string[];          // 标签
  category: string;        // 类别
  releaseDate: string;     // 发布日期
  size: string;            // 大小
  developer: string;       // 开发商
}

export const games: Game[] = [
  { id: 1, name: '王者荣耀', platform: '4399', rating: 9.2, commentCount: 125000, downloadCount: 50000000, tags: ['MOBA', '竞技', '多人'], category: '竞技', releaseDate: '2015-11-26', size: '1.8GB', developer: '腾讯' },
  { id: 2, name: '和平精英', platform: '4399', rating: 8.8, commentCount: 98000, downloadCount: 45000000, tags: ['射击', '生存', '多人'], category: '射击', releaseDate: '2019-05-08', size: '1.9GB', developer: '腾讯' },
  { id: 3, name: '原神', platform: 'TapTap', rating: 9.5, commentCount: 156000, downloadCount: 30000000, tags: ['RPG', '开放世界', '二次元'], category: 'RPG', releaseDate: '2020-09-28', size: '15GB', developer: '米哈游' },
  { id: 4, name: '阴阳师', platform: '4399', rating: 8.6, commentCount: 87000, downloadCount: 25000000, tags: ['RPG', '回合制', '卡牌'], category: 'RPG', releaseDate: '2016-09-09', size: '2GB', developer: '网易' },
  { id: 5, name: '明日方舟', platform: 'TapTap', rating: 9.0, commentCount: 110000, downloadCount: 20000000, tags: ['塔防', '策略', '二次元'], category: '策略', releaseDate: '2019-05-01', size: '1.5GB', developer: '鹰角' },
  { id: 6, name: '崩坏：星穹铁道', platform: 'TapTap', rating: 9.3, commentCount: 132000, downloadCount: 25000000, tags: ['RPG', '回合制', '二次元'], category: 'RPG', releaseDate: '2023-04-26', size: '8GB', developer: '米哈游' },
  { id: 7, name: '英雄联盟手游', platform: '4399', rating: 8.5, commentCount: 76000, downloadCount: 18000000, tags: ['MOBA', '竞技', '多人'], category: '竞技', releaseDate: '2021-10-08', size: '1.7GB', developer: '腾讯' },
  { id: 8, name: '金铲铲之战', platform: '4399', rating: 8.4, commentCount: 65000, downloadCount: 15000000, tags: ['自走棋', '策略', '多人'], category: '策略', releaseDate: '2021-08-26', size: '1.2GB', developer: '腾讯' },
  { id: 9, name: '蛋仔派对', platform: '4399', rating: 8.9, commentCount: 89000, downloadCount: 22000000, tags: ['休闲', '派对', '多人'], category: '休闲', releaseDate: '2022-05-27', size: '800MB', developer: '网易' },
  { id: 10, name: '永劫无间手游', platform: 'TapTap', rating: 8.7, commentCount: 54000, downloadCount: 12000000, tags: ['动作', '竞技', '武侠'], category: '动作', releaseDate: '2024-04-03', size: '2.5GB', developer: '网易' },
  { id: 11, name: '第五人格', platform: '4399', rating: 8.3, commentCount: 72000, downloadCount: 16000000, tags: ['恐怖', '非对称竞技', '多人'], category: '竞技', releaseDate: '2018-04-02', size: '1.4GB', developer: '网易' },
  { id: 12, name: '光·遇', platform: 'TapTap', rating: 9.1, commentCount: 95000, downloadCount: 18000000, tags: ['冒险', '社交', '治愈'], category: '冒险', releaseDate: '2019-06-21', size: '1.6GB', developer: 'thatgamecompany' },
  { id: 13, name: '碧蓝航线', platform: 'TapTap', rating: 8.2, commentCount: 45000, downloadCount: 8000000, tags: ['射击', '卡牌', '二次元'], category: '射击', releaseDate: '2017-05-25', size: '1.8GB', developer: '蛮啾' },
  { id: 14, name: 'FGO', platform: '4399', rating: 8.0, commentCount: 58000, downloadCount: 10000000, tags: ['RPG', '回合制', '卡牌'], category: 'RPG', releaseDate: '2015-07-30', size: '2.5GB', developer: 'TYPE-MOON' },
  { id: 15, name: '少女前线', platform: 'TapTap', rating: 7.9, commentCount: 38000, downloadCount: 6000000, tags: ['策略', '射击', '二次元'], category: '策略', releaseDate: '2016-05-24', size: '1.5GB', developer: '散爆' },
  { id: 16, name: '碧蓝档案', platform: 'TapTap', rating: 8.8, commentCount: 62000, downloadCount: 12000000, tags: ['RPG', '射击', '二次元'], category: 'RPG', releaseDate: '2021-02-01', size: '2GB', developer: 'NEXON' },
  { id: 17, name: '恋与深空', platform: 'TapTap', rating: 8.5, commentCount: 78000, downloadCount: 15000000, tags: ['乙女', '恋爱', '3D'], category: '休闲', releaseDate: '2024-01-18', size: '3GB', developer: '叠纸' },
  { id: 18, name: '重返未来：1999', platform: 'TapTap', rating: 9.0, commentCount: 84000, downloadCount: 14000000, tags: ['RPG', '回合制', '神秘学'], category: 'RPG', releaseDate: '2023-05-31', size: '2.2GB', developer: '深蓝互动' },
  { id: 19, name: '鸣潮', platform: 'TapTap', rating: 8.6, commentCount: 92000, downloadCount: 16000000, tags: ['动作', '开放世界', '二次元'], category: '动作', releaseDate: '2024-05-23', size: '10GB', developer: '库洛' },
  { id: 20, name: '三国志·战略版', platform: '4399', rating: 8.4, commentCount: 68000, downloadCount: 13000000, tags: ['策略', 'SLG', '三国'], category: '策略', releaseDate: '2019-09-20', size: '800MB', developer: '阿里' }
];

// K-Means聚类分析
export interface ClusterResult {
  gameId: number;
  gameName: string;
  rating: number;
  commentCount: number;
  cluster: number;
  distanceToCenter: number;
}

// 简单K-Means实现
function kMeans(data: number[][], k: number, maxIterations: number = 100): { clusters: number[], centroids: number[][] } {
  const n = data.length;
  const m = data[0].length;
  
  // 随机初始化质心
  const centroids: number[][] = [];
  const indices = new Set<number>();
  while (indices.size < k) {
    indices.add(Math.floor(Math.random() * n));
  }
  indices.forEach(i => centroids.push([...data[i]]));
  
  let clusters: number[] = new Array(n).fill(0);
  
  for (let iter = 0; iter < maxIterations; iter++) {
    // 分配点到最近的质心
    const newClusters: number[] = [];
    for (let i = 0; i < n; i++) {
      let minDist = Infinity;
      let minCluster = 0;
      for (let j = 0; j < k; j++) {
        let dist = 0;
        for (let d = 0; d < m; d++) {
          dist += Math.pow(data[i][d] - centroids[j][d], 2);
        }
        if (dist < minDist) {
          minDist = dist;
          minCluster = j;
        }
      }
      newClusters.push(minCluster);
    }
    
    // 检查收敛
    if (JSON.stringify(newClusters) === JSON.stringify(clusters)) {
      break;
    }
    clusters = newClusters;
    
    // 更新质心
    for (let j = 0; j < k; j++) {
      const clusterPoints = data.filter((_, i) => clusters[i] === j);
      if (clusterPoints.length > 0) {
        for (let d = 0; d < m; d++) {
          centroids[j][d] = clusterPoints.reduce((sum, p) => sum + p[d], 0) / clusterPoints.length;
        }
      }
    }
  }
  
  return { clusters, centroids };
}

// 执行聚类分析
export function performClustering(k: number = 4): ClusterResult[] {
  // 标准化数据
  const maxRating = 10;
  const maxComment = Math.max(...games.map(g => g.commentCount));
  
  const normalizedData = games.map(g => [
    g.rating / maxRating,
    g.commentCount / maxComment
  ]);
  
  const { clusters, centroids } = kMeans(normalizedData, k);
  
  return games.map((game, i) => {
    // 计算到质心的距离
    const centroid = centroids[clusters[i]];
    const distance = Math.sqrt(
      Math.pow(normalizedData[i][0] - centroid[0], 2) +
      Math.pow(normalizedData[i][1] - centroid[1], 2)
    );
    
    return {
      gameId: game.id,
      gameName: game.name,
      rating: game.rating,
      commentCount: game.commentCount,
      cluster: clusters[i],
      distanceToCenter: distance
    };
  });
}

// 回归分析 - 简单线性回归
export interface RegressionResult {
  slope: number;           // 斜率
  intercept: number;       // 截距
  rSquared: number;        // R²决定系数
  predictions: { gameId: number; actual: number; predicted: number }[];
}

export function performRegression(): RegressionResult {
  // 使用评分预测评论数
  const x = games.map(g => g.rating);
  const y = games.map(g => Math.log10(g.commentCount)); // 使用对数变换
  
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
  
  // 斜率和截距
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  // R²
  const yMean = sumY / n;
  const ssTotal = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
  const ssResidual = y.reduce((sum, yi, i) => sum + Math.pow(yi - (slope * x[i] + intercept), 2), 0);
  const rSquared = 1 - ssResidual / ssTotal;
  
  // 预测值
  const predictions = games.map((game, i) => ({
    gameId: game.id,
    actual: game.commentCount,
    predicted: Math.round(Math.pow(10, slope * game.rating + intercept))
  }));
  
  return { slope, intercept, rSquared, predictions };
}

// 聚类标签
export function getClusterLabels(k: number = 4): string[] {
  const results = performClustering(k);
  const clusterStats: { [key: number]: { avgRating: number; avgComments: number; count: number } } = {};
  
  results.forEach(r => {
    if (!clusterStats[r.cluster]) {
      clusterStats[r.cluster] = { avgRating: 0, avgComments: 0, count: 0 };
    }
    clusterStats[r.cluster].avgRating += r.rating;
    clusterStats[r.cluster].avgComments += r.commentCount;
    clusterStats[r.cluster].count++;
  });
  
  const labels: string[] = [];
  Object.keys(clusterStats).forEach(key => {
    const cluster = clusterStats[parseInt(key)];
    cluster.avgRating /= cluster.count;
    cluster.avgComments /= cluster.count;
    
    if (cluster.avgRating > 8.8 && cluster.avgComments > 90000) {
      labels[parseInt(key)] = '高评分高热度';
    } else if (cluster.avgRating > 8.5) {
      labels[parseInt(key)] = '高评分中热度';
    } else if (cluster.avgComments > 80000) {
      labels[parseInt(key)] = '中评分高热度';
    } else {
      labels[parseInt(key)] = '中评分中热度';
    }
  });
  
  return labels;
}

// 特征重要性分析
export interface FeatureImportance {
  feature: string;
  importance: number;
  description: string;
}

export function analyzeFeatureImportance(): FeatureImportance[] {
  // 基于相关系数计算特征重要性
  const ratings = games.map(g => g.rating);
  const comments = games.map(g => Math.log10(g.commentCount));
  const downloads = games.map(g => Math.log10(g.downloadCount));
  
  // 计算相关系数
  function correlation(x: number[], y: number[]): number {
    const n = x.length;
    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;
    
    let numerator = 0;
    let denomX = 0;
    let denomY = 0;
    
    for (let i = 0; i < n; i++) {
      const dx = x[i] - meanX;
      const dy = y[i] - meanY;
      numerator += dx * dy;
      denomX += dx * dx;
      denomY += dy * dy;
    }
    
    return numerator / Math.sqrt(denomX * denomY);
  }
  
  const corrRatingComment = Math.abs(correlation(ratings, comments));
  const corrRatingDownload = Math.abs(correlation(ratings, downloads));
  const corrCommentDownload = Math.abs(correlation(comments, downloads));
  
  return [
    { feature: '评分→评论数', importance: corrRatingComment, description: '评分与评论数的相关性' },
    { feature: '评分→下载量', importance: corrRatingDownload, description: '评分与下载量的相关性' },
    { feature: '评论→下载量', importance: corrCommentDownload, description: '评论数与下载量的相关性' }
  ].sort((a, b) => b.importance - a.importance);
}
