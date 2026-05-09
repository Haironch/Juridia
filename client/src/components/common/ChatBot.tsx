import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Mensaje {
  id: number;
  tipo: "bot" | "usuario";
  texto: string;
}

const BASE = [
  {
    keywords: ["hola", "buenas", "buenos", "saludos", "hey"],
    respuesta:
      "¡Hola! Soy el asistente legal de Derecho GT. Puedo ayudarte con dudas sobre temas jurídicos, exámenes, tesis y más. ¿En qué te puedo orientar?",
  },
  {
    keywords: ["administrativo", "derecho administrativo"],
    respuesta:
      "El **Derecho Administrativo** es la rama del derecho público que regula la organización, funcionamiento y actividades del Estado y sus relaciones con los ciudadanos. En Guatemala se rige principalmente por la Ley del Organismo Ejecutivo y la Constitución Política.",
  },
  {
    keywords: ["penal", "derecho penal", "código penal"],
    respuesta:
      "El **Derecho Penal** guatemalteco regula los delitos y las penas. Su base es el Decreto 17-73 (Código Penal). Estudia la acción, tipicidad, antijuridicidad y culpabilidad como elementos del delito.",
  },
  {
    keywords: ["civil", "derecho civil", "código civil"],
    respuesta:
      "El **Derecho Civil** regula las relaciones entre personas: contratos, familia, sucesiones y bienes. En Guatemala se rige por el Decreto-Ley 106 (Código Civil). Es la base del ordenamiento jurídico privado.",
  },
  {
    keywords: ["laboral", "trabajo", "derecho laboral", "código de trabajo"],
    respuesta:
      "El **Derecho Laboral** regula las relaciones entre trabajadores y empleadores. En Guatemala lo rige el Código de Trabajo (Decreto 1441). Sus principios son tutelares e irrenunciables para proteger al trabajador.",
  },
  {
    keywords: ["constitucional", "constitución", "carta magna"],
    respuesta:
      "El **Derecho Constitucional** estudia la Constitución Política de Guatemala de 1985. Es la norma suprema del ordenamiento jurídico y consagra los derechos fundamentales, la organización del Estado y las garantías constitucionales.",
  },
  {
    keywords: ["mercantil", "comercial", "comercio", "derecho mercantil"],
    respuesta:
      "El **Derecho Mercantil** regula las actividades comerciales y empresariales. En Guatemala lo rige el Código de Comercio (Decreto 2-70). Incluye sociedades mercantiles, títulos de crédito y contratos comerciales.",
  },
  {
    keywords: ["demanda", "denuncia", "diferencia demanda denuncia"],
    respuesta:
      "**Diferencia entre demanda y denuncia:**\n• **Demanda:** acto procesal civil mediante el cual una persona (demandante) inicia un juicio contra otra (demandado) para exigir un derecho.\n• **Denuncia:** comunicación ante el Ministerio Público o la PNC sobre la comisión de un delito. No inicia directamente un juicio.",
  },
  {
    keywords: ["jurisprudencia", "qué es jurisprudencia"],
    respuesta:
      "La **jurisprudencia** es el conjunto de sentencias y resoluciones reiteradas emitidas por los tribunales, especialmente la Corte Suprema de Justicia y la Corte de Constitucionalidad. En Guatemala constituye fuente del derecho y sirve como guía interpretativa.",
  },
  {
    keywords: ["amparo", "recurso de amparo", "acción de amparo"],
    respuesta:
      "El **amparo** es una garantía constitucional que protege a las personas contra actos arbitrarios del Estado que violen sus derechos fundamentales. Lo regula la Ley de Amparo, Exhibición Personal y de Constitucionalidad (Decreto 1-86).",
  },
  {
    keywords: ["habeas corpus", "exhibición personal"],
    respuesta:
      "El **habeas corpus** (o exhibición personal en Guatemala) protege la libertad física de las personas. Se interpone cuando alguien es detenido ilegalmente o se encuentra en paradero desconocido. Lo conoce la Corte Suprema de Justicia.",
  },
  {
    keywords: ["contrato", "qué es un contrato", "elementos del contrato"],
    respuesta:
      "Un **contrato** es un acuerdo de voluntades entre dos o más personas que crea derechos y obligaciones. Sus elementos esenciales son: consentimiento, objeto lícito y causa lícita. En Guatemala se regula en el Código Civil a partir del artículo 1517.",
  },
  {
    keywords: ["prescripción", "qué es prescripción"],
    respuesta:
      "La **prescripción** es la extinción de un derecho o acción legal por el transcurso del tiempo sin ejercerlo. Puede ser adquisitiva (se adquiere un derecho) o extintiva (se pierde la acción para reclamarlo). Los plazos varían según el tipo de acción.",
  },
  {
    keywords: ["nulidad", "nulidad absoluta", "nulidad relativa"],
    respuesta:
      "La **nulidad** es la invalidez de un acto jurídico por violar normas de orden público:\n• **Absoluta:** no puede sanearse, cualquiera puede alegarla (ej. objeto ilícito).\n• **Relativa:** puede convalidarse y solo la alega el perjudicado (ej. vicios del consentimiento).",
  },
  {
    keywords: ["apelación", "recurso de apelación", "apelar"],
    respuesta:
      "La **apelación** es un recurso procesal mediante el cual una de las partes solicita a un tribunal superior que revise y modifique una resolución del tribunal inferior que le perjudica. Es el recurso ordinario más utilizado en el proceso guatemalteco.",
  },
  {
    keywords: ["tesis", "cómo hacer tesis", "cómo iniciar tesis", "trabajo de graduación"],
    respuesta:
      "Para iniciar tu tesis de derecho en Guatemala:\n1. Elige un tema de investigación jurídica relevante\n2. Formula el problema de investigación y tus objetivos\n3. Presenta el protocolo a tu asesor o unidad de tesis\n4. Desarrolla el marco teórico con fuentes doctrinales y legales\n5. Aplica metodología jurídica (dogmática, comparada, empírica)\n6. Redacta conclusiones y recomendaciones\n\nConsulta siempre el reglamento de tu facultad.",
  },
  {
    keywords: ["examen privado", "examen general", "prueba privada", "temas examen"],
    respuesta:
      "Los temas más frecuentes en el **examen privado de Derecho** en Guatemala incluyen:\n• Derecho Constitucional y garantías\n• Derecho Penal: teoría del delito y tipos penales\n• Derecho Civil: contratos, familia y sucesiones\n• Derecho Procesal Civil y Penal\n• Derecho Administrativo y Municipal\n• Derecho Laboral y Seguridad Social\n• Derecho Mercantil\n\nRevisa el reglamento específico de tu universidad.",
  },
  {
    keywords: ["proceso penal", "etapas proceso penal", "procedimiento penal"],
    respuesta:
      "El **proceso penal guatemalteco** tiene estas etapas:\n1. **Preparatoria:** investigación del MP y la PNC\n2. **Intermedia:** el juez decide si hay mérito para juicio\n3. **Debate (juicio oral):** se presentan pruebas ante el tribunal\n4. **Impugnaciones:** recursos de apelación o casación\n\nSe rige por el Código Procesal Penal (Decreto 51-92).",
  },
  {
    keywords: ["gracias", "muchas gracias", "thank you", "perfecto", "excelente"],
    respuesta:
      "¡Con gusto! Recuerda que puedes explorar más contenido en los cursos y usar el ConstituQuiz para practicar. Cualquier otra duda, aquí estoy. ¡Éxito en tus estudios!",
  },
];

