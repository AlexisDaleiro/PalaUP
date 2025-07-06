import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCompany, setIsCompany] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (token) {
          const userData = await authService.getCurrentUser(token);
          setUser(userData.user);
          setIsCompany(userData.isCompany);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { user, token, isCompany } = response.data;

      setUser(user);
      setIsCompany(isCompany);
      setToken(token);
      localStorage.setItem("token", token);

      return { success: true, user, isCompany };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Error al iniciar sesión",
      };
    }
  };

  const registerEmployee = async (userData) => {
    try {
      const response = await authService.registerEmployee(userData);
      const { user, token } = response.data;

      setUser(user);
      setIsCompany(false);
      setToken(token);
      localStorage.setItem("token", token);

      return { success: true, user };
    } catch (error) {
      console.error("Employee registration error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Error al registrar empleado",
      };
    }
  };

  const registerCompany = async (companyData) => {
    try {
      const response = await authService.registerCompany(companyData);
      const { company, token } = response.data;

      setUser(company);
      setIsCompany(true);
      setToken(token);
      localStorage.setItem("token", token);

      return { success: true, company };
    } catch (error) {
      console.error("Company registration error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Error al registrar empresa",
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await authService.logout(token);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsCompany(false);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(token, profileData);
      setUser(response.data);
      return { success: true, user: response.data };
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Error al actualizar perfil",
      };
    }
  };

  const value = {
    user,
    isCompany,
    loading,
    token,
    login,
    registerEmployee,
    registerCompany,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
