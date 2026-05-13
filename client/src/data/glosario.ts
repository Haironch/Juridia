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

  // ── Batch 2 ───────────────────────────────────────────────────────────────
  {
    id: "acta-notarial",
    termino: "Acta notarial",
    definicion:
      "Instrumento público en que el notario hace constar hechos, situaciones o circunstancias que percibe directamente, sin que sea indispensable la disposición de derechos ni la comparecencia de otras partes. A diferencia de la escritura pública, no instrumenta negocios jurídicos sino que da fe de realidades.",
    fuente: "Art. 60 Código de Notariado, Decreto 314",
    categoria: "Notarial",
    ejemplo:
      "El notario que presencia la entrega de un bien levanta un acta notarial de entrega, dejando constancia fehaciente del hecho sin necesidad de que las partes dispongan de derechos.",
  },
  {
    id: "antijuridicidad",
    termino: "Antijuridicidad",
    definicion:
      "Elemento del delito que consiste en la contradicción entre la conducta típica del agente y el ordenamiento jurídico en su conjunto. Una conducta típica no es antijurídica si existe una causa de justificación, como la legítima defensa, el estado de necesidad o el cumplimiento de un deber legal.",
    fuente: "Art. 24 bis Código Penal, Decreto 17-73",
    categoria: "Penal",
    ejemplo:
      "Quien mata en legítima defensa realiza una conducta típica (homicidio), pero no antijurídica, porque la ley justifica el uso de la fuerza necesaria para repeler una agresión ilegítima.",
  },
  {
    id: "capacidad-juridica",
    termino: "Capacidad jurídica",
    definicion:
      "Aptitud reconocida por la ley para ser titular de derechos y obligaciones. Se distingue la capacidad de goce —inherente a todo ser humano desde el nacimiento— y la capacidad de ejercicio —para actuar por sí mismo—, que se adquiere a los 18 años.",
    fuente: "Art. 1 y 8 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Un niño de 10 años tiene capacidad de goce (puede heredar) pero no de ejercicio (no puede firmar contratos por sí solo; necesita que su representante legal lo haga en su nombre).",
  },
  {
    id: "culpabilidad",
    termino: "Culpabilidad",
    definicion:
      "Elemento del delito que permite atribuirle el hecho típico y antijurídico a su autor como obra suya. Exige que el sujeto haya actuado con dolo (intención) o culpa (imprudencia) y que fuera imputable al momento del hecho. Sin culpabilidad no puede imponerse pena.",
    fuente: "Art. 11 y 23 Código Penal, Decreto 17-73",
    categoria: "Penal",
    ejemplo:
      "Una persona con trastorno mental severo que cause un daño actúa sin culpabilidad por inimputabilidad; el juez podrá aplicarle una medida de seguridad, pero no una pena de prisión.",
  },
  {
    id: "demanda",
    termino: "Demanda",
    definicion:
      "Acto procesal escrito por el que el actor ejercita una pretensión ante el órgano jurisdiccional, poniendo formalmente en marcha el proceso civil. Debe contener la identificación de las partes, los hechos, el derecho aplicable y la petición concreta al juez.",
    fuente: "Art. 61 CPCYM, Decreto Ley 107",
    categoria: "Procesal",
    ejemplo:
      "Al presentar la demanda de cobro de Q50,000 ante el Juzgado de Primera Instancia Civil, el acreedor da inicio al juicio ordinario y el juez emplaza al demandado para que conteste.",
  },
  {
    id: "denuncia",
    termino: "Denuncia",
    definicion:
      "Comunicación que cualquier persona hace al Ministerio Público o a la Policía Nacional Civil sobre la comisión de un delito de acción pública. A diferencia de la querella, el denunciante no asume un rol procesal activo; solo informa del hecho para que el MP investigue.",
    fuente: "Art. 297 CPP, Decreto 51-92",
    categoria: "Penal",
    ejemplo:
      "Un vecino que presencia un robo puede denunciarlo ante el MP o la PNC; el Ministerio Público queda obligado a investigar aunque la víctima directa no haya actuado.",
  },
  {
    id: "excepcion",
    termino: "Excepción procesal",
    definicion:
      "Medio de defensa que opone el demandado para atacar la forma del proceso (excepciones dilatorias, como la incompetencia) o el fondo de la pretensión (excepciones perentorias, como la prescripción o el pago). Las dilatorias suspenden el proceso; las perentorias lo extinguen.",
    fuente: "Art. 116 y 120 CPCYM, Decreto Ley 107",
    categoria: "Procesal",
    ejemplo:
      "Si el actor presenta una demanda ante un juez que no es competente, el demandado puede oponer la excepción dilatoria de incompetencia para que el caso se traslade al tribunal correcto.",
  },
  {
    id: "filiacion",
    termino: "Filiación",
    definicion:
      "Vínculo jurídico que une a padres e hijos, determinando derechos y obligaciones recíprocos. Puede ser por consanguinidad (biológica) o por adopción (legal). La filiación matrimonial se presume cuando el hijo nace dentro del matrimonio; la extramatrimonial se establece por reconocimiento voluntario o declaración judicial.",
    fuente: "Art. 199 y ss. Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "El hijo nacido durante el matrimonio se presume hijo del marido (filiación matrimonial). Si el padre biológico es otro, la parte interesada debe impugnar esa presunción ante un juez de familia.",
  },
  {
    id: "hecho-generador",
    termino: "Hecho generador",
    definicion:
      "Presupuesto de hecho establecido en la ley tributaria cuya realización origina el nacimiento de la obligación tributaria. Es el elemento que vincula al contribuyente con el Estado, haciendo exigible el pago del tributo.",
    fuente: "Art. 31 Código Tributario, Decreto 6-91",
    categoria: "Tributario",
    ejemplo:
      "En el IVA, el hecho generador es la venta de un bien o la prestación de un servicio; en el instante en que se realiza esa operación nace la obligación de pagar el 12% al Estado.",
  },
  {
    id: "imputado",
    termino: "Imputado",
    definicion:
      "Persona a quien se le atribuye formalmente la comisión de un delito durante el proceso penal, antes de que exista una sentencia condenatoria firme. Goza de la presunción de inocencia y tiene derecho a defensa desde el primer acto del procedimiento.",
    fuente: "Art. 71 CPP, Decreto 51-92",
    categoria: "Penal",
    ejemplo:
      "Desde que el MP formaliza cargos en la primera declaración, la persona pasa a ser imputada. Solo deja de serlo cuando se dicta sentencia absolutoria firme o se sobresee el caso.",
  },
  {
    id: "legado",
    termino: "Legado",
    definicion:
      "Disposición testamentaria a título particular por la que el testador transmite a una persona determinada (legatario) bienes o derechos concretos de su herencia, sin constituirla heredera universal. El legatario solo responde por las deudas del causante hasta el valor de lo recibido.",
    fuente: "Art. 1004 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Si el testador dice 'dejo mi vehículo a mi sobrino Juan', está constituyendo un legado específico; Juan recibirá únicamente el carro, no una parte proporcional de toda la herencia.",
  },
  {
    id: "medida-de-seguridad",
    termino: "Medida de seguridad",
    definicion:
      "Consecuencia jurídica del delito distinta de la pena, aplicable a quienes resultan penalmente inimputables (personas con trastorno mental o menores de edad). Su finalidad es la rehabilitación, custodia o tratamiento, no el castigo. Se impone por tiempo indeterminado hasta que cese la peligrosidad.",
    fuente: "Art. 88 Código Penal, Decreto 17-73",
    categoria: "Penal",
    ejemplo:
      "Una persona con esquizofrenia que comete un delito grave puede ser declarada inimputable por el juez y sometida a internamiento en un establecimiento psiquiátrico como medida de seguridad.",
  },
  {
    id: "notificacion",
    termino: "Notificación",
    definicion:
      "Acto procesal por el que se pone formalmente en conocimiento de las partes o terceros una resolución judicial o administrativa. Es indispensable para que las resoluciones produzcan efectos legales y para que comiencen a correr los plazos para interponer recursos.",
    fuente: "Art. 66 CPCYM, Decreto Ley 107",
    categoria: "Procesal",
    ejemplo:
      "El plazo de 5 días para apelar una sentencia civil empieza a contar desde el día siguiente a la notificación, no desde la fecha en que el juez la dictó.",
  },
  {
    id: "patria-potestad",
    termino: "Patria potestad",
    definicion:
      "Conjunto de derechos y obligaciones que la ley reconoce a los padres sobre la persona y bienes de sus hijos menores no emancipados. Comprende la representación legal, la administración del patrimonio del hijo y su crianza y educación. Es irrenunciable, intransmisible y puede suspenderse o extinguirse por causas graves.",
    fuente: "Art. 252 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Los padres ejercen la patria potestad de manera conjunta. Si uno de ellos maltrata al hijo, el juez de familia puede suspenderle la patria potestad y atribuírsela exclusivamente al otro progenitor.",
  },
  {
    id: "recurso-revocatoria",
    termino: "Recurso de revocatoria",
    definicion:
      "Medio de impugnación ordinario que se interpone ante el mismo órgano que dictó la resolución impugnada, solicitando que la modifique o deje sin efecto. En sede administrativa es el primer recurso que debe agotarse antes de acceder a la vía contencioso-administrativa.",
    fuente: "Art. 7 Ley de lo Contencioso Administrativo, Decreto 119-96",
    categoria: "Procesal",
    ejemplo:
      "Si la SAT emite una resolución sancionando a un contribuyente, este debe interponer el recurso de revocatoria ante la propia SAT dentro del plazo legal antes de poder acudir a los tribunales.",
  },
  {
    id: "sentencia",
    termino: "Sentencia",
    definicion:
      "Resolución definitiva del juez o tribunal que pone fin al proceso, declarando el derecho de las partes sobre el fondo del asunto. Cuando queda firme produce cosa juzgada. Puede ser condenatoria, absolutoria o declarativa según su contenido.",
    fuente: "Art. 141 LOJ, Decreto 2-89",
    categoria: "Procesal",
    ejemplo:
      "En un juicio ordinario de cobro de dinero, la sentencia condena al demandado a pagar la suma adeudada más intereses y costas; una vez notificada y vencidos los plazos de recurso, adquiere firmeza.",
  },
  {
    id: "sucesion",
    termino: "Sucesión",
    definicion:
      "Transmisión del patrimonio —bienes, derechos y obligaciones— de una persona fallecida (causante) a sus sucesores. Puede ser testada, cuando existe testamento válido, o intestada, cuando no hay testamento y la ley determina quiénes heredan y en qué proporción.",
    fuente: "Art. 917 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Cuando una persona muere sin testamento, sus bienes se distribuyen entre herederos legales según el orden que fija el Código Civil: primero los hijos, luego los padres, después los hermanos, y así sucesivamente.",
  },
  {
    id: "testamento",
    termino: "Testamento",
    definicion:
      "Acto personalísimo, unilateral y esencialmente revocable por el que una persona capaz dispone de sus bienes y declara su voluntad para que surta efecto después de su muerte. El más usado en Guatemala es el testamento notarial, otorgado en escritura pública ante notario y dos testigos.",
    fuente: "Art. 935 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Una persona puede cambiar su testamento cuantas veces quiera mientras viva; el que prevalece es siempre el último otorgado, ya que cada nuevo testamento revoca automáticamente los anteriores.",
  },
  {
    id: "tributo",
    termino: "Tributo",
    definicion:
      "Prestación pecuniaria que el Estado exige coactivamente a los contribuyentes en virtud de su poder tributario, para financiar el gasto público. Solo puede crearse por ley. Se clasifica en impuestos, tasas y contribuciones especiales según exista o no contraprestación directa del Estado.",
    fuente: "Art. 9 Código Tributario, Decreto 6-91 · Art. 239 CPRG",
    categoria: "Tributario",
    ejemplo:
      "El IVA es un tributo tipo impuesto (sin contraprestación directa); la tasa de migración es un tributo tipo tasa, porque el Estado presta un servicio específico a quien la paga.",
  },
  {
    id: "tutela",
    termino: "Tutela",
    definicion:
      "Institución que reemplaza a la patria potestad cuando el menor carece de padres que la ejerzan, o cuando un mayor de edad es declarado incapaz. El tutor representa legalmente al pupilo, administra sus bienes y cuida de su persona. Es designado por testamento, por el juez o por la familia.",
    fuente: "Art. 293 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Al quedar huérfano un niño sin abuelos ni parientes cercanos, el juez de familia nombra un tutor dativo —generalmente una persona de confianza— para que lo represente legalmente hasta que cumpla 18 años.",
  },
];

export const CATEGORIAS_GLOSARIO = [
  "Todos",
  ...Array.from(new Set(terminosJuridicos.map((t) => t.categoria))).sort(),
];
