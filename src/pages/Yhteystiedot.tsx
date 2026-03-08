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

      <nav className="absolute top-0 left-0 right-0 z-50 py-6">
        <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
          <Link to="/"><img src={feimLogo} alt="FEIM" className="h-16 w-auto drop-shadow-lg" /></Link>
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" className={`text-sm font-medium transition-colors px-4 py-2 rounded-full ${navText}`}>Etusivu</Link>
            <div className="relative group">
              <Link to="/verkkosivut" className={`text-sm font-medium transition-colors px-4 py-2 rounded-full inline-flex items-center gap-1 ${navText}`}>
                Verkkosivut
              </Link>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className={`backdrop-blur-xl border rounded-xl p-2 min-w-[200px] shadow-xl ${dropdownBg}`}>
                  <Link to="/verkkosivut" className={`block text-sm px-4 py-2.5 rounded-lg transition-colors ${dropdownItem}`}>Verkkosivut</Link>
                  <Link to="/web-sovellukset" className={`block text-sm px-4 py-2.5 rounded-lg transition-colors ${dropdownItem}`}>Web-sovellukset</Link>
                  <Link to="/prototyypit" className={`block text-sm px-4 py-2.5 rounded-lg transition-colors ${dropdownItem}`}>Prototyypit</Link>
                </div>
              </div>
            </div>
            <Link to="/meista" className={`text-sm font-medium transition-colors px-4 py-2 rounded-full ${navText}`}>Meistä</Link>
            <Link to="/yhteystiedot" className={`text-sm font-medium transition-colors px-4 py-2 rounded-full ${navText}`}>Yhteystiedot</Link>
            <Link to="/yhteystiedot" className="ml-4 text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105" style={{ backgroundColor: isDark ? '#ffffff' : '#171717', color: isDark ? '#000000' : '#ffffff' }}>Tilaa vedos</Link>
          </div>
          <Link to="/" className={`lg:hidden text-sm flex items-center gap-1 ${mobileBack}`}><ArrowLeft size={16} /> Takaisin</Link>
        </div>
      </nav>

      {/* Hero */}
      <HeroBackground className="!min-h-screen flex items-end pb-20">
        <div className="absolute bottom-0 left-0 w-full h-48 z-10 pointer-events-none" style={{ background: `linear-gradient(to top, ${isDark ? '#000000' : '#ffffff'}, ${isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'}, transparent)` }} />
        
        <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-32 md:pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <FadeIn delay={0.05}>
                <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${labelColor}`}>Yhteystiedot</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b ${headingGrad} pb-4 leading-[1.08]`}>
                  Aloitetaan projektisi
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className={`mt-8 text-lg md:text-xl max-w-xl leading-relaxed ${bodyText}`}>
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
                        <Icon size={18} className={`shrink-0 ${iconColor}`} />
                        <p className={`text-sm font-medium ${headingText}`}>{point}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </HeroBackground>

      <section className="relative pb-32 overflow-hidden">
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">

          {/* Contact info row */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
              {/* Contact person */}
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
                  <img src={rikuNightImg} alt="Riku Miettinen" className="w-full h-full object-cover object-[center_20%]" />
                </div>
                <div>
                  <p className={`font-semibold text-lg ${contactName}`}>Riku Miettinen</p>
                  <p className={`text-sm mb-3 ${bodyText}`}>CEO, FEIM</p>
                  <div className="space-y-1.5">
                    <a href="mailto:riku@feim.fi" className={`text-sm transition-colors block ${contactLink}`}>riku@feim.fi</a>
                    <a href="tel:+358413282218" className={`text-sm transition-colors block ${contactLink}`}>041 328 2218</a>
                    <a href="https://wa.me/358413282218" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 text-sm transition-colors mt-1 ${whatsappColor}`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Company info */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${headingText}`}>FEIM Digital Studio</h3>
                <div className={`space-y-2 text-sm ${bodyText}`}>
                  <p>Y-tunnus: 3492270-5</p>
                  <p>Helsinki, Suomi</p>
                </div>
              </div>

              {/* What we do */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${headingText}`}>Mitä teemme</h3>
                <div className="space-y-3">
                  {['Verkkosivut', 'Web-sovellukset', 'Prototyypit & MVP:t', 'Vibe-koodaus'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                      <p className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Full-width form */}
          <FadeIn delay={0.2}>
            <div className={`border rounded-3xl p-8 md:p-12 backdrop-blur-sm ${formBg}`}>
              <h3 className={`text-2xl font-bold mb-2 ${headingText}`}>Ota yhteyttä</h3>
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
                  <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
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
