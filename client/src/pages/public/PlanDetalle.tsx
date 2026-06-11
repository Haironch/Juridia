import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft, Calendar, CheckCircle2, BookOpen,
  Loader2, AlertCircle, Zap, Download, Trash2, ExternalLink,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { generarPlanPDF } from '../../utils/generarPlanPDFProfesional';

const API = import.meta.env.VITE_API_URL ?? '';

// ── Types ─────────────────────────────────────────────────────────────────────
interface SemanaRecurso {
  tipo: 'glosario' | 'quiz' | 'caso' | 'documento' | 'material' | 'lectura' | 'tip' | 'actividad';
  id: string;
  nombre: string;
  duracion?: string;
  descripcion?: string;
}

interface Semana {
  id: string;
  numero_semana: number;
  titulo: string;
  descripcion: string;
  objetivos?: string[];
  recursos: SemanaRecurso[];
  tips?: string[];
  lecturaRecomendada?: { titulo: string; articulo: string; tiempo: string };
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  progreso?: {
    completado: boolean;
    porcentaje: number;
  };
}

interface Plan {
  id: string;
  examen: string;
  fase: string;
  semanas_disponibles: number;
  fecha_examen: string | null;
  created_at: string;
}

interface DetalleResponse {
  ok: boolean;
  data: {
    plan: Plan;
    semanas: Semana[];
  };
}

// Mapeo de recursos a rutas
const RECURSO_RUTAS: Record<string, string> = {
  'glosario': '/glosario',
  'constituquiz-sesion-1': '/constituquiz/estudio/constitucional-1',
  'constitucional-2': '/constituquiz/estudio/constitucional-2',
  'civil-quiz': '/constituquiz/estudio/civil-1',
  'laboral-quiz': '/constituquiz/estudio/laboral-1',
  'examen-simulado': '/examen',
  'repaso-simulado': '/examen',
  'caso-contrato': '/casos',
  'caso-despido': '/casos',
  'caso-familia': '/casos',
  'caso-defensa': '/casos',
  'caso-procesal': '/casos',
  'liquidacion': '/liquidacion',
  'documentos': '/documentos',
  'material': '/material',
  'procedimiento': '/material',
  'constitucion-basico': '/material',
};

