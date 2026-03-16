import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import layerOneImg from "@/assets/service-verkkosivut-1.webp";
import layerTwoImg from "@/assets/service-webapp-1.webp";
import layerThreeImg from "@/assets/service-proto-1.webp";

interface HalideLandingProps {
  className?: string;
}

const HalideLanding: React.FC<HalideLandingProps> = ({ className }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const shouldAnimate = !reduceMotion && finePointer;

    const updateScene = () => {
      rafRef.current = null;
      const { x, y } = pointerRef.current;
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = x * (index + 1) * 0.16;
        const moveY = y * (index + 1) * 0.16;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!shouldAnimate) return;
      const rect = wrapper.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      pointerRef.current.x = (rect.width / 2 - localX) / 20;
      pointerRef.current.y = (rect.height / 2 - localY) / 20;
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(updateScene);
      }
    };

    const handleMouseLeave = () => {
      if (!shouldAnimate) return;
      canvas.style.transform = "rotateX(55deg) rotateZ(-25deg)";
    };

    let timeout: number | undefined;
    if (shouldAnimate) {
      canvas.style.opacity = "0";
      canvas.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.8)";
      timeout = window.setTimeout(() => {
        canvas.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
        canvas.style.opacity = "1";
        canvas.style.transform = "rotateX(55deg) rotateZ(-25deg) scale(1)";
      }, 180);
    } else {
      canvas.style.opacity = "1";
      canvas.style.transform = "rotateX(55deg) rotateZ(-25deg) scale(1)";
    }

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      if (timeout) clearTimeout(timeout);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        .halide-root {
          --bg: #0a0a0a;
          --silver: #e0e0e0;
          --accent: #3b82f6;
          --grain-opacity: 0.06;
          background-color: var(--bg);
          color: var(--silver);
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }

        .halide-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 50;
          opacity: var(--grain-opacity);
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.02) 0px,
            rgba(255,255,255,0.02) 1px,
            transparent 1px,
            transparent 2px
          );
        }

        .halide-viewport {
          perspective: 2000px;
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .halide-canvas-3d {
          position: relative;
          width: min(92%, 680px);
          height: min(70%, 360px);
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .halide-layer {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(224, 224, 224, 0.1);
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
          border-radius: 16px;
        }

        .halide-layer-1 { filter: grayscale(1) contrast(1.2) brightness(0.5); }
        .halide-layer-2 { filter: grayscale(1) contrast(1.1) brightness(0.68); opacity: 0.55; }
        .halide-layer-3 { filter: grayscale(1) contrast(1.2) brightness(0.78); opacity: 0.35; }

        .halide-contours {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background-image: repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(255,255,255,0.05) 41px, transparent 42px);
          transform: translateZ(120px);
          pointer-events: none;
        }

        .halide-interface-grid {
          position: absolute;
          inset: 0;
          padding: 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          z-index: 20;
          pointer-events: none;
        }

        .halide-hero-title {
          grid-column: 1 / -1;
          align-self: center;
          font-size: clamp(2rem, 6vw, 4.25rem);
          line-height: 0.9;
          letter-spacing: -0.04em;
          mix-blend-mode: difference;
          max-width: 10ch;
        }

        .halide-cta-button {
          pointer-events: auto;
          background: var(--silver);
          color: var(--bg);
          padding: 0.65rem 1.1rem;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.75rem;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%);
          transition: 0.3s;
        }

        .halide-cta-button:hover { background: var(--accent); transform: translateY(-2px); }

        .halide-scroll-hint {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--silver), transparent);
          animation: halide-flow 2s infinite ease-in-out;
          z-index: 30;
        }

        @keyframes halide-flow {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>

      <div
        ref={wrapperRef}
        className={cn(
          "halide-root relative h-[300px] sm:h-[360px] w-full overflow-hidden rounded-2xl border border-white/10",
          className
        )}
      >
        <div className="halide-grain" />

        <div className="halide-interface-grid">
          <div style={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.04em" }}>LANDING_FAST</div>
          <div style={{ textAlign: "right", fontFamily: "monospace", color: "var(--accent)", fontSize: "0.65rem" }}>
            <div>DELIVERY: SAME DAY</div>
            <div>MODE: VIBE BUILD</div>
          </div>

          <h1 className="halide-hero-title">LIVE<br />PREVIEW</h1>

          <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ fontFamily: "monospace", fontSize: "0.65rem", opacity: 0.85 }}>
              <p>[ DRAFT FLOW ]</p>
              <p>LANDING PAGE WITH MOTION LAYERS</p>
            </div>
            <Link to="/landing-demo" className="halide-cta-button">OPEN DEMO</Link>
          </div>
        </div>

        <div className="halide-viewport">
          <div className="halide-canvas-3d" ref={canvasRef}>
            <div className="halide-layer halide-layer-1" style={{ backgroundImage: `url(${layerOneImg})` }} ref={(el) => (layersRef.current[0] = el!)} />
            <div className="halide-layer halide-layer-2" style={{ backgroundImage: `url(${layerTwoImg})` }} ref={(el) => (layersRef.current[1] = el!)} />
            <div className="halide-layer halide-layer-3" style={{ backgroundImage: `url(${layerThreeImg})` }} ref={(el) => (layersRef.current[2] = el!)} />
            <div className="halide-contours" />
          </div>
        </div>

        <div className="halide-scroll-hint" />
      </div>
    </>
  );
};

export default HalideLanding;
