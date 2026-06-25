import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Calendar, Plus, Zap, AlertCircle, Loader2, ArrowRight, Trash2, Clock,
} from 'lucide-react';
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

function semanasHastaFecha(fecha: string): number {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const target = new Date(fecha);
  const diff = Math.ceil((target.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24 * 7));
  return Math.max(0, diff);
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

  const semanasDisponiblesReales = fechaExamen ? semanasHastaFecha(fechaExamen) : null;

  // Error bloqueante: la fecha ingresada no cubre las semanas seleccionadas
  const errorFecha =
    semanasDisponiblesReales !== null && semanasDisponiblesReales < semanas
      ? semanasDisponiblesReales === 0
        ? 'La fecha de examen ya pasó o es esta semana. Elige una fecha futura.'
        : `Tu examen es en ${semanasDisponiblesReales} semana${semanasDisponiblesReales !== 1 ? 's' : ''}, pero el plan requiere ${semanas}. Reduce las semanas o elige una fecha más lejana.`
      : null;

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

  const puedeCrear = !!fechaExamen && !errorFecha && !mutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4 pb-4 sm:pb-0">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] sm:max-h-none sm:h-auto flex flex-col overflow-y-auto sm:overflow-visible p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-[#13293d] mb-4">Crear plan de estudio</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex gap-2 shrink-0">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <div className="space-y-4 flex-1 overflow-y-auto sm:overflow-visible">
          <div>
            <label className="block text-sm font-medium text-[#13293d] mb-1">
              Tipo de examen
            </label>
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
            <label className="block text-sm font-medium text-[#13293d] mb-1">
              Nivel actual
            </label>
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
              Fecha del examen
            </label>
            <input
              type="date"
              value={fechaExamen}
              onChange={(e) => setFechaExamen(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errorFecha
                  ? 'border-red-400 focus:ring-red-300'
                  : 'border-[#9ac1e2] focus:ring-[#2a628f]'
              }`}
            />
            {errorFecha && (
              <div className="mt-2 p-2.5 bg-red-50 border border-red-200 rounded-lg flex gap-2 text-xs text-red-700">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                {errorFecha}
              </div>
            )}
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
                onChange={(e) => setSemanas(Number(e.target.value))}
                className="flex-1 accent-[#2a628f]"
              />
              <span className="text-2xl font-bold text-[#2a628f] w-12 text-center">
                {semanas}
              </span>
            </div>
            <p className="text-xs text-[#9ac1e2] mt-1">Mínimo 4, máximo 16 semanas</p>

          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 shrink-0 pt-4 border-t border-[#d8e9f5]">
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
            {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Crear plan
          </button>
        </div>
      </div>
    </div>
  );
}

function diasHastaFecha(fecha: string): number {
  const hoy = new Date(); hoy.setHours(0,0,0,0);
  return Math.ceil((new Date(fecha).getTime() - hoy.getTime()) / (1000*60*60*24));
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

  const planes = data?.data ?? [];
  const idUrgente = planMasUrgente(planes);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#16324f] mb-4">Inicia sesión para crear planes de estudio</p>
          <Link to="/login" className="text-[#2a628f] underline">
            Ir a login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 flex items-center gap-3">
            <Calendar className="h-10 w-10" />
            Planes de Estudio
          </h1>
          <p className="text-lg text-[#b2d3ea]">
            Organiza tu preparación con un calendario personalizado según tu examen y disponibilidad.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header de lista */}
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
            <Plus className="h-5 w-5" />
            Crear nuevo plan
          </button>
        </div>

        {/* Content */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 text-[#2a628f] animate-spin" />
          </div>
        )}

        {planes.length === 0 && !isLoading && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-[#9ac1e2] p-12 text-center">
            <Calendar className="h-16 w-16 text-[#9ac1e2] mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[#13293d] mb-2">
              Aún no tienes planes de estudio
            </h2>
            <p className="text-[#16324f] mb-6">
              Crea tu primer plan y recibe un calendario semanal personalizado con recursos específicos para tu examen.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2a628f] text-white rounded-lg hover:bg-[#18435a] font-medium transition-colors"
            >
              <Zap className="h-5 w-5" />
              Crear plan ahora
            </button>
          </div>
        )}

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

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-xl border-2 transition-all ${
                    urgente
                      ? 'border-red-300 shadow-md shadow-red-100'
                      : esPrioritario
                      ? 'border-amber-300 shadow-md shadow-amber-50'
                      : 'border-[#9ac1e2]'
                  }`}
                >
                  {/* Badge urgencia */}
                  {urgente && (
                    <div className="absolute -top-3 left-4 flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                      <Clock className="h-3 w-3" />
                      ¡Examen en {diasRestantes} días!
                    </div>
                  )}
                  {!urgente && esPrioritario && planes.length > 1 && (
                    <div className="absolute -top-3 left-4 bg-amber-400 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                      Más próximo
                    </div>
                  )}

                  <Link to={`/planes/${plan.id}`} className="block p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-[#13293d]">{nombreExamen}</h3>
                          <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            {nombreFase}
                          </span>
                        </div>
                        <p className="text-sm text-[#16324f] mb-4">
                          {plan.semanas_disponibles} semanas · {plan.total_semanas} semanas del plan
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
                        <p className="text-xs text-[#9ac1e2] mt-2">
                          {plan.semanas_completadas} de {plan.total_semanas} semanas completadas
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-[#9ac1e2] mt-1 flex-shrink-0" />
                    </div>
                  </Link>

                  {/* Botón eliminar */}
                  <div className="px-6 pb-4 flex justify-end">
                    <button
                      onClick={() => setConfirmDeleteId(plan.id)}
                      className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
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
                <Trash2 className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-[#13293d] mb-2">¿Eliminar este plan?</h3>
              <p className="text-sm text-[#64748b] mb-6">Esta acción no se puede deshacer. Se eliminarán el plan y todo su progreso.</p>
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
                  {deleteMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <ModalNuevoPlan
          onClose={() => setShowModal(false)}
          onSuccess={() => qc.invalidateQueries({ queryKey: ['planes'] })}
        />
      )}
    </div>
  );
}
