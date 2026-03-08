import React from 'react';
import { ArrowRight, CheckCircle2, ArrowLeft, Zap, Shield, TrendingUp, Palette, Code2, Lightbulb, Rocket, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ContactCard from '@/components/ContactCard';

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
            <Link to="/verkkosivut" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5">Verkkosivut</Link>
            <Link to="/web-sovellukset" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5">Web-sovellukset</Link>
            <Link to="/prototyypit" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5">Prototyypit</Link>
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
        <section className="relative min-h-[80vh] flex items-end overflow-hidden pb-20">
          <div className="absolute inset-0 z-0" style={{
            background: "radial-gradient(ellipse at 80% 20%, #0021ff30 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #0021ff15 0%, transparent 50%), #000",
          }} />
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
              
              {/* Trust points / performance metrics on right */}
              <div className="lg:col-span-5">
                <FadeIn delay={0.25}>
                  <div className="grid grid-cols-2 gap-4">
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
        </section>
      )}

      {heroVariant === 'technical' && (
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0" style={{
            background: "radial-gradient(circle at 90% 50%, #0021ff25 0%, transparent 40%), radial-gradient(circle at 10% 90%, #00ff8815 0%, transparent 35%), #000",
          }} />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
          
          <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-32 md:pt-40 pb-20">
            
            <div className="flex items-center gap-3 mb-8">
              <FadeIn delay={0.05}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider uppercase">
                  <Code2 size={14} /> {hero.label}
                </span>
              </FadeIn>
            </div>
            
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white pb-4 leading-[1.08] max-w-5xl">
                {hero.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">{hero.intro}</p>
            </FadeIn>
            
            {/* Tech stack badges */}
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-3 mt-10">
                {(heroTrustPoints || ["React", "TypeScript", "Tailwind", "Skaalautuva"]).map((tech, i) => (
                  <span key={i} className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-sm font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <a href={hero.ctaHref} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-neutral-200 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 group mt-10">
                {hero.cta} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </FadeIn>
          </div>
        </section>
      )}

      {heroVariant === 'creative' && (
        <section className="relative min-h-[65vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0" style={{
            background: "radial-gradient(circle at 50% 100%, #6b21a820 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0021ff20 0%, transparent 40%), #000",
          }} />
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
          
          <div className="px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-32 md:pt-40 pb-20 text-center">
            <FadeIn delay={0.05}>
              <div className="flex items-center justify-center gap-3 mb-8">
                <Lightbulb size={18} className="text-blue-400/60" />
                <p className="text-sm font-medium text-blue-400/80 tracking-widest uppercase">{hero.label}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-500 pb-4 leading-[1.08] max-w-4xl mx-auto">
                {hero.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mx-auto">{hero.intro}</p>
            </FadeIn>
            
            {/* Process steps inline */}
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
                {(heroTrustPoints || ["Idea", "Prototyyppi", "MVP", "Tuote"]).map((step, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <ArrowRight size={14} className="text-neutral-600 hidden sm:block" />}
                    <span className="px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-sm font-medium">
                      {step}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <a href={hero.ctaHref} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-neutral-200 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 group mt-10">
                {hero.cta} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Content Sections */}
      {sections.map((section, i) => (
        <section key={i} className="relative py-24 overflow-hidden">
          <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
            <FadeIn>
              <div className="w-12 h-px bg-blue-500/50 mb-8" />
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
              <div className="w-12 h-px bg-blue-500/50 mb-8" />
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

      {/* Footer */}
      <footer className="relative pt-24 pb-8 px-6 overflow-hidden border-t border-white/[0.04]">
        <div className="relative z-10 max-w-7xl lg:max-w-[90rem] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-neutral-600 text-sm gap-4">
            <p>&copy; {new Date().getFullYear()} FEIM Digital Studio. Kaikki oikeudet pidätetään.</p>
            <Link to="/" className="text-neutral-500 hover:text-white transition-colors">Takaisin etusivulle</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicePageLayout;
