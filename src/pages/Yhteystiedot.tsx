import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Zap, TrendingUp, Target, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';
import rikuNightImg from '@/assets/riku-night.jpeg';
import HeroBackground from '@/components/HeroBackground';
import feimLogo from '@/assets/feim-logo.png';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const serviceOptions = [
  {
    id: 'verkkosivut',
    icon: '🌐',
    title: 'Verkkosivut',
    desc: 'Myyvät, modernit ja liiketoimintaa tukevat sivut.',
  },
  {
    id: 'web-sovellus',
    icon: '⚙️',
    title: 'Web-sovellus',
    desc: 'Käyttöliittymä- ja tuoteajattelua yhdistävä kokonaisuus.',
  },
  {
    id: 'prototyyppi',
    icon: '◆',
    title: 'Prototyyppi',
    desc: 'Nopea tapa konkretisoida idea ennen täyttä toteutusta.',
  },
];

const Yhteystiedot = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
      <Helmet>
        <title>Yhteystiedot — FEIM Digital Studio</title>
        <meta name="description" content="Ota yhteyttä FEIMiin. Kerro projektistasi ja saat maksuttoman vedoksen digitaalisesta ratkaisustasi." />
        <link rel="canonical" href="https://feim.fi/yhteystiedot" />
        <meta property="og:title" content="Yhteystiedot — FEIM Digital Studio" />
        <meta property="og:description" content="Ota yhteyttä ja tilaa maksuton vedos digitaalisesta ratkaisustasi." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feim.fi/yhteystiedot" />
      </Helmet>

      <nav className="absolute top-0 left-0 right-0 z-50 py-6">
        <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
          <Link to="/"><img src={feimLogo} alt="FEIM" className="h-12 w-auto drop-shadow-lg" /></Link>
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Etusivu</Link>
            <div className="relative group">
              <Link to="/verkkosivut" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5 inline-flex items-center gap-1">
                Verkkosivut
              </Link>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 min-w-[200px] shadow-xl">
                  <Link to="/verkkosivut" className="block text-sm text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">Verkkosivut</Link>
                  <Link to="/web-sovellukset" className="block text-sm text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">Web-sovellukset</Link>
                  <Link to="/prototyypit" className="block text-sm text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">Prototyypit</Link>
                </div>
              </div>
            </div>
            <Link to="/meista" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Meistä</Link>
            <Link to="/yhteystiedot" className="text-sm font-medium text-white px-4 py-2 rounded-full bg-white/5">Yhteystiedot</Link>
            <Link to="/yhteystiedot" className="ml-4 text-sm font-semibold text-black bg-white hover:bg-neutral-200 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105">Tilaa vedos</Link>
          </div>
          <Link to="/" className="lg:hidden text-sm text-neutral-400 hover:text-white flex items-center gap-1"><ArrowLeft size={16} /> Takaisin</Link>
        </div>
      </nav>

      {/* Hero */}
      <HeroBackground className="!min-h-screen flex items-end pb-20">
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
        
        <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-32 md:pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <FadeIn delay={0.05}>
                <p className="text-sm font-medium text-blue-400/80 tracking-widest uppercase mb-6">Yhteystiedot</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-4 leading-[1.08]">
                  Aloitetaan projektisi
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed">
                  Kerro mitä tarvitset, niin palaamme asiaan henkilökohtaisesti 24 tunnin sisällä.
                </p>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-5">
              <FadeIn delay={0.25}>
                <div className="space-y-4">
                  {["Maksuton vedos", "Vastaus 24h sisällä", "Henkilökohtainen palvelu", "Ei sitoumuksia"].map((point, i) => {
                    const icons = [Zap, TrendingUp, Target, Palette];
                    const Icon = icons[i % icons.length];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <Icon size={18} className="text-blue-400/70 shrink-0" />
                        <p className="text-white text-sm font-medium">{point}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </HeroBackground>

      {/* Contact content */}
      <section className="relative pb-32 overflow-hidden">
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: Contact info */}
            <FadeIn delay={0.1}>
              <div className="lg:sticky lg:top-32 space-y-12">
                {/* Contact person */}
                <div className="flex items-start gap-6">
                  <div className="w-40 h-40 rounded-full overflow-hidden shrink-0">
                    <img src={rikuNightImg} alt="Riku Miettinen" className="w-full h-full object-cover object-[center_20%]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xl">Riku Miettinen</p>
                    <p className="text-neutral-500 text-sm mb-4">CEO, FEIM</p>
                    <div className="space-y-2">
                      <a href="mailto:riku@feim.fi" className="text-neutral-300 text-sm hover:text-blue-400 transition-colors block">riku@feim.fi</a>
                      <a href="tel:+358413282218" className="text-neutral-300 text-sm hover:text-blue-400 transition-colors block">041 328 2218</a>
                      <a href="https://wa.me/358413282218" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-green-400/80 hover:text-green-400 transition-colors mt-1">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Company info */}
                <div className="space-y-4 pt-8 border-t border-white/[0.06]">
                  <h3 className="text-lg font-semibold text-white">FEIM Digital Studio</h3>
                  <div className="space-y-2 text-neutral-400 text-sm">
                    <p>Y-tunnus: 3492270-5</p>
                    <p>Helsinki, Suomi</p>
                  </div>
                </div>

                {/* What we do */}
                <div className="space-y-4 pt-8 border-t border-white/[0.06]">
                  <h3 className="text-lg font-semibold text-white">Mitä teemme</h3>
                  <div className="space-y-3">
                    {['Verkkosivut', 'Web-sovellukset', 'Prototyypit & MVP:t', 'Vibe-koodaus'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                        <p className="text-neutral-300 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right: Form */}
            <FadeIn delay={0.2}>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-2">Ota yhteyttä</h3>
                <p className="text-neutral-500 text-sm mb-8">Täytä alla olevat tiedot, niin palaamme asiaan 24 tunnin sisällä.</p>

                <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-400 ml-1">Yritys</label>
                      <input type="text" placeholder="Yrityksen nimi" required
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors placeholder-neutral-600 text-[15px]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-400 ml-1">Nimi</label>
                      <input type="text" placeholder="Etunimi Sukunimi" required
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors placeholder-neutral-600 text-[15px]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-400 ml-1">Sähköpostiosoite</label>
                      <input type="email" placeholder="nimi@yritys.fi" required
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors placeholder-neutral-600 text-[15px]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-400 ml-1">Puhelinnumero</label>
                      <input type="tel" placeholder="+358 40 123 4567"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors placeholder-neutral-600 text-[15px]" />
                    </div>
                  </div>

                  {/* Service selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-400 ml-1">Mitä tarvitset?</label>
                    <div className="grid grid-cols-3 gap-3">
                      {serviceOptions.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedService(s.id)}
                          className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border ${
                            selectedService === s.id
                              ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                              : 'bg-white/[0.02] border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/[0.15]'
                          }`}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400 ml-1">Kerro projektistasi</label>
                    <textarea rows={4} placeholder="Kerro lyhyesti, mitä haluaisit rakentaa ja mitä tavoitteita projektillasi on."
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors resize-none placeholder-neutral-600 text-[15px]" />
                  </div>

                  <button type="submit"
                    className="w-full bg-white text-black font-bold text-base py-4 rounded-xl hover:bg-neutral-200 transition-all hover:scale-[1.01] active:scale-[0.99] mt-3 group flex items-center justify-center gap-2">
                    Lähetä viesti
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-neutral-600 text-xs text-center mt-2">
                    Palaamme sinulle henkilökohtaisesti 24 tunnin sisällä.
                  </p>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Yhteystiedot;
