import { Check, X, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const TELEGRAM_URL = ''; // Pendiente: agregar link del canal de Telegram

const caracteristicasGratis = [
  { nombre: '10 preguntas diarias', incluido: true },
  { nombre: 'Acceso a foros (solo lectura)', incluido: true },
  { nombre: 'Material básico de estudio', incluido: true },
  { nombre: 'Seguimiento de progreso limitado', incluido: true },
  { nombre: 'Preguntas ilimitadas', incluido: false },
  { nombre: 'Clases con tutores certificados', incluido: false },
  { nombre: 'Descargas de material', incluido: false },
  { nombre: 'Simulacros de examen', incluido: false },
  { nombre: 'Revisor y analista de tesis', incluido: false },
];

const caracteristicasPremium = [
  'Preguntas ilimitadas',
  'Acceso a todo el material de estudio',
  'Clases en vivo con tutores certificados en Derecho guatemalteco',
  'Descargas ilimitadas de material y recursos',
  'Simulacros de examen completos con retroalimentación',
  'Estadísticas avanzadas de tu progreso',
  'Soporte prioritario personalizado',
  'Acceso anticipado a nuevos cursos y contenido',
  'Revisor y analista de tesis para apoyarte durante todo el proceso',
];

const faqs = [
  {
    pregunta: '¿Cómo realizo el pago?',
    respuesta: 'Por el momento manejamos el proceso de forma directa. Al hacer clic en "Obtener Premium" serás redirigido a nuestro canal de Telegram donde te indicaremos los métodos de transferencia disponibles y activaremos tu cuenta en menos de 24 horas.',
  },
  {
    pregunta: '¿Puedo probar la plataforma antes de pagar?',
    respuesta: 'Sí. El plan gratuito te da acceso inmediato a preguntas diarias, foros y material básico sin necesidad de ingresar ningún método de pago. Puedes explorar la plataforma y decidir cuando estés listo.',
  },
  {
    pregunta: '¿Quiénes son los tutores certificados?',
    respuesta: 'Son abogados y profesores con experiencia en el sistema jurídico guatemalteco, especializados en las áreas del examen privado: Civil, Penal, Laboral y Procesal.',
  },
  {
    pregunta: '¿En qué consiste el servicio de revisión de tesis?',
    respuesta: 'Un analista revisará tu tesis, te dará retroalimentación sobre estructura, argumentación y citas legales, y te orientará durante el proceso de corrección hasta que estés listo para presentarla.',
  },
  {
    pregunta: '¿Puedo cancelar en cualquier momento?',
    respuesta: 'Sí. No hay contratos ni compromisos a largo plazo. Si decidís cancelar, simplemente contáctanos y desactivamos tu suscripción sin cargos adicionales.',
  },
];

export default function Premium() {
  return (
    <div className="min-h-screen bg-[#d8e9f5]">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Elige el plan perfecto para ti
          </h1>
          <p className="text-lg text-[#b2d3ea] max-w-2xl mx-auto">
            Comienza gratis o accede a todo lo que Juridia tiene para prepararte y llegar al título.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Plan Gratuito */}
          <div className="bg-white rounded-2xl shadow border-2 border-[#9ac1e2] overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#13293d] mb-1">Gratuito</h3>
              <p className="text-[#64748b] text-sm mb-6">Perfecto para comenzar tu aprendizaje</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#13293d]">Q0</span>
                <span className="text-[#64748b] ml-2 text-sm">/ siempre gratis</span>
              </div>
              <Link
                to="/registro"
                className="block w-full py-3 rounded-xl font-semibold text-center text-sm transition-colors mb-8 bg-[#d8e9f5] text-[#2a628f] hover:bg-[#c3d9ed]"
              >
                Comenzar gratis
              </Link>
              <div className="space-y-3">
                {caracteristicasGratis.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {c.incluido
                      ? <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      : <X className="h-4 w-4 text-gray-300 flex-shrink-0" />}
                    <span className={`text-sm ${c.incluido ? 'text-[#1e293b]' : 'text-gray-400'}`}>
                      {c.nombre}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plan Premium */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#2a628f] overflow-hidden lg:scale-105">
            <div className="bg-[#2a628f] text-white text-center py-2 text-xs font-bold tracking-widest uppercase">
              Más popular
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#13293d] mb-1">Premium</h3>
              <p className="text-[#64748b] text-sm mb-6">Acceso completo para llegar al título</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#13293d]">Q99</span>
                <span className="text-[#64748b] ml-2 text-sm">/ mes</span>
              </div>

              {TELEGRAM_URL ? (
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-colors mb-8 bg-[#2a628f] text-white hover:bg-[#18435a]"
                >
                  <Send className="h-4 w-4" />
                  Obtener Premium
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm mb-8 bg-[#9ac1e2] text-white cursor-not-allowed opacity-70"
                  title="Próximamente disponible"
                >
                  <Send className="h-4 w-4" />
                  Obtener Premium — Próximamente
                </button>
              )}

              <div className="space-y-3">
                {caracteristicasPremium.map((nombre, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#1e293b]">{nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#13293d] text-center mb-10">
            Preguntas frecuentes
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-[#9ac1e2] divide-y divide-[#e2e8f0]">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6">
                <h3 className="text-base font-semibold text-[#13293d] mb-2">{faq.pregunta}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{faq.respuesta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
