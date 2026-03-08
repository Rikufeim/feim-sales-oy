import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

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

const TextHoverEffect = ({ text }: { text: string }) => (
  <div className="flex justify-center select-none overflow-hidden py-4">
    <h2 className="flex text-6xl md:text-9xl font-black tracking-tighter text-white/10 transition-colors duration-300">
      {text.split("").map((letter, index) => (
        <span key={index} className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:text-white cursor-default">{letter}</span>
      ))}
    </h2>
  </div>
);

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
  const [isScrolled] = useState(false);

  const navLinks = [
    { name: 'Palvelut', href: '#palvelut' },
    { name: 'Prosessi', href: '#prosessi' },
    { name: 'Referenssit', href: '#referenssit' },
    { name: 'Meistä', href: '#meista' },
    { name: 'UKK', href: '#ukk' },
    { name: 'Yhteystiedot', href: '#yhteystiedot' },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
        <div onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-xl font-bold text-white tracking-wider uppercase drop-shadow-lg cursor-pointer">
          FEIM
        </div>
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5">
              {link.name}
            </a>
          ))}
          <a href="#yhteystiedot" className="ml-4 text-sm font-semibold text-black bg-white hover:bg-neutral-200 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105">
            Aloita projekti
          </a>
        </div>
        <button className="lg:hidden text-neutral-200 hover:text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Navigaatiovalikko">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 right-0 mx-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-1 shadow-xl lg:hidden z-50">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                className="text-neutral-300 hover:text-white font-medium py-3 px-4 hover:bg-white/5 rounded-xl transition-all">
                {link.name}
              </a>
            ))}
            <a href="#yhteystiedot" onClick={() => setIsOpen(false)} className="mt-2 text-center text-black bg-white font-semibold py-3 px-4 rounded-xl">Aloita projekti</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ─── 1. Hero ─── */

const Hero = ({ onStartProject }: { onStartProject: () => void }) => (
  <section id="hero" className="relative min-h-screen flex flex-col items-start justify-center bg-black antialiased overflow-hidden">
    <Spotlight fill="white" />
    <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 30% 70%, #0021ff70 0%, transparent 45%), radial-gradient(circle at 70% 30%, #2201ff70 0%, transparent 45%), linear-gradient(180deg, #000000 0%, #000000 100%)",
      filter: "brightness(0.6)"
    }} />
    <SectionFade />

    <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-32 md:pt-40">
      <FadeIn>
        <p className="text-sm md:text-base font-medium text-blue-400/80 tracking-widest uppercase mb-6">Premium-verkkosivut & digitaaliset palvelut</p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-4 leading-[1.05] max-w-5xl">
          Rakennamme sivut,<br />jotka <Cover>ajattelevat.</Cover>
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
          Suunnittelemme ja toteutamme premium-verkkosivuja, jotka yhdistävät modernin designin, teknisen huippulaadun ja kaupallisen älykkyyden — sivustoja, jotka vahvistavat brändiäsi ja tuottavat konkreettisia tuloksia.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a href="#yhteystiedot" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-neutral-200 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] group">
            Pyydä tarjous
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#palvelut" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300">
            Tutustu palveluihin
          </a>
        </div>
      </FadeIn>
      <FadeIn delay={0.5}>
        <div className="flex flex-wrap gap-8 mt-16 text-sm text-neutral-500">
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500/70" /> Kiinteä hinnoittelu</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500/70" /> Nopeat toimitukset</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500/70" /> SEO-optimoitu</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500/70" /> Jatkuva kehitys</div>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ─── 2. Palvelut ─── */

