import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from './BrandLogo';

const CursorBlinker = () => {
  return (
    <motion.div
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: "steps(1, end)" as any }}
      className="inline-block h-[0.8em] w-2.5 bg-primary-green dark:bg-emerald-400 ml-1"
      style={{ verticalAlign: 'text-bottom' }}
    />
  );
};

const FooterBrandLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <BrandLogo className="text-4xl text-black dark:text-white" />
      <CursorBlinker />
    </div>
  );
};


const Footer: React.FC = () => {
  return (
    <footer className="text-black/70 dark:text-gray-400 py-12 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <FooterBrandLogo />
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0 font-heading tracking-wider">
          <a href="#home" className="hover:text-primary-green dark:hover:text-emerald-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-primary-green dark:hover:text-emerald-400 transition-colors">About</a>
          <a href="#services" className="hover:text-primary-green dark:hover:text-emerald-400 transition-colors">Services</a>
          <a href="#contact" className="hover:text-primary-green dark:hover:text-emerald-400 transition-colors">Contact</a>
        </div>
        <div>
          <p>&copy; {new Date().getFullYear()} indefined{'>'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;