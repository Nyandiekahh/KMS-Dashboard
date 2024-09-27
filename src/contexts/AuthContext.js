import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    // Implement login logic here
    setCurrentUser({ email });
  };

  const logout = () => {
    // Implement logout logic here
    setCurrentUser(null);
  };

  const register = (email, password) => {
    // Implement registration logic here
    setCurrentUser({ email });
  };

  const value = {
    currentUser,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};