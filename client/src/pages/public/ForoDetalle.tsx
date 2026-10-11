import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ThumbsUp, ChatCircle, Eye, PushPin, CheckCircle,
  ArrowLeft, CircleNotch, Warning, Trash, Medal,
} from '@phosphor-icons/react';
import { useAuthStore } from '../../store/authStore';

const API = import.meta.env.VITE_API_URL ?? '';

// ── Types ─────────────────────────────────────────────────────────────────────
interface PostDetalle {
  id: string;
  titulo: string;
  contenido: string;
  categoria: string;
  usuario_id: string;
  usuario_nombre: string;
  votos: number;
  vistas: number;
  total_respuestas: number;
  resuelto: number;
  fijado: number;
  created_at: string;
  updated_at: string;
}

interface Respuesta {
  id: string;
  post_id: string;
  contenido: string;
  usuario_id: string;
  usuario_nombre: string;
  votos: number;
  es_solucion: number;
  created_at: string;
}

interface DetalleResponse {
  ok: boolean;
  data: { post: PostDetalle; respuestas: Respuesta[] };
}

// ── Helpers ───────────────────────────────────────────────────────────────────
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

// ── Tarjeta de respuesta ──────────────────────────────────────────────────────
interface RespuestaCardProps {
  respuesta: Respuesta;
  postAutorId: string;
  postResuelto: boolean;
  votosLocales: Record<string, number>;
  onVotar: (id: string) => void;
  onSolucion: (id: string) => void;
  isVotando: boolean;
  isSolucionando: boolean;
}

