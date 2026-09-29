import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
  if (!env.mongoURI) {
    throw new Error("MONGODB_URI is not configured");
  }

  const connection = await mongoose.connect(env.mongoURI);
  console.log(`MongoDB connected: ${connection.connection.host}`);
};
