import React, { createContext, useEffect, useState } from "react";
import auth from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    login: auth.login,
    logout: auth.logout,
    signup: auth.signup,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};