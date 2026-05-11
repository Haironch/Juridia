import { useState, useMemo } from 'react';
import { Brain, TrendingUp, Target, Award, Search, X } from 'lucide-react';
import { quizTemas } from '../../data/constituquiz';
import { useQuizStore } from '../../store/quizStore';
import TopicCard from '../../components/quiz/TopicCard';

// Build the unique category list from data (+ "Todos")
const CATEGORIAS = ["Todos", ...Array.from(new Set(quizTemas.map(t => t.categoria ?? "General")))];

export default function ConstituQuizHome() {
  const { getProgressByTema, getAllProgress } = useQuizStore();
  const allProgress = getAllProgress();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("Todos");

  const totalIntentos = allProgress.reduce((sum, p) => sum + p.intentos, 0);
  const promedioGeneral = allProgress.length > 0
    ? Math.round(allProgress.reduce((sum, p) => sum + p.promedio, 0) / allProgress.length)
    : 0;
  const mejorPuntajeGeneral = allProgress.length > 0
    ? Math.max(...allProgress.map(p => p.mejorPuntaje))
    : 0;

  const temasFiltrados = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return quizTemas.filter(tema => {
      // Category filter
      const matchCategoria =
        selectedCategoria === "Todos" ||
        (tema.categoria ?? "General") === selectedCategoria;

      // Search: match tema name, descripcion, or any question text
      const matchSearch =
        q === "" ||
        tema.tema.toLowerCase().includes(q) ||
        tema.descripcion.toLowerCase().includes(q) ||
        tema.preguntas.some(p => p.pregunta.toLowerCase().includes(q));

      return matchCategoria && matchSearch;
    });
  }, [searchQuery, selectedCategoria]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategoria("Todos");
  };

  const filtersActive = searchQuery.trim() !== "" || selectedCategoria !== "Todos";

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Brain className="h-9 w-9 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">ConstituQuiz</h1>
          <p className="text-lg text-[#b2d3ea] max-w-2xl mx-auto">
            Pon a prueba tus conocimientos sobre el Derecho guatemalteco.
            Estudia con tarjetas y practica con quizzes interactivos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        {totalIntentos > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9ac1e2] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-[#2a628f]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#13293d]">{totalIntentos}</p>
                <p className="text-sm text-[#67a2d3]">Quizzes completados</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9ac1e2] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#13293d]">{promedioGeneral}%</p>
                <p className="text-sm text-[#67a2d3]">Promedio general</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9ac1e2] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#13293d]">{mejorPuntajeGeneral}%</p>
                <p className="text-sm text-[#67a2d3]">Mejor puntaje</p>
              </div>
            </div>
          </div>
        )}

        {/* Search + Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#67a2d3] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar quiz por nombre, descripción o pregunta…"
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-[#9ac1e2] bg-white text-[#13293d] placeholder-[#9ac1e2] focus:outline-none focus:ring-2 focus:ring-[#2a628f] focus:border-transparent shadow-sm text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ac1e2] hover:text-[#2a628f] transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category filter chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-[#16324f] mr-1">Filtrar por:</span>
            {CATEGORIAS.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategoria(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  selectedCategoria === cat
                    ? "bg-[#2a628f] text-white border-[#2a628f] shadow-sm"
                    : "bg-white text-[#2a628f] border-[#9ac1e2] hover:border-[#2a628f] hover:bg-[#eaf4fb]"
                }`}
              >
                {cat}
              </button>
            ))}

            {filtersActive && (
              <button
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1 text-sm text-[#2a628f] hover:text-[#13293d] font-medium transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Topics heading with count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#13293d] mb-1">Temas disponibles</h2>
          <p className="text-[#16324f] text-sm">
            {temasFiltrados.length === quizTemas.length
              ? `${quizTemas.length} temas — selecciona uno para estudiar o practicar`
              : `${temasFiltrados.length} de ${quizTemas.length} temas encontrados`}
          </p>
        </div>

        {/* Topics grid */}
        {temasFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temasFiltrados.map((tema) => (
              <TopicCard
                key={tema.id}
                tema={tema}
                progress={getProgressByTema(tema.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty state when search/filter yields no results */
          <div className="text-center py-16 bg-white rounded-2xl border border-[#9ac1e2] shadow-sm">
            <Search className="h-14 w-14 text-[#9ac1e2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#13293d] mb-2">
              No encontramos quizzes
            </h3>
            <p className="text-[#67a2d3] mb-6 max-w-sm mx-auto">
              Ningún quiz coincide con{" "}
              {searchQuery ? `"${searchQuery}"` : "los filtros seleccionados"}.
              Intenta con otro término o categoría.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2a628f] text-white rounded-lg text-sm font-medium hover:bg-[#18435a] transition-colors"
            >
              <X className="h-4 w-4" />
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
