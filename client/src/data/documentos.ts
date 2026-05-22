export type TipoCampo = 'text' | 'date' | 'number' | 'select' | 'textarea';

export interface CampoDocumento {
  id: string;
  label: string;
  type: TipoCampo;
  placeholder?: string;
  options?: string[];
  hint?: string;
  required: boolean;
}

export interface PlantillaDocumento {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: 'Laboral' | 'Civil' | 'General';
  icono: string;
  baseLegal: string;
  aviso: string;
  campos: CampoDocumento[];
  generar: (v: Record<string, string>) => string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const fecha = (iso: string) => {
  if (!iso) return '_______________';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' });
};

const val = (v: Record<string, string>, key: string, fallback = '_______________') =>
  v[key]?.trim() || fallback;

// ── Estilos base compartidos para el HTML generado ───────────────────────────

const estilosBase = `
  <style>
    body { font-family: 'Times New Roman', serif; font-size: 12pt; color: #111; line-height: 1.7; margin: 0; padding: 0; }
    .doc { max-width: 720px; margin: 0 auto; padding: 48px 56px; background: #fff; }
    .doc-header { text-align: right; margin-bottom: 32px; }
    .doc-header p { margin: 2px 0; font-size: 11pt; }
    h1 { text-align: center; font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 32px; }
    h2 { font-size: 12pt; font-weight: bold; margin-top: 24px; margin-bottom: 8px; }
    p { margin: 10px 0; text-align: justify; }
    .firma { margin-top: 64px; }
    .firma-linea { border-top: 1px solid #111; width: 260px; margin-bottom: 4px; }
    .firma p { margin: 2px 0; }
    .clausula { margin: 16px 0; }
    .clausula-num { font-weight: bold; }
    .partes { display: flex; gap: 48px; margin-top: 56px; }
    .parte { flex: 1; }
    ul { margin: 8px 0; padding-left: 20px; }
    li { margin: 4px 0; }
    @media print {
      body { margin: 0; }
      .doc { padding: 24px 36px; box-shadow: none; }
    }
  </style>
`;

// ── Plantillas ────────────────────────────────────────────────────────────────

export const plantillasDocumentos: PlantillaDocumento[] = [

  // ── 1. Carta de Preaviso de Renuncia ────────────────────────────────────────
  {
    id: 'preaviso-renuncia',
    titulo: 'Carta de Preaviso de Renuncia',
    descripcion: 'Notificación formal al empleador de tu decisión de renunciar, con el período de preaviso según el Código de Trabajo.',
    categoria: 'Laboral',
    icono: '📄',
    baseLegal: 'Art. 83 Código de Trabajo (Decreto 1441)',
    aviso: 'Preaviso mínimo según el Art. 83 CT: menos de 1 año trabajado = 1 semana · de 1 a 5 años = 10 días · más de 5 años = 1 mes.',
    campos: [
      { id: 'ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_carta', label: 'Fecha de la carta', type: 'date', required: true },
      { id: 'nombre_trabajador', label: 'Tu nombre completo', type: 'text', placeholder: 'Juan Alberto Pérez López', required: true },
      { id: 'dpi', label: 'Número de DPI', type: 'text', placeholder: '1234 56789 0101', required: true },
      { id: 'empresa', label: 'Nombre del empleador / empresa', type: 'text', placeholder: 'Empresa Guatemalteca S.A.', required: true },
      { id: 'cargo', label: 'Tu puesto o cargo', type: 'text', placeholder: 'Asistente Administrativo', required: true },
      { id: 'fecha_ingreso', label: 'Fecha de ingreso a la empresa', type: 'date', required: true },
      { id: 'ultimo_dia', label: 'Último día de labores propuesto', type: 'date', required: true },
    ],
    generar: (v) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}</head><body><div class="doc">
      <div class="doc-header">
        <p>${val(v, 'ciudad')}, ${fecha(v.fecha_carta)}</p>
      </div>
      <p><strong>Señores</strong><br>${val(v, 'empresa')}<br>Ciudad</p>
      <p>Estimados señores:</p>
      <p>Por medio de la presente, yo <strong>${val(v, 'nombre_trabajador')}</strong>, con Documento Personal de Identificación (DPI) número <strong>${val(v, 'dpi')}</strong>, quien labora en su empresa como <strong>${val(v, 'cargo')}</strong> desde el <strong>${fecha(v.fecha_ingreso)}</strong>, me dirijo respetuosamente a ustedes para comunicarles mi decisión de <strong>renunciar voluntariamente</strong> al puesto que ocupo.</p>
      <p>De conformidad con lo establecido en el artículo 83 del Código de Trabajo de Guatemala (Decreto 1441), el presente documento constituye el aviso previo correspondiente, siendo mi <strong>último día de labores el ${fecha(v.ultimo_dia)}</strong>.</p>
      <p>Durante el período de transición, me comprometo a cumplir a cabalidad con mis responsabilidades y a colaborar en el proceso de entrega del puesto, con el fin de garantizar la continuidad de las operaciones.</p>
      <p>Aprovecho la oportunidad para expresar mi agradecimiento por la confianza y las oportunidades de desarrollo profesional brindadas durante el tiempo que formé parte de esta organización.</p>
      <p>En espera de que el presente aviso sea recibido de conformidad,</p>
      <div class="firma" style="margin-top:56px;">
        <div class="firma-linea"></div>
        <p><strong>${val(v, 'nombre_trabajador')}</strong></p>
        <p>DPI: ${val(v, 'dpi')}</p>
        <p>Cargo: ${val(v, 'cargo')}</p>
      </div>
    </div></body></html>`,
  },

  // ── 2. Carta de Despido ──────────────────────────────────────────────────────
  {
    id: 'carta-despido',
    titulo: 'Carta de Despido',
    descripcion: 'Documento para notificar formalmente la terminación de la relación laboral desde el empleador hacia el trabajador.',
    categoria: 'Laboral',
    icono: '📋',
    baseLegal: 'Arts. 76-82 Código de Trabajo (Decreto 1441)',
    aviso: 'Para que el despido sea justificado debe basarse en causas del Art. 77 CT y constar por escrito. Sin causa legal demostrada, se convierte en despido injustificado y genera derecho a indemnización completa.',
    campos: [
      { id: 'ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_carta', label: 'Fecha de la carta', type: 'date', required: true },
      { id: 'nombre_empresa', label: 'Nombre de la empresa', type: 'text', placeholder: 'Empresa Guatemalteca S.A.', required: true },
      { id: 'representante', label: 'Nombre del representante legal', type: 'text', placeholder: 'María Rodríguez de León', required: true },
      { id: 'cargo_representante', label: 'Cargo del representante', type: 'text', placeholder: 'Gerente General', required: true },
      { id: 'nombre_trabajador', label: 'Nombre del trabajador', type: 'text', placeholder: 'Carlos Méndez García', required: true },
      { id: 'cargo_trabajador', label: 'Cargo del trabajador', type: 'text', placeholder: 'Vendedor', required: true },
      { id: 'fecha_ingreso', label: 'Fecha de ingreso del trabajador', type: 'date', required: true },
      { id: 'fecha_despido', label: 'Fecha efectiva del despido', type: 'date', required: true },
      {
        id: 'causa',
        label: 'Tipo de terminación',
        type: 'select',
        options: [
          'por reestructuración organizacional',
          'por incumplimiento reiterado de obligaciones laborales',
          'por falta grave debidamente comprobada',
          'de mutuo acuerdo entre las partes',
          'por cierre de operaciones de la empresa',
        ],
        required: true,
      },
    ],
    generar: (v) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}</head><body><div class="doc">
      <div class="doc-header">
        <p>${val(v, 'ciudad')}, ${fecha(v.fecha_carta)}</p>
      </div>
      <h1>Carta de Despido</h1>
      <p>Señor(a)<br><strong>${val(v, 'nombre_trabajador')}</strong><br>Trabajador(a) — ${val(v, 'cargo_trabajador')}<br>Ciudad</p>
      <p>Estimado(a) señor(a) <strong>${val(v, 'nombre_trabajador')}</strong>:</p>
      <p>Por medio de la presente, <strong>${val(v, 'nombre_empresa')}</strong>, representada en este acto por <strong>${val(v, 'representante')}</strong>, en su calidad de <strong>${val(v, 'cargo_representante')}</strong>, le comunica formalmente la <strong>terminación de la relación laboral</strong> que lo vincula con esta empresa, con efectividad a partir del día <strong>${fecha(v.fecha_despido)}</strong>.</p>
      <p>Dicha terminación se produce ${val(v, 'causa', 'por causas internas de la empresa')}, de conformidad con las disposiciones del Código de Trabajo de Guatemala (Decreto 1441) y sus reformas.</p>
      <p>Se le hace saber que, en cumplimiento de la legislación laboral vigente, la empresa procederá a liquidar las prestaciones laborales que por ley le correspondan, considerando el período laborado del <strong>${fecha(v.fecha_ingreso)}</strong> al <strong>${fecha(v.fecha_despido)}</strong>, incluyendo indemnización si aplica, vacaciones proporcionales, aguinaldo proporcional y bono 14 proporcional.</p>
      <p>Se le solicita coordinar con el área de Recursos Humanos la entrega de sus responsabilidades y de los bienes de la empresa que pudieran estar a su cargo.</p>
      <p>La empresa extiende el presente documento para los efectos legales que correspondan.</p>
      <div class="partes">
        <div class="parte">
          <div class="firma-linea"></div>
          <p><strong>${val(v, 'representante')}</strong></p>
          <p>${val(v, 'cargo_representante')}</p>
          <p>${val(v, 'nombre_empresa')}</p>
        </div>
        <div class="parte">
          <div class="firma-linea"></div>
          <p><strong>${val(v, 'nombre_trabajador')}</strong></p>
          <p>Recibido — ${val(v, 'cargo_trabajador')}</p>
          <p>Fecha y hora de recepción: _______________</p>
        </div>
      </div>
    </div></body></html>`,
  },

