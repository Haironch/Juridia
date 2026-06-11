// Generador de PDF Profesional para Plan de Estudio
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

      // Crear contenido HTML profesional del plan
      const contenido = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #333;
              line-height: 1.7;
              background: #f5f7fa;
            }

            .page {
              background: white;
              page-break-after: always;
              padding: 40px;
            }

            .page:last-child { page-break-after: avoid; }

            /* PORTADA */
            .portada {
              background: linear-gradient(135deg, #2a628f 0%, #18435a 100%);
              color: white;
              padding: 80px 40px;
              text-align: center;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              position: relative;
              overflow: hidden;
            }

            .portada::before {
              content: '';
              position: absolute;
              top: -50%;
              right: -50%;
              width: 500px;
              height: 500px;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 50%;
            }

            .portada::after {
              content: '';
              position: absolute;
              bottom: -30%;
              left: -30%;
              width: 400px;
              height: 400px;
              background: rgba(255, 255, 255, 0.03);
              border-radius: 50%;
            }

            .portada-content { position: relative; z-index: 1; }
            .portada h1 { font-size: 48px; margin-bottom: 20px; font-weight: 700; letter-spacing: -1px; }
            .portada-subtitle { font-size: 24px; opacity: 0.9; margin-bottom: 40px; font-weight: 300; }
            .portada-meta { font-size: 14px; opacity: 0.8; margin-top: 60px; }
            .badge {
              display: inline-block;
              background: rgba(255, 255, 255, 0.2);
              padding: 12px 24px;
              border-radius: 50px;
              font-size: 13px;
              margin: 5px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.3);
            }

            /* CONTENIDO */
            .header-page {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 3px solid #2a628f;
            }

            .header-page h1 { color: #2a628f; font-size: 28px; }
            .page-number { color: #999; font-size: 12px; }

            .seccion {
              margin: 30px 0;
              page-break-inside: avoid;
            }

            .semana {
              background: linear-gradient(to bottom, #f8fbff, #f0f7ff);
              border-left: 5px solid #2a628f;
              padding: 25px;
              margin: 20px 0;
              border-radius: 8px;
              page-break-inside: avoid;
              box-shadow: 0 2px 8px rgba(42, 98, 143, 0.1);
            }

            .semana-numero {
              display: inline-block;
              background: linear-gradient(135deg, #2a628f, #18435a);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              margin-bottom: 10px;
            }

            .semana h2 {
              color: #13293d;
              font-size: 18px;
              margin: 10px 0 15px 0;
              font-weight: 600;
            }

            .descripcion {
              color: #555;
              font-size: 13px;
              margin-bottom: 15px;
              line-height: 1.6;
            }

            .subseccion-titulo {
              color: #2a628f;
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-top: 15px;
              margin-bottom: 8px;
              padding-bottom: 5px;
              border-bottom: 2px solid #d8e9f5;
            }

            .objetivo-item {
              background: white;
              padding: 8px 12px;
              margin: 5px 0;
              border-left: 3px solid #10b981;
              font-size: 12px;
              border-radius: 4px;
            }

            .recurso-item {
              background: white;
              padding: 10px 12px;
              margin: 6px 0;
              border-left: 3px solid #9ac1e2;
              font-size: 12px;
              border-radius: 4px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .recurso-nombre { font-weight: 500; color: #13293d; }
            .recurso-duracion { color: #2a628f; font-size: 11px; font-weight: bold; }

            .tip-item {
              background: #fffbf0;
              border-left: 3px solid #f59e0b;
              padding: 10px 12px;
              margin: 6px 0;
              font-size: 12px;
              border-radius: 4px;
            }

            .lectura-item {
              background: #f0fdf4;
              border-left: 3px solid #10b981;
              padding: 12px;
              margin-top: 10px;
              border-radius: 4px;
              font-size: 12px;
            }

            .lectura-titulo { color: #059669; font-weight: bold; margin-bottom: 3px; }
            .lectura-detalle { color: #666; font-size: 11px; }

            /* FOOTER */
            .footer {
              margin-top: 60px;
              padding-top: 20px;
              border-top: 2px solid #d8e9f5;
              text-align: center;
              font-size: 11px;
              color: #999;
            }

            .footer-logo { font-weight: bold; color: #2a628f; }

            /* INFO BOX */
            .info-box {
              background: linear-gradient(135deg, #e0f2fe, #f0f7ff);
              border-left: 4px solid #2a628f;
              padding: 15px;
              margin: 20px 0;
              border-radius: 6px;
              font-size: 12px;
              line-height: 1.6;
            }

            @page {
              margin: 0;
              size: A4;
            }

            @media print {
              body { background: white; }
            }
          </style>
        </head>
        <body>
          <!-- PORTADA -->
          <div class="portada">
            <div class="portada-content">
              <h1>Plan de Estudio Personalizado</h1>
              <div class="portada-subtitle">${plan.examen.charAt(0).toUpperCase() + plan.examen.slice(1)}</div>

              <div style="margin: 40px 0;">
                <div class="badge">Nivel ${plan.fase.charAt(0).toUpperCase() + plan.fase.slice(1)}</div>
                <div class="badge">${plan.semanas.length} Semanas</div>
                ${plan.fechaExamen ? `<div class="badge">Examen: ${new Date(plan.fechaExamen).toLocaleDateString('es-GT')}</div>` : ''}
              </div>

              <div class="portada-meta">
                <p>Generado por Juridia</p>
                <p style="font-size: 12px; margin-top: 10px;">Plataforma de Estudio de Derecho Guatemalteco</p>
                <p style="margin-top: 30px; font-size: 11px; opacity: 0.7;">${new Date().toLocaleDateString('es-GT')}</p>
              </div>
            </div>
          </div>

          <!-- PÁGINA DE CONTENIDO -->
          <div class="page">
            <div class="header-page">
              <h1>Tu Plan de Estudio</h1>
              <div class="page-number">Página 1</div>
            </div>

            <div class="info-box">
              <strong>📋 Este plan incluye:</strong><br>
              ${plan.semanas.length} semanas estructuradas • Recursos prácticos • Objetivos claros •
              Lecturas recomendadas • Tips de estudio • Casos de análisis • Actividades prácticas
            </div>

            ${plan.semanas
              .map(
                (semana, idx) => `
              <div class="semana">
                <span class="semana-numero">SEMANA ${semana.numero_semana}</span>
                <h2>${semana.titulo}</h2>
                <p class="descripcion">${semana.descripcion}</p>

                ${
                  semana.objetivos && semana.objetivos.length > 0
                    ? `
                  <div class="subseccion-titulo">📌 Objetivos</div>
                  ${semana.objetivos.map((obj) => `<div class="objetivo-item">✓ ${obj}</div>`).join('')}
                `
                    : ''
                }

                <div class="subseccion-titulo">📚 Recursos</div>
                ${semana.recursos
                  .map(
                    (recurso) => `
                  <div class="recurso-item">
                    <span class="recurso-nombre">${recurso.nombre}</span>
                    ${recurso.duracion ? `<span class="recurso-duracion">${recurso.duracion}</span>` : ''}
                  </div>
                `
                  )
                  .join('')}

                ${
                  semana.tips && semana.tips.length > 0
                    ? `
                  <div class="subseccion-titulo">💡 Tips</div>
                  ${semana.tips.map((tip) => `<div class="tip-item">→ ${tip}</div>`).join('')}
                `
                    : ''
                }

                ${
                  semana.lecturaRecomendada
                    ? `
                  <div class="lectura-item">
                    <div class="lectura-titulo">📖 Lectura Recomendada (${semana.lecturaRecomendada.tiempo})</div>
                    <div class="lectura-detalle"><strong>${semana.lecturaRecomendada.titulo}</strong></div>
                    <div class="lectura-detalle">${semana.lecturaRecomendada.articulo}</div>
                  </div>
                `
                    : ''
                }
              </div>

              ${(idx + 1) % 3 === 0 && idx < plan.semanas.length - 1 ? '</div><div class="page">' : ''}
            `
              )
              .join('')}

            <div class="footer">
              <span class="footer-logo">Juridia</span> • Plan generado automáticamente
              <br>
              <small>© 2026 Plataforma de Estudio de Derecho Guatemalteco</small>
            </div>
          </div>
        </body>
        </html>
      `;

      const element = document.createElement('div');
      element.innerHTML = contenido;

      const opt = {
        margin: 0,
        filename: `Plan_Estudio_${plan.examen}_${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      html2pdf().set(opt).from(element).save();
      resolve(true);
    };
    document.head.appendChild(script);
  });
}
