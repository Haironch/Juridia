import { Brain, TrendingUp, Target, Award } from 'lucide-react';
import { quizTemas } from '../../data/constituquiz';
import { useQuizStore } from '../../store/quizStore';
import TopicCard from '../../components/quiz/TopicCard';

export default function ConstituQuizHome() {
  const { getProgressByTema, getAllProgress } = useQuizStore();
  const allProgress = getAllProgress();

  const totalIntentos = allProgress.reduce((sum, p) => sum + p.intentos, 0);
  const promedioGeneral = allProgress.length > 0
    ? Math.round(allProgress.reduce((sum, p) => sum + p.promedio, 0) / allProgress.length)
    : 0;
  const mejorPuntajeGeneral = allProgress.length > 0
    ? Math.max(...allProgress.map(p => p.mejorPuntaje))
    : 0;

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Brain className="h-9 w-9 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">ConstituQuiz</h1>
          <p className="text-lg text-[#b2d3ea] max-w-2xl mx-auto">
            Pon a prueba tus conocimientos sobre la Constitucion Politica de Guatemala.
            Estudia con tarjetas y practica con quizzes interactivos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        {totalIntentos > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9ac1e2] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-[#2a628f]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#13293d]">{totalIntentos}</p>
                <p className="text-sm text-[#67a2d3]">Quizzes completados</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9ac1e2] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#13293d]">{promedioGeneral}%</p>
                <p className="text-sm text-[#67a2d3]">Promedio general</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9ac1e2] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#13293d]">{mejorPuntajeGeneral}%</p>
                <p className="text-sm text-[#67a2d3]">Mejor puntaje</p>
              </div>
            </div>
          </div>
        )}

        {/* Topics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#13293d] mb-2">Temas disponibles</h2>
          <p className="text-[#16324f]">Selecciona un tema para estudiar o practicar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizTemas.map((tema) => (
            <TopicCard
              key={tema.id}
              tema={tema}
              progress={getProgressByTema(tema.id)}
            />
          ))}
        </div>

        {/* Empty state if no topics */}
        {quizTemas.length === 0 && (
          <div className="text-center py-16">
            <Brain className="h-16 w-16 text-[#9ac1e2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#13293d] mb-2">Proximamente</h3>
            <p className="text-[#67a2d3]">Estamos preparando nuevos quizzes para ti.</p>
          </div>
        )}
      </div>
    </div>
  );
}