const servicesData = [
  {
    title: "Verkkosivut yritykselle",
    desc: "Suunnittelemme ja toteutamme modernit, hakukoneystävälliset verkkosivut, jotka viestivät brändinne arvoa ja muuntavat kävijät asiakkaiksi. Jokainen sivusto rakennetaan liiketoimintanne tavoitteiden pohjalta.",
    icon: "🌐"
  },
  {
    title: "Landing page -sivut",
    desc: "Konversioon optimoidut laskeutumissivut, jotka ohjaavat kävijää kohti toimintaa — olipa kyse yhteydenottopyynnöstä, tilauksesta tai liidien keräämisestä. Testattu rakenne, viimeistelty kokemus.",
    icon: "🎯"
  },
  {
    title: "UI/UX-suunnittelu",
    desc: "Käyttöliittymä- ja käyttäjäkokemussuunnittelua, jossa jokainen elementti palvelee käyttäjän matkaa. Intuitiivinen, kaunis ja funktionaalinen — ilman kompromisseja.",
    icon: "✦"
  },
  {
    title: "Brändiä tukevat digitaaliset kokemukset",
    desc: "Rakennamme digitaalisia kokonaisuuksia, jotka vahvistavat brändi-identiteettiä visuaalisen tarinankerronnan, animaatioiden ja huoliteltujen yksityiskohtien avulla.",
    icon: "◆"
  },
  {
    title: "Konversio-optimointi",
    desc: "Analysoimme ja optimoimme sivustonne rakenteen, käyttäjäpolut ja CTA-elementit niin, että jokainen kävijä lähestyy haluttua toimenpidettä tehokkaammin.",
    icon: "📈"
  },
  {
    title: "Tekninen toteutus & jatkokehitys",
    desc: "Toteutamme sivustot modernilla teknologialla, joka takaa erinomaisen suorituskyvyn, tietoturvan ja skaalautuvuuden. Jatkuva kehitys pitää sivuston ajan tasalla ja kilpailukykyisenä.",
    icon: "⚡"
  },
];

const Services = () => (
  <section id="palvelut" className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 70% 80%, #111 0%, transparent 45%), linear-gradient(180deg, #000 0%, #000 100%)"
    }} />
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
      <FadeIn>
        <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Palvelut</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl">Kokonaisvaltaiset digitaaliset palvelut</h2>
        <p className="text-neutral-400 text-lg max-w-2xl mb-20">
          Tarjoamme kaiken, mitä moderni yritys tarvitsee erottuakseen digitaalisessa ympäristössä — strategiasta suunnitteluun, toteutuksesta optimointiin.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((s, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 h-full">
              <span className="text-2xl mb-5 block">{s.icon}</span>
              <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-[15px]">{s.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ─── 3. Miksi FEIM ─── */

const whyData = [
  { title: "Strateginen ajattelu", desc: "Emme ala suunnitella ennen kuin ymmärrämme liiketoimintanne tavoitteet. Jokainen ratkaisu perustuu selkeään strategiaan." },
  { title: "Moderni design", desc: "Visuaalinen ilme, joka erottaa teidät kilpailijoista. Ei geneerisiä malleja — jokaiselle asiakkaalle räätälöity kokonaisuus." },
  { title: "Tekninen huippulaatu", desc: "Toteutamme modernilla teknologialla, joka takaa nopean, turvallisen ja skaalautuvan lopputuloksen." },
  { title: "Suorituskyky & SEO", desc: "Hakukoneystävällinen rakenne ja salamannopea latautumisnopeus ovat osa jokaista projektia — eivät lisäpalvelu." },
  { title: "Konversiofokus", desc: "Rakennamme sivustot, jotka eivät vain näytä hyvältä, vaan tuottavat konkreettisia liiketoimintatuloksia." },
  { title: "Pitkäjänteinen kumppanuus", desc: "Digitaalinen maailma ei pysähdy. Tarjoamme jatkuvaa kehitystä, jotta sivustonne pysyy kilpailukykyisenä." },
];

const WhyFeim = () => (
  <section id="miksi-feim" className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 20% 30%, #0021ff30 0%, transparent 50%), radial-gradient(circle at 80% 70%, #1a1a1a 0%, transparent 50%), #000"
    }} />
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <FadeIn>
            <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Miksi FEIM</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Emme tee<br />geneerisiä sivuja.</h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-lg">
              Olemme digitaalinen studio, joka yhdistää strategisen ajattelun, huippuluokan designin ja modernin teknologian. Rakennamme ratkaisuja, joilla on vaikutus.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a href="#yhteystiedot" className="inline-flex items-center gap-2 mt-10 text-white font-medium border border-white/15 px-6 py-3 rounded-full hover:bg-white/5 transition-all group">
              Keskustellaan projektistanne <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whyData.map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="space-y-3">
                <div className="w-8 h-px bg-blue-500/50" />
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
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
    <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 60% 20%, #111 0%, transparent 50%), #000"
    }} />
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
    <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 40% 80%, #0021ff20 0%, transparent 50%), #000"
    }} />
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

