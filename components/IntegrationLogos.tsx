import React from 'react';

interface Integration {
  name: string;
  logoUrl?: string; // Optional - will use placeholder if not provided
}

interface IntegrationLogosProps {
  integrations: Integration[];
  className?: string;
}

export const IntegrationLogos: React.FC<IntegrationLogosProps> = ({
  integrations,
  className = ''
}) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {integrations.map((integration, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center p-6 glass-card rounded-xl hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1 group"
          >
            {integration.logoUrl ? (
              <img
                src={integration.logoUrl}
                alt={`${integration.name} logo`}
                className="max-w-full h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
              />
            ) : (
              // Placeholder when no logo provided
              <div className="w-full h-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-gray-700/30 rounded-lg mb-2 flex items-center justify-center border border-gray-600/30">
                    <span className="text-gray-600 text-xs font-mono">LOGO</span>
                  </div>
                  <div className="text-xs text-gray-600 font-medium">{integration.name}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA below logos */}
      <div className="text-center mt-8">
        <p className="text-gray-400 mb-2">Don't see yours? We offer custom API integration.</p>
        <a
          href="#"
          className="text-brand-400 hover:text-brand-300 font-medium text-sm transition-colors"
        >
          See All Integrations →
        </a>
      </div>
    </div>
  );
};
