// 获取用户行为日志
const behaviorLogs = await BehaviorLog.find();

// 构建用户-文章矩阵
const userArticleMatrix = {};
behaviorLogs.forEach(log => {
  const { userId, newsId, behaviorType } = log;
  if (!userArticleMatrix[userId]) {
    userArticleMatrix[userId] = {};
  }
  if (!userArticleMatrix[userId][newsId]) {
    userArticleMatrix[userId][newsId] = 0;
  }
  if (behaviorType === 'like') {
    userArticleMatrix[userId][newsId] += 1;
  } else if (behaviorType === 'views') {
    userArticleMatrix[userId][newsId] += 0.5;
  } else if (behaviorType === 'reading') {
    userArticleMatrix[userId][newsId] += 0.1;
  }
});

// 计算用户相似度
const userSimilarity = {};
Object.keys(userArticleMatrix).forEach(userId1 => {
  Object.keys(userArticleMatrix).forEach(userId2 => {
    if (userId1 !== userId2) {
      if (!userSimilarity[userId1]) {
        userSimilarity[userId1] = {};
      }
      if (!userSimilarity[userId1][userId2]) {
        userSimilarity[userId1][userId2] = 0;
      }
      let dotProduct = 0;
      let normA = 0;
      let normB = 0;
      Object.keys(userArticleMatrix[userId1]).forEach(newsId => {
        if (userArticleMatrix[userId2][newsId]) {
          dotProduct += userArticleMatrix[userId1][newsId] * userArticleMatrix[userId2][newsId];
        }
        normA += userArticleMatrix[userId1][newsId] ** 2;
      });
      Object.keys(userArticleMatrix[userId2]).forEach(newsId => {
        normB += userArticleMatrix[userId2][newsId] ** 2;
      });
      const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
      userSimilarity[userId1][userId2] = similarity;
    }
  });
});

// 推荐文章
const recommendArticles = {};
Object.keys(userArticleMatrix).forEach(userId => {
  recommendArticles[userId] = [];
  Object.keys(userSimilarity[userId]).forEach(otherUserId => {
    if (userSimilarity[userId][otherUserId] > 0) {
      Object.keys(userArticleMatrix[otherUserId]).forEach(newsId => {
        if (!userArticleMatrix[userId][newsId]) {
          recommendArticles[userId].push({
            newsId,
            score: userSimilarity[userId][otherUserId] * userArticleMatrix[otherUserId][newsId],
          });
        }
      });
    }
  });
  recommendArticles[userId].sort((a, b) => b.score - a.score);
});
