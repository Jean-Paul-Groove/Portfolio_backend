import { NextFunction, Request, Response } from "express";
const logger = require("../config/logger.config");
import { connectionPool } from "../config/db.config";

exports.getAbout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await connectionPool.query("SELECT * from about");
    const [about] = result[0];
    if (about) {
      res.status(200).json(about);
    } else {
      res.status(404).json({ message: "Contenu A propos introuvable ..." });
      logger.warn("Contenu A propos introuvable ...");
    }
  } catch (error) {
    res.status(500).json(error);
    if (error instanceof Error) {
      logger.error(error.message);
    }
  }
};
