// movie.routes.js - Khai báo Router cho Movies Feature
const express = require("express");
const router = express.Router();
const movieController = require("./movie.controller");

router.get("/", movieController.getMovies);
router.put("/:id", movieController.updateMovie);

module.exports = router;
