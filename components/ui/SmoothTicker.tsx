import React from 'react';

interface SmoothTickerProps {
  items: React.ReactNode[];
  duration?: number;
  pauseOnHover?: boolean;
  className?: string;
  trackClassName?: string;
  groupClassName?: string;
}

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const SmoothTicker: React.FC<SmoothTickerProps> = ({
  items,
  duration = 45,
  pauseOnHover = false,
  className,
  trackClassName,
  groupClassName,
}) => {
  return (
    <div className={cx('smooth-ticker overflow-hidden group', className)}>
      <div
        className={cx(
          'smooth-ticker-track',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          trackClassName
        )}
        style={{ ['--ticker-duration' as string]: `${duration}s` }}
      >
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className={cx('smooth-ticker-group', groupClassName)} aria-hidden={copyIndex > 0}>
            {items.map((item, itemIndex) => (
              <div key={`${copyIndex}-${itemIndex}`} className="flex-shrink-0">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmoothTicker;
