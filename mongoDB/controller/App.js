const express = require("express");
require("dotenv").config();
const Task = require("./models/taskModel");

const app = express();
const port = process.env.SECRET_PORT;

const taskRouter = require("./routes/taskRoutes");

app.use((req, res, next) => {
  try {
    const valideRequest = ["POST", "PUT","GET", "DELETE"];
    const method = req.method.toUpperCase();
    if (!valideRequest.includes(method)) {
      return res.status(400).json({ error: "Not allowed method" });
    }
  } catch (error) {
    console.error("Error checking methods", error);
    res.status(500).json({ error: "Error checking methods" });
  }
  next();
});


app.use("/task", taskRouter);

app.use(express.json());


app.listen(port, () => {
  console.log("Server running in port:", port);
});