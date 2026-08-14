const pool = require("../../config/database.js");

const findAllGenres = async () => {
  const result = await pool.query("SELECT * FROM genres");
  return result.rows;
};

module.exports = {
  findAllGenres,
};