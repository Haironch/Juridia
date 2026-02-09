interface QuizProgressBarProps {
  current: number;
  total: number;
}

export default function QuizProgressBar({ current, total }: QuizProgressBarProps) {
  const percentage = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[#16324f]">
          Pregunta {current + 1} de {total}
        </span>
        <span className="text-sm font-medium text-[#2a628f]">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-[#d8e9f5] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#2a628f] to-[#89c2d9] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i <= current ? 'bg-[#2a628f]' : 'bg-[#9ac1e2]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
