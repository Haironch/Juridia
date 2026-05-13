import { Link } from 'react-router-dom';
import { Scale, BookOpen, Play, Trophy, Shield, FileSignature, Gavel, BookMarked, Briefcase, Building2, Heart, Landmark, Receipt, ClipboardList, ShieldCheck, FileText } from 'lucide-react';
import type { QuizTema, QuizUserProgress } from '../../types/index';

interface TopicCardProps {
  tema: QuizTema;
  progress: QuizUserProgress | null;
}

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale className="h-8 w-8 text-[#2a628f]" />,
  Shield: <Shield className="h-8 w-8 text-[#2a628f]" />,
  FileSignature: <FileSignature className="h-8 w-8 text-[#2a628f]" />,
  Gavel: <Gavel className="h-8 w-8 text-[#2a628f]" />,
  BookMarked: <BookMarked className="h-8 w-8 text-[#2a628f]" />,
  Briefcase: <Briefcase className="h-8 w-8 text-[#2a628f]" />,
  Building2: <Building2 className="h-8 w-8 text-[#2a628f]" />,
  Heart: <Heart className="h-8 w-8 text-[#2a628f]" />,
  Landmark: <Landmark className="h-8 w-8 text-[#2a628f]" />,
  Receipt: <Receipt className="h-8 w-8 text-[#2a628f]" />,
  ClipboardList: <ClipboardList className="h-8 w-8 text-[#2a628f]" />,
  ShieldCheck: <ShieldCheck className="h-8 w-8 text-[#2a628f]" />,
  FileText: <FileText className="h-8 w-8 text-[#2a628f]" />,
};

export default function TopicCard({ tema, progress }: TopicCardProps) {
  const icon = iconMap[tema.icono] || <Scale className="h-8 w-8 text-[#2a628f]" />;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-[#9ac1e2] overflow-hidden group">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-[#2a628f] to-[#18435a] p-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <div className="text-white">{icon}</div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{tema.tema}</h3>
            <p className="text-sm text-[#b2d3ea]">{tema.totalPreguntas} preguntas</p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="text-sm text-[#16324f] mb-4 leading-relaxed">{tema.descripcion}</p>

        {/* Progress Section */}
        {progress && (
          <div className="mb-4 p-3 bg-[#d8e9f5] rounded-xl">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="font-medium text-[#13293d]">Mejor: {progress.mejorPuntaje}%</span>
              </div>
              <span className="text-[#16324f]">Promedio: {progress.promedio}%</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#67a2d3] mt-1">
              <span>{progress.intentos} {progress.intentos === 1 ? 'intento' : 'intentos'}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/constituquiz/estudio/${tema.id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-[#2a628f] text-[#2a628f] font-medium hover:bg-[#2a628f] hover:text-white transition-all duration-300 text-sm"
          >
            <BookOpen className="h-4 w-4" />
            Estudiar
          </Link>
          <Link
            to={`/constituquiz/practica/${tema.id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2a628f] text-white font-medium hover:bg-[#18435a] transition-all duration-300 text-sm"
          >
            <Play className="h-4 w-4" />
            Practicar
          </Link>
        </div>
      </div>
    </div>
  );
}
