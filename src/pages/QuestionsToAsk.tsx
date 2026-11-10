import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BurlingtonCareQuestions } from "@/components/BurlingtonCareQuestions";

interface TrapQuestion {
  id: string;
  number: string;
  question: string;
  whyItMatters: string;
  trapToAvoid: string;
  plainLanguageFact: string;
  howAkirapaAnswers: string;
  category: "Staffing & Quality" | "Pricing & Terms" | "Safety & Technology";
}

export default function QuestionsToAsk() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [printMode, setPrintMode] = useState<boolean>(false);

  const questions: TrapQuestion[] = [
    {
      id: "q1-continuity",
      number: "01",
      question: "Will the same caregiver show up each week, or will a different stranger arrive at our door?",
      category: "Staffing & Quality",
      whyItMatters: "Continuity of care is the single greatest predictor of safety, comfort, and cognitive stability—especially for seniors with dementia or Alzheimer's.",
      trapToAvoid: "Agencies operating like on-demand taxi dispatchers who send whoever is available that morning. A client with memory loss might see 8 different strangers in 2 weeks, triggering acute paranoia, wandering, or refusal of care.",
      plainLanguageFact: "At Akirapa Home Care, we assign dedicated 2-to-3 person Care Pods so clients see the same trusted, familiar caregivers on every shift.",
      howAkirapaAnswers: "We build dedicated 'Care Pods' (one primary CNA and two secondary backups who know Mom's exact routine). If your primary caregiver takes a vacation or is sick, a familiar backup steps in seamlessly."
    },
    {
      id: "q2-cna-credentials",
      number: "02",
      question: "Are your caregivers state-verified CNAs on the Massachusetts registry, or uncertified companions?",
      category: "Staffing & Quality",
      whyItMatters: "Lifting an adult, assisting with a shower on slick tile, and preventing falls requires specialized clinical body mechanics.",
      trapToAvoid: "In Massachusetts, non-medical home care agencies are not legally required to hire CNAs. Many agencies quietly dispatch uncertified companions for difficult transfer shifts while billing families top-tier rates.",
      plainLanguageFact: "All hands-on personal hygiene and transfer care at Akirapa is performed exclusively by certified CNAs verified on the Massachusetts DPH Registry.",
      howAkirapaAnswers: "Every caregiver providing personal care at Akirapa holds an active, unencumbered Massachusetts Certified Nurse Aide (CNA) license verified directly with the Department of Public Health, plus CPR/BLS certification."
    },
    {
      id: "q3-gps-evv",
      number: "03",
      question: "How do you prove the caregiver was physically inside the home for the full scheduled time?",
      category: "Safety & Technology",
      whyItMatters: "Families paying $36 to $44 an hour deserve 100% verification that care was actually delivered, not estimated on paper.",
      trapToAvoid: "Paper timesheets signed days later or generic clock-ins that allow a caregiver to clock in from a car, Starbucks, or highway miles away from the client's home.",
      plainLanguageFact: "We use GPS-geofenced Electronic Visit Verification (EVV) that pinpoints arrival and departure within 50 feet of the home before allowing clock-in.",
      howAkirapaAnswers: "Through our proprietary AkiVault™ system, caregivers cannot clock in until their mobile GPS coordinates place them within 50 feet of the client's residence. Clock-in and clock-out timestamps are cryptographically recorded and visible to families in real time."
    },
    {
      id: "q4-contracts",
      number: "04",
      question: "Do I have to sign a long-term contract?",
      category: "Pricing & Terms",
      whyItMatters: "Senior health conditions change suddenly. A sudden hospital admission or rehabilitation stay shouldn't leave you paying for unused care.",
      trapToAvoid: "Agencies requiring 30-day, 60-day, or 90-day lock-in contracts with hefty cancellation penalties or non-refundable multi-thousand-dollar retainers.",
      plainLanguageFact: "No long-term contracts. At Akirapa Home Care, families can pause, adjust, or cancel care with 24 to 48 hours notice without penalty.",
      howAkirapaAnswers: "We operate on flexible, transparent service agreements. You are in total control. If Mom needs to pause visits for a hospital stay or you want to increase hours, simply notify us with 24 to 48 hours notice."
    },
    {
      id: "q5-red-flags",
      number: "05",
      question: "What happens if a caregiver notices a health change or fall risk during a shift?",
      category: "Safety & Technology",
      whyItMatters: "Small symptoms—like drinking less water or mild confusion—are often early warning signs of life-threatening Urinary Tract Infections (UTIs) or dehydration.",
      trapToAvoid: "Agencies that rely on paper binders left in the kitchen where notes aren't reviewed by a supervisor until the end of the week, or worse, until the client is in the ER.",
      plainLanguageFact: "Our caregivers complete mandatory 8-point welfare checks every shift, and any red flag triggers instant alerts to our Nurse Supervisor within 60 seconds.",
      howAkirapaAnswers: "Caregivers must complete an 8-point clinical welfare check in AkiVault at every shift completion. Any concerning metric (low appetite, fever, skin redness, fall risk) instantly fires an automated red-flag SMS to our on-call clinical nurse coordinator and the family."
    },
    {
      id: "q6-pricing-cost",
      number: "06",
      question: "What does home care cost in Burlington, and are there hidden assessment or startup fees?",
      category: "Pricing & Terms",
      whyItMatters: "Families in crisis need transparent, predictable numbers immediately—not high-pressure sales calls or surprise billing fees.",
      trapToAvoid: "Agencies quoting a low 'teaser rate' over the phone, then adding $250 intake fees, fuel surcharges, weekend premiums, or administrative filing fees on your first bill.",
      plainLanguageFact: "Home care in Burlington typically ranges from $36 to $44 per hour for licensed CNAs. Akirapa has $0 intake fees and provides free in-home assessments.",
      howAkirapaAnswers: "Our rates in Burlington and Middlesex County range transparently between $36 and $44/hr depending on care intensity. We charge zero assessment fees, zero intake charges, and zero weekend surge penalties."
    },
    {
      id: "q7-minimum-hours",
      number: "07",
      question: "Is there a minimum number of hours per visit?",
      category: "Pricing & Terms",
      whyItMatters: "Knowing scheduling minimums helps you budget accurately and ensures your caregiver isn't rushing through basic hygiene tasks.",
      trapToAvoid: "Agencies offering 1-hour visits that attract high caregiver turnover and frequent 'no-shows' because caregivers cannot afford to commute for single-hour shifts.",
      plainLanguageFact: "Yes, Akirapa requires a 4-hour minimum per visit to ensure we recruit, retain, and fairly compensate dependable, top-tier CNAs.",
      howAkirapaAnswers: "We maintain a 4-hour minimum per shift. This allows us to attract dedicated, highly skilled Massachusetts CNAs who have predictable schedules and dedicated transportation, ensuring zero dropped shifts."
    },
    {
      id: "q8-medicare-coverage",
      number: "08",
      question: "Does Medicare pay for non-medical home care?",
      category: "Pricing & Terms",
      whyItMatters: "Many families mistakenly assume Medicare will pay for their parent's daily bathing, meals, and companionship, only to be shocked by denial letters.",
      trapToAvoid: "Agencies that mislead families with vague promises that 'Medicare might help cover this' just to get a contract signed.",
      plainLanguageFact: "Traditional Medicare does not pay for non-medical personal home care or 24/7 companionship. Care is funded via Long-Term Care Insurance, VA benefits, or private pay.",
      howAkirapaAnswers: "We give families honest guidance upfront: Medicare only covers short-term skilled medical therapy ordered by a doctor. However, Long-Term Care Insurance (LTCI) and Veterans Aid & Attendance benefits (up to $2,431+/mo) do cover our care, and we handle all verification paperwork for you."
    },
    {
      id: "q9-sample-shift-report",
      number: "09",
      question: "Can I see an actual shift report before signing up with your agency?",
      category: "Safety & Technology",
      whyItMatters: "Seeing the actual documentation format shows whether the agency has a structured clinical process or just sends casual babysitters.",
      trapToAvoid: "Agencies that cannot show you a shift report because they have no software, no standardized checklists, and rely on verbal phone debriefs.",
      plainLanguageFact: "Families can explore our interactive dummy AkiVault shift report online anytime before making a care decision.",
      howAkirapaAnswers: "We openly publish an interactive, realistic dummy AkiVault shift report on our website showing exact GPS timestamps, 8-point welfare checks, and CNA shift narratives. You can review it right now at /sample-shift-report."
    },
    {
      id: "q10-after-hours-supervisor",
      number: "10",
      question: "Who is on call if an emergency happens at 11:00 PM on a Saturday night?",
      category: "Staffing & Quality",
      whyItMatters: "Emergencies don't happen only between 9 AM and 5 PM on weekdays.",
      trapToAvoid: "Agencies that forward after-hours calls to an outsourced overseas call center or an automated voicemail box that isn't checked until Monday morning.",
      plainLanguageFact: "Akirapa operates a 24/7 clinical helpline answered by local care coordinators and nurse supervisors 365 days a year.",
      howAkirapaAnswers: "Our 24/7 Helpline (+1 781-226-9910) connects directly to local Massachusetts Care Coordinators and on-call Registered Nurses who know our clients personally and can dispatch emergency backup immediately."
    }
  ];

  const filteredQuestions = activeCategory === "all"
    ? questions
    : questions.filter((q) => q.category === activeCategory);

  const questionsSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${q.plainLanguageFact} ${q.howAkirapaAnswers}`
      }
    }))
  };

  return (
    <Layout>
      <SEO
        title="10 Questions to Ask Any Home Care Agency (Before Signing) | Akirapa"
        description="A fair, objective guide for families in Burlington & Massachusetts. Use these 10 questions to evaluate caregiver credentials, GPS proof, contracts, and hidden costs."
        keywords="questions to ask home care agency, how to choose home care Burlington MA, home care agency checklist, home caregiver vetting Massachusetts, elder care questions"
        path="/questions-to-ask-a-home-care-agency"
        schemaExtra={[questionsSchema]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Care Resources", path: "/blog" },
          { name: "10 Questions to Ask Any Agency", path: "/questions-to-ask-a-home-care-agency" }
        ]}
      />

      {/* Header Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-[#76248a] via-[#561868] to-[#3a0d48] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#40ddd3_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#40ddd3] text-gray-950 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-sm">
            <i className="fa-solid fa-list-check text-sm"></i>
            Objective Consumer Guide
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            10 Questions to Ask Any Home Care Agency (Before Signing Anything)
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            When you're searching for in-home care for an aging parent, glossy brochures all sound identical. Use this fair, objective checklist to uncover the truth about caregiver vetting, contracts, GPS verification, and hidden fees.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => window.print()}
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <i className="fa-solid fa-print text-[#76248a]"></i>
              <span>Print This Checklist</span>
            </button>
            <Button asChild variant="outline" className="border-2 border-white/60 text-white hover:bg-white hover:text-[#76248a] font-bold px-5 py-2.5 rounded-xl text-sm">
              <Link to="/pricing">See Our Transparent Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Filter and Overview */}
      <section className="bg-white border-b border-gray-100 py-6 sticky top-20 z-20 shadow-2xs">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700">
            <i className="fa-solid fa-filter text-[#76248a]"></i>
            <span>Filter by Category:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All 10 Questions" },
              { id: "Staffing & Quality", label: "Staffing & Credentials" },
              { id: "Pricing & Terms", label: "Pricing & Contracts" },
              { id: "Safety & Technology", label: "Safety & Technology" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === tab.id
                    ? "bg-[#76248a] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Questions List */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          
          {filteredQuestions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-purple-100 text-[#76248a] font-mono font-black text-sm flex items-center justify-center shrink-0">
                    {item.number}
                  </span>
                  <Badge variant="outline" className="border-gray-200 text-xs font-bold text-gray-600 bg-gray-50">
                    {item.category}
                  </Badge>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Fair Test Question
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 leading-snug">
                "{item.question}"
              </h2>

              {/* Quotable AI & Search Fact Callout Box */}
              <div className="bg-purple-50/70 p-4 rounded-2xl border-l-4 border-[#76248a] mb-5">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#76248a] block mb-1">
                  Key Plain-Language Fact (Quote This):
                </span>
                <p className="text-sm sm:text-base font-bold text-gray-900">
                  "{item.plainLanguageFact}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm mb-5">
                {/* Why It Matters */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-gray-900 block mb-1 flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-info text-blue-500"></i> Why It Matters:
                  </strong>
                  <p className="text-gray-600 leading-relaxed">{item.whyItMatters}</p>
                </div>

                {/* The Trap to Avoid */}
                <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-100">
                  <strong className="text-rose-950 block mb-1 flex items-center gap-1.5">
                    <i className="fa-solid fa-triangle-exclamation text-rose-500"></i> The Common Agency Trap:
                  </strong>
                  <p className="text-gray-700 leading-relaxed">{item.trapToAvoid}</p>
                </div>
              </div>

              {/* How Akirapa Answers */}
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 text-xs sm:text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <i className="fa-solid fa-shield-check text-emerald-600 text-base"></i>
                  <strong className="text-emerald-950 font-bold">How Akirapa Home Care Answers:</strong>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {item.howAkirapaAnswers}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Plain Language Questions Component Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <BurlingtonCareQuestions />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-[#76248a] to-[#561868] text-white text-center">
        <div className="container-narrow mx-auto px-4 max-w-3xl space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black">
            Put Us to the Test
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            Call our team and ask us every single one of these 10 questions. We believe total transparency is the only way to earn a family's trust.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-black px-6 rounded-xl shadow-md button-shimmer">
              <Link to="/contact">Schedule Free Consultation</Link>
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
