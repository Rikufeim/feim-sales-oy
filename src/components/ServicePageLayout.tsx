import React from 'react';
import { ArrowRight, CheckCircle2, ArrowLeft, Zap, Shield, TrendingUp, Palette, Code2, Lightbulb, Rocket, Target } from 'lucide-react';
import { MeshGradient } from "@paper-design/shaders-react";
import HeroBackground from '@/components/HeroBackground';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ContactCard from '@/components/ContactCard';
import Footer from '@/components/Footer';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

interface ServiceSection {
  title: string;
  description?: string;
  bullets?: string[];
}

interface ServicePageProps {
  seo: {
    title: string;
    description: string;
    url: string;
  };
  hero: {
    label: string;
    title: string;
    intro: string;
    cta: string;
    ctaHref: string;
  };
  heroVariant?: 'commercial' | 'technical' | 'creative';
  heroTrustPoints?: string[];
  sections: ServiceSection[];
  audience?: {
    title: string;
    items: string[];
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  pricingSlot?: React.ReactNode;
}

const ServicePageLayout: React.FC<ServicePageProps> = ({ seo, hero, heroVariant = 'commercial', heroTrustPoints, sections, audience, cta, pricingSlot }) => {
  return (
    <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.url} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.url} />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="FEIM Digital Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": seo.title,
          "description": seo.description,
          "url": seo.url,
          "provider": {
            "@type": "Organization",
            "name": "FEIM Digital Studio",
            "url": "https://feim.fi"
          }
        })}</script>
      </Helmet>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 py-6">
        <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
          <Link to="/" className="text-xl font-bold text-white tracking-wider uppercase drop-shadow-lg">FEIM</Link>
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
            <Link to="/yhteystiedot" className="ml-4 text-sm font-semibold text-black bg-white hover:bg-neutral-200 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105">Tilaa vedos</Link>
          </div>
          <Link to="/" className="lg:hidden text-sm font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft size={16} /> Takaisin
          </Link>
        </div>
      </nav>

      {/* Hero — variant-based */}
      {heroVariant === 'commercial' && (
        <HeroBackground className="!min-h-screen flex items-end pb-20">
           <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black to-transparent z-20 pointer-events-none" />
          
          <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-32 md:pt-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <FadeIn delay={0.05}>
                  <p className="text-sm font-medium text-blue-400/80 tracking-widest uppercase mb-6">{hero.label}</p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-4 leading-[1.08]">
                    {hero.title}
                  </h1>
                </FadeIn>
                {hero.intro && (
                  <FadeIn delay={0.2}>
                    <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed">{hero.intro}</p>
                  </FadeIn>
                )}
                {hero.cta && (
                  <FadeIn delay={0.3}>
                    <a href={hero.ctaHref} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-neutral-200 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] group mt-10">
                      {hero.cta} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </FadeIn>
                )}
              </div>
              
              <div className="lg:col-span-5">
                <FadeIn delay={0.25}>
                  <div className="space-y-4">
                    {(heroTrustPoints || [
                      "Nopeus & suorituskyky",
                      "SEO-optimoitu",
                      "Konversio-suunnittelu",
                      "Premium design"
                    ]).map((point, i) => {
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
                          <Icon size={18} className="text-blue-400/70 shrink-0" />
                          <p className="text-white text-sm font-medium">{point}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </HeroBackground>
      )}

      {(heroVariant === 'technical' || heroVariant === 'creative') && (
        <HeroBackground className="!min-h-screen flex items-end pb-20">
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
          
          <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-32 md:pt-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <FadeIn delay={0.05}>
                  <p className="text-sm font-medium text-blue-400/80 tracking-widest uppercase mb-6">{hero.label}</p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-4 leading-[1.08]">
                    {hero.title}
                  </h1>
                </FadeIn>
                {hero.intro && (
                  <FadeIn delay={0.2}>
                    <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed">{hero.intro}</p>
                  </FadeIn>
                )}
                {hero.cta && (
                  <FadeIn delay={0.3}>
                    <a href={hero.ctaHref} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-neutral-200 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] group mt-10">
                      {hero.cta} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </FadeIn>
                )}
              </div>
              
              <div className="lg:col-span-5">
                <FadeIn delay={0.25}>
                  <div className="space-y-4">
                    {(heroTrustPoints || []).map((point, i) => {
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
                          <Icon size={18} className="text-blue-400/70 shrink-0" />
                          <p className="text-white text-sm font-medium">{point}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </HeroBackground>
      )}

      {/* Content Sections */}
      {sections.map((section, i) => (
        <section key={i} className="relative py-24 overflow-hidden">
          <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl">{section.title}</h2>
              {section.description && (
                <p className="text-neutral-400 text-lg max-w-2xl mb-10 leading-relaxed">{section.description}</p>
              )}
            </FadeIn>
            {section.bullets && (
              <FadeIn delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                  {section.bullets.map((bullet, j) => (
                    <div key={j} className="flex items-start gap-3 py-3">
                      <CheckCircle2 size={18} className="text-blue-500/70 mt-0.5 shrink-0" />
                      <p className="text-neutral-300 text-[15px] leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        </section>
      ))}

      {/* Pricing Slot */}
      {pricingSlot}

      {/* Audience */}
      {audience && (
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 z-0" style={{
            background: "radial-gradient(circle at 50% 50%, #0021ff15 0%, transparent 50%), #000"
          }} />
          <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
            <FadeIn>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 max-w-3xl">{audience.title}</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audience.items.map((item, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500">
                    <CheckCircle2 size={20} className="text-blue-500/70 mb-4" />
                    <p className="text-neutral-300 leading-relaxed">{item}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: "radial-gradient(circle at 50% 50%, #0021ff20 0%, transparent 50%), #000"
        }} />
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">{cta.title}</h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10">{cta.description}</p>
            <a href={cta.buttonHref} className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white hover:bg-neutral-200 text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] group">
              {cta.buttonText} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="mt-12"><ContactCard /></div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePageLayout;
