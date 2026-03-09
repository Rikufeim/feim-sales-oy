import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, CheckCircle2, ChevronDown, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import rikuImg from '@/assets/riku-miettinen.jpeg';
import feimLogo from '@/assets/feim-logo.png';
import rikuNightImg from '@/assets/riku-night.jpeg';
import salesApp1 from '@/assets/sales-app-1.png';
import salesApp2 from '@/assets/sales-app-2.png';
import ContactCard from '@/components/ContactCard';
import Footer from '@/components/Footer';
import { useNavbarVisibility } from '@/components/NavbarVisibility';
import HeroBackground from '@/components/HeroBackground';
import { useTheme } from '@/components/ThemeContext';

/* ─── Utility Components ─── */

const Beam = ({ style, hovered, delay }: { style: React.CSSProperties; hovered: boolean; delay: number }) => (
  <div style={{ ...style, width: '100%', height: '1px' }} className="absolute left-0 pointer-events-none overflow-hidden z-10">
    <div className="h-full w-[50%] bg-gradient-to-r from-transparent via-blue-500 to-transparent" style={{
      opacity: hovered ? 1 : 0.5,
      transform: 'translateX(-200%)',
      animation: `beam-move ${hovered ? 1 : 3}s linear infinite`,
      animationDelay: `${delay}s`
    }} />
  </div>
);

const Cover = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);
  useEffect(() => {
    if (ref.current) {
      const height = ref.current.clientHeight ?? 0;
      const numberOfBeams = Math.floor(height / 10);
      const positions = Array.from({ length: numberOfBeams }, (_, i) => (i + 1) * (height / (numberOfBeams + 1)));
      setBeamPositions(positions);
    }
  }, []);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} ref={ref}
      className={`relative group/cover inline-block px-2 py-2 transition duration-200 rounded-sm ${className}`}>
      {hovered && (
        <div className="absolute inset-0 overflow-hidden w-full h-full pointer-events-none rounded-sm">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute bg-white rounded-full w-0.5 h-0.5 animate-star-move" style={{
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 1 + 0.5}s`, animationDelay: `${Math.random() * 0.5}s`
            }} />
          ))}
        </div>
      )}
      {beamPositions.map((position, index) => <Beam key={index} hovered={hovered} style={{ top: `${position}px` }} delay={Math.random() * 2} />)}
      <span className={`inline-block text-white relative z-20 group-hover/cover:text-white transition duration-200 ${hovered ? 'font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500 transform scale-90' : ''}`}>
        {children}
      </span>
    </div>
  );
};

const Spotlight = ({ className = "", fill = "white", fillOpacity = 0.15 }: { className?: string; fill?: string; fillOpacity?: number }) => {
  const gradientId = `spotlight-gradient-${fill.replace('#', '')}`;
  return (
    <svg className={`pointer-events-none absolute z-[1] top-0 left-0 ${className}`} width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
      <circle cx="0" cy="0" r="500" fill={`url(#${gradientId})`} fillOpacity={fillOpacity} />
      <defs>
        <radialGradient id={gradientId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(500)">
          <stop stopColor={fill} stopOpacity="1" />
          <stop offset="1" stopColor={fill} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};


const TypewriterTitle = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplayedText(text.slice(0, i + 1)); i++; } else clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [text]);
  return <h2 className={`inline-block ${className}`}>{displayedText}<span className="animate-pulse text-blue-500 ml-1">_</span></h2>;
};

const SectionFade = () => (
  <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
);

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

/* ─── Navigation ─── */

