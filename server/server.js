// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import connect from "./database/conn.js";
// import router from "./router/route.js";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();


// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use(morgan("tiny")); // it log the http format to console 
// app.disable("x-powered-by"); // less hackers know about our stack

// // HTTP GET Request
// app.get("/", (req, res) => {
//   res.status(201).json("Home GET Request");
// });

// // API routes
// app.use("/api", router);

// const port = 8000;

// // Start server when connected to database
// connect()
//   .then(() => {
//     try {
//       app.listen(port, () => {
//         console.log(`Server connected to http://localhost:${port}`);
//       });
//     } catch (error) {
//       console.log("Can't connect to the server");
//     }
//   })
//   .catch((error) => {
//     console.log("Invalid database connection...!");
//   });

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import connect from "./database/conn.js";
import router from "./router/route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Remove useFindAndModify: false from here
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
