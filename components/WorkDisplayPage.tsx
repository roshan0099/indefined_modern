import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe2, Moon, Newspaper, PenTool, SearchCheck, Sun } from 'lucide-react';
import BrandLogo from './BrandLogo';
import BackToTopButton from './BackToTopButton';
import { HeroShapeOne, HeroShapeTwo, HeroShapeThree, HeroShapeFour, BackgroundGradientOrbs } from './AnimatedDecorations';
import GreenLightParticles from './GreenLightParticles';
import dunesLogo from '../assets/dunes_logo.jpeg';
import nokLogo from '../assets/nok_logo.jpeg';
import paintLogo from '../assets/paint_logo.jpeg';
import AnimatedHeading from './AnimatedHeading';

type WorkCategory = {
  title: string;
  summary: string;
  highlight: string;
  icon: React.ReactNode;
};

type WebsiteWork = {
  name: string;
  url: string;
  summary: string;
  stack: string[];
};

type LogoWork = {
  name: string;
  src: string;
};

const navLinks = [
  { name: 'Logo', href: '#logo-showcase' },
  { name: 'Brochure', href: '#work-categories' },
  { name: 'Website', href: '#website-preview' },
  { name: 'SEO', href: '#work-categories' },
  { name: 'Home', href: '/' },
];

const workCategories: WorkCategory[] = [
  {
    title: 'Logo',
    summary: 'Identity systems, logo marks, and visual language for growing brands.',
    highlight: 'Brand-first concepts with scalable assets.',
    icon: <PenTool size={28} />,
  },
  {
    title: 'Brochure',
    summary: 'Clean editorial layouts for travel, product, and corporate communication.',
    highlight: 'Print-ready files with conversion-focused storytelling.',
    icon: <Newspaper size={28} />,
  },
  {
    title: 'Website',
    summary: 'Modern responsive websites built for performance, SEO, and conversion.',
    highlight: 'Desktop and mobile optimized user experiences.',
    icon: <Globe2 size={28} />,
  },
  {
    title: 'SEO',
    summary: 'Technical and on-page SEO improvements to boost ranking and discoverability.',
    highlight: 'Keyword strategy plus measurable organic growth.',
    icon: <SearchCheck size={28} />,
  },
];

const websiteWorks: WebsiteWork[] = [
  {
    name: 'Ultra Glide Automotive',
    url: 'https://www.ultraglideautomotive.com/',
    summary: 'Automotive-focused website experience with clear service pathways and strong brand tone.',
    stack: ['Responsive UI', 'Service-first UX', 'Lead-focused structure'],
  },
  {
    name: 'Trinity Hotbin',
    url: 'https://www.trinityhotbin.store/',
    summary: 'Ecommerce-forward storefront with a simple buying journey and modern product presentation.',
    stack: ['Storefront UX', 'Mobile-first layout', 'Conversion-driven flow'],
  },
];

const logoWorks: LogoWork[] = [
  { name: 'DUNES', src: dunesLogo },
  { name: 'NOK', src: nokLogo },
  { name: 'PAINT', src: paintLogo },
];

