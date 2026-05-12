import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Bot, User, RotateCcw } from "lucide-react";

interface Mensaje {
  id: number;
  tipo: "bot" | "usuario";
  texto: string;
}

interface Opcion {
  texto: string;
  siguiente: string;
}

interface Nodo {
  id: string;
  mensaje: string;
  opciones?: Opcion[];
}

// ─────────────────────────────────────────────────────────────────────────────
// ÁRBOL DE CONVERSACIÓN
// Nodos sin `opciones` son hojas → el bot muestra MSG_FIN y aparece "Reiniciar"
// ─────────────────────────────────────────────────────────────────────────────
const ARBOL: Record<string, Nodo> = {

  // ── INICIO ────────────────────────────────────────────────────────────────
  inicio: {
    id: "inicio",
    mensaje: "¡Hola! Soy el asistente de Juridia. Selecciona el tema sobre el que necesitas orientación:",
    opciones: [
      { texto: "📚 Ramas del Derecho",            siguiente: "menu_ramas" },
      { texto: "🎓 Exámenes y Carrera",            siguiente: "menu_examenes" },
      { texto: "⚖️ Garantías Constitucionales",    siguiente: "menu_garantias" },
      { texto: "🔍 Proceso Penal",                 siguiente: "menu_proceso_penal" },
      { texto: "📝 Contratos y Obligaciones",      siguiente: "menu_contratos" },
      { texto: "🏛️ Derecho Notarial",             siguiente: "menu_notarial" },
      { texto: "👪 Derecho de Familia",            siguiente: "menu_familia" },
      { texto: "💰 Derecho Tributario",            siguiente: "menu_tributario" },
      { texto: "🌍 Derechos Humanos",              siguiente: "menu_ddhh" },
      { texto: "🏢 Organismos del Estado",         siguiente: "menu_organismos" },
    ],
  },

  // ── RAMAS DEL DERECHO ─────────────────────────────────────────────────────
  menu_ramas: {
    id: "menu_ramas",
    mensaje: "¿Sobre qué rama del Derecho deseas información?",
    opciones: [
      { texto: "Derecho Constitucional",  siguiente: "info_constitucional" },
      { texto: "Derecho Penal",           siguiente: "info_penal" },
      { texto: "Derecho Civil",           siguiente: "info_civil" },
      { texto: "Derecho Laboral",         siguiente: "menu_laboral" },
      { texto: "Derecho Mercantil",       siguiente: "info_mercantil" },
      { texto: "Derecho Administrativo",  siguiente: "info_administrativo" },
      { texto: "Derecho Notarial",        siguiente: "menu_notarial" },
      { texto: "Derecho de Familia",      siguiente: "menu_familia" },
      { texto: "Derecho Tributario",      siguiente: "menu_tributario" },
      { texto: "Derecho Procesal Civil",  siguiente: "menu_procesal_civil" },
    ],
  },
  info_constitucional: {
    id: "info_constitucional",
    mensaje: "El **Derecho Constitucional** estudia la Constitución Política de Guatemala de 1985, norma suprema del ordenamiento jurídico.\n\nConsagra los derechos fundamentales (vida, libertad, igualdad), la organización del Estado en tres organismos (Ejecutivo, Legislativo y Judicial) y garantías como el amparo y el habeas corpus.",
  },
  info_penal: {
    id: "info_penal",
    mensaje: "El **Derecho Penal** guatemalteco regula los delitos y las penas. Su base es el Código Penal (Decreto 17-73).\n\nLos elementos del delito son tipicidad, antijuridicidad, culpabilidad y punibilidad. La pena varía según la gravedad del ilícito: de días-multa hasta reclusión mayor.",
  },
  info_civil: {
    id: "info_civil",
    mensaje: "El **Derecho Civil** regula las relaciones entre personas: contratos, familia, sucesiones y bienes. En Guatemala lo rige el Código Civil (Decreto-Ley 106).\n\nSus ramas son: derecho de personas, familia, bienes, obligaciones y sucesiones. Es la base del ordenamiento jurídico privado.",
  },
  menu_laboral: {
    id: "menu_laboral",
    mensaje: "El **Derecho Laboral** (Código de Trabajo, Decreto 1441) regula la relación entre trabajadores y patronos. ¿Qué aspecto te interesa conocer?",
    opciones: [
      { texto: "Jornadas de trabajo",        siguiente: "laboral_jornada" },
      { texto: "Aguinaldo y Bono 14",        siguiente: "laboral_prestaciones" },
      { texto: "Despido injustificado",      siguiente: "laboral_despido" },
      { texto: "Salario mínimo",             siguiente: "laboral_salario" },
      { texto: "IGSS y seguridad social",    siguiente: "laboral_igss" },
      { texto: "Sindicatos y huelga",        siguiente: "laboral_sindicatos" },
    ],
  },
  laboral_jornada: {
    id: "laboral_jornada",
    mensaje: "**Jornadas de trabajo en Guatemala** (Art. 116 Código de Trabajo):\n\n• **Diurna:** 8 horas/día · 44 horas/semana\n• **Nocturna:** 6 horas/día · 36 horas/semana\n• **Mixta:** 7 horas/día · 42 horas/semana\n\nEl trabajo que exceda estos límites es **tiempo extraordinario** y debe pagarse con un 50% adicional sobre el salario ordinario.",
  },
  laboral_prestaciones: {
    id: "laboral_prestaciones",
    mensaje: "**Aguinaldo** (Decreto 76-78):\nEquivale a un salario mensual. Se paga 50 % en la primera quincena de diciembre y 50 % en enero.\n\n**Bono 14** (Decreto 42-92):\nEquivale también a un salario mensual. Se paga íntegramente antes del 15 de julio.\n\nAmbas prestaciones son proporcionales al tiempo trabajado si no se ha cumplido el año completo.",
  },
  laboral_despido: {
    id: "laboral_despido",
    mensaje: "El **despido injustificado** obliga al patrono a pagar (Art. 82 Código de Trabajo):\n\n• **Indemnización:** 1 mes de salario por cada año trabajado\n• **Vacaciones** proporcionales no gozadas\n• **Aguinaldo** proporcional\n• **Bono 14** proporcional\n\nEl trabajador tiene **30 días** para reclamar ante los Tribunales de Trabajo.",
  },
  laboral_salario: {
    id: "laboral_salario",
    mensaje: "El **salario mínimo** en Guatemala lo fija el **Organismo Ejecutivo** mediante Acuerdo Gubernativo, a propuesta de la Comisión Nacional del Salario (Art. 113 Código de Trabajo).\n\nSe actualiza anualmente (vigencia desde el 1 de enero) y existen tarifas diferenciadas para actividades agrícolas, no agrícolas y exportación/maquila.",
  },
  info_mercantil: {
    id: "info_mercantil",
    mensaje: "El **Derecho Mercantil** regula las actividades comerciales (Código de Comercio, Decreto 2-70).\n\nReconoce 5 tipos de sociedades: colectiva, en comandita simple, de responsabilidad limitada, anónima (S.A.) y en comandita por acciones. También regula títulos de crédito: cheque, letra de cambio y pagaré.",
  },
  info_administrativo: {
    id: "info_administrativo",
    mensaje: "El **Derecho Administrativo** regula la organización y actuación del Estado frente a los ciudadanos.\n\nFuentes principales: Constitución, Ley del Organismo Ejecutivo y Ley de lo Contencioso Administrativo. Los recursos frente a actos administrativos son la revocatoria, la reposición y el contencioso-administrativo.",
  },

  // ── EXÁMENES Y CARRERA ────────────────────────────────────────────────────
  menu_examenes: {
    id: "menu_examenes",
    mensaje: "¿Qué información necesitas sobre tu carrera?",
    opciones: [
      { texto: "Temas del examen privado",      siguiente: "examenes_temas" },
      { texto: "Cómo iniciar mi tesis",          siguiente: "examenes_tesis" },
      { texto: "Recomendaciones de estudio",     siguiente: "examenes_recomendaciones" },
      { texto: "Fuentes del Derecho",            siguiente: "examenes_fuentes" },
    ],
  },
  examenes_temas: {
    id: "examenes_temas",
    mensaje: "**Temas frecuentes en el examen privado de Derecho en Guatemala:**\n\n• Derecho Constitucional y garantías\n• Derecho Penal: teoría del delito y tipos penales\n• Derecho Civil: contratos, familia y sucesiones\n• Derecho Procesal Civil y Penal\n• Derecho Administrativo y Municipal\n• Derecho Laboral y Seguridad Social\n• Derecho Mercantil\n• Derecho Internacional Público\n\nRevisa el reglamento de tu facultad, los temas pueden variar.",
  },
  examenes_tesis: {
    id: "examenes_tesis",
    mensaje: "**Pasos para iniciar tu tesis de Derecho en Guatemala:**\n\n1. Elige un tema de investigación jurídica viable y relevante\n2. Formula el problema, objetivos e hipótesis\n3. Presenta el protocolo ante tu asesor o unidad de tesis\n4. Desarrolla el marco teórico con doctrina, ley y jurisprudencia\n5. Aplica metodología jurídica (dogmática, comparada, empírica)\n6. Redacta conclusiones y recomendaciones\n7. Somételo a revisión antes del examen\n\nConsulta siempre el reglamento de graduación de tu facultad.",
  },
  examenes_recomendaciones: {
    id: "examenes_recomendaciones",
    mensaje: "**Recomendaciones para estudiar Derecho guatemalteco:**\n\n• Estudia las leyes directamente, no solo resúmenes\n• Relaciona cada norma con la Constitución como norma suprema\n• Practica con jurisprudencia de la CC y la CSJ\n• Usa el ConstituQuiz de Juridia para reforzar conceptos\n• Forma grupos de estudio y simula exámenes orales\n• Revisa los cursos disponibles en la plataforma para cada materia",
  },
  examenes_fuentes: {
    id: "examenes_fuentes",
    mensaje: "**Fuentes del Derecho guatemalteco** (Art. 2 Ley del Organismo Judicial):\n\n• **Constitución:** norma suprema, prima sobre cualquier otra\n• **Leyes y disposiciones gubernativas:** decretos, reglamentos\n• **Tratados internacionales:** equiparados a leyes ordinarias (salvo DDHH)\n• **Costumbre:** válida solo si la ley la reconoce\n• **Doctrina:** opinión de juristas, fuente auxiliar de interpretación\n• **Jurisprudencia:** sentencias reiteradas de la CC y CSJ",
  },

  // ── GARANTÍAS CONSTITUCIONALES ────────────────────────────────────────────
  menu_garantias: {
    id: "menu_garantias",
    mensaje: "Las garantías constitucionales protegen tus derechos fundamentales. ¿Cuál deseas conocer?",
    opciones: [
      { texto: "El amparo",              siguiente: "garantias_amparo" },
      { texto: "El habeas corpus",        siguiente: "garantias_habeas" },
      { texto: "La nulidad de actos",     siguiente: "garantias_nulidad" },
      { texto: "La prescripción",         siguiente: "garantias_prescripcion" },
      { texto: "La inconstitucionalidad", siguiente: "garantias_inconstitucionalidad" },
    ],
  },
  garantias_amparo: {
    id: "garantias_amparo",
    mensaje: "El **amparo** protege a las personas contra actos arbitrarios del Estado o particulares que violen derechos fundamentales (Decreto 1-86).\n\n• Se interpone ante cualquier tribunal con jurisdicción en el lugar\n• La CC conoce en apelación los de mayor trascendencia\n• **Suspende provisionalmente** el acto reclamado mientras se resuelve\n• No tiene costo y puede presentarlo cualquier persona afectada",
  },
  garantias_habeas: {
    id: "garantias_habeas",
    mensaje: "El **habeas corpus** (exhibición personal) protege la libertad física.\n\n**Procede cuando:**\n• Una persona es detenida ilegalmente o sin orden judicial\n• La detención supera el plazo legal (6 horas para investigar)\n• El detenido se encuentra en paradero desconocido\n\nLo conoce la **Corte Suprema de Justicia**. Es gratuito, urgente y el juez debe resolver en **24 horas**.",
  },
  garantias_nulidad: {
    id: "garantias_nulidad",
    mensaje: "La **nulidad** es la invalidez de un acto jurídico:\n\n• **Absoluta:** viola el orden público. No puede sanearse; cualquier persona puede alegarla en cualquier tiempo (ej. objeto ilícito, incapacidad absoluta).\n\n• **Relativa:** puede convalidarse. Solo la alega el perjudicado y tiene plazo para reclamarla (ej. vicios del consentimiento, incapacidad relativa).\n\nRegulada a partir del Art. 1301 del Código Civil.",
  },
  garantias_prescripcion: {
    id: "garantias_prescripcion",
    mensaje: "La **prescripción** extingue derechos por el paso del tiempo:\n\n• **Adquisitiva (usucapión):** se adquiere la propiedad de un bien por posesión prolongada, pacífica y de buena fe.\n\n• **Extintiva:** se pierde la acción legal para reclamar un derecho por no ejercerla en el plazo fijado por ley.\n\nLos plazos varían: 2, 5, 10 o hasta 20 años según el tipo de acción en el Código Civil.",
  },
  garantias_inconstitucionalidad: {
    id: "garantias_inconstitucionalidad",
    mensaje: "La **inconstitucionalidad** es el mecanismo para expulsar del ordenamiento jurídico normas que contraríen la Constitución.\n\n• **General:** cualquier persona con auxilio de abogado la plantea ante la CC. Si se declara, la norma queda sin vigencia.\n\n• **En caso concreto:** se plantea en un proceso judicial en curso. Solo inaplica la norma para ese caso específico.\n\nLa conoce la **Corte de Constitucionalidad (CC)**.",
  },

  // ── PROCESO PENAL ─────────────────────────────────────────────────────────
  menu_proceso_penal: {
    id: "menu_proceso_penal",
    mensaje: "El proceso penal se rige por el Código Procesal Penal (Decreto 51-92). ¿Qué aspecto deseas conocer?",
    opciones: [
      { texto: "Etapas del proceso penal",     siguiente: "penal_etapas" },
      { texto: "Criterio de oportunidad",      siguiente: "penal_criterio" },
      { texto: "Demanda vs. denuncia",          siguiente: "penal_diferencia" },
      { texto: "Prisión preventiva",            siguiente: "penal_prision" },
      { texto: "Medidas desjudicializadoras",   siguiente: "penal_desjudicializadoras" },
      { texto: "Flagrancia",                    siguiente: "penal_flagrancia" },
      { texto: "Suspensión condicional",        siguiente: "penal_suspension" },
    ],
  },
  penal_etapas: {
    id: "penal_etapas",
    mensaje: "**Etapas del proceso penal guatemalteco** (CPP, Decreto 51-92):\n\n1. **Preparatoria:** Investigación del MP con control del juez contralor\n2. **Intermedia:** El juez decide si hay mérito para llevar el caso a juicio o dicta sobreseimiento\n3. **Debate oral y público:** El Tribunal de Sentencia escucha pruebas y dicta sentencia\n4. **Impugnaciones:** Apelación especial, casación o revisión ante tribunales superiores",
  },
  penal_criterio: {
    id: "penal_criterio",
    mensaje: "El **criterio de oportunidad** (Art. 25 CPP) permite al MP, con autorización judicial, no ejercitar la acción penal en delitos de menor impacto social.\n\n**Requisitos:**\n• El delito no debe tener pena mínima mayor de 5 años\n• El sindicado debe reparar el daño a la víctima\n• No aplica en delitos contra el Estado o corrupción\n\nSi el sindicado incumple lo pactado, se reactiva la persecución penal.",
  },
  penal_diferencia: {
    id: "penal_diferencia",
    mensaje: "**Demanda vs. Denuncia:**\n\n**Demanda** (materia civil/laboral):\n• Acto procesal que inicia un juicio entre partes\n• Exige un derecho subjetivo (pago, divorcio, indemnización)\n• Se tramita ante juez civil, familiar o laboral\n\n**Denuncia** (materia penal):\n• Comunicación al MP o PNC sobre un delito\n• No inicia directamente el juicio; el MP investiga\n• Puede presentarla cualquier persona",
  },
  penal_prision: {
    id: "penal_prision",
    mensaje: "La **prisión preventiva** es una medida cautelar, no una pena.\n\n**Plazos máximos (Art. 268 CPP):**\n• Máximo **1 año** de duración\n• Con prórroga justificada: hasta **2 años** en casos complejos\n• Vencido el plazo sin sentencia: el juez debe otorgar medidas sustitutivas\n\n**Medidas sustitutivas:** arresto domiciliario, caución económica, prohibición de salir del país o presentación periódica ante el juzgado.",
  },
  penal_desjudicializadoras: {
    id: "penal_desjudicializadoras",
    mensaje: "Las **medidas desjudicializadoras** evitan llegar al juicio oral (Arts. 25-27 CPP):\n\n• **Criterio de oportunidad:** el MP no ejerce la acción si el sindicado repara el daño\n• **Suspensión condicional:** el proceso se suspende hasta 5 años si el imputado cumple condiciones; al cumplirlas se dicta sobreseimiento\n• **Mediación:** las partes llegan a un acuerdo con la ayuda de un facilitador\n• **Conversión:** la acción pública se convierte en privada en ciertos delitos",
  },

  // ── CONTRATOS Y OBLIGACIONES ──────────────────────────────────────────────
  menu_contratos: {
    id: "menu_contratos",
    mensaje: "El Código Civil (Decreto-Ley 106) regula contratos y obligaciones. ¿Qué deseas saber?",
    opciones: [
      { texto: "¿Qué es un contrato?",        siguiente: "civil_contrato" },
      { texto: "Vicios del consentimiento",   siguiente: "civil_vicios" },
      { texto: "El recurso de apelación",     siguiente: "civil_apelacion" },
      { texto: "La jurisprudencia",           siguiente: "civil_jurisprudencia" },
      { texto: "Tipos de contratos",          siguiente: "civil_tipos" },
      { texto: "El mandato",                  siguiente: "civil_mandato" },
      { texto: "El arrendamiento",            siguiente: "civil_arrendamiento" },
    ],
  },
  civil_contrato: {
    id: "civil_contrato",
    mensaje: "Un **contrato** es el acuerdo de voluntades entre dos o más personas que crea, modifica o extingue derechos y obligaciones (Art. 1517 Código Civil).\n\n**Elementos esenciales:**\n• **Consentimiento:** voluntad libre y consciente de las partes\n• **Objeto lícito:** la prestación debe ser posible y legal\n• **Causa lícita:** la motivación no debe contravenir la ley\n• **Capacidad:** las partes deben ser mayores de edad y no declaradas incapaces",
  },
  civil_vicios: {
    id: "civil_vicios",
    mensaje: "Los **vicios del consentimiento** afectan la validez del contrato y pueden provocar nulidad relativa:\n\n• **Error:** falsa representación de la realidad que llevó a contratar\n• **Dolo:** maniobras engañosas deliberadas para obtener el consentimiento\n• **Intimidación:** amenaza grave e injusta que priva de libertad al contratante\n\nQuien los sufre puede pedir la anulación del contrato ante juez civil.",
  },
  civil_apelacion: {
    id: "civil_apelacion",
    mensaje: "La **apelación** es el recurso ordinario más utilizado en Guatemala.\n\n• Procede contra sentencias definitivas de primera instancia y autos que pongan fin al proceso\n• Debe interponerse dentro de **3 días** (civil) o **3 días** (penal) de notificada la resolución\n• Las **Salas de Apelaciones** revisan la legalidad y el fondo del asunto\n• No se admiten pruebas nuevas salvo excepciones expresas de la ley",
  },
  civil_jurisprudencia: {
    id: "civil_jurisprudencia",
    mensaje: "La **jurisprudencia** es el conjunto de sentencias reiteradas de tribunales superiores que sirven como fuente de interpretación.\n\n**En Guatemala:**\n• La **Corte de Constitucionalidad (CC)** emite jurisprudencia constitucional vinculante para todos los tribunales\n• La **Corte Suprema de Justicia (CSJ)** fija doctrina legal en casación\n• Se consulta en el portal oficial del Organismo Judicial: organismoJudicial.gob.gt",
  },
  civil_tipos: {
    id: "civil_tipos",
    mensaje: "**Tipos de contratos más importantes en Guatemala:**\n\n• **Compraventa:** transfiere la propiedad de un bien a cambio de precio\n• **Arrendamiento:** cesión del uso de un bien por tiempo y precio determinado\n• **Mandato:** encargo de representación o gestión de negocios\n• **Préstamo (mutuo):** entrega de dinero u otras cosas fungibles con obligación de restituir\n• **Donación:** transmisión gratuita de bienes\n• **Sociedad civil:** dos o más personas aportan para repartir ganancias",
  },

  // ── EXPANSIÓN: CONTRATOS ──────────────────────────────────────────────────
  civil_mandato: {
    id: "civil_mandato",
    mensaje: "**El mandato** (Art. 1686 y ss. Código Civil):\n\nContrato por el que una persona (mandante) encarga a otra (mandatario) la realización de uno o más actos jurídicos en su nombre.\n\n**Tipos:**\n• **General:** para todos los negocios del mandante\n• **Especial:** para un negocio determinado (ej. vender un inmueble)\n• **Judicial:** para representar en juicio; requiere escritura pública\n\n**Se extingue por:** revocación, renuncia, muerte o incapacidad de cualquiera de las partes.",
  },
  civil_arrendamiento: {
    id: "civil_arrendamiento",
    mensaje: "**El arrendamiento** (Art. 1880 y ss. Código Civil):\n\nContrato por el que el arrendante cede el uso de un bien al arrendatario por tiempo determinado y a cambio de una renta.\n\n**Obligaciones del arrendante:**\n• Entregar el bien en buen estado\n• Garantizar el uso pacífico durante el contrato\n\n**Obligaciones del arrendatario:**\n• Pagar la renta pactada puntualmente\n• Conservar el bien sin deteriorarlo\n• Restituirlo al vencimiento\n\nEl incumplimiento del arrendatario habilita el **desahucio** judicial.",
  },

  // ── EXPANSIÓN: PROCESO PENAL ──────────────────────────────────────────────
  penal_flagrancia: {
    id: "penal_flagrancia",
    mensaje: "**Flagrancia** (Art. 257 CPP):\n\nSe considera en flagrancia quien es sorprendido en el momento mismo de cometer el delito o inmediatamente después mientras es perseguido.\n\n**En flagrancia:**\n• Cualquier persona puede detener al sindicado y entregarlo a la PNC\n• La PNC puede aprehenderlo sin orden judicial\n• Debe presentarse ante juez en máximo **6 horas**\n• Los Juzgados de Turno tramitan el **proceso de flagrancia**, que puede resolverse en una sola audiencia con el proceso abreviado.",
  },
  penal_suspension: {
    id: "penal_suspension",
    mensaje: "**Suspensión condicional de la persecución penal** (Art. 27 CPP):\n\nEl proceso se suspende hasta **5 años** si el imputado:\n• No tiene antecedentes penales\n• Admite los hechos\n• Repara el daño a la víctima\n• Cumple las condiciones del juez (trabajo comunitario, presentaciones periódicas, etc.)\n\n**Si cumple:** el juez decreta **sobreseimiento** y el proceso se archiva definitivamente.\n**Si incumple:** se reactiva la persecución penal desde el punto en que fue suspendida.",
  },

  // ── EXPANSIÓN: DERECHO LABORAL ────────────────────────────────────────────
  laboral_igss: {
    id: "laboral_igss",
    mensaje: "**IGSS — Instituto Guatemalteco de Seguridad Social** (Art. 100 CPRG):\n\nInstitución autónoma que cubre a los trabajadores del sector formal.\n\n**Programas principales:**\n• **IVS:** pensiones por vejez (65 años), invalidez o sobrevivencia\n• **Accidentes:** cobertura de accidentes laborales y en el trayecto\n• **Enfermedad y Maternidad:** atención médica y hospitalaria\n\n**Cuotas mensuales:**\n• Patrono: **12.67%** del salario\n• Trabajador: **4.83%** del salario",
  },
  laboral_sindicatos: {
    id: "laboral_sindicatos",
    mensaje: "**Sindicatos y huelga** (Arts. 211-241 Código de Trabajo):\n\n**Sindicato:** asociación permanente de trabajadores para defender sus intereses. Se necesitan al menos **20 trabajadores** para formarlo.\n\n**Huelga legal**, para ser válida debe:\n• Ser aprobada por más del **50%** de los trabajadores\n• Agotar el procedimiento de conciliación ante Tribunales de Trabajo\n• No afectar servicios esenciales (agua, hospitales, energía eléctrica)\n\nEl **paro patronal** es el equivalente del lado del empleador.",
  },

  // ── DERECHO NOTARIAL ──────────────────────────────────────────────────────
  menu_notarial: {
    id: "menu_notarial",
    mensaje: "El Derecho Notarial regula la función del notario como fedatario público en Guatemala (Código de Notariado, Decreto 314). ¿Qué aspecto deseas conocer?",
    opciones: [
      { texto: "¿Qué es el protocolo notarial?",      siguiente: "notarial_protocolo" },
      { texto: "Escritura pública vs. acta notarial",  siguiente: "notarial_instrumentos" },
      { texto: "El testamento notarial",               siguiente: "notarial_testamento" },
      { texto: "Fe pública y principios notariales",   siguiente: "notarial_principios" },
      { texto: "Prohibiciones del notario",            siguiente: "notarial_prohibiciones" },
      { texto: "Archivo General de Protocolos",        siguiente: "notarial_archivo" },
    ],
  },
  notarial_protocolo: {
    id: "notarial_protocolo",
    mensaje: "**El protocolo notarial** (Art. 8, Código de Notariado, Decreto 314):\n\nColección ordenada de los instrumentos públicos que el notario autoriza durante el año.\n\n• Incluye escrituras matrices, actas de protocolación y razones de legalización de firmas\n• Los folios deben estar numerados en orden cronológico\n• Queda bajo custodia y responsabilidad del notario\n• Al cierre del año, se remite un testimonio especial al Archivo General de Protocolos en los primeros **25 días de enero**",
  },
  notarial_instrumentos: {
    id: "notarial_instrumentos",
    mensaje: "**Escritura pública:**\nInstrumenta negocios jurídicos (contratos, testamentos, constitución de sociedades). Exige declaración de voluntad y disposición de derechos. Las partes deben firmar.\n\n**Acta notarial:**\nHace constar hechos, situaciones o circunstancias que el notario percibe directamente (actas de notoriedad, de presencia, de protesto). No es indispensable la disposición de derechos ni la participación de otras partes.\n\nAmbas tienen plena fe pública.",
  },
  notarial_testamento: {
    id: "notarial_testamento",
    mensaje: "**El testamento notarial** (Art. 954 Código Civil):\n\nEs el más utilizado en Guatemala; se otorga en escritura pública.\n\n**Formalidades:**\n• Presencia del testador, el notario y **dos testigos hábiles**\n• El notario lee el instrumento en voz alta\n• El testador ratifica que refleja su voluntad\n• Todos firman en el mismo acto\n\n**Prohibición:** los herederos o legatarios instituidos en ese mismo testamento, así como sus cónyuges, **no pueden ser testigos**.",
  },
  notarial_principios: {
    id: "notarial_principios",
    mensaje: "**Principios fundamentales del Derecho Notarial guatemalteco:**\n\n• **Fe pública notarial:** los actos autorizados por el notario se presumen auténticos y verídicos hasta prueba en contrario\n• **Consentimiento libre:** el notario debe cerciorarse de que las partes actúan sin coacción, dolo ni error antes de autorizar el instrumento\n• **Sistema notarial latino:** el notario es un jurista que asesora, redacta y da forma jurídica preventiva (no un simple autenticador de firmas)\n• **Función preventiva:** su objetivo es evitar litigios futuros",
  },
  notarial_prohibiciones: {
    id: "notarial_prohibiciones",
    mensaje: "**Prohibiciones del notario guatemalteco** (Art. 18, Código de Notariado):\n\nEl notario NO puede autorizar actos en que tengan interés directo:\n• Él mismo\n• Su cónyuge\n• Sus parientes dentro de los grados señalados por la ley\n\nAutorizar un instrumento en esas condiciones puede generar la **nulidad** del acto y responsabilidad disciplinaria o penal para el notario. Es una garantía de imparcialidad del fedatario público.",
  },
  notarial_archivo: {
    id: "notarial_archivo",
    mensaje: "**Archivo General de Protocolos:**\n\n• Dependencia del Organismo Judicial\n• Recibe los testimonios especiales de todos los instrumentos del año\n• El notario debe remitirlos en los primeros **25 días de enero**\n• El protocolo original permanece bajo custodia del notario\n• Si el notario fallece o queda inhabilitado, el protocolo pasa al Archivo para su custodia definitiva\n• Cualquier persona puede solicitar copia de instrumentos registrados, previo pago de aranceles",
  },

  // ── DERECHO DE FAMILIA ────────────────────────────────────────────────────
  menu_familia: {
    id: "menu_familia",
    mensaje: "El Derecho de Familia regula matrimonio, unión de hecho, filiación, alimentos y adopción (Código Civil, Decreto-Ley 106). ¿Qué tema deseas consultar?",
    opciones: [
      { texto: "El matrimonio",               siguiente: "familia_matrimonio" },
      { texto: "Regímenes económicos",        siguiente: "familia_regimenes" },
      { texto: "La unión de hecho",           siguiente: "familia_union" },
      { texto: "Patria potestad y tutela",    siguiente: "familia_patria" },
      { texto: "El divorcio",                 siguiente: "familia_divorcio" },
      { texto: "Adopción y filiación",        siguiente: "familia_adopcion" },
      { texto: "Obligación de alimentos",     siguiente: "familia_alimentos" },
    ],
  },
  familia_matrimonio: {
    id: "familia_matrimonio",
    mensaje: "**El matrimonio en Guatemala** (Art. 78 y ss. Código Civil):\n\n• Institución social y legal de vida en común entre dos personas\n• Edad mínima sin autorización: **18 años**\n• Con autorización de padres o tutor: desde los **16 años**\n• Puede celebrarse ante **alcalde municipal o notario**\n• Produce plena igualdad de derechos y obligaciones entre los cónyuges\n• Se disuelve únicamente por muerte o divorcio declarado legalmente",
  },
  familia_regimenes: {
    id: "familia_regimenes",
    mensaje: "**Regímenes económicos del matrimonio** (Art. 122 Código Civil):\n\n• **Comunidad absoluta:** todos los bienes son comunes, sin importar quién los adquirió\n• **Separación absoluta:** cada cónyuge administra su patrimonio con total independencia\n• **Comunidad de gananciales:** los bienes adquiridos *durante* el matrimonio se dividen por igual; los anteriores permanecen propios\n\nA falta de capitulaciones matrimoniales se aplica la **comunidad de gananciales** por defecto.",
  },
  familia_union: {
    id: "familia_union",
    mensaje: "**Unión de hecho** (Art. 173 Código Civil):\n\nUnión estable y singular entre hombre y mujer con vida en común por más de **3 años**.\n\n**Para producir efectos jurídicos debe declararse:**\n• Ante **notario** (si ambos lo solicitan voluntariamente)\n• Ante **juez de familia** (si hay controversia)\n\n**Efectos:** régimen económico sobre bienes adquiridos, derecho de alimentos y derechos sucesorios equivalentes al matrimonio. La declaración es retroactiva al inicio de la convivencia.",
  },
  familia_patria: {
    id: "familia_patria",
    mensaje: "**Patria potestad** (Art. 252 y ss. Código Civil):\n\nConjunto de derechos y obligaciones de ambos padres sobre sus hijos menores no emancipados.\n\n**Comprende:**\n• Representación legal del menor\n• Administración de sus bienes\n• Crianza, educación y corrección\n\n**La tutela** reemplaza a la patria potestad cuando el menor carece de padres; el tutor es designado por testamento, juez o la familia.\n\nAmbas son irrenunciables e intransmisibles.",
  },
  familia_divorcio: {
    id: "familia_divorcio",
    mensaje: "**El divorcio en Guatemala** (Art. 154 y ss. Código Civil):\n\n**Por mutuo consentimiento:**\n• Ante **notario**: si no hay hijos menores ni bienes que liquidar\n• Ante **juez de familia**: si hay hijos menores o bienes comunes\n\n**Contencioso (causas legales):**\n• Adulterio, maltrato físico o psicológico, abandono injustificado, separación de hecho por más de un año, entre otras (Art. 155 CC)\n\nEl divorcio disuelve el vínculo y permite volver a contraer nupcias.",
  },
  familia_adopcion: {
    id: "familia_adopcion",
    mensaje: "**La adopción en Guatemala** (Ley de Adopciones, Decreto 77-2007):\n\nSe reconoce la **adopción plena**, que:\n• Equipara al adoptado con un hijo biológico\n• Le otorga los apellidos del adoptante\n• Le concede iguales derechos hereditarios\n• Extingue los vínculos jurídicos con la familia de origen\n• Es **irrevocable**\n\nEl **Consejo Nacional de Adopciones (CNA)** supervisa el proceso. La adopción internacional está sujeta al Convenio de La Haya.",
  },
  familia_alimentos: {
    id: "familia_alimentos",
    mensaje: "**Obligación de alimentos** (Art. 278 y ss. Código Civil):\n\nComprende: manutención, habitación, vestuario, asistencia médica y educación.\n\n**Obligados (en orden de prelación):**\n1. Cónyuge\n2. Padres\n3. Abuelos\n4. Hermanos\n\n**Características:**\n• Irrenunciables e incompensables\n• Se fijan según necesidades del alimentado y posibilidades del obligado\n• El incumplimiento puede derivar en proceso penal por **negación de asistencia económica**",
  },

  // ── DERECHO TRIBUTARIO ────────────────────────────────────────────────────
  menu_tributario: {
    id: "menu_tributario",
    mensaje: "El sistema tributario guatemalteco está regulado por el Código Tributario (Decreto 6-91). ¿Qué tema deseas consultar?",
    opciones: [
      { texto: "¿Qué es un tributo?",                    siguiente: "tributario_concepto" },
      { texto: "El IVA en Guatemala",                    siguiente: "tributario_iva" },
      { texto: "El ISR (Impuesto sobre la Renta)",       siguiente: "tributario_isr" },
      { texto: "La SAT y sus funciones",                 siguiente: "tributario_sat" },
      { texto: "Evasión y defraudación tributaria",      siguiente: "tributario_evasion" },
      { texto: "Principios constitucionales tributarios",siguiente: "tributario_principios" },
    ],
  },
  tributario_concepto: {
    id: "tributario_concepto",
    mensaje: "**¿Qué es un tributo?** (Código Tributario, Decreto 6-91):\n\nPrestación pecuniaria que el Estado exige a los contribuyentes para financiar el gasto público.\n\n**Tipos:**\n• **Impuestos:** sin contraprestación directa (IVA, ISR, IUSI)\n• **Tasas:** el Estado presta un servicio específico al contribuyente (tasa de migración, tasa de registro)\n• **Contribuciones especiales:** financian obras que benefician a un sector determinado\n\nSolo el **Congreso** puede crear tributos (principio de legalidad tributaria, Art. 239 CPRG).",
  },
  tributario_iva: {
    id: "tributario_iva",
    mensaje: "**IVA en Guatemala** (Ley del IVA, Decreto 27-92):\n\n• **Tasa:** 12% sobre el precio de venta de bienes y servicios\n• **Destino:** 10.5% al Estado y 1.5% a los municipios (IVA-PAZ)\n• Impuesto **indirecto:** recae económicamente en el consumidor final\n• El vendedor declara y paga ante la SAT mensualmente\n\n**Exentos de IVA:** exportaciones, algunos servicios médicos, educación pública, entre otros.\n\nCada compra genera una **factura** que es el comprobante del IVA pagado.",
  },
  tributario_isr: {
    id: "tributario_isr",
    mensaje: "**ISR — Impuesto Sobre la Renta** (Decreto 10-2012):\n\n**Trabajo asalariado:**\n• 5% sobre rentas hasta Q30,000 anuales\n• 7% sobre el excedente\n\n**Actividades lucrativas (empresas):**\n• **Régimen sobre utilidades:** 25% sobre la renta neta\n• **Régimen simplificado opcional:** 5% o 7% según ingresos brutos mensuales\n\nEl régimen más conveniente depende del nivel de costos y deducciones de cada empresa o persona individual.",
  },
  tributario_sat: {
    id: "tributario_sat",
    mensaje: "**SAT — Superintendencia de Administración Tributaria** (Decreto 1-98):\n\nEntidad estatal descentralizada con autonomía funcional y presupuestaria.\n\n**Funciones:**\n• Recaudar impuestos internos (ISR, IVA, IUSI, etc.)\n• Fiscalizar y auditar a los contribuyentes\n• Controlar el comercio exterior (aduanas)\n• Cobrar la deuda tributaria (proceso económico-coactivo)\n• Aplicar sanciones por incumplimiento\n\nEl **Ministerio de Finanzas Públicas** dirige la política fiscal; la SAT la ejecuta.",
  },
  tributario_evasion: {
    id: "tributario_evasion",
    mensaje: "**Evasión vs. elusión tributaria:**\n\n**Evasión (ilegal):**\nOmisión dolosa del pago de tributos.\n• Multas de hasta el 100% del impuesto omitido\n• Recargos del 12% anual\n• Responsabilidad penal (Art. 358 C Código Penal): prisión de 1 a 6 años cuando el monto supera **Q100,000**\n\n**Elusión (legal):**\nPlanificación fiscal que aprovecha exenciones y deducciones que la propia ley permite. No es ilegal.",
  },
  tributario_principios: {
    id: "tributario_principios",
    mensaje: "**Principios constitucionales tributarios** (Arts. 239 y 243 CPRG):\n\n• **Legalidad:** solo el Congreso puede crear, modificar o suprimir impuestos mediante decreto\n• **Capacidad de pago:** quien más tiene, más tributa; el sistema debe ser justo y equitativo\n• **Prohibición de doble tributación:** no puede cobrarse dos veces el mismo impuesto sobre el mismo hecho generador al mismo contribuyente en el mismo período\n• **No confiscatoriedad:** los tributos no pueden ser tan elevados que equivalgan a confiscar el patrimonio del contribuyente",
  },

  // ── DERECHOS HUMANOS ──────────────────────────────────────────────────────
  menu_ddhh: {
    id: "menu_ddhh",
    mensaje: "Los derechos humanos en Guatemala están protegidos por la Constitución y tratados internacionales. ¿Qué deseas saber?",
    opciones: [
      { texto: "Garantías constitucionales (resumen)",  siguiente: "ddhh_garantias" },
      { texto: "Sistema Interamericano de DDHH",         siguiente: "ddhh_interamericano" },
      { texto: "El Procurador de DDHH (PDH)",            siguiente: "ddhh_pdh" },
      { texto: "Derechos del detenido",                  siguiente: "ddhh_detenido" },
      { texto: "Tratados de DDHH y su rango legal",      siguiente: "ddhh_tratados" },
      { texto: "Derechos de los pueblos indígenas",      siguiente: "ddhh_indigenas" },
    ],
  },
  ddhh_garantias: {
    id: "ddhh_garantias",
    mensaje: "**Garantías constitucionales en Guatemala** (Decreto 1-86):\n\n• **Amparo:** protege contra actos arbitrarios de autoridad que violen derechos fundamentales. Lo conoce cualquier tribunal con jurisdicción en el lugar del acto.\n\n• **Exhibición personal (hábeas corpus):** tutela la libertad física frente a detenciones ilegales. El juez resuelve en **24 horas**.\n\n• **Inconstitucionalidad:** expulsa normas contrarias a la Constitución. La conoce la **Corte de Constitucionalidad (CC)**.",
  },
  ddhh_interamericano: {
    id: "ddhh_interamericano",
    mensaje: "**Sistema Interamericano de DDHH:**\n\nGuatemala es parte de la **Convención Americana sobre Derechos Humanos** (Pacto de San José).\n\n**Órganos:**\n• **CIDH:** recibe peticiones individuales cuando se agotan los recursos internos; investiga y puede someter casos a la Corte\n• **Corte IDH:** tribunal internacional cuyas sentencias son **vinculantes** para Guatemala; puede ordenar reparaciones, indemnizaciones y reformas legislativas\n\nPrimero debe agotarse la vía interna en Guatemala antes de acudir al sistema interamericano.",
  },
  ddhh_pdh: {
    id: "ddhh_pdh",
    mensaje: "**Procurador de los Derechos Humanos — PDH** (Art. 273 CPRG):\n\n• Comisionado del **Congreso de la República**\n• Período: **5 años**\n• Defiende los derechos constitucionales frente a abusos de la administración pública\n\n**Funciones:**\n• Investigar denuncias ciudadanas\n• Supervisar a la administración pública\n• Emitir censuras públicas a funcionarios\n• Proponer medidas legislativas\n\n⚠️ No tiene facultades jurisdiccionales: no puede dictar sentencias ni multas.",
  },
  ddhh_detenido: {
    id: "ddhh_detenido",
    mensaje: "**Derechos del detenido en Guatemala** (Arts. 6-11 CPRG):\n\n• Ser informado inmediatamente de la causa de su detención\n• No ser sometido a torturas ni tratos degradantes\n• Ser presentado ante juez en máximo **6 horas**\n• Guardar silencio (no declarar contra sí mismo)\n• Contar con defensor de su elección o de oficio\n• **Presunción de inocencia** hasta sentencia condenatoria firme\n• No ser juzgado dos veces por el mismo delito (**non bis in idem**)",
  },
  ddhh_tratados: {
    id: "ddhh_tratados",
    mensaje: "**Tratados de DDHH y su rango** (Art. 46 CPRG):\n\n'Los tratados y convenciones en materia de derechos humanos ratificados por Guatemala tienen **preeminencia** sobre el derecho interno.'\n\n**Principales tratados ratificados:**\n• Convención Americana sobre DDHH (Pacto de San José)\n• Pacto Internacional de Derechos Civiles y Políticos\n• Convención sobre los Derechos del Niño\n• CEDAW (derechos de la mujer)\n\nPrevalecen sobre las leyes ordinarias, pero **no** sobre la Constitución misma.",
  },
  ddhh_indigenas: {
    id: "ddhh_indigenas",
    mensaje: "**Derechos de los pueblos indígenas en Guatemala:**\n\n**Constitución** (Arts. 66-70 CPRG):\n• Reconoce el derecho a mantener identidad cultural, idioma, trajes y costumbres\n• El Estado puede reconocer las normas consuetudinarias de las comunidades\n\n**Convenio 169 de la OIT** (ratificado):\n• Derecho a **consulta previa** ante proyectos que afecten sus territorios\n• Derecho a sus propias instituciones sociales, económicas y culturales\n\n**COCODES y COMUDES:** formas de participación comunitaria reconocidas por ley en Guatemala.",
  },

  // ── ORGANISMOS DEL ESTADO ─────────────────────────────────────────────────
  menu_organismos: {
    id: "menu_organismos",
    mensaje: "Guatemala es una República democrática con separación de poderes (Art. 141 CPRG). ¿Qué organismo deseas conocer?",
    opciones: [
      { texto: "Organismo Legislativo (Congreso)",    siguiente: "organismos_legislativo" },
      { texto: "Organismo Ejecutivo (Presidencia)",   siguiente: "organismos_ejecutivo" },
      { texto: "Organismo Judicial (Tribunales)",     siguiente: "organismos_judicial" },
      { texto: "Corte de Constitucionalidad (CC)",    siguiente: "organismos_cc" },
      { texto: "Ministerio Público (MP)",             siguiente: "organismos_mp" },
      { texto: "Contraloría y otros entes",           siguiente: "organismos_otros" },
    ],
  },
  organismos_legislativo: {
    id: "organismos_legislativo",
    mensaje: "**Organismo Legislativo — Congreso de la República** (Arts. 157-181 CPRG):\n\n• **160 diputados:** 128 distritales + 32 lista nacional\n• Período: **4 años**, con posibilidad de reelección\n\n**Funciones principales:**\n• Decretar, reformar y derogar leyes\n• Aprobar el Presupuesto General de Ingresos y Egresos del Estado\n• Ratificar tratados internacionales\n• Interpelar ministros de Estado\n• Elegir magistrados de la CC, CSJ y PDH",
  },
  organismos_ejecutivo: {
    id: "organismos_ejecutivo",
    mensaje: "**Organismo Ejecutivo** (Arts. 182-202 CPRG):\n\n• Ejercido por el **Presidente y Vicepresidente de la República**\n• Período: **4 años**, sin reelección posible\n• Elección directa; si ningún candidato supera el 50% hay segunda vuelta\n\n**Funciones:**\n• Dirigir la política general del Estado\n• Ejecutar el presupuesto nacional\n• Comandar el Ejército\n• Dictar acuerdos y reglamentos gubernativos\n\nLos **Ministerios de Estado** son sus dependencias para cada sector.",
  },
  organismos_judicial: {
    id: "organismos_judicial",
    mensaje: "**Organismo Judicial** (Arts. 203-222 CPRG):\n\nEjerce la potestad de juzgar y ejecutar lo juzgado en forma exclusiva.\n\n**Estructura (de mayor a menor):**\n1. **Corte Suprema de Justicia (CSJ):** 13 magistrados, 5 años; máxima instancia civil, penal, laboral\n2. **Salas de Apelaciones:** segunda instancia por ramo\n3. **Juzgados de Primera Instancia:** juicio de fondo\n4. **Juzgados de Paz:** menor cuantía y faltas\n\nEl **Presidente del OJ** es elegido entre los magistrados de la CSJ.",
  },
  organismos_cc: {
    id: "organismos_cc",
    mensaje: "**Corte de Constitucionalidad — CC** (Arts. 268-272 CPRG):\n\nTribunal permanente de jurisdicción privativa para defender el orden constitucional.\n\n• **5 magistrados titulares + 5 suplentes**, período de 5 años\n• Designados por: CSJ, Congreso, Ejecutivo, USAC y Colegio de Abogados\n\n**Funciones:**\n• Conocer la inconstitucionalidad general de leyes\n• Resolver amparos en apelación\n• Emitir opinión en reformas constitucionales\n\nSus fallos son **vinculantes** para todos los poderes del Estado.",
  },
  organismos_mp: {
    id: "organismos_mp",
    mensaje: "**Ministerio Público — MP** (Art. 251 CPRG):\n\nInstitución auxiliar de la justicia con **autonomía funcional**. No depende del Ejecutivo.\n\n**Función principal:** ejercer la persecución penal pública; dirigir la investigación criminal con la PNC.\n\n**Estructura:**\n• **Fiscal General:** máxima autoridad, elegida por la CSJ; período 4 años\n• **Fiscalías especializadas:** FECI (anticorrupción), Fiscalía de la Mujer, de Menores, de DDHH, etc.\n\nEl MP actúa en nombre del Estado, pero con plena independencia política.",
  },
  organismos_otros: {
    id: "organismos_otros",
    mensaje: "**Otros entes constitucionales de Guatemala:**\n\n• **Contraloría General de Cuentas** (Art. 232): fiscaliza fondos y bienes del Estado; su titular es elegido por el Congreso\n\n• **Procuraduría General de la Nación** (Art. 252): asesora y representa legalmente al Estado en juicio\n\n• **Tribunal Supremo Electoral — TSE** (Art. 175): organiza y califica los procesos electorales; máxima autoridad electoral\n\n• **Banco de Guatemala — BANGUAT** (Art. 132): banco central; emite la moneda y regula el sistema financiero nacional",
  },

  // ── DERECHO PROCESAL CIVIL ────────────────────────────────────────────────
  menu_procesal_civil: {
    id: "menu_procesal_civil",
    mensaje: "El Código Procesal Civil y Mercantil (Decreto Ley 107) regula los procesos civiles en Guatemala. ¿Qué aspecto te interesa?",
    opciones: [
      { texto: "Tipos de juicios civiles",   siguiente: "procesal_tipos" },
      { texto: "Medidas cautelares",         siguiente: "procesal_cautelares" },
      { texto: "El recurso de apelación",    siguiente: "procesal_apelacion" },
      { texto: "La cosa juzgada",            siguiente: "procesal_cosajuzgada" },
      { texto: "Ejecución de sentencias",    siguiente: "procesal_ejecucion" },
    ],
  },
  procesal_tipos: {
    id: "procesal_tipos",
    mensaje: "**Tipos de juicios en el CPCYM:**\n\n• **Ordinario:** asuntos de mayor complejidad; plazos amplios y doble instancia\n• **Oral:** alimentos, asuntos de familia de menor cuantía, rendición de cuentas; ágil con audiencias\n• **Sumario:** arrendamientos, deuda líquida y exigible, responsabilidad civil\n• **Arbitral:** las partes someten el conflicto a árbitros privados\n\nElegir el tipo incorrecto puede derivar en excepciones procesales del demandado y retraso del juicio.",
  },
  procesal_cautelares: {
    id: "procesal_cautelares",
    mensaje: "**Medidas cautelares** (Art. 516 y ss. CPCYM):\n\nProvindencias que aseguran el resultado del proceso antes de que haya sentencia:\n\n• **Arraigo:** impide al demandado salir del país\n• **Embargo:** afecta bienes del deudor para garantizar el pago\n• **Secuestro:** desapoderamiento de bienes específicos\n• **Anotación de demanda:** publicidad registral del litigio\n• **Intervención judicial:** el juzgado administra una empresa o negocio\n\nRequieren acreditar **verosimilitud del derecho** y **peligro en la demora**.",
  },
  procesal_apelacion: {
    id: "procesal_apelacion",
    mensaje: "**Recurso de apelación civil** (Art. 602 CPCYM):\n\n• Recurso ordinario contra resoluciones de primera instancia\n• Plazo: **3 días** para autos; **5 días** para sentencias definitivas\n• Se interpone ante el mismo juez que dictó la resolución\n• Lo resuelve la **Sala de la Corte de Apelaciones** del ramo civil\n• No se admiten pruebas nuevas salvo excepciones legales\n• Contra segunda instancia procede, en casos muy específicos, el **recurso de casación** ante la CSJ",
  },
  procesal_cosajuzgada: {
    id: "procesal_cosajuzgada",
    mensaje: "**La cosa juzgada:**\n\nCalidad de la sentencia firme que la hace inmutable e irrecurrible.\n\n**Dos efectos:**\n• **Negativo (non bis in idem):** no puede iniciarse un nuevo proceso sobre el mismo objeto, entre las mismas partes y con la misma causa\n• **Positivo:** lo resuelto debe ser acatado en procesos posteriores relacionados\n\nGarantía fundamental de **seguridad jurídica**: da certeza de que el conflicto quedó definitivamente resuelto y el fallo es obligatorio.",
  },
  procesal_ejecucion: {
    id: "procesal_ejecucion",
    mensaje: "**Ejecución de sentencias:**\n\nCuando el condenado no cumple voluntariamente, el acreedor pide al juez que la ejecute coactivamente.\n\n**Modalidades:**\n• **Vía de apremio:** para títulos ejecutivos (cheque, letra, pagaré, sentencia firme); embargo y remate son inmediatos\n• **Ejecución colectiva (quiebra):** cuando el deudor es insolvente con múltiples acreedores\n• En obligaciones de hacer o no hacer, el juez puede aplicar **multas o arresto hasta 5 días** para forzar el cumplimiento",
  },
};

