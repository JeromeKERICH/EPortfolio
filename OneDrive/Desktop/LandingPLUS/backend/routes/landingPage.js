import express from "express";
import multer from "multer";
import LandingPage from "./models/LandingPage.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Submit Landing Page Content
router.post("/submit", upload.array("images"), async (req, res) => {
    try {
        const { userId, title, description } = req.body;
        const images = req.files.map(file => file.path);

        const landingPage = new LandingPage({ userId, title, description, images });
        await landingPage.save();

        res.json({ message: "Landing page submitted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
// In the code snippet above, we created a new route /submit that accepts a POST request with the userId, title, description, and images in the request body. We use the multer middleware to handle file uploads and save the images to the uploads directory. We then create a new LandingPage document and save it to the database.