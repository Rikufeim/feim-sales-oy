import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { useNavbarVisibility } from "@/components/NavbarVisibility";
import LandingBuilder from "@/components/ui/demo";
import feimLogo from "@/assets/feim-logo.png";

const LandingDemo = () => {
  const { setHidden } = useNavbarVisibility();

  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Landing Demo Builder — FEIM</title>
        <meta
          name="description"
          content="Rakenna nopeasti landing page -raakavedos ja laheta prompti WhatsAppissa."
        />
      </Helmet>

      <header className="relative z-10 py-4 sm:py-6">
        <div className="w-full max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between gap-4">
          <Link to="/" aria-label="FEIM etusivulle">
            <img src={feimLogo} alt="FEIM" className="h-10 sm:h-16 w-auto drop-shadow-lg" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition"
          >
            <ArrowLeft size={16} />
            Takaisin etusivulle
          </Link>
        </div>
      </header>

      <main className="w-full max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 pb-16 sm:pb-24">
        <div className="mb-8 sm:mb-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-blue-300/80">Live mode</p>
          <h1 className="mt-3 text-2xl sm:text-4xl font-bold">Rakenna landing page -raakavedos</h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-neutral-400">
            Tayta perustiedot, katso live-preview ja laheta prompti suoraan WhatsAppiin.
          </p>
        </div>

        <LandingBuilder className="min-h-[620px]" />
      </main>
    </div>
  );
};

export default LandingDemo;
