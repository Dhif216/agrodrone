import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

type Lang = 'fi' | 'en'

interface ServiceDetailProps {
  lang: Lang
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const serviceDetails = {
    en: {
      seeding: {
        title: 'Drone Seeding',
        subtitle: 'Precision Aerial Planting',
        description: 'Our drone seeding technology revolutionizes crop establishment with precision placement and minimal soil disturbance.',
        features: [
          'Precise seed placement at optimal depths',
          'Reduced soil compaction compared to traditional methods',
          'Coverage of difficult terrain and water bodies',
          'Consistent seeding rates across fields',
          'Reduced seed waste through GPS-guided placement',
        ],
        benefits: [
          'Faster field preparation and planting',
          'Improved germination rates',
          'Better crop uniformity',
          'Cost savings on seed and labor',
          'Environmental benefits through reduced equipment passes',
        ],
        process: [
          'Field mapping and analysis',
          'Drone loading with seeds and calibration',
          'Automated flight path execution',
          'Real-time monitoring and verification',
          'Post-planting report generation',
        ],
      },
      spraying: {
        title: 'Fertilizer & Crop Spraying',
        subtitle: 'Efficient Nutrient Application',
        description: 'Precision aerial application of fertilizers, pesticides, and crop protection products with minimal environmental impact.',
        features: [
          'Variable rate application based on field conditions',
          'Reduced chemical usage vs ground application',
          'Eliminates tire tracks and soil compaction',
          'Access to flooded or muddy fields',
          'Precise targeting of problem areas',
        ],
        benefits: [
          'Faster application compared to ground equipment',
          'Uniform coverage and consistent results',
          'Reduced chemical costs',
          'Better crop health and yields',
          'Environmentally safer with precise targeting',
        ],
        process: [
          'Field scouting and assessment',
          'Tank loading with specified products',
          'Drone calibration for flow rate',
          'Systematic coverage flight',
          'Application verification report',
        ],
      },
      ndvi: {
        title: 'NDVI Crop Mapping',
        subtitle: 'Data-Driven Field Insights',
        description: 'Advanced multispectral imaging to assess crop health, identify problem areas, and optimize resource management.',
        features: [
          'High-resolution NDVI mapping',
          'Real-time crop health visualization',
          'Early problem detection (disease, stress)',
          'Variable rate prescription generation',
          'Historical data tracking and comparison',
        ],
        benefits: [
          'Identify underperforming areas early',
          'Optimize fertilizer and water application',
          'Predict and prevent crop losses',
          'Increase yields through targeted management',
          'Data-driven decision making',
        ],
        process: [
          'Multispectral flight over field',
          'Data processing and NDVI calculation',
          'Orthomosaic image generation',
          'Prescription map creation',
          'Report with actionable insights',
        ],
      },
      surveying: {
        title: 'Field Surveying',
        subtitle: 'Accurate Aerial Mapping',
        description: 'Professional aerial surveying for precise field measurements, boundary verification, and detailed orthomosaics.',
        features: [
          'High-accuracy GPS positioning',
          'Detailed orthophoto mosaics',
          'Topographic mapping and contours',
          'Volume calculations for terrain changes',
          'Boundary verification and documentation',
        ],
        benefits: [
          'Accurate field records and documentation',
          'Boundary disputes resolution',
          'Planning for drainage and management',
          'Professional reports for compliance',
          'Historical records for trend analysis',
        ],
        process: [
          'Ground control point establishment',
          'High-resolution aerial photography',
          'Photogrammetric processing',
          'Data analysis and report generation',
          'Export to various formats (GIS, CAD, etc)',
        ],
      },
      monitoring: {
        title: 'Crop Monitoring',
        subtitle: 'Regular Field Health Checks',
        description: 'Scheduled aerial monitoring to track crop development, detect issues early, and optimize seasonal management.',
        features: [
          'Weekly or bi-weekly monitoring flights',
          'Consistent documentation of field progress',
          'Early detection of pests and diseases',
          'Growth stage verification',
          'Flood or damage assessment',
        ],
        benefits: [
          'Proactive issue management',
          'Reduced losses from pest/disease outbreaks',
          'Better planning for harvesting',
          'Insurance documentation support',
          'Predictive analytics for yield forecasting',
        ],
        process: [
          'Scheduled monitoring calendar setup',
          'Regular automated flights',
          'Image analysis and reporting',
          'Alert generation for anomalies',
          'Seasonal summary and recommendations',
        ],
      },
    },
    fi: {
      seeding: {
        title: 'Droonikylvö',
        subtitle: 'Tarkkuuden Ilmaisia Kylvöä',
        description: 'Droonikylvöteknologiamme mullistaa viljelyksen perustamisen tarkkuuden sijoittelulla ja minimaalisen maaperän häiriön avulla.',
        features: [
          'Tarkka siemententä sijoittelu optimaalisessa syvyydessä',
          'Pienempi maaperän tiivistyminen perinteisiin menetelmiin verrattuna',
          'Vaikeiden maastojen ja vesistöjen peittäminen',
          'Yhtenäiset kylvönopeudet koko pellolla',
          'Alennettu siemenvaje GPS-ohjatun sijoittelun avulla',
        ],
        benefits: [
          'Nopeampi pellon valmistelu ja kylvö',
          'Paremmat itävyysprosentit',
          'Parempi viljojen yhtenäisyys',
          'Kustannussäästöt siemenessä ja työvoimassa',
          'Ympäristöhyödyt vähennettyjen laitekulkujen kautta',
        ],
        process: [
          'Pellon kartoitus ja analysointi',
          'Dronin kuormitaminen siemenillä ja kalibrointi',
          'Automatisoitu lentorataksi suoritus',
          'Reaaliaikainen seuranta ja tarkistus',
          'Kylvöjälkeen raportin luonti',
        ],
      },
      spraying: {
        title: 'Lannoitteen levitys',
        subtitle: 'Tehokas Ravinteiden Toimittaminen',
        description: 'Tarkkuuden ilmainen lannoitteiden, torjunta-aineiden ja kasvien suojatuotteiden levitys minimaalisen ympäristövaikutuksen kanssa.',
        features: [
          'Muuttuva sovellusnopeus pellön olosuhteiden perusteella',
          'Vähennetty kemikaalien käyttö maataloustekniikoihin verrattuna',
          'Renkaiden jälkien poistaminen ja maaperän tiivistymisen esto',
          'Pääsy tulville tai mutaisille pelloille',
          'Tarkkuuden kohdistaminen ongelma-alueisiin',
        ],
        benefits: [
          'Nopeampi levitys maatalouslaitteisiin verrattuna',
          'Yhtenäinen peittävyys ja johdonmukaisia tuloksia',
          'Vähennetyt kemikalien kustannukset',
          'Parempi kasvinsuoja ja sadon määrä',
          'Ympäristöturvallisempi tarkkuuden kohdistamisen myötä',
        ],
        process: [
          'Pellon kartoitus ja arviointi',
          'Säiliön kuormitaminen määritetyillä tuotteilla',
          'Dronin kalibrointi virtausnopeuden osalta',
          'Systemaattinen peittävyylento',
          'Levityksen tarkistuksen raportointi',
        ],
      },
      ndvi: {
        title: 'Maa-analyysi',
        subtitle: 'Tietoon perustuvat Pellon Näkemykset',
        description: 'Kehittynyt multispektinen kuvantaminen kasvien terveyden arvioimiseksi, ongelma-alueiden tunnistamiseksi ja resurssien hallinnon optimoinnille.',
        features: [
          'Korkearesoluutioinen NDVI-kartoitus',
          'Reaaliaikainen kasvien terveyden visualisointi',
          'Varhainen ongelmatunnistus (sairaus, stressi)',
          'Muuttuvan hinnan määritysten luominen',
          'Historiallisten tietojen seuranta ja vertailu',
        ],
        benefits: [
          'Tunnistamattomat alueet varhaisessa vaiheessa',
          'Optimoi lannoitteen ja veden levitystä',
          'Ennusta ja estä sadon menetykset',
          'Lisää satoja kohdistetun hallinnan avulla',
          'Tietoon perustuvat päätöksenteko',
        ],
        process: [
          'Multispektinen lento pellon yli',
          'Tietojen käsittely ja NDVI:n laskeminen',
          'Ortomosaiikkikuvan luonti',
          'Määrityskarttojen luominen',
          'Raportti, jossa on toimenpide-ehdotuksia',
        ],
      },
      surveying: {
        title: 'Pellon mittaus',
        subtitle: 'Tarkkuuden Ilmainen Kartoitus',
        description: 'Ammattimainen ilmainen mittaus tarkkaille pellon mittauksille, rajan tarkistukselle ja yksityiskohtaisille ortomosaiikkioille.',
        features: [
          'Korkean tarkkuuden GPS-sijainti',
          'Yksityiskohtaiset ortofotomosaiikki',
          'Topografinen kartoitus ja ääriviivat',
          'Äänenvoimakkuuden laskeminen maastomuutoksille',
          'Rajan tarkistus ja dokumentointi',
        ],
        benefits: [
          'Tarkat pellon tiedot ja dokumentointi',
          'Rajariitaisuuksien ratkaiseminen',
          'Kuivatus- ja hallintasuunnittelu',
          'Ammattilaiset raportit vaatimuksenmukaisuudelle',
          'Historialliset tiedot suuntaukselle',
        ],
        process: [
          'Maanpinta-ohjauspisteen perustaminen',
          'Korkea-resoluutioinen ilmainen valokuvaus',
          'Fotogrammetrinen käsittely',
          'Tietojen analyysi ja raportin luonti',
          'Vienti eri muodoissa (GIS, CAD, jne)',
        ],
      },
      monitoring: {
        title: 'Sadon seuranta',
        subtitle: 'Säännöllisen Pellon Terveystarkastukset',
        description: 'Ajastettu ilmainen seuranta kasvien kehityksen seuraamiseksi, ongelmien varhaiseen tunnistamiseen ja kauden hallinnan optimointiin.',
        features: [
          'Viikoittainen tai kahden viikon välein seurantalenno',
          'Johdonmukainen pellon edistymisen dokumentointi',
          'Tuholaisten ja sairauksien varhainen tunnistus',
          'Kasvun vaiheen vahvistus',
          'Tulva- tai vaurioarvio',
        ],
        benefits: [
          'Proaktiivinen ongelmatenhallinta',
          'Pienempi menetys tuholaisten/tautien puhkeamisesta',
          'Parempi sadonkorjuusuunnittelu',
          'Vakuutusta tukevat dokumentoinnit',
          'Ennustavat analyytiikat sadon ennusteelle',
        ],
        process: [
          'Ajastetun seurantakalenterin asetus',
          'Säännölliset automatisoitu lennokit',
          'Kuvan analyysi ja raportointi',
          'Hälytyksen luonti poikkeamille',
          'Kauden yhteenveto ja suositukset',
        ],
      },
    },
  }

