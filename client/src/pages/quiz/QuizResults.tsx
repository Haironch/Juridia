import { useParams, useNavigate, Link } from 'react-router-dom';
import { Trophy, ThumbsUp, BookOpen, TrendingUp, AlertCircle, Check, X, RotateCcw, ArrowLeft } from 'lucide-react';
import { quizTemas } from '../../data/constituquiz';
import { useQuizStore } from '../../store/quizStore';
import QuizScoreCard from '../../components/quiz/QuizScoreCard';

export default function QuizResults() {
  const { temaId } = useParams<{ temaId: string }>();
  const navigate = useNavigate();
  const { getScore, respuestas, preguntas, resetQuiz } = useQuizStore();

  const tema = quizTemas.find(t => t.id === temaId);
  const score = getScore();

  if (!tema || preguntas.length === 0) {
    navigate('/constituquiz');
    return null;
  }

  const getPerformanceMessage = () => {
    if (score.percentage === 100) {
      return {
        icon: <Trophy className="h-8 w-8 text-yellow-500" />,
        title: 'Perfecto!',
        message: 'Dominas este tema por completo. Excelente trabajo!',
        color: 'text-yellow-600',
      };
    }
    if (score.percentage >= 80) {
      return {
        icon: <ThumbsUp className="h-8 w-8 text-green-500" />,
        title: 'Excelente!',
        message: 'Casi perfecto. Tienes un gran dominio del tema.',
        color: 'text-green-600',
      };
    }
    if (score.percentage >= 60) {
      return {
        icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
        title: 'Buen trabajo!',
        message: 'Vas por buen camino. Sigue practicando para mejorar.',
        color: 'text-blue-600',
      };
    }
    if (score.percentage >= 40) {
      return {
        icon: <BookOpen className="h-8 w-8 text-orange-500" />,
        title: 'Puedes mejorar',
        message: 'Te recomendamos repasar el material antes de intentar de nuevo.',
        color: 'text-orange-600',
      };
    }
    return {
      icon: <AlertCircle className="h-8 w-8 text-red-500" />,
      title: 'Necesitas estudiar mas',
      message: 'Te recomendamos usar el modo estudio para reforzar tus conocimientos.',
      color: 'text-red-600',
    };
  };

  const performance = getPerformanceMessage();

  const handleRetry = () => {
    resetQuiz();
    navigate(`/constituquiz/practica/${temaId}`);
  };

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#9ac1e2]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/constituquiz"
            className="flex items-center gap-2 text-[#2a628f] hover:text-[#18435a] transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Volver al inicio</span>
          </Link>
          <h2 className="text-lg font-bold text-[#13293d]">Resultados</h2>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Score Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#9ac1e2] overflow-hidden mb-8 animate-fade-slide-up">
          <div className="p-8">
            <QuizScoreCard
              correct={score.correct}
              total={score.total}
              percentage={score.percentage}
            />
          </div>

          {/* Performance Message */}
          <div className="border-t border-[#9ac1e2] p-6">
            <div className="flex items-center gap-4 justify-center">
              {performance.icon}
              <div>
                <h3 className={`text-xl font-bold ${performance.color}`}>{performance.title}</h3>
                <p className="text-[#16324f]">{performance.message}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#9ac1e2] overflow-hidden mb-8">
          <div className="p-6 border-b border-[#9ac1e2]">
            <h3 className="text-lg font-bold text-[#13293d]">Desglose de respuestas</h3>
          </div>

          <div className="divide-y divide-[#d8e9f5]">
            {preguntas.map((pregunta, index) => {
              const respuesta = respuestas[index];
              const esCorrecta = respuesta?.esCorrecta || false;
              const respuestaSeleccionada = respuesta?.respuestaSeleccionada;
              const correctAnswer = pregunta.opciones[pregunta.respuestaCorrecta];

              return (
                <div key={pregunta.id} className="p-6">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      esCorrecta ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {esCorrecta ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#13293d] mb-2">
                        {index + 1}. {pregunta.pregunta}
                      </p>

                      {!esCorrecta && respuestaSeleccionada && (
                        <div className="mb-2">
                          <span className="text-sm text-red-600 font-medium">Tu respuesta: </span>
                          <span className="text-sm text-red-700">
                            {respuestaSeleccionada}) {pregunta.opciones[respuestaSeleccionada]}
                          </span>
                        </div>
                      )}

                      <div>
                        <span className="text-sm text-green-600 font-medium">Respuesta correcta: </span>
                        <span className="text-sm text-green-700">
                          {pregunta.respuestaCorrecta}) {correctAnswer}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2a628f] text-white rounded-xl font-semibold hover:bg-[#18435a] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="h-5 w-5" />
            Reintentar
          </button>
          <Link
            to={`/constituquiz/estudio/${temaId}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#2a628f] text-[#2a628f] rounded-xl font-semibold hover:bg-[#2a628f] hover:text-white transition-all duration-300"
          >
            <BookOpen className="h-5 w-5" />
            Estudiar este tema
          </Link>
          <Link
            to="/constituquiz"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#9ac1e2] text-[#16324f] rounded-xl font-semibold hover:bg-white transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
