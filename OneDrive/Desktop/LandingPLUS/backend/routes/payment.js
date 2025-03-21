import express from "express";
import Flutterwave from "flutterwave-node";
import Payment from "./models/Payment.js";

const router = express.Router();
const flw = new Flutterwave(process.env.FLUTTERWAVE_SECRET);

// Initiate Payment
router.post("/pay", async (req, res) => {
    try {
        const { userId, amount, email, currency = "KES" } = req.body;
        const txRef = "TX-" + Date.now();

        const response = await flw.Charge.card({
            tx_ref: txRef,
            amount,
            currency,
            redirect_url: "https://your-frontend.com/payment-success",
            customer: { email }
        });

        const payment = new Payment({ userId, amount, transactionId: txRef });
        await payment.save();

        res.json({ link: response.data.link });
    } catch (error) {
        res.status(500).json({ message: "Payment error" });
    }
});

// Webhook for Payment Confirmation
router.post("/webhook", async (req, res) => {
    const event = req.body;
    if (event.status === "successful") {
        await Payment.findOneAndUpdate({ transactionId: event.tx_ref }, { status: "successful" });
    }
    res.sendStatus(200);
});

export default router;
// In the code snippet above, we created a new route /pay that initiates a payment using the Flutterwave API. The route expects the userId, amount, email, and currency in the request body. We generate a unique transaction reference (txRef) and use the Flutterwave SDK to initiate the payment. We then save the payment details to the database.