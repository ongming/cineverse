const authService = require("./auth.service");

const setRefreshTokenCookie = (res, refreshToken) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin đăng ký",
      });
    }
    const { user, token } = await authService.registerUser({
      username,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Không có mật khẩu hoặc email",
      });
    }
    const { user, token, refreshToken } = await authService.LoginUser({
      email,
      password,
    });
    setRefreshTokenCookie(res, refreshToken);
    res.status(200).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.sendOTP(email);
    res.status(200).json({
      success: true,
      message: result.message,
      expiresAt: result.expiresAt,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const result = await authService.resetPassword(email, otp, newPassword);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const loginWithGoogle = async (req, res, next) => {
  try {
    const { credential } = req.body;
    const { user, token, refreshToken } = await authService.loginWithGoogle(credential);

    setRefreshTokenCookie(res, refreshToken);
    res.status(200).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    console.error("Lỗi Google Auth Backend:", error.response?.data || error.message || error);
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Không có refresh token",
      }); 
    }   
    const {token } = await authService.refreshAccessToken(refreshToken);
    res.status(200).json({
      success: true,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    
    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    res.status(200).json({
      success: true,
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  sendOTP,
  resetPassword,
  loginWithGoogle,
  refreshToken,
  logout
};
