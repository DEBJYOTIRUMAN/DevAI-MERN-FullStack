import { v2 as cloudinary } from "cloudinary";
import { Post } from "../models/index.js";
import * as dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const postController = {
    async savePost(req, res) {
        try {
          const { userId, name, prompt, photo } = req.body;
          const photoUrl = await cloudinary.uploader.upload(photo);
          const newPost = await Post.create({
            userId,
            name,
            prompt,
            photo: photoUrl.url,
          });
          res.status(200).json({ success: true, data: newPost });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "Unable to create a post, please try again",
          });
        }
    },
    async getUserPost(req, res) {
        try {
            const posts = await Post.find({userId: req.params.id});
            res.status(200).json({ success: true, data: posts });
          } catch (err) {
            res.status(500).json({
              success: false,
              message: "Fetching posts failed, please try again",
            });
          }
    }
};
export default postController;
