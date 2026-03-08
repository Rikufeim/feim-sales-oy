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

const processSteps = [
  {
    num: "01",
    title: "Kartoitus & strategia",
    desc: "Aloitamme ymmärtämällä liiketoimintanne, kohderyhmänne ja tavoitteenne. Määrittelemme yhdessä projektin suunnan, laajuuden ja mittarit.",
    details: [
      "Liiketoiminnan tavoitteiden kartoitus ja ymmärtäminen",
      "Kohderyhmäanalyysi ja käyttäjäpersoonat",
      "Kilpailija-analyysi ja markkinaympäristön ymmärtäminen",
      "Projektin laajuuden, budjetin ja aikataulun määrittely",
      "Teknisten vaatimusten ja rajoitusten kartoitus",
      "Selkeä projektisuunnitelma ja virstanpylväät"
    ]
  },
  {
    num: "02",
    title: "Konsepti & suunnittelu",
    desc: "Luomme sivuston rakenteen, käyttäjäpolut ja visuaalisen identiteetin iteratiivisesti tiiviissä yhteistyössä.",
    details: [
      "Informaatioarkkitehtuuri ja sivukartta",
      "Wireframe-suunnittelu ja sivuston rakenne",
      "Käyttäjäpolkujen suunnittelu ja optimointi",
      "Visuaalisen suunnan ja moodboardien luominen",
      "Sisältöstrategia ja copywriting-suuntaviivat",
      "Iteratiivinen palautekierros asiakkaan kanssa"
    ]
  },
  {
    num: "03",
    title: "Design & kehitys",
    desc: "Toteutamme sivuston modernilla teknologialla, pixel-perfect designillä ja optimoidulla suorituskyvyllä.",
    details: [
      "Pixel-perfect UI-design kaikille näkymille",
      "Responsiivinen suunnittelu: desktop, tabletti, mobiili",
      "Moderni frontend-toteutus (React, TypeScript, Tailwind)",
      "Animaatiot ja interaktiiviset elementit",
      "Sisällön integrointi ja lopullinen viimeistely",
      "Design system ja komponenttikirjasto"
    ]
  },
  {
    num: "04",
    title: "Testaus & julkaisu",
    desc: "Testaamme sivuston kaikilla laitteilla, optimoimme latausnopeuden ja varmistamme hakukonenäkyvyyden.",
    details: [
      "Cross-browser ja cross-device testaus",
      "Suorituskykytestaus ja optimointi (Core Web Vitals)",
      "SEO-tarkistus: meta-tiedot, rakenne, nopeus",
      "Saavutettavuustarkistus (WCAG)",
      "Tietoturvatarkistus ja HTTPS-varmistus",
      "Hallittu julkaisu ja DNS-konfigurointi"
    ]
  },
  {
    num: "05",
    title: "Jatkuva kehitys",
    desc: "Julkaisun jälkeen sivustonne ei jää yksin. Tarjoamme jatkuvaa kehitystä, analytiikkaseurantaa ja optimointia.",
    details: [
      "Analytiikan seuranta ja raportointi",
      "A/B-testaus ja konversio-optimointi",
      "Sisältöpäivitykset ja uudet ominaisuudet",
      "Tekninen ylläpito ja tietoturvapäivitykset",
      "Suorituskyvyn jatkuva monitorointi",
      "Kuukausittaiset kehitysehdotukset"
    ]
  },
];

const Prosessi = () => (
  <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
    <Helmet>
      <title>Prosessi — FEIM Digital Studio</title>
      <meta name="description" content="FEIMin selkeä viisivaiheinen prosessi: strategiasta suunnitteluun, toteutuksesta julkaisuun ja jatkuvaan kehitykseen. Näin projektisi etenee." />
      <link rel="canonical" href="https://feim.fi/prosessi" />
      <meta property="og:title" content="Prosessi — FEIM Digital Studio" />
      <meta property="og:description" content="Ideasta valmiiksi viidessä vaiheessa. Selkeä prosessi, aikataulussa ja ilman yllätyksiä." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://feim.fi/prosessi" />
      <meta property="og:locale" content="fi_FI" />
    </Helmet>

    <nav className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
        <Link to="/" className="text-xl font-bold text-white tracking-wider uppercase drop-shadow-lg">FEIM</Link>
        <div className="hidden lg:flex items-center gap-1">
          <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Etusivu</Link>
          <Link to="/palvelut" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Palvelut</Link>
          <Link to="/prosessi" className="text-sm font-medium text-white px-4 py-2 rounded-full bg-white/5">Prosessi</Link>
          <Link to="/referenssit" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Referenssit</Link>
          <Link to="/meista" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Meistä</Link>
          <Link to="/yhteystiedot" className="ml-4 text-sm font-semibold text-black bg-white hover:bg-neutral-200 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105">Tilaa vedos</Link>
        </div>
        <Link to="/" className="lg:hidden text-sm text-neutral-400 hover:text-white flex items-center gap-1"><ArrowLeft size={16} /> Takaisin</Link>
      </div>
    </nav>

    {/* Hero — Timeline preview with horizontal steps */}
    <section className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(circle at 60% 20%, #0021ff20 0%, transparent 45%), #000",
      }} />
      <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full">
        <FadeIn delay={0.05}>
          <p className="text-sm font-medium text-blue-400/80 tracking-widest uppercase mb-4">Prosessi</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white pb-4 leading-[1.12] max-w-4xl">
            Ideasta valmiiksi — viidessä vaiheessa
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Selkeä prosessi varmistaa, että projekti etenee aikataulussa, budjetissa ja ilman yllätyksiä.
          </p>
        </FadeIn>
        
        {/* Horizontal timeline preview */}
        <FadeIn delay={0.3}>
          <div className="mt-12 grid grid-cols-5 gap-0 relative">
            {/* Connecting line */}
            <div className="absolute top-4 left-[10%] right-[10%] h-px bg-white/[0.08] z-0 hidden md:block" />
            {processSteps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xs font-mono text-blue-400 mb-3">
                  {step.num}
                </div>
                <p className="text-neutral-400 text-xs md:text-sm font-medium leading-tight hidden md:block">{step.title}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Steps */}
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
        {processSteps.map((step, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-16 border-t border-white/[0.06]">
              <div className="lg:col-span-1">
                <span className="text-5xl md:text-6xl font-black text-white/10">{step.num}</span>
              </div>
              <div className="lg:col-span-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{step.title}</h2>
                <p className="text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {step.details.map((detail, j) => (
                    <div key={j} className="flex items-start gap-3 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-2 shrink-0" />
                      <p className="text-neutral-300 text-[15px] leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at 50% 50%, #0021ff20 0%, transparent 50%), #000" }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">Valmis aloittamaan?</h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10">Kerro projektistasi ja aloitetaan ensimmäisestä vaiheesta — kartoituksesta ja strategiasta.</p>
          <Link to="/yhteystiedot" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white hover:bg-neutral-200 text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 group">
            Tilaa maksuton vedos <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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

export default Prosessi;
