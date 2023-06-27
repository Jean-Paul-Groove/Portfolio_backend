import express from "express";
const handleImageUpload = require("../middlewares/imageUploadHandling");
const optimizeImage = require("../middlewares/imageOptimization");
const aboutRouter = express.Router();
const aboutCtrl = require("../controllers/about.ctrl");
const verifyToken = require("../middlewares/verifyToken");

aboutRouter.get("/", aboutCtrl.getAbout);
aboutRouter.put(
  "/",
  verifyToken,
  handleImageUpload,
  optimizeImage,
  aboutCtrl.updateAbout
);

module.exports = aboutRouter;
