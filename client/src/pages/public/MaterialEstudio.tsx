import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Search, X, ChevronDown, ChevronUp, Copy, Check,
  ArrowLeft, ExternalLink, ListChecks, Lightbulb, Clock,
} from "lucide-react";
import {
  resumenes, articulosClave, guias, AREAS_FILTRO,
  type Resumen, type ArticuloClave, type GuiaPractica,
} from "../../data/material";

const COLOR_MAP: Record<string, { bg: string; border: string; badge: string; text: string; dot: string }> = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   badge: "bg-blue-100 text-blue-700",   text: "text-blue-700",   dot: "bg-blue-500" },
  red:    { bg: "bg-red-50",    border: "border-red-200",    badge: "bg-red-100 text-red-700",     text: "text-red-700",    dot: "bg-red-500" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  badge: "bg-green-100 text-green-700", text: "text-green-700",  dot: "bg-green-500" },
  teal:   { bg: "bg-teal-50",   border: "border-teal-200",   badge: "bg-teal-100 text-teal-700",   text: "text-teal-700",   dot: "bg-teal-500" },
  amber:  { bg: "bg-amber-50",  border: "border-amber-200",  badge: "bg-amber-100 text-amber-700", text: "text-amber-700",  dot: "bg-amber-500" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-100 text-purple-700", text: "text-purple-700", dot: "bg-purple-500" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-100 text-orange-700", text: "text-orange-700", dot: "bg-orange-500" },
};

const AREA_COLOR: Record<string, string> = {
  Constitucional: "bg-blue-100 text-blue-700 border-blue-200",
  Penal:          "bg-red-100 text-red-700 border-red-200",
  Civil:          "bg-green-100 text-green-700 border-green-200",
  Laboral:        "bg-teal-100 text-teal-700 border-teal-200",
  Mercantil:      "bg-amber-100 text-amber-700 border-amber-200",
  Administrativo: "bg-purple-100 text-purple-700 border-purple-200",
  Tributario:     "bg-orange-100 text-orange-700 border-orange-200",
};

// ─── Componente: Tarjeta de Resumen ──────────────────────────────────────────

