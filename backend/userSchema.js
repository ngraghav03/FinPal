import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        minLength: 10,
        required: true,
        lowercase: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
    // createdAt: {
        // type: Date,
        // immutable: true,
        // default: Date.now(),
    // },
    // updatedAt: Date
});
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

export default User;