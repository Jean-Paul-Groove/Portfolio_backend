import express from "express";
const projectRouter = express.Router();
const projectsCtrl = require("../controllers/projet.ctrl.ts");

projectRouter.get("/", projectsCtrl.getProjects);

module.exports = projectRouter;
