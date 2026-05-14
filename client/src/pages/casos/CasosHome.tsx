import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Search, BookOpen, ChevronRight, X, Gavel } from 'lucide-react';
import { casosPracticos } from '../../data/casos';

const DIFICULTAD_COLOR: Record<string, string> = {
  'Básico':      'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Intermedio':  'bg-amber-50 text-amber-700 border-amber-200',
  'Avanzado':    'bg-red-50 text-red-700 border-red-200',
};

const AREA_COLOR: Record<string, string> = {
  'Laboral':                'bg-blue-50 text-blue-700',
  'Penal':                  'bg-red-50 text-red-700',
  'Civil':                  'bg-violet-50 text-violet-700',
  'Constitucional / Laboral': 'bg-teal-50 text-teal-700',
  'Familia / Penal':        'bg-pink-50 text-pink-700',
  'Civil / Administrativo': 'bg-orange-50 text-orange-700',
};

export default function CasosHome() {
  const [search, setSearch] = useState('');
  const [areaFiltro, setAreaFiltro] = useState('Todos');
  const [dificultadFiltro, setDificultadFiltro] = useState('Todos');

  const areas = useMemo(
    () => ['Todos', ...Array.from(new Set(casosPracticos.map((c) => c.area)))],
    []
  );
  const dificultades = ['Todos', 'Básico', 'Intermedio', 'Avanzado'];

  const casosFiltrados = useMemo(() => {
    const q = search.toLowerCase();
    return casosPracticos.filter((c) => {
      const matchSearch =
        !q ||
        c.titulo.toLowerCase().includes(q) ||
        c.descripcion.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q);
      const matchArea = areaFiltro === 'Todos' || c.area === areaFiltro;
      const matchDif = dificultadFiltro === 'Todos' || c.dificultad === dificultadFiltro;
      return matchSearch && matchArea && matchDif;
    });
  }, [search, areaFiltro, dificultadFiltro]);

  const limpiarFiltros = () => {
    setSearch('');
    setAreaFiltro('Todos');
    setDificultadFiltro('Todos');
  };

  const hayFiltros = search || areaFiltro !== 'Todos' || dificultadFiltro !== 'Todos';

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#13293d] to-[#2a628f] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-5">
            <Gavel className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Casos Prácticos</h1>
          <p className="text-[#9ac1e2] text-lg max-w-2xl mx-auto">
            Lee el caso, analiza los hechos y responde las preguntas. Aprende derecho
            guatemalteco aplicado a situaciones reales.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{casosPracticos.length}</p>
              <p className="text-[#9ac1e2] text-sm">Casos disponibles</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {casosPracticos.reduce((s, c) => s + c.preguntas.length, 0)}
              </p>
              <p className="text-[#9ac1e2] text-sm">Preguntas en total</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{areas.length - 1}</p>
              <p className="text-[#9ac1e2] text-sm">Áreas del derecho</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ac1e2]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar casos por título, área o descripción..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-[#9ac1e2] focus:outline-none focus:ring-2 focus:ring-[#2a628f] text-sm text-[#13293d] shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ac1e2] hover:text-[#2a628f]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3">
          {/* Área */}
          <div className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <button
                key={a}
                onClick={() => setAreaFiltro(a)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  areaFiltro === a
                    ? 'bg-[#2a628f] text-white border-[#2a628f]'
                    : 'bg-white text-[#16324f] border-[#9ac1e2] hover:border-[#2a628f]'
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          {/* Separador */}
          <div className="w-px bg-[#d8e9f5] self-stretch hidden sm:block" />

          {/* Dificultad */}
          <div className="flex flex-wrap gap-2">
            {dificultades.map((d) => (
              <button
                key={d}
                onClick={() => setDificultadFiltro(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  dificultadFiltro === d
                    ? 'bg-[#13293d] text-white border-[#13293d]'
                    : 'bg-white text-[#16324f] border-[#9ac1e2] hover:border-[#13293d]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Contador y limpiar */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#16324f]">
            <span className="font-semibold text-[#13293d]">{casosFiltrados.length}</span>
            {' '}de {casosPracticos.length} casos
          </p>
          {hayFiltros && (
            <button
              onClick={limpiarFiltros}
              className="text-xs text-[#2a628f] hover:underline font-medium"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Lista de casos */}
        {casosFiltrados.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#d8e9f5]">
            <BookOpen className="h-10 w-10 mx-auto text-[#9ac1e2] mb-3 opacity-40" />
            <p className="text-[#16324f] font-medium">No se encontraron casos</p>
            <button onClick={limpiarFiltros} className="mt-3 text-sm text-[#2a628f] hover:underline">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {casosFiltrados.map((caso) => (
              <Link
                key={caso.id}
                to={`/casos/${caso.id}`}
                className="group block bg-white rounded-2xl border border-[#d8e9f5] shadow-sm hover:shadow-md hover:border-[#9ac1e2] transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${AREA_COLOR[caso.area] ?? 'bg-slate-50 text-slate-600'}`}
                        >
                          {caso.area}
                        </span>
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${DIFICULTAD_COLOR[caso.dificultad]}`}
                        >
                          {caso.dificultad}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-[#13293d] group-hover:text-[#2a628f] transition-colors mb-2">
                        {caso.titulo}
                      </h2>
                      <p className="text-sm text-[#16324f] leading-relaxed line-clamp-2">
                        {caso.descripcion}
                      </p>

                      {/* Footer info */}
                      <div className="flex items-center gap-4 mt-4 text-xs text-[#9ac1e2]">
                        <span className="flex items-center gap-1">
                          <Scale className="h-3.5 w-3.5" />
                          {caso.normativa.length} normas aplicables
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {caso.preguntas.length} preguntas
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#f0f7ff] group-hover:bg-[#2a628f] flex items-center justify-center transition-colors">
                      <ChevronRight className="h-5 w-5 text-[#2a628f] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
