"use client";

import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";

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

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const distributeTexts = (allTexts: TextItem[], columnCount: number): TextItem[][] => {
  const shuffled = shuffleArray(allTexts)
  const columns: TextItem[][] = Array.from({ length: columnCount }, () => [])

  shuffled.forEach((item, index) => {
    columns[index % columnCount].push(item)
  })

  const maxLength = Math.max(...columns.map((col) => col.length))
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
    }
  })

  return columns
}

const TextColumn = React.memo(({ texts, index, currentTime }: { texts: TextItem[]; index: number; currentTime: number }) => {
  const cycleInterval = 2500
  const columnDelay = index * 300
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * texts.length)
  const currentIndex = Math.floor(adjustedTime / cycleInterval)
  const currentText = useMemo(() => texts[currentIndex], [texts, currentIndex])

  return (
    <div className="relative h-14 min-w-[200px] md:min-w-[280px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={`${currentText.id}-${currentIndex}`}
          initial={{ y: 15, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -15, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-base md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent text-center whitespace-nowrap"
        >
          {currentText.text}
        </motion.span>
      </AnimatePresence>
    </div>
  )
})

TextColumn.displayName = "TextColumn"

function TextCarousel({ texts, columnCount = 3 }: { texts: TextItem[]; columnCount?: number }) {
  const [textSets, setTextSets] = useState<TextItem[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100)
    return () => clearInterval(intervalId)
  }, [updateTime])

  useEffect(() => {
    const distributedTexts = distributeTexts(texts, columnCount)
    setTextSets(distributedTexts)
  }, [texts, columnCount])

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-6">
      {textSets.map((texts, index) => (
        <TextColumn
          key={index}
          texts={texts}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  )
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

          <TextCarousel texts={allTexts} columnCount={3} />
        </div>
      </div>
    </section>
  );
}
