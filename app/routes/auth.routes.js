const express = require("express");
const authController = require("../controller/auth.controller");
const AuthCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify", authController.verify);
router.get(
  "/dashboard",
  AuthCheck,
  allowRoles("admin"),
  authController.dashboard,
);
router.get("/profile", AuthCheck, authController.profile);

module.exports = router;
