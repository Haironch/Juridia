import type { QuizPregunta } from '../../types/index';
import { RotateCcw, Check } from 'lucide-react';

interface FlashCardProps {
  pregunta: QuizPregunta;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function FlashCard({ pregunta, isFlipped, onFlip }: FlashCardProps) {
  const correctAnswer = pregunta.opciones[pregunta.respuestaCorrecta];

  return (
    <div className="flip-card w-full max-w-lg mx-auto" style={{ minHeight: '380px' }}>
      <div
        className={`flip-card-inner relative w-full h-full cursor-pointer ${isFlipped ? 'flipped' : ''}`}
        onClick={onFlip}
        style={{ minHeight: '380px' }}
      >
        {/* Front - Question */}
        <div className="flip-card-front absolute inset-0 bg-white rounded-2xl shadow-lg border-2 border-[#9ac1e2] p-8 flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-full bg-[#d8e9f5] flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="h-8 w-8 text-[#2a628f]" />
            </div>
            <p className="text-xl font-semibold text-[#13293d] leading-relaxed">
              {pregunta.pregunta}
            </p>
          </div>
          <p className="text-sm text-[#67a2d3] mt-auto animate-pulse">
            Toca para ver la respuesta
          </p>
        </div>

        {/* Back - Answer */}
        <div className="flip-card-back absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border-2 border-green-400 p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
              <Check className="h-5 w-5 text-green-700" />
            </div>
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
              Respuesta Correcta
            </span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-green-200 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-200 text-green-800 text-sm font-bold mr-2">
              {pregunta.respuestaCorrecta}
            </span>
            <span className="text-[#13293d] leading-relaxed">{correctAnswer}</span>
          </div>

          {pregunta.explicacion && (
            <div className="bg-white/70 rounded-xl p-4 border border-green-100 flex-1">
              <p className="text-sm font-semibold text-green-700 mb-1">Explicacion:</p>
              <p className="text-sm text-[#16324f] leading-relaxed">{pregunta.explicacion}</p>
            </div>
          )}

          <p className="text-sm text-green-500 text-center mt-4 animate-pulse">
            Toca para volver a la pregunta
          </p>
        </div>
      </div>
    </div>
  );
}
