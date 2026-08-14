const { Pool, types } = require("pg");

// Parse DATE columns (OID 1082) as raw 'YYYY-MM-DD' strings instead of JS Date ISO strings
types.setTypeParser(1082, (val) => val);

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

module.exports = pool;