// appError.js - Custom Error Class do lập trình viên định nghĩa
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // Phân biệt lỗi do nghiệp vụ với lỗi crash hệ thống ngầm

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
