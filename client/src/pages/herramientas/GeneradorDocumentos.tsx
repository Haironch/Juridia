import { useState, useMemo, useRef } from 'react';
import {
  FileText,
  ArrowLeft,
  Printer,
  Warning,
  CheckCircle,
  ArrowClockwise,
  CaretRight,
  MagnifyingGlass,
  Briefcase,
  Scales,
  Gavel,
  Buildings,
  Globe,
  FolderOpen,
} from '@phosphor-icons/react';
import { IconX } from '@tabler/icons-react';
import { plantillasDocumentos, type PlantillaDocumento } from '../../data/documentos';

// ── Tipos y constantes ────────────────────────────────────────────────────────

type Categoria = 'Todos' | 'Laboral' | 'Civil' | 'Penal' | 'Administrativo' | 'General';

const CATEGORIA_COLOR: Record<string, string> = {
  Laboral:       'bg-blue-50 text-blue-700 border-blue-200',
  Civil:         'bg-violet-50 text-violet-700 border-violet-200',
  Penal:         'bg-red-50 text-red-700 border-red-200',
  Administrativo:'bg-emerald-50 text-emerald-700 border-emerald-200',
  General:       'bg-slate-50 text-slate-600 border-slate-200',
};

const CATEGORIA_BORDER: Record<string, string> = {
  Laboral:       'border-l-blue-400',
  Civil:         'border-l-violet-400',
  Penal:         'border-l-red-400',
  Administrativo:'border-l-emerald-400',
  General:       'border-l-slate-300',
};

const CATEGORIA_ICON: Record<string, React.ReactNode> = {
  Laboral:        <Briefcase size={14} weight="bold" />,
  Civil:          <Scales size={14} weight="bold" />,
  Penal:          <Gavel size={14} weight="bold" />,
  Administrativo: <Buildings size={14} weight="bold" />,
  General:        <Globe size={14} weight="bold" />,
};

const TABS: { key: Categoria; label: string; icon: React.ReactNode }[] = [
  { key: 'Todos',         label: 'Todos',         icon: <FolderOpen size={15} weight="bold" /> },
  { key: 'Laboral',       label: 'Laboral',        icon: <Briefcase size={15} weight="bold" /> },
  { key: 'Civil',         label: 'Civil',          icon: <Scales size={15} weight="bold" /> },
  { key: 'Penal',         label: 'Penal',          icon: <Gavel size={15} weight="bold" /> },
  { key: 'Administrativo',label: 'Administrativo', icon: <Buildings size={15} weight="bold" /> },
  { key: 'General',       label: 'General',        icon: <Globe size={15} weight="bold" /> },
];

// ── Vista: lista de documentos ───────────────────────────────────────────────

