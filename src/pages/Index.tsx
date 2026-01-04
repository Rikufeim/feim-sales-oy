import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Twitter, Github, ArrowRight, Zap, Send, ArrowLeft, CheckCircle2, Cpu, Globe, Smartphone, Bot, Sparkles } from 'lucide-react';
import { LogoCarouselDemo } from '@/components/LogoCarouselDemo';

/**
 * Beam
 * Animated beam effect for the Cover component.
 */
const Beam = ({
  style,
  hovered,
  delay
}: {
  style: React.CSSProperties;
  hovered: boolean;
  delay: number;
}) => {
  return <div style={{
    ...style,
    width: '100%',
    height: '1px'
  }} className="absolute left-0 pointer-events-none overflow-hidden z-10">
        <div className="h-full w-[50%] bg-gradient-to-r from-transparent via-blue-500 to-transparent" style={{
      opacity: hovered ? 1 : 0.5,
      transform: 'translateX(-200%)',
      animation: `beam-move ${hovered ? 1 : 3}s linear infinite`,
      animationDelay: `${delay}s`
    }} />
    </div>;
};

/**
 * Cover
 * The container component that adds the "warp speed" box effect around text.
 */
const Cover = ({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);
  useEffect(() => {
    if (ref.current) {
      const height = ref.current.clientHeight ?? 0;
      const numberOfBeams = Math.floor(height / 10);
      const positions = Array.from({
        length: numberOfBeams
      }, (_, i) => (i + 1) * (height / (numberOfBeams + 1)));
      setBeamPositions(positions);
    }
  }, []);
  return <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} ref={ref} className={`relative group/cover inline-block px-2 py-2 transition duration-200 rounded-sm ${className}`}>
      {/* Background Sparkles Effect */}
      {hovered && <div className="absolute inset-0 overflow-hidden w-full h-full pointer-events-none rounded-sm">
            {[...Array(15)].map((_, i) => <div key={i} className="absolute bg-white rounded-full w-0.5 h-0.5 animate-star-move" style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 1 + 0.5}s`,
        animationDelay: `${Math.random() * 0.5}s`
      }} />)}
        </div>}

      {/* Beams */}
      {beamPositions.map((position, index) => <Beam key={index} hovered={hovered} style={{
      top: `${position}px`
    }} delay={Math.random() * 2} />)}

      {/* Text Content */}
      <span className={`inline-block text-white relative z-20 group-hover/cover:text-white transition duration-200 ${hovered ? 'font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500 transform scale-90' : ''}`}>
        {children}
      </span>
    </div>;
};

/**
 * TypewriterTitle
 * Animates text character by character.
 */
const TypewriterTitle = ({
  text,
  className = ""
}: {
  text: string;
  className?: string;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);
  return <h2 className={`inline-block ${className}`}>
      {displayedText}
      <span className="animate-pulse text-blue-500 ml-1">_</span>
    </h2>;
};

/**
 * GradientButton
 * Custom button: Black by default. On hover, fills completely with Electric Blue.
 */
const GradientButton = ({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) => {
  return <button className={`relative group inline-flex items-center justify-center rounded-[11px] min-w-[132px] px-9 py-4 text-base leading-[19px] font-[500] text-white font-sans font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition-transform duration-300 hover:scale-105 active:scale-95 overflow-hidden ${className}`} {...props}>
      {/* Base Layer: Black Background with subtle border */}
      <div className="absolute inset-0 bg-black border border-white/10 rounded-[11px] z-0" />

      {/* Hover Layer: Electric Blue Gradient with 100% Opacity (Blue dominates) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0047ff] via-[#00bcff] to-[#0047ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      
      {/* Content */}
      <span className="relative z-20 flex items-center gap-2">
        {children}
      </span>
    </button>;
};

/**
 * Spotlight
 * Luo valokeilaefektin tai varjon.
 */
const Spotlight = ({
  className = "",
  fill = "white",
  fillOpacity = 0.15
}: {
  className?: string;
  fill?: string;
  fillOpacity?: number;
}) => {
  const gradientId = `spotlight-gradient-${fill.replace('#', '')}`;
  return <svg className={`pointer-events-none absolute z-[1] top-0 left-0 ${className}`} width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
    maxWidth: '100%',
    maxHeight: '100%'
  }}>
      <circle cx="0" cy="0" r="500" fill={`url(#${gradientId})`} fillOpacity={fillOpacity} />
      <defs>
        <radialGradient id={gradientId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(500)">
          <stop stopColor={fill} stopOpacity="1" />
          <stop offset="1" stopColor={fill} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>;
};

/**
 * TextHoverEffect
 */
const TextHoverEffect = ({
  text
}: {
  text: string;
}) => {
  return <div className="flex justify-center select-none overflow-hidden py-4">
      <h1 className="flex text-6xl md:text-9xl font-black tracking-tighter text-white/10 transition-colors duration-300">
        {text.split("").map((letter, index) => <span key={index} className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:text-white cursor-default">
            {letter}
          </span>)}
      </h1>
    </div>;
};

/**
 * FloatingDock
 */
const FloatingDock = ({
  onNavigate
}: {
  onNavigate: (dest: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [{
    name: 'Etusivu',
    href: '#hero',
    action: () => onNavigate('home')
  }, {
    name: 'Palvelut',
    href: '#services',
    action: () => onNavigate('home')
  }, {
    name: 'Meistä',
    href: '#about',
    action: () => onNavigate('home')
  }, {
    name: 'Ota yhteyttä',
    href: '#contact',
    action: () => onNavigate('home')
  }];
  return <nav className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
        <div onClick={() => onNavigate('home')} className="text-xl font-bold text-white tracking-wider uppercase drop-shadow-lg cursor-pointer">
          FEIM
        </div>

        <div className="hidden md:flex items-center gap-6 p-2 rounded-full backdrop-blur-sm bg-black/10 border border-white/5">
          {navLinks.map(link => <a key={link.name} href={link.href} onClick={e => {
          if (link.href === '#hero') {
            e.preventDefault();
            link.action();
          }
        }} className="text-sm font-medium text-gray-200 hover:text-white transition-colors duration-200 px-3 py-1">
              {link.name}
            </a>)}
          <div className="h-4 w-[1px] bg-gray-600 mx-1"></div>
          <div className="flex gap-4 px-2">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>

        <button className="md:hidden text-gray-200 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && <div className="absolute top-full mt-2 left-0 right-0 mx-4 bg-black border border-white/10 rounded-2xl p-4 flex flex-col gap-4 shadow-xl md:hidden animate-in fade-in slide-in-from-top-2 z-50">
          {navLinks.map(link => <a key={link.name} href={link.href} onClick={() => {
        setIsOpen(false);
        link.action();
      }} className="text-gray-200 hover:text-white font-medium py-2 px-4 hover:bg-white/5 rounded-xl transition-all">
              {link.name}
            </a>)}
        </div>}
    </nav>;
};

/**
 * ProjectAssistant
 */
const ProjectAssistant = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([{
    role: 'bot',
    text: 'Hei! Olen Feim-projektiavustaja. Voit kysyä minulta mitä esimerkiksi "nettisivut" tai "tekoäly" tarkoittavat, tai miten projektimme etenevät.'
  }]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);
  const generateResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('nettisivu') || q.includes('verkkosivu')) return "Teemme kaikkea 'landing page' -sivuista monimutkaisiin sovelluksiin.";
    if (q.includes('hinta')) return "Hinta riippuu laajuudesta. Kysy tarjous!";
    return "Kiitos kysymyksestäsi! Kerron mielelläni lisää.";
  };
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = {
      role: 'user',
      text: input
    };
    setConversation(prev => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      setConversation(prev => [...prev, {
        role: 'bot',
        text: generateResponse(input)
      }]);
    }, 600);
  };
  return null;
};

