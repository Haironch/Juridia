import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Scale, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function OlvidePassword() {
  const { recuperarPassword, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await recuperarPassword(email);
      setEnviado(true);
    } catch (err: any) {
      setError(err.message || 'Error al enviar el correo.');
    }
  };

  return (
    <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg border border-[#9ac1e2] p-8">

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-[#2a628f] p-3 rounded-full">
                <Scale className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#13293d]">Recuperar contraseña</h2>
            <p className="mt-2 text-sm text-[#16324f]">
              Te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          {enviado ? (
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
              <p className="text-[#13293d] font-medium">¡Correo enviado!</p>
              <p className="text-sm text-[#16324f]">
                Revisa tu bandeja de entrada en <strong>{email}</strong> y sigue el enlace para crear tu nueva contraseña.
              </p>
              <Link to="/login" className="inline-flex items-center gap-2 text-[#2a628f] hover:text-[#18435a] text-sm font-medium">
                <ArrowLeft className="h-4 w-4" /> Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#13293d] mb-1">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#16324f]" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-[#9ac1e2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-[#13293d]"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#2a628f] text-white rounded-md hover:bg-[#18435a] transition-colors font-medium text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Enviando…' : 'Enviar enlace de recuperación'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login" className="inline-flex items-center gap-1 text-sm text-[#2a628f] hover:text-[#18435a]">
                  <ArrowLeft className="h-4 w-4" /> Volver al inicio de sesión
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
