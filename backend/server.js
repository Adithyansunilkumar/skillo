import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import User from "./models/user.js"; // ✅ important
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://skillogames.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("hi");
});

// ==========================
// ✅ Correct GET Leaderboard Route
// ==========================
app.get("/api/leaderboard", async (req, res) => {
  try {
    const users = await User.find({})
      .select("username totalScore") // only send name + score
      .sort({ totalScore: -1 }); // highest score first

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