/**
 * ServiceRow
 */
const ServiceRow = ({
  title,
  description,
  icon: Icon,
  index,
  ctaText
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  index: number;
  ctaText: string;
}) => {
  return <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 w-full max-w-7xl mx-auto px-6 md:px-12`}>
      <div className="flex-1 space-y-6 text-left">
        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-2 backdrop-blur-sm border border-white/10">
            <Icon size={32} className="text-white" />
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
        
        {/* CTA Button */}
        <div className="pt-4">
            <GradientButton>
                {ctaText}
            </GradientButton>
        </div>
      </div>
      <div className="flex-1 w-full h-64 md:h-96">
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a]">
            <img src={`https://images.unsplash.com/photo-${getPhotoId(index)}?q=80&w=1000&auto=format&fit=crop`} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      </div>
    </div>;
};
const getPhotoId = (i: number) => {
  const ids = ["1460925895917-afdab827c52f", "1556761175-5973dc0f32e7", "1518770660439-4636190af475"];
  return ids[i % ids.length];
};

/**
 * ServicesList
 */
const ServicesList = () => {
  const services = [{
    title: "NOPEUS",
    icon: Zap,
    desc: "Markkinoiden nopeimmat toimitusajat. Hyödynnämme valmiita komponentteja ja tekoälyä, mikä leikkaa kehitysajan puoleen.",
    cta: "Lue lisää"
  }, {
    title: "HINTA",
    icon: CheckCircle2,
    desc: "Kiinteä hinnoittelu ilman yllätyksiä. Moderni teknologia mahdollistaa premium-laadun murto-osalla perinteisistä hinnoista.",
    cta: "Pyydä tarjous"
  }, {
    title: "JATKUVA KEHITYS",
    icon: Cpu,
    desc: "Digitaalinen maailma ei pysähdy. Ajattelevat sivut seuraa tulevaisuutta, eikä jämähdä paikoilleen.",
    cta: "Tutustu malliin"
  }];
  return <section id="services" className="relative py-24 overflow-hidden min-h-[800px]">
      
      {/* Tausta: Tummanharmaa ja musta sekoitus (musta dominoi) */}
      <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 30% 70%, #333333 0%, transparent 45%), radial-gradient(circle at 70% 30%, #333333 0%, transparent 45%), linear-gradient(180deg, #000000 0%, #000000 100%)",
      filter: "brightness(0.6)",
      width: "100%",
      height: "100%"
    }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Miksi valita meidät?</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">Tekoälyn optimoima prosessi takaa tulokset.</p>
        </div>
      </div>

      <div className="space-y-32 relative z-10">
        {services.map((s, i) => <ServiceRow key={i} index={i} title={s.title} icon={s.icon} description={s.desc} ctaText={s.cta} />)}
      </div>
    </section>;
};

