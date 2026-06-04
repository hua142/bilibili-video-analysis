// B站动漫视频数据 - 5部热门动漫
export interface AnimeVideo {
  id: string;
  title: string;
  cover: string;
  playCount: number;      // 播放量
  likeCount: number;      // 点赞数
  danmakuCount: number;   // 弹幕数
  coinCount: number;      // 投币数
  shareCount: number;     // 分享数
  favoriteCount: number;  // 收藏数
  duration: number;       // 时长(秒)
  uploadDate: string;     // 上传日期
  author: string;         // UP主
  tags: string[];         // 标签
}

export const animeVideos: AnimeVideo[] = [
  {
    id: 'BV1xx411c7mD',
    title: '【进击的巨人】最终季 Part 2',
    cover: 'https://via.placeholder.com/320x180/fb7299/ffffff?text=进击的巨人',
    playCount: 45678900,
    likeCount: 1234567,
    danmakuCount: 89012,
    coinCount: 456789,
    shareCount: 234567,
    favoriteCount: 567890,
    duration: 1440,
    uploadDate: '2024-01-15',
    author: 'bilibili动漫',
    tags: ['热血', '战斗', '剧情', '巨人']
  },
  {
    id: 'BV1yy411c7mE',
    title: '【鬼灭之刃】柱训练篇',
    cover: 'https://via.placeholder.com/320x180/fb7299/ffffff?text=鬼灭之刃',
    playCount: 38901234,
    likeCount: 987654,
    danmakuCount: 76543,
    coinCount: 345678,
    shareCount: 198765,
    favoriteCount: 456789,
    duration: 1380,
    uploadDate: '2024-02-20',
    author: 'bilibili动漫',
    tags: ['热血', '战斗', '奇幻', '剑士']
  },
  {
    id: 'BV1zz411c7mF',
    title: '【咒术回战】第二季',
    cover: 'https://via.placeholder.com/320x180/fb7299/ffffff?text=咒术回战',
    playCount: 34567890,
    likeCount: 876543,
    danmakuCount: 65432,
    coinCount: 298765,
    shareCount: 178654,
    favoriteCount: 398765,
    duration: 1320,
    uploadDate: '2024-03-10',
    author: 'bilibili动漫',
    tags: ['热血', '战斗', '超自然', '咒术']
  },
  {
    id: 'BV1aa411c7mG',
    title: '【间谍过家家】第二季',
    cover: 'https://via.placeholder.com/320x180/fb7299/ffffff?text=间谍过家家',
    playCount: 29876543,
    likeCount: 765432,
    danmakuCount: 54321,
    coinCount: 256789,
    shareCount: 156789,
    favoriteCount: 345678,
    duration: 1260,
    uploadDate: '2024-04-05',
    author: 'bilibili动漫',
    tags: ['喜剧', '间谍', '家庭', '温馨']
  },
  {
    id: 'BV1bb411c7mH',
    title: '【一拳超人】第三季',
    cover: 'https://via.placeholder.com/320x180/fb7299/ffffff?text=一拳超人',
    playCount: 26789012,
    likeCount: 654321,
    danmakuCount: 43210,
    coinCount: 223456,
    shareCount: 134567,
    favoriteCount: 298765,
    duration: 1200,
    uploadDate: '2024-05-01',
    author: 'bilibili动漫',
    tags: ['热血', '战斗', '英雄', '搞笑']
  }
];

// 弹幕数据 - 每个动漫至少100条弹幕
export interface Danmaku {
  id: number;
  animeId: string;
  content: string;        // 弹幕内容
  time: number;           // 出现时间(秒)
  color: string;          // 弹幕颜色
  type: number;           // 弹幕类型(1:滚动 2:顶部 3:底部)
  sentiment: 'positive' | 'negative' | 'neutral';  // 情感倾向
  sentimentScore: number; // 情感分数(-1到1)
}

// 情感词库
const positiveWords = ['好看', '精彩', '厉害', '太棒了', '神作', '泪目', '燃爆了', '帅炸', '绝了', '爱了', 
  '完美', '感动', '牛逼', '超赞', '太强了', '神仙', '暴风哭泣', '鸡皮疙瘩', '燃', 'yyds'];
const negativeWords = ['无聊', '垃圾', '差评', '失望', '烂尾', '无聊', '拖沓', '水', '敷衍', '难看',
  '无聊死了', '弃了', '没意思', '浪费时间', '剧情太烂', '看不下去'];
const neutralWords = ['哈哈哈', '笑死', '哈哈哈哈', '来了', '打卡', '签到', '第一', '前排', '沙发', '打卡',
  '继续看', '等更新', '催更', '啥时候更新', '来了来了', '打卡打卡'];

