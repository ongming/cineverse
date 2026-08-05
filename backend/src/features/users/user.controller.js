// user.controller.js - Xử lý Controller cho Users Feature
const userService = require("./user.service");
const { successResponse } = require("../../utils/apiResponse");

const getProfile = async (req, res, next) => {
  try {
    const profile = await userService.getUserProfile();
    return successResponse(res, "Fetched user profile successfully", profile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
};
