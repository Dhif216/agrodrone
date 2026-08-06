import { useState, useEffect, useRef } from 'react'
import SectionHeading from './components/SectionHeading'

type Lang = 'fi' | 'en'

type CookiePrefs = {
  analytics: boolean
  marketing: boolean
}

type CookieConsentRecord = {
  status: 'accepted' | 'rejected' | 'custom'
  updatedAt: string
  prefs: CookiePrefs
}

const COOKIE_CONSENT_KEY = 'agrodrone_cookie_consent_v1'

const DEFAULT_COOKIE_PREFS: CookiePrefs = {
  analytics: false,
  marketing: false,
}

const t = {
  en: {
    nav: {
      services: 'Services',
      about: 'About',
      howItWorks: 'How It Works',
      gallery: 'Gallery',
      contact: 'Contact',
      getQuote: 'Get a Quote',
    },
    hero: {
      headline: 'Precision Agriculture Powered by Drones',
      sub: 'From seeding to fertilizing, spraying, and crop monitoring, we help farmers increase yields while reducing costs.',
      cta1: 'Get a Quote',
      cta2: 'Our Services',
      badge: 'Certified Drone Operators · Finland',
    },
    about: {
      label: 'About Us',
      headline: 'Technology meets the land',
      body: 'We combine advanced drone technology with modern agriculture to provide efficient, sustainable, and accurate farming solutions. Founded by agronomists and aerospace engineers, we understand both the soil beneath your feet and the sky above your fields.',
      mission: 'Empower Finnish farmers with cutting-edge precision agriculture.',
      vision: 'A future where every hectare is managed with zero waste and maximum yield.',
      stats: [
        { num: '8+', label: 'Years of experience' },
        { num: '24', label: 'Certified drone pilots' },
        { num: '120K', label: 'Hectares serviced' },
        { num: '98%', label: 'Client satisfaction' },
      ],
    },
    services: {
      label: 'Our Services',
      headline: 'Everything your fields need, from the air',
      items: [
        { title: 'Drone Seeding', desc: 'Precise seed distribution across any terrain, including wet or steep fields inaccessible to tractors.' },
        { title: 'Fertilizer Spreading', desc: 'Variable-rate spreading based on soil maps ensures every gram of fertilizer lands where it matters.' },
        { title: 'Crop Spraying', desc: 'Ultra-low drift spraying with 90% less water than conventional equipment, protecting surrounding ecosystems.' },
        { title: 'Precision Agriculture', desc: 'Data-driven field management using AI-powered analytics to optimise every decision.' },
        { title: 'Crop Monitoring', desc: 'Regular flight surveys with multispectral cameras to track crop health throughout the season.' },
        { title: 'NDVI Mapping', desc: 'Detailed vegetative index maps reveal stress zones weeks before visible symptoms appear.' },
        { title: 'Field Surveying', desc: 'Centimetre-accuracy topographic maps for drainage planning, field boundaries and yield analysis.' },
        { title: 'Pest Detection', desc: 'Thermal and multispectral imaging pinpoints pest or disease hotspots for targeted intervention.' },
        { title: 'Soil Analysis', desc: 'Grid-based soil sampling coordination with lab integration for precise nutrient management.' },
        { title: 'Orchard Management', desc: 'Canopy density mapping and targeted spraying for berry farms, orchards and speciality crops.' },
      ],
    },
    howItWorks: {
      label: 'How It Works',
      headline: 'Four steps from field to insight',
      steps: [
        { num: '01', title: 'Field Assessment', desc: 'We visit your farm, assess field conditions, soil type, crop stage and your specific goals.' },
        { num: '02', title: 'Flight Planning', desc: 'Our software generates optimised flight paths, coverage patterns and payload settings.' },
        { num: '03', title: 'Drone Operation', desc: 'Certified pilots execute the mission with real-time telemetry and safety monitoring.' },
        { num: '04', title: 'Performance Report', desc: 'You receive a detailed report with maps, statistics and actionable recommendations.' },
      ],
    },
    why: {
      label: 'Why Choose Us',
      headline: 'Numbers that speak for themselves',
      items: [
        { num: '5×', label: 'Faster than traditional methods' },
        { num: '90%', label: 'Less water usage' },
        { num: '±2cm', label: 'Application precision' },
        { num: '0', label: 'Soil compaction' },
        { num: 'EU', label: 'Certified pilots & fleet' },
        { num: '24/7', label: 'Weather monitoring' },
      ],
    },
    benefits: {
      label: 'Benefits',
      headline: 'What precision agriculture delivers',
      items: [
        { title: 'Save time', desc: 'Cover 50–200 ha per day — tasks that take days with ground equipment done in hours.' },
        { title: 'Reduce costs', desc: 'Cut input costs by up to 30% through precision application and early problem detection.' },
        { title: 'Increase yields', desc: 'Data-driven decisions and timely treatments regularly produce 10–20% yield improvements.' },
        { title: 'Accurate application', desc: 'Centimetre GPS guidance eliminates overlaps and misses, ensuring uniform coverage.' },
        { title: 'Sustainable farming', desc: 'Reduced chemical loads, less machinery traffic and targeted interventions protect your land long-term.' },
      ],
    },
    gallery: {
      label: 'Gallery',
      headline: 'Seen from above',
    },
    testimonials: {
      label: 'Testimonials',
      headline: 'Trusted by Finnish farmers',
      items: [
        {
          name: 'Matti Virtanen',
          role: 'Grain farmer, Häme',
          quote: 'The NDVI maps revealed a nutrient deficiency in our east field two weeks before symptoms appeared. We saved the entire crop. Absolutely outstanding service.',
          rating: 5,
        },
        {
          name: 'Sari Korhonen',
          role: 'Cooperative manager, South Ostrobothnia',
          quote: 'We switched our entire cooperative\'s spraying operations to drone services last season. The savings on chemicals alone paid for the contract in the first year.',
          rating: 5,
        },
        {
          name: 'Jukka Mäkinen',
          role: 'Rapeseed & barley producer, Varsinais-Suomi',
          quote: 'Professional, punctual, and the data they provide is genuinely useful. We now make every major field decision based on their reports.',
          rating: 5,
        },
      ],
    },
    faq: {
      label: 'FAQ',
      headline: 'Common questions',
      items: [
        { q: 'What crops can drones service?', a: 'Our fleet handles all major Finnish crops: wheat, barley, oats, rapeseed, sugar beet, potatoes, grass and more. We also serve speciality crops such as berries and vegetables.' },
        { q: 'Is drone spraying safe?', a: 'Yes. All our pilots hold EU Drone Category A2 and A3 certificates. We comply fully with Finnish Transport and Communications Agency (Traficom) regulations and carry comprehensive liability insurance.' },
        { q: 'How much area can be covered per day?', a: 'Depending on the task and field layout, a single drone can cover 30–200 hectares per day. For large operations we deploy multiple drones simultaneously.' },
        { q: 'What is the minimum field size?', a: 'We service fields from 5 hectares upwards, though the cost-efficiency improves significantly for larger areas. Contact us for a tailored quote.' },
        { q: 'Do you operate in all weather conditions?', a: 'We fly in wind speeds up to 10 m/s and temperatures from +5°C to +35°C. We monitor weather continuously and reschedule at no cost if conditions are unsuitable.' },
        { q: 'How do I get a quote?', a: 'Fill in our contact form or call us directly. We typically respond within 4 business hours with a preliminary estimate based on your field size and required service.' },
      ],
    },
    contact: {
      label: 'Contact',
      headline: "Let's talk about your fields",
      sub: 'Request a quote or ask any question. We respond within 4 business hours.',
      name: 'Full name',
      email: 'Email address',
      phone: 'Phone number',
      message: 'Tell us about your fields and what you need',
      send: 'Send message',
      orCall: 'Or reach us directly',
      address: 'Agrotie 12, 60100 Seinäjoki, Finland',
      officeHours: 'Mon–Fri 8:00–17:00',
    },
    cookies: {
      title: 'Cookie settings',
      summary: 'We use necessary cookies to keep the site working and optional cookies to improve performance.',
      bannerText: 'This website uses cookies. Necessary cookies are always active. You can accept all, reject optional cookies, or manage preferences.',
      acceptAll: 'Accept all',
      rejectOptional: 'Reject optional',
      manage: 'Manage cookies',
      save: 'Save preferences',
      necessary: 'Necessary cookies',
      necessaryDesc: 'Required for core functionality and security. Always active.',
      analytics: 'Analytics cookies',
      analyticsDesc: 'Help us understand traffic and improve the website.',
      marketing: 'Marketing cookies',
      marketingDesc: 'Used to measure campaign performance and ad relevance.',
      settingsLink: 'Cookie Settings',
      policy: 'Cookie Policy',
    },
    footer: {
      tagline: 'Precision agriculture from the sky.',
      quickLinks: 'Quick Links',
      services: 'Services',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      rights: '© 2025 AgroDrone Finland Oy. All rights reserved.',
    },
  },
  fi: {
    nav: {
      services: 'Palvelut',
      about: 'Meistä',
      howItWorks: 'Miten toimii',
      gallery: 'Galleria',
      contact: 'Yhteystiedot',
      getQuote: 'Pyydä tarjous',
    },
    hero: {
      headline: 'Tarkkuusmaataloutta droonien avulla',
      sub: 'Kylvöstä lannoitukseen, ruiskutukseen ja kasvuston seurantaan – autamme viljelijöitä kasvattamaan satoa ja pienentämään kustannuksia.',
      cta1: 'Pyydä tarjous',
      cta2: 'Palvelut',
      badge: 'Sertifioidut droonilentäjät · Suomi',
    },
    about: {
      label: 'Meistä',
      headline: 'Teknologia kohtaa maan',
      body: 'Yhdistämme edistyksellisen drooniteknologian ja modernin maatalouden tarjotaksemme tehokkaita, kestäviä ja tarkkoja viljelyratkaisuja. Agronomeista ja ilmailutekniikan insinööreistä koostuva tiimimme ymmärtää sekä pellot että ilmatilan.',
      mission: 'Antaa suomalaisille viljelijöille pääsy huipputeknologiseen tarkkuusmaatalouteen.',
      vision: 'Tulevaisuus, jossa jokainen hehtaari hoidetaan ilman hukkaa ja maksimituotolla.',
      stats: [
        { num: '8+', label: 'Vuoden kokemus' },
        { num: '24', label: 'Sertifioitua droonilentäjää' },
        { num: '120K', label: 'Hehtaaria palveltu' },
        { num: '98%', label: 'Asiakastyytyväisyys' },
      ],
    },
    services: {
      label: 'Palvelut',
      headline: 'Kaikki mitä peltosi tarvitsevat, ilmasta käsin',
      items: [
        { title: 'Droonikylvö', desc: 'Tarkka siementen levitys maaston muodoista riippumatta, myös kosteille tai jyrkille pelloille.' },
        { title: 'Lannoitteen levitys', desc: 'Vaihtuva levitysmäärä maaperähävityksen perusteella – jokainen gramma lannoitetta oikeaan paikkaan.' },
        { title: 'Kasvinsuojeluruiskutus', desc: 'Erittäin vähäinen ajelehtiminen ja 90 % vähemmän vettä kuin perinteisillä laitteilla.' },
        { title: 'Tarkkuusmaatalous', desc: 'Dataohjautuva peltojen hoito tekoälyanalytiikan avulla jokaisen päätöksen optimoimiseksi.' },
        { title: 'Kasvuston seuranta', desc: 'Säännölliset lentoseurannat monispektrikameroilla kasvuston tilan tarkkailemiseksi koko kasvukauden.' },
        { title: 'NDVI-kartoitus', desc: 'Yksityiskohtaiset kasvillisuusindeksikartat paljastavat stressialueet viikkoja ennen näkyviä oireita.' },
        { title: 'Peltokartoitus', desc: 'Senttimetritason tarkkuudella tehdyt topografiset kartat ojitussuunnitteluun ja satoanalyysiin.' },
        { title: 'Tuholaishavaitseminen', desc: 'Terminen ja monispektrikuvaus paikallistaa tuholais- tai tautipesäkkeet kohdistettua torjuntaa varten.' },
        { title: 'Maa-analyysi', desc: 'Ruudukkonäytteenotto ja laboratoriointegratio tarkkaan ravinnesuunnitteluun.' },
        { title: 'Puutarhaviljelys', desc: 'Latvustiheyskartoitus ja kohdennettu ruiskutus marjatiloille, puutarhoille ja erikoiskasveille.' },
      ],
    },
    howItWorks: {
      label: 'Miten toimii',
      headline: 'Neljä vaihetta pellolta tietoon',
      steps: [
        { num: '01', title: 'Peltoarviointi', desc: 'Käymme tilallasi arvioimassa pelto-olosuhteet, maaperätyypin, kasvuvaiheen ja tavoitteesi.' },
        { num: '02', title: 'Lentosuunnittelu', desc: 'Ohjelmistomme luo optimoidut lentoreitit, kattavuusmallit ja kuorma-asetukset.' },
        { num: '03', title: 'Droonilento', desc: 'Sertifioidut lentäjät toteuttavat lennon reaaliaikaisella telemetrialla ja turvallisuusseurannalla.' },
        { num: '04', title: 'Suoritusraportti', desc: 'Saat yksityiskohtaisen raportin karttoineen, tilastoineen ja toimenpidesuosituksineen.' },
      ],
    },
    why: {
      label: 'Miksi valita meidät',
      headline: 'Luvut puhuvat puolestaan',
      items: [
        { num: '5×', label: 'Nopeampi kuin perinteiset menetelmät' },
        { num: '90%', label: 'Vähemmän vedenkulutusta' },
        { num: '±2cm', label: 'Levitystarkkuus' },
        { num: '0', label: 'Maan tiivistymistä' },
        { num: 'EU', label: 'Sertifioidut lentäjät ja kalusto' },
        { num: '24/7', label: 'Sääseuranta' },
      ],
    },
    benefits: {
      label: 'Hyödyt',
      headline: 'Mitä tarkkuusmaatalous tuo mukanaan',
      items: [
        { title: 'Säästä aikaa', desc: '50–200 ha päivässä – maakoneilla päiviä kestävät tehtävät hoituvat tunneissa.' },
        { title: 'Pienennä kustannuksia', desc: 'Leikkaa panosten kustannuksia jopa 30 % tarkan levityksen ja varhaisen ongelmantunnistuksen avulla.' },
        { title: 'Lisää satoa', desc: 'Dataohjautuvat päätökset ja oikea-aikainen käsittely tuottavat säännöllisesti 10–20 % satolisäyksen.' },
        { title: 'Tarkka levitys', desc: 'Senttimetritason GPS-ohjaus poistaa päällekkäisyydet ja aukkopaikat.' },
        { title: 'Kestävä viljely', desc: 'Pienemmät kemikaaliannokset, vähemmän ajorasitusta ja kohdennetut toimenpiteet suojelevat maatasi.' },
      ],
    },
    gallery: {
      label: 'Galleria',
      headline: 'Nähty ylhäältä',
    },
    testimonials: {
      label: 'Asiakaskokemuksia',
      headline: 'Suomalaisten viljelijöiden luottama',
      items: [
        {
          name: 'Matti Virtanen',
          role: 'Viljatilallinen, Häme',
          quote: 'NDVI-kartat paljastivat ravinnevajavuuden itäpellollamme kaksi viikkoa ennen oireiden näkymistä. Pelastimme koko sadon. Aivan erinomainen palvelu.',
          rating: 5,
        },
        {
          name: 'Sari Korhonen',
          role: 'Osuuskunnanjohtaja, Etelä-Pohjanmaa',
          quote: 'Siirrimme koko osuuskuntamme ruiskutustoiminnat droonipalveluihin viime kaudella. Pelkät kemikaalikustannussäästöt maksoivat sopimuksen ensimmäisenä vuonna.',
          rating: 5,
        },
        {
          name: 'Jukka Mäkinen',
          role: 'Rypsi- ja ohraviljelijä, Varsinais-Suomi',
          quote: 'Ammattimainen, täsmällinen ja toimitettu data on aidosti hyödyllistä. Teemme nyt kaikki tärkeät peltopäätökset heidän raporttejensa pohjalta.',
          rating: 5,
        },
      ],
    },
    faq: {
      label: 'UKK',
      headline: 'Usein kysytyt kysymykset',
      items: [
        { q: 'Mitä kasveja voidaan käsitellä drooneilla?', a: 'Kalustoamme voidaan käyttää kaikkien tärkeimpien suomalaisten viljelykasvien kanssa: vehnä, ohra, kaura, rypsi, sokerijuurikas, peruna, nurmi ja paljon muuta. Palvelemme myös erikoiskasveja kuten marjoja ja vihanneksia.' },
        { q: 'Onko drooniruiskutus turvallista?', a: 'Kyllä. Kaikilla lentäjillämme on EU-droonin A2- ja A3-luokan sertifikaatit. Noudatamme täysin Traficomin määräyksiä ja meillä on kattava vastuuvakuutus.' },
        { q: 'Kuinka suuren alueen drone pystyy käsittelemään päivässä?', a: 'Tehtävästä ja peltomuodosta riippuen yksi drone voi käsitellä 30–200 hehtaaria päivässä. Suurissa töissä otamme käyttöön useita droneja samanaikaisesti.' },
        { q: 'Mikä on pienin palveltava peltokoko?', a: 'Palvelemme vähintään 5 hehtaarin peltoja, mutta kustannustehokkuus paranee huomattavasti suuremmilla alueilla. Ota yhteyttä räätälöityä tarjousta varten.' },
        { q: 'Lentävätkö dronenne kaikissa sääolosuhteissa?', a: 'Lennämme tuulinopeuksissa jopa 10 m/s ja lämpötiloissa +5°C–+35°C. Seuraamme säätä jatkuvasti ja siirrämme lennon ilmaiseksi epäsuotuisissa olosuhteissa.' },
        { q: 'Miten pyydän tarjouksen?', a: 'Täytä yhteydenottolomake tai soita meille suoraan. Vastaamme tyypillisesti 4 tunnin kuluessa alustavan arvion kera peltoalasi ja tarvitsemiesi palveluiden perusteella.' },
      ],
    },
    contact: {
      label: 'Yhteystiedot',
      headline: 'Jutellaan pelloistasi',
      sub: 'Pyydä tarjous tai kysy mitä tahansa. Vastaamme 4 tunnin kuluessa.',
      name: 'Koko nimi',
      email: 'Sähköpostiosoite',
      phone: 'Puhelinnumero',
      message: 'Kerro pelloistasi ja tarpeistasi',
      send: 'Lähetä viesti',
      orCall: 'Tai ota suoraan yhteyttä',
      address: 'Agrotie 12, 60100 Seinäjoki, Suomi',
      officeHours: 'Ma–Pe 8:00–17:00',
    },
    cookies: {
      title: 'Evästeasetukset',
      summary: 'Käytämme välttämättömiä evästeitä sivuston toimintaan sekä valinnaisia evästeitä suorituskyvyn parantamiseen.',
      bannerText: 'Tämä sivusto käyttää evästeitä. Välttämättömät evästeet ovat aina käytössä. Voit hyväksyä kaikki, hylätä valinnaiset tai hallita asetuksia.',
      acceptAll: 'Hyväksy kaikki',
      rejectOptional: 'Hylkää valinnaiset',
      manage: 'Hallitse evästeitä',
      save: 'Tallenna asetukset',
      necessary: 'Välttämättömät evästeet',
      necessaryDesc: 'Tarvitaan sivuston toimintaan ja turvallisuuteen. Aina käytössä.',
      analytics: 'Analytiikkaevästeet',
      analyticsDesc: 'Auttavat meitä ymmärtämään liikennettä ja parantamaan sivustoa.',
      marketing: 'Markkinointievästeet',
      marketingDesc: 'Käytetään kampanjoiden tehokkuuden ja mainonnan osuvuuden mittaamiseen.',
      settingsLink: 'Evästeasetukset',
      policy: 'Evästekäytäntö',
    },
    footer: {
      tagline: 'Tarkkuusmaataloutta taivaalta.',
      quickLinks: 'Pikalinkit',
      services: 'Palvelut',
      legal: 'Juridinen',
      privacy: 'Tietosuojaseloste',
      terms: 'Palveluehdot',
      rights: '© 2025 AgroDrone Finland Oy. Kaikki oikeudet pidätetään.',
    },
  },
}

