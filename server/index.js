import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();

//routes

import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/posts.route.js";
import userRoutes from "./routes/users.route.js";

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to Database");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(8800, () => {
  connect();
  console.log("Conneted to BACKEND");
});
