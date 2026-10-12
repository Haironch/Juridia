import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  CalendarBlank, Plus, Lightning, WarningCircle, CircleNotch,
  ArrowRight, Trash, Clock, CheckCircle, ArrowSquareRight,
  BookOpen, Trophy, ChartLineUp,
} from '@phosphor-icons/react';
import { IconX } from '@tabler/icons-react';
import { useAuthStore } from '../../store/authStore';

const API = import.meta.env.VITE_API_URL ?? '';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Plan {
  id: string;
  examen: string;
  fase: string;
  semanas_disponibles: number;
  fecha_examen: string | null;
  total_semanas: number;
  semanas_completadas: number;
  created_at: string;
}

interface PlanesResponse {
  ok: boolean;
  data: Plan[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const NOMBRES_EXAMEN: Record<string, string> = {
  privado: 'Examen Privado',
  civil: 'Derecho Civil',
  penal: 'Derecho Penal',
  laboral: 'Derecho Laboral',
};

const NOMBRES_FASE: Record<string, string> = {
  basica: 'Básico',
  intermedia: 'Intermedio',
  avanzada: 'Avanzado',
};

const EXAMEN_COLOR: Record<string, { bg: string; text: string; dot: string }> = {
  privado: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  civil:   { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500'   },
  penal:   { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500'    },
  laboral: { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500'  },
};

function diasHastaFecha(fecha: string): number {
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  return Math.ceil((new Date(fecha).getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
}

function esUrgente(plan: Plan): boolean {
  if (!plan.fecha_examen) return false;
  return diasHastaFecha(plan.fecha_examen) <= 14;
}

function planMasUrgente(planes: Plan[]): string | null {
  const conFecha = planes.filter(p => p.fecha_examen);
  if (!conFecha.length) return null;
  return conFecha.sort((a, b) =>
    new Date(a.fecha_examen!).getTime() - new Date(b.fecha_examen!).getTime()
  )[0].id;
}

// ── Modal crear plan ──────────────────────────────────────────────────────────
interface ModalProps { onClose: () => void; onSuccess: () => void; }

function ModalNuevoPlan({ onClose, onSuccess }: ModalProps) {
  const { token } = useAuthStore();
  const [examen, setExamen] = useState('privado');
  const [fase, setFase] = useState('basica');
  const [semanas, setSemanas] = useState(8);
  const [fechaExamen, setFechaExamen] = useState('');
  const [error, setError] = useState('');

  // Fecha mínima = hoy + semanas seleccionadas
  const minFecha = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + semanas * 7);
    return d.toISOString().split('T')[0];
  })();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/api/planes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          examen,
          fase,
          semanas_disponibles: semanas,
          fecha_examen: fechaExamen || undefined,
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? 'Error al crear plan');
      return json;
    },
    onSuccess: () => { onSuccess(); onClose(); },
    onError: (e: Error) => setError(e.message),
  });

