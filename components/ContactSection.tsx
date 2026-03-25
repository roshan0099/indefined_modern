import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import { SoundWave } from './AnimatedDecorations';
import PixelBlast from './PixelBlast';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const waveY = useTransform(scrollYProgress, [0, 1], [65, -65]);
  const contentY = useTransform(scrollYProgress, [0, 1], [35, -20]);
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
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Redirect to email client
    window.location.href = `mailto:indefined.info@gmail.com?subject=Contact form submission from ${name}&body=${encodeURIComponent(message as string)}%0A%0A---%0AReply to: ${name} <${email}>`;

    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-28 sm:py-32 md:py-40 text-black dark:text-gray-100 relative overflow-hidden border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-70">
        <div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
          <PixelBlast
            variant="square"
            pixelSize={4}
            color="#4d5c4f"
            patternScale={2}
            patternDensity={1}
            enableRipples
            rippleSpeed={0.3}
            rippleThickness={0.1}
            rippleIntensityScale={1}
            speed={0.5}
            transparent
            edgeFade={0.25}
          />
        </div>
      </div>
      <motion.div className="absolute bottom-10 right-10 opacity-30 z-[1]" style={{ y: waveY }}>
        <SoundWave />
      </motion.div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="grid md:grid-cols-2 gap-20 md:gap-24 items-center" style={{ y: contentY }}>
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
            <div className="mt-12 space-y-5 font-body">
              <p className="text-lg">
                <span className="font-bold">Email:</span> <a href="mailto:indefined.info@gmail.com" className="hover:text-primary-green dark:hover:text-emerald-400 transition-colors underline">indefined.info@gmail.com</a>
              </p>
              <p className="text-lg">
                <span className="font-bold">WhatsApp:</span> <a href="https://wa.me/919061660079" target="_blank" rel="noopener noreferrer" className="hover:text-primary-green dark:hover:text-emerald-400 transition-colors underline">+91 90616 60079</a>
              </p>
            </div>
          </motion.div>

          <div className="min-h-[440px]">
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
                    <Input type="text" name="name" placeholder="Your Name" required />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input type="email" name="email" placeholder="Your Email" required />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Textarea name="message" placeholder="Your Message" required />
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
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
