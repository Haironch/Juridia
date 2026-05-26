import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  MessageSquare, ThumbsUp, Eye, Tag, CheckCircle,
  Pin, Plus, X, ChevronLeft, ChevronRight, Search,
  AlertCircle, Loader2,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const API = import.meta.env.VITE_API_URL ?? '';

// ── Types ─────────────────────────────────────────────────────────────────────
interface PostForo {
  id: string;
  titulo: string;
  categoria: string;
  usuario_nombre: string;
  votos: number;
  vistas: number;
  total_respuestas: number;
  resuelto: number;
  fijado: number;
  created_at: string;
}

interface ForosResponse {
  ok: boolean;
  data: PostForo[];
  meta: { total: number; pagina: number; totalPaginas: number; limite: number };
}

const CATEGORIAS = [
  'Derecho Constitucional',
  'Derecho Penal',
  'Derecho Civil',
  'Derecho Laboral',
  'Derecho Mercantil',
  'Derecho Administrativo',
  'Derecho de Familia',
  'Derecho Tributario',
  'Derecho Procesal',
  'Derecho Notarial',
  'General',
] as const;

const ORDEN_OPTS = [
  { value: 'recientes',     label: 'Más recientes' },
  { value: 'votos',         label: 'Más votados' },
  { value: 'sin_respuesta', label: 'Sin respuesta' },
  { value: 'resueltos',     label: 'Resueltos' },
];

