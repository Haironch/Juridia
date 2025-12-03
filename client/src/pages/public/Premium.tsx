import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Premium() {
  const planes = [
    {
      nombre: 'Gratuito',
      precio: 0,
      periodo: 'Siempre',
      descripcion: 'Perfecto para comenzar tu aprendizaje',
      caracteristicas: [
        { nombre: '10 preguntas diarias', incluido: true },
        { nombre: 'Acceso a foros (solo lectura)', incluido: true },
        { nombre: 'Material básico de estudio', incluido: true },
        { nombre: 'Seguimiento de progreso limitado', incluido: true },
        { nombre: 'Preguntas ilimitadas', incluido: false },
        { nombre: 'Participación en foros', incluido: false },
        { nombre: 'Descargas de material', incluido: false },
        { nombre: 'Simulacros de examen', incluido: false },
        { nombre: 'Certificados', incluido: false },
      ],
      destacado: false,
      botonTexto: 'Comenzar gratis',
      botonLink: '/registro'
    },
    {
      nombre: 'Premium',
      precio: 99,
      periodo: 'mes',
      descripcion: 'Acceso completo a todo el contenido',
      caracteristicas: [
        { nombre: 'Preguntas ilimitadas', incluido: true },
        { nombre: 'Participación activa en foros', incluido: true },
        { nombre: 'Acceso completo a material de estudio', incluido: true },
        { nombre: 'Descargas ilimitadas', incluido: true },
        { nombre: 'Simulacros de examen completos', incluido: true },
        { nombre: 'Estadísticas avanzadas', incluido: true },
        { nombre: 'Certificados de completación', incluido: true },
        { nombre: 'Soporte prioritario', incluido: true },
        { nombre: 'Acceso anticipado a nuevos cursos', incluido: true },
      ],
      destacado: true,
      botonTexto: 'Comenzar Premium',
      botonLink: '/registro'
    }
  ];

  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Elige el plan perfecto para ti
          </h1>
          <p className="text-lg text-[#b2d3ea] max-w-3xl mx-auto">
            Comienza gratis o desbloquea todo el potencial de tu aprendizaje con Premium
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {planes.map((plan) => (
            <div
              key={plan.nombre}
              className={`bg-white rounded-lg shadow-lg border-2 overflow-hidden ${
                plan.destacado 
                  ? 'border-[#2a628f] transform scale-105' 
                  : 'border-[#9ac1e2]'
              }`}
            >
              {plan.destacado && (
                <div className="bg-[#2a628f] text-white text-center py-2 text-sm font-medium">
                  Más popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#13293d] mb-2">
                  {plan.nombre}
                </h3>
                <p className="text-[#16324f] mb-6">
                  {plan.descripcion}
                </p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-[#13293d]">
                    Q{plan.precio}
                  </span>
                  <span className="text-[#16324f] ml-2">
                    / {plan.periodo}
                  </span>
                </div>

                <Link
                  to={plan.botonLink}
                  className={`block w-full py-3 rounded-md font-medium text-center transition-colors mb-8 ${
                    plan.destacado
                      ? 'bg-[#2a628f] text-white hover:bg-[#18435a]'
                      : 'bg-[#d8e9f5] text-[#2a628f] hover:bg-[#cce0f0]'
                  }`}
                >
                  {plan.botonTexto}
                </Link>

                <div className="space-y-3">
                  {plan.caracteristicas.map((caracteristica, index) => (
                    <div key={index} className="flex items-start">
                      {caracteristica.incluido ? (
                        <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        caracteristica.incluido 
                          ? 'text-[#13293d]' 
                          : 'text-gray-400'
                      }`}>
                        {caracteristica.nombre}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#13293d] text-center mb-8">
            Preguntas frecuentes
          </h2>
          
          <div className="bg-white rounded-lg shadow-sm border border-[#9ac1e2] divide-y divide-[#9ac1e2]">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#13293d] mb-2">
                ¿Puedo cambiar de plan después?
              </h3>
              <p className="text-[#16324f]">
                Sí, puedes actualizar a Premium en cualquier momento o cancelar tu suscripción cuando lo desees.
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#13293d] mb-2">
                ¿Qué métodos de pago aceptan?
              </h3>
              <p className="text-[#16324f]">
                Aceptamos tarjetas de crédito, débito y transferencias bancarias.
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#13293d] mb-2">
                ¿Los certificados tienen validez oficial?
              </h3>
              <p className="text-[#16324f]">
                Los certificados son de completación de curso y están respaldados por expertos en derecho guatemalteco.
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#13293d] mb-2">
                ¿Hay descuentos para estudiantes?
              </h3>
              <p className="text-[#16324f]">
                Sí, ofrecemos descuentos especiales para estudiantes universitarios. Contáctanos para más información.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
