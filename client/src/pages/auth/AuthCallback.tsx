import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { syncPerfil, login } = useAuthStore();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Si hay sesión (ya sea nueva o existente), sincronizar y entrar
        if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED')) {
          subscription.unsubscribe();
          try {
            const perfil = await syncPerfil(session.access_token);
            login(perfil, session.access_token);
            navigate('/inicio', { replace: true });
          } catch {
            navigate('/login', { replace: true });
          }
          return;
        }

        // Solo redirigir a login si explícitamente se cerró sesión
        if (event === 'SIGNED_OUT') {
          subscription.unsubscribe();
          navigate('/login', { replace: true });
        }

        // INITIAL_SESSION sin sesión: esperar SIGNED_IN (no hacer nada)
      }
    );

    // Fallback: si en 10s no llega ningún evento con sesión, ir a login
    const timeout = setTimeout(() => {
      subscription.unsubscribe();
      navigate('/login', { replace: true });
    }, 10_000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate, syncPerfil, login]);

  return (
    <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-[#2a628f] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-[#13293d] font-medium">Iniciando sesión…</p>
      </div>
    </div>
  );
}
