import mongoose from "mongoose";

const UserInterestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tag: [{ type: String}],
    weight: { type: Number, required: true }
});

export const UserInterestModel = mongoose.model('UserInterest',UserInterestSchema)