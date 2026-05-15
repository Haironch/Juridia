export type CategoriaTimeline =
  | 'Constitucional'
  | 'Penal'
  | 'Civil'
  | 'Laboral'
  | 'Procesal'
  | 'Institucional'
  | 'Internacional'
  | 'Social';

export type TipoEvento =
  | 'Constitución'
  | 'Código'
  | 'Ley'
  | 'Institución'
  | 'Reforma'
  | 'Tratado'
  | 'Hito';

export interface EventoHistorico {
  id: string;
  año: number;
  titulo: string;
  resumen: string;
  detalle: string;
  categoria: CategoriaTimeline;
  tipo: TipoEvento;
  importancia: 'alta' | 'media';
}

export const eventosHistoricos: EventoHistorico[] = [
  // ── 1800s ────────────────────────────────────────────────────────────────
  {
    id: 'independencia-1821',
    año: 1821,
    titulo: 'Independencia de Guatemala',
    resumen: 'El 15 de septiembre Guatemala proclama su independencia de la Corona española.',
    detalle:
      'El Acta de Independencia fue firmada el 15 de septiembre de 1821 en la Ciudad de Guatemala. Con ella cesó formalmente la aplicación directa del derecho colonial español y se inició el proceso de construcción de un ordenamiento jurídico propio. En los años siguientes, los vacíos normativos fueron cubiertos temporalmente con legislación colonial adaptada.',
    categoria: 'Constitucional',
    tipo: 'Hito',
    importancia: 'alta',
  },
  {
    id: 'constitucion-centroamerica-1824',
    año: 1824,
    titulo: '1.ª Constitución: República Federal de Centroamérica',
    resumen: 'Primera carta magna que rige a Guatemala como parte de la Federación Centroamericana.',
    detalle:
      'Promulgada el 22 de noviembre de 1824, esta constitución estableció una república federal de corte liberal inspirada en la Constitución de los Estados Unidos. Guatemala fue una de las cinco provincias federadas. Reconocía derechos individuales básicos y separación de poderes, aunque la inestabilidad política impidió su consolidación.',
    categoria: 'Constitucional',
    tipo: 'Constitución',
    importancia: 'alta',
  },
  {
    id: 'constitucion-guatemala-1825',
    año: 1825,
    titulo: '2.ª Constitución: Estado de Guatemala',
    resumen: 'Primera constitución específica del Estado de Guatemala dentro de la Federación.',
    detalle:
      'Promulgada el 11 de octubre de 1825, esta constitución reguló el Estado de Guatemala como entidad federada. Fue la primera en abordar la organización interna del país, definiendo los tres poderes del Estado a nivel local. Dejó de tener vigencia con la disolución de la Federación Centroamericana en 1839.',
    categoria: 'Constitucional',
    tipo: 'Constitución',
    importancia: 'alta',
  },
  {
    id: 'constitucion-1851',
    año: 1851,
    titulo: 'Constitución conservadora de 1851',
    resumen: 'Carta magna de corte conservador que centraliza el poder en el ejecutivo.',
    detalle:
      'Promulgada durante el gobierno de Rafael Carrera, esta constitución fue de carácter conservador y centralista. Redujo significativamente los derechos individuales reconocidos en textos anteriores y fortaleció el poder del ejecutivo. Fue el reflejo jurídico del período conservador que dominó Guatemala durante la segunda mitad del siglo XIX.',
    categoria: 'Constitucional',
    tipo: 'Constitución',
    importancia: 'media',
  },
  {
    id: 'constitucion-liberal-1879',
    año: 1879,
    titulo: '3.ª Constitución Liberal de 1879',
    resumen: 'Resultado de la Reforma Liberal, establece el Estado laico y moderniza el marco jurídico.',
    detalle:
      'Promulgada tras la Revolución Liberal de 1871 encabezada por Justo Rufino Barrios, esta constitución separó la Iglesia del Estado, proclamó la educación laica y modernizó el ordenamiento jurídico guatemalteco. Estuvo en vigencia —con interrupciones— durante décadas y sentó bases del derecho civil moderno en Guatemala. En 1921 se realizó una breve reforma que no perduró.',
    categoria: 'Constitucional',
    tipo: 'Constitución',
    importancia: 'alta',
  },
  {
    id: 'codigo-civil-1877',
    año: 1877,
    titulo: 'Primer Código Civil moderno',
    resumen: 'Se promulga el primer Código Civil inspirado en el modelo napoleónico.',
    detalle:
      'Durante la Reforma Liberal se promulgó el Código Civil de 1877, basado en el Código de Napoleón de 1804 y el Código Civil chileno de Andrés Bello. Reguló por primera vez de forma sistemática el derecho de familia, contratos, propiedad y sucesiones. Fue la base del ordenamiento civil guatemalteco hasta ser sustituido por el Decreto Ley 106 en 1963.',
    categoria: 'Civil',
    tipo: 'Código',
    importancia: 'alta',
  },

  // ── 1900s ────────────────────────────────────────────────────────────────
  {
    id: 'constitucion-1945',
    año: 1945,
    titulo: '4.ª Constitución: La Revolución de Octubre',
    resumen: 'Constitución democrática y social producto de la Revolución de 1944.',
    detalle:
      'Fruto de la Revolución de Octubre de 1944 que derrocó al dictador Jorge Ubico, esta constitución fue la más avanzada de su época en Centroamérica. Reconoció derechos sociales (trabajo, seguridad social, educación), estableció el sufragio universal masculino y creó bases para el Estado de Bienestar. Bajo su amparo se promulgó el Código de Trabajo de 1947 y se inició la Reforma Agraria de 1952.',
    categoria: 'Constitucional',
    tipo: 'Constitución',
    importancia: 'alta',
  },
  {
    id: 'igss-1946',
    año: 1946,
    titulo: 'Creación del IGSS',
    resumen: 'Se funda el Instituto Guatemalteco de Seguridad Social mediante el Decreto 295.',
    detalle:
      'El Instituto Guatemalteco de Seguridad Social (IGSS) fue creado por el Decreto 295 en enero de 1946, durante el gobierno revolucionario de Juan José Arévalo. Fue la primera institución de seguridad social del país, encargada de cubrir riesgos de accidentes, enfermedad, maternidad e invalidez de los trabajadores. Su creación marcó el inicio del Estado social en Guatemala.',
    categoria: 'Institucional',
    tipo: 'Institución',
    importancia: 'alta',
  },
  {
    id: 'codigo-trabajo-1947',
    año: 1947,
    titulo: 'Código de Trabajo (Decreto 330)',
    resumen: 'Se promulga el primer Código de Trabajo moderno de Guatemala.',
    detalle:
      'El Decreto 330 fue el primer cuerpo legal integral que reguló las relaciones laborales en Guatemala. Estableció jornadas de 8 horas, descanso semanal, vacaciones anuales, aguinaldo, indemnización por despido injustificado y libertad sindical. Fue considerado uno de los códigos laborales más progresistas de América Latina en su época. Aunque ha sido reformado, continúa vigente en su esencia hasta hoy.',
    categoria: 'Laboral',
    tipo: 'Código',
    importancia: 'alta',
  },
  {
    id: 'constitucion-1956',
    año: 1956,
    titulo: '5.ª Constitución: Postliberación',
    resumen: 'Carta magna promulgada tras la contrarrevolución de 1954 que derrocó a Árbenz.',
    detalle:
      'Tras el golpe de Estado de 1954 que derrocó al presidente Jacobo Árbenz, el gobierno de Carlos Castillo Armas promulgó esta constitución de corte anticomunista. Anuló la Reforma Agraria, redujo derechos laborales y estableció restricciones a la actividad política. Representó un retroceso respecto a la Constitución de 1945 en materia de derechos sociales.',
    categoria: 'Constitucional',
    tipo: 'Constitución',
    importancia: 'alta',
  },
  {
    id: 'codigo-civil-1963',
    año: 1963,
    titulo: 'Código Civil vigente (Decreto Ley 106)',
    resumen: 'Se promulga el Código Civil que sigue vigente hasta hoy.',
    detalle:
      'El Decreto Ley 106, promulgado durante el gobierno militar de Enrique Peralta Azurdia, reemplazó al Código Civil de 1877. Modernizó el derecho civil guatemalteco en materia de personas, familia, sucesiones, obligaciones y contratos. A pesar de sus más de 60 años de vigencia y múltiples reformas parciales, sigue siendo el texto legal que rige las relaciones civiles en Guatemala.',
    categoria: 'Civil',
    tipo: 'Código',
    importancia: 'alta',
  },
  {
    id: 'constitucion-1965',
    año: 1965,
    titulo: '6.ª Constitución Militar de 1965',
    resumen: 'Constitución promulgada por el gobierno militar que permitió el retorno formal al civismo.',
    detalle:
      'Promulgada por el gobierno militar de Enrique Peralta Azurdia, esta constitución permitió una apertura controlada al sistema democrático. Estableció el Tribunal Supremo Electoral como árbitro de los comicios y contempló algunos derechos sociales. Sin embargo, fue promulgada sin asamblea constituyente y mantuvo restricciones políticas. Estuvo vigente hasta el golpe de Estado de 1982.',
    categoria: 'Constitucional',
    tipo: 'Constitución',
    importancia: 'alta',
  },
  {
    id: 'codigo-penal-1973',
    año: 1973,
    titulo: 'Código Penal vigente (Decreto 17-73)',
    resumen: 'Se promulga el Código Penal que sigue siendo el marco punitivo fundamental de Guatemala.',
    detalle:
      'El Decreto 17-73 es el Código Penal actualmente vigente en Guatemala. Clasifica los delitos en: delitos contra la vida, contra la integridad personal, contra la libertad, contra el patrimonio, entre otros. Ha sido objeto de numerosas reformas a lo largo de los años para tipificar nuevos delitos (femicidio, lavado de dinero, narcotráfico) y ajustar penas. Sigue siendo el pilar del derecho penal sustantivo guatemalteco.',
    categoria: 'Penal',
    tipo: 'Código',
    importancia: 'alta',
  },
  {
    id: 'constitucion-1985',
    año: 1985,
    titulo: '7.ª Constitución Política actual (1985)',
    resumen: 'La constitución democrática vigente, promulgada tras la transición al gobierno civil.',
    detalle:
      'Promulgada por la Asamblea Nacional Constituyente el 31 de mayo de 1985 y vigente desde el 14 de enero de 1986, esta constitución marcó el retorno a la democracia tras décadas de gobiernos militares. Reconoce ampliamente los derechos humanos, crea la Corte de Constitucionalidad como tribunal independiente, el Procurador de los Derechos Humanos y el Tribunal Supremo Electoral. Es la constitución más larga y detallada de la historia guatemalteca con 281 artículos.',
    categoria: 'Constitucional',
    tipo: 'Constitución',
    importancia: 'alta',
  },
  {
    id: 'corte-constitucionalidad-1986',
    año: 1986,
    titulo: 'Instalación de la Corte de Constitucionalidad',
    resumen: 'Se instala la CC como tribunal permanente e independiente, guardián de la Constitución.',
    detalle:
      'La Corte de Constitucionalidad (CC) fue creada por la Constitución de 1985 e instalada el 14 de enero de 1986 como un tribunal permanente de jurisdicción privativa. Es la máxima autoridad en materia constitucional, con competencia para: declarar la inconstitucionalidad de leyes, conocer amparos en última instancia, emitir opiniones consultivas y resolver conflictos de competencia. Su creación fue un hito fundamental en el Estado de Derecho guatemalteco.',
    categoria: 'Institucional',
    tipo: 'Institución',
    importancia: 'alta',
  },
  {
    id: 'pdh-1987',
    año: 1987,
    titulo: 'Creación del Procurador de los Derechos Humanos',
    resumen: 'Se instala la institución del PDH como comisionado del Congreso para la defensa de los DDHH.',
    detalle:
      'El Procurador de los Derechos Humanos (PDH) es una institución creada por la Constitución de 1985 y regulada por la Ley de la Comisión de Derechos Humanos del Congreso (Decreto 54-86). Su función es supervisar la administración pública, investigar denuncias de violaciones a derechos humanos y promover su observancia. No tiene funciones jurisdiccionales pero puede emitir recomendaciones y censuras públicas.',
    categoria: 'Institucional',
    tipo: 'Institución',
    importancia: 'alta',
  },
  {
    id: 'codigo-procesal-penal-1992',
    año: 1992,
    titulo: 'Nuevo Código Procesal Penal (Decreto 51-92)',
    resumen: 'Reforma procesal penal que transita del sistema inquisitivo al acusatorio.',
    detalle:
      'El Decreto 51-92 sustituyó el sistema procesal penal inquisitivo por un sistema acusatorio-oral. Los cambios fundamentales fueron: separación entre el ente investigador (MP) y el juzgador, introducción del juicio oral y público, reconocimiento del derecho a la defensa técnica desde el inicio del proceso, principio de inocencia y creación del Ministerio Público como institución autónoma. Esta reforma modernizó radicalmente la justicia penal guatemalteca.',
    categoria: 'Procesal',
    tipo: 'Código',
    importancia: 'alta',
  },
  {
    id: 'mp-autonomia-1993',
    año: 1993,
    titulo: 'Autonomía del Ministerio Público',
    resumen: 'Reforma constitucional que dota de plena autonomía al MP y crea la figura del Fiscal General.',
    detalle:
      'Las reformas constitucionales de 1993, aprobadas tras la crisis del "Serranazgo" (intento de autogolpe del presidente Serrano Elías), fortalecieron instituciones clave. El Ministerio Público fue dotado de plena autonomía funcional e independencia del Organismo Ejecutivo. Se reformó el proceso de elección del Fiscal General para incluir una Comisión de Postulación. Estas reformas buscaron fortalecer el Estado de Derecho.',
    categoria: 'Institucional',
    tipo: 'Reforma',
    importancia: 'alta',
  },
  {
    id: 'acuerdos-paz-1996',
    año: 1996,
    titulo: 'Acuerdos de Paz',
    resumen: 'Firma de los Acuerdos de Paz que ponen fin a 36 años de conflicto armado interno.',
    detalle:
      'El 29 de diciembre de 1996 se firmó el Acuerdo de Paz Firme y Duradera entre el Gobierno de Guatemala y la URNG, poniendo fin a 36 años de conflicto armado. Los acuerdos incluyeron compromisos en materia de derechos humanos, identidad y derechos de los pueblos indígenas, reasentamiento de poblaciones desplazadas, bases para una reforma constitucional y fortalecimiento del poder civil. Aunque muchos compromisos permanecen incumplidos, los Acuerdos de Paz son un hito histórico-jurídico fundamental.',
    categoria: 'Internacional',
    tipo: 'Tratado',
    importancia: 'alta',
  },

  // ── 2000s ─────────────────────────────────────────────────────────────────
  {
    id: 'ley-consumidor-2003',
    año: 2003,
    titulo: 'Ley de Protección al Consumidor (Decreto 006-2003)',
    resumen: 'Se crea la DIACO y se establecen derechos mínimos de los consumidores guatemaltecos.',
    detalle:
      'El Decreto 006-2003 creó el marco legal para la protección de los consumidores y usuarios en Guatemala. Estableció la Dirección de Atención y Asistencia al Consumidor (DIACO) como entidad rectora, reconoció el derecho a la información, a productos seguros, a la garantía y a mecanismos de reclamación gratuitos. Fue una respuesta a la creciente economía de mercado y a la necesidad de equilibrar la relación entre proveedores y consumidores.',
    categoria: 'Civil',
    tipo: 'Ley',
    importancia: 'media',
  },
  {
    id: 'ley-femicidio-2008',
    año: 2008,
    titulo: 'Ley contra el Femicidio (Decreto 22-2008)',
    resumen: 'Guatemala tipifica el femicidio como delito autónomo y crea juzgados especializados.',
    detalle:
      'El Decreto 22-2008 tipificó por primera vez el femicidio como delito autónomo en Guatemala, con penas de 25 a 50 años de prisión. También tipificó la violencia contra la mujer (física, psicológica, económica) y la violencia económica. Llevó a la creación de juzgados y tribunales especializados en femicidio y otras formas de violencia contra la mujer. Guatemala fue uno de los primeros países de América Latina en adoptar esta legislación.',
    categoria: 'Penal',
    tipo: 'Ley',
    importancia: 'alta',
  },
  {
    id: 'juzgados-femicidio-2010',
    año: 2010,
    titulo: 'Juzgados especializados en femicidio',
    resumen: 'Se instalan los primeros juzgados y tribunales especializados en violencia contra la mujer.',
    detalle:
      'Como consecuencia de la Ley contra el Femicidio de 2008, en 2010 se instalaron los primeros Juzgados de Primera Instancia Penal de Femicidio y otras Formas de Violencia contra la Mujer. Estos tribunales especializados tramitan exclusivamente casos de violencia de género, con fiscales y jueces capacitados en la materia. Representaron un avance significativo en el acceso a la justicia para mujeres víctimas de violencia.',
    categoria: 'Institucional',
    tipo: 'Institución',
    importancia: 'alta',
  },
  {
    id: 'cicig-2007',
    año: 2007,
    titulo: 'Creación de la CICIG',
    resumen: 'Guatemala acepta la Comisión Internacional contra la Impunidad (CICIG) de la ONU.',
    detalle:
      'La Comisión Internacional contra la Impunidad en Guatemala (CICIG) fue creada mediante acuerdo entre la ONU y el Estado guatemalteco el 12 de diciembre de 2006, e inició operaciones en 2007. Su mandato era apoyar al MP, la PNC y otras instituciones en la investigación de crímenes cometidos por cuerpos ilegales y aparatos clandestinos de seguridad. La CICIG fue responsable de numerosas investigaciones de alto impacto, incluyendo la crisis política de 2015 que llevó a la renuncia del presidente Otto Pérez Molina.',
    categoria: 'Internacional',
    tipo: 'Institución',
    importancia: 'alta',
  },

  // ── 2010s ─────────────────────────────────────────────────────────────────
  {
    id: 'crisis-politica-2015',
    año: 2015,
    titulo: 'Crisis política: renuncia de Otto Pérez Molina',
    resumen: 'La CICIG y el MP destapan el caso La Línea, forzando la renuncia del presidente.',
    detalle:
      'En abril de 2015, el MP y la CICIG revelaron el caso "La Línea", una red de defraudación aduanera que involucraba al presidente Otto Pérez Molina y a la vicepresidenta Roxana Baldetti. Las masivas protestas ciudadanas y la retirada del fuero presidencial por el Congreso llevaron a la renuncia de Pérez Molina el 3 de septiembre de 2015, quien fue arrestado al día siguiente. Fue la primera vez en la historia guatemalteca que un presidente en funciones renunció por causas judiciales.',
    categoria: 'Institucional',
    tipo: 'Hito',
    importancia: 'alta',
  },
  {
    id: 'fin-cicig-2019',
    año: 2019,
    titulo: 'Fin del mandato de la CICIG',
    resumen: 'Guatemala no renueva el mandato de la CICIG, que concluye operaciones en septiembre de 2019.',
    detalle:
      'El presidente Jimmy Morales anunció en agosto de 2018 la no renovación del acuerdo con la CICIG, cuyo mandato venció el 3 de septiembre de 2019. La decisión fue objeto de recursos legales y críticas internacionales. La CICIG concluyó operaciones habiendo investigado más de 100 casos de corrupción de alto perfil, obtenido más de 300 condenas y contribuido a reformas institucionales significativas. Su salida generó debates sobre el futuro del combate a la impunidad en Guatemala.',
    categoria: 'Internacional',
    tipo: 'Hito',
    importancia: 'alta',
  },

  // ── 2020s ─────────────────────────────────────────────────────────────────
  {
    id: 'ley-ong-2023',
    año: 2023,
    titulo: 'Reformas a la Ley de ONG',
    resumen: 'El Congreso aprueba reformas que restringen la operación de organizaciones no gubernamentales.',
    detalle:
      'En 2023, el Congreso guatemalteco aprobó reformas a la Ley de Organizaciones No Gubernamentales (Decreto 02-2003) que impusieron mayores controles y restricciones a la operación de ONGs en el país. Las reformas exigieron mayor transparencia financiera y establecieron causales más amplias para la cancelación de personería jurídica. Las reformas generaron controversia por considerarse, según críticos, una herramienta para restringir la sociedad civil.',
    categoria: 'Social',
    tipo: 'Reforma',
    importancia: 'media',
  },
  {
    id: 'arce-fiscal-2024',
    año: 2024,
    titulo: 'Crisis institucional en el MP',
    resumen: 'Tensiones entre el gobierno de Arévalo y la Fiscal General Consuelo Porras marcan el año jurídico.',
    detalle:
      'Durante 2024, el gobierno del presidente Bernardo Arévalo enfrentó tensiones institucionales significativas con la Fiscalía General a cargo de Consuelo Porras. Se presentaron acciones legales y constitucionales relacionadas con la autonomía del MP, la elección de nuevas autoridades judiciales y el rol de la CC. Este período marcó debates fundamentales sobre la independencia judicial y el equilibrio de poderes en Guatemala.',
    categoria: 'Institucional',
    tipo: 'Hito',
    importancia: 'media',
  },
];

export const CATEGORIAS_TIMELINE: CategoriaTimeline[] = [
  'Constitucional',
  'Penal',
  'Civil',
  'Laboral',
  'Procesal',
  'Institucional',
  'Internacional',
  'Social',
];

export const CATEGORIA_COLOR: Record<CategoriaTimeline, { bg: string; text: string; border: string; dot: string }> = {
  Constitucional: { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    dot: 'bg-blue-500'    },
  Penal:          { bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',     dot: 'bg-red-500'     },
  Civil:          { bg: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-200',  dot: 'bg-violet-500'  },
  Laboral:        { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-500'   },
  Procesal:       { bg: 'bg-cyan-50',    text: 'text-cyan-700',    border: 'border-cyan-200',    dot: 'bg-cyan-500'    },
  Institucional:  { bg: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-200',    dot: 'bg-teal-500'    },
  Internacional:  { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  Social:         { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200',  dot: 'bg-orange-500'  },
};
