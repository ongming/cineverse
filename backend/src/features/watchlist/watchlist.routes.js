const express = require("express");
const router = express.Router();
const watchlistController = require("./watchlist.controller.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");

// All Watchlist endpoints require JWT Auth
router.use(authMiddleware);

router.get("/", watchlistController.getWatchlist);
router.get("/ids", watchlistController.getWatchlistIds); // ⚡ Fast unpaginated array of movie IDs
router.post("/", watchlistController.addToWatchlist);
router.delete("/:movieId", watchlistController.removeFromWatchlist);

module.exports = router;
