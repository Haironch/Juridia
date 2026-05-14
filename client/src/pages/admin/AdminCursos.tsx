import { useEffect, useState, useCallback } from 'react';
import {
  Plus, Eye, EyeOff, Pencil, Trash2, RefreshCw, X,
  BookOpen, ChevronDown, ChevronUp, Check,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  nivel: string;
  duracion: string;
  es_premium: number | boolean;
  thumbnail: string | null;
  publicado: number | boolean;
  categoria: string;
  categoria_id: string;
  totalModulos: number;
  createdAt: string;
}

interface Categoria {
  id: string;
  nombre: string;
  icono: string;
}

interface CursoFormData {
  titulo: string;
  descripcion: string;
  nivel: 'BASICO' | 'INTERMEDIO' | 'AVANZADO';
  duracion: string;
  es_premium: boolean;
  thumbnail: string;
  categoria_id: string;
  publicado: boolean;
}

const NIVEL_BADGE: Record<string, string> = {
  BASICO: 'bg-emerald-50 text-emerald-700',
  INTERMEDIO: 'bg-amber-50 text-amber-700',
  AVANZADO: 'bg-red-50 text-red-700',
};

const EMPTY_FORM: CursoFormData = {
  titulo: '', descripcion: '', nivel: 'BASICO',
  duracion: '', es_premium: false, thumbnail: '',
  categoria_id: '', publicado: false,
};

