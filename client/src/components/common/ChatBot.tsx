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
      { texto: "📚 Ramas del Derecho",          siguiente: "menu_ramas" },
      { texto: "🎓 Exámenes y Carrera",          siguiente: "menu_examenes" },
      { texto: "⚖️ Garantías Constitucionales",  siguiente: "menu_garantias" },
      { texto: "🔍 Proceso Penal",               siguiente: "menu_proceso_penal" },
      { texto: "📝 Contratos y Obligaciones",    siguiente: "menu_contratos" },
    ],
  },

  // ── RAMAS DEL DERECHO ─────────────────────────────────────────────────────
  menu_ramas: {
    id: "menu_ramas",
    mensaje: "¿Sobre qué rama del Derecho deseas información?",
    opciones: [
      { texto: "Derecho Constitucional", siguiente: "info_constitucional" },
      { texto: "Derecho Penal",           siguiente: "info_penal" },
      { texto: "Derecho Civil",           siguiente: "info_civil" },
      { texto: "Derecho Laboral",         siguiente: "menu_laboral" },
      { texto: "Derecho Mercantil",       siguiente: "info_mercantil" },
      { texto: "Derecho Administrativo",  siguiente: "info_administrativo" },
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
      { texto: "Jornadas de trabajo",      siguiente: "laboral_jornada" },
      { texto: "Aguinaldo y Bono 14",      siguiente: "laboral_prestaciones" },
      { texto: "Despido injustificado",    siguiente: "laboral_despido" },
      { texto: "Salario mínimo",           siguiente: "laboral_salario" },
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
      { texto: "Etapas del proceso penal",   siguiente: "penal_etapas" },
      { texto: "Criterio de oportunidad",    siguiente: "penal_criterio" },
      { texto: "Demanda vs. denuncia",        siguiente: "penal_diferencia" },
      { texto: "Prisión preventiva",          siguiente: "penal_prision" },
      { texto: "Medidas desjudicializadoras", siguiente: "penal_desjudicializadoras" },
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
