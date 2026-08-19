const authService = require("./auth.service");

const register = async (req, res, next) => {
    try{
      const { username, email, password } = req.body;
      const { user, token } = await authService.registerUser({ username, email, password });
      res.status(201).json({
        success: true,
        data: { user, token },
      });
    } catch (error) {
      next(error);
    }
}

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.LoginUser({ email, password });
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

module.exports = {
    register,
    login,
    getCurrentUser,
};