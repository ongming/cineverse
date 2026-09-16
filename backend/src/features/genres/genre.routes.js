const express = require("express")
const router = express.Router();
const genreController = require("./genre.controller");

router.get("/", genreController.getAllGenres);

module.exports = router;