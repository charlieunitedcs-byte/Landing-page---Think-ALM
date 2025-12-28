import React from 'react';
import { LucideIcon, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';

interface EngineCardProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  subtitle: string;
  features: string[];
  resultText: string;
  ctaText: string;
  onCtaClick?: () => void;
  className?: string;
}

export const EngineCard: React.FC<EngineCardProps> = ({
  icon: Icon,
  iconColor = 'text-brand-500',
  title,
  subtitle,
  features,
  resultText,
  ctaText,
  onCtaClick,
  className = ''
}) => {
  return (
    <div className={`glass-card p-8 rounded-2xl flex flex-col hover:-translate-y-2 transition-all duration-300 hover:border-brand-500/40 hover:shadow-[0_0_40px_rgba(44,197,161,0.15)] ${className}`}>
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
      </div>

      {/* Title & Subtitle */}
      <h3 className="text-2xl font-bold text-white text-center mb-2">{title}</h3>
      <p className="text-brand-400 text-center font-medium mb-6">{subtitle}</p>

      {/* Features List */}
      <ul className="space-y-3 mb-6 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Result Callout */}
      <div className="bg-brand-500/10 border border-brand-500/20 rounded-lg p-4 mb-6">
        <p className="text-brand-200 font-bold text-sm">
          <span className="text-brand-400">Result:</span> {resultText}
        </p>
      </div>

      {/* CTA Button */}
      <Button
        variant="outline"
        className="w-full"
        onClick={onCtaClick}
      >
        {ctaText}
      </Button>
    </div>
  );
};
