import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 Single-device check
    if (user.currentSessionToken !== token) {
      return res.status(401).json({ message: "Logged in from another device" });
    }

    req.user = user; // Attach sanitized user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token failed or expired" });
  }
};
