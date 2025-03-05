import mongoose, { Schema } from "mongoose";

const emailSchema = new Schema({
    user: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expireAt: { type: Date, required: true, expires: 3600 } // Expires in 1 hour
}, { timestamps: true });

const Verification = mongoose.model("Verification", emailSchema);

export default Verification;
