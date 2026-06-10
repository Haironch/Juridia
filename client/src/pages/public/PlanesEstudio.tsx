import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Calendar, Plus, Zap, AlertCircle, Loader2, ArrowRight,
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

// ── Modal crear plan ──────────────────────────────────────────────────────────
interface ModalProps { onClose: () => void; onSuccess: () => void; }

function ModalNuevoPlan({ onClose, onSuccess }: ModalProps) {
  const { token } = useAuthStore();
  const [examen, setExamen] = useState('privado');
  const [fase, setFase] = useState('basica');
  const [semanas, setSemanas] = useState(8);
  const [fechaExamen, setFechaExamen] = useState('');
  const [error, setError] = useState('');

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-[#13293d] mb-4">Crear plan de estudio</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <div className="space-y-4">
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
              <option value="basica">Básica (sin conocimientos previos)</option>
              <option value="intermedia">Intermedia (tengo noción)</option>
              <option value="avanzada">Avanzada (domino el tema)</option>
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
                onChange={(e) => setSemanas(Number(e.target.value))}
                className="flex-1 accent-[#2a628f]"
              />
              <span className="text-2xl font-bold text-[#2a628f] w-12 text-center">
                {semanas}
              </span>
            </div>
            <p className="text-xs text-[#9ac1e2] mt-1">Mínimo 4, máximo 16 semanas</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#13293d] mb-1">
              Fecha del examen (opcional)
            </label>
            <input
              type="date"
              value={fechaExamen}
              onChange={(e) => setFechaExamen(e.target.value)}
              className="w-full px-3 py-2 border border-[#9ac1e2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a628f]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#16324f] hover:text-[#13293d]"
          >
            Cancelar
          </button>
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="flex items-center gap-2 px-5 py-2 bg-[#2a628f] hover:bg-[#18435a] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Crear plan
          </button>
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

  const planes = data?.data ?? [];

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
        {/* Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2a628f] text-white rounded-lg hover:bg-[#18435a] font-medium transition-colors mb-8"
        >
          <Plus className="h-5 w-5" />
          Crear nuevo plan
        </button>

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

              return (
                <Link
                  key={plan.id}
                  to={`/planes/${plan.id}`}
                  className="block bg-white rounded-xl border border-[#9ac1e2] hover:border-[#2a628f] hover:shadow-md transition-all p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-[#13293d]">
                          Plan de {plan.examen.charAt(0).toUpperCase() + plan.examen.slice(1)}
                        </h3>
                        <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {plan.fase}
                        </span>
                      </div>

                      <p className="text-sm text-[#16324f] mb-4">
                        {plan.semanas_disponibles} semanas · {plan.total_semanas} semanas del plan
                        {plan.fecha_examen && ` · Examen: ${new Date(plan.fecha_examen).toLocaleDateString('es-GT')}`}
                      </p>

                      {/* Barra de progreso */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-[#d8e9f5] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#2a628f] to-[#18435a] transition-all"
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

                    <ArrowRight className="h-5 w-5 text-[#9ac1e2] mt-1" />
                  </div>
                </Link>
              );
            })}
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
