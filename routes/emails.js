import express from "express";
import Email from "../config.js";

const router = express.Router();

// Route to save email
router.post("/emails", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email address (you might want to add more validation)
    if (!email) {
      return res.status(400).json({ error: "Email address is required" });
    }

    // Create a new instance of Email model with the provided email address
    const newEmail = new Email({ email });

    // Save the email to the database
    await newEmail.save();

    // Respond with success message
    res.status(201).json({ message: "Email saved successfully", email });
  } catch (error) {
    console.error("Error saving email:", error);
    res
      .status(500)
      .json({ error: "Failed to save email. Please try again later." });
  }
});

export default router;
