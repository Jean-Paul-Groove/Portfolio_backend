import express, { NextFunction, Request, Response } from "express";
import { initialize } from "./db.config";
const projetRouter = require("./routers/projet.routes");
require("dotenv").config();
initialize();
const app = express();

app.use(express.json());

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
module.exports = app;
