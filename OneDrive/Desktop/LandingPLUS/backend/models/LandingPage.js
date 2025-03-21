import mongoose from "mongoose";

const LandingPageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
    description: String,
    images: [String],
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("LandingPage", LandingPageSchema);
