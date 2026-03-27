import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ children, speed }) => {
  const baseItems = React.Children.toArray(children);
  const duration = speed ?? 58;

  return (
    <div className="w-full overflow-hidden py-4 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div
        className="service-marquee-track"
        style={{
          ['--service-marquee-duration' as string]: `${duration}s`,
          ['--service-item-gap' as string]: '4rem',
          ['--service-symbol-gap' as string]: '1.5rem',
        }}
      >
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="service-marquee-group" aria-hidden={copyIndex > 0}>
            {baseItems.map((child, index) => (
              <div key={`marquee-item-${copyIndex}-${index}`} className="service-marquee-item font-heading text-2xl tracking-widest text-gray-400 dark:text-gray-600">
                <span>{child}</span>
                <span className="service-marquee-separator primary-text dark:text-emerald-500">&gt;</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
