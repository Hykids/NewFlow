import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    articleId: [{ type: String}],
});

export const RecommendationModel = mongoose.model('Recommendation',RecommendationSchema)