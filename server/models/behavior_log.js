import mongoose from "mongoose";

const BehaviorLogSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    newsId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'News'},
    behaviorType: {type: String, enum: ['view', 'like', 'dislike'], required: true},
    behaviorTime: {type: Date, default: Date.now}
});


export const BehaviorLogModel = mongoose.model('BehaviorLog',BehaviorLogSchema)