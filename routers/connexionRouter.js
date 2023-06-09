const express = require("express");
const router = express.Router();
const connexionCtrl = require("../controllers/connexionCtrl");
const verifyToken = require("../middlewares/verifyToken");

router.post("/login", connexionCtrl.login);
router.post("/check-token", verifyToken, connexionCtrl.confirmToken);

module.exports = router;
