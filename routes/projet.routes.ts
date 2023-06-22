import express from "express";
const projectRouter = express.Router();
const projectsCtrl = require("../controllers/projet.ctrl.ts");
const handleImageUpload = require("../middlewares/imageUploadHandling");
const optimizeImage = require("../middlewares/imageOptimization");
const verifyToken = require("../middlewares/verifyToken");

projectRouter.get("/", projectsCtrl.getProjects);
projectRouter.post(
  "/",
  verifyToken,
  handleImageUpload,
  optimizeImage,
  projectsCtrl.addNewProject
);
projectRouter.delete("/:id", verifyToken, projectsCtrl.deleteOneProject);
projectRouter.put(
  "/:id",
  verifyToken,
  handleImageUpload,
  optimizeImage,
  projectsCtrl.updateProject
);

module.exports = projectRouter;
