const express = require("express");
const cors = require("cors")
const todoFunc = require("./routes/todo.route");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", todoFunc);

module.exports = app;