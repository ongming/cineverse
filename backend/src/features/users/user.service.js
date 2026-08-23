const bcrypt = require("bcrypt");
const cloudinary = require("../../config/cloudinary.js");
const userModel = require("./user.model.js");

const SALT_ROUNDS = 10;

// 1. Update User Avatar in Cloudinary & PostgreSQL
const updateUserAvatar = async (userId, fileBuffer) => {
  const cloudinaryResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "cineverse_avatars",
        public_id: `avatar_user_${userId}`,
        overwrite: true,
        invalidate: true,
      },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    uploadStream.end(fileBuffer);
  });

  const newAvatarUrl = cloudinaryResult.secure_url;
  return userModel.updateUserAvatar(userId, newAvatarUrl);
};

// 2. Update Username Service
const updateUsernameService = async (userId, newUsername) => {
  const cleanName = newUsername ? newUsername.trim() : "";
  if (!cleanName || cleanName.length < 3) {
    throw new Error("Tên người dùng phải có ít nhất 3 ký tự!");
  }
  return userModel.updateUsername(userId, cleanName);
};

// 3. Update Password Service
const updatePasswordService = async (userId, newPassword) => {
  if (!newPassword || newPassword.length < 6) {
    throw new Error("Mật khẩu mới phải có ít nhất 6 ký tự!");
  }
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  return userModel.updatePassword(userId, passwordHash);
};

module.exports = {
  updateUserAvatar,
  updateUsernameService,
  updatePasswordService,
};