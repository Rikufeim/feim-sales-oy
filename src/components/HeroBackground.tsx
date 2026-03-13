import React, { useRef, useState, useEffect } from 'react';
import { MeshGradient } from "@paper-design/shaders-react";
import { useLocation } from 'react-router-dom';

export const HeroBackground: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const shaderRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) return;

    const el = shaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${className}`}>
      <div
        ref={shaderRef}
        className="absolute inset-x-0 top-0 h-[60%] z-0"
        style={{ contain: 'strict', willChange: 'transform' }}
      >
        {isHome && isVisible && (
          <MeshGradient
            style={{ width: '100%', height: '100%' }}
            colors={["#000000", "#000000", "#001a66", "#000000"]}
            speed={0.15}
            distortion={0.6}
            // @ts-ignore
            brightness={0.5}
            swirl={0.1}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black to-transparent" />
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
