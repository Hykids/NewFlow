import { BehaviorLogModel } from "../models/behavior_log.js";

const behaviorTypeWeight = {
  views: 1,
  reading: 2,
  like: 3,
  null:0
}

const setBehaviorLog = async(req,res,next) => {
    const { userId, articleId, behaviorType,behaviorTime } = req.body;
    const interestWeight = behaviorTypeWeight[behaviorType];
// 计算用户行为对应的权重
  try {
    // 创建新的日志对象
    const log = new BehaviorLogModel({
      userId,
      articleId,
      behaviorType,
      behaviorTime,
      interestWeight
    });
    // 保存日志对象到数据库
    await log.save();

    // 返回成功响应
    return res.status(200).json({
      success: true,
      message: 'Duration logged successfully'
    });
  } catch (error) {
    console.error(error);
    // 返回失败响应
    return res.status(500).json({
      success: false,
      message: 'Failed to log duration'
    });
  }
        
}

const getDuration = async(req,res,next) => {
    const userId = req.params.userId;
    const newsId = req.params.newsId;
  
    try {
      const behaviorLog = await BehaviorLogModel.findOne({userId, newsId}).exec();
      if (!behaviorLog) {
        return res.status(404).json({message: 'Behavior log not found'});
      }
  
      const {behaviorType, duration} = behaviorLog;
      return res.json({behaviorType, duration});
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: 'Internal server error'});
    }
        
}

export {
  setBehaviorLog
}