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

// ── Paleta de semanas ─────────────────────────────────────────────────────────
const WEEK_COLORS = [
  { bg: '#dbeafe', accent: '#1d4ed8', dark: '#1e3a8a', text: '#1e40af' },
  { bg: '#d1fae5', accent: '#059669', dark: '#064e3b', text: '#065f46' },
  { bg: '#fef3c7', accent: '#d97706', dark: '#78350f', text: '#92400e' },
  { bg: '#fce7f3', accent: '#db2777', dark: '#831843', text: '#9d174d' },
  { bg: '#ede9fe', accent: '#7c3aed', dark: '#4c1d95', text: '#5b21b6' },
  { bg: '#fee2e2', accent: '#dc2626', dark: '#7f1d1d', text: '#991b1b' },
  { bg: '#ccfbf1', accent: '#0d9488', dark: '#134e4a', text: '#115e59' },
  { bg: '#fef9c3', accent: '#ca8a04', dark: '#713f12', text: '#854d0e' },
  { bg: '#e0f2fe', accent: '#0284c7', dark: '#0c4a6e', text: '#075985' },
  { bg: '#f3e8ff', accent: '#9333ea', dark: '#581c87', text: '#6b21a8' },
  { bg: '#dcfce7', accent: '#16a34a', dark: '#14532d', text: '#15803d' },
  { bg: '#ffedd5', accent: '#ea580c', dark: '#7c2d12', text: '#9a3412' },
  { bg: '#cffafe', accent: '#0891b2', dark: '#164e63', text: '#0e7490' },
  { bg: '#fae8ff', accent: '#c026d3', dark: '#701a75', text: '#86198f' },
  { bg: '#ecfccb', accent: '#65a30d', dark: '#365314', text: '#4d7c0f' },
  { bg: '#fff7ed', accent: '#f97316', dark: '#7c2d12', text: '#c2410c' },
];

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

const TIPO_ICON: Record<string, string> = {
  glosario: '📚', quiz: '✏️', caso: '⚖️', documento: '📄',
  material: '📖', lectura: '📰', tip: '💡', actividad: '✍️',
};

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
               'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_DOW = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

// ── Date helpers ──────────────────────────────────────────────────────────────
function pd(s: string): Date {
  return new Date(s.includes('T') ? s : s + 'T12:00:00');
}
function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function addDays(d: Date, n: number): Date { const r=new Date(d); r.setDate(r.getDate()+n); return r; }
function diffDays(a: Date, b: Date): number { return Math.round((b.getTime()-a.getTime())/86400000); }
function fmt(d: Date, o?: Intl.DateTimeFormatOptions): string {
  return d.toLocaleDateString('es-GT', o ?? {day:'numeric',month:'long',year:'numeric'});
}

// Build day→week map
function buildDayMap(semanas: PlanParaPDF['semanas']): Record<string, number> {
  const m: Record<string, number> = {};
  for (const s of semanas) {
    if (!s.fecha_inicio || !s.fecha_fin) continue;
    let c = pd(s.fecha_inicio);
    const e = pd(s.fecha_fin);
    while (c <= e) { m[ymd(c)] = s.numero_semana; c = addDays(c,1); }
  }
  return m;
}

