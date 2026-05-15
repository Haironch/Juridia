import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  ClipboardList, Clock, ChevronRight, Trophy, RotateCcw,
  Check, X, AlertTriangle, BookOpen, TrendingUp, TrendingDown,
  CheckSquare, Square,
} from 'lucide-react';
import { quizTemas } from '../../data/constituquiz';

// ── Tipos ────────────────────────────────────────────────────────────────────

interface ExamenPregunta {
  temaId: string;
  categoria: string;
  enunciado: string;
  opciones: string[];       // arreglo ordenado de textos
  correctaIdx: number;      // índice 0-based dentro del arreglo
}

interface Nivel {
  id: string;
  nombre: string;
  preguntas: number;
  minutos: number;
  descripcion: string;
}

type Fase = 'config' | 'examen' | 'resultados';

// ── Constantes ───────────────────────────────────────────────────────────────

const NIVELES: Nivel[] = [
  {
    id: 'diagnostico',
    nombre: 'Diagnóstico',
    preguntas: 15,
    minutos: 20,
    descripcion: 'Ideal para identificar tus áreas débiles',
  },
  {
    id: 'estandar',
    nombre: 'Simulacro Estándar',
    preguntas: 30,
    minutos: 45,
    descripcion: 'Equivalente al examen privado real',
  },
  {
    id: 'completo',
    nombre: 'Simulacro Completo',
    preguntas: 50,
    minutos: 75,
    descripcion: 'El reto máximo, sin filtros',
  },
];

const AREA_COLOR: Record<string, string> = {
  Constitucional:  'bg-blue-50 text-blue-700 border-blue-200',
  Penal:           'bg-red-50 text-red-700 border-red-200',
  Civil:           'bg-violet-50 text-violet-700 border-violet-200',
  Laboral:         'bg-amber-50 text-amber-700 border-amber-200',
  Mercantil:       'bg-emerald-50 text-emerald-700 border-emerald-200',
  Procesal:        'bg-cyan-50 text-cyan-700 border-cyan-200',
  Notarial:        'bg-orange-50 text-orange-700 border-orange-200',
  Administrativo:  'bg-teal-50 text-teal-700 border-teal-200',
  Tributario:      'bg-lime-50 text-lime-700 border-lime-200',
};

// ── Utilidades ───────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(segundos: number): string {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function buildPool(categoriasSeleccionadas: string[]): ExamenPregunta[] {
  const pool: ExamenPregunta[] = [];
  for (const tema of quizTemas) {
    if (!categoriasSeleccionadas.includes(tema.categoria ?? 'General')) continue;
    for (const p of tema.preguntas) {
      const opcionesMap = p.opciones as Record<string, string>;
      const claves = Object.keys(opcionesMap); // ["A","B","C",...]
      const textos = claves.map((k) => opcionesMap[k]);
      const correctaIdx = claves.indexOf(p.respuestaCorrecta as string);
      if (correctaIdx === -1) continue;
      pool.push({
        temaId: tema.id,
        categoria: tema.categoria ?? 'General',
        enunciado: p.pregunta,
        opciones: textos,
        correctaIdx,
      });
    }
  }
  return pool;
}

// ── Componente principal ─────────────────────────────────────────────────────

