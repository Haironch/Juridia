import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft, Clock, Stack, Lock, BookOpen,
  CheckCircle, PlayCircle, FileText, Medal,
  CaretRight, Warning,
} from "@phosphor-icons/react";
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
  proximamente: number;
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

function LoginRequiredModal({ titulo, onClose }: { titulo: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-7 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-[#d8e9f5] flex items-center justify-center mx-auto mb-4">
          <Lock weight="duotone" className="h-7 w-7 text-[#2a628f]" />
        </div>
        <h3 className="text-lg font-bold text-[#13293d] mb-2">Necesitas iniciar sesión</h3>
        <p className="text-sm text-[#16324f] mb-1">Para acceder a</p>
        <p className="text-sm font-semibold text-[#2a628f] mb-5">"{titulo}"</p>
        <p className="text-xs text-[#67a2d3] mb-6">
          Crea una cuenta gratuita o inicia sesión para acceder a este módulo y seguir tu progreso.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to="/registro"
            className="w-full py-2.5 bg-[#2a628f] text-white text-sm font-bold rounded-xl hover:bg-[#18435a] transition-colors"
          >
            Crear cuenta gratis
          </Link>
          <Link
            to="/login"
            className="w-full py-2.5 border border-[#9ac1e2] text-[#2a628f] text-sm font-semibold rounded-xl hover:bg-[#f0f7fc] transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
        <button onClick={onClose} className="mt-4 text-xs text-[#9ac1e2] hover:text-[#67a2d3] transition-colors">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default function CursoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuthStore();
  const [loginAlertTitulo, setLoginAlertTitulo] = useState<string | null>(null);

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

  if (!isError && curso?.proximamente) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-[#9ac1e2] shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#13293d] flex items-center justify-center mx-auto mb-6">
            <Lock weight="duotone" className="h-9 w-9 text-[#d8e9f5]" />
          </div>
          <span className="inline-block bg-[#13293d] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
            Próximamente
          </span>
          <h2 className="text-2xl font-bold text-[#13293d] mb-3">{curso.titulo}</h2>
          <p className="text-[#16324f] text-sm leading-relaxed mb-8">
            Este curso está en construcción. Estamos trabajando para traerte contenido de calidad muy pronto.
          </p>
          <Link
            to="/cursos"
            className="inline-flex items-center gap-2 bg-[#2a628f] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#18435a] transition-colors"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            Ver cursos disponibles
          </Link>
        </div>
      </div>
    );
  }

  if (isError || !curso) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center">
        <div className="text-center">
          <Warning weight="duotone" className="h-10 w-10 text-[#9ac1e2] mx-auto mb-3" />
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
    const anterior = curso!.modulos[index - 1];
    const pAnterior = progresoMap[anterior.id];
    if (pAnterior?.quiz_aprobado === 1) return "disponible";
    return "bloqueado";
  }

  function getPrimerModuloDisponible() {
    for (let i = 0; i < curso!.modulos.length; i++) {
      const estado = getModuloEstado(curso!.modulos[i], i);
      if (estado === "disponible") return curso!.modulos[i].id;
    }
    return null;
  }

  const primerDisponible = getPrimerModuloDisponible();

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {loginAlertTitulo && (
        <LoginRequiredModal
          titulo={loginAlertTitulo}
          onClose={() => setLoginAlertTitulo(null)}
        />
      )}
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#2a628f] via-[#18435a] to-[#13293d] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-white/[0.03] translate-y-1/2 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          <Link
            to="/cursos"
            className="inline-flex items-center gap-1.5 text-[#89c2d9] hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            Todos los cursos
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
            {/* Left: texto */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-[#b2d3ea] bg-white/10 px-3 py-1 rounded-full">
                  {curso.categoriaIcono} {curso.categoria}
                </span>
                <NivelBadge nivel={curso.nivel} />
                {curso.es_premium === 0 && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-1 rounded-full">
                    ✓ Gratuito
                  </span>
                )}
                {curso.es_premium === 1 && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-white bg-white/20 px-2.5 py-1 rounded-full">
                    <Lock weight="duotone" className="h-3 w-3" /> Premium
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                {curso.titulo}
              </h1>
              <p className="text-[#b2d3ea] text-base leading-relaxed mb-8">
                {curso.descripcion}
              </p>

              <div className="flex flex-wrap gap-5 text-sm text-[#89c2d9]">
                <div className="flex items-center gap-2"><Stack weight="duotone" className="h-4 w-4" /><span>{totalModulos} lecciones</span></div>
                <div className="flex items-center gap-2"><Clock weight="duotone" className="h-4 w-4" /><span>{curso.duracion}</span></div>
                <div className="flex items-center gap-2"><FileText weight="duotone" className="h-4 w-4" /><span>Certificado incluido</span></div>
              </div>
            </div>

            {/* Right: stats card (solo desktop) */}
            <div className="hidden lg:flex flex-col gap-3 bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-5 min-w-[180px]">
              {[
                { icon: "🗳️", label: "Temática", value: "Voto y Constitución" },
                { icon: "📚", label: "Lecciones", value: `${totalModulos} módulos` },
                { icon: "⏱️", label: "Duración", value: curso.duracion },
                { icon: "🏅", label: "Certificado", value: "Al finalizar" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-[10px] text-[#89c2d9] uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-semibold text-white leading-tight">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 lg:pb-10">
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

            <h2 className="text-xl font-bold text-[#13293d] mb-2 flex items-center gap-2">
              <BookOpen weight="duotone" className="h-5 w-5 text-[#2a628f]" />
              Tu camino de aprendizaje
            </h2>
            <p className="text-sm text-[#67a2d3] mb-4">
              Completa cada lección y su quiz para desbloquear la siguiente
            </p>

            {!isAuthenticated && (
              <div className="flex items-start gap-3 bg-[#f0f7fc] border border-[#9ac1e2] rounded-xl px-4 py-3 mb-6">
                <Lock weight="duotone" className="h-5 w-5 text-[#2a628f] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#13293d]">Inicia sesión para acceder a todas las lecciones</p>
                  <p className="text-xs text-[#67a2d3] mt-0.5">
                    Crea una cuenta gratis y lleva el seguimiento de tu progreso.{" "}
                    <Link to="/registro" className="text-[#2a628f] font-semibold hover:underline">Regístrate aquí</Link>
                  </p>
                </div>
              </div>
            )}

            {/* Mapa de niveles */}
            <div className="relative">
              {/* Línea vertical conectora */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#9ac1e2] to-[#d8e9f5]" />

              <div className="space-y-4">
                {curso.modulos.map((modulo, i) => {
                  const estado = isAuthenticated ? getModuloEstado(modulo, i) : (i === 0 ? "disponible" : "bloqueado");
                  const puntaje = progresoMap[modulo.id]?.puntaje_quiz;
                  const iconos = ["🗳️", "⚖️", "🛡️", "📢", "🏛️"];
                  const icono = iconos[i] ?? "📚";

                  return (
                    <div key={modulo.id} className="relative flex items-start gap-4">
                      {/* Nodo */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all ${
                          estado === "completado"
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-md"
                            : estado === "disponible"
                            ? "bg-[#2a628f] border-[#2a628f] text-white shadow-lg"
                            : "bg-white border-[#d8e9f5] text-[#b2cfe8]"
                        }`}>
                          {estado === "completado"
                            ? <CheckCircle weight="duotone" className="h-5 w-5" />
                            : estado === "bloqueado"
                            ? <Lock weight="duotone" className="h-4 w-4" />
                            : <span className="text-base">{icono}</span>}
                        </div>
                        {/* Pulso en disponible */}
                        {estado === "disponible" && (
                          <span className="absolute inset-0 rounded-full bg-[#2a628f]/30 animate-ping" />
                        )}
                      </div>

                      {/* Tarjeta */}
                      <div className={`flex-1 rounded-2xl border p-4 transition-all mb-0 ${
                        estado === "bloqueado"
                          ? "bg-white/60 border-[#e8f2f9]"
                          : estado === "completado"
                          ? "bg-white border-emerald-200 hover:shadow-md"
                          : "bg-white border-[#2a628f]/40 shadow-md hover:shadow-lg"
                      }`}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-bold text-[#9ac1e2] uppercase tracking-wider">
                                Lección {modulo.orden}
                              </span>
                              {estado === "completado" && (
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                                  Completada
                                </span>
                              )}
                            </div>
                            <p className={`font-bold text-sm leading-snug ${estado === "bloqueado" ? "text-[#a8c5de]" : "text-[#13293d]"}`}>
                              {modulo.titulo}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                              {modulo.duracion_estimada > 0 && (
                                <span className={`text-xs flex items-center gap-1 ${estado === "bloqueado" ? "text-[#b8d5e8]" : "text-[#67a2d3]"}`}>
                                  <Clock weight="duotone" className="h-3 w-3" />{modulo.duracion_estimada} min
                                </span>
                              )}
                              {puntaje !== null && puntaje !== undefined && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
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
                              className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all flex-shrink-0 ${
                                estado === "completado"
                                  ? "bg-[#f0f7fc] text-[#2a628f] hover:bg-[#d8e9f5]"
                                  : "bg-[#2a628f] text-white hover:bg-[#18435a] shadow-sm"
                              }`}
                            >
                              {estado === "completado" ? "Repasar" : "Iniciar"}
                              <CaretRight weight="bold" className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {!isAuthenticated && (
                            <button
                              onClick={() => setLoginAlertTitulo(modulo.titulo)}
                              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-[#2a628f] text-white hover:bg-[#18435a] transition-all shadow-sm flex-shrink-0"
                            >
                              {i === 0 ? "Comenzar" : "Ver módulo"}
                              <CaretRight weight="bold" className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {estado === "bloqueado" && isAuthenticated && (
                            <div className="flex-shrink-0 text-[#c8dff0]">
                              <Lock weight="duotone" className="h-4 w-4" />
                            </div>
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
                      <Medal weight="duotone" className="h-5 w-5" />
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
                            <CaretRight weight="bold" className="h-3.5 w-3.5" />
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
                <PlayCircle weight="duotone" className="h-5 w-5" />
                {tieneCertificado ? "Ver certificado" : todosAprobados ? "Presentar examen final" : aprobados > 0 ? "Continuar curso" : "Comenzar curso"}
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm bg-[#2a628f] text-white hover:bg-[#18435a] transition-colors shadow-lg"
              >
                <PlayCircle weight="duotone" className="h-5 w-5" />
                Inicia sesión para comenzar
              </Link>
            )}

            {/* Lo que aprenderás */}
            <div className="bg-[#13293d] rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-4 text-xs uppercase tracking-wider text-[#89c2d9]">Lo que aprenderás</h3>
              <ul className="space-y-2.5">
                {[
                  "Cómo funciona la Constitución de Guatemala",
                  "Tus derechos como ciudadano",
                  "El proceso electoral y tu voto",
                  "Cómo identificar propaganda electoral",
                  "Qué elegimos realmente en cada elección",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-[#b2d3ea]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cómo funciona */}
            <div className="bg-white rounded-2xl border border-[#9ac1e2] p-5">
              <h3 className="font-bold text-[#13293d] mb-4 text-sm flex items-center gap-2">
                <span className="text-base">🗺️</span> ¿Cómo funciona?
              </h3>
              <ol className="space-y-3">
                {[
                  { emoji: "📖", texto: "Lee cada lección por secciones" },
                  { emoji: "✏️", texto: "Responde el quiz (mínimo 60%)" },
                  { emoji: "🔓", texto: "Desbloquea la siguiente lección" },
                  { emoji: "🏆", texto: "Aprueba el examen final (70%)" },
                  { emoji: "🎓", texto: "Descarga tu certificado" },
                ].map(({ emoji, texto }, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-[#16324f]">
                    <span className="w-7 h-7 rounded-full bg-[#d8e9f5] flex items-center justify-center flex-shrink-0 text-sm">{emoji}</span>
                    {texto}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA — solo móvil */}
      {isAuthenticated && (
        <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-white/95 backdrop-blur border-t border-[#d8e9f5] px-4 py-3 shadow-lg">
          <button
            onClick={() => {
              if (tieneCertificado || todosAprobados) navigate(`/cursos/${id}/evaluacion`);
              else if (primerDisponible) navigate(`/cursos/${id}/leccion/${primerDisponible}`);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm bg-[#2a628f] text-white active:bg-[#18435a] transition-colors"
          >
            <PlayCircle weight="duotone" className="h-5 w-5" />
            {tieneCertificado ? "Ver certificado" : todosAprobados ? "Presentar examen final" : aprobados > 0 ? "Continuar" : "Comenzar curso"}
          </button>
        </div>
      )}
    </div>
  );
}
