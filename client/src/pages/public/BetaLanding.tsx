import { useNavigate } from "react-router-dom";
import { Scale } from "lucide-react";

export default function BetaLanding() {
  const navigate = useNavigate();

  const handleEnter = () => {
    sessionStorage.setItem("hasEntered", "true");
    navigate("/inicio");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a628f] via-[#18435a] to-[#13293d] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 sm:p-12 text-center">

        {/* Logo / Brand */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Scale className="h-9 w-9 text-[#2a628f]" />
          <span className="text-2xl font-bold text-[#13293d]">Derecho GT</span>
        </div>

        {/* Beta badge */}
        <span className="inline-block bg-[#d8e9f5] text-[#18435a] text-xs font-semibold px-3 py-1 rounded-full tracking-widest uppercase mb-8">
          Versión Beta
        </span>

        {/* Main message */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#13293d] leading-tight mb-5">
          Esta es una versión beta de prueba
        </h1>

        {/* Divider */}
        <div className="w-12 h-1 bg-[#2a628f] rounded-full mx-auto mb-6" />

        {/* Description */}
        <p className="text-[#16324f] text-base leading-relaxed mb-10">
          Este es un proyecto desarrollado por{" "}
          <span className="font-semibold text-[#2a628f]">Harich.dev</span> sin
          fines de lucro, creado para que estudiantes de derecho tengan un
          recurso adicional que les permita avanzar en su desarrollo académico.
        </p>

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
    </div>
  );
}
