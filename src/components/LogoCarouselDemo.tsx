"use client";

import React, { useEffect, useState } from "react";

interface TextItem {
  id: number;
  text: string;
}

const allTexts: TextItem[] = [
  { id: 1, text: "Kasvu odottaa sinua" },
  { id: 2, text: "Seuraava asiakkaamme" },
  { id: 3, text: "Tekoäly yrityksellesi" },
  { id: 4, text: "Sivut jotka myyvät" },
  { id: 5, text: "Digitaalinen kasvu" },
  { id: 6, text: "Web-sovellus ideallesi" },
  { id: 7, text: "Automaatio liiketoimintaasi" },
  { id: 8, text: "Tuloksia, ei lupauksia" },
  { id: 9, text: "Ideasta toteutukseen" },
  { id: 10, text: "Moderni digitaalinen kumppani" },
];

const TextColumn = ({ texts, delayMs }: { texts: string[]; delayMs: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length);
          setIsVisible(true);
        }, 300);
      }, 4000);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [texts.length, delayMs]);

  return (
    <div className="relative h-14 w-[220px] md:w-[300px] flex items-center justify-center">
      <span
        className={`text-base md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent text-center whitespace-nowrap transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {texts[currentIndex]}
      </span>
    </div>
  );
};

function TextCarousel() {
  const column1 = ["Kasvu odottaa sinua", "Tekoäly yrityksellesi", "Automaatio liiketoimintaasi", "Moderni digitaalinen kumppani"];
  const column2 = ["Seuraava asiakkaamme", "Sivut jotka myyvät", "Tuloksia, ei lupauksia"];
  const column3 = ["Digitaalinen kasvu", "Web-sovellus ideallesi", "Ideasta toteutukseen"];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-6">
      <TextColumn texts={column1} delayMs={0} />
      <TextColumn texts={column2} delayMs={800} />
      <TextColumn texts={column3} delayMs={1600} />
    </div>
  );
}

export function LogoCarouselDemo() {
  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 opacity-30" style={{
        background: "linear-gradient(180deg, transparent 0%, #0021ff40 50%, transparent 100%)"
      }} />
      
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col items-center text-center gap-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Feimiä.
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-neutral-400 text-lg md:text-xl font-medium">
                Liity mukaan
              </p>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="text-lg font-medium">Aloita projekti</span>
              </a>
            </div>
          </div>

          <TextCarousel />
        </div>
      </div>
    </section>
  );
}
