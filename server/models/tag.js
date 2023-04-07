import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  });

  export const TagModel = mongoose.model('Tag',TagSchema)