import { Link } from 'react-router-dom';
import feimLogo from '@/assets/feim-logo.png';
import { useTheme } from './ThemeContext';

const TextHoverEffect = ({ text, isDark }: { text: string; isDark: boolean }) => (
  <div className="flex justify-center select-none overflow-hidden py-4">
    <h2 className={`flex text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter transition-colors duration-300 ${isDark ? 'text-white/10' : 'text-black/10'}`}>
      {text.split("").map((letter, index) => (
        <span key={index} className={`inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 cursor-default ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>{letter}</span>
      ))}
    </h2>
  </div>
);

const Footer = () => {
  const { isDark } = useTheme();
  return (
    <footer className={`relative pt-10 sm:pt-24 pb-28 sm:pb-12 px-5 sm:px-6 overflow-hidden border-t ${isDark ? 'border-white/[0.04] bg-black' : 'border-black/[0.08] bg-neutral-100'}`}>
      <div className="relative z-10 max-w-7xl lg:max-w-[90rem] mx-auto">
        {/* Mobile: stacked layout, Desktop: grid */}
        <div className="flex flex-col gap-8 md:grid md:grid-cols-4 md:gap-12 mb-10 sm:mb-16">
          <div className="md:col-span-2">
            <img src={feimLogo} alt="FEIM" className="h-12 sm:h-16 w-auto mb-3 sm:mb-4" />
            <p className={`max-w-sm text-sm sm:text-base leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
              Moderni digitaalinen studio, joka suunnittelee ja toteuttaa premium-verkkosivuja ja digitaalisia kokemuksia yrityksille, jotka haluavat erottua.
            </p>
          </div>
          <div className="flex gap-12 md:contents">
            <div>
              <p className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Palvelut</p>
              <ul className={`space-y-2.5 sm:space-y-3 text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                <li><Link to="/verkkosivut" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Verkkosivut</Link></li>
                <li><Link to="/web-sovellukset" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Web-sovellukset</Link></li>
                <li><Link to="/prototyypit" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Prototyypit</Link></li>
              </ul>
            </div>
            <div>
              <p className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Yritys</p>
              <ul className={`space-y-2.5 sm:space-y-3 text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                <li><Link to="/meista" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Meistä</Link></li>
                <li><Link to="/yhteystiedot" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Yhteystiedot</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden mb-6 sm:mb-8">
          <TextHoverEffect text="FEIM" isDark={isDark} />
        </div>

        <div className={`w-full h-px mb-6 sm:mb-8 ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.08]'}`} />

        <div className={`flex flex-col items-start sm:items-center md:flex-row justify-between text-xs gap-3 sm:gap-4 pr-24 md:pr-0 ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>
          <p>&copy; {new Date().getFullYear()} FEIM Digital Studio</p>
          <div className="flex gap-4 sm:gap-6 flex-wrap">
            <a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Tietosuojaseloste</a>
            <a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Käyttöehdot</a>
            <a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Evästeasetukset</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