const Navigation = ({ onNavigate }: { onNavigate: (dest: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Etusivu', href: '/' },
    { name: 'Meistä', href: '/meista' },
    { name: 'Yhteystiedot', href: '/yhteystiedot' },
  ];

  const isHash = (href: string) => href.startsWith('#');

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
        <div onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer">
          <img src={feimLogo} alt="FEIM" className="h-16 w-auto drop-shadow-lg" />
        </div>
        <div className="hidden lg:flex items-center gap-1">
          <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5">Etusivu</Link>
          <div className="relative group">
            <Link to="/verkkosivut" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5 inline-flex items-center gap-1">
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
          <Link to="/meista" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5">Meistä</Link>
          <Link to="/yhteystiedot" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5">Yhteystiedot</Link>
          <Link to="/yhteystiedot" className="ml-4 text-sm font-semibold text-black bg-white hover:bg-neutral-200 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105">
            Tilaa vedos
          </Link>
        </div>
        <button className="lg:hidden text-neutral-200 hover:text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Navigaatiovalikko">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 right-0 mx-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-1 shadow-xl lg:hidden z-50">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-white font-medium py-3 px-4 hover:bg-white/5 rounded-xl transition-all">Etusivu</Link>
            <Link to="/verkkosivut" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-white font-medium py-3 px-4 hover:bg-white/5 rounded-xl transition-all">Verkkosivut</Link>
            <Link to="/web-sovellukset" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-white font-medium py-3 px-4 pl-8 hover:bg-white/5 rounded-xl transition-all text-sm">Web-sovellukset</Link>
            <Link to="/prototyypit" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-white font-medium py-3 px-4 pl-8 hover:bg-white/5 rounded-xl transition-all text-sm">Prototyypit</Link>
            <Link to="/meista" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-white font-medium py-3 px-4 hover:bg-white/5 rounded-xl transition-all">Meistä</Link>
            <Link to="/yhteystiedot" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-white font-medium py-3 px-4 hover:bg-white/5 rounded-xl transition-all">Yhteystiedot</Link>
            <Link to="/yhteystiedot" onClick={() => setIsOpen(false)} className="mt-2 text-center text-black bg-white font-semibold py-3 px-4 rounded-xl">Tilaa vedos</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ─── 1. Hero ─── */

const Hero = ({ onStartProject }: { onStartProject: () => void }) => {
  const { isDark } = useTheme();
  return (
  <HeroBackground className="!min-h-screen flex flex-col items-start justify-center antialiased">
    <div 
      className="absolute bottom-0 left-0 w-full h-64 z-10 pointer-events-none" 
      style={{ background: `linear-gradient(to top, ${isDark ? '#000000' : '#ffffff'}, ${isDark ? '#000000' : '#ffffff'}, transparent)` }}
    />

    <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-32 md:pt-40">
      <FadeIn delay={0.1}>
        <h1 className={`text-4xl md:text-6xl font-bold pb-4 leading-[1.05] max-w-5xl ${isDark ? 'bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400' : 'text-neutral-900'}`}>
          Sivut, jotka <Cover>ajattelevat.</Cover>
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className={`mt-8 text-lg md:text-xl max-w-2xl leading-relaxed font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
          Suunnittelemme ja toteutamme verkkosivuja, web-sovelluksia ja prototyyppejä — modernilla designilla, teknisellä huippulaadulla ja kaupallisella älykkyydellä.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link to="/yhteystiedot" className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-full transition-all duration-300 hover:scale-105 group" style={{ backgroundColor: isDark ? '#ffffff' : '#171717', color: isDark ? '#000000' : '#ffffff' }}>
            Pyydä tarjous
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#palvelut" className={`inline-flex items-center justify-center gap-2 px-8 py-4 border font-medium rounded-full transition-all duration-300 ${isDark ? 'border-white/15 text-white hover:bg-white/5' : 'border-black/15 text-neutral-800 hover:bg-black/5'}`}>
            Tutustu palveluihin
          </a>
        </div>
      </FadeIn>
    </div>
  </HeroBackground>
  );
};

/* ─── 2. Palvelut ─── */

const servicesData = [
  {
    title: "Verkkosivut",
    desc: "Modernit ja liiketoimintaa tukevat verkkosivut, jotka viestivät brändin arvon ja muuttavat kävijät asiakkaiksi.",
    link: "/verkkosivut"
  },
  {
    title: "Web-sovellukset",
    desc: "Räätälöityjä web-sovelluksia — asiakasportaaleja, SaaS-palveluja, varausjärjestelmiä ja uusia digitaalisia tuotteita.",
    link: "/web-sovellukset"
  },
  {
    title: "Prototyypit ja MVP:t",
    desc: "Ideasta ensimmäinen versio — klikattava prototyyppi, MVP tai konsepti, jolla ideaa voidaan testata ja esitellä.",
    link: "/prototyypit"
  },
];

const Services = () => (
  <section id="palvelut" className="relative py-32 overflow-hidden">
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
      <FadeIn>
        <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Palvelut</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl">Verkkosivut, web-sovellukset ja digitaaliset tuotteet</h2>
        <div className="text-neutral-400 text-lg max-w-2xl mb-6 space-y-4">
          <p>
            FEIM suunnittelee ja rakentaa moderneja digitaalisia ratkaisuja — verkkosivuista ja landing pageista aina web-sovelluksiin ja uusiin tuoteideoihin.
          </p>
          <p>
            Autamme yrityksiä kasvamaan verkossa, mutta myös yksityisiä ja tiimejä, joilla on idea sovelluksesta, palvelusta tai digitaalisesta tuotteesta. Ideasta voidaan rakentaa nopeasti prototyyppi, testattava MVP tai valmis web-sovellus.
          </p>
        </div>
      </FadeIn>

      <div className="mt-16 space-y-0 divide-y divide-white/[0.06]">
        {servicesData.map((s, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            {s.link ? (
              <Link to={s.link} className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 md:py-10 hover:pl-4 transition-all duration-500">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-3">
                    {s.title}
                    <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-blue-400" />
                  </h3>
                </div>
                <p className="text-neutral-500 text-[15px] leading-relaxed md:max-w-md md:text-right">{s.desc}</p>
              </Link>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 md:py-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white/60">{s.title}</h3>
                <p className="text-neutral-500 text-[15px] leading-relaxed md:max-w-md md:text-right">{s.desc}</p>
              </div>
            )}
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ─── 3. Miksi FEIM ─── */

const whyData = [
  { title: "Verkkosivut, jotka myyvät", desc: "Rakennamme verkkosivuja, jotka eivät vain näytä hyvältä — ne tuottavat liidejä, rakentavat brändiä ja tukevat liiketoimintaa." },
  { title: "Web-sovellukset liiketoiminnan ytimeen", desc: "Kehitämme räätälöityjä web-sovelluksia, jotka automatisoivat prosesseja, palvelevat asiakkaita ja skaalautuvat kasvun mukana." },
  { title: "Prototyypit nopeasti käyntiin", desc: "Validoimme ideasi nopeasti toimivalla prototyypillä — ennen kuin investoit täyteen tuotekehitykseen." },
  { title: "Vibe-koodaus uudella tavalla", desc: "Hyödynnämme tekoälyä ja moderneja työkaluja, jotta saat laadukkaan lopputuloksen nopeammin ja kustannustehokkaammin." },
  { title: "Strategia ennen suunnittelua", desc: "Jokainen projekti alkaa liiketoimintatavoitteiden ymmärtämisestä. Emme ala suunnitella ennen kuin tiedämme miksi." },
  { title: "Pitkäjänteinen kumppanuus", desc: "Digitaalinen maailma ei pysähdy. Tarjoamme jatkuvaa kehitystä, jotta ratkaisunne pysyy kilpailukykyisenä." },
];

const WhyFeim = () => (
  <section id="miksi-feim" className="relative py-32 overflow-hidden">
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <FadeIn>
            <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Miksi FEIM</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Rakennamme<br />digitaalista kilpailuetua.</h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-lg">
              Verkkosivuja, web-sovelluksia ja prototyyppejä — modernilla vibe-koodauksella, joka yhdistää tekoälyn ja inhimillisen osaamisen.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link to="/yhteystiedot" className="inline-flex items-center gap-2 mt-10 text-white font-medium border border-white/15 px-6 py-3 rounded-full hover:bg-white/5 transition-all group">
              Keskustellaan projektistanne <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
        <FadeIn delay={0.15}>
          <div className="flex flex-col gap-5">
            {/* Kuvat */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img src={salesApp1} alt="FEIM Sales -sovellus näkymä 1" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img src={salesApp2} alt="FEIM Sales -sovellus näkymä 2" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Linkki */}
            <a
              href="https://feimsales.lovable.app/landing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex-1">
                <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Case study</p>
                <p className="text-white font-semibold text-sm leading-snug">Tutustu meidän rakentamaan myyntisovellukseen →</p>
              </div>
              <ExternalLink size={18} className="text-neutral-400 group-hover:text-white transition-colors shrink-0" />
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

/* ─── 4. Prosessi ─── */

const processSteps = [
  { num: "01", title: "Kartoitus & strategia", desc: "Aloitamme ymmärtämällä liiketoimintanne, kohderyhmänne ja tavoitteenne. Määrittelemme yhdessä projektin suunnan, laajuuden ja mittarit — niin, että jokaisella päätöksellä on selkeä peruste." },
  { num: "02", title: "Konsepti & suunnittelu", desc: "Luomme sivuston rakenteen, käyttäjäpolut ja visuaalisen identiteetin. Suunnittelu etenee iteratiivisesti tiiviissä yhteistyössä, jotta lopputulos vastaa täsmälleen visiotanne." },
  { num: "03", title: "Design & kehitys", desc: "Toteutamme sivuston modernilla teknologialla, pixel-perfect designillä ja optimoidulla suorituskyvyllä. Jokainen yksityiskohta viimeistellään — fonteista animaatioihin." },
  { num: "04", title: "Testaus & julkaisu", desc: "Testaamme sivuston kaikilla laitteilla, optimoimme latausnopeuden ja varmistamme hakukonenäkyvyyden. Julkaisu tapahtuu hallitusti ja sujuvasti." },
  { num: "05", title: "Jatkuva kehitys", desc: "Julkaisun jälkeen sivustonne ei jää yksin. Tarjoamme jatkuvaa kehitystä, analytiikkaseurantaa ja optimointia — digitaalinen läsnäolonne kasvaa kanssamme." },
];

const Process = () => (
  <section id="prosessi" className="relative py-32 overflow-hidden">
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
      <FadeIn>
        <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Prosessi</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ideasta valmiiksi<br />— viidessä vaiheessa.</h2>
        <p className="text-neutral-400 text-lg max-w-2xl mb-20">
          Selkeä prosessi varmistaa, että projekti etenee aikataulussa, budjetissa ja ilman yllätyksiä.
        </p>
      </FadeIn>
      <div className="space-y-0">
        {processSteps.map((step, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="group flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-t border-white/[0.06] hover:border-white/[0.12] transition-colors">
              <span className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-blue-500/30 transition-colors shrink-0 w-20">{step.num}</span>
              <div className="max-w-2xl">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ─── 5. Referenssit / Showcase ─── */

const showcaseItems = [
  { title: "E-commerce Platform", category: "Verkkokauppa • UI/UX • Kehitys", desc: "Kokonaisvaltainen verkkokauppakokemus, joka yhdistää viimeistellyn visuaalisen ilmeen ja sujuvan ostopolun. Tulos: +180% konversioaste.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop" },
  { title: "SaaS Dashboard", category: "Web-sovellus • Design System", desc: "Datavetoinen hallintapaneeli, jossa monimutkaiset toiminnot yksinkertaistettiin selkeiksi käyttäjäpoluiksi ja modulaariseksi design-systeemiksi.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" },
  { title: "Brand Experience", category: "Brändi • Verkkosivut • Animaatio", desc: "Premium-brändin digitaalinen identiteetti, joka yhdistää elokuvamaisen tarinankerronnan, hienovaraiset animaatiot ja teknisen viimeistelyn.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop" },
];

const Showcase = () => (
  <section id="referenssit" className="relative py-32 overflow-hidden">
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
      <FadeIn>
        <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Työnäytteet</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Valikoituja projekteja</h2>
        <p className="text-neutral-400 text-lg max-w-2xl mb-20">
          Jokainen projekti on uniikki kokonaisuus, joka on suunniteltu asiakkaan liiketoimintatavoitteiden pohjalta.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {showcaseItems.map((item, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="p-8">
                <p className="text-xs font-medium text-blue-400/60 tracking-wider uppercase mb-3">{item.category}</p>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ─── 6. Tulokset & hyödyt ─── */

const benefitsLeft = [
  { title: "Nopeampi time-to-market", desc: "Vibe-koodauksen ansiosta saat laadukkaan lopputuloksen viikkojen, ei kuukausien päässä." },
  { title: "Skaalautuva pohja kasvulle", desc: "Moderni teknologia ja jatkuvan kehityksen malli varmistavat, että digitaalinen läsnäolonne kasvaa liiketoimintanne mukana." },
];

const benefitsRight = [
  { title: "Vahvempi digitaalinen brändi", desc: "Yhtenäinen visuaalinen identiteetti ja huoliteltu kokemus rakentavat brändiarvoa jokaisessa kosketuspisteessä." },
  { title: "Verkkosivut, jotka konvertoivat", desc: "Optimoitu rakenne, nopeus ja SEO varmistavat, että kävijät löytävät teidät ja muuttuvat asiakkaiksi." },
  { title: "Sovellus, joka tehostaa toimintaa", desc: "Räätälöity web-sovellus automatisoi rutiineja, vähentää manuaalista työtä ja vapauttaa aikaa olennaiseen." },
  { title: "Prototyyppi, joka validoi idean", desc: "Nopea, toimiva prototyyppi osoittaa konseptin toimivuuden — ennen kuin käytät aikaa ja rahaa täyteen kehitykseen." },
];

const Benefits = () => (
  <section id="hyodyt" className="relative py-32 overflow-hidden">
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <FadeIn>
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Tulokset</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Mitä saat<br />käytännössä.</h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-10">
              Verkkosivuja, sovelluksia ja prototyyppejä — jokainen rakennettu tuottamaan konkreettisia liiketoimintatuloksia.
            </p>
            <div className="space-y-8">
              {benefitsLeft.map((b, i) => (
                <div key={i} className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-blue-800/15 border border-blue-700/25 flex items-center justify-center mt-1">
                    <CheckCircle2 size={18} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{b.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <div className="space-y-8">
          {benefitsRight.map((b, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-blue-800/15 border border-blue-700/25 flex items-center justify-center mt-1">
                  <CheckCircle2 size={18} className="text-blue-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{b.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─── 7. Tekoäly ─── */

const AISection = () => (
  <section id="tekoaly" className="relative py-32 overflow-hidden">
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <FadeIn>
          <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Tekoäly</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.08]">
            Tekoäly on<br />työkalu, ei trendi.
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-6">
            Hyödynnämme tekoälyä jokaisessa projektissa — suunnittelussa, kehityksessä ja sisällöntuotannossa. Lopputulos on nopeampi, laadukkaampi ja kustannustehokkaampi.
          </p>
          <p className="text-neutral-500 text-[15px] leading-relaxed">
            Vibe-koodaus tarkoittaa meillä sitä, että tekoäly tekee raskaan työn ja ihminen ohjaa laadun. Ei kompromisseja — vain fiksumpaa tekemistä.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="space-y-6">
            {[
              { label: "Nopeampi toteutus", desc: "Projektit valmistuvat viikkojen sijaan päivissä tekoälyavusteisen kehityksen ansiosta." },
              { label: "Pienempi hinta, sama laatu", desc: "Automaatio vähentää manuaalista työtä — säästö siirtyy suoraan sinulle." },
              { label: "Älykäs suunnittelu", desc: "Tekoäly analysoi parhaat käytännöt ja auttaa rakentamaan optimoidun käyttökokemuksen." },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mt-0.5">
                  <Sparkles size={16} className="text-blue-400/70" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.label}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

/* ─── Founder ─── */

const FounderSection = () => {
  const { isDark } = useTheme();
  
  // Light mode: dark blue/white editorial background inspired by reference
  const sectionBg = isDark 
    ? '' 
    : 'bg-[#0c1425]';
  const sectionRounding = isDark ? '' : 'rounded-[2.5rem] mx-4 lg:mx-8';
  
  // In light mode, force dark text styles to match dark bg
  const labelColor = isDark ? 'text-blue-400/70' : 'text-blue-300/70';
  const headingColor = isDark ? 'text-white' : 'text-white';
  const gradientText = isDark ? 'from-blue-400 to-blue-500' : 'from-blue-300 to-blue-400';
  const nameColor = isDark ? 'text-white' : 'text-white';
  const bodyColor = isDark ? 'text-neutral-400' : 'text-neutral-300';
  const quoteColor = isDark ? 'text-white' : 'text-white';
  const quoteBorder = isDark ? 'border-blue-500/30' : 'border-blue-400/30';
  const strongColor = isDark ? 'text-white' : 'text-white';
  const closingColor = isDark ? 'text-neutral-500' : 'text-neutral-400';

  return (
  <section className={`relative py-32 overflow-hidden ${sectionBg} ${sectionRounding}`}>
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">

      {/* Header */}
      <FadeIn>
        <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${labelColor}`}>Perustajan terveiset</p>
        <h2 className={`text-4xl md:text-6xl font-bold leading-[1.08] mb-16 max-w-4xl ${headingColor}`}>
          Tekoäly muuttaa kaiken —{' '}
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${gradientText}`}>me autamme hyödyntämään sen.</span>
        </h2>
      </FadeIn>

      <div className="max-w-4xl">

        {/* Thoughts as staggered quote-style blocks */}
        <div className="space-y-12">
          <FadeIn delay={0.15}>
            <blockquote className={`border-l-2 ${quoteBorder} pl-8`}>
              <p className={`font-semibold text-xl md:text-2xl leading-relaxed italic ${quoteColor}`}>
                "Uskon, että tekoäly ei korvaa ihmisen luovuutta — se vapauttaa sen."
              </p>
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className={`text-[17px] leading-relaxed pl-8 ${bodyColor}`}>
              Perustin FEIMin koska näin maailman, jossa luovuus ja teknologia eivät enää tarvitse olla erillisiä. Tekoäly on antanut meille työkalut, joilla kuka tahansa voi rakentaa jotain merkityksellistä — nopeammin, rohkeammin ja vapaammin kuin koskaan aiemmin. Se on mahdollisuus, ei uhka.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <blockquote className={`border-l-2 ${quoteBorder} pl-8`}>
              <p className={`font-semibold text-lg md:text-xl leading-relaxed ${quoteColor}`}>
                Jokaisella yrittäjällä, tiimillä ja visionäärillä on oikeus nähdä ideansa toteutuvan — ilman, että tekniset rajoitteet tai vanhat toimintamallit seisovat tiellä.
              </p>
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.45}>
            <p className={`text-lg pl-8 italic ${closingColor}`}>
              Kerro visiosi — tehdään siitä totta.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="pl-8 mt-10 flex items-center gap-6">
              <div className="w-28 h-28 rounded-full overflow-hidden shrink-0">
                <img src={rikuNightImg} alt="Riku Miettinen" className="w-full h-full object-cover object-[center_20%]" />
              </div>
              <div>
                <p className={`font-semibold text-lg ${nameColor}`}>Riku Miettinen</p>
                <p className={`text-sm mb-2 ${bodyColor}`}>Founder, FEIM</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <a href="mailto:riku@feim.fi" className={`transition-colors ${bodyColor} hover:text-white`}>riku@feim.fi</a>
                  <a href="tel:+358413282218" className={`transition-colors ${bodyColor} hover:text-white`}>041 328 2218</a>
                  <a href="https://wa.me/358413282218" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-green-400/80 hover:text-green-400 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </div>
  </section>
  );
};

/* ─── 8. FAQ ─── */

const faqData = [
  { q: "Mitä verkkosivuprojekti maksaa?", a: "Jokainen projekti hinnoitellaan kiinteään hintaan projektin laajuuden perusteella. Landing page -sivujen hinnat alkavat muutamasta sadasta eurosta, ja laajemmat yrityssivustot räätälöidään tarpeen mukaan. Emme käytä tuntilaskutusta — tiedät aina etukäteen, mitä maksat." },
  { q: "Kuinka kauan projekti kestää?", a: "Tyypillinen verkkosivuprojekti valmistuu 2–6 viikossa riippuen laajuudesta. Landing page -sivut voivat valmistua viikossa, laajemmat kokonaisuudet 4–8 viikossa. Prosessimme on suunniteltu nopeaksi ilman laatukompromisseja." },
  { q: "Mitä alustaa käytätte?", a: "Käytämme useita moderneja vibe-koodaus- ja tekoälytyökaluja riippuen projektin luonteesta. Pääasiallisina alustoina meillä on Lovable, Antigravity/Cursor sekä Beymflow. Näiden yhdistelmällä pystymme toimittamaan laadukkaita ratkaisuja nopeammin kuin perinteisellä kehityksellä." },
  { q: "Mitä palveluun sisältyy?", a: "Kaikki projektit sisältävät strategisen kartoituksen, UI/UX-suunnittelun, responsiivisen toteutuksen, SEO-perusoptimoinnin, suorituskykyoptimoinnin ja julkaisun. Jatkuva kehitys ja lisäpalvelut sovitaan erikseen." },
  { q: "Tehdäänkö myös hakukoneoptimointia?", a: "Kyllä. Jokainen sivusto rakennetaan hakukoneystävälliselle pohjalle: semanttinen HTML, optimoidut latausajat, meta-tiedot ja rakenteinen data ovat osa perustoimitusta. Laajempi SEO-strategia sovitaan erikseen." },
  { q: "Voiko sivustoa kehittää julkaisun jälkeen?", a: "Ehdottomasti. Digitaalinen maailma muuttuu jatkuvasti, ja sivustonne tulisi muuttua sen mukana. Tarjoamme jatkuvan kehityksen palvelua, jossa päivitämme, optimoimme ja laajennamme sivustoanne kuukausittain." },
  { q: "Toteutetaanko sivut mobiili edellä?", a: "Kyllä. Jokainen sivusto suunnitellaan ja toteutetaan responsiivisesti kaikille laitteille. Mobiilikokemus on meille yhtä tärkeä kuin työpöytäversio — usein jopa tärkeämpi." },
  { q: "Miten verkkosivusto tukee myyntiä?", a: "Rakennamme sivustot konversiokeskeisesti: selkeät toimintakehotukset, optimoidut käyttäjäpolut ja luottamusta herättävä design ohjaavat kävijöitä kohti yhteydenottoa tai ostopäätöstä." },
];

const FAQ = () => (
  <section id="ukk" className="relative py-32 overflow-hidden">
    <div className="max-w-4xl mx-auto px-6 lg:px-16 relative z-10">
      <FadeIn>
        <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Usein kysyttyä</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-16">Vastauksia yleisimpiin kysymyksiin</h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <Accordion type="single" collapsible className="space-y-2">
          {faqData.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-white/[0.06] hover:border-white/[0.12] transition-colors rounded-xl px-2">
              <AccordionTrigger className="text-white text-left text-lg font-medium py-6 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-400 leading-relaxed pb-6 text-[15px]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </div>
  </section>
);

/* ─── 9. Tilaa maksuton vedos ─── */

const serviceOptions = [
  {
    id: 'verkkosivut',
    icon: '🌐',
    title: 'Verkkosivut',
    desc: 'Myyvät, modernit ja liiketoimintaa tukevat sivut.',
    detail: 'Sopii yrityksille, jotka haluavat vahvemman digitaalisen ensivaikutelman ja enemmän yhteydenottoja.',
  },
  {
    id: 'web-sovellus',
    icon: '⚙️',
    title: 'Web-sovellus',
    desc: 'Käyttöliittymä- ja tuoteajattelua yhdistävä kokonaisuus.',
    detail: 'Sopii palveluille, asiakasportaaleille, SaaS-ideoille ja digitaalisille työkaluille.',
  },
  {
    id: 'prototyyppi',
    icon: '◆',
    title: 'Prototyyppi',
    desc: 'Nopea tapa konkretisoida idea ennen täyttä toteutusta.',
    detail: 'Sopii MVP-ajatteluun, konsepteihin, pitchaukseen ja tuotekehityksen alkuvaiheeseen.',
  },
];

const vedosBullets = [
  'Saat konkreettisen suunnan siihen, miten projektisi kannattaa rakentaa',
  'Näet millaista FEIMin kanssa työskentely on — jo ennen yhteistyön alkua',
  'Vedos auttaa hahmottamaan rakennetta, sisältöä ja käyttökokemusta',
  'Maksuton vedos ei sido sinua mihinkään — mutta antaa selkeän lähtöpisteen jatkolle',
];

const Contact = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="yhteystiedot" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }} />

      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">

        {/* ── Headline ── */}
        <FadeIn>
          <div className="text-center max-w-4xl mx-auto mb-8">
            <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-6">Aloita tästä</p>
            <h2 className="text-4xl md:text-7xl font-bold text-white leading-[1.08] mb-6">
              Tilaa maksuton{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">vedos</span>
              <br className="hidden md:block" /> digitaalisesta ratkaisustasi
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              FEIM ei tee pelkkiä verkkosivuja. Suunnittelemme ja luonnostelemme kokonaisia digitaalisia ratkaisuja — verkkosivuista web-sovelluksiin ja prototyyppeihin. Kerro, mitä tarvitset, ja me näytämme mitä se voisi olla.
            </p>
          </div>
        </FadeIn>

        {/* ── Palvelukortit ── */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mt-16 mb-20">
            {serviceOptions.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedService(s.id)}
                className={`group relative text-left p-7 md:p-8 rounded-2xl border transition-all duration-500 ${
                  selectedService === s.id
                    ? 'bg-blue-500/[0.08] border-blue-500/30 shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)]'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                }`}
              >
                {selectedService === s.id && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 size={20} className="text-blue-400" />
                  </div>
                )}
                <span className="text-2xl mb-4 block">{s.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-neutral-300 text-[15px] leading-relaxed mb-2">{s.desc}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{s.detail}</p>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* ── Main content: benefits left, form right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Benefits */}
          <FadeIn delay={0.15}>
            <div className="lg:sticky lg:top-32">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Mitä maksuton vedos sinulle antaa?</h3>
              <div className="space-y-5">
                {vedosBullets.map((bullet, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mt-0.5">
                      <CheckCircle2 size={16} className="text-blue-400/80" />
                    </div>
                    <p className="text-neutral-300 leading-relaxed">{bullet}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-white/[0.06]">
                <div className="flex items-start gap-5">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0">
                    <img src={rikuNightImg} alt="Riku Miettinen" className="w-full h-full object-cover object-[center_20%] grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Riku Miettinen</p>
                    <p className="text-neutral-500 text-sm mb-3">Founder, FEIM</p>
                    <div className="space-y-1.5">
                      <a href="mailto:riku@feim.fi" className="text-neutral-300 text-sm hover:text-blue-400 transition-colors block">riku@feim.fi</a>
                      <a href="tel:+358413282218" className="text-neutral-300 text-sm hover:text-blue-400 transition-colors block">041 328 2218</a>
                      <a href="https://wa.me/358413282218" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-green-400/80 hover:text-green-400 transition-colors mt-1">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn delay={0.2}>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-2">Jätä vedostilaus</h3>
              <p className="text-neutral-500 text-sm mb-8">Täytä alla olevat tiedot, niin aloitamme vedoksen valmistelun.</p>

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

                {/* Service selection in form */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Mitä haluat tilata?</label>
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
                  <label className="text-sm font-medium text-neutral-400 ml-1">Kuvaus tarpeesta tai tavoitteesta</label>
                  <textarea rows={4} placeholder="Kerro lyhyesti, mitä haluaisit rakentaa ja mitä tavoitteita projektillasi on."
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors resize-none placeholder-neutral-600 text-[15px]" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Lisätietoa tai aikataulu <span className="text-neutral-600">(valinnainen)</span></label>
                  <textarea rows={2} placeholder="Esim. toivottu aikataulu tai budjettihaarukka"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors resize-none placeholder-neutral-600 text-[15px]" />
                </div>

                <button type="submit"
                  className="w-full bg-white text-black font-bold text-base py-4 rounded-xl hover:bg-neutral-200 transition-all hover:scale-[1.01] active:scale-[0.99] mt-3 group flex items-center justify-center gap-2">
                  Tilaa maksuton vedos
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-neutral-600 text-xs text-center mt-2">
                  Palaamme sinulle henkilökohtaisesti ja ehdotamme sopivaa etenemistapaa.
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};




/* ─── Project Wizard (preserved) ─── */

const ProjectWizard = ({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({ type: null as string | null, subType: null as string | null });

  const handleTypeSelect = (type: string) => {
    setSelection(prev => ({ ...prev, type, subType: null }));
    setStep(type === 'web' ? 2 : 3);
  };

  const handleSubTypeSelect = (subType: string) => {
    setSelection(prev => ({ ...prev, subType }));
    setStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black">
      <Spotlight fill="white" />
      <Navigation onNavigate={() => { onBack(); }} />
      <div className="flex-grow flex flex-col justify-center relative z-10 px-6 lg:px-16 pt-32 pb-12">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4">
              <TypewriterTitle text="Mitä rakennetaan?" className="text-3xl md:text-5xl font-bold text-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { type: 'web', icon: '🌐', title: 'Nettisivut', desc: '' },
                { type: 'app', icon: '📱', title: 'Web-sovellus', desc: '' },
                { type: 'custom', icon: '⚡', title: 'Prototyypit', desc: 'Nopea MVP tai konsepti' },
              ].map(item => (
                <button key={item.type} onClick={() => handleTypeSelect(item.type)}
                  className="group bg-white/[0.02] p-8 rounded-2xl border border-white/[0.06] hover:border-white/[0.15] text-left transition-all">
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  {item.desc && <p className="text-neutral-500 text-sm mt-1">{item.desc}</p>}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center space-y-4">
              <TypewriterTitle text="Millainen sivu?" className="text-3xl md:text-5xl font-bold text-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { sub: 'landing', title: 'Landing Page', desc: 'Yhden sivun myyvä kokonaisuus.' },
                { sub: 'multipage', title: 'Multipage', desc: 'Laaja sivusto usealla alasivulla.' },
                { sub: 'growth', title: 'Growth Package', desc: 'Sivut + SEO + analytiikka kasvuun.' },
              ].map(item => (
                <button key={item.sub} onClick={() => handleSubTypeSelect(item.sub)}
                  className="group bg-white/[0.02] p-8 rounded-2xl border border-white/[0.06] hover:border-white/[0.15] text-left transition-all">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-sm">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <TypewriterTitle text="Yhteystiedot" className="text-3xl md:text-5xl font-bold text-white" />
              <p className="text-neutral-400 mt-4">Jätä yhteystietosi, niin palaamme asiaan 24 tunnin sisällä.</p>
            </div>
            <form onSubmit={e => { e.preventDefault(); onComplete(); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Nimi</label>
                  <input required type="text" placeholder="Matti Meikäläinen" className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors placeholder-neutral-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Sähköposti</label>
                  <input required type="email" placeholder="matti@yritys.fi" className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors placeholder-neutral-600" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 ml-1">Viesti</label>
                <textarea rows={4} placeholder="Kerro lyhyesti projektistasi..." className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors resize-none placeholder-neutral-600" />
              </div>
              <button type="submit" className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-neutral-200 transition-all hover:scale-[1.01] active:scale-[0.99]">
                Lähetä viesti
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Main Index ─── */

const Index = () => {
  const [view, setView] = useState('home');
  const { setHidden } = useNavbarVisibility();

  useEffect(() => {
    setHidden(view === 'project');
    return () => setHidden(false);
  }, [view, setHidden]);

  const handleStartProject = () => { setView('project'); window.scrollTo(0, 0); };
  const handleNavigateHome = () => { setView('home'); window.scrollTo(0, 0); };

  return (
    <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white relative">
      {view === 'project' ? (
        <ProjectWizard onBack={handleNavigateHome} onComplete={handleNavigateHome} />
      ) : (
        <main className="relative">
          {/* Unified page background accents */}
          
          <Hero onStartProject={handleStartProject} />
          <Services />
          <WhyFeim />
          
          <Benefits />
          <FounderSection />
          <FAQ />
          <Contact />
          <Footer />
        </main>
      )}
    </div>
  );
};

export default Index;
