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
      2: {
        titulo: 'Derecho Civil Intermedio: Contratos, Garantías y Responsabilidad',
        descripcion: 'Contratos complejos, garantías reales (hipoteca, prenda, fianza) y responsabilidad civil. El nivel que realmente te preguntan en el privado.',
        objetivos: [
          'Dominar contratos complejos: sociedad, mandato, mutuo',
          'Distinguir hipoteca, prenda y fianza en la práctica',
          'Aplicar responsabilidad civil contractual y extracontractual',
        ],
        recursos: [
          { tipo: 'material', id: 'civil-contratos-avanzado', nombre: 'Contratos complejos y garantías reales', duracion: '2 horas', descripcion: 'CC: Arts. 1654-1873 con casos' },
          { tipo: 'caso', id: 'caso-contrato-sociedad', nombre: 'Caso: Disolución de sociedad civil', duracion: '45 min', descripcion: 'Análisis de derechos y obligaciones de socios' },
          { tipo: 'lectura', id: 'cc-arts-hipoteca', nombre: '📖 CC: Arts. 822-885 (Hipoteca y Prenda)', duracion: '40 min', descripcion: 'Requisitos, efectos y ejecución de garantías' },
          { tipo: 'actividad', id: 'actividad-garantias', nombre: '✍️ Actividad: Compara hipoteca vs prenda', duracion: '20 min', descripcion: 'Cuadro comparativo con diferencias clave' },
        ],
        tips: [
          'Hipoteca = inmueble; Prenda = mueble (regla de oro)',
          'La fianza es subsidiaria salvo pacto en contrario (Art. 2100 CC)',
          'En responsabilidad extracontractual no se necesita contrato previo',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 822-885 (Hipoteca), Arts. 2100-2146 (Fianza)',
          tiempo: '50 min',
        },
      },
      3: {
        titulo: 'Derecho Laboral: Relaciones Colectivas e IGSS',
        descripcion: 'Sindicatos, huelga, contratación colectiva y seguridad social. Áreas que se preguntan mucho pero se estudian poco.',
        objetivos: [
          'Entender formación y derechos de sindicatos',
          'Distinguir huelga legal vs ilegal',
          'Dominar prestaciones del IGSS (IVS, EGA)',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-colectivo', nombre: 'Derecho Colectivo: Sindicatos y Huelga', duracion: '1.5 horas', descripcion: 'CT Arts. 206-243 (Sindicatos), Arts. 239-257 (Huelga)' },
          { tipo: 'documento', id: 'igss-prestaciones', nombre: 'Prestaciones IGSS: IVS y EGA', duracion: '1 hora', descripcion: 'Programa de Invalidez, Vejez y Sobrevivencia' },
          { tipo: 'caso', id: 'caso-huelga', nombre: 'Caso: Calificación de huelga legal', duracion: '35 min', descripcion: 'Requisitos para que una huelga sea legalmente declarada' },
          { tipo: 'lectura', id: 'ct-arts-sindicatos', nombre: '📖 CT: Arts. 206-243 (Sindicatos)', duracion: '35 min', descripcion: 'Tipos, formación, derechos y prohibiciones' },
        ],
        tips: [
          'Un sindicato necesita mínimo 20 trabajadores para formarse (Art. 215 CT)',
          'La huelga ilegal termina el contrato sin responsabilidad patronal',
          'IGSS: cotización = 4.83% trabajador + 10.67% patrono',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 206-257 (Organizaciones y conflictos colectivos)',
          tiempo: '45 min',
        },
      },
      4: {
        titulo: 'Derecho Penal Intermedio: Teoría del Delito y Proceso',
        descripcion: 'Tipicidad, antijuridicidad, culpabilidad a fondo. Más el proceso penal completo con sus etapas.',
        objetivos: [
          'Dominar los elementos del delito con profundidad',
          'Entender las etapas del proceso penal guatemalteco',
          'Conocer medidas desjudicializadoras y su aplicación',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-teoria-delito', nombre: 'Teoría del Delito Avanzada', duracion: '2 horas', descripcion: 'Dolo, culpa, error, tentativa, participación criminal' },
          { tipo: 'lectura', id: 'cpp-etapas', nombre: '📖 CPP: Arts. 295-350 (Etapas del proceso)', duracion: '45 min', descripcion: 'Preparatoria, intermedia, juicio oral, sentencia' },
          { tipo: 'caso', id: 'caso-defensa', nombre: 'Caso: Legítima defensa', duracion: '30 min', descripcion: 'Análisis de excluyentes de responsabilidad' },
          { tipo: 'actividad', id: 'actividad-etapas-proceso', nombre: '✍️ Actividad: Diagrama del proceso penal', duracion: '25 min', descripcion: 'Mapa visual de etapas, plazos y sujetos procesales' },
        ],
        tips: [
          'Dolo directo = quiero el resultado; Eventual = acepto el riesgo',
          'Criterio de oportunidad: solo delitos con pena ≤ 5 años (Art. 25 CPP)',
          'Primera declaración se rinde dentro de 24 horas del arresto',
        ],
        lecturaRecomendada: {
          titulo: 'Código Procesal Penal',
          articulo: 'Arts. 295-340 (Etapas del proceso penal)',
          tiempo: '55 min',
        },
      },
      5: {
        titulo: 'Recursos Procesales: Ordinarios y Extraordinarios',
        descripcion: 'Apelación, casación, amparo. Cuándo usarlos, plazos y causas. Lo que diferencia a un buen abogado.',
        objetivos: [
          'Dominar recursos ordinarios (apelación, reposición, nulidad)',
          'Conocer recursos extraordinarios (casación, amparo)',
          'Aplicar plazos y requisitos de admisibilidad',
        ],
        recursos: [
          { tipo: 'material', id: 'recursos-procesales', nombre: 'Recursos procesales civiles y penales', duracion: '2 horas', descripcion: 'CPCG y CPP: tipos, plazos, causas y trámite' },
          { tipo: 'caso', id: 'caso-procesal', nombre: 'Caso: Recurso de apelación en juicio ordinario', duracion: '40 min', descripcion: 'Estructura y argumentación del recurso' },
          { tipo: 'lectura', id: 'ley-amparo-casacion', nombre: '📖 Ley de Amparo + CPCG: Casación', duracion: '45 min', descripcion: 'Arts. 179-199 CPCG (Casación civil)' },
          { tipo: 'actividad', id: 'actividad-recursos', nombre: '✍️ Actividad: Cuadro comparativo de recursos', duracion: '30 min', descripcion: 'Tipo, plazo, tribunal, causas y efectos' },
        ],
        tips: [
          'Apelación civil: 3 días para interponerla (Art. 602 CPCG)',
          'Casación civil: solo por infracción de ley sustantiva o procesal',
          'Amparo: solo cuando se agotan los recursos ordinarios',
        ],
        lecturaRecomendada: {
          titulo: 'CPCG + Ley de Amparo',
          articulo: 'Arts. 596-617 (Apelación), Arts. 179-199 (Casación)',
          tiempo: '50 min',
        },
      },
      6: {
        titulo: 'Casos Interdisciplinarios: Civil + Laboral + Penal',
        descripcion: 'Casos reales que mezclan varias ramas del derecho. La habilidad más importante en el privado.',
        objetivos: [
          'Identificar qué rama del derecho aplica en cada caso',
          'Resolver conflictos normativos entre ramas',
          'Estructurar respuestas completas y fundamentadas',
        ],
        recursos: [
          { tipo: 'caso', id: 'caso-interdisciplinario-1', nombre: 'Caso: Accidente laboral con responsabilidad civil', duracion: '1 hora', descripcion: 'Laboral (IGSS) + Civil (responsabilidad) + Penal (lesiones)' },
          { tipo: 'caso', id: 'caso-interdisciplinario-2', nombre: 'Caso: Violencia doméstica con implicaciones civiles', duracion: '45 min', descripcion: 'Penal + Familia + Proceso' },
          { tipo: 'actividad', id: 'actividad-analisis-interdisciplinario', nombre: '✍️ Actividad: Analiza 3 casos mezclados', duracion: '1.5 horas', descripcion: 'Identifica ramas, normas aplicables y solución' },
          { tipo: 'tip', id: 'tip-estrategia-interdisciplinario', nombre: '🎯 Metodología para casos complejos', descripcion: 'Pasos para descomponer y resolver casos difíciles' },
        ],
        tips: [
          'Primero identifica los HECHOS, luego qué norma aplica',
          'Un mismo hecho puede tener consecuencias civiles Y penales',
          'Estructura: hechos → norma → argumento → conclusión',
        ],
        lecturaRecomendada: {
          titulo: 'Repaso transversal: CC + CT + CP + CPRG',
          articulo: 'Artículos clave de cada código según el caso',
          tiempo: '60 min',
        },
      },
      7: {
        titulo: 'Simulacro Intermedio: Examen Privado Nivel Medio',
        descripcion: '35 preguntas de nivel intermedio en modo examen. Cronometrado. Análisis de errores al final.',
        objetivos: [
          'Evaluar dominio de todos los temas intermedios',
          'Identificar puntos débiles específicos',
          'Ganar velocidad y precisión bajo presión',
        ],
        recursos: [
          { tipo: 'quiz', id: 'simulacro-intermedio', nombre: '❓ Simulacro Intermedio (35 preguntas)', duracion: '2 horas', descripcion: 'Todas las áreas, nivel medio, tiempo limitado' },
          { tipo: 'actividad', id: 'actividad-analisis-simulacro', nombre: '✍️ Actividad: Análisis de errores', duracion: '45 min', descripcion: 'Clasifica errores por tema y prioriza repaso' },
          { tipo: 'tip', id: 'tip-simulacro-estrategia', nombre: '🎯 Estrategia durante el examen', descripcion: 'Gestión de tiempo, cómo responder preguntas difíciles' },
        ],
        tips: [
          'Si tardas más de 2 min en una pregunta, avanza y regresa',
          'Las preguntas fáciles al principio te dan confianza',
          'Anota en papel los temas que fallaste para el repaso final',
        ],
        lecturaRecomendada: {
          titulo: 'Repaso enfocado en temas fallados del simulacro',
          articulo: 'Lee los artículos específicos de cada error',
          tiempo: '90 min',
        },
      },
      8: {
        titulo: 'Repaso Final Intermedio y Cierre',
        descripcion: 'Refuerza tus 3 temas más débiles. Mapa conceptual integrador. Preparación final.',
        objetivos: [
          'Cerrar brechas de conocimiento identificadas',
          'Consolidar un mapa mental del derecho guatemalteco',
          'Llegar con confianza al examen real',
        ],
        recursos: [
          { tipo: 'glosario', id: 'glosario-intermedio', nombre: '📚 Glosario Intermedio: 60 términos clave', duracion: '1 hora', descripcion: 'Términos técnicos de nivel intermedio' },
          { tipo: 'quiz', id: 'mini-quiz-debiles', nombre: '❓ Mini Quiz: Solo temas fallados', duracion: '45 min', descripcion: 'Preguntas focalizadas en tus puntos débiles' },
          { tipo: 'actividad', id: 'actividad-mapa-conceptual', nombre: '✍️ Actividad: Mapa conceptual integrador', duracion: '1 hora', descripcion: 'Une todas las ramas del derecho en un solo esquema' },
          { tipo: 'tip', id: 'tip-ultimo-dia', nombre: '🧠 Tip: El día antes del examen', descripcion: 'Qué hacer y qué NO hacer 24 horas antes' },
        ],
        tips: [
          'No estudies material nuevo el día antes',
          'Revisa solo tu mapa conceptual y los 10 temas más frecuentes',
          'Duerme mínimo 7 horas, toma agua, evita el café en exceso',
        ],
        lecturaRecomendada: {
          titulo: 'Resumen personal de los 8 temas del plan',
          articulo: 'Solo lo que aún no dominas al 100%',
          tiempo: '60 min',
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
      2: {
        titulo: 'Técnica de Argumentación Jurídica Avanzada',
        descripcion: 'Cómo construir argumentos que convencen. Estructura lógica, uso de doctrina y jurisprudencia. La diferencia entre un 70 y un 95.',
        objetivos: [
          'Estructurar argumentos jurídicos sólidos y coherentes',
          'Citar jurisprudencia y doctrina con precisión',
          'Redactar escritos jurídicos de nivel profesional',
        ],
        recursos: [
          { tipo: 'material', id: 'argumentacion-juridica', nombre: 'Técnica de argumentación jurídica', duracion: '2.5 horas', descripcion: 'Lógica jurídica, silogismo, analogía, principios' },
          { tipo: 'actividad', id: 'actividad-redaccion-avanzada', nombre: '✍️ Actividad: Redacta un memorial de fondo', duracion: '2 horas', descripcion: 'Escrito profesional con argumentos, citas y petitorio' },
          { tipo: 'lectura', id: 'doctrina-guatemalteca', nombre: '📖 Doctrina guatemalteca: 3 autores clave', duracion: '1.5 horas', descripcion: 'Mario Aguirre Godoy, Mauro Chacón Corado, Ossorio' },
        ],
        tips: [
          'Todo argumento = premisa mayor (ley) + premisa menor (hecho) + conclusión',
          'Cita siempre: autor, obra, año, página (para doctrina)',
          'Para jurisprudencia: expediente, fecha, ponente',
        ],
        lecturaRecomendada: {
          titulo: 'Manual de Derecho Procesal Civil – Mario Aguirre Godoy',
          articulo: 'Caps. 1-3: Proceso, acción y pretensión',
          tiempo: '90 min',
        },
      },
      3: {
        titulo: 'Jurisprudencia Civil y Constitucional: Las 15 Sentencias que Debes Conocer',
        descripcion: 'Las resoluciones más citadas e importantes del sistema guatemalteco. Imprescindible para el nivel avanzado.',
        objetivos: [
          'Dominar las 15 sentencias más importantes de CSJ y CC',
          'Entender ratio decidendi y obiter dicta',
          'Aplicar jurisprudencia para fundamentar argumentos',
        ],
        recursos: [
          { tipo: 'lectura', id: 'jurisprudencia-csj-top15', nombre: '📖 Las 15 sentencias más importantes (CSJ + CC)', duracion: '3 horas', descripcion: 'Resumen, holding y aplicación práctica' },
          { tipo: 'quiz', id: 'quiz-jurisprudencia-avanzado', nombre: '❓ Quiz de Jurisprudencia Avanzada', duracion: '1.5 horas', descripcion: 'Preguntas sobre fallos específicos' },
          { tipo: 'actividad', id: 'actividad-ficha-sentencia', nombre: '✍️ Actividad: Ficha de 3 sentencias elegidas', duracion: '1 hora', descripcion: 'Hechos, holding, argumento, aplicación futura' },
        ],
        tips: [
          'Ratio decidendi = la razón que decide; obiter dicta = comentario accesorio',
          'Una buena cita de jurisprudencia vale más que 5 artículos de ley',
          'Busca si hay votos disidentes, revelan problemas interpretativos',
        ],
        lecturaRecomendada: {
          titulo: 'Gaceta Jurisprudencial CC + Memoria CSJ',
          articulo: 'Sentencias 2020-2024 sobre derechos fundamentales y procesos',
          tiempo: '120 min',
        },
      },
      4: {
        titulo: 'Casos Complejos: Estrategia y Resolución en 30 Minutos',
        descripcion: 'Metodología para resolver casos difíciles rápido. Los casos que han aparecido en exámenes reales de privados.',
        objetivos: [
          'Aplicar metodología CICS: Contexto, Ley, Controversia, Solución',
          'Resolver casos con múltiples normas en conflicto',
          'Escribir soluciones estructuradas bajo presión de tiempo',
        ],
        recursos: [
          { tipo: 'caso', id: 'caso-privado-real-1', nombre: 'Caso real: Nulidad de contrato por violencia', duracion: '45 min', descripcion: 'Caso emblemático de nulidad absoluta vs relativa' },
          { tipo: 'caso', id: 'caso-privado-real-2', nombre: 'Caso real: Despido + responsabilidad penal patronal', duracion: '45 min', descripcion: 'Laboral + Penal combinados' },
          { tipo: 'actividad', id: 'actividad-metodologia-casos', nombre: '✍️ Actividad: Aplica CICS a 5 casos', duracion: '2 horas', descripcion: 'Práctica intensiva de resolución de casos' },
          { tipo: 'tip', id: 'tip-casos-complejos', nombre: '🎯 Tip: Cómo atacar un caso que no conoces', descripcion: 'Estrategia cuando no recuerdas la norma exacta' },
        ],
        tips: [
          'Si no recuerdas el artículo exacto, cita el principio general',
          'Siempre concluye con una respuesta clara: sí/no + por qué',
          'Los examinadores valoran el razonamiento más que la memorización',
        ],
        lecturaRecomendada: {
          titulo: 'Casos resueltos del examen de privados Guatemala',
          articulo: 'Últimas 5 convocatorias con sus resoluciones',
          tiempo: '90 min',
        },
      },
      5: {
        titulo: 'Derecho Procesal Avanzado: Casación, Amparo y Nulidades',
        descripcion: 'Los recursos más difíciles y más usados en la práctica profesional guatemalteca.',
        objetivos: [
          'Dominar requisitos de admisibilidad de la casación',
          'Entender cuándo el amparo es procedente y cuándo no',
          'Identificar nulidades absolutas y relativas en el proceso',
        ],
        recursos: [
          { tipo: 'material', id: 'casacion-amparo-avanzado', nombre: 'Casación y Amparo: Guía práctica avanzada', duracion: '2.5 horas', descripcion: 'Causas, plazos, trámite, jurisprudencia de admisibilidad' },
          { tipo: 'lectura', id: 'ley-amparo-analisis', nombre: '📖 Ley de Amparo: Arts. 1-85 comentados', duracion: '1.5 horas', descripcion: 'Procedencia, improcedencia, interposición y efectos' },
          { tipo: 'caso', id: 'caso-amparo-rechazado', nombre: 'Caso: Amparo declarado improcedente', duracion: '40 min', descripcion: 'Análisis de por qué no procedía y qué recurso sí' },
        ],
        tips: [
          'Casación no es tercera instancia; solo controla legalidad',
          'Amparo improcedente más común: no agotamiento de recursos',
          'Art. 10 Ley de Amparo: 12 causas específicas de improcedencia',
        ],
        lecturaRecomendada: {
          titulo: 'Ley de Amparo, Exhibición Personal y Constitucionalidad',
          articulo: 'Arts. 1-85 + Jurisprudencia CC sobre inadmisibilidad',
          tiempo: '90 min',
        },
      },
      6: {
        titulo: 'Seminario: Casos Emblemáticos del Derecho Guatemalteco',
        descripcion: 'Casos reales que marcaron el derecho guatemalteco. Los que todo abogado debe conocer.',
        objetivos: [
          'Conocer los casos más influyentes de la jurisprudencia GT',
          'Extraer lecciones aplicables al examen',
          'Entender el contexto histórico-legal del país',
        ],
        recursos: [
          { tipo: 'lectura', id: 'casos-emblematicos-gt', nombre: '📖 5 casos emblemáticos del derecho guatemalteco', duracion: '2 horas', descripcion: 'Análisis completo: hechos, fallo, impacto legal' },
          { tipo: 'actividad', id: 'actividad-seminario', nombre: '✍️ Actividad: Seminario de análisis crítico', duracion: '2 horas', descripcion: 'Escribe tu análisis de 2 casos: qué cambiarías y por qué' },
          { tipo: 'tip', id: 'tip-casos-emblematicos', nombre: '🎯 Qué aprender de cada caso emblemático', descripcion: 'Las lecciones procesales y sustantivas de cada caso' },
        ],
        tips: [
          'Los casos emblemáticos muestran cómo SE APLICA la norma, no solo qué dice',
          'Analiza si el fallo fue correcto: practica el pensamiento crítico',
          'Un caso real en tu argumento siempre impresiona al examinador',
        ],
        lecturaRecomendada: {
          titulo: 'Compendio de jurisprudencia guatemalteca relevante',
          articulo: 'Casos de los últimos 10 años con mayor impacto',
          tiempo: '120 min',
        },
      },
      7: {
        titulo: 'Simulacro Final Avanzado: 40 Preguntas Nivel Experto',
        descripcion: 'El simulacro más exigente del plan. Preguntas de análisis, casos y jurisprudencia. Modo examen real.',
        objetivos: [
          'Alcanzar velocidad y precisión de nivel experto',
          'Medir dominio real antes del examen final',
          'Afinar estrategia personal de examen',
        ],
        recursos: [
          { tipo: 'quiz', id: 'simulacro-avanzado-final', nombre: '❓ Simulacro Avanzado (40 preguntas)', duracion: '2.5 horas', descripcion: 'Análisis, casos, jurisprudencia, doctrina' },
          { tipo: 'actividad', id: 'actividad-post-simulacro', nombre: '✍️ Actividad: Plan de acción post-simulacro', duracion: '30 min', descripcion: 'Lista de los 5 temas a reforzar en las últimas 48 horas' },
          { tipo: 'tip', id: 'tip-rendimiento-examen', nombre: '🎯 Optimiza tu rendimiento en el examen', descripcion: 'Gestión de tiempo, orden de respuesta, manejo de errores' },
        ],
        tips: [
          'Meta avanzada: 80%+ en el simulacro para sentirte listo',
          'Las preguntas de análisis valen más tiempo de reflexión',
          'Revisa cada error: ¿fue falta de conocimiento o de lectura?',
        ],
        lecturaRecomendada: {
          titulo: 'Últimas convocatorias del examen de privados',
          articulo: 'Patrones de preguntas más frecuentes por área',
          tiempo: '60 min',
        },
      },
      8: {
        titulo: 'Preparación Final: Estrategia, Confianza y Ejecución',
        descripcion: 'Las últimas 48 horas antes del examen. Qué estudiar, cómo descansar y cómo ejecutar al máximo el día del examen.',
        objetivos: [
          'Consolidar conocimiento sin agotarse',
          'Reducir ansiedad con técnicas probadas',
          'Entrar al examen con estrategia y confianza',
        ],
        recursos: [
          { tipo: 'glosario', id: 'glosario-avanzado-express', nombre: '📚 Glosario Express: 80 términos avanzados', duracion: '45 min', descripcion: 'Solo términos de nivel avanzado y jurisprudencia clave' },
          { tipo: 'tip', id: 'tip-48-horas-finales', nombre: '🧠 Las 48 horas más importantes', descripcion: 'Plan detallado hora por hora antes del examen' },
          { tipo: 'actividad', id: 'actividad-repaso-final', nombre: '✍️ Actividad: Tu mapa mental de 1 página', duracion: '30 min', descripcion: 'Todo el derecho guatemalteco en un esquema visual' },
          { tipo: 'tip', id: 'tip-dia-examen', nombre: '🎯 El día del examen: protocolo completo', descripcion: 'Desde que te despiertas hasta que entregas el examen' },
        ],
        tips: [
          'No estudies nada nuevo las últimas 12 horas',
          'Revisa SOLO tu mapa mental y los temas fallados en el simulacro',
          'Duerme 8 horas, desayuna bien, llega 20 minutos antes',
          'En el examen: lee completo, responde fáciles primero, revisa al final',
        ],
        lecturaRecomendada: {
          titulo: 'Tu resumen personal de los 7 temas anteriores',
          articulo: 'Solo lo que todavía no dominas con 100% de seguridad',
          tiempo: '60 min',
        },
      },
    },
  },
  civil: {
    basica: {
      1: {
        titulo: 'Personas y Capacidad Jurídica',
        descripcion: 'La base de todo el Derecho Civil: quién puede ser sujeto de derechos, qué es capacidad de goce vs ejercicio y cómo se registra el estado civil.',
        objetivos: [
          'Distinguir persona individual de persona jurídica',
          'Entender capacidad de goce vs capacidad de ejercicio',
          'Conocer el Registro Civil y sus funciones',
        ],
        recursos: [
          { tipo: 'material', id: 'civil-personas', nombre: 'Personas: individual, jurídica y estado civil', duracion: '1.5 horas', descripcion: 'CC Arts. 1-30 comentados con ejemplos' },
          { tipo: 'glosario', id: 'glosario-civil-basico', nombre: '📚 Glosario Civil Básico (35 términos)', duracion: '45 min', descripcion: 'Términos esenciales del Derecho Civil guatemalteco' },
          { tipo: 'lectura', id: 'cc-arts-1-30', nombre: '📖 CC: Arts. 1-30 (De las personas)', duracion: '30 min', descripcion: 'Concepto, inicio y fin de la personalidad jurídica' },
          { tipo: 'actividad', id: 'actividad-personas', nombre: '✍️ Actividad: Clasifica 10 sujetos de derecho', duracion: '20 min', descripcion: 'Individual vs jurídica, capaces vs incapaces' },
        ],
        tips: [
          'Persona individual: todo ser humano desde la concepción (Art. 1 CC)',
          'Capacidad de goce = tener derechos; de ejercicio = poder ejercerlos',
          'Incapacidad absoluta: menores de 14 años y declarados en estado de interdicción',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 1-8 (Personas individuales), Arts. 15-30 (Personas jurídicas)',
          tiempo: '30 min',
        },
      },
      2: {
        titulo: 'Derecho de Familia: Matrimonio y Régimen Patrimonial',
        descripcion: 'Requisitos, efectos y consecuencias del matrimonio. Los regímenes económicos que rigen los bienes de los cónyuges.',
        objetivos: [
          'Dominar requisitos y efectos del matrimonio civil',
          'Distinguir comunidad absoluta, separación y comunidad de gananciales',
          'Conocer las causas de nulidad e inexistencia del matrimonio',
        ],
        recursos: [
          { tipo: 'material', id: 'familia-matrimonio', nombre: 'Matrimonio: requisitos, formas y regímenes', duracion: '2 horas', descripcion: 'CC Arts. 78-180: requisitos, efectos, regímenes patrimoniales' },
          { tipo: 'caso', id: 'caso-nulidad-matrimonio', nombre: 'Caso: Nulidad de matrimonio por impedimento', duracion: '30 min', descripcion: 'Análisis de impedimentos absolutos y relativos' },
          { tipo: 'lectura', id: 'cc-arts-78-132', nombre: '📖 CC: Arts. 78-132 (Matrimonio y efectos)', duracion: '40 min', descripcion: 'Definición, requisitos, derechos y deberes conyugales' },
        ],
        tips: [
          'Comunidad absoluta = todo es de ambos; Separación = cada quien lo suyo',
          'Impedimentos absolutos: consanguinidad, matrimonio anterior vigente',
          'El matrimonio nulo vs matrimonio inexistente: efectos distintos',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 78-110 (Matrimonio), Arts. 122-180 (Regímenes económicos)',
          tiempo: '50 min',
        },
      },
      3: {
        titulo: 'Familia: Divorcio, Filiación y Alimentos',
        descripcion: 'Causas de divorcio, filiación (quién es padre/madre legalmente) y la obligación de alimentos. Tres temas de altísima frecuencia en el examen.',
        objetivos: [
          'Conocer las 13 causas de divorcio del CC guatemalteco',
          'Distinguir filiación matrimonial y extramatrimonial',
          'Calcular y argumentar la obligación alimentaria',
        ],
        recursos: [
          { tipo: 'material', id: 'familia-divorcio-filiacion', nombre: 'Divorcio, filiación y alimentos', duracion: '2 horas', descripcion: 'CC Arts. 155-292: divorcio, patria potestad, alimentos' },
          { tipo: 'caso', id: 'caso-familia', nombre: 'Caso: Divorcio con menores e impugnación de paternidad', duracion: '45 min', descripcion: 'Guarda, visitas y pensión en un solo caso' },
          { tipo: 'lectura', id: 'cc-arts-155-292', nombre: '📖 CC: Arts. 155-292 (Divorcio y filiación)', duracion: '45 min', descripcion: 'Causas, efectos, impugnación de paternidad' },
          { tipo: 'actividad', id: 'actividad-causas-divorcio', nombre: '✍️ Actividad: Lista las 13 causas de divorcio', duracion: '20 min', descripcion: 'Memoriza y clasifica por tipo de causa' },
        ],
        tips: [
          'Las 13 causas de divorcio están en el Art. 155 CC (memorízdelas)',
          'Alimentos: proporcionales a necesidad del quien pide y posibilidad del que da',
          'La impugnación de paternidad tiene plazo: 1 año desde que se conoce (Art. 226 CC)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 155-169 (Divorcio), Arts. 199-292 (Filiación y alimentos)',
          tiempo: '50 min',
        },
      },
      4: {
        titulo: 'Bienes y Derechos Reales: Propiedad y Posesión',
        descripcion: 'Clasificación de bienes, el derecho de propiedad y la posesión. Usufructo, servidumbres y limitaciones al dominio.',
        objetivos: [
          'Clasificar bienes (muebles/inmuebles, fungibles/no fungibles)',
          'Distinguir propiedad, posesión y tenencia',
          'Entender usufructo, uso, habitación y servidumbres',
        ],
        recursos: [
          { tipo: 'material', id: 'bienes-derechos-reales', nombre: 'Bienes, propiedad y derechos reales limitados', duracion: '2 horas', descripcion: 'CC Arts. 442-720: bienes, propiedad, usufructo, servidumbres' },
          { tipo: 'lectura', id: 'cc-arts-442-490', nombre: '📖 CC: Arts. 442-490 (Bienes y propiedad)', duracion: '40 min', descripcion: 'Clasificación de bienes y derecho de propiedad' },
          { tipo: 'actividad', id: 'actividad-clasificacion-bienes', nombre: '✍️ Actividad: Clasifica 20 ejemplos de bienes', duracion: '25 min', descripcion: 'Mueble/inmueble, fungible, consumible, registrable' },
          { tipo: 'caso', id: 'caso-usufructo', nombre: 'Caso: Usufructo sobre bien inmueble familiar', duracion: '35 min', descripcion: 'Derechos y obligaciones del usufructuario vs nudo propietario' },
        ],
        tips: [
          'Propiedad = usar + gozar + disponer (Art. 464 CC)',
          'Posesión de buena fe + justo título = prescripción adquisitiva en 10 años',
          'Servidumbre activa: el predio dominante; pasiva: el predio sirviente',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 464-476 (Propiedad), Arts. 703-720 (Servidumbres)',
          tiempo: '45 min',
        },
      },
      5: {
        titulo: 'Obligaciones Civiles: Fuentes, Cumplimiento y Extinción',
        descripcion: 'Cómo nacen, cómo se cumplen y cómo se extinguen las obligaciones. El corazón del Derecho Civil patrimonial.',
        objetivos: [
          'Identificar las fuentes de las obligaciones (contrato, ley, cuasicontrato, delito)',
          'Dominar modos de extinción (pago, novación, compensación, prescripción)',
          'Entender mora, incumplimiento y daños y perjuicios',
        ],
        recursos: [
          { tipo: 'material', id: 'obligaciones-civiles', nombre: 'Obligaciones: nacimiento, efectos y extinción', duracion: '2.5 horas', descripcion: 'CC Arts. 1319-1515: tipos, efectos, extinción' },
          { tipo: 'lectura', id: 'cc-arts-1319-1410', nombre: '📖 CC: Arts. 1319-1410 (Obligaciones)', duracion: '50 min', descripcion: 'Fuentes, clasificación y efectos de las obligaciones' },
          { tipo: 'caso', id: 'caso-incumplimiento', nombre: 'Caso: Incumplimiento de obligación con daños', duracion: '35 min', descripcion: 'Mora, daños directos e indirectos, cláusula penal' },
          { tipo: 'actividad', id: 'actividad-extincion', nombre: '✍️ Actividad: Mapa de modos de extinción', duracion: '30 min', descripcion: 'Diagrama de los 10 modos de extinción con ejemplos' },
        ],
        tips: [
          'Pago = cumplimiento exacto, íntegro y puntual (no solo dinero)',
          'Mora del deudor: intereses moratorios desde la interpelación',
          'Prescripción extintiva civil: 10 años regla general (Art. 1508 CC)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 1380-1420 (Extinción), Arts. 1431-1515 (Daños y perjuicios)',
          tiempo: '55 min',
        },
      },
      6: {
        titulo: 'Contratos Civiles: Compraventa, Arrendamiento y Donación',
        descripcion: 'Los tres contratos más frecuentes en la práctica guatemalteca. Elementos, obligaciones de las partes y vicios que los invalidan.',
        objetivos: [
          'Dominar elementos esenciales de la compraventa civil',
          'Conocer derechos y obligaciones en el arrendamiento',
          'Entender tipos de donación y causas de revocación',
        ],
        recursos: [
          { tipo: 'material', id: 'contratos-nominados-civil', nombre: 'Contratos civiles: compraventa, arrendamiento, donación', duracion: '2 horas', descripcion: 'CC Arts. 1517-1694: los 3 contratos principales' },
          { tipo: 'caso', id: 'caso-contrato', nombre: 'Caso: Compraventa con vicios ocultos', duracion: '35 min', descripcion: 'Acciones edilicias: redhibitoria y quanti minoris' },
          { tipo: 'lectura', id: 'cc-arts-1517-1594', nombre: '📖 CC: Arts. 1517-1594 (Compraventa)', duracion: '45 min', descripcion: 'Elementos, precio, entrega, garantías y vicios' },
          { tipo: 'actividad', id: 'actividad-redacta-contrato', nombre: '✍️ Actividad: Redacta cláusulas de compraventa', duracion: '30 min', descripcion: 'Precio, entrega, garantías, resolución' },
        ],
        tips: [
          'Compraventa civil: vendedor entrega cosa y comprador paga precio cierto en dinero',
          'Vicios ocultos: el comprador tiene 6 meses para reclamar (Art. 1558 CC)',
          'Arrendamiento: el arrendatario NO puede subarrendar sin autorización (Art. 1891 CC)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 1517-1558 (Compraventa), Arts. 1880-1940 (Arrendamiento)',
          tiempo: '55 min',
        },
      },
      7: {
        titulo: 'Sucesiones y Herencias: Testamentaria e Intestada',
        descripcion: 'Qué pasa con los bienes cuando alguien muere. Testamento, herederos legales y la porción legítima que nadie puede quitar.',
        objetivos: [
          'Distinguir sucesión testamentaria de intestada',
          'Conocer formas válidas de testamento en Guatemala',
          'Entender la legítima hereditaria y los herederos forzosos',
        ],
        recursos: [
          { tipo: 'material', id: 'sucesiones-herencias', nombre: 'Sucesiones: testamentaria, intestada y legítima', duracion: '2 horas', descripcion: 'CC Arts. 917-1067: herederos, testamentos, legítima' },
          { tipo: 'lectura', id: 'cc-arts-917-950', nombre: '📖 CC: Arts. 917-950 (Apertura de la sucesión)', duracion: '40 min', descripcion: 'Capacidad para heredar, aceptación y renuncia' },
          { tipo: 'caso', id: 'caso-herencia', nombre: 'Caso: Impugnación de testamento por preterición', duracion: '40 min', descripcion: 'Heredero forzoso omitido en testamento' },
          { tipo: 'actividad', id: 'actividad-orden-sucesion', nombre: '✍️ Actividad: Aplica el orden sucesorio intestado', duracion: '25 min', descripcion: '¿Quién hereda? Resuelve 3 casos de sucesión legal' },
        ],
        tips: [
          'Orden intestado GT: 1° hijos, 2° ascendientes, 3° cónyuge, 4° colaterales (Art. 1078 CC)',
          'La legítima = 50% de la herencia para herederos forzosos',
          'Testamento ológrafo: escrito y firmado completamente de puño y letra del testador',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 940-976 (Testamentos), Arts. 1078-1095 (Sucesión intestada)',
          tiempo: '50 min',
        },
      },
      8: {
        titulo: 'Simulacro Civil Básico y Repaso Final',
        descripcion: '30 preguntas de todos los temas civiles básicos. Cronometrado. Análisis de errores y cierre del nivel.',
        objetivos: [
          'Evaluar dominio completo del Derecho Civil básico',
          'Identificar los 3 temas más débiles para reforzar',
          'Cerrar el nivel básico con confianza',
        ],
        recursos: [
          { tipo: 'quiz', id: 'simulacro-civil-basico', nombre: '❓ Simulacro Civil Básico (30 preguntas)', duracion: '1.5 horas', descripcion: 'Personas, familia, bienes, obligaciones, contratos, sucesiones' },
          { tipo: 'glosario', id: 'glosario-civil-repaso', nombre: '📚 Glosario Civil: 50 términos clave', duracion: '45 min', descripcion: 'Repaso rápido de términos y definiciones civiles' },
          { tipo: 'actividad', id: 'actividad-mapa-civil', nombre: '✍️ Actividad: Mapa del Derecho Civil guatemalteco', duracion: '30 min', descripcion: 'Conecta todas las áreas del Código Civil en un esquema' },
          { tipo: 'tip', id: 'tip-civil-frecuentes', nombre: '🎯 Los 10 temas más frecuentes en exámenes civiles', descripcion: 'Basado en convocatorias anteriores del examen privado' },
        ],
        tips: [
          'Familia y contratos son las áreas con más preguntas en el privado civil',
          'Repasa las causas de nulidad de contratos (Art. 1301 CC)',
          'Sucesiones: memoriza el orden intestado y la legítima',
        ],
        lecturaRecomendada: {
          titulo: 'Repaso integral del Código Civil guatemalteco',
          articulo: 'Arts. clave de cada libro según tus errores del simulacro',
          tiempo: '60 min',
        },
      },
    },
    intermedia: {
      1: {
        titulo: 'Contratos Complejos: Mandato, Sociedad Civil y Comodato',
        descripcion: 'Más allá de la compraventa. Los contratos que realmente se usan en el ejercicio profesional y que el examen intermedio sí pregunta.',
        objetivos: [
          'Dominar mandato: tipos, representación y extinción',
          'Entender la sociedad civil vs sociedad mercantil',
          'Distinguir comodato de mutuo y arrendamiento',
        ],
        recursos: [
          { tipo: 'material', id: 'contratos-complejos-civil', nombre: 'Mandato, sociedad civil y contratos reales', duracion: '2 horas', descripcion: 'CC Arts. 1686-1874: mandato, sociedad, comodato, mutuo, depósito' },
          { tipo: 'caso', id: 'caso-contrato-sociedad', nombre: 'Caso: Disolución anticipada de sociedad civil', duracion: '40 min', descripcion: 'Causas de disolución y liquidación entre socios' },
          { tipo: 'lectura', id: 'cc-arts-1686-1743', nombre: '📖 CC: Arts. 1686-1743 (Mandato)', duracion: '40 min', descripcion: 'Mandato general vs especial, con y sin representación' },
          { tipo: 'actividad', id: 'actividad-cuadro-contratos', nombre: '✍️ Actividad: Cuadro comparativo de contratos reales', duracion: '25 min', descripcion: 'Comodato vs mutuo vs depósito: objeto, obligaciones, extinción' },
        ],
        tips: [
          'Mandato con representación = el mandatario actúa en nombre del mandante',
          'Comodato = préstamo gratuito de cosa no fungible (la devuelves tal cual)',
          'Mutuo = préstamo de cosa fungible (devuelves el equivalente)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 1686-1743 (Mandato), Arts. 1757-1810 (Sociedad civil)',
          tiempo: '50 min',
        },
      },
      2: {
        titulo: 'Responsabilidad Civil Extracontractual',
        descripcion: 'Cuando el daño no viene de un contrato sino de un hecho ilícito o cuasicontrato. Responsabilidad directa, indirecta y objetiva.',
        objetivos: [
          'Distinguir responsabilidad contractual de extracontractual',
          'Dominar responsabilidad por hecho propio, ajeno y de cosas',
          'Aplicar la teoría del daño: material, moral y emergente',
        ],
        recursos: [
          { tipo: 'material', id: 'responsabilidad-civil-extra', nombre: 'Responsabilidad civil extracontractual', duracion: '2 horas', descripcion: 'CC Arts. 1645-1672: hecho ilícito, daños, responsabilidad objetiva' },
          { tipo: 'caso', id: 'caso-accidente-civil', nombre: 'Caso: Accidente de tránsito con daños a terceros', duracion: '45 min', descripcion: 'Responsabilidad, daño emergente, lucro cesante y daño moral' },
          { tipo: 'lectura', id: 'cc-arts-1645-1672', nombre: '📖 CC: Arts. 1645-1672 (Hecho ilícito y daños)', duracion: '40 min', descripcion: 'Causas, eximentes, tipos de daño y reparación' },
          { tipo: 'actividad', id: 'actividad-responsabilidad', nombre: '✍️ Actividad: Identifica el tipo de responsabilidad en 5 casos', duracion: '30 min', descripcion: 'Contractual, extracontractual, directa, indirecta u objetiva' },
        ],
        tips: [
          'Hecho ilícito civil: acción/omisión culposa o dolosa que causa daño (Art. 1645 CC)',
          'Responsabilidad objetiva: no importa culpa, solo el nexo causal (ej: animales)',
          'Daño moral: no necesita prueba de monto exacto, el juez lo estima',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 1645-1672 (Responsabilidad por hecho ilícito)',
          tiempo: '45 min',
        },
      },
      3: {
        titulo: 'Garantías Reales: Hipoteca, Prenda y Fianza',
        descripcion: 'Las garantías que respaldan las obligaciones. Imprescindibles en la práctica notarial y bancaria guatemalteca.',
        objetivos: [
          'Dominar constitución, efectos y ejecución de la hipoteca',
          'Entender prenda civil vs prenda sin desplazamiento',
          'Aplicar fianza: subsidiariedad, beneficios de excusión y división',
        ],
        recursos: [
          { tipo: 'material', id: 'garantias-reales-civil', nombre: 'Hipoteca, prenda y fianza: guía completa', duracion: '2.5 horas', descripcion: 'CC Arts. 822-885 (hipoteca), Arts. 886-944 (prenda), Arts. 2100-2146 (fianza)' },
          { tipo: 'lectura', id: 'cc-arts-822-885', nombre: '📖 CC: Arts. 822-885 (Hipoteca)', duracion: '45 min', descripcion: 'Constitución, clases, efectos y extinción de la hipoteca' },
          { tipo: 'caso', id: 'caso-ejecucion-hipoteca', nombre: 'Caso: Ejecución hipotecaria por falta de pago', duracion: '40 min', descripcion: 'Proceso de ejecución, subasta y preferencia de créditos' },
          { tipo: 'actividad', id: 'actividad-garantias-comparativo', nombre: '✍️ Actividad: Compara hipoteca vs prenda vs fianza', duracion: '25 min', descripcion: 'Objeto, forma, efectos, ejecución y extinción de cada una' },
        ],
        tips: [
          'Hipoteca solo sobre inmuebles y se inscribe en el Registro de la Propiedad',
          'Prenda sobre muebles; sin desplazamiento = el deudor conserva la cosa',
          'Beneficio de excusión: el fiador puede exigir que primero se ejecute al deudor',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 822-885 (Hipoteca), Arts. 2100-2115 (Fianza)',
          tiempo: '55 min',
        },
      },
      4: {
        titulo: 'Familia Avanzada: Adopción, Tutela y Patrimonio Familiar',
        descripcion: 'Los institutos de protección familiar que van más allá del matrimonio. Alta frecuencia en el examen intermedio.',
        objetivos: [
          'Conocer el proceso y efectos de la adopción en Guatemala',
          'Entender la tutela y curatela: quién, cómo y para qué',
          'Dominar el patrimonio familiar: constitución y límites',
        ],
        recursos: [
          { tipo: 'material', id: 'familia-adopcion-tutela', nombre: 'Adopción, tutela, curatela y patrimonio familiar', duracion: '2 horas', descripcion: 'CC Arts. 228-358: adopción, tutela, patrimonio familiar' },
          { tipo: 'lectura', id: 'cc-arts-228-270', nombre: '📖 CC: Arts. 228-270 (Adopción)', duracion: '35 min', descripcion: 'Requisitos, efectos, nulidad e irrevocabilidad' },
          { tipo: 'caso', id: 'caso-tutela', nombre: 'Caso: Nombramiento de tutor para menor huérfano', duracion: '35 min', descripcion: 'Procedimiento, facultades y responsabilidades del tutor' },
          { tipo: 'actividad', id: 'actividad-adopcion-vs-tutela', nombre: '✍️ Actividad: Diferencia adopción vs tutela vs guarda', duracion: '20 min', descripcion: 'Cuadro comparativo con efectos jurídicos de cada figura' },
        ],
        tips: [
          'La adopción en GT crea un vínculo idéntico al de filiación biológica (Art. 228 CC)',
          'Tutor ≠ padre adoptivo: la tutela es temporal y no crea filiación',
          'Patrimonio familiar: los bienes afectos NO pueden ser embargados (Art. 352 CC)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 228-270 (Adopción), Arts. 293-358 (Tutela y patrimonio familiar)',
          tiempo: '50 min',
        },
      },
      5: {
        titulo: 'Derecho Registral: Registro de la Propiedad y Registro Civil',
        descripcion: 'Cómo funcionan los registros en Guatemala. Inscripción, anotación, cancelación y fe pública registral.',
        objetivos: [
          'Entender los principios registrales: publicidad, especialidad, tracto sucesivo',
          'Conocer qué actos son inscribibles en el Registro de la Propiedad',
          'Dominar la fe pública registral y sus límites',
        ],
        recursos: [
          { tipo: 'material', id: 'derecho-registral', nombre: 'Registro de la Propiedad y Registro Civil', duracion: '2 horas', descripcion: 'CC Arts. 1124-1155 + Ley del Registro Nacional de las Personas' },
          { tipo: 'lectura', id: 'cc-arts-1124-1155', nombre: '📖 CC: Arts. 1124-1155 (Registro de la Propiedad)', duracion: '40 min', descripcion: 'Inscripción, anotación preventiva, cancelación' },
          { tipo: 'actividad', id: 'actividad-principios-registrales', nombre: '✍️ Actividad: Explica los 6 principios registrales', duracion: '25 min', descripcion: 'Publicidad, legalidad, especialidad, tracto, rogación, fe pública' },
          { tipo: 'tip', id: 'tip-registros-gt', nombre: '🎯 Los 5 registros más importantes en Guatemala', descripcion: 'Propiedad, Civil, Mercantil, Tributario y Nacional de las Personas' },
        ],
        tips: [
          'Tracto sucesivo: solo puede inscribirse a favor de quien ya tiene inscrito el derecho anterior',
          'Anotación preventiva ≠ inscripción definitiva; tiene plazo de caducidad',
          'Fe pública registral protege al tercero de buena fe que confió en el registro',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil + Ley del Registro de la Propiedad',
          articulo: 'CC Arts. 1124-1155 + Decreto 1146 (Ley del Registro de la Propiedad)',
          tiempo: '50 min',
        },
      },
      6: {
        titulo: 'Proceso Civil Ordinario: Demanda, Prueba y Sentencia',
        descripcion: 'Cómo funciona un juicio civil de principio a fin. Las etapas, los escritos y los plazos que debes dominar.',
        objetivos: [
          'Conocer las etapas del juicio ordinario civil guatemalteco',
          'Dominar los medios de prueba y su ofrecimiento',
          'Entender la sentencia: estructura, efectos y cosa juzgada',
        ],
        recursos: [
          { tipo: 'material', id: 'proceso-civil-ordinario', nombre: 'Juicio ordinario civil: etapas y escritos', duracion: '2.5 horas', descripcion: 'CPCG Arts. 96-209: demanda, contestación, prueba, sentencia' },
          { tipo: 'lectura', id: 'cpcg-arts-96-140', nombre: '📖 CPCG: Arts. 96-140 (Demanda y contestación)', duracion: '45 min', descripcion: 'Requisitos, efectos de la presentación y rebeldía' },
          { tipo: 'caso', id: 'caso-juicio-ordinario', nombre: 'Caso: Demanda de cobro por incumplimiento de contrato', duracion: '45 min', descripcion: 'Trámite completo: demanda → prueba → sentencia → recurso' },
          { tipo: 'actividad', id: 'actividad-diagrama-proceso', nombre: '✍️ Actividad: Diagrama del juicio ordinario civil', duracion: '30 min', descripcion: 'Etapas, plazos, escritos y recursos en cada fase' },
        ],
        tips: [
          'Demanda: 8 requisitos del Art. 106 CPCG (memorízalos)',
          'Plazo de contestación: 9 días hábiles desde la notificación (Art. 111 CPCG)',
          'Cosa juzgada: mismo objeto, misma causa, mismas partes (triple identidad)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Procesal Civil y Mercantil',
          articulo: 'Arts. 96-209 (Juicio ordinario: demanda a sentencia)',
          tiempo: '60 min',
        },
      },
      7: {
        titulo: 'Juicios Sumarios, Ejecutivos y Medidas Cautelares',
        descripcion: 'Procesos más rápidos y las herramientas para asegurar el resultado del juicio. Muy frecuentes en la práctica civil.',
        objetivos: [
          'Distinguir juicio ordinario de sumario y ejecutivo',
          'Dominar el proceso ejecutivo: título, liquidez y exigibilidad',
          'Conocer medidas cautelares: arraigo, embargo, secuestro e intervención',
        ],
        recursos: [
          { tipo: 'material', id: 'procesos-especiales-civil', nombre: 'Juicios sumarios, ejecutivos y medidas cautelares', duracion: '2 horas', descripcion: 'CPCG Arts. 229-294 (sumario), Arts. 294-334 (ejecutivo)' },
          { tipo: 'lectura', id: 'cpcg-arts-294-334', nombre: '📖 CPCG: Arts. 294-334 (Juicio ejecutivo)', duracion: '40 min', descripcion: 'Títulos ejecutivos, oposición, remate y liquidación' },
          { tipo: 'caso', id: 'caso-embargo-preventivo', nombre: 'Caso: Solicitud de embargo preventivo', duracion: '35 min', descripcion: 'Requisitos, caución y responsabilidad por embargo indebido' },
          { tipo: 'actividad', id: 'actividad-medidas-cautelares', nombre: '✍️ Actividad: ¿Cuál medida cautelar aplica en cada caso?', duracion: '25 min', descripcion: '5 supuestos prácticos: arraigo, embargo, secuestro o intervención' },
        ],
        tips: [
          'Título ejecutivo: debe ser líquido, exigible y constar en documento auténtico',
          'Arraigo: retiene a la persona; embargo: retiene bienes',
          'Medidas cautelares pueden pedirse ANTES del juicio (Art. 535 CPCG)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Procesal Civil y Mercantil',
          articulo: 'Arts. 294-334 (Ejecutivo), Arts. 523-535 (Medidas cautelares)',
          tiempo: '50 min',
        },
      },
      8: {
        titulo: 'Simulacro Civil Intermedio y Repaso Integral',
        descripcion: '35 preguntas de nivel intermedio. Contratos complejos, responsabilidad, proceso civil y registros. Cierre del nivel.',
        objetivos: [
          'Evaluar dominio completo del nivel intermedio civil',
          'Consolidar la conexión entre Código Civil y Procesal Civil',
          'Identificar brechas finales antes del nivel avanzado',
        ],
        recursos: [
          { tipo: 'quiz', id: 'simulacro-civil-intermedio', nombre: '❓ Simulacro Civil Intermedio (35 preguntas)', duracion: '2 horas', descripcion: 'Contratos complejos, responsabilidad, garantías, proceso civil' },
          { tipo: 'glosario', id: 'glosario-civil-intermedio', nombre: '📚 Glosario Civil Intermedio: 55 términos', duracion: '45 min', descripcion: 'Términos procesales y de contratos especiales' },
          { tipo: 'actividad', id: 'actividad-repaso-civil-inter', nombre: '✍️ Actividad: Mapa integrador CC + CPCG', duracion: '35 min', descripcion: 'Relaciona cada institución civil con su proceso correspondiente' },
          { tipo: 'tip', id: 'tip-civil-intermedio-frecuentes', nombre: '🎯 Los 8 temas más frecuentes nivel intermedio', descripcion: 'Hipoteca, responsabilidad, ejecutivo, medidas cautelares encabezan la lista' },
        ],
        tips: [
          'El ejecutivo y las medidas cautelares son las preguntas procesales más comunes',
          'Responsabilidad extracontractual + garantías = combo frecuente en el privado',
          'Revisa siempre: ¿es CC o CPCG? Muchos fallos confunden código sustantivo con procesal',
        ],
        lecturaRecomendada: {
          titulo: 'Repaso: CC Arts. clave + CPCG Arts. clave',
          articulo: 'Enfócate en los artículos detrás de tus errores del simulacro',
          tiempo: '60 min',
        },
      },
    },
    avanzada: {},
  },
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
