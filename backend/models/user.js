import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  currentSessionToken: {
    type: String,
    default: null,
  },
});

export default mongoose.model("User", userSchema);
