import { Link } from "react-router-dom";
import { Lock, BookOpen, FileText, Video, ArrowLeft } from "lucide-react";

const PREVIEW_ITEMS = [
  { icon: FileText, label: "Resúmenes de códigos guatemaltecos" },
  { icon: Video,    label: "Video tutoriales de procedimientos legales" },
  { icon: FileText, label: "Guías prácticas por área del derecho" },
  { icon: FileText, label: "Infografías y plantillas editables" },
];

export default function MaterialEstudio() {
  return (
    <div className="min-h-screen bg-[#d8e9f5]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#13293d] via-[#18435a] to-[#2a628f] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#9ac1e2] hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Material de Estudio
          </h1>
          <p className="text-[#9ac1e2] text-base sm:text-lg max-w-2xl">
            Biblioteca de recursos verificados por expertos en derecho guatemalteco.
          </p>
        </div>
      </div>

      {/* Coming soon card */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl border border-[#9ac1e2] shadow-xl overflow-hidden">
          {/* Top bar */}
          <div className="bg-gradient-to-r from-[#13293d] to-[#2a628f] px-8 py-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Lock className="h-7 w-7 text-[#d8e9f5]" />
            </div>
            <div>
              <span className="block text-xs font-bold text-[#9ac1e2] uppercase tracking-widest mb-1">
                Próximamente
              </span>
              <span className="block text-white font-bold text-lg leading-tight">
                Biblioteca en construcción
              </span>
            </div>
          </div>

          <div className="px-8 py-8">
            <p className="text-[#16324f] text-sm leading-relaxed mb-8">
              Estamos preparando una biblioteca completa con documentos, videos y material
              complementario verificado por abogados guatemaltecos. Muy pronto tendrás acceso.
            </p>

            {/* Preview list */}
            <p className="text-xs font-bold text-[#67a2d3] uppercase tracking-widest mb-4">
              Lo que encontrarás
            </p>
            <ul className="space-y-3 mb-8">
              {PREVIEW_ITEMS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-[#16324f]">
                  <span className="w-8 h-8 rounded-lg bg-[#d8e9f5] flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-[#2a628f]" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              to="/cursos"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm bg-[#2a628f] text-white hover:bg-[#18435a] transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Ver cursos disponibles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
