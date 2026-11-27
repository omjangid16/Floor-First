import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxies (AWS ALB, CloudFront, App Runner)
app.set("trust proxy", 1);

// Connect to MongoDB
connectDB();

// CORS configuration (supports comma-separated origins from CLIENT_ORIGIN or allows all)
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((s) => s.trim())
  : "*";

app.use(
  cors({
    origin: allowedOrigins === "*" ? "*" : allowedOrigins,
    credentials: allowedOrigins !== "*",
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check endpoint (reports status, DB connection state, and active port)
app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
  res.json({
    status: "ok",
    service: "Floor First API",
    database: dbStatusMap[dbState] || "unknown",
    port: Number(PORT),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/products", productRoutes);

// In production or full-stack deployment, serve frontend static build if it exists
const frontendDistPath = path.resolve(__dirname, "../frontend/dist");
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server - explicit 0.0.0.0 binding for Docker/Cloud hosts
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Server] Express server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  console.log(`[Server] Health check available at: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown handler for AWS ECS / App Runner / Docker container lifecycle
const handleShutdown = (signal) => {
  console.log(`[Server] Received ${signal}. Starting graceful shutdown...`);
  server.close(async () => {
    console.log("[Server] HTTP server closed.");
    try {
      await mongoose.connection.close(false);
      console.log("[MongoDB] Database connection closed cleanly.");
      process.exit(0);
    } catch (err) {
      console.error("[MongoDB] Error during connection close:", err);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error("[Server] Forcefully terminating process after 10s timeout");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("SIGINT", () => handleShutdown("SIGINT"));

export default app;
