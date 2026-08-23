const pool = require("../../config/database.js");

// 1. Update User Avatar URL
const updateUserAvatar = async (userId, avatarUrl) => {
  const result = await pool.query(
    "UPDATE users SET avatar_url = $1 WHERE id = $2 RETURNING id, username, email, avatar_url",
    [avatarUrl, userId]
  );
  return result.rows[0];
};

// 2. Update Username
const updateUsername = async (userId, newUsername) => {
  const result = await pool.query(
    "UPDATE users SET username = $1 WHERE id = $2 RETURNING id, username, email, avatar_url",
    [newUsername, userId]
  );
  return result.rows[0];
};

// 3. Update Password Hash
const updatePassword = async (userId, passwordHash) => {
  const result = await pool.query(
    "UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING id, username, email, avatar_url",
    [passwordHash, userId]
  );
  return result.rows[0];
};

module.exports = {
  updateUserAvatar,
  updateUsername,
  updatePassword,
};