const pool = require("../../config/database.js");

const findUserByEmail = async (email) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email = $1;
    `,
    [email],
  );
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(
    `
    SELECT id, username, email, avatar_url, created_at, updated_at
    FROM users
    WHERE id = $1;
    `,
    [id],
  );
  return result.rows[0];
};

const createUser = async ({ username, email, passwordHash, avatarUrl }) => {
  const result = await pool.query(
    `
    INSERT INTO users (username, email, password_hash, avatar_url)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username, email, avatar_url, created_at, updated_at;
    `,
    [username, email, passwordHash, avatarUrl || null],
  );
  return result.rows[0];
};

const saveOTP = async (email, otp, expiresAt) => {
  await pool.query(`DELETE FROM otp_verifications WHERE email = $1;`, [email]);
  const result = await pool.query(
    `
    INSERT INTO otp_verifications (email, otp_code, expires_at)
    VALUES ($1, $2, $3)
    RETURNING id, email, otp_code, expires_at, created_at;
    `,
    [email, otp, expiresAt || new Date(Date.now() + 5 * 60 * 1000)],
  );
  return result.rows[0];
};

const findValidOTP = async (email, otp) => {
  const result = await pool.query(
    `
    SELECT * FROM otp_verifications
    WHERE email = $1 AND otp_code = $2 AND expires_at > NOW();
    `,
    [email, otp],
  );
  return result.rows[0];
};

const deleteOTP = async (email) => {
  await pool.query(`DELETE FROM otp_verifications WHERE email = $1;`, [email]);
};

const updatePassword = async (email, passwordHash) => {
  const result = await pool.query(
    `UPDATE users SET password_hash = $1, updated_at = NOW() WHERE email = $2 RETURNING id;`,
    [passwordHash, email],
  );
  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  saveOTP,
  findValidOTP,
  deleteOTP,
  updatePassword,
};