export default function ExamenSimulado() {
  const [fase, setFase] = useState<Fase>('config');
  const [nivelId, setNivelId] = useState('estandar');
  const [areasSeleccionadas, setAreasSeleccionadas] = useState<string[]>([]);

  const [preguntas, setPreguntas] = useState<ExamenPregunta[]>([]);
  const [actual, setActual] = useState(0);
  const [respuestas, setRespuestas] = useState<(number | null)[]>([]);
  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  const [segundosRestantes, setSegundosRestantes] = useState(0);
  const [tiempoAgotado, setTiempoAgotado] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const areas = useMemo(
    () => Array.from(new Set(quizTemas.map((t) => t.categoria ?? 'General'))).sort(),
    []
  );

  const nivel = NIVELES.find((n) => n.id === nivelId)!;

  const toggleArea = (area: string) => {
    setAreasSeleccionadas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const seleccionarTodas = () => setAreasSeleccionadas([...areas]);
  const deseleccionarTodas = () => setAreasSeleccionadas([]);

  // Pool disponible dado las áreas seleccionadas
  const poolDisponible = useMemo(
    () => buildPool(areasSeleccionadas),
    [areasSeleccionadas]
  );

  const puedeIniciar = areasSeleccionadas.length >= 2 && poolDisponible.length >= nivel.preguntas;

  // ── Timer ──────────────────────────────────────────────────────────────────

  const finalizarExamen = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setFase('resultados');
  }, []);

  useEffect(() => {
    if (fase !== 'examen') return;
    timerRef.current = setInterval(() => {
      setSegundosRestantes((prev) => {
        if (prev <= 1) {
          setTiempoAgotado(true);
          finalizarExamen();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [fase, finalizarExamen]);

  // ── Iniciar examen ─────────────────────────────────────────────────────────

  const iniciar = () => {
    const pool = shuffle(buildPool(areasSeleccionadas)).slice(0, nivel.preguntas);
    setPreguntas(pool);
    setRespuestas(new Array(pool.length).fill(null));
    setActual(0);
    setSeleccionada(null);
    setSegundosRestantes(nivel.minutos * 60);
    setTiempoAgotado(false);
    setFase('examen');
  };

  // ── Avanzar pregunta ───────────────────────────────────────────────────────

  const avanzar = () => {
    const nuevas = [...respuestas];
    nuevas[actual] = seleccionada;
    setRespuestas(nuevas);

    if (actual + 1 < preguntas.length) {
      setActual((p) => p + 1);
      setSeleccionada(null);
    } else {
      finalizarExamen();
    }
  };

  const reiniciar = () => {
    setFase('config');
    setPreguntas([]);
    setActual(0);
    setRespuestas([]);
    setSeleccionada(null);
    setTiempoAgotado(false);
  };

  // ── Cómputos de resultados ─────────────────────────────────────────────────

  const correctas = respuestas.filter((r, i) => r === preguntas[i]?.correctaIdx).length;
  const puntaje = preguntas.length > 0 ? Math.round((correctas / preguntas.length) * 100) : 0;

  const porCategoria = useMemo(() => {
    const mapa: Record<string, { total: number; correctas: number }> = {};
    preguntas.forEach((p, i) => {
      if (!mapa[p.categoria]) mapa[p.categoria] = { total: 0, correctas: 0 };
      mapa[p.categoria].total++;
      if (respuestas[i] === p.correctaIdx) mapa[p.categoria].correctas++;
    });
    return Object.entries(mapa)
      .map(([cat, v]) => ({ cat, ...v, pct: Math.round((v.correctas / v.total) * 100) }))
      .sort((a, b) => a.pct - b.pct);
  }, [preguntas, respuestas]);

  const tiempoUsado = nivel.minutos * 60 - segundosRestantes;
  const pocoTiempo = segundosRestantes < 300 && segundosRestantes > 0;

  // ─────────────────────────────────────────────────────────────────────────
  // FASE: CONFIG
  // ─────────────────────────────────────────────────────────────────────────

  if (fase === 'config') {
    return (
      <div className="min-h-screen bg-[#f0f7ff]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#13293d] to-[#2a628f] py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-5">
              <ClipboardList className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Examen Simulado</h1>
            <p className="text-[#9ac1e2]">
              Preguntas mezcladas de todas tus materias con tiempo límite, simulando el examen privado real.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
          {/* Selección de nivel */}
          <div>
            <h2 className="text-sm font-bold text-[#13293d] uppercase tracking-wide mb-3">
              1. Elige el nivel
            </h2>
            <div className="grid gap-3">
              {NIVELES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setNivelId(n.id)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all ${
                    nivelId === n.id
                      ? 'border-[#2a628f] bg-[#d8e9f5]'
                      : 'border-[#d8e9f5] bg-white hover:border-[#9ac1e2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#13293d]">{n.nombre}</p>
                      <p className="text-xs text-[#9ac1e2] mt-0.5">{n.descripcion}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-sm font-bold text-[#2a628f]">{n.preguntas} preguntas</p>
                      <p className="text-xs text-[#9ac1e2] flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />{n.minutos} min
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selección de áreas */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#13293d] uppercase tracking-wide">
                2. Elige las áreas a incluir
              </h2>
              <div className="flex gap-3 text-xs font-medium">
                <button onClick={seleccionarTodas} className="text-[#2a628f] hover:underline">
                  Seleccionar todas
                </button>
                <button onClick={deseleccionarTodas} className="text-[#9ac1e2] hover:underline">
                  Limpiar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {areas.map((area) => {
                const sel = areasSeleccionadas.includes(area);
                return (
                  <button
                    key={area}
                    onClick={() => toggleArea(area)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      sel
                        ? 'border-[#2a628f] bg-[#d8e9f5] text-[#13293d]'
                        : 'border-[#d8e9f5] bg-white text-[#16324f] hover:border-[#9ac1e2]'
                    }`}
                  >
                    {sel
                      ? <CheckSquare className="h-4 w-4 text-[#2a628f] flex-shrink-0" />
                      : <Square className="h-4 w-4 text-[#9ac1e2] flex-shrink-0" />
                    }
                    {area}
                  </button>
                );
              })}
            </div>

            {/* Advertencias */}
            {areasSeleccionadas.length > 0 && !puedeIniciar && (
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                {areasSeleccionadas.length < 2
                  ? 'Selecciona al menos 2 áreas.'
                  : `Con las áreas elegidas solo hay ${poolDisponible.length} preguntas disponibles. Necesitas ${nivel.preguntas} para el nivel ${nivel.nombre}. Agrega más áreas o elige un nivel menor.`}
              </div>
            )}

            {puedeIniciar && (
              <p className="mt-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
                ✓ {poolDisponible.length} preguntas disponibles · Se elegirán {nivel.preguntas} al azar
              </p>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={iniciar}
            disabled={!puedeIniciar}
            className="w-full py-4 rounded-2xl bg-[#2a628f] text-white font-bold text-base hover:bg-[#18435a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ClipboardList className="h-5 w-5" />
            Comenzar examen · {nivel.preguntas} preguntas · {nivel.minutos} min
          </button>

          <p className="text-xs text-center text-[#9ac1e2]">
            Una vez iniciado no podrás volver a preguntas anteriores. El examen se entrega automáticamente al agotar el tiempo.
          </p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FASE: EXAMEN
  // ─────────────────────────────────────────────────────────────────────────

  if (fase === 'examen') {
    const pregunta = preguntas[actual];
    const progresoPct = ((actual) / preguntas.length) * 100;

    return (
      <div className="min-h-screen bg-[#f0f7ff] flex flex-col">
        {/* Barra superior fija */}
        <div className={`sticky top-0 z-10 px-4 py-3 border-b shadow-sm ${
          pocoTiempo ? 'bg-red-600' : 'bg-[#13293d]'
        }`}>
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              <span>{actual + 1} / {preguntas.length}</span>
            </div>
            {/* Barra de progreso */}
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progresoPct}%` }}
              />
            </div>
            {/* Timer */}
            <div className={`flex items-center gap-1.5 font-mono font-bold text-sm ${
              pocoTiempo ? 'text-white animate-pulse' : 'text-white'
            }`}>
              <Clock className="h-4 w-4" />
              {formatTime(segundosRestantes)}
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-4">
          {/* Badge de área */}
          <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border ${
            AREA_COLOR[pregunta.categoria] ?? 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            {pregunta.categoria}
          </span>

          {/* Pregunta */}
          <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm p-6">
            <p className="text-[#13293d] font-semibold text-base leading-snug mb-6">
              {pregunta.enunciado}
            </p>

            <div className="space-y-3">
              {pregunta.opciones.map((op, idx) => (
                <button
                  key={idx}
                  onClick={() => setSeleccionada(idx)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm transition-all flex items-start gap-3 ${
                    seleccionada === idx
                      ? 'border-[#2a628f] bg-[#d8e9f5] text-[#13293d] font-medium'
                      : 'border-[#d8e9f5] bg-[#f8fbff] text-[#16324f] hover:border-[#9ac1e2]'
                  }`}
                >
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5 ${
                    seleccionada === idx
                      ? 'border-[#2a628f] bg-[#2a628f] text-white'
                      : 'border-[#9ac1e2] text-[#9ac1e2]'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {op}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={avanzar}
            disabled={seleccionada === null}
            className="w-full py-3.5 rounded-2xl bg-[#2a628f] text-white font-bold text-sm hover:bg-[#18435a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {actual + 1 < preguntas.length ? (
              <>Siguiente <ChevronRight className="h-4 w-4" /></>
            ) : (
              <>Finalizar examen <Trophy className="h-4 w-4" /></>
            )}
          </button>

          <p className="text-center text-xs text-[#9ac1e2]">
            No puedes volver a preguntas anteriores
          </p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FASE: RESULTADOS
  // ─────────────────────────────────────────────────────────────────────────

  const colorPuntaje =
    puntaje >= 80 ? 'text-emerald-600'
    : puntaje >= 60 ? 'text-amber-500'
    : 'text-red-500';

  const mensajePuntaje =
    puntaje >= 80 ? '¡Excelente resultado!'
    : puntaje >= 60 ? 'Buen intento, sigue practicando.'
    : 'Necesitas reforzar más. ¡Tú puedes!';

  const temasFuertes = porCategoria.filter((c) => c.pct >= 70);
  const temasDebiles = porCategoria.filter((c) => c.pct < 70);

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">

        {/* Puntaje principal */}
        <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm p-8 text-center">
          <Trophy className={`h-14 w-14 mx-auto mb-4 ${colorPuntaje}`} />
          <p className={`text-5xl font-bold mb-2 ${colorPuntaje}`}>{puntaje}%</p>
          <p className="text-[#13293d] font-semibold text-lg">{mensajePuntaje}</p>
          <p className="text-[#9ac1e2] text-sm mt-1">
            {correctas} de {preguntas.length} correctas
            {tiempoAgotado && ' · Tiempo agotado'}
            {!tiempoAgotado && ` · Tiempo usado: ${formatTime(tiempoUsado)}`}
          </p>
        </div>

        {/* Desglose por área */}
        <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f0f7ff]">
            <h2 className="font-bold text-[#13293d]">Resultado por área</h2>
          </div>
          <div className="divide-y divide-[#f0f7ff]">
            {porCategoria.map(({ cat, total, correctas: c, pct }) => (
              <div key={cat} className="px-5 py-3 flex items-center gap-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border w-28 text-center flex-shrink-0 ${
                  AREA_COLOR[cat] ?? 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  {cat}
                </span>
                <div className="flex-1 h-2 bg-[#f0f7ff] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      pct >= 70 ? 'bg-emerald-400' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`text-sm font-bold w-12 text-right flex-shrink-0 ${
                  pct >= 70 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-500'
                }`}>
                  {pct}%
                </span>
                <span className="text-xs text-[#9ac1e2] w-12 text-right flex-shrink-0">
                  {c}/{total}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fortalezas y debilidades */}
        <div className="grid sm:grid-cols-2 gap-4">
          {temasFuertes.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <p className="text-sm font-bold text-emerald-700">Puntos fuertes</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {temasFuertes.map(({ cat, pct }) => (
                  <span key={cat} className="text-xs bg-white border border-emerald-200 text-emerald-700 px-2 py-1 rounded-full font-medium">
                    {cat} · {pct}%
                  </span>
                ))}
              </div>
            </div>
          )}
          {temasDebiles.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <p className="text-sm font-bold text-red-600">Áreas a reforzar</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {temasDebiles.map(({ cat, pct }) => (
                  <span key={cat} className="text-xs bg-white border border-red-200 text-red-600 px-2 py-1 rounded-full font-medium">
                    {cat} · {pct}%
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Revisión detallada */}
        <details className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden group">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-[#13293d] hover:bg-[#f0f7ff] transition-colors list-none">
            <span className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-[#2a628f]" />
              Ver revisión pregunta a pregunta
            </span>
            <ChevronRight className="h-4 w-4 text-[#9ac1e2] group-open:rotate-90 transition-transform" />
          </summary>
          <div className="divide-y divide-[#f0f7ff] border-t border-[#d8e9f5]">
            {preguntas.map((p, i) => {
              const resp = respuestas[i];
              const acierto = resp === p.correctaIdx;
              return (
                <div key={i} className="px-5 py-4">
                  <div className="flex items-start gap-2 mb-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      acierto ? 'bg-emerald-500' : 'bg-red-400'
                    }`}>
                      {acierto
                        ? <Check className="h-3 w-3 text-white" />
                        : <X className="h-3 w-3 text-white" />}
                    </div>
                    <p className="text-sm text-[#13293d] font-medium leading-snug">{p.enunciado}</p>
                  </div>
                  {!acierto && resp !== null && (
                    <p className="text-xs text-red-600 ml-7 mb-1">
                      Tu respuesta: {p.opciones[resp]}
                    </p>
                  )}
                  <p className="text-xs text-emerald-700 ml-7">
                    Correcta: {p.opciones[p.correctaIdx]}
                  </p>
                </div>
              );
            })}
          </div>
        </details>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reiniciar}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#2a628f] text-[#2a628f] font-semibold text-sm hover:bg-[#d8e9f5] transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Nuevo examen
          </button>
        </div>
      </div>
    </div>
  );
}
