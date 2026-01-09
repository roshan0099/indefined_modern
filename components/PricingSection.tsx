import React from 'react';
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
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  offscreen: {
    y: 20,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
  }
};

const listVariants = {
  onscreen: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 sm:py-24 md:py-32 relative overflow-hidden border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-5xl md:text-7xl text-black dark:text-white flex items-center justify-center gap-2">
            Pricing<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span>
          </h2>
          <p className="mt-4 text-black/70 dark:text-gray-400 max-w-xl mx-auto">
            Transparent pricing for projects of all sizes. No hidden fees, just pure value.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className={`p-8 flex flex-col relative rounded-2xl bg-white dark:bg-dark-card ${tier.popular ? 'border-2 border-primary-green dark:border-emerald-500 shadow-xl' : 'border border-gray-200 dark:border-gray-700/50 shadow-sm'}`}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
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
                <Button variant={tier.popular ? 'primary' : 'secondary'} className={`w-full ${tier.popular ? 'dark:bg-emerald-600 dark:hover:bg-emerald-700' : 'dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}>
                  {tier.cta}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
