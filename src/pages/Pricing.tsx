import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CareQuoteCalculator } from "@/components/CareQuoteCalculator";
import { BurlingtonCareQuestions } from "@/components/BurlingtonCareQuestions";

export default function Pricing() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Transparent Home Care Pricing & Hourly Rates in Burlington, MA | Akirapa",
    "description": "Transparent home care rates in Burlington & Middlesex County, MA. Certified CNA care from $36-$44/hr, 24/7 care, zero long-term contracts, and free in-home assessments.",
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Akirapa Home Care",
      "url": "https://akirapahomecareus.com",
      "telephone": "+1 781-226-9910",
      "priceRange": "$36 - $44 / hr"
    }
  };

  const pricingTiers = [
    {
      title: "Hourly CNA Care",
      subtitle: "Flexible visits tailored around Mom or Dad's daily routine",
      rate: "$36 – $44",
      unit: "per hour",
      badge: "Most Popular",
      badgeColor: "bg-[#76248a] text-white",
      minimum: "4-Hour Minimum per Visit",
      features: [
        "1-on-1 certified Massachusetts CNA (Registry-Verified)",
        "Assistance with bathing, dressing, grooming & hygiene",
        "Medication reminders & prescription pickup",
        "Nutritious meal preparation & hydration tracking",
        "Safe transfer assistance & mobility encouragement",
        "Real-time AkiVault™ shift reports delivered to your phone",
        "Zero weekend surcharges or surge fees"
      ],
      idealFor: "Seniors needing focused morning/evening help, post-surgery recovery, or daily companion oversight.",
      ctaText: "Schedule Free In-Home Assessment",
      ctaLink: "/contact"
    },
    {
      title: "12-Hour Day / Night Shift",
      subtitle: "Continuous awake supervision for fall prevention & sundowning",
      rate: "$420 – $500",
      unit: "per 12-hour shift",
      badge: "High Peace of Mind",
      badgeColor: "bg-emerald-600 text-white",
      minimum: "Day (8A-8P) or Night (8P-8A)",
      features: [
        "Continuous 100% awake CNA oversight throughout the entire shift",
        "Nighttime bathroom assistance & fall prevention",
        "Gentle redirection for dementia sundowning or wandering",
        "Breakfast, lunch, or dinner preparation & clean-up",
        "Full 8-point AkiVault welfare check logged at shift conclusion",
        "Immediate red-flag notification to family and on-call nurse"
      ],
      idealFor: "Seniors recovering from acute hospitalization, high fall risks, or family caregivers needing uninterrupted overnight sleep.",
      ctaText: "Request Overnight or Day Shift",
      ctaLink: "/contact"
    },
    {
      title: "24/7 Around-the-Clock Care",
      subtitle: "Complete continuous protection with rotating Care Pod teams",
      rate: "$800 – $960",
      unit: "per 24-hour cycle",
      badge: "Nursing Home Alternative",
      badgeColor: "bg-purple-900 text-white",
      minimum: "Continuous 2-3 Shift Rotation",
      features: [
        "Two 12-hour or three 8-hour rotating awake CNA shifts",
        "Dedicated 3-person Care Pod (same trusted faces every week)",
        "Never an exhausted caregiver sleeping on duty",
        "Full assistance with all Activities of Daily Living (ADLs)",
        "Close coordination with visiting nurses, PTs, and physicians",
        "Live family messaging portal with hourly shift visibility"
      ],
      idealFor: "Advanced Alzheimer's/dementia, stroke recovery, hospice comfort care, or families seeking a safer alternative to assisted living.",
      ctaText: "Consult a 24/7 Care Coordinator",
      ctaLink: "/contact"
    },
    {
      title: "Live-In Care",
      subtitle: "Dedicated caregiver residing in the home with private quarters",
      rate: "$450 – $550",
      unit: "per day flat rate",
      badge: "Cost-Effective 24-Hr",
      badgeColor: "bg-blue-600 text-white",
      minimum: "Private Room & 8hr Sleep Required",
      features: [
        "Consistent primary caregiver residing in client's home",
        "Assistance with daily living throughout waking hours",
        "Home-cooked meals, light housekeeping & companionship",
        "Substantial savings compared to 24/7 hourly rotating shifts",
        "Caregiver requires private bedroom and 8 hours sleep period"
      ],
      idealFor: "Stable seniors who sleep through the night but need steady daytime companionship, transfers, and safety supervision.",
      ctaText: "Inquire About Live-In Care",
      ctaLink: "/contact"
    }
  ];

  return (
    <Layout>
      <SEO
        title="Transparent Home Care Pricing in Burlington, MA | Hourly Rates & Costs | Akirapa"
        description="Transparent home care costs in Burlington & Middlesex County, MA. Licensed CNA care from $36-$44/hour. Zero long-term contracts, zero hidden fees, and rapid same-day availability."
        keywords="home care cost Burlington MA, in home caregiver hourly rate Massachusetts, 24 hour home care cost, elder care prices Middlesex County, transparent home care pricing"
        path="/pricing"
        schemaExtra={[pricingSchema]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Care Services", path: "/services" },
          { name: "Pricing Guide", path: "/pricing" }
        ]}
      />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-[#76248a] via-[#561868] to-[#3a0d48] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#40ddd3_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#40ddd3] text-gray-950 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-sm">
            <i className="fa-solid fa-tag text-sm"></i>
            No Hidden Fees · No Long-Term Contracts
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            Transparent Home Care Pricing in Burlington, MA
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            When you're trying to figure out care for Mom or Dad, the last thing you need is phone tag just to get a straight price. Here is exactly what home care costs, how hours work, and how fast we can start.
          </p>

          {/* Rapid Availability Banner for the Daughter in Crisis */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-[#40ddd3]/40 rounded-2xl p-4 text-xs sm:text-sm text-white/95 flex items-start sm:items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#40ddd3] text-gray-950 flex items-center justify-center shrink-0 font-bold">
              <i className="fa-solid fa-bolt text-lg"></i>
            </div>
            <div>
              <strong className="text-[#40ddd3] block uppercase tracking-wider text-xs">Facing a Discharge or Sudden Crisis?</strong>
              <span>Our Burlington Care Coordinators can complete an in-home assessment within <strong>4 to 12 hours</strong> and place a qualified CNA within <strong>24 hours</strong>. Call our 24/7 Helpline at <a href="tel:+17812269910" className="underline font-bold text-white hover:text-[#40ddd3]">+1 781-226-9910</a>.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Commitments Bar */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#76248a] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-handshake-slash text-base"></i>
              </div>
              <div>
                <strong className="text-gray-900 block text-sm">No Long-Term Contracts</strong>
                <span className="text-xs text-gray-500">Pause, adjust, or cancel with 24–48 hrs notice</span>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#76248a] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-file-invoice-dollar text-base"></i>
              </div>
              <div>
                <strong className="text-gray-900 block text-sm">$0 Free Clinical Assessment</strong>
                <span className="text-xs text-gray-500">Zero intake fees, setup charges, or hidden deposits</span>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#76248a] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-clock text-base"></i>
              </div>
              <div>
                <strong className="text-gray-900 block text-sm">4-Hour Minimum per Visit</strong>
                <span className="text-xs text-gray-500">Guarantees dedicated, highly vetted CNAs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Cards */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Clear, Predictable Rates for Every Level of Care
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Industry guidance describes the adult child in crisis as needing reassurance, transparent pricing, and rapid availability. Here are our exact rate ranges:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge className={`${tier.badgeColor} font-bold text-[11px] px-2.5 py-0.5`}>
                      {tier.badge}
                    </Badge>
                    <span className="text-[11px] font-bold text-gray-500">
                      {tier.minimum}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 mb-1">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 min-h-[32px]">
                    {tier.subtitle}
                  </p>

                  <div className="bg-purple-50/70 p-4 rounded-2xl border border-[#76248a]/10 mb-6 text-center">
                    <span className="text-3xl sm:text-4xl font-black text-[#76248a] tracking-tight">
                      {tier.rate}
                    </span>
                    <span className="text-xs font-bold text-gray-600 block mt-0.5">
                      {tier.unit}
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-gray-700 mb-6">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <i className="fa-solid fa-circle-check text-emerald-600 mt-0.5 shrink-0 text-xs"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100 mb-4">
                    <strong className="text-gray-800">Best for:</strong> {tier.idealFor}
                  </div>
                  <Button asChild className="w-full bg-[#76248a] hover:bg-[#561868] text-white font-bold rounded-xl shadow-xs text-xs h-10">
                    <Link to={tier.ctaLink}>{tier.ctaText}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Explanation of Why Rates Vary */}
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-circle-info text-[#76248a]"></i>
              What Determines Where Your Care Falls in the $36 – $44 Range?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-gray-600">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <strong className="text-gray-900 block mb-1">$36 – $38 / Hour</strong>
                <span>Light companion care, meal preparation, medication reminders, light housekeeping, and local errand accompaniment.</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <strong className="text-gray-900 block mb-1">$39 – $41 / Hour</strong>
                <span>Hands-on personal care: assisted shower/bathing, dressing, incontinence management, and 1-person pivot transfers.</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <strong className="text-gray-900 block mb-1">$42 – $44 / Hour</strong>
                <span>Advanced dementia care (wandering/sundowning), post-stroke rehab, 2-person or mechanical Hoyer transfers, and high-acuity hospice support.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Care Quote Calculator Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#76248a]/10 text-[#76248a] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              <i className="fa-solid fa-calculator text-[#40ddd3]"></i>
              Instant Estimate Tool
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Estimate Your Weekly Care Budget in 60 Seconds
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Use our quick calculator to see estimated weekly and monthly investments based on your family's scheduling needs.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <CareQuoteCalculator />
          </div>
        </div>
      </section>

      {/* Plain Language Burlington Questions Component */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <BurlingtonCareQuestions />
        </div>
      </section>

      {/* Insurance & Payment Options Breakdown */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              How Families Pay for Home Care in Massachusetts
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Navigating senior care financing can be confusing. Here is the realistic breakdown of how our clients fund their care:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <i className="fa-solid fa-file-shield text-2xl text-[#76248a]"></i>
                <h3 className="font-bold text-gray-900 text-base">Long-Term Care Insurance (LTCI)</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                Most LTCI policies (Genworth, John Hancock, Mutual of Omaha, MetLife) fully cover our certified CNA care. Akirapa handles all billing paperwork and submits verified AkiVault GPS logs directly to your carrier for rapid reimbursement.
              </p>
              <Badge variant="outline" className="text-xs font-semibold text-emerald-700 bg-emerald-50 border-emerald-200">
                Direct Insurer Claim Support Included
              </Badge>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <i className="fa-solid fa-medal text-2xl text-[#76248a]"></i>
                <h3 className="font-bold text-gray-900 text-base">Veterans Aid & Attendance Pension</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                Eligible wartime veterans and surviving spouses can receive up to <strong>$2,431+ per month</strong> tax-free through the VA to pay for in-home caregiving assistance.
              </p>
              <Badge variant="outline" className="text-xs font-semibold text-purple-700 bg-purple-50 border-purple-200">
                VA Benefit Documentation Assistance
              </Badge>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <i className="fa-solid fa-credit-card text-2xl text-[#76248a]"></i>
                <h3 className="font-bold text-gray-900 text-base">Private Pay & Family Contribution</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                Pay simply via ACH electronic bank transfer or credit card. We provide clear, itemized weekly invoices with down-to-the-minute shift logs so every sibling sees exactly what was delivered.
              </p>
              <Badge variant="outline" className="text-xs font-semibold text-blue-700 bg-blue-50 border-blue-200">
                Itemized Weekly Invoicing
              </Badge>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <i className="fa-solid fa-heart-pulse text-2xl text-[#76248a]"></i>
                <h3 className="font-bold text-gray-900 text-base">HSA & FSA Pre-Tax Dollars</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                When medically necessary assistance with ADLs is prescribed by a physician, home care expenses may be paid using pre-tax Health Savings Accounts (HSA) or Flexible Spending Accounts (FSA).
              </p>
              <Badge variant="outline" className="text-xs font-semibold text-gray-700 bg-gray-100 border-gray-200">
                Pre-Tax Eligible with Doctor Letter
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-[#76248a] to-[#561868] text-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black">
            Get an Exact Care Quote Tailored to Mom's Needs
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            Our free in-home assessment includes a full functional review, home safety inspection, and a customized care plan with an exact flat rate. No pressure, no obligations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-black px-6 rounded-xl shadow-md button-shimmer">
              <Link to="/contact">Book Free In-Home Assessment</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-[#76248a] font-bold px-6 rounded-xl">
              <a href="tel:+17812269910">Call +1 781-226-9910</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
