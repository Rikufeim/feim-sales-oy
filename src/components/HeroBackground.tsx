import React from 'react';
import { MeshGradient } from "@paper-design/shaders-react";

export const HeroBackground: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${className}`}>
      <div className="absolute inset-0 z-0">
        <MeshGradient
          style={{ width: '100%', height: '100%' }}
          colors={["#000000", "#000000", "#100085", "#000000"]}
          speed={0.3}
          distortion={0.8}
          brightness={0.5}
          swirl={0.1}
        />
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
