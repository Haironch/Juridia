import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft, Clock, Layers, Lock, BookOpen,
  CheckCircle, ChevronDown, ChevronUp, PlayCircle,
} from "lucide-react";
import { useState } from "react";
import api from "../../services/api";

interface Modulo {
  id: string;
  orden: number;
  titulo: string;
  contenido: string;
  duracion_estimada: number;
}

interface CursoDetalle {
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

function NivelBadge({ nivel }: { nivel: string }) {
  const color =
    nivel === "Básico"
      ? "bg-emerald-100 text-emerald-700"
      : nivel === "Intermedio"
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>
      {nivel}
    </span>
  );
}

function ModuloItem({ modulo, index }: { modulo: Modulo; index: number }) {
  const [abierto, setAbierto] = useState(index === 0);

  return (
    <div className="border border-[#9ac1e2] rounded-xl overflow-hidden">
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center gap-4 p-4 bg-white hover:bg-[#f0f7fc] transition-colors text-left"
      >
        <div className="w-8 h-8 rounded-full bg-[#2a628f] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
          {modulo.orden}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#13293d] text-sm">{modulo.titulo}</p>
          {modulo.duracion_estimada && (
            <p className="text-xs text-[#67a2d3] flex items-center gap-1 mt-0.5">
              <Clock className="h-3 w-3" />
              {modulo.duracion_estimada} min
            </p>
          )}
        </div>
        {abierto ? (
          <ChevronUp className="h-4 w-4 text-[#67a2d3] flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#67a2d3] flex-shrink-0" />
        )}
      </button>

      {abierto && modulo.contenido && (
        <div className="px-4 pb-4 pt-2 bg-[#f8fbfe] border-t border-[#d8e9f5]">
          <p className="text-sm text-[#16324f] leading-relaxed">{modulo.contenido}</p>
        </div>
      )}
    </div>
  );
}

function SkeletonDetalle() {
  return (
    <div className="animate-pulse">
      <div className="bg-gradient-to-br from-[#2a628f] to-[#13293d] py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="h-4 bg-white/20 rounded w-24 mb-6" />
          <div className="h-8 bg-white/20 rounded w-2/3 mb-4" />
          <div className="h-4 bg-white/20 rounded w-full mb-2" />
          <div className="h-4 bg-white/20 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}

export default function CursoDetalle() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["curso", id],
    queryFn: async () => {
      const res = await api.get<{ ok: boolean; data: CursoDetalle }>(`/api/cursos/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <SkeletonDetalle />;

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-[#d8e9f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#13293d] font-semibold mb-2">Curso no encontrado</p>
          <Link to="/cursos" className="text-[#2a628f] text-sm hover:underline">
            ← Volver a cursos
          </Link>
        </div>
      </div>
    );
  }

  const duracionTotal = data.modulos.reduce(
    (sum, m) => sum + (m.duracion_estimada ?? 0), 0
  );

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
              {data.categoriaIcono} {data.categoria}
            </span>
            <NivelBadge nivel={data.nivel} />
            {data.es_premium === 1 && (
              <span className="flex items-center gap-1 text-xs font-semibold text-white bg-white/20 px-2.5 py-1 rounded-full">
                <Lock className="h-3 w-3" />
                Premium
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {data.titulo}
          </h1>

          <p className="text-[#b2d3ea] text-base leading-relaxed max-w-2xl mb-8">
            {data.descripcion}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 text-sm text-[#89c2d9]">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>{data.modulos.length} módulos</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{data.duracion}</span>
            </div>
            {duracionTotal > 0 && (
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                <span>{duracionTotal} min de contenido</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Módulos */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#13293d] mb-5 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#2a628f]" />
              Contenido del curso
            </h2>

            <div className="space-y-3">
              {data.modulos.map((modulo, i) => (
                <ModuloItem key={modulo.id} modulo={modulo} index={i} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Cómo completar */}
            <div className="bg-white rounded-2xl border border-[#9ac1e2] p-6 mb-6">
              <h3 className="font-bold text-[#13293d] mb-4">¿Cómo completar este curso?</h3>
              <ul className="space-y-3">
                {[
                  "Estudia cada módulo en orden",
                  "Lee el contenido con calma",
                  "Toma notas de los puntos clave",
                  "Practica con el ConstituQuiz",
                  "Repasa los módulos difíciles",
                ].map((paso, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#16324f]">
                    <CheckCircle className="h-4 w-4 text-[#2a628f] flex-shrink-0 mt-0.5" />
                    {paso}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resumen */}
            <div className="bg-[#13293d] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wide text-[#89c2d9]">
                Resumen
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#89c2d9]">Nivel</span>
                  <span className="font-medium">{data.nivel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#89c2d9]">Duración</span>
                  <span className="font-medium">{data.duracion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#89c2d9]">Módulos</span>
                  <span className="font-medium">{data.modulos.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#89c2d9]">Acceso</span>
                  <span className="font-medium">
                    {data.es_premium === 1 ? "Premium" : "Gratuito"}
                  </span>
                </div>
              </div>

              <Link
                to="/constituquiz"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#2a628f] hover:bg-[#18435a] rounded-xl text-sm font-semibold transition-colors"
              >
                Practicar con ConstituQuiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
