const fs = require('fs');

function calculateMAE(predictions, actuals) {
  if (predictions.length !== actuals.length) {
    throw new Error('预测值和真实值的数量不匹配');
  }

  const n = predictions.length;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += Math.abs(predictions[i] - actuals[i]);
  }

  const mae = sum / n;
  return mae;
}

function evaluateRecommendationSystem() {
  // 存储邻域大小与测试集的MAE值的键值对
  const neighborhoodSizeMAE = {};

  for (let neighborhoodSize = 1; neighborhoodSize <= 10; neighborhoodSize++) {
    // 构建文件路径
    const predictionsFilePath = `traindata/entity_embedding.vec`;
    const actualsFilePath = 'traindata/news.tsv';

    const predictions = fs.readFileSync(predictionsFilePath, 'utf-8').split('\n').map(Number);
    const actuals = fs.readFileSync(actualsFilePath, 'utf-8').split('\n').map(Number);

    const mae = calculateMAE(predictions, actuals);

    neighborhoodSizeMAE[neighborhoodSize] = mae;
  }

  console.log('邻域大小与测试集的MAE值:',neighborhoodSizeMAE);
}

evaluateRecommendationSystem();