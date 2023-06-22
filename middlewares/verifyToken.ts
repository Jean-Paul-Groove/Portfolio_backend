const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
const logger = require("../config/logger.config");

function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      const tokenValidity = jwt.verify(token, process.env.JWT_SECRET);
      if (tokenValidity) {
        next();
      }
    } else {
      logger.error("Authentification a échouée: Absence de token");
      res.status(401).json({
        error: "Aucun token",
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(401).json({ error: error });
  }
}

module.exports = verifyToken;
