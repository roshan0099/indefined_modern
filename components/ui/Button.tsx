import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// FIX: Changed props interface to extend HTMLMotionProps<'button'>.
// The previous type `React.ComponentProps<typeof motion.button>` was not correctly resolving
// all standard HTML button attributes, leading to type errors for props like 'className', 'onClick', and 'type'.
// `HTMLMotionProps<'button'>` is the correct type from framer-motion for this use case.
interface ButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = "px-8 py-3 font-heading text-lg tracking-wider uppercase rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-green/30";

  const variants = {
    primary: "bg-primary-green dark:bg-emerald-600 text-white hover:bg-opacity-90 dark:hover:bg-emerald-700",
    secondary: "bg-transparent border-2 border-primary-green dark:border-emerald-500 text-primary-green dark:text-emerald-500 hover:bg-primary-green dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;