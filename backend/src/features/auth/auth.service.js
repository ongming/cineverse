// auth.service.js - Xử lý logic nghiệp vụ cho Auth
const loginUser = async (username, password) => {
  if (username === "Hao" && password === "123456") {
    return { id: 1, username: "Hao", role: "user" };
  }
  return null;
};

module.exports = {
  loginUser,
};
