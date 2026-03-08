import React from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactCard from '@/components/ContactCard';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import rikuImg from '@/assets/riku-miettinen.jpeg';

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

const Meista = () => (
  <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
    <Helmet>
      <title>Meistä — FEIM Digital Studio</title>
      <meta name="description" content="FEIM on moderni digitaalinen studio, joka yhdistää strategisen ajattelun, huippuluokan designin ja modernin teknologian." />
      <link rel="canonical" href="https://feim.fi/meista" />
      <meta property="og:title" content="Meistä — FEIM Digital Studio" />
      <meta property="og:description" content="Digitaalinen studio, jolla on visio. Strategia, design ja teknologia yhdessä." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://feim.fi/meista" />
    </Helmet>

    <nav className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
        <Link to="/" className="text-xl font-bold text-white tracking-wider uppercase drop-shadow-lg">FEIM</Link>
        <div className="hidden lg:flex items-center gap-1">
          <Link to="/palvelut" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Palvelut</Link>
          <Link to="/prosessi" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Prosessi</Link>
          <Link to="/referenssit" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Referenssit</Link>
          <Link to="/meista" className="text-sm font-medium text-white px-4 py-2 rounded-full bg-white/5">Meistä</Link>
          <Link to="/#yhteystiedot" className="ml-4 text-sm font-semibold text-black bg-white hover:bg-neutral-200 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105">Tilaa vedos</Link>
        </div>
        <Link to="/" className="lg:hidden text-sm text-neutral-400 hover:text-white flex items-center gap-1"><ArrowLeft size={16} /> Takaisin</Link>
      </div>
    </nav>

    {/* Hero — Personal / editorial, centered with founder image */}
    <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(circle at 30% 50%, #0021ff15 0%, transparent 45%), #000",
      }} />
      <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full">
        <FadeIn>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-12 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Takaisin etusivulle
          </Link>
        </FadeIn>
        
        <div className="max-w-4xl">
          <FadeIn delay={0.1}>
            <blockquote className="border-l-2 border-blue-500/30 pl-8">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-8">
                Digitaalinen studio, jolla on visio
              </h1>
              <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed italic">
                "FEIM on moderni digitaalinen studio, joka yhdistää strategisen ajattelun, huippuluokan muotoilun ja modernin teknologian. Rakennamme ratkaisuja, joilla on vaikutus."
              </p>
            </blockquote>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-4 mt-10 ml-10">
              <img src={rikuImg} alt="Riku Miettinen" className="w-12 h-12 rounded-full object-cover grayscale" />
              <div>
                <p className="text-white text-sm font-medium">Riku Miettinen</p>
                <p className="text-neutral-500 text-sm">Perustaja, FEIM</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Story */}
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn>
            <div className="w-12 h-px bg-blue-500/50 mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Emme tee kaikille kaikkea</h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              Keskitymme harkittuihin, laadukkaisiin ratkaisuihin yrityksille ja yksilöille, jotka ymmärtävät digitaalisen läsnäolon merkityksen.
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Uskomme, että laadukas digitaalinen läsnäolo ei ole kulu — se on investointi, joka maksaa itsensä takaisin.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="w-12 h-px bg-blue-500/50 mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Mitä rakennamme</h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              Rakennamme verkkosivuja, web-sovelluksia ja prototyyppejä. Autamme yrityksiä kasvamaan verkossa, mutta myös tiimejä joilla on idea uudesta tuotteesta.
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Ideasta voidaan rakentaa nopeasti prototyyppi, testattava MVP tai valmis web-sovellus.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at 50% 50%, #0021ff10 0%, transparent 50%), #000" }} />
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-white/[0.06]">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white">{stat.num}</p>
                <p className="text-neutral-500 text-sm mt-2">{stat.label}</p>
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
          <div className="w-12 h-px bg-blue-500/50 mb-8" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">Miten ajattelemme</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 h-full">
                <div className="w-8 h-px bg-blue-500/50 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">{v.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-[15px]">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at 50% 50%, #0021ff20 0%, transparent 50%), #000" }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">Kiinnostaako yhteistyö?</h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10">Kerro projektistasi — rakennetaan yhdessä jotain, millä on merkitystä.</p>
          <a href="/#yhteystiedot" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white hover:bg-neutral-200 text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 group">
            Ota yhteyttä <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="mt-12"><ContactCard /></div>
        </FadeIn>
      </div>
    </section>

    <footer className="relative pt-16 pb-8 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-600 text-sm gap-4">
        <p>&copy; {new Date().getFullYear()} FEIM Digital Studio.</p>
        <Link to="/" className="text-neutral-500 hover:text-white transition-colors">Takaisin etusivulle</Link>
      </div>
    </footer>
  </div>
);

export default Meista;
