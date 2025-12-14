import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
};

export const SectionContainer: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <div id={id} className={`w-full ${className}`}>
        {children}
    </div>
  );
}