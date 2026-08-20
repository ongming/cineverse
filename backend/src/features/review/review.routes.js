const express = require("express");
const router = express.Router();
const reviewController = require("./review.controller.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");

router.get("/movie/:movieId", reviewController.getMovieReviews);

router.post("/", authMiddleware, reviewController.createReview);

module.exports = router;
