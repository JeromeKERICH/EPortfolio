import express from "express";
import LandingPage from "../models/LandingPage.js";
import Payment from "./models/Payment.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const landingPage = await LandingPage.findOne({ userId });
        const payments = await Payment.find({ userId });

        res.json({ landingPage, payments });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
