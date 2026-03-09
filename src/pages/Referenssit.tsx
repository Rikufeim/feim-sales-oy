import React, { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import referenssi1 from '@/assets/referenssi-1.jpeg';
import referenssi2 from '@/assets/referenssi-2.jpeg';
import refLujainfra from '@/assets/ref-lujainfra.png';
import refSodergard from '@/assets/ref-sodergard.png';
import salesApp1 from '@/assets/sales-app-1.png';
import salesApp2 from '@/assets/sales-app-2.png';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

// Reference data
const references = [
  {
    id: 1,
    name: "Luja Infra",
    category: "Verkkosivut",
    image: refLujainfra,
    url: "https://lujainfra.fi"
  },
  {
    id: 2,
    name: "Restaurointi Södergård",
    category: "Verkkosivut",
    image: refSodergard,
    url: "https://restaurointisodergard.fi"
  },
  {
    id: 3,
    name: "FEIM Sales",
    category: "Mobiilisovellus",
    image: salesApp1,
    url: null
  },
  {
    id: 4,
    name: "FEIM Sales Pro",
    category: "Mobiilisovellus",
    image: salesApp2,
    url: null
  },
];

// Two-layer carousel component
const ReferenceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 2;
  const totalItems = references.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 3500);
    return () => clearInterval(interval);
  }, [totalItems]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % totalItems;
      items.push({ ...references[index], position: i });
    }
    return items;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Two-layer grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <AnimatePresence mode="sync">
          {getVisibleItems().map((ref) => (
            <motion.div
              key={`${ref.id}-${ref.position}`}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm">
                <div className="p-3 lg:p-4">
                  <img
                    src={ref.image}
                    alt={ref.name}
                    className="w-full h-auto rounded-xl object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                
                {/* Content below image */}
                <div className="px-4 pb-4 lg:px-5 lg:pb-5">
                  <p className="text-xs font-medium text-blue-400/80 tracking-wider uppercase mb-1">
                    {ref.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg lg:text-xl font-bold text-white">{ref.name}</h3>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <ExternalLink size={16} className="text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {references.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex || index === (currentIndex + 1) % totalItems
                ? 'bg-blue-500 w-6'
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Referenssit = () => (
  <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
    <Helmet>
      <title>Referenssit — FEIM Digital Studio</title>
      <meta name="description" content="Tutustu FEIMin valikoituihin projekteihin: verkkosivuja, web-sovelluksia ja digitaalisia kokemuksia kunnianhimoisille yrityksille." />
      <link rel="canonical" href="https://feim.fi/referenssit" />
      <meta property="og:title" content="Referenssit — FEIM Digital Studio" />
      <meta property="og:description" content="Valikoituja projekteja — jokainen suunniteltu asiakkaan liiketoimintatavoitteiden pohjalta." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://feim.fi/referenssit" />
    </Helmet>

    {/* Hero */}
    <section className="relative pt-40 md:pt-52 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(circle at 40% 80%, #0021ff15 0%, transparent 45%), #000",
      }} />
      <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full text-center">
        <FadeIn delay={0.05}>
          <p className="text-sm font-medium text-blue-400/80 tracking-widest uppercase mb-6">Referenssit</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white pb-4 leading-[1.12]">
            Valikoituja projekteja
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Jokainen projekti on uniikki kokonaisuus, suunniteltu asiakkaan liiketoimintatavoitteiden pohjalta.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* Reference Carousel */}
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-10">
        <FadeIn delay={0.2}>
          <ReferenceCarousel />
        </FadeIn>
      </div>
    </section>

    {/* CTA */}
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at 50% 50%, #0021ff15 0%, transparent 50%), #000" }} />
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Jokainen projekti on erilainen</h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-10">
              Emme käytä valmiita malleja. Jokainen ratkaisu suunnitellaan alusta asti asiakkaan brändin, tavoitteiden ja kohderyhmän mukaan.
            </p>
            <Link to="/yhteystiedot" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white hover:bg-neutral-200 text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 group">
              Aloita oma projektisi <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>

    <Footer />
  </div>
);

export default Referenssit;
