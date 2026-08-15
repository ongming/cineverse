const express = require("express");
const router = express.Router();
const revenueController = require("./revenue.controller");

router.get("/stats", revenueController.getRevenueStats);
router.get("/", revenueController.getTopRevenueMovies);

module.exports = router;