/**
 * ProjectWizard
 */
const ProjectWizard = ({
  onBack,
  onComplete
}: {
  onBack: () => void;
  onComplete: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    type: null as string | null,
    subType: null as string | null,
    contact: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });
  const handleTypeSelect = (type: string) => {
    setSelection(prev => ({
      ...prev,
      type,
      subType: null
    }));
    setStep(2);
  };
  const handleSubTypeSelect = (subType: string) => {
    setSelection(prev => ({
      ...prev,
      subType
    }));
    setStep(3);
  };
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };
  const renderStep1 = () => <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <TypewriterTitle text="Mitä rakennetaan?" className="text-3xl md:text-5xl font-bold text-white" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <button onClick={() => handleTypeSelect('web')} className="group bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-white/30 text-left transition-all">
          <Globe className="mb-4 text-white" size={32} />
          <h3 className="text-xl font-bold text-white">Nettisivut</h3>
        </button>
        <button onClick={() => handleTypeSelect('app')} className="group bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-white/30 text-left transition-all">
          <Smartphone className="mb-4 text-white" size={32} />
          <h3 className="text-xl font-bold text-white">Web-sovellus</h3>
        </button>
        <button onClick={() => handleTypeSelect('ai')} className="group bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-white/30 text-left transition-all">
          <Bot className="mb-4 text-white" size={32} />
          <h3 className="text-xl font-bold text-white">Tekoäly</h3>
        </button>
      </div>
    </div>;
  const renderStep2 = () => {
    let options = [];
    if (selection.type === 'web') {
      options = [{
        id: 'landing',
        title: 'Landing page',
        desc: 'Yhden sivun myyvä kokonaisuus.'
      }, {
        id: 'multipage',
        title: 'Multi page',
        desc: 'Laaja sivusto usealla alasivulla.'
      }, {
        id: 'ai-site',
        title: 'CUSTOM AI-ENABLED PAGE',
        desc: 'Tekoälyllä rikastettu ratkaisu.'
      }];
    } else {
      options = [{
        id: 'mvp',
        title: 'MVP',
        desc: 'Nopea prototyyppi markkinointiin.'
      }, {
        id: 'full',
        title: 'Full Scale',
        desc: 'Täysimittainen tuotantoratkaisu.'
      }];
    }
    return <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="text-center space-y-4">
          <TypewriterTitle text="Tarkennetaan" className="text-3xl md:text-5xl font-bold text-white" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {options.map(opt => <button key={opt.id} onClick={() => handleSubTypeSelect(opt.id)} className="group bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-white/30 text-left transition-all">
              <h3 className="text-xl font-bold text-white mb-2">{opt.title}</h3>
              {opt.desc && <p className="text-gray-400 text-sm">{opt.desc}</p>}
            </button>)}
        </div>
      </div>;
  };
  const renderStep3 = () => <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto">
        <div className="text-center">
            <TypewriterTitle text="Yhteystiedot" className="text-3xl md:text-5xl font-bold text-white" />
        </div>
        <form onSubmit={handleContactSubmit} className="bg-[#111] p-8 rounded-2xl border border-white/10 space-y-4">
            <input required placeholder="Nimi" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" />
            <input required placeholder="Sähköposti" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" />
            <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl">Lähetä</button>
        </form>
    </div>;
  return <div className="min-h-screen flex flex-col relative overflow-hidden bg-black p-6 md:p-12">
        <Spotlight fill="white" />
        
        <FloatingDock onNavigate={dest => {
      if (dest === 'home') onBack();
    }} />

        <div className="w-full max-w-5xl mx-auto mb-12 relative z-10 pt-24">
            <button onClick={() => step === 1 ? onBack() : setStep(step - 1)} className="text-white flex gap-2 items-center hover:text-gray-300 transition-colors">
                <ArrowLeft size={20} /> 
                Takaisin
            </button>
        </div>
        
        <div className="flex-grow flex flex-col justify-center relative z-10">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </div>
    </div>;
};

