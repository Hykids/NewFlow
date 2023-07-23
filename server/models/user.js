import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
    tags: [{ type:String, ref: 'Tag' }],
})

export const UserModel = mongoose.model('User',UserSchema)