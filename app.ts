import express, { NextFunction, Request, Response } from "express";
import { initialize } from "./config/db.config";
const path = require("path");
const projetRouter = require("./routes/projet.routes");
const aboutRouter = require("./routes/about.routes");
const contactRouter = require("./routes/contact.routes");
const connexionRouter = require("./routes/connexion.routes");
const curriculumRouter = require("./routes/curriculum.routes");
require("dotenv").config();
initialize();
const app = express();

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/projets", projetRouter);
app.use("/api/about", aboutRouter);
app.use("/api/contact", contactRouter);
app.use("/api/connexion", connexionRouter);
app.use("/api/curriculum", curriculumRouter);
module.exports = app;
