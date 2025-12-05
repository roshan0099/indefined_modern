import React from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const regions = ['USA', 'India', 'Qatar'];

// Repeat the array to ensure the marquee is filled (15 items total per block)
const extendedRegions = Array(5).fill(regions).flat();

const ServingRegionsSection: React.FC = () => {
  const isMobile = useIsMobile();
  // Increased duration (slower speed) for desktop: 30 -> 45
  const duration = isMobile ? 15 : 45;

  return (
    <section className="overflow-hidden bg-gray-50">
      <div className="py-4 md:py-6">
          <motion.div
            className="flex whitespace-nowrap w-fit"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              ease: 'linear',
              duration: duration,
              repeat: Infinity,
            }}
            style={{ willChange: 'transform' }}
          >
              {/* We render the list twice for a seamless loop */}
              <div className="flex-shrink-0 flex items-center">
                  {extendedRegions.map((region, index) => (
                      <div key={index} className="flex items-center">
                          <span className="mx-10 font-heading text-3xl md:text-5xl tracking-widest uppercase text-gray-300">
                              {region}
                          </span>
                          <span className="primary-text text-3xl md:text-5xl font-heading">&gt;</span>
                      </div>
                  ))}
              </div>
               <div className="flex-shrink-0 flex items-center" aria-hidden="true">
                  {extendedRegions.map((region, index) => (
                      <div key={`dup-${index}`} className="flex items-center">
                          <span className="mx-10 font-heading text-3xl md:text-5xl tracking-widest uppercase text-gray-300">
                              {region}
                          </span>
                          <span className="primary-text text-3xl md:text-5xl font-heading">&gt;</span>
                      </div>
                  ))}
              </div>
          </motion.div>
      </div>
    </section>
  );
};

export default ServingRegionsSection;