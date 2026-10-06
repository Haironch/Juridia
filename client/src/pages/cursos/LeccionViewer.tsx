import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  Clock, AlertCircle, ChevronRight, Trophy, Star,
} from "lucide-react";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";

interface Opcion { id: string; texto: string; orden: number; }
interface Pregunta { id: string; texto: string; explicacion: string; opciones: Opcion[]; }
interface ModuloData {
  modulo: { id: string; orden: number; titulo: string; contenido: string; duracion_estimada: number };
  preguntas: Pregunta[];
  progreso: { completado: number; quiz_aprobado: number; puntaje_quiz: number } | null;
}
interface QuizResultado {
  puntaje: number;
  aprobado: boolean;
  aciertos: number;
  total: number;
  detalle: Record<string, boolean>;
  opcionesCorrectas: Record<string, string>;
}

function parseSecciones(raw: string): string[] {
  const parts = raw.split(/(?=\n## )/);
  return parts.map(s => s.trim()).filter(Boolean);
}

export default function LeccionViewer() {
  const { cursoId, moduloId } = useParams<{ cursoId: string; moduloId: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { token } = useAuthStore();

  type Fase = "lectura" | "quiz" | "celebracion" | "resultado";
  const [fase, setFase] = useState<Fase>("lectura");
  const [seccionIdx, setSeccionIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState<QuizResultado | null>(null);

  const authHeaders = { Authorization: `Bearer ${token}` };

  const { data, isLoading, isError } = useQuery<ModuloData>({
    queryKey: ["leccion", cursoId, moduloId],
    queryFn: async () => {
      const res = await api.get<{ ok: boolean; data: ModuloData }>(
        `/api/cursos/${cursoId}/modulos/${moduloId}`,
        { headers: authHeaders }
      );
      return res.data.data;
    },
    enabled: !!cursoId && !!moduloId,
  });

  const { data: cursoData } = useQuery<{ modulos: { id: string; orden: number }[] }>({
    queryKey: ["curso", cursoId],
    queryFn: async () => {
      const res = await api.get<{ ok: boolean; data: { modulos: { id: string; orden: number }[] } }>(
        `/api/cursos/${cursoId}`
      );
      return res.data.data;
    },
    enabled: !!cursoId,
  });

  const mutation = useMutation({
    mutationFn: async (resp: Record<string, string>) => {
      const res = await api.post<{ ok: boolean; data: QuizResultado }>(
        `/api/cursos/${cursoId}/modulos/${moduloId}/quiz`,
        { respuestas: resp },
        { headers: authHeaders }
      );
      return res.data.data;
    },
    onSuccess: (data) => {
      setResultado(data);
      setFase(data.aprobado ? "celebracion" : "resultado");
      qc.invalidateQueries({ queryKey: ["curso-progreso", cursoId] });
      qc.invalidateQueries({ queryKey: ["leccion", cursoId, moduloId] });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2a628f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-10 w-10 text-[#9ac1e2] mx-auto mb-3" />
          <p className="text-[#13293d] font-semibold mb-2">No se pudo cargar la lección</p>
          <Link to={`/cursos/${cursoId}`} className="text-[#2a628f] text-sm hover:underline">
            ← Volver al curso
          </Link>
        </div>
      </div>
    );
  }

  const { modulo, preguntas } = data;

  const secciones = useMemo(() => parseSecciones(modulo.contenido), [modulo.contenido]);
  const totalSecciones = secciones.length;
  const enUltimaSeccion = seccionIdx === totalSecciones - 1;

  const preguntaActual = preguntas[quizIdx];
  const enUltimaPregunta = quizIdx === preguntas.length - 1;
  const respuestaActual = preguntaActual ? respuestas[preguntaActual.id] : undefined;

  function getSiguienteModuloId(): string | null {
    if (!cursoData?.modulos) return null;
    const ordenados = [...cursoData.modulos].sort((a, b) => a.orden - b.orden);
    const idx = ordenados.findIndex(m => m.id === moduloId);
    return idx >= 0 && idx < ordenados.length - 1 ? ordenados[idx + 1].id : null;
  }

  function handleSiguienteSeccion() {
    if (enUltimaSeccion) {
      setFase("quiz");
      setQuizIdx(0);
    } else {
      setSeccionIdx(prev => prev + 1);
    }
  }

  function handleSiguientePregunta() {
    if (!respuestaActual) return;
    if (enUltimaPregunta) {
      mutation.mutate(respuestas);
    } else {
      setQuizIdx(prev => prev + 1);
    }
  }

  function handleReintentar() {
    setRespuestas({});
    setResultado(null);
    setQuizIdx(0);
    setFase("quiz");
  }

  const siguienteModuloId = getSiguienteModuloId();

  // Barra de progreso combinada (lectura 50% + quiz 50%)
  const progresoLectura = fase === "lectura"
    ? Math.round(((seccionIdx + 1) / totalSecciones) * 50)
    : 50;
  const progresoQuiz = fase === "quiz"
    ? 50 + Math.round(((quizIdx + 1) / preguntas.length) * 50)
    : (fase === "celebracion" || fase === "resultado") ? 100 : 0;
  const progresoTotal = fase === "lectura" ? progresoLectura : progresoQuiz;

  const topbar = (
    <div className="sticky top-0 z-20 bg-white border-b border-[#d8e9f5] shadow-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <Link
          to={`/cursos/${cursoId}`}
          className="flex items-center gap-1.5 text-[#2a628f] hover:text-[#13293d] text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Volver al curso</span>
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#67a2d3]">Lección {modulo.orden}</p>
          <p className="text-sm font-semibold text-[#13293d] truncate">{modulo.titulo}</p>
        </div>
        {modulo.duracion_estimada > 0 && (
          <div className="flex items-center gap-1 text-xs text-[#67a2d3] flex-shrink-0">
            <Clock className="h-3.5 w-3.5" />
            {modulo.duracion_estimada} min
          </div>
        )}
      </div>
      <div className="h-1 bg-[#d8e9f5]">
        <div
          className="h-full bg-gradient-to-r from-[#2a628f] to-[#18435a] transition-all duration-500"
          style={{ width: `${progresoTotal}%` }}
        />
      </div>
    </div>
  );

  // ── FASE: LECTURA ──
  if (fase === "lectura") {
    return (
      <div className="min-h-screen bg-[#d8e9f5]">
        {topbar}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Indicador de secciones */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {secciones.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === seccionIdx
                    ? "w-6 h-2 bg-[#2a628f]"
                    : i < seccionIdx
                    ? "w-2 h-2 bg-[#9ac1e2]"
                    : "w-2 h-2 bg-[#c8dff0]"
                }`}
              />
            ))}
          </div>

          {/* Contenido de la sección */}
          <article className="bg-white rounded-2xl border border-[#9ac1e2] p-6 sm:p-10 mb-6 min-h-64">
            <div className="prose prose-slate max-w-none
              prose-headings:text-[#13293d] prose-headings:font-bold
              prose-h2:text-lg prose-h2:mt-0 prose-h2:mb-4
              prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-[#16324f] prose-p:leading-relaxed prose-p:text-base
              prose-strong:text-[#13293d] prose-strong:font-semibold
              prose-ul:text-[#16324f] prose-li:my-1
              prose-hr:border-[#d8e9f5]
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {secciones[seccionIdx]}
              </ReactMarkdown>
            </div>
          </article>

          {/* Navegación */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSeccionIdx(prev => prev - 1)}
              disabled={seccionIdx === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#9ac1e2] text-[#2a628f] text-sm font-semibold bg-white hover:bg-[#f0f7fc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </button>

            <span className="text-xs text-[#67a2d3]">{seccionIdx + 1} / {totalSecciones}</span>

            <button
              onClick={handleSiguienteSeccion}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm ${
                enUltimaSeccion
                  ? "bg-[#2a628f] text-white hover:bg-[#18435a] shadow-lg"
                  : "bg-white border border-[#9ac1e2] text-[#2a628f] hover:bg-[#f0f7fc]"
              }`}
            >
              {enUltimaSeccion ? "Responder quiz" : "Siguiente"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── FASE: QUIZ (una pregunta a la vez) ──
  if (fase === "quiz" && preguntaActual) {
    const opciones = [...preguntaActual.opciones].sort((a, b) => a.orden - b.orden);
    return (
      <div className="min-h-screen bg-[#d8e9f5]">
        {topbar}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          {/* Header pregunta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold text-[#2a628f] bg-white border border-[#9ac1e2] px-3 py-1 rounded-full flex-shrink-0">
              {quizIdx + 1} / {preguntas.length}
            </span>
            <div className="flex-1 h-1.5 bg-[#d8e9f5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2a628f] rounded-full transition-all duration-400"
                style={{ width: `${((quizIdx + 1) / preguntas.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Tarjeta de pregunta */}
          <div className="bg-white rounded-2xl border border-[#9ac1e2] p-6 sm:p-8 mb-5 shadow-sm">
            <p className="font-semibold text-[#13293d] text-base leading-relaxed mb-6">
              {preguntaActual.texto}
            </p>
            <div className="space-y-3">
              {opciones.map((opcion) => {
                const seleccionada = respuestaActual === opcion.id;
                return (
                  <button
                    key={opcion.id}
                    onClick={() => setRespuestas(prev => ({ ...prev, [preguntaActual.id]: opcion.id }))}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all flex items-center gap-3 ${
                      seleccionada
                        ? "border-[#2a628f] bg-[#f0f7fc] text-[#13293d] font-medium shadow-sm"
                        : "border-[#d8e9f5] bg-[#f8fbfe] text-[#16324f] hover:border-[#9ac1e2] hover:bg-white"
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                      seleccionada
                        ? "border-[#2a628f] bg-[#2a628f] text-white"
                        : "border-[#9ac1e2] text-[#9ac1e2]"
                    }`}>
                      {["A","B","C","D"][opcion.orden - 1]}
                    </span>
                    {opcion.texto}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botón siguiente */}
          <div className="flex justify-end">
            <button
              disabled={!respuestaActual || mutation.isPending}
              onClick={handleSiguientePregunta}
              className="flex items-center gap-2 px-7 py-3 bg-[#2a628f] text-white rounded-xl font-bold text-sm hover:bg-[#18435a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
            >
              {mutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : enUltimaPregunta ? (
                <>Ver resultado <ChevronRight className="h-4 w-4" /></>
              ) : (
                <>Siguiente <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </div>

          {!respuestaActual && (
            <p className="text-center text-xs text-[#9ac1e2] mt-3">Selecciona una opción para continuar</p>
          )}
        </div>
      </div>
    );
  }

  // ── FASE: CELEBRACIÓN ──
  if (fase === "celebracion" && resultado) {
    return (
      <div className="min-h-screen bg-[#d8e9f5]">
        {topbar}
        <style>{`
          @keyframes celebPop {
            0% { transform: scale(0) rotate(-10deg); opacity: 0; }
            60% { transform: scale(1.18) rotate(3deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          @keyframes starPop {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.3); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center">
          {/* Icono animado */}
          <div className="relative mb-8">
            <div
              className="w-28 h-28 rounded-full bg-gradient-to-br from-[#2a628f] to-[#13293d] flex items-center justify-center shadow-2xl"
              style={{ animation: "celebPop 0.55s cubic-bezier(0.175,0.885,0.32,1.275) forwards" }}
            >
              <Trophy className="h-14 w-14 text-yellow-300" />
            </div>
            <div
              className="absolute -top-1 -right-1 w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center shadow-md"
              style={{ animation: "starPop 0.4s 0.3s cubic-bezier(0.175,0.885,0.32,1.275) both" }}
            >
              <Star className="h-4 w-4 text-white fill-white" />
            </div>
          </div>

          <span className="text-xs font-bold text-[#2a628f] bg-white px-4 py-1.5 rounded-full border border-[#9ac1e2] mb-4 shadow-sm">
            Lección {modulo.orden} completada
          </span>
          <h2 className="text-3xl font-bold text-[#13293d] mb-1">¡Nivel superado!</h2>
          <p className="text-[#67a2d3] text-sm mb-3">Puntaje obtenido</p>
          <p className="text-6xl font-bold text-[#2a628f] mb-6">{resultado.puntaje}%</p>

          {/* Barras de aciertos */}
          <div className="flex items-center gap-1.5 mb-10">
            {Array.from({ length: resultado.total }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i < resultado.aciertos ? "w-7 bg-emerald-500" : "w-5 bg-red-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (siguienteModuloId) navigate(`/cursos/${cursoId}/leccion/${siguienteModuloId}`);
              else navigate(`/cursos/${cursoId}/evaluacion`);
            }}
            className="w-full max-w-xs flex items-center justify-center gap-2 py-3.5 bg-[#2a628f] text-white rounded-2xl font-bold text-base hover:bg-[#18435a] transition-colors shadow-xl"
          >
            {siguienteModuloId ? "Siguiente lección" : "Ir al examen final"}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  // ── FASE: RESULTADO (fallido) ──
  if (fase === "resultado" && resultado) {
    return (
      <div className="min-h-screen bg-[#d8e9f5]">
        {topbar}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          {/* Banner de puntaje */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <XCircle className="h-7 w-7 text-red-500" />
            </div>
            <p className="text-4xl font-bold text-red-700 mb-1">{resultado.puntaje}%</p>
            <p className="text-sm font-semibold text-red-600 mb-1">
              {resultado.aciertos}/{resultado.total} respuestas correctas
            </p>
            <p className="text-xs text-red-500">Necesitas 60% para avanzar. ¡Inténtalo de nuevo!</p>
          </div>

          {/* Revisión de respuestas */}
          <h3 className="text-xs font-bold text-[#13293d] uppercase tracking-wider mb-4">
            Revisión de respuestas
          </h3>
          <div className="space-y-5 mb-8">
            {preguntas.map((pregunta, pIdx) => {
              const respSeleccionada = respuestas[pregunta.id];
              const esCorrecta = resultado.detalle[pregunta.id];
              const opciones = [...pregunta.opciones].sort((a, b) => a.orden - b.orden);
              return (
                <div key={pregunta.id} className="bg-white rounded-2xl border border-[#9ac1e2] p-5">
                  <p className="font-semibold text-[#13293d] text-sm mb-4 leading-relaxed">
                    <span className="text-[#2a628f] mr-2">{pIdx + 1}.</span>
                    {pregunta.texto}
                  </p>
                  <div className="space-y-2">
                    {opciones.map((opcion) => {
                      const seleccionada = respSeleccionada === opcion.id;
                      const esLaCorrecta = resultado.opcionesCorrectas[pregunta.id] === opcion.id;
                      let cls = "w-full text-left px-4 py-3 rounded-xl border text-sm flex items-center gap-3 ";
                      if (esLaCorrecta) cls += "border-emerald-400 bg-emerald-50 text-emerald-800 font-medium";
                      else if (seleccionada && !esCorrecta) cls += "border-red-400 bg-red-50 text-red-800 font-medium";
                      else cls += "border-[#d8e9f5] bg-[#f8fbfe] text-[#9ac1e2]";
                      return (
                        <div key={opcion.id} className={cls}>
                          <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                            esLaCorrecta
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : seleccionada && !esCorrecta
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-[#d8e9f5] text-[#d8e9f5]"
                          }`}>
                            {esLaCorrecta
                              ? <CheckCircle2 className="h-3 w-3" />
                              : ["A","B","C","D"][opcion.orden - 1]}
                          </span>
                          {opcion.texto}
                        </div>
                      );
                    })}
                  </div>
                  {pregunta.explicacion && (
                    <div className={`mt-3 rounded-lg px-4 py-3 text-sm flex items-start gap-2 ${
                      esCorrecta ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
                    }`}>
                      {esCorrecta
                        ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        : <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />}
                      <span>{pregunta.explicacion}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleReintentar}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2a628f] text-white rounded-2xl font-bold text-sm hover:bg-[#18435a] transition-colors shadow-lg"
          >
            Intentar de nuevo
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
