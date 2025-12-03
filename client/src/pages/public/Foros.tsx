import { MessageSquare, User, Clock, Tag } from 'lucide-react';

export default function Foros() {
  const temas = [
    {
      id: 1,
      titulo: 'Dudas sobre recurso de amparo en Guatemala',
      autor: 'María González',
      categoria: 'Derecho Constitucional',
      respuestas: 12,
      vistas: 234,
      ultimaActividad: 'Hace 2 horas',
      destacado: true
    },
    {
      id: 2,
      titulo: 'Procedimiento de demanda laboral paso a paso',
      autor: 'Carlos Méndez',
      categoria: 'Derecho Laboral',
      respuestas: 8,
      vistas: 189,
      ultimaActividad: 'Hace 5 horas',
      destacado: false
    },
    {
      id: 3,
      titulo: 'Interpretación del artículo 123 del Código Penal',
      autor: 'Ana Rodríguez',
      categoria: 'Derecho Penal',
      respuestas: 15,
      vistas: 456,
      ultimaActividad: 'Hace 1 día',
      destacado: true
    },
    {
      id: 4,
      titulo: 'Requisitos para registro de marca comercial',
      autor: 'Luis Hernández',
      categoria: 'Derecho Mercantil',
      respuestas: 6,
      vistas: 145,
      ultimaActividad: 'Hace 3 horas',
      destacado: false
    },
    {
      id: 5,
      titulo: 'Nulidad de contrato por vicios ocultos',
      autor: 'Patricia López',
      categoria: 'Derecho Civil',
      respuestas: 20,
      vistas: 567,
      ultimaActividad: 'Hace 30 minutos',
      destacado: false
    }
  ];

  const categorias = [
    'Derecho Penal',
    'Derecho Civil',
    'Derecho Laboral',
    'Derecho Constitucional',
    'Derecho Mercantil',
    'Derecho Administrativo'
  ];

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Foros de Discusión
          </h1>
          <p className="text-lg text-[#b2d3ea] max-w-3xl">
            Comparte conocimientos, resuelve dudas y conecta con estudiantes y profesionales del derecho.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-[#9ac1e2] p-6">
              <h3 className="text-lg font-semibold text-[#13293d] mb-4">
                Categorías
              </h3>
              <ul className="space-y-2">
                {categorias.map((categoria, index) => (
                  <li key={index}>
                    <button className="w-full text-left px-3 py-2 text-sm text-[#16324f] hover:bg-[#d8e9f5] rounded transition-colors">
                      {categoria}
                    </button>
                  </li>
                ))}
              </ul>

              <button className="w-full mt-6 py-2 bg-[#2a628f] text-white rounded-md hover:bg-[#18435a] transition-colors font-medium">
                Nuevo tema
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and filters */}
            <div className="bg-white rounded-lg shadow-sm border border-[#9ac1e2] p-4 mb-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Buscar en los foros..."
                  className="flex-1 px-4 py-2 border border-[#9ac1e2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a628f]"
                />
                <button className="px-6 py-2 bg-[#2a628f] text-white rounded-md hover:bg-[#18435a] transition-colors">
                  Buscar
                </button>
              </div>
            </div>

            {/* Topics List */}
            <div className="space-y-4">
              {temas.map((tema) => (
                <div
                  key={tema.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#9ac1e2] p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {tema.destacado && (
                          <span className="text-xs font-medium text-white bg-[#18435a] px-2 py-1 rounded">
                            Destacado
                          </span>
                        )}
                        <span className="text-xs font-medium text-[#2a628f] bg-[#d8e9f5] px-2 py-1 rounded flex items-center">
                          <Tag className="h-3 w-3 mr-1" />
                          {tema.categoria}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-[#13293d] mb-2 hover:text-[#2a628f] cursor-pointer">
                        {tema.titulo}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-[#16324f]">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {tema.autor}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {tema.respuestas} respuestas
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {tema.ultimaActividad}
                        </div>
                      </div>
                    </div>

                    <div className="text-center ml-4">
                      <div className="text-2xl font-bold text-[#2a628f]">
                        {tema.vistas}
                      </div>
                      <div className="text-xs text-[#16324f]">vistas</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <button className="px-4 py-2 border border-[#9ac1e2] rounded-md text-[#16324f] hover:bg-[#d8e9f5] transition-colors">
                Anterior
              </button>
              <button className="px-4 py-2 bg-[#2a628f] text-white rounded-md">
                1
              </button>
              <button className="px-4 py-2 border border-[#9ac1e2] rounded-md text-[#16324f] hover:bg-[#d8e9f5] transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-[#9ac1e2] rounded-md text-[#16324f] hover:bg-[#d8e9f5] transition-colors">
                3
              </button>
              <button className="px-4 py-2 border border-[#9ac1e2] rounded-md text-[#16324f] hover:bg-[#d8e9f5] transition-colors">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
