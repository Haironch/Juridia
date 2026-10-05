import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function NuevaPassword() {
  const navigate = useNavigate();
  const ran = useRef(false);

  const [listo, setListo] = useState(false);       // sesión de recuperación activa
  const [guardado, setGuardado] = useState(false); // contraseña cambiada con éxito
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    // Supabase dispara PASSWORD_RECOVERY después de intercambiar el código del email
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setListo(true);
        subscription.unsubscribe();
      }
    });

    const timeout = setTimeout(() => {
      subscription.unsubscribe();
      navigate('/olvide-password', { replace: true });
    }, 10_000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (err) {
      setError(err.message);
      return;
    }

    setGuardado(true);
    setTimeout(() => navigate('/login', { replace: true }), 3000);
  };

  return (
    <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg border border-[#9ac1e2] p-8">

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-[#2a628f] p-3 rounded-full">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#13293d]">Nueva contraseña</h2>
            <p className="mt-2 text-sm text-[#16324f]">Elige una contraseña segura para tu cuenta</p>
          </div>

          {/* Éxito */}
          {guardado && (
            <div className="text-center space-y-4 py-4">
              <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto" />
              <p className="text-[#13293d] font-semibold text-lg">¡Contraseña actualizada!</p>
              <p className="text-sm text-[#16324f]">Redirigiendo al inicio de sesión…</p>
            </div>
          )}

          {/* Spinner mientras llega el evento */}
          {!listo && !guardado && (
            <div className="flex flex-col items-center py-8 space-y-3">
              <div className="w-8 h-8 border-4 border-[#2a628f] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[#16324f]">Verificando enlace…</p>
            </div>
          )}

          {/* Formulario */}
          {listo && !guardado && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#13293d] mb-1">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#16324f]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 w-full px-4 py-2 border border-[#9ac1e2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-[#13293d]"
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#16324f] hover:text-[#13293d]"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#13293d] mb-1">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#16324f]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-[#9ac1e2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-[#13293d]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#2a628f] text-white rounded-md hover:bg-[#18435a] transition-colors font-medium text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Guardando…' : 'Guardar nueva contraseña'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
