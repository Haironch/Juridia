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

    const handle = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        navigate('/login');
        return;
      }

      try {
        const token = data.session.access_token;
        const perfil = await syncPerfil(token);
        login(perfil, token);
        navigate('/inicio');
      } catch {
        navigate('/login');
      }
    };

    handle();
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
