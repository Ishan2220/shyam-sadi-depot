import { create } from 'zustand';
import { api } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('customerUser') || 'null'),
  token: localStorage.getItem('customerToken'),
  isAuthenticated: !!localStorage.getItem('customerToken'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      
      // Store token
      localStorage.setItem('customerToken', data.token);
      localStorage.setItem('customerUser', JSON.stringify(data.user));
      
      // We don't set the default api token here because api.ts intercepts and gets token dynamically, 
      // but let's make sure it knows which one to use. Wait, api.ts uses localStorage.getItem('token').
      // Let's change api.ts later or just use 'customerToken' in api.ts? 
      // Actually, if customerToken is separate from Admin token, api.ts needs to check both.
      // We'll update api.ts later.

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to login',
        isLoading: false,
      });
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/api/auth/register', { name, email, password });
      
      localStorage.setItem('customerToken', data.token);
      localStorage.setItem('customerUser', JSON.stringify(data.user));

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to register account',
        isLoading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerUser');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
