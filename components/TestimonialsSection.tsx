import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import LogoLoop from './ui/LogoLoop';

const testimonials = [
  {
    name: 'REDBEE Holidays',
    company: 'Brochure Design & Print',
    quote: 'Huge shoutout to the team for consistently delivering amazing brochures! The experience has always been seamless, and the print quality last season was spot on. Highly recommend for great service and quality.',
  },
  {
    name: 'EXPERT ONE INNOVATIONS',
    company: 'Logo Design',
    quote: 'Huge shoutout for our new logo! The work is absolutely fabulous and exactly what we were looking for. Top-tier design and a great experience overall. Highly recommendable!',
  },
  {
    name: 'AURORA STAYS',
    company: 'Website & Brand Refresh',
    quote: 'From concept to final website launch, every detail was handled with care. Our bookings increased within weeks, and the new brand look feels premium.',
  },
  {
    name: 'GREENPATH ORGANICS',
    company: 'Campaign Creatives',
    quote: 'Quick turnaround, clear communication, and designs that actually convert. Their social creatives helped us stand out in a crowded market.',
  },
  {
    name: 'NEXA WELLNESS LABS',
    company: 'Packaging & Marketing Design',
    quote: 'They understood our vision on day one and translated it into polished packaging and marketing assets. The final output was clean, modern, and on-brand.',
  },
];

const TestimonialCard: React.FC<{ name: string; company: string; quote: string; }> = ({ name, company, quote }) => {
  return (
    <div className="flex-shrink-0 w-[350px] md:w-[450px] h-[400px] md:h-[450px] mx-5 my-4 flex flex-col justify-between border border-gray-200 dark:border-gray-700/50 p-10 bg-white dark:bg-dark-card shadow-sm rounded-2xl hover:shadow-md transition-all duration-300 hover:-translate-y-2">
      <div>
        <div className="inline-flex items-center rounded-full border border-primary-green/20 dark:border-emerald-500/40 px-3 py-1 text-xs font-heading tracking-wider text-primary-green dark:text-emerald-400 mb-5">
          VERIFIED REVIEW
        </div>
        <p className="text-lg text-black/70 dark:text-gray-300 font-body mb-6">"{quote}"</p>
      </div>
      <div>
        <div className="font-heading text-xl text-black dark:text-white flex items-center gap-2">
          {name}
          <span className="primary-text dark:text-emerald-400 leading-none">&gt;</span>
        </div>
        <span className="block text-base font-body text-black/60 dark:text-gray-500 tracking-normal normal-case mt-1">{company}</span>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [30, -25]);
  const isMobile = useIsMobile();

  const testimonialItems = testimonials.map(t => ({
    node: <TestimonialCard {...t} />
  }));

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 sm:py-32 md:py-48 relative overflow-hidden border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          style={{ y: headingY }}
        >
          <h2 className="font-heading text-5xl md:text-7xl text-black dark:text-white flex items-center justify-center gap-2">
            Client Reviews<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span>
          </h2>
          <p className="mt-4 text-black/70 dark:text-gray-400 max-w-2xl mx-auto">
            Real feedback from brands we have partnered with across design, branding, and digital delivery.
          </p>
        </motion.div>
      </div>

      <div className="w-full overflow-hidden py-10">
        <LogoLoop
          logos={testimonialItems}
          speed={isMobile ? 40 : 30}
          direction="left"
          gap={0}
          pauseOnHover={true}
          logoHeight={350} // Enough height to encompass cards
          renderItem={(item, key) => (
            <React.Fragment key={key}>{item.node}</React.Fragment>
          )}
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;
