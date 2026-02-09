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
  }
];
