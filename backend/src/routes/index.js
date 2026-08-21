// routes/index.js - Quản lý tổng hợp Router của toàn bộ ứng dụng
const express = require("express");
const router = express.Router();

const authRoutes = require("../features/auth/auth.routes");
const movieRoutes = require("../features/movies/movie.routes");
const userRoutes = require("../features/users/user.routes");
const genreRoutes = require("../features/genres/genre.routes"); // Import route cho Genres
const revenueRoutes = require("../features/revenue/revenue.routes");
const actorRoutes = require("../features/actors/actor.route");
const reviewRoutes = require("../features/review/review.routes.js"); // Import route cho Reviews
const watchlistRoutes = require("../features/watchlist/watchlist.routes.js"); // Import route cho Watchlist

// Khai báo các endpoint theo từng Feature
router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);
router.use("/users", userRoutes);
router.use("/genres", genreRoutes); // Thêm route cho Genres
router.use("/revenue", revenueRoutes); // Thêm route cho Revenue
router.use("/actors", actorRoutes); // Thêm route cho Actors
router.use("/reviews", reviewRoutes); // Thêm route cho Reviews
router.use("/watchlist", watchlistRoutes); // Thêm route cho Watchlist

module.exports = router;
