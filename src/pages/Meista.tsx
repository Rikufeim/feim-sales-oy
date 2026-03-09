import React from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactCard from '@/components/ContactCard';

import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import rikuImg from '@/assets/riku-miettinen.jpeg';
import feimLogo from '@/assets/feim-logo.png';
import { useTheme } from '@/components/ThemeContext';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const values = [
  {
    title: "Strateginen ajattelu",
    desc: "Emme ala suunnitella ennen kuin ymmärrämme liiketoimintanne tavoitteet. Jokainen ratkaisu perustuu selkeään strategiaan."
  },
  {
    title: "Moderni design",
    desc: "Visuaalinen ilme, joka erottaa teidät kilpailijoista. Ei geneerisiä malleja — jokaiselle asiakkaalle räätälöity kokonaisuus."
  },
  {
    title: "Tekninen huippulaatu",
    desc: "Toteutamme modernilla teknologialla: React, TypeScript, Tailwind CSS. Nopea, turvallinen ja skaalautuva lopputulos."
  },
  {
    title: "Konversiofokus",
    desc: "Rakennamme sivustot ja sovellukset, jotka tuottavat konkreettisia liiketoimintatuloksia."
  },
  {
    title: "Pitkäjänteinen kumppanuus",
    desc: "Tarjoamme jatkuvaa kehitystä, jotta ratkaisunne pysyy kilpailukykyisenä."
  },
  {
    title: "Läpinäkyvyys",
    desc: "Selkeä kommunikaatio, realistiset aikataulut ja rehellinen palaute ovat toimintamme perusta."
  },
];

const stats = [
  { num: "50+", label: "Valmistunutta projektia" },
  { num: "98%", label: "Asiakastyytyväisyys" },
  { num: "<2s", label: "Keskimääräinen latausaika" },
  { num: "24h", label: "Vastausaika" },
];

const Meista = () => {
  const { isDark } = useTheme();

  const bg = isDark ? 'bg-black' : 'bg-white';
  const navText = isDark ? 'text-neutral-400 hover:text-white hover:bg-white/5' : 'text-neutral-500 hover:text-black hover:bg-black/5';
  const dropdownBg = isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-black/10';
  const dropdownItem = isDark ? 'text-neutral-300 hover:text-white hover:bg-white/5' : 'text-neutral-600 hover:text-black hover:bg-black/5';
  const headingGrad = isDark ? 'from-neutral-50 to-neutral-400' : 'from-neutral-900 to-neutral-500';
  const bodyText = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const headingText = isDark ? 'text-white' : 'text-neutral-900';
  const cardBg = isDark ? 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]' : 'bg-black/[0.02] border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.12]';
  const statsBorder = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]';
  const radialBg = isDark ? 'radial-gradient(circle at 50% 50%, #0021ff10 0%, transparent 50%), #000' : 'radial-gradient(circle at 50% 50%, #00000008 0%, transparent 50%), #fff';
  const mobileBack = isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black';
  const labelColor = isDark ? 'text-neutral-500' : 'text-neutral-400';

  return (
    <div className={`${bg} min-h-screen font-sans antialiased transition-colors duration-500`}>
      <Helmet>
        <title>Meistä — FEIM Digital Studio</title>
        <meta name="description" content="FEIM on moderni digitaalinen studio, joka yhdistää strategisen ajattelun, huippuluokan designin ja modernin teknologian." />
        <link rel="canonical" href="https://feim.fi/meista" />
        <meta property="og:title" content="Meistä — FEIM Digital Studio" />
        <meta property="og:description" content="Digitaalinen studio, jolla on visio. Strategia, design ja teknologia yhdessä." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feim.fi/meista" />
      </Helmet>

      

      {/* Hero */}
      <HeroBackground className="!min-h-screen flex items-end pb-20">
        <div className="absolute bottom-0 left-0 w-full h-48 z-10 pointer-events-none" style={{ background: `linear-gradient(to top, ${isDark ? '#000000' : '#ffffff'}, ${isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'}, transparent)` }} />
        
        <div className="px-4 sm:px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-24 sm:pt-32 md:pt-40">
          <div className="lg:col-span-7 max-w-4xl">
            <FadeIn delay={0.05}>
              <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${labelColor}`}>Meistä</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b ${headingGrad} pb-4 leading-[1.08]`}>
                Digitaalinen studio, jolla on visio
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className={`mt-8 text-lg md:text-xl max-w-xl leading-relaxed ${bodyText}`}>
                FEIM on moderni digitaalinen studio, joka yhdistää strategisen ajattelun, huippuluokan muotoilun ja modernin teknologian. Rakennamme ratkaisuja, joilla on vaikutus.
              </p>
            </FadeIn>
          </div>
        </div>
      </HeroBackground>

      {/* Story */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn>
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${headingText}`}>Emme tee kaikille kaikkea</h2>
              <p className={`text-lg leading-relaxed mb-6 ${bodyText}`}>
                Keskitymme harkittuihin, laadukkaisiin ratkaisuihin yrityksille ja yksilöille, jotka ymmärtävät digitaalisen läsnäolon merkityksen.
              </p>
              <p className={`text-lg leading-relaxed ${bodyText}`}>
                Uskomme, että laadukas digitaalinen läsnäolo ei ole kulu — se on investointi, joka maksaa itsensä takaisin.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${headingText}`}>Mitä rakennamme</h2>
              <p className={`text-lg leading-relaxed mb-6 ${bodyText}`}>
                Rakennamme verkkosivuja, web-sovelluksia ja prototyyppejä. Autamme yrityksiä kasvamaan verkossa, mutta myös tiimejä joilla on idea uudesta tuotteesta.
              </p>
              <p className={`text-lg leading-relaxed ${bodyText}`}>
                Ideasta voidaan rakentaa nopeasti prototyyppi, testattava MVP tai valmis web-sovellus.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: radialBg }} />
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
          <FadeIn>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y ${statsBorder}`}>
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className={`text-4xl md:text-5xl font-bold ${headingText}`}>{stat.num}</p>
                  <p className={`text-sm mt-2 ${labelColor}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
          <FadeIn>
            <h2 className={`text-3xl md:text-5xl font-bold mb-16 ${headingText}`}>Miten ajattelemme</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className={`border rounded-2xl p-8 transition-all duration-500 h-full ${cardBg}`}>
                  <h3 className={`text-xl font-semibold mb-3 ${headingText}`}>{v.title}</h3>
                  <p className={`leading-relaxed text-[15px] ${bodyText}`}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: isDark ? 'radial-gradient(circle at 50% 50%, #0021ff20 0%, transparent 50%), #000' : 'radial-gradient(circle at 50% 50%, #00000010 0%, transparent 50%), #fff' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 text-center">
          <FadeIn>
            <h2 className={`text-3xl md:text-6xl font-bold mb-6 ${headingText}`}>Kiinnostaako yhteistyö?</h2>
            <p className={`text-lg max-w-xl mx-auto mb-10 ${bodyText}`}>Kerro projektistasi — rakennetaan yhdessä jotain, millä on merkitystä.</p>
            <Link to="/yhteystiedot" className="inline-flex items-center justify-center gap-2 px-10 py-5 font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 group" style={{ backgroundColor: isDark ? '#ffffff' : '#171717', color: isDark ? '#000000' : '#ffffff' }}>
              Ota yhteyttä <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Meista;
