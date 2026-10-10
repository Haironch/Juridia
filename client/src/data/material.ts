// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface Resumen {
  id: string;
  area: string;
  icono: string;
  color: string;
  norma: string;
  decreto: string;
  descripcion: string;
  principios: string[];
  articulos_clave: { numero: string; texto: string }[];
  dato_clave: string;
}

export interface ArticuloClave {
  id: string;
  codigo: string;
  articulo: string;
  texto: string;
  area: string;
  relevancia: string;
}

export interface GuiaPractica {
  id: string;
  titulo: string;
  descripcion: string;
  area: string;
  duracion: string;
  pasos: { numero: number; titulo: string; detalle: string }[];
  requisitos: string[];
  consejo: string;
}

// ─── Resúmenes por Área ───────────────────────────────────────────────────────

export const resumenes: Resumen[] = [
  {
    id: "constitucional",
    area: "Derecho Constitucional",
    icono: "⚖️",
    color: "blue",
    norma: "Constitución Política de la República de Guatemala",
    decreto: "Promulgada el 31 de mayo de 1985 — vigente desde el 14 de enero de 1986",
    descripcion:
      "Es la norma suprema del ordenamiento jurídico guatemalteco. Organiza el Estado, reconoce los derechos fundamentales de las personas y establece los mecanismos para protegerlos. Ninguna ley puede contradecirla (art. 175). Tiene 281 artículos organizados en partes dogmática (derechos) y orgánica (Estado).",
    principios: [
      "Supremacía constitucional (art. 175)",
      "Separación de poderes (art. 141)",
      "Soberanía popular (art. 141)",
      "Estado de Derecho (art. 154)",
      "Derechos inherentes (art. 44)",
      "Prohibición de reelección presidencial (art. 184 — artículo pétreo)",
    ],
    articulos_clave: [
      { numero: "Art. 1", texto: "Protección a la persona y fin supremo: el bien común." },
      { numero: "Art. 4", texto: "Libertad e igualdad. Hombre y mujer iguales ante la ley." },
      { numero: "Art. 6", texto: "Detención legal. Plazo máximo: 6 horas antes de presentar ante juez." },
      { numero: "Art. 12", texto: "Derecho de defensa. Nadie condenado sin ser citado, oído y vencido." },
      { numero: "Art. 15", texto: "Irretroactividad. Excepción: materia penal cuando favorezca al reo." },
      { numero: "Art. 44", texto: "Derechos inherentes no enumerados también son protegidos." },
      { numero: "Art. 141", texto: "Soberanía radica en el pueblo; delegada en tres organismos." },
      { numero: "Art. 175", texto: "Supremacía constitucional. Leyes contrarias son nulas ipso jure." },
      { numero: "Art. 265", texto: "Amparo: protege derechos constitucionales ante actos de autoridad." },
      { numero: "Art. 280", texto: "Reforma constitucional: 2/3 del Congreso + referendo popular." },
    ],
    dato_clave:
      "La Corte de Constitucionalidad (CC) es el tribunal permanente que defiende el orden constitucional. Sus resoluciones en inconstitucionalidad general son vinculantes para todos.",
  },
  {
    id: "penal",
    area: "Derecho Penal",
    icono: "🔒",
    color: "red",
    norma: "Código Penal",
    decreto: "Decreto 17-73 del Congreso de la República",
    descripcion:
      "Regula los delitos y las penas en Guatemala. Define qué conductas son consideradas delitos o faltas y establece las consecuencias para quien las comete. Rige el principio de legalidad: no hay delito sin ley previa que lo defina (nullum crimen sine lege). Se complementa con el Código Procesal Penal (Decreto 51-92) que regula el proceso judicial.",
    principios: [
      "Legalidad: no hay delito sin ley previa (art. 1 CP)",
      "Culpabilidad: no hay pena sin culpa dolosa o culposa",
      "Proporcionalidad de la pena",
      "Presunción de inocencia",
      "Non bis in idem: nadie juzgado dos veces por el mismo hecho",
      "Favorabilidad: ley penal más benigna se aplica retroactivamente",
    ],
    articulos_clave: [
      { numero: "Art. 1 CP", texto: "Legalidad: nadie puede ser penado por hecho no tipificado como delito." },
      { numero: "Art. 8 CP", texto: "Dolo: actúa con dolo quien tiene intención de cometer el delito." },
      { numero: "Art. 9 CP", texto: "Culpa: actúa con culpa quien omite la diligencia debida." },
      { numero: "Art. 13 CP", texto: "Tentativa: inicio de ejecución sin llegar a consumar el delito." },
      { numero: "Art. 23 CP", texto: "Legítima defensa: exime de responsabilidad penal." },
      { numero: "Art. 24 CP", texto: "Estado de necesidad: actuar para evitar un mal mayor." },
      { numero: "Art. 107 CP", texto: "Homicidio: 8 a 15 años de prisión." },
      { numero: "Art. 123 CP", texto: "Asesinato: pena de 25 a 50 años (circunstancias agravantes)." },
      { numero: "Art. 251 CP", texto: "Robo: apoderamiento con violencia o intimidación." },
      { numero: "Art. 52 CP", texto: "Prescripción de la pena: varía según la gravedad del delito." },
    ],
    dato_clave:
      "El Ministerio Público (MP) ejerce la persecución penal pública. El imputado tiene derecho a defensor desde el momento de la detención (art. 92 CPP).",
  },
  {
    id: "civil",
    area: "Derecho Civil",
    icono: "📋",
    color: "green",
    norma: "Código Civil",
    decreto: "Decreto-Ley 106",
    descripcion:
      "Es la norma madre del Derecho Privado guatemalteco. Regula las relaciones entre personas: personalidad jurídica, familia (matrimonio, filiación, adopción), propiedad, contratos, obligaciones y herencia. Es norma supletoria: cuando otra ley especial no regula un caso, se aplica el Código Civil.",
    principios: [
      "Autonomía de la voluntad en contratos",
      "Buena fe en obligaciones y contratos",
      "Enriquecimiento sin causa está prohibido",
      "Responsabilidad por daños y perjuicios (art. 1645)",
      "Igualdad entre herederos de la misma clase",
      "Inviolabilidad de la propiedad privada (art. 39 CPRG)",
    ],
    articulos_clave: [
      { numero: "Art. 1", texto: "Personalidad civil: comienza con el nacimiento y termina con la muerte." },
      { numero: "Art. 88", texto: "Matrimonio: unión de hombre y mujer con efectos civiles." },
      { numero: "Art. 153", texto: "Divorcio: causas establecidas taxativamente en la ley." },
      { numero: "Art. 441", texto: "Propiedad: derecho de usar, disfrutar y disponer de un bien." },
      { numero: "Art. 1517", texto: "Contrato: acuerdo de voluntades que crea obligaciones." },
      { numero: "Art. 1534", texto: "Compraventa: se perfecciona con el acuerdo sobre cosa y precio." },
      { numero: "Art. 1589", texto: "Arrendamiento: uso y goce de bien ajeno mediante precio." },
      { numero: "Art. 1645", texto: "Responsabilidad extracontractual: quien cause daño debe repararlo." },
      { numero: "Art. 1785", texto: "Prescripción ordinaria: 10 años para acciones personales." },
      { numero: "Art. 919", texto: "Sucesión hereditaria: herederos legales y testamentarios." },
    ],
    dato_clave:
      "En Guatemala el matrimonio civil se celebra ante el Registro Civil. Los bienes del matrimonio se rigen por el régimen de comunidad absoluta salvo pacto en contrario (capitulaciones).",
  },
  {
    id: "laboral",
    area: "Derecho Laboral",
    icono: "👷",
    color: "teal",
    norma: "Código de Trabajo",
    decreto: "Decreto 1441 del Congreso de la República",
    descripcion:
      "Regula las relaciones entre trabajadores y empleadores. Tiene carácter tutelar (art. 103 CPRG): sus normas protegen al trabajador como parte más débil. Las prestaciones laborales son mínimas e irrenunciables: cualquier pacto en contrario es nulo. El proceso laboral es oral, público, sencillo y gratuito.",
    principios: [
      "Tutelaridad: protección del trabajador (art. 103 CPRG)",
      "Irrenunciabilidad de derechos laborales",
      "In dubio pro operario: duda se resuelve a favor del trabajador",
      "Continuidad del contrato: se presume indefinido",
      "Oralidad del proceso laboral",
      "Gratuidad de la justicia laboral",
    ],
    articulos_clave: [
      { numero: "Art. 18 CT", texto: "Contrato individual de trabajo: verbal o escrito." },
      { numero: "Art. 82 CT", texto: "Indemnización por despido injustificado: 1 mes por año laborado." },
      { numero: "Art. 88 CT", texto: "Salario: retribución que el empleador paga al trabajador." },
      { numero: "Art. 102 CT", texto: "Aguinaldo: equivalente a un salario mensual, pagado en diciembre." },
      { numero: "Art. 130 CT", texto: "Jornada ordinaria: máximo 8 horas diarias, 44 semanales." },
      { numero: "Art. 126 CT", texto: "Vacaciones: 15 días hábiles después de un año de trabajo." },
      { numero: "Art. 81 CT", texto: "Bonificación Incentivo: Q250 mensuales (Decreto 78-89)." },
      { numero: "Art. 63 CT", texto: "Jornada nocturna: 6 horas diarias, de 18:00 a 06:00." },
      { numero: "Art. 78 CT", texto: "Causas de despido justificado: taxativamente establecidas." },
      { numero: "Art. 279 CT", texto: "Prescripción: 2 años para reclamar derechos laborales." },
    ],
    dato_clave:
      "El Salario Mínimo se fija anualmente por el Gobierno. Existen tres categorías: actividades agrícolas, no agrícolas y exportación/maquila. El Bono 14 (Decreto 42-92) es equivalente a un salario mensual, pagado en julio.",
  },
  {
    id: "mercantil",
    area: "Derecho Mercantil",
    icono: "🏢",
    color: "amber",
    norma: "Código de Comercio",
    decreto: "Decreto 2-70 del Congreso de la República",
    descripcion:
      "Regula los actos de comercio, los comerciantes y las sociedades mercantiles. Las sociedades más comunes son la Sociedad Anónima (SA) y la Sociedad de Responsabilidad Limitada (SRL). También regula los contratos mercantiles, los títulos de crédito (cheques, pagarés, letras de cambio) y los seguros.",
    principios: [
      "Libertad de empresa y comercio",
      "Buena fe mercantil",
      "Literalidad de los títulos de crédito",
      "Autonomía cambiaria",
      "Registro Mercantil como publicidad de actos comerciales",
      "Responsabilidad limitada en sociedades de capital",
    ],
    articulos_clave: [
      { numero: "Art. 10 CM", texto: "Comerciante individual: persona que ejerce el comercio habitualmente." },
      { numero: "Art. 86 CM", texto: "Sociedad Anónima (SA): capital dividido en acciones." },
      { numero: "Art. 87 CM", texto: "SA: socios responden solo hasta el monto de sus acciones." },
      { numero: "Art. 78 CM", texto: "Capital mínimo SA: Q5,000 (actualmente referencial)." },
      { numero: "Art. 386 CM", texto: "Cheque: título de crédito a cargo de un banco." },
      { numero: "Art. 441 CM", texto: "Prescripción del cheque: 6 meses desde la fecha de emisión." },
      { numero: "Art. 294 CM", texto: "Letra de cambio: orden incondicional de pago." },
      { numero: "Art. 490 CM", texto: "Contrato de seguro: cubre riesgos mediante prima." },
      { numero: "Art. 655 CM", texto: "Quiebra: proceso de liquidación de empresa insolvente." },
      { numero: "Art. 338 CM", texto: "Pagaré: promesa incondicional de pagar suma determinada." },
    ],
    dato_clave:
      "El Registro Mercantil es la institución donde se inscriben las empresas y sociedades. Toda sociedad debe inscribirse antes de operar. El número de patente es la identificación oficial del negocio.",
  },
  {
    id: "administrativo",
    area: "Derecho Administrativo",
    icono: "🏛️",
    color: "purple",
    norma: "Ley del Organismo Ejecutivo + Ley de lo Contencioso Administrativo",
    decreto: "Decreto 114-97 y Decreto 119-96",
    descripcion:
      "Regula la organización y funcionamiento de la Administración Pública y sus relaciones con los ciudadanos. Los actos administrativos son las decisiones del Estado: pueden ser impugnados mediante recursos administrativos (revocatoria, reposición) y luego en la vía contencioso-administrativa. La Contraloría General de Cuentas fiscaliza los fondos públicos.",
    principios: [
      "Legalidad: la administración solo puede hacer lo que la ley permite",
      "Eficiencia y eficacia del servicio público",
      "Publicidad de los actos administrativos",
      "Impugnabilidad: todo acto puede recurrirse",
      "Jerarquía administrativa",
      "Responsabilidad patrimonial del Estado (art. 155 CPRG)",
    ],
    articulos_clave: [
      { numero: "Art. 154 CPRG", texto: "Funcionarios: depositarios de la autoridad, sujetos a la ley." },
      { numero: "Art. 155 CPRG", texto: "Derecho de repetición del Estado contra funcionario responsable." },
      { numero: "Art. 252 CPRG", texto: "Procuraduría General de la Nación: asesoría y representación del Estado." },
      { numero: "Art. 232 CPRG", texto: "Contraloría General de Cuentas: fiscalización de fondos públicos." },
      { numero: "Art. 7 LCA", texto: "Plazo para interponer recurso de revocatoria: 3 días hábiles." },
      { numero: "Art. 1 LCCA", texto: "Proceso contencioso-administrativo ante el tribunal especializado." },
      { numero: "Decreto 57-92", texto: "Ley de Contrataciones del Estado (Guatecompras)." },
      { numero: "Decreto 74-87", texto: "Ley de Servicio Civil: relación laboral con el Estado." },
      { numero: "Decreto 57-2008", texto: "Ley de Acceso a la Información Pública." },
      { numero: "Art. 40 CPRG", texto: "Expropiación: por causa de utilidad colectiva, previo pago." },
    ],
    dato_clave:
      "Guatecompras (www.guatecompras.gt) es el sistema de contrataciones del Estado. Toda compra pública superior a Q30,000 debe publicarse allí. La transparencia en el gasto público es un derecho ciudadano (Ley de Acceso a la Información, Decreto 57-2008).",
  },
  {
    id: "tributario",
    area: "Derecho Tributario",
    icono: "💰",
    color: "orange",
    norma: "Código Tributario",
    decreto: "Decreto 6-91 del Congreso de la República",
    descripcion:
      "Regula la relación entre el Estado (SAT) y los contribuyentes. Los principales impuestos en Guatemala son el IVA (12%), el ISR (renta) y el IUSI (inmuebles). Todo tributo debe estar establecido en ley previa. La SAT tiene amplias facultades de fiscalización y puede imponer multas e intereses por incumplimiento.",
    principios: [
      "Legalidad tributaria: no hay tributo sin ley (art. 239 CPRG)",
      "Capacidad contributiva (art. 243 CPRG)",
      "Prohibición de doble tributación (art. 243 CPRG)",
      "Igualdad ante la ley tributaria",
      "Confidencialidad de la información tributaria",
      "Prescripción a favor del contribuyente",
    ],
    articulos_clave: [
      { numero: "Art. 239 CPRG", texto: "Legalidad tributaria: solo el Congreso puede crear impuestos." },
      { numero: "Art. 243 CPRG", texto: "Principio de capacidad de pago; prohíbe doble tributación." },
      { numero: "Art. 31 CT", texto: "Hecho generador: presupuesto legal que da origen a la obligación." },
      { numero: "Art. 35 CT", texto: "Base imponible: monto sobre el que se aplica el tributo." },
      { numero: "Art. 47 CT", texto: "Prescripción: 4 años para que la SAT fiscalice o cobre." },
      { numero: "Art. 102 CT", texto: "Consulta tributaria: el contribuyente puede consultar a la SAT." },
      { numero: "Art. 10 LIVA", texto: "IVA: tasa del 12% sobre ventas y servicios." },
      { numero: "Decreto 10-2012", texto: "ISR: régimen opcional simplificado (5%-7%) o general (25%)." },
      { numero: "Decreto 15-98", texto: "IUSI: impuesto único sobre inmuebles, 0.9% del valor." },
      { numero: "Decreto 73-2008", texto: "ISO: impuesto de solidaridad, 1% de los ingresos brutos trimestrales." },
    ],
    dato_clave:
      "La Factura Electrónica en Línea (FEL) es obligatoria desde 2019 para la mayoría de contribuyentes. Todo ciudadano puede verificar la validez de una factura en el portal de la SAT (portal.sat.gob.gt).",
  },
];

