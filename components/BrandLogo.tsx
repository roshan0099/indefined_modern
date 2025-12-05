import React from 'react';

interface BrandLogoProps {
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className }) => {
  return (
    <h1 className={`font-heading ${className}`}>
      indefined<span className="primary-text text-[1.2em] relative top-[-0.05em] ml-1">&gt;</span>
    </h1>
  );
};

export default BrandLogo;