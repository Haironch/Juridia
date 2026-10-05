import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, Scale, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const { iniciarSesion, loginConGoogle, isLoading, error, clearError } = useAuthStore();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await iniciarSesion(formData);
      navigate('/inicio');
    } catch {
      // El error ya queda en el store
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await loginConGoogle();
      // Supabase redirige al navegador; la página no continúa aquí
    } catch (err: any) {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg border border-[#9ac1e2] p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-[#2a628f] p-3 rounded-full">
                <Scale className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#13293d]">Iniciar sesión</h2>
            <p className="mt-2 text-sm text-[#16324f]">
              Bienvenido de nuevo a Derecho GT
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#13293d] mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#16324f]" />
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-[#9ac1e2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-[#13293d]"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#13293d] mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#16324f]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 w-full px-4 py-2 border border-[#9ac1e2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-[#13293d]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#16324f] hover:text-[#13293d]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#2a628f] text-white rounded-md hover:bg-[#18435a] transition-colors font-medium text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <LogIn className="h-5 w-5" />
              {isLoading ? 'Ingresando…' : 'Iniciar sesión'}
            </button>
          </form>

          {/* Separador */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 border-t border-[#9ac1e2]" />
            <span className="text-xs text-[#16324f]">o continúa con</span>
            <div className="flex-1 border-t border-[#9ac1e2]" />
          </div>

          {/* Botón Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || isLoading}
            className="mt-4 w-full py-3 border border-[#9ac1e2] rounded-md hover:bg-[#d8e9f5] transition-colors font-medium text-[#13293d] flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {googleLoading ? 'Redirigiendo…' : 'Iniciar sesión con Google'}
          </button>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-[#16324f]">
              <Link to="/olvide-password" className="text-[#2a628f] hover:text-[#18435a] font-medium">
                ¿Olvidaste tu contraseña?
              </Link>
            </p>
            <p className="text-sm text-[#16324f]">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="text-[#2a628f] hover:text-[#18435a] font-medium">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