const FALLBACK =
  "No encontré una respuesta específica para esa consulta. Te recomiendo revisar los cursos disponibles en la plataforma o consultar con un profesional del derecho para orientación más detallada. ¿Puedo ayudarte con algo más?";

const BIENVENIDA: Mensaje = {
  id: 0,
  tipo: "bot",
  texto: "¡Hola! Soy el asistente legal de Derecho GT. Puedo responder dudas sobre temas jurídicos guatemaltecos, exámenes, tesis y más. ¿En qué te ayudo?",
};

function buscarRespuesta(input: string): string {
  const texto = input.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  for (const item of BASE) {
    if (item.keywords.some((kw) => texto.includes(kw.normalize("NFD").replace(/[̀-ͯ]/g, "")))) {
      return item.respuesta;
    }
  }
  return FALLBACK;
}

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
  const [mensajes, setMensajes] = useState<Mensaje[]>([BIENVENIDA]);
  const [input, setInput] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let nextId = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, escribiendo]);

  useEffect(() => {
    if (abierto) setTimeout(() => inputRef.current?.focus(), 300);
  }, [abierto]);

  const enviar = () => {
    const texto = input.trim();
    if (!texto) return;

    const msgUsuario: Mensaje = { id: nextId.current++, tipo: "usuario", texto };
    setMensajes((prev) => [...prev, msgUsuario]);
    setInput("");
    setEscribiendo(true);

    setTimeout(() => {
      const respuesta = buscarRespuesta(texto);
      setMensajes((prev) => [
        ...prev,
        { id: nextId.current++, tipo: "bot", texto: respuesta },
      ]);
      setEscribiendo(false);
    }, 700);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  };

  const sugerencias = [
    "¿Qué es el amparo?",
    "¿Qué es jurisprudencia?",
    "Diferencia demanda y denuncia",
    "Temas para examen privado",
  ];

  return (
    <>
      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 transition-all duration-300 origin-bottom-right ${
          abierto ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-[#9ac1e2] flex flex-col overflow-hidden" style={{ maxHeight: "75vh" }}>
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
                className={`flex items-end gap-2 ${msg.tipo === "usuario" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.tipo === "bot" ? "bg-[#2a628f]" : "bg-[#13293d]"
                }`}>
                  {msg.tipo === "bot"
                    ? <Bot className="h-3.5 w-3.5 text-white" />
                    : <User className="h-3.5 w-3.5 text-white" />
                  }
                </div>

                {/* Bubble */}
                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl ${
                  msg.tipo === "bot"
                    ? "bg-white border border-[#d8e9f5] text-[#13293d] rounded-bl-sm"
                    : "bg-[#2a628f] text-white rounded-br-sm"
                }`}>
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

            {/* Sugerencias — solo al inicio */}
            {mensajes.length === 1 && !escribiendo && (
              <div className="pt-1">
                <p className="text-xs text-[#9ac1e2] mb-2 px-1">Preguntas frecuentes:</p>
                <div className="flex flex-wrap gap-2">
                  {sugerencias.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setInput(s); setTimeout(enviar, 50); }}
                      className="text-xs bg-white border border-[#9ac1e2] text-[#2a628f] px-3 py-1.5 rounded-full hover:bg-[#d8e9f5] transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[#d8e9f5] bg-white flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu consulta..."
                className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-[#9ac1e2] focus:outline-none focus:ring-2 focus:ring-[#2a628f]/30 focus:border-[#2a628f] bg-[#f8fbfe] text-[#13293d] placeholder-[#9ac1e2]"
              />
              <button
                onClick={enviar}
                disabled={!input.trim() || escribiendo}
                className="w-10 h-10 rounded-xl bg-[#2a628f] text-white flex items-center justify-center hover:bg-[#18435a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-center text-xs text-[#9ac1e2] mt-2">
              Asistente informativo · No reemplaza asesoría legal
            </p>
          </div>
        </div>
      </div>

      {/* FAB button */}
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

        {/* Ping animado para llamar atención */}
        {!abierto && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
        )}
      </button>
    </>
  );
}
