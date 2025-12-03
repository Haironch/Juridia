import { BookOpen, Clock, Users, Star } from 'lucide-react';

export default function Cursos() {
  const cursos = [
    {
      id: 1,
      titulo: 'Derecho Penal Guatemalteco',
      descripcion: 'Domina los fundamentos del derecho penal, desde delitos hasta procedimientos judiciales.',
      nivel: 'Intermedio',
      duracion: '8 semanas',
      estudiantes: 245,
      rating: 4.8,
      imagen: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
      premium: true
    },
    {
      id: 2,
      titulo: 'Derecho Civil - Obligaciones y Contratos',
      descripcion: 'Aprende sobre obligaciones, contratos y su aplicación en el sistema legal guatemalteco.',
      nivel: 'Básico',
      duracion: '6 semanas',
      estudiantes: 189,
      rating: 4.6,
      imagen: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
      premium: false
    },
    {
      id: 3,
      titulo: 'Derecho Laboral',
      descripcion: 'Conoce los derechos y obligaciones en las relaciones laborales según la legislación guatemalteca.',
      nivel: 'Intermedio',
      duracion: '7 semanas',
      estudiantes: 312,
      rating: 4.9,
      imagen: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
      premium: true
    },
    {
      id: 4,
      titulo: 'Derecho Constitucional',
      descripcion: 'Estudia la Constitución Política de Guatemala y sus principios fundamentales.',
      nivel: 'Avanzado',
      duracion: '10 semanas',
      estudiantes: 156,
      rating: 4.7,
      imagen: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
      premium: true
    },
    {
      id: 5,
      titulo: 'Introducción al Derecho',
      descripcion: 'Curso fundamental para entender los conceptos básicos del sistema jurídico guatemalteco.',
      nivel: 'Básico',
      duracion: '4 semanas',
      estudiantes: 478,
      rating: 4.5,
      imagen: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400',
      premium: false
    },
    {
      id: 6,
      titulo: 'Derecho Mercantil',
      descripcion: 'Comprende las leyes que regulan las actividades comerciales y empresariales en Guatemala.',
      nivel: 'Intermedio',
      duracion: '9 semanas',
      estudiantes: 203,
      rating: 4.6,
      imagen: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
      premium: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Cursos de Derecho
          </h1>
          <p className="text-lg text-[#b2d3ea] max-w-3xl">
            Explora nuestra colección de cursos diseñados por expertos en derecho guatemalteco. 
            Aprende a tu propio ritmo con contenido estructurado y certificaciones.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-[#9ac1e2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4">
            <select className="px-4 py-2 border border-[#9ac1e2] rounded-md text-[#16324f] focus:outline-none focus:ring-2 focus:ring-[#2a628f]">
              <option>Todos los niveles</option>
              <option>Básico</option>
              <option>Intermedio</option>
              <option>Avanzado</option>
            </select>
            <select className="px-4 py-2 border border-[#9ac1e2] rounded-md text-[#16324f] focus:outline-none focus:ring-2 focus:ring-[#2a628f]">
              <option>Todas las áreas</option>
              <option>Derecho Penal</option>
              <option>Derecho Civil</option>
              <option>Derecho Laboral</option>
              <option>Derecho Constitucional</option>
            </select>
            <button className="px-4 py-2 bg-[#2a628f] text-white rounded-md hover:bg-[#18435a] transition-colors">
              Aplicar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cursos.map((curso) => (
            <div 
              key={curso.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#9ac1e2] overflow-hidden"
            >
              <div className="relative h-48 bg-[#cce0f0]">
                <img 
                  src={curso.imagen} 
                  alt={curso.titulo}
                  className="w-full h-full object-cover"
                />
                {curso.premium && (
                  <span className="absolute top-4 right-4 bg-[#18435a] text-white px-3 py-1 rounded-full text-xs font-medium">
                    Premium
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-[#2a628f] bg-[#d8e9f5] px-2 py-1 rounded">
                    {curso.nivel}
                  </span>
                  <div className="flex items-center text-sm text-[#16324f]">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    {curso.rating}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[#13293d] mb-2">
                  {curso.titulo}
                </h3>
                
                <p className="text-sm text-[#2a628f] mb-4">
                  {curso.descripcion}
                </p>

                <div className="flex items-center justify-between text-sm text-[#16324f] mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {curso.duracion}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {curso.estudiantes} estudiantes
                  </div>
                </div>

                <button className="w-full py-2 bg-[#2a628f] text-white rounded-md hover:bg-[#18435a] transition-colors font-medium">
                  Ver curso
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
