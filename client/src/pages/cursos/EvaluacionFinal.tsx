import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import {
  ArrowLeft, Award, CheckCircle2, XCircle,
  ChevronRight, AlertCircle, Download,
} from "lucide-react";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";

interface Opcion { id: string; texto: string; orden: number; }
interface Pregunta { id: string; texto: string; opciones: Opcion[]; }


interface ExamenResultado {
  puntaje: number;
  aprobado: boolean;
  aciertos: number;
  total: number;
  detalle: Record<string, boolean>;
  opcionesCorrectas: Record<string, string>;
  certificado: { codigo_unico: string; puntaje_final: number; emitido_en: string } | null;
}

interface ProgresoCheck { ok: boolean; error?: string; pendientes?: number; data?: Pregunta[]; }

function CertificadoCard({ nombre, apellido, titulo, codigo, puntaje, fecha }: {
  nombre: string; apellido: string; titulo: string;
  codigo: string; puntaje: number; fecha: string;
}) {
  const handleDescargar = () => {
    const fechaFormateada = new Date(fecha).toLocaleDateString("es-GT", {
      day: "numeric", month: "long", year: "numeric",
    });

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Certificado — ${titulo}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Georgia, serif; background: #f0f4f8; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .cert { width: 820px; min-height: 580px; background: white; border: 12px solid #13293d; padding: 60px 70px; position: relative; }
    .border-inner { position: absolute; inset: 20px; border: 2px solid #2a628f; pointer-events: none; }
    .corner { position: absolute; width: 40px; height: 40px; border-color: #d8a000; border-style: solid; }
    .tl { top: 28px; left: 28px; border-width: 3px 0 0 3px; }
    .tr { top: 28px; right: 28px; border-width: 3px 3px 0 0; }
    .bl { bottom: 28px; left: 28px; border-width: 0 0 3px 3px; }
    .br { bottom: 28px; right: 28px; border-width: 0 3px 3px 0; }
    .logo { text-align: center; margin-bottom: 24px; }
    .logo span { font-size: 28px; font-weight: bold; color: #13293d; letter-spacing: 3px; text-transform: uppercase; }
    .logo small { display: block; font-size: 11px; color: #67a2d3; letter-spacing: 4px; margin-top: 2px; }
    .divider { height: 2px; background: linear-gradient(to right, transparent, #2a628f, transparent); margin: 16px 0; }
    .label { text-align: center; font-size: 12px; letter-spacing: 4px; color: #67a2d3; text-transform: uppercase; margin-bottom: 10px; }
    .nombre { text-align: center; font-size: 34px; color: #13293d; margin-bottom: 6px; }
    .body-text { text-align: center; font-size: 14px; color: #444; line-height: 1.8; margin-bottom: 8px; }
    .titulo { text-align: center; font-size: 18px; font-weight: bold; color: #2a628f; margin: 12px 0; font-style: italic; }
    .puntaje { text-align: center; font-size: 13px; color: #666; margin-bottom: 28px; }
    .firma-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 20px; }
    .firma-box { text-align: center; }
    .firma-linea { width: 160px; height: 1px; background: #13293d; margin: 0 auto 6px; }
    .firma-label { font-size: 11px; color: #666; }
    .codigo { text-align: center; font-size: 11px; color: #9ac1e2; margin-top: 20px; letter-spacing: 1px; }
  </style>
</head>
<body>
<div class="cert">
  <div class="border-inner"></div>
  <div class="corner tl"></div><div class="corner tr"></div>
  <div class="corner bl"></div><div class="corner br"></div>

  <div class="logo">
    <span>Juridia</span>
    <small>Plataforma de Derecho Guatemalteco</small>
  </div>

  <div class="divider"></div>
  <div class="label">Certificado de finalización</div>
  <div class="divider"></div>

  <p class="body-text" style="margin-top: 20px;">Se certifica que</p>
  <p class="nombre">${nombre} ${apellido}</p>
  <p class="body-text">ha completado satisfactoriamente el curso</p>
  <p class="titulo">${titulo}</p>
  <p class="puntaje">con un puntaje de <strong>${puntaje}%</strong> en la evaluación final</p>
  <p class="body-text">emitido el ${fechaFormateada}</p>

  <div class="firma-row">
    <div class="firma-box">
      <div class="firma-linea"></div>
      <div class="firma-label">Juridia · Plataforma Digital</div>
    </div>
    <div class="firma-box" style="text-align: right;">
      <div style="font-size: 11px; color: #9ac1e2;">Código de verificación</div>
      <div style="font-size: 13px; font-weight: bold; color: #13293d; letter-spacing: 1px;">${codigo}</div>
    </div>
  </div>

  <div class="codigo">juridia-eta.vercel.app · ${codigo}</div>
</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Certificado-${codigo}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-[#13293d] to-[#18435a] rounded-2xl p-6 text-white text-center">
      <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Award className="h-8 w-8 text-yellow-400" />
      </div>
      <p className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-2">Certificado obtenido</p>
      <p className="text-xl font-bold mb-1">{nombre} {apellido}</p>
      <p className="text-[#89c2d9] text-sm mb-4">ha completado exitosamente</p>
      <p className="text-base font-semibold text-white leading-snug mb-4">{titulo}</p>
      <p className="text-3xl font-bold text-yellow-300 mb-1">{puntaje}%</p>
      <p className="text-[#89c2d9] text-xs mb-5">
        Código: <span className="font-mono font-bold text-white">{codigo}</span>
      </p>
      <button
        onClick={handleDescargar}
        className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-400 text-[#13293d] rounded-xl font-bold text-sm hover:bg-yellow-300 transition-colors"
      >
        <Download className="h-4 w-4" />
        Descargar certificado
      </button>
    </div>
  );
}

export default function EvaluacionFinal() {
  const { cursoId } = useParams<{ cursoId: string }>();
  const qc = useQueryClient();
  const { token, user: perfil } = useAuthStore();

  const [fase, setFase] = useState<"inicio" | "examen" | "resultado">("inicio");
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState<ExamenResultado | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const authHeaders = { Authorization: `Bearer ${token}` };

  // Verificar progreso y obtener preguntas a la vez
  const { data: cursoData } = useQuery({
    queryKey: ["curso", cursoId],
    queryFn: async () => {
      const res = await api.get<{ ok: boolean; data: { titulo: string } }>(`/api/cursos/${cursoId}`);
      return res.data.data;
    },
    enabled: !!cursoId,
  });

  const { data: progresoData } = useQuery({
    queryKey: ["curso-progreso", cursoId],
    queryFn: async () => {
      const res = await api.get<{ ok: boolean; data: { modulos: any[]; certificado: any } }>(
        `/api/cursos/${cursoId}/progreso`,
        { headers: authHeaders }
      );
      return res.data.data;
    },
    enabled: !!cursoId,
  });

  const { data: preguntas, isLoading: loadingPreguntas, isError: errorPreguntas, error: rawError } = useQuery<Pregunta[]>({
    queryKey: ["evaluacion", cursoId],
    queryFn: async () => {
      const res = await api.get<ProgresoCheck>(`/api/cursos/${cursoId}/evaluacion`, { headers: authHeaders });
      if (!res.data.ok) throw new Error(res.data.error ?? "Error");
      return res.data.data ?? [];
    },
    enabled: !!cursoId,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: async (resp: Record<string, string>) => {
      const res = await api.post<{ ok: boolean; data: ExamenResultado }>(
        `/api/cursos/${cursoId}/evaluacion`,
        { respuestas: resp },
        { headers: authHeaders }
      );
      return res.data.data;
    },
    onSuccess: (data) => {
      setResultado(data);
      setFase("resultado");
      qc.invalidateQueries({ queryKey: ["curso-progreso", cursoId] });
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  });

  const tieneCertificadoPrevio = progresoData?.certificado;
  const respondidas = Object.keys(respuestas).length;
  const totalPreguntas = preguntas?.length ?? 0;
  const todasRespondidas = respondidas === totalPreguntas && totalPreguntas > 0;

  // Estado: certificado ya obtenido
  if (!loadingPreguntas && tieneCertificadoPrevio && fase !== "resultado") {
    return (
      <div className="min-h-screen bg-[#d8e9f5]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          <Link to={`/cursos/${cursoId}`} className="inline-flex items-center gap-1.5 text-[#2a628f] hover:text-[#13293d] text-sm font-medium mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al curso
          </Link>
          <CertificadoCard
            nombre={perfil?.nombre ?? ""}
            apellido={perfil?.apellido ?? ""}
            titulo={cursoData?.titulo ?? ""}
            codigo={tieneCertificadoPrevio.codigo_unico}
            puntaje={tieneCertificadoPrevio.puntaje_final}
            fecha={tieneCertificadoPrevio.emitido_en}
          />
          <div className="mt-5 text-center">
            <button
              onClick={() => { setFase("examen"); setRespuestas({}); }}
              className="text-sm text-[#67a2d3] hover:text-[#2a628f] transition-colors"
            >
              Presentar el examen de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#d8e9f5]" ref={topRef}>
      {/* Topbar */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#d8e9f5] shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link to={`/cursos/${cursoId}`} className="flex items-center gap-1.5 text-[#2a628f] hover:text-[#13293d] text-sm font-medium transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Volver al curso</span>
          </Link>
          <div className="flex-1">
            <p className="text-xs text-[#67a2d3]">Evaluación final</p>
            <p className="text-sm font-semibold text-[#13293d] truncate">{cursoData?.titulo}</p>
          </div>
          {fase === "examen" && (
            <span className="text-xs text-[#67a2d3]">{respondidas}/{totalPreguntas}</span>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Pantalla de inicio */}
        {fase === "inicio" && (
          <>
            {loadingPreguntas && (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-[#2a628f] border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {errorPreguntas && (
              <div className="bg-white rounded-2xl border border-[#d8e9f5] p-8 text-center">
                <AlertCircle className="h-10 w-10 text-amber-400 mx-auto mb-3" />
                <p className="font-semibold text-[#13293d] mb-2">Examen no disponible</p>
                <p className="text-sm text-[#67a2d3] mb-5">
                  {(rawError as Error)?.message?.includes("módulos")
                    ? (rawError as Error).message
                    : "Completa todas las lecciones antes de presentar el examen final."}
                </p>
                <Link to={`/cursos/${cursoId}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2a628f] text-white rounded-xl font-semibold text-sm hover:bg-[#18435a] transition-colors">
                  <ArrowLeft className="h-4 w-4" /> Volver al curso
                </Link>
              </div>
            )}

            {!loadingPreguntas && !errorPreguntas && preguntas && (
              <div className="bg-white rounded-2xl border border-[#9ac1e2] p-8 text-center">
                <div className="w-16 h-16 bg-[#d8e9f5] rounded-full flex items-center justify-center mx-auto mb-5">
                  <Award className="h-8 w-8 text-[#2a628f]" />
                </div>
                <h1 className="text-xl font-bold text-[#13293d] mb-2">Evaluación final</h1>
                <p className="text-[#16324f] text-sm leading-relaxed mb-6 max-w-md mx-auto">
                  Esta evaluación contiene <strong>{preguntas.length} preguntas</strong>. Necesitas responder correctamente al menos el <strong>70%</strong> para obtener tu certificado.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto text-center">
                  {[
                    { label: "Preguntas", value: String(preguntas.length) },
                    { label: "Mínimo", value: "70%" },
                    { label: "Intentos", value: "Ilimitados" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#f0f7fc] rounded-xl p-3">
                      <p className="text-lg font-bold text-[#2a628f]">{value}</p>
                      <p className="text-xs text-[#67a2d3]">{label}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setFase("examen")}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2a628f] text-white rounded-xl font-bold text-sm hover:bg-[#18435a] transition-colors shadow-lg"
                >
                  Comenzar evaluación <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Examen */}
        {fase === "examen" && preguntas && (
          <>
            <div className="space-y-6 mb-8">
              {preguntas.map((pregunta, pIdx) => {
                const respSeleccionada = respuestas[pregunta.id];
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
                        return (
                          <button
                            key={opcion.id}
                            onClick={() => setRespuestas(prev => ({ ...prev, [pregunta.id]: opcion.id }))}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${
                              seleccionada
                                ? "border-[#2a628f] bg-[#f0f7fc] text-[#13293d] font-medium"
                                : "border-[#d8e9f5] bg-[#f8fbfe] text-[#16324f] hover:border-[#9ac1e2] hover:bg-white"
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
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
                );
              })}
            </div>

            <div className="text-center">
              <button
                disabled={!todasRespondidas || mutation.isPending}
                onClick={() => mutation.mutate(respuestas)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2a628f] text-white rounded-xl font-bold text-sm hover:bg-[#18435a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {mutation.isPending
                  ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Calificando...</>
                  : <>Enviar evaluación <ChevronRight className="h-4 w-4" /></>}
              </button>
              {!todasRespondidas && (
                <p className="text-xs text-[#67a2d3] mt-2">{respondidas}/{totalPreguntas} preguntas respondidas</p>
              )}
            </div>
          </>
        )}

        {/* Resultado */}
        {fase === "resultado" && resultado && (
          <div className="space-y-6">
            {/* Puntaje */}
            <div className={`rounded-2xl border p-8 text-center ${
              resultado.aprobado ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
            }`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                resultado.aprobado ? "bg-emerald-100" : "bg-red-100"
              }`}>
                {resultado.aprobado
                  ? <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                  : <XCircle className="h-10 w-10 text-red-600" />}
              </div>
              <p className={`text-4xl font-bold mb-1 ${resultado.aprobado ? "text-emerald-700" : "text-red-700"}`}>
                {resultado.puntaje}%
              </p>
              <p className={`font-semibold text-lg mb-1 ${resultado.aprobado ? "text-emerald-700" : "text-red-700"}`}>
                {resultado.aprobado ? "¡Evaluación aprobada!" : "No aprobado"}
              </p>
              <p className={`text-sm ${resultado.aprobado ? "text-emerald-600" : "text-red-600"}`}>
                {resultado.aciertos}/{resultado.total} respuestas correctas
                {!resultado.aprobado && " — Necesitas 70% para certificarte"}
              </p>
            </div>

            {/* Certificado */}
            {resultado.aprobado && resultado.certificado && (
              <CertificadoCard
                nombre={perfil?.nombre ?? ""}
                apellido={perfil?.apellido ?? ""}
                titulo={cursoData?.titulo ?? ""}
                codigo={resultado.certificado.codigo_unico}
                puntaje={resultado.certificado.puntaje_final}
                fecha={resultado.certificado.emitido_en}
              />
            )}

            {/* Detalle preguntas */}
            {preguntas && (
              <div className="bg-white rounded-2xl border border-[#9ac1e2] p-6">
                <h3 className="font-bold text-[#13293d] mb-4 text-sm">Revisión de respuestas</h3>
                <div className="space-y-3">
                  {preguntas.map((p, i) => {
                    const correcto = resultado.detalle[p.id];
                    const opcionCorrectaId = resultado.opcionesCorrectas[p.id];
                    const opcionCorrecta = p.opciones.find(o => o.id === opcionCorrectaId);
                    return (
                      <div key={p.id} className={`p-3 rounded-xl text-sm ${
                        correcto ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"
                      }`}>
                        <div className={`flex items-start gap-2 ${correcto ? "text-emerald-800" : "text-red-800"}`}>
                          {correcto
                            ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            : <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />}
                          <span><span className="font-bold">{i + 1}.</span> {p.texto}</span>
                        </div>
                        {!correcto && opcionCorrecta && (
                          <p className="mt-2 ml-6 text-xs text-emerald-700 font-medium">
                            Respuesta correcta: {opcionCorrecta.texto}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!resultado.aprobado && (
                <button
                  onClick={() => { setRespuestas({}); setResultado(null); setFase("examen"); topRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#9ac1e2] text-[#13293d] rounded-xl font-semibold text-sm hover:bg-[#d8e9f5] transition-colors"
                >
                  Intentar de nuevo
                </button>
              )}
              <Link
                to={`/cursos/${cursoId}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2a628f] text-white rounded-xl font-semibold text-sm hover:bg-[#18435a] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Volver al curso
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
