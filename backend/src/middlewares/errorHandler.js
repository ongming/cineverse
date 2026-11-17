const errorHandler = (err, req, res, next) => {
  console.error("🔥 [Server Error]:", err);
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  const isProduction = process.env.NODE_ENV === "production";
  return res.status(500).json({
    success: false,
    message: isProduction ? "Đã xảy ra lỗi hệ thống, vui lòng thử lại sau" : (err.message || "Internal Server Error"),
  }); 
};

module.exports = {
  errorHandler,
};
