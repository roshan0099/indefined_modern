import React from 'react';
import useIsMobile from '../hooks/useIsMobile';

const regions = ['USA', 'India', 'Qatar'];

const ServingRegionsSection: React.FC = () => {
  const isMobile = useIsMobile();
  const regionSequence = Array.from({ length: 12 }, (_, index) => regions[index % regions.length]);

  const duration = isMobile ? 45 : 65;

  return (
    <section className="overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="py-4 md:py-6">
        <div
          className="country-marquee-track"
          style={{
            ['--country-marquee-duration' as string]: `${duration}s`,
            ['--country-item-gap' as string]: '5rem',
            ['--country-symbol-gap' as string]: '1.5rem',
          }}
        >
          {[0, 1].map((copyIndex) => (
            <div key={copyIndex} className="country-marquee-group" aria-hidden={copyIndex > 0}>
              {regionSequence.map((region, index) => (
                <div key={`country-${copyIndex}-${index}`} className="country-marquee-item">
                  <span className="font-heading text-3xl md:text-5xl tracking-widest uppercase text-gray-300 dark:text-gray-700">
                    {region}
                  </span>
                  <span className="country-marquee-separator primary-text text-3xl md:text-5xl font-heading">&gt;</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServingRegionsSection;
