import express from "express";
const handleImageUpload = require("../middlewares/imageUploadHandling");
const optimizeImage = require("../middlewares/imageOptimization");
const aboutRouter = express.Router();
const aboutCtrl = require("../controllers/about.ctrl.ts");

aboutRouter.get("/", aboutCtrl.getAbout);
aboutRouter.put(
  "",
  handleImageUpload.single("file"),
  optimizeImage,
  aboutCtrl.updateAbout
);

module.exports = aboutRouter;
