import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";

const app = express();

//**middleware */
app.use(express.json());
app.use(cors());
// morgan library is used to log the http request inside the console
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

//**HTTP GET Request */
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

//**api routes */
app.use("/api", router);

const port = 8000;
// **start server when have valid connection */
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Can't connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!");
  });
