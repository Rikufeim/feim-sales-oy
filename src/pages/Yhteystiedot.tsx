import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Zap, TrendingUp, Target, Palette, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';

import rikuNightImg from '@/assets/riku-night.jpeg';
import HeroBackground from '@/components/HeroBackground';
import feimLogo from '@/assets/feim-logo.png';
import { useTheme } from '@/components/ThemeContext';

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
  const { isDark } = useTheme();

  const bg = isDark ? 'bg-black' : 'bg-white';
  const navText = isDark ? 'text-neutral-400 hover:text-white hover:bg-white/5' : 'text-neutral-500 hover:text-black hover:bg-black/5';
  const dropdownBg = isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-black/10';
  const dropdownItem = isDark ? 'text-neutral-300 hover:text-white hover:bg-white/5' : 'text-neutral-600 hover:text-black hover:bg-black/5';
  const headingGrad = isDark ? 'from-neutral-50 to-neutral-400' : 'from-neutral-900 to-neutral-500';
  const bodyText = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const headingText = isDark ? 'text-white' : 'text-neutral-900';
  const labelColor = isDark ? 'text-blue-400/80' : 'text-neutral-400';
  const iconColor = isDark ? 'text-blue-400/70' : 'text-neutral-400';
  const mobileBack = isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black';
  const borderSub = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]';
  const formBg = isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-black/[0.02] border-black/[0.06]';
  const inputBg = isDark ? 'bg-white/[0.03] border-white/[0.08] text-white placeholder-neutral-600 focus:border-blue-500/40' : 'bg-black/[0.02] border-black/[0.08] text-neutral-900 placeholder-neutral-400 focus:border-black/20';
  const contactName = isDark ? 'text-white' : 'text-neutral-900';
  const contactLink = isDark ? 'text-neutral-300 hover:text-blue-400' : 'text-neutral-600 hover:text-black';
  const whatsappColor = isDark ? 'text-green-400/80 hover:text-green-400' : 'text-green-600/80 hover:text-green-600';
  const dotColor = isDark ? 'bg-blue-500/50' : 'bg-neutral-400/50';
  const serviceBtn = (active: boolean) => active
    ? (isDark ? 'bg-blue-500/15 border-blue-500/30 text-blue-300' : 'bg-black/10 border-black/20 text-neutral-900')
    : (isDark ? 'bg-white/[0.02] border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/[0.15]' : 'bg-black/[0.02] border-black/[0.06] text-neutral-500 hover:text-black hover:border-black/[0.15]');

  return (
    <div className={`${bg} min-h-screen font-sans antialiased transition-colors duration-500`}>
      <Helmet>
        <title>Yhteystiedot — FEIM Digital Studio</title>
        <meta name="description" content="Ota yhteyttä FEIMiin. Kerro projektistasi ja saat maksuttoman vedoksen digitaalisesta ratkaisustasi." />
        <link rel="canonical" href="https://feim.fi/yhteystiedot" />
        <meta property="og:title" content="Yhteystiedot — FEIM Digital Studio" />
        <meta property="og:description" content="Ota yhteyttä ja tilaa maksuton vedos digitaalisesta ratkaisustasi." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feim.fi/yhteystiedot" />
      </Helmet>

      

      {/* Hero - minimal spacer */}
      <div className={`pt-28 sm:pt-36 md:pt-44 ${bg}`} />

      <section className="relative pb-32 overflow-hidden">
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          {/* Full-width form */}
          <FadeIn delay={0.2}>
            <div className={`border rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 backdrop-blur-sm ${formBg}`}>
              <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${headingText}`}>Ota yhteyttä</h3>
              <p className={`text-sm mb-8 ${bodyText}`}>Täytä alla olevat tiedot, niin palaamme asiaan 24 tunnin sisällä.</p>

              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ml-1 ${bodyText}`}>Yritys</label>
                    <input type="text" placeholder="Yrityksen nimi" required
                      className={`w-full border rounded-xl px-5 py-4 focus:outline-none transition-colors text-[15px] ${inputBg}`} />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ml-1 ${bodyText}`}>Nimi</label>
                    <input type="text" placeholder="Etunimi Sukunimi" required
                      className={`w-full border rounded-xl px-5 py-4 focus:outline-none transition-colors text-[15px] ${inputBg}`} />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ml-1 ${bodyText}`}>Sähköpostiosoite</label>
                    <input type="email" placeholder="nimi@yritys.fi" required
                      className={`w-full border rounded-xl px-5 py-4 focus:outline-none transition-colors text-[15px] ${inputBg}`} />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ml-1 ${bodyText}`}>Puhelinnumero</label>
                    <input type="tel" placeholder="+358 40 123 4567"
                      className={`w-full border rounded-xl px-5 py-4 focus:outline-none transition-colors text-[15px] ${inputBg}`} />
                  </div>
                </div>

                {/* Service selection */}
                <div className="space-y-3">
                  <label className={`text-sm font-medium ml-1 ${bodyText}`}>Mitä tarvitset?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                    {serviceOptions.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedService(s.id)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border ${serviceBtn(selectedService === s.id)}`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ml-1 ${bodyText}`}>Kerro projektistasi</label>
                    <textarea rows={5} placeholder="Kerro lyhyesti, mitä haluaisit rakentaa ja mitä tavoitteita projektillasi on."
                      className={`w-full border rounded-xl px-5 py-4 focus:outline-none transition-colors resize-none text-[15px] ${inputBg}`} />
                  </div>

                  <div className="space-y-2">
                    <label className={`text-sm font-medium ml-1 ${bodyText}`}>Lisätietoja</label>
                    <div className={`border-2 border-dashed rounded-xl px-5 py-8 text-center transition-colors cursor-pointer hover:border-opacity-30 ${isDark ? 'border-white/[0.12] hover:bg-white/[0.02]' : 'border-black/[0.12] hover:bg-black/[0.02]'}`}>
                      <Paperclip size={24} className={`mx-auto mb-3 ${bodyText}`} />
                      <p className={`text-sm font-medium ${headingText}`}>Lisätietoja</p>
                      <p className={`text-xs mt-1 ${bodyText}`}>PDF, DOC</p>
                    </div>
                  </div>
                </div>

                <div className={`flex items-start gap-3 mt-2 border-l-2 pl-4 ${isDark ? 'border-blue-400/30' : 'border-neutral-300'}`}>
                  <p className={`text-xs leading-relaxed ${bodyText}`}>
                    Tämä lomake kerää yhteystietosi, jotta voimme olla sinuun yhteydessä. Tutustu <a href="#" className={`font-semibold underline ${headingText}`}>tietosuojaselosteeseen</a> saadaksesi lisätietoja siitä, miten käsittelemme ja suojaamme tietojasi.
                  </p>
                </div>

                <button type="submit"
                  className="w-full sm:w-auto font-bold text-base py-4 px-12 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] mt-2 group flex items-center justify-center gap-2"
                  style={{ backgroundColor: isDark ? '#ffffff' : '#171717', color: isDark ? '#000000' : '#ffffff' }}>
                  Lähetä viesti
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Yhteystiedot;
