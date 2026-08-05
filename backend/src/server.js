// server.js - Điểm khởi chạy HTTP Server
const app = require("./app");
const { PORT, NODE_ENV } = require("./config/environment");

const server = app.listen(PORT, () => {
  console.log(`🚀 [Cineverse Backend] Server running in ${NODE_ENV} mode on http://localhost:${PORT}`);
  console.log(`📡 Base API endpoint: http://localhost:${PORT}/api`);
});

// Handling Graceful Shutdown
process.on("unhandledRejection", (err) => {
  console.error("🔥 Unhandled Rejection Error:", err);
  server.close(() => process.exit(1));
});

module.exports = server;
