import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { AnimatedPlus } from './AnimatedDecorations';
import AnimatedHeading from './AnimatedHeading';

const services = [
  {
    icon: (
      <svg className="w-10 h-10 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Website Creation',
    description: 'From sleek portfolios to robust e-commerce platforms, we build fast, responsive, and scalable websites from the ground up.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Digital Marketing',
    description: 'Data-driven strategies to boost your online presence. SEO, content marketing, and targeted campaigns that convert.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
      </svg>
    ),
    title: 'Design Services',
    description: 'UI/UX, graphic design, and complete visual systems. We create beautiful and intuitive interfaces that users love.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.353a1.76 1.76 0 013.417-.592V5.882z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.353a1.76 1.76 0 013.417-.592V5.882z" />
      </svg>
    ),
    title: 'Brand Promotion',
    description: 'Building brand identity that resonates. We help you tell your story and connect with your audience on a deeper level.'
  }
];

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};


const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const accentsY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const headingY = useTransform(scrollYProgress, [0, 1], [35, -20]);

  return (
    <section ref={sectionRef} id="services" className="py-28 sm:py-32 md:py-40 relative overflow-hidden">
      <motion.div style={{ y: accentsY }}>
        <AnimatedPlus className="absolute top-10 left-10 opacity-50" />
        <AnimatedPlus className="absolute bottom-24 right-10 opacity-50" />
        <AnimatedPlus className="absolute top-1/2 left-1/3 opacity-30" />
      </motion.div>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          style={{ y: headingY }}
        >
          <AnimatedHeading 
            text="What We Create" 
            Tag="h2" 
            className="font-heading text-5xl md:text-7xl text-black flex items-center justify-center gap-2"
          />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 dark:border-gray-700/50 p-10 group relative bg-white dark:bg-dark-card rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-lg"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="relative z-10">
                <div className="mb-6 [&>svg]:text-primary-green [&>svg]:dark:text-emerald-400">{service.icon}</div>
                <h3 className="font-heading text-3xl text-black dark:text-white mb-4 flex items-center gap-2">
                  {service.title}<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span>
                </h3>
                <p className="text-black/60 dark:text-gray-400">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
