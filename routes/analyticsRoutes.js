import express from "express";
import Post from "../models/Post.js"; 


const router = express.Router();
// Get post engagement analytics
router.get("/engagement", async (req, res) => {
  try {
    const posts = await Post.find();
    const engagementData = posts.map(post => ({
      postId: post._id,
      likes: post.likes,
      comments: post.comments.length
    }));

    res.status(200).json(engagementData);
  } catch (error) {
    console.error("Error fetching engagement data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router; 