const serviceCardImages = [
  '/images/seed.png',
  '/images/furt.png',
  'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1200',
  '/images/map.png',
  'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/248880/pexels-photo-248880.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/7728333/pexels-photo-7728333.jpeg?auto=compress&cs=tinysrgb&w=1200',
]

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop&auto=format', alt: 'Green crops at sunset from above' },
  { url: 'https://images.unsplash.com/photo-1755499537070-e8606db4a74c?w=600&h=800&fit=crop&auto=format', alt: 'Wheat field with tracks leading to forest' },
  { url: 'https://images.unsplash.com/photo-1602246948253-16817718e26b?w=600&h=400&fit=crop&auto=format', alt: 'Finnish rapeseed field in bloom' },
  { url: 'https://images.unsplash.com/photo-1559668772-786155c8cdf2?w=600&h=500&fit=crop&auto=format', alt: 'Wheat stalks close up' },
  { url: 'https://images.unsplash.com/photo-1561417385-0cc70fc71164?w=600&h=400&fit=crop&auto=format', alt: 'Aerial view of farm surrounded by fields' },
  { url: 'https://images.unsplash.com/photo-1549024449-d6968d2a435f?w=600&h=700&fit=crop&auto=format', alt: 'Green crops growing in rows' },
  { url: 'https://images.unsplash.com/photo-1761839257961-4dce65b72d99?w=600&h=400&fit=crop&auto=format', alt: 'Tractor harvesting crops' },
  { url: 'https://images.unsplash.com/photo-1630277975641-38748ee8f41a?w=600&h=450&fit=crop&auto=format', alt: 'Aerial field view' },
  { url: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=600&h=400&fit=crop&auto=format', alt: 'Green tractor in field' },
]

