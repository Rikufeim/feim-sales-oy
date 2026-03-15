import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Phone, Mail, MessageCircle, Paperclip } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavbarVisibility } from '@/components/NavbarVisibility';
import VedosExamples from '@/components/VedosExamples';
import feimLogo from '@/assets/feim-logo.png';
import rikuImg from '@/assets/riku-night.jpeg';

/* ─── Animated background stars ─── */
const StarField = () => {
  const stars = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Nebula glow */}
      <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }} />
      <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />

      {/* Stars */}
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `star-pulse ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Gradient overlays for blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40" />
    </div>
  );
};

interface VedosFormSectionProps {
  formRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  showHeading?: boolean;
  compact?: boolean;
}

const serviceOptions = [
  { id: 'verkkosivut', title: 'Verkkosivut' },
  { id: 'web-sovellus', title: 'Web-sovellus' },
  { id: 'prototyyppi', title: 'Prototyyppi' },
];

const VedosFormSection = ({ formRef, className, showHeading = true, compact = false }: VedosFormSectionProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <main ref={formRef} className={`relative z-10 px-4 sm:px-6 lg:px-16 pb-16 sm:pb-24 max-w-7xl mx-auto ${className ?? ''}`}>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
          {/* Left panel — contact info */}
          <div className={`relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-[linear-gradient(145deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.006)_26%,rgba(80,80,80,0.10)_55%,rgba(255,255,255,0.012)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(255,255,255,0.02)] ${compact ? 'p-6 sm:p-7 lg:p-8' : 'p-8 sm:p-10 lg:p-12'}`}>
            <div className="absolute top-0 left-0 w-[3px] h-full rounded-l-3xl overflow-hidden pointer-events-none">
              <motion.div
                className="absolute inset-0 bg-blue-500/20"
                animate={{ opacity: [0.22, 0.34, 0.22] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-300/85 to-transparent blur-[0.5px]"
                animate={{ y: ['-120%', '120%'], opacity: [0.35, 0.9, 0.35] }}
                transition={{ duration: 6.2, ease: 'easeInOut', repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/75 to-transparent"
                animate={{ y: ['120%', '-120%'], opacity: [0.2, 0.55, 0.2] }}
                transition={{ duration: 8.6, ease: 'easeInOut', repeat: Infinity }}
              />
            </div>
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_82%_86%,rgba(70,70,70,0.24),transparent_52%)]" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/8 to-black/52" />
            <div className="absolute inset-y-0 right-0 w-14 pointer-events-none bg-gradient-to-l from-black/45 to-transparent" />

            <div className="relative z-10 flex flex-col gap-8">
              <div>
                <div className={`${compact ? 'w-24 h-24 mb-4' : 'w-32 h-32 mb-5'} rounded-full overflow-hidden ring-2 ring-white/15`}>
                  <img
                    src={rikuImg}
                    alt="Riku Miettinen"
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                </div>
                <p className="text-lg font-semibold text-white">Riku Miettinen</p>
                <p className="text-sm mt-1 text-neutral-400">Founder, Feim</p>
              </div>

              <div className="flex flex-col gap-4">
                <a href="tel:+358413282218" className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.06]">
                    <Phone size={15} />
                  </span>
                  <span className="text-sm">041 328 2218</span>
                </a>

                <a href="mailto:riku@feim.fi" className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.06]">
                    <Mail size={15} />
                  </span>
                  <span className="text-sm">riku@feim.fi</span>
                </a>

                <a
                  href="https://wa.me/358413282218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-green-400/80 hover:text-green-400 transition-colors"
                >
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.06]">
                    <MessageCircle size={15} />
                  </span>
                  <span className="text-sm font-medium">Tilaa WhatsAppilla</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right panel — form */}
          <div className={compact ? 'p-6 sm:p-7 lg:p-8' : 'p-8 sm:p-10 lg:p-12'}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-green-500/15">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7 text-green-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Viesti lähetetty!</h2>
                <p className="text-sm max-w-xs text-neutral-400">
                  Otan sinuun yhteyttä pian vedoksen tiimoilta.
                </p>
                <Link to="/" className="mt-2 text-sm font-medium underline underline-offset-4 text-neutral-400">
                  Takaisin etusivulle
                </Link>
              </div>
            ) : (
              <>
                {showHeading && (
                  <>
                    <h1 className="text-xl sm:text-2xl font-bold mb-1 text-white">
                      Tilaa vedos lomakkeella:
                    </h1>
                    <p className="text-sm mb-8 text-neutral-400">
                      Kuvaa lyhyesti projektisi ja lähetä pyyntö — saat vedoksen nopeasti.
                    </p>
                  </>
                )}

                <form
                  className="space-y-5"
                  onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-400">
                        Verkkosivujen osoite <span className="text-red-400/70">*</span>
                      </label>
                      <input
                        type="url"
                        placeholder="www.yritys.com"
                        required
                        className="w-full border border-white/[0.1] bg-white/[0.04] rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 transition-colors text-sm text-white placeholder-neutral-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-400">Yritys</label>
                      <input
                        type="text"
                        placeholder="Yrityksen nimi"
                        className="w-full border border-white/[0.1] bg-white/[0.04] rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 transition-colors text-sm text-white placeholder-neutral-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-400">
                        Sähköpostiosoite <span className="text-red-400/70">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="nimi@yritys.fi"
                        required
                        className="w-full border border-white/[0.1] bg-white/[0.04] rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 transition-colors text-sm text-white placeholder-neutral-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-400">
                        Puhelinnumero <span className="text-red-400/70">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+358 40 123 4567"
                        required
                        className="w-full border border-white/[0.1] bg-white/[0.04] rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 transition-colors text-sm text-white placeholder-neutral-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-medium text-neutral-400">
                      Mitä tarvitset?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {serviceOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedService(option.id)}
                          className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border ${
                            selectedService === option.id
                              ? 'bg-white/[0.02] border-blue-500/45 text-white'
                              : 'bg-white/[0.02] border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/[0.15]'
                          }`}
                        >
                          {option.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-400">
                        Kerro projektistasi
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Kerro lyhyesti, mitä haluaisit rakentaa ja mitä tavoitteita projektillasi on."
                        className="w-full border border-white/[0.1] bg-white/[0.04] rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 transition-colors resize-none text-sm text-white placeholder-neutral-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-400">
                        Liitetiedosto <span className="text-neutral-600">(valinnainen)</span>
                      </label>
                      <label className="block border-2 border-dashed border-white/[0.12] rounded-xl px-4 py-7 text-center transition-colors cursor-pointer hover:bg-white/[0.02]">
                        <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className="hidden" />
                        <Paperclip size={20} className="mx-auto mb-2 text-neutral-400" />
                        <p className="text-sm font-medium text-white">Valitse tiedosto</p>
                        <p className="text-xs mt-1 text-neutral-400">PDF, DOC, PNG, JPG</p>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center font-bold text-sm py-4 px-10 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] bg-white text-black"
                  >
                    Tilaa vedos
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const TilaaVedos = () => {
  const { setHidden } = useNavbarVisibility();
  const bottomFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

  return (
    <div className="bg-black min-h-screen font-sans antialiased relative">
      <Helmet>
        <title>Tilaa vedos — FEIM Digital Studio</title>
        <meta name="description" content="Tilaa maksuton vedos verkkosivuistasi tai web-sovelluksestasi. FEIM Digital Studio." />
        <link rel="canonical" href="https://feim.fi/tilaa-vedos" />
      </Helmet>

      <StarField />

      {/* Minimal header */}
      <header className="relative z-10 py-4 sm:py-6">
        <div className="w-full max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16">
          <Link to="/" aria-label="FEIM etusivulle">
            <img
              src={feimLogo}
              alt="FEIM"
              className="h-10 sm:h-16 w-auto drop-shadow-lg"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </Link>
        </div>
      </header>

      {/* Main content — form */}
      <VedosFormSection compact className="mt-10 sm:mt-14 max-w-6xl" />

      {/* Examples section */}
      <VedosExamples formRef={bottomFormRef} />

      {/* Bottom form */}
      <VedosFormSection formRef={bottomFormRef} showHeading={false} />
    </div>
  );
};

export default TilaaVedos;
