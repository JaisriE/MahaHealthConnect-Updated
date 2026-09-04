import React, { createContext, useContext, useState } from 'react';
import { MOCK_USERS } from '../mockData';
import { api } from '../services/api';

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

  const loginAsUser = async (username, password, selectedRole) => {
    try {
      const result = await api.login({ username, password, role: selectedRole || 'patient' });
      localStorage.setItem('mhc_access_token', result.token);
      setCurrentRole(result.user.role);
      setCurrentUser(result.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      if (localStorage.getItem('mhc_access_token')) await api.logout();
    } catch {
      // Clear the local session even when the network is unavailable.
    }
    localStorage.removeItem('mhc_access_token');
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
