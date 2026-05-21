import { useState, useMemo } from 'react';
import {
  Calculator, Info, ChevronDown, ChevronUp,
  AlertTriangle, CheckCircle, Copy, RotateCcw,
} from 'lucide-react';

// ── Tipos ────────────────────────────────────────────────────────────────────

type TipoTerminacion =
  | 'despido_injustificado'
  | 'renuncia_menos_10'
  | 'renuncia_mas_10'
  | 'mutuo_acuerdo'
  | 'cierre_empresa';

interface Inputs {
  salarioMensual: string;
  fechaInicio: string;
  fechaFin: string;
  tipoTerminacion: TipoTerminacion;
  diasPendientes: string; // días del mes en curso no pagados
}

interface Resultado {
  diasTrabajados: number;
  aniosTrabajados: number;
  mesesTexto: string;
  indemnizacion: number;
  factorIndemnizacion: number; // 0, 0.5 o 1
  vacaciones: number;
  aguinaldo: number;
  bono14: number;
  salarioPendiente: number;
  total: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' }).format(n);

function diffDias(inicio: Date, fin: Date): number {
  return Math.max(0, Math.floor((fin.getTime() - inicio.getTime()) / 86_400_000));
}

/** Días transcurridos en el período Dic-1 a Nov-30 que incluye 'fecha'. */
function diasEnPeriodoAguinaldo(inicio: Date, fin: Date): number {
  // El período de aguinaldo va del 1 de diciembre al 30 de noviembre siguiente.
  // Buscamos el inicio del período activo en la fecha de fin.
  let iniPeriodo: Date;
  if (fin.getMonth() >= 11) {
    // Diciembre → período inicia ese mismo diciembre
    iniPeriodo = new Date(fin.getFullYear(), 11, 1);
  } else {
    // Enero-Noviembre → período inició el 1-dic del año anterior
    iniPeriodo = new Date(fin.getFullYear() - 1, 11, 1);
  }
  const desde = inicio > iniPeriodo ? inicio : iniPeriodo;
  return diffDias(desde, fin) + 1;
}

/** Días transcurridos en el período Jul-1 a Jun-30 que incluye 'fecha'. */
function diasEnPeriodoBono14(inicio: Date, fin: Date): number {
  let iniPeriodo: Date;
  if (fin.getMonth() >= 6) {
    // Julio-Diciembre → período inicia ese mismo julio
    iniPeriodo = new Date(fin.getFullYear(), 6, 1);
  } else {
    // Enero-Junio → período inició el 1-jul del año anterior
    iniPeriodo = new Date(fin.getFullYear() - 1, 6, 1);
  }
  const desde = inicio > iniPeriodo ? inicio : iniPeriodo;
  return diffDias(desde, fin) + 1;
}

/** Texto legible: "3 años, 4 meses y 12 días" */
function textoTiempo(dias: number): string {
  const anios = Math.floor(dias / 365);
  const resto = dias % 365;
  const meses = Math.floor(resto / 30);
  const dd = resto % 30;
  const partes: string[] = [];
  if (anios > 0) partes.push(`${anios} ${anios === 1 ? 'año' : 'años'}`);
  if (meses > 0) partes.push(`${meses} ${meses === 1 ? 'mes' : 'meses'}`);
  if (dd > 0 || partes.length === 0) partes.push(`${dd} ${dd === 1 ? 'día' : 'días'}`);
  if (partes.length === 1) return partes[0];
  return partes.slice(0, -1).join(', ') + ' y ' + partes[partes.length - 1];
}

// ── Cálculo central ───────────────────────────────────────────────────────────

function calcular(inputs: Inputs): Resultado | null {
  const salario = parseFloat(inputs.salarioMensual.replace(/,/g, ''));
  const diasPend = parseInt(inputs.diasPendientes) || 0;
  if (!inputs.fechaInicio || !inputs.fechaFin || isNaN(salario) || salario <= 0) return null;

  const inicio = new Date(inputs.fechaInicio + 'T00:00:00');
  const fin    = new Date(inputs.fechaFin    + 'T00:00:00');
  if (fin <= inicio) return null;

  const dias = diffDias(inicio, fin);
  const anios = dias / 365;
  const salarioDiario = salario / 30;

  // Indemnización (art. 88 CT)
  let factor = 0;
  if (inputs.tipoTerminacion === 'despido_injustificado'
   || inputs.tipoTerminacion === 'mutuo_acuerdo'
   || inputs.tipoTerminacion === 'cierre_empresa') {
    factor = 1;
  } else if (inputs.tipoTerminacion === 'renuncia_mas_10') {
    factor = 0.5;
  }
  const indemnizacion = factor * anios * salario;

  // Vacaciones proporcionales (art. 130 CT): 15 días hábiles por año
  const vacaciones = (dias / 365) * 15 * salarioDiario;

  // Aguinaldo proporcional (Decreto 76-78)
  const diasAguinaldo = diasEnPeriodoAguinaldo(inicio, fin);
  const aguinaldo = Math.min(diasAguinaldo, 365) / 365 * salario;

  // Bono 14 proporcional (Decreto 42-92)
  const diasBono = diasEnPeriodoBono14(inicio, fin);
  const bono14 = Math.min(diasBono, 365) / 365 * salario;

  // Salario por días pendientes
  const salarioPendiente = diasPend * salarioDiario;

  const total = indemnizacion + vacaciones + aguinaldo + bono14 + salarioPendiente;

  return {
    diasTrabajados: dias,
    aniosTrabajados: anios,
    mesesTexto: textoTiempo(dias),
    indemnizacion,
    factorIndemnizacion: factor,
    vacaciones,
    aguinaldo,
    bono14,
    salarioPendiente,
    total,
  };
}

// ── Componente de línea de resultado ─────────────────────────────────────────

function FilaResultado({
  label, monto, base, expandible = false,
}: {
  label: string; monto: number; base: string; expandible?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#f0f7ff] last:border-0">
      <div className="flex items-center justify-between py-3 px-1">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#13293d]">{label}</p>
          {expandible ? (
            <button
              onClick={() => setOpen(v => !v)}
              className="text-xs text-[#2a628f] flex items-center gap-1 mt-0.5 hover:underline"
            >
              {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {open ? 'Ocultar base' : 'Ver base legal'}
            </button>
          ) : (
            <p className="text-xs text-[#9ac1e2] mt-0.5">{base}</p>
          )}
          {expandible && open && (
            <p className="text-xs text-[#16324f] bg-[#f0f7ff] rounded-lg p-2 mt-1 leading-relaxed">{base}</p>
          )}
        </div>
        <span className="text-base font-bold text-[#2a628f] ml-4 flex-shrink-0">{fmt(monto)}</span>
      </div>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────

const TIPOS: { value: TipoTerminacion; label: string; desc: string }[] = [
  {
    value: 'despido_injustificado',
    label: 'Despido injustificado',
    desc: 'El empleador termina la relación sin causa legal comprobada.',
  },
  {
    value: 'renuncia_menos_10',
    label: 'Renuncia voluntaria (menos de 10 años)',
    desc: 'El trabajador renuncia con menos de 10 años de servicio. Sin indemnización.',
  },
  {
    value: 'renuncia_mas_10',
    label: 'Renuncia voluntaria (10 años o más)',
    desc: 'El trabajador renuncia con 10+ años. Recibe 50% de la indemnización.',
  },
  {
    value: 'mutuo_acuerdo',
    label: 'Mutuo acuerdo',
    desc: 'Ambas partes acuerdan terminar la relación. Indemnización completa.',
  },
  {
    value: 'cierre_empresa',
    label: 'Cierre o quiebra de empresa',
    desc: 'La empresa cierra operaciones. El trabajador recibe indemnización completa.',
  },
];

const HOY = new Date().toISOString().split('T')[0];

export default function CalculadoraLiquidacion() {
  const [inputs, setInputs] = useState<Inputs>({
    salarioMensual: '',
    fechaInicio: '',
    fechaFin: HOY,
    tipoTerminacion: 'despido_injustificado',
    diasPendientes: '0',
  });
  const [copiado, setCopiado] = useState(false);

  const resultado = useMemo(() => calcular(inputs), [inputs]);

  const set = (k: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs(prev => ({ ...prev, [k]: e.target.value }));

  const limpiar = () =>
    setInputs({ salarioMensual: '', fechaInicio: '', fechaFin: HOY, tipoTerminacion: 'despido_injustificado', diasPendientes: '0' });

  const copiar = () => {
    if (!resultado) return;
    const texto = [
      `ESTIMACIÓN DE LIQUIDACIÓN`,
      `Tiempo trabajado: ${resultado.mesesTexto}`,
      `Indemnización: ${fmt(resultado.indemnizacion)}`,
      `Vacaciones proporcionales: ${fmt(resultado.vacaciones)}`,
      `Aguinaldo proporcional: ${fmt(resultado.aguinaldo)}`,
      `Bono 14 proporcional: ${fmt(resultado.bono14)}`,
      resultado.salarioPendiente > 0 ? `Salario pendiente: ${fmt(resultado.salarioPendiente)}` : '',
      `──────────────────`,
      `TOTAL ESTIMADO: ${fmt(resultado.total)}`,
    ].filter(Boolean).join('\n');
    navigator.clipboard.writeText(texto).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-[#d8e9f5] bg-white text-sm text-[#13293d] focus:outline-none focus:ring-2 focus:ring-[#2a628f] focus:border-transparent transition-all';
  const labelClass = 'block text-xs font-semibold text-[#16324f] uppercase tracking-wide mb-1.5';

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#13293d] to-[#2a628f] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-5">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Calcula tu Liquidación</h1>
          <p className="text-[#9ac1e2] text-base max-w-2xl mx-auto">
            Estima cuánto deberías recibir al finalizar tu relación laboral, conforme al
            Código de Trabajo de Guatemala y sus leyes complementarias.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Aviso legal */}
        <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5 text-amber-500" />
          <p>
            Esta calculadora es una <strong>herramienta orientativa</strong>. El resultado es una
            estimación basada en los datos ingresados. Para casos específicos, consulta con un
            abogado laboralista o la <strong>Inspección General de Trabajo</strong>.
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm p-6 space-y-5">
          <h2 className="font-bold text-[#13293d] text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#2a628f] text-white text-xs flex items-center justify-center font-bold">1</span>
            Datos de la relación laboral
          </h2>

          {/* Salario y fechas */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Salario mensual (Q)</label>
              <input
                type="number"
                min="1"
                placeholder="Ej: 3500.00"
                value={inputs.salarioMensual}
                onChange={set('salarioMensual')}
                className={inputClass}
              />
              <p className="text-xs text-[#9ac1e2] mt-1">Salario mínimo 2024: Q3,230.00</p>
            </div>
            <div>
              <label className={labelClass}>Días del mes pendientes de pago</label>
              <input
                type="number"
                min="0"
                max="31"
                placeholder="0"
                value={inputs.diasPendientes}
                onChange={set('diasPendientes')}
                className={inputClass}
              />
              <p className="text-xs text-[#9ac1e2] mt-1">Días trabajados no pagados aún</p>
            </div>
            <div>
              <label className={labelClass}>Fecha de ingreso</label>
              <input
                type="date"
                value={inputs.fechaInicio}
                onChange={set('fechaInicio')}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Fecha de finalización</label>
              <input
                type="date"
                value={inputs.fechaFin}
                onChange={set('fechaFin')}
                className={inputClass}
              />
            </div>
          </div>

          {/* Tipo de terminación */}
          <div>
            <label className={labelClass}>Tipo de terminación de contrato</label>
            <select
              value={inputs.tipoTerminacion}
              onChange={set('tipoTerminacion')}
              className={inputClass}
            >
              {TIPOS.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <p className="text-xs text-[#9ac1e2] mt-1">
              {TIPOS.find(t => t.value === inputs.tipoTerminacion)?.desc}
            </p>
          </div>

          {/* Tiempo trabajado preview */}
          {resultado && (
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f0f7ff] rounded-xl border border-[#d8e9f5]">
              <CheckCircle className="h-4 w-4 text-[#2a628f] flex-shrink-0" />
              <p className="text-sm text-[#13293d]">
                Tiempo trabajado: <span className="font-semibold">{resultado.mesesTexto}</span>
                <span className="text-[#9ac1e2] ml-2">({resultado.diasTrabajados} días)</span>
              </p>
            </div>
          )}
        </div>

        {/* Resultados */}
        {resultado ? (
          <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-[#2a628f] to-[#18435a] flex items-center justify-between">
              <h2 className="font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/20 text-white text-xs flex items-center justify-center font-bold">2</span>
                Desglose estimado
              </h2>
              <button
                onClick={copiar}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
              >
                {copiado ? <CheckCircle className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copiado ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>

            <div className="px-6 divide-y divide-[#f0f7ff]">
              {/* Indemnización */}
              <FilaResultado
                label="Indemnización"
                monto={resultado.indemnizacion}
                expandible
                base={
                  resultado.factorIndemnizacion === 0
                    ? 'Art. 81 CT: La renuncia voluntaria con menos de 10 años de servicio no genera derecho a indemnización.'
                    : resultado.factorIndemnizacion === 0.5
                    ? `Art. 81 CT: Renuncia con 10+ años genera el 50% de la indemnización. Cálculo: ${resultado.aniosTrabajados.toFixed(2)} años × Q${parseFloat(inputs.salarioMensual).toLocaleString()} × 50% = ${fmt(resultado.indemnizacion)}`
                    : `Art. 88 CT: El despido injustificado obliga al empleador a pagar 1 mes de salario por cada año trabajado. Cálculo: ${resultado.aniosTrabajados.toFixed(2)} años × Q${parseFloat(inputs.salarioMensual).toLocaleString()} = ${fmt(resultado.indemnizacion)}`
                }
              />

              <FilaResultado
                label="Vacaciones proporcionales"
                monto={resultado.vacaciones}
                expandible
                base={`Art. 130 CT: Todo trabajador tiene derecho a 15 días hábiles de vacaciones por cada año. Proporcional al tiempo trabajado. Cálculo: (${resultado.diasTrabajados} días / 365) × 15 × (salario diario Q${(parseFloat(inputs.salarioMensual)/30).toFixed(2)}) = ${fmt(resultado.vacaciones)}`}
              />

              <FilaResultado
                label="Aguinaldo proporcional"
                monto={resultado.aguinaldo}
                expandible
                base={`Decreto 76-78: El aguinaldo equivale a 1 mes de salario al año. Se paga en diciembre. Período: 1 de diciembre al 30 de noviembre. Proporcional a los días trabajados en el período activo.`}
              />

              <FilaResultado
                label="Bono 14 proporcional"
                monto={resultado.bono14}
                expandible
                base={`Decreto 42-92: El Bono 14 equivale a 1 mes de salario al año. Se paga en julio. Período: 1 de julio al 30 de junio. Proporcional a los días trabajados en el período activo.`}
              />

              {resultado.salarioPendiente > 0 && (
                <FilaResultado
                  label={`Salario pendiente (${inputs.diasPendientes} días)`}
                  monto={resultado.salarioPendiente}
                  base={`Días trabajados no pagados × salario diario (Q${(parseFloat(inputs.salarioMensual)/30).toFixed(2)})`}
                />
              )}
            </div>

            {/* Total */}
            <div className="mx-6 my-4 p-5 bg-gradient-to-r from-[#f0f7ff] to-[#d8e9f5] rounded-2xl border border-[#9ac1e2] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#16324f] uppercase tracking-wide">Total estimado</p>
                <p className="text-xs text-[#9ac1e2] mt-0.5">Antes de deducciones legales</p>
              </div>
              <p className="text-3xl font-black text-[#13293d]">{fmt(resultado.total)}</p>
            </div>

            {/* Nota IGSS */}
            <div className="mx-6 mb-6 flex gap-2 text-xs text-[#67a2d3] bg-[#f8fbff] border border-[#d8e9f5] rounded-xl p-3">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p>
                Este monto es <strong>bruto</strong>. El IGSS descuenta el <strong>4.83%</strong> del salario
                del trabajador (cuota laboral). Las liquidaciones no están sujetas al ISR en Guatemala.
                Verifica con tu empleador si hay otros beneficios contractuales adicionales.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto text-[#d8e9f5] mb-3" />
            <p className="text-[#9ac1e2] text-sm">
              Ingresa tu salario, fechas y tipo de terminación para ver el cálculo.
            </p>
          </div>
        )}

        {/* Referencia legal */}
        <details className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden group">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-[#f8fbff] transition-colors">
            <span className="flex items-center gap-2 text-sm font-medium text-[#13293d]">
              <Info className="h-4 w-4 text-[#2a628f]" />
              Marco legal aplicado
            </span>
            <ChevronDown className="h-4 w-4 text-[#9ac1e2] group-open:rotate-180 transition-transform" />
          </summary>
          <div className="border-t border-[#f0f7ff] px-5 py-4 space-y-3 text-sm text-[#16324f]">
            {[
              ['Indemnización', 'Arts. 76-88 Código de Trabajo (Decreto 1441)', '1 mes de salario por año trabajado en despido injustificado.'],
              ['Vacaciones', 'Art. 130 Código de Trabajo', '15 días hábiles pagados por cada año de trabajo continuo.'],
              ['Aguinaldo', 'Decreto 76-78 del Congreso de la República', '100% del salario mensual. Período: 1 dic – 30 nov.'],
              ['Bono 14', 'Decreto 42-92 del Congreso de la República', '100% del salario mensual. Período: 1 jul – 30 jun.'],
              ['IGSS', 'Reglamento IGSS, Acuerdo 1002', 'Cuota laboral: 4.83% del salario ordinario.'],
            ].map(([concepto, norma, detalle]) => (
              <div key={concepto} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2a628f] mt-2 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#13293d]">{concepto} <span className="text-[#9ac1e2] font-normal">— {norma}</span></p>
                  <p className="text-[#16324f]">{detalle}</p>
                </div>
              </div>
            ))}
          </div>
        </details>

        {/* Limpiar */}
        <div className="text-center">
          <button
            onClick={limpiar}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#d8e9f5] text-sm text-[#16324f] hover:bg-white hover:border-[#9ac1e2] transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            Limpiar formulario
          </button>
        </div>
      </div>
    </div>
  );
}