const WorkDisplayPage: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const categoriesRef = useRef<HTMLElement | null>(null);
  const websitesRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const { scrollYProgress: categoriesProgress } = useScroll({
    target: categoriesRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: websitesProgress } = useScroll({
    target: websitesRef,
    offset: ['start end', 'end start'],
  });
  const heroShapesY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 70]);
  const heroContentOpacity = useTransform(heroProgress, [0, 1], [1, 0.5]);
  const categoriesHeadingY = useTransform(categoriesProgress, [0, 1], [35, -25]);
  const websitesHeadingY = useTransform(websitesProgress, [0, 1], [35, -25]);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      scrollToSection(href);
      return;
    }
    setIsOpen(false);
    window.location.href = href;
  };

  const menuVariants = {
    closed: { opacity: 0, scale: 0.95 },
    open: { opacity: 1, scale: 1 },
  };

  const navItemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <div className="font-body bg-white dark:bg-dark-bg text-black dark:text-gray-100 min-h-screen relative overflow-x-hidden transition-colors duration-300">
      <GreenLightParticles />
      <BackgroundGradientOrbs />

      <motion.header
        className="fixed top-0 left-0 w-full z-50 py-4 bg-white/85 dark:bg-dark-bg/85 backdrop-blur-lg shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <a href="/" className="cursor-pointer">
            <BrandLogo className="text-3xl dark:text-white" />
          </a>
          <nav className="hidden md:flex items-center gap-8 font-heading tracking-wider">
            {navLinks.slice(0, 4).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-primary-green dark:hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
            </button>
            <a
              href="/#contact"
              className="hidden md:inline-block px-5 py-2 font-heading text-sm tracking-wider uppercase rounded-full transition-all duration-300 border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white"
            >
              Start Project
            </a>
            
            <div className="md:hidden ml-2 flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="z-[60] relative w-8 h-8 text-primary-green focus:outline-none">
                <span className="sr-only">Open main menu</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                  className="absolute block h-0.5 w-full bg-current transform transition duration-300 ease-in-out top-1.5"
                ></motion.span>
                <motion.span
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  className="absolute block h-0.5 w-full bg-current transform transition duration-300 ease-in-out top-1/2 -mt-[1px]"
                ></motion.span>
                <motion.span
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                  className="absolute block h-0.5 w-full bg-current transform transition duration-300 ease-in-out bottom-1.5"
                ></motion.span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-white dark:bg-dark-bg z-40 flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-heading text-4xl tracking-wider text-black dark:text-white hover:text-primary-green dark:hover:text-emerald-400 transition-colors"
                variants={navItemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-28">
        <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden py-24 sm:py-32 md:py-40">
          <motion.div className="absolute top-0 left-0 w-full h-full opacity-50 z-0" style={{ y: heroShapesY }}>
            <HeroShapeOne custom={1} className="absolute top-[12%] left-[8%]" />
            <HeroShapeTwo custom={2} className="absolute bottom-[18%] right-[10%]" />
            <HeroShapeThree custom={3} className="absolute top-[14%] right-[16%]" />
            <HeroShapeFour custom={4} className="absolute bottom-[24%] left-[20%]" />
          </motion.div>
          <motion.div className="container mx-auto px-4 relative z-10" style={{ y: heroContentY, opacity: heroContentOpacity }}>
            <motion.h1
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black dark:text-white leading-tight"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Work Display<span className="primary-text dark:text-emerald-400 text-[1.2em] leading-none">&gt;</span>
            </motion.h1>
            <motion.p
              className="mt-8 max-w-3xl text-base md:text-lg text-black/70 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
            >
              A focused look at the work we deliver across logo design, brochure design, website development, and SEO execution.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              {['Logo', 'Brochure', 'Website', 'SEO'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-primary-green/20 dark:border-emerald-500/40 bg-white/90 dark:bg-dark-card px-4 py-2 text-sm font-heading tracking-wider text-primary-green dark:text-emerald-400"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section ref={categoriesRef} id="work-categories" className="py-28 sm:py-32 md:py-40 border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45 }}
              style={{ y: categoriesHeadingY }}
            >
              <AnimatedHeading 
                text="Core Work Streams" 
                Tag="h2" 
                className="font-heading text-4xl md:text-6xl text-black dark:text-white flex items-center justify-center gap-2"
              />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {workCategories.map((category, index) => (
                <motion.article
                  key={category.title}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-dark-card shadow-sm p-8 transition-shadow duration-300 hover:shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-green/10 dark:bg-emerald-500/20 text-primary-green dark:text-emerald-400 flex items-center justify-center mb-5">
                    {category.icon}
                  </div>
                  <h3 className="font-heading text-2xl text-black dark:text-white flex items-center gap-2">
                    {category.title}
                    <span className="primary-text dark:text-emerald-400 text-[1.15em] leading-none">&gt;</span>
                  </h3>
                  <p className="mt-3 text-black/70 dark:text-gray-300 text-sm leading-relaxed">
                    {category.summary}
                  </p>
                  <p className="mt-4 text-primary-green dark:text-emerald-400 text-sm font-medium">
                    {category.highlight}
                  </p>
                </motion.article>
              ))}
            </div>

            <motion.div
              id="logo-showcase"
              className="mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
            >
              <AnimatedHeading 
                text="Logo Showcase" 
                Tag="h3" 
                className="font-heading text-3xl md:text-4xl text-black dark:text-white flex items-center gap-2"
              />
              <p className="mt-3 text-black/70 dark:text-gray-400 max-w-2xl">
                Recent logo marks from our branding work, presented in a clean gallery format.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {logoWorks.map((logo, index) => (
                  <motion.figure
                    key={logo.name}
                    className="group rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-dark-card shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    whileHover={{ y: -4, boxShadow: '0 14px 24px -10px rgb(0 0 0 / 0.2)' }}
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-white via-emerald-50/30 to-white dark:from-slate-900 dark:via-emerald-900/20 dark:to-slate-900 p-6">
                      <img
                        src={logo.src}
                        alt={`${logo.name} logo`}
                        className="w-full h-full object-contain rounded-lg transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="px-5 py-4 font-heading tracking-wider text-black dark:text-white">
                      {logo.name}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={websitesRef} id="website-preview" className="py-28 sm:py-32 md:py-40">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              style={{ y: websitesHeadingY }}
            >
              <AnimatedHeading 
                text="Website Previews" 
                Tag="h2" 
                className="font-heading text-4xl md:text-6xl text-black dark:text-white flex items-center justify-center gap-2"
              />
              <p className="mt-4 text-black/70 dark:text-gray-400 max-w-2xl mx-auto">
                Live mini previews of current web work. If your browser blocks embedding, you can still open each site directly.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              {websiteWorks.map((site, index) => (
                <motion.article
                  key={site.url}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-dark-card shadow-sm overflow-hidden"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -5, boxShadow: '0 16px 24px -10px rgb(0 0 0 / 0.18)' }}
                >
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800/70">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-2 text-xs md:text-sm truncate text-black/60 dark:text-gray-300">
                      {site.url}
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] bg-white dark:bg-slate-950">
                    <iframe
                      src={site.url}
                      title={`${site.name} website preview`}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-heading text-2xl text-black dark:text-white flex items-center gap-2">
                      {site.name}
                      <span className="primary-text dark:text-emerald-400 text-[1.15em] leading-none">&gt;</span>
                    </h3>
                    <p className="mt-3 text-sm text-black/70 dark:text-gray-300 leading-relaxed">
                      {site.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {site.stack.map((item) => (
                        <span
                          key={item}
                          className="text-xs rounded-full border border-primary-green/20 dark:border-emerald-500/40 px-3 py-1 text-primary-green dark:text-emerald-400"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 font-heading tracking-wider text-primary-green dark:text-emerald-400 hover:underline underline-offset-4"
                    >
                      Open Live Site <ArrowUpRight size={17} />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-14">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <BrandLogo className="text-3xl dark:text-white" />
          <div className="flex items-center gap-6 font-heading tracking-wider">
            <a href="/" className="hover:text-primary-green dark:hover:text-emerald-400 transition-colors">Home</a>
            <a href="/#contact" className="hover:text-primary-green dark:hover:text-emerald-400 transition-colors">Contact</a>
          </div>
          <p className="text-black/60 dark:text-gray-400 text-sm">Built by indefined for brands that want standout digital presence.</p>
        </div>
      </footer>

      <BackToTopButton />
    </div>
  );
};

export default WorkDisplayPage;
