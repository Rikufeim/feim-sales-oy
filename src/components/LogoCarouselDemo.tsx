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
  { id: 1, text: "Yrityksesi tähän?" },
  { id: 2, text: "Sinun logosi?" },
  { id: 3, text: "Seuraava asiakkaamme?" },
  { id: 4, text: "Tekoäly yrityksellesi?" },
  { id: 5, text: "Sivut jotka myyvät?" },
  { id: 6, text: "Digitaalinen kasvu?" },
  { id: 7, text: "Web-sovellus ideallesi?" },
  { id: 8, text: "Automaatio liiketoimintaasi?" },
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
    <div className="relative h-12 w-40 md:h-16 md:w-56 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentText.id}-${currentIndex}`}
          initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-sm md:text-lg font-medium text-white/70 text-center whitespace-nowrap">
            {currentText.text}
          </span>
        </motion.div>
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
    <div className="flex gap-4 md:gap-8">
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
    <section className="relative py-16 md:py-24 bg-black">
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <GradientHeading variant="light" size="sm">
              Referenssit
            </GradientHeading>
            <GradientHeading variant="secondary" size="xxs" weight="semi">
              Pian tässä voi olla sinun yrityksesi
            </GradientHeading>
          </div>

          <TextCarousel texts={allTexts} columnCount={3} />
        </div>
      </div>
    </section>
  );
}
