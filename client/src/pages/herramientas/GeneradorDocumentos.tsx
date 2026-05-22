import { useState, useMemo, useRef } from 'react';
import {
  FileText, ArrowLeft, Printer, AlertTriangle,
  ChevronRight, CheckCircle, RotateCcw,
} from 'lucide-react';
import { plantillasDocumentos, type PlantillaDocumento } from '../../data/documentos';

const CATEGORIA_COLOR: Record<string, string> = {
  Laboral:  'bg-blue-50 text-blue-700 border-blue-200',
  Civil:    'bg-violet-50 text-violet-700 border-violet-200',
  General:  'bg-slate-50 text-slate-600 border-slate-200',
};

// ── Vista: lista de documentos ───────────────────────────────────────────────

function ListaDocumentos({ onSelect }: { onSelect: (p: PlantillaDocumento) => void }) {
  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#13293d] to-[#2a628f] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-5">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Generador de Documentos</h1>
          <p className="text-[#9ac1e2] text-base max-w-xl mx-auto">
            Completa el formulario y genera documentos legales básicos listos para imprimir.
            Solo para fines educativos y orientativos.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {/* Aviso legal global */}
        <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5 text-amber-500" />
          <p>
            Estos documentos son <strong>plantillas educativas</strong> basadas en la legislación
            guatemalteca vigente. Para actos con consecuencias jurídicas importantes, consulta
            con un <strong>abogado o notario</strong> colegiado activo.
          </p>
        </div>

        {/* Tarjetas de documentos */}
        {plantillasDocumentos.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className="w-full text-left bg-white rounded-2xl border border-[#d8e9f5] shadow-sm hover:shadow-md hover:border-[#9ac1e2] transition-all duration-300 p-5 group"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0 mt-0.5">{p.icono}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="font-bold text-[#13293d] group-hover:text-[#2a628f] transition-colors">
                    {p.titulo}
                  </h2>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${CATEGORIA_COLOR[p.categoria]}`}>
                    {p.categoria}
                  </span>
                </div>
                <p className="text-sm text-[#16324f] leading-relaxed mb-2">{p.descripcion}</p>
                <p className="text-xs text-[#9ac1e2]">📖 {p.baseLegal}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-[#9ac1e2] group-hover:text-[#2a628f] flex-shrink-0 mt-1 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Vista: editor de documento ───────────────────────────────────────────────

function EditorDocumento({
  plantilla,
  onVolver,
}: {
  plantilla: PlantillaDocumento;
  onVolver: () => void;
}) {
  const [valores, setValores] = useState<Record<string, string>>({});
  const [mostrarVista, setMostrarVista] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const set = (id: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setValores((prev) => ({ ...prev, [id]: e.target.value }));

  const camposCompletos = useMemo(
    () => plantilla.campos.filter((c) => c.required).every((c) => valores[c.id]?.trim()),
    [valores, plantilla.campos]
  );

  const htmlGenerado = useMemo(
    () => (camposCompletos ? plantilla.generar(valores) : ''),
    [camposCompletos, valores, plantilla]
  );

  const imprimir = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  const limpiar = () => {
    setValores({});
    setMostrarVista(false);
  };

  const inputBase =
    'w-full px-4 py-2.5 rounded-xl border border-[#d8e9f5] bg-white text-sm text-[#13293d] focus:outline-none focus:ring-2 focus:ring-[#2a628f] transition-all';
  const labelBase = 'block text-xs font-semibold text-[#16324f] uppercase tracking-wide mb-1.5';

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#13293d] to-[#2a628f] py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onVolver}
            className="inline-flex items-center gap-2 text-[#9ac1e2] hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Todos los documentos
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{plantilla.icono}</span>
            <div>
              <h1 className="text-xl font-bold text-white">{plantilla.titulo}</h1>
              <p className="text-[#9ac1e2] text-sm">📖 {plantilla.baseLegal}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* Aviso específico */}
        <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-500" />
          <p>{plantilla.aviso}</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-[#13293d]">Completa los datos</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {plantilla.campos.map((campo) => (
              <div
                key={campo.id}
                className={campo.type === 'textarea' ? 'sm:col-span-2' : ''}
              >
                <label className={labelBase}>
                  {campo.label}
                  {campo.required && <span className="text-red-400 ml-1">*</span>}
                </label>

                {campo.type === 'select' ? (
                  <select
                    value={valores[campo.id] ?? ''}
                    onChange={set(campo.id)}
                    className={inputBase}
                  >
                    <option value="">— Selecciona —</option>
                    {campo.options?.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                ) : campo.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    placeholder={campo.placeholder}
                    value={valores[campo.id] ?? ''}
                    onChange={set(campo.id)}
                    className={`${inputBase} resize-none`}
                  />
                ) : (
                  <input
                    type={campo.type}
                    placeholder={campo.placeholder}
                    value={valores[campo.id] ?? ''}
                    onChange={set(campo.id)}
                    className={inputBase}
                  />
                )}

                {campo.hint && (
                  <p className="text-xs text-[#9ac1e2] mt-1">{campo.hint}</p>
                )}
              </div>
            ))}
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setMostrarVista(true)}
              disabled={!camposCompletos}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2a628f] text-white font-semibold text-sm hover:bg-[#18435a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCircle className="h-4 w-4" />
              Vista previa del documento
            </button>
            <button
              onClick={limpiar}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#d8e9f5] text-sm text-[#16324f] hover:bg-[#f0f7ff] transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Limpiar
            </button>
          </div>

          {!camposCompletos && (
            <p className="text-xs text-[#9ac1e2] text-center">
              Completa todos los campos obligatorios (*) para generar la vista previa.
            </p>
          )}
        </div>

        {/* Vista previa */}
        {mostrarVista && htmlGenerado && (
          <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#2a628f] to-[#18435a]">
              <h2 className="font-bold text-white text-sm">Vista previa</h2>
              <button
                onClick={imprimir}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#2a628f] font-semibold text-sm hover:bg-[#d8e9f5] transition-colors"
              >
                <Printer className="h-4 w-4" />
                Imprimir / Guardar PDF
              </button>
            </div>

            {/* iframe con el documento */}
            <iframe
              ref={iframeRef}
              srcDoc={htmlGenerado}
              title="Vista previa del documento"
              className="w-full border-0"
              style={{ height: '720px' }}
            />

            {/* Instrucción de descarga */}
            <div className="px-5 py-4 bg-[#f8fbff] border-t border-[#d8e9f5] text-xs text-[#9ac1e2] flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 text-amber-400 mt-0.5" />
              <p>
                Al imprimir, selecciona <strong>"Guardar como PDF"</strong> en tu impresora para
                obtener el archivo digital. Los datos ingresados no se almacenan en ningún servidor.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────

export default function GeneradorDocumentos() {
  const [seleccionada, setSeleccionada] = useState<PlantillaDocumento | null>(null);

  if (seleccionada) {
    return (
      <EditorDocumento
        plantilla={seleccionada}
        onVolver={() => setSeleccionada(null)}
      />
    );
  }

  return <ListaDocumentos onSelect={setSeleccionada} />;
}
