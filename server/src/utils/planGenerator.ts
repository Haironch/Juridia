export interface SemanaRecurso {
  tipo: 'glosario' | 'quiz' | 'caso' | 'documento' | 'material';
  id: string;
  nombre: string;
  duracion?: string;
}

export interface SemanaConfig {
  titulo: string;
  descripcion: string;
  recursos: SemanaRecurso[];
}

export interface PlanConfig {
  examen: 'privado' | 'civil' | 'penal' | 'laboral';
  fase: 'basica' | 'intermedia' | 'avanzada';
  semanas: number;
}

export const PLAN_RULES: Record<string, Record<string, Record<number, SemanaConfig>>> = {
  privado: {
    basica: {
      1: {
        titulo: 'Fundamentos: Glosario Jurídico',
        descripcion: 'Aprende 40 términos básicos del derecho. Son la base de todo lo que viene.',
        recursos: [
          { tipo: 'glosario', id: 'completo', nombre: 'Glosario jurídico (40 términos)', duracion: '2-3 horas' },
        ],
      },
      2: {
        titulo: 'Introducción: Derecho Constitucional',
        descripcion: 'Entiende la estructura del estado, derechos fundamentales y cómo se protegen.',
        recursos: [
          { tipo: 'material', id: 'constitucion-basico', nombre: 'Material de Derecho Constitucional' },
          { tipo: 'quiz', id: 'constituquiz-sesion-1', nombre: 'ConstituQuiz Sesión 1', duracion: '45 min' },
        ],
      },
      3: {
        titulo: 'Derecho Civil Básico',
        descripcion: 'Contratos, responsabilidad civil y obligaciones. Casos reales de la práctica.',
        recursos: [
          { tipo: 'material', id: 'civil-material', nombre: 'Material de Derecho Civil' },
          { tipo: 'caso', id: 'caso-contrato', nombre: 'Caso: Vicios ocultos en contrato', duracion: '30 min' },
          { tipo: 'caso', id: 'caso-defensa', nombre: 'Caso: Legítima defensa', duracion: '30 min' },
        ],
      },
      4: {
        titulo: 'Derecho Laboral Básico',
        descripcion: 'Relaciones laborales, despido, liquidación y derechos del trabajador.',
        recursos: [
          { tipo: 'documento', id: 'liquidacion', nombre: 'Calculadora de liquidación laboral', duracion: '1 hora' },
          { tipo: 'caso', id: 'caso-despido', nombre: 'Caso: Despido injustificado', duracion: '30 min' },
          { tipo: 'quiz', id: 'laboral-quiz', nombre: 'Quiz Derecho Laboral', duracion: '45 min' },
        ],
      },
      5: {
        titulo: 'Procedimiento y Derecho Procesal',
        descripcion: 'Cómo funciona un juicio, procedimientos, etapas y recursos procesales.',
        recursos: [
          { tipo: 'material', id: 'procedimiento', nombre: 'Material de Derecho Procesal' },
          { tipo: 'caso', id: 'caso-procesal', nombre: 'Caso: Procedimiento legal', duracion: '45 min' },
        ],
      },
      6: {
        titulo: 'Casos integradores y Derecho de Familia',
        descripcion: 'Mezcla de conocimientos: resuelve casos complejos de familia y violencia.',
        recursos: [
          { tipo: 'caso', id: 'caso-familia', nombre: 'Caso: Violencia intrafamiliar', duracion: '45 min' },
          { tipo: 'material', id: 'familia-material', nombre: 'Material de Derecho de Familia' },
        ],
      },
      7: {
        titulo: 'Simulacro de examen privado',
        descripcion: '30 preguntas en tiempo real sobre todas las áreas. Modo examen.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Examen Simulado Privado', duracion: '2 horas' },
        ],
      },
      8: {
        titulo: 'Repaso final y confianza',
        descripcion: 'Refuerza tus áreas débiles y prepárate psicológicamente para el examen.',
        recursos: [
          { tipo: 'glosario', id: 'repaso', nombre: 'Repaso: Términos clave' },
          { tipo: 'quiz', id: 'repaso-simulado', nombre: 'Mini simulacro de repaso', duracion: '1 hora' },
          { tipo: 'documento', id: 'documentos', nombre: 'Generador de documentos legales', duracion: '30 min' },
        ],
      },
    },

    intermedia: {
      1: {
        titulo: 'Refresh: Constitución y Derechos Fundamentales',
        descripcion: 'Repasa rápido la CPRG, derechos y recursos constitucionales.',
        recursos: [
          { tipo: 'quiz', id: 'constituquiz-sesion-1', nombre: 'ConstituQuiz Sesiones 1-2', duracion: '1.5 horas' },
          { tipo: 'caso', id: 'caso-constitucional', nombre: 'Caso: Amparo', duracion: '45 min' },
        ],
      },
      2: {
        titulo: 'Civil: Obligaciones y Contratos Avanzado',
        descripcion: 'Profundiza en la teoría de obligaciones, incumplimiento y responsabilidad.',
        recursos: [
          { tipo: 'caso', id: 'caso-contrato', nombre: 'Caso: Incumplimiento de contrato', duracion: '45 min' },
          { tipo: 'quiz', id: 'civil-quiz', nombre: 'Quiz Derecho Civil', duracion: '1 hora' },
        ],
      },
      3: {
        titulo: 'Laboral: Derechos Colectivos y Terminación',
        descripcion: 'Sindicatos, huelga, terminación de relación, liquidación completa.',
        recursos: [
          { tipo: 'documento', id: 'liquidacion', nombre: 'Calculadora de liquidación avanzada', duracion: '1 hora' },
          { tipo: 'quiz', id: 'laboral-quiz', nombre: 'Quiz Laboral Avanzado', duracion: '1.5 horas' },
        ],
      },
      4: {
        titulo: 'Penal: Delitos contra la Persona',
        descripcion: 'Homicidio, lesiones, violencia y delitos sexuales.',
        recursos: [
          { tipo: 'material', id: 'penal-material', nombre: 'Material de Derecho Penal' },
          { tipo: 'quiz', id: 'penal-quiz', nombre: 'Quiz Derecho Penal', duracion: '1 hora' },
        ],
      },
      5: {
        titulo: 'Simulacro intermedio',
        descripcion: '30 preguntas enfocadas en los temas más complicados.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Examen Simulado Intermedio', duracion: '2 horas' },
        ],
      },
      6: {
        titulo: 'Repaso por área',
        descripcion: 'Profundiza en tus puntos débiles identificados en el simulacro.',
        recursos: [
          { tipo: 'glosario', id: 'repaso', nombre: 'Glosario de términos clave' },
          { tipo: 'quiz', id: 'repaso-simulado', nombre: 'Quiz de refuerzo temático', duracion: '1.5 horas' },
        ],
      },
    },

    avanzada: {
      1: {
        titulo: 'Análisis de jurisprudencia y doctrina',
        descripcion: 'Estudia resoluciones reales y argumentos que usan los abogados.',
        recursos: [
          { tipo: 'material', id: 'jurisprudencia', nombre: 'Casos de jurisprudencia importante' },
          { tipo: 'quiz', id: 'constituquiz-sesion-1', nombre: 'ConstituQuiz completo', duracion: '2 horas' },
        ],
      },
      2: {
        titulo: 'Casos complejos integradores',
        descripcion: 'Resuelve casos que mezclan múltiples áreas del derecho.',
        recursos: [
          { tipo: 'caso', id: 'caso-contrato', nombre: 'Caso integrador 1', duracion: '1 hora' },
          { tipo: 'caso', id: 'caso-familia', nombre: 'Caso integrador 2', duracion: '1 hora' },
          { tipo: 'caso', id: 'caso-despido', nombre: 'Caso integrador 3', duracion: '1 hora' },
        ],
      },
      3: {
        titulo: 'Examen simulado avanzado',
        descripcion: '40 preguntas de alta dificultad con argumentación profunda.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Examen Simulado Privado Avanzado', duracion: '3 horas' },
        ],
      },
      4: {
        titulo: 'Práctica final: Argumentación y redacción',
        descripcion: 'Practica cómo redactar respuestas en forma de sentencias y dictámenes.',
        recursos: [
          { tipo: 'documento', id: 'documentos', nombre: 'Generador de documentos legales', duracion: '2 horas' },
          { tipo: 'glosario', id: 'repaso', nombre: 'Glosario de jurisprudencia', duracion: '1 hora' },
        ],
      },
    },
  },

  civil: {
    basica: {
      1: {
        titulo: 'Glosario y Fundamentos',
        descripcion: 'Términos básicos del Derecho Civil guatemalteco.',
        recursos: [
          { tipo: 'glosario', id: 'completo', nombre: 'Glosario jurídico', duracion: '2 horas' },
        ],
      },
      2: {
        titulo: 'Teoría General del Derecho',
        descripcion: 'Conceptos de sujetos, objetos y relaciones jurídicas.',
        recursos: [
          { tipo: 'material', id: 'civil-material', nombre: 'Material de Derecho Civil' },
          { tipo: 'quiz', id: 'civil-quiz', nombre: 'Quiz Teoría General', duracion: '45 min' },
        ],
      },
      3: {
        titulo: 'Obligaciones y Contratos',
        descripcion: 'Formación, efectos y incumplimiento de contratos.',
        recursos: [
          { tipo: 'caso', id: 'caso-contrato', nombre: 'Caso: Contrato defectuoso', duracion: '45 min' },
          { tipo: 'quiz', id: 'civil-quiz', nombre: 'Quiz Obligaciones', duracion: '1 hora' },
        ],
      },
      4: {
        titulo: 'Responsabilidad Civil',
        descripcion: 'Daño, causalidad y reparación en la responsabilidad civil.',
        recursos: [
          { tipo: 'caso', id: 'caso-defensa', nombre: 'Caso: Responsabilidad', duracion: '45 min' },
          { tipo: 'quiz', id: 'civil-quiz', nombre: 'Quiz Responsabilidad', duracion: '1 hora' },
        ],
      },
      5: {
        titulo: 'Simulacro',
        descripcion: 'Examen simulado de Derecho Civil.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Examen Simulado Civil', duracion: '2 horas' },
        ],
      },
    },
    intermedia: {
      1: {
        titulo: 'Contratos Especiales',
        descripcion: 'Compraventa, arrendamiento, préstamo y otros contratos típicos.',
        recursos: [
          { tipo: 'material', id: 'civil-material', nombre: 'Material: Contratos Especiales' },
          { tipo: 'caso', id: 'caso-contrato', nombre: 'Casos de contratos especiales', duracion: '1.5 horas' },
        ],
      },
      2: {
        titulo: 'Derechos Reales',
        descripcion: 'Propiedad, posesión, usufructo y otros derechos reales.',
        recursos: [
          { tipo: 'quiz', id: 'civil-quiz', nombre: 'Quiz Derechos Reales', duracion: '1.5 horas' },
          { tipo: 'caso', id: 'caso-defensa', nombre: 'Caso: Conflicto de propiedad', duracion: '1 hora' },
        ],
      },
      3: {
        titulo: 'Simulacro Civil Avanzado',
        descripcion: 'Preguntas de mayor dificultad.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Simulacro Civil', duracion: '2.5 horas' },
        ],
      },
    },
    avanzada: {
      1: {
        titulo: 'Análisis crítico de jurisprudencia civil',
        descripcion: 'Estudio de casos reales resueltos por cortes.',
        recursos: [
          { tipo: 'material', id: 'jurisprudencia', nombre: 'Jurisprudencia Civil' },
          { tipo: 'quiz', id: 'civil-quiz', nombre: 'Quiz crítico', duracion: '2 horas' },
        ],
      },
      2: {
        titulo: 'Examen final simulado',
        descripcion: 'Simulacro de máxima dificultad.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Examen Simulado Final', duracion: '3 horas' },
        ],
      },
    },
  },

  penal: {
    basica: {
      1: {
        titulo: 'Glosario y Principios Básicos',
        descripcion: 'Términos del Derecho Penal y principios fundamentales.',
        recursos: [
          { tipo: 'glosario', id: 'completo', nombre: 'Glosario jurídico', duracion: '2 horas' },
        ],
      },
      2: {
        titulo: 'Teoría General del Delito',
        descripcion: 'Tipicidad, antijuricidad, culpabilidad y punibilidad.',
        recursos: [
          { tipo: 'material', id: 'penal-material', nombre: 'Material de Derecho Penal' },
          { tipo: 'quiz', id: 'penal-quiz', nombre: 'Quiz Teoría del Delito', duracion: '1 hora' },
        ],
      },
      3: {
        titulo: 'Delitos contra la Persona',
        descripcion: 'Homicidio, lesiones y delitos sexuales.',
        recursos: [
          { tipo: 'caso', id: 'caso-defensa', nombre: 'Caso: Legítima defensa', duracion: '45 min' },
          { tipo: 'quiz', id: 'penal-quiz', nombre: 'Quiz Delitos contra Persona', duracion: '1 hora' },
        ],
      },
      4: {
        titulo: 'Delitos contra el Patrimonio',
        descripcion: 'Robo, hurto, estafa y delitos patrimoniales.',
        recursos: [
          { tipo: 'material', id: 'penal-material', nombre: 'Material: Delitos Patrimoniales' },
          { tipo: 'quiz', id: 'penal-quiz', nombre: 'Quiz Delitos Patrimoniales', duracion: '1 hora' },
        ],
      },
      5: {
        titulo: 'Simulacro',
        descripcion: 'Examen simulado de Derecho Penal.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Examen Simulado Penal', duracion: '2 horas' },
        ],
      },
    },
    intermedia: {
      1: {
        titulo: 'Delitos Especiales y Procedimiento Penal',
        descripcion: 'Delitos contra funcionarios, procedimiento penal completo.',
        recursos: [
          { tipo: 'material', id: 'penal-material', nombre: 'Material Avanzado: Procedimiento' },
          { tipo: 'quiz', id: 'penal-quiz', nombre: 'Quiz Procedimiento Penal', duracion: '1.5 horas' },
        ],
      },
      2: {
        titulo: 'Penas y Circunstancias',
        descripcion: 'Aplicación de penas, circunstancias atenuantes y agravantes.',
        recursos: [
          { tipo: 'caso', id: 'caso-defensa', nombre: 'Casos de aplicación de penas', duracion: '1.5 horas' },
          { tipo: 'quiz', id: 'penal-quiz', nombre: 'Quiz de Penas', duracion: '1 hora' },
        ],
      },
      3: {
        titulo: 'Simulacro Penal Avanzado',
        descripcion: 'Preguntas de mayor dificultad.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Simulacro Penal', duracion: '2.5 horas' },
        ],
      },
    },
    avanzada: {
      1: {
        titulo: 'Jurisprudencia Penal Crítica',
        descripcion: 'Análisis de sentencias relevantes.',
        recursos: [
          { tipo: 'material', id: 'jurisprudencia', nombre: 'Jurisprudencia Penal' },
          { tipo: 'quiz', id: 'penal-quiz', nombre: 'Quiz crítico', duracion: '2 horas' },
        ],
      },
      2: {
        titulo: 'Examen Final Simulado',
        descripcion: 'Máxima dificultad.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Examen Simulado Final', duracion: '3 horas' },
        ],
      },
    },
  },

  laboral: {
    basica: {
      1: {
        titulo: 'Glosario y Principios del Derecho Laboral',
        descripcion: 'Términos básicos y principios fundamentales.',
        recursos: [
          { tipo: 'glosario', id: 'completo', nombre: 'Glosario jurídico', duracion: '2 horas' },
        ],
      },
      2: {
        titulo: 'Relación de Trabajo',
        descripcion: 'Elementos esenciales, prestaciones, salario.',
        recursos: [
          { tipo: 'material', id: 'laboral-material', nombre: 'Material de Derecho Laboral' },
          { tipo: 'quiz', id: 'laboral-quiz', nombre: 'Quiz Relación de Trabajo', duracion: '1 hora' },
        ],
      },
      3: {
        titulo: 'Terminación y Liquidación',
        descripcion: 'Causas de terminación, liquidación, indemnizaciones.',
        recursos: [
          { tipo: 'documento', id: 'liquidacion', nombre: 'Calculadora de liquidación', duracion: '1.5 horas' },
          { tipo: 'caso', id: 'caso-despido', nombre: 'Caso: Despido injustificado', duracion: '45 min' },
          { tipo: 'quiz', id: 'laboral-quiz', nombre: 'Quiz Terminación', duracion: '1 hora' },
        ],
      },
      4: {
        titulo: 'Seguridad Social e IGSS',
        descripcion: 'Sistema de seguridad social, cuotas, prestaciones.',
        recursos: [
          { tipo: 'material', id: 'laboral-material', nombre: 'Material: Seguridad Social' },
          { tipo: 'quiz', id: 'laboral-quiz', nombre: 'Quiz IGSS y Seguridad', duracion: '45 min' },
        ],
      },
      5: {
        titulo: 'Simulacro',
        descripcion: 'Examen simulado de Derecho Laboral.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Examen Simulado Laboral', duracion: '2 horas' },
        ],
      },
    },
    intermedia: {
      1: {
        titulo: 'Derechos Colectivos',
        descripcion: 'Sindicatos, convenios, huelga, conflictos laborales.',
        recursos: [
          { tipo: 'material', id: 'laboral-material', nombre: 'Material: Derechos Colectivos' },
          { tipo: 'quiz', id: 'laboral-quiz', nombre: 'Quiz Derechos Colectivos', duracion: '1.5 horas' },
        ],
      },
      2: {
        titulo: 'Procedimiento Laboral',
        descripcion: 'Cómo se tramita un juicio laboral, recursos, sentencias.',
        recursos: [
          { tipo: 'material', id: 'procedimiento', nombre: 'Material de Procedimiento Laboral' },
          { tipo: 'documento', id: 'documentos', nombre: 'Generador de documentos laborales', duracion: '1 hora' },
          { tipo: 'quiz', id: 'laboral-quiz', nombre: 'Quiz Procedimiento', duracion: '1 hora' },
        ],
      },
      3: {
        titulo: 'Simulacro Laboral Avanzado',
        descripcion: 'Preguntas complejas integrales.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Simulacro Laboral Avanzado', duracion: '2.5 horas' },
        ],
      },
    },
    avanzada: {
      1: {
        titulo: 'Jurisprudencia Laboral',
        descripcion: 'Análisis de fallos reales y doctrina.',
        recursos: [
          { tipo: 'material', id: 'jurisprudencia', nombre: 'Jurisprudencia Laboral' },
          { tipo: 'quiz', id: 'laboral-quiz', nombre: 'Quiz crítico laboral', duracion: '2 horas' },
        ],
      },
      2: {
        titulo: 'Examen Final Simulado',
        descripcion: 'Máxima dificultad y complejidad.',
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Examen Simulado Final', duracion: '3 horas' },
        ],
      },
    },
  },
};

export function generarPlan(config: PlanConfig): SemanaConfig[] {
  const reglas = PLAN_RULES[config.examen]?.[config.fase];
  if (!reglas) {
    throw new Error(
      `No hay reglas definidas para examen="${config.examen}" fase="${config.fase}"`
    );
  }

  const semanas: SemanaConfig[] = [];
  const semanaNumeros = Object.keys(reglas)
    .map(Number)
    .sort((a, b) => a - b)
    .slice(0, Math.max(1, config.semanas)); // Al menos 1 semana

  semanaNumeros.forEach((num) => {
    semanas.push(reglas[num]);
  });

  return semanas;
}
