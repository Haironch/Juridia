import { create } from 'zustand';
import type { QuizPregunta, QuizAttempt, QuizRespuesta, QuizUserProgress } from '../types/index';

interface QuizState {
  // Active quiz session
  currentTemaId: string | null;
  currentQuestionIndex: number;
  preguntas: QuizPregunta[];
  respuestas: QuizRespuesta[];
  selectedAnswer: string | null;
  isAnswerRevealed: boolean;
  quizCompleted: boolean;

  // Study mode
  studyTemaId: string | null;
  studyPreguntas: QuizPregunta[];
  studyCardIndex: number;
  isCardFlipped: boolean;

  // Persisted history
  attempts: QuizAttempt[];

  // Actions: Quiz lifecycle
  startQuiz: (temaId: string, preguntas: QuizPregunta[]) => void;
  selectAnswer: (optionKey: string) => void;
  revealAnswer: () => void;
  nextQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;

  // Actions: Study mode
  startStudy: (temaId: string, preguntas: QuizPregunta[]) => void;
  flipCard: () => void;
  nextCard: () => void;
  previousCard: () => void;
  resetStudy: () => void;

  // Computed helpers
  getScore: () => { correct: number; total: number; percentage: number };
  getProgressByTema: (temaId: string) => QuizUserProgress | null;
  getAllProgress: () => QuizUserProgress[];
}

const loadAttempts = (): QuizAttempt[] => {
  try {
    const stored = localStorage.getItem('constituquiz-attempts');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveAttempts = (attempts: QuizAttempt[]) => {
  const limited = attempts.slice(-50);
  localStorage.setItem('constituquiz-attempts', JSON.stringify(limited));
};

export const useQuizStore = create<QuizState>((set, get) => ({
  // Initial state
  currentTemaId: null,
  currentQuestionIndex: 0,
  preguntas: [],
  respuestas: [],
  selectedAnswer: null,
  isAnswerRevealed: false,
  quizCompleted: false,

  studyTemaId: null,
  studyPreguntas: [],
  studyCardIndex: 0,
  isCardFlipped: false,

  attempts: loadAttempts(),

  // Quiz actions
  startQuiz: (temaId, preguntas) => {
    set({
      currentTemaId: temaId,
      currentQuestionIndex: 0,
      preguntas: [...preguntas],
      respuestas: [],
      selectedAnswer: null,
      isAnswerRevealed: false,
      quizCompleted: false,
    });
  },

  selectAnswer: (optionKey) => {
    const { isAnswerRevealed } = get();
    if (isAnswerRevealed) return;
    set({ selectedAnswer: optionKey });
  },

  revealAnswer: () => {
    const { selectedAnswer, preguntas, currentQuestionIndex, respuestas } = get();
    if (selectedAnswer === null) return;

    const currentQuestion = preguntas[currentQuestionIndex];
    const esCorrecta = selectedAnswer === currentQuestion.respuestaCorrecta;

    const nuevaRespuesta: QuizRespuesta = {
      preguntaId: currentQuestion.id,
      respuestaSeleccionada: selectedAnswer,
      esCorrecta,
    };

    set({
      isAnswerRevealed: true,
      respuestas: [...respuestas, nuevaRespuesta],
    });
  },

  nextQuestion: () => {
    const { currentQuestionIndex, preguntas } = get();
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= preguntas.length) {
      get().completeQuiz();
    } else {
      set({
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        isAnswerRevealed: false,
      });
    }
  },

  completeQuiz: () => {
    const state = get();
    const correct = state.respuestas.filter(r => r.esCorrecta).length;
    const total = state.preguntas.length;

    const newAttempt: QuizAttempt = {
      id: crypto.randomUUID(),
      temaId: state.currentTemaId!,
      fecha: new Date().toISOString(),
      totalPreguntas: total,
      respuestasCorrectas: correct,
      porcentaje: Math.round((correct / total) * 100),
      respuestas: state.respuestas,
    };

    const updatedAttempts = [...state.attempts, newAttempt];
    saveAttempts(updatedAttempts);
    set({ attempts: updatedAttempts, quizCompleted: true });
  },

  resetQuiz: () => {
    set({
      currentTemaId: null,
      currentQuestionIndex: 0,
      preguntas: [],
      respuestas: [],
      selectedAnswer: null,
      isAnswerRevealed: false,
      quizCompleted: false,
    });
  },

  // Study actions
  startStudy: (temaId, preguntas) => {
    set({
      studyTemaId: temaId,
      studyPreguntas: [...preguntas],
      studyCardIndex: 0,
      isCardFlipped: false,
    });
  },

  flipCard: () => {
    set(state => ({ isCardFlipped: !state.isCardFlipped }));
  },

  nextCard: () => {
    const { studyCardIndex, studyPreguntas } = get();
    if (studyCardIndex < studyPreguntas.length - 1) {
      set({ studyCardIndex: studyCardIndex + 1, isCardFlipped: false });
    }
  },

  previousCard: () => {
    const { studyCardIndex } = get();
    if (studyCardIndex > 0) {
      set({ studyCardIndex: studyCardIndex - 1, isCardFlipped: false });
    }
  },

  resetStudy: () => {
    set({
      studyTemaId: null,
      studyPreguntas: [],
      studyCardIndex: 0,
      isCardFlipped: false,
    });
  },

  // Computed helpers
  getScore: () => {
    const { respuestas, preguntas } = get();
    const correct = respuestas.filter(r => r.esCorrecta).length;
    const total = preguntas.length;
    return {
      correct,
      total,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  },

  getProgressByTema: (temaId) => {
    const { attempts } = get();
    const temaAttempts = attempts.filter(a => a.temaId === temaId);
    if (temaAttempts.length === 0) return null;

    const mejorPuntaje = Math.max(...temaAttempts.map(a => a.porcentaje));
    const promedio = Math.round(
      temaAttempts.reduce((sum, a) => sum + a.porcentaje, 0) / temaAttempts.length
    );
    const ultimoIntento = temaAttempts[temaAttempts.length - 1].fecha;

    return {
      temaId,
      intentos: temaAttempts.length,
      mejorPuntaje,
      promedio,
      ultimoIntento,
    };
  },

  getAllProgress: () => {
    const { attempts } = get();
    const temaIds = [...new Set(attempts.map(a => a.temaId))];
    return temaIds
      .map(temaId => get().getProgressByTema(temaId))
      .filter((p): p is QuizUserProgress => p !== null);
  },
}));
