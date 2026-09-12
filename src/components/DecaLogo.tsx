import React from 'react';
import logoDecaImg from './logo-deca.png';

interface DecaLogoProps {
  className?: string;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  alt?: string;
}

export const DecaLogo: React.FC<DecaLogoProps> = ({
  className = '',
  size = 'md',
  alt = 'DECA Desidera Energy Consulting Agency AB',
}) => {
  // Dimension heights
  const heightClasses = {
    sm: 'h-8 sm:h-10',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
    xl: 'h-20 sm:h-28 md:h-36 max-w-[85vw] sm:max-w-md md:max-w-lg',
    '2xl': 'h-28 sm:h-40 md:h-48 max-w-[90vw] sm:max-w-xl',
  }[size];

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src={logoDecaImg}
        alt={alt}
        className={`${heightClasses} w-auto object-contain`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
