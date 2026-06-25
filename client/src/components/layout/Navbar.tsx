import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Scale, BookOpen, LogIn, UserPlus, LogOut, Menu, X,
  MessageSquare, FileText, Brain, BarChart2, UserCircle,
  BookText, ChevronDown, GraduationCap, Wrench, Gavel,
  ClipboardList, Clock, Calculator, Calendar,
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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`relative inline-flex items-center gap-1.5 px-1 pb-1 pt-2 text-sm font-semibold transition-colors ${
          isActive ? "text-[#13293d]" : "text-[#16324f] hover:text-[#13293d]"
        }`}
      >
        {icon}
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        {/* Indicador activo */}
        {isActive && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#13293d] rounded-full" />
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-xl border border-[#d8e9f5] py-2 z-50">
          {items.map((item) => {
            const itemActive = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-start gap-3 px-4 py-3 transition-colors group ${
                  itemActive ? "bg-[#f0f7ff]" : "hover:bg-[#f0f7ff]"
                }`}
              >
                <div className={`mt-0.5 transition-colors ${itemActive ? "text-[#13293d]" : "text-[#2a628f] group-hover:text-[#18435a]"}`}>
                  {item.icon}
                </div>
                <div>
                  <p className={`text-sm font-medium ${itemActive ? "text-[#13293d] font-semibold" : "text-[#13293d]"}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-[#9ac1e2]">{item.description}</p>
                </div>
                {itemActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2a628f] mt-1.5 flex-shrink-0" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

const APRENDER_ITEMS: DropdownItem[] = [
  { to: "/cursos",      label: "Cursos",              icon: <GraduationCap className="h-4 w-4" />, description: "Formación estructurada por temas" },
  { to: "/material",    label: "Material de Estudio", icon: <FileText className="h-4 w-4" />,      description: "Documentos, leyes y recursos" },
  { to: "/constituquiz",label: "ConstituQuiz",         icon: <Brain className="h-4 w-4" />,         description: "Practica con preguntas y quizzes" },
  { to: "/casos",       label: "Casos Prácticos",     icon: <Gavel className="h-4 w-4" />,          description: "Lee el caso y responde preguntas" },
  { to: "/examen",      label: "Examen Simulado",     icon: <ClipboardList className="h-4 w-4" />,  description: "Simulacro con tiempo límite" },
  { to: "/historia",    label: "Historia del Derecho",icon: <Clock className="h-4 w-4" />,          description: "Línea de tiempo visual" },
];

const HERRAMIENTAS_ITEMS: DropdownItem[] = [
  { to: "/planes",      label: "Planes de Estudio",    icon: <Calendar className="h-4 w-4" />,  description: "Calendario personalizado para tu examen" },
  { to: "/glosario",    label: "Glosario Jurídico",    icon: <BookText className="h-4 w-4" />,  description: "Términos y definiciones legales" },
  { to: "/liquidacion", label: "Calcula tu Liquidación",icon: <Calculator className="h-4 w-4" />,description: "Estima tu liquidación laboral" },
  { to: "/documentos",  label: "Generador de Documentos",icon: <FileText className="h-4 w-4" />,description: "Crea documentos legales básicos" },
  { to: "/progreso",    label: "Mi Progreso",          icon: <BarChart2 className="h-4 w-4" />, description: "Estadísticas de tu aprendizaje" },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-expandir el grupo que contiene la ruta activa
  const initialGroup = APRENDER_ITEMS.some(i => location.pathname.startsWith(i.to))
    ? "aprender"
    : HERRAMIENTAS_ITEMS.some(i => location.pathname.startsWith(i.to))
    ? "herramientas"
    : null;
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(initialGroup);

  const [showDot, setShowDot] = useState(false);
  const [nudgeActive, setNudgeActive] = useState(false);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    if (sessionStorage.getItem(HINT_KEY)) return;
    setShowDot(true);
    const t = setTimeout(() => {
      setNudgeActive(true);
      setTimeout(() => setNudgeActive(false), 750);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  const handleMobileToggle = () => {
    setMobileMenuOpen((prev) => !prev);
    if (showDot) { setShowDot(false); sessionStorage.setItem(HINT_KEY, "true"); }
  };

  const toggleGroup = (group: string) =>
    setMobileExpanded((prev) => (prev === group ? null : group));

  const forosActive = location.pathname.startsWith("/foros");

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

            {/* Desktop links */}
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-6 h-16">
              <NavDropdown label="Aprender"     icon={<BookOpen className="h-4 w-4" />} items={APRENDER_ITEMS} />

              {/* Comunidad con indicador activo */}
              <Link
                to="/foros"
                className={`relative inline-flex items-center gap-1.5 px-1 pb-1 pt-2 text-sm font-semibold transition-colors ${
                  forosActive ? "text-[#13293d]" : "text-[#16324f] hover:text-[#13293d]"
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                Comunidad
                {forosActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#13293d] rounded-full" />
                )}
              </Link>

              <NavDropdown label="Herramientas" icon={<Wrench className="h-4 w-4" />} items={HERRAMIENTAS_ITEMS} />
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <Link to="/registro" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2a628f] hover:bg-[#18435a] transition-colors">
                  <UserPlus className="h-4 w-4 mr-1" /> Registrarse
                </Link>
                <Link to="/login" className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors">
                  <LogIn className="h-4 w-4 mr-1" /> Iniciar Sesión
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm text-[#16324f]">
                  <UserCircle className="h-5 w-5 text-[#2a628f]" />
                  <span className="font-medium text-[#13293d]">
                    {user?.nombre ? `${user.nombre} ${user.apellido ?? ""}`.trim() : user?.email}
                  </span>
                  {user?.rachaActual && user.rachaActual > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200">
                      🔥 {user.rachaActual}
                    </span>
                  )}
                </div>
                <button onClick={logout} className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#16324f] hover:text-red-600 transition-colors">
                  <LogOut className="h-4 w-4 mr-1" /> Cerrar Sesión
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={handleMobileToggle}
              className={`relative inline-flex items-center justify-center p-2 rounded-md text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3] transition-colors ${nudgeActive ? "animate-nav-nudge" : ""}`}
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

          {/* Usuario activo — arriba en móvil */}
          {isAuthenticated && (
            <div className="px-4 py-3 bg-[#7ab8d4] flex items-center gap-3 border-b border-[#67a2d3]">
              <div className="w-9 h-9 rounded-full bg-[#2a628f] flex items-center justify-center flex-shrink-0">
                <UserCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#13293d] truncate">
                  {user?.nombre ? `${user.nombre} ${user.apellido ?? ""}`.trim() : user?.email}
                </p>
                <p className="text-xs text-[#16324f]">Cuenta activa</p>
              </div>
              {user?.rachaActual && user.rachaActual > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 flex-shrink-0">
                  🔥 {user.rachaActual}
                </span>
              )}
            </div>
          )}

          <div className="px-3 py-3 space-y-1">

            {/* Grupo Aprender */}
            {(() => {
              const grupoActivo = APRENDER_ITEMS.some(i => location.pathname.startsWith(i.to));
              return (
                <>
                  <button
                    onClick={() => toggleGroup("aprender")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      grupoActivo
                        ? "bg-[#2a628f] text-white"
                        : "text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <BookOpen className="h-5 w-5" />
                      Aprender
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpanded === "aprender" ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpanded === "aprender" && (
                    <div className="ml-3 space-y-0.5 border-l-2 border-[#2a628f]/30 pl-3">
                      {APRENDER_ITEMS.map((item) => {
                        const active = location.pathname.startsWith(item.to);
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              active
                                ? "bg-white text-[#13293d] shadow-sm"
                                : "text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3]"
                            }`}
                          >
                            <span className={active ? "text-[#2a628f]" : ""}>{item.icon}</span>
                            {item.label}
                            {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2a628f]" />}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              );
            })()}

            {/* Comunidad */}
            {(() => {
              const active = forosActive;
              return (
                <Link
                  to="/foros"
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    active ? "bg-[#2a628f] text-white" : "text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3]"
                  }`}
                >
                  <MessageSquare className="h-5 w-5" />
                  Comunidad
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
                </Link>
              );
            })()}

            {/* Grupo Herramientas */}
            {(() => {
              const grupoActivo = HERRAMIENTAS_ITEMS.some(i => location.pathname.startsWith(i.to));
              return (
                <>
                  <button
                    onClick={() => toggleGroup("herramientas")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      grupoActivo
                        ? "bg-[#2a628f] text-white"
                        : "text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Wrench className="h-5 w-5" />
                      Herramientas
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpanded === "herramientas" ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpanded === "herramientas" && (
                    <div className="ml-3 space-y-0.5 border-l-2 border-[#2a628f]/30 pl-3">
                      {HERRAMIENTAS_ITEMS.map((item) => {
                        const active = location.pathname.startsWith(item.to);
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              active
                                ? "bg-white text-[#13293d] shadow-sm"
                                : "text-[#16324f] hover:text-[#13293d] hover:bg-[#67a2d3]"
                            }`}
                          >
                            <span className={active ? "text-[#2a628f]" : ""}>{item.icon}</span>
                            {item.label}
                            {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2a628f]" />}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* Auth móvil */}
          <div className="px-3 pb-4 border-t border-[#67a2d3] pt-3 space-y-2">
            {!isAuthenticated ? (
              <>
                <Link to="/registro" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#2a628f] hover:bg-[#18435a] transition-colors">
                  <UserPlus className="h-4 w-4" /> Registrarse
                </Link>
                <Link to="/login" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#16324f] hover:bg-[#67a2d3] transition-colors">
                  <LogIn className="h-4 w-4" /> Iniciar Sesión
                </Link>
              </>
            ) : (
              <button
                onClick={() => { logout(); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" /> Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
