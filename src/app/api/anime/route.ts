import { NextResponse } from 'next/server';
import { animeVideos, danmakuData, getDanmakuFrequency, getTopWords, analyzeSentiment } from '@/lib/data/anime-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const animeId = searchParams.get('animeId');
  
  if (animeId) {
    const anime = animeVideos.find(a => a.id === animeId);
    if (!anime) {
      return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      anime,
      danmakus: danmakuData[animeId] || [],
      frequency: getDanmakuFrequency(animeId),
      topWords: getTopWords(animeId),
      sentiment: analyzeSentiment(animeId)
    });
  }
  
  return NextResponse.json({
    animeList: animeVideos.map(anime => ({
      id: anime.id,
      title: anime.title,
      cover: anime.cover,
      playCount: anime.playCount,
      likeCount: anime.likeCount,
      danmakuCount: anime.danmakuCount,
      sentiment: analyzeSentiment(anime.id)
    })),
    summary: {
      totalAnime: animeVideos.length,
      totalPlayCount: animeVideos.reduce((sum, a) => sum + a.playCount, 0),
      totalLikeCount: animeVideos.reduce((sum, a) => sum + a.likeCount, 0),
      totalDanmakuCount: Object.values(danmakuData).reduce((sum, arr) => sum + arr.length, 0)
    }
  });
}
