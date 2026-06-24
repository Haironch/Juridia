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
    avanzada: {
      1: {
        titulo: 'Jurisprudencia Civil Guatemalteca: Las Sentencias que Debes Dominar',
        descripcion: 'Las resoluciones civiles más importantes de la CSJ y CC. Imprescindibles para argumentar a nivel avanzado.',
        objetivos: [
          'Dominar las sentencias civiles más citadas de la CSJ',
          'Entender cómo la jurisprudencia interpreta el Código Civil',
          'Aplicar precedentes en argumentación jurídica',
        ],
        recursos: [
          { tipo: 'lectura', id: 'jurisprudencia-civil-csj', nombre: '📖 12 sentencias civiles clave de la CSJ', duracion: '3 horas', descripcion: 'Contratos, familia, responsabilidad civil: holding y aplicación' },
          { tipo: 'quiz', id: 'quiz-jurisprudencia-civil', nombre: '❓ Quiz: Jurisprudencia civil avanzada', duracion: '1.5 horas', descripcion: 'Identifica el fallo correcto en casos basados en sentencias reales' },
          { tipo: 'actividad', id: 'actividad-ficha-jurisprudencia-civil', nombre: '✍️ Actividad: Fichas de 4 sentencias elegidas', duracion: '1 hora', descripcion: 'Hechos, holding, razonamiento y cómo usarla en un caso nuevo' },
        ],
        tips: [
          'Ratio decidendi = la regla que resuelve el caso (lo que vincula)',
          'Busca sentencias con votos disidentes: revelan puntos controvertidos',
          'Cita: expediente + año + nombre de la acción (ej: casación civil No. 123-2022)',
        ],
        lecturaRecomendada: {
          titulo: 'Memoria de Labores CSJ + Gaceta de la CC',
          articulo: 'Sentencias civiles 2020-2024 sobre contratos, familia y responsabilidad',
          tiempo: '90 min',
        },
      },
      2: {
        titulo: 'Nulidades, Rescisión y Resolución de Contratos',
        descripcion: 'Cuándo un contrato no vale nada, cuándo se puede deshacer y cuándo simplemente se resuelve. Distinción crítica en el examen avanzado.',
        objetivos: [
          'Distinguir nulidad absoluta, relativa, rescisión y resolución',
          'Aplicar las causas de nulidad del Código Civil con precisión',
          'Resolver casos donde coexisten múltiples vicios contractuales',
        ],
        recursos: [
          { tipo: 'material', id: 'nulidades-contratos-avanzado', nombre: 'Nulidades, rescisión y resolución de contratos', duracion: '2.5 horas', descripcion: 'CC Arts. 1301-1318 (nulidad), Arts. 1579-1600 (resolución/rescisión)' },
          { tipo: 'lectura', id: 'cc-arts-1301-1318', nombre: '📖 CC: Arts. 1301-1318 (Nulidad de contratos)', duracion: '40 min', descripcion: 'Causas, efectos, convalidación y prescripción de la acción' },
          { tipo: 'caso', id: 'caso-nulidad-contrato-avanzado', nombre: 'Caso: Contrato con objeto ilícito y lesión', duracion: '50 min', descripcion: 'Nulidad absoluta + lesión enorme: ¿qué acción procede?' },
          { tipo: 'actividad', id: 'actividad-nulidades-cuadro', nombre: '✍️ Actividad: Cuadro comparativo de ineficacias contractuales', duracion: '30 min', descripcion: 'Nulidad absoluta vs relativa vs rescisión vs resolución: efectos y plazos' },
        ],
        tips: [
          'Nulidad absoluta: cualquiera puede pedirla, no prescribe, no se sanea',
          'Nulidad relativa: solo la parte afectada, prescribe en 2 años (Art. 1312 CC)',
          'Rescisión: contrato válido pero con lesión económica grave (Art. 1579 CC)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 1301-1318 (Nulidades), Arts. 1579-1600 (Rescisión y resolución)',
          tiempo: '55 min',
        },
      },
      3: {
        titulo: 'Sucesiones Complejas: Testamento, Legítima y Conflictos Hereditarios',
        descripcion: 'Más allá del testamento simple: sustituciones, fideicomisos, colación y las disputas hereditarias que llegan a juicio.',
        objetivos: [
          'Dominar las formas especiales de testamento (ológrafo, militar, marítimo)',
          'Aplicar la colación y computación de la legítima',
          'Resolver conflictos entre herederos testamentarios e intestados',
        ],
        recursos: [
          { tipo: 'material', id: 'sucesiones-avanzado', nombre: 'Sucesiones complejas: fideicomisos y conflictos', duracion: '2.5 horas', descripcion: 'CC Arts. 940-1077: formas de testar, legítima, colación, preterición' },
          { tipo: 'lectura', id: 'cc-arts-940-976', nombre: '📖 CC: Arts. 940-976 (Testamentos especiales)', duracion: '45 min', descripcion: 'Ológrafo, cerrado, abierto notarial, militar y en peligro de muerte' },
          { tipo: 'caso', id: 'caso-herencia-avanzado', nombre: 'Caso: Heredero preterido impugna testamento notarial', duracion: '50 min', descripcion: 'Preterición, reducción de legados y acción de petición de herencia' },
          { tipo: 'actividad', id: 'actividad-calculo-legitima', nombre: '✍️ Actividad: Calcula la legítima en 3 supuestos', duracion: '35 min', descripcion: 'Con cónyuge, hijos y ascendientes en distintas combinaciones' },
        ],
        tips: [
          'Preterición = omitir a heredero forzoso → anula solo en lo que lo perjudica',
          'Colación: los bienes donados en vida se cuentan en la herencia (Art. 1071 CC)',
          'Legítima GT = 50% de la masa hereditaria líquida para herederos forzosos',
        ],
        lecturaRecomendada: {
          titulo: 'Código Civil Guatemalteco',
          articulo: 'Arts. 1051-1077 (Legítima y colación), Arts. 940-993 (Testamentos)',
          tiempo: '60 min',
        },
      },
      4: {
        titulo: 'Derecho Notarial Avanzado: Escrituras, Fe Pública y Nulidades',
        descripcion: 'El notario como profesional del derecho: su responsabilidad, las escrituras que autoriza y cuándo estas pueden impugnarse.',
        objetivos: [
          'Dominar los requisitos formales de la escritura pública guatemalteca',
          'Entender la responsabilidad civil y penal del notario',
          'Conocer las causas de nulidad e inexistencia del instrumento público',
        ],
        recursos: [
          { tipo: 'material', id: 'derecho-notarial-avanzado', nombre: 'Derecho Notarial: escrituras y responsabilidad', duracion: '2.5 horas', descripcion: 'Código de Notariado Decreto 314: Arts. 1-90 comentados' },
          { tipo: 'lectura', id: 'codigo-notariado-arts-1-50', nombre: '📖 Código de Notariado: Arts. 1-50', duracion: '50 min', descripcion: 'Requisitos de escrituras, protocolo, fe pública y registro' },
          { tipo: 'caso', id: 'caso-nulidad-escritura', nombre: 'Caso: Escritura impugnada por falta de requisito formal', duracion: '40 min', descripcion: 'Nulidad notarial vs subsanación vs inexistencia del instrumento' },
          { tipo: 'actividad', id: 'actividad-redacta-escritura', nombre: '✍️ Actividad: Identifica errores en escritura defectuosa', duracion: '30 min', descripcion: 'Escritura con 5 errores intencionados: encuéntralos y clasifícalos' },
        ],
        tips: [
          'Escritura pública = instrumento notarial; acta notarial = hace constar hechos',
          'Las enmiendas y entrerrenglonaduras deben salvarse antes de firmar (Art. 42 CN)',
          'Nulidad absoluta notarial: el notario no es hábil para el acto',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Notariado (Decreto 314)',
          articulo: 'Arts. 1-50 (Protocolo y escrituras) + Arts. 62-75 (Nulidades)',
          tiempo: '60 min',
        },
      },
      5: {
        titulo: 'Responsabilidad Civil Profesional: Abogados y Notarios',
        descripcion: 'Cuándo el abogado o notario responde por los daños que causa su mala praxis. Un tema cada vez más relevante en Guatemala.',
        objetivos: [
          'Identificar los elementos de la responsabilidad civil del abogado',
          'Distinguir mala praxis notarial de mala praxis procesal',
          'Aplicar criterios de daño, causalidad y culpa profesional',
        ],
        recursos: [
          { tipo: 'material', id: 'responsabilidad-profesional-civil', nombre: 'Responsabilidad civil del abogado y notario', duracion: '2 horas', descripcion: 'CC + Ley del Organismo Judicial + Código de Ética Profesional' },
          { tipo: 'lectura', id: 'loj-responsabilidad-abogado', nombre: '📖 LOJ + CC: Responsabilidad de auxiliares de justicia', duracion: '45 min', descripcion: 'Arts. 188-197 LOJ + CC Arts. 1648-1655 (responsabilidad por servicios)' },
          { tipo: 'caso', id: 'caso-mala-praxis-notarial', nombre: 'Caso: Notario autoriza escritura con incapaz', duracion: '45 min', descripcion: 'Responsabilidad civil, disciplinaria y penal del notario' },
          { tipo: 'actividad', id: 'actividad-responsabilidad-profesional', nombre: '✍️ Actividad: Analiza 3 casos de mala praxis jurídica', duracion: '35 min', descripcion: '¿Hay responsabilidad? ¿Civil, disciplinaria o penal?' },
        ],
        tips: [
          'El abogado responde por culpa leve en el ejercicio profesional',
          'Prescripción de la acción contra el notario: 4 años desde el daño (Art. 1508 CC)',
          'Responsabilidad disciplinaria ante el Colegio de Abogados es independiente de la civil',
        ],
        lecturaRecomendada: {
          titulo: 'Ley del Organismo Judicial + Código de Ética del Abogado',
          articulo: 'LOJ Arts. 188-197 + Estatuto del CAG: obligaciones y sanciones',
          tiempo: '55 min',
        },
      },
      6: {
        titulo: 'Litigación Civil Estratégica: Cómo Ganar Casos Civiles',
        descripcion: 'La diferencia entre saber el derecho y saber litigar. Estrategia probatoria, manejo de excepciones y argumentación al juez.',
        objetivos: [
          'Diseñar una estrategia de litigación civil completa',
          'Dominar excepciones previas y perentorias como herramienta defensiva',
          'Argumentar con jurisprudencia y doctrina frente al juzgador',
        ],
        recursos: [
          { tipo: 'material', id: 'litigacion-civil-estrategia', nombre: 'Estrategia de litigación civil guatemalteca', duracion: '2.5 horas', descripcion: 'CPCG: excepciones, prueba, alegatos y recursos como herramientas estratégicas' },
          { tipo: 'caso', id: 'caso-litigacion-civil', nombre: 'Caso: Demanda con defensas múltiples', duracion: '1 hora', descripcion: 'Diseña la estrategia de defensa: excepciones, prueba y alegatos' },
          { tipo: 'actividad', id: 'actividad-alegato-civil', nombre: '✍️ Actividad: Redacta un alegato de bien probado', duracion: '1.5 horas', descripcion: 'Argumentación completa con hechos, derecho y jurisprudencia' },
          { tipo: 'tip', id: 'tip-litigacion-civil', nombre: '🎯 Los 7 errores más comunes en litigación civil', descripcion: 'Los errores que pierden juicios y cómo evitarlos' },
        ],
        tips: [
          'Las excepciones previas pueden terminar el juicio sin entrar al fondo',
          'La carga de la prueba recae en quien afirma, no en quien niega (Art. 126 CPCG)',
          'El alegato de bien probado: hechos → prueba rendida → norma → conclusión',
        ],
        lecturaRecomendada: {
          titulo: 'Código Procesal Civil y Mercantil',
          articulo: 'Arts. 116-134 (Excepciones), Arts. 139-182 (Prueba)',
          tiempo: '65 min',
        },
      },
      7: {
        titulo: 'Simulacro Final Civil Avanzado: 40 Preguntas de Análisis',
        descripcion: 'El simulacro más exigente del plan civil. Jurisprudencia, nulidades, notarial, litigación. Modo examen real.',
        objetivos: [
          'Medir dominio real del nivel avanzado civil',
          'Identificar los últimos puntos a reforzar',
          'Consolidar velocidad y precisión en preguntas de análisis',
        ],
        recursos: [
          { tipo: 'quiz', id: 'simulacro-civil-avanzado', nombre: '❓ Simulacro Civil Avanzado (40 preguntas)', duracion: '2.5 horas', descripcion: 'Análisis de casos, jurisprudencia, notarial y litigación' },
          { tipo: 'actividad', id: 'actividad-post-simulacro-civil', nombre: '✍️ Actividad: Plan de acción post-simulacro', duracion: '30 min', descripcion: 'Lista los 3 temas a reforzar y el artículo exacto de cada error' },
          { tipo: 'tip', id: 'tip-simulacro-civil-avanzado', nombre: '🎯 Estrategia para preguntas de análisis jurídico', descripcion: 'Cómo leer, descomponer y responder preguntas complejas en tiempo' },
        ],
        tips: [
          'Meta avanzada: 80%+ para considerar el nivel dominado',
          'Preguntas de jurisprudencia: busca el principio, no el número de artículo',
          'Anota cada error con su artículo fuente: eso es tu guía de repaso final',
        ],
        lecturaRecomendada: {
          titulo: 'Repaso basado en errores del simulacro',
          articulo: 'Solo los artículos y sentencias detrás de cada pregunta fallada',
          tiempo: '90 min',
        },
      },
      8: {
        titulo: 'Cierre Civil Avanzado: Integración Final y Preparación de Examen',
        descripcion: 'Conecta todo lo del Código Civil con su aplicación procesal y notarial. El cierre que convierte el conocimiento en rendimiento.',
        objetivos: [
          'Integrar Código Civil, CPCG y Código de Notariado en un solo esquema mental',
          'Dominar los 15 temas civiles más frecuentes en el examen privado',
          'Entrar al examen con estrategia clara y confianza sólida',
        ],
        recursos: [
          { tipo: 'glosario', id: 'glosario-civil-avanzado', nombre: '📚 Glosario Civil Avanzado: 70 términos', duracion: '1 hora', descripcion: 'Términos de jurisprudencia, notarial y litigación civil' },
          { tipo: 'actividad', id: 'actividad-mapa-civil-avanzado', nombre: '✍️ Actividad: Mapa integrador CC + CPCG + CN', duracion: '45 min', descripcion: 'Relaciona cada institución civil con su norma y su proceso' },
          { tipo: 'tip', id: 'tip-15-temas-civiles', nombre: '🎯 Los 15 temas civiles más frecuentes en privados', descripcion: 'Ranking basado en convocatorias 2019-2024' },
          { tipo: 'tip', id: 'tip-examen-civil-final', nombre: '🧠 Estrategia final para el examen civil', descripcion: 'Protocolo completo: la noche anterior, el día del examen, durante y después' },
        ],
        tips: [
          'No estudies nada nuevo las últimas 12 horas: solo repasa tu mapa integrador',
          'Familia + contratos + proceso = más del 60% del examen civil',
          'Si dudas entre dos respuestas: elige la que tenga respaldo en artículo específico',
        ],
        lecturaRecomendada: {
          titulo: 'Tu resumen personal de los 3 niveles del plan civil',
          articulo: 'Los artículos que aún no dominas al 100% después del simulacro',
          tiempo: '60 min',
        },
      },
    },
  },
  penal: {
    basica: {
      1: {
        titulo: 'Fundamentos del Derecho Penal Guatemalteco',
        descripcion: 'Entiende qué es el delito, sus elementos y cómo se estructura el Código Penal guatemalteco. La base para todo lo que viene.',
        objetivos: [
          'Comprender el concepto y fines del derecho penal',
          'Identificar las fuentes del derecho penal en Guatemala',
          'Dominar la estructura del Código Penal (Decreto 17-73)',
        ],
        recursos: [
          { tipo: 'glosario', id: 'glosario-penal-basico', nombre: 'Glosario Penal (términos esenciales)', duracion: '2 horas', descripcion: 'Delito, dolo, culpa, imputabilidad, tipicidad, antijuridicidad, culpabilidad' },
          { tipo: 'material', id: 'penal-teoria-delito', nombre: 'Teoría del Delito — Introducción', duracion: '1.5 horas', descripcion: 'Concepto de delito, elementos y clasificación según CP guatemalteco' },
          { tipo: 'lectura', id: 'cp-arts-1-20', nombre: '📖 Código Penal: Arts. 1-20 (Principios)', duracion: '40 min', descripcion: 'Legalidad, irretroactividad, territorialidad' },
        ],
        tips: [
          'El principio de legalidad en penal: "nullum crimen sine lege" — no hay delito sin ley previa',
          'Memoriza los 3 elementos del delito: tipicidad, antijuridicidad, culpabilidad',
          'Distingue dolo (intención) de culpa (imprudencia) desde el inicio',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal Guatemalteco (Decreto 17-73)',
          articulo: 'Arts. 1-15 (Principios generales)',
          tiempo: '35 min',
        },
      },
      2: {
        titulo: 'Teoría del Delito: Tipicidad y Antijuridicidad',
        descripcion: 'Aprende a analizar si una conducta es delito. Los elementos de tipicidad y antijuridicidad son los filtros que usarás en todo examen.',
        objetivos: [
          'Aplicar el análisis de tipicidad (objetiva y subjetiva)',
          'Distinguir causas de justificación que eliminan la antijuridicidad',
          'Analizar casos prácticos con la teoría del delito',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-tipicidad', nombre: 'Tipicidad y Antijuridicidad en el CP guatemalteco', duracion: '2 horas', descripcion: 'Tipo penal, elementos objetivos/subjetivos, causas de justificación' },
          { tipo: 'caso', id: 'caso-penal-legitima-defensa', nombre: 'Caso: Legítima defensa', duracion: '40 min', descripcion: 'Análisis de los requisitos de la legítima defensa (Art. 24 CP)' },
          { tipo: 'lectura', id: 'cp-arts-24-27', nombre: '📖 CP: Arts. 24-27 (Causas de justificación)', duracion: '35 min', descripcion: 'Legítima defensa, estado de necesidad, ejercicio de cargo' },
          { tipo: 'tip', id: 'tip-causas-justificacion', nombre: '🎯 Tip: Causas de justificación vs causas de inculpabilidad', descripcion: 'Son diferentes — la justificación elimina lo ilícito, la inculpabilidad elimina la culpa' },
        ],
        tips: [
          'Legítima defensa: necesidad racional del medio + agresión ilegítima + no provocación suficiente',
          'Estado de necesidad: el mal causado debe ser MENOR que el que se evita',
          'Aprende las causas de justificación del Art. 24 CP de memoria',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal',
          articulo: 'Arts. 24-27 (Causas de justificación)',
          tiempo: '30 min',
        },
      },
      3: {
        titulo: 'Culpabilidad, Imputabilidad y Penas',
        descripcion: 'El tercer elemento del delito: la culpabilidad. Quién puede ser penalmente responsable en Guatemala y qué sanciones aplican.',
        objetivos: [
          'Comprender la culpabilidad como elemento del delito',
          'Identificar causas de inimputabilidad (menores, trastorno mental)',
          'Conocer el sistema de penas del Código Penal',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-culpabilidad', nombre: 'Culpabilidad e Imputabilidad', duracion: '1.5 horas', descripcion: 'Dolo, culpa, preterintención, causas de inculpabilidad' },
          { tipo: 'lectura', id: 'cp-arts-28-44', nombre: '📖 CP: Arts. 28-44 (Culpabilidad y penas)', duracion: '40 min', descripcion: 'Dolo, culpa, penas principales y accesorias' },
          { tipo: 'actividad', id: 'actividad-clasificacion-delitos', nombre: '✍️ Actividad: Clasifica dolo vs culpa en 5 casos', duracion: '30 min', descripcion: 'Distingue si la conducta fue intencional o imprudente' },
        ],
        tips: [
          'Menores de 18 años: NO son imputables penalmente en Guatemala',
          'Penas principales: muerte (suspendida), prisión, arresto, multa',
          'Preterintención = quiso un resultado menor, ocurrió uno mayor',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal',
          articulo: 'Arts. 28-35 (Culpabilidad), Arts. 41-65 (Penas)',
          tiempo: '45 min',
        },
      },
      4: {
        titulo: 'Iter Criminis: El Camino del Delito',
        descripcion: 'Las etapas del delito: desde la idea hasta la consumación. Tentativa, frustración y consumación con aplicación en exámenes.',
        objetivos: [
          'Distinguir las etapas del iter criminis',
          'Aplicar los criterios de tentativa y frustración del CP',
          'Calcular la pena según la etapa del delito alcanzada',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-iter-criminis', nombre: 'Iter Criminis y formas imperfectas', duracion: '1.5 horas', descripcion: 'Actos preparatorios, tentativa, frustración, consumación (Arts. 14-16 CP)' },
          { tipo: 'caso', id: 'caso-tentativa-robo', nombre: 'Caso: Tentativa de robo', duracion: '35 min', descripcion: 'Análisis: ¿cuándo hay tentativa y cuándo frustración?' },
          { tipo: 'lectura', id: 'cp-arts-14-17', nombre: '📖 CP: Arts. 14-17 (Iter criminis)', duracion: '30 min', descripcion: 'Tentativa, frustración y consumación' },
          { tipo: 'tip', id: 'tip-iter-criminis', nombre: '🎯 Tip: Tentativa vs Frustración', descripcion: 'Tentativa = no llegó al acto último; Frustración = realizó todos los actos pero no se produjo el resultado' },
        ],
        tips: [
          'Tentativa: pena del delito consumado reducida de 1/3 a 2/3',
          'Frustración: reducción de 1/4 a 1/2 de la pena',
          'Los actos preparatorios solo se castigan si la ley lo dice expresamente',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal',
          articulo: 'Arts. 14-17 (Formas de realización del delito)',
          tiempo: '25 min',
        },
      },
      5: {
        titulo: 'Participación Criminal: Autores, Cómplices y Encubridores',
        descripcion: 'Cuando varias personas intervienen en un delito. Aprende a distinguir roles y cómo afecta la pena de cada uno.',
        objetivos: [
          'Distinguir autor, coautor, cómplice y encubridor',
          'Aplicar las penas según el grado de participación',
          'Resolver casos de delitos cometidos en grupo',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-participacion', nombre: 'Participación Criminal en el CP guatemalteco', duracion: '1.5 horas', descripcion: 'Arts. 35-40 CP: autores, cómplices, encubridores' },
          { tipo: 'caso', id: 'caso-coautoria-penal', nombre: 'Caso: Robo con participación múltiple', duracion: '40 min', descripcion: 'Determina la responsabilidad y pena de cada participante' },
          { tipo: 'lectura', id: 'cp-arts-35-40', nombre: '📖 CP: Arts. 35-40 (Participación)', duracion: '35 min', descripcion: 'Autores directos, mediatos, cómplices y encubridores' },
        ],
        tips: [
          'Autor directo = el que ejecuta el delito por su propia mano',
          'Instigador = el que determina a otro a cometerlo (misma pena que el autor)',
          'Encubridor actúa DESPUÉS del delito — diferente a cómplice que actúa antes o durante',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal',
          articulo: 'Arts. 35-40 (Participación criminal)',
          tiempo: '30 min',
        },
      },
      6: {
        titulo: 'Delitos Contra la Vida y la Integridad Personal',
        descripcion: 'Homicidio, asesinato, lesiones. Los delitos más frecuentes en el examen penal guatemalteco.',
        objetivos: [
          'Distinguir homicidio simple de asesinato (calificantes)',
          'Conocer las lesiones y sus tipos según gravedad',
          'Aplicar circunstancias agravantes y atenuantes',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-vida-integridad', nombre: 'Delitos Contra la Vida — CP guatemalteco', duracion: '2 horas', descripcion: 'Arts. 123-155 CP: homicidio, asesinato, parricidio, lesiones' },
          { tipo: 'caso', id: 'caso-homicidio-vs-asesinato', nombre: 'Caso: ¿Homicidio o asesinato?', duracion: '45 min', descripcion: 'Análisis de calificantes del asesinato (alevosía, premeditación, precio)' },
          { tipo: 'lectura', id: 'cp-arts-123-155', nombre: '📖 CP: Arts. 123-155 (Vida e integridad)', duracion: '50 min', descripcion: 'Tipos de homicidio, lesiones leves, graves y gravísimas' },
          { tipo: 'tip', id: 'tip-calificantes-asesinato', nombre: '🎯 Tip: Las 8 calificantes del asesinato', descripcion: 'Memoriza Art. 132 CP: alevosía, premeditación, precio, veneno, inundación, incendio, medio que cause peligro común, ensañamiento' },
        ],
        tips: [
          'Homicidio = matar sin calificantes (Art. 123 CP), pena 8-15 años',
          'Asesinato = matar CON una calificante del Art. 132 CP, pena 25-50 años',
          'Parricidio = matar a cónyuge, padres, hijos (Art. 131 CP)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal',
          articulo: 'Arts. 123-132 (Homicidio y asesinato)',
          tiempo: '45 min',
        },
      },
      7: {
        titulo: 'Delitos Contra el Patrimonio y Delitos Sexuales',
        descripcion: 'Robo, hurto, estafa, violación. Los delitos contra la propiedad y la libertad sexual son los más consultados en la práctica.',
        objetivos: [
          'Distinguir hurto de robo (con o sin violencia)',
          'Conocer los elementos del delito de estafa',
          'Identificar los delitos sexuales y su tratamiento en Guatemala',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-patrimonio', nombre: 'Delitos Contra el Patrimonio', duracion: '2 horas', descripcion: 'Arts. 246-283 CP: hurto, robo, estafa, apropiación indebida' },
          { tipo: 'caso', id: 'caso-hurto-vs-robo', nombre: 'Caso: ¿Hurto o robo agravado?', duracion: '40 min', descripcion: 'Análisis del uso de violencia/intimidación como diferenciador' },
          { tipo: 'lectura', id: 'cp-arts-246-283', nombre: '📖 CP: Arts. 246-283 (Patrimonio)', duracion: '50 min', descripcion: 'Hurto, robo, extorsión, estafa, apropiación indebida' },
          { tipo: 'tip', id: 'tip-hurto-robo', nombre: '🎯 Tip: Hurto vs Robo', descripcion: 'Hurto = apoderamiento sin violencia. Robo = con violencia o intimidación sobre personas' },
        ],
        tips: [
          'Hurto (Art. 246): sin violencia — Robo (Art. 251): con violencia o intimidación',
          'Estafa requiere: engaño + error + disposición patrimonial + perjuicio',
          'Violación (Art. 173): acceso carnal bajo las circunstancias del artículo, pena 6-12 años',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal',
          articulo: 'Arts. 246-260 (Hurto y robo), Arts. 173-175 (Delitos sexuales)',
          tiempo: '45 min',
        },
      },
      8: {
        titulo: 'Proceso Penal Básico y Simulacro Final',
        descripcion: 'Cómo funciona el proceso penal guatemalteco (CPP) y simulacro final para medir tu nivel antes del examen real.',
        objetivos: [
          'Conocer las etapas del proceso penal guatemalteco',
          'Identificar los sujetos procesales y sus roles',
          'Practicar con simulacro completo de Derecho Penal',
        ],
        recursos: [
          { tipo: 'material', id: 'cpp-etapas', nombre: 'Proceso Penal: Etapas (CPP Decreto 51-92)', duracion: '1.5 horas', descripcion: 'Preparatoria, intermedia, debate oral y sentencia' },
          { tipo: 'quiz', id: 'simulacro-penal-basico', nombre: 'Simulacro Penal Básico (25 preguntas)', duracion: '2 horas', descripcion: 'Preguntas de teoría del delito, delitos y proceso penal' },
          { tipo: 'tip', id: 'tip-proceso-penal', nombre: '🎯 Tip: Etapas del proceso penal', descripcion: 'Preparatoria → Intermedia → Debate → Sentencia → Apelación' },
          { tipo: 'actividad', id: 'actividad-repaso-penal-basico', nombre: '✍️ Actividad: Repaso de teoría del delito', duracion: '45 min', descripcion: 'Aplica tipicidad, antijuridicidad y culpabilidad a 3 casos nuevos' },
        ],
        tips: [
          'El Ministerio Público ejerce la persecución penal — no la víctima directamente',
          'Etapa preparatoria: investigación. Intermedia: ¿hay mérito para juicio? Debate: el juicio oral',
          'Duerme bien y repasa tus puntos débiles del simulacro antes del examen',
        ],
        lecturaRecomendada: {
          titulo: 'Código Procesal Penal (CPP Decreto 51-92)',
          articulo: 'Arts. 1-10 (Principios), Arts. 309-324 (Etapa preparatoria)',
          tiempo: '40 min',
        },
      },
    },
    intermedia: {
      1: {
        titulo: 'Repaso Avanzado de Teoría del Delito',
        descripcion: 'Profundiza en la teoría del delito con análisis de casos complejos. Ya conoces los elementos — ahora los aplicamos con precisión.',
        objetivos: [
          'Analizar conductas atípicas y causas de exclusión del delito',
          'Distinguir error de tipo de error de prohibición',
          'Aplicar la teoría finalista del delito',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-teoria-avanzada', nombre: 'Teoría del Delito — Nivel Intermedio', duracion: '2 horas', descripcion: 'Teoría finalista, error de tipo, error de prohibición, conductas atípicas' },
          { tipo: 'caso', id: 'caso-error-tipo-penal', nombre: 'Caso: Error de tipo vs error de prohibición', duracion: '50 min', descripcion: 'Análisis práctico de ambas figuras con resultado en la responsabilidad' },
          { tipo: 'lectura', id: 'cp-arts-20-27-inter', nombre: '📖 CP: Arts. 20-27 (Excluyentes de responsabilidad)', duracion: '40 min', descripcion: 'Causas de inimputabilidad, inculpabilidad y justificación' },
          { tipo: 'glosario', id: 'glosario-penal-intermedio', nombre: 'Glosario Penal Intermedio', duracion: '1 hora', descripcion: 'Términos: finalismo, causalismo, imputación objetiva, iter criminis' },
        ],
        tips: [
          'Error de tipo → elimina el dolo (si es invencible, elimina también la culpa)',
          'Error de prohibición → el sujeto cree que su conducta es lícita',
          'En Guatemala rige la teoría finalista del delito (acción dirigida a un fin)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal',
          articulo: 'Arts. 20-27 (Inimputabilidad y excluyentes)',
          tiempo: '35 min',
        },
      },
      2: {
        titulo: 'Concurso de Delitos y Delito Continuado',
        descripcion: 'Cuando una conducta o varias conductas generan múltiples delitos. Cómo se calculan las penas en el concurso real e ideal.',
        objetivos: [
          'Distinguir concurso ideal de concurso real de delitos',
          'Aplicar el delito continuado y su diferencia con el concurso',
          'Calcular la pena resultante en cada tipo de concurso',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-concurso', nombre: 'Concurso de Delitos — CP guatemalteco', duracion: '1.5 horas', descripcion: 'Arts. 69-72 CP: concurso ideal, real y delito continuado' },
          { tipo: 'caso', id: 'caso-concurso-delitos', nombre: 'Caso: Concurso real de delitos', duracion: '45 min', descripcion: 'Un sujeto comete robo y lesiones — ¿cómo se sanciona?' },
          { tipo: 'lectura', id: 'cp-arts-69-72', nombre: '📖 CP: Arts. 69-72 (Concurso y delito continuado)', duracion: '35 min', descripcion: 'Reglas de penalidad en concurso ideal y real' },
          { tipo: 'tip', id: 'tip-concurso-delitos', nombre: '🎯 Tip: Concurso ideal vs real', descripcion: 'Ideal = UNA acción genera varios delitos. Real = VARIAS acciones generan varios delitos' },
        ],
        tips: [
          'Concurso ideal: se aplica la pena del delito más grave aumentada hasta en 2/3',
          'Concurso real: se suman las penas pero con límite máximo (50 años en Guatemala)',
          'Delito continuado: misma resolución criminal + varios actos = UN solo delito',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal',
          articulo: 'Arts. 69-72 (Concurso de delitos)',
          tiempo: '30 min',
        },
      },
      3: {
        titulo: 'Circunstancias Agravantes, Atenuantes y Determinación de la Pena',
        descripcion: 'Cómo el juez fija la pena concreta. Las agravantes y atenuantes son la clave para resolver preguntas de penalidad en el examen.',
        objetivos: [
          'Identificar todas las agravantes del Art. 27 CP',
          'Aplicar atenuantes del Art. 26 CP para reducir penas',
          'Calcular la pena concreta aplicando agravantes y atenuantes',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-pena-determinacion', nombre: 'Determinación de la Pena en Guatemala', duracion: '2 horas', descripcion: 'Arts. 26-29 CP + reglas de individualización judicial de la pena' },
          { tipo: 'caso', id: 'caso-determinacion-pena', nombre: 'Caso: Calcula la pena con 3 agravantes', duracion: '50 min', descripcion: 'Ejercicio práctico de individualización de la pena' },
          { tipo: 'lectura', id: 'cp-arts-26-29', nombre: '📖 CP: Arts. 26-29 (Circunstancias)', duracion: '45 min', descripcion: 'Listado completo de agravantes y atenuantes' },
          { tipo: 'actividad', id: 'actividad-agravantes', nombre: '✍️ Actividad: Clasifica 10 circunstancias', duracion: '30 min', descripcion: 'Determina si son agravantes o atenuantes y su efecto' },
        ],
        tips: [
          'Las agravantes NO pueden ser al mismo tiempo elementos del tipo penal',
          'La reincidencia (Art. 27 inc. 20) agrava — pero requiere sentencia ejecutoriada anterior',
          'Cuando concurren ambas (agravantes y atenuantes) el juez las pondera — no se anulan automáticamente',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal',
          articulo: 'Arts. 26-29 (Circunstancias modificativas)',
          tiempo: '40 min',
        },
      },
      4: {
        titulo: 'Delitos Contra la Administración Pública y Corrupción',
        descripcion: 'Cohecho, peculado, abuso de autoridad. Temas de alta frecuencia en Guatemala y en el examen de grado.',
        objetivos: [
          'Identificar los delitos de funcionarios públicos más comunes',
          'Distinguir cohecho activo de cohecho pasivo',
          'Conocer el peculado y sus modalidades',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-admin-publica', nombre: 'Delitos Contra la Administración Pública', duracion: '2 horas', descripcion: 'Arts. 418-452 CP: cohecho, peculado, prevaricato, abuso de autoridad' },
          { tipo: 'caso', id: 'caso-cohecho-penal', nombre: 'Caso: Funcionario que recibe soborno', duracion: '45 min', descripcion: 'Análisis de cohecho pasivo vs peculado' },
          { tipo: 'lectura', id: 'cp-arts-418-452', nombre: '📖 CP: Arts. 418-452 (Administración pública)', duracion: '50 min', descripcion: 'Cohecho, peculado, concusión, prevaricato' },
          { tipo: 'tip', id: 'tip-corrupcion-penal', nombre: '🎯 Tip: Cohecho vs Peculado', descripcion: 'Cohecho = recibir/dar para influir en acto. Peculado = apropiarse de fondos públicos que administra' },
        ],
        tips: [
          'Cohecho pasivo (Art. 439): el funcionario que recibe el soborno',
          'Cohecho activo (Art. 442): el particular que da el soborno',
          'Peculado (Art. 445): requiere que el funcionario ADMINISTRE los fondos que se apropia',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal',
          articulo: 'Arts. 439-452 (Cohecho y peculado)',
          tiempo: '45 min',
        },
      },
      5: {
        titulo: 'Extinción de la Responsabilidad Penal',
        descripcion: 'Cuándo y cómo se extingue la acción penal y la pena. Prescripción, amnistía, indulto y muerte del imputado.',
        objetivos: [
          'Identificar todas las causas de extinción de la responsabilidad penal',
          'Calcular plazos de prescripción según el delito',
          'Distinguir amnistía de indulto y sus efectos',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-extincion', nombre: 'Extinción de la Responsabilidad Penal', duracion: '1.5 horas', descripcion: 'Arts. 101-116 CP: prescripción, muerte, amnistía, indulto, perdón' },
          { tipo: 'caso', id: 'caso-prescripcion-penal', nombre: 'Caso: ¿Prescribió el delito?', duracion: '40 min', descripcion: 'Calcula si la acción penal ya prescribió según los plazos del CP' },
          { tipo: 'lectura', id: 'cp-arts-101-116', nombre: '📖 CP: Arts. 101-116 (Extinción)', duracion: '40 min', descripcion: 'Causas de extinción de la responsabilidad penal y la pena' },
          { tipo: 'tip', id: 'tip-prescripcion-penal', nombre: '🎯 Tip: Plazos de prescripción', descripcion: 'Prescripción = tiempo máximo de pena para delitos con pena privativa; mínimo 1 año, máximo igual al máximo de la pena señalada' },
        ],
        tips: [
          'La prescripción empieza desde que se cometió el delito (salvo excepciones)',
          'Los delitos de lesa humanidad son IMPRESCRIPTIBLES en Guatemala',
          'Amnistía: extingue el delito. Indulto: solo extingue la pena (el delito subsiste)',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal',
          articulo: 'Arts. 101-108 (Prescripción de la responsabilidad)',
          tiempo: '35 min',
        },
      },
      6: {
        titulo: 'Proceso Penal Intermedio: Etapas y Recursos',
        descripcion: 'Profundiza en el CPP guatemalteco. Etapas, medidas coercitivas, recursos y el debate oral son el núcleo del proceso penal.',
        objetivos: [
          'Dominar las etapas del proceso penal y sus plazos',
          'Conocer las medidas coercitivas (prisión preventiva, arresto)',
          'Identificar los recursos procesales penales',
        ],
        recursos: [
          { tipo: 'material', id: 'cpp-intermedio', nombre: 'Proceso Penal Guatemalteco — Nivel Intermedio', duracion: '2.5 horas', descripcion: 'CPP Decreto 51-92: etapas, plazos, sujetos, recursos' },
          { tipo: 'caso', id: 'caso-proceso-penal-inter', nombre: 'Caso: Desde la denuncia hasta el debate', duracion: '1 hora', descripcion: 'Seguimiento completo de un caso penal por sus etapas' },
          { tipo: 'lectura', id: 'cpp-arts-etapas', nombre: '📖 CPP: Arts. 309-396 (Etapas del proceso)', duracion: '50 min', descripcion: 'Preparatoria, intermedia, juicio oral y sentencia' },
          { tipo: 'actividad', id: 'actividad-etapas-penal-inter', nombre: '✍️ Actividad: Dibuja el diagrama del proceso penal', duracion: '30 min', descripcion: 'Esquematiza etapas, plazos y sujetos de cada fase' },
        ],
        tips: [
          'Prisión preventiva: máximo 3 meses en delitos menos graves, puede prorrogarse',
          'La etapa intermedia decide si hay mérito para ir a juicio oral (audiencia de ofrecimiento de prueba)',
          'Recursos en proceso penal: apelación, apelación especial, casación',
        ],
        lecturaRecomendada: {
          titulo: 'Código Procesal Penal (CPP)',
          articulo: 'Arts. 309-330 (Etapa preparatoria), Arts. 331-346 (Etapa intermedia)',
          tiempo: '50 min',
        },
      },
      7: {
        titulo: 'Jurisprudencia Penal y Casos Emblemáticos en Guatemala',
        descripcion: 'Los casos penales más importantes de Guatemala y cómo la jurisprudencia de la CSJ y CC ha definido el derecho penal actual.',
        objetivos: [
          'Conocer los criterios jurisprudenciales de la CSJ en materia penal',
          'Aplicar sentencias clave en el análisis de casos de examen',
          'Identificar tendencias del derecho penal guatemalteco',
        ],
        recursos: [
          { tipo: 'material', id: 'jurisprudencia-penal-gt', nombre: 'Jurisprudencia Penal Guatemalteca', duracion: '2 horas', descripcion: 'Sentencias clave de CSJ y CC en materia penal 2010-2024' },
          { tipo: 'caso', id: 'caso-penal-emblematico', nombre: 'Caso: Análisis de sentencia real de la CSJ', duracion: '1 hora', descripcion: 'Lectura y análisis de holding y ratio decidendi' },
          { tipo: 'actividad', id: 'actividad-ficha-penal', nombre: '✍️ Actividad: Ficha de jurisprudencia penal', duracion: '45 min', descripcion: 'Elabora fichas de las 5 sentencias más relevantes' },
          { tipo: 'tip', id: 'tip-jurisprudencia-penal', nombre: '🎯 Tip: Cómo leer una sentencia penal', descripcion: 'Identifica: hechos → norma aplicada → ratio decidendi → fallo' },
        ],
        tips: [
          'En el examen pueden preguntar sobre criterios de la CC en materia penal (amparo en proceso penal)',
          'La CC ha resuelto casos sobre prisión preventiva excesiva y debido proceso',
          'Practica identificar el "holding" (regla aplicable) de cada sentencia',
        ],
        lecturaRecomendada: {
          titulo: 'Sentencias CSJ + Gaceta de la CC',
          articulo: 'Selección de fallos penales relevantes 2015-2024',
          tiempo: '60 min',
        },
      },
      8: {
        titulo: 'Simulacro Final Penal Intermedio',
        descripcion: 'Examen completo de Derecho Penal nivel intermedio. Teoría del delito, delitos específicos, proceso penal y jurisprudencia.',
        objetivos: [
          'Medir el dominio real de todos los temas penales',
          'Identificar áreas débiles para refuerzo final',
          'Ganar confianza con un simulacro de examen real',
        ],
        recursos: [
          { tipo: 'quiz', id: 'simulacro-penal-intermedio', nombre: 'Simulacro Penal Intermedio (35 preguntas)', duracion: '2.5 horas', descripcion: 'Preguntas de todos los temas con nivel de dificultad intermedio-alto' },
          { tipo: 'actividad', id: 'actividad-post-simulacro-penal', nombre: '✍️ Actividad: Análisis de errores del simulacro', duracion: '1 hora', descripcion: 'Identifica patrones de error y refuerza esos temas' },
          { tipo: 'tip', id: 'tip-examen-penal-final', nombre: '🎯 Tip: Estrategia para el examen de Derecho Penal', descripcion: 'Lee bien el tipo penal antes de responder — muchas preguntas dependen de un solo elemento' },
          { tipo: 'glosario', id: 'glosario-penal-repaso', nombre: '📚 Glosario Penal: Repaso Rápido', duracion: '30 min', descripcion: 'Los 30 términos más preguntados en exámenes penales' },
        ],
        tips: [
          'Meta intermedia: 70%+ en el simulacro antes del examen real',
          'Refuerza siempre teoría del delito — es la base de TODAS las preguntas',
          'Si vas a examen de privado: recuerda que el penal es solo UNA de las materias',
        ],
        lecturaRecomendada: {
          titulo: 'Repaso general de los 7 temas anteriores',
          articulo: 'Enfócate en lo que fallaste en el simulacro',
          tiempo: '90 min',
        },
      },
    },
    avanzada: {
      1: {
        titulo: 'Dogmática Penal Avanzada: Imputación Objetiva y Teorías del Delito',
        descripcion: 'Más allá del finalismo. Teoría de la imputación objetiva, funcionalismo de Roxin y Jakobs. El nivel que distingue al experto.',
        objetivos: [
          'Comprender la teoría de la imputación objetiva y su aplicación práctica',
          'Distinguir el sistema finalista del funcionalista en el CP guatemalteco',
          'Analizar conductas atípicas con criterios doctrinarios avanzados',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-imputacion-objetiva', nombre: 'Imputación Objetiva en el Derecho Penal guatemalteco', duracion: '3 horas', descripcion: 'Criterios de Roxin: creación de riesgo no permitido, realización del riesgo, fin de protección de la norma' },
          { tipo: 'lectura', id: 'doctrina-penal-avanzada', nombre: '📖 Roxin, Jakobs y Zaffaroni — síntesis guatemalteca', duracion: '2 horas', descripcion: 'Comparación de sistemas y su incidencia en la jurisprudencia nacional' },
          { tipo: 'actividad', id: 'actividad-imputacion-objetiva', nombre: '✍️ Actividad: Aplica imputación objetiva a 4 casos', duracion: '1.5 horas', descripcion: 'Determina si hay imputación objetiva del resultado en cada caso' },
          { tipo: 'tip', id: 'tip-imputacion-objetiva', nombre: '🎯 Tip: Los 3 filtros de la imputación objetiva', descripcion: '1. ¿Creó riesgo no permitido? 2. ¿Se realizó ese riesgo en el resultado? 3. ¿El resultado está en el ámbito de protección de la norma?' },
        ],
        tips: [
          'La imputación objetiva responde cuándo un resultado ES jurídicamente atribuible a la conducta',
          'Riesgo permitido: conductas socialmente adecuadas (cirugía, tráfico) no son típicas aunque causen daño',
          'La CSJ guatemalteca ha empezado a usar criterios de imputación objetiva — cítalo en el examen',
        ],
        lecturaRecomendada: {
          titulo: 'Claus Roxin — Derecho Penal Parte General (Tomo I)',
          articulo: 'Cap. 11: Imputación objetiva del resultado',
          tiempo: '90 min',
        },
      },
      2: {
        titulo: 'Autoría y Participación: Análisis Dogmático Profundo',
        descripcion: 'La autoría mediata, el dominio del hecho y las estructuras de organizaciones criminales. Nivel de litigación real.',
        objetivos: [
          'Dominar la teoría del dominio del hecho de Roxin',
          'Aplicar la autoría mediata en estructuras organizadas de poder',
          'Distinguir coautoría de participación necesaria en casos complejos',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-autoria-mediata', nombre: 'Autoría Mediata y Dominio del Hecho', duracion: '2.5 horas', descripcion: 'Teoría de Roxin aplicada al CP guatemalteco: autor detrás del autor' },
          { tipo: 'caso', id: 'caso-autoria-mediata-gt', nombre: 'Caso: Estructura criminal organizada en Guatemala', duracion: '1 hora', descripcion: 'Análisis de responsabilidad penal en estructuras jerárquicas de crimen organizado' },
          { tipo: 'lectura', id: 'cp-arts-35-40-avanzado', nombre: '📖 CP Arts. 35-40 — Lectura dogmática avanzada', duracion: '1 hora', descripcion: 'Interpretación doctrinal de los artículos de participación criminal' },
          { tipo: 'actividad', id: 'actividad-autoria-participacion', nombre: '✍️ Actividad: Califica la conducta de 5 intervinientes', duracion: '1 hora', descripcion: 'Determina autor, coautor, cómplice o instigador en un caso complejo' },
        ],
        tips: [
          'Autor mediato = usa a otro como instrumento (que actúa sin dolo, bajo error o coacción)',
          'Dominio del hecho: quien puede decidir si el delito se comete, continúa o se interrumpe',
          'En crimen organizado guatemalteco (Ley contra el Crimen Organizado Decreto 21-2006) hay normas específicas',
        ],
        lecturaRecomendada: {
          titulo: 'Ley Contra la Delincuencia Organizada (Decreto 21-2006)',
          articulo: 'Arts. 1-10 (Delitos de crimen organizado y sus penas)',
          tiempo: '60 min',
        },
      },
      3: {
        titulo: 'Delitos Económicos, Lavado de Dinero y Crimen Organizado',
        descripcion: 'El derecho penal económico en Guatemala. Lavado de dinero, defraudación tributaria y crimen organizado son los delitos de mayor complejidad procesal.',
        objetivos: [
          'Identificar los elementos del delito de lavado de dinero (Decreto 67-2001)',
          'Conocer los tipos penales del crimen organizado en Guatemala',
          'Analizar la defraudación tributaria y sus modalidades',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-economico-gt', nombre: 'Derecho Penal Económico Guatemalteco', duracion: '2.5 horas', descripcion: 'Ley Contra el Lavado de Dinero (Decreto 67-2001), crimen organizado, defraudación tributaria' },
          { tipo: 'lectura', id: 'ley-lavado-dinero', nombre: '📖 Decreto 67-2001: Ley Contra el Lavado de Dinero', duracion: '1.5 horas', descripcion: 'Arts. 1-18: tipos penales, sanciones, decomiso, extinción de dominio' },
          { tipo: 'caso', id: 'caso-lavado-dinero-gt', nombre: 'Caso: Lavado de activos con estructura empresarial', duracion: '1 hora', descripcion: 'Análisis penal y procesal de un caso complejo de lavado' },
          { tipo: 'tip', id: 'tip-lavado-dinero', nombre: '🎯 Tip: Los 3 elementos del lavado de dinero', descripcion: '1. Origen ilícito de los bienes 2. Actos de ocultación/conversión 3. Conocimiento del origen' },
        ],
        tips: [
          'Lavado: el delito previo (precedente) no necesita ser condenado — basta probable comisión',
          'Extinción de dominio: proceso autónomo al penal, recae sobre los bienes sin importar condena',
          'El MPRECC (Ministerio Público) y SAT tienen competencia concurrente en defraudación tributaria',
        ],
        lecturaRecomendada: {
          titulo: 'Decreto 67-2001 + Ley de Extinción de Dominio (Decreto 55-2010)',
          articulo: 'Arts. 1-15 Lavado, Arts. 1-20 Extinción de dominio',
          tiempo: '75 min',
        },
      },
      4: {
        titulo: 'Derecho Procesal Penal Avanzado: Litigación Oral y Estrategia',
        descripcion: 'El debate oral desde adentro. Técnicas de litigación, teoría del caso, examen y contraexamen. El nivel del litigante experto.',
        objetivos: [
          'Construir una teoría del caso sólida para el debate oral',
          'Dominar técnicas de interrogatorio y contrainterrogatorio',
          'Conocer las nulidades procesales y cómo plantearlas',
        ],
        recursos: [
          { tipo: 'material', id: 'litigacion-penal-oral', nombre: 'Litigación Penal Oral en Guatemala', duracion: '3 horas', descripcion: 'Teoría del caso, alegato de apertura, examen directo, contraexamen, alegato de clausura' },
          { tipo: 'caso', id: 'caso-litigacion-penal-avanzado', nombre: 'Caso: Planifica la defensa en un caso penal complejo', duracion: '1.5 horas', descripcion: 'Construye teoría del caso, identifica pruebas y prepara el contraexamen' },
          { tipo: 'actividad', id: 'actividad-teoria-caso-penal', nombre: '✍️ Actividad: Escribe la teoría del caso de defensa', duracion: '1 hora', descripcion: 'Redacta la teoría del caso en una página: hechos, norma, argumento, prueba' },
          { tipo: 'lectura', id: 'cpp-debate-oral-avanzado', nombre: '📖 CPP Arts. 356-396 (Debate oral y sentencia)', duracion: '1 hora', descripcion: 'Nulidades, incidentes, prueba anticipada y sentencia' },
        ],
        tips: [
          'Teoría del caso: relato simple, lógico y creíble de LO QUE PASÓ según tu cliente',
          'En el contraexamen: preguntas cerradas, controla la respuesta, no preguntes lo que no sabes',
          'Nulidad procesal: debe causarte agravio real y no haber sido convalidada',
        ],
        lecturaRecomendada: {
          titulo: 'Manual de Litigación Penal Oral — USAID/Guatemala',
          articulo: 'Caps. 3-5: Teoría del caso, alegatos y examen de testigos',
          tiempo: '90 min',
        },
      },
      5: {
        titulo: 'Medidas Alternativas, Salidas Procesales y Derecho Penitenciario',
        descripcion: 'El proceso penal no siempre termina en juicio oral. Criterio de oportunidad, suspensión condicional, mediación penal y el sistema penitenciario guatemalteco.',
        objetivos: [
          'Identificar todas las salidas alternativas al juicio oral en el CPP',
          'Aplicar los criterios de procedencia del criterio de oportunidad',
          'Conocer el sistema penitenciario y los derechos del interno',
        ],
        recursos: [
          { tipo: 'material', id: 'penal-salidas-alternativas', nombre: 'Salidas Alternativas en el Proceso Penal GT', duracion: '2 horas', descripcion: 'CPP: criterio de oportunidad (Art. 25), suspensión condicional (Art. 27), mediación penal' },
          { tipo: 'lectura', id: 'cpp-arts-25-27-alternativas', nombre: '📖 CPP Arts. 25-27: Salidas alternativas', duracion: '1 hora', descripcion: 'Criterio de oportunidad, conversión de la acción, suspensión condicional' },
          { tipo: 'caso', id: 'caso-criterio-oportunidad', nombre: 'Caso: ¿Aplica criterio de oportunidad?', duracion: '45 min', descripcion: 'Análisis de procedencia según el tipo de delito y las condiciones del imputado' },
          { tipo: 'tip', id: 'tip-salidas-alternativas', nombre: '🎯 Tip: Criterio de oportunidad vs Suspensión condicional', descripcion: 'Criterio de oportunidad: MP renuncia a la persecución. Suspensión: proceso se suspende, imputado cumple condiciones' },
        ],
        tips: [
          'Criterio de oportunidad NO procede en delitos que afecten intereses del Estado o delitos graves',
          'Suspensión condicional: el juez fija condiciones (reparación del daño, servicios comunitarios)',
          'Si el imputado incumple las condiciones, se reactiva el proceso — no pierde su derecho a juicio',
        ],
        lecturaRecomendada: {
          titulo: 'Código Procesal Penal',
          articulo: 'Arts. 25-27 (Criterio de oportunidad y suspensión condicional)',
          tiempo: '50 min',
        },
      },
      6: {
        titulo: 'Jurisprudencia Penal Avanzada: CC, CSJ y CIDH',
        descripcion: 'El derecho penal guatemalteco en diálogo con la jurisprudencia internacional. La Corte IDH ha condicionado el sistema penal guatemalteco en temas clave.',
        objetivos: [
          'Conocer los fallos de la CIDH que vinculan al Estado guatemalteco en materia penal',
          'Analizar la jurisprudencia de la CC sobre garantías procesales penales',
          'Aplicar el control de convencionalidad en argumentos penales',
        ],
        recursos: [
          { tipo: 'material', id: 'jurisprudencia-cidh-penal', nombre: 'CIDH y Derecho Penal Guatemalteco', duracion: '2.5 horas', descripcion: 'Casos CIDH vs Guatemala: Mack Chang, Molina Thiessen, Ríos Montt — impacto en el sistema penal' },
          { tipo: 'lectura', id: 'cc-garantias-penales', nombre: '📖 CC: Garantías constitucionales en el proceso penal', duracion: '1.5 horas', descripcion: 'Derecho de defensa, presunción de inocencia, debido proceso — sentencias CC' },
          { tipo: 'actividad', id: 'actividad-control-convencionalidad', nombre: '✍️ Actividad: Aplica control de convencionalidad', duracion: '1 hora', descripcion: 'Identifica si una norma penal guatemalteca es convencional según la CADH y jurisprudencia CIDH' },
          { tipo: 'tip', id: 'tip-cidh-penal', nombre: '🎯 Tip: Control de convencionalidad en el examen', descripcion: 'Si la norma nacional contradice la CADH o la jurisprudencia CIDH, el juez debe inaplicarla (Almonacid Arellano vs Chile)' },
        ],
        tips: [
          'Presunción de inocencia: el imputado no prueba su inocencia — el MP prueba su culpabilidad',
          'Prisión preventiva excesiva = violación al Art. 7 y 8 CADH (libertad personal y garantías judiciales)',
          'En Guatemala: Caso Mack Chang (2003), Caso Molina Thiessen (2004) son los más citados en CIDH',
        ],
        lecturaRecomendada: {
          titulo: 'Sentencias CIDH vs Guatemala + Gaceta CC (materia penal)',
          articulo: 'Caso Mack Chang, Caso Molina Thiessen, Caso Tiu Tojín',
          tiempo: '90 min',
        },
      },
      7: {
        titulo: 'Casos Penales Complejos: Metodología de Resolución Experta',
        descripcion: 'Casos de examen de nivel máximo. Delitos pluriofensivos, concurso de leyes, conflictos normativos y casos con múltiples imputados.',
        objetivos: [
          'Resolver casos penales con múltiples delitos y partícipes en 30 minutos',
          'Aplicar reglas de concurso de leyes penales (especialidad, consunción, subsidiariedad)',
          'Construir argumentos de defensa y acusación simultáneamente',
        ],
        recursos: [
          { tipo: 'caso', id: 'caso-penal-complejo-1', nombre: 'Caso Experto 1: Homicidio + robo + lavado', duracion: '1 hora', descripcion: 'Determina delitos, calificantes, participación y pena aplicable' },
          { tipo: 'caso', id: 'caso-penal-complejo-2', nombre: 'Caso Experto 2: Funcionario + corrupción + crimen organizado', duracion: '1 hora', descripcion: 'Delitos contra la administración pública en estructura organizada' },
          { tipo: 'actividad', id: 'actividad-defensa-acusacion', nombre: '✍️ Actividad: Escribe acusación y defensa del mismo caso', duracion: '1.5 horas', descripcion: 'Construye los dos argumentos — dominar ambos lados es el nivel experto' },
          { tipo: 'tip', id: 'tip-concurso-leyes-penales', nombre: '🎯 Tip: Reglas del concurso de leyes penales', descripcion: 'Especialidad: la norma específica desplaza a la general. Consunción: el delito mayor absorbe al menor. Subsidiariedad: la norma secundaria solo aplica si no aplica la principal' },
        ],
        tips: [
          'Concurso de leyes (un hecho, varias normas) ≠ concurso de delitos (varios hechos)',
          'Principio de especialidad: asesinato desplaza homicidio aunque compartan elementos',
          'En el examen avanzado: argumenta siempre desde ambos lados antes de concluir',
        ],
        lecturaRecomendada: {
          titulo: 'Código Penal + Leyes especiales aplicables',
          articulo: 'Repaso integrado: CP, CPP, Ley Lavado, Ley Crimen Organizado',
          tiempo: '90 min',
        },
      },
      8: {
        titulo: 'Simulacro Final Avanzado: 40 Preguntas Nivel Experto en Penal',
        descripcion: 'El simulacro más exigente del plan de penal. Dogmática, casos complejos, jurisprudencia nacional e internacional. Modo examen real.',
        objetivos: [
          'Alcanzar precisión y velocidad de nivel experto en Derecho Penal',
          'Medir el dominio real de todos los temas penales avanzados',
          'Afinar la estrategia personal para el examen de grado',
        ],
        recursos: [
          { tipo: 'quiz', id: 'simulacro-penal-avanzado', nombre: 'Simulacro Penal Avanzado (40 preguntas)', duracion: '2.5 horas', descripcion: 'Dogmática, casos, jurisprudencia nacional e internacional, nivel experto' },
          { tipo: 'actividad', id: 'actividad-post-simulacro-penal-av', nombre: '✍️ Actividad: Plan de acción post-simulacro', duracion: '45 min', descripcion: 'Identifica los 3 temas débiles restantes y crea un plan de refuerzo de 48 horas' },
          { tipo: 'tip', id: 'tip-examen-penal-avanzado', nombre: '🎯 Tip: Estrategia para examen de Penal nivel experto', descripcion: 'Primero resuelve los casos que más dominas, deja los de duda para el final, siempre argumenta aunque no recuerdes el artículo exacto' },
          { tipo: 'glosario', id: 'glosario-penal-avanzado', nombre: '📚 Glosario Penal Avanzado — Repaso Final', duracion: '45 min', descripcion: 'Imputación objetiva, autoría mediata, dominio del hecho, extinción de dominio, control de convencionalidad' },
        ],
        tips: [
          'Meta avanzada: 80%+ en el simulacro — si no llegas, refuerza una semana más',
          'Usa jurisprudencia CIDH en tus argumentos — los examinadores avanzados la valoran',
          'Duerme bien, come ligero, llega temprano — el conocimiento ya lo tienes',
        ],
        lecturaRecomendada: {
          titulo: 'Repaso final integral de Derecho Penal',
          articulo: 'Teoría del delito → delitos específicos → proceso penal → jurisprudencia',
          tiempo: '120 min',
        },
      },
    },
  },
  laboral: {
    basica: {
      1: {
        titulo: 'Fundamentos del Derecho Laboral Guatemalteco',
        descripcion: 'El Código de Trabajo (Decreto 1441) y sus principios. La base que protege a todo trabajador en Guatemala.',
        objetivos: [
          'Conocer los principios del derecho laboral guatemalteco',
          'Identificar las fuentes del derecho de trabajo',
          'Comprender la estructura del Código de Trabajo',
        ],
        recursos: [
          { tipo: 'glosario', id: 'glosario-laboral-basico', nombre: 'Glosario Laboral (términos esenciales)', duracion: '2 horas', descripcion: 'Trabajador, patrono, contrato, salario, jornada, prestaciones, sindicato, huelga' },
          { tipo: 'material', id: 'laboral-principios', nombre: 'Principios del Derecho Laboral guatemalteco', duracion: '1.5 horas', descripcion: 'Tutelaridad, irrenunciabilidad, imperatividad, realismo, sencillez' },
          { tipo: 'lectura', id: 'ct-arts-1-19', nombre: '📖 Código de Trabajo: Arts. 1-19 (Principios)', duracion: '40 min', descripcion: 'Principios rectores y campo de aplicación del CT' },
        ],
        tips: [
          'Principio tutelar: el CT protege al trabajador — en caso de duda, siempre favorece al trabajador',
          'Irrenunciabilidad: el trabajador NO puede renunciar a sus derechos mínimos aunque lo firme',
          'El derecho laboral es de orden público — ningún contrato puede pactar menos que lo que dice el CT',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo de Guatemala (Decreto 1441)',
          articulo: 'Arts. 1-19 (Principios fundamentales)',
          tiempo: '35 min',
        },
      },
      2: {
        titulo: 'El Contrato Individual de Trabajo',
        descripcion: 'Cómo nace la relación laboral, qué elementos la caracterizan y qué debe contener el contrato. La base de toda disputa laboral.',
        objetivos: [
          'Identificar los elementos del contrato individual de trabajo',
          'Distinguir el contrato laboral de otras figuras (prestación de servicios)',
          'Conocer los requisitos formales y tipos de contrato',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-contrato-individual', nombre: 'Contrato Individual de Trabajo', duracion: '2 horas', descripcion: 'CT Arts. 18-45: elementos, tipos, forma y contenido del contrato' },
          { tipo: 'caso', id: 'caso-contrato-laboral', nombre: 'Caso: ¿Contrato laboral o de servicios?', duracion: '40 min', descripcion: 'Análisis de los elementos de subordinación y dependencia económica' },
          { tipo: 'lectura', id: 'ct-arts-18-45', nombre: '📖 CT: Arts. 18-45 (Contrato individual)', duracion: '45 min', descripcion: 'Elementos, contenido mínimo y presunción de contrato' },
          { tipo: 'tip', id: 'tip-contrato-laboral', nombre: '🎯 Tip: Los 3 elementos del contrato laboral', descripcion: '1. Prestación personal del servicio 2. Subordinación jurídica 3. Remuneración — si los 3 están presentes, es laboral aunque se llame "honorarios"' },
        ],
        tips: [
          'La subordinación es el elemento CLAVE que distingue lo laboral de lo civil',
          'El contrato laboral puede ser verbal — igual es válido y genera todos los derechos',
          'Presunción de laboralidad (Art. 19 CT): si hay duda, se presume que hay contrato de trabajo',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 18-30 (Contrato individual de trabajo)',
          tiempo: '40 min',
        },
      },
      3: {
        titulo: 'Jornadas de Trabajo, Descansos y Salario',
        descripcion: 'Cuántas horas puede trabajar un guatemalteco, cuándo descansa y cuánto debe ganarle. Los derechos más básicos y más violados.',
        objetivos: [
          'Conocer los tipos de jornada y sus límites legales',
          'Identificar los descansos obligatorios y días de asueto',
          'Calcular el salario mínimo y sus componentes',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-jornada-salario', nombre: 'Jornadas, Descansos y Salario Mínimo', duracion: '2 horas', descripcion: 'CT Arts. 102-130: jornadas diurna/nocturna/mixta, descanso semanal, salario mínimo' },
          { tipo: 'documento', id: 'liquidacion', nombre: 'Calculadora de Salario y Prestaciones', duracion: '1 hora', descripcion: 'Practica el cálculo de salario ordinario, horas extra y bonificaciones' },
          { tipo: 'lectura', id: 'ct-arts-102-130', nombre: '📖 CT: Arts. 102-130 (Jornada y salario)', duracion: '45 min', descripcion: 'Jornadas, horas extra, salario mínimo, bonificación incentivo' },
          { tipo: 'actividad', id: 'actividad-calculo-jornada', nombre: '✍️ Actividad: Calcula horas extra de 3 casos', duracion: '30 min', descripcion: 'Aplica las reglas de jornada del CT a situaciones reales' },
        ],
        tips: [
          'Jornada diurna: máx. 8 horas/día, 44 horas/semana. Nocturna: máx. 6 horas/día, 36 h/semana',
          'Horas extra: se pagan con un 50% de recargo sobre el salario ordinario',
          'Bonificación incentivo (Dto. 78-89): Q250 mensuales mínimo, NO forma parte del salario base para prestaciones',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 102-116 (Jornadas), Arts. 88-101 (Salario)',
          tiempo: '45 min',
        },
      },
      4: {
        titulo: 'Prestaciones Laborales: Vacaciones, Aguinaldo y Bono 14',
        descripcion: 'Los derechos económicos irrenunciables de todo trabajador guatemalteco. Aprende a calcularlos — es lo que más se pregunta en el examen.',
        objetivos: [
          'Calcular correctamente vacaciones, aguinaldo y bono 14',
          'Identificar qué salario se toma de base para cada prestación',
          'Conocer los plazos y forma de pago de cada prestación',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-prestaciones', nombre: 'Prestaciones Laborales Obligatorias', duracion: '1.5 horas', descripcion: 'Vacaciones (CT Arts. 130-136), Aguinaldo (Dto. 76-78), Bono 14 (Dto. 42-92)' },
          { tipo: 'documento', id: 'liquidacion', nombre: 'Calculadora de Prestaciones Laborales', duracion: '1 hora', descripcion: 'Calcula vacaciones, aguinaldo y bono 14 con casos reales' },
          { tipo: 'lectura', id: 'dto-76-78-42-92', nombre: '📖 Decreto 76-78 (Aguinaldo) + Decreto 42-92 (Bono 14)', duracion: '35 min', descripcion: 'Montos, plazos de pago y base de cálculo' },
          { tipo: 'actividad', id: 'actividad-calculo-prestaciones', nombre: '✍️ Actividad: Calcula las 3 prestaciones de un trabajador', duracion: '45 min', descripcion: 'Caso práctico con salario, fecha de ingreso y egreso reales' },
        ],
        tips: [
          'Vacaciones: 15 días hábiles después de 1 año de trabajo continuo',
          'Aguinaldo (Dto. 76-78): 100% del salario mensual, se paga en diciembre (15 días antes de Navidad)',
          'Bono 14 (Dto. 42-92): 100% del salario mensual, se paga en julio (antes del 15)',
        ],
        lecturaRecomendada: {
          titulo: 'CT Arts. 130-136 + Decreto 76-78 + Decreto 42-92',
          articulo: 'Vacaciones, aguinaldo y bono anual',
          tiempo: '40 min',
        },
      },
      5: {
        titulo: 'Terminación del Contrato y Liquidación Laboral',
        descripcion: 'Cómo termina la relación laboral y qué le corresponde al trabajador. La liquidación es lo más práctico y lo más preguntado.',
        objetivos: [
          'Distinguir terminación justificada de injustificada',
          'Calcular la indemnización y la liquidación completa',
          'Conocer las causas de despido justificado (Art. 77 CT)',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-terminacion', nombre: 'Terminación del Contrato de Trabajo', duracion: '2 horas', descripcion: 'CT Arts. 76-87: causas justas de despido, renuncia, mutuo acuerdo, indemnización' },
          { tipo: 'caso', id: 'caso-despido', nombre: 'Caso: Despido injustificado — calcula la liquidación', duracion: '45 min', descripcion: 'Aplica la fórmula de indemnización + prestaciones' },
          { tipo: 'documento', id: 'liquidacion', nombre: 'Calculadora de Liquidación Laboral', duracion: '1 hora', descripcion: 'Calcula indemnización, vacaciones, aguinaldo y bono proporcionales' },
          { tipo: 'lectura', id: 'ct-arts-76-87', nombre: '📖 CT: Arts. 76-87 (Terminación del contrato)', duracion: '40 min', descripcion: 'Causas justas de despido, dimisión y sus efectos' },
        ],
        tips: [
          'Indemnización = 1 mes de salario por año trabajado (o fracción mayor a 6 meses)',
          'Renuncia voluntaria: NO hay indemnización, pero sí vacaciones, aguinaldo y bono proporcionales',
          'Despido injustificado: indemnización + 30 días de preaviso (o pago en su lugar)',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 76-86 (Terminación) + Art. 82 (Indemnización)',
          tiempo: '40 min',
        },
      },
      6: {
        titulo: 'Trabajo de Menores, Mujeres y Trabajadores del Hogar',
        descripcion: 'Grupos especialmente protegidos por el CT guatemalteco. Preguntas frecuentes en el examen sobre estas categorías especiales.',
        objetivos: [
          'Conocer las restricciones del trabajo de menores en Guatemala',
          'Identificar los derechos especiales de la mujer trabajadora',
          'Entender el régimen de los trabajadores del hogar',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-grupos-especiales', nombre: 'Trabajo de Menores, Mujeres y Hogar', duracion: '1.5 horas', descripcion: 'CT Arts. 147-163: trabajo de mujeres. Arts. 164-166: menores. Arts. 161-168: trabajadores del hogar' },
          { tipo: 'caso', id: 'caso-despido-embarazo', nombre: 'Caso: Despido de trabajadora embarazada', duracion: '40 min', descripcion: 'Análisis de inamovilidad por maternidad y sus efectos' },
          { tipo: 'lectura', id: 'ct-arts-147-168', nombre: '📖 CT: Arts. 147-168 (Grupos especiales)', duracion: '40 min', descripcion: 'Protección de la maternidad, trabajo nocturno de menores, reglas del hogar' },
          { tipo: 'tip', id: 'tip-inamovilidad', nombre: '🎯 Tip: Inamovilidad por embarazo', descripcion: 'La trabajadora embarazada no puede ser despedida desde que notifica el embarazo hasta 10 meses después del parto' },
        ],
        tips: [
          'Menores de 14 años: NO pueden trabajar en Guatemala (con excepciones del MINTRAB)',
          'Descanso prenatal: 30 días antes del parto. Posnatal: 54 días después — con goce de salario',
          'Trabajadores del hogar: tienen los mismos derechos básicos del CT, con reglas especiales de jornada',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 147-163 (Mujer), Arts. 164-166 (Menores)',
          tiempo: '40 min',
        },
      },
      7: {
        titulo: 'Proceso Laboral Oral y Juzgados de Trabajo',
        descripcion: 'Cómo funciona el proceso laboral guatemalteco. Oral, rápido y pro-trabajador. Lo que necesitas saber para el examen.',
        objetivos: [
          'Conocer las etapas del proceso laboral ordinario oral',
          'Identificar los juzgados competentes y sus funciones',
          'Entender las medidas cautelares en materia laboral',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-proceso-oral', nombre: 'Proceso Laboral Oral Guatemalteco', duracion: '2 horas', descripcion: 'CT Arts. 321-422: etapas, demanda, conciliación, prueba, sentencia' },
          { tipo: 'caso', id: 'caso-demanda-laboral', nombre: 'Caso: Planifica la demanda laboral', duracion: '45 min', descripcion: 'Estructura la demanda por despido injustificado con todas sus pretensiones' },
          { tipo: 'lectura', id: 'ct-arts-321-350', nombre: '📖 CT: Arts. 321-350 (Proceso ordinario laboral)', duracion: '45 min', descripcion: 'Demanda, contestación, conciliación, recepción de prueba' },
          { tipo: 'tip', id: 'tip-proceso-laboral', nombre: '🎯 Tip: Conciliación en el proceso laboral', descripcion: 'Es OBLIGATORIA en la primera audiencia — el juez debe intentarla antes de continuar el proceso' },
        ],
        tips: [
          'El proceso laboral es ORAL y concentrado — todo se hace en audiencia',
          'Prescripción laboral: 2 años para reclamar derechos (Art. 258 CT)',
          'La carga de la prueba en laboral: el patrono debe probar el despido justificado',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 321-344 (Proceso ordinario laboral oral)',
          tiempo: '45 min',
        },
      },
      8: {
        titulo: 'Simulacro Final Laboral Básico',
        descripcion: 'Examen completo de Derecho Laboral nivel básico. Contrato, prestaciones, terminación, grupos especiales y proceso laboral.',
        objetivos: [
          'Medir el dominio de todos los temas laborales básicos',
          'Practicar cálculo de prestaciones bajo presión de tiempo',
          'Identificar áreas débiles para refuerzo final',
        ],
        recursos: [
          { tipo: 'quiz', id: 'simulacro-laboral-basico', nombre: 'Simulacro Laboral Básico (25 preguntas)', duracion: '2 horas', descripcion: 'Preguntas de contrato, prestaciones, terminación, proceso laboral' },
          { tipo: 'documento', id: 'liquidacion', nombre: 'Calculadora: Liquidación completa de práctica', duracion: '45 min', descripcion: 'Resuelve 3 liquidaciones diferentes como repaso final' },
          { tipo: 'tip', id: 'tip-examen-laboral-basico', nombre: '🎯 Tip: Lo más preguntado en Derecho Laboral', descripcion: 'Cálculo de prestaciones, causas de despido justo e injusto, plazos de pago y prescripción' },
          { tipo: 'actividad', id: 'actividad-repaso-laboral-basico', nombre: '✍️ Actividad: Repaso de casos prácticos', duracion: '45 min', descripcion: 'Resuelve 4 casos cortos de situaciones laborales reales en Guatemala' },
        ],
        tips: [
          'Meta básico: 65%+ en el simulacro antes de avanzar',
          'Memoriza las fórmulas de prestaciones — siempre caen en el examen',
          'Recuerda: en laboral la duda favorece al trabajador (principio de tutelaridad)',
        ],
        lecturaRecomendada: {
          titulo: 'Repaso de los 7 temas anteriores',
          articulo: 'Enfócate en los cálculos de prestaciones y las causas de terminación',
          tiempo: '60 min',
        },
      },
    },
    intermedia: {
      1: {
        titulo: 'Contratos Especiales de Trabajo y Trabajo a Domicilio',
        descripcion: 'Más allá del contrato ordinario. Trabajo por obra, a destajo, en el extranjero, temporal y a domicilio — cada uno con sus reglas propias.',
        objetivos: [
          'Identificar los tipos de contratos especiales del CT',
          'Aplicar las reglas específicas del trabajo a domicilio y por obra',
          'Conocer la protección de trabajadores en el extranjero',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-contratos-especiales', nombre: 'Contratos Especiales de Trabajo', duracion: '2 horas', descripcion: 'CT Arts. 46-75: trabajo agrícola, a domicilio, por obra, en el extranjero, aprendizaje' },
          { tipo: 'caso', id: 'caso-trabajo-destajo', nombre: 'Caso: Trabajador a destajo con accidente', duracion: '45 min', descripcion: 'Aplica las reglas del trabajo a destajo y la responsabilidad por accidente' },
          { tipo: 'lectura', id: 'ct-arts-46-75', nombre: '📖 CT: Arts. 46-75 (Contratos especiales)', duracion: '50 min', descripcion: 'Trabajo agrícola, doméstico, a domicilio, aprendizaje, por tiempo indefinido' },
          { tipo: 'tip', id: 'tip-contratos-especiales', nombre: '🎯 Tip: Trabajo a destajo vs por obra', descripcion: 'A destajo = pago por unidad producida. Por obra = pago por resultado final definido — en ambos hay relación laboral' },
        ],
        tips: [
          'Trabajo agrícola: mismas prestaciones del CT pero con reglas especiales de jornada',
          'Aprendizaje: mínimo 60% del salario mínimo, máx. 2 años de contrato',
          'Trabajo en el extranjero: el CT guatemalteco sigue aplicando si el patrono es guatemalteco',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 46-75 (Modalidades especiales de contratación)',
          tiempo: '50 min',
        },
      },
      2: {
        titulo: 'Seguridad Social: IGSS y Cobertura Guatemalteca',
        descripcion: 'El Instituto Guatemalteco de Seguridad Social (IGSS) y sus programas. La protección social que complementa el CT.',
        objetivos: [
          'Conocer los programas del IGSS y su cobertura',
          'Identificar las obligaciones del patrono con el IGSS',
          'Calcular las cuotas patronales y del trabajador',
        ],
        recursos: [
          { tipo: 'material', id: 'igss-prestaciones', nombre: 'IGSS: Programas y Prestaciones', duracion: '2 horas', descripcion: 'Accidentes, enfermedad, maternidad, invalidez, vejez y sobrevivencia — cobertura y requisitos' },
          { tipo: 'lectura', id: 'ley-organica-igss', nombre: '📖 Ley Orgánica del IGSS (Decreto 295)', duracion: '1 hora', descripcion: 'Arts. 1-30: estructura, afiliación obligatoria, prestaciones y cuotas' },
          { tipo: 'caso', id: 'caso-accidente-igss', nombre: 'Caso: Trabajador accidentado — ¿IGSS o patrono?', duracion: '40 min', descripcion: 'Determina quién paga y qué prestaciones corresponden' },
          { tipo: 'actividad', id: 'actividad-cuotas-igss', nombre: '✍️ Actividad: Calcula cuotas IGSS de 3 empleados', duracion: '30 min', descripcion: 'Aplica los porcentajes vigentes sobre el salario de cada trabajador' },
        ],
        tips: [
          'Cuota patronal IGSS: aproximadamente 12.67% del salario. Cuota trabajador: 4.83%',
          'El IGSS es obligatorio para patronos con 3 o más trabajadores permanentes',
          'Accidente de trabajo: el IGSS cubre si el patrono está afiliado — si no, el patrono responde directamente',
        ],
        lecturaRecomendada: {
          titulo: 'Decreto 295 — Ley Orgánica del IGSS',
          articulo: 'Arts. 1-30 (Estructura y afiliación), Reglamentos de prestaciones',
          tiempo: '50 min',
        },
      },
      3: {
        titulo: 'Sindicatos, Negociación Colectiva y Pactos Colectivos',
        descripcion: 'El derecho colectivo de trabajo. Sindicatos, huelga y pactos colectivos son temas de alta frecuencia en el examen intermedio.',
        objetivos: [
          'Conocer los tipos de sindicatos y sus requisitos de formación',
          'Entender la negociación colectiva y el pacto colectivo',
          'Identificar los requisitos y efectos de la huelga legal',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-colectivo', nombre: 'Derecho Colectivo de Trabajo en Guatemala', duracion: '2.5 horas', descripcion: 'CT Arts. 206-278: sindicatos, coaliciones, pacto colectivo, huelga y paro' },
          { tipo: 'lectura', id: 'ct-arts-sindicatos', nombre: '📖 CT: Arts. 206-228 (Sindicatos)', duracion: '50 min', descripcion: 'Clasificación, formación, directiva, fuero sindical' },
          { tipo: 'caso', id: 'caso-huelga', nombre: 'Caso: ¿Es legal esta huelga?', duracion: '45 min', descripcion: 'Analiza si se cumplen los requisitos legales para declarar la huelga' },
          { tipo: 'tip', id: 'tip-huelga-legal', nombre: '🎯 Tip: Requisitos de la huelga legal', descripcion: 'Que la decrete el tribunal de trabajo, que la apoye el 50%+1 de los trabajadores, que se hayan agotado las vías de conciliación' },
        ],
        tips: [
          'Fuero sindical: los dirigentes sindicales no pueden ser despedidos sin autorización judicial',
          'Pacto colectivo: mejora las condiciones del CT — NUNCA puede reducirlas (irrenunciabilidad)',
          'Huelga ilegal: los trabajadores pueden ser despedidos sin responsabilidad del patrono',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 239-258 (Huelga y paro), Arts. 49-55 (Pacto colectivo)',
          tiempo: '50 min',
        },
      },
      4: {
        titulo: 'Accidentes de Trabajo y Enfermedades Profesionales',
        descripcion: 'Cuándo hay responsabilidad del patrono por accidente o enfermedad. Las reglas del CT y del IGSS para proteger la salud del trabajador.',
        objetivos: [
          'Definir accidente de trabajo y enfermedad profesional según el CT',
          'Determinar la responsabilidad del patrono según la cobertura del IGSS',
          'Calcular las indemnizaciones por incapacidad permanente',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-accidentes', nombre: 'Accidentes de Trabajo y Responsabilidad Patronal', duracion: '2 horas', descripcion: 'CT Arts. 197-205: accidentes, enfermedades profesionales, responsabilidad y reparación' },
          { tipo: 'caso', id: 'caso-accidente-trabajo-inter', nombre: 'Caso: Accidente en jornada — responsabilidades', duracion: '50 min', descripcion: 'Determina si cubre el IGSS, el patrono o ambos, y calcula la indemnización' },
          { tipo: 'lectura', id: 'ct-arts-197-205', nombre: '📖 CT: Arts. 197-205 (Riesgos profesionales)', duracion: '40 min', descripcion: 'Clasificación de incapacidades, reparaciones y plazos' },
          { tipo: 'tip', id: 'tip-accidente-patrono-igss', nombre: '🎯 Tip: ¿IGSS o patrono?', descripcion: 'Si el patrono está inscrito al IGSS y el trabajador afiliado → IGSS cubre. Si no → el patrono responde por el 100% de la reparación directamente' },
        ],
        tips: [
          'Accidente de trabajo: ocurre en el trabajo o en el trayecto de ida/vuelta (accidente "in itinere")',
          'Incapacidad permanente total: derecho a pensión vitalicia del IGSS o reparación del patrono',
          'El trabajador NO pierde sus derechos aunque haya contribuido al accidente (salvo dolo propio)',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 197-205 (Riesgos profesionales y reparaciones)',
          tiempo: '40 min',
        },
      },
      5: {
        titulo: 'Inspección General de Trabajo y Sanciones Laborales',
        descripcion: 'El brazo fiscalizador del Estado en materia laboral. Cómo funciona la Inspección General de Trabajo y qué pasa cuando el patrono viola el CT.',
        objetivos: [
          'Conocer las facultades de la Inspección General de Trabajo',
          'Identificar las infracciones y sanciones del CT',
          'Entender el procedimiento de denuncia y fiscalización',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-inspeccion', nombre: 'Inspección General de Trabajo y Sanciones', duracion: '1.5 horas', descripcion: 'CT Arts. 278-291: funciones del Inspector, procedimiento de inspección, multas' },
          { tipo: 'caso', id: 'caso-inspeccion-trabajo', nombre: 'Caso: Denuncia ante la Inspección de Trabajo', duracion: '40 min', descripcion: 'Analiza el procedimiento desde la denuncia hasta la resolución' },
          { tipo: 'lectura', id: 'ct-arts-278-291', nombre: '📖 CT: Arts. 278-291 (Inspección y sanciones)', duracion: '35 min', descripcion: 'Atribuciones del Inspector, visitas, apercibimientos y multas' },
          { tipo: 'actividad', id: 'actividad-infracciones-laborales', nombre: '✍️ Actividad: Clasifica 8 infracciones laborales', duracion: '30 min', descripcion: 'Determina la sanción aplicable según la gravedad de la infracción' },
        ],
        tips: [
          'El Inspector de Trabajo puede ingresar a centros de trabajo SIN previo aviso',
          'La multa laboral va de Q200 a Q10,000 según la gravedad y reincidencia',
          'Denuncia en la Inspección es GRATUITA y el inspector está obligado a investigar',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 278-291 (Inspección de Trabajo)',
          tiempo: '35 min',
        },
      },
      6: {
        titulo: 'Proceso Laboral Intermedio: Recursos, Prueba y Ejecución',
        descripcion: 'Profundiza en el proceso laboral oral. Medios de prueba, recursos de apelación, ejecución de sentencia y embargo de bienes del patrono.',
        objetivos: [
          'Dominar los medios de prueba en el proceso laboral guatemalteco',
          'Identificar los recursos procesales laborales y sus plazos',
          'Entender la ejecución de sentencia y el embargo laboral',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-proceso-intermedio', nombre: 'Proceso Laboral Oral — Nivel Intermedio', duracion: '2.5 horas', descripcion: 'CT Arts. 344-422: prueba testimonial, documental, confesión; apelación, nulidad, ejecución' },
          { tipo: 'caso', id: 'caso-proceso-laboral-inter', nombre: 'Caso: Apelación de sentencia laboral', duracion: '50 min', descripcion: 'Analiza si procede la apelación, sus requisitos y plazos' },
          { tipo: 'lectura', id: 'ct-arts-344-422', nombre: '📖 CT: Arts. 344-390 (Prueba y recursos)', duracion: '50 min', descripcion: 'Prueba, incidentes, nulidad, apelación y casación laboral' },
          { tipo: 'tip', id: 'tip-prueba-laboral', nombre: '🎯 Tip: Carga de la prueba en materia laboral', descripcion: 'El PATRONO prueba el despido justificado y el pago de prestaciones — el trabajador solo prueba la relación laboral y el tiempo trabajado' },
        ],
        tips: [
          'Apelación laboral: 3 días hábiles para interponerla desde la notificación',
          'En laboral la confesión del patrono en juicio tiene valor de prueba plena',
          'Ejecución de sentencia laboral: se puede embargar bienes del patrono sin esperar',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 354-395 (Prueba, apelación y ejecución de sentencia)',
          tiempo: '50 min',
        },
      },
      7: {
        titulo: 'Jurisprudencia Laboral y Casos Emblematicos de Guatemala',
        descripcion: 'Los fallos más importantes de la CSJ y CC en materia laboral. La jurisprudencia que define cómo se aplica el CT en la práctica.',
        objetivos: [
          'Conocer los criterios jurisprudenciales de la CSJ en materia laboral',
          'Aplicar los principios del CT según la interpretación de la CC',
          'Analizar casos reales de litigación laboral en Guatemala',
        ],
        recursos: [
          { tipo: 'material', id: 'jurisprudencia-laboral-gt', nombre: 'Jurisprudencia Laboral Guatemalteca', duracion: '2 horas', descripcion: 'Sentencias CSJ y CC en materia laboral 2010-2024: despido, fuero sindical, prestaciones' },
          { tipo: 'caso', id: 'caso-jurisprudencia-laboral', nombre: 'Caso: Análisis de sentencia laboral real de la CSJ', duracion: '1 hora', descripcion: 'Hechos, holding y aplicación práctica de un fallo reciente' },
          { tipo: 'actividad', id: 'actividad-ficha-laboral', nombre: '✍️ Actividad: Ficha de 3 sentencias laborales clave', duracion: '45 min', descripcion: 'Elabora fichas con hechos, ratio decidendi y aplicación futura' },
          { tipo: 'tip', id: 'tip-jurisprudencia-laboral', nombre: '🎯 Tip: Qué buscar en una sentencia laboral', descripcion: 'Identifica: principio aplicado (tutelaridad, irrenunciabilidad) + norma del CT + holding + cómo aplica a tus casos' },
        ],
        tips: [
          'La CC ha resuelto sobre el fuero sindical y la inamovilidad — cítalo cuando aplique',
          'La CSJ ha establecido criterios sobre el cálculo de la indemnización en contratos especiales',
          'Practica identificar qué principio laboral respalda cada fallo',
        ],
        lecturaRecomendada: {
          titulo: 'Gaceta CSJ + Sentencias CC en materia laboral',
          articulo: 'Fallos sobre fuero sindical, prestaciones e inamovilidad por maternidad',
          tiempo: '60 min',
        },
      },
      8: {
        titulo: 'Simulacro Final Laboral Intermedio',
        descripcion: 'Examen completo de Derecho Laboral nivel intermedio. Contratos especiales, IGSS, colectivo, proceso y jurisprudencia.',
        objetivos: [
          'Medir el dominio real de todos los temas laborales intermedios',
          'Practicar casos de cálculo avanzado bajo presión de tiempo',
          'Identificar las áreas débiles para el refuerzo final',
        ],
        recursos: [
          { tipo: 'quiz', id: 'simulacro-laboral-intermedio', nombre: 'Simulacro Laboral Intermedio (35 preguntas)', duracion: '2.5 horas', descripcion: 'Contratos especiales, IGSS, colectivo, proceso y jurisprudencia — nivel intermedio-alto' },
          { tipo: 'actividad', id: 'actividad-post-simulacro-laboral', nombre: '✍️ Actividad: Análisis de errores del simulacro', duracion: '1 hora', descripcion: 'Identifica patrones de error y crea un plan de refuerzo específico' },
          { tipo: 'tip', id: 'tip-examen-laboral-intermedio', nombre: '🎯 Tip: Lo más frecuente en el examen laboral intermedio', descripcion: 'Cálculos de cuotas IGSS, requisitos de huelga legal, prueba en el proceso laboral oral' },
          { tipo: 'glosario', id: 'glosario-laboral-intermedio', nombre: '📚 Glosario Laboral Intermedio — Repaso', duracion: '30 min', descripcion: 'Fuero sindical, pacto colectivo, accidente in itinere, incapacidad permanente, conciliación' },
        ],
        tips: [
          'Meta intermedia: 70%+ en el simulacro antes del examen real',
          'Refuerza siempre los cálculos — son puntos seguros si los dominas',
          'Recuerda: el proceso laboral es PRO-TRABAJADOR — el juez puede suplir defectos de la demanda',
        ],
        lecturaRecomendada: {
          titulo: 'Repaso general de los 7 temas anteriores',
          articulo: 'Enfócate en colectivo, IGSS y proceso laboral oral',
          tiempo: '90 min',
        },
      },
    },
    avanzada: {
      1: {
        titulo: 'Dogmática Laboral Avanzada: Principios y su Aplicación Judicial',
        descripcion: 'Los principios del derecho laboral en su dimensión más profunda. Cómo la doctrina y la jurisprudencia los han desarrollado para resolver conflictos complejos.',
        objetivos: [
          'Analizar el principio de primacía de la realidad en casos complejos',
          'Aplicar la irrenunciabilidad frente a acuerdos transaccionales',
          'Distinguir cuándo un contrato civil encubre una relación laboral',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-principios-avanzado', nombre: 'Principios Laborales — Análisis Dogmático Avanzado', duracion: '2.5 horas', descripcion: 'Primacía de la realidad, in dubio pro operario, irrenunciabilidad y su tensión con la autonomía de la voluntad' },
          { tipo: 'caso', id: 'caso-primacia-realidad', nombre: 'Caso: Contrato de servicios que oculta relación laboral', duracion: '1 hora', descripcion: 'Aplica el principio de primacía de la realidad para determinar la naturaleza de la relación' },
          { tipo: 'lectura', id: 'doctrina-laboral-gt', nombre: '📖 Doctrina laboral guatemalteca — autores clave', duracion: '1.5 horas', descripcion: 'Luis Fernández Molina, Mario López Larrave — teoría de los principios laborales en Guatemala' },
          { tipo: 'actividad', id: 'actividad-primacia-realidad', nombre: '✍️ Actividad: Analiza 4 contratos civiles sospechosos', duracion: '1 hora', descripcion: 'Determina en cuáles hay verdadera relación laboral oculta y qué derechos generan' },
        ],
        tips: [
          'Primacía de la realidad: lo que ocurre en los hechos prevalece sobre lo que diga el contrato escrito',
          'Un "consultor independiente" que cumple horario, recibe órdenes y trabaja exclusivamente para uno — es trabajador',
          'La transacción laboral es válida SOLO sobre derechos ya nacidos y en conflicto real — no sobre derechos futuros',
        ],
        lecturaRecomendada: {
          titulo: 'Mario López Larrave — Introducción al Derecho Procesal del Trabajo',
          articulo: 'Caps. 1-3: Principios y naturaleza del derecho laboral guatemalteco',
          tiempo: '75 min',
        },
      },
      2: {
        titulo: 'Derecho Laboral Internacional y Convenios OIT en Guatemala',
        descripcion: 'Guatemala ha ratificado convenios de la OIT que forman parte del ordenamiento jurídico nacional. Nivel avanzado imprescindible.',
        objetivos: [
          'Identificar los convenios OIT ratificados por Guatemala con mayor impacto',
          'Aplicar el bloque de constitucionalidad laboral en casos concretos',
          'Analizar la jerarquía normativa: CT, CPRG y convenios internacionales',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-oit-guatemala', nombre: 'Convenios OIT Ratificados por Guatemala', duracion: '2.5 horas', descripcion: 'Convenios 87 (libertad sindical), 98 (negociación colectiva), 100 (igualdad salarial), 138 y 182 (trabajo infantil)' },
          { tipo: 'lectura', id: 'cprg-art-102-laboral', nombre: '📖 CPRG Art. 102 + Convenios OIT', duracion: '1.5 horas', descripcion: 'Derechos laborales mínimos constitucionales y su relación con los estándares OIT' },
          { tipo: 'actividad', id: 'actividad-bloque-constitucionalidad', nombre: '✍️ Actividad: Control de convencionalidad laboral', duracion: '1 hora', descripcion: 'Verifica si una norma del CT es compatible con los convenios OIT ratificados' },
          { tipo: 'tip', id: 'tip-convenios-oit', nombre: '🎯 Tip: Los 5 convenios OIT más preguntados', descripcion: 'Convenio 87 (libertad sindical), 98 (negociación colectiva), 100 (igual salario), 138 (edad mínima), 182 (peores formas trabajo infantil)' },
        ],
        tips: [
          'Los convenios OIT ratificados tienen rango constitucional en Guatemala (Art. 46 CPRG)',
          'Convenio 87: protege el derecho de los trabajadores a organizarse sin autorización previa del Estado',
          'Guatemala ha sido señalada por la OIT por incumplimiento del Convenio 87 — tema de examen avanzado',
        ],
        lecturaRecomendada: {
          titulo: 'Constitución Política Art. 46 + Convenios OIT 87, 98, 100',
          articulo: 'Bloque de constitucionalidad laboral y su aplicación en Guatemala',
          tiempo: '80 min',
        },
      },
      3: {
        titulo: 'Derecho Colectivo Avanzado: Conflictos Colectivos y Arbitraje',
        descripcion: 'Más allá del sindicato básico. Conflictos económico-sociales, arbitraje obligatorio, huelga en servicios esenciales y la intervención del Estado.',
        objetivos: [
          'Dominar el procedimiento del conflicto colectivo de carácter económico-social',
          'Analizar las restricciones a la huelga en servicios esenciales',
          'Conocer el arbitraje obligatorio y voluntario en materia laboral',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-conflicto-colectivo', nombre: 'Conflictos Colectivos y Arbitraje Laboral', duracion: '2.5 horas', descripcion: 'CT Arts. 374-418: conflicto colectivo económico-social, conciliación, arbitraje, huelga en servicios esenciales' },
          { tipo: 'caso', id: 'caso-conflicto-colectivo', nombre: 'Caso: Huelga en hospital público — ¿es legal?', duracion: '1 hora', descripcion: 'Analiza los límites de la huelga en servicios esenciales según el CT y la CPRG' },
          { tipo: 'lectura', id: 'ct-arts-374-418', nombre: '📖 CT: Arts. 374-418 (Conflicto colectivo)', duracion: '50 min', descripcion: 'Procedimiento, conciliación, arbitraje y efectos del laudo arbitral' },
          { tipo: 'tip', id: 'tip-servicios-esenciales', nombre: '🎯 Tip: Servicios esenciales donde la huelga es restringida', descripcion: 'Hospitales, agua, energía eléctrica, telecomunicaciones, transporte aéreo — en estos el CT exige servicio mínimo' },
        ],
        tips: [
          'Conflicto colectivo económico-social: busca modificar o crear condiciones de trabajo — no reclamar derechos ya adquiridos',
          'Arbitraje obligatorio en Guatemala: el tribunal puede imponerlo cuando la huelga afecte servicios esenciales',
          'El laudo arbitral tiene fuerza de sentencia firme — es ejecutable directamente',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo',
          articulo: 'Arts. 374-418 (Conflictos colectivos, conciliación y arbitraje)',
          tiempo: '60 min',
        },
      },
      4: {
        titulo: 'Responsabilidad Patronal Avanzada: Subcontratación y Grupos Empresariales',
        descripcion: 'El patrono real detrás de la empresa. Subcontratación, empresas de servicios temporales, grupos económicos y responsabilidad solidaria en Guatemala.',
        objetivos: [
          'Identificar cuándo hay responsabilidad solidaria entre empresas',
          'Aplicar las reglas de la subcontratación y el suministro de personal',
          'Analizar la figura del empleador real en grupos económicos',
        ],
        recursos: [
          { tipo: 'material', id: 'laboral-responsabilidad-patronal', nombre: 'Subcontratación y Grupos Empresariales en Guatemala', duracion: '2.5 horas', descripcion: 'Responsabilidad solidaria, tercerización, empresas de servicios temporales y sus límites legales' },
          { tipo: 'caso', id: 'caso-subcontratacion-laboral', nombre: 'Caso: Trabajador de empresa contratista reclama prestaciones a la empresa principal', duracion: '1 hora', descripcion: 'Determina si hay solidaridad patronal y quién responde por las prestaciones' },
          { tipo: 'lectura', id: 'ct-arts-patrono-solidaridad', nombre: '📖 CT: Arts. 2-10 (Patrono, empresa y solidaridad)', duracion: '45 min', descripcion: 'Concepto de patrono, empresa y responsabilidad solidaria en el CT' },
          { tipo: 'actividad', id: 'actividad-grupos-empresariales', nombre: '✍️ Actividad: Identifica al empleador real en 3 estructuras empresariales', duracion: '1 hora', descripcion: 'Analiza organigramas empresariales y determina quién es el verdadero patrono' },
        ],
        tips: [
          'Responsabilidad solidaria: si hay unidad económica entre empresas, todas responden por las deudas laborales',
          'La empresa de servicios temporales responde solidariamente junto con la empresa usuaria',
          'El cambio de razón social NO extingue los derechos laborales — el patrono real sigue siendo responsable',
        ],
        lecturaRecomendada: {
          titulo: 'Código de Trabajo Arts. 2-10 + Jurisprudencia CSJ sobre solidaridad patronal',
          articulo: 'Fallos sobre responsabilidad solidaria en grupos empresariales',
          tiempo: '60 min',
        },
      },
      5: {
        titulo: 'Litigación Laboral Avanzada: Estrategia y Casos Complejos',
        descripcion: 'La diferencia entre ganar y perder un caso laboral. Estrategia procesal, manejo de prueba, errores comunes y técnicas de los mejores litigantes laborales.',
        objetivos: [
          'Construir una estrategia procesal completa para casos laborales complejos',
          'Dominar el interrogatorio de testigos y la prueba documental en laboral',
          'Identificar y explotar los errores procesales más comunes del patrono',
        ],
        recursos: [
          { tipo: 'material', id: 'litigacion-laboral-avanzada', nombre: 'Estrategia de Litigación Laboral Avanzada', duracion: '3 horas', descripcion: 'Teoría del caso laboral, manejo de prueba, conciliación estratégica, apelación y casación' },
          { tipo: 'caso', id: 'caso-litigacion-laboral-avanzado', nombre: 'Caso: Despido masivo con múltiples pretensiones', duracion: '1.5 horas', descripcion: 'Planifica la demanda, la prueba y la estrategia de audiencia para un caso con 15 trabajadores' },
          { tipo: 'actividad', id: 'actividad-estrategia-laboral', nombre: '✍️ Actividad: Construye la teoría del caso para defensa y demandante', duracion: '1.5 horas', descripcion: 'Elabora ambas teorías del caso para el mismo hecho — dominar los dos lados' },
          { tipo: 'tip', id: 'tip-errores-patrono-laboral', nombre: '🎯 Tip: Los 5 errores procesales más comunes del patrono', descripcion: '1. No conservar el contrato escrito 2. No documentar el despido 3. No pagar dentro del plazo 4. No presentarse a la conciliación 5. No ofrecer prueba en tiempo' },
        ],
        tips: [
          'El patrono que no se presenta a la primera audiencia pierde la conciliación y queda en rebeldía',
          'La prueba más poderosa en laboral: planilla de salarios, tarjetas de control, correos electrónicos',
          'Casación laboral: solo procede por violación de ley sustantiva — no por errores de valoración de prueba',
        ],
        lecturaRecomendada: {
          titulo: 'CT Arts. 321-422 (Proceso laboral) + Manual de Litigación Laboral Oral',
          articulo: 'Estrategia procesal en el juicio oral laboral guatemalteco',
          tiempo: '90 min',
        },
      },
      6: {
        titulo: 'Jurisprudencia Laboral Avanzada: CIDH, CC y Tendencias Actuales',
        descripcion: 'El derecho laboral guatemalteco frente al sistema interamericano de derechos humanos. Los fallos que han obligado al Estado a reformar sus prácticas laborales.',
        objetivos: [
          'Conocer los casos CIDH que involucran derechos laborales en Guatemala',
          'Aplicar la jurisprudencia de la CC sobre libertad sindical y fuero de maternidad',
          'Identificar las tendencias actuales del derecho laboral guatemalteco',
        ],
        recursos: [
          { tipo: 'material', id: 'jurisprudencia-laboral-cidh', nombre: 'CIDH y Derecho Laboral Guatemalteco', duracion: '2.5 horas', descripcion: 'Casos CIDH sobre libertad sindical, trabajo forzado y discriminación laboral en Guatemala' },
          { tipo: 'lectura', id: 'cc-sentencias-laborales', nombre: '📖 CC: Sentencias clave en materia laboral', duracion: '1.5 horas', descripcion: 'Fuero sindical, inamovilidad por maternidad, salario mínimo — fallos 2015-2024' },
          { tipo: 'actividad', id: 'actividad-cidh-laboral', nombre: '✍️ Actividad: Aplica estándar CIDH a un caso laboral guatemalteco', duracion: '1 hora', descripcion: 'Determina si la práctica patronal viola la CADH y qué remedios proceden' },
          { tipo: 'tip', id: 'tip-cidh-laboral', nombre: '🎯 Tip: Qué alegar cuando el CT no es suficiente', descripcion: 'Si el CT no protege el derecho, argumenta con: Art. 46 CPRG + Convenio OIT + Art. 26 CADH (desarrollo progresivo de derechos económicos)' },
        ],
        tips: [
          'Caso Trabajadores de la Hacienda Brasil Verde vs Brasil (CIDH 2016) — referencia regional sobre trabajo forzado',
          'La CC ha protegido el fuero sindical incluso cuando el sindicato no estaba inscrito formalmente',
          'Tendencia actual: extensión del fuero de maternidad a trabajadoras en período de lactancia',
        ],
        lecturaRecomendada: {
          titulo: 'Gaceta CC + Sentencias CIDH sobre derechos laborales',
          articulo: 'Fallos sobre libertad sindical, inamovilidad y trabajo forzado',
          tiempo: '90 min',
        },
      },
      7: {
        titulo: 'Casos Laborales Complejos: Resolución a Nivel Experto',
        descripcion: 'Los casos que aparecen en el examen de privado avanzado y en la práctica real. Múltiples pretensiones, grupos empresariales, conflictos colectivos e internacionales.',
        objetivos: [
          'Resolver casos laborales complejos con múltiples partes y pretensiones',
          'Aplicar responsabilidad solidaria, primacía de realidad y convenios OIT simultáneamente',
          'Construir argumentos de demandante y defensa con jurisprudencia',
        ],
        recursos: [
          { tipo: 'caso', id: 'caso-laboral-complejo-1', nombre: 'Caso Experto 1: Empresa transnacional + subcontratación + sindicato', duracion: '1.5 horas', descripcion: 'Determina empleador responsable, calcula prestaciones y analiza violación al fuero sindical' },
          { tipo: 'caso', id: 'caso-laboral-complejo-2', nombre: 'Caso Experto 2: Reestructuración empresarial + despido masivo + IGSS', duracion: '1.5 horas', descripcion: 'Analiza la legalidad del despido masivo, las obligaciones con el IGSS y la estrategia de demanda' },
          { tipo: 'actividad', id: 'actividad-casos-experto-laboral', nombre: '✍️ Actividad: Escribe la demanda y la contestación del mismo caso', duracion: '1.5 horas', descripcion: 'Domina el caso desde ambas perspectivas antes del examen real' },
          { tipo: 'tip', id: 'tip-casos-complejos-laboral', nombre: '🎯 Tip: Metodología para casos laborales complejos', descripcion: '1. Identifica al verdadero empleador 2. Determina el tipo de contrato 3. Calcula todas las prestaciones 4. Identifica violaciones específicas 5. Selecciona el procedimiento correcto' },
        ],
        tips: [
          'En casos con múltiples pretensiones: ordénalas de mayor a menor monto económico',
          'Siempre verifica si hay fuero especial (sindical, maternidad) antes de analizar el despido',
          'En grupos empresariales: demanda a todas las empresas del grupo — la solidaridad te lo permite',
        ],
        lecturaRecomendada: {
          titulo: 'CT + Convenios OIT + Jurisprudencia CSJ y CIDH',
          articulo: 'Repaso integrado: contrato, prestaciones, colectivo, proceso y jurisprudencia',
          tiempo: '90 min',
        },
      },
      8: {
        titulo: 'Simulacro Final Laboral Avanzado: 40 Preguntas Nivel Experto',
        descripcion: 'El simulacro más exigente del plan laboral. Dogmática, casos complejos, OIT, CIDH y litigación avanzada. Modo examen real.',
        objetivos: [
          'Alcanzar precisión y velocidad de nivel experto en Derecho Laboral',
          'Medir el dominio real de todos los temas laborales avanzados',
          'Afinar la estrategia personal para el examen de grado',
        ],
        recursos: [
          { tipo: 'quiz', id: 'simulacro-laboral-avanzado', nombre: 'Simulacro Laboral Avanzado (40 preguntas)', duracion: '2.5 horas', descripcion: 'Dogmática, contratos especiales, colectivo, OIT, CIDH y litigación — nivel experto' },
          { tipo: 'actividad', id: 'actividad-post-simulacro-laboral-av', nombre: '✍️ Actividad: Plan de refuerzo final 48 horas', duracion: '45 min', descripcion: 'Identifica los 3 temas más débiles y crea un plan de estudio intensivo de 2 días' },
          { tipo: 'tip', id: 'tip-examen-laboral-avanzado', nombre: '🎯 Tip: Estrategia para examen de Laboral nivel experto', descripcion: 'Domina los cálculos primero (puntos seguros), luego los casos (razonar en voz alta por escrito), finalmente doctrina y jurisprudencia' },
          { tipo: 'glosario', id: 'glosario-laboral-avanzado', nombre: '📚 Glosario Laboral Avanzado — Repaso Final', duracion: '45 min', descripcion: 'Primacía de realidad, bloque de constitucionalidad, solidaridad patronal, arbitraje, laudo, control de convencionalidad' },
        ],
        tips: [
          'Meta avanzada: 80%+ en el simulacro — si no llegas, una semana más de refuerzo',
          'Cita siempre: CT, CPRG, Convenio OIT y jurisprudencia — los 4 niveles normativos',
          'Duerme bien, come ligero, llega temprano — el nivel avanzado ya lo tienes',
        ],
        lecturaRecomendada: {
          titulo: 'Repaso final integral de Derecho Laboral',
          articulo: 'Principios → contratos → prestaciones → colectivo → proceso → OIT y CIDH',
          tiempo: '120 min',
        },
      },
    },
  },
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
