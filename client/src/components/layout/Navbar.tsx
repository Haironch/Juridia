import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  BookOpen,
  LogIn,
  UserPlus,
  Menu,
  X,
  MessageSquare,
  FileText,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

            {/* Desktop Menu */}
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
                <MessageSquare className="h-4 w-4 mr-1" />
                Foros
              </Link>
              <Link
                to="/material"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
              >
                <FileText className="h-4 w-4 mr-1" />
                Material de Estudio
              </Link>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/registro"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2a628f] hover:bg-[#18435a] transition-colors"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Iniciar Sesión
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

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#67a2d3]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/cursos"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Cursos
            </Link>
            <Link
              to="/foros"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Foros
            </Link>
            <Link
              to="/material"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText className="h-5 w-5 mr-2" />
              Material de Estudio
            </Link>
          </div>

          {/* Mobile Auth Section */}
          <div className="pt-4 pb-3 border-t border-[#67a2d3]">
            {!isAuthenticated ? (
              <div className="px-2 space-y-2">
                <Link
                  to="/registro"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-[#2a628f] hover:bg-[#18435a] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Iniciar Sesión
                </Link>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <div className="px-3 py-2 text-base font-medium text-[#13293d]">
                  {user?.nombre || user?.email}
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mi Panel
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-[#67a2d3] transition-colors"
                >
                  Salir
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
