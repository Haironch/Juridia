import { Link } from "react-router-dom";
import {
  BarChart2,
  Target,
  Trophy,
  TrendingUp,
  Brain,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { useQuizStore } from "../../store/quizStore";
import { quizTemas } from "../../data/constituquiz";

function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("es-GT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ScoreBar({ value }: { value: number }) {
  const color =
    value >= 80
      ? "bg-green-500"
      : value >= 60
      ? "bg-yellow-500"
      : "bg-red-400";
  return (
    <div className="w-full bg-[#d8e9f5] rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function Progreso() {
  const { getAllProgress, attempts } = useQuizStore();
  const allProgress = getAllProgress();

  const totalIntentos = allProgress.reduce((sum, p) => sum + p.intentos, 0);
  const promedioGeneral =
    allProgress.length > 0
      ? Math.round(
          allProgress.reduce((sum, p) => sum + p.promedio, 0) /
            allProgress.length
        )
      : 0;
  const mejorPuntaje =
    allProgress.length > 0
      ? Math.max(...allProgress.map((p) => p.mejorPuntaje))
      : 0;
  const temasCompletados = allProgress.filter((p) => p.mejorPuntaje >= 70)
    .length;

  // Last 5 attempts (newest first)
  const ultimosIntentos = [...attempts]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5);

  const hasData = totalIntentos > 0;

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <BarChart2 className="h-8 w-8 text-white" />
            <h1 className="text-4xl font-bold text-white">Mi Progreso</h1>
          </div>
          <p className="text-lg text-[#b2d3ea] max-w-3xl">
            Visualiza tu avance en cada tema, revisa tus intentos anteriores y
            descubre en qué áreas puedes mejorar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!hasData ? (
          /* ── Empty State ── */
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-[#9ac1e2] flex items-center justify-center mx-auto mb-6">
              <Brain className="h-10 w-10 text-[#9ac1e2]" />
            </div>
            <h2 className="text-2xl font-bold text-[#13293d] mb-3">
              Aún no tienes registros
            </h2>
            <p className="text-[#16324f] max-w-md mx-auto mb-8">
              Completa tu primer quiz en ConstituQuiz y aquí podrás ver tu
              progreso, historial de intentos y estadísticas detalladas.
            </p>
            <Link
              to="/constituquiz"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#2a628f] text-white font-semibold rounded-lg hover:bg-[#18435a] transition-colors"
            >
              <Brain className="h-5 w-5" />
              Ir a ConstituQuiz
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* ── Summary Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9ac1e2]">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                  <Target className="h-5 w-5 text-[#2a628f]" />
                </div>
                <p className="text-3xl font-bold text-[#13293d]">
                  {totalIntentos}
                </p>
                <p className="text-sm text-[#67a2d3] mt-1">
                  Quizzes completados
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9ac1e2]">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-[#13293d]">
                  {promedioGeneral}%
                </p>
                <p className="text-sm text-[#67a2d3] mt-1">Promedio general</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9ac1e2]">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center mb-3">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold text-[#13293d]">
                  {mejorPuntaje}%
                </p>
                <p className="text-sm text-[#67a2d3] mt-1">Mejor puntaje</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9ac1e2]">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-[#13293d]">
                  {temasCompletados}/{quizTemas.length}
                </p>
                <p className="text-sm text-[#67a2d3] mt-1">
                  Temas dominados (≥70%)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* ── Per-Topic Progress ── */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#9ac1e2] p-6">
                <h2 className="text-xl font-bold text-[#13293d] mb-6">
                  Progreso por tema
                </h2>
                <div className="space-y-6">
                  {quizTemas.map((tema) => {
                    const progress = allProgress.find(
                      (p) => p.temaId === tema.id
                    );
                    return (
                      <div key={tema.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-[#13293d]">
                            {tema.tema}
                          </span>
                          {progress ? (
                            <span className="text-sm font-semibold text-[#2a628f]">
                              {progress.mejorPuntaje}%
                            </span>
                          ) : (
                            <span className="text-xs text-[#9ac1e2]">
                              Sin intentos
                            </span>
                          )}
                        </div>
                        <ScoreBar value={progress?.mejorPuntaje ?? 0} />
                        {progress && (
                          <p className="text-xs text-[#67a2d3] mt-1">
                            {progress.intentos}{" "}
                            {progress.intentos === 1 ? "intento" : "intentos"}{" "}
                            · Promedio: {progress.promedio}%
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <Link
                  to="/constituquiz"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2.5 border-2 border-[#2a628f] text-[#2a628f] font-medium rounded-xl hover:bg-[#2a628f] hover:text-white transition-all text-sm"
                >
                  <Brain className="h-4 w-4" />
                  Practicar más temas
                </Link>
              </div>

              {/* ── Recent Attempts ── */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#9ac1e2] p-6">
                <h2 className="text-xl font-bold text-[#13293d] mb-6">
                  Últimos intentos
                </h2>

                {ultimosIntentos.length === 0 ? (
                  <p className="text-[#67a2d3] text-sm">Sin intentos aún.</p>
                ) : (
                  <div className="space-y-3">
                    {ultimosIntentos.map((attempt) => {
                      const tema = quizTemas.find(
                        (t) => t.id === attempt.temaId
                      );
                      const passed = attempt.porcentaje >= 70;
                      return (
                        <div
                          key={attempt.id}
                          className="flex items-center gap-4 p-3 rounded-xl bg-[#f0f7fc] border border-[#d8e9f5]"
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                              passed ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            {passed ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#13293d] truncate">
                              {tema?.tema ?? attempt.temaId}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-[#67a2d3]">
                              <Clock className="h-3 w-3" />
                              {formatDate(attempt.fecha)}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span
                              className={`text-lg font-bold ${
                                passed ? "text-green-600" : "text-red-500"
                              }`}
                            >
                              {attempt.porcentaje}%
                            </span>
                            <p className="text-xs text-[#67a2d3]">
                              {attempt.respuestasCorrectas}/
                              {attempt.totalPreguntas}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Recommendation */}
                {allProgress.length > 0 && (
                  <div className="mt-6 p-4 bg-[#d8e9f5] rounded-xl border border-[#9ac1e2]">
                    <p className="text-xs font-semibold text-[#18435a] uppercase tracking-wide mb-1">
                      Recomendación
                    </p>
                    {(() => {
                      const peor = allProgress.reduce((prev, curr) =>
                        curr.promedio < prev.promedio ? curr : prev
                      );
                      const tema = quizTemas.find((t) => t.id === peor.temaId);
                      return (
                        <p className="text-sm text-[#16324f]">
                          Practica más{" "}
                          <span className="font-semibold text-[#2a628f]">
                            {tema?.tema ?? peor.temaId}
                          </span>{" "}
                          — tu promedio en este tema es {peor.promedio}%.
                        </p>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
