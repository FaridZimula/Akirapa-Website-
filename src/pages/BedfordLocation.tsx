import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { detailedServices } from "@/data/detailedServicesData";
import { CareQuoteCalculator } from "@/components/CareQuoteCalculator";

const BedfordLocation = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "name": "Akirapa Home Care Bedford",
    "url": "https://akirapahomecareus.com/locations/bedford-ma",
    "logo": "https://akirapahomecareus.com/akirapa-logo.png",
    "image": "https://akirapahomecareus.com/akirapa-og-image.jpg",
    "description": "Premier in-home senior care and caregiver services headquartered at 209 Burlington Rd, Bedford, MA. Hourly care, 24/7 care, respite, and specialized Alzheimer's support.",
    "telephone": "+1-339-970-1214",
    "email": "info@akirapahomecareus.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "209 Burlington Rd",
      "addressLocality": "Bedford",
      "addressRegion": "MA",
      "postalCode": "01730",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.4939,
      "longitude": -71.2678
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Bedford", "addressRegion": "MA" },
      { "@type": "City", "name": "Lexington", "addressRegion": "MA" },
      { "@type": "City", "name": "Concord", "addressRegion": "MA" },
      { "@type": "City", "name": "Billerica", "addressRegion": "MA" },
      { "@type": "City", "name": "Burlington", "addressRegion": "MA" },
      { "@type": "City", "name": "Woburn", "addressRegion": "MA" },
      { "@type": "City", "name": "Acton", "addressRegion": "MA" },
      { "@type": "City", "name": "Carlisle", "addressRegion": "MA" }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://akirapahomecareus.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://akirapahomecareus.com/locations/bedford-ma"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Bedford, MA",
        "item": "https://akirapahomecareus.com/locations/bedford-ma"
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title="Senior Home Care Services Bedford MA | Akirapa Home Care"
        description="Trusted in-home senior care headquartered at 209 Burlington Rd, Bedford, MA. Hourly care, 24/7 daily care, respite care & memory support in Bedford, MA. Call 339-970-1214."
        path="/locations/bedford-ma"
        schemaExtra={[localBusinessSchema, breadcrumbSchema]}
      />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/CARE GIVER  (10).jpg"
            alt="Akirapa Home Care Bedford MA Location"
            className="w-full h-full object-cover opacity-[0.27] mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[#76248a]/80" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#40ddd3]/20 border border-[#40ddd3]/40 text-[#40ddd3] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <i className="fa-solid fa-location-dot"></i>
            <span>Primary Local Office — Bedford, MA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-4xl mx-auto">
            In-Home Senior Care Services in Bedford, Massachusetts
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Compassionate, personalized home care tailored to seniors and families throughout Bedford, Greater Boston, and surrounding Middlesex County communities.
          </p>
        </div>
      </section>

      {/* Main Location Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Office & Contact Highlights Card */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Your Local Home Care Partner at 209 Burlington Rd, Bedford, MA
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Akirapa Home Care is proud to serve as a trusted senior care provider headquartered right here in Bedford, MA. Our mission is to help aging adults stay safe, comfortable, and independent in the homes they love, while delivering complete peace of mind to family caregivers.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-800 font-semibold pt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <i className="fa-solid fa-building text-[#76248a] text-lg"></i>
                  <span>209 Burlington Rd, Bedford, MA 01730</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <i className="fa-solid fa-phone text-[#40ddd3] text-lg"></i>
                  <span>24/7 Helpline: (339) 970-1214</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#76248a] text-white p-8 rounded-3xl space-y-6 shadow-lg">
              <h3 className="text-xl font-bold">Bedford Care Consultation</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Schedule a complimentary in-home assessment with our Bedford care management team to discuss your family's unique needs.
              </p>
              <Button asChild size="lg" className="w-full bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold rounded-xl">
                <Link to="/contact">Book Free Local Assessment</Link>
              </Button>
            </div>
          </div>

          {/* Local Services Offered */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Full-Spectrum Home Care Services Available in Bedford, MA
              </h2>
              <p className="text-gray-600 text-base max-w-2xl mx-auto">
                Explore dedicated care options tailored to your family's schedule and clinical needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {detailedServices.slice(0, 9).map((srv) => (
                <div key={srv.slug} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#76248a]/10 text-[#76248a] flex items-center justify-center">
                      <i className={`${srv.icon} text-lg`}></i>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{srv.title}</h3>
                    <p className="text-gray-600 text-xs line-clamp-3">{srv.shortDescription}</p>
                  </div>
                  <Link
                    to={`/services/${srv.slug}`}
                    className="text-[#76248a] font-bold text-xs hover:underline flex items-center gap-1 pt-2"
                  >
                    <span>Read Full Service Details</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Communities Served */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <i className="fa-solid fa-map-location-dot text-[#76248a]"></i>
              <span>Surrounding Massachusetts Service Communities</span>
            </h3>
            <p className="text-gray-700 text-base">
              In addition to Bedford, MA, Akirapa Home Care provides in-home caregiving and clinical support across neighboring towns in Middlesex County:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { town: "Bedford, MA", zip: "01730", note: "Primary Location" },
                { town: "Lexington, MA", zip: "02420", note: "Full Service Coverage" },
                { town: "Concord, MA", zip: "01742", note: "Full Service Coverage" },
                { town: "Billerica, MA", zip: "01821", note: "Full Service Coverage" },
                { town: "Burlington, MA", zip: "01803", note: "Full Service Coverage" },
                { town: "Woburn, MA", zip: "01801", note: "Full Service Coverage" },
                { town: "Acton, MA", zip: "01720", note: "Full Service Coverage" },
                { town: "Carlisle, MA", zip: "01741", note: "Full Service Coverage" }
              ].map((loc, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm">{loc.town}</h4>
                  <p className="text-xs text-[#76248a] font-medium">{loc.note} ({loc.zip})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <CareQuoteCalculator />
        </div>
      </section>
    </Layout>
  );
};

export default BedfordLocation;
