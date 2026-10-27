import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { maCompetitors, MACompetitor } from '@/data/maCompetitors';
import { Helmet } from 'react-helmet-async';

export default function MACompetitorDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const competitor = maCompetitors.find((c) => c.slug === slug);

  if (!competitor) {
    return <Navigate to="/ma-home-care-directory" replace />;
  }

  // Related competitors in the same region (excluding current)
  const relatedCompetitors = maCompetitors
    .filter((c) => c.region === competitor.region && c.slug !== competitor.slug)
    .slice(0, 4);

  // Structured Data (Schema.org) for rich snippet capture
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What services does ${competitor.name} offer in ${competitor.city}, Massachusetts?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${competitor.name} provides ${competitor.services.join(', ')} in ${competitor.city} and throughout ${competitor.region}. For families seeking live-in care, certified nursing assistance, or GPS-verified caregiver clock-ins, Akirapa Home Care offers immediate local support.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does home care cost with ${competitor.name} in Massachusetts?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Estimated private-duty rates for ${competitor.name} range approximately ${competitor.hourlyRate}, which aligns with the Massachusetts statewide average for non-medical and certified aide services. In contrast, Akirapa Home Care provides transparent pricing with absolutely zero long-term contract lock-ins.`
        }
      },
      {
        "@type": "Question",
        "name": `How does ${competitor.name} compare to Akirapa Home Care?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `While ${competitor.name} is an established provider with a ${competitor.rating}/5 rating, Akirapa Home Care differentiates itself through proprietary AkiVault™ GPS real-time caregiver verification, a strict zero-contract model, and 100% Certified Nursing Assistant (CNA) staffing managed 24/7 from Burlington, MA.`
        }
      },
      {
        "@type": "Question",
        "name": `Does ${competitor.name} require minimum contract hours?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Most traditional agencies like ${competitor.name} require standard shift minimums (typically 4-hour blocks or 12-20 hours weekly) and advance cancellation notice. Akirapa Home Care eliminates restrictive contracts, allowing families to start, adjust, or pause care anytime with zero penalties.`
        }
      }
    ]
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": competitor.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": competitor.address,
      "addressLocality": competitor.city,
      "addressRegion": "MA",
      "addressCountry": "US"
    },
    "telephone": competitor.phone,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": competitor.rating.toString(),
      "reviewCount": competitor.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
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
        "name": "Massachusetts Home Care Directory",
        "item": "https://akirapahomecareus.com/ma-home-care-directory"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": competitor.name,
        "item": `https://akirapahomecareus.com/ma-home-care-directory/${competitor.slug}`
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title={`${competitor.name} - ${competitor.city}, MA | Care Reviews & Alternatives — Akirapa Home Care`}
        description={`Services Offered: ${competitor.services.join(' · ')}. Researching ${competitor.name} in ${competitor.city}, MA? Review estimated rates (${competitor.hourlyRate}), customer ratings (${competitor.rating}/5), and compare with 24/7 CNA care from Akirapa Home Care.`}
        path={`/ma-home-care-directory/${competitor.slug}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero / Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#561868] to-[#76248a] pt-32 pb-16 lg:pt-36 lg:pb-24 text-white">
        <div className="container-narrow px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-white/80 mb-6 font-medium flex-wrap">
            <Link to="/" className="hover:text-[#40ddd3] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/ma-home-care-directory" className="hover:text-[#40ddd3] transition-colors">MA Directory</Link>
            <span>/</span>
            <span className="text-[#40ddd3] truncate max-w-xs">{competitor.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#40ddd3] text-[#561868] font-bold text-xs uppercase px-3 py-1 rounded-full tracking-wider">
              MA Senior Care Review
            </span>
            <span className="bg-white/20 text-white font-medium text-xs px-3 py-1 rounded-full">
              Search Rank #{competitor.searchRank} in Massachusetts
            </span>
            <span className="bg-white/20 text-white font-medium text-xs px-3 py-1 rounded-full">
              {competitor.region}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            {competitor.name}
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-3xl font-normal leading-relaxed mb-8">
            An in-depth review of services, estimated hourly pricing, caregiver credentials, and comparison with <strong>Akirapa Home Care</strong> for seniors and families in {competitor.city}, MA.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 max-w-4xl">
            <div>
              <div className="text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">Customer Rating</div>
              <div className="text-2xl font-black text-[#40ddd3] flex items-center">
                <span>{competitor.rating}</span>
                <span className="text-yellow-400 ml-1.5 text-lg">★</span>
                <span className="text-xs text-white/70 ml-1">({competitor.reviewCount})</span>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">Service Area</div>
              <div className="text-lg font-bold text-white truncate">{competitor.city}, MA</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">Estimated Rates</div>
              <div className="text-lg font-bold text-[#40ddd3] truncate">{competitor.hourlyRate}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">Akirapa Advantage</div>
              <div className="text-lg font-bold text-white">0 Contracts + GPS</div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Converting Floating CTA Bar */}
      <section className="bg-amber-50 border-b border-amber-200 py-3.5 px-4 text-center">
        <div className="container-narrow flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-800 font-medium">
            <i className="fa-solid fa-shield-halved text-[#76248a]"></i>
            <span>
              Looking for verified care in <strong>{competitor.city}</strong>? Akirapa Home Care provides 24/7 CNA caregivers with AkiVault™ live GPS verification.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a href="tel:+17812269910" className="font-bold text-[#76248a] hover:text-[#561868] flex items-center gap-1.5">
              <i className="fa-solid fa-phone"></i> +1 781-226-9910
            </a>
            <Link to="/contact">
              <Button size="sm" className="bg-[#76248a] hover:bg-[#561868] text-white rounded-full px-4 text-xs font-bold">
                Get Free Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left 2 Columns: Detailed Review & Comparison */}
            <div className="lg:col-span-2 space-y-10">

              {/* Company Profile Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  <h2 className="text-2xl md:text-3xl font-black text-[#561868]">
                    Agency Profile: {competitor.name}
                  </h2>
                  <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    Directory ID #{competitor.id}
                  </span>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {competitor.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Services & Specialties Offered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {competitor.services.map((service, idx) => (
                      <span key={idx} className="bg-[#76248a]/10 text-[#76248a] font-semibold text-sm px-3 py-1.5 rounded-lg">
                        <i className="fa-solid fa-check text-xs mr-1.5"></i>
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pros and Considerations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-100">
                  <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100">
                    <h4 className="text-base font-bold text-emerald-900 mb-3 flex items-center">
                      <i className="fa-solid fa-thumbs-up text-emerald-600 mr-2"></i>
                      Reported Strengths
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {competitor.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-emerald-500 font-bold mr-2">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-100">
                    <h4 className="text-base font-bold text-amber-900 mb-3 flex items-center">
                      <i className="fa-solid fa-circle-exclamation text-amber-600 mr-2"></i>
                      Things to Consider
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {competitor.considerations.map((con, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-amber-500 font-bold mr-2">!</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Head-to-Head Comparison Table */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="text-center md:text-left mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#76248a] bg-[#76248a]/10 px-3 py-1 rounded-full">
                    Head-to-Head Comparison
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-[#561868] mt-3">
                    {competitor.name} vs. Akirapa Home Care
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    See how Akirapa Home Care delivers superior transparency, caregiver qualifications, and flexibility.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 font-bold text-gray-700">Care Standard</th>
                        <th className="py-3 px-4 font-bold text-gray-500">{competitor.name}</th>
                        <th className="py-3 px-4 font-bold text-[#76248a] bg-[#76248a]/5 rounded-t-xl">
                          Akirapa Home Care ★
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-4 px-4 font-semibold text-gray-800">Caregiver Verification</td>
                        <td className="py-4 px-4 text-gray-600">Manual / Standard Telephony</td>
                        <td className="py-4 px-4 font-bold text-[#76248a] bg-[#76248a]/5">
                          <i className="fa-solid fa-location-crosshairs mr-1 text-[#40ddd3]"></i>
                          AkiVault™ Live GPS Clock-In
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-semibold text-gray-800">Contract Lock-Ins</td>
                        <td className="py-4 px-4 text-gray-600">Often Requires 12-20hr/wk min.</td>
                        <td className="py-4 px-4 font-bold text-emerald-600 bg-[#76248a]/5">
                          Strict Zero-Contract Policy
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-semibold text-gray-800">Caregiver Credentials</td>
                        <td className="py-4 px-4 text-gray-600">Mixed HHA / PCAs</td>
                        <td className="py-4 px-4 font-bold text-[#76248a] bg-[#76248a]/5">
                          100% Certified Nursing Assistants (CNAs)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-semibold text-gray-800">Local Case Management</td>
                        <td className="py-4 px-4 text-gray-600">Regional / Call Center</td>
                        <td className="py-4 px-4 font-bold text-[#76248a] bg-[#76248a]/5">
                          Burlington-Based 24/7 Dedicated Team
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-semibold text-gray-800">Placement Speed</td>
                        <td className="py-4 px-4 text-gray-600">3 - 5 Business Days</td>
                        <td className="py-4 px-4 font-bold text-[#76248a] bg-[#76248a]/5">
                          Rapid 24-Hour In-Home Placement
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-[#561868] font-medium">
                    Want to see why families in {competitor.city} prefer Akirapa? Speak directly with a care coordinator.
                  </div>
                  <Link to="/contact" className="shrink-0">
                    <Button className="bg-[#76248a] hover:bg-[#561868] text-white rounded-full font-bold px-6">
                      Schedule Consultation
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Detailed Editorial Section: Why Choose Akirapa */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-black text-[#561868] mb-6">
                  Why Massachusetts Families Choose Akirapa Home Care as Their Preferred Alternative
                </h2>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    When choosing a home care provider in <strong>{competitor.city}</strong> or surrounding Massachusetts communities, families are often faced with difficult decisions. While agencies such as <strong>{competitor.name}</strong> provide reputable services, many families find themselves struggling with minimum weekly hourly quotas, unexpected cancellation fees, or lack of real-time visibility into when caregivers actually arrive.
                  </p>
                  
                  <p>
                    At <strong>Akirapa Home Care</strong>, we built our entire agency to solve these exact frustrations:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                      <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center font-bold mb-3">
                        <i className="fa-solid fa-satellite"></i>
                      </div>
                      <h4 className="font-bold text-[#561868] mb-1">AkiVault™ GPS Verification</h4>
                      <p className="text-xs text-gray-600">
                        Our proprietary system verifies caregiver arrival on-site via GPS timestamping. You will never pay for unworked hours or wonder if your loved one is cared for.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                      <div className="w-10 h-10 rounded-xl bg-[#40ddd3] text-[#561868] flex items-center justify-center font-bold mb-3">
                        <i className="fa-solid fa-file-contract"></i>
                      </div>
                      <h4 className="font-bold text-[#561868] mb-1">Strict Zero-Contract Policy</h4>
                      <p className="text-xs text-gray-600">
                        No binding agreements. No mandatory minimum hour packages. If your loved one's needs change or they go to rehabilitation, adjust or pause care with zero penalty.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                      <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center font-bold mb-3">
                        <i className="fa-solid fa-user-nurse"></i>
                      </div>
                      <h4 className="font-bold text-[#561868] mb-1">100% Certified CNAs</h4>
                      <p className="text-xs text-gray-600">
                        Every single caregiver placed by Akirapa is a certified nursing assistant with Massachusetts state credentials, ensuring skilled transfer, memory, and personal care.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                      <div className="w-10 h-10 rounded-xl bg-[#40ddd3] text-[#561868] flex items-center justify-center font-bold mb-3">
                        <i className="fa-solid fa-clock"></i>
                      </div>
                      <h4 className="font-bold text-[#561868] mb-1">24/7 Immediate Availability</h4>
                      <p className="text-xs text-gray-600">
                        From hospital-to-home transitions to 24/7 round-the-clock live-in support, our Burlington team responds within minutes to urgent care requirements.
                      </p>
                    </div>
                  </div>

                  <p>
                    Whether you are currently comparing <strong>{competitor.name}</strong> or need an immediate second opinion on care for an aging parent in {competitor.city}, our local team is here to help with honest guidance and compassionate care.
                  </p>
                </div>
              </div>

              {/* Frequently Asked Questions (Accordion) */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-black text-[#561868] mb-6">
                  Frequently Asked Questions About {competitor.name}
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      q: `What services does ${competitor.name} provide in ${competitor.city}, MA?`,
                      a: `${competitor.name} provides ${competitor.services.join(', ')} throughout ${competitor.region}. For families in need of certified nursing assistants, specialized Alzheimer's care, or GPS-verified caregivers, Akirapa Home Care provides comprehensive coverage across the same area.`
                    },
                    {
                      q: `How much does home care cost with ${competitor.name} in Massachusetts?`,
                      a: `Estimated rates for ${competitor.name} typically average around ${competitor.hourlyRate}, reflecting standard private-duty rates in Massachusetts. Akirapa Home Care offers competitive, all-inclusive rates with transparent billing and zero hidden administrative fees.`
                    },
                    {
                      q: `Why consider Akirapa Home Care as an alternative to ${competitor.name}?`,
                      a: `Families choose Akirapa Home Care for our proprietary AkiVault™ GPS clock-in verification system, zero-contract policy, 100% CNA staff credentials, and our dedicated local case management based right in Burlington, MA.`
                    },
                    {
                      q: `How quickly can care start in ${competitor.city}, MA?`,
                      a: `While many agencies require several days for intake and assessment, Akirapa Home Care can mobilize an in-home assessment and place a certified caregiver within 24 hours for urgent or post-hospital discharge situations.`
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-5 font-bold text-[#561868] flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-base md:text-lg">{faq.q}</span>
                        <i className={`fa-solid fa-chevron-down text-[#76248a] transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}></i>
                      </button>
                      {openFaq === idx && (
                        <div className="p-5 pt-0 text-gray-700 text-sm leading-relaxed border-t border-gray-100 bg-gray-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Conversion Sidebar */}
            <div className="space-y-8">
              
              {/* Agency Quick Facts Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-[#561868] mb-4 flex items-center">
                  <i className="fa-solid fa-circle-info text-[#40ddd3] mr-2"></i>
                  Agency Quick Facts
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400 font-semibold text-xs uppercase">Agency Name</dt>
                    <dd className="font-bold text-gray-800">{competitor.name}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-semibold text-xs uppercase">Primary Municipality</dt>
                    <dd className="font-semibold text-gray-800">{competitor.city}, MA</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-semibold text-xs uppercase">Region / County</dt>
                    <dd className="font-semibold text-gray-800">{competitor.region} ({competitor.county})</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-semibold text-xs uppercase">Estimated Rates</dt>
                    <dd className="font-bold text-[#76248a]">{competitor.hourlyRate}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-semibold text-xs uppercase">Public Office Line</dt>
                    <dd className="font-semibold text-gray-700">{competitor.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-semibold text-xs uppercase">Listing Address</dt>
                    <dd className="text-gray-600">{competitor.address}</dd>
                  </div>
                </dl>
              </div>

              {/* High-Impact Akirapa Conversion Box */}
              <div className="bg-gradient-to-br from-[#76248a] to-[#561868] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#40ddd3] rounded-full mix-blend-overlay filter blur-2xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                  <span className="bg-[#40ddd3] text-[#561868] font-bold text-xs uppercase px-3 py-1 rounded-full">
                    Recommended Choice
                  </span>
                  <h3 className="text-2xl font-black mt-4 mb-3">
                    Need Reliable Home Care in {competitor.city}?
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-6">
                    Skip agency waitlists and restrictive contracts. Akirapa Home Care provides verified CNAs, 24/7 support, and AkiVault™ GPS tracking throughout {competitor.city} and Greater Boston.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm font-medium">
                      <i className="fa-solid fa-check text-[#40ddd3] mr-2"></i>
                      <span>Free In-Home Assessment</span>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <i className="fa-solid fa-check text-[#40ddd3] mr-2"></i>
                      <span>No Minimum Contracts</span>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <i className="fa-solid fa-check text-[#40ddd3] mr-2"></i>
                      <span>Fast 24-Hour Placement</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a href="tel:+17812269910">
                      <Button className="w-full bg-[#40ddd3] text-[#561868] hover:bg-white font-bold py-6 rounded-full text-base shadow-lg">
                        <i className="fa-solid fa-phone mr-2"></i> Call +1 781-226-9910
                      </Button>
                    </a>
                    <Link to="/contact">
                      <Button variant="outline" className="w-full border-2 border-white/40 text-white hover:bg-white/10 font-bold py-6 rounded-full text-base">
                        Book Online Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Related Agencies in Region (Internal Links for Link Equity) */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-[#561868] mb-4">
                  More Agencies in {competitor.region}
                </h3>
                <div className="space-y-3">
                  {relatedCompetitors.map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/ma-home-care-directory/${rel.slug}`}
                      className="block p-3 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group"
                    >
                      <div className="font-bold text-[#561868] group-hover:text-[#76248a] text-sm flex items-center justify-between">
                        <span>{rel.name}</span>
                        <i className="fa-solid fa-arrow-right text-xs text-gray-400 group-hover:text-[#40ddd3] transform group-hover:translate-x-1 transition-transform"></i>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                        <span>{rel.city}, MA</span>
                        <span>•</span>
                        <span className="text-amber-500 font-semibold">★ {rel.rating}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <Link to="/ma-home-care-directory" className="text-xs font-bold text-[#76248a] hover:text-[#40ddd3] transition-colors">
                    View All 500 Massachusetts Agencies →
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Bottom SEO Directory Links */}
      <section className="py-12 bg-gray-100 border-t border-gray-200 px-4">
        <div className="container-narrow text-center">
          <h3 className="text-xl font-black text-[#561868] mb-4">
            Massachusetts Home Care Agency Index
          </h3>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-6">
            Compare verified elder care agencies across Greater Boston, Middlesex County, Worcester County, North Shore, South Shore, Cape Cod, and Western Massachusetts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/ma-home-care-directory">
              <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-white text-xs font-bold">
                Browse Full MA Directory
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-white text-xs font-bold">
                Explore Akirapa Care Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-[#76248a] hover:bg-[#561868] text-white rounded-full text-xs font-bold">
                Speak to a Care Specialist
              </Button>
            </Link>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-[11px] text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Disclaimer: Akirapa Home Care is an independent care provider headquartered in Burlington, MA. All trademarks, service marks, and trade names referenced in this directory belong to their respective owners. Information presented is for consumer educational and comparative purposes.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

