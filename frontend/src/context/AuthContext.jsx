import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../service/authService.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { user } = await getCurrentUser();
        setUser(user);
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const { user, token } = await loginUser({ email, password });
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
    return { user, token };
  };

  const register = async (username, email, password) => {
    const { user, token } = await registerUser({ username, email, password });
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
    return { user, token };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
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
