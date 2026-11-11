import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { massachusettsLocations } from "@/data/massachusettsLocations";
import { BurlingtonCareQuestions } from "@/components/BurlingtonCareQuestions";

export default function LocationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const locationData = massachusettsLocations.find((l) => l.slug === slug);

  if (!locationData) {
    return <Navigate to="/locations" replace />;
  }

  // Other nearby Massachusetts communities
  const otherLocations = massachusettsLocations
    .filter((l) => l.slug !== locationData.slug)
    .slice(0, 4);

  // LocalBusiness Schema for this specific Massachusetts community
  const localBusinessLocationSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "MedicalOrganization", "LocalBusiness"],
    "@id": `https://akirapahomecareus.com/locations/${locationData.slug}#organization`,
    "name": `Akirapa Home Care - ${locationData.cityName}, MA`,
    "legalName": "Akirapa Home Care Inc.",
    "url": `https://akirapahomecareus.com/locations/${locationData.slug}`,
    "logo": "https://akirapahomecareus.com/akirapa-logo.png",
    "image": "https://akirapahomecareus.com/akirapa-og-image.jpg",
    "description": locationData.shortDescription,
    "telephone": "+1 781-226-9910",
    "email": "info@akirapahomecareus.com",
    "priceRange": "$$ ($36 - $44/hr)",
    "currenciesAccepted": "USD",
    "isAcceptingNewPatients": true,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "281 Cambridge Street",
      "addressLocality": "Burlington",
      "addressRegion": "MA",
      "postalCode": "01803",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.50289,
      "longitude": -71.19694
    },
    "areaServed": {
      "@type": "City",
      "name": locationData.cityName,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Massachusetts"
      }
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title={locationData.metaTitle}
        description={locationData.metaDescription}
        keywords={locationData.keywords}
        path={`/locations/${locationData.slug}`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: `${locationData.cityName}, MA`, path: `/locations/${locationData.slug}` }
        ]}
        faqs={locationData.localFaqs}
        schemaExtra={[localBusinessLocationSchema]}
      />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/CARE GIVER  (4).jpg"
            alt={`Senior Care in ${locationData.cityName}, MA - Akirapa Home Care`}
            className="w-full h-full object-cover opacity-[0.25] mix-blend-luminosity scale-105"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#76248a]/95 via-[#76248a]/85 to-[#561868]/95" />
          <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-[#40ddd3]/20 blur-3xl pointer-events-none" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#40ddd3] text-gray-950 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-sm">
            <i className="fa-solid fa-location-dot text-sm text-[#76248a]"></i>
            <span>{locationData.county} • Massachusetts</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            In-Home Senior Care in {locationData.cityName}, MA
          </h1>

          <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            {locationData.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="tel:+17812269910"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-extrabold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 button-shimmer text-base"
            >
              <i className="fa-solid fa-phone text-lg"></i>
              <span>Call 24/7: +1 781-226-9910</span>
            </a>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white/10 font-bold text-base h-14 px-8 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95">
              <Link to="/contact">Request Free Assessment</Link>
            </Button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold text-white/90">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-[#40ddd3]"></i>
              <span>100% Certified CNAs</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-clock text-[#40ddd3]"></i>
              <span>Zero Long-Term Contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-location-crosshairs text-[#40ddd3]"></i>
              <span>{locationData.distanceFromHQ}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Location Content */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Overview */}
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs uppercase font-extrabold text-[#76248a] tracking-wider bg-[#76248a]/10 px-3 py-1 rounded-full inline-block">
              Local Care Services & Community Support
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              Personalized In-Home Care for {locationData.cityName} Families
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {locationData.fullOverview}
            </p>
            <div className="p-6 rounded-2xl bg-purple-50/70 border border-[#76248a]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#76248a]">Zip Codes Served in {locationData.cityName}:</h3>
                <p className="text-sm text-gray-700 font-semibold mt-1">
                  {locationData.zipCodes.join(", ")}
                </p>
              </div>
              <Button asChild className="bg-[#76248a] hover:bg-[#561868] text-white font-bold rounded-xl text-xs sm:text-sm">
                <Link to="/pricing">View Hourly Rates ($36-$44/hr)</Link>
              </Button>
            </div>
          </div>

          {/* Popular Services in This Location */}
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-extrabold text-[#76248a] tracking-wider bg-purple-50 px-3 py-1 rounded-full inline-block">
                Tailored Clinical Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Core Senior Care Programs Available in {locationData.cityName}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationData.popularServices.map((service, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-[#76248a]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#76248a] flex items-center justify-center font-bold">
                      <i className="fa-solid fa-heart-pulse text-base"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-xs font-bold text-[#76248a] hover:text-[#561868] inline-flex items-center gap-1.5"
                    >
                      <span>Explore {service.title}</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Healthcare & Hospital Transitions */}
          {locationData.localHospitals.length > 0 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-left space-y-2">
                <span className="text-xs uppercase font-extrabold text-[#76248a] tracking-wider bg-[#76248a]/10 px-3 py-1 rounded-full inline-block">
                  Hospital-to-Home Care Coordination
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Coordinating with Area Healthcare Centers in and near {locationData.cityName}
                </h2>
                <p className="text-gray-600 text-sm">
                  Preventing hospital readmissions requires close collaboration between physicians, hospital discharge staff, and in-home CNA caregivers.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {locationData.localHospitals.map((hosp, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2.5 text-[#76248a] font-bold text-base mb-1.5">
                      <i className="fa-solid fa-hospital text-sm text-[#40ddd3]"></i>
                      <h4>{hosp.name}</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{hosp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local FAQs */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-left space-y-2">
              <span className="text-xs uppercase font-extrabold text-[#76248a] tracking-wider bg-purple-50 px-3 py-1 rounded-full inline-block">
                Local Questions & Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Frequently Asked Questions About Senior Care in {locationData.cityName}, MA
              </h2>
            </div>

            <div className="space-y-3">
              {locationData.localFaqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-5 text-left font-bold text-gray-900 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <i
                      className={`fa-solid fa-chevron-down text-xs text-[#76248a] transition-transform duration-200 ${
                        openFaqIndex === idx ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Internal Linking: Nearby Massachusetts Communities */}
          <div className="max-w-5xl mx-auto pt-8 border-t border-gray-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              Explore Senior Care in Other Massachusetts Communities
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {massachusettsLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${
                    loc.slug === locationData.slug
                      ? "bg-[#76248a] text-white border-[#76248a]"
                      : "bg-gray-50 hover:bg-[#76248a] text-gray-700 hover:text-white border-gray-200"
                  }`}
                >
                  {loc.cityName}, MA
                </Link>
              ))}
            </div>
          </div>

          {/* Call to Action Banner */}
          <div className="bg-gradient-to-r from-[#561868] to-[#76248a] rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto space-y-6 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-black">
              Ready to Discuss Care for Your Loved One in {locationData.cityName}?
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto">
              Our clinical director conducts complimentary in-home assessments with zero contract lock-ins. Experience verified caregiver reliability and real-time family transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              <Button asChild size="lg" className="w-full sm:w-auto bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-black h-12 px-8 rounded-xl button-shimmer">
                <Link to="/contact">Schedule Free In-Home Consultation</Link>
              </Button>
              <a
                href="tel:+17812269910"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10 font-bold h-12 px-6 rounded-xl text-sm transition-all"
              >
                <i className="fa-solid fa-phone text-[#40ddd3]"></i>
                <span>Call 24/7 Helpline: +1 781-226-9910</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Critical Questions Section */}
      <BurlingtonCareQuestions />
    </Layout>
  );
}