function ListaDocumentos({ onSelect }: { onSelect: (p: PlantillaDocumento) => void }) {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>('Todos');
  const [busqueda, setBusqueda] = useState('');

  const conteosPorCategoria = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of plantillasDocumentos) {
      m[p.categoria] = (m[p.categoria] ?? 0) + 1;
    }
    return m;
  }, []);

  const plantillasFiltradas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    return plantillasDocumentos.filter((p) => {
      const matchCat = categoriaActiva === 'Todos' || p.categoria === categoriaActiva;
      const matchQ = !q || p.titulo.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [categoriaActiva, busqueda]);

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#13293d] via-[#18435a] to-[#2a628f] py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-5 ring-1 ring-white/20">
            <FileText size={32} weight="duotone" className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Generador de Documentos</h1>
          <p className="text-[#9ac1e2] text-sm max-w-lg mx-auto mb-6">
            Plantillas legales guatemaltecas listas para imprimir. Solo completa los datos y genera tu documento.
          </p>
          {/* Stats */}
          <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 ring-1 ring-white/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{plantillasDocumentos.length}</p>
              <p className="text-xs text-[#9ac1e2]">Plantillas</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">5</p>
              <p className="text-xs text-[#9ac1e2]">Categorías</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-[#9ac1e2]">Gratis</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* Aviso legal global */}
        <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
          <Warning size={18} weight="fill" className="flex-shrink-0 mt-0.5 text-amber-500" />
          <p>
            Plantillas <strong>educativas</strong> basadas en la legislación guatemalteca vigente.
            Para actos con consecuencias jurídicas importantes, consulta con un <strong>abogado o notario colegiado activo</strong>.
          </p>
        </div>

        {/* Buscador */}
        <div className="relative">
          <MagnifyingGlass size={16} weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ac1e2]" />
          <input
            type="text"
            placeholder="Buscar documento..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-2xl border border-[#d8e9f5] bg-white text-sm text-[#13293d] placeholder-[#9ac1e2] focus:outline-none focus:ring-2 focus:ring-[#2a628f] transition-all"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ac1e2] hover:text-[#13293d] transition-colors"
            >
              <IconX size={14} />
            </button>
          )}
        </div>

        {/* Tabs de categoría */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {TABS.map((tab) => {
            const count = tab.key === 'Todos' ? plantillasDocumentos.length : (conteosPorCategoria[tab.key] ?? 0);
            const active = categoriaActiva === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setCategoriaActiva(tab.key)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  active
                    ? 'bg-[#2a628f] text-white border-[#2a628f] shadow-sm'
                    : 'bg-white text-[#16324f] border-[#d8e9f5] hover:border-[#9ac1e2]'
                }`}
              >
                {tab.icon}
                {tab.label}
                <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-white/20 text-white' : 'bg-[#f0f7ff] text-[#9ac1e2]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Resultado */}
        {plantillasFiltradas.length === 0 ? (
          <div className="text-center py-16 text-[#9ac1e2]">
            <MagnifyingGlass size={40} weight="duotone" className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No se encontraron documentos para "{busqueda}"</p>
            <button onClick={() => setBusqueda('')} className="mt-2 text-xs text-[#2a628f] hover:underline">Limpiar búsqueda</button>
          </div>
        ) : (
          <div className="space-y-3">
            {plantillasFiltradas.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelect(p)}
                className={`w-full text-left bg-white rounded-2xl border border-[#d8e9f5] border-l-4 ${CATEGORIA_BORDER[p.categoria]} shadow-sm hover:shadow-md hover:border-r-[#9ac1e2] hover:border-t-[#9ac1e2] hover:border-b-[#9ac1e2] transition-all duration-200 p-5 group`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{p.icono}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="font-bold text-[#13293d] group-hover:text-[#2a628f] transition-colors text-sm">
                        {p.titulo}
                      </h2>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CATEGORIA_COLOR[p.categoria]}`}>
                        {CATEGORIA_ICON[p.categoria]}
                        {p.categoria}
                      </span>
                    </div>
                    <p className="text-xs text-[#16324f] leading-relaxed mb-1.5">{p.descripcion}</p>
                    <p className="text-[10px] text-[#9ac1e2] font-medium">📖 {p.baseLegal}</p>
                  </div>
                  <CaretRight size={16} weight="bold" className="text-[#9ac1e2] group-hover:text-[#2a628f] flex-shrink-0 mt-1 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        )}
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

  const requeridos = plantilla.campos.filter((c) => c.required);
  const completados = requeridos.filter((c) => valores[c.id]?.trim()).length;
  const progreso = requeridos.length > 0 ? Math.round((completados / requeridos.length) * 100) : 100;
  const camposCompletos = completados === requeridos.length;

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
    'w-full px-4 py-2.5 rounded-xl border border-[#d8e9f5] bg-white text-sm text-[#13293d] focus:outline-none focus:ring-2 focus:ring-[#2a628f] transition-all placeholder-[#b0cfe8]';
  const labelBase = 'block text-xs font-semibold text-[#16324f] uppercase tracking-wide mb-1.5';

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#13293d] to-[#2a628f] py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onVolver}
            className="inline-flex items-center gap-1.5 text-[#9ac1e2] hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={16} weight="bold" />
            Todos los documentos
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{plantilla.icono}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-white">{plantilla.titulo}</h1>
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${CATEGORIA_COLOR[plantilla.categoria]}`}>
                  {CATEGORIA_ICON[plantilla.categoria]}
                  {plantilla.categoria}
                </span>
              </div>
              <p className="text-[#9ac1e2] text-xs mt-0.5">📖 {plantilla.baseLegal}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* Aviso específico */}
        <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
          <Warning size={16} weight="fill" className="flex-shrink-0 mt-0.5 text-amber-500" />
          <p>{plantilla.aviso}</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden">
          {/* Header del formulario con barra de progreso */}
          <div className="px-6 pt-5 pb-4 border-b border-[#f0f7ff]">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-[#13293d] text-sm">Completa los datos</h2>
              <span className="text-xs text-[#9ac1e2] font-medium">{completados}/{requeridos.length} campos</span>
            </div>
            <div className="h-1.5 bg-[#f0f7ff] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#2a628f] to-[#9ac1e2] rounded-full transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </div>

          <div className="p-6 space-y-4">
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
                <CheckCircle size={16} weight="bold" />
                Vista previa del documento
              </button>
              <button
                onClick={limpiar}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#d8e9f5] text-sm text-[#16324f] hover:bg-[#f0f7ff] transition-colors"
              >
                <ArrowClockwise size={16} weight="bold" />
                Limpiar
              </button>
            </div>

            {!camposCompletos && (
              <p className="text-xs text-[#9ac1e2] text-center">
                Faltan {requeridos.length - completados} campo{requeridos.length - completados !== 1 ? 's' : ''} obligatorio{requeridos.length - completados !== 1 ? 's' : ''} (*)
              </p>
            )}
          </div>
        </div>

        {/* Vista previa */}
        {mostrarVista && htmlGenerado && (
          <div className="bg-white rounded-2xl border border-[#d8e9f5] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#2a628f] to-[#18435a]">
              <h2 className="font-bold text-white text-sm flex items-center gap-2">
                <FileText size={16} weight="bold" />
                Vista previa
              </h2>
              <button
                onClick={imprimir}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#2a628f] font-semibold text-sm hover:bg-[#d8e9f5] transition-colors"
              >
                <Printer size={16} weight="bold" />
                Imprimir / Guardar PDF
              </button>
            </div>

            <iframe
              ref={iframeRef}
              srcDoc={htmlGenerado}
              title="Vista previa del documento"
              className="w-full border-0"
              style={{ height: '720px' }}
            />

            <div className="px-5 py-4 bg-[#f8fbff] border-t border-[#d8e9f5] text-xs text-[#9ac1e2] flex items-start gap-2">
              <Warning size={14} weight="fill" className="flex-shrink-0 text-amber-400 mt-0.5" />
              <p>
                Al imprimir, selecciona <strong>"Guardar como PDF"</strong> para obtener el archivo digital.
                Los datos ingresados no se almacenan en ningún servidor.
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
