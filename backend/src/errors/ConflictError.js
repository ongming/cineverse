class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "Lỗi xung đột";
    this.statusCode = 409;
  }
}

module.exports = ConflictError;