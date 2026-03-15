import ServicePageLayout from '@/components/ServicePageLayout';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/ThemeContext';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const pricingPlans = [
  {
    name: "Yksinkertainen käyntikortti",
    subtitle: "Landing page / 1 sivu",
    price: "499",
    features: [
      "1-sivuinen landing page",
      "Moderni ja selkeä ulkoasu",
      "Yrityksen ja palveluiden esittely",
      "Yhteystiedot",
      "Mobiiliystävällinen toteutus",
    ],
    description: "Selkeä ja laadukas verkkokäyntikortti yritykselle, joka haluaa ammattimaisen ensivaikutelman verkossa.",
    footer: "Sopii yrityksille, jotka haluavat yksinkertaisen mutta toimivan verkkoratkaisun.",
  },
  {
    name: "Moderni käyntikortti",
    subtitle: "2–3 sivua",
    price: "699",
    features: [
      "2–3 sivua",
      "Räätälöidyt komponentit ja visuaalinen toteutus",
      "Fontit ja animaatiot",
      "Tarjous- / yhteydenottolomake",
      "Sähköposti-integraatio",
      "Responsiivinen toteutus",
    ],
    description: "Moderni ja myyvä nettisivu, joka erottuu edukseen ja tukee myyntiä.",
    footer: "Erinomainen valinta yrityksille, jotka haluavat modernin ja uskottavan nettisivun.",
  },
  {
    name: "Multipage",
    subtitle: "4–7 sivua",
    price: "899",
    highlighted: true,
    features: [
      "4–7 sivua",
      "Täysin räätälöidyt UI-komponentit ja animaatiot",
      "Visuaalinen toteutus brändin mukaan",
      "Tekoälyystävällinen ja helposti jatkokehitettävä rakenne",
      "Kertaluontoinen hakukoneoptimointi (SEO)",
      "Tarjouslomake ja sähköposti-integraatio",
    ],
    description: "Laajempi kokonaisuus yrityksille, jotka haluavat kasvattaa näkyvyyttä ja asiakasmäärää.",
    footer: "Sopii pk-yrityksille, jotka haluavat enemmän kuin vain perussivut.",
  },
  {
    name: "Kasvupaketti",
    subtitle: "Täysi digitaalinen kokonaisuus",
    price: "1200",
    features: [
      "Laaja, räätälöity monisivuinen nettisivusto",
      "Edistynyt UI Design ja UX-ajattelu",
      "Tekoälyoptimointi ja skaalautuva tekninen rakenne",
      "Hakukoneoptimointi ja analytiikka",
      "Valmis pohja automaatioille ja integraatioille",
      "Mahdollisuus jatkokehitykseen ja laajennuksiin",
    ],
    description: "Täysi digitaalinen kokonaisuus kasvuhakuisille yrityksille.",
    footer: "Paras valinta yrityksille, jotka haluavat pitkäjänteistä kasvua ja modernin teknisen pohjan.",
  },
];

const maintenancePlans = [
  {
    name: "Perusylläpito",
    price: "200",
    unit: "/ vuosi",
    features: [
      "Sivuston kunnossapito",
      "Pienet päivitykset",
      "Kävijäseuranta ja perusanalytiikka",
    ],
  },
  {
    name: "Laajennettu ylläpito",
    price: "450",
    unit: "/ vuosi",
    features: [
      "Kaikki perusylläpidon palvelut",
      "Jatkuva tekoälyoptimointi",
      "Sisällön päivitykset ja kehitys",
      "Laajempi analytiikka ja raportointi",
    ],
  },
];

