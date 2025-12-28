import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PainPoint {
  icon: LucideIcon;
  text: string;
}

interface PainPointsGridProps {
  painPoints: PainPoint[];
  className?: string;
}

export const PainPointsGrid: React.FC<PainPointsGridProps> = ({ painPoints, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {painPoints.map((point, idx) => (
        <div
          key={idx}
          className="glass-card p-6 rounded-xl hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/20">
              <point.icon className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-gray-200 font-medium text-lg leading-relaxed">{point.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
