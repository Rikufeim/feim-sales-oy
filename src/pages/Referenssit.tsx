import React from 'react';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactCard from '@/components/ContactCard';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import referenssi1 from '@/assets/referenssi-1.jpeg';
import referenssi2 from '@/assets/referenssi-2.jpeg';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const projects = [
  {
    title: "E-commerce Platform",
    category: "Verkkokauppa • UI/UX • Kehitys",
    desc: "Kokonaisvaltainen verkkokauppakokemus, joka yhdistää viimeistellyn visuaalisen ilmeen ja sujuvan ostopolun.",
    result: "+180% konversioaste",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    details: [
      "Responsiivinen verkkokauppa-alusta",
      "Käyttäjäpolkujen optimointi",
      "Integraatio maksujärjestelmiin",
      "Tuote- ja kategoriahallinta"
    ]
  },
  {
    title: "SaaS Dashboard",
    category: "Web-sovellus • Design System",
    desc: "Datavetoinen hallintapaneeli, jossa monimutkaiset toiminnot yksinkertaistettiin selkeiksi käyttäjäpoluiksi.",
    result: "Modulaarinen design-systeemi",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    details: [
      "Räätälöity design system ja komponenttikirjasto",
      "Reaaliaikainen data-visualisointi",
      "Roolipohjainen käyttöoikeushallinta",
      "API-integraatiot ja automaatiot"
    ]
  },
  {
    title: "Brand Experience",
    category: "Brändi • Verkkosivut • Animaatio",
    desc: "Premium-brändin digitaalinen identiteetti, joka yhdistää elokuvamaisen tarinankerronnan ja teknisen viimeistelyn.",
    result: "3x enemmän sivukäyntejä",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
    details: [
      "Cinematic scroll-animaatiot",
      "Brändi-identiteetin digitaalinen toteutus",
      "Performanssi-optimoitu animaatiokerros",
      "Immersive käyttäjäkokemus"
    ]
  },
];

const Referenssit = () => (
  <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
    <Helmet>
      <title>Referenssit — FEIM Digital Studio</title>
      <meta name="description" content="Tutustu FEIMin valikoituihin projekteihin: verkkosivuja, web-sovelluksia ja digitaalisia kokemuksia kunnianhimoisille yrityksille." />
      <link rel="canonical" href="https://feim.fi/referenssit" />
      <meta property="og:title" content="Referenssit — FEIM Digital Studio" />
      <meta property="og:description" content="Valikoituja projekteja — jokainen suunniteltu asiakkaan liiketoimintatavoitteiden pohjalta." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://feim.fi/referenssit" />
    </Helmet>

    <nav className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
        <Link to="/" className="text-xl font-bold text-white tracking-wider uppercase drop-shadow-lg">FEIM</Link>
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

    {/* Hero */}
    <section className="relative pt-40 md:pt-52 pb-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(circle at 40% 80%, #0021ff15 0%, transparent 45%), #000",
      }} />
      <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            <FadeIn delay={0.05}>
              <p className="text-sm font-medium text-blue-400/80 tracking-widest uppercase mb-6">Referenssit</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white pb-4 leading-[1.12]">
                Valikoituja projekteja
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg text-neutral-400 max-w-xl leading-relaxed">
                Jokainen projekti on uniikki kokonaisuus, suunniteltu asiakkaan liiketoimintatavoitteiden pohjalta.
              </p>
            </FadeIn>
          </div>
          
          {/* Hero images */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <div className="relative overflow-hidden rounded-2xl">
                  <img src={referenssi1} alt="Luja Infra — FEIM projekti" className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="relative overflow-hidden rounded-2xl mt-8 lg:mt-12">
                  <img src={referenssi2} alt="Lambardos — FEIM projekti" className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    {/* Project Cards – large format */}
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10 space-y-32 lg:space-y-40">
        {projects.map((project, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className={`relative overflow-hidden rounded-2xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img src={project.image} alt={project.title} className="w-full h-80 lg:h-[28rem] object-cover opacity-70 hover:opacity-90 transition-opacity duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <p className="text-xs font-medium text-blue-400/60 tracking-wider uppercase mb-4">{project.category}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h2>
                <p className="text-neutral-400 text-lg leading-relaxed mb-6">{project.desc}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8">
                  {project.result}
                </div>
                <div className="space-y-3">
                  {project.details.map((d, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-2 shrink-0" />
                      <p className="text-neutral-300 text-[15px]">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>

    {/* Approach */}
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at 50% 50%, #0021ff15 0%, transparent 50%), #000" }} />
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Jokainen projekti on erilainen</h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-10">
              Emme käytä valmiita malleja. Jokainen ratkaisu suunnitellaan alusta asti asiakkaan brändin, tavoitteiden ja kohderyhmän mukaan.
            </p>
            <Link to="/yhteystiedot" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white hover:bg-neutral-200 text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 group">
              Aloita oma projektisi <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="mt-12"><ContactCard /></div>
          </div>
        </FadeIn>
      </div>
    </section>

    <Footer />
  </div>
);

export default Referenssit;
