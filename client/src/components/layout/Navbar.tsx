import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
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
  ChevronDown,
  GraduationCap,
  Wrench,
  Gavel,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const HINT_KEY = "navMenuHintSeen";

interface DropdownItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface NavDropdownProps {
  label: string;
  icon: React.ReactNode;
  items: DropdownItem[];
}

function NavDropdown({ label, icon, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isActive = items.some((i) => location.pathname.startsWith(i.to));

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Cerrar al cambiar de ruta
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 px-1 pt-1 text-sm font-medium transition-colors ${
          isActive
            ? "text-[#13293d] border-b-2 border-[#13293d]"
            : "text-[#16324f] hover:text-[#13293d]"
        }`}
      >
        {icon}
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-lg border border-[#d8e9f5] py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-start gap-3 px-4 py-3 hover:bg-[#f0f7ff] transition-colors group"
            >
              <div className="mt-0.5 text-[#2a628f] group-hover:text-[#18435a] transition-colors">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-[#13293d]">{item.label}</p>
                <p className="text-xs text-[#9ac1e2]">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const [showDot, setShowDot] = useState(false);
  const [nudgeActive, setNudgeActive] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    if (sessionStorage.getItem(HINT_KEY)) return;
    setShowDot(true);
    const nudgeTimer = setTimeout(() => {
      setNudgeActive(true);
      setTimeout(() => setNudgeActive(false), 750);
    }, 2000);
    return () => clearTimeout(nudgeTimer);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
    if (showDot) {
      setShowDot(false);
      sessionStorage.setItem(HINT_KEY, "true");
    }
  };

  const toggleMobileGroup = (group: string) => {
    setMobileExpanded((prev) => (prev === group ? null : group));
  };

  const APRENDER_ITEMS: DropdownItem[] = [
    {
      to: "/cursos",
      label: "Cursos",
      icon: <GraduationCap className="h-4 w-4" />,
      description: "Formación estructurada por temas",
    },
    {
      to: "/material",
      label: "Material de Estudio",
      icon: <FileText className="h-4 w-4" />,
      description: "Documentos, leyes y recursos",
    },
    {
      to: "/constituquiz",
      label: "ConstituQuiz",
      icon: <Brain className="h-4 w-4" />,
      description: "Practica con preguntas y quizzes",
    },
    {
      to: "/casos",
      label: "Casos Prácticos",
      icon: <Gavel className="h-4 w-4" />,
      description: "Lee el caso y responde preguntas",
    },
  ];

  const HERRAMIENTAS_ITEMS: DropdownItem[] = [
    {
      to: "/glosario",
      label: "Glosario Jurídico",
      icon: <BookText className="h-4 w-4" />,
      description: "Términos y definiciones legales",
    },
    {
      to: "/progreso",
      label: "Mi Progreso",
      icon: <BarChart2 className="h-4 w-4" />,
      description: "Estadísticas de tu aprendizaje",
    },
  ];

  return (
    <nav className="bg-[#89c2d9] border-b border-[#67a2d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/inicio" className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-[#13293d]" />
              <span className="text-xl font-semibold text-[#13293d]">Derecho GT</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-6">
              <NavDropdown
                label="Aprender"
                icon={<BookOpen className="h-4 w-4" />}
                items={APRENDER_ITEMS}
              />

              <Link
                to="/foros"
                className="inline-flex items-center gap-1.5 px-1 pt-1 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Comunidad
              </Link>

              <NavDropdown
                label="Herramientas"
                icon={<Wrench className="h-4 w-4" />}
                items={HERRAMIENTAS_ITEMS}
              />
            </div>
          </div>

          {/* Desktop Auth */}
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
                    {user?.nombre ? `${user.nombre} ${user.apellido ?? ""}`.trim() : user?.email}
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
              className={`relative inline-flex items-center justify-center p-2 rounded-md text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors ${
                nudgeActive ? "animate-nav-nudge" : ""
              }`}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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

            {/* Aprender group */}
            <button
              onClick={() => toggleMobileGroup("aprender")}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Aprender
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  mobileExpanded === "aprender" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileExpanded === "aprender" && (
              <div className="ml-4 space-y-1 border-l-2 border-[#67a2d3] pl-3">
                {APRENDER_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Comunidad */}
            <Link
              to="/foros"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Comunidad
            </Link>

            {/* Herramientas group */}
            <button
              onClick={() => toggleMobileGroup("herramientas")}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Herramientas
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  mobileExpanded === "herramientas" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileExpanded === "herramientas" && (
              <div className="ml-4 space-y-1 border-l-2 border-[#67a2d3] pl-3">
                {HERRAMIENTAS_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Auth */}
          <div className="pt-4 pb-3 border-t border-[#67a2d3]">
            {!isAuthenticated ? (
              <div className="px-2 space-y-2">
                <Link
                  to="/registro"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-[#2a628f] hover:bg-[#18435a] transition-colors"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Iniciar Sesión
                </Link>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <div className="flex items-center gap-2 px-3 py-2 text-base font-medium text-[#13293d]">
                  <UserCircle className="h-5 w-5 text-[#2a628f]" />
                  {user?.nombre ? `${user.nombre} ${user.apellido ?? ""}`.trim() : user?.email}
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
