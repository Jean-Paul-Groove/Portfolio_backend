const express = require("express");
const router = express.Router();
const projectsCtrl = require("../controllers/projet.ctrl.ts");

router.get("/", projectsCtrl.getProjects);

module.exports = router;