// ── Calendar month renderer (1 month per page, large cells) ──────────────────
function renderCalendarPage(
  year: number, month: number,
  dayMap: Record<string, number>,
  examYMD: string | null,
  nombreExamen: string, nombreFase: string,
  plan: PlanParaPDF,
  hoyStr: string
): string {
  const first = new Date(year, month, 1);
  const last  = new Date(year, month+1, 0);
  const startDow = first.getDay();

  // Legend for this month — only weeks that appear in this month
  const weeksInMonth = new Set<number>();
  for (let d = 1; d <= last.getDate(); d++) {
    const k = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    if (dayMap[k]) weeksInMonth.add(dayMap[k]);
  }

  const legendItems = Array.from(weeksInMonth).sort((a,b)=>a-b).map(n => {
    const c = WEEK_COLORS[(n-1) % WEEK_COLORS.length];
    const s = plan.semanas.find(x => x.numero_semana === n);
    return `<span class="cal-leg-item">
      <span class="cal-leg-dot" style="background:${c.accent}"></span>
      <span style="font-weight:700;color:${c.dark}">S${n}</span>
      <span>${s ? (s.titulo.length > 32 ? s.titulo.slice(0,32)+'…' : s.titulo) : ''}</span>
    </span>`;
  }).join('');

  // Build cells
  let cells = '';
  for (let i = 0; i < startDow; i++) cells += `<div class="mc empty"></div>`;

  for (let d = 1; d <= last.getDate(); d++) {
    const k = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const wn = dayMap[k];
    const isExam = k === examYMD;
    const c = wn ? WEEK_COLORS[(wn-1) % WEEK_COLORS.length] : null;

    let extra = '';
    if (isExam) extra = 'mc-exam';
    else if (c) extra = 'mc-study';

    const style = c && !isExam ? `background:${c.bg};border-color:${c.accent}55;` : '';
    const weekTag = wn && !isExam
      ? `<span class="mc-wtag" style="background:${c!.accent};color:#fff">S${wn}</span>`
      : '';
    const examTag = isExam ? `<span class="mc-etag">EXAMEN</span>` : '';
    const dayColor = isExam ? '#dc2626' : (c ? c.dark : '#374151');

    cells += `
      <div class="mc ${extra}" style="${style}">
        <div class="mc-top">
          <span class="mc-num" style="color:${dayColor}">${d}</span>
          ${weekTag}${examTag}
        </div>
        <div class="mc-bottom">
          <span class="mc-circle"></span>
        </div>
      </div>`;
  }

  const total = startDow + last.getDate();
  const trail = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let i = 0; i < trail; i++) cells += `<div class="mc empty"></div>`;

  return `
    <section class="page cal-page">
      <header class="ph">
        <div class="ph-brand">Juridia<span>.</span></div>
        <div class="ph-right">
          <div class="ph-title">${MESES[month]} ${year}</div>
          <div class="ph-sub">${nombreExamen} · ${nombreFase}</div>
        </div>
      </header>
      <div class="cal-body">
        ${legendItems ? `<div class="cal-legend">${legendItems}${examYMD ? `<span class="cal-leg-item"><span class="cal-leg-dot" style="background:#dc2626"></span><span style="font-weight:700;color:#991b1b">Examen</span></span>` : ''}</div>` : ''}
        <div class="cal-grid-wrap">
          <div class="cal-dow-row">
            ${DIAS_DOW.map(d => `<div class="cal-dow">${d}</div>`).join('')}
          </div>
          <div class="cal-cells">${cells}</div>
        </div>
        <p class="cal-hint">Marca el círculo de cada día que estudies ○</p>
      </div>
      <footer class="pf">
        <span>Juridia · ${nombreExamen} — ${nombreFase}</span>
        <span>${MESES[month]} ${year} · hairch.dev</span>
      </footer>
    </section>`;
}