function ResumenCard({ r }: { r: Resumen }) {
  const [abierto, setAbierto] = useState(false);
  const c = COLOR_MAP[r.color] ?? COLOR_MAP.blue;

  return (
    <div className={`bg-white rounded-2xl border ${c.border} shadow-sm overflow-hidden`}>
      <button
        onClick={() => setAbierto((p) => !p)}
        className="w-full text-left px-5 py-5 flex items-start gap-4"
      >
        <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center flex-shrink-0 text-xl`}>
          {r.icono}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-[#13293d]">{r.area}</h3>
          </div>
          <p className="text-xs text-[#5a8aaa] font-medium">{r.decreto}</p>
          {!abierto && (
            <p className="text-sm text-[#16324f] mt-1.5 line-clamp-2 leading-relaxed">{r.descripcion}</p>
          )}
        </div>
        <div className="flex-shrink-0 mt-0.5">
          {abierto
            ? <ChevronUp className="h-4 w-4 text-[#5a8aaa]" />
            : <ChevronDown className="h-4 w-4 text-[#5a8aaa]" />}
        </div>
      </button>

      {abierto && (
        <div className="px-5 pb-6 space-y-5 border-t border-[#d8e9f5]">
          <p className="text-sm text-[#16324f] leading-relaxed pt-4">{r.descripcion}</p>

          {/* Principios */}
          <div>
            <p className="text-xs font-bold text-[#2a628f] uppercase tracking-wider mb-2">Principios fundamentales</p>
            <ul className="space-y-1.5">
              {r.principios.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-[#16324f]">
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 flex-shrink-0`} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Artículos clave */}
          <div>
            <p className="text-xs font-bold text-[#2a628f] uppercase tracking-wider mb-2">Artículos más citados</p>
            <div className="space-y-2">
              {r.articulos_clave.map((a) => (
                <div key={a.numero} className={`rounded-xl ${c.bg} px-4 py-3 flex gap-3`}>
                  <span className={`text-xs font-bold ${c.text} flex-shrink-0 pt-0.5 w-20`}>{a.numero}</span>
                  <span className="text-xs text-[#16324f] leading-relaxed">{a.texto}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dato clave */}
          <div className={`rounded-xl border ${c.border} ${c.bg} px-4 py-3 flex gap-3`}>
            <Lightbulb className={`h-4 w-4 ${c.text} flex-shrink-0 mt-0.5`} />
            <p className="text-xs text-[#16324f] leading-relaxed">{r.dato_clave}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Componente: Tarjeta de Artículo ─────────────────────────────────────────

function ArticuloCard({ a }: { a: ArticuloClave }) {
  const [copiado, setCopiado] = useState(false);

  const copiar = () => {
    navigator.clipboard.writeText(`${a.articulo} ${a.codigo}: ${a.texto}`);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  };

  const colorClass = AREA_COLOR[a.area] ?? "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <div className="bg-white rounded-2xl border border-[#9ac1e2] shadow-sm p-4 flex gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-sm font-bold text-[#2a628f]">{a.articulo}</span>
          <span className="text-xs text-[#5a8aaa] font-medium">{a.codigo}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${colorClass}`}>{a.area}</span>
        </div>
        <p className="text-sm text-[#16324f] leading-relaxed">{a.texto}</p>
        <p className="text-xs text-[#5a8aaa] mt-1.5 font-medium">{a.relevancia}</p>
      </div>
      <button
        onClick={copiar}
        title="Copiar texto"
        className="flex-shrink-0 self-start p-1.5 rounded-lg hover:bg-[#d8e9f5] transition-colors"
      >
        {copiado
          ? <Check className="h-4 w-4 text-green-600" />
          : <Copy className="h-4 w-4 text-[#5a8aaa]" />}
      </button>
    </div>
  );
}

// ─── Componente: Tarjeta de Guía ─────────────────────────────────────────────

function GuiaCard({ g }: { g: GuiaPractica }) {
  const [abierto, setAbierto] = useState(false);
  const colorClass = AREA_COLOR[g.area] ?? "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <div className="bg-white rounded-2xl border border-[#9ac1e2] shadow-sm overflow-hidden">
      <button
        onClick={() => setAbierto((p) => !p)}
        className="w-full text-left px-5 py-5 flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-xl bg-[#d8e9f5] flex items-center justify-center flex-shrink-0">
          <ListChecks className="h-5 w-5 text-[#2a628f]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-[#13293d]">{g.titulo}</h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${colorClass}`}>{g.area}</span>
            <span className="text-xs text-[#5a8aaa] flex items-center gap-1">
              <Clock className="h-3 w-3" />{g.duracion}
            </span>
          </div>
          {!abierto && (
            <p className="text-sm text-[#16324f] mt-1.5 line-clamp-2 leading-relaxed">{g.descripcion}</p>
          )}
        </div>
        <div className="flex-shrink-0 mt-0.5">
          {abierto
            ? <ChevronUp className="h-4 w-4 text-[#5a8aaa]" />
            : <ChevronDown className="h-4 w-4 text-[#5a8aaa]" />}
        </div>
      </button>

      {abierto && (
        <div className="px-5 pb-6 space-y-5 border-t border-[#d8e9f5]">
          <p className="text-sm text-[#16324f] leading-relaxed pt-4">{g.descripcion}</p>

          {/* Pasos */}
          <div>
            <p className="text-xs font-bold text-[#2a628f] uppercase tracking-wider mb-3">Pasos a seguir</p>
            <div className="space-y-3">
              {g.pasos.map((paso) => (
                <div key={paso.numero} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2a628f] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {paso.numero}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#13293d] mb-0.5">{paso.titulo}</p>
                    <p className="text-sm text-[#16324f] leading-relaxed">{paso.detalle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requisitos */}
          <div>
            <p className="text-xs font-bold text-[#2a628f] uppercase tracking-wider mb-2">Requisitos</p>
            <ul className="space-y-1.5">
              {g.requisitos.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-[#16324f]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2a628f] mt-1.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Consejo */}
          <div className="rounded-xl border border-[#9ac1e2] bg-[#f0f7ff] px-4 py-3 flex gap-3">
            <Lightbulb className="h-4 w-4 text-[#2a628f] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#16324f] leading-relaxed">{g.consejo}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Página principal ────────────────────────────────────────────────────────

type Tab = "resumenes" | "articulos" | "guias";

export default function MaterialEstudio() {
  const [tab, setTab] = useState<Tab>("resumenes");
  const [busqueda, setBusqueda] = useState("");
  const [areaFiltro, setAreaFiltro] = useState<string>("Todas");

  const resumenesFiltered = useMemo(() => {
    const q = busqueda.toLowerCase();
    return resumenes.filter((r) => {
      const matchArea = areaFiltro === "Todas" || r.area.includes(areaFiltro);
      const matchQ = !q || r.area.toLowerCase().includes(q) || r.descripcion.toLowerCase().includes(q);
      return matchArea && matchQ;
    });
  }, [busqueda, areaFiltro]);

  const articulosFiltered = useMemo(() => {
    const q = busqueda.toLowerCase();
    return articulosClave.filter((a) => {
      const matchArea = areaFiltro === "Todas" || a.area === areaFiltro;
      const matchQ = !q
        || a.texto.toLowerCase().includes(q)
        || a.articulo.toLowerCase().includes(q)
        || a.codigo.toLowerCase().includes(q)
        || a.relevancia.toLowerCase().includes(q);
      return matchArea && matchQ;
    });
  }, [busqueda, areaFiltro]);

  const guiasFiltered = useMemo(() => {
    const q = busqueda.toLowerCase();
    return guias.filter((g) => {
      const matchArea = areaFiltro === "Todas" || g.area === areaFiltro;
      const matchQ = !q
        || g.titulo.toLowerCase().includes(q)
        || g.descripcion.toLowerCase().includes(q)
        || g.area.toLowerCase().includes(q);
      return matchArea && matchQ;
    });
  }, [busqueda, areaFiltro]);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "resumenes", label: "Resúmenes", count: resumenesFiltered.length },
    { id: "articulos", label: "Artículos clave", count: articulosFiltered.length },
    { id: "guias",     label: "Guías prácticas", count: guiasFiltered.length },
  ];

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#13293d] via-[#18435a] to-[#2a628f] py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/inicio"
            className="inline-flex items-center gap-2 text-[#9ac1e2] hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Material de Estudio
              </h1>
              <p className="text-[#9ac1e2] text-base max-w-2xl">
                Resúmenes por área, artículos clave y guías prácticas del derecho guatemalteco.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-8">
            {[
              { n: "7", label: "Áreas del derecho" },
              { n: "28+", label: "Artículos de referencia" },
              { n: "5", label: "Guías paso a paso" },
            ].map(({ n, label }) => (
              <div key={label} className="bg-white/10 rounded-xl px-4 py-2.5">
                <span className="text-white font-bold text-lg">{n}</span>
                <span className="text-[#9ac1e2] text-sm ml-2">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white border-b border-[#9ac1e2] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a8aaa]" />
            <input
              type="text"
              placeholder="Buscar por artículo, área o tema…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-[#9ac1e2] bg-[#f8fcff] text-sm text-[#13293d] placeholder-[#5a8aaa] focus:outline-none focus:ring-2 focus:ring-[#2a628f]/30"
            />
            {busqueda && (
              <button onClick={() => setBusqueda("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-[#5a8aaa]" />
              </button>
            )}
          </div>

          {/* Tabs + filtro de área */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    tab === t.id
                      ? "bg-[#2a628f] text-white"
                      : "text-[#5a8aaa] hover:bg-[#d8e9f5]"
                  }`}
                >
                  {t.label}
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${tab === t.id ? "bg-white/20" : "bg-[#d8e9f5] text-[#2a628f]"}`}>
                    {t.count}
                  </span>
                </button>
              ))}
            </div>

            <select
              value={areaFiltro}
              onChange={(e) => setAreaFiltro(e.target.value)}
              className="text-sm border border-[#9ac1e2] rounded-lg px-3 py-1.5 bg-white text-[#13293d] focus:outline-none focus:ring-2 focus:ring-[#2a628f]/30"
            >
              {AREAS_FILTRO.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Tab: Resúmenes ── */}
        {tab === "resumenes" && (
          <div className="space-y-4">
            {resumenesFiltered.length === 0 ? (
              <EmptyState mensaje="No se encontraron resúmenes para tu búsqueda." />
            ) : (
              resumenesFiltered.map((r) => <ResumenCard key={r.id} r={r} />)
            )}
          </div>
        )}

        {/* ── Tab: Artículos clave ── */}
        {tab === "articulos" && (
          <div>
            <p className="text-sm text-[#5a8aaa] mb-4">
              {articulosFiltered.length} artículo{articulosFiltered.length !== 1 ? "s" : ""} — haz clic en <Copy className="inline h-3.5 w-3.5" /> para copiar
            </p>
            <div className="space-y-3">
              {articulosFiltered.length === 0 ? (
                <EmptyState mensaje="No se encontraron artículos para tu búsqueda." />
              ) : (
                articulosFiltered.map((a) => <ArticuloCard key={a.id} a={a} />)
              )}
            </div>
          </div>
        )}

        {/* ── Tab: Guías prácticas ── */}
        {tab === "guias" && (
          <div className="space-y-4">
            {guiasFiltered.length === 0 ? (
              <EmptyState mensaje="No se encontraron guías para tu búsqueda." />
            ) : (
              guiasFiltered.map((g) => <GuiaCard key={g.id} g={g} />)
            )}
          </div>
        )}

        {/* Footer: recursos externos */}
        <div className="mt-12 rounded-2xl border border-[#9ac1e2] bg-white px-6 py-6">
          <p className="text-xs font-bold text-[#2a628f] uppercase tracking-wider mb-4">
            Recursos oficiales de Guatemala
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Portal SAT — Tributación", url: "https://portal.sat.gob.gt" },
              { label: "Registro Mercantil", url: "https://registromercantil.gob.gt" },
              { label: "Guatecompras", url: "https://www.guatecompras.gt" },
              { label: "CC — Jurisprudencia", url: "https://cc.gob.gt" },
              { label: "Organismo Judicial", url: "https://oj.gob.gt" },
              { label: "Congreso — Leyes vigentes", url: "https://www.congreso.gob.gt" },
            ].map(({ label, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#2a628f] hover:text-[#18435a] transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ mensaje }: { mensaje: string }) {
  return (
    <div className="text-center py-16">
      <BookOpen className="h-10 w-10 text-[#9ac1e2] mx-auto mb-3" />
      <p className="text-sm text-[#5a8aaa]">{mensaje}</p>
    </div>
  );
}
