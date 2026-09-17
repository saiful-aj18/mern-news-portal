
import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  initialized: false,

  register: async (userData) => {
    set({ loading: true });

    try {
      const response = await api.post("/auth/register", userData);

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      set({
        user,
        loading: false,
      });

      return {
        success: true,
        message: "Registration successful",
      };
    } catch (error) {
      set({ loading: false });

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed",
      };
    }
  },

  login: async (credentials) => {
    set({ loading: true });

    try {
      const response = await api.post(
        "/auth/login",
        credentials
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      set({
        user,
        loading: false,
      });

      return {
        success: true,
        message: "Login successful",
      };
    } catch (error) {
      set({ loading: false });

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed",
      };
    }
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({
        user: null,
        initialized: true,
      });

      return;
    }

    try {
      const response = await api.get("/auth/me");

      set({
        user: response.data.user,
        initialized: true,
      });
    } catch (error) {
      localStorage.removeItem("token");

      set({
        user: null,
        initialized: true,
      });
    }
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
    });
  },
}));

export default useAuthStore;
