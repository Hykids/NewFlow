import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String},
  tags: { type: String },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likesCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 }
},{ timestamps: true });


export const ArticleModel = mongoose.model('Article',ArticleSchema)