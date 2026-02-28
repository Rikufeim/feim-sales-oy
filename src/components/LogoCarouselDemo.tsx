"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const column1 = [allTexts[0], allTexts[3], allTexts[6], allTexts[9]];
const column2 = [allTexts[1], allTexts[4], allTexts[7]];
const column3 = [allTexts[2], allTexts[5], allTexts[8]];

const TextColumn = ({ texts, delayMs }: { texts: TextItem[]; delayMs: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }, 3500);
    }, delayMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [texts.length, delayMs]);

  return (
    <div className="relative h-14 w-[220px] md:w-[300px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute text-base md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent text-center whitespace-nowrap"
        >
          {texts[currentIndex].text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

function TextCarousel() {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-6">
      <TextColumn texts={column1} delayMs={0} />
      <TextColumn texts={column2} delayMs={600} />
      <TextColumn texts={column3} delayMs={1200} />
    </div>
  );
}

export function LogoCarouselDemo({ onStartProject }: { onStartProject?: () => void }) {
  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden rounded-[2.5rem] mx-2 sm:mx-4">
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
                onClick={e => { e.preventDefault(); onStartProject?.(); }}
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
