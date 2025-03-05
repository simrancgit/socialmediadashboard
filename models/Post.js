import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // References User model
  content: { type: String, required: true },
  scheduledTime: { type: Date },
  likes: { type: Number, default: 0 }, // Default likes to 0
  comments: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference user
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now } // Track comment time
    }
  ]
}, { timestamps: true }); // Auto-create `createdAt` and `updatedAt`

export default mongoose.model("Post", PostSchema);
