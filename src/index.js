import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParse from "body-parser";
import dotenv from "dotenv";
import bluebird from "bluebird";

import auth from "../routes/auth";

dotenv.config();
const app = express();

app.use(bodyParse.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGODB_URL);

app.use("/api/auth", auth);

app.post("/api/auth", (req, res) => {
  res.status(400).json({ errors: { global: "Invalid credentials" } });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080, () => console.log("Running on localhost:8080"));
