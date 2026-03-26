import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ children, speed }) => {
  const baseItems = React.Children.toArray(children);
  const repeatedItems = Array.from({ length: 6 }, (_, index) => baseItems[index % baseItems.length]);
  const duration = speed ?? 58;

  return (
    <div className="w-full overflow-hidden py-4 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="service-marquee-track" style={{ ['--service-marquee-duration' as string]: `${duration}s` }}>
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="service-marquee-group gap-16 items-center" aria-hidden={copyIndex > 0}>
            {repeatedItems.map((child, index) => (
              <div key={`marquee-item-${copyIndex}-${index}`} className="font-heading text-2xl tracking-widest flex items-center text-gray-400 dark:text-gray-600 whitespace-nowrap">
                {child}
                <span className="primary-text dark:text-emerald-500 ml-6">&gt;</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
