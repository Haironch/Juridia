import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  BookOpen,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  MessageSquare,
  FileText,
  Brain,
  BarChart2,
  UserCircle,
  BookText,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const HINT_KEY = "navMenuHintSeen";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Attention dot: visible until user taps the button
  const [showDot, setShowDot] = useState(false);
  // Nudge animation: fires once after a short delay
  const [nudgeActive, setNudgeActive] = useState(false);

  useEffect(() => {
    // Only on mobile viewports and only once per session
    if (window.innerWidth >= 768) return;
    if (sessionStorage.getItem(HINT_KEY)) return;

    // Show dot immediately
    setShowDot(true);

    // Fire the nudge animation after 2 s — user has had time to orient
    const nudgeTimer = setTimeout(() => {
      setNudgeActive(true);
      // Remove class after animation finishes so it can't re-trigger
      setTimeout(() => setNudgeActive(false), 750);
    }, 2000);

    return () => clearTimeout(nudgeTimer);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
    // Dismiss hint permanently on first interaction
    if (showDot) {
      setShowDot(false);
      sessionStorage.setItem(HINT_KEY, "true");
    }
  };

  return (
    <nav className="bg-[#89c2d9] border-b border-[#67a2d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/inicio" className="flex items-center space-x-2">
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
              <Link
                to="/constituquiz"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
              >
                <Brain className="h-4 w-4 mr-1" />
                ConstituQuiz
              </Link>
              <Link
                to="/progreso"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
              >
                <BarChart2 className="h-4 w-4 mr-1" />
                Mi Progreso
              </Link>
              <Link
                to="/glosario"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
              >
                <BookText className="h-4 w-4 mr-1" />
                Glosario
              </Link>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
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
                <div className="flex items-center gap-2 text-sm text-[#16324f]">
                  <UserCircle className="h-5 w-5 text-[#2a628f]" />
                  <span className="font-medium text-[#13293d]">
                    {user?.nombre ? `${user.nombre} ${user.apellido ?? ''}`.trim() : user?.email}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#16324f] hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={handleMobileMenuToggle}
              className={`relative inline-flex items-center justify-center p-2 rounded-md text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors ${nudgeActive ? "animate-nav-nudge" : ""}`}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}

              {/* Attention dot — shown once per session until first tap */}
              {showDot && !mobileMenuOpen && (
                <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2a628f] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#18435a]" />
                </span>
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
            <Link
              to="/constituquiz"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Brain className="h-5 w-5 mr-2" />
              ConstituQuiz
            </Link>
            <Link
              to="/progreso"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              Mi Progreso
            </Link>
            <Link
              to="/glosario"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookText className="h-5 w-5 mr-2" />
              Glosario
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
                <div className="flex items-center gap-2 px-3 py-2 text-base font-medium text-[#13293d]">
                  <UserCircle className="h-5 w-5 text-[#2a628f]" />
                  {user?.nombre ? `${user.nombre} ${user.apellido ?? ''}`.trim() : user?.email}
                </div>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-[#67a2d3] transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