  const puedeCrear = !!fechaExamen && !mutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4 pb-4 sm:pb-0">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] sm:max-h-none sm:h-auto flex flex-col overflow-hidden">
        {/* Header del modal */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#d8e9f5] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d8e9f5] flex items-center justify-center">
              <CalendarBlank weight="duotone" className="w-5 h-5 text-[#2a628f]" />
            </div>
            <h2 className="text-xl font-bold text-[#13293d]">Crear plan de estudio</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9ac1e2] hover:text-[#13293d] hover:bg-[#f0f7ff] transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex gap-2">
              <WarningCircle weight="bold" className="h-4 w-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#13293d] mb-1">Tipo de examen</label>
            <select
              value={examen}
              onChange={(e) => setExamen(e.target.value)}
              className="w-full px-3 py-2 border border-[#9ac1e2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f]"
            >
              <option value="privado">Examen Privado</option>
              <option value="civil">Derecho Civil</option>
              <option value="penal">Derecho Penal</option>
              <option value="laboral">Derecho Laboral</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#13293d] mb-1">Nivel actual</label>
            <select
              value={fase}
              onChange={(e) => setFase(e.target.value)}
              className="w-full px-3 py-2 border border-[#9ac1e2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f]"
            >
              <option value="basica">Básico (sin conocimientos previos)</option>
              <option value="intermedia">Intermedio (tengo noción)</option>
              <option value="avanzada">Avanzado (domino el tema)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#13293d] mb-1">
              Semanas disponibles para estudiar
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="4"
                max="16"
                value={semanas}
                onChange={(e) => {
                  const nuevas = Number(e.target.value);
                  setSemanas(nuevas);
                  if (fechaExamen) {
                    const minNuevo = new Date();
                    minNuevo.setHours(0, 0, 0, 0);
                    minNuevo.setDate(minNuevo.getDate() + nuevas * 7);
                    if (new Date(fechaExamen) < minNuevo) setFechaExamen('');
                  }
                }}
                className="flex-1 accent-[#2a628f]"
              />
              <span className="text-2xl font-bold text-[#2a628f] w-12 text-center">{semanas}</span>
            </div>
            <p className="text-xs text-[#9ac1e2] mt-1">Mínimo 4, máximo 16 semanas</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#13293d] mb-1">Fecha del examen</label>
            <input
              type="date"
              value={fechaExamen}
              min={minFecha}
              onChange={(e) => setFechaExamen(e.target.value)}
              className="w-full px-3 py-2 border border-[#9ac1e2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f]"
            />
            <p className="text-xs text-[#9ac1e2] mt-1">
              Elige una fecha a partir del {new Date(minFecha).toLocaleDateString('es-GT', { day: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-5 py-4 border-t border-[#d8e9f5] shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-3 sm:py-2 text-sm font-medium text-[#16324f] hover:text-[#13293d] hover:bg-[#f0f7ff] rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => mutation.mutate()}
            disabled={!puedeCrear}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:py-2 bg-[#2a628f] hover:bg-[#18435a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            {mutation.isPending && <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />}
            Crear plan
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Hero no autenticado ───────────────────────────────────────────────────────
function HeroNoAuth() {
  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Hero oscuro */}
      <div className="bg-gradient-to-br from-[#13293d] via-[#18435a] to-[#2a628f] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#b2d3ea] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Lightning weight="fill" className="w-4 h-4 text-yellow-300" />
            Planes de Estudio Personalizados
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Prepárate con un plan<br />
            <span className="text-[#9ac1e2]">diseñado para tu examen</span>
          </h1>
          <p className="text-lg text-[#b2d3ea] mb-10 max-w-2xl mx-auto">
            Crea un calendario semanal personalizado según tu nivel, disponibilidad y fecha de examen.
            Recursos específicos en cada etapa del camino.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#13293d] font-semibold rounded-xl hover:bg-[#d8e9f5] transition-colors"
            >
              Iniciar sesión
              <ArrowSquareRight weight="bold" className="w-5 h-5" />
            </Link>
            <Link
              to="/registro"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-colors"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </div>
      </div>

      {/* Características */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-[#13293d] text-center mb-10">
          ¿Cómo funciona?
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: <CalendarBlank weight="duotone" className="w-7 h-7 text-[#2a628f]" />,
              title: 'Plan semanal',
              desc: 'Recibe un calendario con semanas específicas, objetivos claros y recursos para cada etapa.',
            },
            {
              icon: <BookOpen weight="duotone" className="w-7 h-7 text-[#2a628f]" />,
              title: 'Recursos integrados',
              desc: 'Cada semana enlaza directamente con glosarios, quizzes, casos prácticos y material de estudio.',
            },
            {
              icon: <ChartLineUp weight="duotone" className="w-7 h-7 text-[#2a628f]" />,
              title: 'Seguimiento de progreso',
              desc: 'Marca semanas completadas y observa tu avance porcentual en tiempo real.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#d8e9f5] p-6">
              <div className="w-12 h-12 bg-[#f0f7ff] rounded-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-[#13293d] mb-2">{item.title}</h3>
              <p className="text-sm text-[#16324f] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Tipos de examen */}
        <div className="mt-12 bg-white rounded-2xl border border-[#d8e9f5] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Trophy weight="duotone" className="w-6 h-6 text-[#2a628f]" />
            <h3 className="font-bold text-[#13293d] text-lg">Exámenes disponibles</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(NOMBRES_EXAMEN).map(([key, nombre]) => {
              const col = EXAMEN_COLOR[key] ?? { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };
              return (
                <div key={key} className={`flex items-center gap-2 px-4 py-3 rounded-xl ${col.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${col.dot} shrink-0`} />
                  <span className={`text-sm font-medium ${col.text}`}>{nombre}</span>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-[#16324f] mt-4 text-center">
            Disponible en nivel Básico, Intermedio y Avanzado
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function PlanesEstudio() {
  const { isAuthenticated, token } = useAuthStore();
  const qc = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery<PlanesResponse>({
    queryKey: ['planes'],
    queryFn: async () => {
      const res = await fetch(`${API}/api/planes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
    enabled: isAuthenticated,
    staleTime: 60_000,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API}/api/planes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['planes'] });
      setConfirmDeleteId(null);
    },
  });

  if (!isAuthenticated) return <HeroNoAuth />;

  const planes = data?.data ?? [];
  const idUrgente = planMasUrgente(planes);

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#13293d] via-[#18435a] to-[#2a628f] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
                  <CalendarBlank weight="duotone" className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Planes de Estudio</h1>
              </div>
              <p className="text-[#b2d3ea] max-w-xl">
                Organiza tu preparación con un calendario personalizado según tu examen y disponibilidad.
              </p>
            </div>
            {!isLoading && planes.length > 0 && (
              <div className="flex gap-3">
                <div className="bg-white/10 rounded-xl px-4 py-3 text-center min-w-[80px]">
                  <p className="text-2xl font-bold text-white">{planes.length}</p>
                  <p className="text-xs text-[#9ac1e2]">plan{planes.length !== 1 ? 'es' : ''}</p>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3 text-center min-w-[80px]">
                  <p className="text-2xl font-bold text-white">
                    {planes.reduce((sum, p) => sum + p.semanas_completadas, 0)}
                  </p>
                  <p className="text-xs text-[#9ac1e2]">semanas</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Barra superior */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#64748b]">
              {planes.length}/2 planes activos
            </span>
            {planes.length >= 2 && (
              <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-2.5 py-0.5 font-medium">
                Límite alcanzado — elimina uno para crear otro
              </span>
            )}
          </div>
          <button
            onClick={() => setShowModal(true)}
            disabled={planes.length >= 2}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2a628f] text-white rounded-lg hover:bg-[#18435a] font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus weight="bold" className="h-5 w-5" />
            Crear nuevo plan
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <CircleNotch weight="bold" className="h-8 w-8 text-[#2a628f] animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {planes.length === 0 && !isLoading && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-[#9ac1e2] p-12 text-center">
            <div className="w-16 h-16 bg-[#f0f7ff] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CalendarBlank weight="duotone" className="h-9 w-9 text-[#9ac1e2]" />
            </div>
            <h2 className="text-lg font-bold text-[#13293d] mb-2">
              Aún no tienes planes de estudio
            </h2>
            <p className="text-[#16324f] mb-6 max-w-sm mx-auto">
              Crea tu primer plan y recibe un calendario semanal personalizado con recursos específicos para tu examen.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2a628f] text-white rounded-lg hover:bg-[#18435a] font-medium transition-colors"
            >
              <Lightning weight="bold" className="h-5 w-5" />
              Crear plan ahora
            </button>
          </div>
        )}

        {/* Lista de planes */}
        {planes.length > 0 && (
          <div className="space-y-4">
            {planes.map((plan) => {
              const progreso = plan.total_semanas > 0
                ? Math.round((plan.semanas_completadas / plan.total_semanas) * 100)
                : 0;
              const nombreExamen = NOMBRES_EXAMEN[plan.examen] ?? plan.examen;
              const nombreFase   = NOMBRES_FASE[plan.fase]   ?? plan.fase;
              const urgente      = esUrgente(plan);
              const esPrioritario = plan.id === idUrgente;
              const diasRestantes = plan.fecha_examen ? diasHastaFecha(plan.fecha_examen) : null;
              const col = EXAMEN_COLOR[plan.examen] ?? { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-xl overflow-hidden border-2 transition-all ${
                    urgente
                      ? 'border-red-300 shadow-md shadow-red-100'
                      : esPrioritario
                      ? 'border-amber-300 shadow-md shadow-amber-50'
                      : 'border-[#9ac1e2] hover:border-[#2a628f] hover:shadow-sm'
                  }`}
                >
                  {/* Barra de color superior */}
                  <div className={`h-0.5 w-full ${urgente ? 'bg-red-400' : col.dot}`} />

                  {/* Badges de urgencia */}
                  {urgente && (
                    <div className="absolute top-3 left-4 flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                      <Clock weight="bold" className="h-3 w-3" />
                      ¡Examen en {diasRestantes} días!
                    </div>
                  )}
                  {!urgente && esPrioritario && planes.length > 1 && (
                    <div className="absolute top-3 left-4 bg-amber-400 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                      Más próximo
                    </div>
                  )}

                  <Link to={`/planes/${plan.id}`} className="block p-5 pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h3 className="text-lg font-bold text-[#13293d] hover:text-[#2a628f] transition-colors">
                            {nombreExamen}
                          </h3>
                          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${col.bg} ${col.text}`}>
                            {nombreFase}
                          </span>
                          {progreso === 100 && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                              <CheckCircle weight="fill" className="h-3.5 w-3.5" />
                              Completado
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-[#16324f] mb-4">
                          {plan.semanas_disponibles} semanas disponibles · {plan.total_semanas} semanas del plan
                          {plan.fecha_examen && ` · Examen: ${new Date(plan.fecha_examen).toLocaleDateString('es-GT')}`}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-[#d8e9f5] rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${urgente ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-[#2a628f] to-[#18435a]'}`}
                              style={{ width: `${progreso}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-[#2a628f] min-w-[3rem] text-right">
                            {progreso}%
                          </span>
                        </div>
                        <p className="text-xs text-[#9ac1e2] mt-1.5">
                          {plan.semanas_completadas} de {plan.total_semanas} semanas completadas
                        </p>
                      </div>
                      <ArrowRight weight="bold" className="h-5 w-5 text-[#9ac1e2] mt-1 flex-shrink-0" />
                    </div>
                  </Link>

                  <div className="px-5 pb-4 flex justify-end">
                    <button
                      onClick={() => setConfirmDeleteId(plan.id)}
                      className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash weight="bold" className="h-3.5 w-3.5" />
                      Eliminar plan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal confirmar eliminación */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmDeleteId(null)} />
            <div className="relative z-10 bg-white rounded-2xl shadow-xl p-7 max-w-sm w-full mx-4 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash weight="bold" className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-[#13293d] mb-2">¿Eliminar este plan?</h3>
              <p className="text-sm text-[#64748b] mb-6">
                Esta acción no se puede deshacer. Se eliminarán el plan y todo su progreso.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-medium text-[#64748b] hover:bg-[#f8fafc] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => deleteMutation.mutate(confirmDeleteId)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deleteMutation.isPending && <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />}
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal crear */}
      {showModal && (
        <ModalNuevoPlan
          onClose={() => setShowModal(false)}
          onSuccess={() => qc.invalidateQueries({ queryKey: ['planes'] })}
        />
      )}
    </div>
  );
}
