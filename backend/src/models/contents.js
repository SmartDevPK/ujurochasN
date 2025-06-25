import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false }, 
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now },
});

const contents = mongoose.model('Content', ContentSchema );

export default contents;