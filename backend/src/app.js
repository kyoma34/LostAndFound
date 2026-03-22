const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;