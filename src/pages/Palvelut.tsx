import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactCard from '@/components/ContactCard';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import feimLogo from '@/assets/feim-logo.png';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const services = [
  {
    icon: "🌐",
    title: "Verkkosivut",
    desc: "Modernit ja liiketoimintaa tukevat verkkosivut yrityksille.",
    link: "/verkkosivut"
  },
  {
    icon: "⚡",
    title: "Web-sovellukset",
    desc: "Räätälöityjä web-sovelluksia ja digitaalisia palveluja.",
    link: "/web-sovellukset"
  },
  {
    icon: "◆",
    title: "Prototyypit ja MVP:t",
    desc: "Ideasta ensimmäinen versio — prototyyppi, MVP tai konsepti.",
    link: "/prototyypit"
  },
  {
    icon: "🎯",
    title: "Landing page -sivut",
    desc: "Konversioon optimoidut laskeutumissivut.",
  },
  {
    icon: "📈",
    title: "Jatkuva kehitys",
    desc: "Jatkuva kehitys pitää tuotteenne kilpailukykyisenä.",
  },
];

const Palvelut = () => (
  <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
    <Helmet>
      <title>Palvelut — FEIM Digital Studio</title>
      <meta name="description" content="FEIM suunnittelee ja rakentaa verkkosivuja, web-sovelluksia ja prototyyppejä. Moderneja digitaalisia ratkaisuja yrityksille ja idean omistajille." />
      <link rel="canonical" href="https://feim.fi/palvelut" />
      <meta property="og:title" content="Palvelut — FEIM Digital Studio" />
      <meta property="og:description" content="Verkkosivut, web-sovellukset ja digitaaliset tuotteet. Suunnittelusta toteutukseen." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://feim.fi/palvelut" />
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
          <Link to="/yhteystiedot" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Yhteystiedot</Link>
          <Link to="/yhteystiedot" className="ml-4 text-sm font-semibold text-black bg-white hover:bg-neutral-200 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105">Tilaa vedos</Link>
        </div>
        <Link to="/" className="lg:hidden text-sm text-neutral-400 hover:text-white flex items-center gap-1"><ArrowLeft size={16} /> Takaisin</Link>
      </div>
    </nav>

    {/* Hero — Compact overview with inline service anchors */}
    <section className="relative pt-32 md:pt-40 pb-8 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(circle at 70% 80%, #0021ff20 0%, transparent 45%), #000",
      }} />
      <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full">
        <FadeIn delay={0.05}>
          <p className="text-sm font-medium text-blue-400/80 tracking-widest uppercase mb-4">Palvelut</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white pb-4 leading-[1.12] max-w-4xl">
            Mitä rakennamme
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Suunnittelemme ja toteutamme moderneja digitaalisia ratkaisuja — verkkosivuista web-sovelluksiin ja prototyyppeihin.
          </p>
        </FadeIn>
        
        {/* Inline service tags */}
        <FadeIn delay={0.25}>
          <div className="flex flex-wrap gap-3 mt-8 pb-8 border-b border-white/[0.06]">
            {services.map((s, i) => (
              s.link ? (
                <Link key={i} to={s.link} className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-sm font-medium hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all duration-300">
                  <span>{s.icon}</span> {s.title}
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              ) : (
                <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-neutral-500 text-sm font-medium">
                  <span>{s.icon}</span> {s.title}
                </span>
              )
            ))}
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Service Cards */}
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
        <div className="space-y-0 divide-y divide-white/[0.06]">
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              {s.link ? (
                <Link to={s.link} className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-10 hover:pl-4 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{s.icon}</span>
                    <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-3">
                      {s.title}
                      <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-400" />
                    </h3>
                  </div>
                  <p className="text-neutral-500 text-[15px] md:max-w-sm md:text-right">{s.desc}</p>
                </Link>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-10">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{s.icon}</span>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">{s.title}</h3>
                  </div>
                  <p className="text-neutral-500 text-[15px] md:max-w-sm md:text-right">{s.desc}</p>
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Approach */}
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at 50% 50%, #0021ff15 0%, transparent 50%), #000" }} />
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ei pelkkiä verkkosivuja — kokonaisia digitaalisia ratkaisuja</h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              FEIM ei ole tavallinen verkkosivutoimisto. Rakennamme kokonaisia digitaalisia tuotteita ja palveluja, jotka tukevat liiketoimintaa, ratkaisevat oikeita ongelmia ja skaalautuvat tarpeen mukaan.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Sinulla on idea? Me teemme siitä todellisen.</h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Autamme myös yksityisiä ja tiimejä, joilla on idea sovelluksesta tai digitaalisesta tuotteesta. Ideasta voidaan rakentaa nopeasti prototyyppi, testattava MVP tai valmis sovellus.
            </p>
            
          </FadeIn>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at 50% 50%, #0021ff20 0%, transparent 50%), #000" }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">Tilaa maksuton vedos</h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10">Kerro projektistasi ja saat konkreettisen ehdotuksen siitä, miten kannattaa lähteä liikkeelle.</p>
          <Link to="/yhteystiedot" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white hover:bg-neutral-200 text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 group">
            Tilaa maksuton vedos <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="mt-12"><ContactCard /></div>
        </FadeIn>
      </div>
    </section>

    <Footer />
  </div>
);

export default Palvelut;
