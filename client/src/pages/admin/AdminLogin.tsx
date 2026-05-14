import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, LogIn, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN_CONTENIDO'];

export default function AdminLogin() {
  const navigate = useNavigate();
  const { iniciarSesion, isAuthenticated, user, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  // Si ya está autenticado como admin, redirigir
  useEffect(() => {
    if (isAuthenticated && user && ADMIN_ROLES.includes(user.rol)) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    try {
      await iniciarSesion({ email, password });
      // El useEffect se encarga de redirigir si el rol es admin
      // Aquí chequeamos si el usuario logueado NO es admin
      const stored = localStorage.getItem('auth_user');
      if (stored) {
        const u = JSON.parse(stored);
        if (!ADMIN_ROLES.includes(u.rol)) {
          // No es admin — desloguear y mostrar error
          useAuthStore.getState().logout();
          setLocalError('No tienes permisos de administrador para acceder a este panel.');
        }
      }
    } catch {
      // El error ya se maneja en el store
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#13293d] via-[#16324f] to-[#18435a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Derecho GT</h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <ShieldCheck className="h-4 w-4 text-[#9ac1e2]" />
            <p className="text-[#9ac1e2] text-sm font-medium">Panel de Administración</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-[#13293d] mb-1">Iniciar sesión</h2>
          <p className="text-sm text-[#16324f] mb-6">Acceso restringido a administradores</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#13293d] mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-[#9ac1e2] focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-sm text-[#13293d] placeholder-[#9ac1e2]"
                placeholder="admin@derechogt.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#13293d] mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#9ac1e2] focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-sm text-[#13293d]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ac1e2] hover:text-[#2a628f] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {displayError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {displayError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2a628f] hover:bg-[#18435a] text-white font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              {isLoading ? 'Verificando...' : 'Acceder al panel'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#9ac1e2] mt-6">
          Acceso restringido · Solo personal autorizado
        </p>
      </div>
    </div>
  );
}
