import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactCard from '@/components/ContactCard';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const services = [
  {
    icon: "🌐",
    title: "Verkkosivut",
    desc: "Modernit ja liiketoimintaa tukevat verkkosivut yrityksille. Rakennamme sivuja jotka viestivät brändin arvon, toimivat nopeasti ja hakukoneystävällisesti — ja muuttavat kävijät asiakkaiksi.",
    link: "/verkkosivut"
  },
  {
    icon: "⚡",
    title: "Web-sovellukset",
    desc: "Rakennamme räätälöityjä web-sovelluksia ja digitaalisia palveluja — asiakasportaaleja, SaaS-palveluja, varaus- ja hallintajärjestelmiä sekä täysin uusia digitaalisia tuotteita.",
    link: "/web-sovellukset"
  },
  {
    icon: "◆",
    title: "Prototyypit ja MVP:t",
    desc: "Jos sinulla on idea sovelluksesta tai digitaalisesta palvelusta, autamme tekemään siitä ensimmäisen version — klikattavan prototyypin, MVP-version tai konseptin.",
    link: "/prototyypit"
  },
  {
    icon: "✦",
    title: "UI/UX-suunnittelu",
    desc: "Käyttöliittymä- ja käyttäjäkokemussuunnittelua, jossa jokainen elementti palvelee käyttäjän matkaa. Intuitiivinen, kaunis ja funktionaalinen.",
  },
  {
    icon: "🎯",
    title: "Landing page -sivut",
    desc: "Konversioon optimoidut laskeutumissivut, jotka ohjaavat kävijää kohti toimintaa — olipa kyse yhteydenottopyynnöstä, tilauksesta tai liidien keräämisestä.",
  },
  {
    icon: "📈",
    title: "Jatkuva kehitys",
    desc: "Toteutamme modernilla teknologialla, joka takaa suorituskyvyn, tietoturvan ja skaalautuvuuden. Jatkuva kehitys pitää tuotteenne kilpailukykyisenä.",
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
        <Link to="/" className="text-xl font-bold text-white tracking-wider uppercase drop-shadow-lg">FEIM</Link>
        <div className="hidden lg:flex items-center gap-1">
          <Link to="/palvelut" className="text-sm font-medium text-white px-4 py-2 rounded-full bg-white/5">Palvelut</Link>
          <Link to="/prosessi" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Prosessi</Link>
          <Link to="/referenssit" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Referenssit</Link>
          <Link to="/meista" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Meistä</Link>
          <Link to="/#yhteystiedot" className="ml-4 text-sm font-semibold text-black bg-white hover:bg-neutral-200 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105">Tilaa vedos</Link>
        </div>
        <Link to="/" className="lg:hidden text-sm text-neutral-400 hover:text-white flex items-center gap-1"><ArrowLeft size={16} /> Takaisin</Link>
      </div>
    </nav>

    {/* Hero */}
    <section className="relative min-h-[60vh] flex flex-col items-start justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(circle at 70% 80%, #0021ff40 0%, transparent 45%), #000",
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
          <p className="text-sm font-medium text-blue-400/80 tracking-widest uppercase mb-6">Palvelut</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-4 leading-[1.08] max-w-5xl">
            Verkkosivut, web-sovellukset ja digitaaliset tuotteet
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            FEIM suunnittelee ja rakentaa moderneja digitaalisia ratkaisuja — verkkosivuista ja landing pageista aina web-sovelluksiin ja uusiin tuoteideoihin. Autamme yrityksiä ja yksilöitä, joilla on visio.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* Service Cards */}
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              {s.link ? (
                <Link to={s.link} className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 h-full block">
                  <span className="text-2xl mb-5 block">{s.icon}</span>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    {s.title}
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-400" />
                  </h3>
                  <p className="text-neutral-400 leading-relaxed text-[15px]">{s.desc}</p>
                  <p className="text-blue-400/60 text-sm mt-4 group-hover:text-blue-400 transition-colors">Lue lisää →</p>
                </Link>
              ) : (
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 h-full">
                  <span className="text-2xl mb-5 block">{s.icon}</span>
                  <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
                  <p className="text-neutral-400 leading-relaxed text-[15px]">{s.desc}</p>
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
            <div className="w-12 h-px bg-blue-500/50 mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ei pelkkiä verkkosivuja — kokonaisia digitaalisia ratkaisuja</h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              FEIM ei ole tavallinen verkkosivutoimisto. Rakennamme kokonaisia digitaalisia tuotteita ja palveluja, jotka tukevat liiketoimintaa, ratkaisevat oikeita ongelmia ja skaalautuvat tarpeen mukaan.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="w-12 h-px bg-blue-500/50 mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Sinulla on idea? Me teemme siitä todellisen.</h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Autamme myös yksityisiä ja tiimejä, joilla on idea sovelluksesta tai digitaalisesta tuotteesta. Ideasta voidaan rakentaa nopeasti prototyyppi, testattava MVP tai valmis sovellus.
            </p>
            <p className="text-neutral-500 italic mt-4">Sinulla ei tarvitse olla valmista suunnitelmaa — joskus hyvä idea riittää alkuun.</p>
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
          <a href="/#yhteystiedot" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white hover:bg-neutral-200 text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 group">
            Tilaa maksuton vedos <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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

export default Palvelut;
