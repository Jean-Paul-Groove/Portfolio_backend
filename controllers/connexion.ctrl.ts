import { NextFunction, Request, Response } from "express";
import { ConenxionForm } from "../models/ConnexionForm";
const jwt = require("jsonwebtoken");
const logger = require("../config/logger.config");

exports.login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const connexionForm: ConenxionForm = req.body;
    if (connexionForm) {
      if (connexionForm.username != process.env.PORTFOLIO_USERNAME) {
        logger.warn(
          `Tentative de connexion avec username incorrect(${connexionForm.username})`
        );
        res
          .status(401)
          .json({ message: "Utilisateur ou mot de passe incorrect" });
      } else {
        if (connexionForm.password != process.env.PORTFOLIO_PASSWORD) {
          logger.warn(
            `Tentative de connexion avec password incorrect(${connexionForm.password})`
          );
          res
            .status(401)
            .json({ message: "Utilisateur ou mot de passe incorrect" });
        } else {
          const token = jwt.sign(
            { payload: process.env.JWT_PAYLOAD },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRATION,
            }
          );
          res.status(200).json({ token: token });
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    res.status(500).json(error);
  }
};
