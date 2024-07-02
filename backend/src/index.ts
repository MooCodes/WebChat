import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
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

interface ServerToClientEvents {
  "chat message": (msg: string) => void;
}

interface ClientToServerEvents {
  "chat message": (msg: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  username: string;
  message: string;
}

const httpServer = createServer(app);
const io = new Server<
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (obj) => {
    console.log("emitting ", obj);
    io.emit("chat message", obj);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
