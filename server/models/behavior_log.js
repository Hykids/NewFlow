import mongoose from "mongoose";

const BehaviorLogSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    articleId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'News'},
    behaviorType: {type: String, enum: ['views', 'like', 'null','reading'], required: true,default:'null'},
    behaviorTime: {type: Date, default: Date.now},
    interestWeight: {type: Number,default:0}
});

export const BehaviorLogModel = mongoose.model('BehaviorLog',BehaviorLogSchema)