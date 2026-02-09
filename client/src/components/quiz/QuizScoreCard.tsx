import { useEffect, useState } from 'react';

interface QuizScoreCardProps {
  correct: number;
  total: number;
  percentage: number;
}

export default function QuizScoreCard({ correct, total, percentage }: QuizScoreCardProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 80) return { stroke: '#22c55e', text: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 60) return { stroke: '#eab308', text: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { stroke: '#ef4444', text: 'text-red-600', bg: 'bg-red-50' };
  };

  const color = getColor();

  return (
    <div className={`flex flex-col items-center p-8 rounded-2xl ${color.bg}`}>
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          {/* Animated progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="score-circle"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${color.text}`}>
            {animatedPercentage}%
          </span>
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-[#13293d]">
        {correct} de {total} correctas
      </p>
    </div>
  );
}
