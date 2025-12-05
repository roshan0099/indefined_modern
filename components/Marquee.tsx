import React from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ children, speed }) => {
  const isMobile = useIsMobile();
  // Increased duration (slower speed) for desktop: 40 -> 60
  const animationSpeed = speed ?? (isMobile ? 20 : 60);
  
  // Repeat the children 4 times in each block to ensure adequate width even with short text
  const repetitions = Array(4).fill(null);

  const renderContent = () => (
    <>
      {repetitions.map((_, i) => (
        <React.Fragment key={i}>
          {React.Children.map(children, (child, childIndex) => (
            <div key={`${i}-${childIndex}`} className="mx-8 font-heading text-2xl tracking-widest flex items-center text-gray-400">
              {child}
              <span className="primary-text mx-8">&gt;</span>
            </div>
          ))}
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div className="w-full overflow-hidden py-4 border-y border-gray-200 bg-white">
      <motion.div
        className="flex whitespace-nowrap w-fit"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: animationSpeed,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{ willChange: 'transform' }}
      >
        <div className="flex-shrink-0 flex items-center">
            {renderContent()}
        </div>
        <div className="flex-shrink-0 flex items-center" aria-hidden="true">
            {renderContent()}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;