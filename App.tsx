import React from 'react';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Marquee from './components/Marquee';
import ServingRegionsSection from './components/ServingRegionsSection';
import TestimonialsSection from './components/TestimonialsSection';
import BackToTopButton from './components/BackToTopButton';
import CursorTrail from './components/CursorTrail';

const App: React.FC = () => {
  return (
    <div className="font-body bg-white text-black relative overflow-x-hidden">
      <CursorTrail />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <Marquee>
          <span>WEBSITE CREATION</span>
          <span>DIGITAL MARKETING</span>
          <span>DESIGN SERVICES</span>
          <span>BRAND PROMOTION</span>
        </Marquee>
        <AboutSection />
        <ServicesSection />
        <ServingRegionsSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default App;