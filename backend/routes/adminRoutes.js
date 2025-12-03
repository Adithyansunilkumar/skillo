import express from "express";
import { resetAllScores } from "../controllers/adminController.js";

const router = express.Router();

// Add admin authentication middleware here if needed
router.post("/reset-scores", resetAllScores);

export default router;