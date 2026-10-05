import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

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
  login: (user: Usuario, token: string) => void;
  logout: () => Promise<void>;
  setUser: (user: Usuario) => void;
  clearError: () => void;
  registrar: (data: { nombre: string; apellido: string; email: string; password: string }) => Promise<void>;
  iniciarSesion: (data: { email: string; password: string }) => Promise<void>;
  recuperarPassword: (email: string) => Promise<void>;
  syncPerfil: (token: string) => Promise<Usuario>;
}

// Restaurar sesión desde localStorage
const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('auth_user');

export const useAuthStore = create<AuthState>((set, get) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  isAuthenticated: !!storedToken,
  isLoading: false,
  error: null,

  login: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true, error: null });
  },

  logout: async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('auth_user');
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  setUser: (user) => {
    localStorage.setItem('auth_user', JSON.stringify(user));
    set({ user });
  },

  clearError: () => set({ error: null }),

  // Llama a nuestro backend para crear/obtener el perfil en Turso
  syncPerfil: async (token: string): Promise<Usuario> => {
    const res = await fetch(`${API_URL}/api/auth/sync`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Error al sincronizar perfil');
    return json.data.user as Usuario;
  },

  registrar: async ({ nombre, apellido, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nombre, apellido } },
      });

      if (error) throw new Error(error.message);
      if (!data.session) {
        // Supabase envió email de verificación
        set({ isLoading: false });
        throw new Error('VERIFY_EMAIL');
      }

      const token = data.session.access_token;
      const perfil = await get().syncPerfil(token);

      localStorage.setItem('token', token);
      localStorage.setItem('auth_user', JSON.stringify(perfil));
      set({ user: perfil, token, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      const msg = err.message === 'VERIFY_EMAIL'
        ? 'VERIFY_EMAIL'
        : err.message || 'Error al crear la cuenta.';
      set({ isLoading: false, error: msg === 'VERIFY_EMAIL' ? null : msg });
      throw new Error(msg);
    }
  },

  iniciarSesion: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        const msg = error.message.includes('Invalid login')
          ? 'Correo o contraseña incorrectos.'
          : error.message;
        throw new Error(msg);
      }

      const token = data.session.access_token;
      const perfil = await get().syncPerfil(token);

      localStorage.setItem('token', token);
      localStorage.setItem('auth_user', JSON.stringify(perfil));
      set({ user: perfil, token, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      const msg = err.message || 'Correo o contraseña incorrectos.';
      set({ isLoading: false, error: msg });
      throw new Error(msg);
    }
  },

  recuperarPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/nueva-password`,
      });
      if (error) throw new Error(error.message);
      set({ isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },
}));
