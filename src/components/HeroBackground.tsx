import React from 'react';
import { MeshGradient } from "@paper-design/shaders-react";

interface HeroBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ children, className = "", variant = "dark" }) => {
  const isDark = variant === 'dark';
  const colors = isDark
    ? ["#000000", "#000000", "#100085", "#000000"]
    : ["#ffffff", "#ffffff", "#c0c0c0", "#ffffff"];
  const fadeFrom = isDark ? 'from-black' : 'from-white';
  const fadeVia = isDark ? 'via-black' : 'via-white';

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${className}`}>
      <div className="absolute inset-0 z-0">
        <MeshGradient
          style={{ width: '100%', height: '100%' }}
          colors={colors}
          speed={0.3}
          distortion={0.8}
          // @ts-ignore - brightness supported at runtime
          brightness={isDark ? 0.5 : 1.2}
          swirl={0.1}
        />
        <div className={`absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t ${fadeFrom} ${fadeVia} to-transparent`} />
      </div>

      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default HeroBackground;
