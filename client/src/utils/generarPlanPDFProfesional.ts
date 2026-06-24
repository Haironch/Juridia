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

const NOMBRES_EXAMEN: Record<string, string> = {
  privado: 'Examen Privado',
  civil: 'Derecho Civil',
  penal: 'Derecho Penal',
  laboral: 'Derecho Laboral',
};

const NOMBRES_FASE: Record<string, string> = {
  basica: 'Básico',
  intermedia: 'Intermedio',
  avanzada: 'Avanzado',
};

const TIPO_EMOJI: Record<string, string> = {
  glosario: '📚', quiz: '❓', caso: '⚖️', documento: '📄',
  material: '📖', lectura: '📖', tip: '💡', actividad: '✍️',
};

function distribuirRecursos(recursos: PlanParaPDF['semanas'][0]['recursos']): string[][] {
  const dias: string[][] = [[], [], [], [], []];
  recursos.forEach((r, i) => dias[i % 5].push(`${TIPO_EMOJI[r.tipo] ?? '•'} ${r.nombre}`));
  const labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  return dias.map((d, i) => d.length ? d : [`${labels[i]}: Repaso y práctica`]);
}

function buildHTML(plan: PlanParaPDF): string {
  const nombreExamen = NOMBRES_EXAMEN[plan.examen] ?? plan.examen;
  const nombreFase   = NOMBRES_FASE[plan.fase]   ?? plan.fase;
  const hoy = new Date().toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' });
  const totalRecursos  = plan.semanas.reduce((a, s) => a + s.recursos.length, 0);
  const totalObjetivos = plan.semanas.reduce((a, s) => a + (s.objetivos?.length ?? 0), 0);
  const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const CHECKS = ['Leí los recursos', 'Completé los objetivos', 'Hice la lectura recomendada', 'Practiqué casos/quiz', 'Anoté los tips', 'Evalué mi comprensión'];

  const portada = `
    <section class="pagina portada">
      <div class="portada-deco d1"></div>
      <div class="portada-deco d2"></div>
      <header class="portada-top">
        <span class="brand">Juridia<em>.</em></span>
        <span class="portada-fecha">Generado el ${hoy}</span>
      </header>
      <main class="portada-main">
        <p class="portada-label">Plan de estudio personalizado</p>
        <h1 class="portada-titulo">${nombreExamen}</h1>
        <p class="portada-sub">Nivel ${nombreFase} &nbsp;·&nbsp; ${plan.semanas.length} semanas</p>
        <div class="pills">
          <span class="pill">📚 ${plan.semanas.length} semanas</span>
          <span class="pill">🎯 Nivel ${nombreFase}</span>
          <span class="pill">⚖️ ${nombreExamen}</span>
          ${plan.fechaExamen ? `<span class="pill">📅 Examen: ${new Date(plan.fechaExamen).toLocaleDateString('es-GT', { day: 'numeric', month: 'short', year: 'numeric' })}</span>` : ''}
          <span class="pill">📋 ${totalRecursos} recursos</span>
        </div>
        <div class="divider-line"></div>
        <p class="portada-desc">Documento generado automáticamente con tu plan estructurado, calendario semanal, recursos y checklist de avance.</p>
      </main>
      <footer class="portada-footer">
        <span class="footer-url">juridia-eta.vercel.app · Plataforma de Derecho Guatemalteco</span>
        <span class="footer-badge">hairch.dev</span>
      </footer>
    </section>`;

  const intro = `
    <section class="pagina interna">
      <header class="page-header">
        <span class="brand sm">Juridia<em>.</em></span>
        <span class="page-meta">${nombreExamen} · Nivel ${nombreFase} · ${plan.semanas.length} semanas</span>
      </header>
      <div class="page-body">
        <div class="intro-box">
          <h2 class="intro-titulo">Bienvenido a Juridia</h2>
          <p class="intro-texto">
            Juridia es una plataforma gratuita creada por <strong>Hairch.dev</strong>, con el valioso aporte de <strong>Anderson</strong>,
            pensada para apoyar a estudiantes de Derecho en la planificación de su preparación para exámenes privados.
          </p>
          <p class="intro-texto" style="margin-top:10px">
            Hemos preparado este documento como una guía práctica para ayudarte a organizar tu estudio de forma estratégica
            y eficiente. Además, incluimos un horario estructurado según las semanas que seleccionaste, para que puedas
            imprimirlo, llevar un mejor control de tu progreso y avanzar día a día hacia tu meta.
          </p>
          <p class="intro-texto" style="margin-top:10px">
            Nuestro objetivo es brindarte una herramienta clara, útil y accesible para optimizar tu tiempo y fortalecer
            tu preparación académica.
          </p>
          <p class="intro-firma">✨ Haz que cada día de estudio cuente.</p>
        </div>

        <div class="stat-grid">
          <div class="stat-card"><div class="stat-num">${plan.semanas.length}</div><div class="stat-lbl">Semanas</div></div>
          <div class="stat-card"><div class="stat-num">${totalRecursos}</div><div class="stat-lbl">Recursos</div></div>
          <div class="stat-card"><div class="stat-num">${totalObjetivos}</div><div class="stat-lbl">Objetivos</div></div>
        </div>

        <h3 class="sec-titulo">📅 Calendario del Plan de Estudio</h3>
        <table class="cal-table">
          <thead>
            <tr><th style="width:44px">#</th><th>Tema de la semana</th><th style="width:80px;text-align:center">Recursos</th><th style="width:80px;text-align:center">Completada</th></tr>
          </thead>
          <tbody>
            ${plan.semanas.map(s => `
              <tr>
                <td><b class="s-num">S${s.numero_semana}</b></td>
                <td class="s-titulo">${s.titulo}</td>
                <td style="text-align:center;font-weight:700;color:#2a628f">${s.recursos.length}</td>
                <td style="text-align:center"><span class="chk-box"></span></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <footer class="page-footer">
        <span>Juridia · ${nombreExamen} — Nivel ${nombreFase}</span>
        <span>hairch.dev · ${hoy}</span>
      </footer>
    </section>`;

  const semanas = plan.semanas.map(s => {
    const diasRecursos = distribuirRecursos(s.recursos);
    return `
      <section class="pagina interna">
        <header class="page-header">
          <span class="brand sm">Juridia<em>.</em></span>
          <span class="page-meta">${nombreExamen} · Nivel ${nombreFase} · Semana ${s.numero_semana} de ${plan.semanas.length}</span>
        </header>
        <div class="page-body">
          <div class="semana-card">
            <div class="semana-head">
              <div>
                <p class="semana-num-lbl">Semana ${s.numero_semana} de ${plan.semanas.length}</p>
                <h2 class="semana-titulo">${s.titulo}</h2>
              </div>
              <span class="semana-nivel">${nombreFase}</span>
            </div>
            <div class="semana-body">
              <p class="semana-desc">${s.descripcion}</p>

              ${s.objetivos?.length ? `
                <p class="blk-titulo">📌 Objetivos</p>
                ${s.objetivos.map(o => `<div class="obj-row"><span class="obj-dot"></span><span>${o}</span></div>`).join('')}` : ''}

              <p class="blk-titulo">📚 Recursos</p>
              ${s.recursos.map(r => `
                <div class="rec-row">
                  <div class="rec-left">
                    <span class="rec-chk"></span>
                    <div>
                      <div class="rec-nombre">${TIPO_EMOJI[r.tipo] ?? '•'} ${r.nombre}</div>
                      <div class="rec-tipo">${r.tipo}${r.descripcion ? ` · ${r.descripcion.substring(0, 60)}${r.descripcion.length > 60 ? '…' : ''}` : ''}</div>
                    </div>
                  </div>
                  ${r.duracion ? `<span class="rec-dur">${r.duracion}</span>` : ''}
                </div>`).join('')}

              <p class="blk-titulo">📅 Plan por días</p>
              <div class="dias-grid">
                ${DIAS.map((d, i) => `
                  <div class="dia-col">
                    <div class="dia-head">${d}</div>
                    <div class="dia-body">${diasRecursos[i].map(x => `<div class="dia-item">${x}</div>`).join('')}</div>
                  </div>`).join('')}
              </div>

              ${s.tips?.length ? `
                <p class="blk-titulo">💡 Tips</p>
                ${s.tips.map(t => `<div class="tip-row">→ ${t}</div>`).join('')}` : ''}

              ${s.lecturaRecomendada ? `
                <p class="blk-titulo">📖 Lectura recomendada</p>
                <div class="lectura-box">
                  <b class="lectura-titulo">${s.lecturaRecomendada.titulo}</b>
                  <p class="lectura-det">${s.lecturaRecomendada.articulo}</p>
                  <p class="lectura-meta">⏱ ${s.lecturaRecomendada.tiempo}</p>
                </div>` : ''}

              <div class="chklist-box">
                <p class="chklist-titulo">✅ Mi progreso esta semana</p>
                <div class="chklist-grid">
                  ${CHECKS.map(c => `<div class="chk-item"><span class="chk-box"></span><span>${c}</span></div>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="page-footer">
          <span>Juridia · ${nombreExamen} — Nivel ${nombreFase}</span>
          <span>Semana ${s.numero_semana} · hairch.dev</span>
        </footer>
      </section>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Plan de Estudio Juridia — ${nombreExamen}</title>
<style>
/* ── Reset ── */
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Segoe UI',system-ui,sans-serif; color:#1e293b; background:#fff; font-size:13px; line-height:1.55; }

/* ── Página: cada section = 1 hoja A4 ── */
.pagina {
  width:210mm; min-height:297mm;
  display:flex; flex-direction:column;
  page-break-after:always; page-break-inside:avoid;
  overflow:hidden; background:#fff;
}
.pagina:last-child { page-break-after:avoid; }

/* ── PORTADA ── */
.portada {
  background:linear-gradient(150deg,#0f2942 0%,#1a4a6e 45%,#2a628f 100%);
  color:#fff; position:relative;
}
.portada-deco { position:absolute; border-radius:50%; pointer-events:none; }
.d1 { width:280px;height:280px; background:rgba(255,255,255,.04); top:-70px; right:-70px; }
.d2 { width:340px;height:340px; background:rgba(255,255,255,.03); bottom:40px; left:-110px; }
.portada-top {
  padding:36px 48px 0; display:flex; justify-content:space-between;
  align-items:center; position:relative; z-index:2;
}
.portada-fecha { font-size:10.5px; color:rgba(255,255,255,.4); }
.portada-main {
  flex:1; padding:52px 48px; position:relative; z-index:2;
  display:flex; flex-direction:column; justify-content:center;
}
.portada-label { font-size:9.5px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:#9ac1e2; margin-bottom:12px; }
.portada-titulo { font-size:42px; font-weight:800; line-height:1.1; letter-spacing:-1.5px; margin-bottom:8px; }
.portada-sub { font-size:18px; font-weight:300; color:rgba(255,255,255,.7); margin-bottom:36px; }
.pills { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:40px; }
.pill {
  background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.2);
  border-radius:100px; padding:6px 14px; font-size:11px; font-weight:500;
}
.divider-line { width:48px; height:3px; background:linear-gradient(90deg,#9ac1e2,transparent); border-radius:2px; margin-bottom:18px; }
.portada-desc { font-size:11.5px; color:rgba(255,255,255,.55); max-width:380px; line-height:1.7; }
.portada-footer {
  padding:22px 48px; border-top:1px solid rgba(255,255,255,.1);
  display:flex; justify-content:space-between; align-items:center; position:relative; z-index:2;
}
.footer-url { font-size:10px; color:rgba(255,255,255,.35); }
.footer-badge {
  background:rgba(154,193,226,.15); border:1px solid rgba(154,193,226,.3);
  border-radius:5px; padding:4px 11px; font-size:10px; color:#9ac1e2; font-weight:600;
}

/* ── Branding ── */
.brand { font-size:19px; font-weight:800; color:#fff; letter-spacing:-.3px; }
.brand em { color:#9ac1e2; font-style:normal; }
.brand.sm { font-size:13px; }

/* ── Páginas internas ── */
.page-header {
  background:linear-gradient(90deg,#0f2942,#2a628f);
  padding:16px 36px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;
}
.page-meta { font-size:10px; color:rgba(255,255,255,.6); }
.page-body { flex:1; padding:22px 36px 14px; overflow:hidden; }
.page-footer {
  padding:9px 36px; border-top:1px solid #e2e8f0; background:#f8fafc;
  display:flex; justify-content:space-between; flex-shrink:0;
  font-size:9.5px; color:#94a3b8;
}

/* ── Intro ── */
.intro-box {
  background:linear-gradient(135deg,#f0f7ff,#e8f4fd);
  border-left:4px solid #2a628f; border-radius:9px;
  padding:20px 24px; margin-bottom:18px;
}
.intro-titulo { font-size:16px; font-weight:700; color:#0f2942; margin-bottom:8px; }
.intro-texto { font-size:11.5px; color:#475569; line-height:1.75; }
.intro-firma { margin-top:12px; font-size:11px; font-weight:600; color:#2a628f; }

/* ── Stats ── */
.stat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:11px; margin-bottom:18px; }
.stat-card {
  background:linear-gradient(135deg,#0f2942,#2a628f);
  border-radius:8px; padding:14px; color:#fff; text-align:center;
}
.stat-num { font-size:24px; font-weight:800; line-height:1; margin-bottom:3px; }
.stat-lbl { font-size:9px; color:rgba(255,255,255,.65); text-transform:uppercase; letter-spacing:1px; }

/* ── Tabla calendario ── */
.sec-titulo { font-size:13px; font-weight:700; color:#0f2942; margin-bottom:8px; padding-bottom:6px; border-bottom:2px solid #e2e8f0; }
.cal-table { width:100%; border-collapse:collapse; font-size:10.5px; }
.cal-table thead tr { background:linear-gradient(90deg,#0f2942,#2a628f); color:#fff; }
.cal-table thead th { padding:8px 10px; text-align:left; font-weight:600; font-size:10px; }
.cal-table tbody tr:nth-child(even) { background:#f8fafc; }
.cal-table tbody td { padding:7px 10px; border-bottom:1px solid #e2e8f0; vertical-align:middle; }
.s-num { color:#2a628f; font-size:10.5px; }
.s-titulo { color:#1e293b; font-weight:500; line-height:1.3; }
.chk-box { display:inline-block; width:13px; height:13px; border:1.5px solid #cbd5e1; border-radius:3px; background:#fff; }

/* ── Semana card ── */
.semana-card { border:1.5px solid #e2e8f0; border-radius:10px; overflow:hidden; }
.semana-head {
  background:linear-gradient(90deg,#0f2942,#1e4a70);
  padding:12px 18px; display:flex; justify-content:space-between; align-items:flex-start;
}
.semana-num-lbl { font-size:9px; font-weight:700; color:#9ac1e2; text-transform:uppercase; letter-spacing:2px; margin-bottom:3px; }
.semana-titulo { font-size:13px; font-weight:700; color:#fff; line-height:1.3; max-width:380px; }
.semana-nivel {
  background:rgba(154,193,226,.15); border:1px solid rgba(154,193,226,.25);
  border-radius:5px; padding:3px 8px; font-size:9.5px; color:#9ac1e2; flex-shrink:0;
}
.semana-body { padding:14px 18px; }
.semana-desc { font-size:11px; color:#64748b; line-height:1.65; margin-bottom:10px; }

/* Bloque título */
.blk-titulo {
  font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px;
  color:#2a628f; margin:10px 0 6px;
  display:flex; align-items:center; gap:6px;
}
.blk-titulo::after { content:''; flex:1; height:1px; background:#e2e8f0; }

/* Objetivos */
.obj-row {
  display:flex; align-items:flex-start; gap:7px;
  background:#f0fdf4; border-left:3px solid #22c55e;
  padding:5px 9px; border-radius:0 5px 5px 0; font-size:10.5px; margin-bottom:3px;
}
.obj-dot { width:5px; height:5px; border-radius:50%; background:#22c55e; margin-top:4px; flex-shrink:0; }

/* Recursos */
.rec-row {
  display:flex; align-items:center; justify-content:space-between;
  background:#f8fafc; border:1px solid #e2e8f0; padding:5px 9px;
  border-radius:6px; gap:8px; margin-bottom:3px;
}
.rec-left { display:flex; align-items:center; gap:7px; flex:1; min-width:0; }
.rec-chk { width:11px; height:11px; border:1.5px solid #cbd5e1; border-radius:3px; background:#fff; flex-shrink:0; }
.rec-nombre { font-size:10.5px; color:#1e293b; font-weight:500; }
.rec-tipo { font-size:9.5px; color:#94a3b8; }
.rec-dur { font-size:9.5px; color:#2a628f; font-weight:700; white-space:nowrap; flex-shrink:0; }

/* Días */
.dias-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:5px; margin-bottom:4px; }
.dia-col { background:#f8fafc; border-radius:6px; border:1px solid #e2e8f0; overflow:hidden; }
.dia-head { background:#1e4a70; padding:4px; text-align:center; font-size:8px; font-weight:700; color:#fff; text-transform:uppercase; }
.dia-body { padding:5px; display:flex; flex-direction:column; gap:3px; min-height:44px; }
.dia-item { font-size:8px; color:#374151; line-height:1.35; padding:2px 4px; background:#fff; border-radius:3px; border:1px solid #e9edf2; }

/* Tips */
.tip-row { background:#fffbeb; border-left:3px solid #f59e0b; padding:5px 9px; border-radius:0 5px 5px 0; font-size:10.5px; color:#44403c; margin-bottom:3px; }

/* Lectura */
.lectura-box { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:7px; padding:9px 12px; margin-bottom:4px; }
.lectura-titulo { font-size:10px; font-weight:700; color:#15803d; display:block; margin-bottom:2px; }
.lectura-det { font-size:10px; color:#374151; margin-bottom:2px; }
.lectura-meta { font-size:9.5px; color:#6b7280; }

/* Checklist */
.chklist-box { border:1.5px dashed #cbd5e1; border-radius:7px; padding:9px 13px; margin-top:8px; background:#fafafa; }
.chklist-titulo { font-size:9px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:1px; margin-bottom:7px; }
.chklist-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:4px; }
.chk-item { display:flex; align-items:center; gap:6px; font-size:10px; color:#475569; }

/* ── PRINT ── */
@page { size:A4; margin:0; }
@media print {
  body { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .pagina { page-break-after:always; page-break-inside:avoid; }
  .pagina:last-child { page-break-after:avoid; }
}
</style>
</head>
<body>
  ${portada}
  ${intro}
  ${semanas}
</body>
</html>`;
}

export async function generarPlanPDF(plan: PlanParaPDF): Promise<void> {
  const html = buildHTML(plan);

  const win = window.open('', '_blank', `width=900,height=700,scrollbars=yes`);
  if (!win) {
    alert('El navegador bloqueó la ventana emergente. Permite ventanas emergentes para este sitio e intenta de nuevo.');
    return;
  }

  win.document.open();
  win.document.write(html);
  win.document.close();

  // Esperar a que carguen fuentes e imágenes, luego disparar impresión
  win.addEventListener('load', () => {
    setTimeout(() => {
      win.focus();
      win.print();
    }, 600);
  });
}
