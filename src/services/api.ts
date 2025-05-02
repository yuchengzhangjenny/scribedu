import axios from 'axios';
import { UserCredentials, LoginResponse } from '../types';

// This would point to your actual API endpoint in production
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: async (credentials: UserCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      
      if (credentials.rememberMe) {
        localStorage.setItem('token', response.data.token);
      } else {
        sessionStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Authentication failed');
      }
      throw new Error('Network error, please try again');
    }
  },
  
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Password reset request failed');
      }
      throw new Error('Network error, please try again');
    }
  },
  
  logout: (): void => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  },
};

export default api;