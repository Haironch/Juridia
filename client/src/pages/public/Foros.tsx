import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ChatCircle, ThumbsUp, Eye, PushPin, CheckCircle,
  Plus, MagnifyingGlass, Warning, CircleNotch,
  CaretLeft, CaretRight, Users,
} from '@phosphor-icons/react';
import { IconX } from '@tabler/icons-react';
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
  'Derecho Constitucional', 'Derecho Penal', 'Derecho Civil',
  'Derecho Laboral', 'Derecho Mercantil', 'Derecho Administrativo',
  'Derecho de Familia', 'Derecho Tributario', 'Derecho Procesal',
  'Derecho Notarial', 'General',
] as const;

const ORDEN_OPTS = [
  { value: 'recientes',     label: 'Más recientes' },
  { value: 'votos',         label: 'Más votados' },
  { value: 'sin_respuesta', label: 'Sin respuesta' },
  { value: 'resueltos',     label: 'Resueltos' },
];

// ── Category colors ───────────────────────────────────────────────────────────
const CAT_COLORS: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  'Derecho Constitucional': { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    bar: 'bg-blue-500'    },
  'Derecho Penal':          { bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',     bar: 'bg-red-500'     },
  'Derecho Civil':          { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', bar: 'bg-emerald-500' },
  'Derecho Laboral':        { bg: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-200',    bar: 'bg-teal-500'    },
  'Derecho Mercantil':      { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   bar: 'bg-amber-500'   },
  'Derecho Administrativo': { bg: 'bg-purple-50',  text: 'text-purple-700',  border: 'border-purple-200',  bar: 'bg-purple-500'  },
  'Derecho de Familia':     { bg: 'bg-pink-50',    text: 'text-pink-700',    border: 'border-pink-200',    bar: 'bg-pink-500'    },
  'Derecho Tributario':     { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200',  bar: 'bg-orange-500'  },
  'Derecho Procesal':       { bg: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-200',  bar: 'bg-indigo-500'  },
  'Derecho Notarial':       { bg: 'bg-slate-50',   text: 'text-slate-700',   border: 'border-slate-200',   bar: 'bg-slate-500'   },
  'General':                { bg: 'bg-gray-50',    text: 'text-gray-700',    border: 'border-gray-200',    bar: 'bg-gray-400'    },
};
const DEFAULT_CAT = { bg: 'bg-[#d8e9f5]', text: 'text-[#2a628f]', border: 'border-[#9ac1e2]', bar: 'bg-[#2a628f]' };
function catColor(cat: string) { return CAT_COLORS[cat] ?? DEFAULT_CAT; }

// ── Avatar helpers ────────────────────────────────────────────────────────────
const AVATAR_PALETTE = [
  'bg-blue-500', 'bg-rose-500', 'bg-emerald-500', 'bg-amber-500',
  'bg-violet-500', 'bg-teal-500', 'bg-pink-500', 'bg-indigo-500',
];
function avatarBg(nombre: string): string {
  let hash = 0;
  for (let i = 0; i < nombre.length; i++) hash = (hash * 31 + nombre.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}
function getInitials(nombre: string): string {
  const parts = nombre.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : nombre.slice(0, 2).toUpperCase();
}

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

  const tituloOk    = titulo.trim().length > 0;
  const contenidoOk = contenido.trim().length > 0;
  const categoriaOk = !!categoria;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-4 sm:pb-0"
    >
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d8e9f5] shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#2a628f] flex items-center justify-center">
              <ChatCircle weight="fill" className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-[#13293d]">Nueva publicación</h2>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center text-[#9ac1e2] hover:bg-[#d8e9f5] hover:text-[#13293d] transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <Warning weight="fill" className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#13293d] mb-1.5">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#9ac1e2] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f] bg-white text-[#13293d]"
            >
              <option value="">Selecciona una categoría</option>
              {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#13293d] mb-1.5">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="¿Qué quieres preguntar o discutir?"
              maxLength={200}
              className="w-full px-3 py-2.5 border border-[#9ac1e2] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f]"
            />
            <div className="flex justify-between mt-1.5">
              <span className={`text-xs ${titulo.trim().length >= 10 ? 'text-emerald-600' : 'text-[#9ac1e2]'}`}>
                {titulo.trim().length >= 10 ? '✓ Mínimo cumplido' : 'Mínimo 10 caracteres'}
              </span>
              <span className="text-xs text-[#9ac1e2]">{titulo.length}/200</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#13293d] mb-1.5">
              Contenido <span className="text-red-500">*</span>
            </label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={6}
              maxLength={5000}
              placeholder="Explica tu pregunta o el tema a discutir con detalle..."
              className="w-full px-3 py-2.5 border border-[#9ac1e2] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f] resize-none"
            />
            <div className="flex justify-between mt-1.5">
              <span className={`text-xs ${contenido.trim().length >= 20 ? 'text-emerald-600' : 'text-[#9ac1e2]'}`}>
                {contenido.trim().length >= 20 ? '✓ Mínimo cumplido' : 'Mínimo 20 caracteres'}
              </span>
              <span className="text-xs text-[#9ac1e2]">{contenido.length}/5000</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-6 py-4 border-t border-[#d8e9f5] shrink-0 bg-[#f8fbfe]">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-[#16324f] hover:bg-[#d8e9f5] rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || !tituloOk || !contenidoOk || !categoriaOk}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2a628f] hover:bg-[#18435a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {mutation.isPending && <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />}
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Post card ─────────────────────────────────────────────────────────────────
function PostCard({ post }: { post: PostForo }) {
  const c = catColor(post.categoria);
  return (
    <Link
      to={`/foros/${post.id}`}
      className="block bg-white rounded-xl border border-[#d8e9f5] hover:border-[#9ac1e2] hover:shadow-md transition-all overflow-hidden group"
    >
      <div className={`h-0.5 w-full ${c.bar}`} />
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          {post.fijado === 1 && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
              <PushPin weight="fill" className="h-3 w-3" /> Fijado
            </span>
          )}
          {post.resuelto === 1 && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
              <CheckCircle weight="fill" className="h-3 w-3" /> Resuelto
            </span>
          )}
          <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
            {post.categoria}
          </span>
        </div>

        <h3 className="text-base font-semibold text-[#13293d] leading-snug line-clamp-2 mb-3 group-hover:text-[#2a628f] transition-colors">
          {post.titulo}
        </h3>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`h-7 w-7 rounded-full ${avatarBg(post.usuario_nombre)} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
              {getInitials(post.usuario_nombre)}
            </div>
            <span className="text-sm font-medium text-[#16324f] truncate">{post.usuario_nombre}</span>
            <span className="text-xs text-[#9ac1e2] shrink-0 hidden sm:inline">{tiempoRelativo(post.created_at)}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs text-[#9ac1e2]">
            <span className="inline-flex items-center gap-1">
              <ChatCircle weight="duotone" className="h-4 w-4" />
              {post.total_respuestas}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye weight="duotone" className="h-4 w-4" />
              {post.vistas}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#2a628f]">
              <ThumbsUp weight="duotone" className="h-4 w-4" />
              {post.votos}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Foros() {
  const { isAuthenticated } = useAuthStore();
  const qc = useQueryClient();

  const [buscar, setBuscar]           = useState('');
  const [buscarInput, setBuscarInput] = useState('');
  const [categoria, setCategoria]     = useState('');
  const [orden, setOrden]             = useState('recientes');
  const [pagina, setPagina]           = useState(1);
  const [showModal, setShowModal]     = useState(false);

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
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#13293d] via-[#18435a] to-[#2a628f] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                <Users weight="duotone" className="h-4 w-4 text-[#9ac1e2]" />
                <span className="text-xs text-[#b2d3ea] font-medium">Comunidad</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Foros de Derecho</h1>
              <p className="text-[#b2d3ea] max-w-xl text-sm sm:text-base">
                Pregunta, debate y aprende con estudiantes y profesionales del Derecho guatemalteco.
              </p>

              <div className="flex flex-wrap gap-3 mt-5">
                {meta && (
                  <div className="bg-white/10 rounded-xl px-4 py-2.5">
                    <p className="text-xl font-bold text-white">{meta.total}</p>
                    <p className="text-xs text-[#9ac1e2]">publicaciones</p>
                  </div>
                )}
                <div className="bg-white/10 rounded-xl px-4 py-2.5">
                  <p className="text-xl font-bold text-white">11</p>
                  <p className="text-xs text-[#9ac1e2]">categorías</p>
                </div>
              </div>
            </div>

            {isAuthenticated && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-5 py-3 bg-white text-[#13293d] font-semibold text-sm rounded-xl hover:bg-[#d8e9f5] transition-colors shadow-lg shrink-0 self-start sm:self-auto"
              >
                <Plus weight="bold" className="h-4 w-4" />
                Nueva publicación
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── CTA no autenticados ── */}
        {!isAuthenticated && (
          <div className="mb-6 bg-white rounded-2xl border border-[#d8e9f5] shadow-sm p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-[#2a628f]/10 flex items-center justify-center shrink-0">
              <ChatCircle weight="duotone" className="h-5 w-5 text-[#2a628f]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-semibold text-[#13293d]">Únete a la conversación</p>
              <p className="text-xs text-[#16324f] mt-0.5">Inicia sesión para publicar preguntas, responder y votar.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link
                to="/login"
                className="px-4 py-2 bg-[#2a628f] text-white text-xs font-semibold rounded-lg hover:bg-[#18435a] transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="px-4 py-2 border border-[#2a628f] text-[#2a628f] text-xs font-semibold rounded-lg hover:bg-[#d8e9f5] transition-colors"
              >
                Registrarse
              </Link>
            </div>
          </div>
        )}

        {/* ── Búsqueda + orden ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <MagnifyingGlass weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ac1e2]" />
              <input
                value={buscarInput}
                onChange={(e) => setBuscarInput(e.target.value)}
                placeholder="Buscar publicaciones..."
                className="w-full pl-9 pr-3 py-2.5 border border-[#9ac1e2] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f] bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2a628f] text-white text-sm font-semibold rounded-xl hover:bg-[#18435a] transition-colors"
            >
              Buscar
            </button>
            {buscar && (
              <button
                type="button"
                onClick={() => { setBuscar(''); setBuscarInput(''); }}
                className="px-3 py-2 border border-[#9ac1e2] text-[#16324f] text-sm rounded-xl hover:bg-white transition-colors"
              >
                <IconX size={16} />
              </button>
            )}
          </form>

          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="px-3 py-2.5 border border-[#9ac1e2] rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-[#16324f]"
          >
            {ORDEN_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* ── Categorías ── */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setCategoria('')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              categoria === ''
                ? 'bg-[#2a628f] text-white shadow-sm'
                : 'bg-white border border-[#9ac1e2] text-[#16324f] hover:bg-[#d8e9f5]'
            }`}
          >
            Todas
          </button>
          {CATEGORIAS.map((c) => {
            const col = CAT_COLORS[c] ?? DEFAULT_CAT;
            const isActive = categoria === c;
            return (
              <button
                key={c}
                onClick={() => setCategoria(categoria === c ? '' : c)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                  isActive
                    ? `${col.bg} ${col.text} ${col.border}`
                    : 'bg-white border-[#9ac1e2] text-[#16324f] hover:bg-[#d8e9f5]'
                }`}
              >
                {isActive && <span className={`h-1.5 w-1.5 rounded-full ${col.bar}`} />}
                {c}
              </button>
            );
          })}
        </div>

        {/* ── Content ── */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <CircleNotch weight="bold" className="h-8 w-8 text-[#2a628f] animate-spin" />
          </div>
        )}

        {isError && (
          <div className="text-center py-16 text-red-600 text-sm">
            Error al cargar los foros. Intenta de nuevo más tarde.
          </div>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <div className="text-center py-16">
            <div className="h-16 w-16 rounded-2xl bg-[#2a628f]/10 flex items-center justify-center mx-auto mb-4">
              <ChatCircle weight="duotone" className="h-8 w-8 text-[#2a628f]" />
            </div>
            <p className="text-lg font-semibold text-[#13293d] mb-1">No hay publicaciones</p>
            <p className="text-sm text-[#9ac1e2]">
              {buscar
                ? `No se encontró nada para "${buscar}".`
                : isAuthenticated
                ? '¡Sé el primero en publicar!'
                : 'Inicia sesión para publicar.'}
            </p>
            {buscar && (
              <button
                onClick={() => { setBuscar(''); setBuscarInput(''); }}
                className="mt-4 text-sm text-[#2a628f] hover:underline"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}

        {!isLoading && posts.length > 0 && (
          <div className="space-y-3">
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
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
              <CaretLeft weight="bold" className="h-4 w-4" />
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
                    className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
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
              <CaretRight weight="bold" className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <ModalNuevoPost
          onClose={() => setShowModal(false)}
          onSuccess={() => qc.invalidateQueries({ queryKey: ['foros'] })}
        />
      )}
    </div>
  );
}
