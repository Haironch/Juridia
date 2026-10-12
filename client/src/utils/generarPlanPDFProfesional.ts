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
    fecha_inicio?: string;
    fecha_fin?: string;
  }>;
}

// ── Constants ─────────────────────────────────────────────────────────────────
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

// 16 semana colors (bg / accent) - soft, print-friendly
const WEEK_COLORS = [
  { bg: '#dbeafe', accent: '#1d4ed8', light: '#eff6ff' },
  { bg: '#d1fae5', accent: '#065f46', light: '#ecfdf5' },
  { bg: '#fef3c7', accent: '#92400e', light: '#fffbeb' },
  { bg: '#fce7f3', accent: '#9d174d', light: '#fdf4ff' },
  { bg: '#ede9fe', accent: '#5b21b6', light: '#f5f3ff' },
  { bg: '#fee2e2', accent: '#991b1b', light: '#fff1f2' },
  { bg: '#cffafe', accent: '#164e63', light: '#ecfeff' },
  { bg: '#dcfce7', accent: '#14532d', light: '#f0fdf4' },
  { bg: '#fef9c3', accent: '#713f12', light: '#fefce8' },
  { bg: '#f0abfc', accent: '#701a75', light: '#fdf4ff' },
  { bg: '#bfdbfe', accent: '#1e3a8a', light: '#eff6ff' },
  { bg: '#bbf7d0', accent: '#064e3b', light: '#f0fdf4' },
  { bg: '#fed7aa', accent: '#7c2d12', light: '#fff7ed' },
  { bg: '#e9d5ff', accent: '#4c1d95', light: '#faf5ff' },
  { bg: '#fecaca', accent: '#7f1d1d', light: '#fef2f2' },
  { bg: '#a5f3fc', accent: '#0c4a6e', light: '#ecfeff' },
];

const DIAS_SEMANA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// ── Date helpers ──────────────────────────────────────────────────────────────
function parseDate(s: string): Date {
  // "YYYY-MM-DD" or ISO string
  const d = new Date(s.includes('T') ? s : s + 'T12:00:00');
  return d;
}

function toYMD(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d); r.setDate(r.getDate() + n); return r;
}

