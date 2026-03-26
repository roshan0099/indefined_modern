import React from 'react';
import useIsMobile from '../hooks/useIsMobile';
import LogoLoop from './ui/LogoLoop';

const regions = ['USA', 'India', 'Qatar'];

const ServingRegionsSection: React.FC = () => {
  const isMobile = useIsMobile();

  const logoItems = regions.map((region) => ({
    node: (
      <div className="flex items-center">
        <span className="mx-10 font-heading text-3xl md:text-5xl tracking-widest uppercase text-gray-300 dark:text-gray-700">
          {region}
        </span>
        <span className="primary-text text-3xl md:text-5xl font-heading">&gt;</span>
      </div>
    )
  }));

  return (
    <section className="overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="py-4 md:py-6">
        <LogoLoop
          logos={logoItems}
          speed={isMobile ? 35 : 25}
          direction="left"
          gap={0}
          logoHeight={50} // enough for text-5xl
          renderItem={(item, key) => (
            <React.Fragment key={key}>{item.node}</React.Fragment>
          )}
        />
      </div>
    </section>
  );
};

export default ServingRegionsSection;
