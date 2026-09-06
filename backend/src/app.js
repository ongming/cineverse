// app.js - Cấu hình Express Application (Middlewares, Router, Error Handlers)
require("dotenv").config();
const express = require("express");
const corsMiddleware = require("./middlewares/corsMiddleware.js");
const apiRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();


// Built-in Middlewares

app.use(corsMiddleware);
app.use(cookieParser());
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
app.use(errorHandler);

module.exports = app;
