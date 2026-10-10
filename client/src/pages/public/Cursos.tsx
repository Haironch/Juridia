import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen, Clock, Lock, CaretRight, MagnifyingGlass, Stack,
} from "@phosphor-icons/react";
import api from "../../services/api";

interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  nivel: string;
  duracion: string;
  es_premium: number;
  proximamente: number;
  categoria: string;
  categoriaIcono: string;
  totalModulos: number;
}

const NIVELES = ["Todos", "Básico", "Intermedio", "Avanzado"];

// Paleta visual por categoría
const CATEGORIA_STYLE: Record<string, { bg: string; text: string; badge: string }> = {
  "Derecho Constitucional": {
    bg: "from-[#1a4971] to-[#2a628f]",
    text: "text-[#b2d3ea]",
    badge: "bg-blue-100 text-blue-800",
  },
  "Derecho Penal": {
    bg: "from-[#7f1d1d] to-[#b91c1c]",
    text: "text-red-200",
    badge: "bg-red-100 text-red-800",
  },
  "Derecho Civil": {
    bg: "from-[#78350f] to-[#d97706]",
    text: "text-amber-100",
    badge: "bg-amber-100 text-amber-800",
  },
  "Derecho Laboral": {
    bg: "from-[#1c4532] to-[#065f46]",
    text: "text-emerald-100",
    badge: "bg-emerald-100 text-emerald-800",
  },
  "Derecho Mercantil": {
    bg: "from-[#134e4a] to-[#0d9488]",
    text: "text-teal-100",
    badge: "bg-teal-100 text-teal-800",
  },
  General: {
    bg: "from-[#3730a3] to-[#6366f1]",
    text: "text-indigo-100",
    badge: "bg-indigo-100 text-indigo-800",
  },
};

const DEFAULT_STYLE = {
  bg: "from-[#2a628f] to-[#18435a]",
  text: "text-[#b2d3ea]",
  badge: "bg-[#d8e9f5] text-[#13293d]",
};

function getNivelBadge(nivel: string) {
  if (nivel === "Básico") return "bg-emerald-100 text-emerald-700";
  if (nivel === "Intermedio") return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}

function CursoSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#9ac1e2] overflow-hidden animate-pulse">
      <div className="h-28 bg-[#d8e9f5]" />
      <div className="p-5">
        <div className="h-4 bg-[#d8e9f5] rounded w-3/4 mb-3" />
        <div className="h-3 bg-[#d8e9f5] rounded w-full mb-2" />
        <div className="h-3 bg-[#d8e9f5] rounded w-2/3 mb-5" />
        <div className="h-9 bg-[#d8e9f5] rounded-xl" />
      </div>
    </div>
  );
}

