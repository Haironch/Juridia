import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Clock, Lock, ChevronRight, Search, Layers } from "lucide-react";
import api from "../../services/api";

interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  nivel: string;
  duracion: string;
  es_premium: number;
  categoria: string;
  categoriaIcono: string;
  totalModulos: number;
}

const NIVELES = ["Todos", "Básico", "Intermedio", "Avanzado"];

function NivelBadge({ nivel }: { nivel: string }) {
  const color =
    nivel === "Básico"
      ? "bg-emerald-100 text-emerald-700"
      : nivel === "Intermedio"
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {nivel}
    </span>
  );
}

function CursoSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#9ac1e2] p-6 animate-pulse">
      <div className="h-4 bg-[#d8e9f5] rounded w-1/3 mb-4" />
      <div className="h-5 bg-[#d8e9f5] rounded w-3/4 mb-3" />
      <div className="h-4 bg-[#d8e9f5] rounded w-full mb-2" />
      <div className="h-4 bg-[#d8e9f5] rounded w-2/3 mb-6" />
      <div className="h-10 bg-[#d8e9f5] rounded-xl" />
    </div>
  );
}

export default function Cursos() {
  const [busqueda, setBusqueda] = useState("");
  const [nivelFiltro, setNivelFiltro] = useState("Todos");
  const [soloGratis, setSoloGratis] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cursos"],
    queryFn: async () => {
      const res = await api.get<{ ok: boolean; data: Curso[] }>("/api/cursos");
      return res.data.data;
    },
  });

  const cursos = data ?? [];

  const filtrados = cursos.filter((c) => {
    const matchBusqueda =
      c.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.categoria.toLowerCase().includes(busqueda.toLowerCase());
    const matchNivel = nivelFiltro === "Todos" || c.nivel === nivelFiltro;
    const matchGratis = !soloGratis || c.es_premium === 0;
    return matchBusqueda && matchNivel && matchGratis;
  });

  const hayFiltros = busqueda || nivelFiltro !== "Todos" || soloGratis;

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2a628f] to-[#13293d] py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Cursos de Derecho
          </h1>
          <p className="text-[#b2d3ea] text-base sm:text-lg max-w-2xl">
            Aprende a tu propio ritmo con cursos estructurados por expertos en derecho guatemalteco.
          </p>

          {/* Search */}
          <div className="mt-8 relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#67a2d3]" />
            <input
              type="text"
              placeholder="Buscar cursos o áreas del derecho..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-[#89c2d9] focus:outline-none focus:bg-white/20 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-[#9ac1e2] sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              {NIVELES.map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => setNivelFiltro(nivel)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    nivelFiltro === nivel
                      ? "bg-[#2a628f] text-white"
                      : "text-[#16324f] hover:bg-[#d8e9f5]"
                  }`}
                >
                  {nivel}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#16324f]">
                <input
                  type="checkbox"
                  checked={soloGratis}
                  onChange={(e) => setSoloGratis(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#2a628f]"
                />
                Solo gratuitos
              </label>
              {hayFiltros && (
                <button
                  onClick={() => { setBusqueda(""); setNivelFiltro("Todos"); setSoloGratis(false); }}
                  className="text-sm text-[#2a628f] hover:underline"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isError && (
          <div className="text-center py-16">
            <p className="text-[#13293d] font-semibold mb-2">No se pudieron cargar los cursos</p>
            <p className="text-[#67a2d3] text-sm">Verifica tu conexión e intenta de nuevo.</p>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <CursoSkeleton key={i} />)}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <p className="text-sm text-[#67a2d3] mb-6">
              {filtrados.length} {filtrados.length === 1 ? "curso" : "cursos"} disponibles
            </p>

            {filtrados.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="h-12 w-12 text-[#9ac1e2] mx-auto mb-4" />
                <p className="text-[#13293d] font-semibold mb-1">Sin resultados</p>
                <p className="text-[#67a2d3] text-sm">Intenta con otros filtros.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtrados.map((curso) => (
                  <div
                    key={curso.id}
                    className="bg-white rounded-2xl border border-[#9ac1e2] hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col overflow-hidden"
                  >
                    {/* Card top accent */}
                    <div className="h-1.5 bg-gradient-to-r from-[#2a628f] to-[#89c2d9]" />

                    <div className="p-6 flex flex-col flex-1">
                      {/* Meta */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-[#2a628f] bg-[#d8e9f5] px-2.5 py-1 rounded-full flex items-center gap-1">
                          <span>{curso.categoriaIcono}</span>
                          {curso.categoria}
                        </span>
                        {curso.es_premium === 1 && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-[#18435a] bg-[#cce0f0] px-2 py-0.5 rounded-full">
                            <Lock className="h-3 w-3" />
                            Premium
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-[#13293d] mb-2 leading-snug line-clamp-2">
                        {curso.titulo}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#16324f] leading-relaxed line-clamp-2 mb-4 flex-1">
                        {curso.descripcion}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-[#67a2d3] mb-5">
                        <div className="flex items-center gap-1">
                          <Layers className="h-3.5 w-3.5" />
                          {curso.totalModulos} módulos
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {curso.duracion}
                        </div>
                        <NivelBadge nivel={curso.nivel} />
                      </div>

                      {/* CTA */}
                      <Link
                        to={`/cursos/${curso.id}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-colors bg-[#2a628f] text-white hover:bg-[#18435a]"
                      >
                        Ver curso
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
