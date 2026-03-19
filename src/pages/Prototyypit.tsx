import ServicePageLayout from '@/components/ServicePageLayout';
import OceanBackground from '@/components/OceanBackground';

const Prototyypit = () => (
  <>
    <OceanBackground />
    <ServicePageLayout
    heroVariant="creative"
    seo={{
      title: "Prototyypit ja MVP — FEIM Digital Studio",
      description: "Muuta sovellusidea konkreettiseksi prototyypiksi tai MVP:ksi. FEIM auttaa rakentamaan ensimmäisen version nopeasti — ideasta testaukseen.",
      url: "https://feim.fi/prototyypit"
    }}
    hero={{
      label: "Prototyypit & MVP",
      title: "Muuta sovellusidea konkreettiseksi prototyypiksi",
      intro: "",
      cta: "",
      ctaHref: "/yhteystiedot#vedos"
    }}
    sections={[
      {
        title: "Miksi prototyyppi kannattaa tehdä",
        description: "Prototyyppi säästää aikaa, rahaa ja riskejä — ja antaa konkreettisen lähtöpisteen koko projektille.",
        bullets: [
          "Idean konkretisointi: näet miltä tuotteesi näyttää ja tuntuu ennen kuin kirjoitetaan riviäkään koodia",
          "Käyttäjätestaus: saat palautetta oikeilta käyttäjiltä ennen täyttä kehitystä",
          "Sijoittajien vakuuttaminen: esittele toimiva konsepti, ei pelkkä slide-deck",
          "Riskin pienentäminen: validoi idea nopeasti ja edullisesti ennen suurta investointia"
        ]
      },
      {
        title: "Mitä voimme rakentaa",
        description: "Rakennamme erilaisia prototyyppejä ja ensimmäisiä versioita riippuen siitä, missä vaiheessa ideasi on.",
        bullets: [
          "Klikattavat UI-prototyypit: interaktiivinen demo, jolla ideaa voidaan testata ja esitellä",
          "MVP-sovellukset: julkaistava minimiversio, jolla kerätään käyttäjäpalautetta ja validoidaan konsepti",
          "Proof-of-concept: tekninen konseptitodistus, joka osoittaa idean toimivuuden",
          "Tuotekonseptit: visuaalinen ja rakenteellinen esitys koko tuoteideasta"
        ]
      }
    ]}
    audience={{
      title: "Kenelle tämä sopii",
      items: [
        "Startup-tiimit ja yrittäjät, joilla on uusi tuoteidea ja jotka haluavat validoida sen nopeasti.",
        "Yksityiset henkilöt, joilla on sovellusidea mutta ei teknistä taustaa — autamme tekemään ensimmäisen version.",
        "Yritykset jotka kehittävät uutta digitaalista tuotetta tai palvelua ja haluavat testata konseptin ennen täyttä investointia."
      ]
    }}
    cta={{
      title: "Tilaa maksuton vedos ideastasi",
      description: "Kerro ideasi — rakennamme yhdessä ensimmäisen konkreettisen askeleen kohti valmista tuotetta.",
      buttonText: "Tilaa maksuton vedos",
      buttonHref: "/yhteystiedot#vedos"
    }}
    />
  </>
);

export default Prototyypit;
