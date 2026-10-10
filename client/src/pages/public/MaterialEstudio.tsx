import { useState, useMemo, useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, MagnifyingGlass, X, CaretDown, CaretUp, Copy, Check,
  ArrowLeft, ArrowSquareOut, ListChecks, Lightbulb, Clock,
  ArrowRight, Cards, CheckCircle, Circle, Trophy, Star,
  Brain, ArrowCounterClockwise, Question,
} from "@phosphor-icons/react";
import {
  resumenes, articulosClave, guias, AREAS_FILTRO,
  type Resumen, type ArticuloClave, type GuiaPractica,
} from "../../data/material";

// ─── Color map ───────────────────────────────────────────────────────────────

const COLOR_MAP: Record<string, { bg: string; border: string; badge: string; text: string; dot: string; gradient: string }> = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   badge: "bg-blue-100 text-blue-700",   text: "text-blue-700",   dot: "bg-blue-500",   gradient: "from-blue-600 to-blue-800" },
  red:    { bg: "bg-red-50",    border: "border-red-200",    badge: "bg-red-100 text-red-700",     text: "text-red-700",    dot: "bg-red-500",    gradient: "from-red-600 to-red-800" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  badge: "bg-green-100 text-green-700", text: "text-green-700",  dot: "bg-green-500",  gradient: "from-green-600 to-green-800" },
  teal:   { bg: "bg-teal-50",   border: "border-teal-200",   badge: "bg-teal-100 text-teal-700",   text: "text-teal-700",   dot: "bg-teal-500",   gradient: "from-teal-600 to-teal-800" },
  amber:  { bg: "bg-amber-50",  border: "border-amber-200",  badge: "bg-amber-100 text-amber-700", text: "text-amber-700",  dot: "bg-amber-500",  gradient: "from-amber-500 to-amber-700" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-100 text-purple-700", text: "text-purple-700", dot: "bg-purple-500", gradient: "from-purple-600 to-purple-800" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-100 text-orange-700", text: "text-orange-700", dot: "bg-orange-500", gradient: "from-orange-500 to-orange-700" },
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

// ─── Hook: localStorage progress ────────────────────────────────────────────

