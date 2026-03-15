import React, { useEffect, useState, useMemo, useRef } from 'react';
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

const TilaaVedos = () => {
  const { setHidden } = useNavbarVisibility();
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

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

      {/* Examples section */}
      <VedosExamples formRef={formRef} />

      {/* Main content — form */}
      <main ref={formRef} className="relative z-10 px-4 sm:px-6 lg:px-16 pb-16 sm:pb-24 max-w-7xl mx-auto">
        <div className="border border-white/[0.07] rounded-2xl sm:rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">

            {/* Left panel — contact info */}
            <div className="relative p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
              <div className="absolute top-0 left-0 w-[3px] h-full rounded-l-3xl bg-blue-500/40" />

              <div className="flex flex-col gap-8">
                <div>
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-white/15 mb-5">
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

                <div className="text-xs leading-relaxed text-neutral-400">
                  Vastaan yleensä saman päivän aikana. Vedos on maksuton ja sitoumukseton.
                </div>
              </div>
            </div>

            {/* Right panel — form */}
            <div className="p-8 sm:p-10 lg:p-12">
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
                  <h1 className="text-xl sm:text-2xl font-bold mb-1 text-white">
                    Tilaa vedos lomakkeella:
                  </h1>
                  <p className="text-sm mb-8 text-neutral-400">
                    Kuvaa lyhyesti projektisi ja lähetä pyyntö — saat vedoksen nopeasti.
                  </p>

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

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-400">
                        Millaisia ongelmia verkkosivuillasi on?
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Sivuillani käy porukkaa, mutta yhteydenottoja ei tule..."
                        className="w-full border border-white/[0.1] bg-white/[0.04] rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 transition-colors resize-none text-sm text-white placeholder-neutral-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-sm py-4 px-10 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] bg-white text-black group"
                    >
                      Tilaa vedos
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TilaaVedos;