const PricingSection = () => {
  const { isDark } = useTheme();

  const heading = isDark ? 'text-white' : 'text-neutral-900';
  const desc = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const cardBase = isDark
    ? 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
    : 'bg-black/[0.02] border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.12]';
  const cardHighlighted = isDark
    ? 'bg-white/[0.06] border-2 border-blue-500/30 hover:border-blue-500/50'
    : 'bg-black/[0.03] border-2 border-neutral-400/40 hover:border-neutral-400/60';
  const badgeBg = isDark ? 'bg-blue-500' : 'bg-neutral-800';
  const priceColor = isDark ? 'text-white' : 'text-neutral-900';
  const featureIcon = isDark ? 'text-blue-500/70' : 'text-neutral-400';
  const featureText = isDark ? 'text-neutral-300' : 'text-neutral-600';
  const footerBorder = isDark ? 'border-white/[0.06]' : 'border-black/[0.06]';
  const btnHighlighted = isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800';
  const btnNormal = isDark
    ? 'bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1]'
    : 'bg-black/[0.05] text-neutral-900 border border-black/[0.1] hover:bg-black/[0.1]';
  const radialBg = isDark
    ? 'radial-gradient(circle at 50% 50%, #0021ff10 0%, transparent 50%), #000'
    : 'radial-gradient(circle at 50% 50%, #00000008 0%, transparent 50%), #fff';

  return (
    <>
      {/* Main pricing */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
          <FadeIn>
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 max-w-3xl ${heading}`}>Hinnasto</h2>
            <p className={`text-lg max-w-2xl mb-16 leading-relaxed ${desc}`}>
              Valitse yrityksellesi sopiva paketti. Kaikki hinnat + ALV.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {pricingPlans.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className={`relative h-full rounded-2xl p-8 transition-all duration-500 flex flex-col ${
                  plan.highlighted ? cardHighlighted : cardBase
                }`}>
                  {plan.highlighted && (
                    <span className={`absolute -top-3 left-8 px-4 py-1 ${badgeBg} text-white text-xs font-bold rounded-full uppercase tracking-wider`}>
                      Suosituin
                    </span>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-1 ${priceColor}`}>{plan.name}</h3>
                    <p className="text-neutral-500 text-sm">{plan.subtitle}</p>
                  </div>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className={`text-4xl font-bold ${priceColor}`}>{plan.price} €</span>
                    <span className="text-neutral-500 text-sm">+ ALV</span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 ${desc}`}>{plan.description}</p>
                  
                  <div className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className={`${featureIcon} mt-0.5 shrink-0`} />
                        <p className={`text-sm leading-relaxed ${featureText}`}>{feature}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className={`text-neutral-500 text-xs leading-relaxed mb-6 border-t ${footerBorder} pt-6`}>{plan.footer}</p>
                  
          <Link
                    to="/yhteystiedot#vedos"
                    className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105 text-sm ${
                      plan.highlighted ? btnHighlighted : btnNormal
                    }`}
                  >
                    Tilaa vedos
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance pricing */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: radialBg }} />
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">
          <FadeIn>
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 max-w-3xl ${heading}`}>Ylläpito</h2>
            <p className={`text-lg max-w-2xl mb-12 leading-relaxed ${desc}`}>
              Pidä sivustosi ajan tasalla ja toimintakunnossa.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {maintenancePlans.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className={`rounded-2xl p-8 transition-all duration-500 h-full flex flex-col ${cardBase}`}>
                  <h3 className={`text-lg font-bold mb-4 ${priceColor}`}>{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-3xl font-bold ${priceColor}`}>{plan.price} €</span>
                    <span className="text-neutral-500 text-sm">{plan.unit}</span>
                  </div>
                  <div className="space-y-3 flex-1">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className={`${featureIcon} mt-0.5 shrink-0`} />
                        <p className={`text-sm leading-relaxed ${featureText}`}>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const Verkkosivut = () => (
  <>
    <ServicePageLayout
      heroVariant="commercial"
      seo={{
        title: "Verkkosivut yritykselle — FEIM Digital Studio",
        description: "FEIM suunnittelee ja rakentaa moderneja verkkosivuja, jotka tukevat liiketoimintaa, rakentavat brändiä ja muuttavat kävijät asiakkaiksi.",
        url: "https://feim.fi/verkkosivut"
      }}
      hero={{
        label: "Verkkosivut",
        title: "Verkkosivut jotka erottuvat",
        intro: "",
        cta: "",
        ctaHref: "/yhteystiedot#vedos"
      }}
      sections={[
        {
          title: "Mitä hyvät verkkosivut tekevät",
          description: "Verkkosivusto on yrityksenne tärkein digitaalinen omaisuus. Se on ensivaikutelma, myyjä ja brändin ääni — samanaikaisesti, ympäri vuorokauden.",
          bullets: [
            "Selkeä viesti ja rakenne, joka ohjaa kävijää eteenpäin",
            "Konversioon suunniteltu käyttäjäkokemus",
            "Nopeus ja tekninen laatu — jokainen sekunti ratkaisee",
            "Hakukoneystävällinen rakenne, joka tuo orgaanista liikennettä",
            "Visuaalinen identiteetti, joka erottaa teidät kilpailijoista",
            "Responsiivinen toteutus joka laitteelle"
          ]
        },
        {
          title: "Tekoälyagenteille optimoitu (GEO)",
          description: "Perinteinen SEO ei enää riitä. Yhä useampi haku tapahtuu tekoälypohjaisten agenttien kautta — ChatGPT, Perplexity, Google AI Overviews. GEO (Generative Engine Optimization) varmistaa, että sivustonne löytyy myös niistä.",
          bullets: [
            "Rakenteinen data ja semanttinen HTML, jota tekoälyagentit ymmärtävät",
            "Selkeä, korkealaatuinen sisältö, joka päätyy AI-vastauksiin",
            "Optimoitu sivurakenne, joka palvelee sekä ihmisiä että koneita",
            "Valmius toimia alustana AI-chatboteille ja -agenteille",
            "Jatkuvasti kehittyvä optimointi hakuteknologian mukana"
          ]
        }
      ]}
      cta={{
        title: "Tilaa maksuton vedos verkkosivustasi",
        description: "Kerro projektistasi ja saat konkreettisen ehdotuksen siitä, miltä uusi sivustonne voisi näyttää.",
        buttonText: "Tilaa maksuton vedos",
        buttonHref: "/yhteystiedot#vedos"
      }}
      pricingSlot={<PricingSection />}
    />
  </>
);

export default Verkkosivut;
