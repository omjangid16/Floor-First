import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/floor_first";
  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    if (process.env.NODE_ENV === "production" && !process.env.MONGO_URI) {
      console.warn("[MongoDB] WARNING: MONGO_URI is not set in production. Please configure your MongoDB Atlas connection string.");
    }
  }
};
