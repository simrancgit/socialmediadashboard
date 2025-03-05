import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "posts", required: true },
    comment: { type: String, required: true },
    from: { type: String, required: true }
}, { timestamps: true }); // Adds createdAt & updatedAt

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