function TarjetaSemana({ semana, onToggle, isToggling }: {
  semana: Semana;
  onToggle: (id: string) => void;
  isToggling: boolean;
}) {
  const completada = semana.progreso?.completado ?? false;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl border-2 transition-all ${
        completada
          ? 'border-green-300 bg-green-50'
          : 'border-[#9ac1e2] bg-white hover:border-[#2a628f]'
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start justify-between"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-bold text-[#2a628f] bg-[#d8e9f5] px-3 py-1 rounded-full">
              Semana {semana.numero_semana}
            </span>
            {completada && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded">
                <CheckCircle2 className="h-3.5 w-3.5" /> Completada
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-[#13293d] mb-1">
            {semana.titulo}
          </h3>

          <p className="text-sm text-[#16324f] mb-3 line-clamp-2">
            {semana.descripcion}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#9ac1e2]">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(semana.fecha_inicio).toLocaleDateString('es-GT', { month: 'short', day: 'numeric' })}
              {' - '}
              {new Date(semana.fecha_fin).toLocaleDateString('es-GT', { month: 'short', day: 'numeric' })}
            </span>
            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {semana.recursos.length} recurso{semana.recursos.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(semana.id);
          }}
          disabled={isToggling}
          className={`ml-4 flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            completada
              ? 'bg-green-200 text-green-700 hover:bg-green-300'
              : 'bg-[#d8e9f5] text-[#2a628f] hover:bg-[#9ac1e2]'
          }`}
          title={completada ? 'Marcar como no completada' : 'Marcar como completada'}
        >
          <CheckCircle2 className={`h-5 w-5 transition-transform ${completada ? '' : 'opacity-50'}`} />
        </button>
      </button>

      {expanded && (
        <div className="border-t-2 border-inherit px-5 py-4 bg-opacity-50">
          <h4 className="text-sm font-semibold text-[#13293d] mb-3">
            Recursos para esta semana:
          </h4>

          <div className="space-y-2">
            {semana.recursos.map((recurso, idx) => {
              const ruta = RECURSO_RUTAS[recurso.id] || null;
              const tipoEmoji: Record<string, string> = {
                glosario: '📚',
                quiz: '❓',
                caso: '⚖️',
                documento: '📄',
                material: '📖',
                lectura: '📖',
                tip: '💡',
                actividad: '✍️',
              };

              const content = (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className={`text-sm font-medium transition-colors ${
                      ruta ? 'text-[#13293d] group-hover:text-[#2a628f]' : 'text-[#9ac1e2]'
                    }`}>
                      {tipoEmoji[recurso.tipo]} {recurso.nombre}
                    </p>
                    <p className="text-xs text-[#9ac1e2]">{recurso.tipo}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    {recurso.duracion && (
                      <span className="text-xs text-[#16324f] font-medium whitespace-nowrap">
                        {recurso.duracion}
                      </span>
                    )}
                    {ruta && <ExternalLink className="h-3.5 w-3.5 text-[#9ac1e2] group-hover:text-[#2a628f] transition-colors" />}
                  </div>
                </div>
              );

              return ruta ? (
                <Link
                  key={idx}
                  to={ruta}
                  className="block p-3 rounded-lg border border-[#d8e9f5] hover:border-[#2a628f] hover:bg-white transition-colors group cursor-pointer"
                >
                  {content}
                </Link>
              ) : (
                <div key={idx} className="block p-3 rounded-lg border border-[#d8e9f5] bg-gray-50">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function PlanDetalle() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<DetalleResponse>({
    queryKey: ['plan-detalle', id],
    queryFn: async () => {
      const res = await fetch(`${API}/api/planes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
    enabled: !!id && !!token,
  });

  const toggleMutation = useMutation({
    mutationFn: async (semanaId: string) => {
      const res = await fetch(`${API}/api/planes/semanas/${semanaId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
  });

  // ── Eliminar plan ──
  const eliminarMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/api/planes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al eliminar');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planes'] });
      navigate('/planes');
    },
  });

  const plan = data?.data.plan;
  const semanas = data?.data.semanas ?? [];
  const totalSemanas = semanas.length;
  const semanasCompletas = semanas.filter(s => s.progreso?.completado).length;
  const progreso = totalSemanas > 0 ? Math.round((semanasCompletas / totalSemanas) * 100) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-[#2a628f] animate-spin" />
      </div>
    );
  }

  if (isError || !plan) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-[#13293d] font-medium">Plan no encontrado</p>
        <Link to="/planes" className="text-[#2a628f] underline text-sm">
          Volver a mis planes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link
          to="/planes"
          className="inline-flex items-center gap-2 text-sm text-[#16324f] hover:text-[#13293d] mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a mis planes
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] rounded-2xl p-6 text-white mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">
                Plan de {plan.examen.charAt(0).toUpperCase() + plan.examen.slice(1)}
              </h1>
              <p className="text-[#b2d3ea]">
                Nivel {plan.fase} • {totalSemanas} semanas personalizadas
              </p>
            </div>
            <div className="text-right flex flex-col items-end gap-3">
              <div>
                <div className="text-4xl font-bold">{progreso}%</div>
                <p className="text-sm text-[#b2d3ea]">Completado</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (plan && semanas.length > 0) {
                      generarPlanPDF({
                        examen: plan.examen,
                        fase: plan.fase,
                        fechaExamen: plan.fecha_examen,
                        semanas: semanas.map(s => ({
                          numero_semana: s.numero_semana,
                          titulo: s.titulo,
                          descripcion: s.descripcion,
                          objetivos: s.objetivos,
                          recursos: s.recursos,
                          tips: s.tips,
                          lecturaRecomendada: s.lecturaRecomendada,
                        })),
                      });
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded text-sm transition-colors"
                >
                  <Download className="h-4 w-4" />
                  PDF
                </button>
                <button
                  onClick={() => {
                    if (confirm('¿Eliminar este plan? Esta acción no se puede deshacer.')) {
                      eliminarMutation.mutate();
                    }
                  }}
                  disabled={eliminarMutation.isPending}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 rounded text-sm transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all"
              style={{ width: `${progreso}%` }}
            />
          </div>

          <p className="text-sm text-[#b2d3ea] mt-3">
            {semanasCompletas} de {totalSemanas} semanas completadas
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {semanas.length === 0 ? (
            <div className="text-center py-12 text-[#16324f]">
              <AlertCircle className="h-10 w-10 mx-auto mb-3 text-[#9ac1e2]" />
              <p>No hay semanas en este plan</p>
            </div>
          ) : (
            semanas.map((semana) => (
              <TarjetaSemana
                key={semana.id}
                semana={semana}
                onToggle={(id) => toggleMutation.mutate(id)}
                isToggling={toggleMutation.isPending}
              />
            ))
          )}
        </div>

        {/* CTA Comunidad */}
        {semanasCompletas > 0 && (
          <div className="mt-12 bg-white rounded-2xl border border-[#9ac1e2] p-6">
            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 text-orange-500 shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-[#13293d] mb-2">Dúdas en el camino?</h3>
                <p className="text-sm text-[#16324f] mb-4">
                  Comparte tus dúdas en los foros de la comunidad. Otros estudiantes y profesionales te ayudarán.
                </p>
                <Link
                  to="/foros"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#2a628f] text-white text-sm font-medium rounded-lg hover:bg-[#18435a] transition-colors"
                >
                  Ir a los foros
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
