import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../lib/api";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AdminAuthState = {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
};

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post("/api/auth/login", { email, password });
          if (data.user.role !== "admin") {
            set({ isLoading: false, error: "Access denied. Admin privileges required." });
            return false;
          }
          localStorage.setItem("token", data.token);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return true;
        } catch (err: any) {
          const message = err.response?.data?.error || "Login failed. Please try again.";
          set({ isLoading: false, error: message });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    { name: "sd-admin-auth" }
  )
);
