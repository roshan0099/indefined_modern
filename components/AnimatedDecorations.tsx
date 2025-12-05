import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedDecorationProps {
  className?: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({ 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', damping: 15, stiffness: 100, delay: i * 0.2 }
  }),
};

export const HeroShapeOne: React.FC<AnimatedDecorationProps & {custom: number}> = ({ className, custom }) => {
  return (
    <motion.div
      className={className}
      custom={custom}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1, rotate: 10 }}
    >
      <svg className="w-20 h-20 text-gray-200" viewBox="0 0 80 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 0L52.9378 27.0622L80 40L52.9378 52.9378L40 80L27.0622 52.9378L0 40L27.0622 27.0622L40 0Z" />
      </svg>
    </motion.div>
  );
};

export const HeroShapeTwo: React.FC<AnimatedDecorationProps & {custom: number}> = ({ className, custom }) => {
  return (
    <motion.div
      className={className}
      custom={custom}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
    >
      <svg className="w-16 h-16 text-gray-200" viewBox="0 0 60 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="30" />
      </svg>
    </motion.div>
  );
};

export const HeroShapeThree: React.FC<AnimatedDecorationProps & {custom: number}> = ({ className, custom }) => {
  return (
    <motion.div
      className={className}
      custom={custom}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ rotate: -15 }}
    >
       <svg className="w-24 h-24 text-gray-200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="80" height="80" rx="10" stroke="currentColor" strokeWidth="4"/>
      </svg>
    </motion.div>
  );
};

export const HeroShapeFour: React.FC<AnimatedDecorationProps & {custom: number}> = ({ className, custom }) => {
    return (
        <motion.div
            className={className}
            custom={custom}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.2 }}
        >
            <svg className="w-8 h-8 text-primary-green" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19 M5 12H19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
        </motion.div>
    );
};

export const PulsingGrid: React.FC<AnimatedDecorationProps> = ({ className }) => {
    return (
        <motion.svg
            className={className}
            width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        >
            <path d="M40 0V200 M80 0V200 M120 0V200 M160 0V200 M0 40H200 M0 80H200 M0 120H200 M0 160H200" stroke="#d1d5db" strokeWidth="1" />
        </motion.svg>
    );
};

export const AnimatedPlus: React.FC<AnimatedDecorationProps> = ({ className }) => {
    return (
        <motion.svg
            className={className}
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: [0, 90], scale: [1, 1.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        >
            <path d="M12 5V19 M5 12H19" stroke="#064e3b" strokeWidth="2" strokeLinecap="round"/>
        </motion.svg>
    );
};

export const SoundWave: React.FC<AnimatedDecorationProps> = ({ className }) => {
    const waveVariants = {
      animate: {
        pathLength: [0.5, 1, 0.5],
        pathOffset: [0, 0.5, 1],
      },
    };
    return (
        <motion.svg className={className} width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                d="M 5,25 C 15,10 25,40 35,25 S 55,10 65,25 S 85,40 95,25"
                stroke="#064e3b" strokeWidth="2" strokeLinecap="round"
                variants={waveVariants}
                animate="animate"
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
        </motion.svg>
    );
};

export const UsaIcon: React.FC<AnimatedDecorationProps> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 25.5L10.5 26.5L13.5 19.5L26.5 18.5L29 23L38 21.5L42.5 24.5L52 23L57.5 18.5L62.5 19L65.5 16.5L71 16.5L75.5 12.5L84.5 1.5L98.5 3.5V16.5L93 21L94 26L98.5 28.5V40L88.5 44.5L71 44.5L60.5 48.5L51.5 41L42.5 44L28 43L22.5 48.5H1.5V25.5Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export const IndiaIcon: React.FC<AnimatedDecorationProps> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.3 1.9L1.5 29.2V39.4L15.3 53.2L12.3 62.4L20.2 73.1L2.5 90.3L20.2 108.5L44.3 98.3L54.1 108.5L63.4 94.7L80.1 108.5L98.5 83.9L84.8 63.9L94.1 42.4L69.8 13.6L41.3 1.9Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export const QatarIcon: React.FC<AnimatedDecorationProps> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48.5 1.5L34.3 2.5L25.9 13.9L22.2 27.2L13.8 38.6L12.4 53.4L18.5 68.2L13.8 80.9L1.5 98.5H48.5V1.5Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};