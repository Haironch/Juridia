import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, AlertTriangle } from 'lucide-react';
import { quizTemas } from '../../data/constituquiz';
import { useQuizStore } from '../../store/quizStore';
import QuizProgressBar from '../../components/quiz/QuizProgressBar';
import QuizOptionButton from '../../components/quiz/QuizOptionButton';

export default function QuizPracticeMode() {
  const { temaId } = useParams<{ temaId: string }>();
  const navigate = useNavigate();
  const [showExitDialog, setShowExitDialog] = useState(false);

  const {
    currentQuestionIndex,
    preguntas,
    selectedAnswer,
    isAnswerRevealed,
    quizCompleted,
    startQuiz,
    selectAnswer,
    revealAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuizStore();

  const tema = quizTemas.find(t => t.id === temaId);

  useEffect(() => {
    if (tema) {
      startQuiz(tema.id, tema.preguntas);
    }
  }, [temaId]);

  useEffect(() => {
    if (quizCompleted && temaId) {
      navigate(`/constituquiz/resultados/${temaId}`);
    }
  }, [quizCompleted, temaId, navigate]);

  if (!tema) {
    navigate('/constituquiz');
    return null;
  }

  const currentQuestion = preguntas[currentQuestionIndex];
  if (!currentQuestion) return null;

  const handleExit = () => {
    resetQuiz();
    navigate('/constituquiz');
  };

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#9ac1e2] sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-[#13293d]">{tema.tema}</h2>
            <button
              onClick={() => setShowExitDialog(true)}
              className="p-2 rounded-lg text-[#67a2d3] hover:text-red-500 hover:bg-red-50 transition-all"
              title="Salir del quiz"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <QuizProgressBar current={currentQuestionIndex} total={preguntas.length} />
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Question */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#9ac1e2] p-8 mb-8 animate-fade-slide-up">
          <p className="text-xl md:text-2xl font-semibold text-[#13293d] leading-relaxed">
            {currentQuestion.pregunta}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {Object.entries(currentQuestion.opciones).map(([key, text]) => (
            <QuizOptionButton
              key={key}
              optionKey={key}
              text={text}
              isSelected={selectedAnswer === key}
              isRevealed={isAnswerRevealed}
              isCorrect={key === currentQuestion.respuestaCorrecta}
              wasChosen={selectedAnswer === key}
              onSelect={selectAnswer}
            />
          ))}
        </div>

        {/* Explanation after reveal */}
        {isAnswerRevealed && currentQuestion.explicacion && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 animate-fade-slide-up">
            <p className="text-sm font-semibold text-blue-700 mb-1">Explicacion:</p>
            <p className="text-sm text-blue-800 leading-relaxed">{currentQuestion.explicacion}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="text-center">
          {!isAnswerRevealed ? (
            <button
              onClick={revealAnswer}
              disabled={selectedAnswer === null}
              className={`px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                selectedAnswer === null
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#2a628f] text-white hover:bg-[#18435a] shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              }`}
            >
              Confirmar
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-10 py-4 rounded-xl font-semibold text-lg bg-[#2a628f] text-white hover:bg-[#18435a] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-bounce-in"
            >
              {currentQuestionIndex < preguntas.length - 1 ? 'Siguiente' : 'Ver Resultados'}
            </button>
          )}
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      {showExitDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-bounce-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-[#13293d]">Salir del quiz</h3>
            </div>
            <p className="text-[#16324f] mb-6">
              Si sales ahora, perderas tu progreso en este intento. ¿Estas seguro?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitDialog(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-[#9ac1e2] text-[#2a628f] font-medium hover:bg-[#d8e9f5] transition-colors"
              >
                Continuar
              </button>
              <button
                onClick={handleExit}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
