import React from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const testimonials = [
  {
    name: 'Sarah J.',
    company: 'CEO of TechCorp',
    quote: 'indefined> delivered a product that exceeded our wildest expectations. Their design sense is unparalleled.',
  },
  {
    name: 'Mike R.',
    company: 'Founder of Innovate LLC',
    quote: 'The team is professional, responsive, and incredibly talented. They transformed our online presence completely.',
  },
  {
    name: 'Emily Chen',
    company: 'Marketing Director, Growth Solutions',
    quote: 'Working with them was a breeze. The results speak for themselves - our engagement has skyrocketed since the relaunch.',
  },
  {
    name: 'David Lee',
    company: 'Art Director, Creative Co.',
    quote: 'Their attention to detail and commitment to quality is what sets them apart. A truly five-star experience.',
  }
];

const TestimonialCard: React.FC<{ name: string; company: string; quote: string; }> = ({ name, company, quote }) => {
  return (
    <div className="flex-shrink-0 w-[350px] md:w-[450px] mx-4 border border-gray-200 dark:border-gray-700/50 p-8 bg-white dark:bg-dark-card shadow-sm rounded-2xl hover:shadow-md transition-shadow duration-300 hover:-translate-y-1">
      <p className="text-lg text-black/70 dark:text-gray-300 font-body mb-6">"{quote}"</p>
      <div className="font-heading text-xl text-black dark:text-white flex items-center gap-2">
        {name}
        <span className="primary-text dark:text-emerald-400 leading-none">&gt;</span>
      </div>
      <span className="block text-base font-body text-black/60 dark:text-gray-500 tracking-normal normal-case mt-1">{company}</span>
    </div>
  );
};


const TestimonialsSection: React.FC = () => {
  const isMobile = useIsMobile();
  // Increased duration (slower speed) for desktop: 50 -> 80
  const duration = isMobile ? 20 : 80;

  // Create a larger base set (8 items) to ensure it covers wide screens
  const baseTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 sm:py-24 md:py-32 relative overflow-hidden border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-5xl md:text-7xl text-black dark:text-white flex items-center justify-center gap-2">
            From Our Clients<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span>
          </h2>
        </motion.div>
      </div>

      <div className="w-full overflow-hidden">
        <motion.div
          className="flex w-fit"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            ease: 'linear',
            duration: duration,
            repeat: Infinity,
          }}
          style={{ willChange: 'transform' }}
        >
          {/* First Block */}
          <div className="flex flex-shrink-0">
            {baseTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`a-${index}`} {...testimonial} />
            ))}
          </div>
          {/* Second Block (Duplicate for Loop) */}
          <div className="flex flex-shrink-0">
            {baseTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`b-${index}`} {...testimonial} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;