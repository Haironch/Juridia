import { useState, useMemo, useRef } from "react";
import { Search, X, BookText, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { terminosJuridicos, CATEGORIAS_GLOSARIO } from "../../data/glosario";

// ── Colores por categoría ──────────────────────────────────────────────────
const CATEGORIA_COLORS: Record<string, string> = {
  Constitucional: "bg-blue-100 text-blue-700 border-blue-200",
  Penal:          "bg-red-100 text-red-700 border-red-200",
  Civil:          "bg-green-100 text-green-700 border-green-200",
  Procesal:       "bg-purple-100 text-purple-700 border-purple-200",
  Notarial:       "bg-amber-100 text-amber-700 border-amber-200",
  Laboral:        "bg-teal-100 text-teal-700 border-teal-200",
  General:        "bg-gray-100 text-gray-600 border-gray-200",
};

// ── Tarjeta individual ─────────────────────────────────────────────────────
function TerminoCard({ termino, definicion, fuente, categoria, ejemplo }: {
  termino: string;
  definicion: string;
  fuente: string;
  categoria: string;
  ejemplo?: string;
}) {
  const [expandido, setExpandido] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const copiar = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${termino}: ${definicion} (${fuente})`);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  };

  const colorClass = CATEGORIA_COLORS[categoria] ?? CATEGORIA_COLORS["General"];

  return (
    <div className="bg-white rounded-2xl border border-[#9ac1e2] shadow-sm hover:shadow-md transition-shadow">
      {/* Header de la tarjeta */}
      <button
        onClick={() => setExpandido((p) => !p)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-[#13293d]">{termino}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${colorClass}`}>
              {categoria}
            </span>
          </div>
          {/* Definición preview (1 línea cuando está cerrado) */}
          {!expandido && (
            <p className="text-sm text-[#16324f] line-clamp-2 leading-relaxed">
              {definicion}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
          <button
            onClick={copiar}
            title="Copiar definición"
            className="p-1.5 rounded-lg text-[#9ac1e2] hover:text-[#2a628f] hover:bg-[#eaf4fb] transition-colors"
          >
            {copiado ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          {expandido ? (
            <ChevronUp className="h-4 w-4 text-[#9ac1e2]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#9ac1e2]" />
          )}
        </div>
      </button>

      {/* Contenido expandido */}
      {expandido && (
        <div className="px-5 pb-5 space-y-3 border-t border-[#eaf4fb]">
          <p className="text-sm text-[#16324f] leading-relaxed pt-3">{definicion}</p>

          {ejemplo && (
            <div className="bg-[#eaf4fb] rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-[#2a628f] mb-1">Ejemplo práctico</p>
              <p className="text-sm text-[#16324f] leading-relaxed">{ejemplo}</p>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#9ac1e2]">Fuente:</span>
            <span className="text-xs font-medium text-[#2a628f] bg-blue-50 px-2 py-0.5 rounded-md">
              {fuente}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Página principal ───────────────────────────────────────────────────────
export default function Glosario() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const letraRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Filtrado
  const terminosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return terminosJuridicos
      .filter((t) => {
        const matchCat = categoriaActiva === "Todos" || t.categoria === categoriaActiva;
        const matchQ =
          q === "" ||
          t.termino.toLowerCase().includes(q) ||
          t.definicion.toLowerCase().includes(q) ||
          (t.ejemplo?.toLowerCase().includes(q) ?? false);
        return matchCat && matchQ;
      })
      .sort((a, b) => a.termino.localeCompare(b.termino, "es"));
  }, [busqueda, categoriaActiva]);

  // Agrupación A-Z
  const grupos = useMemo(() => {
    const map: Record<string, typeof terminosFiltrados> = {};
    for (const t of terminosFiltrados) {
      const letra = t.termino[0].toUpperCase();
      if (!map[letra]) map[letra] = [];
      map[letra].push(t);
    }
    return map;
  }, [terminosFiltrados]);

  const letrasDisponibles = Object.keys(grupos).sort();

  // Letras del abecedario completo para el índice
  const todasLetras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const scrollToLetra = (letra: string) => {
    letraRefs.current[letra]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const limpiar = () => {
    setBusqueda("");
    setCategoriaActiva("Todos");
  };

  const filtersActive = busqueda.trim() !== "" || categoriaActiva !== "Todos";

  return (
    <div className="min-h-screen bg-[#d8e9f5]">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <BookText className="h-9 w-9 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Glosario Jurídico
          </h1>
          <p className="text-lg text-[#b2d3ea] max-w-2xl mx-auto">
            Definiciones claras de los términos más importantes del Derecho
            guatemalteco, con su fuente legal y ejemplos prácticos.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Buscador ───────────────────────────────────────────────────────── */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#67a2d3] pointer-events-none" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar término, definición o ejemplo…"
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-[#9ac1e2] bg-white text-[#13293d] placeholder-[#9ac1e2] focus:outline-none focus:ring-2 focus:ring-[#2a628f] focus:border-transparent shadow-sm text-sm"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ac1e2] hover:text-[#2a628f] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Chips de categoría */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-[#16324f] mr-1">Categoría:</span>
            {CATEGORIAS_GLOSARIO.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  categoriaActiva === cat
                    ? "bg-[#2a628f] text-white border-[#2a628f] shadow-sm"
                    : "bg-white text-[#2a628f] border-[#9ac1e2] hover:border-[#2a628f] hover:bg-[#eaf4fb]"
                }`}
              >
                {cat}
              </button>
            ))}
            {filtersActive && (
              <button
                onClick={limpiar}
                className="ml-auto flex items-center gap-1 text-sm text-[#2a628f] hover:text-[#13293d] font-medium transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* ── Índice A-Z ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[#9ac1e2] px-4 py-3 mb-8 flex flex-wrap gap-1 justify-center shadow-sm">
          {todasLetras.map((letra) => {
            const activa = letrasDisponibles.includes(letra);
            return (
              <button
                key={letra}
                onClick={() => activa && scrollToLetra(letra)}
                disabled={!activa}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  activa
                    ? "text-[#2a628f] hover:bg-[#d8e9f5] hover:text-[#13293d] cursor-pointer"
                    : "text-[#c8dff0] cursor-default"
                }`}
              >
                {letra}
              </button>
            );
          })}
        </div>

        {/* ── Contador ───────────────────────────────────────────────────────── */}
        <p className="text-sm text-[#16324f] mb-6">
          {terminosFiltrados.length === terminosJuridicos.length
            ? `${terminosJuridicos.length} términos disponibles`
            : `${terminosFiltrados.length} de ${terminosJuridicos.length} términos encontrados`}
        </p>

        {/* ── Términos agrupados A-Z ──────────────────────────────────────────── */}
        {letrasDisponibles.length > 0 ? (
          <div className="space-y-10">
            {letrasDisponibles.map((letra) => (
              <div
                key={letra}
                ref={(el) => { letraRefs.current[letra] = el; }}
              >
                {/* Separador de letra */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2a628f] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{letra}</span>
                  </div>
                  <div className="flex-1 h-px bg-[#9ac1e2]" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {grupos[letra].map((t) => (
                    <TerminoCard key={t.id} {...t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Estado vacío */
          <div className="text-center py-16 bg-white rounded-2xl border border-[#9ac1e2] shadow-sm">
            <Search className="h-14 w-14 text-[#9ac1e2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#13293d] mb-2">
              No encontramos términos
            </h3>
            <p className="text-[#67a2d3] mb-6 max-w-sm mx-auto">
              Ningún término coincide con{" "}
              {busqueda ? `"${busqueda}"` : "los filtros seleccionados"}.
            </p>
            <button
              onClick={limpiar}
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
