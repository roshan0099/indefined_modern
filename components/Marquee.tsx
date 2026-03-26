import React from 'react';
import useIsMobile from '../hooks/useIsMobile';
import LogoLoop, { LogoItem } from './ui/LogoLoop';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ children, speed }) => {
  const isMobile = useIsMobile();
  
  const logoItems: LogoItem[] = React.Children.map(children, (child) => ({
    node: child
  })) || [];

  return (
    <div className="w-full overflow-hidden py-4 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-bg transition-colors duration-300">
      <LogoLoop
        logos={logoItems}
        speed={speed ?? (isMobile ? 35 : 25)}
        direction="left"
        logoHeight={32}
        gap={0} 
        renderItem={(item, key) => (
          <div key={key} className="mx-8 font-heading text-2xl tracking-widest flex items-center text-gray-400 dark:text-gray-600">
            {item.node}
            <span className="primary-text dark:text-emerald-500 mx-8">&gt;</span>
          </div>
        )}
      />
    </div>
  );
};

export default Marquee;