const testimonialAvatars = [
  'https://images.unsplash.com/photo-1740477138822-906f6b845579?w=80&h=80&fit=crop&auto=format&face=center',
  'https://images.unsplash.com/photo-1784000299726-5cca66b771f9?w=80&h=80&fit=crop&auto=format&face=center',
  'https://images.unsplash.com/photo-1781397972640-0b1c14fa7c93?w=80&h=80&fit=crop&auto=format&face=center',
]

const whyCardIcons = [
  <svg key="speed" viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 14a8 8 0 1116 0" stroke="currentColor" strokeWidth="1.8"/><path d="M12 14l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 14l-2 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg key="water" viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c2.8 3.6 5 6.1 5 8.6A5 5 0 017 12.6C7 10.1 9.2 7.6 12 4z" stroke="currentColor" strokeWidth="1.8"/><path d="M9.5 14.5c.4 1 1.4 1.7 2.5 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg key="precision" viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M12 5V3M12 21v-2M5 12H3M21 12h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg key="soil" viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 15c2.2 0 2.2-2 4.4-2s2.2 2 4.4 2 2.2-2 4.4-2S19.4 15 21.6 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 5v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M9 7c.8 1.5 3.2 1.5 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg key="certified" viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.8"/><path d="M9.8 9l1.5 1.5L14.4 7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 14l-1 5 4-2 4 2-1-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  <svg key="weather" viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M12 5v2M12 17v2M5 12h2M17 12h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M9.5 9.5a3.5 3.5 0 105 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
]

