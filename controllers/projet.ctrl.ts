import { NextFunction, Request, Response } from "express";
const logger = require("../logger");
import { connectionPool } from "../db.config";

exports.getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await connectionPool.query("SELECT * from projet");
    const projects = result[0];
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: "Projets introuvables ..." });
      logger.warn("Projets introuvables");
    }
  } catch (error) {
    res.status(500).json(error);
    if (error instanceof Error) {
      logger.error(error.message);
    }
  }
};
