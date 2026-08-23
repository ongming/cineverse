const userService = require("./user.service.js");

// 1. Upload Avatar Controller
const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn 1 file hình ảnh!" });
    }

    const updatedUser = await userService.updateUserAvatar(
      req.user.id,
      req.file.buffer
    );

    return res.status(200).json({
      success: true,
      message: "Cập nhật ảnh đại diện thành công!",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Update Username Controller
const updateUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const updatedUser = await userService.updateUsernameService(
      req.user.id,
      username
    );

    return res.status(200).json({
      success: true,
      message: "Cập nhật tên người dùng thành công!",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// 3. Update Password Controller
const updatePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const updatedUser = await userService.updatePasswordService(
      req.user.id,
      newPassword
    );

    return res.status(200).json({
      success: true,
      message: "Cập nhật mật khẩu thành công!",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadAvatar,
  updateUsername,
  updatePassword,
};
