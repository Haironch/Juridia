// Plan Generator Enriquecido con recursos, tips y lecturas
export interface SemanaRecurso {
  tipo: 'glosario' | 'quiz' | 'caso' | 'documento' | 'material' | 'lectura' | 'tip' | 'actividad';
  id: string;
  nombre: string;
  duracion?: string;
  descripcion?: string;
}

export interface SemanaConfig {
  titulo: string;
  descripcion: string;
  objetivos: string[];
  recursos: SemanaRecurso[];
  tips: string[];
  lecturaRecomendada?: { titulo: string; articulo: string; tiempo: string };
}

export interface PlanConfig {
  examen: 'privado' | 'civil' | 'penal' | 'laboral';
  fase: 'basica' | 'intermedia' | 'avanzada';
  semanas: number;
}

// Planes enriquecidos por examen y fase
export const PLAN_RULES: Record<string, Record<string, Record<number, SemanaConfig>>> = {
  privado: {
    basica: {
      1: {
        titulo: 'Fundamentos: Glosario Jurídico & Conceptos Básicos',
        descripcion: 'Aprende los 40 términos básicos del derecho guatemalteco. Son la base de todo lo que viene.',
        objetivos: [
          'Dominar terminología jurídica fundamental',
          'Entender conceptos de sujetos y objetos de derecho',
          'Familiarizarse con fuentes del derecho',
        ],
        recursos: [
          { tipo: 'glosario', id: 'completo', nombre: 'Glosario jurídico (40 términos)', duracion: '2-3 horas', descripcion: 'Términos clave con definiciones y ejemplos' },
          { tipo: 'material', id: 'introduccion-derecho', nombre: 'Introducción al Derecho', duracion: '1 hora', descripcion: 'Concepto, objeto y método del derecho' },
        ],
        tips: [
          'Lee cada término 3 veces para memorizarlo',
          'Crea tarjetas de estudio con ejemplos reales',
          'Relaciona cada término con casos de tu vida',
        ],
        lecturaRecomendada: {
          titulo: 'Constitución Política de la República de Guatemala (CPRG)',
          articulo: 'Artículos 1-5 (Derechos y deberes)',
          tiempo: '30 min',
        },
      },
      2: {
        titulo: 'Derecho Constitucional: La Constitución Guatemalteca',
        descripcion: 'Entiende la estructura del estado, derechos fundamentales y cómo se protegen mediante recursos constitucionales.',
        objetivos: [
          'Comprender la estructura estatal (división de poderes)',
          'Dominar derechos y garantías constitucionales',
          'Conocer recursos de protección (amparo, habeas corpus)',
        ],
        recursos: [
          { tipo: 'material', id: 'constitucion-basico', nombre: 'Material de Derecho Constitucional', duracion: '1.5 horas', descripcion: 'CPRG, derechos fundamentales, recursos' },
          { tipo: 'quiz', id: 'constituquiz-sesion-1', nombre: 'ConstituQuiz Sesión 1', duracion: '45 min', descripcion: 'Preguntas sobre estructura estatal' },
          { tipo: 'tip', id: 'tip-recursos-constitucionales', nombre: '🎯 Tip: Recursos Constitucionales', descripcion: 'Diferencia entre amparo, habeas corpus, exhibición personal' },
        ],
        tips: [
          'Memoriza los 7 artículos sobre derechos fundamentales',
          'Practica con casos reales de amparo (jurisprudencia CC)',
          'Dibuja un esquema de la estructura del estado',
        ],
        lecturaRecomendada: {
          titulo: 'CPRG + Ley de Amparo',
          articulo: 'Art. 265-267 (Amparo), Art. 263 (Habeas Corpus)',
          tiempo: '40 min',
        },
      },
      3: {
        titulo: 'Derecho Civil Básico: Obligaciones y Contratos',
        descripcion: 'Contratos, responsabilidad civil, obligaciones. Casos reales que encontrarás en la práctica.',
        objetivos: [
          'Comprender teoría de obligaciones',
          'Dominar elementos esenciales de contratos',
          'Aplicar responsabilidad civil en casos',
        ],
        recursos: [
          { tipo: 'material', id: 'civil-material', nombre: 'Material de Derecho Civil', duracion: '2 horas', descripcion: 'Código Civil: obligaciones, contratos, personas' },
          { tipo: 'caso', id: 'caso-contrato', nombre: 'Caso: Compraventa con vicios ocultos', duracion: '30 min', descripcion: 'Análisis de nulidad por defectos no declarados' },
          { tipo: 'lectura', id: 'cc-articulos-obligaciones', nombre: '📖 CC: Arts. 1256-1320 (Obligaciones)', duracion: '45 min', descripcion: 'Lectura de código comentado' },
          { tipo: 'actividad', id: 'actividad-redacta-contrato', nombre: '✍️ Actividad: Redacta un contrato simple', duracion: '30 min', descripcion: 'Práctica de cláusulas y elementos esenciales' },
        ],
        tips: [
          'Memoriza los 6 elementos esenciales de todo contrato',
          'Entiende bien qué es "vicios ocultos" vs "vicios aparentes"',
          'Practica resolviendo conflictos entre partes',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Art. 1256-1290 (Obligaciones), Art. 1517-1538 (Compraventa)',
          tiempo: '50 min',
        },
      },
      4: {
        titulo: 'Derecho Laboral Básico: Relación de Trabajo',
        descripcion: 'Relaciones laborales, derechos del trabajador, despido, liquidación. Lo más práctico que verás.',
        objetivos: [
          'Entender elementos de la relación de trabajo',
          'Dominar cálculos de liquidación laboral',
          'Conocer despidos justificados e injustificados',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-material', nombre: 'Código de Trabajo Guatemalteco', duracion: '1.5 horas', descripcion: 'Arts. 1-100 (Relación de trabajo)' },
          { tipo: 'documento', id: 'liquidacion', nombre: 'Calculadora de liquidación laboral', duracion: '1 hora', descripcion: 'Practica cálculos reales con fórmulas' },
          { tipo: 'caso', id: 'caso-despido', nombre: 'Caso: Despido injustificado', duracion: '30 min', descripcion: 'Análisis de causas justas de despido' },
          { tipo: 'lectura', id: 'codigo-trabajo-arts-63-79', nombre: '📖 CT: Arts. 63-79 (Terminación)', duracion: '35 min', descripcion: 'Causas de terminación y liquidación' },
        ],
        tips: [
          'La indemnización = 30 días de salario x años de servicio (mínimo)',
          'Aprende las causas JUSTAS de despido (Art. 79 CT)',
          'Practica el cálculo de aguinaldo, bono 14, vacaciones',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 63-79 (Terminación), Arts. 1-30 (Relación de trabajo)',
          tiempo: '40 min',
        },
      },
      5: {
        titulo: 'Procedimiento y Derecho Procesal Civil',
        descripcion: 'Cómo funciona un juicio, etapas, escritos y recursos procesales.',
        objetivos: [
          'Entender las fases del proceso civil (demanda, prueba, sentencia)',
          'Dominar recursos procesales (apelación, amparo)',
          'Saber qué competencia tiene cada tribunal',
        ],
        recursos: [
          { tipo: 'material', id: 'procesal-civil', nombre: 'Derecho Procesal Civil', duracion: '2 horas', descripcion: 'CPCG, etapas del proceso, escritos básicos' },
          { tipo: 'caso', id: 'caso-demanda', nombre: 'Caso: Análisis de demanda completa', duracion: '45 min', descripcion: 'Estructura y elementos de una demanda' },
          { tipo: 'lectura', id: 'cpcg-arts-81-95', nombre: '📖 CPCG: Arts. 81-95 (Demanda)', duracion: '40 min', descripcion: 'Requisitos y procedimiento de presentación' },
        ],
        tips: [
          'La demanda debe tener 8 elementos OBLIGATORIOS',
          'Practica distinguir entre "jurisdicción" y "competencia"',
          'Entiende bien las 3 etapas: postulatoria, prueba, sentencia',
        ],
        lecturaRecomendada: {
          titulo: 'Código Procesal Civil y Mercantil (CPCG)',
          articulo: 'Arts. 81-120 (Demanda y procedimiento)',
          tiempo: '45 min',
        },
      },
      6: {
        titulo: 'Derecho de Familia: Matrimonio, Divorcio y Violencia',
        descripcion: 'Relaciones familiares, matrimonio, guarda, pensión alimenticia. Casos emocionalmente complejos.',
        objetivos: [
          'Entender requisitos y efectos del matrimonio',
          'Dominar causas de divorcio y efectos',
          'Conocer pensión alimenticia y guarda de menores',
        ],
        recursos: [
          { tipo: 'material', id: 'familia-material', nombre: 'Derecho de Familia', duracion: '1.5 horas', descripcion: 'CC: matrimonio, divorcio, patria potestad' },
          { tipo: 'caso', id: 'caso-familia', nombre: 'Caso: Violencia intrafamiliar', duracion: '45 min', descripcion: 'Análisis de protección y medidas cautelares' },
          { tipo: 'lectura', id: 'cc-arts-78-110', nombre: '📖 CC: Arts. 78-110 (Matrimonio)', duracion: '40 min', descripcion: 'Requisitos, efectos, derechos y deberes' },
        ],
        tips: [
          'La violencia intrafamiliar es delito (Ley 2008/2008)',
          'Pensión alimenticia: no solo dinero, puede ser especie',
          'Practica casos de patria potestad (quién decide sobre el menor)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil + Ley Contra Violencia Intrafamiliar',
          articulo: 'CC Arts. 78-110, Ley 2008/2008',
          tiempo: '50 min',
        },
      },
      7: {
        titulo: 'Simulacro de Examen Privado',
        descripcion: '30 preguntas en tiempo real sobre TODAS las áreas. Modo examen con tiempo límite.',
        objetivos: [
          'Practicar bajo presión de tiempo',
          'Identificar temas débiles',
          'Ganar confianza antes del examen real',
        ],
        recursos: [
          { tipo: 'quiz', id: 'examen-simulado', nombre: 'Examen Simulado Privado (30 preguntas)', duracion: '2 horas', descripcion: 'Modo examen: todas las áreas, tiempo límite' },
          { tipo: 'tip', id: 'tip-estrategia-examen', nombre: '🎯 Tip: Estrategia de Examen', descripcion: 'Lee bien, maneja tiempo, revisa respuestas' },
        ],
        tips: [
          'Lee TODAS las opciones antes de responder',
          'Si no sabes una pregunta, ve a la siguiente (no pierdas tiempo)',
          'En los últimos 10 minutos, revisa lo que dejes sin marcar',
        ],
        lecturaRecomendada: {
          titulo: 'Repaso general de los 6 temas anteriores',
          articulo: 'Enfócate en lo que fallaste en el simulacro',
          tiempo: '90 min',
        },
      },
      8: {
        titulo: 'Repaso Final y Confianza',
        descripcion: 'Refuerza tus áreas débiles y prepárate psicológicamente para el examen real.',
        objetivos: [
          'Fortalecer áreas débiles identificadas',
          'Aumentar confianza y reducir ansiedad',
          'Revisar casos importantes una última vez',
        ],
        recursos: [
          { tipo: 'glosario', id: 'repaso-terminos', nombre: '📚 Glosario: Términos clave (repaso rápido)', duracion: '30 min' },
          { tipo: 'quiz', id: 'repaso-mini-quiz', nombre: '❓ Mini Quiz: Temas que fallaste', duracion: '45 min', descripcion: 'Solo preguntas de tus áreas débiles' },
          { tipo: 'tip', id: 'tip-manejo-estres', nombre: '🧠 Tip: Manejo de estrés y ansiedad', descripcion: 'Técnicas de respiración, sueño, alimentación' },
          { tipo: 'actividad', id: 'actividad-repaso-casos', nombre: '⚖️ Actividad: Repaso de casos importantes', duracion: '1 hora', descripcion: 'Revisa los 5 casos más importantes' },
        ],
        tips: [
          'Duerme bien la noche anterior (8 horas)',
          'Come algo ligero antes del examen (evita azúcares)',
          'Llega 15 minutos antes del lugar de examen',
          'Respira profundo: inhala 4 seg, sostén 4 seg, exhala 4 seg',
        ],
        lecturaRecomendada: {
          titulo: 'Último repaso de temas débiles',
          articulo: 'Enfócate en lo que aún no dominas al 100%',
          tiempo: '60 min',
        },
      },
    },
    // Las otras fases (intermedia, avanzada) siguen el mismo patrón pero más densas
    intermedia: {
      1: {
        titulo: 'Refresh Avanzado: Jurisprudencia Constitucional',
        descripcion: 'Repasa rápido CPRG pero enfocado en jurisprudencia de la Corte Constitucional.',
        objetivos: [
          'Revisar precedentes de Corte Constitucional',
          'Entender interpretación de derechos',
          'Aplicar doctrina constitucional',
        ],
        recursos: [
          { tipo: 'lectura', id: 'jurisprudencia-cc', nombre: '📖 Jurisprudencia: 5 sentencias importantes de CC', duracion: '1.5 horas', descripcion: 'Sentencias que marcaron jurisprudencia' },
          { tipo: 'quiz', id: 'constituquiz-intermedio', nombre: '❓ ConstituQuiz Avanzado', duracion: '1.5 horas' },
        ],
        tips: [
          'Lee BIEN la sosología de cada sentencia',
          'Entiende el razonamiento, no solo el fallo',
          'Relaciona jurisprudencia con nuevos casos',
        ],
        lecturaRecomendada: {
          titulo: 'Gaceta Oficial - Sentencias CC recientes',
          articulo: 'Últimas 10 sentencias sobre derechos fundamentales',
          tiempo: '90 min',
        },
      },
    },
    avanzada: {
      1: {
        titulo: 'Análisis Crítico de Jurisprudencia y Doctrina',
        descripcion: 'Estudia resoluciones reales y argumentos que usan los abogados expertos.',
        objetivos: [
          'Dominar jurisprudencia reciente',
          'Entender argumentación jurídica sofisticada',
          'Aplicar doctrina en argumentos',
        ],
        recursos: [
          { tipo: 'lectura', id: 'jurisprudencia-critica', nombre: '📖 Análisis crítico de 15 sentencias importantes', duracion: '3 horas', descripcion: 'Estudio profundo de razonamientos' },
          { tipo: 'quiz', id: 'quiz-jurisprudencia-avanzado', nombre: '❓ Quiz: Jurisprudencia avanzada', duracion: '2 horas' },
          { tipo: 'actividad', id: 'actividad-argumentacion', nombre: '✍️ Actividad: Escribe argumentos como abogado', duracion: '2 horas', descripcion: 'Redacta escritos con argumentación jurídica' },
        ],
        tips: [
          'Cita con exactitud: Sentencia, referencia, año',
          'Cuestiona: ¿por qué la CC resolvió así? ¿hay disidencias?',
          'Aprende a argumentar "en contra" de una sentencia',
        ],
        lecturaRecomendada: {
          titulo: 'Análisis doctrinario de la jurisprudencia constitucional',
          articulo: 'Sentencias controversiales y su justificación',
          tiempo: '120 min',
        },
      },
    },
  },
  // Los demás exámenes (civil, penal, laboral) siguen estructura similar...
  civil: { basica: {}, intermedia: {}, avanzada: {} },
  penal: { basica: {}, intermedia: {}, avanzada: {} },
  laboral: { basica: {}, intermedia: {}, avanzada: {} },
};

export function generarPlan(config: PlanConfig): SemanaConfig[] {
  const reglas = PLAN_RULES[config.examen]?.[config.fase];
  if (!reglas) {
    throw new Error(`No hay reglas definidas para examen="${config.examen}" fase="${config.fase}"`);
  }

  const semanas: SemanaConfig[] = [];
  const semanaNumeros = Object.keys(reglas)
    .map(Number)
    .sort((a, b) => a - b)
    .slice(0, Math.max(1, config.semanas));

  semanaNumeros.forEach((num) => {
    semanas.push(reglas[num]);
  });

  return semanas;
}
