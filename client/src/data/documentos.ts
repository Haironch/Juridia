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
  categoria: 'Laboral' | 'Civil' | 'General' | 'Penal' | 'Administrativo';
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

  // ── 6. Contrato Individual de Trabajo ────────────────────────────────────────
  {
    id: 'contrato-trabajo',
    titulo: 'Contrato Individual de Trabajo',
    descripcion: 'Formaliza la relación laboral entre empleador y trabajador con todas las cláusulas obligatorias según el Código de Trabajo.',
    categoria: 'Laboral',
    icono: '👔',
    baseLegal: 'Arts. 18-31 Código de Trabajo (Decreto 1441)',
    aviso: 'Todo contrato de trabajo debe constar por escrito y el empleador está obligado a entregarlo en duplicado al trabajador. Su omisión genera presunción de relación laboral por tiempo indefinido a favor del trabajador.',
    campos: [
      { id: 'ciudad', label: 'Ciudad donde se celebra', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_contrato', label: 'Fecha del contrato', type: 'date', required: true },
      { id: 'nombre_patrono', label: 'Nombre de la empresa / empleador', type: 'text', placeholder: 'Empresa Guatemalteca S.A.', required: true },
      { id: 'nit_patrono', label: 'NIT del empleador', type: 'text', placeholder: '1234567-8', required: true },
      { id: 'representante', label: 'Representante legal de la empresa', type: 'text', placeholder: 'María García de López', required: true },
      { id: 'nombre_trabajador', label: 'Nombre completo del trabajador', type: 'text', placeholder: 'Pedro Ramírez Soto', required: true },
      { id: 'dpi_trabajador', label: 'DPI del trabajador', type: 'text', placeholder: '2345 67890 0101', required: true },
      { id: 'direccion_trabajador', label: 'Dirección del trabajador', type: 'text', placeholder: 'Zona 5, Ciudad de Guatemala', required: true },
      { id: 'cargo', label: 'Cargo o puesto', type: 'text', placeholder: 'Contador General', required: true },
      { id: 'lugar_trabajo', label: 'Lugar de trabajo', type: 'text', placeholder: '6a. Av. 12-34, Zona 10, Guatemala', required: true },
      { id: 'jornada', label: 'Tipo de jornada', type: 'select', options: ['Diurna (8h diarias, 44h semanales)', 'Nocturna (6h diarias, 36h semanales)', 'Mixta (7h diarias, 42h semanales)'], required: true },
      { id: 'horario', label: 'Horario específico', type: 'text', placeholder: 'Lunes a viernes de 08:00 a 17:00 horas', required: true },
      { id: 'salario_mensual', label: 'Salario mensual (Q)', type: 'number', placeholder: '5000', required: true },
      { id: 'forma_pago', label: 'Forma de pago', type: 'select', options: ['mensual', 'quincenal', 'semanal'], required: true },
      { id: 'fecha_inicio', label: 'Fecha de inicio', type: 'date', required: true },
      { id: 'duracion', label: 'Duración del contrato', type: 'select', options: ['por tiempo indefinido', 'por plazo fijo', 'por obra determinada'], required: true },
    ],
    generar: (v) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}</head><body><div class="doc">
      <h1>Contrato Individual de Trabajo</h1>
      <p>En la ciudad de <strong>${val(v,'ciudad')}</strong>, el día <strong>${fecha(v.fecha_contrato)}</strong>, comparecen:</p>
      <p><strong>PATRONO:</strong> <strong>${val(v,'nombre_patrono')}</strong>, con NIT <strong>${val(v,'nit_patrono')}</strong>, representada en este acto por <strong>${val(v,'representante')}</strong>, en su calidad de representante legal, en lo sucesivo denominado "EL PATRONO".</p>
      <p><strong>TRABAJADOR:</strong> <strong>${val(v,'nombre_trabajador')}</strong>, identificado con DPI número <strong>${val(v,'dpi_trabajador')}</strong>, con domicilio en <strong>${val(v,'direccion_trabajador')}</strong>, en lo sucesivo denominado "EL TRABAJADOR".</p>
      <p>Ambas partes celebran el presente CONTRATO INDIVIDUAL DE TRABAJO de conformidad con los artículos 18 y siguientes del Código de Trabajo de Guatemala (Decreto 1441) y sus reformas, bajo las siguientes cláusulas:</p>
      <div class="clausula"><span class="clausula-num">PRIMERA — OBJETO Y CARGO:</span> EL PATRONO contrata los servicios personales de EL TRABAJADOR para desempeñar el cargo de <strong>${val(v,'cargo')}</strong>, con las funciones y responsabilidades propias de dicho puesto.</div>
      <div class="clausula"><span class="clausula-num">SEGUNDA — LUGAR DE TRABAJO:</span> EL TRABAJADOR prestará sus servicios en <strong>${val(v,'lugar_trabajo')}</strong>, o en el lugar que EL PATRONO indique según las necesidades de la empresa, de conformidad con el artículo 29 inciso "e" del Código de Trabajo.</div>
      <div class="clausula"><span class="clausula-num">TERCERA — JORNADA Y HORARIO:</span> La jornada de trabajo será de tipo <strong>${val(v,'jornada')}</strong>, con el horario de <strong>${val(v,'horario')}</strong>. Las horas laboradas en exceso de la jornada ordinaria serán pagadas como tiempo extraordinario con el recargo del cincuenta por ciento (50%) sobre el salario ordinario, conforme al artículo 121 del Código de Trabajo.</div>
      <div class="clausula"><span class="clausula-num">CUARTA — SALARIO:</span> EL PATRONO pagará a EL TRABAJADOR un salario de <strong>Q${parseFloat(v.salario_mensual||'0').toLocaleString('es-GT')} (${val(v,'salario_mensual')} Quetzales) mensuales</strong>, pagadero en forma <strong>${val(v,'forma_pago')}</strong>. Dicho salario es superior al salario mínimo vigente establecido por la Comisión Nacional del Salario. El pago se realizará en moneda de curso legal o mediante transferencia bancaria.</div>
      <div class="clausula"><span class="clausula-num">QUINTA — PRESTACIONES LABORALES:</span> EL TRABAJADOR tendrá derecho a todas las prestaciones establecidas en la ley: vacaciones (Art. 130 CT), aguinaldo (Decreto 42-92), Bono 14 (Decreto 37-2001), indemnización cuando proceda (Art. 82 CT), bonificación incentivo (Decreto 78-89) e inscripción al IGSS (Decreto 295).</div>
      <div class="clausula"><span class="clausula-num">SEXTA — DURACIÓN:</span> El presente contrato se celebra <strong>${val(v,'duracion')}</strong>, con vigencia a partir del <strong>${fecha(v.fecha_inicio)}</strong>.</div>
      <div class="clausula"><span class="clausula-num">SÉPTIMA — OBLIGACIONES DEL TRABAJADOR:</span> EL TRABAJADOR se obliga a: a) Desempeñar con diligencia y eficiencia las funciones asignadas; b) Guardar discreción sobre información confidencial de la empresa; c) Observar las normas internas del patrono; d) Comunicar oportunamente cualquier ausencia; e) No desarrollar actividades que compitan con EL PATRONO sin autorización expresa.</div>
      <div class="clausula"><span class="clausula-num">OCTAVA — TERMINACIÓN:</span> El presente contrato podrá darse por terminado por las causas establecidas en los artículos 76, 79 y 83 del Código de Trabajo, según corresponda al tipo de terminación.</div>
      <div class="clausula"><span class="clausula-num">NOVENA — JURISDICCIÓN:</span> Para cualquier divergencia en la interpretación o cumplimiento de este contrato, las partes se someten a la jurisdicción de los Juzgados de Trabajo y Previsión Social de Guatemala.</div>
      <p>En señal de plena conformidad, las partes firman el presente contrato en dos ejemplares del mismo tenor y valor en el lugar y fecha indicados.</p>
      <div class="partes">
        <div class="parte">
          <div class="firma-linea"></div>
          <p><strong>${val(v,'representante')}</strong></p>
          <p>Representante Legal</p>
          <p>${val(v,'nombre_patrono')}</p>
        </div>
        <div class="parte">
          <div class="firma-linea"></div>
          <p><strong>${val(v,'nombre_trabajador')}</strong></p>
          <p>DPI: ${val(v,'dpi_trabajador')}</p>
          <p>Trabajador(a)</p>
        </div>
      </div>
    </div></body></html>`,
  },

  // ── 7. Finiquito / Liquidación Laboral ───────────────────────────────────────
  {
    id: 'finiquito-laboral',
    titulo: 'Finiquito / Liquidación Laboral',
    descripcion: 'Calcula y documenta las prestaciones laborales al terminar la relación de trabajo: indemnización, aguinaldo, bono 14, vacaciones.',
    categoria: 'Laboral',
    icono: '🧾',
    baseLegal: 'Arts. 82, 130 CT · Decreto 42-92 · Decreto 37-2001',
    aviso: 'El finiquito firmado por el trabajador hace constar el pago de sus prestaciones. Solo extingue las obligaciones expresamente mencionadas. Si el trabajador no recibió todo lo que corresponde, puede demandar la diferencia en los tribunales de trabajo dentro del plazo de prescripción.',
    campos: [
      { id: 'ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_liquidacion', label: 'Fecha del finiquito', type: 'date', required: true },
      { id: 'nombre_patrono', label: 'Nombre de la empresa / empleador', type: 'text', placeholder: 'Empresa Guatemalteca S.A.', required: true },
      { id: 'nombre_trabajador', label: 'Nombre completo del trabajador', type: 'text', placeholder: 'Pedro Ramírez Soto', required: true },
      { id: 'dpi_trabajador', label: 'DPI del trabajador', type: 'text', placeholder: '2345 67890 0101', required: true },
      { id: 'cargo', label: 'Cargo del trabajador', type: 'text', placeholder: 'Asistente Administrativo', required: true },
      { id: 'salario_mensual', label: 'Último salario mensual (Q)', type: 'number', placeholder: '4000', required: true },
      { id: 'fecha_ingreso', label: 'Fecha de ingreso', type: 'date', required: true },
      { id: 'fecha_terminacion', label: 'Fecha de terminación', type: 'date', required: true },
      {
        id: 'tipo_terminacion', label: 'Motivo de terminación', type: 'select',
        options: ['despido-injustificado', 'renuncia-voluntaria', 'mutuo-acuerdo', 'vencimiento-plazo', 'despido-justificado'],
        required: true,
      },
    ],
    generar: (v) => {
      const inicio = v.fecha_ingreso ? new Date(v.fecha_ingreso + 'T00:00:00') : null;
      const fin = v.fecha_terminacion ? new Date(v.fecha_terminacion + 'T00:00:00') : null;
      const sal = parseFloat(v.salario_mensual) || 0;
      const salDia = sal / 30;

      let diasTotal = 0, anosStr = '—', indem = 0, aguinaldo = 0, bono14 = 0, vac = 0;
      if (inicio && fin && fin > inicio) {
        diasTotal = Math.floor((fin.getTime() - inicio.getTime()) / 86400000);
        const anos = Math.floor(diasTotal / 365);
        const meses = Math.floor((diasTotal % 365) / 30);
        const dias = diasTotal % 30;
        anosStr = `${anos > 0 ? anos + ' año(s), ' : ''}${meses > 0 ? meses + ' mes(es), ' : ''}${dias} día(s)`;

        // Indemnización: 1 mes de salario por año, incluyendo fracción
        if (v.tipo_terminacion === 'despido-injustificado' || v.tipo_terminacion === 'mutuo-acuerdo') {
          indem = sal * (diasTotal / 365);
        }

        // Aguinaldo proporcional (período Dic 1 – Nov 30)
        let iniAg = new Date(fin.getFullYear(), 11, 1);
        if (iniAg > fin) iniAg = new Date(fin.getFullYear() - 1, 11, 1);
        const diasAg = Math.min(Math.floor((fin.getTime() - iniAg.getTime()) / 86400000), 365);
        aguinaldo = sal * diasAg / 365;

        // Bono 14 proporcional (período Jul 1 – Jun 30)
        let iniBo = new Date(fin.getFullYear(), 6, 1);
        if (iniBo > fin) iniBo = new Date(fin.getFullYear() - 1, 6, 1);
        const diasBo = Math.min(Math.floor((fin.getTime() - iniBo.getTime()) / 86400000), 365);
        bono14 = sal * diasBo / 365;

        // Vacaciones proporcionales (15 días hábiles por año ≈ 0.5 sal mensual / año)
        vac = (sal / 2) * (diasTotal / 365);
      }

      const total = indem + aguinaldo + bono14 + vac;
      const fmt = (n: number) => `Q${n.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      const motivoLabel: Record<string, string> = {
        'despido-injustificado': 'Despido injustificado',
        'renuncia-voluntaria': 'Renuncia voluntaria',
        'mutuo-acuerdo': 'Mutuo acuerdo',
        'vencimiento-plazo': 'Vencimiento de contrato a plazo',
        'despido-justificado': 'Despido justificado (Art. 77 CT)',
      };
      const tieneIndem = v.tipo_terminacion === 'despido-injustificado' || v.tipo_terminacion === 'mutuo-acuerdo';

      return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}<style>
        table { width:100%; border-collapse:collapse; margin:16px 0; }
        th, td { border:1px solid #ddd; padding:8px 12px; font-size:11pt; }
        th { background:#f4f4f4; font-weight:bold; text-align:left; }
        td.right { text-align:right; }
        .total-row td { font-weight:bold; background:#f0f7ff; }
      </style></head><body><div class="doc">
        <h1>Finiquito y Liquidación de Prestaciones Laborales</h1>
        <h2>I. Datos de las Partes</h2>
        <p><strong>Patrono:</strong> ${val(v,'nombre_patrono')}</p>
        <p><strong>Trabajador:</strong> ${val(v,'nombre_trabajador')} — DPI: ${val(v,'dpi_trabajador')}</p>
        <p><strong>Cargo:</strong> ${val(v,'cargo')}</p>
        <p><strong>Período laborado:</strong> ${fecha(v.fecha_ingreso)} al ${fecha(v.fecha_terminacion)} (${anosStr})</p>
        <p><strong>Último salario mensual:</strong> ${fmt(sal)}</p>
        <p><strong>Motivo de terminación:</strong> ${motivoLabel[v.tipo_terminacion] || val(v,'tipo_terminacion')}</p>

        <h2>II. Liquidación de Prestaciones</h2>
        <table>
          <tr><th>Concepto</th><th>Base legal</th><th class="right">Monto</th></tr>
          ${tieneIndem ? `<tr><td>Indemnización (1 mes/año, incluyendo fracción)</td><td>Art. 82 CT</td><td class="right">${fmt(indem)}</td></tr>` : '<tr><td colspan="2"><em>Indemnización: No aplica según motivo de terminación</em></td><td class="right">Q0.00</td></tr>'}
          <tr><td>Aguinaldo proporcional</td><td>Decreto 42-92</td><td class="right">${fmt(aguinaldo)}</td></tr>
          <tr><td>Bono 14 proporcional</td><td>Decreto 37-2001</td><td class="right">${fmt(bono14)}</td></tr>
          <tr><td>Vacaciones proporcionales (15 días hábiles/año)</td><td>Art. 130 CT</td><td class="right">${fmt(vac)}</td></tr>
          <tr class="total-row"><td colspan="2">TOTAL A PAGAR</td><td class="right">${fmt(total)}</td></tr>
        </table>

        <h2>III. Declaración y Firma</h2>
        <p>Yo, <strong>${val(v,'nombre_trabajador')}</strong>, declaro haber recibido de <strong>${val(v,'nombre_patrono')}</strong> la suma de <strong>${fmt(total)}</strong> en concepto de las prestaciones laborales detalladas en el presente documento, correspondientes al período comprendido del ${fecha(v.fecha_ingreso)} al ${fecha(v.fecha_terminacion)}, quedando a mi entera satisfacción las obligaciones laborales expresamente mencionadas.</p>
        <p>Extendido en ${val(v,'ciudad')}, el ${fecha(v.fecha_liquidacion)}.</p>
        <div class="partes">
          <div class="parte">
            <div class="firma-linea"></div>
            <p><strong>${val(v,'nombre_patrono')}</strong></p>
            <p>Empleador / Representante</p>
          </div>
          <div class="parte">
            <div class="firma-linea"></div>
            <p><strong>${val(v,'nombre_trabajador')}</strong></p>
            <p>DPI: ${val(v,'dpi_trabajador')}</p>
            <p>Trabajador(a)</p>
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

  // ── 8. Contrato de Compraventa de Bien Mueble ────────────────────────────────
  {
    id: 'compraventa-mueble',
    titulo: 'Contrato de Compraventa de Bien Mueble',
    descripcion: 'Formaliza la venta de vehículos, maquinaria, equipo u otros bienes muebles con plena validez legal.',
    categoria: 'Civil',
    icono: '🚗',
    baseLegal: 'Arts. 1790–1851 Código Civil (Decreto Ley 106)',
    aviso: 'Para la transferencia de vehículos se requiere además el formulario del SAT y tramitar el cambio de tarjeta de circulación en el RENAP. Este contrato sirve como soporte del negocio jurídico.',
    campos: [
      { id: 'ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_contrato', label: 'Fecha del contrato', type: 'date', required: true },
      { id: 'nombre_vendedor', label: 'Nombre completo del vendedor', type: 'text', placeholder: 'Ana Lucía Morales Cifuentes', required: true },
      { id: 'dpi_vendedor', label: 'DPI del vendedor', type: 'text', placeholder: '1234 56789 0101', required: true },
      { id: 'nombre_comprador', label: 'Nombre completo del comprador', type: 'text', placeholder: 'Roberto López Méndez', required: true },
      { id: 'dpi_comprador', label: 'DPI del comprador', type: 'text', placeholder: '9876 54321 0101', required: true },
      { id: 'descripcion_bien', label: 'Descripción del bien', type: 'textarea', placeholder: 'Vehículo marca Toyota, modelo Corolla, año 2018, color blanco, No. de chasis XXXXX, No. de motor YYYYY, placa No. P-123ABC', required: true },
      { id: 'precio', label: 'Precio de venta (Q)', type: 'number', placeholder: '80000', required: true },
      { id: 'forma_pago', label: 'Forma de pago', type: 'select', options: ['de contado en este acto', 'mediante transferencia bancaria', 'en cuotas acordadas por las partes'], required: true },
    ],
    generar: (v) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}</head><body><div class="doc">
      <h1>Contrato de Compraventa</h1>
      <p>En la ciudad de <strong>${val(v,'ciudad')}</strong>, el día <strong>${fecha(v.fecha_contrato)}</strong>, comparecen:</p>
      <p><strong>VENDEDOR:</strong> <strong>${val(v,'nombre_vendedor')}</strong>, mayor de edad, guatemalteco(a), identificado(a) con DPI número <strong>${val(v,'dpi_vendedor')}</strong>, quien en lo sucesivo se denominará "EL VENDEDOR".</p>
      <p><strong>COMPRADOR:</strong> <strong>${val(v,'nombre_comprador')}</strong>, mayor de edad, guatemalteco(a), identificado(a) con DPI número <strong>${val(v,'dpi_comprador')}</strong>, quien en lo sucesivo se denominará "EL COMPRADOR".</p>
      <p>Ambas partes, de mutuo acuerdo, celebran el presente CONTRATO DE COMPRAVENTA de conformidad con los artículos 1790 y siguientes del Código Civil de Guatemala (Decreto Ley 106), bajo las siguientes cláusulas:</p>
      <div class="clausula"><span class="clausula-num">PRIMERA — OBJETO:</span> EL VENDEDOR vende, cede y transfiere en propiedad a EL COMPRADOR el siguiente bien mueble: <strong>${val(v,'descripcion_bien')}</strong>, el cual el comprador declara conocer y aceptar en el estado físico actual en que se encuentra.</div>
      <div class="clausula"><span class="clausula-num">SEGUNDA — PRECIO:</span> El precio pactado para la presente compraventa es de <strong>Q${parseFloat(v.precio||'0').toLocaleString('es-GT')} (${val(v,'precio')} Quetzales)</strong>, suma que EL COMPRADOR pagará <strong>${val(v,'forma_pago')}</strong>.</div>
      <div class="clausula"><span class="clausula-num">TERCERA — TRADICIÓN Y ENTREGA:</span> EL VENDEDOR hace entrega material del bien al momento de la firma del presente contrato, transfiriéndose también todos los riesgos y beneficios del bien a EL COMPRADOR.</div>
      <div class="clausula"><span class="clausula-num">CUARTA — SANEAMIENTO:</span> EL VENDEDOR garantiza que el bien descrito es de su propiedad, que no está gravado con hipoteca, prenda, embargo u otro gravamen que limite o impida la libre disposición, y que responderá por el saneamiento de evicción conforme al artículo 1818 del Código Civil.</div>
      <div class="clausula"><span class="clausula-num">QUINTA — JURISDICCIÓN:</span> Para cualquier controversia derivada del presente contrato, las partes se someten a la jurisdicción de los tribunales civiles competentes de la República de Guatemala.</div>
      <p>En señal de conformidad, las partes firman el presente contrato en dos ejemplares del mismo tenor y valor.</p>
      <div class="partes">
        <div class="parte">
          <div class="firma-linea"></div>
          <p><strong>${val(v,'nombre_vendedor')}</strong></p>
          <p>DPI: ${val(v,'dpi_vendedor')}</p>
          <p>VENDEDOR</p>
        </div>
        <div class="parte">
          <div class="firma-linea"></div>
          <p><strong>${val(v,'nombre_comprador')}</strong></p>
          <p>DPI: ${val(v,'dpi_comprador')}</p>
          <p>COMPRADOR</p>
        </div>
      </div>
    </div></body></html>`,
  },

  // ── 9. Reconocimiento de Deuda ───────────────────────────────────────────────
  {
    id: 'reconocimiento-deuda',
    titulo: 'Reconocimiento de Deuda',
    descripcion: 'Documento por el que el deudor reconoce formalmente una obligación pendiente y se compromete a pagarla en fecha determinada.',
    categoria: 'Civil',
    icono: '🤝',
    baseLegal: 'Arts. 1319-1323 y 1596 Código Civil (Decreto Ley 106)',
    aviso: 'El reconocimiento de deuda firmado ante dos testigos o con firma legalizada ante Notario tiene valor de prueba plena en juicio. Para montos significativos se recomienda legalizar la firma.',
    campos: [
      { id: 'ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_documento', label: 'Fecha del documento', type: 'date', required: true },
      { id: 'nombre_deudor', label: 'Nombre completo del deudor', type: 'text', placeholder: 'Carlos Enrique Mendoza García', required: true },
      { id: 'dpi_deudor', label: 'DPI del deudor', type: 'text', placeholder: '3456 78901 0101', required: true },
      { id: 'nombre_acreedor', label: 'Nombre del acreedor', type: 'text', placeholder: 'Inversiones GT, S.A. / Juan Pérez López', required: true },
      { id: 'monto', label: 'Monto reconocido (Q)', type: 'number', placeholder: '15000', required: true },
      { id: 'concepto', label: 'Origen de la deuda', type: 'textarea', placeholder: 'préstamo personal recibido el 15 de enero de 2025, para gastos de capital de trabajo', required: true },
      { id: 'fecha_pago', label: 'Fecha límite de pago', type: 'date', required: true },
      { id: 'interes_mensual', label: 'Interés mensual (%, dejar en blanco si es sin intereses)', type: 'number', placeholder: '2', required: false },
    ],
    generar: (v) => {
      const interes = v.interes_mensual ? `La deuda reconocida devengará un interés del <strong>${v.interes_mensual}% mensual</strong> sobre el saldo insoluto, a partir del vencimiento del plazo hasta su total cancelación.` : 'Las partes acuerdan que la presente obligación <strong>no devengará intereses</strong> mientras sea pagada en el plazo establecido.';
      return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}</head><body><div class="doc">
        <h1>Reconocimiento de Deuda</h1>
        <p>Yo, <strong>${val(v,'nombre_deudor')}</strong>, mayor de edad, guatemalteco(a), identificado(a) con DPI número <strong>${val(v,'dpi_deudor')}</strong>, de manera libre, voluntaria y sin coacción alguna, por medio del presente documento:</p>
        <p><strong>RECONOZCO</strong> adeudar a <strong>${val(v,'nombre_acreedor')}</strong> la suma de <strong>Q${parseFloat(v.monto||'0').toLocaleString('es-GT')} (${val(v,'monto')} Quetzales)</strong>, derivada de <strong>${val(v,'concepto')}</strong>.</p>
        <p>Me obligo a pagar la suma reconocida a más tardar el día <strong>${fecha(v.fecha_pago)}</strong>, en un solo pago o en la forma que acuerde con el acreedor.</p>
        <p>${interes}</p>
        <p>En caso de incumplimiento, el acreedor queda facultado para iniciar las acciones legales de cobro que correspondan conforme a los artículos 1319 y siguientes del Código Civil de Guatemala, siendo a mi cargo las costas procesales que se generen.</p>
        <p>Para constancia de lo anterior, firmo el presente documento en la ciudad de <strong>${val(v,'ciudad')}</strong>, el día <strong>${fecha(v.fecha_documento)}</strong>.</p>
        <div class="firma" style="margin-top:64px;">
          <div class="firma-linea"></div>
          <p><strong>${val(v,'nombre_deudor')}</strong></p>
          <p>DPI: ${val(v,'dpi_deudor')}</p>
          <p>Deudor(a)</p>
        </div>
        <div style="margin-top:40px;">
          <p><strong>Testigo 1:</strong> ___________________________ DPI: ___________________</p>
          <p><strong>Testigo 2:</strong> ___________________________ DPI: ___________________</p>
        </div>
      </div></body></html>`;
    },
  },

  // ── 10. Contrato de Servicios Profesionales ───────────────────────────────────
  {
    id: 'servicios-profesionales',
    titulo: 'Contrato de Servicios Profesionales',
    descripcion: 'Regula la prestación de servicios por cuenta propia (abogados, consultores, diseñadores, etc.) sin relación de dependencia laboral.',
    categoria: 'Civil',
    icono: '💼',
    baseLegal: 'Arts. 2027-2036 Código Civil (locación de servicios) · Art. 5 CT',
    aviso: 'Este contrato es de naturaleza civil, no laboral. Para que no se presuma una relación de dependencia, el prestador debe tener autonomía en la ejecución del servicio, emitir factura y no estar sujeto a horario fijo ni a las órdenes directas del contratante.',
    campos: [
      { id: 'ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_contrato', label: 'Fecha del contrato', type: 'date', required: true },
      { id: 'nombre_contratante', label: 'Nombre del contratante (quien contrata)', type: 'text', placeholder: 'Empresa ABC S.A.', required: true },
      { id: 'nit_contratante', label: 'NIT del contratante', type: 'text', placeholder: '1234567-8', required: true },
      { id: 'nombre_prestador', label: 'Nombre del prestador del servicio', type: 'text', placeholder: 'Lic. Mario García López', required: true },
      { id: 'dpi_prestador', label: 'DPI del prestador', type: 'text', placeholder: '5678 90123 0101', required: true },
      { id: 'descripcion_servicios', label: 'Descripción del servicio a prestar', type: 'textarea', placeholder: 'Asesoría legal en materia mercantil, revisión de contratos y representación en negociaciones con proveedores', required: true },
      { id: 'honorarios', label: 'Honorarios (Q)', type: 'number', placeholder: '10000', required: true },
      { id: 'forma_cobro', label: 'Forma de cobro', type: 'select', options: ['mensual', 'por entrega de producto final', 'en dos pagos (50% inicial, 50% al cierre)', 'por hora acordada'], required: true },
      { id: 'fecha_inicio', label: 'Fecha de inicio', type: 'date', required: true },
      { id: 'plazo', label: 'Duración del contrato', type: 'text', placeholder: '3 meses / hasta el 31 de diciembre de 2025', required: true },
    ],
    generar: (v) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}</head><body><div class="doc">
      <h1>Contrato de Prestación de Servicios Profesionales</h1>
      <p>En la ciudad de <strong>${val(v,'ciudad')}</strong>, el día <strong>${fecha(v.fecha_contrato)}</strong>, comparecen:</p>
      <p><strong>CONTRATANTE:</strong> <strong>${val(v,'nombre_contratante')}</strong>, con NIT <strong>${val(v,'nit_contratante')}</strong>, en lo sucesivo denominado "EL CONTRATANTE".</p>
      <p><strong>PRESTADOR:</strong> <strong>${val(v,'nombre_prestador')}</strong>, identificado con DPI número <strong>${val(v,'dpi_prestador')}</strong>, profesional independiente, en lo sucesivo denominado "EL PRESTADOR".</p>
      <p>Las partes celebran el presente CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES de conformidad con los artículos 2027 y siguientes del Código Civil guatemalteco, aclarando expresamente que el mismo es de naturaleza civil y no genera relación de dependencia laboral alguna entre las partes.</p>
      <div class="clausula"><span class="clausula-num">PRIMERA — OBJETO:</span> EL PRESTADOR se obliga a proporcionar a EL CONTRATANTE los siguientes servicios profesionales: <strong>${val(v,'descripcion_servicios')}</strong>.</div>
      <div class="clausula"><span class="clausula-num">SEGUNDA — HONORARIOS:</span> EL CONTRATANTE pagará a EL PRESTADOR honorarios de <strong>Q${parseFloat(v.honorarios||'0').toLocaleString('es-GT')}</strong>, en forma <strong>${val(v,'forma_cobro')}</strong>. EL PRESTADOR emitirá la factura correspondiente con el IVA incluido.</div>
      <div class="clausula"><span class="clausula-num">TERCERA — PLAZO:</span> El presente contrato tendrá vigencia de <strong>${val(v,'plazo')}</strong>, a partir del <strong>${fecha(v.fecha_inicio)}</strong>.</div>
      <div class="clausula"><span class="clausula-num">CUARTA — INDEPENDENCIA:</span> EL PRESTADOR actuará con plena autonomía técnica y profesional en la ejecución del servicio. No existe entre las partes relación de subordinación, dependencia laboral ni obligación de horario fijo. EL PRESTADOR no tendrá derecho a prestaciones laborales.</div>
      <div class="clausula"><span class="clausula-num">QUINTA — CONFIDENCIALIDAD:</span> EL PRESTADOR se obliga a guardar absoluta confidencialidad sobre la información que reciba de EL CONTRATANTE en el marco de la prestación del servicio, incluso con posterioridad a la terminación del contrato.</div>
      <div class="clausula"><span class="clausula-num">SEXTA — TERMINACIÓN:</span> Cualquiera de las partes puede dar por terminado el contrato con 15 días de aviso previo por escrito. En caso de incumplimiento grave, la parte afectada puede rescindirlo de inmediato.</div>
      <p>En señal de conformidad, las partes firman en dos ejemplares.</p>
      <div class="partes">
        <div class="parte">
          <div class="firma-linea"></div>
          <p><strong>${val(v,'nombre_contratante')}</strong></p>
          <p>Contratante</p>
        </div>
        <div class="parte">
          <div class="firma-linea"></div>
          <p><strong>${val(v,'nombre_prestador')}</strong></p>
          <p>DPI: ${val(v,'dpi_prestador')}</p>
          <p>Prestador</p>
        </div>
      </div>
    </div></body></html>`,
  },

  // ── 11. Denuncia ante el Ministerio Público ──────────────────────────────────
  {
    id: 'denuncia-mp',
    titulo: 'Denuncia ante el Ministerio Público',
    descripcion: 'Modelo para presentar una denuncia penal ante el MP o la PNC por cualquier hecho delictivo ocurrido en Guatemala.',
    categoria: 'Penal',
    icono: '⚖️',
    baseLegal: 'Arts. 297-302 CPP (Decreto 51-92) · Art. 251 CPRG',
    aviso: 'La denuncia puede presentarse de forma verbal o escrita en cualquier sede del Ministerio Público o ante la PNC. No tiene costo. El MP tiene la obligación legal de recibirla y debe entregar constancia de recepción. La denuncia falsa constituye delito.',
    campos: [
      { id: 'ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_denuncia', label: 'Fecha de presentación', type: 'date', required: true },
      { id: 'nombre_denunciante', label: 'Tu nombre completo (denunciante)', type: 'text', placeholder: 'Ana María López Pérez', required: true },
      { id: 'dpi_denunciante', label: 'Tu DPI', type: 'text', placeholder: '1234 56789 0101', required: true },
      { id: 'direccion_denunciante', label: 'Tu dirección para notificaciones', type: 'text', placeholder: '3a. Calle 5-67, Zona 1, Guatemala', required: true },
      { id: 'tel_denunciante', label: 'Tu teléfono', type: 'text', placeholder: '5555-5555', required: true },
      {
        id: 'tipo_delito', label: 'Tipo de delito denunciado', type: 'select',
        options: ['Estafa (Art. 263 CP)', 'Robo (Art. 251 CP)', 'Hurto (Art. 246 CP)', 'Lesiones (Art. 144 CP)', 'Amenazas (Art. 215 CP)', 'Extorsión (Art. 261 CP)', 'Violencia contra la mujer (Decreto 22-2008)', 'Usurpación (Art. 256 CP)', 'Falsedad material (Art. 321 CP)', 'Otro delito'],
        required: true,
      },
      { id: 'nombre_sindicado', label: 'Nombre del sindicado (si se conoce)', type: 'text', placeholder: 'Dejar en blanco si es desconocido', required: false },
      { id: 'descripcion_hechos', label: 'Narración de los hechos', type: 'textarea', placeholder: 'Describa en detalle qué ocurrió, indicando fecha, hora, lugar, personas involucradas y cualquier otro detalle relevante...', required: true },
      { id: 'lugar_hechos', label: 'Lugar donde ocurrieron los hechos', type: 'text', placeholder: '5a. Avenida 12-34, Zona 10, Guatemala', required: true },
      { id: 'fecha_hechos', label: 'Fecha en que ocurrieron los hechos', type: 'date', required: true },
      { id: 'pruebas', label: 'Pruebas o evidencias que adjunta', type: 'textarea', placeholder: 'Fotografías del daño, mensajes de texto, contrato incumplido, recibo de pago, etc.', required: false },
    ],
    generar: (v) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}</head><body><div class="doc">
      <div class="doc-header">
        <p>${val(v,'ciudad')}, ${fecha(v.fecha_denuncia)}</p>
      </div>
      <p><strong>Señores</strong><br>Ministerio Público de Guatemala<br>Fiscalía Distrital / de turno<br>${val(v,'ciudad')}</p>
      <h1>Escrito de Denuncia Penal</h1>
      <p>Yo, <strong>${val(v,'nombre_denunciante')}</strong>, mayor de edad, guatemalteco(a), identificado(a) con DPI número <strong>${val(v,'dpi_denunciante')}</strong>, con domicilio para recibir notificaciones en <strong>${val(v,'direccion_denunciante')}</strong>, teléfono <strong>${val(v,'tel_denunciante')}</strong>, ante usted respetuosamente comparezco y <strong>DIGO:</strong></p>
      <h2>I. DEL HECHO DENUNCIADO</h2>
      <p>Por medio del presente escrito, con fundamento en los artículos 297 y siguientes del Código Procesal Penal (Decreto 51-92) y en el artículo 251 de la Constitución Política de la República de Guatemala, presento formal <strong>DENUNCIA PENAL</strong> por el delito de <strong>${val(v,'tipo_delito')}</strong>.</p>
      ${v.nombre_sindicado ? `<p><strong>Sindicado:</strong> ${v.nombre_sindicado}</p>` : '<p>El o los autores del hecho son <strong>desconocidos</strong> para el suscrito al momento de presentar esta denuncia.</p>'}
      <h2>II. NARRACIÓN DE LOS HECHOS</h2>
      <p>${val(v,'descripcion_hechos')}</p>
      <p><strong>Lugar de los hechos:</strong> ${val(v,'lugar_hechos')}</p>
      <p><strong>Fecha de los hechos:</strong> ${fecha(v.fecha_hechos)}</p>
      ${v.pruebas ? `<h2>III. MEDIOS DE PRUEBA QUE SE OFRECEN</h2><p>${v.pruebas}</p>` : ''}
      <h2>${v.pruebas ? 'IV' : 'III'}. PETICIÓN</h2>
      <p>En virtud de lo expuesto, solicito al Ministerio Público:</p>
      <ul>
        <li>Admitir la presente denuncia y registrarla conforme a la ley.</li>
        <li>Extender constancia de recepción.</li>
        <li>Iniciar la investigación correspondiente y ejercer la acción penal pública si los hechos lo ameritan.</li>
        <li>Notificarme a la dirección indicada en los encabezados de este escrito.</li>
      </ul>
      <p>Es de justicia que pido.</p>
      <div class="firma" style="margin-top:56px;">
        <div class="firma-linea"></div>
        <p><strong>${val(v,'nombre_denunciante')}</strong></p>
        <p>DPI: ${val(v,'dpi_denunciante')}</p>
        <p>Denunciante</p>
      </div>
      <div style="margin-top:40px; padding:12px; border:1px dashed #999; font-size:10pt; color:#555;">
        <p style="margin:0;"><strong>Para uso del MP — Constancia de recepción:</strong></p>
        <p>No. de expediente: _______________ Fecha y hora: _______________ Firma y sello: _______________</p>
      </div>
    </div></body></html>`,
  },

  // ── 12. Memorial / Solicitud Administrativa ────────────────────────────────────
  {
    id: 'memorial-administrativo',
    titulo: 'Memorial / Solicitud Administrativa',
    descripcion: 'Formato estándar para presentar peticiones, recursos o solicitudes ante cualquier entidad pública guatemalteca.',
    categoria: 'Administrativo',
    icono: '🏛️',
    baseLegal: 'Art. 28 CPRG · Arts. 1-17 Ley de lo Contencioso Administrativo (Decreto 119-96)',
    aviso: 'Todo ciudadano tiene derecho constitucional de dirigir peticiones a las autoridades. La autoridad tiene obligación de resolver en 30 días hábiles. Si no lo hace, opera el silencio administrativo negativo y el interesado puede acudir al tribunal contencioso-administrativo.',
    campos: [
      { id: 'ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ciudad de Guatemala', required: true },
      { id: 'fecha_memorial', label: 'Fecha', type: 'date', required: true },
      { id: 'nombre_solicitante', label: 'Tu nombre completo', type: 'text', placeholder: 'Juan Carlos Pérez Ramos', required: true },
      { id: 'dpi_solicitante', label: 'Tu DPI', type: 'text', placeholder: '1234 56789 0101', required: true },
      { id: 'direccion_solicitante', label: 'Tu dirección para notificaciones', type: 'text', placeholder: '4a. Calle 8-23, Zona 9, Ciudad de Guatemala', required: true },
      { id: 'tel_solicitante', label: 'Teléfono de contacto', type: 'text', placeholder: '5555-5555', required: true },
      { id: 'entidad_destinataria', label: 'Entidad a la que te diriges', type: 'text', placeholder: 'Superintendencia de Administración Tributaria (SAT)', required: true },
      { id: 'autoridad', label: 'Cargo de la autoridad receptora', type: 'text', placeholder: 'Superintendente de Administración Tributaria', required: true },
      { id: 'objeto_solicitud', label: '¿Qué estás solicitando?', type: 'textarea', placeholder: 'La devolución del crédito fiscal del IVA correspondiente al período de enero de 2025, por la suma de Q10,000.00, conforme a la declaración presentada el 15 de febrero de 2025.', required: true },
      { id: 'fundamento_legal', label: 'Fundamento legal (opcional)', type: 'textarea', placeholder: 'Art. 23 Decreto 27-92 Ley del IVA / Art. 28 CPRG', required: false },
      { id: 'documentos_adjuntos', label: 'Documentos que adjuntas (opcional)', type: 'textarea', placeholder: 'Declaración de IVA enero 2025, facturas originales de respaldo', required: false },
    ],
    generar: (v) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">${estilosBase}</head><body><div class="doc">
      <div class="doc-header">
        <p>${val(v,'ciudad')}, ${fecha(v.fecha_memorial)}</p>
      </div>
      <p><strong>Señor(a)</strong><br><strong>${val(v,'autoridad')}</strong><br>${val(v,'entidad_destinataria')}<br>Ciudad</p>
      <p>Estimado(a) señor(a):</p>
      <p>Yo, <strong>${val(v,'nombre_solicitante')}</strong>, guatemalteco(a), mayor de edad, identificado(a) con Documento Personal de Identificación (DPI) número <strong>${val(v,'dpi_solicitante')}</strong>, señalo para recibir notificaciones en <strong>${val(v,'direccion_solicitante')}</strong>, teléfono <strong>${val(v,'tel_solicitante')}</strong>, ante usted respetuosamente comparezco y expongo:</p>
      <h2>I. OBJETO DE LA SOLICITUD</h2>
      <p>${val(v,'objeto_solicitud')}</p>
      ${v.fundamento_legal ? `<h2>II. FUNDAMENTO LEGAL</h2><p>${v.fundamento_legal}</p>` : ''}
      ${v.documentos_adjuntos ? `<h2>${v.fundamento_legal ? 'III' : 'II'}. DOCUMENTOS QUE SE ADJUNTAN</h2><ul>${v.documentos_adjuntos.split('\n').filter(Boolean).map((d: string) => `<li>${d.trim()}</li>`).join('')}</ul>` : ''}
      <h2>PETICIÓN</h2>
      <p>Con fundamento en el artículo 28 de la Constitución Política de la República de Guatemala, que garantiza el derecho de petición de todo ciudadano, <strong>atentamente solicito</strong> a esa autoridad:</p>
      <ul>
        <li>Admitir el presente memorial y darle el trámite correspondiente conforme a la ley.</li>
        <li>Resolver favorablemente la solicitud planteada.</li>
        <li>Notificarme la resolución correspondiente en la dirección indicada.</li>
      </ul>
      <p>Es de justicia que pido.</p>
      <div class="firma" style="margin-top:56px;">
        <div class="firma-linea"></div>
        <p><strong>${val(v,'nombre_solicitante')}</strong></p>
        <p>DPI: ${val(v,'dpi_solicitante')}</p>
        <p>Solicitante</p>
      </div>
      <div style="margin-top:40px; padding:12px; border:1px dashed #999; font-size:10pt; color:#555;">
        <p style="margin:0;"><strong>Sello de recibido:</strong></p>
        <p>Expediente No.: _______________ Fecha de ingreso: _______________ Firma y sello: _______________</p>
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
