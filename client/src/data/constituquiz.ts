import type { QuizTema } from '../types/index';

export const quizTemas: QuizTema[] = [
  {
    id: "derecho-constitucional",
    tema: "Derecho Constitucional",
    descripcion: "Preguntas sobre la Constitucion Politica de Guatemala, sus principios y garantias fundamentales.",
    icono: "Scale",
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
  }
];
