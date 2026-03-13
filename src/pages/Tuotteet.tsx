import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShoppingBag, Zap, Clock, Users, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import { useTheme } from '@/components/ThemeContext';

/* ─── Shared FadeIn ─── */

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

/* ─── Product Data ─── */

type Product = {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  price: number;
  category: string;
  tag: string;
  includes: string[];
  audience: string[];
  benefits: string[];
};

const products: Product[] = [
  {
    id: 'myyntipromptit-pro',
    name: 'Myyntipromptit Pro',
    shortDesc: 'Testatut ja optimoidut promptit, jotka tekevät myyntiprosessista tehokkaamman ja skaalautuvamman.',
    longDesc: 'Kokoelma yli 50 valmiiksi viimeisteltyä myyntipromptiä, jotka kattavat koko myyntisyklin: prospektoinnista tarjouksen viimeistelyyn. Jokainen prompt on testattu oikeissa myyntitilanteissa.',
    price: 49,
    category: 'myynti',
    tag: 'Prompt-paketti',
    includes: ['50+ myyntipromptiä', 'Kylmäviesti-templateja', 'Tarjouspohja-promptit', 'Follow-up -rakenteet', 'Ohjevideo käyttöön'],
    audience: ['B2B-myyjät', 'Yrittäjät', 'Myyntitiimit'],
    benefits: ['Nopeuta tarjousten tekemistä', 'Paranna viestien vastausprosenttia', 'Yhtenäistä myyntikommunikaatio'],
  },
  {
    id: 'sisaltopaketti-somelle',
    name: 'Sisältöpaketti somelle',
    shortDesc: 'Valmiit prompt-rakenteet LinkedIn- ja some-sisältöihin — viikkojen sisällöt minuuteissa.',
    longDesc: 'Systemaattinen sisällöntuotannon prompt-paketti, jolla luot viikkoja eteenpäin sisältöä LinkedIniin, Instagramiin ja muihin kanaviin. Sisältää erilaiset sisältötyypit ja rakenteet.',
    price: 39,
    category: 'markkinointi',
    tag: 'Prompt-paketti',
    includes: ['30+ sisältöpromptiä', 'LinkedIn-postausrakenteet', 'Instagram-caption-templateja', 'Sisältökalenteri-pohja', 'Hook-kirjasto'],
    audience: ['Markkinoijat', 'Yrittäjät', 'Sisällöntuottajat'],
    benefits: ['Säästä tunteja sisällöntuotannossa', 'Pidä julkaisutahti tasaisena', 'Paranna sisältöjen laatua'],
  },
  {
    id: 'ai-markkinointi-bundle',
    name: 'AI-markkinoinnin prompt bundle',
    shortDesc: 'Laaja kokoelma markkinoinnin prompteja: kampanjat, copy, strategia ja analytiikka.',
    longDesc: 'Kattava markkinoijan prompt-arsenaaali, joka sisältää kampanjasuunnittelun, copywriting-promptit, strategiset analyysit ja tulosten mittaamisen. Yksi paketti, jolla hallitset koko markkinoinnin.',
    price: 79,
    category: 'markkinointi',
    tag: 'Prompt-paketti',
    includes: ['80+ markkinointipromptiä', 'Kampanjasuunnittelu-promptit', 'Copywriting-rakenteet', 'Kilpailija-analyysi-promptit', 'ROI-laskelmapohjat'],
    audience: ['Markkinointipäälliköt', 'Growth-tiimit', 'Digimarkkinoijat'],
    benefits: ['Nopeuta kampanjoiden suunnittelua', 'Paranna mai	higher quality copy', 'Tee dataan perustuvia päätöksiä'],
  },
  {
    id: 'tarjouspyynto-vastauspohjat',
    name: 'Tarjouspyyntöjen vastauspohjat',
    shortDesc: 'Ammattimaisia vastauspohjia tarjouspyyntöihin — vakuuttavasti ja johdonmukaisesti.',
    longDesc: 'Kokoelma valmiita tarjouspyyntövastausten rakenteita ja prompteja, jotka auttavat sinua vastaamaan ammattimaisesti ja erottumaan kilpailijoista jokaisessa tarjouspyynnössä.',
    price: 29,
    category: 'myynti',
    tag: 'Template',
    includes: ['15+ vastauspohjaa', 'Eri toimialojen templateja', 'Hinnoittelun esthis-rakenteet', 'Referenssien esittelytavat', 'Seurantaviesti-pohjat'],
    audience: ['Myyntipäälliköt', 'Tarjouslaskijat', 'Yrittäjät'],
    benefits: ['Nopeuta tarjousprosessia', 'Yhdenmukaista tarjousten laatu', 'Voita enemmän tarjouskilpailuja'],
  },
  {
    id: 'asiakashankinnan-prompt-kirjasto',
    name: 'Asiakashankinnan prompt-kirjasto',
    shortDesc: 'Systemaattinen prompt-kokoelma uusasiakashankintaan ja prospektointiin.',
    longDesc: 'Kaikki mitä tarvitset tehokkaaseen asiakashankintaan: kohderyhmien tunnistamisesta ensikontaktiin ja tapaamisen sopimiseen. Automtisoi ja systematisoi koko asiakash    hankintaprosessi.',
    price: 59,
    category: 'myynti',
    tag: 'Prompt-paketti',
    includes: ['40+ hankintapromptiä', 'ICP-määrittely-p promptit', 'Outreach-sekvenssit', 'LinkedIn-prospektointi', 'Tapaamisten sopiminen'],
    audience: ['SDR:t ja BDR:t', 'Myyntijohtajat', 'Kasvuyritykset'],
    benefits: ['Löydä oikeat prospektit nopeammin', 'Paranna konversioita', 'Skaalaa asiakashankinta'],
  },
  {
    id: 'liidien-kvalifiointi-ai',
    name: 'Liidien kvalifiointi AI:lla',
    shortDesc: 'Promptit ja rakenteet liidien pisteyttämiseen, kvalifiointiin ja priorisointiin.',
    longDesc: 'Älykäs prompt-paketti, joka auttaa kvalifioimaan liidit systemaattisesti tekoälyllä. Pisteytä, priorisoi ja ohjaa liidit oikeille myyjille automaattisesti.',
    price: 45,
    category: 'automaatio',
    tag: 'AI-työkalu',
    includes: ['Liidien pisteytys-promptit', 'BANT-kvalifiointi-rakenteet', 'Automaattinen priorisointi', 'CRM-integraatio-ohjeet', 'Raportointi-promptit'],
    audience: ['Myyntitiimit', 'RevOps', 'Kasvuyritykset'],
    benefits: ['Keskity oikeisiin liideihin', 'Säästä myyjien aikaa', 'Paranna hit ratea'],
  },
];

