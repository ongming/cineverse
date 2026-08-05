// user.routes.js - Khai báo Router cho Users Feature
const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.get("/profile", userController.getProfile);

module.exports = router;
