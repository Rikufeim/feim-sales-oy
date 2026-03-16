import React, { useMemo, useState } from "react";
import { ArrowRight, Check, MessageCircle, Shield, Sparkles, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface HalideLandingProps {
  className?: string;
}

type IndustryId = "saas" | "agency" | "ecommerce" | "health" | "education";
type GoalId = "leads" | "trials" | "bookings";
type ColorId = "arctic" | "forest" | "violet";

interface GeneratedTheme {
  bg: string;
  surface: string;
  text: string;
  accent: string;
}

interface GeneratedLanding {
  company: string;
  industryLabel: string;
  headline: string;
  description: string;
  target: string;
  primaryCta: string;
  secondaryCta: string;
  theme: GeneratedTheme;
}

const industries: Record<IndustryId, { label: string; company: string; target: string; headline: string; description: string }> = {
  saas: {
    label: "SaaS / Startup",
    company: "NordFlow AI",
    target: "startup-tiimit ja perustajat",
    headline: "Vie startupisi eteenpain vahemmalla saannolla ja enemmalla vauhdilla.",
    description: "Yksi moderni workspace suunnitteluun, automaatioon ja tulosten tekemiseen.",
  },
  agency: {
    label: "Palveluyritys / Agency",
    company: "StudioPilot",
    target: "toimistot ja konsultit",
    headline: "Toimita premium-asiakasprojektit nopeammin ja sujuvammin.",
    description: "Kickoffista luovutukseen kaikki deliverables pysyvat nakyvissa ja aikataulussa.",
  },
  ecommerce: {
    label: "E-commerce",
    company: "ConvertCart Pro",
    target: "verkkokaupat ja kasvutiimit",
    headline: "Muuta useampi kayvija asiakkaaksi datalla ohjatuilla paatoksilla.",
    description: "Konversiokeskeinen jarjestelma kampanjoihin, funneliin ja retentioniin.",
  },
  health: {
    label: "Health / Wellbeing",
    company: "PulseCare",
    target: "klinikat ja terveydenhuollon tiimit",
    headline: "Tarjoa potilaille sujuva digitaalinen kokemus ensikaynnista seurantaan.",
    description: "Turvalliset polut, selkea viestinta ja nopea onboarding yhdessa palvelussa.",
  },
  education: {
    label: "Education / EdTech",
    company: "LearnGrid",
    target: "kouluttajat ja oppimisliiketoiminnat",
    headline: "Rakenna parempia oppimispolkuja vahemmalla hallinnollisella tyolla.",
    description: "Suunnittele, julkaise ja seuraa oppimiskokemuksia selkeassa modernissa nakymassa.",
  },
};

const goals: Record<GoalId, { label: string; primaryCta: string; secondaryCta: string }> = {
  leads: { label: "Liidit", primaryCta: "Varaa demo", secondaryCta: "Katso caset" },
  trials: { label: "Free trialit", primaryCta: "Aloita ilmainen kokeilu", secondaryCta: "Katso tuotteen esittely" },
  bookings: { label: "Varaukset", primaryCta: "Varaa puhelu", secondaryCta: "Katso miten toimii" },
};

const palettes: Record<ColorId, { label: string; theme: GeneratedTheme }> = {
  arctic: {
    label: "Arctic Blue",
    theme: { bg: "#FFFFFF", surface: "#F8FAFC", text: "#0F172A", accent: "#2563EB" },
  },
  forest: {
    label: "Forest Green",
    theme: { bg: "#FFFFFF", surface: "#F8FAFC", text: "#111827", accent: "#15803D" },
  },
  violet: {
    label: "Violet Pulse",
    theme: { bg: "#FFFFFF", surface: "#F8FAFC", text: "#111827", accent: "#7C3AED" },
  },
};

const buildLanding = (industryId: IndustryId, goalId: GoalId, colorId: ColorId): GeneratedLanding => {
  const industry = industries[industryId];
  const goal = goals[goalId];
  const palette = palettes[colorId];

  return {
    company: industry.company,
    industryLabel: industry.label,
    headline: industry.headline,
    description: industry.description,
    target: industry.target,
    primaryCta: goal.primaryCta,
    secondaryCta: goal.secondaryCta,
    theme: palette.theme,
  };
};

const detectIndustryId = (value: string): IndustryId => {
  const text = value.toLowerCase();
  if (text.includes("shop") || text.includes("store") || text.includes("commerce") || text.includes("verkkokauppa")) {
    return "ecommerce";
  }
  if (text.includes("agency") || text.includes("consult") || text.includes("service") || text.includes("palvelu")) {
    return "agency";
  }
  if (text.includes("health") || text.includes("clinic") || text.includes("wellness") || text.includes("terveys")) {
    return "health";
  }
  if (text.includes("edu") || text.includes("learning") || text.includes("school") || text.includes("koul")) {
    return "education";
  }
  return "saas";
};

const HalideLanding: React.FC<HalideLandingProps> = ({ className }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [goalId, setGoalId] = useState<GoalId>("trials");
  const [colorId, setColorId] = useState<ColorId>("arctic");
  const [industryInput, setIndustryInput] = useState("");
  const [audienceInput, setAudienceInput] = useState("");
  const [radius, setRadius] = useState(18);
  const [showResult, setShowResult] = useState(false);
  const [generated, setGenerated] = useState<GeneratedLanding>(() => buildLanding("saas", "trials", "arctic"));

  const onGenerate = () => {
    const detectedIndustry = detectIndustryId(industryInput);
    const next = buildLanding(detectedIndustry, goalId, colorId);
    setGenerated({
      ...next,
      industryLabel: industryInput.trim() || next.industryLabel,
      target: audienceInput.trim() || next.target,
    });
    setShowResult(true);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(3, prev + 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const prompt = useMemo(
    () =>
      [
        "Create a modern, high-quality white landing page for a digital product or startup.",
        `- Industry: ${generated.industryLabel}`,
        `- Product name: ${generated.company}`,
        `- Audience: ${generated.target}`,
        `- Headline: ${generated.headline}`,
        `- Value proposition: ${generated.description}`,
        `- Goal: ${goals[goalId].label}`,
        `- Brand palette: ${palettes[colorId].label}`,
        `- Colors: bg ${generated.theme.bg}, surface ${generated.theme.surface}, text ${generated.theme.text}, accent ${generated.theme.accent}`,
        `- Border radius: ${radius}px`,
        "- Include: Hero, Features, Benefits, Social proof, Pricing, Final CTA, Footer.",
        "- Output complete responsive HTML + Tailwind CSS with semantic structure.",
      ].join("\n"),
    [generated, goalId, colorId, radius]
  );

  const whatsappHref = useMemo(
    () => `https://wa.me/358413282218?text=${encodeURIComponent(prompt)}`,
    [prompt]
  );

  const featureCards = [
    { icon: Sparkles, title: "AI-tyonkulut", desc: "Automatisoi toistuvat tehtavat ja pidä tiimi fokuksessa oikeaan tekemiseen." },
    { icon: Shield, title: "Turvallinen oletuksena", desc: "Yritystason kayttooikeudet, varmuuskopiot ja tietosuojakaytannot." },
    { icon: Zap, title: "Nopea toteutus", desc: "Vie ominaisuudet tuotantoon paivissa vahemman manuaalityon avulla." },
    { icon: Check, title: "Selkea nakyvyys", desc: "Seuraa prioriteetteja ja tuloksia yhdesta selkeasta nakymasta." },
  ];

  return (
    <div className={cn("relative w-full rounded-2xl border border-white/10 bg-[#050914] p-4 sm:p-5", className)}>
      {!showResult ? (
        <div className="mx-auto w-full max-w-xl space-y-4 pt-6 sm:pt-10">
          <div className="rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-6">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-blue-300/80">
              <Sparkles size={14} />
              Landing flow
            </p>
            <div className="mt-3 mb-5 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Step {currentStep} of 3</span>
              <span>
                {currentStep === 1 ? "Website Goal" : currentStep === 2 ? "Website Industry" : "Color Theme"}
              </span>
            </div>

            {currentStep === 1 && (
              <div className="space-y-3">
                <h2 className="text-center text-xl font-semibold text-white">Mika on verkkosivusi tavoite?</h2>
                <p className="text-center text-sm text-neutral-400">Valitse verkkosivun paatavoite.</p>
                {Object.entries(goals).map(([id, item], index) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setGoalId(id as GoalId);
                      nextStep();
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                      goalId === id
                        ? "border-blue-400/60 bg-blue-500/10 text-blue-100"
                        : "border-white/10 bg-black/30 text-neutral-200 hover:border-white/20"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="rounded-md border border-white/15 px-2 py-0.5 text-xs text-neutral-400">{index + 1}</span>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-3">
                <h2 className="text-center text-xl font-semibold text-white">Kerro yrityksestasi</h2>
                <p className="text-center text-sm text-neutral-400">Toimiala ja kohderyhma auttavat meita luomaan oikean sivun.</p>
                <div>
                  <label className="mb-1 block text-xs text-neutral-400">Industry</label>
                  <input
                    value={industryInput}
                    onChange={(e) => setIndustryInput(e.target.value)}
                    placeholder="esim. SaaS, kiinteistot, terveydenhuolto..."
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-neutral-400">Target audience</label>
                  <textarea
                    value={audienceInput}
                    onChange={(e) => setAudienceInput(e.target.value)}
                    rows={3}
                    placeholder="esim. Pienyrittajat, jotka etsivat skaalautuvia ratkaisuja..."
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-3">
                <h2 className="text-center text-xl font-semibold text-white">Valitse varimaailma</h2>
                <p className="text-center text-sm text-neutral-400">Valitse visuaalinen suunta landing pagellesi.</p>
                {Object.entries(palettes).map(([id, item]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setColorId(id as ColorId)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                      colorId === id
                        ? "border-blue-400/60 bg-blue-500/10 text-blue-100"
                        : "border-white/10 bg-black/30 text-neutral-200 hover:border-white/20"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: item.theme.bg }} />
                      <span className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: item.theme.surface }} />
                      <span className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: item.theme.accent }} />
                    </span>
                  </button>
                ))}
                <label className="block text-xs text-neutral-400">
                  Kulmien pehmeys: {radius}px
                  <input
                    type="range"
                    min={8}
                    max={36}
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="mt-2 w-full"
                  />
                </label>
              </div>
            )}

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-neutral-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Edellinen
              </button>
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                >
                  Seuraava
                  <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onGenerate}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                >
                  Generoi landing page
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setShowResult(false);
                setCurrentStep(1);
              }}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-neutral-200 transition hover:bg-white/5"
            >
              Muokkaa vastauksia
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-green-400"
            >
              <MessageCircle size={16} />
              Laheta WhatsAppissa promptina
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-2 text-xs text-neutral-400">Prompti</p>
            <textarea
              value={prompt}
              readOnly
              rows={6}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-xs text-neutral-300 focus:outline-none"
            />
          </div>

          <div className="rounded-xl border border-white/10 p-3 sm:p-4" style={{ backgroundColor: "#E5E7EB" }}>
          <div
            className="mx-auto max-w-5xl overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
            style={{
              borderColor: `${generated.theme.accent}22`,
              borderRadius: radius + 8,
              backgroundColor: generated.theme.bg,
              color: generated.theme.text,
            }}
          >
            <section className="grid gap-8 border-b px-6 py-12 sm:grid-cols-2 sm:px-10 sm:py-16" style={{ borderColor: "#E5E7EB" }}>
              <div>
                <p className="text-xs uppercase tracking-[0.16em]" style={{ color: generated.theme.accent }}>
                  {generated.industryLabel}
                </p>
                <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">{generated.headline}</h1>
                <p className="mt-4 max-w-md text-sm text-slate-600 sm:text-base">{generated.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: generated.theme.accent, borderRadius: radius - 4 }}
                  >
                    {generated.primaryCta} <ArrowRight size={14} />
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-slate-50"
                    style={{ borderColor: "#CBD5E1", borderRadius: radius - 4 }}
                  >
                    {generated.secondaryCta}
                  </button>
                </div>
              </div>
              <div
                className="relative overflow-hidden border p-4"
                style={{
                  backgroundColor: generated.theme.surface,
                  borderColor: `${generated.theme.accent}33`,
                  borderRadius: radius + 2,
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: generated.theme.accent }}>
                    Tuotteen esikatselu
                  </p>
                  <span className="rounded-full bg-white px-2 py-1 text-[10px] text-slate-500 shadow-sm">Live</span>
                </div>
                <div className="grid gap-2 text-xs text-slate-600">
                  <div className="rounded-lg bg-white p-3 shadow-sm">Paivan fokus-pisteet: <strong className="text-slate-800">92%</strong></div>
                  <div className="rounded-lg bg-white p-3 shadow-sm">Aktiiviset automaatiot: <strong className="text-slate-800">14</strong></div>
                  <div className="rounded-lg bg-white p-3 shadow-sm">Sastetty aika talla viikolla: <strong className="text-slate-800">11h 40m</strong></div>
                </div>
              </div>
            </section>

            <section className="border-b px-6 py-12 sm:px-10" style={{ borderColor: "#E5E7EB" }}>
              <h2 className="text-2xl font-semibold sm:text-3xl">Ominaisuudet</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {featureCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg" style={{ borderColor: "#E2E8F0", borderRadius: radius }}>
                      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white" style={{ backgroundColor: generated.theme.accent }}>
                        <Icon size={16} />
                      </div>
                      <p className="text-base font-semibold">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="border-b px-6 py-12 sm:px-10" style={{ borderColor: "#E5E7EB" }}>
              <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
                <div>
                  <h2 className="text-2xl font-semibold sm:text-3xl">Miksi tiimit valitsevat {generated.company}</h2>
                  <p className="mt-3 text-sm text-slate-600 sm:text-base">Rakennettu kohderyhmalle {generated.target}, joka tarvitsee selkeytta, nopeutta ja mitattavia tuloksia.</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><Check size={14} style={{ color: generated.theme.accent }} /> Aloita minuuteissa ilman raskasta setupia.</li>
                    <li className="flex items-center gap-2"><Check size={14} style={{ color: generated.theme.accent }} /> Keskity toteutukseen, ei työkalujen hallintaan.</li>
                    <li className="flex items-center gap-2"><Check size={14} style={{ color: generated.theme.accent }} /> Skaalaa tekeminen tiimin kasvaessa.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border bg-gradient-to-br from-white to-slate-50 p-5" style={{ borderColor: "#E2E8F0", borderRadius: radius }}>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Nostot</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Tuottavuus</p><p className="mt-1 text-lg font-semibold">+34%</p></div>
                    <div className="rounded-xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Kayttoonottoaika</p><p className="mt-1 text-lg font-semibold">10 min</p></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-b px-6 py-12 sm:px-10" style={{ borderColor: "#E5E7EB" }}>
              <h2 className="text-2xl font-semibold sm:text-3xl">Sosiaalinen todiste</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {["NOVA", "PIXEL", "ATLAS", "FLOW"].map((logo) => (
                  <div key={logo} className="rounded-xl border bg-white px-4 py-3 text-center text-sm font-semibold tracking-wide text-slate-500" style={{ borderColor: "#E2E8F0", borderRadius: radius - 6 }}>{logo}</div>
                ))}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border bg-white p-5" style={{ borderColor: "#E2E8F0", borderRadius: radius }}>
                  <div className="mb-2 flex gap-1 text-amber-400">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                  <p className="text-sm text-slate-700">"Puolitimme suunnitteluun kuluvan ajan jo ensimmaisessa kuukaudessa. Tuote on selkea ja tehokas."</p>
                  <p className="mt-3 text-xs text-slate-500">Kasvujohtaja, early-stage SaaS</p>
                </div>
                <div className="rounded-2xl border bg-white p-5" style={{ borderColor: "#E2E8F0", borderRadius: radius }}>
                  <div className="mb-2 flex gap-1 text-amber-400">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                  <p className="text-sm text-slate-700">"Premium UX ja selkea ROI. Tiimimme otti taman kayttoon yhden paivan aikana."</p>
                  <p className="mt-3 text-xs text-slate-500">Founder, AI-startup</p>
                </div>
              </div>
            </section>

            <section className="border-b px-6 py-12 sm:px-10" style={{ borderColor: "#E5E7EB" }}>
              <h2 className="text-2xl font-semibold sm:text-3xl">Hinnoittelu</h2>
              <p className="mt-2 text-sm text-slate-600">Aloita ilmaiseksi ja paivita, kun tiimisi kasvaa.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { plan: "Starter", price: "0 EUR", text: "Yksinyrittajille" },
                  { plan: "Growth", price: "29 EUR", text: "Nopeasti liikkuville tiimeille", featured: true },
                  { plan: "Scale", price: "99 EUR", text: "Edistyneisiin tyonkulkuihin" },
                ].map((item) => (
                  <div key={item.plan} className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg" style={{ borderColor: item.featured ? `${generated.theme.accent}88` : "#E2E8F0", borderRadius: radius, boxShadow: item.featured ? `0 8px 30px ${generated.theme.accent}22` : undefined }}>
                    <p className="text-sm font-semibold">{item.plan}</p>
                    <p className="mt-2 text-3xl font-bold">{item.price}<span className="text-sm font-normal text-slate-500">/kk</span></p>
                    <p className="mt-2 text-sm text-slate-600">{item.text}</p>
                    <button type="button" className="mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition" style={{ backgroundColor: item.featured ? generated.theme.accent : "#F1F5F9", color: item.featured ? "#FFFFFF" : "#0F172A", borderRadius: radius - 4 }}>
                      {item.featured ? "Aloita nyt" : "Valitse paketti"}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-b px-6 py-12 sm:px-10" style={{ borderColor: "#E5E7EB" }}>
              <h2 className="text-2xl font-semibold sm:text-3xl">FAQ</h2>
              <div className="mt-3 space-y-2">
                {["Kuinka nopeasti paasen alkuun?", "Tarvitsenko teknista osaamista?", "Voinko paivittaa pakettia myohemmin?"].map((q) => (
                  <div key={q} className="rounded-xl border bg-white p-4 text-sm" style={{ borderColor: "#E2E8F0", borderRadius: radius - 4 }}>
                    <p className="font-medium">{q}</p>
                    <p className="mt-1 text-xs text-slate-600">Kyla. Prosessi on tehty yksinkertaiseksi ja tuotantovalmiiksi heti ensimmaisesta paivasta lahtien.</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-b px-6 py-12 text-center sm:px-10" style={{ borderColor: "#E5E7EB" }}>
              <p className="text-sm text-slate-600">Valmis kasvamaan nopeammin?</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Kokeile palvelua {generated.company} jo tanaan.</h2>
              <button type="button" className="mt-5 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90" style={{ backgroundColor: generated.theme.accent, borderRadius: radius - 4 }}>
                {generated.primaryCta}
              </button>
            </section>

            <footer className="px-6 py-7 sm:px-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold">{generated.company}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <a href="#" className="hover:text-slate-900">Tuote</a>
                  <a href="#" className="hover:text-slate-900">Hinnasto</a>
                  <a href="#" className="hover:text-slate-900">Dokumentaatio</a>
                  <a href="#" className="hover:text-slate-900">Yhteys</a>
                </div>
                <div className="flex items-center gap-2">
                  {["in", "x", "ig"].map((s) => (
                    <span key={s} className="inline-flex h-7 w-7 items-center justify-center rounded-full border text-[10px] text-slate-500" style={{ borderColor: "#CBD5E1" }}>{s}</span>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default HalideLanding;

