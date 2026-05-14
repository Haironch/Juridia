import { useEffect, useState } from 'react';
import { Users, BookOpen, TrendingUp, Eye, UserCheck, Layers } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

interface Stats {
  totalUsuarios: number;
  usuariosActivos: number;
  totalCursos: number;
  cursosPublicados: number;
  nuevosHoy: number;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  sub?: string;
}

function StatCard({ label, value, icon, color, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#d8e9f5]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#16324f] font-medium">{label}</p>
          <p className="text-3xl font-bold text-[#13293d] mt-1">{value.toLocaleString()}</p>
          {sub && <p className="text-xs text-[#9ac1e2] mt-1">{sub}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { token, user } = useAuthStore();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.ok) setStats(data.data);
        else setError(data.error || 'Error al cargar estadísticas');
      } catch {
        setError('No se pudo conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días';
    if (h < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#13293d]">
          {greeting()}, {user?.nombre ?? 'Admin'} 👋
        </h1>
        <p className="text-[#16324f] text-sm mt-1">
          Aquí tienes un resumen de la plataforma Derecho GT.
        </p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-[#d8e9f5] animate-pulse">
              <div className="h-4 bg-[#d8e9f5] rounded w-24 mb-3" />
              <div className="h-8 bg-[#d8e9f5] rounded w-16" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {error}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            label="Total de usuarios"
            value={stats.totalUsuarios}
            icon={<Users className="h-5 w-5 text-white" />}
            color="bg-[#2a628f]"
            sub="Cuentas registradas"
          />
          <StatCard
            label="Usuarios activos"
            value={stats.usuariosActivos}
            icon={<UserCheck className="h-5 w-5 text-white" />}
            color="bg-emerald-500"
            sub="Estado ACTIVO"
          />
          <StatCard
            label="Nuevos hoy"
            value={stats.nuevosHoy}
            icon={<TrendingUp className="h-5 w-5 text-white" />}
            color="bg-amber-500"
            sub="Registros de hoy"
          />
          <StatCard
            label="Total de cursos"
            value={stats.totalCursos}
            icon={<Layers className="h-5 w-5 text-white" />}
            color="bg-violet-500"
            sub="En la plataforma"
          />
          <StatCard
            label="Cursos publicados"
            value={stats.cursosPublicados}
            icon={<Eye className="h-5 w-5 text-white" />}
            color="bg-[#18435a]"
            sub="Visibles para usuarios"
          />
          <StatCard
            label="Cursos no publicados"
            value={stats.totalCursos - stats.cursosPublicados}
            icon={<BookOpen className="h-5 w-5 text-white" />}
            color="bg-slate-400"
            sub="En borrador"
          />
        </div>
      ) : null}

      {/* Info panel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#d8e9f5]">
        <h2 className="text-base font-bold text-[#13293d] mb-3">Accesos rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/admin/usuarios"
            className="flex items-center gap-3 p-4 rounded-xl bg-[#f0f7ff] hover:bg-[#d8e9f5] transition-colors border border-[#d8e9f5]"
          >
            <Users className="h-5 w-5 text-[#2a628f]" />
            <div>
              <p className="text-sm font-semibold text-[#13293d]">Gestión de usuarios</p>
              <p className="text-xs text-[#16324f]">Ver, suspender y cambiar roles</p>
            </div>
          </a>
          <a
            href="/admin/cursos"
            className="flex items-center gap-3 p-4 rounded-xl bg-[#f0f7ff] hover:bg-[#d8e9f5] transition-colors border border-[#d8e9f5]"
          >
            <BookOpen className="h-5 w-5 text-[#2a628f]" />
            <div>
              <p className="text-sm font-semibold text-[#13293d]">Gestión de cursos</p>
              <p className="text-xs text-[#16324f]">Publicar, editar y crear cursos</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
