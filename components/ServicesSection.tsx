import React from 'react';
import { motion, Variants } from 'framer-motion';
import { AnimatedPlus } from './AnimatedDecorations';

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
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };


const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
      <AnimatedPlus className="absolute top-10 left-10 opacity-50" />
      <AnimatedPlus className="absolute bottom-24 right-10 opacity-50" />
      <AnimatedPlus className="absolute top-1/2 left-1/3 opacity-30" />
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-5xl md:text-7xl text-black">
            What We Create<span className="primary-text text-[1.2em] relative top-[-0.05em] ml-1">&gt;</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 p-8 group relative bg-white rounded-2xl shadow-sm transition-shadow duration-300"
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative z-10">
                <div className="mb-6">{service.icon}</div>
                <h3 className="font-heading text-3xl text-black mb-4">
                  {service.title}<span className="primary-text text-[1.2em] relative top-[-0.05em] ml-1">&gt;</span>
                </h3>
                <p className="text-black/60">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;