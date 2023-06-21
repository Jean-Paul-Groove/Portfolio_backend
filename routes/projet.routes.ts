import express from "express";
const projectRouter = express.Router();
const projectsCtrl = require("../controllers/projet.ctrl.ts");
const handleImageUpload = require("../middlewares/imageUploadHandling");
const optimizeImage = require("../middlewares/imageOptimization");

projectRouter.get("/", projectsCtrl.getProjects);
projectRouter.post(
  "/",
  handleImageUpload,
  optimizeImage,
  projectsCtrl.addNewProject
);
projectRouter.delete("/:id", projectsCtrl.deleteOneProject);
projectRouter.put(
  "/:id",
  handleImageUpload,
  optimizeImage,
  projectsCtrl.updateProject
);

module.exports = projectRouter;
