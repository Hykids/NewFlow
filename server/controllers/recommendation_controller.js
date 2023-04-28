import { BehaviorLogModel } from '../models/behavior_log.js';
import { RecommendationModel } from '../models/recommendation.js';
import { ArticleModel } from '../models/article.js';
import { UserModel } from '../models/user.js';

// 查询所有的用户行为记录
async function generateRecommendations(userId) {
  const users = await UserModel.find(); // 获取所有用户
const articles = await ArticleModel.find(); // 获取所有文章

const userMap = {}; // 存储用户id和数组下标的映射关系
const articleMap = {}; // 存储文章id和数组下标的映射关系

users.forEach((user, index) => {
  userMap[user._id.toString()] = index; // 将用户id和数组下标存入userMap中
});

articles.forEach((article, index) => {
  articleMap[article._id.toString()] = index; // 将文章id和数组下标存入articleMap中
});

const behaviorMatrix = Array(users.length).fill().map(() => Array(articles.length).fill(0));
  // 查询所有的用户行为记录
  const behaviorLogs = await BehaviorLogModel.find();

  behaviorLogs.forEach(log => {
    const userIndex = userMap[log.userId.toString()];
    const articleIndex = articleMap[log.articleId.toString()];
    const interestWeight = log.interestWeight || 0;
    behaviorMatrix[userIndex][articleIndex] += interestWeight;
  });
  // 计算用户相似度
  const similarityMatrix = Array(users.length).fill().map(() => Array(users.length).fill(0));
  for (let u = 0; u < users.length; u++) {
    for (let v = u + 1; v < users.length; v++) {
      let dotProduct = 0;
      let normU = 0;
      let normV = 0;
      for (let i = 0; i < articles.length; i++) {
        dotProduct += behaviorMatrix[u][i] * behaviorMatrix[v][i];
        normU += behaviorMatrix[u][i] ** 2;
        normV += behaviorMatrix[v][i] ** 2;
      }
      const similarity = dotProduct / Math.sqrt(normU * normV);
      similarityMatrix[u][v] = similarity;
      similarityMatrix[v][u] = similarity;
    }
  }
  console.log(similarityMatrix,'similarityMatrix')
  // 根据相似度矩阵和用户-物品矩阵生成推荐列表
  const recommendations = [];
  const userIndex = userMap[userId];
  for (let i = 0; i < articles.length; i++) {
    console.log('3',articles.length,similarityMatrix.length,behaviorMatrix.length)
    if (behaviorMatrix[userIndex][i] === 0) {
      let interest = 0;
      for (let v = 0; v < users.length; v++) {
        if (v !== userIndex && behaviorMatrix[v][i] !== 0 && !isNaN(similarityMatrix[userIndex][v])) {
          interest += similarityMatrix[userIndex][v] * behaviorMatrix[v][i];
        }
      }
      recommendations.push({ article: articles[i], interest });
    }

  }
  recommendations.sort((a, b) => b.interest - a.interest);
  
  console.log(recommendations,'recommendations')
  return recommendations.slice(0, 10);


  // 将推荐结果存入数据库
  // await RecommendationModel.deleteMany({});
  // await RecommendationModel.create(recommendations);
 
}




const getRecommendation = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    // 生成最新的推荐列表
    await generateRecommendations('643641ee8c1d5008c4246780');
    const recommendations = await RecommendationModel.findOne({ userId });
    const recommendedArticleIds = recommendations.recommendations.map(item => item.recommendations);
    const articles = await ArticleModel.find({ _id: { $in: recommendedArticleIds } });
    const recommendedArticles = articles.map(article => {
      return {
        id: article._id,
        title: article.title
      };
    });
    res.status(200).send(recommendedArticles);
  } catch (err) {
    res.status(400).send(err.message);
  }
};


export {
    getRecommendation
  }