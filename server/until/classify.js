import { NlpManager } from 'node-nlp';

// 创建 NlpManager 实例
const manager = new NlpManager({ languages: ['zh'] });

// 添加训练样本和标签

// 添加训练样本和标签
manager.addDocument('zh', '纪录片', '文化');
manager.addDocument('zh', '历史', '文化');
manager.addDocument('zh', '典故', '文化');
manager.addDocument('zh', '基层', '时政');
manager.addDocument('zh', '建议', '时政');
manager.addDocument('zh', '人大', '时政');
manager.addDocument('zh', '习近平', '时政');
manager.addDocument('zh', '党', '时政');
manager.addDocument('zh', '新征程', '时政');
manager.addDocument('zh', '中国特色', '时政');
manager.addDocument('zh', '复兴', '时政');
manager.addDocument('zh', '建设', '时政');
manager.addDocument('zh', '种子', '生态');
manager.addDocument('zh', '绿色', '生态');
manager.addDocument('zh', '节能', '生态');
manager.addDocument('zh', '戈壁', '生态');
manager.addDocument('zh', '致富', '经济');
manager.addDocument('zh', '金融', '经济');
manager.addDocument('zh', '外汇', '经济');
manager.addDocument('zh', '发展', '经济');
manager.addDocument('zh', '发展', '经济');
manager.addDocument('zh', '企业', '经济');
// 添加更多样本...
// 训练模型
async function trainModel() {
  await manager.train();
}

// 进行文本分类预测
async function classifyText(text) {
  const response = await manager.process('zh', text);
  return response.intent;
}

export { trainModel, classifyText };