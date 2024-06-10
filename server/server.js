import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./router/route.js";
import dotenv from "dotenv";


dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Database connection error:", error));

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.status(200).json("Home GET Request");
});


app.use("/api", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
