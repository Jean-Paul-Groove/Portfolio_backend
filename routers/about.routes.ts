import express from "express";
const aboutRouter = express.Router();
const aboutCtrl = require("../controllers/about.ctrl.ts");

aboutRouter.get("/", aboutCtrl.getAbout);

module.exports = aboutRouter;
