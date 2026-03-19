import React from 'react';

const OceanBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <>
      <div className={`ocean-bg ${className}`} />
      <style>{`
        .ocean-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: linear-gradient(
            175deg,
            #020617 0%,
            #001028 25%,
            #001a3a 45%,
            #001018 70%,
            #000810 100%
          );
        }

        /* Fog / depth layer */
        .ocean-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(0, 180, 220, 0.07) 0%, transparent 60%),
            radial-gradient(ellipse 90% 60% at 25% 75%, rgba(0, 140, 200, 0.05) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 80% 60%, rgba(0, 220, 200, 0.04) 0%, transparent 50%);
          filter: blur(40px);
          pointer-events: none;
        }

        /* Light rays + bioluminescent glows */
        .ocean-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            /* Diagonal light rays from top-left */
            linear-gradient(
              145deg,
              rgba(80, 200, 255, 0.06) 0%,
              rgba(80, 200, 255, 0.02) 15%,
              transparent 35%
            ),
            linear-gradient(
              155deg,
              rgba(60, 180, 240, 0.04) 0%,
              transparent 25%
            ),
            linear-gradient(
              135deg,
              rgba(100, 220, 255, 0.03) 5%,
              transparent 20%
            ),
            /* Bioluminescent cyan glow - center */
            radial-gradient(ellipse 30% 35% at 55% 45%, rgba(0, 240, 220, 0.06) 0%, transparent 70%),
            /* Jellyfish-like ambient glow - upper right */
            radial-gradient(ellipse 20% 25% at 72% 30%, rgba(0, 200, 255, 0.08) 0%, rgba(0, 180, 220, 0.03) 40%, transparent 70%),
            /* Deep glow - bottom */
            radial-gradient(ellipse 50% 20% at 40% 90%, rgba(0, 100, 180, 0.06) 0%, transparent 70%),
            /* Subtle turquoise orb */
            radial-gradient(circle at 30% 55%, rgba(0, 210, 190, 0.04) 0%, transparent 35%);
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export default OceanBackground;
