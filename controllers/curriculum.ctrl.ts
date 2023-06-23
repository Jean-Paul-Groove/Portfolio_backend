import { NextFunction, Request, Response } from "express";
const logger = require("../config/logger.config");
import fs, { constants } from "fs";
import checkIfFileExists from "../utils/checkIfFileExists";

exports.updateCV = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const oldCvPath = "public/oldCvToDelete.pdf";
    const permanentCvPath = "public/cv_quentin_rousselet.pdf";
    if (req.file) {
      const oldCvExists = checkIfFileExists(permanentCvPath);
      if (oldCvExists) {
        fs.renameSync(permanentCvPath, oldCvPath);
      }

      fs.renameSync(req.file.path, permanentCvPath);

      if (oldCvExists) {
        fs.unlink(oldCvPath, (error) => {
          if (error) {
            logger.warn("L'ancien CV n'a pas été supprimé: " + error);
          }
        });
      }
      res.status(200).json({ message: "Cv modifié" });
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    res.status(500).json(error);
  }
};