/**
 * Hero
 */
const Hero = ({
  onStartProject,
  onNavigate
}: {
  onStartProject: () => void;
  onNavigate: (view: string) => void;
}) => {
  return <section id="hero" className="h-[50rem] rounded-[2.5rem] flex flex-col items-start justify-start bg-black antialiased relative overflow-hidden mt-2 sm:mt-4">
      <FloatingDock onNavigate={onNavigate} />
      <Spotlight fill="white" />
      
      <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 30% 70%, #0021ff70 0%, transparent 45%), radial-gradient(circle at 70% 30%, #2201ff70 0%, transparent 45%), linear-gradient(180deg, #000000 0%, #000000 100%)",
      filter: "brightness(0.6)",
      width: "100%",
      height: "100%"
    }} />

      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

      <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-32 md:pt-36 flex flex-col items-start justify-start text-left">
        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-4 leading-tight">
          Sivut jotka <br /> <Cover>ajattelevat.</Cover>
        </h1>
        
        <p className="mt-6 font-normal text-base text-neutral-300 max-w-lg">
          Koe modernin web-kehityksen voima. Rakennamme digitaalisia kokemuksia, jotka eivät vain näytä hyvältä, vaan tuntuvat hyvältä käyttää.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-start items-center mt-8">
          <button onClick={onStartProject} className="px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2 group">
            Aloita projekti
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>;
};

/**
 * WobbleCard
 */
