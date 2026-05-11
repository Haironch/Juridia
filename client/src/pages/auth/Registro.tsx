import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function Registro() {
  const navigate = useNavigate();
  const { registrar, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (localError) setLocalError('');
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Las contraseñas no coinciden.');
      return;
    }
    if (formData.password.length < 8) {
      setLocalError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    try {
      await registrar({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        password: formData.password,
      });
      navigate('/inicio');
    } catch {
      // El error ya queda en el store, no hace falta hacer nada más
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg border border-[#9ac1e2] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-[#2a628f] p-3 rounded-full">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#13293d]">
              Crear cuenta
            </h2>
            <p className="mt-2 text-sm text-[#16324f]">
              Comienza tu aprendizaje en derecho guatemalteco
            </p>
          </div>

          {/* Error global */}
          {displayError && (
            <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{displayError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-[#13293d] mb-1">
                  Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#16324f]" />
                  <input
                    id="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-2 border border-[#9ac1e2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-[#13293d]"
                    placeholder="Juan"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-[#13293d] mb-1">
                  Apellido
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#16324f]" />
                  <input
                    id="apellido"
                    type="text"
                    required
                    value={formData.apellido}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-2 border border-[#9ac1e2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-[#13293d]"
                    placeholder="Pérez"
                  />
                </div>
              </div>
            </div>

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
                  placeholder="Mínimo 8 caracteres"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#13293d] mb-1">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#16324f]" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-[#9ac1e2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-[#13293d]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#2a628f] text-white rounded-md hover:bg-[#18435a] transition-colors font-medium text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creando cuenta…' : 'Crear cuenta gratuita'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#16324f]">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-[#2a628f] hover:text-[#18435a] font-medium">
                Iniciar sesión
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-[#9ac1e2]">
            <p className="text-xs text-center text-[#16324f]">
              Al registrarte, aceptas nuestros{' '}
              <a href="/terminos" className="text-[#2a628f] hover:underline">
                Términos de Uso
              </a>{' '}
              y{' '}
              <a href="/privacidad" className="text-[#2a628f] hover:underline">
                Política de Privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
