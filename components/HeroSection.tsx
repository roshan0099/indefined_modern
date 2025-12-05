import React from 'react';
import { motion, Variants } from 'framer-motion';
import Button from './ui/Button';
import { HeroShapeOne, HeroShapeTwo, HeroShapeThree, HeroShapeFour } from './AnimatedDecorations';

const HeroSection: React.FC = () => {
  
  const title = "indefined>";
  const titleVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 200 } },
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 bg-white">
      <div className="absolute top-0 left-0 w-full h-full opacity-50 z-0">
          <HeroShapeOne custom={1} className="absolute top-[10%] left-[10%]" />
          <HeroShapeTwo custom={2} className="absolute bottom-[15%] right-[12%]" />
          <HeroShapeThree custom={3} className="absolute top-[15%] right-[15%]" />
          <HeroShapeFour custom={4} className="absolute bottom-[25%] left-[15%]" />
          <HeroShapeOne custom={5} className="absolute bottom-[45%] left-[25%] !w-12 !h-12" />
          <HeroShapeTwo custom={6} className="absolute top-[30%] left-[40%] !w-8 !h-8" />
          <HeroShapeFour custom={7} className="absolute bottom-[10%] left-[50%]" />
      </div>

      <motion.div 
        className="text-center z-10 p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="font-heading text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] tracking-tighter leading-none"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={char === '>' ? 'primary-text' : 'text-black'}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p 
          className="text-md md:text-xl max-w-2xl mx-auto mt-4 text-black/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          We craft bespoke digital experiences that defy the ordinary and define the future.
        </motion.p>
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button onClick={() => scrollToSection('#services')} className="w-full sm:w-auto">Our Work</Button>
          <Button onClick={() => scrollToSection('#contact')} variant="secondary" className="w-full sm:w-auto">Contact Us</Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;