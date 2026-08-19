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
    SELECT id, username, email, avartar_url, created_at, updated_at
    FROM users
    WHERE id = $1;
    `,
    [id],
  );
  return result.rows[0];
};

const createUser = async ({ username, email, passwordHash }) => {
  const result = await pool.query(
    `
    INSERT INTO users (username, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, avatar_url, created_at, updated_at;
    `,
    [username, email, passwordHash],
  );
  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};