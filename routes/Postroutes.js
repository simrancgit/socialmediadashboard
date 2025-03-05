import express from "express";
const router = express.Router();
import Post  from "../models/Post.js";

// Schedule a new post
router.post("/", async (req, res) => {
  try {
    const { userId, message, scheduledTime } = req.body;

    if (!userId || !message || !scheduledTime) {
      return res.status(400).json({ error: "All fields (userId, message, scheduledTime) are required." });
    }

    const post = new Post({ userId, content: message, scheduledTime, likes: 0, comments: [], status: "scheduled" });
    await post.save();

    res.status(201).json({ message: "Post scheduled successfully", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all scheduled posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get engagement metrics
router.get("/metrics", async (req, res) => {
  try {
    const metrics = await Post.aggregate([
      {
        $project: {
          likes: 1,
          commentsCount: { $size: "$comments" }, // ✅ Count comments properly
          shares: 1,
        },
      },
      {
        $group: {
          _id: null,
          totalLikes: { $sum: "$likes" },
          totalComments: { $sum: "$commentsCount" },
          totalShares: { $sum: "$shares" },
        },
      },
    ]);

    res.json(metrics[0] || { totalLikes: 0, totalComments: 0, totalShares: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auto-posting mechanism
setInterval(async () => {
  try {
    const now = new Date();
    const posts = await Post.find({ scheduledTime: { $lte: now }, status: "scheduled" });

    for (const post of posts) {
      console.log(`Posting: ${post.content}`);
      post.status = "posted"; // ✅ Ensure status update
      await post.save();
    }
  } catch (error) {
    console.error("Error in auto-posting:", error);
  }
}, 60000); // Runs every 1 minute

export default router;
