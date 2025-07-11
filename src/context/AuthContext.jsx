import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/auth/check");
      setUser(response.data);
      setIsAuthenticated(true);
      console.log("Auth check successful:", response.data);
    } catch (error) {
      console.error("Auth check failed:", error.response?.data || error.message);
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear any stale tokens on 401
      if (error.response?.status === 401) {
        try {
          await axiosInstance.post("/auth/logout");
        } catch (logoutError) {
          console.error("Logout error:", logoutError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      setUser(response.data);
      setIsAuthenticated(true);
      console.log("Login successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      setUser(response.data);
      setIsAuthenticated(true);
      console.log("Signup successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      throw error;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      checkAuth, 
      login, 
      logout, 
      signup,
      isAuthenticated, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}