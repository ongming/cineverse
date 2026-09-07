const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const crypto = require("crypto");
const userModel = require("./auth.model");
const { OAuth2Client } = require("google-auth-library");
const ConflictError = require("../../errors/ConflictError");
const UnauthorizedError = require("../../errors/UnauthorizedError");
const { sendOTPEmail } = require("../../services/emailService.js");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "30s"; // Token expiration time (15 minutes)
const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

const generateAccessToken = (user) => {
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
    avatarUrl: null,
  });
  const token = generateAccessToken(newUser);
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
  const refreshToken = crypto.randomBytes(64).toString("hex");
  await userModel.session(
    user.id,
    refreshToken,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );
  await userModel.cleanupOldSessions(user.id, 5);
  return { user: safeUser, token: generateAccessToken(user), refreshToken };
};

const getCurrentUser = async (userId) => {
  const user = await userModel.findUserById(userId);
  if (!user) {
    throw new UnauthorizedError("Người dùng không tồn tại");
  }
  const { password_hash, ...safeUser } = user; // Exclude password_hash from the returned user object
  return safeUser;
};

const sendOTP = async (email) => {
  const cleanEmail = email.trim().toLowerCase();
  const user = await userModel.findUserByEmail(cleanEmail);

  if (!user) {
    throw new UnauthorizedError("Email không tồn tại");
  }
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await userModel.saveOTP(cleanEmail, otpCode, expiresAt);
  await sendOTPEmail(cleanEmail, otpCode);
  return { message: "Mã OTP đã được gửi đến email của bạn", expiresAt };
};

const resetPassword = async (email, otp, newPassword) => {
  const cleanEmail = email.trim().toLowerCase();
  const validOTP = await userModel.findValidOTP(cleanEmail, otp);
  if (!validOTP) {
    throw new UnauthorizedError("Mã OTP không hợp lệ hoặc đã hết hạn");
  }
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await userModel.updatePassword(cleanEmail, passwordHash);
  await userModel.deleteOTP(cleanEmail);
  return { message: "Mật khẩu đã được đặt lại thành công" };
};

const loginWithGoogle = async (credential) => {
  let email, name, picture;

  try {
    // 1. Direct ID Token verification (Google <GoogleLogin /> always sends "eyJ...")
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    email = payload.email;
    name = payload.name;
    picture = payload.picture;
  } catch (err) {
    console.error("Lỗi Google Auth Backend:", err.message);
    throw new UnauthorizedError("Lỗi Google: " + (err.message || err));
  }

  if (!email) {
    throw new UnauthorizedError("Không tìm thấy thông tin email từ Google");
  }

  const cleanEmail = email.trim().toLowerCase();

  // 2. Find or Create User in PostgreSQL
  let user = await userModel.findUserByEmail(cleanEmail);
  if (!user) {
    const randomPassword = await bcrypt.hash(Math.random().toString(36), 10);
    user = await userModel.createUser({
      username: name || cleanEmail.split("@")[0],
      email: cleanEmail,
      passwordHash: randomPassword,
      avatarUrl: picture,
    });
  }

  // 3. Return App JWT Token & User Profile
  const token = generateAccessToken(user);
  const { password_hash, ...safeUser } = user;

  return { user: safeUser, token };
};

const refreshAccessToken = async (refreshToken) => {
  const session = await userModel.findSession(refreshToken);
  if (!session) {
    throw new UnauthorizedError("Refresh token không hợp lệ hoặc đã hết hạn");
  }

  const user = await userModel.findUserById(session.user_id);
  if (!user) {
    throw new UnauthorizedError("Người dùng không tồn tại");
  }

  const newAccessToken = generateAccessToken(user);
  return { token: newAccessToken };
};

const logout = async (refreshToken) => {
  await userModel.deleteSession(refreshToken);
  return { message: "Đăng xuất thành công" };
}

const findSession = async (refreshToken) => {
  return await userModel.findSession(refreshToken);
};

module.exports = {
  registerUser,
  LoginUser,
  getCurrentUser,
  sendOTP,
  resetPassword,
  loginWithGoogle,
  refreshAccessToken,
  logout,
  findSession,
};
