import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { detailedServices } from "@/data/detailedServicesData";
import { CareQuoteCalculator } from "@/components/CareQuoteCalculator";

const ServiceDetail = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = detailedServices.find((s) => s.slug === serviceSlug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = detailedServices.filter((s) =>
    service.relatedServiceSlugs.includes(s.slug)
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "serviceType": service.category,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Akirapa Home Care",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "209 Burlington Rd",
        "addressLocality": "Bedford",
        "addressRegion": "MA",
        "postalCode": "01730",
        "addressCountry": "US"
      },
      "telephone": "+1-339-970-1214"
    },
    "areaServed": [
      { "@type": "City", "name": "Bedford", "addressRegion": "MA" },
      { "@type": "City", "name": "Lexington", "addressRegion": "MA" },
      { "@type": "City", "name": "Concord", "addressRegion": "MA" },
      { "@type": "City", "name": "Billerica", "addressRegion": "MA" },
      { "@type": "City", "name": "Burlington", "addressRegion": "MA" },
      { "@type": "City", "name": "Woburn", "addressRegion": "MA" }
    ],
    "description": service.shortDescription
  };

  const breadcrumbsSchema = {
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
        "name": "Care Services",
        "item": "https://akirapahomecareus.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://akirapahomecareus.com/services/${service.slug}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Layout>
      <SEO
        title={`${service.title} | Akirapa Home Care Bedford MA`}
        description={`${service.shortDescription} Professional care services in Bedford, MA and surrounding Middlesex County. Call 339-970-1214.`}
        path={`/services/${service.slug}`}
        schemaExtra={[serviceSchema, breadcrumbsSchema, faqSchema]}
      />

      {/* Header Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/CARE GIVER  (2).jpg"
            alt={service.title}
            className="w-full h-full object-cover opacity-[0.25] mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[#76248a]/80" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#40ddd3]/20 border border-[#40ddd3]/40 text-[#40ddd3] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <i className={service.icon}></i>
            <span>{service.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-4xl mx-auto">
            {service.title}
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Main Service Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Link to="/" className="hover:text-[#76248a]">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-[#76248a]">Services</Link>
            <span>/</span>
            <span className="text-[#76248a] font-bold">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Main Column */}
            <div className="lg:col-span-8 space-y-10">
              {/* Detailed Overview Card */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Understanding {service.title} in Bedford, MA
                </h2>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  {service.fullDefinition}
                </p>
              </div>

              {/* Who Can Benefit */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <i className="fa-solid fa-user-check text-[#76248a]"></i>
                  <span>Who Can Benefit from This Care?</span>
                </h3>
                <ul className="space-y-3.5">
                  {service.whoCanBenefit.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 text-base">
                      <i className="fa-solid fa-[#40ddd3] fa-circle-check text-[#76248a] text-lg shrink-0 mt-0.5"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Is Included */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <i className="fa-solid fa-list-check text-[#76248a]"></i>
                  <span>What Does Our {service.title} Include?</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.whatIsIncluded.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                      <i className="fa-solid fa-check text-[#40ddd3] font-black text-base shrink-0 mt-1"></i>
                      <span className="text-sm font-semibold text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Family Considerations */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <i className="fa-solid fa-heart-pulse text-[#76248a]"></i>
                  <span>Important Family Considerations</span>
                </h3>
                <div className="space-y-3">
                  {service.familyConsiderations.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#76248a]/5 border border-[#76248a]/10 text-gray-800 text-sm font-medium">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                      <h4 className="font-bold text-gray-900 text-base">{faq.question}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar CTA & Context */}
            <div className="lg:col-span-4 space-y-8">
              {/* Quick Contact Box */}
              <div className="bg-[#76248a] text-white p-8 rounded-3xl space-y-6 shadow-xl sticky top-28">
                <h3 className="text-2xl font-black">Need Guidance for a Loved One?</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Our Bedford care coordinators are available 24/7 to answer questions, outline costs, and schedule a free in-home consultation.
                </p>
                <div className="space-y-3 pt-2">
                  <a
                    href="tel:3399701214"
                    className="flex items-center justify-center gap-3 bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-md transition-all text-center"
                  >
                    <i className="fa-solid fa-phone text-lg"></i>
                    <span>Call 339 970 1214</span>
                  </a>
                  <Button asChild size="lg" className="w-full bg-white text-[#76248a] hover:bg-gray-100 font-extrabold rounded-2xl">
                    <Link to="/contact">Request Free Assessment</Link>
                  </Button>
                </div>
                <div className="pt-4 border-t border-white/20 text-xs text-white/80 text-center">
                  📍 209 Burlington Rd, Bedford, MA 01730
                </div>
              </div>

              {/* Service Area Context */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 text-sm text-gray-700">
                <h4 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-[#76248a]"></i>
                  <span>Serving Bedford & Middlesex County</span>
                </h4>
                <p className="text-xs text-gray-600">
                  Akirapa Home Care proudly provides {service.title.toLowerCase()} in Bedford, Lexington, Concord, Billerica, Burlington, Woburn, and surrounding communities.
                </p>
                <Link to="/locations/bedford-ma" className="text-[#76248a] font-bold text-xs hover:underline inline-block pt-1">
                  View Bedford Local Service Center →
                </Link>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <h4 className="font-bold text-gray-900 text-base">Related Care Services</h4>
                  <div className="space-y-2">
                    {relatedServices.map((rel) => (
                      <Link
                        key={rel.slug}
                        to={`/services/${rel.slug}`}
                        className="p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 flex items-center justify-between text-sm text-gray-800 font-medium transition-all group"
                      >
                        <span className="group-hover:text-[#76248a] font-semibold">{rel.title}</span>
                        <i className="fa-solid fa-chevron-right text-xs text-gray-400 group-hover:text-[#76248a]"></i>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
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

export default ServiceDetail;
