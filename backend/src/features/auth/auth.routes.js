// auth.routes.js - Khai báo các đường dẫn API của Auth Feature
const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

router.post("/login", authController.login);

module.exports = router;
