import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
    const secret = process.env.JWT_SECRET || "floor_first_super_secret_jwt_key_2026";
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found for this token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("[Auth Middleware] Token error:", error.message);
    return res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
};

export const optionalAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const secret = process.env.JWT_SECRET || "floor_first_super_secret_jwt_key_2026";
    const decoded = jwt.verify(token, secret);
    req.user = await User.findById(decoded.id).select("-password");
  } catch {
    req.user = null;
  }
  next();
};
