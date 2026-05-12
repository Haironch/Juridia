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
    tema: "Derecho Penal Guatemalteco",
    descripcion: "Conceptos clave del Código Penal (Decreto 17-73): principios, delitos, sanciones y participación criminal.",
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
  }
];
