import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
