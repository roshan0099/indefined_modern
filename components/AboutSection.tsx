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
        <section id="about" className="py-20 sm:py-24 md:py-32 overflow-hidden relative border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            <PulsingGrid className="absolute -top-16 -left-16 z-0 opacity-20 dark:opacity-10" />
            <PulsingGrid className="absolute -bottom-24 -right-16 z-0 opacity-20 dark:opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        className="relative inline-block"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={contentVariants}
                    >
                        <h2 className="font-heading text-5xl md:text-7xl text-black dark:text-white flex items-center justify-center gap-2">
                            Beyond the Template<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span>
                        </h2>
                    </motion.div>
                    <motion.p
                        className="mt-8 text-base md:text-lg text-black/70 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
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
                        className="border border-gray-200 dark:border-gray-700/50 p-8 bg-white dark:bg-dark-card rounded-2xl shadow-sm transition-all duration-300"
                    >
                        <h3 className="font-heading text-4xl text-black dark:text-white flex items-center justify-center gap-2">CRAFT<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span></h3>
                        <p className="mt-2 text-black/60 dark:text-gray-400">Meticulously handcrafted code for peak performance and scalability.</p>
                    </motion.div>
                    <motion.div
                        variants={contentVariants}
                        whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                        className="border-2 border-primary-green dark:border-emerald-500 p-8 bg-white dark:bg-dark-card rounded-2xl shadow-lg transition-all duration-300"
                    >
                        <h3 className="font-heading text-4xl text-black dark:text-white flex items-center justify-center gap-2">DESIGN<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span></h3>
                        <p className="mt-2 text-black/60 dark:text-gray-400">Bold, intentional aesthetics that tell your brand's unique story.</p>
                    </motion.div>
                    <motion.div
                        variants={contentVariants}
                        whileHover={{ y: -8, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                        className="border border-gray-200 dark:border-gray-700/50 p-8 bg-white dark:bg-dark-card rounded-2xl shadow-sm transition-all duration-300"
                    >
                        <h3 className="font-heading text-4xl text-black dark:text-white flex items-center justify-center gap-2">IMPACT<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span></h3>
                        <p className="mt-2 text-black/60 dark:text-gray-400">Creating memorable experiences that engage users and drive results.</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
