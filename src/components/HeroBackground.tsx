import React from 'react';
import { MeshGradient } from "@paper-design/shaders-react";

interface HeroBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${className}`}>
      <div className="absolute inset-x-0 top-0 h-[60%] z-0">
        <MeshGradient
          style={{ width: '100%', height: '100%' }}
          colors={["#000000", "#000000", "#000085", "#000000"]}
          speed={0.3}
          distortion={0.8}
          swirl={0.1}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
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
