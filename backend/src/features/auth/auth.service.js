const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./auth.model");
const ConflictError = require("../../errors/ConflictError");
const UnauthorizedError = require("../../errors/UnauthorizedError");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d"; // Token expiration time (7 days)
const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const registerUser = async ({ username, email, password }) => {
  const existingUser = await userModel.findUserByEmail(
    email.trim().toLowerCase(),
  );
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  if (existingUser) {
    throw new ConflictError("Email đã tồn tại");
  }
  const newUser = await userModel.createUser({
    username: username || email.split("@")[0],
    email,
    passwordHash,
  });
  const token = generateToken(newUser);
  return { user: newUser, token };
};

const LoginUser = async ({ email, password }) => {
  const user = await userModel.findUserByEmail(email.trim().toLowerCase());
  if (!user) {
    throw new UnauthorizedError("Email hoặc mật khẩu không đúng");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Email hoặc mật khẩu không đúng");
  }
  const { password_hash, ...safeUser } = user; // Exclude password_hash from the returned user object
  return { user: safeUser, token: generateToken(user) };
};

const getCurrentUser = async (userId) => {
  const user = await userModel.findUserById(userId);
  if (!user) {
    throw new UnauthorizedError("Người dùng không tồn tại");
  }
  const { password_hash, ...safeUser } = user; // Exclude password_hash from the returned user object
  return safeUser;
};

module.exports = {
  registerUser,
  LoginUser,
  getCurrentUser,
};