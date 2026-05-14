export interface PreguntaCaso {
  id: number;
  pregunta: string;
  opciones: string[];
  correcta: number; // índice 0-based
  explicacion: string;
}

export interface CasoPractico {
  id: string;
  titulo: string;
  area: string;
  dificultad: 'Básico' | 'Intermedio' | 'Avanzado';
  descripcion: string;
  hechos: string;
  normativa: string[]; // leyes relevantes
  preguntas: PreguntaCaso[];
}

export const casosPracticos: CasoPractico[] = [
  {
    id: 'despido-injustificado-laboral',
    titulo: 'El Despido Sin Causa Justificada',
    area: 'Laboral',
    dificultad: 'Básico',
    descripcion: 'Un trabajador es despedido verbalmente sin recibir carta de despido ni el pago de sus prestaciones laborales.',
    hechos: `Pedro Ramírez trabajó durante 3 años y 4 meses como cajero en una tienda de abarrotes en la Ciudad de Guatemala. El día lunes 5 de enero, su jefe le dijo verbalmente: "Ya no necesitamos tus servicios, puedes irte." No se le entregó carta de despido, no se le explicó ninguna causa, y al solicitar su liquidación, el empleador se negó a pagarla argumentando que Pedro había cometido errores en las cuentas el mes anterior.

Pedro nunca recibió ninguna amonestación escrita, ni sanción disciplinaria durante sus 3 años de trabajo. Gana Q3,200 mensuales. Ahora busca asesoría legal para saber qué le corresponde y cómo proceder.`,
    normativa: ['Código de Trabajo de Guatemala (Decreto 1441)', 'Arts. 76-82 (Terminación de contratos)', 'Art. 88 (Indemnización)'],
    preguntas: [
      {
        id: 1,
        pregunta: '¿Cómo se clasifica el despido de Pedro según el Código de Trabajo de Guatemala?',
        opciones: [
          'Despido justificado, porque el empleador mencionó errores en cuentas',
          'Despido injustificado, porque no hubo causa legal demostrada ni amonestaciones previas',
          'Renuncia voluntaria, porque Pedro se fue sin resistencia',
          'Abandono de trabajo, porque no regresó al día siguiente',
        ],
        correcta: 1,
        explicacion: 'Es un despido injustificado. El Código de Trabajo (art. 77) exige causas específicas y comprobables para justificar un despido. El empleador no puede alegar causas sin haberlas comunicado formalmente. Las amonestaciones previas son requisito en casos de indisciplina, y aquí nunca existieron.',
      },
      {
        id: 2,
        pregunta: '¿Qué prestaciones le corresponden a Pedro tras 3 años y 4 meses de trabajo?',
        opciones: [
          'Solo aguinaldo proporcional, porque fue despedido',
          'Indemnización + bono 14 proporcional + aguinaldo proporcional + vacaciones proporcionales',
          'Nada, porque el empleador alega que cometió errores',
          'Solo el salario pendiente del mes en curso',
        ],
        correcta: 1,
        explicacion: 'En un despido injustificado, el trabajador tiene derecho a: (1) Indemnización equivalente a un mes de salario por cada año trabajado (art. 88 CT); (2) Bono 14 proporcional; (3) Aguinaldo proporcional; (4) Vacaciones proporcionales no gozadas. El argumento del empleador no tiene validez legal sin documentación y proceso formal.',
      },
      {
        id: 3,
        pregunta: '¿Cuánto le corresponde a Pedro por concepto de indemnización?',
        opciones: [
          'Q3,200 (un mes de salario fijo, independiente del tiempo trabajado)',
          'Q10,666.67 (3.33 meses × Q3,200)',
          'Q6,400 (dos meses por ser empleado de confianza)',
          'Q0, porque el empleador puede descontar los errores cometidos',
        ],
        correcta: 1,
        explicacion: '3 años y 4 meses = 3.33 años. La indemnización es 1 mes de salario por año trabajado: 3.33 × Q3,200 = Q10,666.67. El empleador no puede descontar deudas de la indemnización sin un proceso judicial previo que lo demuestre.',
      },
      {
        id: 4,
        pregunta: '¿Ante qué institución debe acudir Pedro para reclamar sus prestaciones?',
        opciones: [
          'Tribunal de lo Contencioso Administrativo',
          'Ministerio Público (MP)',
          'Inspección General de Trabajo o Juzgado de Trabajo y Previsión Social',
          'Sala de lo Civil de la Corte de Apelaciones',
        ],
        correcta: 2,
        explicacion: 'Los conflictos laborales individuales se ventilan ante la Inspección General de Trabajo (vía conciliatoria y gratuita) o directamente ante los Juzgados de Trabajo y Previsión Social. El MP interviene solo en materia penal, y los tribunales contencioso-administrativos son para conflictos con el Estado.',
      },
      {
        id: 5,
        pregunta: '¿Cuánto tiempo tiene Pedro para reclamar sus prestaciones laborales?',
        opciones: [
          '30 días calendario desde el despido',
          '2 años contados desde que las obligaciones son exigibles (prescripción laboral)',
          '6 meses, de lo contrario prescribe su derecho',
          'Sin límite de tiempo, los derechos laborales no prescriben',
        ],
        correcta: 1,
        explicacion: 'El art. 264 del Código de Trabajo establece que las acciones y derechos provenientes del trabajo prescriben en 2 años contados desde que pudieron ejercitarse. Pedro tiene hasta 2 años para interponer su demanda o acudir a conciliación.',
      },
    ],
  },

  {
    id: 'legitima-defensa-penal',
    titulo: 'El Incidente en la Tienda',
    area: 'Penal',
    dificultad: 'Intermedio',
    descripcion: 'Un comerciante repele con violencia a un ladrón que lo amenaza con arma blanca. El caso llega al MP y se discute si existe legítima defensa.',
    hechos: `Don Carlos Méndez, de 52 años, atiende su ferretería en Mixco. A las 9:00 PM del sábado, un hombre encapuchado ingresa al local blandiendo un cuchillo y exige que le entregue el dinero de la caja. Don Carlos, al intentar dar la vuelta al mostrador para escapar, tropieza. El asaltante se abalanza sobre él con el cuchillo en mano. Don Carlos toma lo primero que encuentra a su alcance —una llave de tubo metálica— y golpea al asaltante en el brazo y en la cabeza. El asaltante cae inconsciente y posteriormente es hospitalizado con fractura de cráneo.

El Ministerio Público inicia investigación contra Don Carlos por lesiones graves. Don Carlos declara que actuó únicamente para salvar su vida. Hay cámaras de seguridad que registraron todo el incidente. No hubo testigos presenciales adicionales.`,
    normativa: ['Código Penal de Guatemala (Decreto 17-73)', 'Art. 24 (Causas de justificación)', 'Art. 26 (Legítima defensa)', 'Art. 130 (Lesiones graves)'],
    preguntas: [
      {
        id: 1,
        pregunta: '¿Qué figura jurídico-penal describe mejor la situación de Don Carlos?',
        opciones: [
          'Lesiones dolosas agravadas, porque usó un objeto contundente',
          'Legítima defensa, como causa de justificación que excluye la responsabilidad penal',
          'Estado de necesidad, porque no había otra salida',
          'Exceso de legítima defensa, porque el golpe en la cabeza fue desproporcionado',
        ],
        correcta: 1,
        explicacion: 'El art. 24 del CP de Guatemala establece causas de justificación, entre ellas la legítima defensa (art. 26). Esta requiere: (1) agresión ilegítima, (2) necesidad racional del medio empleado, (3) falta de provocación suficiente. Los tres elementos parecen presentes: el asaltante agredió con arma, la respuesta fue con lo disponible en el momento, y Don Carlos no provocó el ataque.',
      },
      {
        id: 2,
        pregunta: '¿Cuál de estos requisitos de la legítima defensa podría ser cuestionado por el MP?',
        opciones: [
          'La agresión ilegítima, porque el asaltante solo pedía dinero',
          'La necesidad racional del medio empleado, discutiendo si el nivel de fuerza fue proporcional',
          'La falta de provocación, argumentando que Don Carlos debió obedecer al asaltante',
          'La identidad del agresor, porque estaba encapuchado',
        ],
        correcta: 1,
        explicacion: 'El MP normalmente cuestionará la proporcionalidad del medio usado. Aunque Don Carlos tenía derecho a defenderse, el MP puede argumentar que golpear en la cabeza —zona vital— con una llave de tubo excedió lo "racionalmente necesario" para repeler la agresión. La defensa deberá demostrar que en el momento, con el agresor encima y el cuchillo presente, no había forma de medir exactamente la fuerza usada.',
      },
      {
        id: 3,
        pregunta: '¿Qué papel juegan las grabaciones de las cámaras de seguridad en este caso?',
        opciones: [
          'Ninguno, porque la evidencia visual no es admisible en tribunales guatemaltecos',
          'Son prueba fundamental que puede acreditar la secuencia de los hechos y la agresión previa del asaltante',
          'Solo sirven para identificar al asaltante, no para eximir a Don Carlos',
          'Son inadmisibles porque fueron obtenidas sin autorización judicial',
        ],
        correcta: 1,
        explicacion: 'Las grabaciones de cámaras de seguridad son admisibles como prueba documental/pericial en el proceso penal guatemalteco (CPP art. 186). En este caso son cruciales porque pueden demostrar cronológicamente: quién agredió primero, que el asaltante portaba arma, que Don Carlos intentó escapar, y que respondió solo cuando fue atacado directamente.',
      },
      {
        id: 4,
        pregunta: 'Si el juez concluye que hubo exceso en la legítima defensa, ¿qué consecuencia tiene eso?',
        opciones: [
          'Don Carlos es absuelto completamente, igual que en legítima defensa plena',
          'Don Carlos responde penalmente, pero el exceso puede ser considerado como atenuante de la pena',
          'Don Carlos recibe la misma pena que si hubiera actuado con premeditación',
          'El caso se cierra automáticamente al comprobarse cualquier tipo de legítima defensa',
        ],
        correcta: 1,
        explicacion: 'El exceso en la legítima defensa no elimina la responsabilidad penal, pero el art. 26 y 29 del Código Penal lo reconocen como circunstancia atenuante. El juez puede reducir significativamente la pena al valorar que, aunque la reacción fue excesiva, partió de una situación real de peligro para la vida.',
      },
    ],
  },

  {
    id: 'discriminacion-embarazo',
    titulo: 'Despido por Embarazo',
    area: 'Constitucional / Laboral',
    dificultad: 'Intermedio',
    descripcion: 'Una trabajadora es despedida al informar a su empleador que está embarazada. Se analiza la protección constitucional e inamovilidad laboral.',
    hechos: `María González, de 28 años, lleva 14 meses trabajando como asistente administrativa en una empresa de logística. El 10 de marzo informa a su jefe directo que está embarazada (8 semanas de gestación). Tres días después, recibe una carta de despido con la justificación de "reestructuración organizacional" y se le ofrece una liquidación equivalente a dos semanas de salario (Q800).

María sospecha que el despido está relacionado con su embarazo. Consultó con compañeras y descubrió que nadie más fue despedido en la "reestructuración". Su salario mensual es de Q1,600. Busca saber si tiene protección legal y qué puede hacer.`,
    normativa: [
      'Constitución Política de la República de Guatemala (Art. 102 literal k)',
      'Código de Trabajo Art. 151 (Inamovilidad por maternidad)',
      'Convenio 183 OIT (ratificado por Guatemala)',
    ],
    preguntas: [
      {
        id: 1,
        pregunta: '¿Qué protección especial otorga la ley guatemalteca a las trabajadoras embarazadas?',
        opciones: [
          'Solo tienen derecho al descanso pre y postnatal, pero pueden ser despedidas con liquidación normal',
          'Gozan de inamovilidad desde que el embarazo es confirmado médicamente hasta 10 meses después del parto',
          'Están protegidas únicamente si llevan más de 2 años en la empresa',
          'La protección aplica solo en empresas del sector público',
        ],
        correcta: 1,
        explicacion: 'El art. 151 del Código de Trabajo y el art. 102 literal k) de la Constitución garantizan inamovilidad a la trabajadora embarazada. Esta protección inicia desde que se confirma el estado de embarazo y se extiende hasta 10 meses después del parto. El empleador no puede despedirla durante este período salvo causa justificada demostrada judicialmente.',
      },
      {
        id: 2,
        pregunta: '¿Es válido el despido de María con la justificación de "reestructuración organizacional"?',
        opciones: [
          'Sí, si la empresa tiene problemas económicos puede despedir a quien quiera',
          'Sí, siempre que se le pague la liquidación completa',
          'No, porque durante el período de inamovilidad el despido requiere autorización judicial previa, independientemente de la causa',
          'Depende de si la empresa tiene más de 10 empleados',
        ],
        correcta: 2,
        explicacion: 'Durante el período de inamovilidad, para que un despido sea legal —incluso por causa justificada— el empleador DEBE solicitar autorización al juez de trabajo antes de despedir a la trabajadora. Si no obtuvo esa autorización, el despido es ilegal independientemente de la justificación dada. En este caso, el patrón actuó directamente sin autorización judicial.',
      },
      {
        id: 3,
        pregunta: '¿Qué recurso legal inmediato puede ejercer María para proteger su trabajo?',
        opciones: [
          'Presentar una denuncia ante el MP por discriminación',
          'Solicitar reinstalación ante el Juzgado de Trabajo, ya que el despido violó su inamovilidad',
          'Acudir al IGSS para que le paguen el seguro de maternidad',
          'Interponer un recurso de amparo ante la Corte de Constitucionalidad directamente',
        ],
        correcta: 1,
        explicacion: 'El primer paso es solicitar la reinstalación ante el Juzgado de Trabajo y Previsión Social. Si el juez comprueba la inamovilidad y que no hubo autorización judicial para el despido, puede ordenar la reinstalación inmediata y el pago de salarios caídos durante el período de la separación ilegal. Esto es urgente y la ley contempla medidas cautelares para protegerla.',
      },
      {
        id: 4,
        pregunta: '¿Qué debe hacer María para fortalecer su caso legal?',
        opciones: [
          'Solo necesita la carta de despido para ganar el caso automáticamente',
          'Documentar: constancia médica del embarazo, carta de despido, evidencia de que no hubo reestructuración real (ningún otro despido), y cualquier comunicación interna',
          'Renunciar formalmente para poder demandar por despido injustificado',
          'Esperar 30 días para ver si el empleador la llama de regreso',
        ],
        correcta: 1,
        explicacion: 'Para probar el despido discriminatorio María necesita: (1) Constancia médica o de ginecólogo que acredite el embarazo y la fecha en que inició; (2) La carta de despido; (3) Evidencia de que la "reestructuración" fue pretexto (declaraciones de compañeros, organigramas, correos internos); (4) Registro de la comunicación del embarazo al empleador. Entre más documentación, más sólido el caso.',
      },
    ],
  },

  {
    id: 'contrato-arrendamiento-incumplido',
    titulo: 'El Arrendatario que No Paga',
    area: 'Civil',
    dificultad: 'Básico',
    descripcion: 'Un propietario enfrenta a un inquilino que lleva 3 meses sin pagar la renta y se niega a desalojar el inmueble.',
    hechos: `La señora Rosa Pérez es propietaria de un apartamento en zona 11, Ciudad de Guatemala. En febrero suscribió un contrato de arrendamiento por Q2,500 mensuales con el señor Julio Herrera, por un plazo de un año. El contrato fue firmado ante notario e incluye cláusula de desahucio por falta de pago.

Julio pagó puntualmente los primeros 2 meses. Desde abril no ha pagado nada, alegando que perdió su trabajo. Ya han pasado 3 meses sin pago (Q7,500 en mora). Rosa le ha pedido que se vaya pero Julio se niega, argumentando que "tiene derecho a quedarse" y que el desalojo no puede hacerse "de la noche a la mañana". Rosa quiere recuperar su propiedad y el dinero adeudado.`,
    normativa: [
      'Código Civil de Guatemala (Decreto Ley 106)',
      'Arts. 1880-1940 (Arrendamiento)',
      'Código Procesal Civil y Mercantil - Juicio de desahucio',
      'Art. 237 CPCM (Desahucio por falta de pago)',
    ],
    preguntas: [
      {
        id: 1,
        pregunta: '¿Puede Rosa sacar a Julio del apartamento por su propia cuenta sin proceso legal?',
        opciones: [
          'Sí, si Julio no paga, Rosa puede cambiar la cerradura y sacar sus cosas',
          'Sí, si el contrato tiene cláusula de desahucio, Rosa puede proceder directamente',
          'No, el desalojo por iniciativa propia (autotutela) es ilegal y puede constituir delito de allanamiento',
          'Sí, pero debe avisarle con 15 días de anticipación',
        ],
        correcta: 2,
        explicacion: 'En Guatemala, hacer justicia por mano propia está prohibido. Rosa NO puede cambiar la cerradura, cortar servicios o sacar las pertenencias de Julio. Hacerlo podría configurar el delito de violación de domicilio (art. 206 CP). Debe acudir al proceso legal de desahucio o arrendamiento ante los tribunales civiles.',
      },
      {
        id: 2,
        pregunta: '¿Cuál es la vía legal más adecuada para que Rosa recupere su inmueble?',
        opciones: [
          'Demanda ordinaria civil por incumplimiento de contrato (proceso largo)',
          'Juicio de desahucio ante Juzgado de Primera Instancia Civil, que es un proceso sumario más rápido',
          'Denuncia penal ante el Ministerio Público por estafa',
          'Solicitud de amparo ante la Corte de Constitucionalidad',
        ],
        correcta: 1,
        explicacion: 'El juicio de desahucio (arts. 234-241 CPCM) es el proceso idóneo: es sumario (más rápido que el ordinario), específico para recuperar inmuebles arrendados por falta de pago. El contrato notariado con cláusula de desahucio es un título ejecutivo que facilita el proceso. El MP no interviene porque no hay delito penal en el simple incumplimiento de arrendamiento.',
      },
      {
        id: 3,
        pregunta: '¿Puede Rosa reclamar al mismo tiempo el desalojo y los Q7,500 de rentas adeudadas?',
        opciones: [
          'No, debe hacer dos demandas separadas en juzgados distintos',
          'Sí, puede acumular en la misma demanda de desahucio la pretensión de cobro de rentas vencidas',
          'Solo puede cobrar las rentas después de que Julio haya desalojado',
          'No, los Q7,500 se pierden automáticamente al iniciar el desahucio',
        ],
        correcta: 1,
        explicacion: 'La ley permite acumular en el juicio de desahucio el cobro de las rentas vencidas e impagas. Rosa puede en la misma demanda pedir: (1) El desalojo del inmueble, y (2) El pago de Q7,500 en rentas adeudadas más los intereses correspondientes. Esto ahorra tiempo y evita iniciar dos procesos separados.',
      },
      {
        id: 4,
        pregunta: 'El contrato fue firmado ante notario. ¿Qué ventaja procesal le da esto a Rosa?',
        opciones: [
          'Ninguna, el proceso es igual que con un contrato privado',
          'Le permite cobrar directamente en el banco de Julio sin necesidad de juicio',
          'El instrumento público tiene plena fe y valor probatorio, y puede usarse como título ejecutivo para iniciar proceso de ejecución en vía de apremio',
          'Solo sirve para demostrar que el contrato existió, no para acelerar el cobro',
        ],
        correcta: 2,
        explicacion: 'El contrato notariado (escritura pública o acta notarial) tiene plena fe pública conforme al Código de Notariado. Esto significa que su autenticidad no puede ser cuestionada fácilmente. Además, puede constituir título ejecutivo si contiene obligación de pagar cantidad líquida y exigible, permitiendo el cobro por vía ejecutiva (más rápida) en lugar de proceso ordinario.',
      },
    ],
  },

  {
    id: 'derechos-consumidor-producto-defectuoso',
    titulo: 'El Producto Defectuoso',
    area: 'Civil / Administrativo',
    dificultad: 'Básico',
    descripcion: 'Un consumidor compra un electrodoméstico que falla a los 10 días. La tienda se niega a hacer la devolución o el cambio del producto.',
    hechos: `Roberto López compró una lavadora en una tienda de electrodomésticos por Q4,800, pagando al contado. A los 10 días de uso normal el motor de la lavadora dejó de funcionar. Roberto volvió a la tienda con su factura y el empaque original para solicitar el cambio o la devolución del dinero.

El encargado de la tienda le dijo que "las políticas de la empresa no permiten devoluciones" y que debía llevar la lavadora al servicio técnico del fabricante (que queda en otra ciudad). Roberto considera que un producto que falló en 10 días no puede ser un problema del usuario, y quiere saber qué derechos tiene.`,
    normativa: [
      'Ley de Protección al Consumidor y Usuario (Decreto 006-2003)',
      'Arts. 18-22 (Garantías)',
      'Art. 47 (Denuncias ante DIACO)',
      'Código Civil Art. 1543 (Vicios redhibitorios)',
    ],
    preguntas: [
      {
        id: 1,
        pregunta: '¿Tiene Roberto derecho legal a que le cambien la lavadora o le devuelvan el dinero?',
        opciones: [
          'No, porque las políticas de la empresa prevalecen sobre la ley',
          'Solo si puede demostrar que él no causó el daño',
          'Sí, la Ley de Protección al Consumidor garantiza el derecho a productos que funcionen correctamente y a reparación, sustitución o devolución cuando presentan defectos',
          'Solo si el defecto era visible al momento de la compra',
        ],
        correcta: 2,
        explicacion: 'La Ley de Protección al Consumidor y Usuario (Decreto 006-2003) garantiza que los productos no presenten defectos que afecten su funcionamiento. Un producto que falla a los 10 días de uso normal claramente tiene un defecto de fabricación o garantía. Las "políticas de la empresa" no pueden estar por encima de la ley y no pueden limitar los derechos mínimos del consumidor.',
      },
      {
        id: 2,
        pregunta: '¿Cuánto tiempo de garantía mínima contempla la ley guatemalteca para electrodomésticos?',
        opciones: [
          'No existe garantía legal mínima, depende de lo que ofrezca el vendedor',
          '30 días calendario desde la compra',
          'La garantía mínima es de al menos el tiempo que razonablemente se esperaría que el producto funcione según su naturaleza; la ley exige garantía contra vicios ocultos',
          '6 meses obligatorios para cualquier producto',
        ],
        correcta: 2,
        explicacion: 'La Ley de Protección al Consumidor y el Código Civil (vicios redhibitorios, art. 1543) establecen que el vendedor responde por los defectos ocultos que hagan el bien impropio para su uso. Una lavadora que falla en 10 días claramente tenía un vicio previo a la venta. Además, la garantía ofrecida por el fabricante también es exigible legalmente.',
      },
      {
        id: 3,
        pregunta: '¿Ante qué institución puede Roberto presentar una denuncia formal?',
        opciones: [
          'Solo ante los tribunales civiles, lo que puede tardar años',
          'Ante la DIACO (Dirección de Atención y Asistencia al Consumidor) del Ministerio de Economía, de forma gratuita',
          'Ante el Ministerio Público por estafa',
          'Ante la SAT, para que investiguen si la tienda emitió bien la factura',
        ],
        correcta: 1,
        explicacion: 'La DIACO es la institución específica para proteger los derechos del consumidor en Guatemala. Roberto puede presentar su denuncia de forma gratuita, adjuntando: factura de compra, descripción del defecto y prueba de que la tienda se negó a resolver. La DIACO puede citar al proveedor, mediar en el conflicto y aplicar sanciones administrativas si la tienda viola la ley.',
      },
      {
        id: 4,
        pregunta: '¿Qué documentos debe reunir Roberto antes de presentar su reclamo?',
        opciones: [
          'Solo la factura original es suficiente para cualquier reclamo',
          'Factura de compra, descripción escrita del defecto y cuándo se presentó, evidencia de la negativa de la tienda (testigos o correos), y fotos o video del producto defectuoso',
          'Necesita un dictamen de un perito judicial antes de hacer cualquier reclamo',
          'No necesita documentos, la ley presume a favor del consumidor automáticamente',
        ],
        correcta: 1,
        explicacion: 'Para un reclamo sólido Roberto debe documentar todo: (1) Factura o comprobante de compra (demuestra cuándo compró y cuánto pagó); (2) Fotos/video del producto defectuoso; (3) Registro de la fecha en que apareció el defecto; (4) Prueba de la negativa de la tienda (puede ser testigos, correo electrónico, WhatsApp o un escrito firmado). Cuanto más documentado, más fuerte es el caso ante DIACO o en tribunales.',
      },
    ],
  },

  {
    id: 'violencia-intrafamiliar-medidas',
    titulo: 'Medidas de Seguridad por Violencia en el Hogar',
    area: 'Familia / Penal',
    dificultad: 'Avanzado',
    descripcion: 'Una mujer víctima de violencia intrafamiliar busca protección legal urgente. Se analizan las medidas de seguridad disponibles y el proceso para obtenerlas.',
    hechos: `Ana Ruiz, de 34 años, vive con su esposo Jorge desde hace 8 años en Guatemala ciudad. Durante los últimos 2 años, Jorge ha ejercido violencia física y psicológica contra Ana: insultos constantes, control de su dinero y movimientos, y en 3 ocasiones golpes que le dejaron moretones visibles. Ana tiene dos hijos de 6 y 9 años.

La semana pasada, Jorge la amenazó con un cuchillo y le dijo que si intentaba irse "la mataría a ella y a los niños". Ana está aterrorizada. Una vecina le sugirió que busque ayuda legal, pero Ana no sabe cómo funciona el sistema y tiene miedo de que si denuncia, Jorge se enoje más. No tiene dinero para contratar un abogado privado.`,
    normativa: [
      'Ley para Prevenir, Sancionar y Erradicar la Violencia Intrafamiliar (Decreto 97-96)',
      'Ley contra el Femicidio y otras Formas de Violencia contra la Mujer (Decreto 22-2008)',
      'Arts. 7-10 (Medidas de seguridad)',
      'Constitución Art. 1 y 2 (Protección a la persona)',
    ],
    preguntas: [
      {
        id: 1,
        pregunta: '¿Qué medidas de seguridad urgentes puede solicitar Ana para protegerse a ella y a sus hijos?',
        opciones: [
          'Solo puede pedir el divorcio y esperar a que el juez resuelva en meses',
          'Medidas de seguridad como: orden de alejamiento contra Jorge, prohibición de acercarse al hogar, guarda y custodia provisional de los hijos, y prohibición de salida del país para Jorge',
          'Únicamente puede llamar a la policía cuando ocurra el próximo incidente',
          'No puede hacer nada sin un abogado privado pagado',
        ],
        correcta: 1,
        explicacion: 'La Ley de Violencia Intrafamiliar (art. 7) contempla medidas de seguridad que el juez puede dictar de forma urgente e incluso de oficio: (1) Orden de alejamiento y prohibición de acercarse a Ana y los niños; (2) Salida del agresor del hogar; (3) Guarda y custodia provisional de los hijos; (4) Prohibición de salida del país; (5) Inventario de bienes. Estas medidas pueden dictarse el mismo día de la denuncia.',
      },
      {
        id: 2,
        pregunta: '¿Dónde puede acudir Ana para denunciar sin necesidad de pagar un abogado?',
        opciones: [
          'Solo ante un abogado privado, ya que el Estado no atiende estos casos',
          'Ante el Ministerio Público (MP), la Policía Nacional Civil (PNC), el Juzgado de Paz más cercano, o el Organismo Judicial — todos deben recibirle la denuncia de forma gratuita',
          'Solo en horario hábil de oficina (8am-4pm) en el MP',
          'Únicamente en la Procuraduría General de la Nación',
        ],
        correcta: 1,
        explicacion: 'Ana puede denunciar en: (1) Cualquier agencia del MP (Fiscalía de la Mujer atiende específicamente estos casos); (2) Cualquier comisaría de la PNC (deben recibir la denuncia las 24 horas); (3) Juzgado de Paz (pueden dictar medidas de urgencia). El servicio es gratuito. También existen centros de apoyo a víctimas como la PGN y organizaciones como APROFAM. Ana no necesita abogado propio para iniciar el proceso.',
      },
      {
        id: 3,
        pregunta: 'La amenaza con cuchillo que hizo Jorge, ¿puede constituir un delito penal aparte de la violencia intrafamiliar?',
        opciones: [
          'No, las amenazas verbales no son delito en Guatemala',
          'Solo si hubo testigos que la presenciaron',
          'Sí, puede constituir el delito de amenazas (art. 215 CP) y dependiendo del contexto, violencia contra la mujer agravada conforme al Decreto 22-2008',
          'Solo si se realiza la amenaza por escrito',
        ],
        correcta: 2,
        explicacion: 'Amenazar a alguien con causarle daño (art. 215 CP) es delito en Guatemala, independientemente de si hay testigos. Además, el Decreto 22-2008 tipifica la violencia contra la mujer con penas de 5 a 12 años de prisión cuando se ejerce violencia física, psicológica, económica o de coacción. La amenaza con arma en un contexto de violencia sostenida podría configurar femicidio en grado de tentativa en casos extremos.',
      },
      {
        id: 4,
        pregunta: 'Ana teme que denunciar empeore su situación. ¿Qué mecanismos legales existen para protegerla durante el proceso?',
        opciones: [
          'Ninguno, la ley no puede protegerla completamente durante el proceso',
          'Solo puede pedir guardaespaldas si tiene dinero para pagarlos',
          'Medidas de protección inmediatas (orden de alejamiento), acompañamiento de la Fiscalía de la Mujer, posibilidad de declarar con identidad protegida, y albergues temporales para víctimas de violencia',
          'Debe abandonar el país si siente que su vida está en peligro',
        ],
        correcta: 2,
        explicacion: 'El sistema tiene múltiples protecciones: (1) Medidas de seguridad inmediatas desde el primer día (alejamiento, prohibición de acercarse); (2) La Fiscalía de la Mujer del MP acompaña el proceso y tiene unidades especializadas; (3) Existencia de albergues temporales donde Ana y sus hijos pueden refugiarse; (4) La ley permite que en ciertos casos la víctima declare de forma protegida. El miedo es comprensible, pero el sistema fue diseñado precisamente para situaciones como la de Ana.',
      },
    ],
  },
];