// ─── Artículos Clave (referencia rápida) ────────────────────────────────────

export const articulosClave: ArticuloClave[] = [
  // Constitución
  { id: "c1",  codigo: "CPRG", articulo: "Art. 1",   texto: "El Estado de Guatemala se organiza para proteger a la persona y a la familia; su fin supremo es la realización del bien común.",  area: "Constitucional", relevancia: "Fin del Estado" },
  { id: "c2",  codigo: "CPRG", articulo: "Art. 4",   texto: "En Guatemala todos los seres humanos son libres e iguales en dignidad y derechos. El hombre y la mujer tienen igualdad de oportunidades y responsabilidades.",  area: "Constitucional", relevancia: "Igualdad" },
  { id: "c3",  codigo: "CPRG", articulo: "Art. 6",   texto: "Ninguna persona puede ser detenida o presa, sino por causa de delito o falta. La detención preventiva no podrá exceder de seis horas sin ser puesta a disposición de autoridad judicial.",  area: "Constitucional", relevancia: "Detención legal" },
  { id: "c4",  codigo: "CPRG", articulo: "Art. 12",  texto: "La defensa de la persona y sus derechos son inviolables. Nadie podrá ser condenado, ni privado de sus derechos, sin haber sido citado, oído y vencido en proceso legal ante juez o tribunal competente.",  area: "Constitucional", relevancia: "Debido proceso" },
  { id: "c5",  codigo: "CPRG", articulo: "Art. 15",  texto: "La ley no tiene efecto retroactivo, salvo en materia penal cuando favorezca al reo.",  area: "Constitucional", relevancia: "Irretroactividad" },
  { id: "c6",  codigo: "CPRG", articulo: "Art. 44",  texto: "Los derechos y garantías que otorga la Constitución no excluyen otros que, aunque no figuren expresamente en ella, son inherentes a la persona humana.",  area: "Constitucional", relevancia: "Derechos inherentes" },
  { id: "c7",  codigo: "CPRG", articulo: "Art. 103", texto: "Las leyes que regulan las relaciones entre empleadores y el trabajo son conciliatorias, tutelares para los trabajadores y atenderán a todos los factores económicos y sociales pertinentes.",  area: "Constitucional", relevancia: "Tutela laboral" },
  { id: "c8",  codigo: "CPRG", articulo: "Art. 141", texto: "La soberanía radica en el pueblo quien la delega, para su ejercicio, en los Organismos Legislativo, Ejecutivo y Judicial.",  area: "Constitucional", relevancia: "Soberanía" },
  { id: "c9",  codigo: "CPRG", articulo: "Art. 175", texto: "Ninguna ley podrá contrariar las disposiciones de la Constitución. Las leyes que violen o tergiversen los mandatos constitucionales son nulas ipso jure.",  area: "Constitucional", relevancia: "Supremacía" },
  { id: "c10", codigo: "CPRG", articulo: "Art. 184", texto: "El Presidente no puede ser reelecto. Tampoco podrá ocupar la Presidencia la persona que la hubiere ejercido durante cualquier tiempo.",  area: "Constitucional", relevancia: "No reelección" },
  { id: "c11", codigo: "CPRG", articulo: "Art. 239", texto: "Corresponde con exclusividad al Congreso de la República, decretar impuestos ordinarios y extraordinarios.",  area: "Constitucional", relevancia: "Legalidad tributaria" },
  { id: "c12", codigo: "CPRG", articulo: "Art. 265", texto: "Se instituye el amparo con el fin de proteger a las personas contra las amenazas de violaciones a sus derechos o para restaurar el imperio de los mismos cuando la violación hubiere ocurrido.",  area: "Constitucional", relevancia: "Amparo" },
  // Código Penal
  { id: "p1",  codigo: "C. Penal", articulo: "Art. 1",   texto: "Nadie podrá ser penado por hechos que no estén expresamente calificados, como delitos o faltas, por ley anterior a su perpetración.", area: "Penal", relevancia: "Legalidad penal" },
  { id: "p2",  codigo: "C. Penal", articulo: "Art. 23",  texto: "No es imputable quien actúe en legítima defensa de su persona, bienes o derechos, o en defensa de la persona, bienes o derechos de otra.", area: "Penal", relevancia: "Legítima defensa" },
  { id: "p3",  codigo: "C. Penal", articulo: "Art. 107", texto: "Homicidio: quien mate a otro será sancionado con prisión de 8 a 15 años.", area: "Penal", relevancia: "Homicidio" },
  { id: "p4",  codigo: "C. Penal", articulo: "Art. 123", texto: "Asesinato: quien lo cometa será condenado a prisión de 25 a 50 años.", area: "Penal", relevancia: "Asesinato" },
  // Código Civil
  { id: "cv1", codigo: "C. Civil", articulo: "Art. 1517", texto: "Hay contrato cuando dos o más personas convienen en crear, modificar o extinguir una obligación.", area: "Civil", relevancia: "Contrato" },
  { id: "cv2", codigo: "C. Civil", articulo: "Art. 1534", texto: "La compraventa es un contrato por el cual uno de los contratantes (vendedor) transmite la propiedad de una cosa y se compromete a entregarla, y el otro (comprador) se obliga a pagar el precio en dinero.", area: "Civil", relevancia: "Compraventa" },
  { id: "cv3", codigo: "C. Civil", articulo: "Art. 1589", texto: "El arrendamiento es el contrato por el cual una de las partes se obliga a dar el uso o goce de una cosa por cierto tiempo, a otra que se obliga a pagar por ese uso un precio determinado.", area: "Civil", relevancia: "Arrendamiento" },
  { id: "cv4", codigo: "C. Civil", articulo: "Art. 1645", texto: "Toda persona que cause daño o perjuicio a otra, sea intencionalmente, sea por descuido o imprudencia, está obligada a repararlo.", area: "Civil", relevancia: "Responsabilidad civil" },
  // Código de Trabajo
  { id: "l1",  codigo: "C. Trabajo", articulo: "Art. 82",  texto: "Si el empleador da por terminado el contrato de trabajo sin causa justificada, deberá pagar al trabajador una indemnización equivalente a un mes de salario por cada año de trabajo continuo.", area: "Laboral", relevancia: "Indemnización" },
  { id: "l2",  codigo: "C. Trabajo", articulo: "Art. 130", texto: "La jornada ordinaria de trabajo diurno no puede ser mayor de ocho horas diarias, ni exceder de cuarenta y cuatro horas a la semana.", area: "Laboral", relevancia: "Jornada" },
  { id: "l3",  codigo: "C. Trabajo", articulo: "Art. 126", texto: "Todo trabajador sin excepción, tiene derecho a un período de vacaciones remuneradas después de cada año de trabajo continuo al servicio de un mismo patrono, cuya duración mínima es de quince días hábiles.", area: "Laboral", relevancia: "Vacaciones" },
  { id: "l4",  codigo: "C. Trabajo", articulo: "Art. 102", texto: "Todo patrono está obligado a dar a sus trabajadores en concepto de aguinaldo, el equivalente al cien por ciento del sueldo o salario ordinario mensual.", area: "Laboral", relevancia: "Aguinaldo" },
  // Código Tributario
  { id: "t1",  codigo: "C. Tributario", articulo: "Art. 31", texto: "Hecho generador o hecho imponible es el presupuesto establecido por la ley, para tipificar el tributo y cuya realización origina el nacimiento de la obligación tributaria.", area: "Tributario", relevancia: "Hecho generador" },
  { id: "t2",  codigo: "C. Tributario", articulo: "Art. 47", texto: "El derecho de la Administración Tributaria para hacer verificaciones, ajustes, rectificaciones o determinaciones de las obligaciones tributarias prescribe en cuatro (4) años.", area: "Tributario", relevancia: "Prescripción SAT" },
  // Código de Comercio
  { id: "m1",  codigo: "C. Comercio", articulo: "Art. 87",  texto: "En la Sociedad Anónima, el capital está dividido y representado por acciones. La responsabilidad de cada accionista está limitada al pago de las acciones que hubiere suscrito.", area: "Mercantil", relevancia: "Sociedad Anónima" },
  { id: "m2",  codigo: "C. Comercio", articulo: "Art. 441", texto: "El cheque presentado al cobro después de los plazos que señala la ley —seis meses desde su creación— pierde su acción cambiaria.", area: "Mercantil", relevancia: "Prescripción cheque" },
];

