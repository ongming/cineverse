const { errorResponse } = require("../utils/apiResponse");

// Middleware xử lý lỗi toàn cục cho Express
const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error Logged:", err.stack || err.message);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return errorResponse(res, message, statusCode);
};

// Middleware xử lý 404 Not Found
const notFoundHandler = (req, res, next) => {
  return errorResponse(res, `Route ${req.originalUrl} not found!`, 404);
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
  