const categories = [
  { id: 'kaikki', label: 'Kaikki tuotteet' },
  { id: 'myynti', label: 'Myynti' },
  { id: 'markkinointi', label: 'Markkinointi' },
  { id: 'automaatio', label: 'Automaatio' },
];

const faqData = [
  { q: 'Mitä digituote sisältää?', a: 'Jokainen tuote sisältää valmiiksi kirjoitettuja ja testattuja prompteja, templateja tai työkalurakenteita, jotka voit ottaa käyttöön heti. Lisäksi saat ohjeet ja esimerkit siitä, miten tuotetta käytetään tehokkaasti.' },
  { q: 'Miten toimitus tapahtuu?', a: 'Saat tuotteen sähköpostiisi heti maksun jälkeen. Tuotteet toimitetaan PDF- ja/tai Notion-muodossa, ja ne ovat heti käytettävissä.' },
  { q: 'Saanko tuotteen heti maksun jälkeen?', a: 'Kyllä. Toimitus on täysin automaattinen — tuote on sähköpostissasi muutamassa sekunnissa maksun jälkeen.' },
  { q: 'Voiko tuotteita käyttää omassa liiketoiminnassa?', a: 'Ehdottomasti. Kaikki tuotteet on suunniteltu käytettäviksi omassa liiketoiminnassasi. Voit muokata ja soveltaa niitä vapaasti — ainoa rajoitus on jälleenmyynti.' },
  { q: 'Tarvitsenko AI-osaamista käyttääkseni näitä?', a: 'Et tarvitse. Jokainen tuote sisältää selkeät ohjeet ja esimerkit. Jos osaat käyttää ChatGPT:tä, Claude:a tai vastaavaa, pääset alkuun heti.' },
];

const trustFeatures = [
  { icon: Clock, title: 'Säästä aikaa', desc: 'Valmis rakenne käyttöön minuuteissa — ei tarvetta aloittaa tyhjästä.' },
  { icon: Zap, title: 'Nopeuta työnkulkuja', desc: 'Testatut promptit ja templateja, jotka virtaviivaistavat päivittäistä tekemistä.' },
  { icon: CheckCircle2, title: 'Testattuja rakenteita', desc: 'Jokainen tuote on käyty läpi oikeissa projekteissa ja myyntitilanteissa.' },
  { icon: Users, title: 'Sopii kaikille', desc: 'Yrittäjille, myyjille, markkinoijille ja tiimeille — toimialasta riippumatta.' },
];

