import React from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '../hooks/useMousePosition';
import useIsMobile from '../hooks/useIsMobile';

const CursorTrail: React.FC = () => {
  const { x, y } = useMousePosition();
  const isMobile = useIsMobile();

  // Don't render the trail on mobile devices
  if (isMobile) {
    return null;
  }

  const numDots = 20; // Increased slightly for a longer trail
  const trailDots = Array.from({ length: numDots });

  return (
    <>
      {trailDots.map((_, i) => {
        // Dynamic size calculation
        const size = Math.max(4, 18 - i * 1.5);

        return (
          <motion.div
            key={i}
            // Updated classes for glassy effect: semi-transparent background, backdrop blur, subtle border
            className="fixed bg-primary-green/30 backdrop-blur-[2px] border border-primary-green/10 rounded-full pointer-events-none z-[9999]"
            style={{
              width: size,
              height: size,
              left: -size / 2, // Center the dot on the cursor
              top: -size / 2,
            }}
            animate={{ x, y }}
            transition={{
              type: 'spring',
              damping: 25 + i * 2, // Increased damping for less oscillation
              stiffness: 250 - i * 15, // Reduced stiffness for a "looser", slower follow
              mass: 0.5 + i * 0.1, // Increased mass stagger for a heavier, more fluid trail
            }}
          />
        );
      })}
    </>
  );
};

export default CursorTrail;