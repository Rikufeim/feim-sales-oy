import React from 'react';
import { ArrowRight, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import ContactCard from '@/components/ContactCard';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const faqCategories = [
  {
    title: "Projekti & hinnoittelu",
    items: [
      { q: "Mitä verkkosivuprojekti maksaa?", a: "Jokainen projekti hinnoitellaan kiinteään hintaan projektin laajuuden perusteella. Landing page -sivujen hinnat alkavat muutamasta sadasta eurosta, ja laajemmat yrityssivustot räätälöidään tarpeen mukaan. Emme käytä tuntilaskutusta — tiedät aina etukäteen, mitä maksat." },
      { q: "Kuinka kauan projekti kestää?", a: "Tyypillinen verkkosivuprojekti valmistuu 2–6 viikossa riippuen laajuudesta. Landing page -sivut voivat valmistua viikossa, laajemmat kokonaisuudet 4–8 viikossa. Prosessimme on suunniteltu nopeaksi ilman laatukompromisseja." },
      { q: "Mitä palveluun sisältyy?", a: "Kaikki projektit sisältävät strategisen kartoituksen, UI/UX-suunnittelun, responsiivisen toteutuksen, SEO-perusoptimoinnin, suorituskykyoptimoinnin ja julkaisun. Jatkuva kehitys ja lisäpalvelut sovitaan erikseen." },
      { q: "Miten maksuton vedos toimii?", a: "Kerrot projektistasi lomakkeella, ja me valmistamme sinulle konkreettisen vedoksen — visuaalisen ehdotuksen tai rakenneluonnoksen. Vedos auttaa hahmottamaan, miltä lopputulos voisi näyttää. Se ei sido sinua mihinkään, mutta antaa selkeän lähtöpisteen yhteistyölle." },
    ]
  },
  {
    title: "Teknologia & toteutus",
    items: [
      { q: "Millä teknologioilla toteutatte projektit?", a: "Käytämme moderneja web-teknologioita: React, TypeScript, Tailwind CSS. Backend-ratkaisuissa hyödynnämme skaalautuvia pilvipalveluja. Teknologiavalinta tehdään aina projektin tarpeiden pohjalta." },
      { q: "Tehdäänkö myös hakukoneoptimointia?", a: "Kyllä. Jokainen sivusto rakennetaan hakukoneystävälliselle pohjalle: semanttinen HTML, optimoidut latausajat, meta-tiedot ja rakenteinen data ovat osa perustoimitusta. Laajempi SEO-strategia sovitaan erikseen." },
      { q: "Toteutetaanko sivut mobiili edellä?", a: "Kyllä. Jokainen sivusto suunnitellaan ja toteutetaan responsiivisesti kaikille laitteille. Mobiilikokemus on meille yhtä tärkeä kuin työpöytäversio — usein jopa tärkeämpi." },
      { q: "Voitteko integroida kolmannen osapuolen palveluja?", a: "Ehdottomasti. Integroime maksu- ja laskutuspalveluja, CRM-järjestelmiä, analytiikkatyökaluja, sähköpostimarkkinointia ja muita API-pohjaisia palveluja projektin tarpeiden mukaan." },
    ]
  },
  {
    title: "Jatkuva yhteistyö",
    items: [
      { q: "Voiko sivustoa kehittää julkaisun jälkeen?", a: "Ehdottomasti. Digitaalinen maailma muuttuu jatkuvasti, ja sivustonne tulisi muuttua sen mukana. Tarjoamme jatkuvan kehityksen palvelua, jossa päivitämme, optimoimme ja laajennamme sivustoanne kuukausittain." },
      { q: "Miten verkkosivusto tukee myyntiä?", a: "Rakennamme sivustot konversiokeskeisesti: selkeät toimintakehotukset, optimoidut käyttäjäpolut ja luottamusta herättävä design ohjaavat kävijöitä kohti yhteydenottoa tai ostopäätöstä." },
      { q: "Tarjoatteko ylläpitopalvelua?", a: "Kyllä. Tarjoamme jatkuvaa teknistä ylläpitoa, tietoturvapäivityksiä, suorituskyvyn monitorointia ja sisältöpäivityksiä. Voit keskittyä liiketoimintaanne — me huolehdimme digitaalisesta puolesta." },
      { q: "Voiko sovellusta laajentaa myöhemmin?", a: "Kyllä. Rakennamme kaikki ratkaisut skaalautuvalle pohjalle. MVP:stä voidaan kasvaa täysimittaiseksi sovellukseksi, ja olemassa oleviin järjestelmiin voidaan lisätä uusia ominaisuuksia joustavasti." },
    ]
  },
];

const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.items.length, 0);

