// Generador de PDF para Plan de Estudio
export interface PlanParaPDF {
  examen: string;
  fase: string;
  fechaExamen: string | null;
  semanas: Array<{
    numero_semana: number;
    titulo: string;
    descripcion: string;
    objetivos?: string[];
    recursos: Array<{
      tipo: string;
      nombre: string;
      duracion?: string;
      descripcion?: string;
    }>;
    tips?: string[];
    lecturaRecomendada?: { titulo: string; articulo: string; tiempo: string };
  }>;
}

export async function generarPlanPDF(plan: PlanParaPDF) {
  // Cargar html2pdf desde CDN
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';

  return new Promise((resolve) => {
    script.onload = () => {
      const html2pdf = (window as any).html2pdf;

  // Crear contenido HTML del plan
  const contenido = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .header { background: linear-gradient(to right, #2a628f, #18435a); color: white; padding: 40px; text-align: center; margin-bottom: 40px; }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .header p { font-size: 14px; opacity: 0.9; }
        .info-box { background: #f0f7ff; border-left: 4px solid #2a628f; padding: 15px; margin-bottom: 20px; font-size: 13px; }
        .semana { page-break-inside: avoid; margin-bottom: 30px; border: 1px solid #d8e9f5; border-radius: 8px; padding: 20px; }
        .semana-titulo { background: #2a628f; color: white; padding: 15px; margin: -20px -20px 15px -20px; border-radius: 8px 8px 0 0; }
        .semana-titulo h2 { font-size: 16px; }
        .semana-numero { background: #18435a; display: inline-block; padding: 5px 10px; border-radius: 4px; font-size: 12px; }
        .descripcion { color: #555; margin-bottom: 15px; font-size: 13px; }
        .seccion { margin-top: 15px; margin-bottom: 15px; }
        .seccion-titulo { font-weight: bold; color: #2a628f; font-size: 13px; margin-bottom: 8px; text-transform: uppercase; }
        .objetivo-list { list-style: none; padding-left: 0; }
        .objetivo-list li { padding-left: 20px; margin-bottom: 6px; position: relative; font-size: 12px; }
        .objetivo-list li:before { content: "✓"; position: absolute; left: 0; color: #2a628f; font-weight: bold; }
        .recurso { background: #f9fbff; padding: 10px; margin-bottom: 8px; border-left: 3px solid #9ac1e2; font-size: 12px; border-radius: 4px; }
        .recurso-tipo { color: #2a628f; font-weight: bold; }
        .recurso-duracion { float: right; color: #9ac1e2; }
        .tips { background: #fffbf0; border-left: 3px solid #f59e0b; padding: 10px; margin-top: 10px; font-size: 12px; border-radius: 4px; }
        .tips-titulo { color: #d97706; font-weight: bold; margin-bottom: 5px; }
        .tip-item { padding-left: 18px; margin-bottom: 4px; position: relative; }
        .tip-item:before { content: "💡"; position: absolute; left: 0; }
        .lectura { background: #f0fdf4; border-left: 3px solid #10b981; padding: 10px; margin-top: 10px; font-size: 12px; border-radius: 4px; }
        .lectura-titulo { color: #059669; font-weight: bold; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #d8e9f5; text-align: center; font-size: 11px; color: #999; }
        @page { margin: 20mm; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Plan de Estudio Personalizado</h1>
        <p>Derecho ${plan.examen.charAt(0).toUpperCase() + plan.examen.slice(1)} | Nivel ${plan.fase}</p>
        ${plan.fechaExamen ? `<p>Fecha de examen: ${new Date(plan.fechaExamen).toLocaleDateString('es-GT')}</p>` : ''}
      </div>

      <div class="info-box">
        <strong>📋 Este plan incluye:</strong>
        ${plan.semanas.length} semanas de estudio • Recursos prácticos • Lecturas recomendadas • Tips de estudio • Casos de análisis
      </div>

      ${plan.semanas
        .map(
          (semana) => `
        <div class="semana">
          <div class="semana-titulo">
            <span class="semana-numero">SEMANA ${semana.numero_semana}</span>
            <h2>${semana.titulo}</h2>
          </div>

          <p class="descripcion">${semana.descripcion}</p>

          ${
            semana.objetivos && semana.objetivos.length > 0
              ? `
            <div class="seccion">
              <div class="seccion-titulo">📌 Objetivos de la semana</div>
              <ul class="objetivo-list">
                ${semana.objetivos.map((obj) => `<li>${obj}</li>`).join('')}
              </ul>
            </div>
          `
              : ''
          }

          <div class="seccion">
            <div class="seccion-titulo">📚 Recursos a usar</div>
            ${semana.recursos
              .map(
                (recurso) => `
              <div class="recurso">
                <span class="recurso-tipo">${recurso.tipo.toUpperCase()}</span>
                <span class="recurso-duracion">${recurso.duracion || ''}</span>
                <div><strong>${recurso.nombre}</strong></div>
                ${recurso.descripcion ? `<div style="font-size: 11px; color: #666; margin-top: 3px;">${recurso.descripcion}</div>` : ''}
              </div>
            `
              )
              .join('')}
          </div>

          ${
            semana.tips && semana.tips.length > 0
              ? `
            <div class="tips">
              <div class="tips-titulo">💡 Tips para esta semana</div>
              ${semana.tips.map((tip) => `<div class="tip-item">${tip}</div>`).join('')}
            </div>
          `
              : ''
          }

          ${
            semana.lecturaRecomendada
              ? `
            <div class="lectura">
              <div class="lectura-titulo">📖 Lectura recomendada (${semana.lecturaRecomendada.tiempo})</div>
              <strong>${semana.lecturaRecomendada.titulo}</strong><br>
              ${semana.lecturaRecomendada.articulo}
            </div>
          `
              : ''
          }
        </div>
      `
        )
        .join('')}

      <div class="footer">
        <p>Plan generado por Juridia - Plataforma de Estudio de Derecho Guatemalteco</p>
        <p>Generado el ${new Date().toLocaleDateString('es-GT')} a las ${new Date().toLocaleTimeString('es-GT')}</p>
      </div>
    </body>
    </html>
  `;

  // Configuración del PDF
  const element = document.createElement('div');
  element.innerHTML = contenido;

  const opt = {
    margin: 10,
    filename: `Plan_${plan.examen}_${plan.fase}_${new Date().getTime()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

      // Generar y descargar PDF
      html2pdf().set(opt).from(element).save();
      resolve(true);
    };
    document.head.appendChild(script);
  });
}
