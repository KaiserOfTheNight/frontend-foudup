// src/context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/auth/check", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      setUser(null);
      console.error("Auth check error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, setUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}