const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const aboutCtrl = require("../controllers/aboutCtrl");

router.get("/", aboutCtrl.getAbout);
router.put("/", verifyToken, aboutCtrl.updateAbout);

module.exports = router;
