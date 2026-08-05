// app.js - Cấu hình Express Application (Middlewares, Router, Error Handlers)
const express = require("express");
const apiRoutes = require("./routes");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");

const app = express();

// Built-in Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Health-check Endpoint
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Welcome to Cineverse Backend API (Feature-based Architecture)",
  });
});

// Gắn toàn bộ API Routes vào prefix /api
app.use("/api", apiRoutes);

// Xử lý 404 Not Found & Error Handler
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
