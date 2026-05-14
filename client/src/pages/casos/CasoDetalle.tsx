import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, ChevronRight, Check, X,
  Scale, Trophy, RotateCcw, Gavel, FileText,
} from 'lucide-react';
import { casosPracticos } from '../../data/casos';

const DIFICULTAD_COLOR: Record<string, string> = {
  'Básico':     'bg-emerald-50 text-emerald-700',
  'Intermedio': 'bg-amber-50 text-amber-700',
  'Avanzado':   'bg-red-50 text-red-700',
};

export default function CasoDetalle() {
  const { id } = useParams<{ id: string }>();
  const caso = casosPracticos.find((c) => c.id === id);

  const [fase, setFase] = useState<'lectura' | 'preguntas' | 'resultados'>('lectura');
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<(number | null)[]>([]);
  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  const [confirmada, setConfirmada] = useState(false);

  if (!caso) {
    return (
      <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-[#16324f] text-lg font-medium mb-4">Caso no encontrado</p>
          <Link to="/casos" className="text-[#2a628f] hover:underline font-medium">
            ← Volver a Casos Prácticos
          </Link>
        </div>
      </div>
    );
  }

  const pregunta = caso.preguntas[preguntaActual];
  const totalPreguntas = caso.preguntas.length;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const iniciarPreguntas = () => {
    setRespuestas(new Array(totalPreguntas).fill(null));
    setPreguntaActual(0);
    setSeleccionada(null);
    setConfirmada(false);
    setFase('preguntas');
  };

  const confirmarRespuesta = () => {
    if (seleccionada === null) return;
    setConfirmada(true);
    const nuevas = [...respuestas];
    nuevas[preguntaActual] = seleccionada;
    setRespuestas(nuevas);
  };

  const siguiente = () => {
    if (preguntaActual + 1 < totalPreguntas) {
      setPreguntaActual((p) => p + 1);
      setSeleccionada(null);
      setConfirmada(false);
    } else {
      setFase('resultados');
    }
  };

  const reiniciar = () => {
    setFase('lectura');
    setPreguntaActual(0);
    setRespuestas([]);
    setSeleccionada(null);
    setConfirmada(false);
  };

  const correctas = respuestas.filter((r, i) => r === caso.preguntas[i].correcta).length;
  const puntaje = Math.round((correctas / totalPreguntas) * 100);

  // ── Render: lectura ─────────────────────────────────────────────────────────
  if (fase === 'lectura') {
    return (
      <div className="min-h-screen bg-[#f0f7ff]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#13293d] to-[#2a628f] py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/casos"
              className="inline-flex items-center gap-2 text-[#9ac1e2] hover:text-white text-sm mb-5 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Casos Prácticos
            </Link>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white`}>
                {caso.area}
              </span>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${DIFICULTAD_COLOR[caso.dificultad]}`}>
                {caso.dificultad}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{caso.titulo}</h1>
            <p className="text-[#9ac1e2] text-sm">{totalPreguntas} preguntas · Lee el caso y luego responde</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {/* Hechos del caso */}
          <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 bg-[#f0f7ff] border-b border-[#d8e9f5]">
              <Gavel className="h-5 w-5 text-[#2a628f]" />
              <h2 className="font-bold text-[#13293d]">Hechos del Caso</h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-[#16324f] text-sm leading-7 whitespace-pre-line">{caso.hechos}</p>
            </div>
          </div>

          {/* Normativa aplicable */}
          <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 bg-[#f0f7ff] border-b border-[#d8e9f5]">
              <FileText className="h-5 w-5 text-[#2a628f]" />
              <h2 className="font-bold text-[#13293d]">Normativa Aplicable</h2>
            </div>
            <ul className="px-6 py-4 space-y-2">
              {caso.normativa.map((n, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#16324f]">
                  <Scale className="h-4 w-4 text-[#2a628f] mt-0.5 flex-shrink-0" />
                  {n}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] rounded-2xl p-6 text-center">
            <BookOpen className="h-8 w-8 text-white mx-auto mb-3 opacity-80" />
            <p className="text-white font-semibold mb-1">¿Listo para responder?</p>
            <p className="text-[#9ac1e2] text-sm mb-5">
              Responderás {totalPreguntas} preguntas basadas en los hechos anteriores.
              Cada respuesta incluye una explicación legal detallada.
            </p>
            <button
              onClick={iniciarPreguntas}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-[#2a628f] font-bold text-sm hover:bg-[#d8e9f5] transition-colors"
            >
              Comenzar preguntas
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Render: preguntas ───────────────────────────────────────────────────────
  if (fase === 'preguntas') {
    const esCorrecta = confirmada && seleccionada === pregunta.correcta;

    return (
      <div className="min-h-screen bg-[#f0f7ff]">
        {/* Barra de progreso */}
        <div className="bg-gradient-to-r from-[#13293d] to-[#2a628f] px-4 pt-6 pb-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between text-xs text-[#9ac1e2] mb-2">
              <span>{caso.titulo}</span>
              <span>{preguntaActual + 1} / {totalPreguntas}</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${((preguntaActual + (confirmada ? 1 : 0)) / totalPreguntas) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
          {/* Recordatorio del caso (colapsable) */}
          <details className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden group">
            <summary className="flex items-center justify-between px-5 py-3 cursor-pointer text-sm font-medium text-[#2a628f] hover:bg-[#f0f7ff] transition-colors list-none">
              <span className="flex items-center gap-2">
                <Gavel className="h-4 w-4" />
                Ver hechos del caso
              </span>
              <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
            </summary>
            <div className="px-5 pb-4 border-t border-[#d8e9f5]">
              <p className="text-[#16324f] text-sm leading-6 whitespace-pre-line mt-3">{caso.hechos}</p>
            </div>
          </details>

          {/* Pregunta */}
          <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm p-6">
            <p className="text-xs text-[#9ac1e2] font-medium uppercase tracking-wide mb-3">
              Pregunta {preguntaActual + 1}
            </p>
            <p className="text-[#13293d] font-semibold text-base leading-snug mb-6">
              {pregunta.pregunta}
            </p>

            {/* Opciones */}
            <div className="space-y-3">
              {pregunta.opciones.map((opcion, idx) => {
                let base =
                  'w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm transition-all duration-200 flex items-start gap-3';

                if (!confirmada) {
                  base +=
                    seleccionada === idx
                      ? ' border-[#2a628f] bg-[#d8e9f5] text-[#13293d] font-medium'
                      : ' border-[#d8e9f5] bg-[#f8fbff] text-[#16324f] hover:border-[#9ac1e2] hover:bg-[#f0f7ff]';
                } else {
                  if (idx === pregunta.correcta)
                    base += ' border-emerald-400 bg-emerald-50 text-emerald-800 font-medium';
                  else if (idx === seleccionada)
                    base += ' border-red-300 bg-red-50 text-red-700';
                  else
                    base += ' border-[#d8e9f5] bg-[#f8fbff] text-[#9ac1e2]';
                }

                return (
                  <button
                    key={idx}
                    disabled={confirmada}
                    onClick={() => setSeleccionada(idx)}
                    className={base}
                  >
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5 ${
                        confirmada && idx === pregunta.correcta
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : confirmada && idx === seleccionada
                          ? 'bg-red-400 border-red-400 text-white'
                          : seleccionada === idx
                          ? 'border-[#2a628f] bg-[#2a628f] text-white'
                          : 'border-[#9ac1e2] text-[#9ac1e2]'
                      }`}
                    >
                      {confirmada && idx === pregunta.correcta ? (
                        <Check className="h-3 w-3" />
                      ) : confirmada && idx === seleccionada ? (
                        <X className="h-3 w-3" />
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </span>
                    <span>{opcion}</span>
                  </button>
                );
              })}
            </div>

            {/* Explicación */}
            {confirmada && (
              <div
                className={`mt-5 p-4 rounded-xl border text-sm leading-relaxed ${
                  esCorrecta
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                <p className="font-semibold mb-1">
                  {esCorrecta ? '✓ ¡Correcto!' : '✗ Incorrecto — Explicación:'}
                </p>
                <p>{pregunta.explicacion}</p>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            {!confirmada ? (
              <button
                onClick={confirmarRespuesta}
                disabled={seleccionada === null}
                className="flex-1 py-3 rounded-xl bg-[#2a628f] text-white font-semibold text-sm hover:bg-[#18435a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirmar respuesta
              </button>
            ) : (
              <button
                onClick={siguiente}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2a628f] text-white font-semibold text-sm hover:bg-[#18435a] transition-colors"
              >
                {preguntaActual + 1 < totalPreguntas ? (
                  <>Siguiente pregunta <ChevronRight className="h-4 w-4" /></>
                ) : (
                  <>Ver resultados <Trophy className="h-4 w-4" /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Render: resultados ──────────────────────────────────────────────────────
  const mensaje =
    puntaje === 100
      ? '¡Perfecto! Dominas este caso.'
      : puntaje >= 75
      ? '¡Muy bien! Buen manejo del tema.'
      : puntaje >= 50
      ? 'Vas bien, sigue practicando.'
      : 'Repasa los hechos e inténtalo de nuevo.';

  const colorPuntaje =
    puntaje === 100
      ? 'text-emerald-600'
      : puntaje >= 75
      ? 'text-blue-600'
      : puntaje >= 50
      ? 'text-amber-600'
      : 'text-red-500';

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Resultado principal */}
        <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm p-8 text-center">
          <Trophy className={`h-14 w-14 mx-auto mb-4 ${colorPuntaje}`} />
          <p className={`text-5xl font-bold mb-2 ${colorPuntaje}`}>{puntaje}%</p>
          <p className="text-[#13293d] font-semibold text-lg mb-1">{mensaje}</p>
          <p className="text-[#9ac1e2] text-sm">
            {correctas} de {totalPreguntas} respuestas correctas
          </p>
        </div>

        {/* Revisión por pregunta */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#13293d] px-1">Revisión detallada</h2>
          {caso.preguntas.map((p, i) => {
            const respuesta = respuestas[i];
            const acierto = respuesta === p.correcta;
            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${
                  acierto ? 'border-emerald-200' : 'border-red-200'
                }`}
              >
                <div
                  className={`flex items-center gap-3 px-5 py-3 ${
                    acierto ? 'bg-emerald-50' : 'bg-red-50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      acierto ? 'bg-emerald-500' : 'bg-red-400'
                    }`}
                  >
                    {acierto ? (
                      <Check className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <X className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-[#13293d] flex-1">
                    {i + 1}. {p.pregunta}
                  </p>
                </div>
                <div className="px-5 py-4 space-y-2 text-sm">
                  {!acierto && respuesta !== null && (
                    <p className="text-red-600">
                      <span className="font-medium">Tu respuesta:</span>{' '}
                      {p.opciones[respuesta]}
                    </p>
                  )}
                  <p className="text-emerald-700">
                    <span className="font-medium">Correcta:</span>{' '}
                    {p.opciones[p.correcta]}
                  </p>
                  <p className="text-[#16324f] leading-relaxed border-t border-[#f0f7ff] pt-2 mt-2">
                    {p.explicacion}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Acciones finales */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reiniciar}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#2a628f] text-[#2a628f] font-semibold text-sm hover:bg-[#d8e9f5] transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Intentar de nuevo
          </button>
          <Link
            to="/casos"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2a628f] text-white font-semibold text-sm hover:bg-[#18435a] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Ver otros casos
          </Link>
        </div>
      </div>
    </div>
  );
}
