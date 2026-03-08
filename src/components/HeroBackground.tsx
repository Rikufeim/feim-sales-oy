import React from 'react';
import { MeshGradient } from "@paper-design/shaders-react";
import { useTheme } from './ThemeContext';

export const HeroBackground: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { isDark } = useTheme();
  const colors = isDark
    ? ["#000000", "#000000", "#001a66", "#000000"]
    : ["#ffffff", "#f8f9fc", "#1a1a1f", "#f0f1f8"];

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${className}`}>
      <div className="absolute inset-0 z-0" style={!isDark ? { left: '20%', right: '-20%' } : undefined}>
        <MeshGradient
          style={{ width: '100%', height: '100%' }}
          colors={colors}
          speed={0.25}
          distortion={isDark ? 0.8 : 0.6}
          // @ts-ignore - brightness supported at runtime
          brightness={isDark ? 0.5 : 0.95}
          swirl={isDark ? 0.1 : 0.15}
        />
      </div>
      {/* Seamless left fade for light mode */}
      {!isDark && (
        <div className="absolute inset-y-0 left-0 w-[45%] z-[1] pointer-events-none" style={{ background: 'linear-gradient(to right, #ffffff 40%, transparent 100%)' }} />
      )}
      <div className={`absolute inset-x-0 bottom-0 h-64 z-[1] pointer-events-none bg-gradient-to-t ${isDark ? 'from-black via-black' : 'from-white via-white'} to-transparent`} />

      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default HeroBackground;
