import mongoose from "mongoose";

export default async function connectDB() {
  if (mongoose.connection.readyState) return; // جلوگیری از multiple connection
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB successfully");
  } catch (error) {
    console.error("Connection failed:", error);
    throw new Error("DB connection failed");
  }
}