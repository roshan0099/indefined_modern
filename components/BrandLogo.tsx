import React from 'react';

interface BrandLogoProps {
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className }) => {
  return (
    <h1 className={`font-heading flex items-center ${className}`}>
      indefined<span className="primary-text text-[1.2em] ml-1 leading-none">&gt;</span>
    </h1>
  );
};

export default BrandLogo;