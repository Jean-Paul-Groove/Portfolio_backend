import express from "express";
const curriculumRouter = express.Router();
const curriculumCtrl = require("../controllers/curriculum.ctrl");
const verifyToken = require("../middlewares/verifyToken");
const handleCurriculumUpload = require("../middlewares/curriculumUploadHandling");

curriculumRouter.put(
  "/",
  verifyToken,
  handleCurriculumUpload,
  curriculumCtrl.updateCV
);

module.exports = curriculumRouter;