const benefits = [
  { title: "Vahvempi ensivaikutelma", desc: "Sivusto, joka herättää luottamusta heti ensimmäisellä sekunnilla — professionaalisuus näkyy jokaisessa yksityiskohdassa." },
  { title: "Enemmän yhteydenottoja", desc: "Konversioon optimoitu rakenne ja selkeät toimintakehotukset muuntavat kävijät liideiksi tehokkaammin." },
  { title: "Parempi löydettävyys", desc: "Hakukoneystävällinen tekninen toteutus ja sisältörakenne varmistavat, että asiakkaanne löytävät teidät." },
  { title: "Vahvempi digitaalinen brändi", desc: "Yhtenäinen visuaalinen identiteetti ja huoliteltu kokemus rakentavat brändiarvoa jokaisessa kosketuspisteessä." },
  { title: "Skaalautuva läsnäolo", desc: "Moderni teknologia ja jatkuvan kehityksen malli varmistavat, että digitaalinen läsnäolonne kasvaa liiketoimintanne mukana." },
  { title: "Kilpailuetu", desc: "Premium-tasoinen verkkosivusto erottaa teidät kilpailijoista ja positioi yrityksenne markkinajohtajaksi." },
];

const Benefits = () => (
  <section id="hyodyt" className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 80% 20%, #0021ff15 0%, transparent 50%), #000"
    }} />
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <FadeIn>
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Tulokset</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Mitä asiakas<br />käytännössä saa.</h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Emme myy pelkkiä verkkosivuja. Myymme digitaalista kilpailuetua, joka näkyy suoraan liiketoiminnan tuloksissa.
            </p>
          </div>
        </FadeIn>
        <div className="space-y-8">
          {benefits.map((b, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mt-1">
                  <CheckCircle2 size={18} className="text-blue-400/70" />
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

/* ─── 7. Meistä ─── */

const AboutSection = () => (
  <section id="meista" className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 30% 50%, #111 0%, transparent 50%), #000"
    }} />
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
      <div className="max-w-4xl">
        <FadeIn>
          <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Meistä</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-10">Digitaalinen studio,<br />jolla on visio.</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeIn delay={0.1}>
            <p className="text-neutral-400 text-lg leading-relaxed">
              FEIM on moderni digitaalinen studio, joka yhdistää strategisen ajattelun, huippuluokan muotoilun ja teknisen osaamisen. Uskomme, että laadukas digitaalinen läsnäolo ei ole kulu — se on investointi, joka maksaa itsensä takaisin.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Emme tee kaikille kaikkea. Keskitymme harkittuihin, laadukkaisiin ratkaisuihin yrityksille, jotka ymmärtävät digitaalisen läsnäolon merkityksen. Jokaisessa projektissa yhdistyvät design, teknologia ja kaupallinen ajattelu — lopputuloksena sivusto, jolla on oikeasti vaikutus.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/[0.06]">
            {[
              { num: "50+", label: "Valmistunutta projektia" },
              { num: "98%", label: "Asiakastyytyväisyys" },
              { num: "<2s", label: "Keskimääräinen latausaika" },
              { num: "24h", label: "Vastausaika" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.num}</p>
                <p className="text-neutral-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

/* ─── 8. FAQ ─── */

const faqData = [
  { q: "Mitä verkkosivuprojekti maksaa?", a: "Jokainen projekti hinnoitellaan kiinteään hintaan projektin laajuuden perusteella. Landing page -sivujen hinnat alkavat muutamasta sadasta eurosta, ja laajemmat yrityssivustot räätälöidään tarpeen mukaan. Emme käytä tuntilaskutusta — tiedät aina etukäteen, mitä maksat." },
  { q: "Kuinka kauan projekti kestää?", a: "Tyypillinen verkkosivuprojekti valmistuu 2–6 viikossa riippuen laajuudesta. Landing page -sivut voivat valmistua viikossa, laajemmat kokonaisuudet 4–8 viikossa. Prosessimme on suunniteltu nopeaksi ilman laatukompromisseja." },
  { q: "Mitä palveluun sisältyy?", a: "Kaikki projektit sisältävät strategisen kartoituksen, UI/UX-suunnittelun, responsiivisen toteutuksen, SEO-perusoptimoinnin, suorituskykyoptimoinnin ja julkaisun. Jatkuva kehitys ja lisäpalvelut sovitaan erikseen." },
  { q: "Tehdäänkö myös hakukoneoptimointia?", a: "Kyllä. Jokainen sivusto rakennetaan hakukoneystävälliselle pohjalle: semanttinen HTML, optimoidut latausajat, meta-tiedot ja rakenteinen data ovat osa perustoimitusta. Laajempi SEO-strategia sovitaan erikseen." },
  { q: "Voiko sivustoa kehittää julkaisun jälkeen?", a: "Ehdottomasti. Digitaalinen maailma muuttuu jatkuvasti, ja sivustonne tulisi muuttua sen mukana. Tarjoamme jatkuvan kehityksen palvelua, jossa päivitämme, optimoimme ja laajennamme sivustoanne kuukausittain." },
  { q: "Toteutetaanko sivut mobiili edellä?", a: "Kyllä. Jokainen sivusto suunnitellaan ja toteutetaan responsiivisesti kaikille laitteille. Mobiilikokemus on meille yhtä tärkeä kuin työpöytäversio — usein jopa tärkeämpi." },
  { q: "Miten verkkosivusto tukee myyntiä?", a: "Rakennamme sivustot konversiokeskeisesti: selkeät toimintakehotukset, optimoidut käyttäjäpolut ja luottamusta herättävä design ohjaavat kävijöitä kohti yhteydenottoa tai ostopäätöstä." },
];

const FAQ = () => (
  <section id="ukk" className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000 100%)"
    }} />
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

/* ─── 9. Kontakti ─── */

const Contact = () => (
  <section id="yhteystiedot" className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 30% 70%, #0021ff40 0%, transparent 45%), radial-gradient(circle at 70% 30%, #2201ff40 0%, transparent 45%), #000",
      filter: "brightness(0.7)"
    }} />
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <FadeIn>
          <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4">Aloitetaan</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Rakennetaan yhdessä<br />jotain vaikuttavaa.</h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-10">
            Kerro meille projektistanne, niin palaamme asiaan vuorokauden sisällä konkreettisella ehdotuksella. Ei sitovia sopimuksia — vain rehellinen keskustelu siitä, miten voimme auttaa.
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-neutral-500 text-sm mb-1">Sähköposti</p>
              <a href="mailto:hello@feim.fi" className="text-white text-lg font-medium hover:text-blue-400 transition-colors">hello@feim.fi</a>
            </div>
            <div>
              <p className="text-neutral-500 text-sm mb-1">Vastausaika</p>
              <p className="text-white text-lg font-medium">Alle 24 tuntia</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <form className="space-y-5" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 ml-1">Nimi</label>
                <input type="text" placeholder="Matti Meikäläinen" required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors placeholder-neutral-600 text-[15px]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 ml-1">Sähköposti</label>
                <input type="email" placeholder="matti@yritys.fi" required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors placeholder-neutral-600 text-[15px]" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400 ml-1">Yritys</label>
              <input type="text" placeholder="Yrityksen nimi"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors placeholder-neutral-600 text-[15px]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400 ml-1">Kerro projektistanne</label>
              <textarea rows={5} placeholder="Millainen projekti on mielessänne? Mitä tavoitteita sillä on?"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors resize-none placeholder-neutral-600 text-[15px]" />
            </div>
            <button type="submit"
              className="w-full bg-white text-black font-bold text-base py-4 rounded-xl hover:bg-neutral-200 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2">
              Lähetä viesti
            </button>
            <p className="text-neutral-600 text-xs text-center">Vastaamme kaikkiin viesteihin vuorokauden sisällä.</p>
          </form>
        </FadeIn>
      </div>
    </div>
  </section>
);

