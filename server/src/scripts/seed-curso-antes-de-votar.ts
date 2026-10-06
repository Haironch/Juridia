import { createClient } from '@libsql/client';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// ─── Contenido Markdown de cada lección ──────────────────────────────────────

const CONTENIDO: Record<number, string> = {
  1: `Cuando escuchamos la palabra Constitución, probablemente pensamos en un libro lleno de artículos y términos jurídicos.

Pero su función puede entenderse de una manera mucho más sencilla:

**La Constitución establece las bases sobre las cuales funciona Guatemala.**

Determina cómo se organiza el Estado, reconoce derechos fundamentales de las personas y establece límites y obligaciones para quienes ejercen el poder público.

La Constitución Política de la República de Guatemala es considerada la ley fundamental del Estado y actualmente contiene 281 artículos.

## 1. ¿Para qué existe el Estado?

Los primeros artículos de nuestra Constitución contienen una idea fundamental.

El artículo 1 establece que el Estado de Guatemala se organiza para proteger a la persona y a la familia y que su fin supremo es la realización del bien común.

El artículo 2 establece, además, deberes fundamentales del Estado relacionados con la vida, la libertad, la justicia, la seguridad, la paz y el desarrollo integral de la persona.

Esto nos permite entender algo muy importante:

El Estado no existe únicamente para crear leyes, cobrar impuestos o administrar instituciones. Su razón de ser está relacionada con las personas y el bien común.

## 2. ¿Quién gobierna Guatemala?

Guatemala tiene un sistema de gobierno republicano, democrático y representativo.

El poder público se distribuye principalmente entre tres organismos.

### Organismo Legislativo

Su función principal es legislar. Es el organismo encargado de discutir, aprobar, modificar o derogar leyes siguiendo los procedimientos establecidos por la Constitución.

Está representado principalmente por el Congreso de la República.

Por eso, cuando escuchamos que se presentó una iniciativa de ley o que una ley fue aprobada por diputados, estamos hablando principalmente de una función legislativa.

### Organismo Ejecutivo

Es el encargado, entre otras funciones constitucionales, de dirigir la administración pública y ejecutar las políticas del Gobierno.

Su figura más conocida es el Presidente de la República, acompañado por el Vicepresidente, ministros y demás dependencias correspondientes.

Esto significa que un Presidente no puede simplemente sustituir al Congreso y crear cualquier ley que desee. Cada organismo posee funciones establecidas jurídicamente.

### Organismo Judicial

Tiene a su cargo la función jurisdiccional. Los tribunales conocen y resuelven los conflictos sometidos a su competencia aplicando el ordenamiento jurídico.

Aquí encontramos órganos jurisdiccionales como juzgados, tribunales y la Corte Suprema de Justicia, de acuerdo con la estructura establecida por la legislación guatemalteca.

## 3. ¿Por qué se divide el poder?

Imaginemos que una sola persona pudiera crear las leyes, ejecutarlas, juzgar a quien supuestamente las incumple y decidir por sí misma cuál será la consecuencia.

La concentración del poder crearía enormes riesgos.

La estructura constitucional busca evitar precisamente esa situación. Por eso existen diferentes instituciones con funciones distintas.

No significa que trabajen completamente aisladas. El funcionamiento del Estado requiere coordinación, controles y procedimientos establecidos legalmente.

Pero ninguna autoridad debería actuar simplemente porque "quiere hacerlo". Debe existir una base jurídica para su actuación.

## 4. Otras instituciones importantes

Además de los tres organismos del Estado, Guatemala posee instituciones constitucionales con funciones específicas.

**Tribunal Supremo Electoral — TSE**

Es la máxima autoridad en materia electoral y cumple funciones fundamentales en la organización y desarrollo de los procesos electorales.

**Corte de Constitucionalidad — CC**

Tiene una función fundamental en la defensa del orden constitucional.

**Procurador de los Derechos Humanos — PDH**

La Constitución establece esta institución dentro del sistema de protección de los derechos humanos.

Estas instituciones tienen funciones diferentes y no deben confundirse entre sí.

## 5. Constitución y leyes

Una manera sencilla de imaginar el sistema jurídico es pensar en una estructura. En la parte superior encontramos la Constitución. Después existen leyes y demás normas que desarrollan diferentes materias.

Por ejemplo:

- Ley Electoral y de Partidos Políticos
- Código Civil
- Código Penal
- Código de Trabajo
- Leyes administrativas
- Reglamentos y otras disposiciones

Una ley ordinaria no debería contradecir la Constitución. Cuando se considera que una norma vulnera disposiciones constitucionales existen mecanismos jurídicos destinados a proteger el orden constitucional.

---

**Lo esencial de esta lección**

La Constitución no es solamente un documento para abogados. Es el fundamento jurídico de la organización del país. Determina derechos, establece instituciones y fija límites al ejercicio del poder.

Por eso, antes de hablar de elecciones o autoridades, debemos recordar una regla fundamental:

**En un Estado de Derecho, gobernar también significa estar sometido a la ley.**`,

  2: `Muchas personas creen que únicamente necesitan conocer sus derechos cuando tienen un problema legal.

Pero los derechos están presentes prácticamente todos los días. Cuando expresas una opinión. Cuando solicitas algo a una institución pública. Cuando estudias. Cuando eres acusado de haber cometido una infracción. Cuando participas políticamente. Cuando ejerces tu libertad.

La Constitución reconoce distintos derechos y garantías fundamentales. Veamos algunos de los conceptos más importantes.

## 1. Derecho a la vida

La vida constituye uno de los bienes jurídicos fundamentales reconocidos por nuestra Constitución.

La protección de la persona se encuentra desde los primeros artículos constitucionales.

Esto es importante porque muchos otros derechos solamente pueden ejercerse plenamente si primero existe protección de la persona.

## 2. Libertad

La Constitución reconoce la libertad de las personas. Pero jurídicamente la libertad no significa simplemente: "Puedo hacer absolutamente cualquier cosa."

Vivimos dentro de una sociedad organizada jurídicamente. Nuestros derechos conviven con los derechos de otras personas y con las limitaciones legítimamente establecidas por el ordenamiento jurídico.

Por ejemplo: una persona tiene libertad de movilizarse, pero eso no significa que pueda ingresar sin autorización a cualquier propiedad privada.

El Derecho intenta crear un equilibrio entre libertad, convivencia social y respeto hacia los demás.

## 3. Igualdad

Otro principio fundamental es la igualdad. Esto significa que las personas deben ser tratadas conforme al marco constitucional y que no debería existir discriminación arbitraria.

Sin embargo, igualdad no significa necesariamente que todas las personas recibirán exactamente el mismo tratamiento en absolutamente todas las circunstancias. El Derecho también puede reconocer situaciones distintas cuando existe una justificación jurídica para hacerlo.

Lo importante es comprender la idea central: la autoridad no debería establecer privilegios o discriminaciones arbitrarias.

## 4. Libertad de expresión

En una democracia, las personas pueden expresar ideas, opiniones y críticas. Esto resulta especialmente importante durante períodos políticos y electorales.

Podemos criticar decisiones públicas, discutir propuestas, manifestar opiniones políticas, cuestionar el trabajo de funcionarios.

Pero nuevamente aparece una regla importante: tener un derecho no significa que no existan responsabilidades jurídicas. Dependiendo del caso, pueden existir límites establecidos constitucional o legalmente.

## 5. Derecho de petición

Los ciudadanos interactúan constantemente con la administración pública. Puede ser para solicitar información, realizar un trámite, presentar una petición o plantear una situación determinada.

El derecho de petición constituye una herramienta importante porque permite que las personas se dirijan a las autoridades dentro del marco legal.

Una democracia no consiste únicamente en votar cada cierto número de años. También implica que el ciudadano pueda relacionarse jurídicamente con sus instituciones.

## 6. Derecho de defensa

Supongamos que una persona es señalada de haber cometido una infracción. ¿Significa eso que automáticamente es culpable?

No.

El sistema jurídico reconoce garantías relacionadas con la defensa y el debido proceso. Toda persona sometida a un procedimiento debe contar con las garantías establecidas por la Constitución y la ley.

Esto busca impedir que la autoridad pueda simplemente señalar a alguien y castigarlo sin un procedimiento jurídico.

## 7. Debido proceso

El concepto de debido proceso es fundamental. Significa, de manera sencilla, que las decisiones jurídicas deben adoptarse siguiendo procedimientos y garantías previamente establecidos.

No debería existir: "Primero te castigamos y después averiguamos qué ocurrió."

La autoridad debe actuar conforme a la ley.

## 8. Derechos y responsabilidades

A veces pensamos: "Tengo derechos, por lo tanto no tengo obligaciones." Pero nuestra Constitución también reconoce deberes cívicos.

El artículo 135 establece, entre otros, deberes relacionados con cumplir y velar por el cumplimiento de la Constitución, obedecer las leyes y contribuir al desarrollo del país.

Por eso ciudadanía significa dos cosas: **derechos + responsabilidades.**

---

**Lo esencial de esta lección**

Conocer nuestros derechos no significa aprender de memoria cientos de artículos. Significa comprender que existen límites jurídicos frente al poder y mecanismos para proteger a las personas.

Una persona que conoce sus derechos puede identificar mejor cuándo una actuación parece normal y cuándo podría existir una vulneración que merece ser examinada jurídicamente.`,

  3: `Cuando hablamos de elecciones normalmente pensamos únicamente en introducir una papeleta dentro de una urna.

Pero el ejercicio político del ciudadano es mucho más amplio.

La Constitución reconoce derechos y deberes políticos. El artículo 136 incluye, entre otros:

- Inscribirse en el Registro de Ciudadanos.
- Elegir y ser electo.
- Velar por la libertad y efectividad del sufragio.
- Optar a cargos públicos.
- Participar en actividades políticas conforme a la ley.

## 1. ¿Qué significa ser ciudadano?

Para entender las elecciones debemos distinguir algunos conceptos.

Una persona puede ser guatemalteca y tener distintos derechos desde su nacimiento, pero el ejercicio de determinados derechos políticos está relacionado con la ciudadanía y las condiciones establecidas por la Constitución y la legislación electoral.

La participación política no ocurre de manera improvisada. Existe todo un sistema jurídico que determina quiénes pueden votar, cómo se organizan las elecciones y qué requisitos deben cumplirse.

## 2. ¿Qué significa empadronarse?

Para participar electoralmente no basta con llegar el día de las elecciones y solicitar una papeleta.

Existe un Registro de Ciudadanos y un padrón electoral. El empadronamiento permite que el ciudadano sea incorporado conforme a los procedimientos correspondientes para poder ejercer el sufragio.

Por eso, antes de cada proceso electoral suelen realizarse campañas de empadronamiento y actualización de datos.

De cara a las Elecciones Generales de 2027, el TSE ha continuado desarrollando jornadas nacionales de empadronamiento como parte de la preparación electoral.

## 3. ¿Qué es el sufragio?

El sufragio es uno de los principales mecanismos de participación política. A través del voto los ciudadanos participan en la elección de sus representantes y autoridades según el sistema establecido por la ley.

Pero votar no significa simplemente escoger el nombre que más conocemos. El voto adquiere mayor valor democrático cuando existe información.

Un ciudadano puede preguntarse: ¿Qué cargo estoy eligiendo? ¿Qué funciones tendrá esa persona? ¿Qué cosas realmente puede prometer? ¿Qué antecedentes y propuestas presenta? ¿Depende de ese cargo cumplir lo que está prometiendo?

Estas preguntas transforman el voto en una decisión más consciente.

## 4. El voto debe poder ejercerse libremente

La Constitución menciona la libertad y efectividad del sufragio. Esto es fundamental.

El ciudadano debería poder decidir políticamente sin presiones ilegítimas que anulen su libertad.

Por eso existen mesas electorales, papeletas, padrones, procedimientos, autoridades electorales, fiscalización y reglas aplicables a las organizaciones políticas.

Las elecciones no consisten únicamente en contar votos. Existe una estructura jurídica detrás de todo el proceso.

## 5. Elegir y ser electo

Nuestra Constitución no habla únicamente del derecho a elegir. También reconoce el derecho a ser electo, naturalmente sujeto a los requisitos y prohibiciones establecidos legalmente para cada cargo.

Esto significa que la participación democrática posee dos dimensiones: podemos participar escogiendo representantes, pero algunos ciudadanos también pueden aspirar a representar a otros.

## 6. Participar políticamente va más allá del día de las elecciones

La ciudadanía política no comienza a las 7:00 de la mañana del día de la elección ni termina cuando cierran los centros de votación.

También puede incluir: informarse, participar en organizaciones políticas dentro de la ley, conocer propuestas, fiscalizar a las autoridades, discutir asuntos públicos, defender la libertad del sufragio y exigir rendición de cuentas.

Una democracia necesita ciudadanos que no solamente voten. Necesita ciudadanos que comprendan por qué están votando.

## 7. Las elecciones de 2027

Guatemala se encuentra en etapa preparatoria para el próximo proceso electoral.

El cronograma preliminar presentado por el Tribunal Supremo Electoral contempla la convocatoria para el 22 de enero de 2027 y las elecciones generales para el 27 de junio de 2027. Si fuera necesaria una segunda elección presidencial, preliminarmente se contempla el 22 de agosto de 2027.

Estas fechas tienen carácter preliminar mientras no sean oficializadas mediante el correspondiente decreto de convocatoria.

Esto explica por qué durante 2026 ya escuchamos hablar frecuentemente de empadronamiento, organizaciones políticas y preparativos electorales.

---

**Lo esencial de esta lección**

Votar es un derecho político, pero la ciudadanía democrática no debería limitarse al día de las elecciones. También implica conocer nuestras instituciones, informarnos, participar responsablemente y proteger la libertad del sufragio.

**Un voto informado comienza mucho antes de llegar a la urna.**`,

  4: `Durante los meses previos a una elección comienzan a aparecer entrevistas, publicaciones en redes sociales, eventos políticos, vallas, reuniones, discursos, videos, promesas y mensajes dirigidos a los ciudadanos.

Pero existe una pregunta importante: ¿Puede hacerse propaganda política en cualquier momento y de cualquier forma?

La respuesta sencilla es: no necesariamente. Las actividades políticas y electorales están sujetas a reglas.

Una de las principales normas en esta materia es la Ley Electoral y de Partidos Políticos, conocida comúnmente como LEPP.

## 1. Actividad política y propaganda electoral no son exactamente lo mismo

Que una persona participe en política no significa automáticamente que toda actividad que realice tenga jurídicamente la misma categoría.

La legislación distingue distintos conceptos y momentos dentro del proceso electoral. Por ejemplo, pueden existir actividades relacionadas con: organización política, proselitismo, información, promoción y propaganda electoral.

Determinar jurídicamente en qué categoría entra una actividad puede depender de su contenido, momento y circunstancias.

## 2. ¿Qué es propaganda electoral?

La LEPP regula específicamente la propaganda electoral. El artículo 219 la relaciona con actividades desarrolladas durante el proceso electoral con objetivos como difundir programas de gobierno, persuadir electores o promover políticamente candidatos o ciudadanos mediante distintos medios.

La regulación incluye medios tradicionales y también Internet y medios similares.

Esto significa que las redes sociales no existen fuera del Derecho electoral. Facebook, TikTok, Instagram, YouTube u otras plataformas pueden convertirse en medios utilizados dentro de una estrategia política y, dependiendo de las circunstancias, determinadas actuaciones pueden quedar sujetas a reglas electorales.

## 3. La propaganda tiene límites temporales

Uno de los puntos más importantes de la legislación electoral es que la propaganda electoral no puede entenderse como una actividad ilimitada en el tiempo.

La propia LEPP establece fases dentro del proceso electoral y limita temporalmente la propaganda electoral a la etapa correspondiente.

¿Por qué? Porque si cualquier candidato pudiera desarrollar campañas electorales sin límite temporal o sin reglas comunes, podrían generarse importantes desigualdades entre competidores. Las reglas buscan ordenar la competencia electoral.

## 4. ¿Significa esto que nadie puede hablar de política antes de una campaña?

No. Esa sería una conclusión demasiado sencilla.

Las personas poseen derechos de participación y expresión. Los partidos políticos desarrollan actividades propias de su funcionamiento. Los ciudadanos pueden hablar de política. Los medios pueden informar. Las personas pueden analizar la situación del país.

La cuestión jurídica surge cuando determinada actividad reúne características que la legislación regula específicamente como propaganda electoral u otra actividad sometida a límites.

Por eso en Derecho es importante evitar respuestas absolutas sin examinar el contexto.

## 5. Las redes sociales también importan

Hace algunas décadas las campañas dependían principalmente de radio, televisión, periódicos, afiches y concentraciones públicas. Hoy cualquier mensaje puede llegar a miles de personas en cuestión de minutos.

Imagina un video patrocinado en redes sociales diciendo: "Soy Juan Pérez y quiero ser tu próximo alcalde. Vota por mí."

Desde una perspectiva jurídica no basta con decir: "Como ocurrió en Internet, las reglas electorales no aplican." La normativa electoral contempla Internet y medios similares dentro de la regulación correspondiente.

## 6. La desinformación también afecta al ciudadano

Durante una elección circulan cantidades enormes de información. Algunas afirmaciones pueden ser verdaderas. Otras pueden ser incompletas. Otras pueden ser falsas.

Antes de compartir contenido político conviene preguntarse:

- ¿Quién publicó esto?
- ¿Existe una fuente oficial?
- ¿La noticia realmente es reciente?
- ¿La imagen pertenece al contexto que afirma la publicación?
- ¿Se está citando correctamente la ley?
- ¿El candidato realmente tiene facultades para hacer lo que promete?

No todas las promesas dependen legalmente del cargo que alguien pretende ocupar.

## 7. El Tribunal Supremo Electoral

El Tribunal Supremo Electoral desempeña un papel fundamental en la organización y fiscalización electoral conforme a sus competencias legales.

Actualmente desarrolla distintas acciones preparatorias para las elecciones de 2027, incluyendo coordinación con organizaciones políticas, empadronamiento y planificación institucional.

Por eso, ante información electoral importante, una de las mejores prácticas es consultar fuentes oficiales.

---

**Lo esencial de esta lección**

La política no ocurre fuera del Derecho. Las campañas, organizaciones políticas y propaganda están sujetas a reglas. Además, las nuevas tecnologías han convertido las redes sociales en una parte fundamental de la comunicación electoral.

Por eso un ciudadano informado no solamente pregunta: "¿Qué me están diciendo?" También pregunta: "¿Quién lo está diciendo, cuándo lo está diciendo y qué establece realmente la ley?"`,

  5: `Llegamos a una de las preguntas más importantes de este curso.

Cuando una persona dice "Voy a votar por el próximo gobierno", puede parecer que durante las elecciones únicamente elegimos Presidente. Pero las Elecciones Generales guatemaltecas abarcan diferentes cargos públicos.

Comprender esto es fundamental porque cada autoridad posee competencias diferentes. No podemos exigirle exactamente lo mismo a un Presidente, un diputado o un alcalde.

## 1. Presidente y Vicepresidente

El Presidente encabeza el Organismo Ejecutivo. Entre sus responsabilidades se encuentra dirigir la administración del Estado dentro de las facultades establecidas por la Constitución.

El Presidente tiene una enorme responsabilidad política y administrativa. Pero existe algo que debemos recordar:

El Presidente no controla todos los organismos del Estado. No puede sustituir libremente al Congreso. No puede sustituir a los jueces. No puede gobernar legítimamente ignorando la Constitución.

La estructura republicana precisamente distribuye las funciones públicas.

## 2. Diputados al Congreso

El Congreso ejerce la función legislativa. Actualmente es un organismo unicameral integrado por diputados electos democráticamente.

Los diputados participan, entre otras funciones constitucionales y legales, en: la creación de leyes, discusión de iniciativas, aprobación de decretos, funciones presupuestarias, fiscalización política y otras atribuciones establecidas por el ordenamiento jurídico.

Esto permite evaluar mejor una promesa electoral. Si un candidato a diputado afirma: "Cuando sea diputado voy a construir personalmente un hospital en cada municipio", la primera pregunta debería ser: ¿Esa es realmente una función que un diputado puede ejecutar directamente?

Puede impulsar legislación, fiscalizar, participar en decisiones presupuestarias y ejercer otras atribuciones. Pero no debe confundirse la función legislativa con la administración directa de todas las obras públicas.

## 3. Alcaldes y corporaciones municipales

También elegimos autoridades municipales. Las municipalidades administran asuntos propios del municipio conforme a la Constitución, al Código Municipal y demás legislación aplicable.

Cuando hablamos de una municipalidad no estamos hablando únicamente del alcalde. Existe una Corporación Municipal, integrada conforme a las reglas correspondientes por alcalde, síndicos y concejales.

Las autoridades municipales tienen especial importancia porque muchas de sus decisiones afectan directamente la vida cotidiana de una comunidad.

## 4. Diputados al Parlamento Centroamericano

Dentro del proceso electoral también se eligen representantes al Parlamento Centroamericano.

Esto muchas veces recibe menos atención pública que la elección presidencial. Sin embargo, forma parte del proceso electoral guatemalteco. Por eso encontraremos distintas papeletas correspondientes a diferentes elecciones.

## 5. No todos los cargos pueden hacer lo mismo

Imaginemos tres candidatos: uno presidencial, uno a diputado, uno a alcalde. Los tres prometen exactamente lo mismo: "Yo voy a resolver todos los problemas del país."

Desde el punto de vista jurídico, la frase debería generar una pregunta: ¿Tiene realmente ese cargo las facultades necesarias para hacerlo?

Cada autoridad posee límites. Un alcalde no puede realizar las funciones propias del Presidente. Un Presidente no puede ejercer libremente las funciones propias de los tribunales. Un diputado no administra directamente todas las instituciones públicas.

Por eso, cuando escuches una propuesta política, intenta hacer tres preguntas:

**Primera:** ¿Qué cargo busca esta persona?

**Segunda:** ¿Qué facultades tiene legalmente ese cargo?

**Tercera:** ¿La promesa que está haciendo depende realmente de esa autoridad?

Solamente estas tres preguntas pueden cambiar profundamente la manera en que analizamos una campaña política.

## 6. Elegir no significa entregar poder ilimitado

Cuando elegimos a una autoridad no le entregamos poder absoluto. Le otorgamos temporalmente determinadas responsabilidades públicas dentro de límites constitucionales y legales.

Esta es una diferencia fundamental entre democracia y poder absoluto.

Las autoridades deben cumplir la Constitución, deben actuar dentro de sus competencias, pueden estar sujetas a fiscalización, deben respetar derechos y pueden existir mecanismos jurídicos para cuestionar actuaciones contrarias al ordenamiento jurídico.

## 7. El ciudadano después de votar

Existe una idea equivocada que dice: "Ya voté. Ahora todo depende del Gobierno."

La ciudadanía no termina después de las elecciones. Después de elegir autoridades podemos: informarnos sobre sus decisiones, conocer nuevas leyes, consultar información pública, examinar presupuestos, participar cívicamente, formular peticiones, denunciar posibles irregularidades por las vías correspondientes y exigir rendición de cuentas.

El voto entrega una responsabilidad a las autoridades. Pero también deja una responsabilidad en nosotros: observar qué hacen con ella.

---

**Lo esencial de esta lección**

La democracia necesita algo más que elecciones. Necesita ciudadanos capaces de preguntar, de investigar, de comparar información y de conocer las funciones reales de sus autoridades.

**Para elegir mejor, primero debemos entender qué estamos eligiendo.**`,
};

