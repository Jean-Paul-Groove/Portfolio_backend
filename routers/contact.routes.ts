import express from "express";
const contactRouter = express.Router();
const contactCtrl = require("../controllers/contact.ctrl.ts");

contactRouter.post("/", contactCtrl.sendMessage);

module.exports = contactRouter;
