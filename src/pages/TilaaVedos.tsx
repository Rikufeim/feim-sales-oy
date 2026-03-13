import React, { useEffect, useState } from 'react';
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useNavbarVisibility } from '@/components/NavbarVisibility';
import { useTheme } from '@/components/ThemeContext';
import feimLogo from '@/assets/feim-logo.png';
import rikuImg from '@/assets/riku-night.jpeg';

const TilaaVedos = () => {
  const { setHidden } = useNavbarVisibility();
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

  const bg = isDark ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f8]';
  const cardBg = isDark ? 'bg-[#111111] border-white/[0.07]' : 'bg-white border-black/[0.07]';
  const headingText = isDark ? 'text-white' : 'text-neutral-900';
  const bodyText = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const inputBg = isDark
    ? 'bg-white/[0.04] border-white/[0.1] text-white placeholder-neutral-600 focus:border-blue-500/50'
    : 'bg-black/[0.02] border-black/[0.1] text-neutral-900 placeholder-neutral-400 focus:border-black/25';
  const dividerColor = isDark ? 'border-white/[0.06]' : 'border-black/[0.06]';
  const accentLine = isDark ? 'bg-blue-500/40' : 'bg-blue-500/30';
  const contactLinkClass = isDark
    ? 'text-neutral-300 hover:text-white transition-colors'
    : 'text-neutral-600 hover:text-neutral-900 transition-colors';

  return (
    <div className={`${bg} min-h-screen font-sans antialiased transition-colors duration-500`}>
      <Helmet>
        <title>Tilaa vedos — FEIM Digital Studio</title>
        <meta name="description" content="Tilaa maksuton vedos verkkosivuistasi tai web-sovelluksestasi. FEIM Digital Studio." />
        <link rel="canonical" href="https://feim.fi/tilaa-vedos" />
      </Helmet>

      {/* Minimal header — only logo */}
      <header className="py-4 sm:py-6">
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

      {/* Main content */}
      <main className="px-4 sm:px-6 lg:px-16 pb-16 sm:pb-24 max-w-7xl mx-auto">
        <div className={`border rounded-2xl sm:rounded-3xl overflow-hidden ${cardBg}`}>
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">

            {/* Left panel — contact info */}
            <div className={`relative p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r ${dividerColor}`}>
              {/* Accent line */}
              <div className={`absolute top-0 left-0 w-[3px] h-full rounded-l-3xl ${accentLine}`} />

              <div className="flex flex-col gap-8">
                <div>
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-white/15 mb-5">
                    <img
                      src={rikuImg}
                      alt="Riku Miettinen"
                      className="w-full h-full object-cover object-[center_15%]"
                    />
                  </div>
                  <p className={`text-lg font-semibold ${headingText}`}>Riku Miettinen</p>
                  <p className={`text-sm mt-1 ${bodyText}`}>Founder, Feim</p>
                </div>

                <div className="flex flex-col gap-4">
                  <a
                    href="tel:+358413282218"
                    className={`flex items-center gap-3 group ${contactLinkClass}`}
                  >
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.05]'}`}>
                      <Phone size={15} />
                    </span>
                    <span className="text-sm">041 328 2218</span>
                  </a>

                  <a
                    href="mailto:riku@feim.fi"
                    className={`flex items-center gap-3 group ${contactLinkClass}`}
                  >
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.05]'}`}>
                      <Mail size={15} />
                    </span>
                    <span className="text-sm">riku@feim.fi</span>
                  </a>

                  <a
                    href="https://wa.me/358413282218"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 group ${isDark ? 'text-green-400/80 hover:text-green-400' : 'text-green-600/80 hover:text-green-700'} transition-colors`}
                  >
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.05]'}`}>
                      <MessageCircle size={15} />
                    </span>
                    <span className="text-sm font-medium">Tilaa WhatsAppilla</span>
                  </a>
                </div>

                <div className={`text-xs leading-relaxed ${bodyText}`}>
                  Vastaan yleensä saman päivän aikana. Vedos on maksuton ja sitoumukseton.
                </div>
              </div>
            </div>

            {/* Right panel — form */}
            <div className="p-8 sm:p-10 lg:p-12">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isDark ? 'bg-green-500/15' : 'bg-green-500/10'}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7 text-green-500">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className={`text-xl font-semibold ${headingText}`}>Viesti lähetetty!</h2>
                  <p className={`text-sm max-w-xs ${bodyText}`}>
                    Otan sinuun yhteyttä pian vedoksen tiimoilta.
                  </p>
                  <Link
                    to="/"
                    className={`mt-2 text-sm font-medium underline underline-offset-4 ${bodyText}`}
                  >
                    Takaisin etusivulle
                  </Link>
                </div>
              ) : (
                <>
                  <h1 className={`text-xl sm:text-2xl font-bold mb-1 ${headingText}`}>
                    Tilaa vedos lomakkeella:
                  </h1>
                  <p className={`text-sm mb-8 ${bodyText}`}>
                    Kuvaa lyhyesti projektisi ja lähetä pyyntö — saat vedoksen nopeasti.
                  </p>

                  <form
                    className="space-y-5"
                    onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className={`text-xs font-medium ${bodyText}`}>
                          Verkkosivujen osoite <span className="text-red-400/70">*</span>
                        </label>
                        <input
                          type="url"
                          placeholder="www.yritys.com"
                          required
                          className={`w-full border rounded-xl px-4 py-3.5 focus:outline-none transition-colors text-sm ${inputBg}`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={`text-xs font-medium ${bodyText}`}>
                          Yritys
                        </label>
                        <input
                          type="text"
                          placeholder="Yrityksen nimi"
                          className={`w-full border rounded-xl px-4 py-3.5 focus:outline-none transition-colors text-sm ${inputBg}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className={`text-xs font-medium ${bodyText}`}>
                          Sähköpostiosoite <span className="text-red-400/70">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="nimi@yritys.fi"
                          required
                          className={`w-full border rounded-xl px-4 py-3.5 focus:outline-none transition-colors text-sm ${inputBg}`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={`text-xs font-medium ${bodyText}`}>
                          Puhelinnumero <span className="text-red-400/70">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+358 40 123 4567"
                          required
                          className={`w-full border rounded-xl px-4 py-3.5 focus:outline-none transition-colors text-sm ${inputBg}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-xs font-medium ${bodyText}`}>
                        Millaisia ongelmia verkkosivuillasi on?
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Sivuillani käy porukkaa, mutta yhteydenottoja ei tule..."
                        className={`w-full border rounded-xl px-4 py-3.5 focus:outline-none transition-colors resize-none text-sm ${inputBg}`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-sm py-4 px-10 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] group"
                      style={{
                        backgroundColor: isDark ? '#ffffff' : '#171717',
                        color: isDark ? '#000000' : '#ffffff',
                      }}
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
