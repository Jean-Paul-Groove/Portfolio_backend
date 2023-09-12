import { NextFunction, Request, Response } from "express";
const fs = require("fs");
const logger = require("../config/logger.config");
import { connectionPool } from "../config/db.config";
import { AboutContent } from "../models/About";
import { defaultAbout } from "../data/deafault.about";

exports.getAbout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await connectionPool.query("SELECT * from about WHERE id=1");
    const about: AboutContent = result[0][0];
    if (about) {
      res.status(200).json(about);
      return;
    }
    logger.warn("Contenu A propos introuvable ...");
    res.status(404).json({ message: "Contenu A propos introuvable ..." });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    res.status(500).json(error);
  }
};
exports.updateAbout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newAbout: AboutContent = {
      name: req.body.name,
      description: req.body.description,
    };
    if (newAbout) {
      if (req.body.img) {
        const data = await connectionPool.query(
          "SELECT img FROM about WHERE id=1;"
        );
        const formerImgUrl: String = data[0][0].img;

        await connectionPool.query(
          "UPDATE about SET name=?, description=?, img=?  WHERE id =1;",
          [newAbout.name, newAbout.description, req.body.img]
        );
        fs.unlink("public" + formerImgUrl.split("public")[1], () => {
          logger.info("Photo de profil modifiée");
        });
      } else {
        await connectionPool.query(
          "UPDATE about SET name=?, description=?  WHERE id =1;",
          [newAbout.name, newAbout.description]
        );
      }
      logger.info("Informations de la partie about modifiées");
      res.status(204).json({ message: "Modifications effectuées" });
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    res.status(500).json(error);
  }
};

exports.initAboutTable = async () => {
  try {
    const result = await connectionPool.query("SELECT * from about");
    if (!result[0][0]) {
      await connectionPool.query(
        "INSERT INTO about (name, img, description) VALUES(?,?,?);",
        [defaultAbout.name, defaultAbout.img, defaultAbout.description]
      );
      logger.info("About initialisé avec le contenu par défaut");
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
  }
};