function RespuestaCard({
  respuesta, postAutorId, postResuelto, votosLocales,
  onVotar, onSolucion, isVotando, isSolucionando,
}: RespuestaCardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const esSolucion   = respuesta.es_solucion === 1;
  const esAuthorPost = isAuthenticated && user?.id === postAutorId;
  const esAdmin      = user?.rol === 'SUPER_ADMIN' || user?.rol === 'ADMIN';
  const puedeMarcar  = esAuthorPost || esAdmin;
  const votosMostrados = votosLocales[respuesta.id] ?? respuesta.votos;

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${
      esSolucion
        ? 'border-emerald-300 bg-emerald-50 shadow-sm'
        : 'border-[#d8e9f5] bg-white'
    }`}>
      {esSolucion && (
        <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-xs font-semibold">
          <Medal weight="fill" className="h-4 w-4" />
          Mejor respuesta
        </div>
      )}

      {/* Author header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-[#d8e9f5]">
        <div className={`h-8 w-8 rounded-full ${avatarBg(respuesta.usuario_nombre)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
          {getInitials(respuesta.usuario_nombre)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#13293d] truncate">{respuesta.usuario_nombre}</p>
          <p className="text-xs text-[#9ac1e2]">{tiempoRelativo(respuesta.created_at)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        <p className="text-[#16324f] text-sm leading-relaxed whitespace-pre-wrap">
          {respuesta.contenido}
        </p>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-3 px-5 pb-4 flex-wrap">
        <button
          onClick={() => onVotar(respuesta.id)}
          disabled={!isAuthenticated || isVotando}
          title={isAuthenticated ? 'Votar' : 'Inicia sesión para votar'}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors border ${
            isAuthenticated
              ? 'text-[#2a628f] border-[#9ac1e2] hover:bg-[#d8e9f5]'
              : 'text-[#9ac1e2] border-[#d8e9f5] cursor-not-allowed'
          }`}
        >
          <ThumbsUp weight={isAuthenticated ? 'duotone' : 'regular'} className="h-4 w-4" />
          {votosMostrados}
        </button>

        {puedeMarcar && !postResuelto && !esSolucion && (
          <button
            onClick={() => onSolucion(respuesta.id)}
            disabled={isSolucionando}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-emerald-700 border border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <CheckCircle weight="duotone" className="h-4 w-4" />
            Marcar como solución
          </button>
        )}

        {puedeMarcar && esSolucion && (
          <button
            onClick={() => onSolucion(respuesta.id)}
            disabled={isSolucionando}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#9ac1e2] border border-[#d8e9f5] hover:bg-[#d8e9f5] transition-colors"
          >
            <CheckCircle weight="duotone" className="h-4 w-4" />
            Desmarcar solución
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ForoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { token, user, isAuthenticated } = useAuthStore();

  const [respuesta, setRespuesta]       = useState('');
  const [respuestaError, setRespuestaError] = useState('');
  const [votosPost, setVotosPost]       = useState(0);
  const [votosResp, setVotosResp]       = useState<Record<string, number>>({});

  const { data, isLoading, isError } = useQuery<DetalleResponse>({
    queryKey: ['foro-detalle', id],
    queryFn: async () => {
      const res = await fetch(`${API}/api/foros/${id}`);
      return res.json();
    },
    enabled: !!id,
  });

  const post       = data?.data.post;
  const respuestas = data?.data.respuestas ?? [];

  const votarPostMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/api/foros/${id}/votar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
    onSuccess: (json) => {
      setVotosPost((prev) => prev + (json.accion === 'agregado' ? 1 : -1));
    },
  });

  const votarRespMutation = useMutation({
    mutationFn: async (respuestaId: string) => {
      const res = await fetch(`${API}/api/foros/respuestas/${respuestaId}/votar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      return { ...(await res.json()), respuestaId };
    },
    onSuccess: ({ accion, respuestaId }) => {
      setVotosResp((prev) => ({
        ...prev,
        [respuestaId]: (prev[respuestaId] ?? 0) + (accion === 'agregado' ? 1 : -1),
      }));
    },
  });

  const publicarMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/api/foros/${id}/respuestas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ contenido: respuesta }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? 'Error al publicar');
      return json;
    },
    onSuccess: () => {
      setRespuesta('');
      setRespuestaError('');
      qc.invalidateQueries({ queryKey: ['foro-detalle', id] });
      qc.invalidateQueries({ queryKey: ['foros'] });
    },
    onError: (e: Error) => setRespuestaError(e.message),
  });

  const solucionMutation = useMutation({
    mutationFn: async (respuestaId: string) => {
      const res = await fetch(`${API}/api/foros/respuestas/${respuestaId}/solucion`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['foro-detalle', id] });
      qc.invalidateQueries({ queryKey: ['foros'] });
    },
  });

  const eliminarMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/api/foros/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? 'Error al eliminar');
      return json;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['foros'] });
      navigate('/foros');
    },
  });

  const puedeEliminar =
    isAuthenticated && post &&
    (user?.id === post.usuario_id || user?.rol === 'SUPER_ADMIN' || user?.rol === 'ADMIN');

  const esAuthorPost        = isAuthenticated && post && user?.id === post.usuario_id;
  const esAdmin             = user?.rol === 'SUPER_ADMIN' || user?.rol === 'ADMIN';
  const puedeMarcarSolucion = esAuthorPost || esAdmin;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center">
        <CircleNotch weight="bold" className="h-10 w-10 text-[#2a628f] animate-spin" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex flex-col items-center justify-center gap-4 text-[#13293d]">
        <Warning weight="duotone" className="h-10 w-10 text-red-500" />
        <p className="text-lg font-semibold">No se encontró la publicación.</p>
        <Link to="/foros" className="text-[#2a628f] underline text-sm">
          Volver a los foros
        </Link>
      </div>
    );
  }

  const c = catColor(post.categoria);
  const votosPostMostrados = post.votos + votosPost;

  const votosRespLocales: Record<string, number> = {};
  respuestas.forEach((r) => {
    votosRespLocales[r.id] = r.votos + (votosResp[r.id] ?? 0);
  });

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Back ── */}
        <Link
          to="/foros"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#16324f] hover:text-[#2a628f] mb-6 transition-colors"
        >
          <ArrowLeft weight="bold" className="h-4 w-4" />
          Volver a los foros
        </Link>

        {/* ── Post card ── */}
        <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden mb-6">
          <div className={`h-1 w-full ${c.bar}`} />

          {/* Post header */}
          <div className="px-6 pt-5 pb-4 border-b border-[#d8e9f5]">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {post.fijado === 1 && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                  <PushPin weight="fill" className="h-3 w-3" /> Fijado
                </span>
              )}
              {post.resuelto === 1 && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <CheckCircle weight="fill" className="h-3 w-3" /> Resuelto
                </span>
              )}
              <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
                {post.categoria}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#13293d] leading-snug">
              {post.titulo}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <div className={`h-8 w-8 rounded-full ${avatarBg(post.usuario_nombre)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {getInitials(post.usuario_nombre)}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#13293d]">{post.usuario_nombre}</p>
                <p className="text-xs text-[#9ac1e2]">{tiempoRelativo(post.created_at)}</p>
              </div>
            </div>
          </div>

          {/* Post content */}
          <div className="px-6 py-5">
            <p className="text-[#16324f] text-sm leading-relaxed whitespace-pre-wrap">
              {post.contenido}
            </p>
          </div>

          {/* Post footer */}
          <div className="flex items-center justify-between flex-wrap gap-3 px-6 py-4 border-t border-[#d8e9f5] bg-[#f8fbfe]">
            <div className="flex items-center gap-4 text-xs text-[#9ac1e2]">
              <span className="inline-flex items-center gap-1">
                <Eye weight="duotone" className="h-4 w-4" />
                {post.vistas} vistas
              </span>
              <span className="inline-flex items-center gap-1">
                <ChatCircle weight="duotone" className="h-4 w-4" />
                {post.total_respuestas} {post.total_respuestas === 1 ? 'respuesta' : 'respuestas'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => votarPostMutation.mutate()}
                disabled={!isAuthenticated || votarPostMutation.isPending}
                title={isAuthenticated ? 'Votar' : 'Inicia sesión para votar'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                  isAuthenticated
                    ? 'border-[#9ac1e2] text-[#2a628f] hover:bg-[#d8e9f5]'
                    : 'border-[#d8e9f5] text-[#9ac1e2] cursor-not-allowed'
                }`}
              >
                <ThumbsUp weight="duotone" className="h-4 w-4" />
                {votosPostMostrados}
              </button>

              {puedeEliminar && (
                <button
                  onClick={() => {
                    if (confirm('¿Eliminar esta publicación? Esta acción no se puede deshacer.')) {
                      eliminarMutation.mutate();
                    }
                  }}
                  disabled={eliminarMutation.isPending}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {eliminarMutation.isPending
                    ? <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />
                    : <Trash weight="duotone" className="h-4 w-4" />}
                  {eliminarMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                </button>
              )}
              {eliminarMutation.isError && (
                <span className="text-xs text-red-600">
                  {(eliminarMutation.error as Error).message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Sección respuestas ── */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-[#9ac1e2]/40" />
          <span className="text-sm font-semibold text-[#16324f] whitespace-nowrap">
            {respuestas.length === 0
              ? 'Sin respuestas aún'
              : `${respuestas.length} ${respuestas.length === 1 ? 'respuesta' : 'respuestas'}`}
          </span>
          <div className="h-px flex-1 bg-[#9ac1e2]/40" />
        </div>

        {respuestas.length > 0 && (
          <div className="space-y-4 mb-8">
            {respuestas.map((r) => (
              <RespuestaCard
                key={r.id}
                respuesta={r}
                postAutorId={post.usuario_id}
                postResuelto={post.resuelto === 1}
                votosLocales={votosRespLocales}
                onVotar={(rid) => votarRespMutation.mutate(rid)}
                onSolucion={(rid) => {
                  if (puedeMarcarSolucion) solucionMutation.mutate(rid);
                }}
                isVotando={votarRespMutation.isPending}
                isSolucionando={solucionMutation.isPending}
              />
            ))}
          </div>
        )}

        {/* ── Formulario de respuesta ── */}
        {isAuthenticated ? (
          <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[#d8e9f5]">
              <div className={`h-8 w-8 rounded-full ${avatarBg(user?.nombre ?? '')} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {getInitials(user?.nombre ?? 'U')}
              </div>
              <p className="text-sm font-semibold text-[#13293d]">Tu respuesta</p>
            </div>

            <div className="p-6">
              {respuestaError && (
                <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <Warning weight="fill" className="h-4 w-4 shrink-0" />
                  {respuestaError}
                </div>
              )}

              <textarea
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                rows={5}
                maxLength={3000}
                placeholder="Escribe tu respuesta aquí... (mínimo 10 caracteres)"
                className="w-full px-3 py-2.5 border border-[#9ac1e2] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f] resize-none mb-3"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9ac1e2]">{respuesta.length}/3000</span>
                <button
                  onClick={() => publicarMutation.mutate()}
                  disabled={publicarMutation.isPending || respuesta.trim().length < 10}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2a628f] hover:bg-[#18435a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  {publicarMutation.isPending && <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />}
                  Publicar respuesta
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#d8e9f5] p-8 text-center shadow-sm">
            <div className="h-12 w-12 rounded-2xl bg-[#2a628f]/10 flex items-center justify-center mx-auto mb-3">
              <ChatCircle weight="duotone" className="h-6 w-6 text-[#2a628f]" />
            </div>
            <p className="text-sm font-semibold text-[#13293d] mb-1">¿Tienes algo que aportar?</p>
            <p className="text-xs text-[#16324f] mb-5">
              Inicia sesión para responder a esta publicación.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 bg-[#2a628f] text-white text-sm font-semibold rounded-xl hover:bg-[#18435a] transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="px-5 py-2.5 border border-[#2a628f] text-[#2a628f] text-sm font-semibold rounded-xl hover:bg-[#d8e9f5] transition-colors"
              >
                Registrarse gratis
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
