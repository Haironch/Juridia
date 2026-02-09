import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { quizTemas } from '../../data/constituquiz';
import { useQuizStore } from '../../store/quizStore';
import FlashCard from '../../components/quiz/FlashCard';

export default function QuizStudyMode() {
  const { temaId } = useParams<{ temaId: string }>();
  const navigate = useNavigate();
  const {
    studyCardIndex,
    isCardFlipped,
    studyPreguntas,
    startStudy,
    flipCard,
    nextCard,
    previousCard,
  } = useQuizStore();

  const tema = quizTemas.find(t => t.id === temaId);

  useEffect(() => {
    if (tema) {
      startStudy(tema.id, tema.preguntas);
    }
  }, [temaId]);

  if (!tema) {
    navigate('/constituquiz');
    return null;
  }

  const currentQuestion = studyPreguntas[studyCardIndex];
  const isFirst = studyCardIndex === 0;
  const isLast = studyCardIndex === studyPreguntas.length - 1;

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#9ac1e2] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/constituquiz')}
            className="flex items-center gap-2 text-[#2a628f] hover:text-[#18435a] transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Volver</span>
          </button>

          <div className="text-center">
            <h2 className="text-lg font-bold text-[#13293d]">Modo Estudio</h2>
            <p className="text-sm text-[#67a2d3]">{tema.tema}</p>
          </div>

          <div className="bg-[#d8e9f5] px-4 py-1.5 rounded-full">
            <span className="text-sm font-semibold text-[#2a628f]">
              {studyCardIndex + 1} / {studyPreguntas.length}
            </span>
          </div>
        </div>
      </div>

      {/* Flash Card Area */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <FlashCard
            pregunta={currentQuestion}
            isFlipped={isCardFlipped}
            onFlip={flipCard}
          />
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={previousCard}
            disabled={isFirst}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              isFirst
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-[#2a628f] text-[#2a628f] hover:bg-[#2a628f] hover:text-white'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Anterior
          </button>

          <button
            onClick={nextCard}
            disabled={isLast}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              isLast
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-[#2a628f] text-[#2a628f] hover:bg-[#2a628f] hover:text-white'
            }`}
          >
            Siguiente
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {studyPreguntas.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === studyCardIndex
                  ? 'bg-[#2a628f] scale-125'
                  : 'bg-[#9ac1e2]'
              }`}
            />
          ))}
        </div>

        {/* Go to Practice Button */}
        <div className="text-center">
          <Link
            to={`/constituquiz/practica/${tema.id}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#2a628f] text-white rounded-xl font-semibold hover:bg-[#18435a] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Play className="h-5 w-5" />
            Ir a Practicar
          </Link>
        </div>
      </div>
    </div>
  );
}
