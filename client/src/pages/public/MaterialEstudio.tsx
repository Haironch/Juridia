import { FileText, Video, Download, Lock } from 'lucide-react';

export default function MaterialEstudio() {
  const materiales = [
    {
      id: 1,
      titulo: 'Código Penal de Guatemala - Resumen Completo',
      tipo: 'PDF',
      categoria: 'Derecho Penal',
      descripcion: 'Resumen detallado del Código Penal guatemalteco con casos prácticos y jurisprudencia.',
      descargas: 1245,
      premium: false,
      icon: FileText
    },
    {
      id: 2,
      titulo: 'Video Tutorial: Procedimiento de Amparo',
      tipo: 'Video',
      categoria: 'Derecho Constitucional',
      descripcion: 'Explicación paso a paso del procedimiento de amparo en Guatemala con ejemplos.',
      descargas: 856,
      premium: true,
      icon: Video
    },
    {
      id: 3,
      titulo: 'Guía Práctica de Derecho Laboral',
      tipo: 'PDF',
      categoria: 'Derecho Laboral',
      descripcion: 'Manual completo sobre relaciones laborales, contratos y derechos del trabajador.',
      descargas: 2103,
      premium: false,
      icon: FileText
    },
    {
      id: 4,
      titulo: 'Infografía: Jerarquía de Leyes en Guatemala',
      tipo: 'Infografía',
      categoria: 'Derecho Constitucional',
      descripcion: 'Representación visual de la pirámide de Kelsen aplicada al sistema jurídico guatemalteco.',
      descargas: 1678,
      premium: false,
      icon: FileText
    },
    {
      id: 5,
      titulo: 'Curso en Video: Contratos Mercantiles',
      tipo: 'Video',
      categoria: 'Derecho Mercantil',
      descripcion: 'Serie de videos sobre tipos de contratos mercantiles y su aplicación práctica.',
      descargas: 543,
      premium: true,
      icon: Video
    },
    {
      id: 6,
      titulo: 'Formularios Legales - Plantillas Editables',
      tipo: 'Documento',
      categoria: 'Práctica Legal',
      descripcion: 'Colección de formularios y plantillas para diferentes trámites legales.',
      descargas: 3421,
      premium: true,
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Material de Estudio
          </h1>
          <p className="text-lg text-[#b2d3ea] max-w-3xl">
            Accede a nuestra biblioteca de recursos verificados por expertos. Documentos, videos y material complementario para tu aprendizaje.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-[#9ac1e2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4">
            <select className="px-4 py-2 border border-[#9ac1e2] rounded-md text-[#16324f] focus:outline-none focus:ring-2 focus:ring-[#2a628f]">
              <option>Todos los tipos</option>
              <option>PDF</option>
              <option>Video</option>
              <option>Infografía</option>
              <option>Documento</option>
            </select>
            <select className="px-4 py-2 border border-[#9ac1e2] rounded-md text-[#16324f] focus:outline-none focus:ring-2 focus:ring-[#2a628f]">
              <option>Todas las categorías</option>
              <option>Derecho Penal</option>
              <option>Derecho Civil</option>
              <option>Derecho Laboral</option>
              <option>Derecho Constitucional</option>
              <option>Derecho Mercantil</option>
            </select>
            <label className="flex items-center gap-2 px-4 py-2 border border-[#9ac1e2] rounded-md text-[#16324f] cursor-pointer hover:bg-[#d8e9f5]">
              <input type="checkbox" className="rounded" />
              Solo contenido gratuito
            </label>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materiales.map((material) => {
            const Icon = material.icon;
            return (
              <div
                key={material.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#9ac1e2] overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#d8e9f5] rounded-lg">
                        <Icon className="h-6 w-6 text-[#2a628f]" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-[#2a628f] bg-[#d8e9f5] px-2 py-1 rounded">
                          {material.tipo}
                        </span>
                      </div>
                    </div>
                    {material.premium && (
                      <Lock className="h-5 w-5 text-[#18435a]" />
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-[#13293d] mb-2">
                    {material.titulo}
                  </h3>

                  <p className="text-sm text-[#16324f] mb-2">
                    {material.categoria}
                  </p>

                  <p className="text-sm text-[#2a628f] mb-4">
                    {material.descripcion}
                  </p>

                  <div className="flex items-center justify-between text-sm text-[#16324f] mb-4">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {material.descargas.toLocaleString()} descargas
                    </div>
                  </div>

                  {material.premium ? (
                    <button className="w-full py-2 bg-[#18435a] text-white rounded-md hover:bg-[#13293d] transition-colors font-medium flex items-center justify-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Premium
                    </button>
                  ) : (
                    <button className="w-full py-2 bg-[#2a628f] text-white rounded-md hover:bg-[#18435a] transition-colors font-medium flex items-center justify-center">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
