import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft, Clock, Layers, Lock, BookOpen,
  CheckCircle2, PlayCircle, FileText, Award,
  ChevronRight, AlertCircle,
} from "lucide-react";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";

interface Modulo {
  id: string;
  orden: number;
  titulo: string;
  duracion_estimada: number;
}

interface CursoData {
  id: string;
  titulo: string;
  descripcion: string;
  nivel: string;
  duracion: string;
  es_premium: number;
  categoria: string;
  categoriaIcono: string;
  modulos: Modulo[];
}

interface ProgresoModulo {
  modulo_id: string;
  completado: number;
  quiz_aprobado: number;
  puntaje_quiz: number | null;
}

interface Certificado {
  codigo_unico: string;
  puntaje_final: number;
  emitido_en: string;
}

interface ProgresoData {
  modulos: ProgresoModulo[];
  certificado: Certificado | null;
}

function NivelBadge({ nivel }: { nivel: string }) {
  const color =
    nivel === "Básico" ? "bg-emerald-100 text-emerald-700"
    : nivel === "Intermedio" ? "bg-amber-100 text-amber-700"
    : "bg-rose-100 text-rose-700";
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>{nivel}</span>;
}

function SkeletonDetalle() {
  return (
    <div className="animate-pulse">
      <div className="bg-gradient-to-br from-[#2a628f] to-[#13293d] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="h-4 bg-white/20 rounded w-24 mb-6" />
          <div className="h-8 bg-white/20 rounded w-2/3 mb-4" />
          <div className="h-4 bg-white/20 rounded w-full mb-2" />
          <div className="h-4 bg-white/20 rounded w-3/4" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-3">
        {[1,2,3,4,5].map(i => <div key={i} className="h-16 bg-white rounded-xl border border-[#d8e9f5]" />)}
      </div>
    </div>
  );
}

