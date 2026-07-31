import express from "express";
import { PORT, mongoDBURI } from "./config.js";
import mongoose from "mongoose";

const app = express();

//Middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).json({ message: "Welcome to Elegant Eats backend!" });
});

app.get("/health", (req, res) => {
  console.log(req);
  return res.status(200).json({ status: "ok" });
});

mongoose
  .connect(mongoDBURI)
  .then(() => {
    console.log("Connected to MongoDB 🛢️");
    app.listen(PORT, () => {
      console.log(`Elegant Eats backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