// ── Main builder ──────────────────────────────────────────────────────────────
function buildHTML(plan: PlanParaPDF): string {
  const nombreExamen = NOMBRES_EXAMEN[plan.examen] ?? plan.examen;
  const nombreFase   = NOMBRES_FASE[plan.fase]   ?? plan.fase;
  const hoy = new Date();
  const hoyStr = fmt(hoy);

  const planStart = plan.semanas[0]?.fecha_inicio ? pd(plan.semanas[0].fecha_inicio) : hoy;
  const planLast  = plan.semanas[plan.semanas.length-1];
  const planEnd   = planLast?.fecha_fin ? pd(planLast.fecha_fin) : addDays(hoy, plan.semanas.length*7);

  const examDate = plan.fechaExamen ? pd(plan.fechaExamen) : null;
  const examYMD  = examDate ? ymd(examDate) : null;
  const diasLeft = examDate ? diffDays(hoy, examDate) : null;
  const totalRec = plan.semanas.reduce((a,s) => a+s.recursos.length, 0);
  const totalObj = plan.semanas.reduce((a,s) => a+(s.objetivos?.length??0), 0);

  const dayMap = buildDayMap(plan.semanas);

  // ── PORTADA ───────────────────────────────────────────────────────────────
  const portada = `
    <section class="page cover">
      <div class="cover-bg"></div>
      <div class="cover-circle c1"></div>
      <div class="cover-circle c2"></div>
      <div class="cover-circle c3"></div>
      <header class="cover-top">
        <div class="brand-lg">Juridia<span>.</span></div>
        <span class="cover-date">${hoyStr}</span>
      </header>
      <main class="cover-main">
        <p class="cover-eyebrow">Plan de Estudio Personalizado</p>
        <h1 class="cover-h1">${nombreExamen}</h1>
        <div class="cover-line"></div>
        <p class="cover-fase">Nivel <strong>${nombreFase}</strong></p>
        <div class="cover-chips">
          <div class="cover-chip">
            <span class="cc-n">${plan.semanas.length}</span>
            <span class="cc-l">semanas</span>
          </div>
          <div class="cover-chip">
            <span class="cc-n">${totalRec}</span>
            <span class="cc-l">recursos</span>
          </div>
          <div class="cover-chip">
            <span class="cc-n">${totalObj}</span>
            <span class="cc-l">objetivos</span>
          </div>
          ${diasLeft !== null ? `<div class="cover-chip chip-exam">
            <span class="cc-n">${diasLeft}</span>
            <span class="cc-l">días al examen</span>
          </div>` : ''}
        </div>
        ${examDate ? `<div class="cover-exam-row">
          <span class="cover-exam-label">📅 Fecha del examen</span>
          <span class="cover-exam-date">${fmt(examDate, {weekday:'long',day:'numeric',month:'long',year:'numeric'})}</span>
        </div>` : ''}
      </main>
      <footer class="cover-footer">
        <div>
          <div class="cf-site">juridia-eta.vercel.app</div>
          <div class="cf-sub">Plataforma de Derecho Guatemalteco · hairch.dev</div>
        </div>
        <div class="cf-badge">Plan ${plan.examen.toUpperCase()}</div>
      </footer>
    </section>`;

  // ── RESUMEN ───────────────────────────────────────────────────────────────
  const tablaRows = plan.semanas.map(s => {
    const c = WEEK_COLORS[(s.numero_semana-1) % WEEK_COLORS.length];
    const fi = s.fecha_inicio ? fmt(pd(s.fecha_inicio),{day:'numeric',month:'short'}) : '—';
    const ff = s.fecha_fin   ? fmt(pd(s.fecha_fin),  {day:'numeric',month:'short'}) : '—';
    return `<tr>
      <td><span class="s-badge" style="background:${c.bg};color:${c.dark};border:1.5px solid ${c.accent}44">S${s.numero_semana}</span></td>
      <td class="t-main">${s.titulo}</td>
      <td class="t-dates">${fi} – ${ff}</td>
      <td class="t-center">${s.recursos.length}</td>
      <td class="t-center"><span class="sq-chk"></span></td>
    </tr>`;
  }).join('');

  const resumen = `
    <section class="page inner">
      <header class="ph">
        <div class="ph-brand">Juridia<span>.</span></div>
        <div class="ph-right">
          <div class="ph-title">Resumen del plan</div>
          <div class="ph-sub">${nombreExamen} · ${nombreFase}</div>
        </div>
      </header>
      <div class="page-body">

        <div class="stat-row">
          <div class="stat-card">
            <span class="sn">${plan.semanas.length}</span><span class="sl">Semanas</span>
          </div>
          <div class="stat-card">
            <span class="sn">${totalRec}</span><span class="sl">Recursos</span>
          </div>
          <div class="stat-card">
            <span class="sn">${totalObj}</span><span class="sl">Objetivos</span>
          </div>
          ${diasLeft !== null ? `<div class="stat-card stat-dark">
            <span class="sn">${diasLeft}</span><span class="sl">Días al examen</span>
          </div>` : ''}
        </div>

        <div class="sec-hd">Cronograma de semanas</div>
        <table class="r-table">
          <thead>
            <tr>
              <th style="width:52px">Sem.</th>
              <th>Tema</th>
              <th style="width:110px">Período</th>
              <th style="width:55px;text-align:center">Rec.</th>
              <th style="width:65px;text-align:center">✓ Listo</th>
            </tr>
          </thead>
          <tbody>${tablaRows}</tbody>
        </table>

        ${examDate ? `
        <div class="exam-strip">
          <div class="es-left">
            <span class="es-icon">📅</span>
            <div>
              <p class="es-lbl">FECHA DEL EXAMEN</p>
              <p class="es-date">${fmt(examDate,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
            </div>
          </div>
          ${diasLeft !== null ? `<div class="es-count">
            <span class="es-n">${diasLeft}</span>
            <span class="es-u">días</span>
          </div>` : ''}
        </div>` : ''}

      </div>
      <footer class="pf">
        <span>Juridia · ${nombreExamen} — ${nombreFase}</span>
        <span>Resumen · ${hoyStr}</span>
      </footer>
    </section>`;

  // ── CALENDARIOS (1 mes por página) ────────────────────────────────────────
  const calEnd = examDate ?? planEnd;
  const months: [number,number][] = [];
  let cur = new Date(planStart.getFullYear(), planStart.getMonth(), 1);
  const mEnd = new Date(calEnd.getFullYear(), calEnd.getMonth(), 1);
  while (cur <= mEnd) {
    months.push([cur.getFullYear(), cur.getMonth()]);
    cur = new Date(cur.getFullYear(), cur.getMonth()+1, 1);
  }
  const calPages = months.map(([y,m]) =>
    renderCalendarPage(y, m, dayMap, examYMD, nombreExamen, nombreFase, plan, hoyStr)
  ).join('');

  // ── PÁGINAS POR SEMANA ────────────────────────────────────────────────────
  const semanaPages = plan.semanas.map(s => {
    const c = WEEK_COLORS[(s.numero_semana-1) % WEEK_COLORS.length];
    const fi = s.fecha_inicio ? pd(s.fecha_inicio) : null;
    const ff = s.fecha_fin   ? pd(s.fecha_fin)   : null;
    const rango = fi && ff
      ? `${fmt(fi,{weekday:'short',day:'numeric',month:'short'})} → ${fmt(ff,{weekday:'short',day:'numeric',month:'short'})}`
      : '';

    const objetivosHTML = (s.objetivos ?? []).map(o =>
      `<div class="obj-row"><span class="obj-chk" style="border-color:${c.accent}"></span><span>${o}</span></div>`
    ).join('');

    const recursosHTML = s.recursos.map(r =>
      `<div class="rec-row">
        <span class="rec-chk"></span>
        <div>
          <div class="rec-name">${TIPO_ICON[r.tipo]??'•'} ${r.nombre}</div>
          <div class="rec-meta">${r.tipo}${r.duracion?` · ${r.duracion}`:''}${r.descripcion?` · ${r.descripcion.slice(0,50)}${r.descripcion.length>50?'…':''}`:''}</div>
        </div>
      </div>`
    ).join('');

    const diasNombres = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    const diasRec: string[][] = diasNombres.map(()=>[]);
    s.recursos.forEach((r,i) => { if (i < 5) diasRec[i].push(r.nombre); });

    const diasHTML = diasNombres.map((dia,i) => {
      const items = diasRec[i];
      const isWE = i >= 5;
      const hdrStyle = isWE
        ? 'background:#f1f5f9;color:#94a3b8'
        : `background:${c.accent};color:#fff`;
      return `
        <div class="dia-card">
          <div class="dia-hdr" style="${hdrStyle}">${dia.toUpperCase().slice(0,3)}</div>
          <div class="dia-body">
            ${items.length
              ? items.map(it=>`<div class="dia-item"><span class="dia-circ"></span><span>${it}</span></div>`).join('')
              : `<div class="dia-free">${isWE?'Descanso':'Práctica libre'}</div>`}
          </div>
        </div>`;
    }).join('');

    const tipsHTML = (s.tips??[]).map(t=>`<div class="tip-row">→ ${t}</div>`).join('');
    const lecturaHTML = s.lecturaRecomendada
      ? `<div class="lect-box">
          <span class="lect-name">${s.lecturaRecomendada.titulo}</span>
          <span class="lect-ref">${s.lecturaRecomendada.articulo} · ${s.lecturaRecomendada.tiempo}</span>
        </div>`
      : '';

    return `
      <section class="page inner semana-page">
        <!-- Semana color bar -->
        <div class="s-colorbar" style="background:linear-gradient(90deg,${c.dark},${c.accent})"></div>

        <header class="ph ph-colored" style="background:linear-gradient(90deg,${c.dark} 0%,${c.accent} 100%)">
          <div>
            <div class="ph-eyebrow" style="color:${c.bg}">SEMANA ${s.numero_semana} DE ${plan.semanas.length}</div>
            <div class="ph-h1">${s.titulo}</div>
            ${rango ? `<div class="ph-rango" style="color:${c.bg}88">${rango}</div>` : ''}
          </div>
          <div class="ph-big-num" style="color:${c.bg}22">${s.numero_semana}</div>
        </header>

        <div class="page-body">
          <p class="s-desc">${s.descripcion}</p>

          <div class="s-two-col">
            <!-- Columna izquierda -->
            <div class="s-col-left">
              ${objetivosHTML ? `<div class="blk-hd" style="color:${c.dark}">Objetivos</div>${objetivosHTML}` : ''}

              <div class="blk-hd" style="color:${c.dark};margin-top:${objetivosHTML?'12px':'0'}">Recursos</div>
              ${recursosHTML}

              ${tipsHTML ? `<div class="blk-hd" style="color:${c.dark};margin-top:12px">Tips</div>${tipsHTML}` : ''}
              ${lecturaHTML ? `<div class="blk-hd" style="color:${c.dark};margin-top:10px">Lectura</div>${lecturaHTML}` : ''}
            </div>

            <!-- Columna derecha -->
            <div class="s-col-right">
              <div class="blk-hd" style="color:${c.dark}">Plan diario</div>
              <div class="dias-grid">${diasHTML}</div>

              <div class="blk-hd" style="color:${c.dark};margin-top:12px">Mi progreso esta semana</div>
              <div class="check-grid">
                ${['Leí los recursos','Completé objetivos','Hice la lectura','Practiqué quiz/casos','Anoté los tips','Me evalué al final'].map(t=>
                  `<div class="chk-item"><span class="sq-chk" style="border-color:${c.accent}"></span><span>${t}</span></div>`
                ).join('')}
              </div>

              <div class="blk-hd" style="color:${c.dark};margin-top:12px">Notas</div>
              <div class="notas-area">
                <div class="nota-line"></div>
                <div class="nota-line"></div>
                <div class="nota-line"></div>
                <div class="nota-line"></div>
                <div class="nota-line"></div>
              </div>
            </div>
          </div>
        </div>

        <footer class="pf" style="border-top:2px solid ${c.bg}">
          <span style="color:${c.accent};font-weight:700">Semana ${s.numero_semana} · ${s.titulo}</span>
          <span>Juridia · hairch.dev</span>
        </footer>
      </section>`;
  }).join('');

  // ── CSS ───────────────────────────────────────────────────────────────────
  const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { background:#d1d5db; }
body { font-family:'Inter',system-ui,sans-serif; color:#1e293b; font-size:12px; line-height:1.6; }

/* ── PAGE ──────────────────────────────────────────────────────── */
.page {
  width:210mm; min-height:297mm;
  background:#fff;
  display:flex; flex-direction:column;
  margin:0 auto 24px;
  box-shadow:0 4px 24px rgba(0,0,0,.15);
  page-break-after:always; page-break-inside:avoid;
  overflow:hidden;
}
.page:last-child { page-break-after:avoid; margin-bottom:0; }

/* ── COVER ─────────────────────────────────────────────────────── */
.cover {
  background:#0d1f35;
  color:#fff;
  position:relative;
  overflow:hidden;
}
.cover-bg {
  position:absolute; inset:0;
  background:linear-gradient(145deg,#0d1f35 0%,#13293d 35%,#18435a 65%,#2a628f 100%);
}
.cover-circle {
  position:absolute; border-radius:50%; pointer-events:none;
  background:rgba(154,193,226,.06);
}
.c1 { width:400px;height:400px;top:-120px;right:-100px; }
.c2 { width:300px;height:300px;bottom:-80px;left:-80px; }
.c3 { width:180px;height:180px;top:40%;left:55%;background:rgba(255,255,255,.04); }
.cover-top {
  padding:36px 48px 0; display:flex; justify-content:space-between;
  align-items:center; position:relative; z-index:2;
}
.brand-lg { font-size:22px; font-weight:900; letter-spacing:-.5px; }
.brand-lg span { color:#9ac1e2; }
.cover-date { font-size:10px; color:rgba(255,255,255,.3); }
.cover-main {
  flex:1; padding:56px 48px; position:relative; z-index:2;
  display:flex; flex-direction:column; justify-content:center;
}
.cover-eyebrow {
  font-size:9px; font-weight:700; letter-spacing:4px; text-transform:uppercase;
  color:#9ac1e2; margin-bottom:18px;
}
.cover-h1 {
  font-size:48px; font-weight:900; line-height:1.0;
  letter-spacing:-2px; color:#fff; margin-bottom:18px;
}
.cover-line { width:56px; height:4px; background:linear-gradient(90deg,#9ac1e2,transparent); border-radius:2px; margin-bottom:20px; }
.cover-fase { font-size:15px; font-weight:300; color:rgba(255,255,255,.55); margin-bottom:36px; }
.cover-fase strong { font-weight:600; color:rgba(255,255,255,.8); }
.cover-chips { display:flex; flex-wrap:wrap; gap:12px; margin-bottom:32px; }
.cover-chip {
  display:flex; flex-direction:column; align-items:center;
  background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.15);
  border-radius:14px; padding:12px 22px; min-width:80px;
}
.chip-exam { background:rgba(220,38,38,.2); border-color:rgba(252,165,165,.3); }
.cc-n { font-size:28px; font-weight:800; color:#fff; line-height:1; }
.cc-l { font-size:9px; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,.5); margin-top:3px; }
.cover-exam-row {
  display:flex; flex-direction:column; gap:4px;
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
  border-radius:10px; padding:14px 18px; max-width:380px;
}
.cover-exam-label { font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:#9ac1e2; }
.cover-exam-date { font-size:14px; font-weight:600; color:#fff; }
.cover-footer {
  padding:20px 48px; border-top:1px solid rgba(255,255,255,.07);
  display:flex; justify-content:space-between; align-items:center;
  position:relative; z-index:2;
}
.cf-site { font-size:10px; color:rgba(255,255,255,.35); }
.cf-sub  { font-size:9px;  color:rgba(255,255,255,.2); margin-top:2px; }
.cf-badge {
  background:rgba(154,193,226,.1); border:1px solid rgba(154,193,226,.2);
  border-radius:6px; padding:5px 14px; font-size:9.5px; font-weight:700; color:#9ac1e2;
}

/* ── PAGE HEADER / FOOTER ───────────────────────────────────────── */
.ph {
  background:linear-gradient(90deg,#0d1f35 0%,#1a3a5c 55%,#2a628f 100%);
  padding:14px 32px; display:flex; justify-content:space-between;
  align-items:center; flex-shrink:0;
}
.ph-brand { font-size:14px; font-weight:900; color:#fff; letter-spacing:-.3px; }
.ph-brand span { color:#9ac1e2; }
.ph-right { text-align:right; }
.ph-title { font-size:11px; font-weight:700; color:#fff; }
.ph-sub   { font-size:9px;  color:rgba(255,255,255,.5); margin-top:1px; }

.ph-colored { padding:20px 32px 16px; }
.ph-eyebrow { font-size:8.5px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; margin-bottom:5px; }
.ph-h1 { font-size:18px; font-weight:800; color:#fff; line-height:1.2; }
.ph-rango { font-size:10px; margin-top:4px; }
.ph-big-num { font-size:72px; font-weight:900; line-height:1; position:absolute; right:32px; top:10px; letter-spacing:-3px; pointer-events:none; }

.pf {
  padding:9px 32px; border-top:1px solid #e2e8f0; background:#f8fafc;
  display:flex; justify-content:space-between; flex-shrink:0;
  font-size:9.5px; color:#94a3b8;
}

.page-body { flex:1; padding:20px 32px 14px; overflow:hidden; }

/* ── RESUMEN ────────────────────────────────────────────────────── */
.stat-row { display:flex; gap:12px; margin-bottom:18px; }
.stat-card {
  flex:1; border-radius:10px; padding:14px 12px; text-align:center;
  background:#f1f5f9; border:1px solid #e2e8f0;
  display:flex; flex-direction:column; align-items:center; gap:4px;
}
.stat-dark { background:linear-gradient(135deg,#0d1f35,#2a628f); border:none; }
.stat-dark .sn,.stat-dark .sl { color:#fff; }
.sn { font-size:26px; font-weight:800; color:#0d1f35; line-height:1; }
.sl { font-size:9px; text-transform:uppercase; letter-spacing:1px; color:#64748b; }

.sec-hd {
  font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px;
  color:#94a3b8; margin-bottom:8px; padding-bottom:6px; border-bottom:2px solid #e2e8f0;
}

.r-table { width:100%; border-collapse:collapse; font-size:11px; }
.r-table thead tr { background:linear-gradient(90deg,#0d1f35,#2a628f); }
.r-table thead th { padding:9px 11px; text-align:left; font-size:10px; font-weight:600; color:#fff; letter-spacing:.3px; }
.r-table tbody tr:nth-child(even) { background:#f8fafc; }
.r-table tbody tr:hover { background:#f0f7ff; }
.r-table tbody td { padding:8px 11px; border-bottom:1px solid #e9ecef; vertical-align:middle; }
.s-badge { display:inline-block; padding:3px 10px; border-radius:100px; font-size:10px; font-weight:700; }
.t-main  { font-weight:500; color:#1e293b; }
.t-dates { color:#64748b; font-size:10px; white-space:nowrap; }
.t-center { text-align:center; font-weight:700; color:#2a628f; font-size:11px; }
.sq-chk { display:inline-block; width:14px; height:14px; border:2px solid #cbd5e1; border-radius:3px; background:#fff; vertical-align:middle; }

.exam-strip {
  margin-top:18px; display:flex; align-items:center; gap:16px;
  background:linear-gradient(90deg,#0d1f35,#1a3a5c);
  border-radius:12px; padding:16px 22px; color:#fff;
}
.es-left { display:flex; align-items:center; gap:14px; flex:1; }
.es-icon { font-size:26px; flex-shrink:0; }
.es-lbl  { font-size:9px; text-transform:uppercase; letter-spacing:2px; color:#9ac1e2; margin-bottom:3px; }
.es-date { font-size:14px; font-weight:700; }
.es-count { text-align:center; flex-shrink:0; background:rgba(255,255,255,.08); border-radius:10px; padding:10px 18px; }
.es-n { display:block; font-size:32px; font-weight:900; line-height:1; }
.es-u { font-size:9px; text-transform:uppercase; letter-spacing:1px; color:#9ac1e2; }

/* ── CALENDARIO ─────────────────────────────────────────────────── */
.cal-page { }
.cal-body { flex:1; padding:14px 28px 10px; display:flex; flex-direction:column; }
.cal-legend {
  display:flex; flex-wrap:wrap; gap:6px 16px;
  margin-bottom:12px; padding:8px 12px;
  background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;
}
.cal-leg-item { display:flex; align-items:center; gap:5px; font-size:9.5px; color:#374151; }
.cal-leg-dot  { width:10px; height:10px; border-radius:50%; flex-shrink:0; }

.cal-grid-wrap { flex:1; display:flex; flex-direction:column; }
.cal-dow-row {
  display:grid; grid-template-columns:repeat(7,1fr); gap:3px;
  margin-bottom:4px;
}
.cal-dow {
  text-align:center; font-size:9.5px; font-weight:700; text-transform:uppercase;
  color:#94a3b8; padding:4px 0; letter-spacing:.5px;
}
.cal-dow:first-child { color:#ef4444; }
.cal-dow:last-child  { color:#ef4444; }

.cal-cells { display:grid; grid-template-columns:repeat(7,1fr); gap:3px; flex:1; }

.mc {
  border:1.5px solid #e9ecef; border-radius:8px; background:#fff;
  display:flex; flex-direction:column; justify-content:space-between;
  min-height:52px; padding:5px 6px; transition:all .1s;
}
.mc.empty { border:none; background:transparent; }
.mc.mc-study { border-width:2px; }
.mc.mc-exam  { background:#fef2f2; border:2px solid #dc2626 !important; }
.mc-top { display:flex; justify-content:space-between; align-items:flex-start; gap:2px; }
.mc-num { font-size:12px; font-weight:700; color:#374151; line-height:1; }
.mc.mc-exam .mc-num { color:#dc2626; font-size:13px; }
.mc-wtag {
  font-size:7px; font-weight:800; padding:1px 4px; border-radius:4px;
  line-height:1.4; white-space:nowrap; flex-shrink:0;
}
.mc-etag {
  font-size:6.5px; font-weight:900; color:#dc2626;
  text-transform:uppercase; letter-spacing:.3px; line-height:1.2;
}
.mc-bottom { display:flex; justify-content:center; padding-bottom:2px; }
.mc-circle {
  width:18px; height:18px; border-radius:50%;
  border:2px solid #cbd5e1; background:#fff;
}
.mc.mc-study .mc-circle { border-width:2px; }
.mc.mc-exam  .mc-circle { border-color:#dc2626; }

.cal-hint {
  font-size:9px; color:#94a3b8; text-align:center; margin-top:10px;
  font-style:italic; letter-spacing:.2px;
}

/* ── SEMANA PAGES ───────────────────────────────────────────────── */
.semana-page { position:relative; }
.s-colorbar { height:4px; width:100%; flex-shrink:0; }
.semana-page .ph { padding:18px 32px 14px; }

.s-desc { font-size:11.5px; color:#475569; line-height:1.7; margin-bottom:14px; padding-bottom:12px; border-bottom:1px solid #e2e8f0; }

.s-two-col { display:grid; grid-template-columns:1.05fr .95fr; gap:18px; }

.blk-hd {
  font-size:8.5px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px;
  margin-bottom:6px; display:flex; align-items:center; gap:7px;
}
.blk-hd::after { content:''; flex:1; height:1px; background:#e9ecef; }

.obj-row {
  display:flex; align-items:flex-start; gap:7px;
  background:#f0fdf4; border-left:3px solid #22c55e; border-radius:0 6px 6px 0;
  padding:5px 9px; margin-bottom:3px; font-size:10.5px;
}
.obj-chk { width:12px; height:12px; border:2px solid #86efac; border-radius:3px; background:#fff; flex-shrink:0; margin-top:2px; }

.rec-row {
  display:flex; align-items:flex-start; gap:7px;
  padding:5px 8px; background:#f8fafc; border:1px solid #e2e8f0;
  border-radius:6px; margin-bottom:3px;
}
.rec-chk { width:12px; height:12px; border:2px solid #cbd5e1; border-radius:3px; background:#fff; flex-shrink:0; margin-top:2px; }
.rec-name { font-size:10.5px; font-weight:600; color:#1e293b; }
.rec-meta { font-size:9.5px; color:#94a3b8; }

.tip-row {
  background:#fffbeb; border-left:3px solid #f59e0b; border-radius:0 5px 5px 0;
  padding:5px 9px; font-size:10.5px; color:#44403c; margin-bottom:3px;
}
.lect-box { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:7px; padding:8px 11px; }
.lect-name { display:block; font-size:10px; font-weight:700; color:#15803d; margin-bottom:2px; }
.lect-ref  { font-size:9.5px; color:#374151; }

.dias-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; margin-bottom:4px; }
.dia-card { border:1px solid #e2e8f0; border-radius:5px; overflow:hidden; }
.dia-hdr  { padding:3px 4px; font-size:7.5px; font-weight:700; text-align:center; letter-spacing:.3px; }
.dia-body { padding:4px 5px; min-height:28px; }
.dia-item { display:flex; gap:4px; align-items:flex-start; font-size:8.5px; color:#374151; margin-bottom:2px; }
.dia-circ { width:9px; height:9px; border:1.5px solid #cbd5e1; border-radius:50%; flex-shrink:0; margin-top:1px; }
.dia-free { font-size:8px; color:#94a3b8; font-style:italic; text-align:center; margin-top:2px; }

.check-grid { display:grid; grid-template-columns:1fr 1fr; gap:4px 6px; }
.chk-item { display:flex; align-items:center; gap:6px; font-size:10px; color:#475569; }
.chk-item .sq-chk { border-radius:3px; flex-shrink:0; }

.notas-area { border:1.5px dashed #e2e8f0; border-radius:7px; padding:8px 12px; }
.nota-line { height:1px; background:#e9ecef; margin-bottom:11px; }
.nota-line:last-child { margin-bottom:0; }

/* ── PRINT ──────────────────────────────────────────────────────── */
@page { size:A4; margin:0; }
@media print {
  html { background:#fff; }
  .page { margin:0; box-shadow:none; page-break-after:always; page-break-inside:avoid; }
  .page:last-child { page-break-after:avoid; }
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
  ${calPages}
  ${semanaPages}
</body>
</html>`;
}

// ── Export ────────────────────────────────────────────────────────────────────
export async function generarPlanPDF(plan: PlanParaPDF): Promise<void> {
  const html = buildHTML(plan);
  const win = window.open('', '_blank', 'width=980,height=780,scrollbars=yes');
  if (!win) {
    alert('El navegador bloqueó la ventana emergente. Permite ventanas emergentes para este sitio e intenta de nuevo.');
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
  win.addEventListener('load', () => setTimeout(() => { win.focus(); win.print(); }, 700));
}
