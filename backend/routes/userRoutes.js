import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET profile
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Here is your profile",
    user: req.user,
  });
});

// GET total score
router.get("/score", protect, async (req, res) => {
  try {
    res.json({ totalScore: req.user.totalScore });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE score
router.patch("/update-score", protect, async (req, res) => {
  try {
    const { points } = req.body;
    if (typeof points !== "number") {
      return res.status(400).json({ message: "Points must be number" });
    }

    req.user.totalScore += points;
    await req.user.save();

    res.json({
      message: "Score updated",
      totalScore: req.user.totalScore,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
