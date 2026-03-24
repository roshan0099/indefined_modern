import React from 'react';
import { motion, Variants } from 'framer-motion';

export const titleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

export const letterVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 14, stiffness: 150 } },
};

interface Props {
  text: string;
  className?: string;
  Tag?: any;
  noArrow?: boolean;
}

const AnimatedHeading: React.FC<Props> = ({ text, className = '', Tag = 'h2', noArrow = false }) => {
  const MotionTag = motion.create(Tag) as any;

  return (
    <MotionTag
      className={`${className} flex items-center justify-center`}
      variants={titleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="flex flex-wrap items-center justify-center">
        {text.split(' ').map((word, wordIdx) => (
          <span key={wordIdx} className="inline-flex overflow-visible mr-[0.3em]">
            {word.split('').map((char, charIdx) => (
              <motion.span key={charIdx} variants={letterVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
        ))}
        {!noArrow && (
          <motion.span
            variants={letterVariants}
            className="primary-text dark:text-emerald-400 text-[1.2em] leading-none inline-block ml-1"
          >
            &gt;
          </motion.span>
        )}
      </div>
    </MotionTag>
  );
};

export default AnimatedHeading;
