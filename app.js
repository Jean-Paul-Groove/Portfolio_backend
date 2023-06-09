const express = require("express");
const app = express();
const projectsRouter = require("./routers/projectsRouter");
const connexionRouter = require("./routers/connexionRouter");
const aboutRouter = require("./routers/aboutRouter");
require("dotenv").config();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/api/projects", projectsRouter);
app.use("/api/auth", connexionRouter);
app.use("/api/about", aboutRouter);

module.exports = app;