const benefitsCardIcons = [
  <svg key="time" viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="13" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M12 9v4l2 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M9 3h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg key="cost" viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l7 4v8l-7 4-7-4V8l7-4z" stroke="currentColor" strokeWidth="1.8"/><path d="M14.5 9.5c0-1.2-1-2-2.5-2s-2.5.7-2.5 1.8c0 1 .8 1.5 2.5 1.8 1.6.3 2.5.8 2.5 1.9 0 1.1-1 1.9-2.5 1.9s-2.5-.8-2.5-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg key="yield" viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 17l4-4 3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 10h4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="accuracy" viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8"/><path d="M12 5V3M12 21v-2M5 12H3M21 12h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg key="sustainability" viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5c4.5 0 7 2.8 7 6.2 0 3.8-3.2 6.8-7 7.8-3.8-1-7-4-7-7.8C5 7.8 7.5 5 12 5z" stroke="currentColor" strokeWidth="1.8"/><path d="M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 12c-1.5 0-2.5-.9-3-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
]

const contactInfoIcons = {
  phone: <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4h3l1.2 3.1-1.7 1.5a14 14 0 005.9 5.9l1.5-1.7L20 14v3c0 .6-.4 1-1 1A15 15 0 014 5c0-.6.4-1 1-1h2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>,
  email: <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M5 8l7 5 7-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  location: <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20s6-5.4 6-10a6 6 0 10-12 0c0 4.6 6 10 6 10z" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7"/></svg>,
  hours: <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7"/><path d="M12 7.5v5l3 1.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  mapPin: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" stroke="#ffffff" strokeWidth="1.8"/><circle cx="12" cy="10" r="2.4" fill="#ffffff"/></svg>,
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-sm">★</span>
      ))}
    </div>
  )
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function RevealDiv({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>('fi')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formSent, setFormSent] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cookiePrefs, setCookiePrefs] = useState<CookiePrefs>(DEFAULT_COOKIE_PREFS)
  const [cookieConsent, setCookieConsent] = useState<CookieConsentRecord | null>(null)
  const [showCookiePanel, setShowCookiePanel] = useState(false)
  const copy = t[lang]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
      if (!stored) return

      const parsed = JSON.parse(stored) as CookieConsentRecord
      if (!parsed?.prefs) return

      const safePrefs: CookiePrefs = {
        analytics: !!parsed.prefs.analytics,
        marketing: !!parsed.prefs.marketing,
      }

      setCookiePrefs(safePrefs)
      setCookieConsent({
        status: parsed.status,
        updatedAt: parsed.updatedAt,
        prefs: safePrefs,
      })
    } catch {
      localStorage.removeItem(COOKIE_CONSENT_KEY)
    }
  }, [])

  const persistCookieConsent = (status: CookieConsentRecord['status'], prefs: CookiePrefs) => {
    const payload: CookieConsentRecord = {
      status,
      updatedAt: new Date().toISOString(),
      prefs,
    }

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload))
    setCookiePrefs(prefs)
    setCookieConsent(payload)
    setShowCookiePanel(false)
  }

  const acceptAllCookies = () => {
    persistCookieConsent('accepted', { analytics: true, marketing: true })
  }

  const rejectOptionalCookies = () => {
    persistCookieConsent('rejected', { analytics: false, marketing: false })
  }

  const saveCustomCookies = () => {
    persistCookieConsent('custom', cookiePrefs)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
  }

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i)

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── STICKY NAV ─────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: 'rgba(12,27,58,0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <img
              src="/branding/logo-mark-64.png"
              alt="AgriGrow Solutions logo"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="font-bold text-white text-lg tracking-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
              AgroDrone
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ background: 'rgba(76,175,120,0.25)', border: '1px solid rgba(76,175,120,0.4)' }}>
              Finland
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {(['services', 'about', 'howItWorks', 'gallery', 'contact'] as const).map((k) => (
              <a
                key={k}
                href={`#${k}`}
                className="nav-link text-sm font-medium text-white/80 hover:text-white"
              >
                {copy.nav[k]}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Lang toggle */}
            <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
              {(['fi', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-3 py-1.5 text-xs font-semibold uppercase transition-all duration-200"
                  style={{
                    background: lang === l ? '#1a5c38' : 'transparent',
                    color: lang === l ? '#fff' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            <a
              href="#contact"
              className="hidden sm:block cta-primary text-sm font-semibold px-5 py-2 rounded-lg text-white"
              style={{ background: 'linear-gradient(135deg,#1a5c38,#2d7a4f)' }}
            >
              {copy.nav.getQuote}
            </a>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`mobile-menu lg:hidden fixed inset-0 z-50 flex flex-col pt-20 px-6 pb-8 gap-6 ${mobileOpen ? 'open' : ''}`}
          style={{ backgroundColor: '#0c1b3a' }}
        >
          <button className="absolute top-5 right-6 text-white/70 text-2xl" onClick={() => setMobileOpen(false)}>✕</button>
          {(['services', 'about', 'howItWorks', 'gallery', 'contact'] as const).map((k) => (
            <a
              key={k}
              href={`#${k}`}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-medium text-white/90 hover:text-white"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {copy.nav[k]}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 cta-primary text-center font-semibold px-6 py-3 rounded-xl text-white"
            style={{ background: 'linear-gradient(135deg,#1a5c38,#2d7a4f)' }}
          >
            {copy.nav.getQuote}
          </a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-start overflow-hidden"
        style={{ background: '#0c1b3a' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1561417385-0cc70fc71164?w=1600&h=900&fit=crop&auto=format)`,
          }}
        />
        <div className="hero-overlay absolute inset-0" />

        {/* Decorative orb */}
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #4caf78, transparent)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-24 sm:py-28 md:py-40">
          <div className="max-w-3xl">
            <div className="animate-fade-up">
              <span
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8"
                style={{ background: 'rgba(76,175,120,0.15)', border: '1px solid rgba(76,175,120,0.4)', color: '#4caf78' }}
              >
                <span className="animate-pulse-ring inline-block w-2 h-2 rounded-full bg-green-400" />
                {copy.hero.badge}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-normal text-white leading-tight mb-5 sm:mb-6 animate-fade-up delay-100"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {copy.hero.headline}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/75 leading-relaxed mb-8 sm:mb-10 max-w-2xl animate-fade-up delay-200">
              {copy.hero.sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <a
                href="#contact"
                className="cta-primary inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-white text-sm sm:text-base"
                style={{ background: 'linear-gradient(135deg,#1a5c38,#4caf78)' }}
              >
                {copy.hero.cta1}
                <span>→</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/10"
                style={{ border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff' }}
              >
                {copy.hero.cta2}
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs animate-fade-in delay-600">
          <span className="uppercase tracking-widest text-[10px]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────── */}
      <section id="about" className="py-16 sm:py-20 md:py-24 overflow-hidden" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
            <div>
              <RevealDiv>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#1a5c38' }}>
                  {copy.about.label}
                </span>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-normal mt-3 mb-5 sm:mb-6 leading-tight"
                  style={{ fontFamily: "'DM Serif Display', serif", color: '#0c1b3a' }}
                >
                  {copy.about.headline}
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: '#3d5a47' }}>
                  {copy.about.body}
                </p>

                <div className="space-y-4">
                  {[
                    { label: lang === 'fi' ? 'Missio' : 'Mission', text: copy.about.mission },
                    { label: lang === 'fi' ? 'Visio' : 'Vision', text: copy.about.vision },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4 p-4 rounded-xl" style={{ background: '#f4f7f4', border: '1px solid #d4e4d8' }}>
                      <div className="w-1 rounded-full flex-shrink-0" style={{ background: '#1a5c38' }} />
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#1a5c38' }}>{item.label}</div>
                        <p className="text-sm leading-relaxed" style={{ color: '#3d5a47' }}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealDiv>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {copy.about.stats.map((s, i) => (
                <RevealDiv key={i} delay={i * 80}>
                  <div
                    className="p-6 rounded-2xl text-center"
                    style={{
                      background: i % 2 === 0 ? '#0c1b3a' : '#1a5c38',
                      boxShadow: '0 8px 32px rgba(12,27,58,0.12)',
                    }}
                  >
                    <div className="stat-number text-white">{s.num}</div>
                    <div className="text-xs mt-2 text-white/70 font-medium">{s.label}</div>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <section id="services" className="py-16 sm:py-20 md:py-24" style={{ background: '#f4f7f4' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <RevealDiv>
            <SectionHeading
              className="mb-16"
              label={copy.services.label}
              title={copy.services.headline}
              labelStyle={{ color: '#1a5c38' }}
              titleStyle={{ color: '#0c1b3a' }}
            />
          </RevealDiv>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {copy.services.items.map((svc, i) => (
              <RevealDiv key={i} delay={i * 50}>
                <div
                  className="service-card bg-white rounded-2xl p-4 sm:p-5 cursor-pointer h-full flex flex-col"
                  style={{ border: '1px solid #d4e4d8', boxShadow: '0 2px 12px rgba(26,92,56,0.06)' }}
                >
                  <div
                    className="w-full h-28 rounded-xl mb-4 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${serviceCardImages[i]}")`,
                      backgroundColor: '#e8f4ec',
                    }}
                  />
                  <h3 className="font-semibold text-sm mb-2" style={{ color: '#0c1b3a', fontFamily: "'DM Serif Display', serif", fontSize: '1rem' }}>
                    {svc.title}
                  </h3>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: '#5a7060' }}>
                    {svc.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium" style={{ color: '#1a5c38' }}>
                    {lang === 'fi' ? 'Lue lisää' : 'Learn more'} <span>→</span>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section id="howItWorks" className="py-16 sm:py-20 md:py-24 relative overflow-hidden" style={{ background: '#0c1b3a' }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1755499537070-e8606db4a74c?w=1400&h=800&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(12,27,58,0.95) 0%, rgba(26,92,56,0.3) 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
          <RevealDiv>
            <SectionHeading
              className="mb-16"
              label={copy.howItWorks.label}
              title={copy.howItWorks.headline}
              labelStyle={{ color: '#4caf78' }}
              titleClassName="text-white"
            />
          </RevealDiv>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.howItWorks.steps.map((step, i) => (
              <RevealDiv key={i} delay={i * 100}>
                <div className="relative p-6 rounded-2xl glass h-full">
                  {i < copy.howItWorks.steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-10 right-0 translate-x-1/2 w-8 text-center text-white/20 text-xl z-10"
                    >
                      →
                    </div>
                  )}
                  <div
                    className="text-5xl font-bold mb-4 leading-none"
                    style={{ fontFamily: "'DM Serif Display', serif", color: 'rgba(76,175,120,0.25)' }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="text-lg font-medium text-white mb-3"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {step.desc}
                  </p>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 md:py-24" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <RevealDiv>
            <SectionHeading
              className="mb-16"
              label={copy.why.label}
              title={copy.why.headline}
              labelStyle={{ color: '#1a5c38' }}
              titleStyle={{ color: '#0c1b3a' }}
            />
          </RevealDiv>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {copy.why.items.map((item, i) => (
              <RevealDiv key={i} delay={i * 80}>
                <div
                  className="p-8 rounded-2xl transition-all duration-300 hover:shadow-lg"
                  style={{ background: '#f4f7f4', border: '1px solid #d4e4d8' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: '#0c1b3a', color: '#dceee1' }}
                    >
                      {whyCardIcons[i]}
                    </div>
                    <div
                      className="text-3xl font-bold"
                      style={{ fontFamily: "'DM Serif Display', serif", color: '#1a5c38' }}
                    >
                      {item.num}
                    </div>
                  </div>
                  <div className="text-sm font-medium" style={{ color: '#3d5a47' }}>{item.label}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden" style={{ background: '#1a5c38' }}>
        <div className="absolute inset-0 opacity-5">
          <div style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            width: '100%',
            height: '100%',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
            <RevealDiv>
              <span className="text-xs font-semibold uppercase tracking-widest text-green-300">
                {copy.benefits.label}
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-normal mt-3 text-white leading-tight mb-6 sm:mb-8"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {copy.benefits.headline}
              </h2>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              >
                <img
                  src="/images/fleet.png"
                  alt="Agricultural drone fleet in operation"
                  className="w-full h-64 object-cover"
                />
              </div>
            </RevealDiv>

            <div className="space-y-4">
              {copy.benefits.items.map((b, i) => (
                <RevealDiv key={i} delay={i * 80}>
                  <div
                    className="flex gap-4 p-5 rounded-xl transition-all duration-200 hover:bg-white/10"
                    style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.12)', color: '#d8f2e4' }}
                    >
                      {benefitsCardIcons[i]}
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-semibold text-white mb-1">{b.title}</h3>
                      <p className="text-sm leading-relaxed text-white/65">{b.desc}</p>
                    </div>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ────────────────────────────────────────────── */}
      <section id="gallery" className="py-16 sm:py-20 md:py-24" style={{ background: '#f4f7f4' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <RevealDiv>
            <SectionHeading
              className="mb-12"
              label={copy.gallery.label}
              title={copy.gallery.headline}
              labelStyle={{ color: '#1a5c38' }}
              titleStyle={{ color: '#0c1b3a' }}
            />
          </RevealDiv>

          <div className="masonry">
            {galleryImages.map((img, i) => (
              <div key={i} className="masonry-item" style={{ boxShadow: '0 4px 16px rgba(12,27,58,0.1)' }}>
                <img src={img.url} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 md:py-24" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <RevealDiv>
            <SectionHeading
              className="mb-16"
              label={copy.testimonials.label}
              title={copy.testimonials.headline}
              labelStyle={{ color: '#1a5c38' }}
              titleStyle={{ color: '#0c1b3a' }}
            />
          </RevealDiv>

          <div className="grid md:grid-cols-3 gap-6">
            {copy.testimonials.items.map((item, i) => (
              <RevealDiv key={i} delay={i * 100}>
                <div
                  className="p-8 rounded-2xl h-full flex flex-col"
                  style={{ background: '#f4f7f4', border: '1px solid #d4e4d8', boxShadow: '0 4px 20px rgba(26,92,56,0.06)' }}
                >
                  <StarRating count={item.rating} />
                  <blockquote
                    className="text-base leading-relaxed my-5 flex-1 italic"
                    style={{ color: '#2a3d30', fontFamily: "'DM Serif Display', serif" }}
                  >
                    "{item.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #d4e4d8' }}>
                    <img
                      src={testimonialAvatars[i]}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm" style={{ color: '#0c1b3a' }}>{item.name}</div>
                      <div className="text-xs" style={{ color: '#5a7060' }}>{item.role}</div>
                    </div>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 md:py-24" style={{ background: '#f4f7f4' }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <RevealDiv>
            <SectionHeading
              className="mb-16"
              label={copy.faq.label}
              title={copy.faq.headline}
              labelStyle={{ color: '#1a5c38' }}
              titleStyle={{ color: '#0c1b3a' }}
            />
          </RevealDiv>

          <div className="space-y-3">
            {copy.faq.items.map((item, i) => (
              <RevealDiv key={i} delay={i * 50}>
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ background: '#fff', border: '1px solid #d4e4d8' }}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-green-50"
                    onClick={() => toggleFaq(i)}
                  >
                    <span className="font-medium text-sm" style={{ color: '#0c1b3a' }}>{item.q}</span>
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-300"
                      style={{
                        background: openFaq === i ? '#1a5c38' : '#e8f4ec',
                        color: openFaq === i ? '#fff' : '#1a5c38',
                        transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div className={`faq-content ${openFaq === i ? 'open' : ''}`}>
                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#5a7060' }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────── */}
      <section id="contact" className="py-16 sm:py-20 md:py-24 relative overflow-hidden" style={{ background: '#0c1b3a' }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-8"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1630277975641-38748ee8f41a?w=1400&h=900&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(12,27,58,0.92)' }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
          <RevealDiv>
            <SectionHeading
              className="mb-16"
              label={copy.contact.label}
              title={copy.contact.headline}
              labelStyle={{ color: '#4caf78' }}
              titleClassName="text-white"
            />
            <p className="text-white/60 mt-3 text-center">{copy.contact.sub}</p>
          </RevealDiv>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <RevealDiv>
              {formSent ? (
                <div
                  className="p-10 rounded-2xl text-center flex flex-col items-center gap-4 h-full justify-center"
                  style={{ background: 'rgba(26,92,56,0.25)', border: '1px solid rgba(76,175,120,0.3)' }}
                >
                  <div className="text-5xl">✅</div>
                  <h3 className="text-xl text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    {lang === 'fi' ? 'Viesti lähetetty!' : 'Message sent!'}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {lang === 'fi'
                      ? 'Palaamme sinulle 4 tunnin kuluessa.'
                      : "We'll get back to you within 4 business hours."}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 rounded-2xl space-y-4"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {[
                    { key: 'name', label: copy.contact.name, type: 'text' },
                    { key: 'email', label: copy.contact.email, type: 'email' },
                    { key: 'phone', label: copy.contact.phone, type: 'tel' },
                  ].map(({ key, label, type }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-white/60 mb-1.5">{label}</label>
                      <input
                        type={type}
                        required={key !== 'phone'}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none focus:ring-2 transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          // @ts-expect-error custom focus handled by class
                          '--tw-ring-color': '#4caf78',
                        }}
                        placeholder={label}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">{copy.contact.message}</label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none focus:ring-2 transition-all resize-none"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                      placeholder={copy.contact.message}
                    />
                  </div>
                  <button
                    type="submit"
                    className="cta-primary w-full py-4 rounded-xl font-semibold text-white text-sm"
                    style={{ background: 'linear-gradient(135deg,#1a5c38,#4caf78)' }}
                  >
                    {copy.contact.send} →
                  </button>
                </form>
              )}
            </RevealDiv>

            {/* Contact info */}
            <RevealDiv delay={200}>
              <div className="space-y-6">
                <p className="text-white/60 text-sm leading-relaxed">{copy.contact.orCall}</p>

                {[
                  { iconKey: 'phone' as const, label: '+358 6 123 4567', href: 'tel:+35861234567' },
                  { iconKey: 'email' as const, label: 'info@agrodrone.fi', href: 'mailto:info@agrodrone.fi' },
                  { iconKey: 'location' as const, label: copy.contact.address },
                  { iconKey: 'hours' as const, label: copy.contact.officeHours },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(76,175,120,0.15)', border: '1px solid rgba(76,175,120,0.25)', color: '#d8f2e4' }}
                    >
                      {contactInfoIcons[item.iconKey]}
                    </div>
                    <div>
                      {item.href ? (
                        <a href={item.href} className="text-white hover:text-green-400 transition-colors text-sm">
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-white/70 text-sm">{item.label}</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Map placeholder */}
                <div
                  className="mt-6 rounded-2xl overflow-hidden relative"
                  style={{ height: '200px', background: '#1a2f5a', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1627920769541-daa658ed6b59?w=600&h=300&fit=crop&auto=format"
                    alt="Seinäjoki region"
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="mb-2" style={{ color: '#fff' }}>{contactInfoIcons.mapPin}</div>
                    <p className="text-white text-sm font-medium">Seinäjoki, Finland</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/35861234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 rounded-xl font-medium text-sm text-white transition-all hover:opacity-90"
                  style={{ background: '#25d366' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {lang === 'fi' ? 'WhatsApp-yhteys' : 'Contact via WhatsApp'}
                </a>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="py-16" style={{ background: '#060f1f', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="/branding/logo-mark-64.png"
                  alt="AgriGrow Solutions logo"
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="font-bold text-white text-lg" style={{ fontFamily: "'DM Serif Display', serif" }}>AgroDrone</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-5">{copy.footer.tagline}</p>
              <div className="flex gap-3">
                {[
                  { icon: '𝕏', href: '#' },
                  { icon: 'in', href: '#' },
                  { icon: 'f', href: '#' },
                  { icon: '▶', href: '#' },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white/50 hover:text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{copy.footer.quickLinks}</h4>
              <div className="space-y-2.5">
                {([
                  ['#', lang === 'fi' ? 'Etusivu' : 'Home'],
                  ['#about', lang === 'fi' ? 'Meistä' : 'About Us'],
                  ['#howItWorks', lang === 'fi' ? 'Miten toimii' : 'How It Works'],
                  ['#gallery', lang === 'fi' ? 'Galleria' : 'Gallery'],
                  ['#contact', lang === 'fi' ? 'Yhteystiedot' : 'Contact'],
                ] as [string, string][]).map(([href, label]) => (
                  <a key={label} href={href} className="block text-sm text-white/50 hover:text-white transition-colors">{label}</a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{copy.footer.services}</h4>
              <div className="space-y-2.5">
                {copy.services.items.slice(0, 5).map((s) => (
                  <a key={s.title} href="#services" className="block text-sm text-white/50 hover:text-white transition-colors">{s.title}</a>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{copy.footer.legal}</h4>
              <div className="space-y-2.5">
                <a href="#" className="block text-sm text-white/50 hover:text-white transition-colors">{copy.footer.privacy}</a>
                <a href="#" className="block text-sm text-white/50 hover:text-white transition-colors">{copy.footer.terms}</a>
                <a href="/cookie-policy.html" className="block text-sm text-white/50 hover:text-white transition-colors">{copy.cookies.policy}</a>
                <button
                  type="button"
                  onClick={() => setShowCookiePanel(true)}
                  className="block text-sm text-white/50 hover:text-white transition-colors"
                >
                  {copy.cookies.settingsLink}
                </button>
              </div>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-xs text-white/30">{copy.footer.rights}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/30">{lang === 'fi' ? 'Kieli' : 'Language'}:</span>
              <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                {(['fi', 'en'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="px-3 py-1 text-[10px] font-semibold uppercase transition-all duration-200"
                    style={{
                      background: lang === l ? '#1a5c38' : 'transparent',
                      color: lang === l ? '#fff' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ───────────────────────────────────── */}
      <a
        href="https://wa.me/35861234567"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white transition-transform hover:scale-110"
        style={{ background: '#25d366' }}
        aria-label="WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {!cookieConsent && (
        <div className="fixed left-4 right-4 bottom-4 z-[70] md:left-auto md:right-6 md:max-w-md rounded-2xl p-5" style={{ background: 'rgba(6,15,31,0.96)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 18px 48px rgba(0,0,0,0.35)' }}>
          <h3 className="text-white text-base mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>{copy.cookies.title}</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-4">{copy.cookies.bannerText}</p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={acceptAllCookies}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg,#1a5c38,#4caf78)' }}
            >
              {copy.cookies.acceptAll}
            </button>
            <button
              type="button"
              onClick={rejectOptionalCookies}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ border: '1px solid rgba(255,255,255,0.26)' }}
            >
              {copy.cookies.rejectOptional}
            </button>
            <button
              type="button"
              onClick={() => setShowCookiePanel(true)}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#dceee1' }}
            >
              {copy.cookies.manage}
            </button>
          </div>
        </div>
      )}

      {showCookiePanel && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-3 sm:p-6" style={{ background: 'rgba(3,9,18,0.72)' }}>
          <div className="w-full sm:max-w-lg rounded-2xl p-6" style={{ background: '#ffffff', border: '1px solid #d4e4d8', boxShadow: '0 20px 60px rgba(3,9,18,0.25)' }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-2xl" style={{ fontFamily: "'DM Serif Display', serif", color: '#0c1b3a' }}>{copy.cookies.title}</h3>
                <p className="text-sm mt-1" style={{ color: '#3d5a47' }}>{copy.cookies.summary}</p>
              </div>
              <button
                type="button"
                className="text-xl leading-none"
                style={{ color: '#5a7060' }}
                onClick={() => setShowCookiePanel(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl p-4" style={{ background: '#f4f7f4', border: '1px solid #d4e4d8' }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold" style={{ color: '#0c1b3a' }}>{copy.cookies.necessary}</p>
                    <p className="text-sm mt-1" style={{ color: '#5a7060' }}>{copy.cookies.necessaryDesc}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: '#dceee1', color: '#1a5c38' }}>ON</span>
                </div>
              </div>

              <div className="rounded-xl p-4" style={{ background: '#f4f7f4', border: '1px solid #d4e4d8' }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold" style={{ color: '#0c1b3a' }}>{copy.cookies.analytics}</p>
                    <p className="text-sm mt-1" style={{ color: '#5a7060' }}>{copy.cookies.analyticsDesc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCookiePrefs((prev) => ({ ...prev, analytics: !prev.analytics }))}
                    className="w-14 h-8 rounded-full relative transition-colors"
                    style={{ background: cookiePrefs.analytics ? '#1a5c38' : '#c8d7ce' }}
                    aria-label={copy.cookies.analytics}
                    aria-pressed={cookiePrefs.analytics}
                  >
                    <span
                      className="absolute top-1 w-6 h-6 rounded-full bg-white transition-transform"
                      style={{ transform: cookiePrefs.analytics ? 'translateX(30px)' : 'translateX(2px)' }}
                    />
                  </button>
                </div>
              </div>

              <div className="rounded-xl p-4" style={{ background: '#f4f7f4', border: '1px solid #d4e4d8' }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold" style={{ color: '#0c1b3a' }}>{copy.cookies.marketing}</p>
                    <p className="text-sm mt-1" style={{ color: '#5a7060' }}>{copy.cookies.marketingDesc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCookiePrefs((prev) => ({ ...prev, marketing: !prev.marketing }))}
                    className="w-14 h-8 rounded-full relative transition-colors"
                    style={{ background: cookiePrefs.marketing ? '#1a5c38' : '#c8d7ce' }}
                    aria-label={copy.cookies.marketing}
                    aria-pressed={cookiePrefs.marketing}
                  >
                    <span
                      className="absolute top-1 w-6 h-6 rounded-full bg-white transition-transform"
                      style={{ transform: cookiePrefs.marketing ? 'translateX(30px)' : 'translateX(2px)' }}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={saveCustomCookies}
                className="px-4 py-3 rounded-lg text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg,#1a5c38,#4caf78)' }}
              >
                {copy.cookies.save}
              </button>
              <button
                type="button"
                onClick={acceptAllCookies}
                className="px-4 py-3 rounded-lg text-sm font-semibold"
                style={{ color: '#1a5c38', border: '1px solid #b7d0c0' }}
              >
                {copy.cookies.acceptAll}
              </button>
              <button
                type="button"
                onClick={rejectOptionalCookies}
                className="px-4 py-3 rounded-lg text-sm font-semibold"
                style={{ color: '#3d5a47', border: '1px solid #d4e4d8' }}
              >
                {copy.cookies.rejectOptional}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
