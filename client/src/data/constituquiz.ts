import type { QuizTema } from '../types/index';

export const quizTemas: QuizTema[] = [
  {
    id: "derecho-constitucional",
    tema: "Derecho Constitucional",
    descripcion: "Preguntas sobre la Constitucion Politica de Guatemala, sus principios y garantias fundamentales.",
    icono: "Scale",
    categoria: "Constitucional",
    totalPreguntas: 5,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuáles son las constituciones que han existido?",
        opciones: {
          A: "1824, Constitución de la República Federal de Centroamérica; 1825, Constitución Política del Estado de Guatemala; 1879; 1945; 1956; 1965; 1985.",
          B: "1821, Acta de Independencia; 1824; 1871; 1944; 1956; 1985.",
          C: "1839, 1851, 1879, 1921, 1956, 1978, 1985."
        },
        respuestaCorrecta: "A",
        explicacion: "Guatemala ha tenido siete constituciones a lo largo de su historia, comenzando con la Constitución de la República Federal de Centroamérica en 1824 hasta la actual Constitución de 1985."
      },
      {
        id: 2,
        pregunta: "¿Qué es el derecho constitucional?",
        opciones: {
          A: "La regulación fundamental de una estructura jurídico-política que regula los derechos fundamentales, la organización del Estado y los mecanismos de protección.",
          B: "La rama del derecho encargada exclusivamente de regular los procesos judiciales.",
          C: "El conjunto de normas que regulan únicamente la conducta privada de los individuos."
        },
        respuestaCorrecta: "A",
        explicacion: "El derecho constitucional es la rama del derecho público que estudia la estructura fundamental del Estado, los derechos y libertades de las personas, y los mecanismos de protección constitucional."
      },
      {
        id: 3,
        pregunta: "¿Cuál es el objeto del derecho constitucional?",
        opciones: {
          A: "El reconocimiento de derechos y libertades fundamentales, la estructura del Estado y el límite al poder público.",
          B: "Regular las relaciones comerciales entre particulares y el Estado.",
          C: "Establecer únicamente la organización administrativa del poder ejecutivo."
        },
        respuestaCorrecta: "A",
        explicacion: "El objeto del derecho constitucional abarca tres pilares: el reconocimiento de derechos fundamentales, la organización del Estado y la limitación del poder público para proteger a los ciudadanos."
      },
      {
        id: 4,
        pregunta: "¿Qué es derecho?",
        opciones: {
          A: "La facultad que tiene el individuo de exigir determinada prerrogativa o beneficio.",
          B: "El conjunto de obligaciones morales que debe cumplir una persona en sociedad.",
          C: "La potestad exclusiva del Estado para imponer sanciones a los ciudadanos."
        },
        respuestaCorrecta: "A",
        explicacion: "El derecho, en sentido subjetivo, es la facultad reconocida al individuo para exigir el cumplimiento de una prerrogativa o beneficio amparado por el ordenamiento jurídico."
      },
      {
        id: 5,
        pregunta: "¿Qué es libertad?",
        opciones: {
          A: "La facultad que tiene una persona de obrar de determinada forma o abstenerse de hacerlo.",
          B: "La ausencia total de normas jurídicas dentro de una sociedad.",
          C: "El derecho absoluto de actuar sin ningún tipo de límite legal."
        },
        respuestaCorrecta: "A",
        explicacion: "La libertad es la facultad natural del ser humano para actuar según su voluntad o abstenerse de hacerlo, dentro de los límites establecidos por el ordenamiento jurídico."
      }
    ]
  },
  {
    id: "derecho-penal",
    tema: "Derecho Penal — Principios y Teoría del Delito",
    descripcion: "Principios fundamentales del Código Penal (Decreto 17-73): legalidad, delito, culpabilidad y formas de participación.",
    icono: "Shield",
    categoria: "Penal",
    totalPreguntas: 5,
    preguntas: [
      {
        id: 1,
        pregunta: "¿En qué consiste el principio de legalidad en el Derecho Penal guatemalteco?",
        opciones: {
          A: "Nadie podrá ser penado por hechos que no estén expresamente calificados como delitos o faltas por ley anterior a su perpetración (nullum crimen, nulla poena sine lege).",
          B: "El Estado puede sancionar cualquier conducta que considere socialmente dañina, aunque no esté tipificada en la ley.",
          C: "Los jueces tienen facultad para crear tipos penales cuando la ley presente vacíos legales."
        },
        respuestaCorrecta: "A",
        explicacion: "El principio de legalidad, consagrado en el artículo 17 de la Constitución y el artículo 1 del Código Penal, establece que no hay delito ni pena sin ley previa, escrita y estricta. Es la garantía más fundamental del Derecho Penal guatemalteco."
      },
      {
        id: 2,
        pregunta: "¿Qué es un delito según el Código Penal de Guatemala (Decreto 17-73)?",
        opciones: {
          A: "La acción u omisión típica, antijurídica y culpable que el ordenamiento jurídico sanciona con una pena.",
          B: "Cualquier acto que cause daño económico a otra persona o al Estado.",
          C: "Únicamente las conductas realizadas con dolo directo y premeditación."
        },
        respuestaCorrecta: "A",
        explicacion: "El delito requiere cuatro elementos: tipicidad (está descrito en la ley), antijuridicidad (va contra el ordenamiento jurídico), culpabilidad (existe responsabilidad del autor) y punibilidad (está sancionado con pena)."
      },
      {
        id: 3,
        pregunta: "¿Cuáles son las formas de participación criminal reconocidas en el Código Penal guatemalteco?",
        opciones: {
          A: "Autores (directos, coautores, mediatos), instigadores y cómplices.",
          B: "Solo autores materiales y cómplices necesarios.",
          C: "Únicamente autores intelectuales y ejecutores del hecho."
        },
        respuestaCorrecta: "A",
        explicacion: "El Código Penal distingue entre autor directo (quien ejecuta el hecho), coautor (quien lo realiza conjuntamente), autor mediato (quien lo realiza a través de otro), instigador (quien determina a otro a delinquir) y cómplice (quien presta colaboración)."
      },
      {
        id: 4,
        pregunta: "¿Qué es la prescripción de la acción penal?",
        opciones: {
          A: "La extinción de la responsabilidad penal por el transcurso del tiempo establecido en la ley sin que se haya ejercitado la acción penal.",
          B: "La obligación del Ministerio Público de concluir la investigación en un plazo determinado.",
          C: "El derecho del sindicado a que se dicte sentencia definitiva en un plazo razonable."
        },
        respuestaCorrecta: "A",
        explicacion: "La prescripción extingue la posibilidad de perseguir penalmente a una persona cuando ha transcurrido el tiempo fijado por la ley sin ejercer la acción penal. Sus plazos varían según la gravedad del delito y están regulados en los artículos 107-116 del Código Penal."
      },
      {
        id: 5,
        pregunta: "¿Cuál es la diferencia entre delito y falta en el Código Penal guatemalteco?",
        opciones: {
          A: "Los delitos son infracciones graves sancionadas con penas de prisión o multas mayores; las faltas son infracciones menores sancionadas con arresto o multas leves.",
          B: "Las faltas son cometidas exclusivamente por funcionarios públicos, mientras que los delitos los cometen particulares.",
          C: "No existe diferencia jurídica; ambos términos son sinónimos en la legislación guatemalteca."
        },
        respuestaCorrecta: "A",
        explicacion: "El Código Penal guatemalteco distingue entre delitos (Libro II) y faltas (Libro III). Las faltas son infracciones de menor gravedad sancionadas con penas más leves (arresto hasta 60 días o multa), mientras que los delitos conllevan penas de prisión u otras sanciones más severas."
      }
    ]
  },
  {
    id: "derecho-civil",
    tema: "Derecho Civil — Obligaciones y Contratos",
    descripcion: "Fundamentos del Código Civil guatemalteco: obligaciones, contratos, vicios del consentimiento y prescripción.",
    icono: "FileSignature",
    categoria: "Civil",
    totalPreguntas: 5,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Qué es una obligación en el Derecho Civil guatemalteco?",
        opciones: {
          A: "El vínculo jurídico por el cual una o varias personas determinadas están obligadas a dar, hacer o no hacer algo en favor de otra u otras.",
          B: "Cualquier promesa verbal entre personas que genera únicamente consecuencias morales.",
          C: "Únicamente las deudas de dinero formalizadas ante notario público."
        },
        respuestaCorrecta: "A",
        explicacion: "Según el Código Civil guatemalteco (Decreto-Ley 106), la obligación es un vínculo jurídico que compele a una persona (deudor) a realizar una prestación de dar, hacer o no hacer en beneficio de otra (acreedor). Su incumplimiento genera responsabilidad civil."
      },
      {
        id: 2,
        pregunta: "¿Cuáles son los elementos esenciales de un contrato según el Código Civil de Guatemala?",
        opciones: {
          A: "Capacidad legal de las partes, consentimiento libre de vicios, objeto lícito y causa lícita.",
          B: "Solo el consentimiento de las partes y la firma ante dos testigos.",
          C: "Precio, objeto, entrega de la cosa y escritura pública obligatoria."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 1251 del Código Civil establece que para la validez de un contrato se requieren cuatro elementos: capacidad de los contratantes, consentimiento sin vicio, objeto lícito y causa lícita. La ausencia de cualquiera produce nulidad."
      },
      {
        id: 3,
        pregunta: "¿Qué son los vicios del consentimiento en el Derecho Civil guatemalteco?",
        opciones: {
          A: "El error, el dolo y la intimidación, que afectan la validez del consentimiento y pueden dar lugar a la nulidad relativa del contrato.",
          B: "Las cláusulas abusivas incluidas unilateralmente por una de las partes en el contrato.",
          C: "Los incumplimientos contractuales que generan responsabilidad civil para el deudor."
        },
        respuestaCorrecta: "A",
        explicacion: "El Código Civil reconoce como vicios del consentimiento el error (falsa representación de la realidad), el dolo (maniobras engañosas para obtener el consentimiento) y la intimidación (presión ilícita sobre la voluntad). Su presencia permite anular el contrato."
      },
      {
        id: 4,
        pregunta: "¿Cuándo se considera perfeccionado un contrato en el Derecho Civil guatemalteco?",
        opciones: {
          A: "Desde el momento en que las partes manifiestan su consentimiento sobre el objeto y la causa, salvo los que requieren formalidad especial.",
          B: "Únicamente cuando el contrato se eleva a escritura pública ante notario.",
          C: "Solo cuando se entrega la cosa o se realiza el pago del precio pactado."
        },
        respuestaCorrecta: "A",
        explicacion: "El principio de consensualidad establece que los contratos se perfeccionan con el mero consentimiento, salvo excepciones legales que exigen forma especial (como la compraventa de inmuebles). La entrega y el pago son actos de ejecución, no de perfeccionamiento."
      },
      {
        id: 5,
        pregunta: "¿Qué es la prescripción extintiva en materia civil?",
        opciones: {
          A: "La pérdida del derecho de acción por no haberlo ejercitado durante el tiempo establecido en la ley.",
          B: "La adquisición de la propiedad de un bien por posesión prolongada y pacífica (usucapión).",
          C: "La anulación automática de un contrato por incumplimiento reiterado del deudor."
        },
        respuestaCorrecta: "A",
        explicacion: "La prescripción extintiva (artículo 1501 y siguientes del Código Civil) extingue el derecho a ejercer una acción judicial por el transcurso del tiempo. No extingue la obligación en sí, sino la acción para exigirla. No debe confundirse con la usucapión, que es la prescripción adquisitiva de dominio."
      }
    ]
  },
  {
    id: "derecho-laboral",
    tema: "Derecho Laboral Guatemalteco",
    descripcion: "Prestaciones, jornadas, salario mínimo y despido según el Código de Trabajo (Decreto 1441) de Guatemala.",
    icono: "Briefcase",
    categoria: "Laboral",
    totalPreguntas: 5,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuántas horas comprende la jornada ordinaria diurna de trabajo según el Código de Trabajo de Guatemala?",
        opciones: {
          A: "8 horas diarias y 44 horas semanales como máximo.",
          B: "10 horas diarias y 50 horas semanales como máximo.",
          C: "6 horas diarias y 36 horas semanales como máximo."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 116 del Código de Trabajo fija la jornada ordinaria diurna en 8 horas diarias y 44 horas semanales. La jornada nocturna es de 6 horas diarias y 36 semanales, y la mixta de 7 horas diarias y 42 semanales."
      },
      {
        id: 2,
        pregunta: "¿Qué prestaciones tiene derecho a recibir un trabajador despedido sin causa justificada en Guatemala?",
        opciones: {
          A: "Únicamente el pago de los días trabajados del mes en curso.",
          B: "Solo un mes de salario adicional sin importar el tiempo laborado.",
          C: "Indemnización de un mes de salario por cada año de trabajo, más vacaciones, aguinaldo y bono 14 proporcionales."
        },
        respuestaCorrecta: "C",
        explicacion: "El artículo 82 del Código de Trabajo establece que el despido injustificado genera el pago de una indemnización de un mes de salario por cada año laborado. A ello se suman las prestaciones proporcionales: vacaciones, aguinaldo y bono 14 pendientes de pago."
      },
      {
        id: 3,
        pregunta: "¿Cuándo se paga el aguinaldo en Guatemala y a cuánto equivale?",
        opciones: {
          A: "Se paga íntegramente el 15 de noviembre y equivale a dos salarios mensuales.",
          B: "50% en la primera quincena de diciembre y 50% en la primera quincena de enero; equivale a un salario mensual.",
          C: "Se paga en julio de cada año y equivale al 25% del salario anual."
        },
        respuestaCorrecta: "B",
        explicacion: "La Ley de Aguinaldo (Decreto 76-78) establece que los trabajadores tienen derecho a recibir un salario mensual adicional como aguinaldo, pagado en dos partes: el 50% en la primera quincena de diciembre y el restante 50% en la primera quincena de enero."
      },
      {
        id: 4,
        pregunta: "¿Quién tiene la facultad de fijar el salario mínimo en Guatemala?",
        opciones: {
          A: "El Organismo Ejecutivo, a propuesta de la Comisión Nacional del Salario.",
          B: "El Congreso de la República mediante decreto legislativo.",
          C: "Los sindicatos de trabajadores en conjunto con las cámaras empresariales."
        },
        respuestaCorrecta: "A",
        explicacion: "Según el artículo 113 del Código de Trabajo, la Comisión Nacional del Salario estudia y propone los salarios mínimos, pero es el Organismo Ejecutivo (mediante Acuerdo Gubernativo) quien los fija oficialmente, generalmente con vigencia a partir del 1 de enero de cada año."
      },
      {
        id: 5,
        pregunta: "¿Cuántos días de vacaciones anuales corresponden a un trabajador con más de un año de relación laboral continua?",
        opciones: {
          A: "30 días hábiles.",
          B: "10 días hábiles.",
          C: "15 días hábiles."
        },
        respuestaCorrecta: "C",
        explicacion: "El artículo 130 del Código de Trabajo reconoce a todo trabajador el derecho a 15 días hábiles de vacaciones remuneradas al año, siempre que haya cumplido un año de servicio continuo con el mismo patrono. Este derecho es irrenunciable."
      }
    ]
  },
  {
    id: "derecho-mercantil",
    tema: "Derecho Mercantil Guatemalteco",
    descripcion: "Sociedades mercantiles, títulos de crédito y registro según el Código de Comercio (Decreto 2-70) de Guatemala.",
    icono: "Building2",
    categoria: "Mercantil",
    totalPreguntas: 5,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuáles son las sociedades mercantiles reconocidas en el Código de Comercio de Guatemala (Decreto 2-70)?",
        opciones: {
          A: "Solo la sociedad anónima y la sociedad de responsabilidad limitada.",
          B: "Sociedad colectiva, en comandita simple, de responsabilidad limitada, anónima y en comandita por acciones.",
          C: "Sociedad civil, comercial y cooperativa de consumo."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 10 del Código de Comercio enumera cinco tipos de sociedades mercantiles: colectiva, en comandita simple, de responsabilidad limitada (S.R.L.), anónima (S.A.) y en comandita por acciones. La más utilizada en la práctica es la Sociedad Anónima."
      },
      {
        id: 2,
        pregunta: "¿Qué es un título de crédito según el Código de Comercio de Guatemala?",
        opciones: {
          A: "El documento necesario para ejercitar el derecho literal y autónomo expresado en el mismo.",
          B: "Cualquier documento que acredite una deuda entre dos personas naturales.",
          C: "El recibo que emite el vendedor al comprador como comprobante de pago."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 385 del Código de Comercio define el título de crédito como el documento necesario para ejercitar el derecho literal y autónomo en él expresado. Sus características esenciales son: incorporación, literalidad, autonomía y legitimación. Los más comunes son la letra de cambio, el pagaré y el cheque."
      },
      {
        id: 3,
        pregunta: "¿Ante quién deben inscribirse los comerciantes y las empresas mercantiles en Guatemala?",
        opciones: {
          A: "Ante el Ministerio de Economía mediante declaración jurada notarial.",
          B: "Ante la Superintendencia de Administración Tributaria (SAT).",
          C: "Ante el Registro Mercantil de la República, dependencia del Ministerio de Economía."
        },
        respuestaCorrecta: "C",
        explicacion: "El artículo 334 del Código de Comercio establece la obligación de los comerciantes de inscribirse en el Registro Mercantil de la República. Este registro da publicidad a los actos mercantiles, otorga personalidad jurídica a las sociedades y es requisito previo para operar legalmente."
      },
      {
        id: 4,
        pregunta: "¿Qué es la quiebra en el Derecho Mercantil guatemalteco?",
        opciones: {
          A: "La liquidación voluntaria que realiza un comerciante al cerrar su negocio.",
          B: "El estado jurídico del comerciante que ha cesado en el pago de sus obligaciones mercantiles, declarado judicialmente.",
          C: "La multa que impone el Registro Mercantil a las empresas con deudas fiscales."
        },
        respuestaCorrecta: "B",
        explicacion: "La quiebra es el estado de insolvencia declarado judicialmente que afecta a un comerciante que ha cesado el pago generalizado de sus obligaciones. Implica el desapoderamiento de sus bienes, la formación de una masa activa para pagar a los acreedores y la intervención de un síndico administrador."
      },
      {
        id: 5,
        pregunta: "¿Qué característica fundamental distingue a la Sociedad Anónima en el Código de Comercio guatemalteco?",
        opciones: {
          A: "Los socios responden solidariamente con su patrimonio personal por las deudas sociales.",
          B: "El capital está dividido en acciones y la responsabilidad de cada socio se limita al monto de sus aportaciones.",
          C: "Requiere un mínimo de diez socios fundadores y capital mínimo de un millón de quetzales."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 86 del Código de Comercio define la Sociedad Anónima como aquella en que el capital está dividido y representado por acciones. La responsabilidad de cada accionista queda limitada al pago de las acciones que haya suscrito, sin comprometer su patrimonio personal."
      }
    ]
  },
  {
    id: "derecho-procesal-penal",
    tema: "Derecho Procesal Penal",
    descripcion: "Etapas del proceso, medidas desjudicializadoras y garantías procesales del CPP guatemalteco (Decreto 51-92).",
    icono: "Gavel",
    categoria: "Procesal",
    totalPreguntas: 5,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuáles son las etapas del proceso penal ordinario en Guatemala según el Código Procesal Penal (Decreto 51-92)?",
        opciones: {
          A: "Preparatoria (investigación), intermedia, debate oral y público, e impugnaciones.",
          B: "Denuncia, instrucción, sentencia y apelación.",
          C: "Investigación preliminar, juicio sumario y ejecución de sentencia."
        },
        respuestaCorrecta: "A",
        explicacion: "El CPP estructura el proceso en cuatro fases: la etapa preparatoria (investigación a cargo del MP con control del juez), la etapa intermedia (donde el juez decide si hay mérito para juicio), el debate oral y público (juicio ante tribunal de sentencia) y las impugnaciones (apelación, casación, etc.)."
      },
      {
        id: 2,
        pregunta: "¿Qué es el criterio de oportunidad en el proceso penal guatemalteco?",
        opciones: {
          A: "El derecho del sindicado a elegir al juez que conocerá su caso.",
          B: "La posibilidad de que la víctima abandone el proceso una vez iniciado.",
          C: "La facultad del Ministerio Público de abstenerse de ejercitar la acción penal en delitos de menor gravedad, previa autorización judicial."
        },
        respuestaCorrecta: "C",
        explicacion: "El artículo 25 del CPP establece el criterio de oportunidad como una medida desjudicializadora: el Ministerio Público puede solicitar al juez autorización para no perseguir penalmente ciertos delitos de menor impacto social, siempre que el sindicado repare el daño causado a la víctima."
      },
      {
        id: 3,
        pregunta: "¿Cuál es la función del Juez de Primera Instancia Penal (juez contralor) durante la etapa preparatoria?",
        opciones: {
          A: "Dirigir personalmente la investigación del Ministerio Público.",
          B: "Controlar la legalidad de la investigación, autorizar medidas que afecten derechos fundamentales y dictar el auto de procesamiento.",
          C: "Dictar la sentencia condenatoria o absolutoria al concluir el debate oral."
        },
        respuestaCorrecta: "B",
        explicacion: "El juez contralor no investiga; su rol es garantizar el respeto a los derechos fundamentales del sindicado durante la investigación. Autoriza allanamientos, intervenciones telefónicas, ordena la prisión preventiva y al concluir la etapa preparatoria decide en la audiencia intermedia si el caso pasa a juicio."
      },
      {
        id: 4,
        pregunta: "¿En qué consiste la suspensión condicional de la persecución penal?",
        opciones: {
          A: "Una medida alternativa al juicio: el proceso se suspende si el imputado cumple condiciones durante un período de prueba; al cumplirlas se dicta sobreseimiento.",
          B: "La interrupción temporal del proceso por enfermedad grave del sindicado hasta su recuperación.",
          C: "La suspensión de la pena impuesta cuando el condenado demuestra buena conducta ante el juez de ejecución."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 27 del CPP regula la suspensión condicional de la persecución penal: el juez puede suspender el proceso hasta por 5 años si el imputado acepta reglas de conducta (reparar el daño, no reincidir, etc.). Si las cumple, se sobresee el caso. Es otra medida desjudicializadora que descarga el sistema."
      },
      {
        id: 5,
        pregunta: "¿Qué límite establece el CPP para la duración máxima de la prisión preventiva en Guatemala?",
        opciones: {
          A: "No existe límite temporal mientras dure la investigación del Ministerio Público.",
          B: "Un máximo de seis meses improrrogables en todos los casos.",
          C: "No puede exceder de un año; con prórroga justificada hasta dos años, debiendo cesar si no se ha dictado sentencia."
        },
        respuestaCorrecta: "C",
        explicacion: "El artículo 268 del CPP establece que la prisión preventiva no puede exceder de un año. Con resolución motivada, el tribunal puede prorrogarla hasta dos años en casos de especial complejidad. Vencido ese plazo sin sentencia, el imputado debe ser puesto en libertad, siendo sustituida por medidas sustitutivas."
      }
    ]
  },
  {
    id: "derecho-notarial",
    tema: "Derecho Notarial Guatemalteco",
    descripcion: "Historia, protocolos, instrumentos públicos, actas notariales, formalidades del testamento y principios del notariado guatemalteco (Decreto 314).",
    icono: "BookMarked",
    categoria: "Notarial",
    totalPreguntas: 12,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuál es la ley que regula actualmente el ejercicio del notariado en Guatemala?",
        opciones: {
          A: "El Código de Notariado, contenido en el Decreto 314 del Congreso de la República.",
          B: "El Decreto Ley 106, Código Civil de Guatemala.",
          C: "La Ley Reguladora del Ejercicio Notarial, Decreto 28-2010."
        },
        respuestaCorrecta: "A",
        explicacion: "El Código de Notariado (Decreto 314) es la norma principal que regula el ejercicio notarial en Guatemala desde 1946. Define al notario, el protocolo, las escrituras públicas, las actas notariales y las obligaciones del fedatario público. Guatemala pertenece al sistema notarial latino de tradición romano-germánica."
      },
      {
        id: 2,
        pregunta: "¿A qué sistema notarial pertenece el notariado guatemalteco según su tradición jurídica?",
        opciones: {
          A: "Al sistema anglosajón (common law), donde el notario es un simple autenticador de firmas.",
          B: "Al sistema notarial latino, donde el notario es un profesional del derecho con fe pública delegada por el Estado, que asesora a las partes y da forma a los actos jurídicos.",
          C: "Al sistema mixto germano-anglosajón, adoptado tras la independencia de 1821."
        },
        respuestaCorrecta: "B",
        explicacion: "Guatemala pertenece al sistema notarial latino, de origen romano-germánico. A diferencia del notario anglosajón (mero certificador de firmas), el notario latino redacta, asesora y da forma jurídica a los actos, con función preventiva: evitar litigios futuros. La tradición notarial guatemalteca proviene del Derecho español colonial y se consolidó con el Decreto 314."
      },
      {
        id: 3,
        pregunta: "Según el Código de Notariado guatemalteco, ¿qué es el protocolo notarial?",
        opciones: {
          A: "El conjunto de normas y principios que rigen la función notarial.",
          B: "La colección ordenada de los instrumentos públicos que el notario autoriza durante el año, encuadernados y foliados.",
          C: "El registro público donde se inscriben todas las escrituras del país."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 8 del Código de Notariado define el protocolo como la colección ordenada de los instrumentos públicos que el notario autoriza durante el año. Incluye escrituras matrices, actas de protocolación y razones de legalización de firmas. El protocolo queda bajo custodia del notario y, al cierre de cada año, debe remitirse un testimonio especial al Archivo General de Protocolos."
      },
      {
        id: 4,
        pregunta: "¿Cuáles son los instrumentos públicos notariales reconocidos en el Código de Notariado de Guatemala?",
        opciones: {
          A: "Únicamente las escrituras públicas y los testimonios.",
          B: "Las escrituras matrices, las actas notariales y las razones de legalización de firmas.",
          C: "Solo los contratos firmados ante el Registro General de la Propiedad."
        },
        respuestaCorrecta: "B",
        explicacion: "El Código de Notariado reconoce como instrumentos públicos notariales: las escrituras matrices (escrituras públicas), las actas notariales y las razones de legalización de firmas. Cada uno tiene fuerza probatoria plena respecto a los hechos que el notario declara haber visto, oído o realizado en su presencia."
      },
      {
        id: 5,
        pregunta: "¿En qué se diferencia un acta notarial de una escritura pública en el Derecho Notarial guatemalteco?",
        opciones: {
          A: "No existe diferencia legal entre ambas; son sinónimos dentro del Código de Notariado.",
          B: "El acta notarial hace constar hechos que el notario percibe directamente, sin necesidad de disposición de derechos; la escritura instrumenta negocios jurídicos entre partes.",
          C: "El acta notarial solo puede otorgarse ante juez, mientras que la escritura se otorga ante notario."
        },
        respuestaCorrecta: "B",
        explicacion: "La escritura pública instrumenta negocios jurídicos (contratos, testamentos, constitución de sociedad) donde hay declaración de voluntad. El acta notarial, en cambio, hace constar hechos, situaciones o circunstancias percibidos por el notario (actas de notoriedad, de protesto, de presencia), sin que sea indispensable la disposición de derechos entre partes."
      },
      {
        id: 6,
        pregunta: "¿Cuál es el principio fundamental que da validez a los instrumentos autorizados por el notario guatemalteco?",
        opciones: {
          A: "El principio de fe pública notarial: los hechos consignados en el instrumento se presumen verídicos y auténticos hasta prueba en contrario.",
          B: "El principio de libre competencia, que permite a cualquier persona autorizar documentos privados.",
          C: "El principio de publicidad registral, que exige inscribir todos los documentos en el Registro General de la Propiedad."
        },
        respuestaCorrecta: "A",
        explicacion: "La fe pública notarial es el principio esencial del Derecho Notarial. El notario, como funcionario investido por el Estado, da certeza jurídica a los actos que autoriza: su contenido se presume auténtico y veraz hasta prueba en contrario. Este principio distingue al instrumento público del documento privado, que no goza de esa presunción de autenticidad."
      },
      {
        id: 7,
        pregunta: "En el Derecho Notarial guatemalteco, ¿qué implica el principio del consentimiento libre en la autorización de escrituras públicas?",
        opciones: {
          A: "Que el notario puede suplir la voluntad de una de las partes si considera que el negocio es beneficioso para ella.",
          B: "Que el notario debe cerciorarse de que las partes otorgan el acto libremente, sin coacción, dolo ni error, y que conocen el contenido y efectos del instrumento.",
          C: "Que basta con la firma de una de las partes para que la escritura quede perfeccionada."
        },
        respuestaCorrecta: "B",
        explicacion: "El principio del consentimiento libre es una garantía del sistema notarial latino. El notario tiene el deber de asesorar a las partes, leer el instrumento en voz alta, asegurarse de que comprenden su contenido y que actúan voluntariamente. Si detecta vicios del consentimiento (dolo, error, violencia o intimidación), debe negarse a autorizar el acto."
      },
      {
        id: 8,
        pregunta: "¿Cuál es el tipo de testamento más común en Guatemala, que se incorpora al protocolo notarial?",
        opciones: {
          A: "El testamento ológrafo o hológrafo, escrito íntegramente de puño y letra del testador.",
          B: "El testamento notarial en escritura pública, otorgado ante notario e incorporado al protocolo.",
          C: "El testamento militar, reservado a miembros del Ejército de Guatemala."
        },
        respuestaCorrecta: "B",
        explicacion: "El Código Civil guatemalteco reconoce el testamento notarial (en escritura pública) como la forma ordinaria más utilizada: el testador expresa su voluntad ante notario, quien la instrumenta en el protocolo con todas las formalidades de ley. Existen testamentos especiales (cerrado, ológrafo, en el extranjero), pero el notarial es el de mayor uso y seguridad jurídica."
      },
      {
        id: 9,
        pregunta: "Según el Código Civil guatemalteco, ¿qué formalidades especiales debe cumplir el testamento otorgado ante notario?",
        opciones: {
          A: "Basta con que el testador firme ante dos testigos mayores de edad, sin necesidad de notario.",
          B: "Debe otorgarse en escritura pública, con presencia del testador, el notario y dos testigos hábiles; el notario debe leerlo en voz alta en el mismo acto y firmarlo todos al pie.",
          C: "Requiere aprobación del Ministerio de Relaciones Exteriores cuando el testamento incluye bienes inmuebles."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 954 del Código Civil establece que el testamento notarial se otorga en escritura pública ante notario y dos testigos hábiles. El notario debe leer el instrumento en voz alta para que el testador ratifique que refleja su voluntad, y todos firman en el mismo acto. Los testigos deben ser idóneos: no pueden ser herederos, legatarios ni parientes del testador o del notario en los grados prohibidos."
      },
      {
        id: 10,
        pregunta: "¿Cuál de las siguientes personas está PROHIBIDA de ser testigo en un testamento notarial guatemalteco?",
        opciones: {
          A: "Un ciudadano guatemalteco mayor de edad con plena capacidad civil.",
          B: "Un médico ajeno al acto que solo conoce al testador.",
          C: "Los herederos o legatarios instituidos en el mismo testamento y sus cónyuges."
        },
        respuestaCorrecta: "C",
        explicacion: "El Código Civil guatemalteco prohíbe ser testigos en un testamento a quienes tengan interés directo en él: los herederos, legatarios y sus cónyuges. Esta prohibición garantiza la imparcialidad y protege la libre voluntad del testador. También están prohibidos los menores de edad, los incapaces civilmente y quienes no comprendan el idioma en que se extiende el testamento."
      },
      {
        id: 11,
        pregunta: "¿En qué situación le está PROHIBIDO al notario guatemalteco autorizar una escritura pública, según el Código de Notariado?",
        opciones: {
          A: "Cuando el negocio jurídico involucra bienes de valor superior a Q100,000.",
          B: "Cuando el notario, su cónyuge o sus parientes dentro de los grados de ley tengan interés directo en el acto o contrato.",
          C: "Cuando la escritura se otorga fuera del municipio donde el notario tiene registrada su oficina."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 18 del Código de Notariado establece que el notario no puede autorizar actos en que él mismo, su cónyuge o sus parientes dentro de los grados señalados por la ley tengan interés directo. Esta inhabilidad protege la imparcialidad del notario como fedatario público. Si el notario lo autoriza en esas condiciones, el instrumento puede ser declarado nulo."
      },
      {
        id: 12,
        pregunta: "¿Qué obligación tiene el notario guatemalteco al finalizar cada año con respecto a su protocolo?",
        opciones: {
          A: "Destruir los documentos del protocolo para proteger la privacidad de los clientes.",
          B: "Entregar el protocolo original al Registro General de la Propiedad para su custodia definitiva.",
          C: "Remitir un testimonio especial de todos los instrumentos del año al Archivo General de Protocolos, dentro de los primeros 25 días de enero."
        },
        respuestaCorrecta: "C",
        explicacion: "El artículo 23 del Código de Notariado obliga al notario a remitir, dentro de los primeros 25 días de enero, un testimonio especial de cada instrumento autorizado durante el año anterior al Archivo General de Protocolos, dependencia del Organismo Judicial. El protocolo original permanece bajo custodia y responsabilidad del notario autorizante."
      }
    ]
  },

  // ─── DERECHO DE FAMILIA ───────────────────────────────────────────────────
  {
    id: "derecho-familia",
    tema: "Derecho de Familia Guatemalteco",
    descripcion: "Matrimonio, regímenes económicos, unión de hecho, patria potestad, divorcio y adopción según el Código Civil guatemalteco.",
    icono: "Heart",
    categoria: "Civil",
    totalPreguntas: 6,
    preguntas: [
      {
        id: 1,
        pregunta: "Según el Código Civil de Guatemala (Decreto Ley 106), ¿a partir de qué edad pueden contraer matrimonio sin autorización especial?",
        opciones: {
          A: "A los 16 años para hombres y 14 para mujeres, con autorización de los padres.",
          B: "A los 18 años cumplidos, hombres y mujeres por igual.",
          C: "A los 21 años, considerada la mayoría de edad plena para actos civiles."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 81 del Código Civil establece la edad mínima de 18 años para contraer matrimonio sin autorización. Los menores de 18 pero mayores de 16 años pueden casarse con autorización de quienes ejerzan la patria potestad o tutela; el juez puede suplir esa autorización cuando exista causa justificada. Reformas recientes han reforzado la protección frente al matrimonio infantil."
      },
      {
        id: 2,
        pregunta: "¿Cuáles son los regímenes económicos del matrimonio reconocidos en el Código Civil de Guatemala?",
        opciones: {
          A: "Solo el régimen de comunidad absoluta de bienes, aplicable a todos los matrimonios.",
          B: "Comunidad absoluta de bienes, separación absoluta de bienes y comunidad de gananciales.",
          C: "Régimen dotal y régimen de participación en los gananciales, según el tipo de contrato."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 122 del Código Civil reconoce tres regímenes económicos matrimoniales: (1) comunidad absoluta, donde todo pertenece a ambos cónyuges; (2) separación absoluta, donde cada cónyuge administra su propio patrimonio; y (3) comunidad de gananciales, donde los bienes adquiridos durante el matrimonio se dividen por igual. A falta de capitulaciones matrimoniales, se aplica por defecto la comunidad de gananciales."
      },
      {
        id: 3,
        pregunta: "¿Qué es la unión de hecho y qué efectos jurídicos produce en Guatemala?",
        opciones: {
          A: "Una situación sin efectos jurídicos; Guatemala no reconoce las uniones no matrimoniales.",
          B: "La unión estable y singular entre hombre y mujer que, declarada ante notario o juez, produce efectos patrimoniales y sucesorios similares al matrimonio.",
          C: "Un contrato privado que solo genera obligaciones alimentarias entre los convivientes."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 173 del Código Civil reconoce la unión de hecho con vida en común, estable y singular por más de tres años. Puede declararse ante notario o juez de familia. Una vez declarada, genera régimen económico sobre bienes adquiridos durante la unión y derechos sucesorios equiparables al matrimonio. La declaración es retroactiva a la fecha de inicio de la convivencia."
      },
      {
        id: 4,
        pregunta: "¿En qué consiste la patria potestad según el Código Civil guatemalteco?",
        opciones: {
          A: "El derecho exclusivo del padre de administrar los bienes del hijo hasta su mayoría de edad.",
          B: "El conjunto de derechos y obligaciones de ambos padres sobre la persona y bienes de sus hijos menores no emancipados.",
          C: "La facultad de los abuelos de representar legalmente a los menores cuando los padres están ausentes."
        },
        respuestaCorrecta: "B",
        explicacion: "Los artículos 252 y siguientes del Código Civil definen la patria potestad como el conjunto de derechos y deberes de ambos padres respecto a la persona y bienes de sus hijos menores no emancipados. Incluye representación legal, administración de bienes, crianza y educación. La patria potestad es irrenunciable, intransmisible y puede suspenderse o extinguirse por causas graves establecidas en la ley."
      },
      {
        id: 5,
        pregunta: "¿Cuáles son las formas de divorcio contempladas en el Código Civil guatemalteco?",
        opciones: {
          A: "Solo el divorcio contencioso por causas específicas como el adulterio.",
          B: "El divorcio por mutuo acuerdo (voluntario) y el divorcio contencioso por causas establecidas en la ley.",
          C: "Únicamente el divorcio judicial ante juez de primera instancia, sin excepción."
        },
        respuestaCorrecta: "B",
        explicacion: "El Código Civil (artículos 154-163) reconoce el divorcio voluntario por mutuo consentimiento —tramitable ante notario si no hay hijos menores ni bienes que liquidar, o ante juez de familia en caso contrario— y el divorcio contencioso por causas específicas (adulterio, maltrato, abandono, separación de hecho por más de un año, entre otras). Ambas formas disuelven el vínculo matrimonial."
      },
      {
        id: 6,
        pregunta: "¿Qué tipo de adopción reconoce actualmente Guatemala y qué efectos produce sobre el adoptado?",
        opciones: {
          A: "Solo la adopción simple, que crea un vínculo temporal sin extinguir los lazos con la familia de origen.",
          B: "La adopción plena, que equipara al adoptado con un hijo biológico y extingue los vínculos jurídicos con la familia de origen.",
          C: "Solo la adopción internacional, regulada exclusivamente por el Convenio de La Haya sin ley nacional."
        },
        respuestaCorrecta: "B",
        explicacion: "La Ley de Adopciones (Decreto 77-2007) establece en Guatemala la adopción plena, que crea entre adoptante y adoptado los mismos derechos y obligaciones que la filiación biológica. El adoptado adquiere los apellidos del adoptante, hereda en igualdad de condiciones que los hijos biológicos y se extinguen legalmente sus vínculos con la familia de origen. La adopción es irrevocable."
      }
    ]
  },

  // ─── DERECHO ADMINISTRATIVO ──────────────────────────────────────────────
  {
    id: "derecho-administrativo",
    tema: "Derecho Administrativo Guatemalteco",
    descripcion: "Principio de legalidad, actos administrativos, recursos, proceso contencioso-administrativo y organismos de control del Estado guatemalteco.",
    icono: "Landmark",
    categoria: "Administrativo",
    totalPreguntas: 5,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuál es el principio que rige la actividad de la administración pública en Guatemala respecto a sus actuaciones?",
        opciones: {
          A: "Principio de discrecionalidad absoluta: la administración puede actuar sin base legal expresa si considera que es conveniente.",
          B: "Principio de legalidad: los funcionarios públicos solo pueden hacer lo que la ley expresamente les autoriza.",
          C: "Principio de oportunidad: la administración actúa según el criterio del funcionario en turno."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 154 de la Constitución Política de Guatemala consagra el principio de legalidad: los funcionarios públicos actúan dentro de las facultades que la ley les confiere. A diferencia de los particulares (que pueden hacer todo lo no prohibido), los funcionarios necesitan habilitación legal expresa. Toda actuación sin respaldo normativo es nula de pleno derecho y genera responsabilidad personal del funcionario."
      },
      {
        id: 2,
        pregunta: "¿Cuál es la diferencia entre actos administrativos reglados y discrecionales en el Derecho guatemalteco?",
        opciones: {
          A: "No existe diferencia; todos los actos de la administración son igualmente discrecionales.",
          B: "Los actos reglados están completamente determinados por la ley; los discrecionales permiten elegir entre opciones igualmente válidas dentro de los límites legales.",
          C: "Los actos discrecionales son siempre ilegales y pueden anularse en vía contenciosa."
        },
        respuestaCorrecta: "B",
        explicacion: "Los actos reglados son aquellos en que la ley predetermina exactamente la conducta administrativa (ej.: otorgar una licencia cuando se cumplen todos los requisitos legales). Los actos discrecionales otorgan a la administración un margen de apreciación para elegir entre opciones válidas (ej.: asignar contratos bajo ciertos criterios). Ambos deben respetar el principio de legalidad y los derechos de los administrados."
      },
      {
        id: 3,
        pregunta: "¿Cuál es el recurso administrativo ordinario que procede contra resoluciones de la administración pública guatemalteca?",
        opciones: {
          A: "El recurso de amparo, que se interpone directamente ante la Corte de Constitucionalidad.",
          B: "El recurso de revocatoria ante el mismo órgano que resolvió y, en segunda instancia, el recurso jerárquico ante el superior.",
          C: "El recurso de casación ante la Corte Suprema de Justicia, sin pasar por instancias administrativas."
        },
        respuestaCorrecta: "B",
        explicacion: "La Ley de lo Contencioso Administrativo (Decreto 119-96) establece dos recursos ordinarios en sede administrativa: el recurso de revocatoria (ante el mismo órgano que emitió la resolución) y el recurso jerárquico (ante el superior jerárquico del órgano). Es obligatorio agotar la vía administrativa antes de acudir al proceso contencioso-administrativo ante el Organismo Judicial."
      },
      {
        id: 4,
        pregunta: "¿Qué es el proceso contencioso-administrativo en Guatemala y ante qué tribunal se tramita?",
        opciones: {
          A: "Un proceso penal especial para juzgar funcionarios públicos acusados de corrupción.",
          B: "El proceso judicial que permite impugnar resoluciones de la administración pública ante las Salas de lo Contencioso Administrativo, una vez agotada la vía administrativa.",
          C: "Un procedimiento interno de la administración para resolver conflictos entre dependencias del Estado."
        },
        respuestaCorrecta: "B",
        explicacion: "El proceso contencioso-administrativo, regulado por el Decreto 119-96, es el mecanismo de control judicial de los actos de la administración pública. Procede cuando el particular ha agotado los recursos administrativos y la resolución final vulnera sus derechos. Se tramita ante las Salas de lo Contencioso Administrativo y tiene como fin revisar la legalidad de los actos impugnados, pudiendo anularlos o modificarlos."
      },
      {
        id: 5,
        pregunta: "¿Qué institución guatemalteca tiene a su cargo la fiscalización de los fondos y bienes del Estado?",
        opciones: {
          A: "La Procuraduría General de la Nación, que asesora jurídicamente al Estado.",
          B: "La Contraloría General de Cuentas, ente fiscalizador de los recursos del Estado con independencia funcional.",
          C: "El Ministerio de Finanzas Públicas, que administra directamente todos los fondos estatales."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 232 de la CPRG crea la Contraloría General de Cuentas como institución técnica descentralizada con independencia funcional, encargada de fiscalizar la correcta inversión de los fondos públicos. Su titular es electo por el Congreso. La Procuraduría General de la Nación (artículo 252 CPRG) cumple una función distinta: asesoría jurídica y representación del Estado en juicio."
      }
    ]
  },

  // ─── DERECHO TRIBUTARIO ──────────────────────────────────────────────────
  {
    id: "derecho-tributario",
    tema: "Derecho Tributario Guatemalteco",
    descripcion: "Código Tributario (Decreto 6-91), ISR, IVA, SAT y principios de la obligación tributaria en Guatemala.",
    icono: "Receipt",
    categoria: "Tributario",
    totalPreguntas: 5,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuál es el código que establece los principios y disposiciones generales de la tributación en Guatemala?",
        opciones: {
          A: "El Código de Comercio, Decreto 2-70.",
          B: "El Código Tributario, Decreto 6-91 y sus reformas.",
          C: "La Ley del Impuesto al Valor Agregado (IVA), Decreto 27-92."
        },
        respuestaCorrecta: "B",
        explicacion: "El Código Tributario (Decreto 6-91) es la norma matriz que define los principios, conceptos y disposiciones generales de todos los tributos en Guatemala. Establece conceptos como tributo, contribuyente, hecho generador, base imponible y obligación tributaria. Las leyes específicas (ISR, IVA, IUSI, etc.) se aplican en complemento al Código Tributario y no pueden contradecirlo."
      },
      {
        id: 2,
        pregunta: "¿Cuál es la tasa general del Impuesto al Valor Agregado (IVA) en Guatemala y a qué se aplica?",
        opciones: {
          A: "10% exclusivamente sobre productos de importación.",
          B: "12% sobre el precio de venta de bienes muebles y la prestación de servicios en territorio guatemalteco.",
          C: "15% para bienes de lujo y 5% para productos de la canasta básica alimentaria."
        },
        respuestaCorrecta: "B",
        explicacion: "La Ley del IVA (Decreto 27-92) fija una tasa del 12% aplicable al precio de venta de bienes muebles, prestación de servicios e importaciones en Guatemala. De ese 12%, el 1.5% se destina a los municipios (IVA-PAZ) y el resto al Estado. El IVA es un impuesto indirecto al consumo: recae económicamente en el consumidor final, aunque el obligado a declararlo ante la SAT es el vendedor o prestador del servicio."
      },
      {
        id: 3,
        pregunta: "¿Cuál es el ente encargado de administrar y recaudar los tributos en Guatemala?",
        opciones: {
          A: "El Banco de Guatemala (BANGUAT), que centraliza todos los ingresos fiscales.",
          B: "La Superintendencia de Administración Tributaria (SAT), entidad estatal descentralizada creada por el Decreto 1-98.",
          C: "El Ministerio de Finanzas Públicas, que recauda directamente mediante ventanillas en todo el país."
        },
        respuestaCorrecta: "B",
        explicacion: "La SAT, creada por el Decreto 1-98, es la entidad descentralizada responsable de administrar, recaudar, fiscalizar y controlar los tributos internos y los que gravan el comercio exterior. El Ministerio de Finanzas Públicas es el ente rector de la política fiscal del Estado, pero la operación de recaudación, auditoría y cobro coactivo es función exclusiva de la SAT."
      },
      {
        id: 4,
        pregunta: "¿Qué grava el Impuesto Sobre la Renta (ISR) en Guatemala y cuál es su ley reguladora vigente?",
        opciones: {
          A: "Grava la propiedad de bienes inmuebles; está regulado por la Ley del IUSI, Decreto 15-98.",
          B: "Grava las rentas de actividades lucrativas, del trabajo y del capital, regulado por la Ley de Actualización Tributaria, Decreto 10-2012.",
          C: "Grava únicamente las importaciones de bienes suntuarios; lo administra la SAT en aduanas."
        },
        respuestaCorrecta: "B",
        explicacion: "El ISR (Decreto 10-2012, Libro I) es un impuesto directo sobre las rentas obtenidas en Guatemala. Las personas en relación de dependencia tributan bajo el régimen de retención en la fuente. Las empresas pueden optar entre el régimen sobre utilidades (25% sobre la renta neta) o el régimen simplificado opcional (5% sobre ingresos de Q0 a Q30,000 mensuales y 7% sobre el excedente)."
      },
      {
        id: 5,
        pregunta: "¿Cuándo se configura la evasión tributaria y cuáles son sus consecuencias en Guatemala?",
        opciones: {
          A: "Solo cuando el contribuyente presenta su declaración con retraso; la sanción es una multa fija de Q500.",
          B: "Cuando el contribuyente, mediante actos u omisiones dolosas, deja de pagar total o parcialmente un tributo; conlleva multas, recargos, intereses y puede generar responsabilidad penal.",
          C: "Cuando el contribuyente utiliza las deducciones legales para reducir su base imponible; la ley lo prohíbe expresamente."
        },
        respuestaCorrecta: "B",
        explicacion: "La evasión tributaria implica el incumplimiento doloso de la obligación de pagar tributos. El Código Tributario y el Código Penal guatemalteco tipifican la defraudación tributaria como delito cuando el monto defraudado supera Q100,000 en un período. Las consecuencias incluyen multas de hasta el 100% del impuesto omitido, recargos del 12% anual, intereses resarcitorios y prisión de 1 a 6 años. Distinto a la elusión: planificación fiscal legal que aprovecha los beneficios que la propia ley otorga."
      }
    ]
  },

  // ── FASE 2: Derecho Administrativo ampliado ──────────────────────────────────
  {
    id: "derecho-administrativo-ampliado",
    tema: "Derecho Administrativo — Contratos, Servicio Civil y Entes del Estado",
    descripcion: "Contratación pública (Guatecompras), servicio civil, Contraloría, Procuraduría y organización de la administración pública guatemalteca.",
    icono: "Landmark",
    categoria: "Administrativo",
    totalPreguntas: 20,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Qué es Guatecompras y cuál es su base legal?",
        opciones: {
          A: "El sistema electrónico de contrataciones y adquisiciones del Estado guatemalteco, regulado por la Ley de Contrataciones del Estado (Decreto 57-92).",
          B: "Un banco estatal que financia los proyectos de infraestructura del Gobierno Central.",
          C: "El registro electrónico de proveedores privados habilitados para exportar a Guatemala."
        },
        respuestaCorrecta: "A",
        explicacion: "Guatecompras es el portal electrónico de transparencia en compras y contrataciones del sector público, administrado por el Ministerio de Finanzas. Se basa en la Ley de Contrataciones del Estado (Decreto 57-92) y permite que cualquier ciudadano consulte las compras del Estado. Su fin es garantizar transparencia, competencia y eficiencia en el uso de los fondos públicos."
      },
      {
        id: 2,
        pregunta: "¿Cuándo procede la licitación pública en la contratación estatal guatemalteca?",
        opciones: {
          A: "Cuando el monto del contrato supera el límite establecido por la Ley de Contrataciones, actualmente fijado en Q900,000.00.",
          B: "Solo para obras de infraestructura que afecten a más de tres municipios.",
          C: "En todos los contratos del Estado, sin importar el monto o naturaleza."
        },
        respuestaCorrecta: "A",
        explicacion: "La Ley de Contrataciones del Estado (Decreto 57-92) y sus reformas establecen umbrales para los distintos procedimientos. La licitación pública aplica cuando el monto supera el límite legal vigente (Q900,000). Por debajo de ese umbral pueden usarse: cotización (Q90,001 a Q900,000) o compra directa (hasta Q90,000). Los montos exactos pueden actualizarse por acuerdos gubernativos."
      },
      {
        id: 3,
        pregunta: "¿Qué es el servicio civil en Guatemala y qué ley lo regula?",
        opciones: {
          A: "El régimen jurídico que regula el ingreso, permanencia y egreso de los trabajadores del Estado, regulado por la Ley de Servicio Civil (Decreto 1748).",
          B: "El sistema de seguridad social de los empleados públicos administrado por el IGSS.",
          C: "El régimen disciplinario aplicable exclusivamente a los miembros del Ejército de Guatemala."
        },
        respuestaCorrecta: "A",
        explicacion: "La Ley de Servicio Civil (Decreto 1748) y su reglamento establecen el sistema de méritos para el empleo público. Regula: concursos de oposición para ingreso, clasificación de puestos, evaluación del desempeño, régimen disciplinario, traslados, ascensos y cesantías. La ONSEC (Oficina Nacional de Servicio Civil) es el ente rector. No todos los servidores públicos están bajo este régimen (algunos tienen leyes especiales)."
      },
      {
        id: 4,
        pregunta: "¿Qué función cumple la Procuraduría General de la Nación (PGN)?",
        opciones: {
          A: "Asesorar y representar legalmente al Estado de Guatemala en juicios y negocios jurídicos, y velar por los intereses del Estado.",
          B: "Investigar y perseguir penalmente los delitos cometidos por funcionarios públicos.",
          C: "Fiscalizar el uso de los fondos públicos y auditar las cuentas del Estado."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 252 de la CPRG establece que la PGN es la institución encargada de asesorar y representar al Estado en los asuntos jurídicos. El Procurador General es el mandatario legal del Estado. Sus funciones incluyen defender al Estado en juicios, emitir dictámenes jurídicos, representar al Estado en contratos y ser tutor de menores huérfanos o en abandono. No tiene funciones de persecución penal (eso corresponde al MP)."
      },
      {
        id: 5,
        pregunta: "¿Qué es la descentralización administrativa en Guatemala?",
        opciones: {
          A: "La transferencia de competencias, funciones, recursos y poder de decisión del Gobierno Central a los municipios y entidades autónomas.",
          B: "La privatización de los servicios públicos previamente prestados por el Estado.",
          C: "La división del territorio nacional en regiones administrativas sin transferencia de poder."
        },
        respuestaCorrecta: "A",
        explicacion: "La Ley General de Descentralización (Decreto 14-2002) define la descentralización como el proceso por el cual el Ejecutivo transfiere a las municipalidades y entidades autónomas o descentralizadas atribuciones, funciones, recursos y poder de decisión. Su fin es acercar la administración pública al ciudadano. Se diferencia de la desconcentración (delegación dentro de la misma entidad sin transferencia de competencia)."
      },
      {
        id: 6,
        pregunta: "¿Qué es un acto administrativo y cuáles son sus elementos esenciales?",
        opciones: {
          A: "La declaración unilateral de voluntad de la administración pública que produce efectos jurídicos; sus elementos son: competencia, objeto, fin, forma y motivación.",
          B: "Cualquier actuación de un funcionario público, incluyendo las puramente materiales como barrer una calle.",
          C: "Solo las resoluciones dictadas por el Presidente de la República en Consejo de Ministros."
        },
        respuestaCorrecta: "A",
        explicacion: "El acto administrativo es la manifestación de voluntad del Estado que crea, modifica o extingue situaciones jurídicas. Sus elementos esenciales son: competencia (el órgano debe estar facultado por ley), objeto lícito y posible, fin público, forma legal y motivación suficiente. La ausencia de cualquier elemento puede generar nulidad absoluta o relativa del acto."
      },
      {
        id: 7,
        pregunta: "¿Qué es el silencio administrativo positivo en el Derecho guatemalteco?",
        opciones: {
          A: "La presunción legal de que la administración ha aprobado una solicitud cuando no la resuelve dentro del plazo legal establecido.",
          B: "La obligación de la administración de motivar siempre sus resoluciones desfavorables.",
          C: "El derecho del administrado a no ser notificado cuando la resolución le es favorable."
        },
        respuestaCorrecta: "A",
        explicacion: "El silencio administrativo positivo (artículo 28 de la CPRG y Ley de lo Contencioso Administrativo) opera cuando la administración no resuelve en el plazo legal: se presume aprobada la solicitud. El plazo general es de 30 días hábiles. En contraste, el silencio negativo (denegatorio ficto) opera en ciertos procedimientos y permite al interesado acudir a la vía contenciosa."
      },
      {
        id: 8,
        pregunta: "¿Cuál es la función del Organismo Ejecutivo en la organización administrativa de Guatemala?",
        opciones: {
          A: "Ejercer la dirección general del Estado, ejecutar las leyes, dirigir la política exterior y administrar los servicios públicos a través de los Ministerios de Estado.",
          B: "Crear leyes, fiscalizar al gobierno y aprobar el presupuesto nacional.",
          C: "Impartir justicia y controlar la constitucionalidad de las leyes."
        },
        respuestaCorrecta: "A",
        explicacion: "El Organismo Ejecutivo (artículos 182-222 de la CPRG) está encabezado por el Presidente, secundado por el Vicepresidente y los Ministros de Estado. Ejecuta y hace cumplir las leyes, dirige la política general del Estado, conduce las relaciones exteriores y administra los recursos del Estado a través de los ministerios, secretarías y entidades descentralizadas."
      },
      {
        id: 9,
        pregunta: "¿Qué son las entidades autónomas del Estado guatemalteco?",
        opciones: {
          A: "Organismos estatales con personalidad jurídica propia, patrimonio propio y capacidad para administrarse, creadas por ley para prestar servicios especializados.",
          B: "Organizaciones no gubernamentales que reciben financiamiento estatal para proyectos sociales.",
          C: "Empresas privadas que operan bajo concesión estatal en servicios públicos esenciales."
        },
        respuestaCorrecta: "A",
        explicacion: "Las entidades autónomas (como el IGSS, USAC, Banco de Guatemala, municipalidades) tienen personería jurídica propia, su propio presupuesto y autonomía para gobernarse. La autonomía puede ser plena (USAC) o funcional. Están sujetas a la fiscalización de la Contraloría General de Cuentas y a la ley que las crea, pero no a la jerarquía del Ejecutivo en su gestión."
      },
      {
        id: 10,
        pregunta: "¿Qué es la nulidad de pleno derecho en los actos administrativos?",
        opciones: {
          A: "La invalidez absoluta del acto por ausencia de algún requisito esencial, que opera sin necesidad de declaración judicial y no puede ser subsanada.",
          B: "La anulación de un acto administrativo que solo puede decretarla el Presidente de la República.",
          C: "La suspensión temporal de los efectos de un acto mientras se resuelve el recurso administrativo."
        },
        respuestaCorrecta: "A",
        explicacion: "La nulidad de pleno derecho (nulidad absoluta) opera cuando el acto carece de un elemento esencial o viola normas imperativas. No requiere declaración judicial para operar, aunque generalmente se declara formalmente. No puede convalidarse ni sanearse. Se diferencia de la anulabilidad (nulidad relativa), que puede subsanarse y solo produce efectos desde su declaración."
      },
      {
        id: 11,
        pregunta: "¿Qué regula la Ley de Acceso a la Información Pública (Decreto 57-2008)?",
        opciones: {
          A: "El derecho de toda persona a solicitar y recibir información de cualquier institución pública, con excepciones para información clasificada.",
          B: "El régimen de secreto de Estado aplicable a las comunicaciones del Gobierno Central.",
          C: "Los procedimientos para proteger datos personales de ciudadanos en poder de empresas privadas."
        },
        respuestaCorrecta: "A",
        explicacion: "El Decreto 57-2008 consagra el derecho de acceso a la información pública como derecho fundamental. Obliga a todas las instituciones del Estado a divulgar información activamente y a responder solicitudes en 10 días hábiles (prorrogables por 10 más). La información clasificada incluye: datos de seguridad nacional, información comercial confidencial y datos personales sensibles. El incumplimiento genera responsabilidad administrativa y penal."
      },
      {
        id: 12,
        pregunta: "¿Qué es la expropiación forzosa en el Derecho Administrativo guatemalteco?",
        opciones: {
          A: "La privación coactiva de la propiedad privada por causa de utilidad colectiva, beneficio social o interés público, mediante indemnización previa y justa.",
          B: "La confiscación de bienes de personas condenadas por delitos graves sin compensación alguna.",
          C: "La transferencia voluntaria de bienes privados al Estado a cambio de exenciones fiscales."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 40 de la CPRG y la Ley de Expropiación (Decreto 529) regulan la expropiación. Requisitos: (1) causa de utilidad colectiva o necesidad pública, (2) declaración legal que así lo establezca, (3) indemnización previa y justa. La Constitución prohíbe la confiscación. El propietario puede impugnar el monto de la indemnización pero no puede oponerse a la expropiación una vez declarada la utilidad pública."
      },
      {
        id: 13,
        pregunta: "¿Quién es el órgano superior de la administración pública central en Guatemala?",
        opciones: {
          A: "El Presidente de la República, como Jefe del Organismo Ejecutivo.",
          B: "El Congreso de la República, como representante de la soberanía popular.",
          C: "La Corte Suprema de Justicia, en su calidad de máximo tribunal del país."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 182 de la CPRG establece que el Presidente de la República es el Jefe del Estado, Jefe del Organismo Ejecutivo y Comandante General del Ejército. Es la máxima autoridad de la administración pública central y ejerce el poder ejecutivo junto al Vicepresidente y los Ministros de Estado. Preside el Consejo de Ministros y es responsable de la política general de gobierno."
      },
      {
        id: 14,
        pregunta: "¿Qué es el Ministerio Público (MP) en el sistema guatemalteco?",
        opciones: {
          A: "Una institución auxiliar de la administración pública y del Organismo Judicial, con autonomía funcional, encargada de la persecución penal.",
          B: "El ministerio encargado de la defensa jurídica del Estado guatemalteco en juicios.",
          C: "El órgano administrativo que supervisa a todos los jueces y magistrados del país."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 251 de la CPRG y la Ley Orgánica del MP (Decreto 40-94) establecen que el MP es autónomo, no pertenece al Organismo Ejecutivo ni al Judicial. Le corresponde investigar los delitos y ejercer la acción penal pública. El Fiscal General es electo por el Presidente de una nómina de seis candidatos presentada por una comisión de postulación."
      },
      {
        id: 15,
        pregunta: "¿Cuál es el procedimiento para que un contrato administrativo sea válido en Guatemala?",
        opciones: {
          A: "Debe cumplir el procedimiento de la Ley de Contrataciones (licitación, cotización o compra directa según el monto), aprobarse por la autoridad competente y registrarse.",
          B: "Basta con la firma de cualquier funcionario del ministerio contratante y publicación en el diario oficial.",
          C: "Solo requiere la autorización del Presidente de la República, sin importar el monto."
        },
        respuestaCorrecta: "A",
        explicacion: "La validez de los contratos administrativos (Ley de Contrataciones, Decreto 57-92) exige: (1) competencia del funcionario contratante, (2) disponibilidad presupuestaria, (3) procedimiento de selección adecuado al monto (licitación, cotización o compra directa), (4) aprobación por autoridad superior y (5) registro en el sistema Guatecompras. Los contratos incumplan estos requisitos pueden ser impugnados o declarados nulos."
      },
      {
        id: 16,
        pregunta: "¿Qué es la Defensoría del Pueblo (Procurador de los Derechos Humanos) en Guatemala?",
        opciones: {
          A: "Un comisionado del Congreso de la República, con independencia funcional, que defiende los derechos constitucionales de los ciudadanos ante abusos de la administración pública.",
          B: "Un órgano del Organismo Judicial encargado de tramitar quejas contra jueces corruptos.",
          C: "El representante legal del Estado ante la Corte Interamericana de Derechos Humanos."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 274 de la CPRG y la Ley de la Comisión de Derechos Humanos (Decreto 54-86) crean al Procurador de los Derechos Humanos como comisionado del Congreso. Su función es supervisar la administración pública, investigar denuncias de violaciones a derechos constitucionales, formular recomendaciones y promover el respeto de los derechos humanos. No tiene poder coercitivo pero emite censuras públicas de gran impacto."
      },
      {
        id: 17,
        pregunta: "¿Qué es la responsabilidad patrimonial del Estado en Guatemala?",
        opciones: {
          A: "La obligación del Estado de reparar los daños causados a los particulares por el funcionamiento anormal de los servicios públicos o por actos ilícitos de sus funcionarios.",
          B: "La responsabilidad personal e ilimitada de los funcionarios públicos por todos los actos de gobierno.",
          C: "La garantía del Estado de cubrir las deudas privadas de las empresas públicas en caso de quiebra."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 155 de la CPRG establece la responsabilidad del Estado: cuando un dignatario, funcionario o trabajador del Estado cause daño por su actuación en ejercicio del cargo, el Estado indemnizará al perjudicado. La acción para exigir la responsabilidad patrimonial del Estado se ejerce en el proceso contencioso-administrativo o en la vía civil según el caso."
      },
      {
        id: 18,
        pregunta: "¿Qué función tiene el Organismo Legislativo en relación con la administración pública?",
        opciones: {
          A: "Crear el marco legal que rige a la administración, aprobar el presupuesto del Estado y fiscalizar al Organismo Ejecutivo.",
          B: "Administrar directamente los servicios públicos e instituciones del Estado.",
          C: "Nombrar y remover a todos los funcionarios de los tres organismos del Estado."
        },
        respuestaCorrecta: "A",
        explicacion: "El Congreso de la República (artículos 157-181 de la CPRG) tiene tres funciones principales respecto a la administración: legislar (crear las normas que la administración debe cumplir), aprobar el presupuesto general del Estado, y fiscalizar al Ejecutivo mediante interpelaciones a Ministros, comisiones de investigación y el control político del gasto público."
      },
      {
        id: 19,
        pregunta: "¿En qué consiste el recurso de amparo frente a actos administrativos?",
        opciones: {
          A: "En la acción constitucional que protege al ciudadano contra actos de la administración que amenacen, restrinjan o violen sus derechos constitucionales.",
          B: "En el recurso jerárquico especial que se interpone ante el Presidente de la República contra actos ministeriales.",
          C: "En la acción penal que puede iniciar el afectado contra el funcionario que dicta el acto lesivo."
        },
        respuestaCorrecta: "A",
        explicacion: "El amparo (artículos 265-276 de la CPRG y Ley de Amparo, Exhibición Personal y de Constitucionalidad, Decreto 1-86) protege a toda persona contra amenazas, restricciones o violaciones a sus derechos constitucionales por actos de autoridad. Contra actos administrativos procede el amparo cuando se agotan los recursos administrativos ordinarios o cuando el acto es de efecto inmediato. El amparo no es sustituto de los recursos ordinarios."
      },
      {
        id: 20,
        pregunta: "¿Cuál es el plazo para interponer el recurso de revocatoria contra actos administrativos en Guatemala?",
        opciones: {
          A: "Tres días hábiles siguientes a la notificación de la resolución.",
          B: "Diez días hábiles siguientes a la notificación.",
          C: "Treinta días calendario a partir de la fecha del acto."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 7 de la Ley de lo Contencioso Administrativo (Decreto 119-96) establece que el recurso de revocatoria debe interponerse dentro de los tres días hábiles siguientes a la notificación de la resolución. La brevedad del plazo exige atención inmediata al notificarse una resolución desfavorable. El incumplimiento del plazo provoca la firmeza del acto y la imposibilidad de impugnarlo en vía administrativa."
      }
    ]
  },

  // ── FASE 2: Derecho Tributario ampliado ──────────────────────────────────────
  {
    id: "derecho-tributario-ampliado",
    tema: "Derecho Tributario — Obligación Tributaria y Tributos Específicos",
    descripcion: "Hecho generador, base imponible, IUSI, ISR regímenes, sanciones tributarias y derechos del contribuyente en Guatemala.",
    icono: "Receipt",
    categoria: "Tributario",
    totalPreguntas: 15,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Qué es el hecho generador de la obligación tributaria?",
        opciones: {
          A: "El presupuesto legal cuya realización origina el nacimiento de la obligación de pagar un tributo.",
          B: "La resolución administrativa que ordena al contribuyente pagar determinado impuesto.",
          C: "El embargo preventivo que practica la SAT sobre bienes del contribuyente moroso."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 31 del Código Tributario (Decreto 6-91) define el hecho generador como el presupuesto establecido en la ley, cuya realización origina el nacimiento de la obligación tributaria. Ejemplo: en el IVA, el hecho generador es la venta de bienes o prestación de servicios; en el ISR, es la obtención de rentas. Sin hecho generador no puede exigirse ningún tributo."
      },
      {
        id: 2,
        pregunta: "¿Qué es la base imponible en Derecho Tributario?",
        opciones: {
          A: "La magnitud dineraria o de otra naturaleza que cuantifica el hecho generador y sobre la cual se aplica el tipo o tarifa para calcular el tributo.",
          B: "El monto mínimo de ingresos que un contribuyente debe declarar para quedar exento de tributos.",
          C: "El valor máximo que la administración tributaria puede cobrar sin autorización judicial."
        },
        respuestaCorrecta: "A",
        explicacion: "La base imponible es la medida del hecho generador sobre la que se aplica la tarifa o tipo impositivo. Ejemplo: en el IVA, la base imponible es el precio de venta del bien o servicio; en el ISR régimen de utilidades, es la renta neta (ingresos menos deducciones). De la base imponible multiplicada por la tasa se obtiene el impuesto a pagar."
      },
      {
        id: 3,
        pregunta: "¿Qué grava el Impuesto Único Sobre Inmuebles (IUSI) y quién lo administra?",
        opciones: {
          A: "La propiedad, posesión o usufructo de bienes inmuebles en Guatemala; lo administran y recaudan las municipalidades.",
          B: "Las ganancias obtenidas por la venta de propiedades inmobiliarias; lo recauda la SAT.",
          C: "Los contratos de arrendamiento de bienes inmuebles con valor superior a Q500,000."
        },
        respuestaCorrecta: "A",
        explicacion: "El IUSI (Ley del IUSI, Decreto 15-98) grava la propiedad, posesión y usufructo de bienes inmuebles situados en Guatemala. Las tasas son del 2‰ (inmuebles con valor hasta Q2,000) al 9‰ para los de mayor valor. Los municipios recaudan el IUSI y retienen un porcentaje para su financiamiento; el resto se distribuye a los Consejos de Desarrollo. El catastro y actualización de valores es responsabilidad del RIC y municipalidades."
      },
      {
        id: 4,
        pregunta: "¿Cuáles son los dos regímenes del ISR para actividades lucrativas en Guatemala?",
        opciones: {
          A: "Régimen sobre las utilidades de actividades lucrativas (25% sobre renta neta) y Régimen simplificado opcional (5% y 7% sobre ingresos brutos).",
          B: "Régimen general (15% sobre ingresos) y Régimen especial (30% sobre ingresos de empresas extranjeras).",
          C: "Régimen de retención en la fuente (10%) y Régimen de declaración anual (20%)."
        },
        respuestaCorrecta: "A",
        explicacion: "La Ley de Actualización Tributaria (Decreto 10-2012) establece dos regímenes para actividades lucrativas: (1) Sobre utilidades: tasa del 25% sobre la renta neta (ingresos menos gastos deducibles), con declaración trimestral de pagos. (2) Simplificado opcional: 5% sobre ingresos de hasta Q30,000 mensuales y 7% sobre el excedente; sin necesidad de llevar contabilidad detallada. El contribuyente elige y puede cambiar de régimen una vez por año."
      },
      {
        id: 5,
        pregunta: "¿Qué es la prescripción tributaria en Guatemala y cuál es su plazo general?",
        opciones: {
          A: "La extinción del derecho de la SAT a exigir el pago de tributos no pagados, cuyo plazo general es de 4 años.",
          B: "La anulación automática de multas tributarias cuando han transcurrido 2 años sin cobro.",
          C: "El plazo de 10 años tras el cual la SAT no puede iniciar auditorías fiscales."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 47 del Código Tributario establece que el derecho de la administración tributaria para determinar obligaciones, cobrar tributos, intereses y sanciones prescribe en 4 años. El plazo se extiende a 8 años cuando el contribuyente no está registrado, no presenta declaraciones o utiliza facturas falsas. La prescripción se interrumpe por notificación de ajustes, demandas de cobro o reconocimiento de deuda."
      },
      {
        id: 6,
        pregunta: "¿Qué es una consulta tributaria y quién puede formularla?",
        opciones: {
          A: "El derecho del contribuyente a preguntar a la SAT sobre el régimen tributario aplicable a situaciones concretas futuras, obteniendo respuesta vinculante.",
          B: "La facultad de la SAT de solicitar a los contribuyentes información sobre sus operaciones comerciales.",
          C: "El procedimiento interno de la SAT para verificar la correcta aplicación de las leyes tributarias."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 102 del Código Tributario reconoce el derecho del contribuyente a formular consultas escritas sobre la aplicación de normas tributarias a situaciones concretas. La SAT debe responder en 30 días. La respuesta es vinculante para la SAT respecto a la situación consultada, lo que da seguridad jurídica al contribuyente que actúa conforme a la respuesta obtenida."
      },
      {
        id: 7,
        pregunta: "¿Qué es el principio de capacidad contributiva en materia tributaria?",
        opciones: {
          A: "El principio según el cual cada persona debe contribuir al sostenimiento del Estado en proporción a su capacidad económica real.",
          B: "La obligación del Estado de cobrar los mismos impuestos a todos los ciudadanos por igual.",
          C: "El derecho del contribuyente a negociar el monto de sus impuestos con la administración tributaria."
        },
        respuestaCorrecta: "A",
        explicacion: "La capacidad contributiva (artículo 243 de la CPRG) es un principio constitucional tributario: el sistema debe ser justo y equitativo, y cada contribuyente tributa según su riqueza. Implica que los impuestos progresivos (como el ISR escalonado) son constitucionalmente válidos porque exigen más a quien más tiene. Prohíbe que los tributos sean confiscatorios o representen una carga desproporcionada."
      },
      {
        id: 8,
        pregunta: "¿Qué obligaciones formales tiene un contribuyente del IVA en Guatemala?",
        opciones: {
          A: "Inscribirse en el registro tributario, emitir facturas por cada venta o servicio, llevar libros contables habilitados y presentar declaraciones mensuales ante la SAT.",
          B: "Solo presentar una declaración anual consolidada con el resumen de todas sus ventas del año.",
          C: "Contratar a un auditor externo que certifique sus estados financieros ante la SAT trimestralmente."
        },
        respuestaCorrecta: "A",
        explicacion: "Los contribuyentes del IVA deben: (1) inscribirse en el RTU de la SAT, (2) emitir facturas o documentos equivalentes autorizados por cada operación, (3) llevar los libros contables y de ventas/compras habilitados por la SAT, (4) presentar declaración mensual (formulario SAT-2046) pagando la diferencia entre IVA débito (cobrado en ventas) e IVA crédito (pagado en compras)."
      },
      {
        id: 9,
        pregunta: "¿Qué es el ajuste tributario y cómo puede impugnarse?",
        opciones: {
          A: "La determinación de diferencias entre lo declarado por el contribuyente y lo establecido por la SAT en auditoría; se impugna mediante recurso de revocatoria o recurso de revisión.",
          B: "La rectificación voluntaria que hace el contribuyente de sus propias declaraciones antes de ser auditado.",
          C: "La corrección automática que aplica la SAT a los errores aritméticos en las declaraciones."
        },
        respuestaCorrecta: "A",
        explicacion: "El ajuste tributario es la diferencia que la SAT determina en auditoría entre el impuesto declarado y el que debió pagarse. Ante un ajuste, el contribuyente puede: (1) aceptarlo y pagar con reducción de sanción, (2) impugnarlo mediante recurso de revocatoria ante la SAT (30 días), (3) si se confirma, interponer recurso de revisión ante el Ministerio de Finanzas, y (4) acudir al contencioso-administrativo."
      },
      {
        id: 10,
        pregunta: "¿Qué es el Impuesto de Solidaridad (ISO) en Guatemala?",
        opciones: {
          A: "Un impuesto trimestral sobre los activos netos o los ingresos brutos de las empresas (el mayor), con tasa del 1%, acreditable al ISR.",
          B: "Un tributo de emergencia que se aplica solo en períodos de crisis económica nacional.",
          C: "El impuesto que pagan los empleados por encima de cierto nivel de ingresos para financiar el seguro social."
        },
        respuestaCorrecta: "A",
        explicacion: "El ISO (Decreto 73-2008) es un impuesto que aplica a los contribuyentes del ISR del régimen de utilidades. Se paga trimestralmente sobre el mayor entre: (a) el 1% del total de activos netos del período anterior y (b) el 1% de los ingresos brutos del trimestre. El ISO pagado es acreditable contra el ISR anual, por lo que si el contribuyente paga suficiente ISR, el ISO no representa un costo adicional."
      },
      {
        id: 11,
        pregunta: "¿Cuáles son los derechos fundamentales del contribuyente ante la SAT?",
        opciones: {
          A: "Ser informado de sus obligaciones, ser tratado con respeto, solicitar consultas vinculantes, acceder al expediente, obtener devolución de créditos fiscales y ser notificado de ajustes con plazo para defenderse.",
          B: "Solo el derecho a pagar en cuotas y a solicitar prórroga para presentar declaraciones.",
          C: "Únicamente el derecho a apelar ante tribunales cuando ya se haya agotado toda la vía administrativa."
        },
        respuestaCorrecta: "A",
        explicacion: "El Código Tributario (artículo 102) reconoce múltiples derechos al contribuyente: ser informado, obtener copias de su expediente, formular consultas vinculantes, ser notificado de ajustes antes de su firme aplicación, corregir errores sin sanción si es antes de ser citado, solicitar devoluciones de crédito fiscal, recurrir las resoluciones y obtener información sobre el estado de sus trámites."
      },
      {
        id: 12,
        pregunta: "¿Qué es la retención en la fuente del ISR en las relaciones laborales?",
        opciones: {
          A: "La obligación del empleador de deducir mensualmente del salario del trabajador el ISR correspondiente y enterarlo a la SAT.",
          B: "La facultad del trabajador de retener parte de su salario para pagarlo directamente a la SAT.",
          C: "El descuento que aplica la SAT a las empresas que no presentan planillas laborales."
        },
        respuestaCorrecta: "A",
        explicacion: "En el ISR de rentas del trabajo (Decreto 10-2012, Libro I), el empleador actúa como agente retenedor: calcula el ISR anual proyectado del trabajador, lo divide entre 12 meses y retiene esa cuota mensualmente. La tasa es del 5% sobre los primeros Q300,000 de renta imponible y 7% sobre el excedente. El empleador es responsable de enterar las retenciones a la SAT mensualmente."
      },
      {
        id: 13,
        pregunta: "¿Qué es la factura electrónica (FEL) en Guatemala?",
        opciones: {
          A: "El sistema de emisión y transmisión en línea de documentos tributarios (facturas, notas de crédito y débito) certificados por la SAT en tiempo real.",
          B: "El comprobante escaneado de facturas físicas que el contribuyente sube mensualmente al portal de la SAT.",
          C: "Un tipo de factura especial solo para exportaciones que se tramita ante el BANGUAT."
        },
        respuestaCorrecta: "A",
        explicacion: "La Factura Electrónica en Línea (FEL), implementada gradualmente desde 2019, es el sistema por el que los documentos tributarios se generan digitalmente y se transmiten a la SAT en tiempo real para su certificación. Beneficios: mayor control del IVA, reducción de facturas falsas, agilización de devoluciones de crédito fiscal y simplificación contable para el contribuyente."
      },
      {
        id: 14,
        pregunta: "¿Qué sanción aplica el Código Tributario por no emitir facturas en Guatemala?",
        opciones: {
          A: "Multa equivalente al 100% del impuesto omitido y cierre temporal del establecimiento.",
          B: "Solo una amonestación por escrito en la primera infracción.",
          C: "Suspensión del número de identificación tributaria (NIT) por 90 días."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 94 del Código Tributario tipifica como infracción la omisión de emitir facturas. La sanción incluye multa equivalente al 100% del impuesto correspondiente a la operación no facturada y puede conllevar cierre temporal del establecimiento de hasta 10 días. En caso de reincidencia, el cierre puede ser definitivo. Además, pueden aplicarse consecuencias penales si el monto eludido supera los umbrales legales."
      },
      {
        id: 15,
        pregunta: "¿Qué es el crédito fiscal del IVA y cuándo procede su devolución?",
        opciones: {
          A: "El IVA pagado en las compras del contribuyente que puede descontarse del IVA cobrado en sus ventas; si el crédito supera el débito, procede solicitar devolución a la SAT.",
          B: "Un bono tributario que el Estado otorga a las empresas exportadoras para incentivar sus ventas al extranjero.",
          C: "La deuda que tiene el contribuyente con la SAT por impuestos no pagados en períodos anteriores."
        },
        respuestaCorrecta: "A",
        explicacion: "El mecanismo del IVA funciona por débito-crédito: el IVA cobrado en ventas es el débito fiscal; el IVA pagado en compras es el crédito fiscal. Si el crédito supera el débito (común en exportadores que venden con tasa 0%), el contribuyente puede solicitar devolución a la SAT. La devolución se tramita ante la Unidad de Devoluciones de Crédito Fiscal y puede hacerse mediante compensación, acreditamiento o pago en efectivo."
      }
    ]
  },

  // ─── DERECHO PROCESAL CIVIL ──────────────────────────────────────────────
  {
    id: "derecho-procesal-civil",
    tema: "Derecho Procesal Civil y Mercantil",
    descripcion: "Tipos de juicios, medidas cautelares, recursos y cosa juzgada según el CPCYM (Decreto Ley 107) de Guatemala.",
    icono: "ClipboardList",
    categoria: "Procesal",
    totalPreguntas: 5,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuál es el código que regula los procesos judiciales en materia civil en Guatemala?",
        opciones: {
          A: "El Código Civil, Decreto Ley 106, que unifica el derecho sustantivo y procesal.",
          B: "El Código Procesal Civil y Mercantil (CPCYM), Decreto Ley 107.",
          C: "La Ley del Organismo Judicial, Decreto 2-89, aplicable a todos los procesos."
        },
        respuestaCorrecta: "B",
        explicacion: "El Código Procesal Civil y Mercantil (CPCYM), Decreto Ley 107, regula los procesos judiciales civiles y mercantiles en Guatemala. Establece los tipos de juicios, las normas probatorias, los recursos procesales, las medidas cautelares y la ejecución de sentencias. Se complementa con la Ley del Organismo Judicial (Decreto 2-89), que regula la organización de los tribunales."
      },
      {
        id: 2,
        pregunta: "¿Cuáles son los principales tipos de procesos civiles que establece el CPCYM guatemalteco?",
        opciones: {
          A: "Solo el juicio ordinario para todos los asuntos civiles, sin distinción de materia o cuantía.",
          B: "Juicio ordinario, juicio oral, juicio sumario y procesos de ejecución, según la naturaleza del asunto.",
          C: "Solo procesos de menor y mayor cuantía, determinados exclusivamente por el valor económico del litigio."
        },
        respuestaCorrecta: "B",
        explicacion: "El CPCYM establece distintos tipos de procesos: el juicio ordinario (asuntos de mayor complejidad), el juicio oral (alimentos, asuntos de menor cuantía, rendición de cuentas), el juicio sumario (arrendamientos, deuda líquida y exigible) y los procesos de ejecución (en la vía de apremio, ejecutiva o de conocimiento). La elección del proceso correcto determina las formas, plazos y garantías aplicables."
      },
      {
        id: 3,
        pregunta: "¿Qué son las medidas cautelares en el proceso civil guatemalteco y cuáles son las principales?",
        opciones: {
          A: "Sanciones que el juez impone al demandado al inicio del proceso, sin necesidad de probar el derecho.",
          B: "Providencias preventivas que aseguran la eficacia de la futura sentencia: arraigo, embargo, secuestro e intervención judicial.",
          C: "Acuerdos entre las partes para suspender temporalmente el proceso civil."
        },
        respuestaCorrecta: "B",
        explicacion: "Las medidas cautelares (artículos 516 y siguientes del CPCYM) son providencias provisionales para asegurar el resultado del proceso. Las principales son: arraigo (impide al demandado salir del país), embargo (afecta bienes del deudor), secuestro (desapoderamiento de bienes específicos), anotación de demanda (publicidad registral) e intervención judicial (administración de empresa por el juzgado). Para decretarlas se requiere acreditar verosimilitud del derecho y peligro en la demora."
      },
      {
        id: 4,
        pregunta: "¿Cuál es el recurso ordinario que procede contra sentencias de primera instancia en el proceso civil guatemalteco?",
        opciones: {
          A: "El recurso de casación ante la Corte Suprema de Justicia, interpuesto dentro de 15 días.",
          B: "El recurso de apelación ante la Sala de la Corte de Apelaciones, dentro de 3 días para autos y 5 días para sentencias.",
          C: "El recurso de nulidad, que anula automáticamente toda sentencia que contenga un defecto formal."
        },
        respuestaCorrecta: "B",
        explicacion: "El recurso de apelación (artículo 602 del CPCYM) es el medio de impugnación ordinario de las resoluciones de primera instancia. Se interpone ante el juez que dictó la resolución dentro de 3 días para autos y 5 días para sentencias definitivas. El tribunal de alzada es la Sala de la Corte de Apelaciones del ramo civil. Contra lo resuelto en segunda instancia procede, en casos tasados, el recurso extraordinario de casación."
      },
      {
        id: 5,
        pregunta: "¿Qué es la cosa juzgada en el Derecho Procesal Civil guatemalteco?",
        opciones: {
          A: "La facultad del juez de revisar y modificar su propia sentencia dentro de los 30 días siguientes a su dictado.",
          B: "La calidad que adquiere una sentencia firme que la hace inmutable e irrecurrible, impidiendo un nuevo proceso sobre el mismo objeto entre las mismas partes.",
          C: "El principio que obliga a los jueces a fallar de la misma forma en casos similares anteriores."
        },
        respuestaCorrecta: "B",
        explicacion: "La cosa juzgada es el efecto de la sentencia firme que la hace irrecurrible e inmutable. Tiene dos efectos: negativo (non bis in idem: no puede iniciarse un nuevo proceso sobre el mismo asunto entre las mismas partes con la misma causa) y positivo (lo resuelto debe ser acatado en procesos posteriores relacionados). Es una garantía fundamental de seguridad jurídica consagrada en la Ley del Organismo Judicial."
      }
    ]
  },

  // ─── DERECHOS HUMANOS ────────────────────────────────────────────────────
  {
    id: "derechos-humanos",
    tema: "Derechos Humanos en Guatemala",
    descripcion: "Garantías constitucionales, sistema interamericano, PDH y preeminencia de tratados internacionales en el ordenamiento guatemalteco.",
    icono: "ShieldCheck",
    categoria: "Constitucional",
    totalPreguntas: 5,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuáles son las garantías constitucionales para la protección de derechos fundamentales en Guatemala?",
        opciones: {
          A: "Solo el recurso de amparo, aplicable a toda vulneración de derechos.",
          B: "El amparo, la exhibición personal (hábeas corpus) y la inconstitucionalidad de leyes, regulados por la Ley Decreto 1-86.",
          C: "Únicamente el hábeas corpus para casos de detención ilegal."
        },
        respuestaCorrecta: "B",
        explicacion: "La Constitución (artículos 265-276) y la Ley de Amparo, Exhibición Personal e Inconstitucionalidad (Decreto 1-86) establecen tres garantías: el amparo (protege derechos frente a actos arbitrarios de autoridad), la exhibición personal o hábeas corpus (tutela la libertad individual frente a detenciones ilegales o arbitrarias) y la inconstitucionalidad (impugna normas contrarias a la Constitución, en forma general ante la CC o como excepción en casos concretos)."
      },
      {
        id: 2,
        pregunta: "¿Qué rango tienen los tratados internacionales de derechos humanos ratificados por Guatemala según el artículo 46 de la Constitución?",
        opciones: {
          A: "Rango infralegal: están por debajo de las leyes ordinarias del Congreso.",
          B: "Preeminencia sobre el derecho interno en materia de derechos humanos; prevalecen sobre las leyes ordinarias.",
          C: "El mismo rango que un acuerdo gubernativo emitido por el Organismo Ejecutivo."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 46 de la CPRG establece: 'en materia de derechos humanos, los tratados y convenciones aceptados y ratificados por Guatemala tienen preeminencia sobre el derecho interno.' Esto significa que la Convención Americana sobre Derechos Humanos, el Pacto Internacional de Derechos Civiles y Políticos y otros tratados ratificados prevalecen sobre las leyes ordinarias. La Corte de Constitucionalidad ha interpretado que no prevalecen sobre la Constitución misma."
      },
      {
        id: 3,
        pregunta: "¿Ante qué organismo internacional pueden acudir los guatemaltecos cuando el Estado viola sus derechos y han agotado los recursos internos?",
        opciones: {
          A: "Ante la Corte Internacional de Justicia con sede en La Haya, Países Bajos.",
          B: "Ante la Comisión Interamericana de Derechos Humanos (CIDH) y, eventualmente, ante la Corte Interamericana de Derechos Humanos.",
          C: "Ante el Tribunal Europeo de Derechos Humanos, al ser Guatemala signataria del Convenio Europeo."
        },
        respuestaCorrecta: "B",
        explicacion: "Guatemala es Estado parte de la Convención Americana sobre Derechos Humanos (Pacto de San José) y reconoce la competencia contenciosa de la Corte IDH. Cuando una persona agota los recursos internos sin obtener justicia, puede presentar una petición ante la CIDH. Si la Comisión admite el caso y no hay solución amistosa, puede someter el asunto a la Corte IDH, cuyas sentencias son vinculantes para el Estado guatemalteco."
      },
      {
        id: 4,
        pregunta: "¿Qué institución guatemalteca tiene el mandato constitucional de defender los derechos humanos de los habitantes frente a abusos del Estado?",
        opciones: {
          A: "La Procuraduría General de la Nación, que representa al Estado en juicio.",
          B: "El Procurador de los Derechos Humanos (PDH), comisionado del Congreso elegido para un período de 5 años.",
          C: "La Fiscalía de Derechos Humanos del Ministerio Público, que persigue penalmente a los infractores."
        },
        respuestaCorrecta: "B",
        explicacion: "El Procurador de los Derechos Humanos (artículo 273 CPRG) es un comisionado del Congreso de la República que defiende los derechos constitucionales frente a abusos de la administración pública. No tiene facultades jurisdiccionales, pero puede investigar, supervisar a la administración, emitir censuras públicas, recomendar medidas legislativas y promover acciones legales. Es elegido por el Congreso para un período de 5 años."
      },
      {
        id: 5,
        pregunta: "¿Qué establece el artículo 4 de la Constitución Política de Guatemala respecto a la igualdad?",
        opciones: {
          A: "Que solo los ciudadanos guatemaltecos por nacimiento gozan de plena igualdad ante la ley.",
          B: "Que en Guatemala todos los seres humanos son libres e iguales en dignidad y derechos, sin discriminación por raza, color, sexo, religión, nacimiento u otra razón.",
          C: "Que la igualdad legal aplica exclusivamente en materia laboral y educativa, no en otros ámbitos."
        },
        respuestaCorrecta: "B",
        explicacion: "El artículo 4 de la CPRG consagra el principio de igualdad: 'En Guatemala todos los seres humanos son libres e iguales en dignidad y derechos. El hombre y la mujer, cualquiera que sea su estado civil, tienen iguales oportunidades y responsabilidades.' Este artículo es fundamento del derecho antidiscriminatorio guatemalteco y base para la protección de comunidades indígenas, mujeres y grupos históricamente marginados."
      }
    ]
  },

  // ── FASE 3: Derecho Constitucional ampliado ──────────────────────────────────
  {
    id: "derecho-constitucional-estado",
    tema: "Derecho Constitucional — Organización del Estado y Derechos",
    descripcion: "Organismos del Estado, Corte de Constitucionalidad, derechos individuales y sociales, reformas constitucionales y supremacía constitucional (CPRG 1985).",
    icono: "Scale",
    categoria: "Constitucional",
    totalPreguntas: 15,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuáles son los tres organismos del Estado guatemalteco y en qué artículo de la CPRG se establecen?",
        opciones: {
          A: "Ejecutivo, Legislativo y Judicial; artículo 141 de la CPRG.",
          B: "Presidente, Congreso y Corte Suprema; artículo 100 de la CPRG.",
          C: "Central, Departamental y Municipal; artículo 200 de la CPRG."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 141 de la CPRG establece: 'La soberanía radica en el pueblo quien la delega, para su ejercicio, en los Organismos Legislativo, Ejecutivo y Judicial.' Cada organismo tiene funciones separadas y ninguno puede subordinar a otro; la independencia entre poderes es un pilar del Estado de Derecho guatemalteco. Se complementan con entidades autónomas como la CC, el TSE y el MP."
      },
      {
        id: 2,
        pregunta: "¿Cuál es la composición de la Corte de Constitucionalidad (CC) de Guatemala?",
        opciones: {
          A: "Cinco magistrados titulares y cinco suplentes, elegidos por cinco años, postulados por el Congreso, el Ejecutivo, la CSJ, el CANG y la USAC.",
          B: "Siete magistrados nombrados vitaliciamente por el Presidente de la República.",
          C: "Nueve magistrados titulares elegidos por el Congreso de la República para un período de cuatro años."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 269 de la CPRG establece que la CC se integra por cinco magistrados titulares con sus suplentes, cada uno designado por un sector diferente: el Congreso de la República, el Ejecutivo en Consejo de Ministros, la Corte Suprema de Justicia, el Colegio de Abogados (CANG) y la Universidad de San Carlos de Guatemala. Duran en funciones cinco años y no pueden ser reelectos de inmediato."
      },
      {
        id: 3,
        pregunta: "¿Cuál es la función principal de la Corte de Constitucionalidad de Guatemala?",
        opciones: {
          A: "Defender el orden constitucional, conocer los recursos de inconstitucionalidad y emitir opiniones sobre tratados internacionales.",
          B: "Juzgar en única instancia a los funcionarios del más alto rango por delitos cometidos en el ejercicio del cargo.",
          C: "Administrar el presupuesto del Organismo Judicial y nombrar a los jueces de primera instancia."
        },
        respuestaCorrecta: "A",
        explicacion: "La CC (artículo 268 CPRG) es un tribunal permanente de jurisdicción privativa, cuya función esencial es la defensa del orden constitucional. Conoce: inconstitucionalidades generales (que derogan normas), amparos en única instancia contra ciertos órganos supremos, exhibición personal, y emite opiniones consultivas sobre tratados y leyes. Sus sentencias son vinculantes para el Estado y tienen carácter erga omnes cuando declaran inconstitucionalidad."
      },
      {
        id: 4,
        pregunta: "¿Cuáles son los requisitos constitucionales para ser Presidente de Guatemala?",
        opciones: {
          A: "Guatemalteco de origen, ciudadano en ejercicio, mayor de 40 años y ser del estado seglar.",
          B: "Guatemalteco por naturalización, mayor de 35 años y con título universitario.",
          C: "Solo ser ciudadano guatemalteco mayor de 18 años inscrito en el padrón electoral."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 185 de la CPRG exige para ser Presidente: ser guatemalteco de origen (no naturalizado), ciudadano en ejercicio, mayor de cuarenta años de edad y ser del estado seglar (no ministro de ningún culto religioso). Adicionalmente, no puede haber sido condenado por delito alguno y no puede ser pariente del Presidente o Vicepresidente en ejercicio hasta en cuarto grado de consanguinidad."
      },
      {
        id: 5,
        pregunta: "¿Cuántos diputados integran el Congreso de la República de Guatemala y cómo son elegidos?",
        opciones: {
          A: "El número varía según la población; hay diputados distritales (uno por cada 80,000 habitantes) y una lista nacional de 32 diputados, elegidos por voto directo.",
          B: "128 diputados fijos, elegidos exclusivamente por representación proporcional a nivel nacional.",
          C: "22 diputados, uno por cada departamento, más 10 designados por el Presidente de la República."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 157 de la CPRG establece que el Congreso se integra por diputados electos directamente por el pueblo. Hay dos categorías: diputados de lista nacional (32 en total) y diputados distritales (uno por cada 80,000 habitantes o fracción superior a 40,000 en cada distrito). El número de diputados distritales se actualiza con cada censo. El TSE determina la distribución de curules por partido mediante el sistema de representación proporcional."
      },
      {
        id: 6,
        pregunta: "¿Qué establece el artículo 12 de la CPRG sobre el derecho de defensa?",
        opciones: {
          A: "La defensa de la persona y sus derechos es inviolable; nadie puede ser condenado sin ser citado, oído y vencido en proceso legal ante juez competente.",
          B: "Solo los abogados colegiados activos pueden ejercer la defensa técnica en procesos penales.",
          C: "El Estado provee defensa pública gratuita únicamente en casos de pena de muerte."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 12 de la CPRG consagra el debido proceso: 'La defensa de la persona y sus derechos es inviolable. Nadie podrá ser condenado, ni privado de sus derechos, sin haber sido citado, oído y vencido en proceso legal ante juez o tribunal competente y preestablecido.' Este principio es el fundamento de toda la justicia procesal guatemalteca e impide la condena en ausencia sin las garantías correspondientes."
      },
      {
        id: 7,
        pregunta: "¿Qué son los derechos sociales reconocidos en la CPRG y en qué título se encuentran?",
        opciones: {
          A: "Derechos individuales como la vida y la libertad, regulados en el Título I de la CPRG.",
          B: "Los derechos relativos a la familia, cultura, comunidades indígenas, educación, salud y trabajo, regulados en el Título II, Capítulo II.",
          C: "Derechos exclusivos de los funcionarios públicos en el ejercicio de sus cargos."
        },
        respuestaCorrecta: "B",
        explicacion: "El Título II, Capítulo II de la CPRG regula los derechos sociales, que son garantías de carácter prestacional que el Estado debe satisfacer activamente. Incluyen: derechos de la familia (matrimonio, maternidad, adopción), cultura, comunidades indígenas, educación (gratuita y obligatoria), salud, seguridad social, asistencia social y trabajo. Se diferencian de los derechos individuales porque exigen acción positiva del Estado."
      },
      {
        id: 8,
        pregunta: "¿Qué dice el artículo 44 de la CPRG sobre los derechos inherentes a la persona?",
        opciones: {
          A: "Los derechos y garantías que otorga la Constitución no excluyen otros que, aunque no figuren expresamente, son inherentes a la persona humana.",
          B: "Solo tienen derechos constitucionales los ciudadanos guatemaltecos inscritos en el padrón electoral.",
          C: "Los derechos constitucionales pueden suspenderse por el Ejecutivo en estados de excepción sin límite temporal."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 44 de la CPRG establece la cláusula de apertura constitucional: los derechos enumerados en la Constitución no son los únicos; existen derechos inherentes al ser humano que la Constitución reconoce aunque no los mencione expresamente. También dispone que serán nulas las leyes que disminuyan, restrinjan o tergiversen los derechos que la Constitución garantiza. Esta norma se complementa con el artículo 46 sobre tratados de DDHH."
      },
      {
        id: 9,
        pregunta: "¿Cómo se reforma la Constitución Política de Guatemala?",
        opciones: {
          A: "Las reformas las puede decretar el Congreso con el voto de dos terceras partes, pero deben ratificarse mediante consulta popular (referéndum).",
          B: "Solo el Presidente de la República puede proponer reformas constitucionales al Congreso.",
          C: "Requiere la convocatoria obligatoria a una Asamblea Nacional Constituyente para cualquier reforma."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 280 de la CPRG establece el procedimiento de reforma: el Congreso puede reformar los artículos no pétreos con el voto afirmativo de dos terceras partes del total de diputados, debiendo ratificarse la reforma mediante consulta popular. Los artículos pétreos (artículos 140, 141, 165 inciso g, 186 y 187) no pueden reformarse por ningún procedimiento. La Asamblea Nacional Constituyente es otra vía posible para reformas totales."
      },
      {
        id: 10,
        pregunta: "¿Qué protege el artículo 6 de la CPRG respecto a la detención legal?",
        opciones: {
          A: "Ninguna persona puede ser detenida o presa, sino por causa de delito o falta, en virtud de orden librada por juez competente.",
          B: "Todo ciudadano puede ser detenido hasta por 72 horas sin necesidad de orden judicial.",
          C: "Solo la Policía Nacional Civil puede ejecutar detenciones; el Ejército no tiene esa facultad."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 6 de la CPRG regula la detención legal: requiere orden de juez competente, salvo flagrancia. Toda persona detenida debe ser notificada inmediatamente de la causa de su detención, tiene derecho a comunicarse con su abogado y familiares, y debe ser puesta a disposición del tribunal dentro de las seis horas siguientes. La detención arbitraria o incomunicación ilegal da lugar a exhibición personal (hábeas corpus)."
      },
      {
        id: 11,
        pregunta: "¿Cuál es la función del Tribunal Supremo Electoral (TSE) en el sistema constitucional guatemalteco?",
        opciones: {
          A: "Es el máximo organismo en materia electoral; es independiente y de ninguna manera responde a los organismos del Estado.",
          B: "Es un órgano del Congreso encargado de organizar únicamente las elecciones generales cada cuatro años.",
          C: "Depende del Organismo Ejecutivo y coordina el financiamiento de los partidos políticos."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 121 de la Ley Electoral y de Partidos Políticos (LEPP) y el artículo 223 de la CPRG establecen al TSE como organismo autónomo, de plena jurisdicción en materia electoral. Sus funciones incluyen: organizar y dirigir las elecciones, fiscalizar a los partidos políticos, conocer y resolver los recursos en materia electoral, y declarar los resultados oficiales. Sus resoluciones en materia electoral son inapelables."
      },
      {
        id: 12,
        pregunta: "¿Qué reconocen los artículos 66 al 70 de la CPRG respecto a las comunidades indígenas?",
        opciones: {
          A: "El Estado reconoce y protege las formas de vida, costumbres, tradiciones, organización social, idiomas y dialectos de los grupos indígenas guatemaltecos.",
          B: "Se establece que los idiomas indígenas son idiomas oficiales junto con el español en los departamentos con mayoría indígena.",
          C: "Se crea un régimen autónomo especial de gobierno para los territorios con población mayoritariamente indígena."
        },
        respuestaCorrecta: "A",
        explicacion: "Los artículos 66-70 de la CPRG forman el capítulo sobre comunidades indígenas. El Estado reconoce y protege: sus formas de vida, costumbres, tradiciones, organización social, uso del traje indígena, idiomas y dialectos. Garantiza además sus tierras y cooperativas agrícolas. Estos artículos son base del pluralismo jurídico guatemalteco y han sido desarrollados por el Convenio 169 de la OIT, ratificado por Guatemala."
      },
      {
        id: 13,
        pregunta: "¿Qué establece el artículo 175 de la CPRG sobre la jerarquía normativa?",
        opciones: {
          A: "Ninguna ley puede contrariar las disposiciones de la Constitución; las leyes que violen o tergiversen los mandatos constitucionales son nulas ipso jure.",
          B: "Las leyes ordinarias tienen el mismo rango que la Constitución si son aprobadas por mayoría calificada.",
          C: "Los tratados internacionales tienen rango superior a la Constitución en todas las materias."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 175 de la CPRG consagra el principio de supremacía constitucional: la Constitución es la norma de normas y ninguna ley puede contradecirla. Las normas que la contraríen son nulas de pleno derecho (ipso jure), sin necesidad de declaración expresa. Este principio se garantiza mediante el control de constitucionalidad a cargo de la CC y, en cada caso concreto, de cualquier tribunal del país."
      },
      {
        id: 14,
        pregunta: "¿Cuál es el período presidencial en Guatemala y puede el Presidente reelegirse?",
        opciones: {
          A: "Cuatro años; la reelección está absolutamente prohibida, incluso para familiares del Presidente.",
          B: "Seis años con posibilidad de una reelección no consecutiva.",
          C: "Cinco años con reelección permitida una sola vez de forma consecutiva."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 184 de la CPRG fija un período de cuatro años para el Presidente y Vicepresidente, sin posibilidad de reelección. El artículo 186 prohíbe postularse como candidato a quien haya ejercido la presidencia; esta prohibición se extiende a parientes del Presidente o Vicepresidente en ejercicio. La reelección o continuismo es considerada uno de los vicios políticos más graves que la Constitución busca evitar."
      },
      {
        id: 15,
        pregunta: "¿Cuál es la función del Ejército de Guatemala según la Constitución?",
        opciones: {
          A: "Defender la soberanía nacional, la integridad territorial y mantener la paz, el orden y el respeto a la Constitución.",
          B: "Apoyar al gobierno en funciones de policía y control del orden público como función principal.",
          C: "Estar bajo las órdenes directas del Congreso para ser usado como fuerza de seguridad interna."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 244 de la CPRG establece que el Ejército de Guatemala es una institución destinada a mantener la independencia, la soberanía y el honor de Guatemala, la integridad del territorio, la paz y la seguridad interior y exterior. Es único e indivisible, esencialmente profesional, apolítico, obediente y no deliberante. Su subordinación al poder civil es un principio constitucional fundamental post-1985."
      }
    ]
  },

  // ── FASE 3: Derecho Procesal ampliado ────────────────────────────────────────
  {
    id: "derecho-procesal-ampliado",
    tema: "Derecho Procesal — Prueba, Recursos y Procesos Especiales",
    descripcion: "Medios de prueba, juicio ejecutivo, proceso oral, recursos extraordinarios, nulidades y procedimiento abreviado penal en Guatemala.",
    icono: "ClipboardList",
    categoria: "Procesal",
    totalPreguntas: 15,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuáles son los medios de prueba admitidos en el proceso civil guatemalteco?",
        opciones: {
          A: "Declaración de las partes, declaración de testigos, dictamen de expertos, reconocimiento judicial, documentos, medios científicos y presunciones.",
          B: "Solo la prueba documental y la declaración testimonial, sin admitir medios tecnológicos.",
          C: "Únicamente prueba documental notarial y dictamen pericial de instituciones estatales."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 128 del CPCYM enumera los medios de prueba: declaración de las partes (confesión), declaración de testigos, dictamen de expertos, reconocimiento judicial, documentos, medios científicos de reproducción (audio, video, etc.) y presunciones. El juez valora la prueba conforme a las reglas de la sana crítica razonada, salvo que la ley señale una valoración tasada (como en la prueba documental pública)."
      },
      {
        id: 2,
        pregunta: "¿Qué es el juicio ejecutivo en el proceso civil guatemalteco?",
        opciones: {
          A: "El proceso de ejecución forzada que se promueve con base en un título ejecutivo que trae aparejada ejecución, para el cobro de obligaciones líquidas y exigibles.",
          B: "El procedimiento penal especial para juzgar delitos económicos de forma expedita.",
          C: "El juicio que se tramita exclusivamente ante los juzgados de ejecución del Organismo Judicial."
        },
        respuestaCorrecta: "A",
        explicacion: "El juicio ejecutivo (artículos 294-320 del CPCYM) permite ejecutar créditos documentados en títulos que la ley reconoce como ejecutivos: sentencias firmes, confesión judicial, documentos suscritos ante notario, cheques y pagarés, entre otros. El deudor puede oponerse únicamente mediante excepciones tasadas en la ley. Si no se opone o no prospera su excepción, se procede al remate de bienes."
      },
      {
        id: 3,
        pregunta: "¿Qué es el recurso de casación en el proceso civil guatemalteco?",
        opciones: {
          A: "El recurso extraordinario que se interpone ante la Corte Suprema de Justicia contra sentencias de segunda instancia, por motivos de fondo (infracción de ley) o de forma (vicios procesales graves).",
          B: "El recurso ordinario que sustituye a la apelación cuando el asunto supera cierto valor económico.",
          C: "El recurso que solo puede interponerse contra sentencias penales condenatorias de larga duración."
        },
        respuestaCorrecta: "A",
        explicacion: "La casación civil (artículos 619-632 del CPCYM) es un recurso extraordinario: solo procede por motivos taxativos. La casación de fondo ataca la correcta aplicación del derecho sustantivo a los hechos; la casación de forma impugna vicios procesales graves. Se interpone ante la Sala de Apelaciones dentro de 15 días y conoce la Cámara Civil de la CSJ. Su función es unificar la jurisprudencia nacional."
      },
      {
        id: 4,
        pregunta: "¿En qué consiste el procedimiento abreviado en el proceso penal guatemalteco?",
        opciones: {
          A: "Un proceso simplificado para delitos con pena máxima de 5 años o menos, donde el Ministerio Público puede solicitar al juez de primera instancia dictar sentencia sin debate oral.",
          B: "El proceso penal de flagrancia que se tramita en 24 horas ante el juez de turno.",
          C: "Un procedimiento especial exclusivo para menores de edad en conflicto con la ley penal."
        },
        respuestaCorrecta: "A",
        explicacion: "El procedimiento abreviado (artículos 464-466 del CPP) procede cuando: (1) el Ministerio Público estima suficiente la imposición de pena no mayor de 5 años de prisión, (2) el imputado admite el hecho atribuido y (3) el defensor lo consiente. El juez de primera instancia dicta sentencia condenatoria o absolutoria en audiencia, sin necesidad de debate oral ante tribunal de sentencia. Reduce significativamente la carga del sistema."
      },
      {
        id: 5,
        pregunta: "¿Qué son las medidas sustitutivas a la prisión preventiva en el proceso penal guatemalteco?",
        opciones: {
          A: "Alternativas menos gravosas que la prisión preventiva, como arresto domiciliar, caución económica, presentación periódica ante el tribunal, entre otras.",
          B: "Las sanciones que el juez impone al condenado en lugar de la pena de prisión.",
          C: "Los acuerdos de reparación entre víctima e imputado que evitan la pena privativa de libertad."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 264 del CPP establece medidas sustitutivas a la prisión preventiva para cuando esta sea desproporcionada. El juez puede imponer una o varias: arresto domiciliar (con o sin monitoreo electrónico), obligación de presentarse periódicamente, prohibición de salir del país, caución económica, prohibición de acercarse a la víctima, entre otras. El objetivo es garantizar la comparecencia del imputado sin privarlo innecesariamente de su libertad."
      },
      {
        id: 6,
        pregunta: "¿Qué es la nulidad procesal en el Derecho guatemalteco y cuándo procede?",
        opciones: {
          A: "La ineficacia de los actos procesales que no reúnen los requisitos legales esenciales o que se realizan con violación de derechos fundamentales de las partes.",
          B: "La anulación automática de toda sentencia cuando el proceso duró más de dos años.",
          C: "El recurso que solo puede interponer el Ministerio Público contra resoluciones que absuelven al sindicado."
        },
        respuestaCorrecta: "A",
        explicacion: "La nulidad procesal (artículo 613 del CPCYM y artículo 281 del CPP en materia penal) sanciona actos realizados sin cumplir formalidades esenciales o con violación al derecho de audiencia. Principio de convalidación: si la parte afectada no reclama oportunamente la nulidad, la convalida. El recurso de nulidad civil se interpone ante el tribunal que dictó la resolución dentro de los 2 días de su notificación."
      },
      {
        id: 7,
        pregunta: "¿Cuáles son los principios del proceso oral civil guatemalteco?",
        opciones: {
          A: "Oralidad, inmediación (el juez dirige y presencia directamente), concentración (en pocas audiencias) y publicidad.",
          B: "Escritura, mediación y secreto procesal para proteger a las partes.",
          C: "Solo oralidad y publicidad; la inmediación no es obligatoria en primera instancia."
        },
        respuestaCorrecta: "A",
        explicacion: "El juicio oral civil (artículos 199-228 del CPCYM) se rige por: oralidad (las actuaciones son verbales en audiencia), inmediación (el juez que recibe la prueba debe dictar la sentencia), concentración (la prueba y los alegatos se realizan en la misma audiencia) y publicidad (cualquier persona puede presenciar las audiencias). Aplica para: alimentos, rendición de cuentas, jactancia, interdictos y asuntos de menor cuantía."
      },
      {
        id: 8,
        pregunta: "¿Qué es la excepción de prescripción en el proceso civil guatemalteco?",
        opciones: {
          A: "Una excepción perentoria que extingue la acción cuando ha transcurrido el plazo legal sin ejercitarla, destruyendo el derecho mismo.",
          B: "Una excepción dilatoria que solo suspende temporalmente el proceso hasta que el demandante acredite que su acción no ha prescrito.",
          C: "Un recurso que puede interponer el demandado en segunda instancia para que se declare la caducidad del proceso."
        },
        respuestaCorrecta: "A",
        explicacion: "La prescripción extintiva (regulada en el Código Civil, artículos 1501-1515) es una excepción perentoria que, cuando prospera, destruye el derecho del actor por el transcurso del tiempo. El plazo general en materia civil es de diez años; existen plazos especiales menores. Se diferencia de la caducidad (que extingue el derecho de forma automática) y de las excepciones dilatorias (que solo demoran el proceso sin atacar el fondo)."
      },
      {
        id: 9,
        pregunta: "¿Qué es el proceso arbitral y en qué ley se regula en Guatemala?",
        opciones: {
          A: "Un mecanismo alternativo de solución de controversias donde las partes someten su disputa a árbitros; se regula en la Ley de Arbitraje, Decreto 67-95.",
          B: "Un proceso judicial especial para resolver conflictos entre el Estado y empresas extranjeras, únicamente.",
          C: "El procedimiento administrativo interno que resuelve conflictos entre instituciones del Gobierno Central."
        },
        respuestaCorrecta: "A",
        explicacion: "La Ley de Arbitraje (Decreto 67-95) regula el arbitraje nacional e internacional en Guatemala, basada en la Ley Modelo UNCITRAL. Las partes pueden someter sus controversias a árbitros en lugar de tribunales judiciales mediante cláusula o compromiso arbitral. El laudo arbitral tiene la misma fuerza ejecutiva que una sentencia judicial y puede reconocerse en el extranjero. El arbitraje está prohibido en asuntos penales, de familia y los no disponibles por las partes."
      },
      {
        id: 10,
        pregunta: "¿Qué es el juicio sumario en el proceso civil guatemalteco y para qué materias aplica?",
        opciones: {
          A: "Un proceso simplificado de trámite breve para: asuntos de arrendamiento, responsabilidad civil de funcionarios, jactancia y deudas líquidas y exigibles.",
          B: "El proceso exclusivo para asuntos penales de menor gravedad tramitados ante juzgados de paz.",
          C: "Un procedimiento solo para demandas contra el Estado guatemalteco."
        },
        respuestaCorrecta: "A",
        explicacion: "El juicio sumario (artículos 229-250 del CPCYM) es más rápido que el ordinario: el demandado tiene 5 días para contestar (vs. 9 en el ordinario). Aplica para: entrega de cosa mueble determinada, rescisión de contratos, deudas provenientes de documentos mercantiles, responsabilidad civil de funcionarios, asuntos de arrendamiento, y otros que la ley indique. Se distingue del ejecutivo en que sí hay etapa probatoria plena."
      },
      {
        id: 11,
        pregunta: "¿Cuál es el plazo para interponer el recurso de apelación en materia penal guatemalteca?",
        opciones: {
          A: "Tres días hábiles contados a partir de la última notificación.",
          B: "Diez días hábiles desde la notificación de la resolución.",
          C: "Quince días calendario a partir de la audiencia en que se dictó la resolución."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 404 del CPP establece que el recurso de apelación en materia penal debe interponerse dentro del plazo de tres días hábiles siguientes a la última notificación. A diferencia del proceso civil, en materia penal los plazos son más cortos para garantizar la celeridad del proceso y el pronto esclarecimiento de los hechos. El recurso se interpone ante el tribunal que dictó la resolución."
      },
      {
        id: 12,
        pregunta: "¿Qué es la conciliación en el proceso civil guatemalteco?",
        opciones: {
          A: "Un intento de acuerdo que el juez promueve entre las partes antes de entrar a conocer el fondo del asunto, cuyo resultado aprobado equivale a sentencia ejecutoriada.",
          B: "Un proceso alternativo que reemplaza al juicio ordinario en todos los asuntos civiles de menor cuantía.",
          C: "La mediación prejudicial obligatoria ante el RENAP antes de poder presentar cualquier demanda civil."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 97 del CPCYM obliga al juez a intentar la conciliación de las partes en la primera audiencia del juicio oral y puede proponerla en cualquier estado del proceso ordinario. Si las partes llegan a un acuerdo y el juez lo aprueba, el acta de conciliación tiene el valor de sentencia firme y es directamente ejecutable. La conciliación exitosa ahorra tiempo, costos y desgaste emocional a las partes."
      },
      {
        id: 13,
        pregunta: "¿Qué es el incidente en el proceso judicial guatemalteco?",
        opciones: {
          A: "Una cuestión accesoria que surge dentro del proceso principal y que tiene relación directa con él, resuelta por el mismo juez que conoce el asunto.",
          B: "Un proceso autónomo e independiente que no guarda relación con ningún juicio en trámite.",
          C: "El recurso que se interpone contra resoluciones interlocutorias en el proceso penal."
        },
        respuestaCorrecta: "A",
        explicacion: "El incidente (Ley del Organismo Judicial, artículos 135-141) es una cuestión accesoria planteada durante el proceso que el juez debe resolver antes de continuar o al dictar sentencia. Puede ser de previo y especial pronunciamiento (se resuelve antes de seguir adelante) o para resolver con la sentencia principal. Ejemplos: incidentes sobre nulidades, competencia, acumulación de procesos o intervención de terceros."
      },
      {
        id: 14,
        pregunta: "¿Qué rige el principio de contradicción en el proceso guatemalteco?",
        opciones: {
          A: "Que toda prueba o argumento presentado por una parte debe ser comunicado a la contraria, dándole oportunidad de controvertirlo antes de que el juez lo considere.",
          B: "Que el juez puede decretar prueba de oficio cuando considere que los alegatos de las partes son contradictorios entre sí.",
          C: "Que las partes deben presentar argumentos opuestos obligatoriamente para que el proceso sea válido."
        },
        respuestaCorrecta: "A",
        explicacion: "El principio de contradicción (audiencia bilateral) garantiza que ninguna prueba o acto procesal surta efecto sin que la parte contraria haya tenido la oportunidad de conocerlo y cuestionarlo. Es un corolario del derecho de defensa (artículo 12 CPRG): nadie puede ser condenado sin haber sido oído. Su violación puede generar nulidad del acto procesal y, en materia penal, configura violación al debido proceso."
      },
      {
        id: 15,
        pregunta: "¿Qué es el recurso de revisión en el proceso penal guatemalteco?",
        opciones: {
          A: "El recurso extraordinario que puede interponerse en cualquier tiempo para revisar una sentencia condenatoria firme, cuando aparecen hechos o pruebas nuevas que demuestran la inocencia del condenado.",
          B: "El recurso ordinario que sustituye a la apelación en los procesos penales de mayor gravedad.",
          C: "La facultad del MP de solicitar al juez que revise y corrija errores aritméticos en la sentencia condenatoria."
        },
        respuestaCorrecta: "A",
        explicacion: "El recurso de revisión (artículos 453-462 del CPP) es el único medio que permite cuestionar una sentencia penal firme. Procede cuando: aparecen nuevos hechos o pruebas que el condenado no pudo presentar, se prueba que la sentencia se basó en prueba falsa, se declara falso el testimonio que sirvió de base, o cuando procede aplicar retroactivamente una ley penal más favorable. Lo conoce la CSJ y puede resultar en absolución o nuevo juicio."
      }
    ]
  },

  // ── SESIÓN 1: INTRODUCCIÓN AL DERECHO LABORAL ────────────────────────────
  {
    id: "sesion-uno-derecho-laboral",
    tema: "Introducción al Derecho Laboral",
    descripcion: "Quiz sobre fundamentos del Código de Trabajo y Derecho Laboral en Guatemala.",
    icono: "Scale",
    categoria: "Laboral",
    totalPreguntas: 22,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Qué decreto corresponde al Código de Trabajo de Guatemala?",
        opciones: { A: "Decreto 1441", B: "Decreto 330", C: "Decreto 101" },
        respuestaCorrecta: "A",
        explicacion: "El Código de Trabajo vigente corresponde al Decreto 1441 del Congreso de la República."
      },
      {
        id: 2,
        pregunta: "¿Por qué se dice que el Código de Trabajo es el Decreto 330?",
        opciones: {
          A: "Porque fue creado por la Constitución",
          B: "Porque originalmente fue el Decreto 330 y luego reformado por el 1441",
          C: "Porque reemplazó totalmente el Decreto 1441"
        },
        respuestaCorrecta: "B",
        explicacion: "Inicialmente el Código de Trabajo fue el Decreto 330, posteriormente reformado íntegramente por el Decreto 1441."
      },
      {
        id: 3,
        pregunta: "¿Cuándo entró en vigencia el Código de Trabajo?",
        opciones: { A: "16 de agosto de 1961", B: "15 de septiembre de 1944", C: "1 de enero de 1970" },
        respuestaCorrecta: "A",
        explicacion: "El Código de Trabajo entró en vigencia el 16 de agosto de 1961."
      },
      {
        id: 4,
        pregunta: "¿Cuántos títulos tiene el Código de Trabajo?",
        opciones: { A: "12 títulos", B: "18 títulos", C: "25 títulos" },
        respuestaCorrecta: "B",
        explicacion: "El Código de Trabajo está compuesto por 18 títulos."
      },
      {
        id: 5,
        pregunta: "¿Cuántos artículos tiene el Código de Trabajo?",
        opciones: { A: "350 artículos", B: "431 artículos", C: "500 artículos" },
        respuestaCorrecta: "B",
        explicacion: "El Código de Trabajo contiene 431 artículos."
      },
      {
        id: 6,
        pregunta: "¿Qué temas contiene el Código de Trabajo?",
        opciones: {
          A: "Solo derecho individual del trabajo",
          B: "Derecho individual, colectivo y normas administrativas",
          C: "Únicamente normas procesales"
        },
        respuestaCorrecta: "B",
        explicacion: "El Código regula derecho individual, colectivo y normas administrativas laborales."
      },
      {
        id: 7,
        pregunta: "¿Qué es el trabajo?",
        opciones: {
          A: "Una obligación exclusiva del Estado",
          B: "Una actividad humana destinada a satisfacer necesidades",
          C: "Una actividad únicamente física"
        },
        respuestaCorrecta: "B",
        explicacion: "El trabajo es la actividad humana intelectual o material destinada a producir elementos para satisfacer necesidades."
      },
      {
        id: 8,
        pregunta: "¿Cuál de las siguientes es una clase de trabajo?",
        opciones: { A: "Trabajo autónomo", B: "Trabajo penal", C: "Trabajo judicial" },
        respuestaCorrecta: "A",
        explicacion: "Entre las clases de trabajo se encuentra el trabajo autónomo o por cuenta propia."
      },
      {
        id: 9,
        pregunta: "¿Qué es el Derecho Laboral?",
        opciones: {
          A: "La rama que regula únicamente sindicatos",
          B: "La rama del derecho público que regula relaciones entre patrono y trabajador",
          C: "La rama encargada exclusivamente del comercio"
        },
        respuestaCorrecta: "B",
        explicacion: "El Derecho Laboral regula las relaciones entre patrono y trabajador, así como sus derechos y obligaciones."
      },
      {
        id: 10,
        pregunta: "¿Cuántas teorías existen sobre la naturaleza jurídica del Derecho de Trabajo?",
        opciones: { A: "Dos", B: "Tres", C: "Cuatro" },
        respuestaCorrecta: "C",
        explicacion: "Existen cuatro teorías: privatista, publicista, dualista y social."
      },
      {
        id: 11,
        pregunta: "¿Cuáles son las etapas históricas del Derecho de Trabajo?",
        opciones: {
          A: "Industrialización y globalización",
          B: "Esclavitud, feudalismo, edad media y edad moderna",
          C: "Edad antigua y contemporánea únicamente"
        },
        respuestaCorrecta: "B",
        explicacion: "La historia del Derecho de Trabajo se divide en esclavitud, feudalismo, edad media y edad moderna."
      },
      {
        id: 12,
        pregunta: "¿Cuál fue una etapa importante en la historia del Derecho Laboral en Guatemala?",
        opciones: { A: "La revolución de 1944", B: "La independencia de México", C: "La guerra fría" },
        respuestaCorrecta: "A",
        explicacion: "La revolución de 1944 marcó importantes avances laborales y sociales en Guatemala."
      },
      {
        id: 13,
        pregunta: "¿Qué son los principios laborales?",
        opciones: {
          A: "Normas penales",
          B: "Bases para crear, interpretar y aplicar normas laborales",
          C: "Sanciones administrativas"
        },
        respuestaCorrecta: "B",
        explicacion: "Los principios laborales sirven de base para interpretar y aplicar el Derecho Laboral."
      },
      {
        id: 14,
        pregunta: "¿Cómo se clasifican los principios laborales?",
        opciones: {
          A: "Ideológicos, justicia social y doctrinarios",
          B: "Civiles y penales",
          C: "Internos y externos"
        },
        respuestaCorrecta: "A",
        explicacion: "Los principios laborales se clasifican en ideológicos, de justicia social y doctrinarios o legales."
      },
      {
        id: 15,
        pregunta: "¿Cuál es uno de los principios ideológicos del Derecho Laboral?",
        opciones: { A: "Principio conciliatorio", B: "Principio mercantil", C: "Principio registral" },
        respuestaCorrecta: "A",
        explicacion: "El principio conciliatorio busca armonizar intereses entre trabajadores y patronos."
      },
      {
        id: 16,
        pregunta: "¿Cuál es una característica del Derecho Laboral?",
        opciones: { A: "Imperatividad", B: "Neutralidad absoluta", C: "Formalismo excesivo" },
        respuestaCorrecta: "A",
        explicacion: "El Derecho Laboral es imperativo porque sus normas son de cumplimiento obligatorio."
      },
      {
        id: 17,
        pregunta: "¿Qué establece el principio de estabilidad laboral?",
        opciones: {
          A: "Que el trabajador puede ser despedido libremente",
          B: "Que debe procurarse permanencia y seguridad en el empleo",
          C: "Que el contrato debe renovarse cada mes"
        },
        respuestaCorrecta: "B",
        explicacion: "La estabilidad laboral busca garantizar permanencia y seguridad al trabajador."
      },
      {
        id: 18,
        pregunta: "¿Qué buscan los principios de justicia social?",
        opciones: {
          A: "Favorecer únicamente a empresas",
          B: "Proteger a las personas económicamente más débiles",
          C: "Eliminar contratos laborales"
        },
        respuestaCorrecta: "B",
        explicacion: "Los principios de justicia social buscan proteger y mejorar las condiciones de las personas vulnerables."
      },
      {
        id: 19,
        pregunta: "¿Cómo se interpreta el Derecho Laboral en Guatemala?",
        opciones: {
          A: "Solo mediante interpretación gramatical",
          B: "Con interpretación clásica y técnico-legal",
          C: "Únicamente por jurisprudencia"
        },
        respuestaCorrecta: "B",
        explicacion: "El Derecho Laboral se interpreta mediante interpretación clásica y técnico-legal."
      },
      {
        id: 20,
        pregunta: "¿Qué establece la interpretación clásica del Código de Trabajo?",
        opciones: {
          A: "Que debe prevalecer el interés económico empresarial",
          B: "Que debe tomarse en cuenta el interés de los trabajadores",
          C: "Que solo importa el texto literal"
        },
        respuestaCorrecta: "B",
        explicacion: "La interpretación clásica prioriza el interés de los trabajadores en armonía con la convivencia social."
      },
      {
        id: 21,
        pregunta: "¿Qué principio se aplica en caso de duda en interpretación laboral?",
        opciones: { A: "In dubio pro operario", B: "Cosa juzgada", C: "Legalidad penal" },
        respuestaCorrecta: "A",
        explicacion: "En caso de duda debe aplicarse la interpretación más favorable al trabajador."
      },
      {
        id: 22,
        pregunta: "¿Cuáles son las fuentes del Derecho de Trabajo?",
        opciones: {
          A: "Fuentes tradicionales y específicas",
          B: "Únicamente jurisprudencia",
          C: "Solo reglamentos administrativos"
        },
        respuestaCorrecta: "A",
        explicacion: "Las fuentes del Derecho de Trabajo se dividen en tradicionales y específicas."
      }
    ]
  },

  // ── SESIÓN 2: DERECHO INDIVIDUAL DE TRABAJO ──────────────────────────────
  {
    id: "sesion-dos-derecho-individual",
    tema: "Derecho Individual de Trabajo",
    descripcion: "Quiz sobre sujetos, principios y disposiciones generales del Derecho Individual de Trabajo.",
    icono: "Briefcase",
    categoria: "Laboral",
    totalPreguntas: 27,
    preguntas: [
      {
        id: 23,
        pregunta: "¿Qué es el Derecho Individual de Trabajo?",
        opciones: {
          A: "La rama que regula únicamente sindicatos",
          B: "La parte del Derecho Laboral que regula la relación entre patrono y trabajador",
          C: "La rama encargada del derecho mercantil"
        },
        respuestaCorrecta: "B",
        explicacion: "El Derecho Individual de Trabajo estudia las normas que regulan la relación entre patrono y trabajador derivada de un contrato de trabajo."
      },
      {
        id: 24,
        pregunta: "¿Quiénes son los sujetos del Derecho Individual de Trabajo?",
        opciones: {
          A: "Patrono y trabajador, además de representantes e intermediarios",
          B: "Solo el trabajador",
          C: "Únicamente el Estado"
        },
        respuestaCorrecta: "A",
        explicacion: "Los sujetos principales son patrono y trabajador; también existen sujetos secundarios como representantes e intermediarios."
      },
      {
        id: 25,
        pregunta: "¿Quién es el patrono o empleador?",
        opciones: {
          A: "Toda persona que presta servicios",
          B: "La persona individual o jurídica que utiliza servicios de trabajadores",
          C: "Únicamente una entidad pública"
        },
        respuestaCorrecta: "B",
        explicacion: "El patrono es quien utiliza los servicios de uno o más trabajadores mediante contrato o relación laboral."
      },
      {
        id: 26,
        pregunta: "¿Quién es el trabajador o empleado?",
        opciones: {
          A: "Toda persona individual que presta servicios a un patrono",
          B: "Solo quien trabaja para el Estado",
          C: "Toda empresa registrada"
        },
        respuestaCorrecta: "A",
        explicacion: "El trabajador es la persona individual que presta servicios materiales o intelectuales a un patrono."
      },
      {
        id: 27,
        pregunta: "¿Quiénes son representantes del patrono?",
        opciones: {
          A: "Los sindicatos",
          B: "Gerentes, directores y administradores",
          C: "Únicamente los abogados"
        },
        respuestaCorrecta: "B",
        explicacion: "Los representantes del patrono son quienes ejercen funciones de dirección o administración."
      },
      {
        id: 28,
        pregunta: "¿Los representantes del patrono deben ser trabajadores del patrono?",
        opciones: { A: "Sí, excepto los mandatarios", B: "Nunca", C: "Solo en empresas privadas" },
        respuestaCorrecta: "A",
        explicacion: "Los representantes normalmente están ligados mediante relación laboral, salvo los mandatarios."
      },
      {
        id: 29,
        pregunta: "¿Puede el representante del patrono ser testigo en juicio laboral?",
        opciones: {
          A: "Sí, libremente",
          B: "No, porque está sujeto a tacha",
          C: "Solo si el trabajador lo autoriza"
        },
        respuestaCorrecta: "B",
        explicacion: "El representante del patrono no puede ser testigo por ejercer representación patronal."
      },
      {
        id: 30,
        pregunta: "¿Puede el representante del patrono afiliarse a un sindicato de trabajadores?",
        opciones: { A: "Sí", B: "No", C: "Solo temporalmente" },
        respuestaCorrecta: "B",
        explicacion: "La ley prohíbe que representantes patronales se afilien a sindicatos de trabajadores."
      },
      {
        id: 31,
        pregunta: "¿Está sujeto a límites de jornada un representante del patrono?",
        opciones: { A: "Sí", B: "No", C: "Solo en jornada nocturna" },
        respuestaCorrecta: "B",
        explicacion: "Los representantes patronales no están sujetos a límites de jornada."
      },
      {
        id: 32,
        pregunta: "¿Quién es el intermediario?",
        opciones: {
          A: "Quien contrata trabajadores en beneficio de un patrono",
          B: "El inspector de trabajo",
          C: "El sindicato"
        },
        respuestaCorrecta: "A",
        explicacion: "El intermediario contrata trabajadores en nombre propio para beneficiar a un patrono."
      },
      {
        id: 33,
        pregunta: "¿Es responsable el patrono por el actuar del intermediario?",
        opciones: { A: "Sí, solidariamente", B: "Nunca", C: "Solo en casos penales" },
        respuestaCorrecta: "A",
        explicacion: "El patrono responde solidariamente frente a trabajadores por actos del intermediario."
      },
      {
        id: 34,
        pregunta: "¿Cuándo puede limitarse el derecho de trabajo?",
        opciones: {
          A: "Por decisión del patrono",
          B: "Mediante resolución de autoridad competente basada en ley",
          C: "Por decisión sindical"
        },
        respuestaCorrecta: "B",
        explicacion: "Solo puede limitarse mediante resolución legal por orden público o interés nacional."
      },
      {
        id: 35,
        pregunta: "¿Cuál es una excepción a los límites al trabajo?",
        opciones: { A: "Servicio militar obligatorio", B: "Vacaciones anuales", C: "Licencia sindical" },
        respuestaCorrecta: "A",
        explicacion: "El servicio militar constituye una excepción permitida por la ley."
      },
      {
        id: 36,
        pregunta: "¿Se pueden ceder contratos individuales de trabajo sin consentimiento?",
        opciones: { A: "Sí", B: "No", C: "Solo verbalmente" },
        respuestaCorrecta: "B",
        explicacion: "No pueden cederse contratos sin consentimiento claro y expreso del trabajador."
      },
      {
        id: 37,
        pregunta: "¿Cuál es la excepción a la prohibición de ceder contratos?",
        opciones: { A: "La venta de herramientas", B: "La enajenación de la empresa", C: "La suspensión laboral" },
        respuestaCorrecta: "B",
        explicacion: "La enajenación de la empresa constituye excepción legal."
      },
      {
        id: 38,
        pregunta: "¿Qué actividades están prohibidas en zonas de trabajo?",
        opciones: {
          A: "Venta de bebidas embriagantes y juegos de azar",
          B: "Capacitaciones laborales",
          C: "Reuniones sindicales"
        },
        respuestaCorrecta: "A",
        explicacion: "La ley prohíbe bebidas embriagantes, juegos de azar y prostitución cerca de centros de trabajo."
      },
      {
        id: 39,
        pregunta: "¿A qué distancia aplican dichas prohibiciones?",
        opciones: { A: "1 km", B: "3 km", C: "10 km" },
        respuestaCorrecta: "B",
        explicacion: "Las prohibiciones aplican en un radio de 3 km alrededor del centro de trabajo."
      },
      {
        id: 40,
        pregunta: "¿Puede un patrono dar instrucciones en idioma extranjero?",
        opciones: { A: "Sí, libremente", B: "No", C: "Solo en inglés" },
        respuestaCorrecta: "B",
        explicacion: "La ley prohíbe instrucciones laborales en idiomas extranjeros."
      },
      {
        id: 41,
        pregunta: "¿Se deben adherir timbres forenses en escritos laborales?",
        opciones: { A: "Sí", B: "No", C: "Solo en apelaciones" },
        respuestaCorrecta: "B",
        explicacion: "Los escritos laborales están exentos de timbres forenses."
      },
      {
        id: 42,
        pregunta: "¿Qué significa la irrenunciabilidad de derechos?",
        opciones: {
          A: "Que el trabajador puede vender sus derechos",
          B: "Que son nulos los actos que disminuyan derechos laborales",
          C: "Que los contratos no pueden modificarse"
        },
        respuestaCorrecta: "B",
        explicacion: "Los derechos laborales son irrenunciables y no pueden disminuirse legalmente."
      },
      {
        id: 43,
        pregunta: "¿Es válido pactar trabajar sin aguinaldo?",
        opciones: { A: "Sí", B: "No", C: "Solo temporalmente" },
        respuestaCorrecta: "B",
        explicacion: "El aguinaldo es un derecho irrenunciable del trabajador."
      },
      {
        id: 44,
        pregunta: "¿Qué porcentaje máximo de trabajadores extranjeros puede contratar un patrono?",
        opciones: { A: "10%", B: "25%", C: "50%" },
        respuestaCorrecta: "A",
        explicacion: "La ley permite un máximo del 10% de trabajadores extranjeros."
      },
      {
        id: 45,
        pregunta: "¿Pueden modificarse los porcentajes de contratación de extranjeros?",
        opciones: {
          A: "No",
          B: "Sí, por razones de protección económica nacional",
          C: "Solo por decisión empresarial"
        },
        respuestaCorrecta: "B",
        explicacion: "El Ejecutivo puede modificar porcentajes por razones económicas nacionales."
      },
      {
        id: 46,
        pregunta: "¿Cuál es el ámbito de aplicación del Código de Trabajo?",
        opciones: {
          A: "Solo empresas privadas",
          B: "Todas las empresas y trabajadores en Guatemala",
          C: "Únicamente instituciones estatales"
        },
        respuestaCorrecta: "B",
        explicacion: "El Código aplica a todas las empresas y trabajadores dentro del territorio nacional."
      },
      {
        id: 47,
        pregunta: "¿Cómo se resuelven los casos no previstos por el Código de Trabajo?",
        opciones: {
          A: "Aplicando principios del Derecho de Trabajo y derecho común",
          B: "Únicamente jurisprudencia",
          C: "Solo por reglamentos"
        },
        respuestaCorrecta: "A",
        explicacion: "Los vacíos legales se resuelven con principios laborales, equidad y derecho común."
      },
      {
        id: 48,
        pregunta: "¿Qué leyes predominan en caso de conflicto normativo?",
        opciones: { A: "Las civiles", B: "Las mercantiles", C: "Las laborales y de previsión social" },
        respuestaCorrecta: "C",
        explicacion: "Las leyes laborales predominan frente a otras normas en caso de conflicto."
      },
      {
        id: 49,
        pregunta: "¿Cómo deben interpretarse las leyes laborales?",
        opciones: {
          A: "En favor de los trabajadores y convivencia social",
          B: "Solo de forma literal",
          C: "A favor del patrono"
        },
        respuestaCorrecta: "A",
        explicacion: "La interpretación laboral debe favorecer al trabajador en armonía con la convivencia social."
      }
    ]
  },

  // ── SESIÓN 3-4: CONTRATO INDIVIDUAL Y OBLIGACIONES LABORALES ─────────────
  {
    id: "sesion-tres-cuatro-contrato-obligaciones",
    tema: "Contrato Individual de Trabajo y Obligaciones Laborales",
    descripcion: "Quiz sobre contratos de trabajo, relación laboral, modalidades y obligaciones de patronos y trabajadores.",
    icono: "FileText",
    categoria: "Laboral",
    totalPreguntas: 50,
    preguntas: [
      {
        id: 50,
        pregunta: "¿Qué es doctrinariamente el contrato individual de trabajo?",
        opciones: {
          A: "Un acuerdo entre trabajador y patrono con prestación de servicios y remuneración",
          B: "Una resolución judicial",
          C: "Un contrato mercantil obligatorio"
        },
        respuestaCorrecta: "A",
        explicacion: "Doctrinariamente es un acuerdo de voluntades entre trabajador y patrono."
      },
      {
        id: 51,
        pregunta: "¿Qué establece la definición legal del contrato individual de trabajo?",
        opciones: {
          A: "Un vínculo económico-jurídico con prestación personal y remuneración",
          B: "Una obligación exclusivamente civil",
          C: "Una asociación comercial"
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 18 CT regula el vínculo económico-jurídico entre trabajador y patrono."
      },
      {
        id: 52,
        pregunta: "¿Cuál es una característica del contrato individual de trabajo?",
        opciones: { A: "Consensual", B: "Gratuito", C: "Unilateral" },
        respuestaCorrecta: "A",
        explicacion: "El contrato laboral es consensual, bilateral, oneroso y de tracto sucesivo."
      },
      {
        id: 53,
        pregunta: "¿Cuáles son los elementos del contrato de trabajo?",
        opciones: {
          A: "Personales, reales y formales",
          B: "Civiles y penales",
          C: "Administrativos únicamente"
        },
        respuestaCorrecta: "A",
        explicacion: "Los elementos son subjetivos, materiales y formales."
      },
      {
        id: 54,
        pregunta: "¿Cuál es un principio del contrato individual de trabajo?",
        opciones: { A: "Razonabilidad", B: "Legalidad penal", C: "Retroactividad" },
        respuestaCorrecta: "A",
        explicacion: "Entre los principios destacan razonabilidad, exclusividad y ausencia de riesgo."
      },
      {
        id: 55,
        pregunta: "¿Cuál es un elemento especial del contrato de trabajo?",
        opciones: { A: "Subordinación", B: "Herencia", C: "Copropiedad" },
        respuestaCorrecta: "A",
        explicacion: "La subordinación implica obediencia a instrucciones del patrono."
      },
      {
        id: 56,
        pregunta: "¿Cómo pueden clasificarse los contratos de trabajo según su duración?",
        opciones: {
          A: "Indefinidos, a plazo fijo y por obra determinada",
          B: "Mercantiles y civiles",
          C: "Nacionales e internacionales"
        },
        respuestaCorrecta: "A",
        explicacion: "Las modalidades por duración son indefinido, plazo fijo y obra determinada."
      },
      {
        id: 57,
        pregunta: "¿Cuál es la naturaleza jurídica del contrato individual de trabajo?",
        opciones: {
          A: "Contrato autónomo",
          B: "Contrato penal",
          C: "Contrato societario obligatorio"
        },
        respuestaCorrecta: "A",
        explicacion: "El contrato laboral tiene naturaleza autónoma con características propias."
      },
      {
        id: 58,
        pregunta: "¿Qué es la relación laboral?",
        opciones: {
          A: "El vínculo surgido desde que inicia la prestación del servicio",
          B: "Una simple promesa verbal",
          C: "Un trámite administrativo"
        },
        respuestaCorrecta: "A",
        explicacion: "La relación laboral nace cuando el trabajador inicia servicios."
      },
      {
        id: 59,
        pregunta: "¿Cuál es una característica de la relación laboral?",
        opciones: { A: "Dependencia continuada", B: "Independencia total", C: "Ausencia de pago" },
        respuestaCorrecta: "A",
        explicacion: "La dependencia continuada es esencial en la relación laboral."
      },
      {
        id: 60,
        pregunta: "¿Qué significa vínculo económico-jurídico?",
        opciones: {
          A: "Que existen beneficios económicos y obligaciones legales",
          B: "Que solo existe relación económica",
          C: "Que no hay obligaciones"
        },
        respuestaCorrecta: "A",
        explicacion: "Existe beneficio económico y derechos y obligaciones legales."
      },
      {
        id: 61,
        pregunta: "¿Qué implica la prestación personal del servicio?",
        opciones: {
          A: "Que el trabajador debe prestar personalmente el servicio",
          B: "Que cualquier persona puede sustituirlo",
          C: "Que solo aplica a empresas"
        },
        respuestaCorrecta: "A",
        explicacion: "El servicio debe ejecutarse personalmente por el trabajador."
      },
      {
        id: 62,
        pregunta: "¿Qué implica la dependencia continuada?",
        opciones: {
          A: "Que el patrono debe proporcionar medios necesarios para trabajar",
          B: "Que el trabajador es independiente",
          C: "Que no existe subordinación"
        },
        respuestaCorrecta: "A",
        explicacion: "La dependencia supone apoyo y recursos proporcionados por el patrono."
      },
      {
        id: 63,
        pregunta: "¿Qué implica la dirección en la relación laboral?",
        opciones: {
          A: "Obedecer órdenes del patrono o representantes",
          B: "Independencia absoluta",
          C: "Control judicial"
        },
        respuestaCorrecta: "A",
        explicacion: "La dirección implica acatar instrucciones patronales."
      },
      {
        id: 64,
        pregunta: "¿Cómo puede ser la dirección?",
        opciones: { A: "Inmediata o delegada", B: "Pública o privada", C: "Civil o penal" },
        respuestaCorrecta: "A",
        explicacion: "La dirección puede ejercerse directamente o mediante representantes."
      },
      {
        id: 65,
        pregunta: "¿Qué significa retribución de cualquier clase o forma?",
        opciones: {
          A: "Pago de salario por servicios prestados",
          B: "Trabajo gratuito",
          C: "Pago únicamente en especie"
        },
        respuestaCorrecta: "A",
        explicacion: "El trabajador debe recibir remuneración por su trabajo."
      },
      {
        id: 66,
        pregunta: "¿La exclusividad es esencial en todo contrato laboral?",
        opciones: {
          A: "No, salvo pacto expreso o incompatibilidad",
          B: "Sí, siempre",
          C: "Solo en el sector público"
        },
        respuestaCorrecta: "A",
        explicacion: "La exclusividad solo aplica cuando exista pacto expreso."
      },
      {
        id: 67,
        pregunta: "¿Cuál es la diferencia entre contrato y relación laboral?",
        opciones: {
          A: "El contrato es acuerdo y la relación es la ejecución del trabajo",
          B: "Son exactamente lo mismo",
          C: "La relación laboral solo existe por escrito"
        },
        respuestaCorrecta: "A",
        explicacion: "El contrato regula condiciones y la relación es la prestación efectiva."
      },
      {
        id: 68,
        pregunta: "¿Cuándo se perfecciona el contrato individual de trabajo?",
        opciones: {
          A: "Cuando inicia la relación laboral",
          B: "Cuando se firma únicamente",
          C: "Cuando lo aprueba un juez"
        },
        respuestaCorrecta: "A",
        explicacion: "El contrato se perfecciona al iniciar la prestación de servicios."
      },
      {
        id: 69,
        pregunta: "¿Qué es simulación del contrato de trabajo?",
        opciones: {
          A: "Ocultar una verdadera relación laboral bajo otro contrato",
          B: "Modificar salarios",
          C: "Firmar contratos colectivos"
        },
        respuestaCorrecta: "A",
        explicacion: "La simulación busca evitar obligaciones laborales."
      },
      {
        id: 70,
        pregunta: "¿Cómo se identifica una simulación laboral?",
        opciones: {
          A: "Cuando existen elementos propios de relación laboral",
          B: "Cuando hay vacaciones",
          C: "Cuando existe sindicato"
        },
        respuestaCorrecta: "A",
        explicacion: "La simulación se detecta verificando subordinación y remuneración."
      },
      {
        id: 71,
        pregunta: "¿Qué prestación puede reclamarse en caso de simulación?",
        opciones: {
          A: "Indemnización y prestaciones laborales",
          B: "Solo vacaciones",
          C: "Únicamente salario"
        },
        respuestaCorrecta: "A",
        explicacion: "Pueden reclamarse todas las prestaciones omitidas."
      },
      {
        id: 72,
        pregunta: "¿A qué obliga el contrato de trabajo?",
        opciones: {
          A: "Al cumplimiento de obligaciones legales y contractuales",
          B: "Solo al pago salarial",
          C: "Únicamente a obedecer órdenes"
        },
        respuestaCorrecta: "A",
        explicacion: "El contrato obliga conforme a ley, buena fe y costumbre."
      },
      {
        id: 73,
        pregunta: "¿Pueden alterarse permanentemente las condiciones laborales?",
        opciones: {
          A: "Solo por acuerdo expreso o autorización legal",
          B: "Sí, unilateralmente",
          C: "Nunca"
        },
        respuestaCorrecta: "A",
        explicacion: "Las condiciones solo pueden modificarse conforme a ley."
      },
      {
        id: 74,
        pregunta: "¿Cuál es un elemento de la prestación del servicio?",
        opciones: { A: "Tiempo de realización", B: "Nacionalidad", C: "Religión" },
        respuestaCorrecta: "A",
        explicacion: "El tiempo y lugar son elementos esenciales del servicio."
      },
      {
        id: 75,
        pregunta: "¿Qué trabajo debe realizarse si no se especifica en el contrato?",
        opciones: {
          A: "El compatible con capacidades del trabajador",
          B: "Cualquier trabajo",
          C: "Solo trabajo físico"
        },
        respuestaCorrecta: "A",
        explicacion: "Debe ser compatible con aptitudes y condición física."
      },
      {
        id: 76,
        pregunta: "¿Qué es sustitución patronal?",
        opciones: {
          A: "Cambio de patrono sin afectar derechos laborales",
          B: "Despido colectivo",
          C: "Cambio de trabajador"
        },
        respuestaCorrecta: "A",
        explicacion: "La sustitución patronal mantiene intactos los derechos laborales."
      },
      {
        id: 77,
        pregunta: "¿Cuáles son las modalidades del contrato laboral?",
        opciones: {
          A: "Indefinido, plazo fijo y obra determinada",
          B: "Mercantil y civil",
          C: "Público y privado"
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 25 CT regula las modalidades laborales."
      },
      {
        id: 78,
        pregunta: "¿Cuál es la modalidad general del contrato laboral?",
        opciones: { A: "Tiempo indefinido", B: "Plazo fijo", C: "Obra determinada" },
        respuestaCorrecta: "A",
        explicacion: "La regla general es el contrato por tiempo indefinido."
      },
      {
        id: 79,
        pregunta: "¿Cuándo puede celebrarse un contrato a plazo fijo?",
        opciones: {
          A: "Cuando existe fecha determinada de finalización",
          B: "Siempre",
          C: "Solo verbalmente"
        },
        respuestaCorrecta: "A",
        explicacion: "El plazo fijo requiere fecha o circunstancia determinada."
      },
      {
        id: 80,
        pregunta: "¿Por qué son excepcionales los contratos a plazo fijo?",
        opciones: {
          A: "Porque solo aplican a trabajos temporales o accidentales",
          B: "Porque son ilegales",
          C: "Porque no requieren salario"
        },
        respuestaCorrecta: "A",
        explicacion: "Son excepcionales debido a la naturaleza temporal del trabajo."
      },
      {
        id: 81,
        pregunta: "¿Cómo pueden celebrarse los contratos individuales de trabajo?",
        opciones: { A: "Verbales o escritos", B: "Solo escritos", C: "Únicamente electrónicos" },
        respuestaCorrecta: "A",
        explicacion: "La ley permite contratos verbales y escritos."
      },
      {
        id: 82,
        pregunta: "¿Cómo pueden clasificarse según cantidad de relaciones?",
        opciones: {
          A: "Individual y colectivo",
          B: "Temporal y permanente",
          C: "Mercantil y laboral"
        },
        respuestaCorrecta: "A",
        explicacion: "Existen contratos individuales y colectivos."
      },
      {
        id: 83,
        pregunta: "¿Cuándo puede ser verbal un contrato laboral?",
        opciones: {
          A: "En labores agrícolas, domésticas o temporales",
          B: "Siempre",
          C: "Nunca"
        },
        respuestaCorrecta: "A",
        explicacion: "La ley permite verbalidad en ciertos trabajos específicos."
      },
      {
        id: 84,
        pregunta: "¿Qué obligación tiene el patrono en contratos verbales?",
        opciones: {
          A: "Entregar constancia laboral",
          B: "Registrar ante juez",
          C: "Pagar doble salario"
        },
        respuestaCorrecta: "A",
        explicacion: "Debe proporcionar constancia con datos esenciales."
      },
      {
        id: 85,
        pregunta: "¿Cómo debe extenderse el contrato escrito?",
        opciones: { A: "En tres ejemplares", B: "En un ejemplar", C: "Solo digital" },
        respuestaCorrecta: "A",
        explicacion: "Debe realizarse en tres ejemplares."
      },
      {
        id: 86,
        pregunta: "¿Cómo se presentan actualmente los contratos laborales?",
        opciones: { A: "Electrónicamente", B: "Solo físicamente", C: "Verbalmente" },
        respuestaCorrecta: "A",
        explicacion: "Actualmente se presentan mediante plataforma electrónica."
      },
      {
        id: 87,
        pregunta: "¿Qué requisito debe contener el contrato escrito?",
        opciones: { A: "Salario y jornada", B: "Partido político", C: "Religión" },
        respuestaCorrecta: "A",
        explicacion: "El contrato debe indicar salario, jornada y demás condiciones."
      },
      {
        id: 88,
        pregunta: "¿Cómo se prueba el contrato laboral?",
        opciones: {
          A: "Con documento escrito o medios generales de prueba",
          B: "Solo con testigos",
          C: "Solo con peritaje"
        },
        respuestaCorrecta: "A",
        explicacion: "Los contratos escritos se prueban documentalmente y los verbales por medios generales."
      },
      {
        id: 89,
        pregunta: "¿Quiénes tienen capacidad para celebrar contratos de trabajo?",
        opciones: {
          A: "Mayores de edad y menores autorizados",
          B: "Solo empresarios",
          C: "Únicamente mayores de 21 años"
        },
        respuestaCorrecta: "A",
        explicacion: "La ley regula capacidad laboral para mayores y ciertos menores."
      },
      {
        id: 90,
        pregunta: "¿Puede trabajar legalmente un menor de 14 años?",
        opciones: { A: "No", B: "Sí, libremente", C: "Solo en vacaciones" },
        respuestaCorrecta: "A",
        explicacion: "La edad mínima laboral actualmente es 15 años."
      },
      {
        id: 91,
        pregunta: "¿Existen excepciones para trabajo de menores de 14 años?",
        opciones: { A: "No", B: "Sí, sin restricciones", C: "Solo nocturno" },
        respuestaCorrecta: "A",
        explicacion: "No puede permitirse trabajo a menores de 15 años."
      },
      {
        id: 92,
        pregunta: "¿La interdicción del patrono invalida contratos vigentes?",
        opciones: { A: "No", B: "Sí", C: "Solo parcialmente" },
        respuestaCorrecta: "A",
        explicacion: "La interdicción no invalida contratos celebrados previamente."
      },
      {
        id: 93,
        pregunta: "¿Qué requisito debe cumplir un reclutador para trabajo en extranjero?",
        opciones: {
          A: "Garantizar repatriación de trabajadores",
          B: "Tener oficina internacional",
          C: "Pagar impuestos especiales"
        },
        respuestaCorrecta: "A",
        explicacion: "Debe garantizar gastos y protección de trabajadores."
      },
      {
        id: 94,
        pregunta: "¿Cuándo no puede autorizarse trabajo en extranjero?",
        opciones: {
          A: "Si son menores de edad",
          B: "Si son profesionales",
          C: "Si tienen contrato escrito"
        },
        respuestaCorrecta: "A",
        explicacion: "No puede autorizarse trabajo de menores en el extranjero."
      },
      {
        id: 95,
        pregunta: "¿Los profesionales necesitan autorización para trabajar en el extranjero?",
        opciones: { A: "No", B: "Sí", C: "Solo parcialmente" },
        respuestaCorrecta: "A",
        explicacion: "Profesionales titulados están exceptuados."
      },
      {
        id: 96,
        pregunta: "¿Qué ocurre con cláusulas que reduzcan derechos laborales?",
        opciones: {
          A: "Son nulas ipso jure",
          B: "Son válidas",
          C: "Dependen del patrono"
        },
        respuestaCorrecta: "A",
        explicacion: "Las cláusulas que reduzcan derechos son nulas."
      },
      {
        id: 97,
        pregunta: "¿Cuál es una obligación del patrono?",
        opciones: {
          A: "Proporcionar herramientas necesarias",
          B: "Retener salarios",
          C: "Negar inspecciones"
        },
        respuestaCorrecta: "A",
        explicacion: "El patrono debe brindar herramientas y condiciones necesarias."
      },
      {
        id: 98,
        pregunta: "¿Qué puede solicitarse si un trabajador no desocupa vivienda laboral?",
        opciones: {
          A: "Lanzamiento judicial",
          B: "Embargo automático",
          C: "Despido inmediato"
        },
        respuestaCorrecta: "A",
        explicacion: "Procede el lanzamiento mediante incidente laboral."
      },
      {
        id: 99,
        pregunta: "¿Cuál es una prohibición de los trabajadores?",
        opciones: {
          A: "Trabajar en estado de embriaguez",
          B: "Solicitar vacaciones",
          C: "Afiliarse a sindicato"
        },
        respuestaCorrecta: "A",
        explicacion: "Está prohibido trabajar bajo efectos de alcohol o drogas."
      }
    ]
  },

  // ── FASE 1: Derecho Penal ampliado (Decreto 17-73) ──────────────────────────
  {
    id: "derecho-penal-delitos",
    tema: "Derecho Penal — Delitos y Penas",
    descripcion: "Tipos de delitos, penas, circunstancias modificativas y causas de justificación del Código Penal guatemalteco.",
    icono: "Shield",
    categoria: "Penal",
    totalPreguntas: 25,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cuáles son las penas principales establecidas en el Código Penal guatemalteco?",
        opciones: {
          A: "Muerte, prisión, arresto y multa.",
          B: "Prisión, arresto, trabajo comunitario y multa.",
          C: "Solo privación de libertad y multa económica."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 41 del Código Penal establece como penas principales: la pena de muerte, la prisión, el arresto y la multa. La pena de muerte solo se aplica en los casos expresamente contemplados por la ley y con las garantías del debido proceso."
      },
      {
        id: 2,
        pregunta: "¿Qué es el dolo en el Derecho Penal guatemalteco?",
        opciones: {
          A: "La voluntad consciente de ejecutar u omitir el hecho descrito en la ley penal, con conocimiento de que es ilícito.",
          B: "Cualquier resultado dañoso causado por el sujeto, independientemente de su intención.",
          C: "La negligencia grave que provoca un resultado no querido pero previsible."
        },
        respuestaCorrecta: "A",
        explicacion: "El dolo implica dos elementos: el cognitivo (conocer que el hecho es ilícito) y el volitivo (querer realizarlo). El artículo 11 del Código Penal establece que el delito es doloso cuando el resultado ha sido querido o cuando el agente se representó como posible y actuó aceptando esa posibilidad."
      },
      {
        id: 3,
        pregunta: "¿Qué es la culpa en materia penal?",
        opciones: {
          A: "La producción de un resultado dañoso por imprudencia, negligencia, impericia o inobservancia de reglamentos.",
          B: "La intención deliberada de causar daño a otra persona.",
          C: "La responsabilidad objetiva del empleador por actos de sus trabajadores."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 12 del Código Penal define el delito culposo como aquel en que el resultado, aunque no fue querido, se produce por imprudencia, negligencia o impericia. La culpa es menos grave que el dolo y generalmente conlleva penas menores."
      },
      {
        id: 4,
        pregunta: "¿Qué son las circunstancias agravantes según el Código Penal de Guatemala?",
        opciones: {
          A: "Condiciones o situaciones que aumentan la gravedad del delito y por ende pueden incrementar la pena dentro del mínimo y máximo legal.",
          B: "Hechos posteriores al delito que permiten reducir automáticamente la pena impuesta.",
          C: "Causas que eliminan la responsabilidad penal del sujeto activo."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 27 del Código Penal enumera las circunstancias agravantes, entre ellas: alevosía, premeditación, uso de veneno, ejecutar el delito por precio o recompensa, empleo de medios calamitosos, reincidencia, entre otras. El juez las pondera al graduar la pena dentro del rango legal."
      },
      {
        id: 5,
        pregunta: "¿Cuál es la pena mínima de prisión en Guatemala para que un delito sea considerado grave?",
        opciones: {
          A: "Cinco años de prisión.",
          B: "Tres años de prisión.",
          C: "Diez años de prisión."
        },
        respuestaCorrecta: "A",
        explicacion: "Conforme al Código Procesal Penal y la jurisprudencia guatemalteca, los delitos graves son aquellos cuya pena máxima supera los cinco años de prisión. Esta distinción es relevante para determinar la aplicación de medidas de coerción como la prisión preventiva."
      },
      {
        id: 6,
        pregunta: "¿Qué es la legítima defensa como causa de justificación?",
        opciones: {
          A: "La repulsa de una agresión ilegítima, actual o inminente, no provocada por el defensor y proporcional al peligro.",
          B: "El derecho a atacar preventivamente a quien se supone planea un delito.",
          C: "La facultad del Estado de usar la fuerza para proteger a sus ciudadanos."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 24 del Código Penal establece tres requisitos para la legítima defensa: (1) agresión ilegítima, (2) necesidad racional del medio empleado para impedirla o repelerla, y (3) falta de provocación suficiente por parte del defensor. Quien actúa en legítima defensa no incurre en responsabilidad penal."
      },
      {
        id: 7,
        pregunta: "¿Qué establece el estado de necesidad como causa de justificación?",
        opciones: {
          A: "Que quien causa un daño para evitar uno mayor e inminente, al que ha sido extraño, no incurre en responsabilidad penal.",
          B: "Que la necesidad económica extrema justifica cualquier delito patrimonial.",
          C: "Que los funcionarios públicos pueden violar derechos fundamentales en situaciones de emergencia nacional."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 24 inc. 2 del Código Penal regula el estado de necesidad: el bien sacrificado debe ser de menor valor que el bien salvado, el peligro debe ser real e inminente, y el agente no debe haber provocado voluntariamente la situación de peligro."
      },
      {
        id: 8,
        pregunta: "¿Cuántos años de prisión contempla el delito de homicidio simple en Guatemala?",
        opciones: {
          A: "De 15 a 40 años de prisión.",
          B: "De 6 a 15 años de prisión.",
          C: "De 8 a 25 años de prisión."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 123 del Código Penal establece que el homicidio simple (matar a otro sin circunstancias calificativas) se sanciona con prisión de 15 a 40 años. Si concurren circunstancias agravantes específicas, puede constituir asesinato, con pena de 25 a 50 años o incluso pena de muerte."
      },
      {
        id: 9,
        pregunta: "¿Qué delito comete quien sustrae cosa mueble ajena usando violencia o amenazas sobre las personas?",
        opciones: {
          A: "Robo.",
          B: "Hurto.",
          C: "Estafa."
        },
        respuestaCorrecta: "A",
        explicacion: "El robo (artículo 251 del Código Penal) se diferencia del hurto (artículo 246) en que en el robo se usa violencia o intimidación sobre las personas. El hurto es la sustracción sin violencia. La pena del robo va de 3 a 12 años de prisión, incrementándose si hay agravantes."
      },
      {
        id: 10,
        pregunta: "¿Qué es el peculado en el Código Penal guatemalteco?",
        opciones: {
          A: "La sustracción, apropiación o distracción de caudales o efectos públicos por un funcionario que los tiene bajo su custodia.",
          B: "El cohecho o soborno de un funcionario público por un particular.",
          C: "El tráfico de influencias para obtener resoluciones favorables del Estado."
        },
        respuestaCorrecta: "A",
        explicacion: "El peculado está tipificado en el artículo 445 del Código Penal. Es un delito contra la administración pública cometido exclusivamente por funcionarios o empleados públicos que se apropian de fondos estatales que administran. Se sanciona con prisión de 3 a 10 años más inhabilitación."
      },
      {
        id: 11,
        pregunta: "¿Qué es el cohecho pasivo?",
        opciones: {
          A: "La aceptación de dádivas o promesas por parte de un funcionario público para realizar u omitir un acto propio de su cargo.",
          B: "El ofrecimiento de dinero o regalos a un funcionario por parte de un particular.",
          C: "La malversación de fondos públicos por omisión de un servidor del Estado."
        },
        respuestaCorrecta: "A",
        explicacion: "El cohecho pasivo (artículo 439 del Código Penal) lo comete el funcionario que solicita o acepta dádivas para hacer o dejar de hacer algo en el ejercicio de sus funciones. Se sanciona con prisión de 1 a 4 años e inhabilitación. El cohecho activo lo comete quien ofrece o da la dádiva."
      },
      {
        id: 12,
        pregunta: "¿Cuál es la minoría de edad penal en Guatemala?",
        opciones: {
          A: "Menor de 18 años.",
          B: "Menor de 16 años.",
          C: "Menor de 14 años."
        },
        respuestaCorrecta: "A",
        explicacion: "En Guatemala, los menores de 18 años no son sujetos del Código Penal sino de la Ley de Protección Integral de la Niñez y Adolescencia (PINA) y la Ley de la Jurisdicción de la Niñez y la Adolescencia. Las medidas que se les aplican son socioeducativas, no penas propiamente dichas."
      },
      {
        id: 13,
        pregunta: "¿Qué es la reincidencia y cómo afecta la pena?",
        opciones: {
          A: "Cometer un nuevo delito después de haber sido condenado por sentencia firme por delito anterior; es una circunstancia agravante.",
          B: "Cometer el mismo tipo de delito dos veces en el mismo año calendario.",
          C: "Es una causal de extinción de la pena cuando el penado ha demostrado rehabilitación."
        },
        respuestaCorrecta: "A",
        explicacion: "La reincidencia está regulada en el artículo 72 del Código Penal. Para que opere, debe existir sentencia condenatoria firme anterior y el nuevo delito debe cometerse antes de transcurridos diez años desde que el condenado cumplió la pena. Funciona como agravante genérica que permite elevar la pena."
      },
      {
        id: 14,
        pregunta: "¿Qué son las medidas de seguridad en el Derecho Penal guatemalteco?",
        opciones: {
          A: "Consecuencias jurídicas aplicables a inimputables o semiimputables peligrosos, orientadas a la prevención y rehabilitación, no al castigo.",
          B: "Las medidas cautelares dictadas por el juez durante el proceso penal.",
          C: "Las sanciones accesorias que acompañan obligatoriamente a toda pena de prisión."
        },
        respuestaCorrecta: "A",
        explicacion: "Las medidas de seguridad (artículos 87-96 del Código Penal) se aplican a quienes no son imputables (como personas con trastorno mental) pero representan un peligro para la sociedad. Su fin es terapéutico y de protección social, no retributivo. Incluyen internamiento en hospital psiquiátrico, entre otras."
      },
      {
        id: 15,
        pregunta: "¿Cuál es la pena establecida para el delito de estafa en Guatemala?",
        opciones: {
          A: "Prisión de 1 a 6 años y multa.",
          B: "Solo multa económica equivalente al daño causado.",
          C: "Arresto de 60 días y reparación civil."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 263 del Código Penal define la estafa como el engaño para obtener beneficio patrimonial propio o ajeno en perjuicio de otro. La pena es de 1 a 6 años de prisión más multa. Si el monto defraudado supera cierto umbral o afecta al Estado, puede agravarse."
      },
      {
        id: 16,
        pregunta: "¿Qué delito comete quien retiene indebidamente cosa mueble ajena que le fue confiada?",
        opciones: {
          A: "Apropiación indebida.",
          B: "Hurto.",
          C: "Robo con violencia."
        },
        respuestaCorrecta: "A",
        explicacion: "La apropiación indebida (artículo 272 del Código Penal) se configura cuando quien tiene legítima posesión de un bien ajeno (por depósito, comisión, administración u otro título) se apropia de él o lo distrae en perjuicio de su dueño. Se diferencia del hurto en que la posesión inicial es lícita."
      },
      {
        id: 17,
        pregunta: "¿Qué se entiende por tentativa en el Código Penal guatemalteco?",
        opciones: {
          A: "El comienzo de ejecución de un delito que no llega a consumarse por causas ajenas a la voluntad del agente.",
          B: "La planeación o preparación del delito sin llegar a ejecutarlo.",
          C: "El desistimiento voluntario del autor antes de consumar el hecho punible."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 14 del Código Penal define la tentativa: hay actos ejecutivos (más que mera preparación), el delito no se consuma, y la no consumación es por causas externas al autor. La pena de la tentativa es inferior a la del delito consumado. Los actos preparatorios, en general, no son punibles."
      },
      {
        id: 18,
        pregunta: "¿Qué circunstancia exime de responsabilidad penal por inimputabilidad?",
        opciones: {
          A: "Padecer, al momento del hecho, trastorno mental que prive al sujeto de la capacidad de comprender la ilicitud del acto o de actuar conforme a esa comprensión.",
          B: "Haber actuado bajo órdenes de un superior jerárquico en el ámbito militar.",
          C: "Encontrarse en estado de embriaguez voluntaria al momento del hecho."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 23 del Código Penal establece que no es imputable quien, en el momento del hecho, no posea la capacidad de comprender el carácter ilícito del acto o de determinarse de acuerdo a esa comprensión, por enfermedad mental, desarrollo psíquico incompleto o perturbación grave de la conciencia. Se aplican medidas de seguridad."
      },
      {
        id: 19,
        pregunta: "¿Cuál es el bien jurídico protegido por el delito de violación sexual?",
        opciones: {
          A: "La libertad e indemnidad sexual de la persona.",
          B: "El honor y la reputación de la víctima y su familia.",
          C: "Exclusivamente la integridad física de la persona agredida."
        },
        respuestaCorrecta: "A",
        explicacion: "El delito de violación (artículo 173 del Código Penal) protege la libertad sexual (derecho a decidir sobre la propia sexualidad) y la indemnidad sexual (en menores de edad, el derecho a un desarrollo sexual sano). La pena es de 6 a 10 años de prisión, elevándose significativamente cuando la víctima es menor de edad."
      },
      {
        id: 20,
        pregunta: "¿Qué es el delito de falsedad material?",
        opciones: {
          A: "Alterar, falsificar o fabricar un documento público o privado que pueda servir de prueba.",
          B: "Declarar falsamente ante autoridad competente en un proceso judicial.",
          C: "Usar un nombre falso o suplantar la identidad de otra persona."
        },
        respuestaCorrecta: "A",
        explicacion: "La falsedad material (artículo 321 del Código Penal) consiste en la alteración física de un documento verdadero o la creación total de un documento falso. Se distingue de la falsedad ideológica (insertar declaraciones falsas en documento verdadero). Ambas están penadas en el Código Penal guatemalteco."
      },
      {
        id: 21,
        pregunta: "¿Cuál es la causa de extinción de la responsabilidad penal más común?",
        opciones: {
          A: "La muerte del imputado.",
          B: "El pago voluntario de la multa antes del juicio.",
          C: "La conmutación de la pena por trabajo comunitario."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 101 del Código Penal enumera las causas de extinción de la responsabilidad penal: muerte del procesado, amnistía, perdón del ofendido (en delitos de acción privada), prescripción, entre otras. La muerte del imputado es la más común, ya que la responsabilidad penal es estrictamente personal e intransmisible."
      },
      {
        id: 22,
        pregunta: "¿Qué distingue al asesinato del homicidio simple en el Código Penal guatemalteco?",
        opciones: {
          A: "La concurrencia de circunstancias calificativas como alevosía, premeditación, precio, recompensa o promesa, o medios de peligro común.",
          B: "Que el asesinato siempre se planea con antelación mínima de 24 horas.",
          C: "El asesinato solo puede cometerse contra funcionarios públicos o familiares directos."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 132 del Código Penal tipifica el asesinato cuando al homicidio se agregan: alevosía, premeditación conocida, medios de peligro común, precio/recompensa/promesa remuneratoria, ensañamiento, o preparación de otro delito. La pena del asesinato es de 25 a 50 años; puede aplicarse pena de muerte en ciertos supuestos."
      },
      {
        id: 23,
        pregunta: "¿Qué es el tráfico de drogas o estupefacientes como delito en Guatemala?",
        opciones: {
          A: "La producción, fabricación, distribución, transporte, comercio o almacenamiento ilegal de drogas o estupefacientes, regulado por la Ley contra la Narcoactividad (Decreto 48-92).",
          B: "Solo la venta al menudeo de sustancias prohibidas en la vía pública.",
          C: "Exclusivamente la importación o exportación de drogas a través de fronteras guatemaltecas."
        },
        respuestaCorrecta: "A",
        explicacion: "En Guatemala, los delitos de narcotráfico se regulan principalmente por el Decreto 48-92 (Ley contra la Narcoactividad), no por el Código Penal ordinario. Esta ley tipifica múltiples conductas: siembra, cultivo, fabricación, distribución, transporte, financiamiento, lavado de activos relacionado, entre otras, con penas que pueden superar los 25 años de prisión."
      },
      {
        id: 24,
        pregunta: "¿Qué son las penas accesorias en el Código Penal guatemalteco?",
        opciones: {
          A: "Inhabilitación absoluta o especial, comiso y pérdida de objetos del delito, que acompañan a la pena principal.",
          B: "Sanciones que sustituyen a la pena principal cuando el juez lo considere conveniente.",
          C: "Medidas de seguridad aplicadas exclusivamente a inimputables."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 42 del Código Penal enumera las penas accesorias: inhabilitación absoluta, inhabilitación especial, comiso y pérdida de los objetos o instrumentos del delito, expulsión de extranjeros del territorio nacional, pago de costas y gastos procesales, y publicación de la sentencia. Se imponen junto con la pena principal."
      },
      {
        id: 25,
        pregunta: "¿Cuál es el plazo de prescripción para un delito sancionado con pena de muerte o prisión mayor de 25 años?",
        opciones: {
          A: "25 años.",
          B: "15 años.",
          C: "Los delitos con pena de muerte son imprescriptibles."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 107 del Código Penal establece que la acción penal prescribe en un plazo igual al máximo de la pena fijada, con un tope de 25 años para los delitos más graves. Sin embargo, los crímenes de lesa humanidad, genocidio y desaparición forzada son imprescriptibles conforme al derecho internacional incorporado al ordenamiento guatemalteco."
      }
    ]
  },

  // ── FASE 1: Derecho Mercantil ampliado (Código de Comercio Decreto 2-70) ─────
  {
    id: "derecho-mercantil-contratos",
    tema: "Derecho Mercantil — Sociedades y Contratos",
    descripcion: "Código de Comercio de Guatemala (Decreto 2-70): sociedades mercantiles, títulos de crédito y contratos comerciales.",
    icono: "Briefcase",
    categoria: "Mercantil",
    totalPreguntas: 20,
    preguntas: [
      {
        id: 1,
        pregunta: "¿Qué es un comerciante individual según el Código de Comercio de Guatemala?",
        opciones: {
          A: "La persona individual que ejerce en nombre propio y con fines de lucro cualquier actividad que la ley califica de mercantil.",
          B: "Cualquier persona que realice una venta ocasional de bienes.",
          C: "El representante legal de una sociedad mercantil constituida en Guatemala."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 2 del Código de Comercio (Decreto 2-70) define al comerciante individual como la persona que ejerce en nombre propio, con fines de lucro y de manera habitual, actividades mercantiles. Debe inscribirse en el Registro Mercantil para obtener su patente de comercio."
      },
      {
        id: 2,
        pregunta: "¿Cuáles son los tipos de sociedades mercantiles reconocidos en Guatemala?",
        opciones: {
          A: "Sociedad Colectiva, Sociedad en Comandita Simple, Sociedad de Responsabilidad Limitada, Sociedad Anónima y Sociedad en Comandita por Acciones.",
          B: "Solo Sociedad Anónima y Sociedad de Responsabilidad Limitada.",
          C: "Sociedad Anónima, Cooperativa, Asociación Civil y Fundación."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 10 del Código de Comercio reconoce cinco tipos de sociedades mercantiles: Sociedad Colectiva, Sociedad en Comandita Simple, Sociedad de Responsabilidad Limitada (SRL), Sociedad Anónima (SA) y Sociedad en Comandita por Acciones. La SA es la más común en la práctica comercial guatemalteca."
      },
      {
        id: 3,
        pregunta: "¿Cuál es la característica principal de la Sociedad Anónima en Guatemala?",
        opciones: {
          A: "La responsabilidad de los socios está limitada al monto de las acciones que han suscrito.",
          B: "Los socios responden solidaria e ilimitadamente con su patrimonio personal.",
          C: "Requiere mínimo 10 socios fundadores para su constitución."
        },
        respuestaCorrecta: "A",
        explicacion: "En la Sociedad Anónima (artículo 86 del Código de Comercio), el capital está dividido en acciones y la responsabilidad de cada accionista se limita al valor de las acciones que suscribió. Este es el tipo societario que mejor protege el patrimonio personal de los socios frente a deudas empresariales."
      },
      {
        id: 4,
        pregunta: "¿Qué es un título de crédito según el Código de Comercio de Guatemala?",
        opciones: {
          A: "El documento necesario para ejercitar el derecho literal y autónomo que en él se consigna.",
          B: "Cualquier contrato escrito que genera obligaciones de pago entre comerciantes.",
          C: "El certificado emitido por un banco que garantiza la solvencia de un deudor."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 386 del Código de Comercio define los títulos de crédito con tres características: literalidad (el derecho se ejerce según lo escrito), autonomía (cada tenedor tiene un derecho independiente) e incorporación (el derecho está incorporado al documento). Ejemplos: cheque, pagaré, letra de cambio."
      },
      {
        id: 5,
        pregunta: "¿Cuál es el plazo de prescripción de la acción cambiaria directa del cheque?",
        opciones: {
          A: "6 meses desde la fecha de presentación o del vencimiento del plazo de presentación.",
          B: "1 año desde la fecha de emisión del cheque.",
          C: "3 años desde la fecha de emisión del cheque."
        },
        respuestaCorrecta: "A",
        explicacion: "El artículo 511 del Código de Comercio establece que la acción cambiaria directa contra el librador del cheque prescribe en 6 meses contados desde que venza el plazo de presentación. El cheque debe presentarse al pago dentro de los 15 días siguientes a su creación si es pagadero en el mismo lugar de emisión."
      },
      {
        id: 6,
        pregunta: "¿Qué es el contrato de seguro en el Código de Comercio guatemalteco?",
        opciones: {
          A: "Aquel por el que el asegurador, mediante el cobro de una prima, se obliga a indemnizar al asegurado o beneficiario por los daños causados por un siniestro.",
          B: "El contrato por el cual una empresa garantiza la fidelidad de sus empleados ante terceros.",
          C: "El acuerdo entre banco y cliente para proteger depósitos ante quiebra bancaria."
        },
        respuestaCorrecta: "A",
        explicacion: "El contrato de seguro (artículo 874 del Código de Comercio) tiene elementos esenciales: el riesgo asegurable, la prima (contraprestación del asegurado), la obligación del asegurador de indemnizar y el interés asegurable. En Guatemala, las aseguradoras deben estar autorizadas por la Superintendencia de Bancos."
      },
      {
        id: 7,
        pregunta: "¿Qué es el contrato de depósito mercantil?",
        opciones: {
          A: "Aquel en que el depositario recibe mercancías o bienes muebles ajenos para su custodia y devolución, con o sin remuneración.",
          B: "El acuerdo por el cual un banco recibe dinero de un cliente generando intereses.",
          C: "El contrato por el que un almacén general expide certificados de depósito negociables."
        },
        respuestaCorrecta: "A",
        explicacion: "El depósito mercantil (artículo 715 del Código de Comercio) obliga al depositario a guardar y conservar el bien depositado y devolverlo cuando el depositante lo solicite. Se diferencia del depósito bancario y del depósito en almacenes generales, que tienen regulaciones específicas."
      },
      {
        id: 8,
        pregunta: "¿Cuál es el capital mínimo para constituir una Sociedad Anónima en Guatemala?",
        opciones: {
          A: "No existe un mínimo legal establecido en el Código de Comercio para el capital social.",
          B: "Q50,000.00 como capital mínimo autorizado.",
          C: "Q100,000.00 totalmente suscrito y pagado al momento de la constitución."
        },
        respuestaCorrecta: "A",
        explicacion: "El Código de Comercio guatemalteco no establece un capital mínimo para constituir una Sociedad Anónima, a diferencia de otros países. Sin embargo, al momento de la constitución, el capital autorizado debe estar suscrito en su totalidad y pagado al menos en un 25%. Lo relevante es que sea suficiente para el objeto social."
      },
      {
        id: 9,
        pregunta: "¿Qué es la letra de cambio como título de crédito?",
        opciones: {
          A: "Un título de crédito que contiene la orden incondicional de pagar una suma determinada de dinero a su vencimiento.",
          B: "Una promesa unilateral de pago emitida por el deudor a favor del acreedor.",
          C: "Un documento bancario que certifica que el librador tiene fondos suficientes para el pago."
        },
        respuestaCorrecta: "A",
        explicacion: "La letra de cambio (artículos 441-487 del Código de Comercio) involucra tres sujetos: el librador (quien ordena el pago), el librado o girado (a quien se ordena pagar) y el tomador o beneficiario. Es diferente al pagaré, que es una promesa de pago directa del suscriptor sin intervención de un tercero."
      },
      {
        id: 10,
        pregunta: "¿Qué función cumple el Registro Mercantil en Guatemala?",
        opciones: {
          A: "Llevar la matrícula de comerciantes individuales y sociales, y registrar actos y contratos mercantiles para darles publicidad y oponibilidad frente a terceros.",
          B: "Fiscalizar y sancionar las prácticas comerciales desleales entre empresas.",
          C: "Administrar la quiebra y liquidación de sociedades mercantiles insolventes."
        },
        respuestaCorrecta: "A",
        explicacion: "El Registro Mercantil (artículo 333 del Código de Comercio) tiene función de publicidad registral: los actos inscritos son oponibles a terceros. Registra la constitución, modificación y disolución de sociedades, poderes mercantiles, marcas comerciales, nombres comerciales y contratos de empresa, entre otros."
      },
      {
        id: 11,
        pregunta: "¿Qué es el contrato de franquicia en el Derecho Mercantil guatemalteco?",
        opciones: {
          A: "Aquel por el cual el franquiciante otorga al franquiciado el derecho de usar su marca, sistema de negocios y know-how a cambio de regalías.",
          B: "La autorización estatal para operar un servicio público en régimen de monopolio.",
          C: "El contrato de representación exclusiva de una empresa extranjera en Guatemala."
        },
        respuestaCorrecta: "A",
        explicacion: "La franquicia es un contrato mercantil atípico en Guatemala (no está específicamente regulado en el Código de Comercio pero es válido conforme al principio de libertad contractual del artículo 1517 del Código Civil). El franquiciado paga regalías o royalties y debe operar bajo los estándares del franquiciante."
      },
      {
        id: 12,
        pregunta: "¿Cómo se denomina el órgano máximo de una Sociedad Anónima en Guatemala?",
        opciones: {
          A: "Asamblea General de Accionistas.",
          B: "Junta Directiva.",
          C: "Consejo de Administración."
        },
        respuestaCorrecta: "A",
        explicacion: "La Asamblea General de Accionistas (artículo 132 del Código de Comercio) es el órgano soberano de la SA. Puede ser ordinaria (se reúne anualmente para conocer estados financieros, distribución de utilidades y nombramiento de administradores) o extraordinaria (para modificaciones estatutarias, fusiones, disolución, etc.)."
      },
      {
        id: 13,
        pregunta: "¿Qué es el contrato de fideicomiso mercantil?",
        opciones: {
          A: "Aquel por el cual el fideicomitente transfiere bienes a un fiduciario para que los administre o disponga en beneficio de un fideicomisario.",
          B: "El mandato especial que otorga un comerciante a otro para representarlo ante terceros.",
          C: "El contrato de garantía por el cual un tercero responde por las deudas del deudor principal."
        },
        respuestaCorrecta: "A",
        explicacion: "El fideicomiso (artículo 766 del Código de Comercio) implica la transferencia de la propiedad fiduciaria al fiduciario (generalmente un banco), quien la administra con un fin específico en beneficio del fideicomisario. Es muy usado en Guatemala para garantías bancarias, administración de patrimonios y proyectos inmobiliarios."
      },
      {
        id: 14,
        pregunta: "¿Qué es la quiebra en el Derecho Mercantil guatemalteco?",
        opciones: {
          A: "El estado jurídico de un comerciante declarado judicialmente insolvente, que no puede pagar sus deudas líquidas y exigibles.",
          B: "La liquidación voluntaria de una sociedad acordada por sus socios.",
          C: "La suspensión temporal de pagos autorizada por la Superintendencia de Bancos."
        },
        respuestaCorrecta: "A",
        explicacion: "La quiebra (artículos 347-386 del Código de Comercio y Código Procesal Civil y Mercantil) es un proceso judicial universal que afecta todo el patrimonio del deudor. Puede ser voluntaria (solicitada por el propio deudor) o necesaria (solicitada por un acreedor). Implica el desapoderamiento del deudor y la administración por un síndico."
      },
      {
        id: 15,
        pregunta: "¿Cuál es la función del pagaré como título de crédito?",
        opciones: {
          A: "Documentar la promesa incondicional del suscriptor de pagar una suma determinada de dinero a quien se designe como beneficiario.",
          B: "Ordenar a un banco el pago inmediato de una suma de dinero a la vista.",
          C: "Garantizar el cumplimiento de una obligación mediante la entrega de bienes muebles."
        },
        respuestaCorrecta: "A",
        explicacion: "El pagaré (artículos 490-495 del Código de Comercio) es un título de crédito que contiene la promesa del suscriptor (deudor) de pagar incondicionalmente una suma de dinero. Solo involucra dos partes: el suscriptor y el beneficiario. Es ampliamente usado en Guatemala para documentar créditos bancarios y comerciales."
      },
      {
        id: 16,
        pregunta: "¿Qué es el aval en los títulos de crédito?",
        opciones: {
          A: "La garantía personal que otorga un tercero (avalista) para el pago total o parcial de un título de crédito.",
          B: "La aceptación por el librado de pagar una letra de cambio a su vencimiento.",
          C: "El endoso en blanco que transfiere la propiedad de un título de crédito."
        },
        respuestaCorrecta: "A",
        explicacion: "El aval (artículo 407 del Código de Comercio) es una garantía cambiaria: el avalista se obliga solidariamente con el avalado al pago del título. Es autónomo (su obligación subsiste aunque la del avalado sea nula por causa distinta a vicios de forma) y debe constar por escrito en el mismo documento o en hoja adjunta."
      },
      {
        id: 17,
        pregunta: "¿Qué es el endoso en un título de crédito?",
        opciones: {
          A: "La declaración escrita en el título por la cual el tenedor transmite a otro los derechos que confiere el documento.",
          B: "La firma del librado que acepta pagar el título a su vencimiento.",
          C: "La garantía solidaria que otorga un tercero para asegurar el pago del título."
        },
        respuestaCorrecta: "A",
        explicacion: "El endoso (artículo 419 del Código de Comercio) es el mecanismo de circulación de los títulos de crédito a la orden. El endosante transfiere el título y garantiza su pago. Puede ser en blanco (solo firma), al portador o nominativo. El endoso en procuración solo da facultades de cobro sin transferir la propiedad."
      },
      {
        id: 18,
        pregunta: "¿Cuál es la diferencia entre Sociedad Colectiva y Sociedad de Responsabilidad Limitada?",
        opciones: {
          A: "En la Colectiva los socios responden ilimitada y solidariamente con su patrimonio; en la SRL la responsabilidad es limitada al capital aportado.",
          B: "La Colectiva requiere más de 20 socios y la SRL puede funcionar con un solo socio.",
          C: "Solo la SRL puede emitir acciones negociables en bolsa de valores."
        },
        respuestaCorrecta: "A",
        explicacion: "La Sociedad Colectiva (artículo 59 del Código de Comercio) implica responsabilidad ilimitada y solidaria de todos los socios frente a terceros: cada socio responde con su patrimonio personal. En la SRL (artículo 78), los socios solo arriesgan el capital que aportaron. La SRL no puede tener más de 20 socios."
      },
      {
        id: 19,
        pregunta: "¿Qué es la competencia desleal en el Derecho Mercantil guatemalteco?",
        opciones: {
          A: "Todo acto de competencia contrario a los usos honestos en materia comercial, como imitar signos distintivos, difundir informaciones falsas o aprovecharse del esfuerzo ajeno.",
          B: "La reducción de precios por debajo del costo de producción para eliminar competidores del mercado.",
          C: "La publicidad comparativa que menciona el nombre de un competidor sin su autorización."
        },
        respuestaCorrecta: "A",
        explicacion: "La competencia desleal en Guatemala se regula en la Ley de Protección al Consumidor y Usuario y en normas sectoriales. Incluye conductas como: confusión con productos ajenos, denigración de competidores, actos de imitación, explotación de reputación ajena y violación de secretos empresariales."
      },
      {
        id: 20,
        pregunta: "¿Cuándo se considera perfeccionado un contrato mercantil en Guatemala?",
        opciones: {
          A: "Cuando las partes consienten en el objeto y la causa, aunque no se haya cumplido formalidad alguna, salvo que la ley exija forma especial.",
          B: "Solo al entregarse la cosa o pagarse el precio pactado entre las partes.",
          C: "Únicamente cuando se protocoliza ante notario y se inscribe en el Registro Mercantil."
        },
        respuestaCorrecta: "A",
        explicacion: "El principio de consensualismo rige los contratos mercantiles en Guatemala: se perfeccionan por el mero consentimiento (artículo 1518 del Código Civil, aplicable supletoriamente). La excepción son los contratos formales que la ley exige escritura pública o registro. En materia mercantil, la agilidad del tráfico comercial favorece la informalidad."
      }
    ]
  }
];
