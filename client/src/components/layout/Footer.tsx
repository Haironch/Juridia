import { Link } from 'react-router-dom';
import {
  Scales,
  Books,
  Chats,
  FolderOpen,
  Star,
  FileText,
  BookOpenText,
  Calculator,
  Exam,
  ChalkboardTeacher,
  Briefcase,
  ClockCounterClockwise,
  EnvelopeSimple,
} from '@phosphor-icons/react';

const PLATAFORMA = [
  { href: '/cursos',   label: 'Cursos',           icon: <ChalkboardTeacher size={13} weight="bold" /> },
  { href: '/foros',    label: 'Foros',             icon: <Chats size={13} weight="bold" /> },
  { href: '/material', label: 'Material de Estudio', icon: <FolderOpen size={13} weight="bold" /> },
  { href: '/planes',   label: 'Planes de Estudio', icon: <Books size={13} weight="bold" /> },
  { href: '/premium',  label: 'Premium',           icon: <Star size={13} weight="bold" /> },
];

const HERRAMIENTAS = [
  { href: '/documentos',  label: 'Generador de Documentos', icon: <FileText size={13} weight="bold" /> },
  { href: '/glosario',    label: 'Glosario Jurídico',       icon: <BookOpenText size={13} weight="bold" /> },
  { href: '/liquidacion', label: 'Calculadora Laboral',     icon: <Calculator size={13} weight="bold" /> },
  { href: '/examen',      label: 'Examen Simulado',         icon: <Exam size={13} weight="bold" /> },
  { href: '/casos',       label: 'Casos Prácticos',         icon: <Briefcase size={13} weight="bold" /> },
  { href: '/constituquiz',label: 'ConstituQuiz',            icon: <BookOpenText size={13} weight="bold" /> },
  { href: '/historia',    label: 'Historia del Derecho',    icon: <ClockCounterClockwise size={13} weight="bold" /> },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d1f2d] text-[#7ea8c4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* Grid principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#2a628f] flex items-center justify-center">
                <Scales size={20} weight="duotone" className="text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Juridia GT</span>
            </div>
            <p className="text-xs leading-relaxed text-[#7ea8c4] max-w-xs">
              Plataforma de aprendizaje especializada en derecho guatemalteco. Aprende,
              practica y domina el derecho con contenido verificado.
            </p>
            <a
              href="mailto:chavezhairon360@gmail.com"
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-[#9ac1e2] hover:text-white transition-colors"
            >
              <EnvelopeSimple size={13} weight="bold" />
              Contacto
            </a>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">
              Plataforma
            </h3>
            <ul className="space-y-3">
              {PLATAFORMA.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="inline-flex items-center gap-2 text-xs text-[#7ea8c4] hover:text-white transition-colors group"
                  >
                    <span className="text-[#2a628f] group-hover:text-[#9ac1e2] transition-colors">{icon}</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Herramientas */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">
              Herramientas
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {HERRAMIENTAS.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="inline-flex items-center gap-2 text-xs text-[#7ea8c4] hover:text-white transition-colors group"
                  >
                    <span className="text-[#2a628f] group-hover:text-[#9ac1e2] transition-colors">{icon}</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-6 border-t border-[#1a3447] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#4a7a99]">
            © {year} Juridia GT. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[#4a7a99]">
            Contenido educativo · No sustituye asesoría legal profesional
          </p>
        </div>

      </div>
    </footer>
  );
}
