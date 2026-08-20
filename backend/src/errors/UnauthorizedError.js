class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "Lỗi không được phép";
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;