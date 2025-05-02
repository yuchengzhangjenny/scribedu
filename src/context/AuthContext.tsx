/**
 * Authentication Context Module
 * 
 * This module provides authentication functionality throughout the application.
 * It manages user authentication state and provides methods for login, logout,
 * and password recovery.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User, UserCredentials } from '../types';
import { authService } from '../services/api';

/**
 * Interface defining the shape of the authentication context
 * @property {AuthState} authState - Current authentication state
 * @property {Function} login - Function to handle user login
 * @property {Function} logout - Function to handle user logout
 * @property {Function} forgotPassword - Function to handle password recovery
 */
interface AuthContextProps {
  authState: AuthState;
  login: (credentials: UserCredentials) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ message: string }>;
}

/**
 * Creates the authentication context with undefined default value
 * This context will be provided by AuthProvider
 */
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

/**
 * AuthProvider Component
 * 
 * Wraps the application to provide authentication functionality
 * to all child components.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that need access to auth context
 * @returns {JSX.Element} Provider component with authentication context
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  /**
   * State to manage authentication status
   * @type {[AuthState, Function]}
   */
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  /**
   * Effect to check authentication status on component mount
   * Checks for existing token in localStorage or sessionStorage
   */
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        if (!token) {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          return;
        }
        
        // In a real app, verify token with server here
        setAuthState({
          user: null,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Authentication failed',
        });
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * Handles user login
   * @param {UserCredentials} credentials - User login credentials
   * @throws {Error} If login fails
   */
  const login = async (credentials: UserCredentials) => {
    try {
      setAuthState({
        ...authState,
        isLoading: true,
        error: null,
      });

      const response = await authService.login(credentials);

      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      });
      throw error;
    }
  };

  /**
   * Handles user logout
   * Clears authentication state and removes tokens
   */
  const logout = () => {
    authService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  /**
   * Handles password recovery request
   * @param {string} email - User's email address
   * @returns {Promise<{message: string}>} Success message
   */
  const forgotPassword = async (email: string) => {
    return authService.forgotPassword(email);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication context
 * @returns {AuthContextProps} Authentication context value
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};