// ─── Guías Prácticas ─────────────────────────────────────────────────────────

export const guias: GuiaPractica[] = [
  {
    id: "amparo",
    titulo: "Cómo interponer un Amparo",
    descripcion:
      "El amparo es la garantía constitucional que protege tus derechos frente a actos arbitrarios de cualquier autoridad. Esta guía explica el proceso paso a paso.",
    area: "Constitucional",
    duracion: "15 min de lectura",
    pasos: [
      {
        numero: 1,
        titulo: "Identifica el acto impugnado",
        detalle:
          "Determina qué acto, resolución u omisión de autoridad está violando o amenazando tus derechos constitucionales. Documenta bien: ¿qué autoridad? ¿qué acto? ¿qué derecho viola?",
      },
      {
        numero: 2,
        titulo: "Contrata a un abogado colegiado",
        detalle:
          "El amparo debe ser presentado con el patrocinio de un abogado activo. El auxilio judicial es obligatorio. Si no tienes recursos, puedes acudir al Instituto de la Defensa Pública Penal o solicitar abogado de oficio.",
      },
      {
        numero: 3,
        titulo: "Presenta la solicitud ante el tribunal competente",
        detalle:
          "La Ley de Amparo establece qué tribunal conoce según el acto impugnado. Actos del Presidente, Congreso o CSJ: ante la CC. Actos de otras autoridades: ante el tribunal de amparo de turno en tu jurisdicción.",
      },
      {
        numero: 4,
        titulo: "Solicita amparo provisional",
        detalle:
          "En la misma solicitud puedes pedir la suspensión provisional del acto mientras se resuelve el fondo. El tribunal debe resolver sobre la provisional de inmediato.",
      },
      {
        numero: 5,
        titulo: "Notificación a la autoridad y diligencias",
        detalle:
          "El tribunal notifica a la autoridad impugnada, quien debe rendir informe circunstanciado. También puede haber audiencias para prueba y alegatos.",
      },
      {
        numero: 6,
        titulo: "Sentencia y recurso",
        detalle:
          "El tribunal dicta sentencia otorgando o denegando el amparo. Si es denegado, puede apelarse ante el tribunal superior. En última instancia, la CC es el máximo tribunal de amparo.",
      },
    ],
    requisitos: [
      "Haber agotado los recursos ordinarios previos (salvo riesgo de daño irreparable)",
      "Patrocinio de abogado colegiado activo",
      "Identificar claramente el acto impugnado y el derecho violado",
      "Presentar dentro del plazo de 30 días desde que se tuvo conocimiento del acto",
    ],
    consejo:
      "El amparo es gratuito, pero la demora puede ser un factor. Si el acto causa daño inminente, solicita amparo provisional al momento de presentar la solicitud para que los efectos del acto se suspendan de inmediato.",
  },
  {
    id: "denuncia-penal",
    titulo: "Cómo presentar una Denuncia Penal",
    descripcion:
      "Si eres víctima de un delito, tienes derecho a denunciarlo. Esta guía explica cómo hacerlo correctamente ante el Ministerio Público.",
    area: "Penal",
    duracion: "10 min de lectura",
    pasos: [
      {
        numero: 1,
        titulo: "Acude al MP más cercano o a la PNC",
        detalle:
          "Puedes presentar la denuncia ante el Ministerio Público (oficinas en toda la república) o ante cualquier delegación de la Policía Nacional Civil. También existe la opción de denunciar en línea a través del portal del MP.",
      },
      {
        numero: 2,
        titulo: "Relata los hechos con precisión",
        detalle:
          "Describe qué ocurrió, cuándo, dónde y quién fue el responsable (si lo conoces). Sé preciso: fecha, hora, lugar, descripción del hecho y del presunto responsable.",
      },
      {
        numero: 3,
        titulo: "Presenta las pruebas que tengas",
        detalle:
          "Fotos, videos, mensajes, testigos, documentos: todo lo que respalde tu denuncia. No estás obligado a tener pruebas para denunciar, pero ayudan a la investigación.",
      },
      {
        numero: 4,
        titulo: "Recibe el número de expediente",
        detalle:
          "Al finalizar, el MP te entregará un número de caso. Guárdalo: con él puedes dar seguimiento a tu denuncia en el portal del MP.",
      },
      {
        numero: 5,
        titulo: "Seguimiento de la investigación",
        detalle:
          "El MP tiene la obligación de investigar. Puedes preguntar por el estado de tu caso. Si crees que no se está investigando adecuadamente, puedes acudir al PDH o contratar un abogado querellante adhesivo.",
      },
    ],
    requisitos: [
      "Documento de identificación (DPI o pasaporte)",
      "Descripción del hecho delictivo",
      "Pruebas disponibles (opcionales pero útiles)",
      "No se requiere abogado para presentar la denuncia inicial",
    ],
    consejo:
      "No esperes demasiado: algunos delitos tienen plazos de prescripción. Si el delito es contra la vida o integridad física, reporta primero a la PNC para asegurar la escena y solicitar atención médica si es necesario.",
  },
  {
    id: "sociedad-anonima",
    titulo: "Cómo constituir una Sociedad Anónima",
    descripcion:
      "La SA es la forma societaria más común en Guatemala. Limita la responsabilidad de los socios al capital aportado. Esta guía explica el proceso de constitución.",
    area: "Mercantil",
    duracion: "12 min de lectura",
    pasos: [
      {
        numero: 1,
        titulo: "Define la estructura societaria",
        detalle:
          "Determina: capital social (mínimo teórico Q5,000, aunque en la práctica se recomienda más), número de socios (mínimo 2), distribución de acciones y objeto social (a qué se dedicará la empresa).",
      },
      {
        numero: 2,
        titulo: "Acude a un Notario",
        detalle:
          "El acto constitutivo de la SA debe ser otorgado en Escritura Pública ante Notario. El notario redacta los estatutos, el acta constitutiva y verifica que todo cumpla con el Código de Comercio.",
      },
      {
        numero: 3,
        titulo: "Inscripción en el Registro Mercantil",
        detalle:
          "El notario presenta la escritura ante el Registro Mercantil. Este emite la patente de comercio de sociedad. Este trámite puede hacerse en línea a través del portal del Registro Mercantil (registromercantil.gob.gt).",
      },
      {
        numero: 4,
        titulo: "Inscripción en el Registro Tributario Unificado (RTU/SAT)",
        detalle:
          "Con la patente de comercio, inscribe la sociedad ante la SAT para obtener el Número de Identificación Tributaria (NIT). Debes elegir el régimen de ISR y activar el régimen de IVA.",
      },
      {
        numero: 5,
        titulo: "Habilitación de libros contables",
        detalle:
          "La ley exige llevar libros de contabilidad (diario, mayor, inventario, estados financieros). Deben ser habilitados ante la SAT o llevarse en sistema electrónico autorizado.",
      },
      {
        numero: 6,
        titulo: "Licencias y permisos específicos",
        detalle:
          "Según el giro del negocio, puedes necesitar licencias adicionales: sanitaria (MSPAS), ambiental (MARN), municipal, entre otras.",
      },
    ],
    requisitos: [
      "Mínimo 2 socios fundadores",
      "Capital social definido y suscrito",
      "Objeto social determinado",
      "Notario para el acto constitutivo",
      "DPI vigente de todos los socios",
    ],
    consejo:
      "Desde 2023 el Registro Mercantil permite la constitución en línea de forma simplificada. El trámite completo (escritura + inscripción + SAT) puede tomar entre 1 y 4 semanas dependiendo de la carga del Registro.",
  },
  {
    id: "contrato-trabajo",
    titulo: "Aspectos clave del Contrato de Trabajo",
    descripcion:
      "Conoce tus derechos y obligaciones al firmar un contrato laboral en Guatemala. Lo que debe incluir y qué cláusulas son ilegales.",
    area: "Laboral",
    duracion: "10 min de lectura",
    pasos: [
      {
        numero: 1,
        titulo: "Exige el contrato por escrito",
        detalle:
          "Aunque el contrato verbal es válido en Guatemala, el escrito te protege mejor. El empleador está obligado a darte una copia. Si no hay contrato escrito, la ley presume que es por tiempo indefinido.",
      },
      {
        numero: 2,
        titulo: "Verifica que incluya los elementos mínimos",
        detalle:
          "Todo contrato debe indicar: nombre de las partes, cargo y descripción de funciones, salario (nunca inferior al mínimo legal), jornada de trabajo, lugar de trabajo y fecha de inicio.",
      },
      {
        numero: 3,
        titulo: "Conoce las prestaciones irrenunciables",
        detalle:
          "Por ley tienes derecho a: vacaciones (15 días/año), aguinaldo (1 salario en diciembre), Bono 14 (1 salario en julio), indemnización por despido injustificado (1 mes/año), IGSS (seguro social).",
      },
      {
        numero: 4,
        titulo: "Identifica cláusulas ilegales",
        detalle:
          "Son nulas las cláusulas que: reduzcan derechos mínimos legales, exijan renuncia a prestaciones, discriminen por género, etnia o estado civil, prohíban organizarse sindicalmente, o impongan multas excesivas.",
      },
      {
        numero: 5,
        titulo: "Ante un despido injustificado",
        detalle:
          "Si te despiden sin causa justificada, tienes derecho a liquidación completa: indemnización (1 mes/año), vacaciones proporcionales, aguinaldo proporcional, Bono 14 proporcional. Tienes 2 años para reclamar.",
      },
    ],
    requisitos: [
      "DPI del trabajador",
      "El contrato puede ser verbal o escrito (mejor escrito)",
      "No se requiere abogado para firmar el contrato",
      "Para reclamar ante el MINTRAB o tribunales, sí es recomendable abogado",
    ],
    consejo:
      "Ante un conflicto laboral, puedes acudir primero a la Inspección General de Trabajo del MINTRAB de forma gratuita. Si no se resuelve, el proceso ante los Juzgados de Trabajo también es gratuito.",
  },
  {
    id: "recurso-revocatoria",
    titulo: "Cómo impugnar un Acto Administrativo",
    descripcion:
      "Si el Estado te niega un trámite, te impone una sanción o dicta una resolución que consideras ilegal, tienes derecho a impugnarla. Esta guía explica los recursos disponibles.",
    area: "Administrativo",
    duracion: "12 min de lectura",
    pasos: [
      {
        numero: 1,
        titulo: "Recibe y analiza la resolución",
        detalle:
          "Toda resolución administrativa debe notificarse por escrito. Léela con cuidado: identifica qué se decide, los fundamentos legales invocados y si incluye información sobre recursos disponibles.",
      },
      {
        numero: 2,
        titulo: "Recurso de Revocatoria (3 días hábiles)",
        detalle:
          "Se interpone ante el mismo órgano que dictó la resolución, dentro de los 3 días hábiles siguientes a la notificación. Solicitas que el propio órgano revise y revoque su decisión.",
      },
      {
        numero: 3,
        titulo: "Recurso de Reposición (3 días hábiles)",
        detalle:
          "Si la revocatoria fue resuelta por el superior jerárquico o si no hay superior, puedes interponer reposición. También dentro de 3 días hábiles.",
      },
      {
        numero: 4,
        titulo: "Proceso Contencioso-Administrativo",
        detalle:
          "Si agotaste los recursos administrativos y la resolución sigue en tu contra, puedes impugnarla ante los Tribunales de lo Contencioso-Administrativo. Aquí sí necesitas abogado. El plazo es de 3 meses.",
      },
      {
        numero: 5,
        titulo: "Amparo como última instancia",
        detalle:
          "Si el acto administrativo viola derechos constitucionales y los recursos ordinarios no resolvieron, puedes interponer amparo. Es el mecanismo de mayor jerarquía.",
      },
    ],
    requisitos: [
      "Notificación escrita del acto administrativo",
      "Respetar estrictamente los plazos (3 días hábiles)",
      "Para el contencioso-administrativo: abogado obligatorio",
      "Para recurso de revocatoria: no es obligatorio abogado",
    ],
    consejo:
      "Los plazos en Derecho Administrativo son muy cortos (3 días) y fatales: si los dejas pasar, el acto queda firme y ya no puedes impugnarlo. Ante cualquier resolución que te perjudique, consulta a un abogado de inmediato.",
  },
];

export const AREAS_FILTRO = [
  "Todas",
  "Constitucional",
  "Penal",
  "Civil",
  "Laboral",
  "Mercantil",
  "Administrativo",
  "Tributario",
] as const;
