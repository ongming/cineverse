const errorHandler = (err, req, res, next) => {
  console.error("🔥 [Server Error]:", err);
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  }); 
};

module.exports = {
  errorHandler,
};
