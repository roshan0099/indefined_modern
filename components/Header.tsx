import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuVariants = {
    closed: { opacity: 0, scale: 0.95 },
    open: { opacity: 1, scale: 1 },
  };

  const navItemVariants = {
      closed: { opacity: 0, y: -20 },
      open: { opacity: 1, y: 0 }
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-6 bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} className="cursor-pointer">
            <BrandLogo className="text-3xl" />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="font-heading tracking-wider text-black hover:text-primary-green transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
            className="hidden md:inline-block px-6 py-2 font-heading text-md tracking-wider uppercase rounded-full transition-all duration-300 border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
          >
            Let's Talk
          </a>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="z-50 relative w-8 h-8 text-primary-green focus:outline-none">
                <span className="sr-only">Open main menu</span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                    className="absolute block h-0.5 w-full bg-current transform transition duration-300 ease-in-out top-1.5"
                ></motion.span>
                <motion.span
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    className="absolute block h-0.5 w-full bg-current transform transition duration-300 ease-in-out top-1/2 -mt-[1px]"
                ></motion.span>
                <motion.span
                    animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                    className="absolute block h-0.5 w-full bg-current transform transition duration-300 ease-in-out bottom-1.5"
                ></motion.span>
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {isOpen && (
            <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8"
            >
                {navLinks.map((link, i) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                        className="font-heading text-4xl tracking-wider text-black hover:text-primary-green transition-colors"
                        variants={navItemVariants}
                        initial="closed"
                        animate="open"
                        transition={{ delay: 0.2 + i * 0.05 }}
                    >
                        {link.name}
                    </motion.a>
                ))}
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;