function diffDays(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function formatDate(d: Date, opts?: Intl.DateTimeFormatOptions): string {
  return d.toLocaleDateString('es-GT', opts ?? { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatShort(d: Date): string {
  return d.toLocaleDateString('es-GT', { day: 'numeric', month: 'short' });
}

// Build a map: "YYYY-MM-DD" -> week number (1-based)
function buildDayMap(semanas: PlanParaPDF['semanas']): Record<string, number> {
  const map: Record<string, number> = {};
  for (const s of semanas) {
    if (!s.fecha_inicio || !s.fecha_fin) continue;
    let cur = parseDate(s.fecha_inicio);
    const end = parseDate(s.fecha_fin);
    while (cur <= end) {
      map[toYMD(cur)] = s.numero_semana;
      cur = addDays(cur, 1);
    }
  }
  return map;
}

// Generate month grid HTML
function renderMonth(year: number, month: number, dayMap: Record<string, number>, examYMD: string | null): string {
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay(); // 0=Sun

  let cells = '';
  // Empty cells before month start
  for (let i = 0; i < startDow; i++) {
    cells += `<div class="cal-cell empty"></div>`;
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const ymd = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const weekNum = dayMap[ymd];
    const isExam = ymd === examYMD;
    const col = weekNum ? WEEK_COLORS[(weekNum - 1) % WEEK_COLORS.length] : null;

    let style = '';
    let cls = 'cal-cell';
    if (isExam) {
      cls += ' exam-day';
    } else if (col) {
      style = `background:${col.bg};border-color:${col.accent}44;`;
      cls += ' study-day';
    }

    const weekLabel = weekNum ? `<span class="cal-week-lbl" style="background:${col!.accent};color:#fff">S${weekNum}</span>` : '';
    const examLabel = isExam ? `<span class="cal-exam-lbl">EXAMEN</span>` : '';

    cells += `
      <div class="${cls}" style="${style}">
        <div class="cal-day-top">
          <span class="cal-day-num${isExam ? ' exam-num' : weekNum ? ' study-num' : ''}">${d}</span>
          ${weekLabel}${examLabel}
        </div>
        <div class="cal-check-row">
          <span class="cal-circle"></span>
        </div>
      </div>`;
  }

  // Fill trailing cells to complete grid
  const total = startDow + lastDay.getDate();
  const trailing = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let i = 0; i < trailing; i++) {
    cells += `<div class="cal-cell empty"></div>`;
  }

  return `
    <div class="month-block">
      <div class="month-name">${MESES[month]} ${year}</div>
      <div class="cal-grid">
        ${DIAS_SEMANA.map(d => `<div class="cal-dow">${d}</div>`).join('')}
        ${cells}
      </div>
    </div>`;
}

// ── Resource type labels ──────────────────────────────────────────────────────
const TIPO_LABEL: Record<string, string> = {
  glosario: 'Glosario', quiz: 'Quiz', caso: 'Caso práctico',
  documento: 'Documento', material: 'Material', lectura: 'Lectura',
  tip: 'Tip', actividad: 'Actividad',
};

// ── Build HTML ────────────────────────────────────────────────────────────────
function buildHTML(plan: PlanParaPDF): string {
  const nombreExamen = NOMBRES_EXAMEN[plan.examen] ?? plan.examen;
  const nombreFase   = NOMBRES_FASE[plan.fase]   ?? plan.fase;
  const hoy = new Date();
  const hoyStr = formatDate(hoy);

  const planStart = plan.semanas[0]?.fecha_inicio
    ? parseDate(plan.semanas[0].fecha_inicio)
    : hoy;
  const planEnd = plan.semanas[plan.semanas.length - 1]?.fecha_fin
    ? parseDate(plan.semanas[plan.semanas.length - 1].fecha_fin!)
    : addDays(hoy, plan.semanas.length * 7);

  const examDate = plan.fechaExamen ? parseDate(plan.fechaExamen) : null;
  const examYMD  = examDate ? toYMD(examDate) : null;
  const diasAlExamen = examDate ? diffDays(hoy, examDate) : null;

  const dayMap = buildDayMap(plan.semanas);
  const totalRecursos = plan.semanas.reduce((a, s) => a + s.recursos.length, 0);

  // ── PORTADA ───────────────────────────────────────────────────────────────
  const portada = `
    <section class="pagina portada">
      <div class="portada-blob b1"></div>
      <div class="portada-blob b2"></div>
      <header class="portada-top">
        <div class="brand-mark">Juridia<span class="brand-dot">.</span></div>
        <span class="portada-fecha-lbl">Generado el ${hoyStr}</span>
      </header>
      <main class="portada-main">
        <p class="portada-eyebrow">Plan de Estudio Personalizado</p>
        <h1 class="portada-h1">${nombreExamen}</h1>
        <p class="portada-h2">Nivel ${nombreFase}</p>
        <div class="portada-rule"></div>
        <div class="portada-chips">
          <span class="p-chip">${plan.semanas.length} semanas</span>
          <span class="p-chip">${totalRecursos} recursos</span>
          ${examDate ? `<span class="p-chip exam-chip">Examen: ${formatShort(examDate)}</span>` : ''}
          ${diasAlExamen !== null ? `<span class="p-chip count-chip">${diasAlExamen} días</span>` : ''}
        </div>
      </main>
      <footer class="portada-footer">
        <div class="portada-footer-left">
          <span class="footer-brand">juridia-eta.vercel.app</span>
          <span class="footer-sub">Plataforma de Derecho Guatemalteco</span>
        </div>
        <div class="footer-badge-pill">hairch.dev</div>
      </footer>
    </section>`;

  // ── RESUMEN ───────────────────────────────────────────────────────────────
  const leyendaColores = plan.semanas.slice(0, 8).map(s => {
    const col = WEEK_COLORS[(s.numero_semana - 1) % WEEK_COLORS.length];
    return `<div class="leyenda-item">
      <span class="leyenda-dot" style="background:${col.accent}"></span>
      <span class="leyenda-s">S${s.numero_semana}</span>
      <span class="leyenda-t">${s.titulo}</span>
    </div>`;
  }).join('');

  const tablaResumen = plan.semanas.map(s => {
    const col = WEEK_COLORS[(s.numero_semana - 1) % WEEK_COLORS.length];
    const fi = s.fecha_inicio ? formatShort(parseDate(s.fecha_inicio)) : '—';
    const ff = s.fecha_fin   ? formatShort(parseDate(s.fecha_fin))   : '—';
    return `<tr>
      <td><span class="tag-s" style="background:${col.bg};color:${col.accent};border:1px solid ${col.accent}44">S${s.numero_semana}</span></td>
      <td class="td-titulo">${s.titulo}</td>
      <td class="td-fecha">${fi} – ${ff}</td>
      <td class="td-rec">${s.recursos.length}</td>
      <td><span class="chk-sq"></span></td>
    </tr>`;
  }).join('');

  const resumen = `
    <section class="pagina interna">
      ${pageHeader(nombreExamen, nombreFase, 'Resumen del plan')}
      <div class="page-body">
        <div class="stats-row">
          <div class="stat-box">
            <span class="stat-n">${plan.semanas.length}</span>
            <span class="stat-l">Semanas</span>
          </div>
          <div class="stat-box">
            <span class="stat-n">${totalRecursos}</span>
            <span class="stat-l">Recursos</span>
          </div>
          <div class="stat-box">
            <span class="stat-n">${plan.semanas.reduce((a,s)=>a+(s.objetivos?.length??0),0)}</span>
            <span class="stat-l">Objetivos</span>
          </div>
          ${diasAlExamen !== null ? `<div class="stat-box accent-box">
            <span class="stat-n">${diasAlExamen}</span>
            <span class="stat-l">Días al examen</span>
          </div>` : ''}
        </div>

        ${plan.semanas.length > 8 ? '' : `<div class="leyenda-block">${leyendaColores}</div>`}

        <div class="section-head">Cronograma de semanas</div>
        <table class="resumen-table">
          <thead>
            <tr>
              <th style="width:44px">Sem.</th>
              <th>Tema</th>
              <th style="width:100px">Fechas</th>
              <th style="width:50px;text-align:center">Rec.</th>
              <th style="width:60px;text-align:center">Hecho</th>
            </tr>
          </thead>
          <tbody>${tablaResumen}</tbody>
        </table>

        ${examDate ? `
        <div class="exam-banner">
          <div class="exam-banner-icon">📅</div>
          <div>
            <p class="exam-banner-label">Fecha del examen</p>
            <p class="exam-banner-date">${formatDate(examDate, { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</p>
          </div>
          ${diasAlExamen !== null ? `<div class="exam-banner-count"><span class="exam-count-n">${diasAlExamen}</span><span class="exam-count-l">días</span></div>` : ''}
        </div>` : ''}
      </div>
      ${pageFooter(nombreExamen, nombreFase, hoyStr)}
    </section>`;

  // ── CALENDARIO DE CONTEO ──────────────────────────────────────────────────
  // Determine which months to show
  const calStart = planStart;
  const calEnd   = examDate ? examDate : planEnd;

  const months: Array<[number,number]> = [];
  let cur = new Date(calStart.getFullYear(), calStart.getMonth(), 1);
  const endMonth = new Date(calEnd.getFullYear(), calEnd.getMonth(), 1);
  while (cur <= endMonth) {
    months.push([cur.getFullYear(), cur.getMonth()]);
    cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
  }

  // Split months into pages (2 per page)
  const calPagesHTML: string[] = [];
  for (let i = 0; i < months.length; i += 2) {
    const slice = months.slice(i, i + 2);
    const monthsHTML = slice.map(([y, m]) => renderMonth(y, m, dayMap, examYMD)).join('');

    // Legend for this spread
    const legendItems = plan.semanas.map(s => {
      const col = WEEK_COLORS[(s.numero_semana - 1) % WEEK_COLORS.length];
      return `<span class="spread-legend-item"><span class="spread-dot" style="background:${col.accent}"></span>Sem. ${s.numero_semana}: ${s.titulo.length > 28 ? s.titulo.slice(0,28)+'…' : s.titulo}</span>`;
    }).join('');

    calPagesHTML.push(`
      <section class="pagina interna">
        ${pageHeader(nombreExamen, nombreFase, 'Calendario de estudio')}
        <div class="page-body cal-page-body">
          <div class="spread-legend">${legendItems}${examYMD ? `<span class="spread-legend-item"><span class="spread-dot exam-dot"></span>Día de examen</span>` : ''}</div>
          <div class="months-wrapper">
            ${monthsHTML}
          </div>
          <p class="cal-instructions">Marca el círculo de cada día que estudies. Los días coloreados pertenecen a la semana indicada.</p>
        </div>
        ${pageFooter(nombreExamen, nombreFase, hoyStr)}
      </section>`);
  }

  // ── PÁGINAS POR SEMANA ────────────────────────────────────────────────────
  const semanasHTML = plan.semanas.map(s => {
    const col = WEEK_COLORS[(s.numero_semana - 1) % WEEK_COLORS.length];
    const fi = s.fecha_inicio ? parseDate(s.fecha_inicio) : null;
    const ff = s.fecha_fin   ? parseDate(s.fecha_fin)   : null;
    const fechaRango = fi && ff
      ? `${formatDate(fi, { weekday:'short', day:'numeric', month:'short' })} — ${formatDate(ff, { weekday:'short', day:'numeric', month:'short' })}`
      : '';

    // Distribute resources across Mon-Sun (7 days)
    const diasNombres = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    const diasRec: string[][] = diasNombres.map(() => []);
    s.recursos.forEach((r, i) => {
      diasRec[i % 5].push(`${r.nombre}`); // Mon–Fri
    });

    const diasHTML = diasNombres.map((dia, i) => {
      const items = diasRec[i];
      const isWeekend = i >= 5;
      return `
        <div class="dia-box${isWeekend ? ' dia-weekend' : ''}">
          <div class="dia-name" style="${!isWeekend ? `background:${col.accent};color:#fff` : ''}">${dia}</div>
          <div class="dia-content">
            ${items.length
              ? items.map(it => `<div class="dia-task"><span class="dia-circle"></span><span>${it}</span></div>`).join('')
              : `<div class="dia-free">${isWeekend ? 'Descanso / Repaso' : 'Práctica libre'}</div>`}
          </div>
        </div>`;
    }).join('');

    const objetivosHTML = s.objetivos?.length
      ? s.objetivos.map(o => `<div class="obj-item"><span class="obj-chk"></span><span>${o}</span></div>`).join('')
      : '';

    const recursosHTML = s.recursos.map(r => `
      <div class="rec-item">
        <span class="rec-chk"></span>
        <div class="rec-info">
          <span class="rec-name">${r.nombre}</span>
          <span class="rec-meta">${TIPO_LABEL[r.tipo] ?? r.tipo}${r.duracion ? ` · ${r.duracion}` : ''}${r.descripcion ? ` · ${r.descripcion.slice(0,55)}${r.descripcion.length>55?'…':''}` : ''}</span>
        </div>
      </div>`).join('');

    const tipsHTML = s.tips?.length
      ? s.tips.map(t => `<div class="tip-item">→ ${t}</div>`).join('')
      : '';

    const lecturaHTML = s.lecturaRecomendada
      ? `<div class="lectura-box">
          <span class="lectura-title">${s.lecturaRecomendada.titulo}</span>
          <span class="lectura-ref">${s.lecturaRecomendada.articulo}</span>
          <span class="lectura-time">⏱ ${s.lecturaRecomendada.tiempo}</span>
        </div>`
      : '';

    return `
      <section class="pagina interna">
        ${pageHeader(nombreExamen, nombreFase, `Semana ${s.numero_semana} de ${plan.semanas.length}`)}
        <div class="page-body semana-body">

          <!-- Semana header -->
          <div class="semana-hdr" style="border-left:4px solid ${col.accent};background:${col.light}">
            <div class="semana-hdr-left">
              <span class="semana-tag" style="background:${col.accent};color:#fff">Semana ${s.numero_semana}</span>
              <h2 class="semana-h2">${s.titulo}</h2>
              ${fechaRango ? `<p class="semana-fechas">${fechaRango}</p>` : ''}
            </div>
            <span class="semana-nivel-badge">${nombreFase}</span>
          </div>

          <p class="semana-desc">${s.descripcion}</p>

          <div class="two-col">
            <div class="col-left">
              ${objetivosHTML ? `<div class="blk-title">Objetivos de la semana</div>${objetivosHTML}` : ''}
              <div class="blk-title" style="margin-top:${objetivosHTML?'10px':'0'}">Recursos</div>
              ${recursosHTML}
              ${tipsHTML ? `<div class="blk-title" style="margin-top:10px">Tips</div>${tipsHTML}` : ''}
              ${lecturaHTML ? `<div class="blk-title" style="margin-top:10px">Lectura recomendada</div>${lecturaHTML}` : ''}
            </div>
            <div class="col-right">
              <div class="blk-title">Plan diario</div>
              <div class="dias-wrapper">${diasHTML}</div>
              <div class="notas-box">
                <p class="notas-label">Notas de la semana</p>
                <div class="notas-lines">
                  <div class="nota-line"></div>
                  <div class="nota-line"></div>
                  <div class="nota-line"></div>
                  <div class="nota-line"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
        ${pageFooter(nombreExamen, nombreFase, `Semana ${s.numero_semana} · hairch.dev`)}
      </section>`;
  }).join('');

  // ── CSS ───────────────────────────────────────────────────────────────────
  const css = `
/* Reset */
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html, body { background:#e5e7eb; }
body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color:#1e293b; font-size:11px; line-height:1.55; }

/* Page */
.pagina {
  width:210mm; min-height:297mm;
  display:flex; flex-direction:column;
  background:#fff;
  page-break-after:always; page-break-inside:avoid;
  margin:0 auto 20px;
  box-shadow:0 2px 12px rgba(0,0,0,.12);
}
.pagina:last-child { page-break-after:avoid; margin-bottom:0; }

/* ── COVER ─────────────────────────────────────────────────── */
.portada {
  background:linear-gradient(145deg,#0d1f35 0%,#13293d 40%,#18435a 70%,#2a628f 100%);
  color:#fff; position:relative; overflow:hidden;
}
.portada-blob { position:absolute; border-radius:50%; pointer-events:none; }
.b1 { width:320px;height:320px;background:rgba(154,193,226,.06);top:-80px;right:-80px; }
.b2 { width:280px;height:280px;background:rgba(255,255,255,.04);bottom:30px;left:-100px; }
.portada-top {
  padding:32px 44px 0; display:flex; justify-content:space-between;
  align-items:center; position:relative; z-index:2;
}
.brand-mark { font-size:20px; font-weight:800; letter-spacing:-.5px; color:#fff; }
.brand-dot { color:#9ac1e2; }
.portada-fecha-lbl { font-size:9.5px; color:rgba(255,255,255,.35); }
.portada-main {
  flex:1; padding:48px 44px; position:relative; z-index:2;
  display:flex; flex-direction:column; justify-content:center;
}
.portada-eyebrow {
  font-size:9px; font-weight:700; letter-spacing:3.5px; text-transform:uppercase;
  color:#9ac1e2; margin-bottom:14px;
}
.portada-h1 {
  font-size:40px; font-weight:800; line-height:1.05;
  letter-spacing:-1.5px; color:#fff; margin-bottom:8px;
}
.portada-h2 { font-size:18px; font-weight:300; color:rgba(255,255,255,.6); margin-bottom:32px; }
.portada-rule { width:40px; height:3px; background:linear-gradient(90deg,#9ac1e2,transparent); border-radius:2px; margin-bottom:28px; }
.portada-chips { display:flex; flex-wrap:wrap; gap:8px; }
.p-chip {
  background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18);
  border-radius:100px; padding:5px 13px; font-size:10.5px; font-weight:500; color:rgba(255,255,255,.85);
}
.exam-chip { background:rgba(220,38,38,.25); border-color:rgba(252,165,165,.4); }
.count-chip { background:rgba(251,191,36,.2); border-color:rgba(253,224,71,.4); color:#fde68a; }
.portada-footer {
  padding:18px 44px; border-top:1px solid rgba(255,255,255,.08);
  display:flex; justify-content:space-between; align-items:center; position:relative; z-index:2;
}
.portada-footer-left { display:flex; flex-direction:column; gap:2px; }
.footer-brand { font-size:10px; color:rgba(255,255,255,.4); }
.footer-sub { font-size:9px; color:rgba(255,255,255,.25); }
.footer-badge-pill {
  background:rgba(154,193,226,.12); border:1px solid rgba(154,193,226,.25);
  border-radius:6px; padding:4px 12px; font-size:9.5px; color:#9ac1e2; font-weight:600;
}

/* ── INTERNAL PAGES ────────────────────────────────────────── */
.page-header {
  background:linear-gradient(90deg,#0d1f35 0%,#1a3a5c 60%,#2a628f 100%);
  padding:13px 32px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;
}
.ph-brand { font-size:12px; font-weight:800; color:#fff; letter-spacing:-.2px; }
.ph-brand span { color:#9ac1e2; }
.ph-meta { font-size:9px; color:rgba(255,255,255,.55); text-align:right; }
.page-body { flex:1; padding:18px 32px 12px; overflow:hidden; }
.page-footer {
  padding:8px 32px; border-top:1px solid #e2e8f0; background:#f8fafc;
  display:flex; justify-content:space-between; flex-shrink:0;
  font-size:9px; color:#94a3b8;
}

/* ── RESUMEN ───────────────────────────────────────────────── */
.stats-row { display:flex; gap:10px; margin-bottom:14px; }
.stat-box {
  flex:1; background:#f1f5f9; border-radius:8px; padding:10px;
  text-align:center; border:1px solid #e2e8f0;
}
.accent-box { background:linear-gradient(135deg,#13293d,#2a628f); border:none; }
.accent-box .stat-n, .accent-box .stat-l { color:#fff; }
.stat-n { display:block; font-size:22px; font-weight:800; color:#0d1f35; line-height:1; }
.stat-l { display:block; font-size:8.5px; text-transform:uppercase; letter-spacing:1px; color:#64748b; margin-top:3px; }

.leyenda-block { display:flex; flex-wrap:wrap; gap:4px 12px; margin-bottom:12px; padding:8px 12px; background:#f8fafc; border-radius:7px; border:1px solid #e2e8f0; }
.leyenda-item { display:flex; align-items:center; gap:4px; font-size:9.5px; color:#374151; }
.leyenda-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
.leyenda-s { font-weight:700; color:#0d1f35; }
.leyenda-t { color:#64748b; }

.section-head {
  font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px;
  color:#475569; margin-bottom:7px; padding-bottom:5px;
  border-bottom:2px solid #e2e8f0;
}

.resumen-table { width:100%; border-collapse:collapse; font-size:10px; }
.resumen-table thead tr { background:linear-gradient(90deg,#0d1f35,#2a628f); }
.resumen-table thead th { padding:7px 9px; text-align:left; font-size:9px; font-weight:600; color:#fff; }
.resumen-table tbody tr:nth-child(even) { background:#f8fafc; }
.resumen-table tbody td { padding:6px 9px; border-bottom:1px solid #e9ecef; vertical-align:middle; }
.tag-s { display:inline-block; padding:2px 7px; border-radius:100px; font-size:9px; font-weight:700; }
.td-titulo { font-weight:500; color:#1e293b; }
.td-fecha { color:#64748b; font-size:9.5px; white-space:nowrap; }
.td-rec { text-align:center; font-weight:700; color:#2a628f; }
.chk-sq { display:inline-block; width:12px; height:12px; border:1.5px solid #cbd5e1; border-radius:3px; }

.exam-banner {
  margin-top:14px; display:flex; align-items:center; gap:14px;
  background:linear-gradient(90deg,#0d1f35,#1a3a5c);
  border-radius:9px; padding:12px 18px; color:#fff;
}
.exam-banner-icon { font-size:22px; flex-shrink:0; }
.exam-banner-label { font-size:9px; text-transform:uppercase; letter-spacing:1.5px; color:#9ac1e2; margin-bottom:2px; }
.exam-banner-date { font-size:13px; font-weight:700; }
.exam-banner-count { margin-left:auto; text-align:center; }
.exam-count-n { display:block; font-size:28px; font-weight:800; line-height:1; }
.exam-count-l { font-size:8.5px; text-transform:uppercase; letter-spacing:1px; color:#9ac1e2; }

/* ── CALENDARIO ────────────────────────────────────────────── */
.cal-page-body { display:flex; flex-direction:column; padding-bottom:8px; }
.spread-legend {
  display:flex; flex-wrap:wrap; gap:4px 14px;
  margin-bottom:10px; padding:6px 10px;
  background:#f8fafc; border-radius:6px; border:1px solid #e2e8f0;
}
.spread-legend-item { display:flex; align-items:center; gap:4px; font-size:9px; color:#374151; }
.spread-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
.exam-dot { background:#dc2626; }

.months-wrapper { display:grid; grid-template-columns:1fr 1fr; gap:12px; flex:1; }
.month-block { }
.month-name { font-size:12px; font-weight:700; color:#0d1f35; margin-bottom:6px; padding-bottom:5px; border-bottom:2px solid #e2e8f0; }
.cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; }
.cal-dow {
  text-align:center; font-size:8px; font-weight:700; text-transform:uppercase;
  color:#94a3b8; padding:3px 0; letter-spacing:.5px;
}
.cal-cell {
  min-height:32px; border:1px solid #e9ecef; border-radius:4px;
  padding:2px 3px; display:flex; flex-direction:column; justify-content:space-between;
  background:#fff;
}
.cal-cell.empty { background:transparent; border-color:transparent; }
.cal-cell.study-day { border-width:1.5px; }
.cal-cell.exam-day { background:#fef2f2; border:2px solid #dc2626 !important; }
.cal-day-top { display:flex; justify-content:space-between; align-items:flex-start; }
.cal-day-num { font-size:9.5px; font-weight:600; color:#374151; }
.study-num { color:#1e293b; font-weight:700; }
.exam-num { color:#dc2626; font-weight:800; font-size:10px; }
.cal-week-lbl {
  font-size:7px; font-weight:700; padding:1px 3px; border-radius:3px;
  line-height:1.2; flex-shrink:0;
}
.cal-exam-lbl {
  font-size:6px; font-weight:800; color:#dc2626; line-height:1.2;
  text-transform:uppercase; letter-spacing:.3px;
}
.cal-check-row { display:flex; align-items:center; justify-content:center; padding-bottom:1px; }
.cal-circle {
  width:11px; height:11px; border-radius:50%;
  border:1.5px solid #cbd5e1; background:#fff;
}
.cal-cell.study-day .cal-circle { border-color:currentColor; opacity:.6; }
.cal-cell.exam-day .cal-circle { border-color:#dc2626; }
.cal-instructions { font-size:8.5px; color:#94a3b8; text-align:center; margin-top:8px; font-style:italic; }

/* ── SEMANA PAGES ──────────────────────────────────────────── */
.semana-body { padding-bottom:8px; }
.semana-hdr {
  display:flex; align-items:flex-start; justify-content:space-between;
  padding:10px 14px; border-radius:8px; margin-bottom:8px;
}
.semana-hdr-left { display:flex; flex-direction:column; gap:3px; }
.semana-tag { font-size:8.5px; font-weight:700; padding:2px 8px; border-radius:100px; display:inline-block; width:fit-content; letter-spacing:.3px; }
.semana-h2 { font-size:14px; font-weight:800; color:#0d1f35; line-height:1.2; }
.semana-fechas { font-size:9.5px; color:#64748b; }
.semana-nivel-badge {
  font-size:9px; font-weight:600; padding:3px 9px; border-radius:5px;
  background:rgba(255,255,255,.7); color:#475569; border:1px solid #cbd5e1;
  white-space:nowrap; flex-shrink:0; margin-top:2px;
}
.semana-desc { font-size:10.5px; color:#475569; line-height:1.65; margin-bottom:10px; }

.two-col { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.blk-title {
  font-size:8.5px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px;
  color:#64748b; margin-bottom:5px; display:flex; align-items:center; gap:6px;
}
.blk-title::after { content:''; flex:1; height:1px; background:#e2e8f0; }

.obj-item { display:flex; gap:6px; align-items:flex-start; margin-bottom:3px; background:#f0fdf4; border-left:3px solid #22c55e; padding:4px 8px; border-radius:0 5px 5px 0; }
.obj-chk { width:11px; height:11px; border:1.5px solid #86efac; border-radius:3px; background:#fff; flex-shrink:0; margin-top:1px; }

.rec-item { display:flex; gap:6px; align-items:flex-start; margin-bottom:3px; padding:4px 7px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:5px; }
.rec-chk { width:11px; height:11px; border:1.5px solid #cbd5e1; border-radius:3px; background:#fff; flex-shrink:0; margin-top:2px; }
.rec-info { display:flex; flex-direction:column; min-width:0; }
.rec-name { font-size:10px; font-weight:600; color:#1e293b; }
.rec-meta { font-size:9px; color:#94a3b8; }

.tip-item { background:#fffbeb; border-left:3px solid #f59e0b; padding:4px 8px; border-radius:0 5px 5px 0; font-size:10px; color:#44403c; margin-bottom:3px; }

.lectura-box { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:7px 10px; }
.lectura-title { display:block; font-size:9.5px; font-weight:700; color:#15803d; margin-bottom:1px; }
.lectura-ref { display:block; font-size:9px; color:#374151; }
.lectura-time { display:block; font-size:9px; color:#6b7280; }

/* Daily plan */
.dias-wrapper { display:flex; flex-direction:column; gap:3px; margin-bottom:8px; }
.dia-box { border:1px solid #e2e8f0; border-radius:5px; overflow:hidden; }
.dia-weekend { opacity:.75; }
.dia-name { padding:3px 7px; font-size:8px; font-weight:700; text-transform:uppercase; letter-spacing:.5px; background:#f1f5f9; color:#64748b; }
.dia-content { padding:4px 7px; min-height:18px; }
.dia-task { display:flex; gap:5px; align-items:flex-start; font-size:9.5px; color:#374151; margin-bottom:1px; }
.dia-circle { width:10px; height:10px; border:1.5px solid #cbd5e1; border-radius:50%; flex-shrink:0; margin-top:1px; }
.dia-free { font-size:9px; color:#94a3b8; font-style:italic; }

.notas-box { border:1.5px dashed #e2e8f0; border-radius:6px; padding:7px 10px; }
.notas-label { font-size:8.5px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#94a3b8; margin-bottom:6px; }
.nota-line { height:1px; background:#e2e8f0; margin-bottom:10px; }

/* Print */
@page { size:A4; margin:0; }
@media print {
  html, body { background:#fff; }
  .pagina { margin:0; box-shadow:none; page-break-after:always; page-break-inside:avoid; }
  .pagina:last-child { page-break-after:avoid; }
  body { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
}`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Plan de Estudio — ${nombreExamen} · Juridia</title>
<style>${css}</style>
</head>
<body>
  ${portada}
  ${resumen}
  ${calPagesHTML.join('')}
  ${semanasHTML}
</body>
</html>`;
}

// ── Helper builders ───────────────────────────────────────────────────────────
function pageHeader(examen: string, fase: string, pageName: string): string {
  return `
    <header class="page-header">
      <div class="ph-brand">Juridia<span>.</span></div>
      <div class="ph-meta">
        <div>${examen} · ${fase}</div>
        <div>${pageName}</div>
      </div>
    </header>`;
}

function pageFooter(examen: string, fase: string, right: string): string {
  return `
    <footer class="page-footer">
      <span>Juridia · ${examen} — ${fase}</span>
      <span>${right}</span>
    </footer>`;
}

// ── Export ────────────────────────────────────────────────────────────────────
export async function generarPlanPDF(plan: PlanParaPDF): Promise<void> {
  const html = buildHTML(plan);

  const win = window.open('', '_blank', 'width=960,height=760,scrollbars=yes');
  if (!win) {
    alert('El navegador bloqueó la ventana emergente. Permite ventanas emergentes para este sitio e intenta de nuevo.');
    return;
  }

  win.document.open();
  win.document.write(html);
  win.document.close();

  win.addEventListener('load', () => {
    setTimeout(() => {
      win.focus();
      win.print();
    }, 700);
  });
}
