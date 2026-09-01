import React, { createContext, useContext, useState } from 'react';
import { MOCK_USERS } from '../mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Default demo role is health_worker for quick inspection, user can switch anytime
  const [currentRole, setCurrentRole] = useState('health_worker');
  const [currentUser, setCurrentUser] = useState(MOCK_USERS.health_worker);

  const switchRole = (roleKey) => {
    if (MOCK_USERS[roleKey]) {
      setCurrentRole(roleKey);
      setCurrentUser(MOCK_USERS[roleKey]);
    }
  };

  const loginAsUser = (username, password, selectedRole) => {
    switchRole(selectedRole || 'patient');
    return true;
  };

  const logout = () => {
    setCurrentRole(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        role: currentRole,
        user: currentUser,
        switchRole,
        loginAsUser,
        logout,
        isAuthenticated: !!currentRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