// 生成模拟弹幕数据
function generateDanmaku(animeId: string, count: number): Danmaku[] {
  const danmakus: Danmaku[] = [];
  const duration = animeVideos.find(a => a.id === animeId)?.duration || 1200;
  
  for (let i = 0; i < count; i++) {
    const time = Math.random() * duration;
    const rand = Math.random();
    let content: string;
    let sentiment: 'positive' | 'negative' | 'neutral';
    let sentimentScore: number;
    
    if (rand < 0.6) {
      // 60% 正面弹幕
      content = positiveWords[Math.floor(Math.random() * positiveWords.length)];
      sentiment = 'positive';
      sentimentScore = 0.3 + Math.random() * 0.7;
    } else if (rand < 0.85) {
      // 25% 中性弹幕
      content = neutralWords[Math.floor(Math.random() * neutralWords.length)];
      sentiment = 'neutral';
      sentimentScore = -0.2 + Math.random() * 0.4;
    } else {
      // 15% 负面弹幕
      content = negativeWords[Math.floor(Math.random() * negativeWords.length)];
      sentiment = 'negative';
      sentimentScore = -0.3 - Math.random() * 0.7;
    }
    
    // 添加一些时间相关的弹幕
    if (time < 60) {
      const introComments = ['开场好评', '来了', '开始啦', '期待已久'];
      content = introComments[Math.floor(Math.random() * introComments.length)];
      sentiment = 'positive';
      sentimentScore = 0.5;
    } else if (time > duration - 120) {
      const endComments = ['完结撒花', '期待下一集', '太短了', '没看够'];
      content = endComments[Math.floor(Math.random() * endComments.length)];
      sentiment = Math.random() > 0.3 ? 'positive' : 'neutral';
      sentimentScore = sentiment === 'positive' ? 0.6 : 0;
    }
    
    danmakus.push({
      id: i + 1,
      animeId,
      content,
      time,
      color: ['#ffffff', '#fb7299', '#23b8ff', '#ffd700'][Math.floor(Math.random() * 4)],
      type: 1,
      sentiment,
      sentimentScore
    });
  }
  
  return danmakus.sort((a, b) => a.time - b.time);
}

// 为每个动漫生成弹幕
export const danmakuData: Record<string, Danmaku[]> = {};
animeVideos.forEach(anime => {
  danmakuData[anime.id] = generateDanmaku(anime.id, 120); // 每个动漫120条弹幕
});

// 弹幕频率分布（按时间段统计）
export interface DanmakuFrequency {
  timeRange: string;      // 时间段
  startTime: number;      // 开始时间
  endTime: number;        // 结束时间
  count: number;          // 弹幕数量
  avgSentiment: number;   // 平均情感分数
}

export function getDanmakuFrequency(animeId: string, intervalSeconds: number = 60): DanmakuFrequency[] {
  const danmakus = danmakuData[animeId] || [];
  const duration = animeVideos.find(a => a.id === animeId)?.duration || 1200;
  const result: DanmakuFrequency[] = [];
  
  for (let start = 0; start < duration; start += intervalSeconds) {
    const end = Math.min(start + intervalSeconds, duration);
    const segmentDanmakus = danmakus.filter(d => d.time >= start && d.time < end);
    
    result.push({
      timeRange: `${formatTime(start)}-${formatTime(end)}`,
      startTime: start,
      endTime: end,
      count: segmentDanmakus.length,
      avgSentiment: segmentDanmakus.length > 0 
        ? segmentDanmakus.reduce((sum, d) => sum + d.sentimentScore, 0) / segmentDanmakus.length 
        : 0
    });
  }
  
  return result;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 高频词统计
export interface WordFrequency {
  word: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export function getTopWords(animeId: string, topN: number = 20): WordFrequency[] {
  const danmakus = danmakuData[animeId] || [];
  const wordCount: Record<string, { count: number; sentiment: 'positive' | 'negative' | 'neutral' }> = {};
  
  danmakus.forEach(d => {
    if (!wordCount[d.content]) {
      wordCount[d.content] = { count: 0, sentiment: d.sentiment };
    }
    wordCount[d.content].count++;
  });
  
  return Object.entries(wordCount)
    .map(([word, data]) => ({ word, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}

// 情感分析结果
export interface SentimentAnalysis {
  total: number;
  positive: number;
  negative: number;
  neutral: number;
  positiveRatio: number;
  negativeRatio: number;
  avgScore: number;
}

export function analyzeSentiment(animeId: string): SentimentAnalysis {
  const danmakus = danmakuData[animeId] || [];
  const total = danmakus.length;
  const positive = danmakus.filter(d => d.sentiment === 'positive').length;
  const negative = danmakus.filter(d => d.sentiment === 'negative').length;
  const neutral = danmakus.filter(d => d.sentiment === 'neutral').length;
  const avgScore = danmakus.reduce((sum, d) => sum + d.sentimentScore, 0) / total;
  
  return {
    total,
    positive,
    negative,
    neutral,
    positiveRatio: positive / total,
    negativeRatio: negative / total,
    avgScore
  };
}