export default function Cursos() {
  const [busqueda, setBusqueda] = useState("");
  const [nivelFiltro, setNivelFiltro] = useState("Todos");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [soloGratis, setSoloGratis] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cursos"],
    queryFn: async () => {
      const res = await api.get<{ ok: boolean; data: Curso[] }>("/api/cursos");
      return res.data.data;
    },
  });

  const cursos = data ?? [];

  // Categorías únicas para el filtro
  const categorias = ["Todas", ...Array.from(new Set(cursos.map((c) => c.categoria)))];

  const filtrados = cursos.filter((c) => {
    const matchBusqueda =
      c.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.categoria.toLowerCase().includes(busqueda.toLowerCase());
    const matchNivel = nivelFiltro === "Todos" || c.nivel === nivelFiltro;
    const matchCategoria = categoriaFiltro === "Todas" || c.categoria === categoriaFiltro;
    const matchGratis = !soloGratis || c.es_premium === 0;
    return matchBusqueda && matchNivel && matchCategoria && matchGratis;
  });

  const totalModulos = cursos.reduce((acc, c) => acc + Number(c.totalModulos), 0);
  const totalGratis = cursos.filter((c) => c.es_premium === 0).length;
  const hayFiltros = busqueda || nivelFiltro !== "Todos" || categoriaFiltro !== "Todas" || soloGratis;

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#13293d] via-[#18435a] to-[#2a628f] py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Cursos de Derecho
          </h1>
          <p className="text-[#9ac1e2] text-base sm:text-lg max-w-2xl mb-8">
            Aprende a tu propio ritmo con cursos estructurados en derecho guatemalteco.
          </p>

          {/* Stats strip */}
          {!isLoading && cursos.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { label: "cursos disponibles", value: cursos.length },
                { label: "módulos en total", value: totalModulos },
                { label: "cursos gratuitos", value: totalGratis },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/10 rounded-xl px-4 py-2 text-center">
                  <span className="text-2xl font-bold text-white">{value}</span>
                  <span className="text-xs text-[#9ac1e2] block">{label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="relative max-w-xl">
            <MagnifyingGlass weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#67a2d3]" />
            <input
              type="text"
              placeholder="Buscar cursos o áreas del derecho..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-[#67a2d3] focus:outline-none focus:bg-white/20 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-[#9ac1e2] sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2">
          {/* Categorías */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                  categoriaFiltro === cat
                    ? "bg-[#13293d] text-white"
                    : "text-[#16324f] hover:bg-[#d8e9f5]"
                }`}
              >
                {cat === "Todas"
                  ? "Todas las áreas"
                  : `${(CATEGORIA_STYLE[cat] ? "" : "")}${cursos.find(c => c.categoria === cat)?.categoriaIcono ?? ""} ${cat.replace("Derecho ", "")}`}
              </button>
            ))}
          </div>

          {/* Nivel + opciones */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1.5">
              {NIVELES.map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => setNivelFiltro(nivel)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
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
                  onClick={() => { setBusqueda(""); setNivelFiltro("Todos"); setCategoriaFiltro("Todas"); setSoloGratis(false); }}
                  className="text-sm text-[#2a628f] hover:underline"
                >
                  Limpiar filtros
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
              {filtrados.length} {filtrados.length === 1 ? "curso" : "cursos"} encontrados
            </p>

            {filtrados.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen weight="duotone" className="h-12 w-12 text-[#9ac1e2] mx-auto mb-4" />
                <p className="text-[#13293d] font-semibold mb-1">Sin resultados</p>
                <p className="text-[#67a2d3] text-sm">Intenta con otros filtros.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtrados.map((curso) => {
                  const style = CATEGORIA_STYLE[curso.categoria] ?? DEFAULT_STYLE;
                  return (
                    <div
                      key={curso.id}
                      className={`bg-white rounded-2xl border border-[#9ac1e2] flex flex-col overflow-hidden transition-all duration-300 ${
                        curso.proximamente
                          ? "opacity-75 cursor-not-allowed"
                          : "hover:shadow-xl hover:-translate-y-1"
                      }`}
                    >
                      {/* Card header con color por categoría */}
                      <div className={`bg-gradient-to-br ${style.bg} px-5 py-5 flex items-start justify-between relative`}>
                        <div>
                          <span className="text-3xl leading-none">{curso.categoriaIcono}</span>
                          <p className={`text-xs font-medium mt-2 ${style.text}`}>
                            {curso.categoria}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          {curso.proximamente ? (
                            <span className="flex items-center gap-1 text-xs font-bold bg-slate-800/80 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
                              <Lock weight="duotone" className="h-3 w-3" />
                              Próximamente
                            </span>
                          ) : (
                            <>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getNivelBadge(curso.nivel)}`}>
                                {curso.nivel}
                              </span>
                              {curso.es_premium === 1 && (
                                <span className="flex items-center gap-1 text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                  <Lock weight="duotone" className="h-3 w-3" />
                                  Premium
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        {/* Title */}
                        <h3 className="text-base font-bold text-[#13293d] mb-2 leading-snug line-clamp-2">
                          {curso.titulo}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-[#16324f] leading-relaxed line-clamp-2 mb-4 flex-1">
                          {curso.descripcion}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-[#67a2d3] mb-4">
                          <div className="flex items-center gap-1">
                            <Stack weight="duotone" className="h-3.5 w-3.5" />
                            {curso.totalModulos} módulos
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock weight="duotone" className="h-3.5 w-3.5" />
                            {curso.duracion}
                          </div>
                        </div>

                        {/* CTA */}
                        {curso.proximamente ? (
                          <div className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm bg-slate-100 text-slate-400 select-none">
                            <Lock weight="duotone" className="h-4 w-4" />
                            En construcción
                          </div>
                        ) : (
                          <Link
                            to={`/cursos/${curso.id}`}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-colors bg-[#2a628f] text-white hover:bg-[#18435a]"
                          >
                            Ver curso
                            <CaretRight weight="bold" className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
