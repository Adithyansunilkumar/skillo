import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import path from "path";

dotenv.config();
await connectDB?.(); // if connectDB returns a promise; adjust if it's synchronous

const app = express();
const __dirname = path.resolve();

// Middlewares (register BEFORE routes)
app.use(express.json());

const clientOrigin = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: [clientOrigin, "https://skillopuzzles.vercel.app"],
    credentials: true,
  })
);

// Lightweight health endpoint to test API quickly
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API routes (must come before static catch-all)
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Serve static frontend only in production (and after API routes)
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "frontend", "dist");
  app.use(express.static(buildPath));

  // Node 22-safe wildcard route
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  // Optional: in development give a friendly root response
  app.get("/", (req, res) => {
    res.send("API running. In development mode - frontend served by Vite.");
  });
}

// Central error handler (optional, but helpful)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${process.env.NODE_ENV || "development"})`);
});
