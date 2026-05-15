import { useState, useMemo, useRef } from 'react';
import { Search, X, ChevronDown, ChevronUp, Clock, BookOpen } from 'lucide-react';
import {
  eventosHistoricos,
  CATEGORIAS_TIMELINE,
  CATEGORIA_COLOR,
  type EventoHistorico,
  type CategoriaTimeline,
} from '../../data/timeline';

const TIPO_ICON: Record<string, string> = {
  Constitución: '📜',
  Código:       '📕',
  Ley:          '⚖️',
  Institución:  '🏛️',
  Reforma:      '✏️',
  Tratado:      '🤝',
  Hito:         '⭐',
};

function EventoCard({ evento }: { evento: EventoHistorico }) {
  const [expandido, setExpandido] = useState(false);
  const colores = CATEGORIA_COLOR[evento.categoria];

  return (
    <div className="relative pl-10">
      {/* Dot en la línea */}
      <div
        className={`absolute left-0 top-4 w-5 h-5 rounded-full border-4 border-white shadow-sm z-10 ${colores.dot}`}
        style={{ transform: 'translateX(-50%)' }}
      />

      <div
        className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
          evento.importancia === 'alta' ? 'border-l-4 ' + colores.border : 'border-[#e8f0f8]'
        }`}
      >
        <div className="p-5">
          {/* Año + tipo */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-2xl font-black text-[#2a628f]">{evento.año}</span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colores.bg} ${colores.text} ${colores.border}`}>
              {evento.categoria}
            </span>
            <span className="text-xs text-[#9ac1e2] flex items-center gap-1">
              {TIPO_ICON[evento.tipo]} {evento.tipo}
            </span>
            {evento.importancia === 'alta' && (
              <span className="text-xs bg-[#fff8e1] text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                Hito clave
              </span>
            )}
          </div>

          {/* Título */}
          <h3 className="text-base font-bold text-[#13293d] mb-1 leading-snug">{evento.titulo}</h3>

          {/* Resumen */}
          <p className="text-sm text-[#16324f] leading-relaxed">{evento.resumen}</p>

          {/* Detalle expandible */}
          {expandido && (
            <div className="mt-3 pt-3 border-t border-[#f0f7ff]">
              <p className="text-sm text-[#16324f] leading-relaxed">{evento.detalle}</p>
            </div>
          )}

          {/* Botón expandir */}
          <button
            onClick={() => setExpandido((v) => !v)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#2a628f] hover:text-[#18435a] transition-colors"
          >
            {expandido ? (
              <><ChevronUp className="h-3.5 w-3.5" /> Leer menos</>
            ) : (
              <><ChevronDown className="h-3.5 w-3.5" /> Leer más</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function DecadaSeparador({ decada }: { decada: number }) {
  return (
    <div className="relative pl-10 py-2">
      <div className="absolute left-0 top-1/2 w-5 h-5 rounded-full bg-[#d8e9f5] border-4 border-white z-10"
        style={{ transform: 'translateX(-50%)' }} />
      <div className="inline-block bg-[#13293d] text-white text-xs font-bold px-3 py-1.5 rounded-full">
        {decada}s
      </div>
    </div>
  );
}

export default function Timeline() {
  const [search, setSearch] = useState('');
  const [categoriasActivas, setCategoriasActivas] = useState<CategoriaTimeline[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const toggleCategoria = (cat: CategoriaTimeline) => {
    setCategoriasActivas((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const eventosFiltrados = useMemo(() => {
    const q = search.toLowerCase();
    return eventosHistoricos
      .filter((e) => {
        const matchSearch =
          !q ||
          e.titulo.toLowerCase().includes(q) ||
          e.resumen.toLowerCase().includes(q) ||
          String(e.año).includes(q) ||
          e.categoria.toLowerCase().includes(q);
        const matchCat =
          categoriasActivas.length === 0 || categoriasActivas.includes(e.categoria);
        return matchSearch && matchCat;
      })
      .sort((a, b) => a.año - b.año);
  }, [search, categoriasActivas]);

  // Agrupar por década para los separadores
  const grupos = useMemo(() => {
    const map = new Map<number, EventoHistorico[]>();
    for (const e of eventosFiltrados) {
      const decada = Math.floor(e.año / 10) * 10;
      if (!map.has(decada)) map.set(decada, []);
      map.get(decada)!.push(e);
    }
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [eventosFiltrados]);

  const hayFiltros = search || categoriasActivas.length > 0;

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#13293d] to-[#2a628f] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-5">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Historia del Derecho Guatemalteco</h1>
          <p className="text-[#9ac1e2] text-lg max-w-2xl mx-auto">
            Línea de tiempo visual desde la Independencia hasta hoy: constituciones, códigos,
            instituciones y reformas que dieron forma al ordenamiento jurídico de Guatemala.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{eventosHistoricos.length}</p>
              <p className="text-[#9ac1e2] text-sm">Eventos históricos</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">7</p>
              <p className="text-[#9ac1e2] text-sm">Constituciones</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">200+</p>
              <p className="text-[#9ac1e2] text-sm">Años de historia</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
        {/* Buscador */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ac1e2]" />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por año, evento o categoría..."
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

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS_TIMELINE.map((cat) => {
            const activa = categoriasActivas.includes(cat);
            const colores = CATEGORIA_COLOR[cat];
            return (
              <button
                key={cat}
                onClick={() => toggleCategoria(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activa
                    ? `${colores.bg} ${colores.text} ${colores.border}`
                    : 'bg-white text-[#16324f] border-[#d8e9f5] hover:border-[#9ac1e2]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activa ? colores.dot : 'bg-[#d8e9f5]'}`} />
                {cat}
              </button>
            );
          })}
          {hayFiltros && (
            <button
              onClick={() => { setSearch(''); setCategoriasActivas([]); }}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-[#2a628f] hover:underline"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Contador */}
        <p className="text-sm text-[#16324f]">
          <span className="font-semibold text-[#13293d]">{eventosFiltrados.length}</span>
          {' '}de {eventosHistoricos.length} eventos
        </p>

        {/* Timeline */}
        {eventosFiltrados.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#d8e9f5]">
            <BookOpen className="h-10 w-10 mx-auto text-[#9ac1e2] mb-3 opacity-40" />
            <p className="text-[#16324f] font-medium">No se encontraron eventos</p>
            <button
              onClick={() => { setSearch(''); setCategoriasActivas([]); }}
              className="mt-3 text-sm text-[#2a628f] hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-[9px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2a628f] via-[#9ac1e2] to-[#d8e9f5]" />

            <div className="space-y-1">
              {grupos.map(([decada, eventos]) => (
                <div key={decada} className="space-y-3">
                  <DecadaSeparador decada={decada} />
                  {eventos.map((evento) => (
                    <EventoCard key={evento.id} evento={evento} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