// ─── Datos de los quizzes ─────────────────────────────────────────────────────

function buildQuizzes(moduloIds: string[], cursoId: string, categoriaId: string) {
  const quizzes: Array<{
    modulo_id: string | null;
    curso_id: string;
    categoria_id: string;
    tipo: string;
    orden: number;
    texto: string;
    explicacion: string;
    opciones: Array<{ letra: string; texto: string; es_correcta: boolean }>;
  }> = [];

  // ── Lección 1 ──────────────────────────────────────────────────────────────
  quizzes.push(
    {
      modulo_id: moduloIds[0], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 1,
      texto: '¿Cuál es la función principal de la Constitución Política de la República de Guatemala?',
      explicacion: 'La Constitución establece cómo se organiza el Estado, reconoce derechos y fija límites para las autoridades.',
      opciones: [
        { letra: 'A', texto: 'Regular únicamente las elecciones.', es_correcta: false },
        { letra: 'B', texto: 'Establecer las bases de la organización del Estado, reconocer derechos y fijar límites al poder público.', es_correcta: true },
        { letra: 'C', texto: 'Establecer únicamente los delitos y sus penas.', es_correcta: false },
        { letra: 'D', texto: 'Regular solamente el funcionamiento del Congreso.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[0], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 2,
      texto: '¿Cuáles son los tres organismos principales en los que se distribuye el poder público en Guatemala?',
      explicacion: 'El poder público se distribuye principalmente entre los organismos Legislativo, Ejecutivo y Judicial.',
      opciones: [
        { letra: 'A', texto: 'Municipal, Electoral y Judicial.', es_correcta: false },
        { letra: 'B', texto: 'Legislativo, Ejecutivo y Judicial.', es_correcta: true },
        { letra: 'C', texto: 'Congreso, Ejército y Municipalidades.', es_correcta: false },
        { letra: 'D', texto: 'Presidencia, Tribunal Supremo Electoral y Congreso.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[0], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 3,
      texto: '¿Cuál es la función principal del Organismo Legislativo?',
      explicacion: 'El Organismo Legislativo tiene como función principal crear, modificar y derogar leyes conforme al procedimiento legal.',
      opciones: [
        { letra: 'A', texto: 'Juzgar delitos.', es_correcta: false },
        { letra: 'B', texto: 'Administrar directamente todas las municipalidades.', es_correcta: false },
        { letra: 'C', texto: 'Crear, modificar o derogar leyes siguiendo el procedimiento correspondiente.', es_correcta: true },
        { letra: 'D', texto: 'Organizar las elecciones.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[0], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 4,
      texto: '¿Cuál de las siguientes instituciones es la máxima autoridad en materia electoral en Guatemala?',
      explicacion: 'El Tribunal Supremo Electoral es la máxima autoridad en materia electoral en Guatemala.',
      opciones: [
        { letra: 'A', texto: 'Corte Suprema de Justicia.', es_correcta: false },
        { letra: 'B', texto: 'Congreso de la República.', es_correcta: false },
        { letra: 'C', texto: 'Tribunal Supremo Electoral.', es_correcta: true },
        { letra: 'D', texto: 'Procuraduría General de la Nación.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[0], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 5,
      texto: '¿Puede una ley ordinaria contradecir válidamente la Constitución?',
      explicacion: 'Las leyes ordinarias deben respetar la Constitución y no pueden estar por encima de ella.',
      opciones: [
        { letra: 'A', texto: 'Sí, si la aprueba la mayoría del Congreso.', es_correcta: false },
        { letra: 'B', texto: 'Sí, si el Presidente está de acuerdo.', es_correcta: false },
        { letra: 'C', texto: 'No, porque la Constitución ocupa una posición fundamental dentro del ordenamiento jurídico.', es_correcta: true },
        { letra: 'D', texto: 'Sí, durante un proceso electoral.', es_correcta: false },
      ],
    }
  );

  // ── Lección 2 ──────────────────────────────────────────────────────────────
  quizzes.push(
    {
      modulo_id: moduloIds[1], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 1,
      texto: '¿Qué significa tener libertad dentro de un Estado de Derecho?',
      explicacion: 'La libertad permite ejercer nuestros derechos, pero respetando la ley y los derechos de los demás.',
      opciones: [
        { letra: 'A', texto: 'Poder hacer absolutamente cualquier cosa sin consecuencias.', es_correcta: false },
        { letra: 'B', texto: 'Poder ejercer nuestros derechos respetando también las leyes y los derechos de otras personas.', es_correcta: true },
        { letra: 'C', texto: 'No estar obligado a cumplir ninguna ley.', es_correcta: false },
        { letra: 'D', texto: 'Tener más derechos que las autoridades.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[1], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 2,
      texto: '¿Qué significa el principio de igualdad?',
      explicacion: 'La igualdad busca evitar tratos arbitrarios o discriminatorios sin una justificación legal válida.',
      opciones: [
        { letra: 'A', texto: 'Que todas las personas deben recibir exactamente el mismo tratamiento en cualquier circunstancia.', es_correcta: false },
        { letra: 'B', texto: 'Que las autoridades pueden crear privilegios sin justificación.', es_correcta: false },
        { letra: 'C', texto: 'Que las personas deben ser tratadas conforme al marco constitucional, evitando discriminaciones arbitrarias.', es_correcta: true },
        { letra: 'D', texto: 'Que ninguna ley puede establecer requisitos distintos.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[1], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 3,
      texto: 'Una persona es acusada de cometer una infracción. ¿Significa esto que automáticamente es culpable?',
      explicacion: 'Ser acusado no significa ser culpable. Toda persona tiene derecho a un proceso con garantías.',
      opciones: [
        { letra: 'A', texto: 'Sí.', es_correcta: false },
        { letra: 'B', texto: 'Sí, si la acusación proviene de una autoridad.', es_correcta: false },
        { letra: 'C', texto: 'No, debe respetarse el procedimiento y las garantías correspondientes.', es_correcta: true },
        { letra: 'D', texto: 'Sí, salvo que pueda demostrar inmediatamente su inocencia.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[1], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 4,
      texto: '¿Qué busca proteger el debido proceso?',
      explicacion: 'El debido proceso exige que las decisiones legales sigan procedimientos y garantías previamente establecidos.',
      opciones: [
        { letra: 'A', texto: 'Que las autoridades puedan sancionar inmediatamente.', es_correcta: false },
        { letra: 'B', texto: 'Que las decisiones jurídicas se adopten siguiendo procedimientos y garantías establecidas.', es_correcta: true },
        { letra: 'C', texto: 'Que únicamente los abogados puedan presentar solicitudes.', es_correcta: false },
        { letra: 'D', texto: 'Que todos los procesos sean privados.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[1], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 5,
      texto: '¿Cuál de las siguientes afirmaciones describe mejor la ciudadanía?',
      explicacion: 'La ciudadanía implica disfrutar derechos, pero también cumplir deberes y responsabilidades.',
      opciones: [
        { letra: 'A', texto: 'Solo tenemos derechos.', es_correcta: false },
        { letra: 'B', texto: 'Solo tenemos obligaciones.', es_correcta: false },
        { letra: 'C', texto: 'Existen derechos y también deberes y responsabilidades.', es_correcta: true },
        { letra: 'D', texto: 'Los deberes únicamente corresponden a los funcionarios públicos.', es_correcta: false },
      ],
    }
  );

  // ── Lección 3 ──────────────────────────────────────────────────────────────
  quizzes.push(
    {
      modulo_id: moduloIds[2], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 1,
      texto: '¿Cuál de las siguientes opciones forma parte de los derechos y deberes políticos reconocidos constitucionalmente?',
      explicacion: 'La Constitución reconoce, entre otros derechos políticos, el derecho a elegir y ser electo.',
      opciones: [
        { letra: 'A', texto: 'Elegir y ser electo.', es_correcta: true },
        { letra: 'B', texto: 'Elegir jueces directamente.', es_correcta: false },
        { letra: 'C', texto: 'No cumplir las leyes durante una campaña.', es_correcta: false },
        { letra: 'D', texto: 'Votar más de una vez si existen varias papeletas.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[2], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 2,
      texto: '¿Qué permite el empadronamiento?',
      explicacion: 'El empadronamiento permite al ciudadano quedar registrado para ejercer el voto conforme a las reglas electorales.',
      opciones: [
        { letra: 'A', texto: 'Convertirse automáticamente en candidato.', es_correcta: false },
        { letra: 'B', texto: 'Incorporarse al sistema correspondiente para ejercer el sufragio conforme a los procedimientos electorales.', es_correcta: true },
        { letra: 'C', texto: 'Afiliarse automáticamente a un partido político.', es_correcta: false },
        { letra: 'D', texto: 'Obtener un cargo público.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[2], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 3,
      texto: '¿Qué es el sufragio?',
      explicacion: 'El sufragio es el mecanismo mediante el cual los ciudadanos participan en la elección de sus autoridades.',
      opciones: [
        { letra: 'A', texto: 'Un sistema para crear leyes.', es_correcta: false },
        { letra: 'B', texto: 'Un mecanismo mediante el cual los ciudadanos participan en la elección de autoridades y representantes.', es_correcta: true },
        { letra: 'C', texto: 'Un procedimiento exclusivo del Congreso.', es_correcta: false },
        { letra: 'D', texto: 'Una actividad realizada únicamente por los partidos políticos.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[2], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 4,
      texto: '¿Cuál de estas acciones representa mejor un voto informado?',
      explicacion: 'Un voto informado implica conocer el cargo, sus funciones y analizar las propuestas antes de decidir.',
      opciones: [
        { letra: 'A', texto: 'Elegir únicamente porque el candidato aparece con frecuencia en redes sociales.', es_correcta: false },
        { letra: 'B', texto: 'Elegir porque otra persona lo recomendó.', es_correcta: false },
        { letra: 'C', texto: 'Investigar qué cargo se elige, cuáles son sus funciones y analizar las propuestas.', es_correcta: true },
        { letra: 'D', texto: 'Votar siempre por el partido más conocido.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[2], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 5,
      texto: '¿La participación ciudadana termina después de votar?',
      explicacion: 'La participación ciudadana continúa después de votar mediante información, vigilancia y participación cívica.',
      opciones: [
        { letra: 'A', texto: 'Sí.', es_correcta: false },
        { letra: 'B', texto: 'Sí, porque después todo depende de las autoridades.', es_correcta: false },
        { letra: 'C', texto: 'No, también implica informarse, fiscalizar y participar responsablemente en los asuntos públicos.', es_correcta: true },
        { letra: 'D', texto: 'Solo continúa para quienes pertenecen a partidos políticos.', es_correcta: false },
      ],
    }
  );

  // ── Lección 4 ──────────────────────────────────────────────────────────────
  quizzes.push(
    {
      modulo_id: moduloIds[3], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 1,
      texto: '¿Cuál es una de las principales leyes que regula la materia electoral en Guatemala?',
      explicacion: 'La Ley Electoral y de Partidos Políticos regula aspectos fundamentales de las elecciones y la actividad política en Guatemala.',
      opciones: [
        { letra: 'A', texto: 'Código Civil.', es_correcta: false },
        { letra: 'B', texto: 'Código de Comercio.', es_correcta: false },
        { letra: 'C', texto: 'Ley Electoral y de Partidos Políticos.', es_correcta: true },
        { letra: 'D', texto: 'Código de Trabajo.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[3], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 2,
      texto: '¿Toda actividad política debe considerarse automáticamente propaganda electoral?',
      explicacion: 'No toda actividad política es propaganda electoral; existen distintas categorías y reglas según cada caso.',
      opciones: [
        { letra: 'A', texto: 'Sí.', es_correcta: false },
        { letra: 'B', texto: 'No, existen diferencias entre distintos tipos de actividad política y electoral.', es_correcta: true },
        { letra: 'C', texto: 'Sí, cuando se realiza en Internet.', es_correcta: false },
        { letra: 'D', texto: 'Sí, cuando participa un funcionario.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[3], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 3,
      texto: '¿Las redes sociales pueden estar relacionadas con la regulación electoral?',
      explicacion: 'Las redes sociales también pueden utilizarse para actividades electorales y quedar sujetas a regulación.',
      opciones: [
        { letra: 'A', texto: 'No, porque Internet no está regulado.', es_correcta: false },
        { letra: 'B', texto: 'Únicamente Facebook.', es_correcta: false },
        { letra: 'C', texto: 'Sí, determinadas actividades realizadas por Internet pueden quedar sujetas a las reglas electorales correspondientes.', es_correcta: true },
        { letra: 'D', texto: 'Solo cuando una publicación supera un millón de vistas.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[3], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 4,
      texto: '¿Por qué existen períodos y reglas para la propaganda electoral?',
      explicacion: 'Las reglas buscan ordenar la competencia electoral y establecer condiciones comunes para los participantes.',
      opciones: [
        { letra: 'A', texto: 'Para impedir que los ciudadanos hablen de política.', es_correcta: false },
        { letra: 'B', texto: 'Para ordenar la competencia electoral y establecer condiciones y límites comunes.', es_correcta: true },
        { letra: 'C', texto: 'Para permitir únicamente campañas presidenciales.', es_correcta: false },
        { letra: 'D', texto: 'Para prohibir completamente las redes sociales.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[3], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 5,
      texto: 'Antes de compartir una publicación política, ¿cuál sería una buena práctica?',
      explicacion: 'Verificar la fuente, la fecha y el contexto ayuda a evitar compartir información falsa o engañosa.',
      opciones: [
        { letra: 'A', texto: 'Compartirla si muchas personas ya lo hicieron.', es_correcta: false },
        { letra: 'B', texto: 'Revisar la fuente, la fecha, el contexto y verificar si la información puede confirmarse.', es_correcta: true },
        { letra: 'C', texto: 'Creerla si incluye una fotografía.', es_correcta: false },
        { letra: 'D', texto: 'Compartirla primero y verificarla después.', es_correcta: false },
      ],
    }
  );

  // ── Lección 5 ──────────────────────────────────────────────────────────────
  quizzes.push(
    {
      modulo_id: moduloIds[4], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 1,
      texto: '¿Durante las elecciones generales guatemaltecas se elige únicamente Presidente?',
      explicacion: 'En las elecciones generales se eligen varias autoridades, no únicamente Presidente y Vicepresidente.',
      opciones: [
        { letra: 'A', texto: 'Sí.', es_correcta: false },
        { letra: 'B', texto: 'No, también se eligen otros cargos y autoridades.', es_correcta: true },
        { letra: 'C', texto: 'Sí, los demás cargos son nombrados por el Presidente.', es_correcta: false },
        { letra: 'D', texto: 'Solo se eligen Presidente y alcaldes.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[4], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 2,
      texto: '¿Cuál es una función esencial de los diputados al Congreso?',
      explicacion: 'Los diputados ejercen principalmente la función legislativa por medio del Congreso de la República.',
      opciones: [
        { letra: 'A', texto: 'Administrar directamente las municipalidades.', es_correcta: false },
        { letra: 'B', texto: 'Ejercer la función legislativa.', es_correcta: true },
        { letra: 'C', texto: 'Dirigir los tribunales.', es_correcta: false },
        { letra: 'D', texto: 'Organizar las mesas de votación.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[4], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 3,
      texto: '¿Quiénes forman parte de una corporación municipal?',
      explicacion: 'La corporación municipal está integrada por alcalde, síndicos y concejales según la legislación aplicable.',
      opciones: [
        { letra: 'A', texto: 'Únicamente el alcalde.', es_correcta: false },
        { letra: 'B', texto: 'Alcalde, síndicos y concejales conforme a la legislación aplicable.', es_correcta: true },
        { letra: 'C', texto: 'Presidente, Vicepresidente y alcalde.', es_correcta: false },
        { letra: 'D', texto: 'Diputados y alcaldes.', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[4], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 4,
      texto: 'Cuando un candidato realiza una promesa, ¿qué debería preguntarse primero un ciudadano informado?',
      explicacion: 'Antes de creer una promesa es importante verificar si el cargo realmente tiene facultades para cumplirla.',
      opciones: [
        { letra: 'A', texto: '¿Cuántos seguidores tiene?', es_correcta: false },
        { letra: 'B', texto: '¿Qué cargo busca y si ese cargo posee realmente las facultades para cumplir esa promesa?', es_correcta: true },
        { letra: 'C', texto: '¿Cuántas veces aparece en televisión?', es_correcta: false },
        { letra: 'D', texto: '¿Qué color utiliza su partido?', es_correcta: false },
      ],
    },
    {
      modulo_id: moduloIds[4], curso_id: cursoId, categoria_id: categoriaId, tipo: 'quiz_modulo', orden: 5,
      texto: '¿Qué significa elegir democráticamente a una autoridad?',
      explicacion: 'Elegir una autoridad no le concede poder absoluto; debe actuar dentro de los límites de la Constitución y la ley.',
      opciones: [
        { letra: 'A', texto: 'Entregarle poder absoluto durante todo su período.', es_correcta: false },
        { letra: 'B', texto: 'Permitirle ignorar otras instituciones.', es_correcta: false },
        { letra: 'C', texto: 'Otorgarle determinadas responsabilidades públicas dentro de límites constitucionales y legales.', es_correcta: true },
        { letra: 'D', texto: 'Autorizarla a modificar libremente la Constitución.', es_correcta: false },
      ],
    }
  );

  // ── Evaluación final ───────────────────────────────────────────────────────
  const finalQuestions = [
    {
      texto: '¿Cuál es la norma fundamental que establece las bases de organización del Estado de Guatemala?',
      explicacion: 'La Constitución es la norma fundamental que establece las bases de organización del Estado.',
      correcta: 'B',
      opciones: [
        { letra: 'A', texto: 'Código Penal.' },
        { letra: 'B', texto: 'Constitución Política de la República de Guatemala.' },
        { letra: 'C', texto: 'Código Municipal.' },
        { letra: 'D', texto: 'Ley Electoral y de Partidos Políticos.' },
      ],
    },
    {
      texto: '¿Qué organismo ejerce principalmente la función legislativa?',
      explicacion: 'El Congreso de la República ejerce principalmente la función legislativa.',
      correcta: 'C',
      opciones: [
        { letra: 'A', texto: 'Tribunal Supremo Electoral.' },
        { letra: 'B', texto: 'Organismo Judicial.' },
        { letra: 'C', texto: 'Congreso de la República.' },
        { letra: 'D', texto: 'Presidencia de la República.' },
      ],
    },
    {
      texto: '¿Cuál de las siguientes opciones representa mejor el debido proceso?',
      explicacion: 'El debido proceso protege a las personas al exigir procedimientos y garantías antes de tomar decisiones jurídicas.',
      correcta: 'B',
      opciones: [
        { letra: 'A', texto: 'Castigar primero y posteriormente investigar.' },
        { letra: 'B', texto: 'Tomar decisiones siguiendo procedimientos y garantías jurídicas previamente establecidas.' },
        { letra: 'C', texto: 'Permitir que cualquier autoridad imponga cualquier sanción.' },
        { letra: 'D', texto: 'Aplicar únicamente las decisiones del Presidente.' },
      ],
    },
    {
      texto: '¿Cuál de los siguientes es un derecho político reconocido en Guatemala?',
      explicacion: 'Elegir y ser electo forma parte de los derechos políticos reconocidos constitucionalmente.',
      correcta: 'A',
      opciones: [
        { letra: 'A', texto: 'Elegir y ser electo.' },
        { letra: 'B', texto: 'Crear leyes directamente como ciudadano.' },
        { letra: 'C', texto: 'Ignorar las disposiciones electorales.' },
        { letra: 'D', texto: 'Ocupar cualquier cargo sin cumplir requisitos legales.' },
      ],
    },
    {
      texto: '¿Qué función cumple el empadronamiento?',
      explicacion: 'El empadronamiento permite al ciudadano registrarse para poder ejercer el sufragio.',
      correcta: 'B',
      opciones: [
        { letra: 'A', texto: 'Convertir al ciudadano en miembro de un partido.' },
        { letra: 'B', texto: 'Permitir su incorporación conforme al sistema electoral para poder ejercer el sufragio.' },
        { letra: 'C', texto: 'Convertirlo en candidato.' },
        { letra: 'D', texto: 'Autorizarlo para trabajar en el Tribunal Supremo Electoral.' },
      ],
    },
    {
      texto: '¿Cuál de las siguientes afirmaciones sobre la propaganda electoral es correcta?',
      explicacion: 'La propaganda electoral está sujeta a reglas y períodos establecidos por la normativa electoral.',
      correcta: 'C',
      opciones: [
        { letra: 'A', texto: 'Puede realizarse sin ninguna regla.' },
        { letra: 'B', texto: 'Solo existe en televisión.' },
        { letra: 'C', texto: 'Está sujeta a disposiciones y períodos establecidos en la normativa electoral.' },
        { letra: 'D', texto: 'No puede realizarse en Internet.' },
      ],
    },
    {
      texto: 'Una publicación política aparece en redes sociales. ¿Cuál es la actitud más recomendable?',
      explicacion: 'Verificar la información antes de compartirla ayuda a evitar la desinformación.',
      correcta: 'B',
      opciones: [
        { letra: 'A', texto: 'Compartirla inmediatamente.' },
        { letra: 'B', texto: 'Verificar su fuente, fecha y contexto antes de aceptarla como verdadera.' },
        { letra: 'C', texto: 'Darla por verdadera si tiene muchos comentarios.' },
        { letra: 'D', texto: 'Creerla si contiene el logotipo de una institución.' },
      ],
    },
    {
      texto: '¿Todos los cargos públicos tienen las mismas facultades?',
      explicacion: 'Cada cargo público tiene competencias y responsabilidades distintas establecidas por la ley.',
      correcta: 'C',
      opciones: [
        { letra: 'A', texto: 'Sí.' },
        { letra: 'B', texto: 'Sí, durante un proceso electoral.' },
        { letra: 'C', texto: 'No, cada autoridad posee funciones y competencias diferentes.' },
        { letra: 'D', texto: 'Solo Presidente y diputados tienen funciones diferentes.' },
      ],
    },
    {
      texto: '¿Cuál sería la mejor manera de analizar una promesa electoral?',
      explicacion: 'Una promesa debe analizarse según las facultades reales del cargo que busca el candidato.',
      correcta: 'B',
      opciones: [
        { letra: 'A', texto: 'Preguntar si el candidato tiene muchos seguidores.' },
        { letra: 'B', texto: 'Determinar qué cargo busca y verificar si ese cargo tiene competencia para realizar lo prometido.' },
        { letra: 'C', texto: 'Revisar únicamente si la publicidad es atractiva.' },
        { letra: 'D', texto: 'Analizar solamente el partido político al que pertenece.' },
      ],
    },
    {
      texto: '¿Cuál resume mejor la idea central del curso?',
      explicacion: 'El objetivo del curso es promover una ciudadanía más informada, consciente de sus derechos y de cómo funciona el Estado.',
      correcta: 'B',
      opciones: [
        { letra: 'A', texto: 'La participación ciudadana consiste únicamente en votar.' },
        { letra: 'B', texto: 'Conocer nuestros derechos, comprender las instituciones e informarnos permite participar de manera más responsable.' },
        { letra: 'C', texto: 'Solo los abogados necesitan conocer las leyes.' },
        { letra: 'D', texto: 'Después de las elecciones, la ciudadanía ya no tiene ninguna responsabilidad.' },
      ],
    },
  ];

  for (let i = 0; i < finalQuestions.length; i++) {
    const q = finalQuestions[i];
    quizzes.push({
      modulo_id: null,
      curso_id: cursoId,
      categoria_id: categoriaId,
      tipo: 'evaluacion_final',
      orden: i + 1,
      texto: q.texto,
      explicacion: q.explicacion,
      opciones: q.opciones.map((o) => ({
        letra: o.letra,
        texto: o.texto,
        es_correcta: o.letra === q.correcta,
      })),
    });
  }

  return quizzes;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const now = new Date().toISOString();
  const CATEGORIA_ID = 'e90abb15-968e-48fa-8b15-d8862040b439'; // Derecho Constitucional

  // ── 1. Cambios de esquema ──────────────────────────────────────────────────
  console.log('\n[1/4] Aplicando cambios de esquema...');

  try {
    await db.execute(`ALTER TABLE preguntas ADD COLUMN modulo_id TEXT`);
    console.log('  + modulo_id agregado a preguntas');
  } catch {
    console.log('  = modulo_id ya existe');
  }

  try {
    await db.execute(`ALTER TABLE preguntas ADD COLUMN curso_id TEXT`);
    console.log('  + curso_id agregado a preguntas');
  } catch {
    console.log('  = curso_id ya existe');
  }

  await db.execute(`
    CREATE TABLE IF NOT EXISTS progreso_modulo (
      id TEXT PRIMARY KEY,
      usuario_id TEXT NOT NULL,
      modulo_id TEXT NOT NULL,
      curso_id TEXT NOT NULL,
      completado INTEGER NOT NULL DEFAULT 0,
      quiz_aprobado INTEGER NOT NULL DEFAULT 0,
      puntaje_quiz INTEGER,
      completado_en DATETIME,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      UNIQUE(usuario_id, modulo_id)
    )
  `);
  console.log('  + progreso_modulo creada');

  await db.execute(`
    CREATE TABLE IF NOT EXISTS intentos_evaluacion (
      id TEXT PRIMARY KEY,
      usuario_id TEXT NOT NULL,
      curso_id TEXT NOT NULL,
      puntaje INTEGER NOT NULL,
      aprobado INTEGER NOT NULL DEFAULT 0,
      intento_num INTEGER NOT NULL DEFAULT 1,
      createdAt DATETIME NOT NULL
    )
  `);
  console.log('  + intentos_evaluacion creada');

  await db.execute(`
    CREATE TABLE IF NOT EXISTS certificados (
      id TEXT PRIMARY KEY,
      usuario_id TEXT NOT NULL,
      curso_id TEXT NOT NULL,
      codigo_unico TEXT NOT NULL UNIQUE,
      puntaje_final INTEGER NOT NULL,
      emitido_en DATETIME NOT NULL,
      UNIQUE(usuario_id, curso_id)
    )
  `);
  console.log('  + certificados creada');

  // ── 2. Insertar curso ──────────────────────────────────────────────────────
  console.log('\n[2/4] Insertando curso...');

  const CURSO_ID = randomUUID();
  const ADMIN_ID = 'ceb5912e-766a-483c-a7a2-f43c440b708c';

  // Crear subcategoría para las preguntas del curso (preguntas.subcategoria_id es NOT NULL)
  const SUBCAT_ID = randomUUID();
  await db.execute({
    sql: `INSERT INTO subcategorias (id, categoria_id, nombre, descripcion, orden, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, 1, ?, ?)`,
    args: [SUBCAT_ID, CATEGORIA_ID, 'Educación Cívica y Electoral', 'Conceptos sobre elecciones, derechos y participación ciudadana.', now, now],
  });
  console.log(`  + Subcategoría creada: ${SUBCAT_ID}`);

  await db.execute({
    sql: `INSERT INTO cursos (id, creador_id, titulo, descripcion, nivel, duracion, es_premium, thumbnail, publicado, categoria_id, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, 0, NULL, 1, ?, ?, ?)`,
    args: [
      CURSO_ID,
      ADMIN_ID,
      'Antes de Votar: Lo que todo guatemalteco debe saber',
      'Aprende sobre la Constitución, tus derechos, el voto y las elecciones de Guatemala. Cinco lecciones, totalmente gratuito.',
      'Básico',
      '35-50 min',
      CATEGORIA_ID,
      now, now,
    ],
  });
  console.log(`  + Curso: ${CURSO_ID}`);

  // ── 3. Insertar lecciones ──────────────────────────────────────────────────
  console.log('\n[3/4] Insertando lecciones...');

  const MODULOS_DEF = [
    { orden: 1, titulo: 'Guatemala y su Constitución: ¿quién pone las reglas?', duracion: 50 },
    { orden: 2, titulo: 'Tus derechos: lo que todo guatemalteco debería conocer', duracion: 55 },
    { orden: 3, titulo: 'Tu voto también tiene derechos', duracion: 50 },
    { orden: 4, titulo: 'Política, campaña y propaganda: ¿todo está permitido?', duracion: 55 },
    { orden: 5, titulo: '¿Qué estamos eligiendo realmente?', duracion: 60 },
  ];

  const moduloIds: string[] = [];

  for (const mod of MODULOS_DEF) {
    const id = randomUUID();
    moduloIds.push(id);
    await db.execute({
      sql: `INSERT INTO modulos_curso (id, curso_id, orden, titulo, contenido, duracion_estimada, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, CURSO_ID, mod.orden, mod.titulo, CONTENIDO[mod.orden], mod.duracion, now, now],
    });
    console.log(`  + Lección ${mod.orden}: ${mod.titulo}`);
  }

  // ── 4. Insertar preguntas y opciones ───────────────────────────────────────
  console.log('\n[4/4] Insertando preguntas y opciones...');

  const quizzes = buildQuizzes(moduloIds, CURSO_ID, CATEGORIA_ID);
  let totalPreguntas = 0;

  for (const q of quizzes) {
    const preguntaId = randomUUID();
    await db.execute({
      sql: `INSERT INTO preguntas (id, subcategoria_id, creador_id, modulo_id, curso_id, categoria_id, texto, tipo, dificultad, explicacion, estado, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 'APROBADA', ?, ?)`,
      args: [preguntaId, SUBCAT_ID, ADMIN_ID, q.modulo_id, q.curso_id, q.categoria_id, q.texto, q.tipo, q.explicacion, now, now],
    });

    for (const opt of q.opciones) {
      await db.execute({
        sql: `INSERT INTO opciones_respuesta (id, pregunta_id, texto, es_correcta, orden, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          randomUUID(), preguntaId, opt.texto,
          opt.es_correcta ? 1 : 0,
          ['A', 'B', 'C', 'D'].indexOf(opt.letra) + 1,
          now, now,
        ],
      });
    }
    totalPreguntas++;
  }

  console.log(`  + ${totalPreguntas} preguntas insertadas (25 quiz + 10 evaluación final)`);

  console.log('\n✅  Seed completado exitosamente.');
  console.log(`    Curso ID : ${CURSO_ID}`);
  console.log(`    Módulos  : ${moduloIds.length}`);
  console.log(`    Preguntas: ${totalPreguntas}\n`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
