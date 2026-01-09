import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import { SoundWave } from './AnimatedDecorations';

const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 md:py-32 text-black dark:text-gray-100 relative overflow-hidden border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <SoundWave className="absolute bottom-10 right-10 opacity-30 z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl text-black dark:text-white flex items-center gap-2">
              Let's Talk<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span>
            </h2>
            <p className="mt-6 text-black/70 dark:text-gray-400 max-w-md">
              Have a project in mind or just want to say hello? We'd love to hear from you. Fill out the form or reach out to us directly.
            </p>
            <div className="mt-10 space-y-4 font-body">
              <p className="text-lg">
                <span className="font-bold">Email:</span> <a href="mailto:hello@indefined.dev" className="hover:text-primary-green dark:hover:text-emerald-400 transition-colors underline">hello@indefined.dev</a>
              </p>
              <p className="text-lg">
                <span className="font-bold">Phone:</span> <a href="tel:+1234567890" className="hover:text-primary-green dark:hover:text-emerald-400 transition-colors underline">+91 00000 00000</a>
              </p>
            </div>
          </motion.div>

          <div className="min-h-[380px]">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  className="space-y-6"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -30 }}
                  onSubmit={handleSubmit}
                >
                  <motion.div variants={itemVariants}>
                    <Input type="text" placeholder="Your Name" required />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input type="email" placeholder="Your Email" required />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Textarea placeholder="Your Message" required />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center bg-light-gray-bg dark:bg-dark-card p-8 rounded-lg flex flex-col justify-center items-center h-full"
                >
                  <h3 className="font-heading text-3xl text-primary-green dark:text-emerald-400 mb-4">Thank You!</h3>
                  <p className="text-black/80 dark:text-gray-300">Your message has been sent successfully. We'll get back to you shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
