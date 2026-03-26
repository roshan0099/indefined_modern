import React from 'react';
import useIsMobile from '../hooks/useIsMobile';
import SmoothTicker from './ui/SmoothTicker';

const regions = ['USA', 'India', 'Qatar'];

const ServingRegionsSection: React.FC = () => {
  const isMobile = useIsMobile();
  const repeatedRegions = Array.from({ length: 8 }, (_, index) => regions[index % regions.length]);

  const items = repeatedRegions.map((region, index) => (
    <div key={`${region}-${index}`} className="flex items-center whitespace-nowrap">
      <span className="font-heading text-3xl md:text-5xl tracking-widest uppercase text-gray-300 dark:text-gray-700">
        {region}
      </span>
      <span className="primary-text text-3xl md:text-5xl font-heading ml-6">&gt;</span>
    </div>
  ));

  return (
    <section className="overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="py-4 md:py-6">
        <SmoothTicker items={items} duration={isMobile ? 45 : 65} groupClassName="gap-20 items-center" />
      </div>
    </section>
  );
};

export default ServingRegionsSection;
