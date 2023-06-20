import express from "express";
const projectRouter = express.Router();
const projectsCtrl = require("../controllers/projet.ctrl.ts");
const handleImageUpload = require("../middlewares/imageUploadHandling");
const optimizeImage = require("../middlewares/imageOptimization");

projectRouter.get("/", projectsCtrl.getProjects);
projectRouter.post(
  "/nouveau",
  handleImageUpload,
  optimizeImage,
  projectsCtrl.addNewProject
);

module.exports = projectRouter;
