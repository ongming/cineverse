// routes/index.js - Quản lý tổng hợp Router của toàn bộ ứng dụng
const express = require("express");
const router = express.Router();

const authRoutes = require("../features/auth/auth.routes");
const movieRoutes = require("../features/movies/movie.routes");
const userRoutes = require("../features/users/user.routes");
const genreRoutes = require("../features/Genres/genre.routes"); // Import route cho Genres
// Khai báo các endpoint theo từng Feature
router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);
router.use("/users", userRoutes);
router.use("/genres", genreRoutes); // Thêm route cho Genres

module.exports = router;