  // ── 3. Contrato de Arrendamiento Simple ──────────────────────────────────────
  {
    id: 'contrato-arrendamiento',
    titulo: 'Contrato de Arrendamiento Simple',
    descripcion: 'Contrato básico para el alquiler de un inmueble habitacional o comercial según el Código Civil guatemalteco.',
    categoria: 'Civil',
    icono: '🏠',
    baseLegal: 'Arts. 1880–1940 Código Civil (Decreto Ley 106)',
    aviso: 'Para mayor seguridad jurídica, el contrato puede ser autenticado ante Notario. En arrendamientos superiores a Q3,000 mensuales se recomienda escritura pública.',
    campos: [
      { id: 'ciudad', label: 'Ciudad donde se celebra', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_contrato', label: 'Fecha del contrato', type: 'date', required: true },
      { id: 'nombre_arrendante', label: 'Nombre completo del arrendante (dueño)', type: 'text', placeholder: 'Rosa María Pérez de García', required: true },
      { id: 'dpi_arrendante', label: 'DPI del arrendante', type: 'text', placeholder: '1234 56789 0101', required: true },
      { id: 'nombre_arrendatario', label: 'Nombre completo del arrendatario (inquilino)', type: 'text', placeholder: 'Roberto Alejandro López Méndez', required: true },
      { id: 'dpi_arrendatario', label: 'DPI del arrendatario', type: 'text', placeholder: '9876 54321 0101', required: true },
      { id: 'direccion_inmueble', label: 'Dirección exacta del inmueble', type: 'textarea', placeholder: '5a. Avenida 12-34, Zona 10, Ciudad de Guatemala', required: true },
      { id: 'tipo_inmueble', label: 'Tipo de inmueble', type: 'select', options: ['apartamento', 'casa', 'local comercial', 'bodega', 'oficina'], required: true },
      { id: 'renta_mensual', label: 'Renta mensual (Q)', type: 'number', placeholder: '2500', required: true },
      { id: 'deposito', label: 'Depósito de garantía (Q)', type: 'number', placeholder: '2500', hint: 'Generalmente equivale a 1 mes de renta', required: false },
      { id: 'fecha_inicio', label: 'Fecha de inicio del arrendamiento', type: 'date', required: true },
      { id: 'duracion_meses', label: 'Duración del contrato (meses)', type: 'number', placeholder: '12', required: true },
      { id: 'dia_pago', label: 'Día del mes para pagar la renta', type: 'number', placeholder: '5', required: true },
    ],
    generar: (v) => {
      const meses = parseInt(v.duracion_meses) || 12;
      const inicioDate = v.fecha_inicio ? new Date(v.fecha_inicio + 'T00:00:00') : null;
      let fechaFin = '_______________';
      if (inicioDate) {
        const fin = new Date(inicioDate);
        fin.setMonth(fin.getMonth() + meses);
        fechaFin = fin.toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' });
      }
      const deposito = v.deposito ? `Q${parseFloat(v.deposito).toLocaleString('es-GT')}` : 'no aplica';
      return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}</head><body><div class="doc">
        <h1>Contrato de Arrendamiento</h1>
        <p>En la ciudad de <strong>${val(v,'ciudad')}</strong>, el día <strong>${fecha(v.fecha_contrato)}</strong>, comparecen:</p>
        <p><strong>ARRENDANTE:</strong> <strong>${val(v,'nombre_arrendante')}</strong>, identificado(a) con DPI número <strong>${val(v,'dpi_arrendante')}</strong>, quien en lo sucesivo se denominará "EL ARRENDANTE".</p>
        <p><strong>ARRENDATARIO:</strong> <strong>${val(v,'nombre_arrendatario')}</strong>, identificado(a) con DPI número <strong>${val(v,'dpi_arrendatario')}</strong>, quien en lo sucesivo se denominará "EL ARRENDATARIO".</p>
        <p>Ambas partes, de común acuerdo, celebran el presente CONTRATO DE ARRENDAMIENTO, de conformidad con los artículos 1880 y siguientes del Código Civil de Guatemala (Decreto Ley 106), con base en las siguientes cláusulas:</p>
        <div class="clausula"><span class="clausula-num">PRIMERA — OBJETO:</span> El ARRENDANTE da en arrendamiento al ARRENDATARIO el ${val(v,'tipo_inmueble')} ubicado en: <strong>${val(v,'direccion_inmueble')}</strong>, el cual el ARRENDATARIO declara conocer y aceptar en el estado en que se encuentra.</div>
        <div class="clausula"><span class="clausula-num">SEGUNDA — PLAZO:</span> El presente contrato tendrá una duración de <strong>${meses} meses</strong>, comprendidos del <strong>${fecha(v.fecha_inicio)}</strong> al <strong>${fechaFin}</strong>. Al vencimiento del plazo, si ambas partes lo consienten tácitamente, el contrato se entenderá prorrogado por plazos iguales.</div>
        <div class="clausula"><span class="clausula-num">TERCERA — RENTA:</span> El ARRENDATARIO se obliga a pagar al ARRENDANTE una renta mensual de <strong>Q${parseFloat(v.renta_mensual||'0').toLocaleString('es-GT')}</strong> (${val(v,'renta_mensual')} Quetzales), pagadera los primeros <strong>${val(v,'dia_pago')}</strong> días de cada mes, en el lugar que el ARRENDANTE indique.</div>
        <div class="clausula"><span class="clausula-num">CUARTA — DEPÓSITO:</span> El ARRENDATARIO entrega en este acto la suma de <strong>${deposito}</strong> como depósito de garantía, el cual será devuelto al finalizar el contrato, descontando los daños al inmueble si los hubiere.</div>
        <div class="clausula"><span class="clausula-num">QUINTA — USO DEL INMUEBLE:</span> El inmueble arrendado será destinado exclusivamente para uso <strong>${val(v,'tipo_inmueble') === 'local comercial' || val(v,'tipo_inmueble') === 'bodega' || val(v,'tipo_inmueble') === 'oficina' ? 'comercial/profesional' : 'habitacional'}</strong>. El ARRENDATARIO no podrá subarrendar ni ceder el inmueble sin autorización escrita del ARRENDANTE.</div>
        <div class="clausula"><span class="clausula-num">SEXTA — OBLIGACIONES DEL ARRENDATARIO:</span> El ARRENDATARIO se obliga a: a) Pagar puntualmente la renta; b) Cuidar el inmueble y devolverlo en las mismas condiciones en que lo recibió; c) No realizar modificaciones sin autorización del ARRENDANTE; d) Pagar los servicios de agua, luz y teléfono que le correspondan; e) Permitir al ARRENDANTE inspeccionar el inmueble con previo aviso.</div>
        <div class="clausula"><span class="clausula-num">SÉPTIMA — RESOLUCIÓN:</span> El incumplimiento en el pago de dos mensualidades consecutivas facultará al ARRENDANTE para dar por resuelto el contrato y solicitar el desahucio conforme a la ley.</div>
        <div class="clausula"><span class="clausula-num">OCTAVA — JURISDICCIÓN:</span> Para cualquier controversia derivada del presente contrato, las partes se someten a la jurisdicción de los tribunales civiles competentes de Guatemala y al procedimiento establecido en el Código Procesal Civil y Mercantil.</div>
        <p>En señal de conformidad, las partes firman el presente contrato en dos ejemplares del mismo tenor y valor, en el lugar y fecha indicados.</p>
        <div class="partes">
          <div class="parte">
            <div class="firma-linea"></div>
            <p><strong>${val(v,'nombre_arrendante')}</strong></p>
            <p>DPI: ${val(v,'dpi_arrendante')}</p>
            <p>ARRENDANTE</p>
          </div>
          <div class="parte">
            <div class="firma-linea"></div>
            <p><strong>${val(v,'nombre_arrendatario')}</strong></p>
            <p>DPI: ${val(v,'dpi_arrendatario')}</p>
            <p>ARRENDATARIO</p>
          </div>
        </div>
      </div></body></html>`;
    },
  },

  // ── 4. Carta de Cobro ───────────────────────────────────────────────────────
  {
    id: 'carta-cobro',
    titulo: 'Carta de Cobro',
    descripcion: 'Notificación formal a un deudor para reclamar el pago de una obligación pendiente.',
    categoria: 'General',
    icono: '💳',
    baseLegal: 'Arts. 1319-1323 Código Civil (obligaciones y mora)',
    aviso: 'La carta de cobro es el paso previo a la demanda. Documentar la notificación (correo certificado o con acuse de recibo) fortalece la posición legal del acreedor.',
    campos: [
      { id: 'ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_carta', label: 'Fecha de la carta', type: 'date', required: true },
      { id: 'nombre_acreedor', label: 'Tu nombre o nombre de la empresa acreedora', type: 'text', placeholder: 'Servicios Profesionales GT, S.A.', required: true },
      { id: 'nombre_deudor', label: 'Nombre completo del deudor', type: 'text', placeholder: 'Pedro José Ramírez Soto', required: true },
      { id: 'monto', label: 'Monto adeudado (Q)', type: 'number', placeholder: '5000', required: true },
      { id: 'concepto', label: 'Concepto o razón de la deuda', type: 'textarea', placeholder: 'servicios de consultoría prestados durante el mes de enero 2025, según contrato firmado el 5 de enero de 2025', required: true },
      { id: 'fecha_vencimiento', label: 'Fecha en que debió pagarse', type: 'date', required: true },
      { id: 'plazo_respuesta', label: 'Días para pagar / responder', type: 'number', placeholder: '15', required: true },
      { id: 'contacto', label: 'Teléfono o correo para contacto', type: 'text', placeholder: 'Tel: 5555-5555 / pagos@empresa.com', required: false },
    ],
    generar: (v) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}</head><body><div class="doc">
      <div class="doc-header">
        <p>${val(v,'ciudad')}, ${fecha(v.fecha_carta)}</p>
      </div>
      <p>Señor(a)<br><strong>${val(v,'nombre_deudor')}</strong><br>Ciudad</p>
      <p>Estimado(a) señor(a) <strong>${val(v,'nombre_deudor')}</strong>:</p>
      <p>Por medio de la presente, <strong>${val(v,'nombre_acreedor')}</strong> se dirige a usted de manera respetuosa pero formal, con el fin de hacerle saber que a la fecha de emisión de esta carta, registra una <strong>deuda pendiente de pago</strong> por la suma de <strong>Q${parseFloat(v.monto||'0').toLocaleString('es-GT')}</strong> (${val(v,'monto')} Quetzales).</p>
      <p>Dicha obligación corresponde a <strong>${val(v,'concepto')}</strong>, cuyo pago era exigible desde el <strong>${fecha(v.fecha_vencimiento)}</strong>.</p>
      <p>En tal virtud, se le requiere formalmente que en el plazo improrrogable de <strong>${val(v,'plazo_respuesta')} días hábiles</strong> contados a partir de la recepción de la presente carta, proceda a cancelar el monto adeudado o a comunicarse con nosotros para acordar una forma de pago.</p>
      <p>De no recibir respuesta o pago dentro del plazo indicado, nos veremos en la necesidad de iniciar las acciones legales correspondientes para el cobro judicial de la deuda, más los intereses legales devengados y las costas procesales, de conformidad con los artículos 1319 y siguientes del Código Civil de Guatemala.</p>
      ${v.contacto ? `<p>Para cualquier gestión de pago o consulta, puede comunicarse al: <strong>${v.contacto}</strong>.</p>` : ''}
      <p>Confiando en una pronta y favorable respuesta,</p>
      <div class="firma" style="margin-top:48px;">
        <div class="firma-linea"></div>
        <p><strong>${val(v,'nombre_acreedor')}</strong></p>
        <p>Acreedor(a)</p>
      </div>
    </div></body></html>`,
  },

  // ── 5. Poder Simple ─────────────────────────────────────────────────────────
  {
    id: 'poder-simple',
    titulo: 'Carta de Autorización / Poder Simple',
    descripcion: 'Documento para autorizar a otra persona a actuar en tu nombre en gestiones específicas.',
    categoria: 'General',
    icono: '✍️',
    baseLegal: 'Arts. 1686-1727 Código Civil (mandato)',
    aviso: 'Este poder simple es válido para gestiones administrativas ordinarias. Para actos que requieran representación judicial o disposición de bienes inmuebles es necesario un mandato en Escritura Pública ante Notario.',
    campos: [
      { id: 'ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_carta', label: 'Fecha', type: 'date', required: true },
      { id: 'nombre_poderdante', label: 'Tu nombre completo (quien otorga el poder)', type: 'text', placeholder: 'Ana Lucía Morales Cifuentes', required: true },
      { id: 'dpi_poderdante', label: 'Tu DPI', type: 'text', placeholder: '1234 56789 0101', required: true },
      { id: 'direccion_poderdante', label: 'Tu dirección', type: 'text', placeholder: '3a. Calle 5-67, Zona 1, Guatemala', required: true },
      { id: 'nombre_apoderado', label: 'Nombre completo del apoderado (quien recibirá el poder)', type: 'text', placeholder: 'Luis Fernando Barrios Lima', required: true },
      { id: 'dpi_apoderado', label: 'DPI del apoderado', type: 'text', placeholder: '9876 54321 0101', required: true },
      { id: 'facultades', label: 'Para qué lo autorizas (gestiones específicas)', type: 'textarea', placeholder: 'retirar documentos en el Registro de la Propiedad, realizar trámites ante el SAT y recibir notificaciones en mi nombre', required: true },
      { id: 'vigencia', label: 'Vigencia del poder (dejar en blanco si es indefinida)', type: 'text', placeholder: 'hasta el 31 de diciembre de 2025', required: false },
    ],
    generar: (v) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}</head><body><div class="doc">
      <h1>Carta de Autorización</h1>
      <p>Yo, <strong>${val(v,'nombre_poderdante')}</strong>, guatemalteco(a), mayor de edad, identificado(a) con Documento Personal de Identificación (DPI) número <strong>${val(v,'dpi_poderdante')}</strong>, con domicilio en <strong>${val(v,'direccion_poderdante')}</strong>, por medio de la presente:</p>
      <p><strong>AUTORIZO Y FACULTO</strong> al señor(a) <strong>${val(v,'nombre_apoderado')}</strong>, identificado(a) con DPI número <strong>${val(v,'dpi_apoderado')}</strong>, para que en mi nombre y representación pueda <strong>${val(v,'facultades')}</strong>.</p>
      <p>Las actuaciones que realice el(la) autorizado(a) dentro del alcance de las facultades aquí conferidas tendrán plena validez y serán de mi entera responsabilidad, como si yo mismo(a) las hubiera efectuado.</p>
      ${v.vigencia ? `<p>La presente autorización tendrá vigencia <strong>${v.vigencia}</strong>, salvo revocación expresa de mi parte.</p>` : '<p>La presente autorización es de carácter indefinido hasta su revocación expresa por mi parte.</p>'}
      <p>Extiendo la presente en la ciudad de <strong>${val(v,'ciudad')}</strong>, el día <strong>${fecha(v.fecha_carta)}</strong>.</p>
      <div class="firma" style="margin-top:64px;">
        <div class="firma-linea"></div>
        <p><strong>${val(v,'nombre_poderdante')}</strong></p>
        <p>DPI: ${val(v,'dpi_poderdante')}</p>
        <p>Poderdante / Autorizante</p>
      </div>
      <div style="margin-top:40px; padding:16px; border:1px dashed #999; border-radius:8px; font-size:10pt; color:#555;">
        <p style="margin:0;"><strong>Para uso oficial:</strong> Firma autenticada por Notario / Sello institucional</p>
        <div style="height:60px;"></div>
      </div>
    </div></body></html>`,
  },
];
