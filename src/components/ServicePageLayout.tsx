import React from 'react';
import { ArrowRight, CheckCircle2, ArrowLeft, Zap, Shield, TrendingUp, Palette, Code2, Lightbulb, Rocket, Target } from 'lucide-react';
import { MeshGradient } from "@paper-design/shaders-react";
import HeroBackground from '@/components/HeroBackground';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ContactCard from '@/components/ContactCard';

import Footer from '@/components/Footer';
import feimLogo from '@/assets/feim-logo.png';
import { useTheme } from './ThemeContext';

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
  const { isDark } = useTheme();

  // Theme-aware classes
  const bg = isDark ? 'bg-black' : 'bg-white';
  const selection = isDark ? 'selection:bg-white/30 selection:text-white' : 'selection:bg-black/10 selection:text-black';
  const navText = isDark ? 'text-neutral-400 hover:text-white hover:bg-white/5' : 'text-neutral-500 hover:text-black hover:bg-black/5';
  const dropdownBg = isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-black/10';
  const dropdownItem = isDark ? 'text-neutral-300 hover:text-white hover:bg-white/5' : 'text-neutral-600 hover:text-black hover:bg-black/5';
  const ctaBtnPrimary = isDark ? 'bg-white hover:bg-neutral-200 text-black' : 'bg-black hover:bg-neutral-800 text-white';
  const ctaBtnSecondary = isDark ? 'text-white bg-white/[0.06] border-white/[0.1] hover:bg-white/[0.1]' : 'text-neutral-900 bg-black/[0.05] border-black/[0.1] hover:bg-black/[0.1]';
  const heroBtnStyle = isDark
    ? 'bg-white hover:bg-neutral-200 text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]'
    : 'bg-black hover:bg-neutral-800 text-white hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]';
  const fadeGradient = isDark ? 'from-black via-black' : 'from-white via-white';
  const labelColor = isDark ? 'text-blue-400/80' : 'text-neutral-500';
  const headingGrad = isDark ? 'from-neutral-50 to-neutral-400' : 'from-neutral-900 to-neutral-500';
  const introText = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const iconColor = isDark ? 'text-blue-400/70' : 'text-neutral-400';
  const trustText = isDark ? 'text-white' : 'text-neutral-700';
  const sectionHeading = isDark ? 'text-white' : 'text-neutral-900';
  const sectionDesc = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const bulletIcon = isDark ? 'text-blue-500/70' : 'text-neutral-400';
  const bulletText = isDark ? 'text-neutral-300' : 'text-neutral-600';
  const cardBg = isDark ? 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]' : 'bg-black/[0.02] border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.12]';
  const radialBg = isDark ? 'radial-gradient(circle at 50% 50%, #0021ff15 0%, transparent 50%), #000' : 'radial-gradient(circle at 50% 50%, #00000008 0%, transparent 50%), #fff';
  const mobileBack = isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black';
  const tilaaVedosBtn = isDark ? 'text-black bg-white hover:bg-neutral-200' : 'text-white bg-black hover:bg-neutral-800';

  return (
    <div className={`${bg} min-h-screen font-sans antialiased ${selection} transition-colors duration-500`}>
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
      {/* Hero */}
      <HeroBackground className="!min-h-screen flex items-end pb-20">
        <div className={`absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t ${fadeGradient} to-transparent z-20 pointer-events-none`} />
        
        <div className="px-4 sm:px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-24 sm:pt-32 md:pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <FadeIn delay={0.05}>
                <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${labelColor}`}>{hero.label}</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b ${headingGrad} pb-4 leading-[1.08]`}>
                  {hero.title}
                </h1>
              </FadeIn>
              {hero.intro && (
                <FadeIn delay={0.2}>
                  <p className={`mt-8 text-lg md:text-xl max-w-xl leading-relaxed ${introText}`}>{hero.intro}</p>
                </FadeIn>
              )}
              {hero.cta && (
                <FadeIn delay={0.3}>
                  <a href={hero.ctaHref} className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-full transition-all duration-300 hover:scale-105 group mt-10 ${heroBtnStyle}`}>
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
                        <Icon size={18} className={`${iconColor} shrink-0`} />
                        <p className={`text-sm font-medium ${trustText}`}>{point}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </HeroBackground>

      {/* Content Sections */}
      {sections.map((section, i) => (
        <section key={i} className="relative py-14 sm:py-24 overflow-hidden">
          <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
            <FadeIn>
              <h2 className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 max-w-3xl ${sectionHeading}`}>{section.title}</h2>
              {section.description && (
                <p className={`text-lg max-w-2xl mb-10 leading-relaxed ${sectionDesc}`}>{section.description}</p>
              )}
            </FadeIn>
            {section.bullets && (
              <FadeIn delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                  {section.bullets.map((bullet, j) => (
                    <div key={j} className="flex items-start gap-3 py-3">
                      <CheckCircle2 size={18} className={`${bulletIcon} mt-0.5 shrink-0`} />
                      <p className={`text-[15px] leading-relaxed ${bulletText}`}>{bullet}</p>
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
          <div className="absolute inset-0 z-0" style={{ background: radialBg }} />
          <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
            <FadeIn>
              <h2 className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-10 max-w-3xl ${sectionHeading}`}>{audience.title}</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audience.items.map((item, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className={`border rounded-2xl p-8 transition-all duration-500 ${cardBg}`}>
                    <CheckCircle2 size={20} className={`${bulletIcon} mb-4`} />
                    <p className={`leading-relaxed ${bulletText}`}>{item}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: radialBg }} />
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10 text-center">
          <FadeIn>
            <h2 className={`text-3xl md:text-6xl font-bold mb-6 ${sectionHeading}`}>{cta.title}</h2>
            <p className={`text-lg max-w-xl mx-auto mb-10 ${sectionDesc}`}>{cta.description}</p>
            <a href={cta.buttonHref} className="inline-flex items-center justify-center gap-2 px-10 py-5 font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 group" style={{ backgroundColor: isDark ? '#ffffff' : '#171717', color: isDark ? '#000000' : '#ffffff' }}>
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
