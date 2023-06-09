const express = require("express");
const router = express.Router();
const projectsCtrl = require("../controllers/projectsCtrl");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", projectsCtrl.getProjects);
router.get("/:id", verifyToken, projectsCtrl.getOneProject);
router.post("/", verifyToken, projectsCtrl.createProject);
router.put("/:id", verifyToken, projectsCtrl.updateProject);
router.delete("/:id", verifyToken, projectsCtrl.deleteProject);
module.exports = router;
