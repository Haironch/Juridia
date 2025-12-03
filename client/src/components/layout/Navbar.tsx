import { Link } from "react-router-dom";
import { Scale, BookOpen, LogIn, UserPlus } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="bg-[#89c2d9] border-b border-[#67a2d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-[#13293d]" />
              <span className="text-xl font-semibold text-[#13293d]">
                Derecho GT
              </span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                to="/cursos"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Cursos
              </Link>
              <Link
                to="/foros"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
              >
                Foros
              </Link>
              <Link
                to="/material"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
              >
                Material de Estudio
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2a628f] hover:bg-[#18435a] transition-colors"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm text-[#16324f]">
                  {user?.nombre || user?.email}
                </span>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
                >
                  Mi Panel
                </Link>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#16324f] hover:text-red-600 transition-colors"
                >
                  Salir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
