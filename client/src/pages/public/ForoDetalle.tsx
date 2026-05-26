import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ThumbsUp, MessageSquare, Eye, Tag, CheckCircle, Pin,
  ArrowLeft, Loader2, AlertCircle, Trash2, Award,
} from 'lucide-react';
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
  const esSolucion = respuesta.es_solucion === 1;
  const esAuthorPost = isAuthenticated && user?.id === postAutorId;
  const esAdmin = user?.rol === 'SUPER_ADMIN' || user?.rol === 'ADMIN';
  const puedeMarcar = esAuthorPost || esAdmin;
  const votosMostrados = (votosLocales[respuesta.id] ?? respuesta.votos);

  return (
    <div
      className={`rounded-xl border p-5 transition-all ${
        esSolucion
          ? 'border-green-300 bg-green-50 shadow-sm'
          : 'border-[#9ac1e2] bg-white'
      }`}
    >
      {esSolucion && (
        <div className="flex items-center gap-2 mb-3 text-green-700 text-sm font-semibold">
          <Award className="h-4 w-4" />
          Mejor respuesta marcada por el autor
        </div>
      )}

      <p className="text-[#13293d] text-sm leading-relaxed whitespace-pre-wrap mb-4">
        {respuesta.contenido}
      </p>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          {/* Votar */}
          <button
            onClick={() => onVotar(respuesta.id)}
            disabled={!isAuthenticated || isVotando}
            title={isAuthenticated ? 'Votar' : 'Inicia sesión para votar'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isAuthenticated
                ? 'text-[#2a628f] hover:bg-[#d8e9f5] border border-[#9ac1e2]'
                : 'text-[#9ac1e2] cursor-not-allowed'
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
            {votosMostrados}
          </button>

          {/* Marcar solución */}
          {puedeMarcar && !postResuelto && !esSolucion && (
            <button
              onClick={() => onSolucion(respuesta.id)}
              disabled={isSolucionando}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-green-700 border border-green-300 hover:bg-green-50 transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
              Marcar como solución
            </button>
          )}

          {/* Desmarcar solución */}
          {puedeMarcar && esSolucion && (
            <button
              onClick={() => onSolucion(respuesta.id)}
              disabled={isSolucionando}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#9ac1e2] border border-[#9ac1e2] hover:bg-[#d8e9f5] transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
              Desmarcar solución
            </button>
          )}
        </div>

        <div className="text-xs text-[#9ac1e2]">
          <span className="font-medium text-[#16324f]">{respuesta.usuario_nombre}</span>
          {' · '}
          {tiempoRelativo(respuesta.created_at)}
        </div>
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

  const [respuesta, setRespuesta] = useState('');
  const [respuestaError, setRespuestaError] = useState('');
  // Optimistic local vote deltas: { [id]: delta }
  const [votosPost, setVotosPost]       = useState(0);
  const [votosResp, setVotosResp]       = useState<Record<string, number>>({});

  // ── Query ──
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

  // ── Votar post ──
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

  // ── Votar respuesta ──
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

  // ── Publicar respuesta ──
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

  // ── Marcar solución ──
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

  // ── Eliminar post ──
  const eliminarMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/api/foros/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
    onSuccess: () => navigate('/foros'),
  });

  const puedeEliminar =
    isAuthenticated &&
    post &&
    (user?.id === post.usuario_id ||
      user?.rol === 'SUPER_ADMIN' ||
      user?.rol === 'ADMIN');

  const esAuthorPost = isAuthenticated && post && user?.id === post.usuario_id;
  const esAdmin = user?.rol === 'SUPER_ADMIN' || user?.rol === 'ADMIN';
  const puedeMarcarSolucion = esAuthorPost || esAdmin;

  // ── Loading / Error ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-[#2a628f] animate-spin" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex flex-col items-center justify-center gap-4 text-[#13293d]">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="text-lg font-medium">No se encontró la publicación.</p>
        <Link to="/foros" className="text-[#2a628f] underline text-sm">
          Volver a los foros
        </Link>
      </div>
    );
  }

  const votosPostMostrados = post.votos + votosPost;

  // build local vote map for respuestas
  const votosRespLocales: Record<string, number> = {};
  respuestas.forEach((r) => {
    votosRespLocales[r.id] = r.votos + (votosResp[r.id] ?? 0);
  });

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Back ── */}
        <Link
          to="/foros"
          className="inline-flex items-center gap-2 text-sm text-[#16324f] hover:text-[#13293d] mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a los foros
        </Link>

        {/* ── Post ── */}
        <div className="bg-white rounded-2xl border border-[#9ac1e2] shadow-sm p-6 mb-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
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

          {/* Title */}
          <h1 className="text-2xl font-bold text-[#13293d] leading-snug mb-4">
            {post.titulo}
          </h1>

          {/* Content */}
          <p className="text-[#16324f] text-sm leading-relaxed whitespace-pre-wrap mb-6">
            {post.contenido}
          </p>

          {/* Meta + actions */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-[#d8e9f5]">
            <div className="flex items-center gap-4 text-xs text-[#9ac1e2]">
              <span className="font-medium text-[#16324f]">{post.usuario_nombre}</span>
              <span>{tiempoRelativo(post.created_at)}</span>
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> {post.vistas} vistas
              </span>
              <span className="inline-flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" /> {post.total_respuestas} respuestas
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Votar post */}
              <button
                onClick={() => votarPostMutation.mutate()}
                disabled={!isAuthenticated || votarPostMutation.isPending}
                title={isAuthenticated ? 'Votar' : 'Inicia sesión para votar'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  isAuthenticated
                    ? 'border-[#9ac1e2] text-[#2a628f] hover:bg-[#d8e9f5]'
                    : 'border-[#9ac1e2] text-[#9ac1e2] cursor-not-allowed'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                {votosPostMostrados}
              </button>

              {/* Eliminar */}
              {puedeEliminar && (
                <button
                  onClick={() => {
                    if (confirm('¿Eliminar esta publicación? Esta acción no se puede deshacer.')) {
                      eliminarMutation.mutate();
                    }
                  }}
                  disabled={eliminarMutation.isPending}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Respuestas ── */}
        <h2 className="text-lg font-bold text-[#13293d] mb-4">
          {respuestas.length === 0
            ? 'Sin respuestas aún'
            : `${respuestas.length} ${respuestas.length === 1 ? 'respuesta' : 'respuestas'}`}
        </h2>

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
          <div className="bg-white rounded-2xl border border-[#9ac1e2] shadow-sm p-6">
            <h3 className="text-base font-bold text-[#13293d] mb-3">Tu respuesta</h3>

            {respuestaError && (
              <div className="mb-3 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {respuestaError}
              </div>
            )}

            <textarea
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              rows={5}
              maxLength={3000}
              placeholder="Escribe tu respuesta aquí... (mínimo 10 caracteres)"
              className="w-full px-3 py-2 border border-[#9ac1e2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f] resize-none mb-2"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9ac1e2]">{respuesta.length}/3000</span>
              <button
                onClick={() => publicarMutation.mutate()}
                disabled={publicarMutation.isPending || respuesta.trim().length < 10}
                className="flex items-center gap-2 px-5 py-2 bg-[#2a628f] hover:bg-[#18435a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
              >
                {publicarMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Publicar respuesta
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#d8e9f5] p-6 text-center">
            <p className="text-sm text-[#16324f] mb-4">
              Inicia sesión para responder a esta publicación.
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
                Registrarse
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
