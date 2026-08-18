// movie.routes.js - Khai báo Router cho Movies Feature
const express = require("express");
const router = express.Router();
const movieController = require("./movie.controller");

router.get("/overview-stats", movieController.getMovieOverviewStats);
router.get("/search", movieController.searchMovies);
router.get("/popular", movieController.getPopularMovies);
router.get("/now-playing", movieController.getNowPlayingMovies);
router.get("/upcoming", movieController.getUpcomingMovies);
router.get("/top-rated", movieController.getTopRatedMovies);
router.get("/details/:id", movieController.getMovieDetailsById);
router.get("/similar/:id", movieController.getSimilarMovies);

module.exports = router;
