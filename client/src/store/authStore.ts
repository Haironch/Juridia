import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

interface Usuario {
  id: string;
  email: string;
  nombre?: string;
  apellido?: string;
  rol: string;
  rachaActual?: number;
  rachaMaxima?: number;
}

interface AuthState {
  user: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // Acciones base
  login: (user: Usuario, token: string) => void;
  logout: () => void;
  setUser: (user: Usuario) => void;
  clearError: () => void;
  // Acciones con API
  registrar: (data: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
  }) => Promise<void>;
  iniciarSesion: (data: { email: string; password: string }) => Promise<void>;
}

// Restaurar sesión persistida
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("auth_user");

export const useAuthStore = create<AuthState>((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  isAuthenticated: !!storedToken,
  isLoading: false,
  error: null,

  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));
    set({ user, token, isAuthenticated: true, error: null });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_user");
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  setUser: (user) => {
    localStorage.setItem("auth_user", JSON.stringify(user));
    set({ user });
  },

  clearError: () => set({ error: null }),

  registrar: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/api/auth/registro`, data);
      const { token, user } = res.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      const message =
        err.response?.data?.error || "Error al crear la cuenta. Intenta de nuevo.";
      set({ isLoading: false, error: message });
      throw new Error(message);
    }
  },

  iniciarSesion: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, data);
      const { token, user } = res.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      const message =
        err.response?.data?.error || "Correo o contraseña incorrectos.";
      set({ isLoading: false, error: message });
      throw new Error(message);
    }
  },
}));
