import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  weight: { type: Number, default: 0 },
  clickCount: { type: Number, default: 0 },
  date: { type: Date }
  });

  export const TagModel = mongoose.model('Tag',TagSchema)