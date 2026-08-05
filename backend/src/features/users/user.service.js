// user.service.js - Xử lý nghiệp vụ cho Users Feature
const getUserProfile = async () => {
  return { id: 1, name: "Hao", role: "user", email: "user@cineverse.com" };
};

module.exports = {
  getUserProfile,
};
