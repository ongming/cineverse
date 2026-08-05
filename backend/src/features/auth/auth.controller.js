// auth.controller.js - Xử lý Request & Response cho Auth
const authService = require("./auth.service");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await authService.loginUser(username, password);

    if (user) {
      return successResponse(res, "Login successful", user);
    } else {
      return errorResponse(res, "Invalid credentials", 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