function tiempoRelativo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'hace un momento';
  if (m < 60) return `hace ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `hace ${d} d`;
  const mo = Math.floor(d / 30);
  return `hace ${mo} mes${mo > 1 ? 'es' : ''}`;
}

// ── Modal nuevo post ──────────────────────────────────────────────────────────
interface ModalProps { onClose: () => void; onSuccess: () => void; }

function ModalNuevoPost({ onClose, onSuccess }: ModalProps) {
  const { token } = useAuthStore();
  const [titulo, setTitulo]       = useState('');
  const [contenido, setContenido] = useState('');
  const [categoria, setCategoria] = useState('');
  const [error, setError]         = useState('');
  const backdropRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/api/foros`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ titulo, contenido, categoria }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? 'Error al publicar');
      return json;
    },
    onSuccess: () => { onSuccess(); onClose(); },
    onError: (e: Error) => setError(e.message),
  });

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#13293d]">Nueva publicación</h2>
          <button onClick={onClose} className="text-[#9ac1e2] hover:text-[#13293d] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#13293d] mb-1">Categoría *</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-3 py-2 border border-[#9ac1e2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f]"
            >
              <option value="">Selecciona una categoría</option>
              {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#13293d] mb-1">Título *</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="¿Qué quieres preguntar o discutir?"
              maxLength={200}
              className="w-full px-3 py-2 border border-[#9ac1e2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f]"
            />
            <p className="text-xs text-[#9ac1e2] mt-1">{titulo.length}/200 — mínimo 10 caracteres</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#13293d] mb-1">Contenido *</label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={6}
              maxLength={5000}
              placeholder="Explica tu pregunta o el tema a discutir con detalle..."
              className="w-full px-3 py-2 border border-[#9ac1e2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f] resize-none"
            />
            <p className="text-xs text-[#9ac1e2] mt-1">{contenido.length}/5000 — mínimo 20 caracteres</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#16324f] hover:text-[#13293d] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || !titulo.trim() || !contenido.trim() || !categoria}
            className="flex items-center gap-2 px-5 py-2 bg-[#2a628f] hover:bg-[#18435a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Foros() {
  const { isAuthenticated } = useAuthStore();
  const qc = useQueryClient();

  const [buscar, setBuscar]       = useState('');
  const [buscarInput, setBuscarInput] = useState('');
  const [categoria, setCategoria] = useState('');
  const [orden, setOrden]         = useState('recientes');
  const [pagina, setPagina]       = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Reset page on filter change
  useEffect(() => { setPagina(1); }, [buscar, categoria, orden]);

  const params = new URLSearchParams({ orden, pagina: String(pagina) });
  if (categoria) params.set('categoria', categoria);
  if (buscar)    params.set('buscar', buscar);

  const { data, isLoading, isError } = useQuery<ForosResponse>({
    queryKey: ['foros', orden, pagina, categoria, buscar],
    queryFn: async () => {
      const res = await fetch(`${API}/api/foros?${params}`);
      return res.json();
    },
    staleTime: 30_000,
  });

  const posts = data?.data ?? [];
  const meta  = data?.meta;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setBuscar(buscarInput.trim());
  };

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Comunidad — Foros
          </h1>
          <p className="text-lg text-[#b2d3ea] max-w-2xl">
            Pregunta, debate y aprende junto a otros estudiantes y profesionales del Derecho guatemalteco.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Barra superior ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ac1e2]" />
              <input
                value={buscarInput}
                onChange={(e) => setBuscarInput(e.target.value)}
                placeholder="Buscar publicaciones..."
                className="w-full pl-9 pr-3 py-2 border border-[#9ac1e2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f] bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2a628f] text-white text-sm font-medium rounded-lg hover:bg-[#18435a] transition-colors"
            >
              Buscar
            </button>
            {buscar && (
              <button
                type="button"
                onClick={() => { setBuscar(''); setBuscarInput(''); }}
                className="px-3 py-2 border border-[#9ac1e2] text-[#16324f] text-sm rounded-lg hover:bg-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>

          {/* Orden */}
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="px-3 py-2 border border-[#9ac1e2] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-[#16324f]"
          >
            {ORDEN_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Nuevo post */}
          {isAuthenticated && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#2a628f] text-white text-sm font-medium rounded-lg hover:bg-[#18435a] transition-colors whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              Nueva publicación
            </button>
          )}
        </div>

        {/* ── Categorías chip bar ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCategoria('')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              categoria === ''
                ? 'bg-[#2a628f] text-white'
                : 'bg-white border border-[#9ac1e2] text-[#16324f] hover:bg-[#d8e9f5]'
            }`}
          >
            Todas
          </button>
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => setCategoria(categoria === c ? '' : c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                categoria === c
                  ? 'bg-[#2a628f] text-white'
                  : 'bg-white border border-[#9ac1e2] text-[#16324f] hover:bg-[#d8e9f5]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-[#2a628f] animate-spin" />
          </div>
        )}

        {isError && (
          <div className="text-center py-16 text-red-600">
            Error al cargar los foros. Intenta de nuevo más tarde.
          </div>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <div className="text-center py-16 text-[#16324f]">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-[#9ac1e2]" />
            <p className="text-lg font-medium">No hay publicaciones aún</p>
            <p className="text-sm text-[#9ac1e2] mt-1">
              {isAuthenticated ? '¡Sé el primero en publicar!' : 'Inicia sesión para publicar.'}
            </p>
          </div>
        )}

        {!isLoading && posts.length > 0 && (
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/foros/${post.id}`}
                className="block bg-white rounded-xl border border-[#9ac1e2] hover:border-[#2a628f] hover:shadow-md transition-all p-5"
              >
                <div className="flex items-start gap-4">
                  {/* Votos */}
                  <div className="flex flex-col items-center min-w-[48px] text-center">
                    <ThumbsUp className="h-4 w-4 text-[#9ac1e2] mb-0.5" />
                    <span className="text-lg font-bold text-[#2a628f]">{post.votos}</span>
                    <span className="text-xs text-[#9ac1e2]">votos</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {post.fijado === 1 && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                          <Pin className="h-3 w-3" /> Fijado
                        </span>
                      )}
                      {post.resuelto === 1 && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                          <CheckCircle className="h-3 w-3" /> Resuelto
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2a628f] bg-[#d8e9f5] px-2 py-0.5 rounded-full">
                        <Tag className="h-3 w-3" /> {post.categoria}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[#13293d] leading-snug line-clamp-2 mb-2">
                      {post.titulo}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#9ac1e2]">
                      <span className="font-medium text-[#16324f]">{post.usuario_nombre}</span>
                      <span>{tiempoRelativo(post.created_at)}</span>
                      <span className="inline-flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        {post.total_respuestas} {post.total_respuestas === 1 ? 'respuesta' : 'respuestas'}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {post.vistas} vistas
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ── Paginación ── */}
        {meta && meta.totalPaginas > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="p-2 border border-[#9ac1e2] rounded-lg text-[#16324f] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: meta.totalPaginas }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === meta.totalPaginas || Math.abs(p - pagina) <= 1)
              .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                if (idx > 0 && (arr[idx - 1] as number) < p - 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-[#9ac1e2] text-sm">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPagina(p as number)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      pagina === p
                        ? 'bg-[#2a628f] text-white'
                        : 'border border-[#9ac1e2] text-[#16324f] hover:bg-white'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => setPagina((p) => Math.min(meta.totalPaginas, p + 1))}
              disabled={pagina === meta.totalPaginas}
              className="p-2 border border-[#9ac1e2] rounded-lg text-[#16324f] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ── CTA no autenticado ── */}
        {!isAuthenticated && (
          <div className="mt-10 bg-white rounded-2xl border border-[#d8e9f5] p-8 text-center shadow-sm">
            <MessageSquare className="h-10 w-10 mx-auto mb-3 text-[#2a628f]" />
            <h3 className="text-lg font-bold text-[#13293d] mb-1">Únete a la comunidad</h3>
            <p className="text-sm text-[#16324f] mb-4">
              Inicia sesión para publicar preguntas, responder a otros y votar.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2 bg-[#2a628f] text-white text-sm font-medium rounded-lg hover:bg-[#18435a] transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="px-5 py-2 border border-[#2a628f] text-[#2a628f] text-sm font-medium rounded-lg hover:bg-[#d8e9f5] transition-colors"
              >
                Registrarse gratis
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <ModalNuevoPost
          onClose={() => setShowModal(false)}
          onSuccess={() => qc.invalidateQueries({ queryKey: ['foros'] })}
        />
      )}
    </div>
  );
}
