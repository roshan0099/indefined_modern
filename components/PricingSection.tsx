import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

const tiers = [
  {
    name: 'Starter',
    price: '₹1,200',
    description: 'For individuals and small teams getting started.',
    features: ['Static Website', 'Basic SEO', '1 Month Support', 'Design Mockup'],
    cta: 'Get Started'
  },
  {
    name: 'Pro',
    price: '₹4,500',
    description: 'For growing businesses that need more power.',
    features: ['Dynamic CMS', 'Advanced SEO', '3 Months Support', 'Full UI/UX Design', 'Marketing Strategy'],
    popular: true,
    cta: 'Choose Pro'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with specific needs.',
    features: ['Custom Platform', 'Dedicated SEO Team', 'Ongoing Support', 'Brand Identity', 'API Integrations'],
    cta: 'Contact Us'
  }
];

const cardVariants = {
  hidden: (index: number = 0) => {
    const directions = [
      { x: -72, y: 0 },
      { x: 0, y: 72 },
      { x: 72, y: 0 },
      { x: 0, y: -72 },
    ];
    const direction = directions[index % directions.length];
    return {
      opacity: 0,
      scale: 0.96,
      ...direction,
    };
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

const listVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const whatsappNumber = '919061660079';

  const handleTierInquiry = (tier: typeof tiers[number]) => {
    const message = `Hi indefined team, I am interested in the ${tier.name} plan (${tier.price}). Key features I am looking at: ${tier.features.join(', ')}. Please share the next steps.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section ref={sectionRef} id="pricing" className="py-24 sm:py-32 md:py-48 relative overflow-hidden border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <motion.div
        className="pointer-events-none absolute -top-24 -left-16 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-primary-green/15 to-emerald-400/5 blur-3xl"
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-emerald-400/10 to-primary-green/5 blur-3xl"
      />
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-5xl md:text-7xl text-black dark:text-white flex items-center justify-center gap-2">
            Pricing<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span>
          </h2>
          <p className="mt-4 text-black/70 dark:text-gray-400 max-w-xl mx-auto">
            Transparent pricing for projects of all sizes. No hidden fees, just pure value.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className={`p-10 flex flex-col relative rounded-2xl bg-white dark:bg-dark-card ${tier.popular ? 'border-2 border-primary-green dark:border-emerald-500 shadow-xl' : 'border border-gray-200 dark:border-gray-700/50 shadow-sm'}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary-green dark:bg-emerald-500 text-white font-heading text-sm px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
                </div>
              )}
              <motion.h3 variants={itemVariants} className="font-heading text-4xl text-center text-black dark:text-white">{tier.name}</motion.h3>
              <motion.p variants={itemVariants} className="text-center mt-2 text-black/60 dark:text-gray-400">{tier.description}</motion.p>
              <motion.div variants={itemVariants} className="font-heading text-6xl text-center my-8 text-black dark:text-white">
                {tier.price}
              </motion.div>
              <motion.ul variants={listVariants} className="space-y-4 mb-10 flex-grow text-black/80 dark:text-gray-300">
                {tier.features.map((feature, i) => (
                  <motion.li key={i} variants={itemVariants} className="flex items-center">
                    <span className="primary-text dark:text-emerald-400 mr-3 font-bold">&gt;</span>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={itemVariants}>
                <Button
                  variant={tier.popular ? 'primary' : 'secondary'}
                  className={`w-full ${tier.popular ? 'dark:bg-emerald-600 dark:hover:bg-emerald-700' : 'dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}
                  onClick={() => handleTierInquiry(tier)}
                >
                  {tier.cta}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/*
        <div className="mt-40">
          <ServiceEstimator />
        </div>
        */}
      </div>
    </section>
  );
};

export default PricingSection;
