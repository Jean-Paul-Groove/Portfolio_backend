import { NextFunction, Request, Response } from "express";
const logger = require("../config/logger.config");
import { connectionPool } from "../config/db.config";
import { Project } from "../models/Project";

exports.getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await connectionPool.query("SELECT * from projet");
    const projects: Project[] = result[0];
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