/* ─── Footer ─── */

const Footer = () => (
  <footer className="relative pt-24 pb-8 px-6 overflow-hidden border-t border-white/[0.04]">
    <div className="relative z-10 max-w-7xl lg:max-w-[90rem] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <p className="text-xl font-bold text-white tracking-wider uppercase mb-4">FEIM</p>
          <p className="text-neutral-500 max-w-sm leading-relaxed">
            Moderni digitaalinen studio, joka suunnittelee ja toteuttaa premium-verkkosivuja ja digitaalisia kokemuksia yrityksille, jotka haluavat erottua.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">Palvelut</p>
          <ul className="space-y-3 text-neutral-500 text-sm">
            <li><a href="#palvelut" className="hover:text-white transition-colors">Verkkosivut</a></li>
            <li><a href="#palvelut" className="hover:text-white transition-colors">Landing paget</a></li>
            <li><a href="#palvelut" className="hover:text-white transition-colors">UI/UX-suunnittelu</a></li>
            <li><a href="#palvelut" className="hover:text-white transition-colors">Konversio-optimointi</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">Yritys</p>
          <ul className="space-y-3 text-neutral-500 text-sm">
            <li><a href="#meista" className="hover:text-white transition-colors">Meistä</a></li>
            <li><a href="#prosessi" className="hover:text-white transition-colors">Prosessi</a></li>
            <li><a href="#yhteystiedot" className="hover:text-white transition-colors">Yhteystiedot</a></li>
            <li><a href="#ukk" className="hover:text-white transition-colors">UKK</a></li>
          </ul>
        </div>
      </div>

      <div className="w-full overflow-hidden mb-8">
        <TextHoverEffect text="FEIM" />
      </div>

      <div className="w-full h-px bg-white/[0.06] mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-center text-neutral-600 text-sm gap-4">
        <p>&copy; {new Date().getFullYear()} FEIM Digital Studio. Kaikki oikeudet pidätetään.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Tietosuojaseloste</a>
          <a href="#" className="hover:text-white transition-colors">Käyttöehdot</a>
          <a href="#" className="hover:text-white transition-colors">Evästeasetukset</a>
        </div>
      </div>
    </div>
  </footer>
);

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
  const handleStartProject = () => { setView('project'); window.scrollTo(0, 0); };
  const handleNavigateHome = () => { setView('home'); window.scrollTo(0, 0); };

  return (
    <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
      {view === 'project' ? (
        <ProjectWizard onBack={handleNavigateHome} onComplete={handleNavigateHome} />
      ) : (
        <main>
          <Navigation onNavigate={dest => { if (dest === 'home') window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
          <Hero onStartProject={handleStartProject} />
          <Services />
          <WhyFeim />
          <Process />
          <Showcase />
          <Benefits />
          <AboutSection />
          <FAQ />
          <Contact />
          <Footer />
        </main>
      )}
    </div>
  );
};

export default Index;
