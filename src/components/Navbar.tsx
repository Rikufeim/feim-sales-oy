import React, { useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import feimLogo from "@/assets/feim-logo.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-4 sm:py-6">
      <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16">
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

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5"
          >
            Etusivu
          </Link>
          <div className="relative group">
            <Link
              to="/palvelut"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5 inline-flex items-center gap-1"
            >
              Palvelut
            </Link>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 min-w-[200px] shadow-xl">
                <Link
                  to="/verkkosivut"
                  className="block text-sm text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors"
                >
                  Verkkosivut
                </Link>
                <Link
                  to="/web-sovellukset"
                  className="block text-sm text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors"
                >
                  Web-sovellukset
                </Link>
                <Link
                  to="/prototyypit"
                  className="block text-sm text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors"
                >
                  Prototyypit
                </Link>
              </div>
            </div>
          </div>
          <Link
            to="/referenssit"
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5"
          >
            Referenssit
          </Link>
          <Link
            to="/meista"
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5"
          >
            Meistä
          </Link>
          <Link
            to="/yhteystiedot"
            className="ml-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
          >
            Tilaa vedos
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="lg:hidden flex items-center gap-2 sm:gap-3">
          <Link
            to="/yhteystiedot"
            onClick={() => setIsOpen(false)}
            className="text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-transform duration-200 active:scale-[0.98]"
          >
            Tilaa vedos
          </Link>
          <button
            className="text-neutral-200 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Navigaatiovalikko"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center gap-2 lg:hidden z-50"
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white p-2"
              onClick={() => setIsOpen(false)}
              aria-label="Sulje valikko"
            >
              <X size={28} />
            </button>

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white/80 hover:text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Etusivu
            </Link>
            <Link
              to="/palvelut"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white/80 hover:text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Palvelut
            </Link>
            <Link
              to="/verkkosivut"
              onClick={() => setIsOpen(false)}
              className="text-lg text-white/50 hover:text-white/80 font-medium py-2 px-6 rounded-xl transition-colors"
            >
              Verkkosivut
            </Link>
            <Link
              to="/web-sovellukset"
              onClick={() => setIsOpen(false)}
              className="text-lg text-white/50 hover:text-white/80 font-medium py-2 px-6 rounded-xl transition-colors"
            >
              Web-sovellukset
            </Link>
            <Link
              to="/prototyypit"
              onClick={() => setIsOpen(false)}
              className="text-lg text-white/50 hover:text-white/80 font-medium py-2 px-6 rounded-xl transition-colors"
            >
              Prototyypit
            </Link>
            <Link
              to="/referenssit"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white/80 hover:text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Referenssit
            </Link>
            <Link
              to="/meista"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white/80 hover:text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Meistä
            </Link>
            <Link
              to="/yhteystiedot"
              onClick={() => setIsOpen(false)}
              className="mt-4 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full transition-colors"
            >
              Tilaa vedos
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
