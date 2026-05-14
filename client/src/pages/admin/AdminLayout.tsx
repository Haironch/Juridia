import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Scale,
  LayoutDashboard,
  Users,
  BookOpen,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { to: '/admin/cursos', label: 'Cursos', icon: BookOpen },
];

export default function AdminLayout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
          <Scale className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">Derecho GT</p>
          <div className="flex items-center gap-1 mt-0.5">
            <ShieldCheck className="h-3 w-3 text-[#9ac1e2]" />
            <p className="text-[#9ac1e2] text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-white/15 text-white'
                  : 'text-[#9ac1e2] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/10 space-y-2">
        <div className="px-3 py-2">
          <p className="text-white text-sm font-medium truncate">
            {user?.nombre ? `${user.nombre} ${user.apellido ?? ''}`.trim() : user?.email}
          </p>
          <p className="text-[#9ac1e2] text-xs mt-0.5">{user?.rol?.replace('_', ' ')}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#9ac1e2] hover:bg-white/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f0f7ff] overflow-hidden">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col bg-gradient-to-b from-[#13293d] to-[#18435a] w-64 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#13293d] to-[#18435a] transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-[#9ac1e2] hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <Sidebar mobile />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-[#d8e9f5] px-4 sm:px-6 h-16 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-[#2a628f] hover:text-[#13293d] transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#9ac1e2]">Admin</span>
            <ChevronRight className="h-3.5 w-3.5 text-[#9ac1e2]" />
            <span className="font-medium text-[#13293d]">
              {NAV_ITEMS.find((n) => n.to === location.pathname)?.label ?? 'Panel'}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
