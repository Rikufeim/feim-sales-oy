import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const services = [
  {
    num: "01",
    title: "Verkkosivut",
    desc: "Modernit, liiketoimintaa tukevat verkkosivut — suunniteltu brändin arvon viestimiseen ja kävijöiden muuttamiseen asiakkaiksi.",
    link: "/verkkosivut"
  },
  {
    num: "02",
    title: "Web-sovellukset",
    desc: "Räätälöityjä web-sovelluksia: asiakasportaaleja, SaaS-palveluja, varausjärjestelmiä ja uusia digitaalisia tuotteita.",
    link: "/web-sovellukset"
  },
  {
    num: "03",
    title: "Prototyypit ja MVP:t",
    desc: "Ideasta ensimmäinen toimiva versio — klikattava prototyyppi tai MVP, jolla idean toimivuus voidaan todentaa ennen täyttä kehitystä.",
    link: "/prototyypit"
  },
];

const pillars = [
  {
    title: "Strategia ennen suunnittelua",
    desc: "Jokainen projekti alkaa liiketoimintatavoitteiden ymmärtämisestä. Emme suunnittele ennen kuin tiedämme miksi."
  },
  {
    title: "Nopeus ilman kompromisseja",
    desc: "Tekoälyavusteinen kehitysprosessimme tuottaa laadukkaan lopputuloksen viikkojen, ei kuukausien päässä."
  },
  {
    title: "Pitkäjänteinen kumppanuus",
    desc: "Digitaalinen maailma ei pysähdy julkaisuhetkeen. Olemme mukana pitkään."
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

    {/* ── Hero ── */}
    <section className="relative pt-40 md:pt-52 pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 60% 0%, #0021ff1a 0%, transparent 55%), #000",
      }} />
      <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full">
        <FadeIn delay={0.05}>
          <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-6">Palvelut</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
            Mitä rakennamme
          </h1>
        </FadeIn>
        <FadeIn delay={0.18}>
          <p className="mt-8 text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Verkkosivuista web-sovelluksiin ja prototyyppeihin — suunnittelemme ja toteutamme moderneja digitaalisia ratkaisuja, jotka tukevat liiketoimintaa ja skaalautuvat tarpeen mukaan.
          </p>
        </FadeIn>
        <FadeIn delay={0.26}>
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link to="/yhteystiedot" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 group">
              Pyydä tarjous <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#palvelut-lista" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300">
              Tutustu palveluihin
            </a>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* ── Palvelulista ── */}
    <section id="palvelut-lista" className="relative py-8 pb-32 overflow-hidden">
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
        <div className="border-t border-white/[0.08]">
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              {s.link ? (
                <Link to={s.link} className="group flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 py-12 border-b border-white/[0.08] hover:pl-2 transition-all duration-500">
                  <div className="flex items-start gap-8 flex-1">
                    <span className="text-sm font-mono text-neutral-600 mt-1.5 shrink-0 w-8">{s.num}</span>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-3">
                      {s.title}
                      <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-blue-400 shrink-0" />
                    </h3>
                  </div>
                  <p className="text-neutral-500 text-[15px] leading-relaxed md:max-w-sm md:text-right md:pt-1 pl-16 md:pl-0">{s.desc}</p>
                </Link>
              ) : (
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 py-12 border-b border-white/[0.08]">
                  <div className="flex items-start gap-8 flex-1">
                    <span className="text-sm font-mono text-neutral-700 mt-1.5 shrink-0 w-8">{s.num}</span>
                    <h3 className="text-2xl md:text-3xl font-semibold text-neutral-600">{s.title}</h3>
                  </div>
                  <p className="text-neutral-600 text-[15px] leading-relaxed md:max-w-sm md:text-right pl-16 md:pl-0">{s.desc}</p>
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ── Lähestymistapa ── */}
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at 30% 50%, #0021ff12 0%, transparent 55%), #000" }} />
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <FadeIn>
            <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-6">Lähestymistapamme</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.1] mb-8">
              Ei pelkkiä verkkosivuja —<br />kokonaisia digitaalisia ratkaisuja.
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              FEIM ei ole tavallinen verkkosivutoimisto. Rakennamme kokonaisia digitaalisia tuotteita ja palveluja, jotka tukevat liiketoimintaa, ratkaisevat oikeita ongelmia ja skaalautuvat tarpeen mukaan.
            </p>
            <p className="text-neutral-500 text-lg leading-relaxed mt-5">
              Autamme myös yksityisiä ja tiimejä, joilla on idea sovelluksesta tai digitaalisesta tuotteesta. Ideasta rakennetaan nopeasti prototyyppi, testattava MVP tai valmis sovellus.
            </p>
          </FadeIn>
          <div className="space-y-10 lg:pt-16">
            {pillars.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1 + 0.1}>
                <div className="flex gap-6">
                  <div className="shrink-0 w-px bg-blue-500/30 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-neutral-500 text-[15px] leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at 50% 60%, #0021ff1e 0%, transparent 55%), #000" }} />
      <div className="max-w-4xl mx-auto px-6 lg:px-16 relative z-10 text-center">
        <FadeIn>
          <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-6">Aloita tästä</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.08]">Tilaa maksuton vedos</h2>
          <p className="text-neutral-400 text-lg max-w-lg mx-auto mb-12 leading-relaxed">
            Kerro projektistasi ja saat konkreettisen ehdotuksen siitä, miten kannattaa lähteä liikkeelle.
          </p>
          <Link to="/yhteystiedot" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white hover:bg-neutral-100 text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 group">
            Tilaa maksuton vedos <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </div>
    </section>

    <Footer />
  </div>
);

export default Palvelut;
