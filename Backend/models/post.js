import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema, "posts");