function Modal({
  open, onClose, title, children,
}: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d8e9f5]">
          <h2 className="text-lg font-bold text-[#13293d]">{title}</h2>
          <button onClick={onClose} className="text-[#9ac1e2] hover:text-[#2a628f] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export default function AdminCursos() {
  const { token } = useAuthStore();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [actionId, setActionId] = useState<string | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CursoFormData>(EMPTY_FORM);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Expand row
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [cursosRes, catRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/cursos`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/admin/categorias`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const [c, cat] = await Promise.all([cursosRes.json(), catRes.json()]);
      if (c.ok) setCursos(c.data);
      else setError(c.error);
      if (cat.ok) setCategorias(cat.data);
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, categoria_id: categorias[0]?.id ?? '' });
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (curso: Curso) => {
    setEditingId(curso.id);
    setForm({
      titulo: curso.titulo,
      descripcion: curso.descripcion,
      nivel: curso.nivel as CursoFormData['nivel'],
      duracion: curso.duracion,
      es_premium: Boolean(curso.es_premium),
      thumbnail: curso.thumbnail ?? '',
      categoria_id: curso.categoria_id,
      publicado: Boolean(curso.publicado),
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    try {
      const url = editingId
        ? `${API_URL}/api/admin/cursos/${editingId}`
        : `${API_URL}/api/admin/cursos`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        showToast(editingId ? 'Curso actualizado' : 'Curso creado exitosamente');
        setModalOpen(false);
        fetchData();
      } else {
        setFormError(data.error || 'Error al guardar');
      }
    } catch {
      setFormError('Error de conexión');
    } finally {
      setFormLoading(false);
    }
  };

  const togglePublicado = async (id: string, current: boolean) => {
    setActionId(id);
    try {
      const res = await fetch(`${API_URL}/api/admin/cursos/${id}/publicado`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicado: !current }),
      });
      const data = await res.json();
      if (data.ok) {
        showToast(data.message);
        setCursos((prev) => prev.map((c) => c.id === id ? { ...c, publicado: !current } : c));
      } else {
        showToast('Error: ' + data.error);
      }
    } catch {
      showToast('Error de conexión');
    } finally {
      setActionId(null);
    }
  };

  const deleteCurso = async (id: string) => {
    setActionId(id);
    try {
      const res = await fetch(`${API_URL}/api/admin/cursos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.ok) {
        showToast('Curso eliminado');
        setCursos((prev) => prev.filter((c) => c.id !== id));
      } else {
        showToast('Error: ' + data.error);
      }
    } catch {
      showToast('Error de conexión');
    } finally {
      setActionId(null);
      setDeleteId(null);
    }
  };

  const Field = ({
    label, children,
  }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-semibold text-[#13293d] mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-[#9ac1e2] focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-sm text-[#13293d]";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#13293d]">Cursos</h1>
          <p className="text-sm text-[#16324f]">{cursos.length} cursos en la plataforma</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#9ac1e2] text-[#2a628f] text-sm font-medium hover:bg-[#d8e9f5] transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </button>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2a628f] text-white text-sm font-medium hover:bg-[#18435a] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nuevo curso
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      {/* Course list */}
      <div className="space-y-3">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-[#d8e9f5] animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#d8e9f5]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[#d8e9f5] rounded w-48" />
                  <div className="h-3 bg-[#d8e9f5] rounded w-72" />
                </div>
              </div>
            </div>
          ))
        ) : cursos.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#d8e9f5]">
            <BookOpen className="h-10 w-10 mx-auto text-[#9ac1e2] mb-3 opacity-40" />
            <p className="text-sm text-[#16324f]">No hay cursos todavía</p>
            <button onClick={openCreate} className="mt-4 text-sm text-[#2a628f] font-medium hover:underline">
              Crear el primero
            </button>
          </div>
        ) : (
          cursos.map((c) => {
            const expanded = expandedId === c.id;
            const publicado = Boolean(c.publicado);
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl shadow-sm border border-[#d8e9f5] overflow-hidden"
              >
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Icono */}
                  <div className="w-10 h-10 rounded-xl bg-[#d8e9f5] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-[#2a628f]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-[#13293d] text-sm truncate">{c.titulo}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${NIVEL_BADGE[c.nivel] ?? 'bg-slate-100 text-slate-600'}`}>
                        {c.nivel}
                      </span>
                      {Boolean(c.es_premium) && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-700">
                          Premium
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                          publicado ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${publicado ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {publicado ? 'Publicado' : 'Borrador'}
                      </span>
                    </div>
                    <p className="text-xs text-[#9ac1e2] mt-0.5">
                      {c.categoria} · {c.duracion} · {c.totalModulos} módulos
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => togglePublicado(c.id, publicado)}
                      disabled={actionId === c.id}
                      title={publicado ? 'Ocultar' : 'Publicar'}
                      className={`p-2 rounded-lg transition-colors disabled:opacity-40 ${
                        publicado
                          ? 'text-emerald-600 hover:bg-emerald-50'
                          : 'text-[#9ac1e2] hover:text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      {publicado ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => openEdit(c)}
                      title="Editar"
                      className="p-2 rounded-lg text-[#9ac1e2] hover:text-[#2a628f] hover:bg-[#d8e9f5] transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(c.id)}
                      title="Eliminar"
                      className="p-2 rounded-lg text-[#9ac1e2] hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setExpandedId(expanded ? null : c.id)}
                      className="p-2 rounded-lg text-[#9ac1e2] hover:bg-[#f0f7ff] transition-colors"
                    >
                      {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded description */}
                {expanded && (
                  <div className="px-5 pb-4 border-t border-[#f0f7ff]">
                    <p className="text-sm text-[#16324f] leading-relaxed mt-3">{c.descripcion}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Editar curso' : 'Nuevo curso'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Field label="Título">
            <input
              className={inputCls}
              value={form.titulo}
              onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
              required minLength={3} maxLength={200}
              placeholder="Ej: Derecho Constitucional I"
            />
          </Field>

          <Field label="Descripción">
            <textarea
              className={`${inputCls} resize-none`}
              rows={4}
              value={form.descripcion}
              onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
              required minLength={10}
              placeholder="Descripción del curso..."
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Nivel">
              <select
                className={inputCls}
                value={form.nivel}
                onChange={(e) => setForm((f) => ({ ...f, nivel: e.target.value as CursoFormData['nivel'] }))}
              >
                <option value="BASICO">Básico</option>
                <option value="INTERMEDIO">Intermedio</option>
                <option value="AVANZADO">Avanzado</option>
              </select>
            </Field>
            <Field label="Duración">
              <input
                className={inputCls}
                value={form.duracion}
                onChange={(e) => setForm((f) => ({ ...f, duracion: e.target.value }))}
                required placeholder="Ej: 8 horas"
              />
            </Field>
          </div>

          <Field label="Categoría">
            <select
              className={inputCls}
              value={form.categoria_id}
              onChange={(e) => setForm((f) => ({ ...f, categoria_id: e.target.value }))}
              required
            >
              <option value="">Seleccionar categoría...</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </Field>

          <Field label="URL de thumbnail (opcional)">
            <input
              className={inputCls}
              type="url"
              value={form.thumbnail}
              onChange={(e) => setForm((f) => ({ ...f, thumbnail: e.target.value }))}
              placeholder="https://..."
            />
          </Field>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setForm((f) => ({ ...f, es_premium: !f.es_premium }))}
                className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                  form.es_premium ? 'bg-amber-500 border-amber-500' : 'border-[#9ac1e2]'
                }`}
              >
                {form.es_premium && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="text-sm text-[#13293d]">Curso Premium</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setForm((f) => ({ ...f, publicado: !f.publicado }))}
                className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                  form.publicado ? 'bg-emerald-500 border-emerald-500' : 'border-[#9ac1e2]'
                }`}
              >
                {form.publicado && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="text-sm text-[#13293d]">Publicar al guardar</span>
            </label>
          </div>

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {formError}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#9ac1e2] text-[#2a628f] text-sm font-medium hover:bg-[#d8e9f5] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#2a628f] text-white text-sm font-medium hover:bg-[#18435a] transition-colors disabled:opacity-50"
            >
              {formLoading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear curso'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar curso">
        <div className="space-y-4">
          <p className="text-sm text-[#16324f]">
            ¿Estás seguro de que quieres eliminar este curso? Esta acción también eliminará todos
            sus módulos y <strong>no se puede deshacer</strong>.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteId(null)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#9ac1e2] text-[#2a628f] text-sm font-medium hover:bg-[#d8e9f5] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => deleteId && deleteCurso(deleteId)}
              disabled={!!actionId}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#13293d] text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
