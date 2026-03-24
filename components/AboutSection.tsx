import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { PulsingGrid } from './AnimatedDecorations';
import AnimatedHeading from './AnimatedHeading';

const AboutSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const gridTopY = useTransform(scrollYProgress, [0, 1], [70, -70]);
    const gridBottomY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
    const headingY = useTransform(scrollYProgress, [0, 1], [40, -30]);

    const contentVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section ref={sectionRef} id="about" className="py-28 sm:py-32 md:py-40 overflow-hidden relative border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            <motion.div className="absolute -top-16 -left-16 z-0 opacity-20 dark:opacity-10" style={{ y: gridTopY }}>
                <PulsingGrid />
            </motion.div>
            <motion.div className="absolute -bottom-24 -right-16 z-0 opacity-20 dark:opacity-10" style={{ y: gridBottomY }}>
                <PulsingGrid />
            </motion.div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.div className="max-w-4xl mx-auto text-center" style={{ y: headingY }}>
                    <motion.div
                        className="relative inline-block"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={contentVariants}
                    >
                        <AnimatedHeading 
                            text="Beyond the Template" 
                            Tag="h2" 
                            className="font-heading text-5xl md:text-7xl text-black dark:text-white flex items-center justify-center gap-2"
                        />
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
                </motion.div>
                <motion.div
                    className="mt-28 grid md:grid-cols-3 gap-12 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ staggerChildren: 0.15 }}
                >
                    <motion.div
                        variants={cardVariants}
                        className="border border-gray-200 dark:border-gray-700/50 p-10 bg-white dark:bg-dark-card rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-lg"
                    >
                        <h3 className="font-heading text-4xl text-black dark:text-white flex items-center justify-center gap-2">CRAFT<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span></h3>
                        <p className="mt-2 text-black/60 dark:text-gray-400">Meticulously handcrafted code for peak performance and scalability.</p>
                    </motion.div>
                    <motion.div
                        variants={cardVariants}
                        className="border-2 border-primary-green dark:border-emerald-500 p-10 bg-white dark:bg-dark-card rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    >
                        <h3 className="font-heading text-4xl text-black dark:text-white flex items-center justify-center gap-2">DESIGN<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span></h3>
                        <p className="mt-2 text-black/60 dark:text-gray-400">Bold, intentional aesthetics that tell your brand's unique story.</p>
                    </motion.div>
                    <motion.div
                        variants={cardVariants}
                        className="border border-gray-200 dark:border-gray-700/50 p-10 bg-white dark:bg-dark-card rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-lg"
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