function useProgress(key: string) {
  const [leidos, setLeidos] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch { return new Set(); }
  });

  const toggle = (id: string) => {
    setLeidos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { localStorage.setItem(key, JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  return { leidos, toggle };
}

// ─── Componente: Mini Quiz ───────────────────────────────────────────────────

function MiniQuiz({ preguntas, color }: { preguntas: Resumen["preguntas"]; color: string }) {
  const c = COLOR_MAP[color] ?? COLOR_MAP.blue;
  const [iniciado, setIniciado] = useState(false);
  const [idx, setIdx] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [correctas, setCorrectas] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const reiniciar = () => {
    setIdx(0);
    setSeleccion(null);
    setCorrectas(0);
    setTerminado(false);
    setIniciado(true);
  };

  if (!iniciado) {
    return (
      <div className={`rounded-2xl border-2 border-dashed ${c.border} ${c.bg} px-5 py-4 flex items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <Brain weight="duotone" className={`h-6 w-6 ${c.text} flex-shrink-0`} />
          <div>
            <p className="text-sm font-bold text-[#13293d]">¿Entendiste el tema?</p>
            <p className="text-xs text-[#5a8aaa]">{preguntas.length} preguntas rápidas para comprobarlo</p>
          </div>
        </div>
        <button
          onClick={() => setIniciado(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${c.badge} border ${c.border} hover:opacity-80 transition-opacity whitespace-nowrap`}
        >
          <Question weight="bold" className="h-4 w-4" />
          Iniciar quiz
        </button>
      </div>
    );
  }

  const pregunta = preguntas[idx];

  if (terminado) {
    const pct = Math.round((correctas / preguntas.length) * 100);
    const emoji = pct === 100 ? "🏆" : pct >= 60 ? "👍" : "📖";
    const msg =
      pct === 100 ? "¡Perfecto! Dominaste este tema." :
      pct >= 60   ? "Buen trabajo. Repasa las que fallaste." :
                    "Sigue estudiando y vuelve a intentarlo.";
    return (
      <div className={`rounded-2xl border ${c.border} ${c.bg} px-5 py-5 text-center space-y-3`}>
        <p className="text-3xl">{emoji}</p>
        <p className="text-lg font-bold text-[#13293d]">
          {correctas}/{preguntas.length} correctas
        </p>
        <div className="h-2 bg-white/60 rounded-full overflow-hidden mx-auto max-w-xs">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              pct === 100 ? "bg-green-500" : pct >= 60 ? "bg-[#2a628f]" : "bg-red-400"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-sm text-[#16324f]">{msg}</p>
        <button
          onClick={reiniciar}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${c.border} ${c.badge} hover:opacity-80 transition-opacity`}
        >
          <ArrowCounterClockwise weight="bold" className="h-4 w-4" />
          Intentar de nuevo
        </button>
      </div>
    );
  }

  const confirmar = (i: number) => {
    if (seleccion !== null) return;
    setSeleccion(i);
    if (i === pregunta.correcta) setCorrectas((n) => n + 1);
  };

  const siguiente = () => {
    if (idx + 1 >= preguntas.length) {
      setTerminado(true);
    } else {
      setIdx((n) => n + 1);
      setSeleccion(null);
    }
  };

  return (
    <div className={`rounded-2xl border ${c.border} overflow-hidden`}>
      {/* Cabecera */}
      <div className={`${c.bg} px-5 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Brain weight="duotone" className={`h-4 w-4 ${c.text}`} />
          <span className="text-xs font-bold text-[#13293d]">Quiz rápido</span>
        </div>
        <span className="text-xs text-[#5a8aaa]">Pregunta {idx + 1} de {preguntas.length}</span>
      </div>

      {/* Pregunta */}
      <div className="bg-white px-5 py-4 space-y-4">
        <p className="text-sm font-semibold text-[#13293d] leading-relaxed">{pregunta.pregunta}</p>

        {/* Opciones */}
        <div className="space-y-2">
          {pregunta.opciones.map((op, i) => {
            const esCorrecta = i === pregunta.correcta;
            const esSeleccionada = i === seleccion;
            const respondido = seleccion !== null;

            let cls = "border text-left w-full px-4 py-2.5 rounded-xl text-sm transition-all ";
            if (!respondido) {
              cls += "border-[#9ac1e2] hover:border-[#2a628f] hover:bg-[#f0f7ff] text-[#16324f]";
            } else if (esCorrecta) {
              cls += "border-green-400 bg-green-50 text-green-800 font-semibold";
            } else if (esSeleccionada) {
              cls += "border-red-300 bg-red-50 text-red-700";
            } else {
              cls += "border-[#d8e9f5] text-[#5a8aaa] opacity-60";
            }

            return (
              <button key={i} onClick={() => confirmar(i)} disabled={respondido} className={cls}>
                <span className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    !respondido ? "border-[#9ac1e2] text-[#5a8aaa]" :
                    esCorrecta ? "border-green-500 bg-green-500 text-white" :
                    esSeleccionada ? "border-red-400 bg-red-400 text-white" :
                    "border-[#d8e9f5] text-[#9ac1e2]"
                  }`}>
                    {!respondido ? String.fromCharCode(65 + i) :
                      esCorrecta ? "✓" : esSeleccionada ? "✗" : String.fromCharCode(65 + i)}
                  </span>
                  {op}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explicación + siguiente */}
        {seleccion !== null && (
          <div className="space-y-3">
            <div className={`rounded-xl px-4 py-3 flex gap-2 text-xs leading-relaxed ${
              seleccion === pregunta.correcta
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}>
              <Lightbulb weight="duotone" className="h-4 w-4 flex-shrink-0 mt-0.5" />
              {pregunta.explicacion}
            </div>
            <button
              onClick={siguiente}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-gradient-to-r ${c.gradient} text-white hover:opacity-90 transition-opacity`}
            >
              {idx + 1 >= preguntas.length ? (
                <><Trophy weight="duotone" className="h-4 w-4" /> Ver resultado</>
              ) : (
                <>Siguiente pregunta <ArrowRight weight="bold" className="h-4 w-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Componente: Tarjeta de Resumen ─────────────────────────────────────────

function ResumenCard({ r, leido, onToggle }: { r: Resumen; leido: boolean; onToggle: () => void }) {
  const [abierto, setAbierto] = useState(false);
  const c = COLOR_MAP[r.color] ?? COLOR_MAP.blue;

  return (
    <div className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden transition-all duration-200 ${
      leido ? "border-green-300 opacity-90" : c.border
    }`}>
      {/* Cabecera coloreada */}
      <div className={`bg-gradient-to-r ${c.gradient} px-5 py-4 flex items-center gap-3`}>
        <span className="text-2xl">{r.icono}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-white leading-tight">{r.area}</h3>
          <p className="text-xs text-white/70 mt-0.5 truncate">{r.decreto}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          title={leido ? "Marcar como no leído" : "Marcar como leído"}
          className="flex-shrink-0 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
        >
          {leido
            ? <CheckCircle weight="fill" className="h-5 w-5 text-green-300" />
            : <Circle weight="regular" className="h-5 w-5 text-white/60" />}
        </button>
      </div>

      {/* Cuerpo */}
      <button
        onClick={() => setAbierto((p) => !p)}
        className="w-full text-left px-5 py-4 flex items-start gap-3"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#16324f] leading-relaxed line-clamp-2">{r.descripcion}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-[#5a8aaa] flex items-center gap-1">
              <Star weight="duotone" className={`h-3.5 w-3.5 ${c.text}`} />
              {r.principios.length} principios
            </span>
            <span className="text-xs text-[#5a8aaa]">·</span>
            <span className="text-xs text-[#5a8aaa]">{r.articulos_clave.length} artículos clave</span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          {abierto
            ? <CaretUp weight="bold" className="h-4 w-4 text-[#5a8aaa]" />
            : <CaretDown weight="bold" className="h-4 w-4 text-[#5a8aaa]" />}
        </div>
      </button>

      {abierto && (
        <div className="px-5 pb-6 space-y-5 border-t border-[#d8e9f5]">
          <p className="text-sm text-[#16324f] leading-relaxed pt-4">{r.descripcion}</p>

          {/* Principios */}
          <div>
            <p className="text-xs font-bold text-[#2a628f] uppercase tracking-wider mb-3">
              Principios fundamentales
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {r.principios.map((p) => (
                <div key={p} className={`flex items-start gap-2 text-xs ${c.bg} ${c.border} border rounded-lg px-3 py-2`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1 flex-shrink-0`} />
                  <span className="text-[#16324f] leading-snug">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Artículos clave */}
          <div>
            <p className="text-xs font-bold text-[#2a628f] uppercase tracking-wider mb-3">
              Artículos más citados
            </p>
            <div className="space-y-2">
              {r.articulos_clave.map((a) => (
                <div key={a.numero} className={`rounded-xl ${c.bg} px-4 py-3 flex gap-3`}>
                  <span className={`text-xs font-bold ${c.text} flex-shrink-0 w-16`}>{a.numero}</span>
                  <span className="text-xs text-[#16324f] leading-relaxed">{a.texto}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dato clave */}
          <div className={`rounded-xl border ${c.border} ${c.bg} px-4 py-3 flex gap-3`}>
            <Lightbulb weight="duotone" className={`h-4 w-4 ${c.text} flex-shrink-0 mt-0.5`} />
            <p className="text-xs text-[#16324f] leading-relaxed">{r.dato_clave}</p>
          </div>

          {/* Mini Quiz */}
          <MiniQuiz preguntas={r.preguntas} color={r.color} />

          {/* Botón marcar */}
          <button
            onClick={onToggle}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
              leido
                ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                : `${c.bg} ${c.text} border ${c.border} hover:opacity-80`
            }`}
          >
            {leido ? (
              <><CheckCircle weight="fill" className="h-4 w-4" /> Leído — clic para desmarcar</>
            ) : (
              <><Circle weight="regular" className="h-4 w-4" /> Marcar como leído</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Componente: Tarjeta de Artículo (lista) ─────────────────────────────────

function ArticuloCard({ a }: { a: ArticuloClave }) {
  const [copiado, setCopiado] = useState(false);
  const colorClass = AREA_COLOR[a.area] ?? "bg-gray-100 text-gray-600 border-gray-200";

  const copiar = () => {
    navigator.clipboard.writeText(`${a.articulo} ${a.codigo}: ${a.texto}`);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#9ac1e2] shadow-sm p-4 flex gap-3 hover:border-[#2a628f]/40 hover:shadow-md transition-all">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-sm font-bold text-[#2a628f]">{a.articulo}</span>
          <span className="text-xs text-[#5a8aaa] font-medium">{a.codigo}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${colorClass}`}>{a.area}</span>
        </div>
        <p className="text-sm text-[#16324f] leading-relaxed">{a.texto}</p>
        <p className="text-xs text-[#5a8aaa] mt-1.5 italic">{a.relevancia}</p>
      </div>
      <button
        onClick={copiar}
        title="Copiar texto"
        className="flex-shrink-0 self-start p-1.5 rounded-lg hover:bg-[#d8e9f5] transition-colors"
      >
        {copiado
          ? <Check weight="bold" className="h-4 w-4 text-green-600" />
          : <Copy weight="duotone" className="h-4 w-4 text-[#5a8aaa]" />}
      </button>
    </div>
  );
}

// ─── Componente: Modo Flashcard ───────────────────────────────────────────────

function FlashcardMode({ articulos }: { articulos: ArticuloClave[] }) {
  const [idx, setIdx] = useState(0);
  const [volteado, setVolteado] = useState(false);
  const [vistos, setVistos] = useState<Set<number>>(new Set());

  useEffect(() => { setVolteado(false); }, [idx]);

  const card = articulos[idx];
  if (!card) return null;

  const colorClass = AREA_COLOR[card.area] ?? "bg-gray-100 text-gray-600 border-gray-200";
  const pct = Math.round((vistos.size / articulos.length) * 100);

  const marcarVisto = () => setVistos((p) => { const n = new Set(p); n.add(idx); return n; });
  const prev = () => setIdx((i) => (i > 0 ? i - 1 : articulos.length - 1));
  const next = () => { marcarVisto(); setIdx((i) => (i < articulos.length - 1 ? i + 1 : 0)); };

  return (
    <div className="space-y-5">
      {/* Barra de progreso */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-[#d8e9f5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2a628f] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-[#5a8aaa] whitespace-nowrap">
          {vistos.size}/{articulos.length} vistos
        </span>
      </div>

      {/* Tarjeta flip */}
      <div
        className="cursor-pointer select-none"
        style={{ perspective: "1000px" }}
        onClick={() => { setVolteado((v) => !v); if (!volteado) marcarVisto(); }}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: volteado ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "220px",
          }}
        >
          {/* Frente */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#2a628f] to-[#13293d] rounded-2xl p-8 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colorClass} mb-4`}>
              {card.area}
            </span>
            <p className="text-2xl font-bold text-white mb-2">{card.articulo}</p>
            <p className="text-sm text-[#9ac1e2]">{card.codigo}</p>
            <p className="text-xs text-white/50 mt-6">Toca para ver el texto</p>
          </div>

          {/* Reverso */}
          <div
            className="absolute inset-0 bg-white border-2 border-[#9ac1e2] rounded-2xl p-8 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colorClass} mb-4`}>
              {card.area} · {card.articulo}
            </span>
            <p className="text-base font-medium text-[#13293d] leading-relaxed mb-3">{card.texto}</p>
            <p className="text-xs text-[#5a8aaa] italic">{card.relevancia}</p>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={prev}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#9ac1e2] text-sm font-medium text-[#2a628f] hover:bg-[#d8e9f5] transition-colors"
        >
          <ArrowLeft weight="bold" className="h-4 w-4" /> Anterior
        </button>

        <span className="text-sm font-semibold text-[#5a8aaa]">
          {idx + 1} / {articulos.length}
        </span>

        <button
          onClick={next}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2a628f] text-white text-sm font-medium hover:bg-[#18435a] transition-colors"
        >
          Siguiente <ArrowRight weight="bold" className="h-4 w-4" />
        </button>
      </div>

      {vistos.size === articulos.length && (
        <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-4 flex items-center gap-3 text-sm text-green-700 font-medium">
          <Trophy weight="duotone" className="h-5 w-5 text-green-600 flex-shrink-0" />
          ¡Revisaste todos los artículos de esta selección!
        </div>
      )}
    </div>
  );
}

// ─── Componente: Tarjeta de Guía ─────────────────────────────────────────────

function GuiaCard({ g, completada, onToggle }: { g: GuiaPractica; completada: boolean; onToggle: () => void }) {
  const [abierto, setAbierto] = useState(false);
  const [stepsCheck, setStepsCheck] = useState<Set<number>>(() => {
    try {
      const raw = localStorage.getItem(`guia_steps_${g.id}`);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch { return new Set(); }
  });

  const colorClass = AREA_COLOR[g.area] ?? "bg-gray-100 text-gray-600 border-gray-200";
  const stepsPct = g.pasos.length > 0 ? Math.round((stepsCheck.size / g.pasos.length) * 100) : 0;

  const toggleStep = (num: number) => {
    setStepsCheck((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num); else next.add(num);
      try { localStorage.setItem(`guia_steps_${g.id}`, JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  return (
    <div className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden transition-all duration-200 ${
      completada ? "border-green-300" : "border-[#9ac1e2]"
    }`}>
      <button
        onClick={() => setAbierto((p) => !p)}
        className="w-full text-left px-5 py-5 flex items-start gap-4"
      >
        <div className="w-11 h-11 rounded-xl bg-[#d8e9f5] flex items-center justify-center flex-shrink-0 relative">
          <ListChecks weight="duotone" className="h-5 w-5 text-[#2a628f]" />
          {completada && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <Check weight="bold" className="h-2.5 w-2.5 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-[#13293d] leading-tight">{g.titulo}</h3>
          <div className="flex flex-wrap gap-2 mt-1.5">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${colorClass}`}>{g.area}</span>
            <span className="text-xs text-[#5a8aaa] flex items-center gap-1">
              <Clock weight="duotone" className="h-3 w-3" />{g.duracion}
            </span>
            {stepsPct > 0 && (
              <span className="text-xs text-green-600 font-medium">{stepsPct}% completado</span>
            )}
          </div>
          {!abierto && (
            <p className="text-sm text-[#16324f] mt-1.5 line-clamp-2 leading-relaxed">{g.descripcion}</p>
          )}
        </div>
        <div className="flex-shrink-0 mt-0.5">
          {abierto
            ? <CaretUp weight="bold" className="h-4 w-4 text-[#5a8aaa]" />
            : <CaretDown weight="bold" className="h-4 w-4 text-[#5a8aaa]" />}
        </div>
      </button>

      {abierto && (
        <div className="px-5 pb-6 space-y-5 border-t border-[#d8e9f5]">
          <p className="text-sm text-[#16324f] leading-relaxed pt-4">{g.descripcion}</p>

          {/* Progreso de pasos */}
          {g.pasos.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-[#2a628f] uppercase tracking-wider">
                  Pasos a seguir
                </p>
                <span className="text-xs text-[#5a8aaa]">{stepsCheck.size}/{g.pasos.length}</span>
              </div>
              <div className="h-1.5 bg-[#d8e9f5] rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-[#2a628f] rounded-full transition-all duration-500"
                  style={{ width: `${stepsPct}%` }}
                />
              </div>
              <div className="space-y-3">
                {g.pasos.map((paso) => {
                  const checked = stepsCheck.has(paso.numero);
                  return (
                    <div
                      key={paso.numero}
                      className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                        checked ? "bg-green-50 border border-green-200" : "hover:bg-[#f0f7ff]"
                      }`}
                      onClick={() => toggleStep(paso.numero)}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        checked ? "bg-green-500" : "bg-[#2a628f]"
                      }`}>
                        {checked
                          ? <Check weight="bold" className="h-3.5 w-3.5 text-white" />
                          : <span className="text-white text-xs font-bold">{paso.numero}</span>}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold mb-0.5 ${checked ? "text-green-700 line-through" : "text-[#13293d]"}`}>
                          {paso.titulo}
                        </p>
                        <p className={`text-sm leading-relaxed ${checked ? "text-green-600/70" : "text-[#16324f]"}`}>
                          {paso.detalle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
            <Lightbulb weight="duotone" className="h-4 w-4 text-[#2a628f] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#16324f] leading-relaxed">{g.consejo}</p>
          </div>

          <button
            onClick={onToggle}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
              completada
                ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                : "bg-[#d8e9f5] text-[#2a628f] border border-[#9ac1e2] hover:bg-[#c8dff0]"
            }`}
          >
            {completada ? (
              <><CheckCircle weight="fill" className="h-4 w-4" /> Guía completada — clic para desmarcar</>
            ) : (
              <><Circle weight="regular" className="h-4 w-4" /> Marcar guía como completada</>
            )}
          </button>
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
  const [modoFlash, setModoFlash] = useState(false);

  const { leidos: resumenesLeidos, toggle: toggleResumen } = useProgress("material_resumenes_leidos");
  const { leidos: guiasCompletadas, toggle: toggleGuia } = useProgress("material_guias_completadas");

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

  const tabs: { id: Tab; label: string; icon: ReactNode; count: number }[] = [
    { id: "resumenes", label: "Resúmenes",       icon: <BookOpen weight="duotone" className="h-4 w-4" />,    count: resumenesFiltered.length },
    { id: "articulos", label: "Artículos clave", icon: <Copy weight="duotone" className="h-4 w-4" />,        count: articulosFiltered.length },
    { id: "guias",     label: "Guías prácticas", icon: <ListChecks weight="duotone" className="h-4 w-4" />,  count: guiasFiltered.length },
  ];

  // Progreso total
  const totalLeidos = resumenesLeidos.size + guiasCompletadas.size;
  const totalItems  = resumenes.length + guias.length;
  const progresoPct = totalItems > 0 ? Math.round((totalLeidos / totalItems) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#13293d] via-[#18435a] to-[#2a628f] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/inicio"
            className="inline-flex items-center gap-2 text-[#9ac1e2] hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            Volver al inicio
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <BookOpen weight="duotone" className="h-6 w-6 text-white" />
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

          {/* Estadísticas + progreso */}
          <div className="bg-white/10 rounded-2xl p-5">
            <div className="flex flex-wrap gap-4 mb-4">
              {[
                { n: resumenes.length.toString(),      label: "Resúmenes de área" },
                { n: `${articulosClave.length}+`,      label: "Artículos de referencia" },
                { n: guias.length.toString(),          label: "Guías paso a paso" },
              ].map(({ n, label }) => (
                <div key={label} className="flex items-baseline gap-2">
                  <span className="text-white font-bold text-xl">{n}</span>
                  <span className="text-[#9ac1e2] text-sm">{label}</span>
                </div>
              ))}
            </div>

            {/* Barra de progreso personal */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-[#9ac1e2]">Tu progreso</span>
                <span className="text-xs font-bold text-white">{totalLeidos}/{totalItems} completados</span>
              </div>
              <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full transition-all duration-700"
                  style={{ width: `${progresoPct}%` }}
                />
              </div>
              {progresoPct === 100 && (
                <p className="text-xs text-green-300 mt-1.5 flex items-center gap-1.5">
                  <Trophy weight="duotone" className="h-3.5 w-3.5" />
                  ¡Completaste todo el material!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white border-b border-[#9ac1e2] sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          {/* Búsqueda */}
          <div className="relative">
            <MagnifyingGlass weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a8aaa]" />
            <input
              type="text"
              placeholder="Buscar por artículo, área o tema…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-[#9ac1e2] bg-[#f8fcff] text-sm text-[#13293d] placeholder-[#5a8aaa] focus:outline-none focus:ring-2 focus:ring-[#2a628f]/30"
            />
            {busqueda && (
              <button onClick={() => setBusqueda("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X weight="bold" className="h-4 w-4 text-[#5a8aaa]" />
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setModoFlash(false); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                  tab === t.id
                    ? "bg-[#2a628f] text-white"
                    : "text-[#5a8aaa] hover:bg-[#d8e9f5]"
                }`}
              >
                {t.icon}
                {t.label}
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  tab === t.id ? "bg-white/20" : "bg-[#d8e9f5] text-[#2a628f]"
                }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Filtro de área — chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {AREAS_FILTRO.map((a) => (
              <button
                key={a}
                onClick={() => setAreaFiltro(a)}
                className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap transition-colors border ${
                  areaFiltro === a
                    ? "bg-[#13293d] text-white border-[#13293d]"
                    : "bg-white text-[#5a8aaa] border-[#9ac1e2] hover:border-[#2a628f] hover:text-[#2a628f]"
                }`}
              >
                {a}
              </button>
            ))}
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
              resumenesFiltered.map((r) => (
                <ResumenCard
                  key={r.id}
                  r={r}
                  leido={resumenesLeidos.has(r.id)}
                  onToggle={() => toggleResumen(r.id)}
                />
              ))
            )}
          </div>
        )}

        {/* ── Tab: Artículos clave ── */}
        {tab === "articulos" && (
          <div>
            {/* Cabecera con toggle de modo */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <p className="text-sm text-[#5a8aaa]">
                {articulosFiltered.length} artículo{articulosFiltered.length !== 1 ? "s" : ""}
              </p>
              <button
                onClick={() => setModoFlash((v) => !v)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
                  modoFlash
                    ? "bg-[#2a628f] text-white border-[#2a628f]"
                    : "bg-white text-[#2a628f] border-[#9ac1e2] hover:bg-[#d8e9f5]"
                }`}
              >
                <Cards weight="duotone" className="h-4 w-4" />
                {modoFlash ? "Modo lista" : "Modo repaso (flash)"}
              </button>
            </div>

            {articulosFiltered.length === 0 ? (
              <EmptyState mensaje="No se encontraron artículos para tu búsqueda." />
            ) : modoFlash ? (
              <FlashcardMode articulos={articulosFiltered} />
            ) : (
              <div className="space-y-3">
                {articulosFiltered.map((a) => <ArticuloCard key={a.id} a={a} />)}
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Guías prácticas ── */}
        {tab === "guias" && (
          <div className="space-y-4">
            {guiasFiltered.length === 0 ? (
              <EmptyState mensaje="No se encontraron guías para tu búsqueda." />
            ) : (
              guiasFiltered.map((g) => (
                <GuiaCard
                  key={g.id}
                  g={g}
                  completada={guiasCompletadas.has(g.id)}
                  onToggle={() => toggleGuia(g.id)}
                />
              ))
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
              { label: "Portal SAT — Tributación",   url: "https://portal.sat.gob.gt" },
              { label: "Registro Mercantil",         url: "https://registromercantil.gob.gt" },
              { label: "Guatecompras",               url: "https://www.guatecompras.gt" },
              { label: "CC — Jurisprudencia",        url: "https://cc.gob.gt" },
              { label: "Organismo Judicial",         url: "https://oj.gob.gt" },
              { label: "Congreso — Leyes vigentes",  url: "https://www.congreso.gob.gt" },
            ].map(({ label, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#2a628f] hover:text-[#18435a] transition-colors group"
              >
                <ArrowSquareOut weight="duotone" className="h-3.5 w-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
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
      <BookOpen weight="duotone" className="h-10 w-10 text-[#9ac1e2] mx-auto mb-3" />
      <p className="text-sm text-[#5a8aaa]">{mensaje}</p>
    </div>
  );
}
