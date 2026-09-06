const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",                         // Local React Dev Server
  "https://cineverse-frontend-seven.vercel.app",   // Live Vercel Website
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

module.exports = cors(corsOptions);