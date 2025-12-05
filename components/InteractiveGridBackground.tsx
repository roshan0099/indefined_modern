import React from 'react';
import useMousePosition from '../hooks/useMousePosition';

const InteractiveGridBackground: React.FC = () => {
  const { x, y } = useMousePosition();

  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        background: `
          radial-gradient(circle 800px at ${x}px ${y}px, rgba(34, 211, 238, 0.1), transparent 80%),
          radial-gradient(circle 600px at ${x ? x + 200 : 200}px ${y ? y - 200 : 200}px, rgba(217, 70, 239, 0.1), transparent 80%)
        `,
      }}
    />
  );
};

export default InteractiveGridBackground;