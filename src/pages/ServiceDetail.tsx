import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { detailedServices, DetailedService } from "@/data/detailedServicesData";
import { massachusettsLocations } from "@/data/massachusettsLocations";
import { BurlingtonCareQuestions } from "@/components/BurlingtonCareQuestions";

interface ServiceDetailProps {
  customSlug?: string;
}

export default function ServiceDetail({ customSlug }: ServiceDetailProps = {}) {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const slug = customSlug || routeSlug;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const service = detailedServices.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const conditionFocus: "general" | "dementia" | "post-hospital" | "24-hour" =
    service.slug.includes("dementia") || service.slug.includes("alzheimers")
      ? "dementia"
      : service.slug.includes("hospital") || service.slug.includes("recovery")
      ? "post-hospital"
      : service.slug.includes("24-hour") || service.slug.includes("live-in")
      ? "24-hour"
      : "general";

  // Related services
  const related = detailedServices
    .filter((s) => service.relatedServiceSlugs.includes(s.slug) || (s.category === service.category && s.slug !== service.slug))
    .slice(0, 3);

  // Schema.org Service Definition
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://akirapahomecareus.com/services/${service.slug}#service`,
    "name": `${service.title} in Massachusetts`,
    "serviceType": service.title,
    "description": service.shortDescription,
    "provider": {
      "@type": ["MedicalBusiness", "MedicalOrganization", "LocalBusiness"],
      "@id": "https://akirapahomecareus.com/#organization",
      "name": "Akirapa Home Care",
      "url": "https://akirapahomecareus.com/",
      "telephone": "+1 781-226-9910",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "281 Cambridge Street",
        "addressLocality": "Burlington",
        "addressRegion": "MA",
        "postalCode": "01803",
        "addressCountry": "US"
      }
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Massachusetts" },
      { "@type": "City", "name": "Burlington" },
      { "@type": "City", "name": "Woburn" },
      { "@type": "City", "name": "Lexington" },
      { "@type": "City", "name": "Bedford" },
      { "@type": "City", "name": "Billerica" },
      { "@type": "City", "name": "Winchester" },
      { "@type": "City", "name": "Arlington" },
      { "@type": "City", "name": "Boston" },
      { "@type": "City", "name": "Cambridge" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": service.whatIsIncluded.map((item) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item
        }
      }))
    }
  };

  return (
    <Layout>
      <SEO
        title={`${service.title} in Massachusetts | Akirapa Home Care`}
        description={`${service.shortDescription} Expert in-home care in Burlington, Middlesex County, Greater Boston, and across Massachusetts. Call +1 781-226-9910.`}
        keywords={`${service.title.toLowerCase()} Massachusetts, ${service.title.toLowerCase()} Burlington MA, senior home care Middlesex County, elder care Boston MA, home health aides Massachusetts`}
        path={`/services/${service.slug}`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Care Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` }
        ]}
        faqs={service.faqs}
        schemaExtra={[serviceSchema]}
      />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/CARE GIVER  (4).jpg"
            alt={`${service.title} - Akirapa Home Care`}
            className="w-full h-full object-cover opacity-[0.27] mix-blend-luminosity scale-105 animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#76248a]/95 via-[#76248a]/80 to-[#561868]/95" />
          <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-[#40ddd3]/20 blur-3xl pointer-events-none animate-aurora" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#40ddd3] text-gray-950 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-sm">
            <i className={`${service.icon} text-sm`}></i>
            <span>{service.category} • Massachusetts</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            {service.title} in Massachusetts
          </h1>

          <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            {service.tagline}
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
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding bg-white border-b border-gray-100">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Detailed Definition */}
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs uppercase font-extrabold text-[#76248a] tracking-wider bg-[#76248a]/10 px-3 py-1 rounded-full inline-block">
              Comprehensive Care Overview
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              Understanding {service.title} for Your Loved One
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {service.fullDefinition}
            </p>
          </div>

          {/* 2-Column Benefits & Included Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
            {/* Who Can Benefit */}
            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#76248a] text-white flex items-center justify-center shadow-xs">
                  <i className="fa-solid fa-users text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Who Benefits Most</h3>
                <p className="text-gray-600 text-sm">
                  This care program is designed for seniors and adults in Massachusetts facing any of the following circumstances:
                </p>
                <ul className="space-y-3 pt-2">
                  {service.whoCanBenefit.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                      <i className="fa-solid fa-circle-check text-[#76248a] text-base shrink-0 mt-0.5"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What is Included */}
            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#40ddd3] text-gray-950 flex items-center justify-center shadow-xs">
                  <i className="fa-solid fa-list-check text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">What Is Included</h3>
                <p className="text-gray-600 text-sm">
                  Our certified caregivers follow custom, physician-aligned care protocols including:
                </p>
                <ul className="space-y-3 pt-2">
                  {service.whatIsIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                      <i className="fa-solid fa-circle-check text-emerald-600 text-base shrink-0 mt-0.5"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Family Planning Considerations */}
          {service.familyConsiderations && service.familyConsiderations.length > 0 && (
            <div className="max-w-4xl mx-auto bg-purple-50/70 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-[#76248a]/20 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center shadow-xs">
                  <i className="fa-solid fa-lightbulb text-lg text-[#40ddd3]"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Important Family Considerations</h3>
              </div>
              <ul className="space-y-2.5 pt-2">
                {service.familyConsiderations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
                    <span className="text-[#76248a] font-bold">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Massachusetts Service Areas Callout */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-5 sm:p-8 border border-gray-200 shadow-sm text-center md:text-left space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold text-[#76248a] tracking-wider bg-[#76248a]/10 px-3 py-1 rounded-full">
                  Regional Coverage
                </span>
                <h3 className="text-xl font-bold text-gray-900">
                  Massachusetts Communities We Serve
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                  Akirapa Home Care provides {service.title.toLowerCase()} across Middlesex County including Burlington, Woburn, Lexington, Bedford, Billerica, Winchester, Arlington, Concord, and throughout Greater Boston and Massachusetts.
                </p>
              </div>
              <Button asChild size="lg" className="w-full md:w-auto bg-[#76248a] hover:bg-[#561868] text-white font-extrabold rounded-2xl shrink-0">
                <Link to="/ma-home-care-directory">Compare MA Agencies</Link>
              </Button>
            </div>
          </div>

          {/* Proof Where Families Look Callout Banner */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900 to-[#561868] text-white rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-[#40ddd3] uppercase tracking-wider block">
                  Transparency & Proof
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  See Real Proof Before You Decide
                </h3>
                <p className="text-white/80 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Explore an authentic dummy AkiVault shift report, review our CNA verification standards, or read our transparent pricing guide for Burlington.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
                <Link
                  to="/sample-shift-report"
                  className="px-4 py-2 rounded-xl bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-bold text-xs shadow-sm transition-all"
                >
                  <i className="fa-solid fa-file-waveform mr-1.5"></i>
                  Real Shift Report
                </Link>
                <Link
                  to="/standards"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
                >
                  <i className="fa-solid fa-shield-check mr-1.5 text-[#40ddd3]"></i>
                  Our Standards
                </Link>
                <Link
                  to="/pricing"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
                >
                  <i className="fa-solid fa-tag mr-1.5 text-[#40ddd3]"></i>
                  Pricing Guide
                </Link>
              </div>
            </div>
          </div>

          {/* Plain-Language Burlington Answers Component */}
          <div className="max-w-4xl mx-auto">
            <BurlingtonCareQuestions conditionFocus={conditionFocus} />
          </div>

          {/* Frequently Asked Questions */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="max-w-4xl mx-auto space-y-6 pt-4">
              <div className="text-center md:text-left space-y-2">
                <span className="text-xs uppercase font-extrabold text-[#76248a] tracking-wider bg-[#76248a]/10 px-3 py-1 rounded-full inline-block">
                  Common Questions
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Frequently Asked Questions About {service.title}
                </h2>
              </div>

              <div className="space-y-3 pt-2">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-[#76248a] transition-colors focus:outline-none"
                      >
                        <span className="text-base sm:text-lg">{faq.question}</span>
                        <i className={`fa-solid ${isOpen ? "fa-minus" : "fa-plus"} text-sm text-[#76248a] shrink-0`}></i>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related Services */}
          {related.length > 0 && (
            <div className="max-w-5xl mx-auto pt-8 border-t border-gray-100 space-y-6">
              <div className="text-center md:text-left space-y-1">
                <span className="text-xs uppercase font-extrabold text-[#76248a] tracking-wider">
                  Explore More Care Options
                </span>
                <h3 className="text-2xl font-black text-gray-900">
                  Related Care Programs in Massachusetts
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <div key={rel.slug} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#76248a]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center text-sm shadow-xs">
                        <i className={rel.icon}></i>
                      </div>
                      <h4 className="font-bold text-gray-900 text-base">{rel.title}</h4>
                      <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">{rel.shortDescription}</p>
                    </div>
                    <Link
                      to={`/services/${rel.slug}`}
                      className="text-[#76248a] font-bold text-xs uppercase tracking-wider hover:text-[#40ddd3] flex items-center justify-between transition-colors pt-2 border-t border-gray-200/60"
                    >
                      <span>Learn More</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local Massachusetts Communities Served */}
          <div className="max-w-4xl mx-auto pt-8 border-t border-gray-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-gray-900">
                Massachusetts Communities Where We Provide {service.title}
              </h3>
              <Link to="/locations" className="text-xs font-bold text-[#76248a] hover:underline">
                View All Service Areas →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {massachusettsLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#76248a] text-gray-700 hover:text-white transition-all"
                >
                  {loc.cityName}, MA
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Helpline CTA */}
      <section className="relative min-h-[300px] py-12 md:py-16 bg-[#76248a] text-white overflow-hidden flex items-center justify-center">
        <div className="container-narrow mx-auto px-4 text-center space-y-4 relative z-10 w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Ready to Arrange {service.title} in Massachusetts?
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            No long-term contracts. Start with a free in-home clinical consultation tailored to your family's schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="tel:+17812269910"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-black text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 button-shimmer"
            >
              <i className="fa-solid fa-phone text-lg"></i>
              <span>Call +1 781-226-9910</span>
            </a>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white/10 font-bold text-base sm:text-lg h-14 px-8 rounded-2xl transition-all duration-300 hover:scale-105">
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
