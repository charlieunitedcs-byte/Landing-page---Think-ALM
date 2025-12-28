import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TimelineStepProps {
  stepNumber: number;
  icon: LucideIcon;
  title: string;
  description: string;
  isLast?: boolean;
  className?: string;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  stepNumber,
  icon: Icon,
  title,
  description,
  isLast = false,
  className = ''
}) => {
  return (
    <div className={`relative flex flex-col md:flex-row md:items-start gap-6 ${className}`}>
      {/* Step Number & Icon Container */}
      <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-3">
        {/* Step Number Circle */}
        <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-dark-950 font-bold text-lg flex-shrink-0 shadow-[0_0_20px_rgba(44,197,161,0.4)]">
          {stepNumber}
        </div>

        {/* Connector Line - Hidden on last step */}
        {!isLast && (
          <div className="hidden md:block w-0.5 h-24 bg-gradient-to-b from-brand-500/50 to-brand-500/10" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Icon */}
        <div className="w-14 h-14 rounded-lg bg-brand-500/10 flex items-center justify-center mb-4 border border-brand-500/20">
          <Icon className="w-7 h-7 text-brand-500" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>

      {/* Mobile Connector */}
      {!isLast && (
        <div className="md:hidden w-full flex justify-center">
          <div className="h-0.5 w-32 bg-gradient-to-r from-brand-500/10 via-brand-500/50 to-brand-500/10" />
        </div>
      )}
    </div>
  );
};
