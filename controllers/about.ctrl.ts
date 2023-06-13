import { NextFunction, Request, Response } from "express";
const logger = require("../config/logger.config");
import { connectionPool } from "../config/db.config";

exports.getAbout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await connectionPool.query("SELECT * from about WHERE id=1");
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
exports.updateAbout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;
    const result = await connectionPool.query(
      "UPDATE about SET name=?, description=?  WHERE id =1;",
      [name, description]
    );
    res.status(200).json({ message: "Modifications effectuées" });
    logger.info("Modification de about");
  } catch (error) {
    res.status(500).json(error);
    if (error instanceof Error) {
      logger.error(error.message);
    }
  }
};
