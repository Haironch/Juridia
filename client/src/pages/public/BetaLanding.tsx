import { useNavigate } from "react-router-dom";
import { Scale, Target, Eye } from "lucide-react";

export default function BetaLanding() {
  const navigate = useNavigate();

  const handleEnter = () => {
    localStorage.setItem("hasEntered", "true");
    navigate("/inicio");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a628f] via-[#18435a] to-[#13293d] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center mb-6">

          {/* Logo / Brand */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Scale className="h-9 w-9 text-[#2a628f]" />
            <span className="text-2xl font-bold text-[#13293d]">Derecho GT</span>
          </div>

          {/* Beta badge */}
          <span className="inline-block bg-[#d8e9f5] text-[#18435a] text-xs font-semibold px-3 py-1 rounded-full tracking-widest uppercase mb-8">
            Versión Beta
          </span>

          {/* Developer credit */}
          <p className="text-[#16324f] text-base leading-relaxed mb-8">
            Este es un proyecto desarrollado por el programador{" "}
            <span className="font-semibold text-[#2a628f]">Hairch.dev</span>
          </p>

          {/* Divider */}
          <div className="w-12 h-1 bg-[#2a628f] rounded-full mx-auto mb-8" />

          {/* Enter button */}
          <button
            onClick={handleEnter}
            className="w-full sm:w-auto px-14 py-3 bg-[#2a628f] hover:bg-[#18435a] active:bg-[#13293d] text-white font-semibold rounded-lg transition-colors duration-200 text-base cursor-pointer shadow-md hover:shadow-lg"
          >
            Ingresar
          </button>

          {/* Footer note */}
          <p className="mt-8 text-xs text-[#b2d3ea]">
            Al ingresar aceptas que esta plataforma se encuentra en etapa de prueba.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Misión */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-1 w-full bg-gradient-to-r from-[#2a628f] to-[#18435a]" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#d8e9f5] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2a628f] transition-colors duration-300">
                  <Target className="h-4 w-4 text-[#2a628f] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#2a628f] uppercase">Misión</span>
              </div>
              <p className="text-[#13293d] text-sm leading-relaxed font-medium">
                Hacer que estudiar Derecho sea más práctico, accesible y efectivo mediante tecnología diseñada para estudiantes y profesionales jurídicos.
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-1 w-full bg-gradient-to-r from-[#18435a] to-[#2a628f]" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#d8e9f5] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2a628f] transition-colors duration-300">
                  <Eye className="h-4 w-4 text-[#2a628f] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#2a628f] uppercase">Visión</span>
              </div>
              <p className="text-[#13293d] text-sm leading-relaxed font-medium">
                Revolucionar la educación jurídica en Guatemala, creando la comunidad digital de aprendizaje legal más grande e innovadora de la región.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
