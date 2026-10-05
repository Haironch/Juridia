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

    // onAuthStateChange se dispara DESPUÉS de que Supabase intercambia el código PKCE
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          try {
            const perfil = await syncPerfil(session.access_token);
            login(perfil, session.access_token);
            navigate('/inicio', { replace: true });
          } catch {
            navigate('/login', { replace: true });
          }
        } else if (event === 'SIGNED_OUT' || event === 'INITIAL_SESSION') {
          navigate('/login', { replace: true });
        }
        subscription.unsubscribe();
      }
    );

    return () => subscription.unsubscribe();
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