/* ─── Product Detail Modal ─── */

const ProductModal = ({ product, onClose, isDark }: { product: Product; onClose: () => void; isDark: boolean }) => {
  const overlay = isDark ? 'bg-black/80' : 'bg-black/50';
  const modalBg = isDark ? 'bg-neutral-950 border-white/[0.08]' : 'bg-white border-black/[0.08]';
  const heading = isDark ? 'text-white' : 'text-neutral-900';
  const body = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const tagBg = isDark ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'bg-neutral-100 text-neutral-600 border-neutral-200';
  const listBg = isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-neutral-50 border-neutral-100';
  const checkColor = isDark ? 'text-blue-400/70' : 'text-neutral-400';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[100] ${overlay} backdrop-blur-sm flex items-center justify-center p-4`}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border p-6 sm:p-10 ${modalBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDark ? 'text-neutral-500 hover:text-white hover:bg-white/5' : 'text-neutral-400 hover:text-black hover:bg-black/5'}`}
          aria-label="Sulje"
        >
          <X size={20} />
        </button>

        <span className={`inline-block text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full border mb-4 ${tagBg}`}>
          {product.tag}
        </span>

        <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${heading}`}>{product.name}</h2>
        <p className={`text-lg mb-6 ${body}`}>{product.longDesc}</p>

        <div className={`rounded-xl border p-5 sm:p-6 mb-6 ${listBg}`}>
          <p className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Sisältää</p>
          <ul className="space-y-2">
            {product.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${checkColor}`} />
                <span className={`text-sm ${body}`}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className={`rounded-xl border p-5 ${listBg}`}>
            <p className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Kenelle sopii</p>
            <ul className="space-y-1.5">
              {product.audience.map((a, i) => (
                <li key={i} className={`text-sm ${body}`}>• {a}</li>
              ))}
            </ul>
          </div>
          <div className={`rounded-xl border p-5 ${listBg}`}>
            <p className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Hyödyt</p>
            <ul className="space-y-1.5">
              {product.benefits.map((b, i) => (
                <li key={i} className={`text-sm ${body}`}>• {b}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-dashed" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }}>
          <p className={`text-3xl font-bold ${heading}`}>{product.price} €</p>
          <button
            className="w-full sm:w-auto font-bold text-base py-3.5 px-10 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] group flex items-center justify-center gap-2"
            style={{ backgroundColor: isDark ? '#ffffff' : '#171717', color: isDark ? '#000000' : '#ffffff' }}
          >
            <ShoppingBag size={18} />
            Osta nyt
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main Page ─── */

const Tuotteet = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('kaikki');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const bg = isDark ? 'bg-black' : 'bg-white';
  const heading = isDark ? 'text-white' : 'text-neutral-900';
  const body = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const label = isDark ? 'text-blue-400/70' : 'text-neutral-400';
  const cardBg = isDark ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]' : 'bg-black/[0.02] border-black/[0.06] hover:border-black/[0.12]';
  const tagBg = isDark ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'bg-neutral-100 text-neutral-600 border-neutral-200';
  const filterActive = isDark ? 'bg-white/10 text-white border-white/15' : 'bg-black/10 text-black border-black/15';
  const filterInactive = isDark ? 'text-neutral-500 border-white/[0.06] hover:text-white hover:border-white/[0.12]' : 'text-neutral-400 border-black/[0.06] hover:text-black hover:border-black/[0.12]';
  const trustBg = isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-black/[0.02] border-black/[0.06]';
  const headingGrad = isDark ? 'from-neutral-50 to-neutral-400' : 'from-neutral-900 to-neutral-500';

  const filtered = activeCategory === 'kaikki'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className={`${bg} min-h-screen font-sans antialiased transition-colors duration-500`}>
      <Helmet>
        <title>Tuotteet — FEIM Digital Studio</title>
        <meta name="description" content="Digitaaliset tuotteet yrittäjille ja tiimeille: prompt-paketit, AI-työkalut ja valmiit templateja myyntiin, markkinointiin ja automaatioon." />
        <link rel="canonical" href="https://feim.fi/tuotteet" />
        <meta property="og:title" content="Tuotteet — FEIM Digital Studio" />
        <meta property="og:description" content="Valmiit prompt-paketit, AI-työkalut ja digitaaliset resurssit tehokkaampaan liiketoimintaan." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feim.fi/tuotteet" />
      </Helmet>

      {/* ─── Hero ─── */}
      <HeroBackground className="!min-h-[65vh] sm:!min-h-[70vh] flex items-end pb-20">
        <div
          className="absolute bottom-0 left-0 w-full h-48 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${isDark ? '#000000' : '#ffffff'}, ${isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'}, transparent)` }}
        />
        <div className="px-4 sm:px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-24 sm:pt-32 md:pt-40">
          <FadeIn delay={0.05}>
            <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${label}`}>Tuotteet</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b ${headingGrad} pb-4 leading-[1.08] max-w-4xl`}>
              Digitaaliset tuotteet, jotka{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">nopeuttavat tekemistä</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className={`mt-6 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed ${body}`}>
              Valmiit prompt-paketit, AI-työkalut ja digitaaliset resurssit tehokkaampaan myyntiin, markkinointiin ja liiketoiminnan kehittämiseen.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href="#tuotteet"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base rounded-full transition-all duration-300 hover:scale-105 group"
                style={{ backgroundColor: isDark ? '#ffffff' : '#171717', color: isDark ? '#000000' : '#ffffff' }}
              >
                Tutustu tuotteisiin
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeIn>
        </div>
      </HeroBackground>

      {/* ─── Categories + Product Grid ─── */}
      <section id="tuotteet" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">

          {/* Filters */}
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-10 sm:mb-14">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${activeCategory === cat.id ? filterActive : filterInactive}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.06}>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className={`group text-left w-full border rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col h-full ${cardBg}`}
                >
                  <span className={`inline-block text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full border mb-5 self-start ${tagBg}`}>
                    {product.tag}
                  </span>
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-200 ${heading} ${isDark ? 'group-hover:text-blue-300' : 'group-hover:text-neutral-600'}`}>
                    {product.name}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 flex-1 ${body}`}>{product.shortDesc}</p>
                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-dashed" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }}>
                    <span className={`text-2xl font-bold ${heading}`}>{product.price} €</span>
                    <span className={`text-sm font-medium flex items-center gap-1 transition-colors ${isDark ? 'text-neutral-500 group-hover:text-white' : 'text-neutral-400 group-hover:text-black'}`}>
                      Katso tuote
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust / Benefits ─── */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <FadeIn>
            <p className={`text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4 ${label}`}>Miksi nämä tuotteet</p>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16 max-w-3xl ${heading}`}>
              Valmiit työkalut nopeampaan toteutukseen
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trustFeatures.map((feat, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className={`border rounded-2xl p-6 sm:p-8 h-full transition-all duration-300 ${trustBg}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-neutral-100 border border-neutral-200'}`}>
                    <feat.icon size={18} className={isDark ? 'text-blue-400/70' : 'text-neutral-500'} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${heading}`}>{feat.title}</h3>
                  <p className={`text-sm leading-relaxed ${body}`}>{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <FadeIn>
            <p className={`text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4 ${label}`}>Usein kysyttyä</p>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16 ${heading}`}>Vastauksia tuotteisiin liittyen</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Accordion type="single" collapsible className="space-y-2">
              {faqData.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className={`rounded-xl px-2 transition-colors ${isDark ? 'border-white/[0.06] hover:border-white/[0.12]' : 'border-black/[0.06] hover:border-black/[0.12]'}`}
                >
                  <AccordionTrigger className={`text-left text-lg font-medium py-6 hover:no-underline ${heading}`}>
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className={`leading-relaxed pb-6 text-[15px] ${body}`}>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: isDark ? 'radial-gradient(circle at 50% 50%, #0021ff15 0%, transparent 50%), #000' : 'radial-gradient(circle at 50% 50%, #00000008 0%, transparent 50%), #fff' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10 text-center">
          <FadeIn>
            <h2 className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 ${heading}`}>
              Tarvitsetko räätälöidyn ratkaisun?
            </h2>
            <p className={`text-lg max-w-xl mx-auto mb-10 ${body}`}>
              Jos valmiit tuotteet eivät riitä, rakennamme sinulle juuri oikean kokonaisuuden — kerro tarpeestasi.
            </p>
            <Link
              to="/yhteystiedot"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 group"
              style={{ backgroundColor: isDark ? '#ffffff' : '#171717', color: isDark ? '#000000' : '#ffffff' }}
            >
              Ota yhteyttä
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />

      {/* ─── Product Modal ─── */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} isDark={isDark} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tuotteet;
