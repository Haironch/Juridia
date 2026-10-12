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

  // ── Batch 3 — Penal ───────────────────────────────────────────────────────
  {
    id: "prision-preventiva",
    termino: "Prisión preventiva",
    definicion:
      "Medida cautelar que priva de libertad al sindicado durante el proceso penal para asegurar su comparecencia al juicio y evitar obstaculización de la investigación. Solo procede cuando existen indicios de participación en el delito y peligro de fuga o de entorpecimiento de la verdad. Tiene carácter excepcional.",
    fuente: "Art. 259 CPP, Decreto 51-92",
    categoria: "Penal",
    ejemplo:
      "El juez dicta prisión preventiva contra el sindicado de robo agravado porque existen indicios de participación y el imputado no tiene arraigo domiciliario que garantice su presentación al juicio.",
  },
  {
    id: "medidas-sustitutivas",
    termino: "Medidas sustitutivas",
    definicion:
      "Alternativas a la prisión preventiva que el juez puede imponer al sindicado para garantizar su presencia en el proceso sin privarlo de libertad. Incluyen arraigo, presentación periódica ante el juzgado, prohibición de salir del país, caución económica y vigilancia electrónica.",
    fuente: "Art. 264 CPP, Decreto 51-92",
    categoria: "Penal",
    ejemplo:
      "En lugar de ordenar prisión preventiva, el juez impone al sindicado medidas sustitutivas de presentarse cada semana ante el juzgado y no salir del país, considerando que tiene trabajo fijo y domicilio conocido.",
  },
  {
    id: "criterio-de-oportunidad",
    termino: "Criterio de oportunidad",
    definicion:
      "Mecanismo desjudicializador por el que el Ministerio Público puede abstenerse de ejercer la acción penal, con autorización judicial, en delitos de menor trascendencia social o cuando el sindicado haya reparado el daño causado. Extingue la persecución penal.",
    fuente: "Art. 25 CPP, Decreto 51-92",
    categoria: "Penal",
    ejemplo:
      "En un caso de hurto simple donde el imputado devuelve lo robado e indemniza a la víctima, el MP puede solicitar al juez la aplicación del criterio de oportunidad para cerrar el caso sin juicio.",
  },
  {
    id: "suspension-condicional",
    termino: "Suspensión condicional de la persecución penal",
    definicion:
      "Medida desjudicializadora que suspende el proceso penal por un período de prueba (1 a 5 años) durante el cual el sindicado debe cumplir ciertas condiciones (pagar daños, realizar trabajo comunitario, etc.). Si las cumple, se extingue la acción penal; si no, el proceso se reanuda.",
    fuente: "Art. 27 CPP, Decreto 51-92",
    categoria: "Penal",
    ejemplo:
      "Un joven imputado por conducción temeraria acepta suspensión condicional por 2 años con la condición de no reincidir y realizar 100 horas de trabajo comunitario; al cumplirlas, el proceso se cierra definitivamente.",
  },
  {
    id: "tentativa",
    termino: "Tentativa",
    definicion:
      "Grado de ejecución del delito en que el sujeto inicia la acción delictiva con dolo pero no llega a consumar el resultado típico por causas ajenas a su voluntad. Se castiga con pena menor a la del delito consumado.",
    fuente: "Art. 14 Código Penal, Decreto 17-73",
    categoria: "Penal",
    ejemplo:
      "Quien dispara contra otra persona con intención de matarla pero falla por malos reflejos comete tentativa de asesinato; la pena aplicable es inferior a la del delito consumado.",
  },
  {
    id: "complicidad",
    termino: "Complicidad",
    definicion:
      "Forma de participación delictiva en que una persona coopera dolosamente en la ejecución del delito de otro (autor) sin ser coautor. El cómplice presta ayuda antes o durante el hecho. Se castiga con pena menor a la del autor.",
    fuente: "Art. 37 Código Penal, Decreto 17-73",
    categoria: "Penal",
    ejemplo:
      "Quien vigila la calle mientras su compañero roba una tienda actúa como cómplice; recibe una pena menor que el autor material del robo.",
  },
  {
    id: "reincidencia",
    termino: "Reincidencia",
    definicion:
      "Circunstancia agravante de la responsabilidad penal que concurre cuando el condenado comete un nuevo delito doloso después de haber sido condenado por sentencia firme por otro delito de igual o distinta naturaleza. Aumenta la pena aplicable.",
    fuente: "Art. 27 inc. 18 Código Penal, Decreto 17-73",
    categoria: "Penal",
    ejemplo:
      "Una persona condenada por robo que vuelve a robar después de cumplir su condena incurre en reincidencia; el juez podrá imponer una pena mayor al máximo ordinario para ese delito.",
  },
  {
    id: "proceso-abreviado",
    termino: "Proceso abreviado",
    definicion:
      "Procedimiento especial más rápido que el juicio oral ordinario, aplicable cuando la pena máxima del delito no supera 5 años de prisión y el imputado acepta los hechos. El juez resuelve sin debate oral y público. Agiliza la justicia y reduce la carga procesal.",
    fuente: "Art. 464 CPP, Decreto 51-92",
    categoria: "Penal",
    ejemplo:
      "En un caso de hurto con pena máxima de 3 años, el imputado acepta los hechos y se tramita proceso abreviado; el juez dicta sentencia en una sola audiencia sin necesidad de juicio oral.",
  },

  // ── Batch 3 — Constitucional ──────────────────────────────────────────────
  {
    id: "inconstitucionalidad",
    termino: "Inconstitucionalidad",
    definicion:
      "Acción que busca dejar sin vigencia una ley, reglamento o disposición normativa que contradice la Constitución. La inconstitucionalidad general (abstracta) la puede plantear el MP, el Colegio de Abogados y otros sujetos calificados; si la CC la declara, el precepto queda derogado. La inconstitucionalidad en caso concreto la plantea cualquier parte en un proceso.",
    fuente: "Art. 267 y 272 CPRG · Decreto 1-86",
    categoria: "Constitucional",
    ejemplo:
      "Si el Congreso aprueba una ley que restringe la libertad de expresión sin cumplir los requisitos constitucionales, el Colegio de Abogados puede interponer inconstitucionalidad general ante la Corte de Constitucionalidad.",
  },
  {
    id: "supremacia-constitucional",
    termino: "Supremacía constitucional",
    definicion:
      "Principio por el que la Constitución Política de la República ocupa el lugar más alto en el ordenamiento jurídico guatemalteco. Ninguna ley ordinaria puede contradecirla. Todo conflicto entre la Constitución y una ley debe resolverse a favor de la Constitución.",
    fuente: "Art. 44 y 175 CPRG",
    categoria: "Constitucional",
    ejemplo:
      "Si una ley ordinaria establece requisitos que limitan el derecho de asociación más allá de lo permitido por la Constitución, el juez debe inaplicar esa ley por ser contraria al principio de supremacía constitucional.",
  },
  {
    id: "debido-proceso",
    termino: "Debido proceso",
    definicion:
      "Conjunto de garantías procesales mínimas que el Estado debe respetar en todo procedimiento que pueda afectar derechos fundamentales de las personas: juez natural, derecho a ser oído, derecho a defensa, presunción de inocencia, publicidad, imparcialidad y motivación de resoluciones.",
    fuente: "Art. 12 CPRG · Art. 8 CADH",
    categoria: "Constitucional",
    ejemplo:
      "Condenar a una persona sin darle oportunidad de presentar pruebas ni nombrar defensor viola el debido proceso; la sentencia puede ser anulada mediante amparo ante la CC.",
  },
  {
    id: "corte-de-constitucionalidad",
    termino: "Corte de Constitucionalidad",
    definicion:
      "Tribunal permanente, independiente y especializado, de jurisdicción privativa, encargado de la defensa del orden constitucional guatemalteco. Conoce la inconstitucionalidad general, resuelve recursos de apelación de amparo y de exhibición personal, y emite opiniones sobre la constitucionalidad de tratados internacionales.",
    fuente: "Art. 268 CPRG",
    categoria: "Constitucional",
    ejemplo:
      "Cuando una Sala de Apelaciones niega un amparo, la parte afectada puede apelar esa decisión ante la Corte de Constitucionalidad, que emite la resolución definitiva sobre si se violaron derechos fundamentales.",
  },

  // ── Batch 3 — Civil ───────────────────────────────────────────────────────
  {
    id: "contrato",
    termino: "Contrato",
    definicion:
      "Acuerdo de voluntades entre dos o más partes capaces que crean, modifican o extinguen obligaciones. Para ser válido requiere: consentimiento sin vicios, objeto lícito, causa lícita y forma cuando la ley la exige. En Guatemala, la compraventa de inmuebles y los contratos de sociedad requieren escritura pública.",
    fuente: "Art. 1517 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "El arrendamiento de un local comercial es un contrato por el que el arrendante cede el uso del inmueble y el arrendatario se obliga a pagar renta periódica; si supera tres años debe constar en escritura pública.",
  },
  {
    id: "hipoteca",
    termino: "Hipoteca",
    definicion:
      "Derecho real de garantía que grava un bien inmueble sin despojar al dueño de su posesión, para asegurar el cumplimiento de una obligación. Si el deudor no paga, el acreedor puede ejecutar el bien en subasta pública. Debe inscribirse en el Registro General de la Propiedad para ser oponible a terceros.",
    fuente: "Art. 822 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Al obtener un préstamo bancario para comprar casa, el banco exige que el inmueble sea hipotecado como garantía; si el deudor deja de pagar, el banco puede iniciar juicio hipotecario para rematar la propiedad.",
  },
  {
    id: "arrendamiento",
    termino: "Arrendamiento",
    definicion:
      "Contrato por el que una parte (arrendante) cede temporalmente el uso y goce de un bien a otra (arrendatario) a cambio de un precio (renta). El arrendatario no adquiere la propiedad pero sí el derecho de uso durante el plazo pactado. Puede recaer sobre bienes muebles o inmuebles.",
    fuente: "Art. 1880 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "El propietario de un apartamento que lo alquila por Q3,000 mensuales celebra un contrato de arrendamiento; el inquilino tiene derecho a usar el inmueble mientras pague la renta pactada.",
  },
  {
    id: "obligacion",
    termino: "Obligación",
    definicion:
      "Vínculo jurídico por el que una persona (deudor) debe dar, hacer o no hacer algo en favor de otra (acreedor). Las obligaciones nacen de contratos, cuasicontratos, delitos o la ley. Se extinguen principalmente por el pago, la novación, la confusión, la remisión o la prescripción.",
    fuente: "Art. 1319 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Al firmar un pagaré, el suscriptor contrae una obligación de dar (pagar la suma indicada) en favor del acreedor en la fecha pactada.",
  },
  {
    id: "divorcio",
    termino: "Divorcio",
    definicion:
      "Disolución del vínculo matrimonial por resolución judicial o escritura pública. En Guatemala existe el divorcio voluntario (ambos cónyuges de acuerdo, puede tramitarse ante notario si no hay hijos menores) y el divorcio contencioso (uno de los cónyuges lo solicita invocando causales específicas ante el juez de familia).",
    fuente: "Art. 155 Código Civil, Decreto Ley 106 · Decreto 54-77",
    categoria: "Civil",
    ejemplo:
      "Una pareja sin hijos menores y con acuerdo mutuo puede divorciarse ante notario mediante escritura pública sin necesidad de juicio, siempre que liquiden la comunidad de bienes en el mismo instrumento.",
  },
  {
    id: "danos-y-perjuicios",
    termino: "Daños y perjuicios",
    definicion:
      "Mecanismo de reparación civil que obliga a quien causa un daño a resarcirlo económicamente. El 'daño' es el detrimento o pérdida actual sufrida; el 'perjuicio' es la ganancia lícita dejada de obtener. Pueden derivar de incumplimiento contractual o de actos ilícitos extracontractuales.",
    fuente: "Art. 1645 Código Civil, Decreto Ley 106",
    categoria: "Civil",
    ejemplo:
      "Un contratista que entrega la obra con tres meses de retraso debe pagar daños (costo de las reparaciones adicionales causadas por la demora) y perjuicios (rentas que el propietario dejó de percibir por no poder arrendar a tiempo).",
  },

  // ── Batch 3 — Laboral ─────────────────────────────────────────────────────
  {
    id: "contrato-individual-trabajo",
    termino: "Contrato individual de trabajo",
    definicion:
      "Vínculo económico-jurídico por el que una persona (trabajador) queda obligada a prestar servicios personales a otra (patrono) bajo la dirección y dependencia de este, a cambio de una retribución (salario). Puede ser verbal o escrito, por tiempo indefinido o plazo fijo.",
    fuente: "Art. 18 Código de Trabajo, Decreto 1441",
    categoria: "Laboral",
    ejemplo:
      "Aunque no exista contrato escrito, si una persona presta servicios bajo órdenes de un patrono a cambio de salario, la ley presume la existencia de un contrato individual de trabajo con todos sus beneficios.",
  },
  {
    id: "salario-minimo",
    termino: "Salario mínimo",
    definicion:
      "Retribución mínima obligatoria que el patrono debe pagar al trabajador, fijada anualmente por acuerdo gubernativo a propuesta de la Comisión Nacional del Salario. En Guatemala existen salarios mínimos diferenciados para actividades agrícolas, no agrícolas y de exportación y maquila.",
    fuente: "Art. 103 Código de Trabajo, Decreto 1441",
    categoria: "Laboral",
    ejemplo:
      "Un patrono que paga a su empleado de oficina un salario inferior al mínimo no agrícola vigente comete infracción laboral; el trabajador puede denunciarlo ante la Inspección General de Trabajo.",
  },
  {
    id: "jornada-trabajo",
    termino: "Jornada de trabajo",
    definicion:
      "Número máximo de horas que el trabajador puede laborar en un período determinado. En Guatemala la jornada ordinaria diurna es de 8 horas diarias y 44 semanales; la nocturna (18h-6h), de 6 horas diarias y 36 semanales; la mixta, de 7 horas. El trabajo extra se paga con recargo del 50%.",
    fuente: "Art. 116 Código de Trabajo, Decreto 1441",
    categoria: "Laboral",
    ejemplo:
      "Si un empleado labora 10 horas en una jornada diurna, las 2 horas adicionales constituyen tiempo extra y el patrono debe pagarlas con el 50% de recargo sobre el salario ordinario.",
  },
  {
    id: "prestaciones-laborales",
    termino: "Prestaciones laborales",
    definicion:
      "Beneficios económicos adicionales al salario a los que tiene derecho el trabajador guatemalteco: bonificación incentivo mensual (Q250), aguinaldo (1 salario anual en diciembre), bono 14 (1 salario anual en julio), vacaciones (15 días hábiles por año) e indemnización por despido injustificado.",
    fuente: "Art. 82, 130, 136 Código de Trabajo · Decreto 42-92 · Decreto 37-2001",
    categoria: "Laboral",
    ejemplo:
      "Un trabajador con salario de Q3,000 mensuales tiene derecho cada año a Q3,000 de aguinaldo en diciembre, Q3,000 de bono 14 en julio, Q1,500 de vacaciones (15 días) y Q3,000 para el fondo de indemnización.",
  },
  {
    id: "igss",
    termino: "IGSS (Instituto Guatemalteco de Seguridad Social)",
    definicion:
      "Entidad autónoma que administra el régimen de seguridad social en Guatemala. Cubre accidentes, enfermedad, maternidad, invalidez, vejez y muerte. La afiliación es obligatoria para empleados en relación de dependencia; el patrono aporta el 12.67% y el trabajador el 4.83% del salario.",
    fuente: "Art. 100 CPRG · Decreto 295 Ley Orgánica del IGSS",
    categoria: "Laboral",
    ejemplo:
      "Un trabajador que sufre un accidente laboral tiene derecho a que el IGSS cubra sus gastos médicos y hospitalarios, y si queda incapacitado temporalmente recibe un subsidio equivalente al 66.67% de su salario.",
  },
  {
    id: "preaviso",
    termino: "Preaviso",
    definicion:
      "Obligación de notificar con anticipación la terminación del contrato de trabajo. En Guatemala, el trabajador que renuncia voluntariamente debe dar preaviso según su antigüedad: 1 semana (menos de 6 meses), 2 semanas (6 meses a 1 año), 1 mes (más de 1 año). Si no lo da, pierde parte de las vacaciones.",
    fuente: "Art. 83 Código de Trabajo, Decreto 1441",
    categoria: "Laboral",
    ejemplo:
      "Un empleado con 3 años de antigüedad que decide renunciar debe avisar al patrono con un mes de anticipación; si no lo hace, el patrono puede descontarle el equivalente a un mes de vacaciones.",
  },
  {
    id: "huelga",
    termino: "Huelga",
    definicion:
      "Derecho colectivo de los trabajadores a suspender concertadamente las labores para presionar al patrono en una negociación colectiva o en defensa de sus derechos. En Guatemala debe ser declarada legal por los tribunales de trabajo para producir efectos protectores; la huelga ilegal puede dar lugar a despido justificado.",
    fuente: "Art. 241 CPRG · Art. 239 Código de Trabajo, Decreto 1441",
    categoria: "Laboral",
    ejemplo:
      "Los trabajadores de una empresa que no reciben su aguinaldo pueden organizarse en sindicato, agotar la vía de negociación y solicitar al tribunal que declare legal la huelga si el patrono no cumple.",
  },

  // ── Batch 3 — Mercantil ───────────────────────────────────────────────────
  {
    id: "sociedad-anonima",
    termino: "Sociedad anónima",
    definicion:
      "Persona jurídica mercantil cuyo capital está dividido en acciones y en la que los socios responden únicamente hasta el límite de sus aportaciones, sin comprometer su patrimonio personal. Es la forma societaria más utilizada en Guatemala para negocios de mediana y gran escala. Debe inscribirse en el Registro Mercantil.",
    fuente: "Art. 86 Código de Comercio, Decreto 2-70",
    categoria: "Mercantil",
    ejemplo:
      "Si una sociedad anónima quiebra con deudas millonarias, los accionistas solo pierden el capital que invirtieron; los acreedores no pueden ir contra su patrimonio personal.",
  },
  {
    id: "comerciante",
    termino: "Comerciante",
    definicion:
      "Persona individual o jurídica que ejerce en nombre propio y habitualmente actividades calificadas de mercantiles por la ley. Los comerciantes individuales con activos superiores a Q2,000 y las sociedades mercantiles están obligados a inscribirse en el Registro Mercantil.",
    fuente: "Art. 2 Código de Comercio, Decreto 2-70",
    categoria: "Mercantil",
    ejemplo:
      "Un médico que abre una farmacia y compra medicamentos para revenderlos actúa como comerciante individual; debe inscribirse en el Registro Mercantil y llevar los libros contables que exige el Código de Comercio.",
  },
  {
    id: "letra-de-cambio",
    termino: "Letra de cambio",
    definicion:
      "Título de crédito por el que una persona (librador) ordena a otra (librado) pagar una suma determinada de dinero a un tercero beneficiario (tomador) en una fecha establecida. Es un título ejecutivo: ante impago, el portador puede iniciar juicio ejecutivo directamente.",
    fuente: "Art. 441 Código de Comercio, Decreto 2-70",
    categoria: "Mercantil",
    ejemplo:
      "Una empresa emite una letra de cambio por Q50,000 a 90 días a favor de su proveedor; al vencerse el plazo, si no paga, el proveedor puede iniciar un juicio ejecutivo mercantil presentando la letra como título suficiente.",
  },
  {
    id: "pagare",
    termino: "Pagaré",
    definicion:
      "Título de crédito en el que el suscriptor promete incondicionalmente pagar una suma de dinero al beneficiario en una fecha determinada. A diferencia de la letra de cambio, el mismo deudor es quien emite el documento y promete el pago directamente, sin ordenar a un tercero que lo haga.",
    fuente: "Art. 490 Código de Comercio, Decreto 2-70",
    categoria: "Mercantil",
    ejemplo:
      "Al pedir un préstamo personal, el banco exige que el deudor firme un pagaré por el monto prestado más intereses; ese documento es suficiente para iniciar ejecución judicial si el deudor no paga al vencimiento.",
  },
  {
    id: "quiebra",
    termino: "Quiebra",
    definicion:
      "Estado jurídico declarado judicialmente que reconoce la insolvencia definitiva de un comerciante que no puede cumplir sus obligaciones. Al declararse la quiebra, el deudor pierde la administración de sus bienes, los cuales pasan a un síndico que los liquida para pagar a los acreedores según su preferencia legal.",
    fuente: "Art. 379 Código de Comercio, Decreto 2-70",
    categoria: "Mercantil",
    ejemplo:
      "Una empresa que acumula deudas impagables puede pedir su propia quiebra ante el juez mercantil; el juez nombra un síndico que toma el control de los bienes para liquidarlos y distribuir el producto entre acreedores.",
  },
  {
    id: "registro-mercantil",
    termino: "Registro Mercantil",
    definicion:
      "Institución pública donde se inscriben los comerciantes individuales y las sociedades mercantiles, así como los actos y contratos relacionados con el comercio. La inscripción otorga personalidad jurídica a las sociedades y permite oponer sus derechos a terceros.",
    fuente: "Art. 334 CPRG · Art. 333 Código de Comercio, Decreto 2-70",
    categoria: "Mercantil",
    ejemplo:
      "Una sociedad anónima no adquiere personalidad jurídica ni puede firmar contratos en nombre propio hasta que se inscriba en el Registro Mercantil; sin esa inscripción, los socios responden personalmente.",
  },

  // ── Batch 3 — Administrativo ──────────────────────────────────────────────
  {
    id: "acto-administrativo",
    termino: "Acto administrativo",
    definicion:
      "Declaración unilateral de voluntad de un órgano de la Administración Pública que produce efectos jurídicos directos e inmediatos sobre los derechos e intereses de los administrados. Para ser válido debe emanar de órgano competente, tener objeto lícito, forma prescrita y motivación suficiente.",
    fuente: "Art. 1 Ley de lo Contencioso Administrativo, Decreto 119-96",
    categoria: "Administrativo",
    ejemplo:
      "La resolución de la SAT que sanciona a un contribuyente con una multa es un acto administrativo; el afectado puede impugnarlo mediante el recurso de revocatoria ante la propia SAT y, si no prospera, ante el Tribunal de lo Contencioso Administrativo.",
  },
  {
    id: "silencio-administrativo",
    termino: "Silencio administrativo",
    definicion:
      "Ficción legal según la cual, vencido el plazo legal para que la autoridad administrativa resuelva una solicitud o recurso sin que lo haya hecho, se entiende que la resolución es desfavorable (silencio negativo). Habilita al interesado para acudir a la vía judicial contencioso-administrativa.",
    fuente: "Art. 28 CPRG · Art. 16 Ley de lo Contencioso Administrativo, Decreto 119-96",
    categoria: "Administrativo",
    ejemplo:
      "Si un ciudadano presenta una solicitud de licencia municipal y el municipio no resuelve dentro de los 30 días hábiles, opera el silencio administrativo negativo y el solicitante puede acudir al tribunal contencioso para impugnar la denegación tácita.",
  },
  {
    id: "contencioso-administrativo",
    termino: "Contencioso administrativo",
    definicion:
      "Proceso judicial ante el Tribunal de lo Contencioso Administrativo para controlar la legalidad de los actos de la Administración Pública. Procede cuando se han agotado los recursos administrativos (revocatoria y reposición) y la resolución final sigue siendo desfavorable para el administrado.",
    fuente: "Art. 221 CPRG · Decreto 119-96",
    categoria: "Administrativo",
    ejemplo:
      "Un empleado público separado ilegalmente de su cargo puede, tras agotar los recursos administrativos, demandar al Estado ante el Tribunal de lo Contencioso Administrativo para que se declare nula la remoción y se le reinstale.",
  },
  {
    id: "contratacion-administrativa",
    termino: "Contratación administrativa",
    definicion:
      "Conjunto de normas que rigen los contratos celebrados entre el Estado o sus entidades y los particulares para la adquisición de bienes, servicios, arrendamientos u obras. En Guatemala se rige por la Ley de Contrataciones del Estado y sus reglamentos, que establecen procedimientos de cotización, licitación pública y compra directa.",
    fuente: "Art. 182 CPRG · Decreto 57-92",
    categoria: "Administrativo",
    ejemplo:
      "Para construir un hospital público que costará Q50 millones, el Ministerio de Salud debe abrir una licitación pública nacional, publicarla en el Diario de Centroamérica y adjudicarla a la oferta técnico-económica más ventajosa.",
  },

  // ── Batch 3 — Tributario ──────────────────────────────────────────────────
  {
    id: "isr",
    termino: "ISR — Impuesto Sobre la Renta",
    definicion:
      "Impuesto directo que grava las rentas obtenidas por personas individuales y jurídicas dentro del territorio guatemalteco. Las personas en relación de dependencia tributan bajo el régimen de retención definitiva; los empresarios pueden optar entre el régimen sobre utilidades o el simplificado opcional.",
    fuente: "Decreto 10-2012 Ley de Actualización Tributaria",
    categoria: "Tributario",
    ejemplo:
      "Un empleado que gana Q10,000 mensuales queda sujeto a retención de ISR por parte de su patrono; la empresa calcula el impuesto anual y lo retiene mensualmente para enterarlo a la SAT.",
  },
  {
    id: "iva",
    termino: "IVA — Impuesto al Valor Agregado",
    definicion:
      "Impuesto indirecto del 12% que grava la venta de bienes, la prestación de servicios, las importaciones y los arrendamientos en Guatemala. El consumidor final lo paga; el comerciante lo recauda y lo entera mensualmente a la SAT, pudiendo descontar el crédito fiscal de las compras que realice.",
    fuente: "Decreto 27-92 Ley del IVA",
    categoria: "Tributario",
    ejemplo:
      "Al comprar un artículo de Q100, el consumidor paga Q112: Q100 de precio más Q12 de IVA. La tienda debe reportar ese Q12 a la SAT como débito fiscal, menos el IVA que pagó en sus propias compras (crédito fiscal).",
  },
  {
    id: "sat",
    termino: "SAT — Superintendencia de Administración Tributaria",
    definicion:
      "Entidad estatal descentralizada con competencia y jurisdicción en todo el territorio nacional, encargada de administrar el sistema tributario y la política aduanera de Guatemala. Tiene facultades de fiscalización, cobro y sanción para garantizar el cumplimiento de las obligaciones tributarias.",
    fuente: "Decreto 1-98 Ley Orgánica de la SAT",
    categoria: "Tributario",
    ejemplo:
      "La SAT puede auditar la contabilidad de una empresa de los últimos 4 años para verificar si declaró correctamente sus impuestos; si encuentra diferencias, emite ajustes y puede imponer multas e intereses.",
  },
  {
    id: "defraudacion-tributaria",
    termino: "Defraudación tributaria",
    definicion:
      "Delito cometido por quien mediante engaño, simulación o falsedad deja de pagar al Estado los tributos a los que está obligado o hace que el fisco devuelva o compense tributaciones que no corresponden. Es la modalidad más grave de incumplimiento tributario y conlleva pena de prisión.",
    fuente: "Art. 358 'A' Código Penal, Decreto 17-73",
    categoria: "Tributario",
    ejemplo:
      "Una empresa que presenta facturas falsas para aumentar artificialmente su crédito fiscal y obtener devoluciones indebidas del IVA comete defraudación tributaria; sus administradores pueden ser procesados penalmente.",
  },

  // ── Batch 3 — Notarial ────────────────────────────────────────────────────
  {
    id: "testimonio",
    termino: "Testimonio",
    definicion:
      "Copia fiel y autorizada de una escritura pública o acta notarial que el notario expide para que las partes puedan acreditar y registrar el negocio jurídico celebrado. El primer testimonio se entrega al interesado para inscripción; los subsiguientes son copias adicionales que también tienen plena fe pública.",
    fuente: "Art. 66 Código de Notariado, Decreto 314",
    categoria: "Notarial",
    ejemplo:
      "Luego de autorizar la escritura de compraventa, el notario extiende al comprador el primer testimonio, que es el documento que presenta en el Registro General de la Propiedad para inscribir su derecho de dominio.",
  },
  {
    id: "legalizacion-firma",
    termino: "Legalización de firma",
    definicion:
      "Acto notarial por el que el notario certifica que la firma que aparece en un documento privado fue puesta en su presencia por la persona que se indica, identificada con documento de identidad vigente. No autentifica el contenido del documento, solo la autenticidad de la firma.",
    fuente: "Art. 63 Código de Notariado, Decreto 314",
    categoria: "Notarial",
    ejemplo:
      "Para presentar una carta poder ante un banco, el gerente de la empresa legaliza su firma ante notario; el notario certifica que él personalmente firmó el documento pero no garantiza que el contenido sea legal o correcto.",
  },
  {
    id: "razon-notarial",
    termino: "Razón notarial",
    definicion:
      "Anotación breve que el notario coloca al pie o al margen de un documento para dar fe de un hecho específico relacionado con ese instrumento, como la cancelación de hipoteca, el pago de obligaciones o la presentación del documento ante una autoridad.",
    fuente: "Art. 29 inc. 11 Código de Notariado, Decreto 314",
    categoria: "Notarial",
    ejemplo:
      "Cuando el deudor paga totalmente un préstamo hipotecario, el notario asienta una razón notarial en el primer testimonio de la escritura para hacer constar el pago y facilitar la cancelación de la hipoteca en el Registro de la Propiedad.",
  },

  // ── Batch 3 — Procesal ────────────────────────────────────────────────────
  {
    id: "apelacion",
    termino: "Apelación",
    definicion:
      "Recurso ordinario por el que la parte agraviada solicita a un tribunal superior que revise y modifique o revoque una resolución del juez inferior. En materia civil se interpone ante el propio juez que dictó la resolución dentro del plazo legal; lo conoce la Sala de Apelaciones correspondiente.",
    fuente: "Art. 602 CPCYM, Decreto Ley 107",
    categoria: "Procesal",
    ejemplo:
      "Perdido el juicio ordinario en primera instancia, el demandado presenta apelación dentro de los 3 días siguientes a la notificación; el expediente sube a la Sala Civil de Apelaciones, que puede confirmar, revocar o modificar la sentencia.",
  },
  {
    id: "caducidad",
    termino: "Caducidad",
    definicion:
      "Extinción de un derecho o de la acción procesal por el transcurso del plazo fijado por la ley sin ejercerlo, de manera fatal e insubsanable. A diferencia de la prescripción, la caducidad opera de pleno derecho, no admite interrupción ni suspensión y puede declararse de oficio por el juez.",
    fuente: "Art. 158 LOJ, Decreto 2-89",
    categoria: "Procesal",
    ejemplo:
      "La acción de impugnación de paternidad caduca si no se ejercita dentro del plazo que fija la ley; vencido ese plazo, el juez puede declarar de oficio la caducidad aunque el demandado no la oponga.",
  },
  {
    id: "prueba",
    termino: "Prueba",
    definicion:
      "Actividad procesal destinada a demostrar al juez la veracidad de los hechos afirmados por las partes. En Guatemala los medios de prueba son: declaración de parte, declaración de testigos, dictamen de expertos, reconocimiento judicial, documentos, medios científicos y presunciones. La carga de la prueba recae en quien afirma un hecho.",
    fuente: "Art. 128 CPCYM, Decreto Ley 107",
    categoria: "Procesal",
    ejemplo:
      "En un juicio de cobro de dinero, quien demanda debe probar que prestó el dinero (presentando el pagaré o contrato); el demandado debe probar que ya lo pagó (presentando recibo de pago). Sin prueba suficiente, el juez falla contra quien tenía la carga.",
  },
  {
    id: "embargo",
    termino: "Embargo",
    definicion:
      "Medida cautelar o ejecutiva que afecta bienes del deudor, poniéndolos bajo la custodia judicial para garantizar el cumplimiento de una obligación o el pago de una condena. El bien embargado queda fuera del comercio hasta que se levante la medida o se rematen los bienes en subasta.",
    fuente: "Art. 297 CPCYM, Decreto Ley 107",
    categoria: "Procesal",
    ejemplo:
      "Ante la falta de pago de una deuda declarada en sentencia, el acreedor solicita al juez que embargue el vehículo del deudor; el juez ordena la medida y el bien queda bajo custodia judicial hasta que el deudor pague o se remate en subasta pública.",
  },

  // ── Batch 3 — General ─────────────────────────────────────────────────────
  {
    id: "analogia",
    termino: "Analogía",
    definicion:
      "Método de integración jurídica que permite aplicar a un caso no regulado la norma prevista para un caso semejante, cuando existe identidad de razón entre ambos. En Derecho Penal está prohibida (principio de legalidad); en Derecho Civil y Administrativo se admite de forma limitada.",
    fuente: "Art. 10 LOJ, Decreto 2-89",
    categoria: "General",
    ejemplo:
      "Si no existe norma que regule un tipo específico de contrato digital, el juez civil puede aplicar por analogía las normas del contrato más parecido regulado en el Código Civil.",
  },
  {
    id: "personalidad-juridica",
    termino: "Personalidad jurídica",
    definicion:
      "Atributo que la ley reconoce a ciertas entidades (asociaciones, fundaciones, sociedades mercantiles) para que sean titulares de derechos y obligaciones, actúen en nombre propio y comparezcan en juicio como si fueran personas. Se adquiere con la inscripción en el registro correspondiente.",
    fuente: "Art. 15 Código Civil, Decreto Ley 106",
    categoria: "General",
    ejemplo:
      "Una asociación civil sin fines de lucro solo adquiere personalidad jurídica al inscribirse en el Registro Civil (hoy RENAP) o en el Ministerio de Gobernación; antes de eso, sus miembros responden personalmente por los actos que realicen.",
  },
];

export const CATEGORIAS_GLOSARIO = [
  "Todos",
  ...Array.from(new Set(terminosJuridicos.map((t) => t.categoria))).sort(),
];
