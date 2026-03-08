import ServicePageLayout from '@/components/ServicePageLayout';

const Verkkosivut = () => (
  <ServicePageLayout
    heroVariant="commercial"
    heroTrustPoints={["Nopeus & suorituskyky", "SEO-optimoitu", "Konversio-suunnittelu", "Premium design"]}
    seo={{
      title: "Verkkosivut yritykselle — FEIM Digital Studio",
      description: "FEIM suunnittelee ja rakentaa moderneja verkkosivuja, jotka tukevat liiketoimintaa, rakentavat brändiä ja muuttavat kävijät asiakkaiksi.",
      url: "https://feim.fi/verkkosivut"
    }}
    hero={{
      label: "Verkkosivut",
      title: "Verkkosivut jotka tekevät enemmän kuin näyttävät hyvältä",
      intro: "FEIM suunnittelee ja rakentaa moderneja verkkosivuja, jotka tukevat liiketoimintaa, rakentavat brändiä ja muuttavat kävijät asiakkaiksi.",
      cta: "Tilaa maksuton vedos",
      ctaHref: "/yhteystiedot"
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
        title: "Mitä FEIM tekee",
        description: "Emme tee pelkkiä sivuja — rakennamme kokonaisvaltaisen digitaalisen työkalun liiketoimintanne tueksi.",
        bullets: [
          "Strategia: ymmärrämme liiketoiminnan tavoitteet ennen ensimmäistäkään viivaa",
          "Rakenne ja sisältö: suunnittelemme sivuston rakenteen ja käyttäjäpolut",
          "Design: luomme visuaalisen ilmeen, joka viestii brändin arvon",
          "Tekninen toteutus: rakennamme modernilla teknologialla nopeasti ja skaalautuvasti",
          "Optimointi: SEO, suorituskyky ja konversio-optimointi ovat osa jokaista projektia",
          "Jatkuva kehitys: sivustonne ei jää yksin julkaisun jälkeen"
        ]
      }
    ]}
    audience={{
      title: "Millaisille yrityksille tämä sopii",
      items: [
        "Kasvavat yritykset, jotka tarvitsevat verkkosivuston joka tukee kasvutavoitteita ja viestii ammattimaisuutta.",
        "Yritykset jotka uudistavat brändiään ja haluavat digitaalisen läsnäolon joka vastaa uutta suuntaa.",
        "Yritykset jotka haluavat enemmän liidejä ja yhteydenottoja verkosta — sivusto joka myy, ei vain esittelee."
      ]
    }}
    cta={{
      title: "Tilaa maksuton vedos verkkosivustasi",
      description: "Kerro projektistasi ja saat konkreettisen ehdotuksen siitä, miltä uusi sivustonne voisi näyttää.",
      buttonText: "Tilaa maksuton vedos",
      buttonHref: "/#yhteystiedot"
    }}
  />
);

export default Verkkosivut;
