import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import refLujainfra from '@/assets/ref-lujainfra.png';
import refSodergard from '@/assets/ref-sodergard.png';
import salesApp1 from '@/assets/sales-app-1.png';
import salesApp2 from '@/assets/sales-app-2.png';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const categories = [
  {
    title: "Verkkosivut",
    items: [
      { id: 1, name: "Luja Infra", description: "Modernit verkkosivut maarakennusalan yritykselle", image: refLujainfra, url: "https://lujainfra.fi" },
      { id: 2, name: "Restaurointi Södergård", description: "Brändiä tukevat verkkosivut restaurointiyritykselle", image: refSodergard, url: "https://restaurointisodergard.fi" },
    ],
  },
  {
    title: "Web-sovellukset",
    items: [
      { id: 3, name: "FEIM Sales", description: "Myyntityökalu tiimien käyttöön — reaaliaikainen data ja hallintapaneeli", image: salesApp1, url: null },
    ],
  },
  {
    title: "Prototyypit",
    items: [
      { id: 4, name: "FEIM Sales Pro", description: "Kehitetty versio myyntisovelluksesta — prototyypistä tuotteeksi", image: salesApp2, url: null },
    ],
  },
];

const RefCard = ({ item }: { item: { id: number; name: string; description: string; image: string; url: string | null } }) => (
  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 group hover:border-white/20 transition-colors duration-300">
    <div className="p-3 lg:p-4">
      <img src={item.image} alt={item.name} className="w-full h-auto rounded-xl object-contain" loading="lazy" />
    </div>
    <div className="px-4 pb-4 lg:px-5 lg:pb-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg lg:text-xl font-bold text-white">{item.name}</h3>
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <ExternalLink size={16} className="text-white" />
          </a>
        )}
      </div>
      <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
    </div>
  </div>
);

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

    <section className="relative pt-40 md:pt-52 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at 40% 80%, #0021ff15 0%, transparent 45%), #000" }} />
      <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full text-center">
        <FadeIn delay={0.05}>
          <p className="text-sm font-medium text-blue-400/80 tracking-widest uppercase mb-6">Referenssit</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white pb-4 leading-[1.12]">Valikoituja projekteja</h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Jokainen projekti on uniikki kokonaisuus, suunniteltu asiakkaan liiketoimintatavoitteiden pohjalta.
          </p>
        </FadeIn>
      </div>
    </section>

    {categories.map((cat, catIndex) => (
      <section key={cat.title} className="relative py-16 md:py-24 overflow-hidden">
        <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-10">
          <FadeIn delay={0.05}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">{cat.title}</h2>
          </FadeIn>
          <div className={`grid grid-cols-1 ${cat.items.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-6 lg:gap-8`}>
            {cat.items.map((item, i) => (
              <FadeIn key={item.id} delay={0.1 + i * 0.1}>
                <RefCard item={item} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    ))}

    <section className="relative py-24 md:py-32 overflow-hidden">
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
          </div>
        </FadeIn>
      </div>
    </section>

    <Footer />
  </div>
);

export default Referenssit;
