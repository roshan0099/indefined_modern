import React from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '../hooks/useMousePosition';
import useIsMobile from '../hooks/useIsMobile';

const CursorTrail: React.FC = () => {
  const { x, y } = useMousePosition();
  const isMobile = useIsMobile();

  // Don't render on mobile devices
  if (isMobile) {
    return null;
  }

  const size = 12; // Single dot size

  return (
    <motion.div
      className="fixed bg-primary-green rounded-full pointer-events-none z-[9999]"
      style={{
        width: size,
        height: size,
        left: -size / 2, // Center the dot on the cursor
        top: -size / 2,
      }}
      animate={{ x, y }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 400,
        mass: 0.2, // Lightweight for responsive feel
      }}
    />
  );
};

export default CursorTrail;