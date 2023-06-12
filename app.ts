import express, { NextFunction, Request, Response } from "express";
const app = express();
require("dotenv").config();
import { initialize } from "./db.config";

export const connectionPool = initialize();

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

module.exports = app;
