export type RolUsuario = 
  | 'SUPER_ADMIN'
  | 'ADMIN_CONTENIDO'
  | 'TUTOR'
  | 'PREMIUM'
  | 'FREE';

export interface Usuario {
  id: string;
  email: string;
  nombre?: string;
  apellido?: string;
  rol: RolUsuario;
  fechaRegistro: string;
  rachaActual?: number;
  rachaMaxima?: number;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: Usuario;
    token: string;
  };
}

export interface Pregunta {
  id: string;
  texto: string;
  dificultad: number;
  opciones: OpcionRespuesta[];
}

export interface OpcionRespuesta {
  id: string;
  texto: string;
  esCorrecta: boolean;
}

// --- ConstituQuiz Types ---

export interface QuizPregunta {
  id: number;
  pregunta: string;
  opciones: Record<string, string>;
  respuestaCorrecta: string;
  explicacion?: string;
}

export interface QuizTema {
  id: string;
  tema: string;
  descripcion: string;
  icono: string;
  totalPreguntas: number;
  preguntas: QuizPregunta[];
  categoria?: string;
}

export interface QuizAttempt {
  id: string;
  temaId: string;
  fecha: string;
  totalPreguntas: number;
  respuestasCorrectas: number;
  porcentaje: number;
  respuestas: QuizRespuesta[];
}

export interface QuizRespuesta {
  preguntaId: number;
  respuestaSeleccionada: string | null;
  esCorrecta: boolean;
}

export interface QuizUserProgress {
  temaId: string;
  intentos: number;
  mejorPuntaje: number;
  promedio: number;
  ultimoIntento: string;
}