const MSG_FIN =
  "Si tienes alguna otra duda o necesitas apoyo adicional, puedes escribirnos y con gusto te ayudaremos. 😊";

// ─────────────────────────────────────────────────────────────────────────────

function BotTexto({ texto }: { texto: string }) {
  const partes = texto.split(/\*\*(.*?)\*\*/g);
  return (
    <span className="whitespace-pre-line text-sm leading-relaxed">
      {partes.map((p, i) =>
        i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>
      )}
    </span>
  );
}

export default function ChatBot() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nodoActual, setNodoActual] = useState("inicio");
  const [escribiendo, setEscribiendo] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    const nodo = ARBOL["inicio"];
    setMensajes([{ id: nextId.current++, tipo: "bot", texto: nodo.mensaje }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, escribiendo]);

  const seleccionarOpcion = (opcion: Opcion) => {
    if (escribiendo) return;

    const msgUsuario: Mensaje = {
      id: nextId.current++,
      tipo: "usuario",
      texto: opcion.texto,
    };
    setMensajes((prev) => [...prev, msgUsuario]);
    setEscribiendo(true);

    setTimeout(() => {
      const siguienteNodo = ARBOL[opcion.siguiente];
      setMensajes((prev) => [
        ...prev,
        { id: nextId.current++, tipo: "bot", texto: siguienteNodo.mensaje },
      ]);
      setNodoActual(opcion.siguiente);
      setEscribiendo(false);

      if (!siguienteNodo.opciones) {
        setTimeout(() => {
          setMensajes((prev) => [
            ...prev,
            { id: nextId.current++, tipo: "bot", texto: MSG_FIN },
          ]);
          setFinalizado(true);
        }, 500);
      }
    }, 700);
  };

  const reiniciar = () => {
    nextId.current = 1;
    setNodoActual("inicio");
    setFinalizado(false);
    setEscribiendo(false);
    const nodo = ARBOL["inicio"];
    setMensajes([{ id: nextId.current++, tipo: "bot", texto: nodo.mensaje }]);
  };

  const nodo = ARBOL[nodoActual];
  const opcionesActuales = !finalizado && !escribiendo ? (nodo?.opciones ?? []) : [];

  return (
    <>
      {/* ── Chat window ─────────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 transition-all duration-300 origin-bottom-right ${
          abierto
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl border border-[#9ac1e2] flex flex-col overflow-hidden"
          style={{ maxHeight: "80vh" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Asistente Legal</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <p className="text-[#b2d3ea] text-xs">En línea</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setAbierto(false)}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8fbfe]">
            {mensajes.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.tipo === "usuario" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.tipo === "bot" ? "bg-[#2a628f]" : "bg-[#13293d]"
                  }`}
                >
                  {msg.tipo === "bot" ? (
                    <Bot className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <User className="h-3.5 w-3.5 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl ${
                    msg.tipo === "bot"
                      ? "bg-white border border-[#d8e9f5] text-[#13293d] rounded-bl-sm"
                      : "bg-[#2a628f] text-white rounded-br-sm"
                  }`}
                >
                  <BotTexto texto={msg.texto} />
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {escribiendo && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-[#2a628f] flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="bg-white border border-[#d8e9f5] rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-[#9ac1e2] rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Options panel */}
          <div className="border-t border-[#d8e9f5] bg-white flex-shrink-0">
            {finalizado ? (
              <div className="p-3">
                <button
                  onClick={reiniciar}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2a628f] text-white text-sm font-medium hover:bg-[#18435a] transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  Volver al inicio
                </button>
              </div>
            ) : opcionesActuales.length > 0 ? (
              <div className="p-3 flex flex-col gap-2 max-h-52 overflow-y-auto">
                {opcionesActuales.map((op) => (
                  <button
                    key={op.texto}
                    onClick={() => seleccionarOpcion(op)}
                    disabled={escribiendo}
                    className="w-full text-left px-4 py-2.5 rounded-xl border border-[#9ac1e2] text-[#2a628f] text-sm font-medium hover:bg-[#d8e9f5] hover:border-[#2a628f] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {op.texto}
                  </button>
                ))}
              </div>
            ) : null}

            <p className="text-center text-xs text-[#9ac1e2] pb-3 px-3">
              Asistente informativo · No reemplaza asesoría legal
            </p>
          </div>
        </div>
      </div>

      {/* ── FAB button ──────────────────────────────────────────────────── */}
      <button
        onClick={() => setAbierto(!abierto)}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          abierto
            ? "bg-[#13293d] rotate-0"
            : "bg-[#2a628f] hover:bg-[#18435a] hover:scale-110"
        }`}
        aria-label="Abrir asistente legal"
      >
        {abierto ? (
          <X className="h-5 w-5 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
        {!abierto && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
        )}
      </button>
    </>
  );
}
