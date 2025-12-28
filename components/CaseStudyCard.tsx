import React, { useState } from 'react';

interface CaseStudyCardProps {
  metric: string;
  company: string;
  quote: string;
  tag: string;
  tagColor?: string;
  className?: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  metric,
  company,
  quote,
  tag,
  tagColor = 'bg-brand-500/20 text-brand-400 border-brand-500/30',
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = quote.length > 200;
  const displayQuote = shouldTruncate && !isExpanded ? quote.slice(0, 200) + '...' : quote;

  return (
    <div className={`glass-card p-8 rounded-2xl hover:border-brand-500/30 transition-all duration-300 flex flex-col ${className}`}>
      {/* Metric - Large Display */}
      <div className="text-4xl md:text-5xl font-bold text-brand-500 mb-4 leading-tight">
        {metric}
      </div>

      {/* Company */}
      <div className="text-sm text-gray-500 mb-4">{company}</div>

      {/* Quote */}
      <blockquote className="text-gray-300 leading-relaxed mb-6 flex-grow italic">
        "{displayQuote}"
      </blockquote>

      {/* Read More Link */}
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-brand-400 text-sm font-medium hover:text-brand-300 transition-colors mb-4 text-left"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}

      {/* Tag */}
      <div className={`inline-block self-start px-3 py-1 rounded-full text-xs font-semibold border ${tagColor}`}>
        {tag}
      </div>
    </div>
  );
};