const WobbleCard = ({
  title,
  description,
  image,
  colSpan
}: {
  title: string;
  description: string;
  image: string;
  colSpan: string;
}) => {
  return <div className={`relative group overflow-hidden rounded-2xl bg-black border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] shadow-2xl ${colSpan}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
      
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80 grayscale group-hover:grayscale-0" />
      
      <div className="relative z-20 h-full p-8 flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          {title}
        </h3>
        <p className="text-gray-200 text-sm md:text-base opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
          {description}
        </p>
      </div>
    </div>;
};

/**
 * WobbleCardDemo
 */
const WobbleCardDemo = () => {
  return <section id="wobble" className="relative py-24 px-6 overflow-hidden rounded-t-[2.5rem] bg-black">
      <div className="absolute inset-0 z-0" style={{
      background: "radial-gradient(circle at 70% 80%, #555555 0%, transparent 45%), linear-gradient(180deg, #000000 0%, #000000 100%)",
      filter: "brightness(0.6)",
      width: "100%",
      height: "100%"
    }} />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Palvelumme</h2>
          <p className="text-gray-300 max-w-2xl">
            Tarjoamme kokonaisvaltaisia ratkaisuja liiketoimintasi kasvattamiseen. 
            Koodista designiin, strategiasta toteutukseen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          <WobbleCard colSpan="md:col-span-2" title="Verkkosivut & Web-sovellukset" description="Räätälöidyt React- ja Next.js -ratkaisut, jotka skaalautuvat ja latautuvat salamannopeasti." image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" />
          <WobbleCard colSpan="md:col-span-1" title="UI/UX Suunnittelu" description="Käyttäjäkokemuksen hiomista ja modernia käyttöliittymäsuunnittelua." image="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop" />
          <WobbleCard colSpan="md:col-span-1" title="SEO & Analytiikka" description="Optimointia hakukoneille ja datalla johdettua markkinointia." image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" />
          <WobbleCard colSpan="md:col-span-2" title="Tekoälyratkaisut" description="Räätälöidyt tekoälymallit, prosessien automaatio ja älykäs datan hyödyntäminen liiketoiminnassa." image="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" />
        </div>
      </div>
      
      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
    </section>;
};

/**
 * About
 */
const About = () => {
  return null;
};

/**
 * ContactForm
 */
const ContactForm = () => {
  return <section id="contact" className="relative py-24 px-6">
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Aloitetaan projekti</h2>
        <p className="text-gray-300">Jätä yhteystietosi, niin palaamme asiaan 24 tunnin sisällä.</p>
      </div>
      
      <form className="relative z-10 max-w-2xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Nimi</label>
            <input type="text" className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors backdrop-blur-sm" placeholder="Matti Meikäläinen" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Sähköposti</label>
            <input type="email" className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors backdrop-blur-sm" placeholder="matti@yritys.fi" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Viesti</label>
          <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none backdrop-blur-sm" placeholder="Kerro lyhyesti projektistasi..."></textarea>
        </div>

        <button type="button" className="w-full bg-white text-black font-bold text-lg py-4 rounded-2xl hover:bg-gray-200 transition-all hover:scale-[1.01] active:scale-[0.99]">
          Lähetä viesti
        </button>
      </form>
    </section>;
};

/**
 * Footer
 */
const Footer = () => {
  return <footer id="footer" className="relative pt-24 pb-8 px-6 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-12 space-y-4">
          <h3 className="text-2xl font-semibold text-white">Onko mielessäsi projekti?</h3>
          <p className="text-gray-300 max-w-lg mx-auto">
            Ota yhteyttä ja tehdään visiostasi totta. Vastaamme 24h kuluessa.
          </p>
          <a href="mailto:hello@feim.fi" className="inline-block mt-4 text-white hover:text-gray-300 text-xl font-medium hover:underline decoration-2 underline-offset-4">
            hello@feim.fi
          </a>
        </div>

        <div className="w-full h-px bg-gray-800 mb-12"></div>

        <div className="w-full mb-16 overflow-hidden">
          <TextHoverEffect text="FEIM" />
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
          <p>&copy; {new Date().getFullYear()} Feim Digital Agency. Kaikki oikeudet pidätetään.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Tietosuoja</a>
            <a href="#" className="hover:text-white transition-colors">Ehdot</a>
          </div>
        </div>
      </div>
    </footer>;
};

/**
 * Index
 */
const Index = () => {
  const [view, setView] = useState('home');
  const handleStartProject = () => {
    setView('project');
    window.scrollTo(0, 0);
  };
  const handleNavigateHome = () => {
    setView('home');
    window.scrollTo(0, 0);
  };
  return <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
      {view === 'project' ? <ProjectWizard onBack={handleNavigateHome} onComplete={handleNavigateHome} /> : <div className="flex flex-col">
          
          <div className="flex flex-col gap-24 mb-24">
             <Hero onStartProject={handleStartProject} onNavigate={setView} />
             
             <LogoCarouselDemo />
             
             <WobbleCardDemo />
             
             <ServicesList />
             
             <About />
             
             <ProjectAssistant />
          </div>

          <div className="relative overflow-hidden">
             <div className="absolute inset-0 z-0" style={{
          background: "radial-gradient(circle at 30% 70%, #0021ff70 0%, transparent 45%), radial-gradient(circle at 70% 30%, #2201ff70 0%, transparent 45%), linear-gradient(180deg, #000000 0%, #000000 100%)",
          filter: "brightness(0.6)",
          width: "100%",
          height: "100%"
        }} />
              <div className="relative z-10">
                  <ContactForm />
                  <Footer />
              </div>
          </div>

        </div>}
    </div>;
};
export default Index;