  const serviceKeys = ['seeding', 'spraying', 'ndvi', 'surveying', 'monitoring']
  const service = serviceDetails[lang][id as keyof typeof serviceDetails[Lang]]

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8fafb' }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#0c1b3a' }}>Service not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg font-medium text-white"
            style={{ background: '#1a5c38' }}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#f8fafb' }}>
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: '#1a5c38' }}
        >
          ← {lang === 'fi' ? 'Takaisin' : 'Back'}
        </button>
      </div>

      {/* Header */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'DM Serif Display', serif", color: '#0c1b3a' }}
          >
            {service.title}
          </h1>
          <p className="text-lg sm:text-xl mb-8" style={{ color: '#5a7060' }}>
            {service.subtitle}
          </p>
          <p className="text-lg leading-relaxed" style={{ color: '#3d4f42' }}>
            {service.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-bold mb-10"
            style={{ fontFamily: "'DM Serif Display', serif", color: '#0c1b3a' }}
          >
            {lang === 'fi' ? 'Ominaisuudet' : 'Features'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-lg"
                style={{ background: '#f0f5f2', border: '1px solid #d4e4d8' }}
              >
                <div className="text-xl font-bold" style={{ color: '#1a5c38' }}>✓</div>
                <p style={{ color: '#3d4f42' }}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-bold mb-10"
            style={{ fontFamily: "'DM Serif Display', serif", color: '#0c1b3a' }}
          >
            {lang === 'fi' ? 'Hyödyt' : 'Benefits'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                className="p-5 rounded-xl"
                style={{
                  background: 'white',
                  border: '1px solid #d4e4d8',
                  boxShadow: '0 2px 8px rgba(26,92,56,0.06)',
                }}
              >
                <p className="font-semibold mb-2" style={{ color: '#1a5c38' }}>
                  {i + 1}. {benefit.split(' ').slice(0, 3).join(' ')}
                </p>
                <p style={{ color: '#5a7060' }}>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-bold mb-10"
            style={{ fontFamily: "'DM Serif Display', serif", color: '#0c1b3a' }}
          >
            {lang === 'fi' ? 'Prosessi' : 'Process'}
          </h2>
          <div className="space-y-4">
            {service.process.map((step, i) => (
              <div
                key={i}
                className="flex gap-6 p-6 rounded-xl"
                style={{
                  background: '#f0f5f2',
                  border: '1px solid #d4e4d8',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                  style={{ background: '#1a5c38', color: 'white' }}
                >
                  {i + 1}
                </div>
                <p className="text-lg leading-relaxed pt-1" style={{ color: '#3d4f42' }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg mb-8" style={{ color: '#5a7060' }}>
            {lang === 'fi'
              ? 'Kiinnostunut tästä palvelusta? Ota meihin yhteyttä tänään!'
              : 'Interested in this service? Contact us today!'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 rounded-lg font-semibold text-white text-lg transition-all hover:shadow-lg"
            style={{
              background: '#1a5c38',
            }}
          >
            {lang === 'fi' ? 'Ota yhteyttä' : 'Get in Touch'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail
