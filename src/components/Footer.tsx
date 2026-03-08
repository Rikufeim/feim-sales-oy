import { Link } from 'react-router-dom';
import feimLogo from '@/assets/feim-logo.png';

const TextHoverEffect = ({ text }: { text: string }) => (
  <div className="flex justify-center select-none overflow-hidden py-4">
    <h2 className="flex text-6xl md:text-9xl font-black tracking-tighter text-white/10 transition-colors duration-300">
      {text.split("").map((letter, index) => (
        <span key={index} className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:text-white cursor-default">{letter}</span>
      ))}
    </h2>
  </div>
);

const Footer = () => (
  <footer className="relative pt-24 pb-8 px-6 overflow-hidden border-t border-white/[0.04]">
    <div className="relative z-10 max-w-7xl lg:max-w-[90rem] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <img src={feimLogo} alt="FEIM" className="h-8 w-auto mb-4" />
          <p className="text-neutral-500 max-w-sm leading-relaxed">
            Moderni digitaalinen studio, joka suunnittelee ja toteuttaa premium-verkkosivuja ja digitaalisia kokemuksia yrityksille, jotka haluavat erottua.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">Palvelut</p>
          <ul className="space-y-3 text-neutral-500 text-sm">
            <li><Link to="/verkkosivut" className="hover:text-white transition-colors">Verkkosivut</Link></li>
            <li><Link to="/web-sovellukset" className="hover:text-white transition-colors">Web-sovellukset</Link></li>
            <li><Link to="/prototyypit" className="hover:text-white transition-colors">Prototyypit</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">Yritys</p>
          <ul className="space-y-3 text-neutral-500 text-sm">
            <li><Link to="/meista" className="hover:text-white transition-colors">Meistä</Link></li>
            <li><Link to="/yhteystiedot" className="hover:text-white transition-colors">Yhteystiedot</Link></li>
          </ul>
        </div>
      </div>

      <div className="w-full overflow-hidden mb-8">
        <TextHoverEffect text="FEIM" />
      </div>

      <div className="w-full h-px bg-white/[0.06] mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-center text-neutral-600 text-sm gap-4">
        <p>&copy; {new Date().getFullYear()} FEIM Digital Studio. Kaikki oikeudet pidätetään.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Tietosuojaseloste</a>
          <a href="#" className="hover:text-white transition-colors">Käyttöehdot</a>
          <a href="#" className="hover:text-white transition-colors">Evästeasetukset</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
