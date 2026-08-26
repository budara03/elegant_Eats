import http from "node:http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { PORT, mongoDBURI } from "./config.js";
import mongoose from "mongoose";
import authrouter from "./routes/authRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import initChatSocket from "./socket/chatSocket.js";

const app = express();

// Middleware — Allow frontend origins
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authrouter);
app.use("/api/chat", chatRouter);

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

// HTTP + Socket.IO server
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  },
});

initChatSocket(io);

mongoose
  .connect(mongoDBURI)
  .then(() => {
    console.log("Connected to MongoDB 🛢️");
    httpServer.listen(PORT, () => {
      console.log(`Elegant Eats backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
