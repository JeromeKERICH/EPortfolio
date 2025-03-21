import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "successful", "failed"], default: "pending" },
    transactionId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Payment", PaymentSchema);
