import React from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const values = [
  {
    title: "Strateginen ajattelu",
    desc: "Emme ala suunnitella ennen kuin ymmärrämme liiketoimintanne tavoitteet. Jokainen ratkaisu perustuu selkeään strategiaan, joka yhdistää brändin, käyttäjät ja liiketoiminnan."
  },
  {
    title: "Moderni design",
    desc: "Visuaalinen ilme, joka erottaa teidät kilpailijoista. Ei geneerisiä malleja — jokaiselle asiakkaalle räätälöity kokonaisuus, joka viestii ammattimaisuutta ja laatua."
  },
  {
    title: "Tekninen huippulaatu",
    desc: "Toteutamme modernilla teknologialla: React, TypeScript, Tailwind CSS. Nopea, turvallinen ja skaalautuva lopputulos on standardi, ei lisäpalvelu."
  },
  {
    title: "Konversiofokus",
    desc: "Rakennamme sivustot ja sovellukset, jotka eivät vain näytä hyvältä, vaan tuottavat konkreettisia liiketoimintatuloksia — yhteydenottoja, liidejä ja asiakkaita."
  },
  {
    title: "Pitkäjänteinen kumppanuus",
    desc: "Digitaalinen maailma ei pysähdy. Tarjoamme jatkuvaa kehitystä, jotta ratkaisunne pysyy kilpailukykyisenä ja kasvaa liiketoimintanne mukana."
  },
  {
    title: "Läpinäkyvyys",
    desc: "Pidämme teidät ajan tasalla jokaisessa vaiheessa. Selkeä kommunikaatio, realistiset aikataulut ja rehellinen palaute ovat toimintamme perusta."
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
      <meta name="description" content="FEIM on moderni digitaalinen studio, joka yhdistää strategisen ajattelun, huippuluokan designin ja modernin teknologian. Rakennamme ratkaisuja, joilla on vaikutus." />
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

    {/* Hero */}
    <section className="relative min-h-[60vh] flex flex-col items-start justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(circle at 30% 50%, #0021ff40 0%, transparent 45%), #000",
        filter: "brightness(0.6)"
      }} />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
      <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-32 md:pt-40 pb-20">
        <FadeIn>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Takaisin etusivulle
          </Link>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="text-sm font-medium text-blue-400/80 tracking-widest uppercase mb-6">Meistä</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-4 leading-[1.08] max-w-5xl">
            Digitaalinen studio, jolla on visio
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            FEIM on moderni digitaalinen studio, joka yhdistää strategisen ajattelun, huippuluokan muotoilun ja modernin teknologian. Rakennamme ratkaisuja, joilla on vaikutus.
          </p>
        </FadeIn>
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
              Keskitymme harkittuihin, laadukkaisiin ratkaisuihin yrityksille ja yksilöille, jotka ymmärtävät digitaalisen läsnäolon merkityksen. Jokaisessa projektissa yhdistyvät design, teknologia ja kaupallinen ajattelu.
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Uskomme, että laadukas digitaalinen läsnäolo ei ole kulu — se on investointi, joka maksaa itsensä takaisin. Siksi jokainen FEIM-projekti suunnitellaan niin, että se palvelee sekä käyttäjiä että liiketoimintaa.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="w-12 h-px bg-blue-500/50 mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Mitä rakennamme</h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              Rakennamme verkkosivuja, web-sovelluksia ja prototyyppejä. Autamme yrityksiä kasvamaan verkossa, mutta myös yksityisiä ja tiimejä, joilla on idea sovelluksesta tai digitaalisesta tuotteesta.
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Ideasta voidaan rakentaa nopeasti prototyyppi, testattava MVP tai valmis web-sovellus. Sinulla ei tarvitse olla valmista suunnitelmaa — joskus hyvä idea riittää alkuun.
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
