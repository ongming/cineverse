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

const registerUser = async ({ email, password }) => {
  const existingUser = await userModel.findUserByEmail(email);
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  if (existingUser) {
    throw new ConflictError("Email already exists");
  }
  const newUser = await userModel.createUser({
    username: username || email.split("@")[0],
    email,
    passwordHash,
  });
  return generateToken(newUser);
};
