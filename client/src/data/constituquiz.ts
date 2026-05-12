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
  }
];
