import { useEffect, useState, useCallback } from 'react';
import {
  Search, UserCheck, UserX, Shield, ChevronLeft, ChevronRight,
  RefreshCw, X,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

interface Usuario {
  id: string;
  email: string;
  nombre: string | null;
  apellido: string | null;
  rol: string;
  estado: string;
  fecha_registro: string | null;
  ultimo_acceso: string | null;
}

const ROL_OPTIONS = ['FREE', 'PREMIUM', 'TUTOR', 'ADMIN_CONTENIDO', 'SUPER_ADMIN'];

const ROL_BADGE: Record<string, string> = {
  FREE: 'bg-slate-100 text-slate-600',
  PREMIUM: 'bg-amber-100 text-amber-700',
  TUTOR: 'bg-violet-100 text-violet-700',
  ADMIN_CONTENIDO: 'bg-blue-100 text-blue-700',
  SUPER_ADMIN: 'bg-[#2a628f]/10 text-[#2a628f]',
};

function fmtDate(s: string | null) {
  if (!s) return '—';
  return new Date(s).toLocaleDateString('es-GT', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AdminUsuarios() {
  const { token } = useAuthStore();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15' });
      if (search) params.set('search', search);
      const res = await fetch(`${API_URL}/api/admin/usuarios?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.ok) {
        setUsuarios(data.data.usuarios);
        setTotal(data.data.total);
        setTotalPages(data.data.totalPages);
      } else {
        setError(data.error || 'Error al cargar usuarios');
      }
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  }, [token, page, search]);

  useEffect(() => { fetchUsuarios(); }, [fetchUsuarios]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearch('');
    setPage(1);
  };

  const updateEstado = async (id: string, estado: 'ACTIVO' | 'SUSPENDIDO') => {
    setActionId(id);
    try {
      const res = await fetch(`${API_URL}/api/admin/usuarios/${id}/estado`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado }),
      });
      const data = await res.json();
      if (data.ok) {
        showToast(data.message);
        setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, estado } : u)));
      } else {
        showToast('Error: ' + data.error);
      }
    } catch {
      showToast('Error de conexión');
    } finally {
      setActionId(null);
    }
  };

  const updateRol = async (id: string, rol: string) => {
    setActionId(id);
    try {
      const res = await fetch(`${API_URL}/api/admin/usuarios/${id}/rol`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol }),
      });
      const data = await res.json();
      if (data.ok) {
        showToast('Rol actualizado');
        setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, rol } : u)));
      } else {
        showToast('Error: ' + data.error);
      }
    } catch {
      showToast('Error de conexión');
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#13293d]">Usuarios</h1>
          <p className="text-sm text-[#16324f]">{total.toLocaleString()} cuentas registradas</p>
        </div>
        <button
          onClick={fetchUsuarios}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#9ac1e2] text-[#2a628f] text-sm font-medium hover:bg-[#d8e9f5] transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Actualizar
        </button>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ac1e2]" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar por nombre o correo..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#9ac1e2] focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-sm text-[#13293d]"
          />
          {searchInput && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ac1e2] hover:text-[#2a628f]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-[#2a628f] text-white text-sm font-medium hover:bg-[#18435a] transition-colors"
        >
          Buscar
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#d8e9f5] overflow-hidden">
        {loading ? (
          <div className="divide-y divide-[#f0f7ff]">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-[#d8e9f5]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-[#d8e9f5] rounded w-40" />
                  <div className="h-3 bg-[#d8e9f5] rounded w-56" />
                </div>
                <div className="h-6 bg-[#d8e9f5] rounded w-16" />
              </div>
            ))}
          </div>
        ) : usuarios.length === 0 ? (
          <div className="text-center py-16 text-[#9ac1e2]">
            <Search className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No se encontraron usuarios</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f0f7ff] text-[#16324f] text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-6 py-3">Usuario</th>
                  <th className="text-left px-6 py-3">Rol</th>
                  <th className="text-left px-6 py-3">Estado</th>
                  <th className="text-left px-6 py-3 hidden md:table-cell">Registro</th>
                  <th className="text-right px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f7ff]">
                {usuarios.map((u) => (
                  <tr key={u.id} className="hover:bg-[#f8fbff] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[#13293d]">
                          {u.nombre ? `${u.nombre} ${u.apellido ?? ''}`.trim() : '—'}
                        </p>
                        <p className="text-[#9ac1e2] text-xs mt-0.5">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={u.rol}
                        disabled={actionId === u.id}
                        onChange={(e) => updateRol(u.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer focus:ring-2 focus:ring-[#2a628f] focus:outline-none ${ROL_BADGE[u.rol] ?? 'bg-slate-100 text-slate-600'}`}
                      >
                        {ROL_OPTIONS.map((r) => (
                          <option key={r} value={r}>{r.replace('_', ' ')}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                          u.estado === 'ACTIVO'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${u.estado === 'ACTIVO' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        {u.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-[#9ac1e2] text-xs">
                      {fmtDate(u.fecha_registro)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {u.estado === 'ACTIVO' ? (
                          <button
                            onClick={() => updateEstado(u.id, 'SUSPENDIDO')}
                            disabled={actionId === u.id}
                            title="Suspender usuario"
                            className="p-1.5 rounded-lg text-[#9ac1e2] hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                          >
                            <UserX className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => updateEstado(u.id, 'ACTIVO')}
                            disabled={actionId === u.id}
                            title="Activar usuario"
                            className="p-1.5 rounded-lg text-[#9ac1e2] hover:text-emerald-500 hover:bg-emerald-50 transition-colors disabled:opacity-40"
                          >
                            <UserCheck className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          title="Gestionar rol"
                          className="p-1.5 rounded-lg text-[#9ac1e2] hover:text-[#2a628f] hover:bg-[#d8e9f5] transition-colors"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#16324f]">
            Página {page} de {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-[#9ac1e2] text-[#2a628f] hover:bg-[#d8e9f5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-[#9ac1e2] text-[#2a628f] hover:bg-[#d8e9f5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#13293d] text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
