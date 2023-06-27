import express from "express";
const contactRouter = express.Router();
const contactCtrl = require("../controllers/contact.ctrl");

contactRouter.post("/", contactCtrl.handleMessage);

module.exports = contactRouter;
