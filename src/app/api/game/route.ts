import { NextResponse } from 'next/server';
import { games, performClustering, performRegression, getClusterLabels, analyzeFeatureImportance } from '@/lib/data/game-data';

export async function GET() {
  const clusterResults = performClustering(4);
  const regressionResult = performRegression();
  const featureImportance = analyzeFeatureImportance();
  const clusterLabels = getClusterLabels(4);
  
  return NextResponse.json({
    games,
    clusterResults,
    clusterLabels,
    regression: {
      slope: regressionResult.slope,
      intercept: regressionResult.intercept,
      rSquared: regressionResult.rSquared,
      predictions: regressionResult.predictions
    },
    featureImportance,
    summary: {
      totalGames: games.length,
      avgRating: games.reduce((sum, g) => sum + g.rating, 0) / games.length,
      totalComments: games.reduce((sum, g) => sum + g.commentCount, 0),
      totalDownloads: games.reduce((sum, g) => sum + g.downloadCount, 0)
    }
  });
}
