import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        hashpassword:{type: String, require: true, select:false } // Exclude password by default
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
