import { Check, X } from 'lucide-react';

interface QuizOptionButtonProps {
  optionKey: string;    // clave original para validación
  displayLabel: string; // letra visible según posición del shuffle
  text: string;
  isSelected: boolean;
  isRevealed: boolean;
  isCorrect: boolean;
  wasChosen: boolean;
  onSelect: (key: string) => void;
}

export default function QuizOptionButton({
  optionKey,
  displayLabel,
  text,
  isSelected,
  isRevealed,
  isCorrect,
  wasChosen,
  onSelect,
}: QuizOptionButtonProps) {

  const getStyles = () => {
    if (isRevealed) {
      if (isCorrect) {
        return 'bg-green-50 border-2 border-green-500 text-green-800 shadow-md';
      }
      if (wasChosen && !isCorrect) {
        return 'bg-red-50 border-2 border-red-500 text-red-800 animate-shake';
      }
      return 'bg-gray-50 border-2 border-gray-200 text-gray-400 opacity-50';
    }
    if (isSelected) {
      return 'bg-[#d8e9f5] border-2 border-[#2a628f] text-[#13293d] shadow-md transform scale-[1.02]';
    }
    return 'bg-white border-2 border-[#9ac1e2] text-[#13293d] hover:border-[#2a628f] hover:shadow-md hover:scale-[1.01]';
  };

  const getIcon = () => {
    if (!isRevealed) return null;
    if (isCorrect) {
      return <Check className="h-6 w-6 text-green-600 flex-shrink-0 animate-bounce-in" />;
    }
    if (wasChosen && !isCorrect) {
      return <X className="h-6 w-6 text-red-600 flex-shrink-0" />;
    }
    return null;
  };

  return (
    <button
      onClick={() => !isRevealed && onSelect(optionKey)}
      disabled={isRevealed}
      className={`w-full p-4 rounded-xl text-left transition-all duration-300 cursor-pointer flex items-start gap-3 min-h-[60px] ${getStyles()}`}
    >
      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0 ${
        isRevealed && isCorrect ? 'bg-green-200 text-green-800' :
        isRevealed && wasChosen && !isCorrect ? 'bg-red-200 text-red-800' :
        isSelected ? 'bg-[#2a628f] text-white' :
        'bg-[#d8e9f5] text-[#2a628f]'
      }`}>
        {displayLabel}
      </span>
      <span className="flex-1 text-base leading-relaxed pt-0.5">{text}</span>
      {getIcon()}
    </button>
  );
}
