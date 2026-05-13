export interface TerminoJuridico {
  id: string;
  termino: string;
  definicion: string;
  fuente: string;
  categoria: string;
  ejemplo?: string;
}

export const terminosJuridicos: TerminoJuridico[] = [
  {
    id: "accion-penal",
    termino: "Acción penal",
    definicion:
      "Facultad del Estado, ejercida a través del Ministerio Público, de perseguir penalmente a quien comete un delito. Es pública, obligatoria e indivisible: una vez iniciada no puede suspenderse salvo causas legales.",
    fuente: "Art. 24 CPP, Decreto 51-92",
    categoria: "Penal",
    ejemplo:
      "Cuando la PNC detiene a alguien en flagrancia, el MP inicia la acción penal de oficio, sin necesidad de que la víctima lo solicite.",
  },
  {
    id: "amparo",
    termino: "Amparo",
    definicion:
      "Garantía constitucional que protege a las personas contra actos arbitrarios de autoridad pública o privada que violen sus derechos fundamentales. Suspende provisionalmente el acto reclamado mientras se resuelve.",
    fuente: "Art. 265 CPRG · Decreto 1-86",
    categoria: "Constitucional",
    ejemplo:
      "Un funcionario despedido ilegalmente puede interponer amparo para suspender los efectos del acto mientras el tribunal resuelve.",
  },
  {
    id: "casacion",
    termino: "Casación",
    definicion:
      "Recurso extraordinario que procede contra sentencias de segunda instancia, únicamente por motivos de fondo (violación de ley) o de forma (vicios procesales graves). Lo conoce la Corte Suprema de Justicia.",
    fuente: "Art. 621 CPCYM, Decreto Ley 107",
    categoria: "Procesal",
    ejemplo:
      "Si una Sala de Apelaciones interpreta incorrectamente el Art. 82 del Código de Trabajo, la parte afectada puede interponer casación ante la CSJ.",
  },
  {
    id: "cosa-juzgada",
    termino: "Cosa juzgada",
    definicion:
      "Calidad que adquiere una sentencia firme que la hace inmutable e irrecurrible. Impide que el mismo asunto sea juzgado nuevamente entre las mismas partes (efecto negativo) y obliga a respetar lo resuelto en procesos posteriores (efecto positivo).",
    fuente: "Art. 155 LOJ, Decreto 2-89",
    categoria: "Procesal",
    ejemplo:
      "Una vez que la sentencia de divorcio queda firme, ninguna de las partes puede volver a plantear el mismo proceso ante otro juez.",
  },
  {
    id: "dolo",
    termino: "Dolo",
    definicion:
      "En Derecho Penal: intención deliberada de cometer un delito sabiendo que el acto es ilícito. En Derecho Civil: maniobra engañosa de una parte para que la otra contrate en condiciones que no aceptaría de conocer la verdad.",
    fuente: "Art. 11 Código Penal, Decreto 17-73 · Art. 1261 CC",
    categoria: "Penal",
    ejemplo:
      "Vender un inmueble ocultando que tiene una hipoteca vigente constituye dolo civil y puede anular el contrato.",
  },
  {
    id: "escritura-publica",
    termino: "Escritura pública",
    definicion:
      "Instrumento público autorizado por notario en el que se hace constar un negocio jurídico (contrato, testamento, constitución de sociedad). Tiene plena fe pública y es el documento más sólido para probar derechos reales.",
    fuente: "Art. 29 Código de Notariado, Decreto 314",
    categoria: "Notarial",
    ejemplo:
      "La compraventa de un bien inmueble en Guatemala debe constar en escritura pública para poder inscribirse en el Registro General de la Propiedad.",
  },
  {
    id: "exhibicion-personal",
    termino: "Exhibición personal",
    definicion:
      "Garantía constitucional que tutela la libertad física. Procede cuando una persona es detenida ilegalmente o sin orden judicial. El juez debe resolver en 24 horas y puede ordenar la inmediata libertad del detenido. También conocida como hábeas corpus.",
    fuente: "Art. 263 CPRG · Decreto 1-86",
    categoria: "Constitucional",
    ejemplo:
      "Si alguien es detenido sin orden judicial y llevado a un lugar desconocido, cualquier persona puede interponer exhibición personal ante la CSJ.",
  },
  {
    id: "flagrancia",
    termino: "Flagrancia",
    definicion:
      "Situación en que una persona es sorprendida en el momento mismo de cometer un delito o inmediatamente después mientras es perseguida. Habilita la detención sin orden judicial. El detenido debe ser presentado al juez en un máximo de 6 horas.",
    fuente: "Art. 257 CPP, Decreto 51-92",
    categoria: "Penal",
    ejemplo:
      "Un agente de la PNC que observa a alguien sustrayendo mercadería de una tienda puede detenerlo en flagrancia sin necesidad de orden del juez.",
  },
  {
    id: "indemnizacion",
    termino: "Indemnización",
    definicion:
      "Compensación económica que debe pagar quien causa un daño a otra persona, con el fin de reparar o resarcir el perjuicio sufrido. En materia laboral, equivale a un mes de salario por año trabajado ante despido injustificado.",
    fuente: "Art. 82 Código de Trabajo, Decreto 1441",
    categoria: "Laboral",
    ejemplo:
      "Un trabajador con 5 años de servicio despedido sin causa tiene derecho a 5 meses de salario como indemnización.",
  },
  {
    id: "jurisprudencia",
    termino: "Jurisprudencia",
    definicion:
      "Conjunto de sentencias reiteradas y uniformes de los tribunales superiores que sirven como criterio de interpretación y fuente auxiliar del Derecho. En Guatemala, la jurisprudencia de la Corte de Constitucionalidad es vinculante para todos los tribunales.",
    fuente: "Art. 2 LOJ, Decreto 2-89",
    categoria: "General",
    ejemplo:
      "Si la CC emite tres sentencias consecutivas interpretando de igual manera un artículo constitucional, ese criterio se convierte en jurisprudencia obligatoria.",
  },
  {
    id: "litis",
    termino: "Litis",
    definicion:
      "Conflicto jurídico sometido ante un tribunal. Una vez trabada la litis (al contestar la demanda), queda fijado el objeto del proceso y las pretensiones de las partes no pueden modificarse sustancialmente.",
    fuente: "Art. 108 CPCYM, Decreto Ley 107",
    categoria: "Procesal",
    ejemplo:
      "Al contestar la demanda de cobro de dinero, el demandado traba la litis y el juez solo podrá resolver sobre los puntos planteados en esa etapa.",
  },
  {
    id: "mandato",
    termino: "Mandato",
    definicion:
      "Contrato por el que una persona (mandante) encarga a otra (mandatario) la realización de actos jurídicos en su nombre. Puede ser general (para todos los negocios), especial (para uno determinado) o judicial (para representar en juicio, que requiere escritura pública).",
    fuente: "Art. 1686 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Al otorgar un poder especial ante notario para vender un inmueble, el propietario constituye un mandato especial a favor del apoderado.",
  },
  {
    id: "non-bis-in-idem",
    termino: "Non bis in idem",
    definicion:
      "Principio que prohíbe juzgar o sancionar a una persona más de una vez por el mismo hecho. Es garantía del debido proceso y fundamento de la institución de la cosa juzgada penal.",
    fuente: "Art. 17 CPRG · Art. 8 CADH",
    categoria: "Constitucional",
    ejemplo:
      "Si una persona es absuelta por robo en sentencia firme, el MP no puede volver a acusarla por ese mismo hecho, aunque aparezcan nuevas evidencias.",
  },
  {
    id: "nulidad",
    termino: "Nulidad",
    definicion:
      "Sanción legal que priva de efectos jurídicos a un acto por contravenir normas de orden público. La nulidad absoluta no puede sanearse y cualquiera puede alegarla; la nulidad relativa solo puede alegarla el perjudicado y es susceptible de convalidación.",
    fuente: "Art. 1301 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Un contrato cuyo objeto sea el tráfico de personas es nulo absolutamente: no produce ningún efecto jurídico sin importar que las partes lo hayan firmado.",
  },
  {
    id: "prescripcion",
    termino: "Prescripción",
    definicion:
      "Extinción de un derecho o de la acción para hacerlo valer por el transcurso del tiempo sin ejercerlo. La prescripción adquisitiva (usucapión) permite adquirir la propiedad; la extintiva hace perder la acción legal para reclamar un derecho.",
    fuente: "Art. 1501 y ss. Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Si un acreedor no cobra su deuda durante 5 años sin interrumpir el plazo, la acción prescribe y el deudor puede oponerla como excepción.",
  },
  {
    id: "protocolo-notarial",
    termino: "Protocolo notarial",
    definicion:
      "Colección ordenada y cronológica de los instrumentos públicos que el notario autoriza durante el año. Queda bajo su custodia y responsabilidad. Al cierre del año, debe remitirse un testimonio especial al Archivo General de Protocolos.",
    fuente: "Art. 8 Código de Notariado, Decreto 314",
    categoria: "Notarial",
    ejemplo:
      "Cada escritura de compraventa que autoriza el notario se integra al protocolo notarial de ese año y recibe un número correlativo único.",
  },
  {
    id: "querella",
    termino: "Querella",
    definicion:
      "Acto por el que la víctima o el agraviado se constituye como sujeto procesal activo en el proceso penal, ejerciendo la acción penal privada o adhiriéndose a la acción pública. A diferencia de la denuncia, quien querella asume un rol activo y formal en el proceso.",
    fuente: "Art. 116 CPP, Decreto 51-92",
    categoria: "Penal",
    ejemplo:
      "La víctima de una estafa puede interponer querella para constituirse como querellante adhesivo y participar activamente junto al MP en la persecución del responsable.",
  },
  {
    id: "sobreseimiento",
    termino: "Sobreseimiento",
    definicion:
      "Resolución judicial que pone fin al proceso penal sin condena al sindicado. El sobreseimiento firme tiene efectos de cosa juzgada e impide reabrir el caso. Puede ser total (todos los cargos) o parcial (algunos cargos).",
    fuente: "Art. 328 CPP, Decreto 51-92",
    categoria: "Penal",
    ejemplo:
      "Si en la etapa intermedia el juez concluye que no existe suficiente evidencia para llevar el caso a juicio oral, dicta sobreseimiento a favor del sindicado.",
  },
  {
    id: "tipicidad",
    termino: "Tipicidad",
    definicion:
      "Elemento del delito que exige que la conducta del sujeto encaje exactamente en la descripción que hace la ley penal (tipo penal). Sin tipicidad no hay delito: 'nullum crimen sine lege' (no hay crimen sin ley previa que lo defina).",
    fuente: "Art. 1 Código Penal, Decreto 17-73",
    categoria: "Penal",
    ejemplo:
      "Para condenar por hurto, el fiscal debe probar que la conducta del acusado cumple todos los elementos del Art. 246 del Código Penal; si falta uno, no hay tipicidad.",
  },
  {
    id: "usucapion",
    termino: "Usucapión",
    definicion:
      "Modo de adquirir la propiedad de un bien por posesión prolongada, pública, pacífica y de buena fe durante el plazo que fija la ley. También llamada prescripción adquisitiva. En Guatemala el plazo general es de 10 años para bienes inmuebles con justo título y de 20 años sin él.",
    fuente: "Art. 642 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Una persona que ha poseído un terreno abandonado de forma pública y pacífica durante más de 20 años puede iniciar un proceso judicial para que se le declare propietario por usucapión.",
  },
];

export const CATEGORIAS_GLOSARIO = [
  "Todos",
  ...Array.from(new Set(terminosJuridicos.map((t) => t.categoria))).sort(),
];
