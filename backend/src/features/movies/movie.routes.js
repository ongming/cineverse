// movie.routes.js - Khai báo Router cho Movies Feature
const express = require("express");
const router = express.Router();
const movieController = require("./movie.controller");

router.get("/popular", movieController.getPopularMovies);
router.get("/now-playing", movieController.getNowPlayingMovies);
router.get("/upcoming", movieController.getUpcomingMovies);
router.get("/top-rated", movieController.getTopRatedMovies);

module.exports = router;
