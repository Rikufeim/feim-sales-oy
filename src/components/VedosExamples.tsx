import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

// Images
import vedosLandingSaas from '@/assets/vedos-landing-saas.jpg';
import vedosLandingAi from '@/assets/vedos-landing-ai.jpg';
import vedosLandingConsulting from '@/assets/vedos-landing-consulting.jpg';
import vedosAppCrm from '@/assets/vedos-app-crm.jpg';
import vedosAppAiContent from '@/assets/vedos-app-ai-content.jpg';
import vedosAppKanban from '@/assets/vedos-app-kanban.jpg';
import vedosProtoMobile from '@/assets/vedos-proto-mobile.jpg';
import vedosProtoMarketplace from '@/assets/vedos-proto-marketplace.jpg';
import vedosProtoSaas from '@/assets/vedos-proto-saas.jpg';

interface VedosItem {
  title: string;
  description: string;
  tag: string;
  image: string;
  modalContent: string[];
}

interface Category {
  title: string;
  items: VedosItem[];
}

const categories: Category[] = [
  {
    title: 'Landing page vedokset',
    items: [
      {
        title: 'Startup SaaS Landing Page',
        description: 'Moderni hero, pricing section, CTA optimointi',
        tag: 'Landing page vedos',
        image: vedosLandingSaas,
        modalContent: ['Hero design', 'Sivun rakenne ja hierarkia', 'CTA optimointi', 'Visuaalinen tyyli ja väripaletti'],
      },
      {
        title: 'AI Tool Landing Page',
        description: 'Konversio-optimoitu landing page AI-työkalulle',
        tag: 'Landing page vedos',
        image: vedosLandingAi,
        modalContent: ['Hero & value proposition', 'Feature-osiot', 'Social proof -elementit', 'Konversio-optimoitu CTA'],
      },
      {
        title: 'Consulting Company Landing Page',
        description: 'Premium yrityssivu palveluyritykselle',
        tag: 'Landing page vedos',
        image: vedosLandingConsulting,
        modalContent: ['Yritysilmeen mukainen hero', 'Palvelut-osio', 'Tiimi & referenssit', 'Yhteydenottolomake'],
      },
    ],
  },
  {
    title: 'Web-sovellus vedokset',
    items: [
      {
        title: 'CRM Dashboard',
        description: 'Myynnin dashboard analytiikalla',
        tag: 'Web app vedos',
        image: vedosAppCrm,
        modalContent: ['Dashboard layout', 'Analytiikka & graafit', 'Navigaatiorakenne', 'Tietotaulukot & filtterit'],
      },
      {
        title: 'AI Content Generator',
        description: 'Sovellus joka generoi sisältöä',
        tag: 'Web app vedos',
        image: vedosAppAiContent,
        modalContent: ['Editor-näkymä', 'Generointityökalut', 'Sivunavigaatio', 'Output & preview'],
      },
      {
        title: 'Project Management Tool',
        description: 'Kanban-tyylinen työkalusovellus',
        tag: 'Web app vedos',
        image: vedosAppKanban,
        modalContent: ['Kanban-näkymä', 'Tehtäväkortit', 'Tiimin hallinta', 'Projektin asetukset'],
      },
    ],
  },
  {
    title: 'Prototyyppi / MVP vedokset',
    items: [
      {
        title: 'Mobile App Prototype',
        description: 'Sovellusprototyyppi mobiilille',
        tag: 'Prototyyppi',
        image: vedosProtoMobile,
        modalContent: ['Mobiili-UI layout', 'Navigaatio & flow', 'Avainominaisuudet', 'Visuaalinen tyyli'],
      },
      {
        title: 'Marketplace Prototype',
        description: 'Marketplace UI ja flow',
        tag: 'Prototyyppi',
        image: vedosProtoMarketplace,
        modalContent: ['Tuotelistaus', 'Hakutoiminnot', 'Käyttäjäpolut', 'Ostoprosessin flow'],
      },
      {
        title: 'SaaS Product Prototype',
        description: 'Varhainen MVP design',
        tag: 'Prototyyppi',
        image: vedosProtoSaas,
        modalContent: ['MVP dashboard', 'Core feature -näkymät', 'Onboarding flow', 'Pricing & landing'],
      },
    ],
  },
];

const VedosCard = ({ item, onClick }: { item: VedosItem; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm text-left w-full cursor-pointer"
    whileHover={{ scale: 1.02, y: -4 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Hover glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
      style={{ boxShadow: 'inset 0 0 60px rgba(59,130,246,0.06), 0 0 40px rgba(59,130,246,0.08)' }} />

    {/* Image */}
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Tag */}
      <span className="absolute top-3 left-3 text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/[0.1] backdrop-blur-md text-white/70 border border-white/[0.08]">
        {item.tag}
      </span>
    </div>

    {/* Content */}
    <div className="p-5">
      <h4 className="text-sm font-semibold text-white mb-1.5">{item.title}</h4>
      <p className="text-xs text-neutral-400 leading-relaxed">{item.description}</p>
    </div>
  </motion.button>
);

const VedosModal = ({ item, onClose }: { item: VedosItem; onClose: () => void }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

    {/* Modal */}
    <motion.div
      className="relative w-full max-w-2xl rounded-2xl border border-white/[0.1] bg-neutral-950/95 backdrop-blur-xl overflow-hidden"
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.15] transition-colors text-white/60 hover:text-white"
      >
        <X size={16} />
      </button>

      {/* Large preview */}
      <div className="aspect-video overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-6 sm:p-8">
        <span className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400/80 border border-blue-500/20 mb-4 inline-block">
          {item.tag}
        </span>
        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
        <p className="text-sm text-neutral-400 mb-6">{item.description}</p>

        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-3">Vedos sisältää:</p>
          {item.modalContent.map((line, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-neutral-300">
              <span className="w-1 h-1 rounded-full bg-blue-500/60 shrink-0" />
              {line}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

interface VedosExamplesProps {
  formRef: React.RefObject<HTMLDivElement | null>;
}

const VedosExamples = ({ formRef }: VedosExamplesProps) => {
  const [selectedItem, setSelectedItem] = useState<VedosItem | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-16 pb-16 sm:pb-24 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Esimerkkejä vedoksista
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Kun tilaat vedoksen, saat konkreettisen visuaalisen ehdotuksen sivustostasi tai sovelluksestasi.
        </motion.p>
      </div>

      {/* Categories */}
      <div className="space-y-14 sm:space-y-20">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-base sm:text-lg font-semibold text-white/80 mb-6 pl-1">{cat.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.items.map((item, j) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: j * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <VedosCard item={item} onClick={() => setSelectedItem(item)} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="text-center mt-16 sm:mt-20"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          onClick={scrollToForm}
          className="inline-flex items-center justify-center gap-2 font-bold text-sm py-4 px-10 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] bg-white text-black group"
        >
          Tilaa oma vedoksesi
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <VedosModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default VedosExamples;
