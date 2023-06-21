import { NextFunction, Request, Response } from "express";
const logger = require("../config/logger.config");
import { connectionPool } from "../config/db.config";
import { Project } from "../models/Project";
const fs = require("fs");

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
      logger.warn("Projets introuvables");
      res.status(404).json({ message: "Projets introuvables ..." });
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    res.status(500).json(error);
  }
};

exports.addNewProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newProject: Project = req.body;
    if (newProject) {
      await connectionPool.query(
        "INSERT INTO projet (title, img, tags, url, description) VALUES(?, ?, ?, ?, ?);",
        [
          newProject.title,
          newProject.img,
          newProject.tags,
          newProject.url,
          newProject.description,
        ]
      );
      logger.info(`Nouveau projet ${newProject.title} ajouté avec succès`);
      res.status(201).json({ message: "Projet ajouté avec succès" });
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    res.status(500).json(error);
  }
};
exports.deleteOneProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectId = req.params.id;
    const data = await connectionPool.query(
      "SELECT img, title FROM projet WHERE id=?;",
      [projectId]
    );
    const formerImgUrl: string = data[0][0].img;
    const title: string = data[0][0].title;
    await connectionPool.query("DELETE FROM projet WHERE id=?;", [projectId]);
    fs.unlink("public" + formerImgUrl.split("public")[1], () => {});
    logger.info(`Le projet ${title} a été supprimé`);
    res.status(204).json({ message: "Suppression réalisée avec succès" });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    res.status(500).json(error);
  }
};

exports.updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectUpdate: Project = req.body;
    if (!projectUpdate) {
      throw new Error("Pas de maj transmise");
    }
    const projectId = req.params.id;
    const data = await connectionPool.query(
      "SELECT img FROM projet WHERE id=?;",
      [projectId]
    );
    const formerImgUrl: string = data[0][0].img;
    await connectionPool.query(
      "UPDATE projet SET title = ?, img = ?, tags = ?, url = ?, description= ? WHERE id=?; ",
      [
        projectUpdate.title,
        projectUpdate.img,
        projectUpdate.tags,
        projectUpdate.url,
        projectUpdate.description,
        projectId,
      ]
    );
    if (formerImgUrl != projectUpdate.img) {
      fs.unlink("public" + formerImgUrl.split("public")[1], () => {});
    }
    logger.info(`Le projet ${projectUpdate.title} a été modifié`);
    res.status(200).json({ message: "Projet mis à jour avec succès" });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    res.status(500).json(error);
  }
};
