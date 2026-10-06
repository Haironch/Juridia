import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  Clock, AlertCircle, ChevronRight,
} from "lucide-react";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";

interface Opcion {
  id: string;
  texto: string;
  orden: number;
}

interface Pregunta {
  id: string;
  texto: string;
  explicacion: string;
  opciones: Opcion[];
}

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

export default function LeccionViewer() {
  const { cursoId, moduloId } = useParams<{ cursoId: string; moduloId: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { token } = useAuthStore();

  const [fase, setFase] = useState<"lectura" | "quiz" | "resultado">("lectura");
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState<QuizResultado | null>(null);
  const quizRef = useRef<HTMLDivElement>(null);

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

  // Lista de módulos para saber cuál sigue
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
      setFase("resultado");
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
          <Link to={`/cursos/${cursoId}`} className="text-[#2a628f] text-sm hover:underline">← Volver al curso</Link>
        </div>
      </div>
    );
  }

  const { modulo, preguntas } = data;
  const totalPreguntas = preguntas.length;
  const respondidas = Object.keys(respuestas).length;
  const todasRespondidas = respondidas === totalPreguntas;

  function getSiguienteModuloId(): string | null {
    if (!cursoData?.modulos) return null;
    const ordenados = [...cursoData.modulos].sort((a, b) => a.orden - b.orden);
    const idx = ordenados.findIndex(m => m.id === moduloId);
    return idx >= 0 && idx < ordenados.length - 1 ? ordenados[idx + 1].id : null;
  }

  function handleEnviar() {
    mutation.mutate(respuestas);
  }

  function handleReintentar() {
    setRespuestas({});
    setResultado(null);
    setFase("quiz");
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Topbar */}
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
          {modulo.duracion_estimada && (
            <div className="flex items-center gap-1 text-xs text-[#67a2d3] flex-shrink-0">
              <Clock className="h-3.5 w-3.5" />
              {modulo.duracion_estimada} min
            </div>
          )}
        </div>

        {/* Barra de progreso de lectura */}
        {fase === "lectura" && (
          <div className="h-0.5 bg-[#d8e9f5]">
            <div className="h-full bg-[#2a628f] w-full" />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Lección ── */}
        <article className="bg-white rounded-2xl border border-[#9ac1e2] p-6 sm:p-10 mb-8 prose-leccion">
          <h1 className="text-xl sm:text-2xl font-bold text-[#13293d] mb-6 leading-snug">
            {modulo.titulo}
          </h1>
          <div className="prose prose-slate max-w-none
            prose-headings:text-[#13293d] prose-headings:font-bold
            prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
            prose-p:text-[#16324f] prose-p:leading-relaxed prose-p:text-base
            prose-strong:text-[#13293d] prose-strong:font-semibold
            prose-ul:text-[#16324f] prose-li:my-1
            prose-hr:border-[#d8e9f5]
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {modulo.contenido}
            </ReactMarkdown>
          </div>
        </article>

        {/* Botón ir al quiz */}
        {fase === "lectura" && (
          <div className="text-center mb-4">
            <button
              onClick={() => { setFase("quiz"); quizRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#2a628f] text-white rounded-xl font-bold text-sm hover:bg-[#18435a] transition-colors shadow-lg"
            >
              Responder quiz de la lección
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-xs text-[#67a2d3] mt-2">{totalPreguntas} preguntas · Necesitas 60% para avanzar</p>
          </div>
        )}

        {/* ── Quiz ── */}
        {(fase === "quiz" || fase === "resultado") && (
          <div ref={quizRef}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#13293d]">Quiz de la lección</h2>
              {fase === "quiz" && (
                <span className="text-xs text-[#67a2d3]">{respondidas}/{totalPreguntas} respondidas</span>
              )}
            </div>

            <div className="space-y-6">
              {preguntas.map((pregunta, pIdx) => {
                const respSeleccionada = respuestas[pregunta.id];
                const esCorrecta = resultado?.detalle[pregunta.id];
                const mostrarFeedback = fase === "resultado";

                const opcionesOrdenadas = [...pregunta.opciones].sort((a, b) => a.orden - b.orden);

                return (
                  <div key={pregunta.id} className="bg-white rounded-2xl border border-[#9ac1e2] p-5 sm:p-6">
                    <p className="font-semibold text-[#13293d] text-sm mb-4 leading-relaxed">
                      <span className="text-[#2a628f] mr-2">{pIdx + 1}.</span>
                      {pregunta.texto}
                    </p>

                    <div className="space-y-2">
                      {opcionesOrdenadas.map((opcion) => {
                        const seleccionada = respSeleccionada === opcion.id;
                        const esLaCorrecta = mostrarFeedback && resultado?.opcionesCorrectas[pregunta.id] === opcion.id;

                        let claseBase = "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ";
                        let claseCirculo = "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ";

                        if (!mostrarFeedback) {
                          claseBase += seleccionada
                            ? "border-[#2a628f] bg-[#f0f7fc] text-[#13293d] font-medium"
                            : "border-[#d8e9f5] bg-[#f8fbfe] text-[#16324f] hover:border-[#9ac1e2] hover:bg-white";
                          claseCirculo += seleccionada
                            ? "border-[#2a628f] bg-[#2a628f] text-white"
                            : "border-[#9ac1e2] text-[#9ac1e2]";
                        } else {
                          if (esLaCorrecta) {
                            claseBase += "border-emerald-400 bg-emerald-50 text-emerald-800 font-medium";
                            claseCirculo += "border-emerald-500 bg-emerald-500 text-white";
                          } else if (seleccionada && !esCorrecta) {
                            claseBase += "border-red-400 bg-red-50 text-red-800 font-medium";
                            claseCirculo += "border-red-500 bg-red-500 text-white";
                          } else {
                            claseBase += "border-[#d8e9f5] bg-[#f8fbfe] text-[#9ac1e2]";
                            claseCirculo += "border-[#d8e9f5] text-[#9ac1e2]";
                          }
                        }

                        return (
                          <button
                            key={opcion.id}
                            disabled={mostrarFeedback || fase !== "quiz"}
                            onClick={() => setRespuestas(prev => ({ ...prev, [pregunta.id]: opcion.id }))}
                            className={claseBase}
                          >
                            <div className="flex items-center gap-3">
                              <span className={claseCirculo}>
                                {mostrarFeedback && esLaCorrecta
                                  ? <CheckCircle2 className="h-3.5 w-3.5" />
                                  : ["A","B","C","D"][opcion.orden - 1]}
                              </span>
                              {opcion.texto}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explicación */}
                    {mostrarFeedback && pregunta.explicacion && (
                      <div className={`mt-4 rounded-lg px-4 py-3 text-sm flex items-start gap-2 ${
                        esCorrecta ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
                      }`}>
                        {esCorrecta ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />}
                        <span>{pregunta.explicacion}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Botón enviar */}
            {fase === "quiz" && (
              <div className="mt-6 text-center">
                <button
                  disabled={!todasRespondidas || mutation.isPending}
                  onClick={handleEnviar}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2a628f] text-white rounded-xl font-bold text-sm hover:bg-[#18435a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {mutation.isPending ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Enviando...</>
                  ) : (
                    <>Enviar respuestas <ChevronRight className="h-4 w-4" /></>
                  )}
                </button>
                {!todasRespondidas && (
                  <p className="text-xs text-[#67a2d3] mt-2">Responde todas las preguntas para continuar</p>
                )}
              </div>
            )}

            {/* Resultado */}
            {fase === "resultado" && resultado && (
              <div className={`mt-6 rounded-2xl border p-6 text-center ${
                resultado.aprobado
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-red-50 border-red-200"
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  resultado.aprobado ? "bg-emerald-100" : "bg-red-100"
                }`}>
                  {resultado.aprobado
                    ? <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    : <XCircle className="h-8 w-8 text-red-600" />}
                </div>
                <p className={`text-2xl font-bold mb-1 ${resultado.aprobado ? "text-emerald-700" : "text-red-700"}`}>
                  {resultado.puntaje}%
                </p>
                <p className={`text-sm font-semibold mb-1 ${resultado.aprobado ? "text-emerald-700" : "text-red-700"}`}>
                  {resultado.aprobado ? "¡Lección aprobada!" : "No aprobado"}
                </p>
                <p className={`text-xs mb-5 ${resultado.aprobado ? "text-emerald-600" : "text-red-600"}`}>
                  {resultado.aciertos}/{resultado.total} respuestas correctas
                  {!resultado.aprobado && " — Necesitas 60% para avanzar"}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {!resultado.aprobado && (
                    <button
                      onClick={handleReintentar}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-red-300 text-red-700 rounded-xl font-semibold text-sm hover:bg-red-50 transition-colors"
                    >
                      Intentar de nuevo
                    </button>
                  )}
                  {resultado.aprobado && getSiguienteModuloId() ? (
                    <button
                      onClick={() => navigate(`/cursos/${cursoId}/leccion/${getSiguienteModuloId()}`)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2a628f] text-white rounded-xl font-semibold text-sm hover:bg-[#18435a] transition-colors"
                    >
                      Siguiente lección <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : resultado.aprobado ? (
                    <button
                      onClick={() => navigate(`/cursos/${cursoId}/evaluacion`)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2a628f] text-white rounded-xl font-semibold text-sm hover:bg-[#18435a] transition-colors"
                    >
                      Ir al examen final <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      to={`/cursos/${cursoId}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2a628f] text-white rounded-xl font-semibold text-sm hover:bg-[#18435a] transition-colors"
                    >
                      Volver al curso <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
