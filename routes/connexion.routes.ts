import express from "express";
const connexionRouter = express.Router();
const connexionCtrl = require("../controllers/connexion.ctrl");

connexionRouter.post("/", connexionCtrl.login);

module.exports = connexionRouter;
