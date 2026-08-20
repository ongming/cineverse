// auth.routes.js - Khai báo các đường dẫn API của Auth Feature
const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const authMiddleware = require("../../middlewares/authMiddleware.js");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/me", authMiddleware, authController.getCurrentUser);
router.post("/send-otp", authController.sendOTP);
router.post("/reset-password", authController.resetPassword);
router.post("/google", authController.loginWithGoogle);

module.exports = router;
