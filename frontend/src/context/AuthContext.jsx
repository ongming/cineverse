import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  refreshTokenService,
  logoutUserService,
} from "../service/authService.js";
import { setUpdateAccessTokenHandler } from "../api/axiosClient.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateAccessToken = (newToken) => {
    setToken(newToken);
  };

  // 1. Connect updateAccessToken to axiosClient when mounted
  useEffect(() => {
    setUpdateAccessTokenHandler(updateAccessToken);
  }, []);

  // 2. Initial Auth Load & Silent Refresh on startup (handles F5 reload)
  useEffect(() => {
    async function loadUser() {
      try {
        // Retrieve fresh Access Token using httpOnly cookie
        const res = await refreshTokenService();
        const refreshedToken = res?.data?.token || res?.token;

        if (refreshedToken) {
          updateAccessToken(refreshedToken);
          const resUser = await getCurrentUser();
          setUser(resUser?.user || resUser);
        }
      } catch (error) {
        updateAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (email, password) => {
    const { user, token } = await loginUser({ email, password });
    setUser(user);
    updateAccessToken(token);
    return { user, token };
  };

  const register = async (username, email, password) => {
    const { user, token } = await registerUser({ username, email, password });
    setUser(user);
    updateAccessToken(token);
    return { user, token };
  };

  const logout = async () => {
    try {
      await logoutUserService();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      updateAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        login,
        register,
        logout,
        updateAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
