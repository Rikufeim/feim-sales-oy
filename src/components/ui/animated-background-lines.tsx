import React from "react";

type AnimatedBackgroundLinesProps = {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

const lineWrapperTops = ["top-[10%]", "top-[30%]", "top-[50%]", "top-[70%]", "top-[90%]"];

const AnimatedBackgroundLines = ({
  title = "Valmiina rakentamaan tulevaisuutta?",
  ctaLabel = "Aloita rakentaminen",
  ctaHref = "/tilaa-vedos",
  className = "",
}: AnimatedBackgroundLinesProps) => {
  return (
    <section
      className={`relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black px-6 py-20 text-white sm:px-10 sm:py-24 ${className}`.trim()}
    >
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(rgba(59,130,246,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.07)_1px,transparent_1px)] bg-[length:50px_50px] animate-[gridMove_20s_linear_infinite] z-0" />

      <div className="absolute inset-0 z-[1] h-full w-full overflow-hidden">
        {lineWrapperTops.map((topClass, index) => (
          <div key={topClass} className={`absolute h-[100px] w-full ${topClass}`}>
            <div className="relative h-0.5 w-full overflow-hidden">
              <div
                className={`absolute top-0 h-full w-full animate-[lineMove_4s_linear_infinite] ${
                  index % 2 !== 0 ? "[animation-direction:reverse] [animation-delay:2s]" : ""
                }`}
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #3b82f6 20%, #60a5fa 50%, #3b82f6 80%, transparent 100%)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-b from-black/70 via-black/20 to-black/75" />

      <div className="hidden md:block absolute left-1/2 top-1/2 z-[5] h-[100px] w-[300px] -translate-x-1/2 -translate-y-1/2">
        <svg
          className="absolute left-[-150px] top-1/2 h-[60px] w-[120px] -translate-y-1/2 animate-[cornerLineAnimation_6s_linear_infinite]"
          viewBox="0 0 120 60"
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
          strokeDasharray="50"
        >
          <path d="M120 0 L20 0 Q0 0 0 20 L0 60" />
        </svg>
        <svg
          className="absolute right-[-150px] top-1/2 h-[60px] w-[120px] -translate-y-1/2 scale-x-[-1] animate-[cornerLineAnimation_6s_linear_infinite] [animation-delay:3s]"
          viewBox="0 0 120 60"
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
          strokeDasharray="50"
        >
          <path d="M120 0 L20 0 Q0 0 0 20 L0 60" />
        </svg>
      </div>

      <div className="relative z-[10] mx-auto max-w-3xl text-center">
        <h2 className="mb-6 text-[clamp(2.1rem,5vw,4rem)] font-bold leading-tight">
          {title}
        </h2>
        <a
          href={ctaHref}
          className="inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-black no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] active:translate-y-0 active:shadow-[0_5px_15px_rgba(255,255,255,0.1)] sm:px-10 sm:py-4 sm:text-lg"
        >
          {ctaLabel}
        </a>
      </div>

      <style>{`
        @keyframes lineMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes cornerLineAnimation {
          0% { stroke-dashoffset: 0; }
          25% { stroke-dashoffset: 100; }
          50% { stroke-dashoffset: 200; }
          75% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 400; }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
      `}</style>
    </section>
  );
};

export default AnimatedBackgroundLines;