const UKK = () => (
  <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
    <Helmet>
      <title>Usein kysyttyä — FEIM Digital Studio</title>
      <meta name="description" content="Vastauksia yleisimpiin kysymyksiin FEIMin palveluista, hinnoittelusta, prosessista ja teknologioista." />
      <link rel="canonical" href="https://feim.fi/ukk" />
      <meta property="og:title" content="Usein kysyttyä — FEIM Digital Studio" />
      <meta property="og:description" content="Vastauksia verkkosivujen, web-sovellusten ja prototyyppien rakentamiseen liittyviin kysymyksiin." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://feim.fi/ukk" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqCategories.flatMap(cat => cat.items.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a }
        })))
      })}</script>
    </Helmet>

    <nav className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
        <Link to="/" className="text-xl font-bold text-white tracking-wider uppercase drop-shadow-lg">FEIM</Link>
        <div className="hidden lg:flex items-center gap-1">
          <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Etusivu</Link>
          <Link to="/palvelut" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Palvelut</Link>
          <Link to="/prosessi" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Prosessi</Link>
          <Link to="/referenssit" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Referenssit</Link>
          <Link to="/meista" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Meistä</Link>
          <Link to="/yhteystiedot" className="ml-4 text-sm font-semibold text-black bg-white hover:bg-neutral-200 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105">Tilaa vedos</Link>
        </div>
        <Link to="/" className="lg:hidden text-sm text-neutral-400 hover:text-white flex items-center gap-1"><ArrowLeft size={16} /> Takaisin</Link>
      </div>
    </nav>

    {/* Hero — Ultra-compact, utility-focused */}
    <section className="relative pt-32 md:pt-40 pb-8 overflow-hidden">
      <div className="px-6 lg:px-16 max-w-4xl mx-auto relative z-20 w-full">
        <FadeIn delay={0.1}>
          <h1 className="text-3xl md:text-5xl font-bold text-white pb-4 leading-[1.12]">
            Usein kysyttyä
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-2 text-neutral-500 text-base">
            {totalQuestions} vastausta {faqCategories.length} kategoriassa
          </p>
        </FadeIn>
        
        {/* Category jump links */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2 mt-6 pb-8 border-b border-white/[0.06]">
            {faqCategories.map((cat, i) => (
              <a key={i} href={`#faq-cat-${i}`} className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-400 text-sm hover:bg-white/[0.08] hover:text-white transition-all duration-300">
                {cat.title}
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>

    {/* FAQ Categories */}
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-16 relative z-10 space-y-20">
        {faqCategories.map((cat, ci) => (
          <FadeIn key={ci} delay={ci * 0.1}>
            <div id={`faq-cat-${ci}`}>
              <div className="w-12 h-px bg-blue-500/50 mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{cat.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {cat.items.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${ci}-${i}`} className="border-white/[0.06] hover:border-white/[0.12] transition-colors rounded-xl px-2">
                    <AccordionTrigger className="text-white text-left text-lg font-medium py-6 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-400 leading-relaxed pb-6 text-[15px]">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at 50% 50%, #0021ff20 0%, transparent 50%), #000" }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Etkö löytänyt vastausta?</h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10">Ota yhteyttä — vastaamme mielellämme kaikkiin kysymyksiin.</p>
          <Link to="/yhteystiedot" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white hover:bg-neutral-200 text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 group">
            Ota yhteyttä <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="mt-12"><ContactCard /></div>
        </FadeIn>
      </div>
    </section>

    <footer className="relative pt-16 pb-8 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-600 text-sm gap-4">
        <p>&copy; {new Date().getFullYear()} FEIM Digital Studio.</p>
        <Link to="/" className="text-neutral-500 hover:text-white transition-colors">Takaisin etusivulle</Link>
      </div>
    </footer>
  </div>
);

export default UKK;
