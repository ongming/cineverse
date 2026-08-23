const express = require("express");
const router = express.Router();
const userController = require("./user.controller.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const upload = require("../../middlewares/uploadMiddleware.js");

// Require Auth on all user routes
router.use(authMiddleware);

// 🟢 Route 1: POST /api/users/avatar
router.post(
  "/avatar",
  upload.single("avatar"),
  userController.uploadAvatar
);

// 🟢 Route 2: PUT /api/users/username
router.put("/username", userController.updateUsername);

// 🟢 Route 3: PUT /api/users/password
router.put("/password", userController.updatePassword);

module.exports = router;