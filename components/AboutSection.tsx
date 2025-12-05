import React from 'react';
import { motion, Variants } from 'framer-motion';
import { PulsingGrid } from './AnimatedDecorations';

const AboutSection: React.FC = () => {
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  
  return (
    <section id="about" className="py-20 sm:py-24 md:py-32 overflow-hidden relative border-y border-gray-200 bg-gray-50">
      <PulsingGrid className="absolute -top-16 -left-16 z-0 opacity-20" />
      <PulsingGrid className="absolute -bottom-24 -right-16 z-0 opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
            <motion.div 
                className="relative inline-block"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={contentVariants}
            >
                <h2 className="font-heading text-5xl md:text-7xl text-black">
                    Beyond the Template<span className="primary-text text-[1.2em] relative top-[-0.05em] ml-1">&gt;</span>
                </h2>
            </motion.div>
            <motion.p 
                className="mt-8 text-base md:text-lg text-black/70 leading-relaxed max-w-3xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={contentVariants}
                transition={{ delay: 0.2 }}
            >
                At indefined, we believe in breaking the mold. Our philosophy is built on intentional design and handcrafted code. We don't just build websites; we create digital landmarks. Every project is a partnership, a journey to create something unique, powerful, and lasting.
            </motion.p>
        </div>
        <motion.div 
            className="mt-20 grid md:grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.2 }}
        >
            <motion.div 
                variants={contentVariants}
                whileHover={{ y: -8, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                className="border border-gray-200 p-8 bg-white rounded-2xl shadow-sm"
            >
                <h3 className="font-heading text-4xl text-black">CRAFT<span className="primary-text text-[1.2em] relative top-[-0.05em] ml-1">&gt;</span></h3>
                <p className="mt-2 text-black/60">Meticulously handcrafted code for peak performance and scalability.</p>
            </motion.div>
             <motion.div 
                variants={contentVariants} 
                whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                className="border-2 border-primary-green p-8 bg-white rounded-2xl shadow-lg"
            >
                <h3 className="font-heading text-4xl text-black">DESIGN<span className="primary-text text-[1.2em] relative top-[-0.05em] ml-1">&gt;</span></h3>
                <p className="mt-2 text-black/60">Bold, intentional aesthetics that tell your brand's unique story.</p>
            </motion.div>
             <motion.div 
                variants={contentVariants}
                whileHover={{ y: -8, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                className="border border-gray-200 p-8 bg-white rounded-2xl shadow-sm"
            >
                <h3 className="font-heading text-4xl text-black">IMPACT<span className="primary-text text-[1.2em] relative top-[-0.05em] ml-1">&gt;</span></h3>
                <p className="mt-2 text-black/60">Creating memorable experiences that engage users and drive results.</p>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