export default function CursoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuthStore();

  const { data: curso, isLoading, isError } = useQuery({
    queryKey: ["curso", id],
    queryFn: async () => {
      const res = await api.get<{ ok: boolean; data: CursoData }>(`/api/cursos/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  const { data: progreso } = useQuery<ProgresoData>({
    queryKey: ["curso-progreso", id],
    queryFn: async () => {
      const res = await api.get<{ ok: boolean; data: ProgresoData }>(
        `/api/cursos/${id}/progreso`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    },
    enabled: !!id && isAuthenticated,
  });

  if (isLoading) return <SkeletonDetalle />;

  if (isError || !curso) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-10 w-10 text-[#9ac1e2] mx-auto mb-3" />
          <p className="text-[#13293d] font-semibold mb-2">Curso no encontrado</p>
          <Link to="/cursos" className="text-[#2a628f] text-sm hover:underline">← Volver a cursos</Link>
        </div>
      </div>
    );
  }

  const progresoMap: Record<string, ProgresoModulo> = {};
  progreso?.modulos.forEach(p => { progresoMap[p.modulo_id] = p; });

  const aprobados = Object.values(progresoMap).filter(p => p.quiz_aprobado === 1).length;
  const totalModulos = curso.modulos.length;
  const porcentaje = totalModulos > 0 ? Math.round((aprobados / totalModulos) * 100) : 0;
  const todosAprobados = aprobados === totalModulos && totalModulos > 0;
  const tieneCertificado = !!progreso?.certificado;

  function getModuloEstado(modulo: Modulo, index: number) {
    const p = progresoMap[modulo.id];
    if (p?.quiz_aprobado === 1) return "completado";
    if (index === 0) return "disponible";
    const anterior = curso.modulos[index - 1];
    const pAnterior = progresoMap[anterior.id];
    if (pAnterior?.quiz_aprobado === 1) return "disponible";
    return "bloqueado";
  }

  function getPrimerModuloDisponible() {
    for (let i = 0; i < curso.modulos.length; i++) {
      const estado = getModuloEstado(curso.modulos[i], i);
      if (estado === "disponible") return curso.modulos[i].id;
    }
    return null;
  }

  const primerDisponible = getPrimerModuloDisponible();

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#2a628f] to-[#13293d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            to="/cursos"
            className="inline-flex items-center gap-1.5 text-[#89c2d9] hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Todos los cursos
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-[#b2d3ea] bg-white/10 px-3 py-1 rounded-full">
              {curso.categoriaIcono} {curso.categoria}
            </span>
            <NivelBadge nivel={curso.nivel} />
            {curso.es_premium === 1 && (
              <span className="flex items-center gap-1 text-xs font-semibold text-white bg-white/20 px-2.5 py-1 rounded-full">
                <Lock className="h-3 w-3" /> Premium
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {curso.titulo}
          </h1>
          <p className="text-[#b2d3ea] text-base leading-relaxed max-w-2xl mb-8">
            {curso.descripcion}
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-[#89c2d9]">
            <div className="flex items-center gap-2"><Layers className="h-4 w-4" /><span>{totalModulos} lecciones</span></div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4" /><span>{curso.duracion}</span></div>
            <div className="flex items-center gap-2"><FileText className="h-4 w-4" /><span>Evaluación final + certificado</span></div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Lecciones */}
          <div className="lg:col-span-2">

            {/* Progreso si está autenticado */}
            {isAuthenticated && totalModulos > 0 && (
              <div className="bg-white rounded-2xl border border-[#9ac1e2] p-5 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[#13293d]">Tu progreso</span>
                  <span className="text-sm font-bold text-[#2a628f]">{aprobados}/{totalModulos} lecciones</span>
                </div>
                <div className="h-2.5 bg-[#d8e9f5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2a628f] to-[#18435a] rounded-full transition-all duration-500"
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>
                <p className="text-xs text-[#67a2d3] mt-2">{porcentaje}% completado</p>
              </div>
            )}

            <h2 className="text-xl font-bold text-[#13293d] mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#2a628f]" />
              Tu camino de aprendizaje
            </h2>

            {/* Mapa de niveles */}
            <div className="relative">
              {/* Línea vertical conectora */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#9ac1e2] to-[#d8e9f5]" />

              <div className="space-y-4">
                {curso.modulos.map((modulo, i) => {
                  const estado = isAuthenticated ? getModuloEstado(modulo, i) : (i === 0 ? "disponible" : "bloqueado");
                  const puntaje = progresoMap[modulo.id]?.puntaje_quiz;

                  return (
                    <div key={modulo.id} className="relative flex items-center gap-4">
                      {/* Nodo */}
                      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 font-bold text-sm transition-all ${
                        estado === "completado"
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-md"
                          : estado === "disponible"
                          ? "bg-[#2a628f] border-[#2a628f] text-white shadow-lg ring-4 ring-[#2a628f]/20"
                          : "bg-white border-[#d8e9f5] text-[#9ac1e2]"
                      }`}>
                        {estado === "completado"
                          ? <CheckCircle2 className="h-5 w-5" />
                          : estado === "bloqueado"
                          ? <Lock className="h-4 w-4" />
                          : <span>{modulo.orden}</span>}
                      </div>

                      {/* Tarjeta */}
                      <div className={`flex-1 bg-white rounded-2xl border p-4 transition-all ${
                        estado === "bloqueado"
                          ? "border-[#d8e9f5] opacity-55"
                          : estado === "completado"
                          ? "border-emerald-200 hover:shadow-md"
                          : "border-[#2a628f]/40 hover:shadow-md shadow-sm"
                      }`}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className={`font-semibold text-sm leading-snug ${estado === "bloqueado" ? "text-[#9ac1e2]" : "text-[#13293d]"}`}>
                              {modulo.titulo}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {modulo.duracion_estimada > 0 && (
                                <span className="text-xs text-[#67a2d3] flex items-center gap-1">
                                  <Clock className="h-3 w-3" />{modulo.duracion_estimada} min
                                </span>
                              )}
                              {puntaje !== null && puntaje !== undefined && (
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                  puntaje >= 60 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                }`}>
                                  {puntaje}%
                                </span>
                              )}
                            </div>
                          </div>

                          {estado !== "bloqueado" && isAuthenticated && (
                            <button
                              onClick={() => navigate(`/cursos/${id}/leccion/${modulo.id}`)}
                              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0 ${
                                estado === "completado"
                                  ? "bg-[#f0f7fc] text-[#2a628f] hover:bg-[#d8e9f5]"
                                  : "bg-[#2a628f] text-white hover:bg-[#18435a]"
                              }`}
                            >
                              {estado === "completado" ? "Repasar" : "Iniciar"}
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {!isAuthenticated && i === 0 && (
                            <Link
                              to="/login"
                              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#2a628f] text-white hover:bg-[#18435a] transition-colors flex-shrink-0"
                            >
                              Comenzar <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Nodo final: Evaluación */}
                {isAuthenticated && (
                  <div className="relative flex items-center gap-4">
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                      tieneCertificado
                        ? "bg-yellow-400 border-yellow-400 text-white shadow-md"
                        : todosAprobados
                        ? "bg-[#2a628f] border-[#2a628f] text-white shadow-lg ring-4 ring-[#2a628f]/20"
                        : "bg-white border-[#d8e9f5] text-[#9ac1e2]"
                    }`}>
                      <Award className="h-5 w-5" />
                    </div>

                    <div className={`flex-1 bg-white rounded-2xl border p-4 transition-all ${
                      tieneCertificado
                        ? "border-yellow-200 hover:shadow-md"
                        : todosAprobados
                        ? "border-[#2a628f]/40 hover:shadow-md shadow-sm"
                        : "border-[#d8e9f5] opacity-55"
                    }`}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className={`font-semibold text-sm ${todosAprobados || tieneCertificado ? "text-[#13293d]" : "text-[#9ac1e2]"}`}>
                            Evaluación final
                          </p>
                          <p className="text-xs text-[#67a2d3] mt-0.5">
                            {tieneCertificado
                              ? `Certificado — Puntaje: ${progreso!.certificado!.puntaje_final}%`
                              : todosAprobados
                              ? "Necesitas 70% para certificarte"
                              : `Completa las ${totalModulos} lecciones para desbloquear`}
                          </p>
                        </div>
                        {todosAprobados && (
                          <button
                            onClick={() => navigate(`/cursos/${id}/evaluacion`)}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#2a628f] text-white hover:bg-[#18435a] transition-colors flex-shrink-0"
                          >
                            {tieneCertificado ? "Ver" : "Presentar"}
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">

            {/* CTA principal */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  if (tieneCertificado) navigate(`/cursos/${id}/evaluacion`);
                  else if (todosAprobados) navigate(`/cursos/${id}/evaluacion`);
                  else if (primerDisponible) navigate(`/cursos/${id}/leccion/${primerDisponible}`);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm bg-[#2a628f] text-white hover:bg-[#18435a] transition-colors shadow-lg"
              >
                <PlayCircle className="h-5 w-5" />
                {tieneCertificado ? "Ver certificado" : todosAprobados ? "Presentar examen final" : aprobados > 0 ? "Continuar curso" : "Comenzar curso"}
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm bg-[#2a628f] text-white hover:bg-[#18435a] transition-colors shadow-lg"
              >
                <PlayCircle className="h-5 w-5" />
                Inicia sesión para comenzar
              </Link>
            )}

            {/* Resumen del curso */}
            <div className="bg-[#13293d] rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-4 text-xs uppercase tracking-wider text-[#89c2d9]">Resumen</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Nivel", value: curso.nivel },
                  { label: "Duración", value: curso.duracion },
                  { label: "Lecciones", value: String(totalModulos) },
                  { label: "Evaluación", value: "Sí, con certificado" },
                  { label: "Acceso", value: curso.es_premium === 1 ? "Premium" : "Gratuito" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-[#89c2d9]">{label}</span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-white rounded-2xl border border-[#9ac1e2] p-5">
              <h3 className="font-bold text-[#13293d] mb-3 text-sm">¿Cómo funciona?</h3>
              <ol className="space-y-2.5">
                {[
                  "Lee cada lección con calma",
                  "Responde el quiz al final (60% para avanzar)",
                  "Desbloquea la siguiente lección",
                  "Con todos los módulos listos, presenta el examen final (70% para certificarte)",
                  "Descarga tu certificado",
                ].map((paso, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#16324f]">
                    <span className="w-5 h-5 rounded-full bg-[#d8e9f5] text-[#2a628f] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {paso}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
