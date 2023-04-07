import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  photo: { type: String },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});


export const ArticleModel = mongoose.model('Article',ArticleSchema)