import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FAQItemData {
  id: string;
  category: "all" | "home-care" | "transportation" | "staffing" | "training" | "safety";
  categoryLabel: string;
  question: string;
  answer: string;
  highlight?: boolean;
}

const FAQ_LIST: FAQItemData[] = [
  {
    id: "best-home-care-ma",
    category: "home-care",
    categoryLabel: "In-Home Care",
    question: "Where can I find the best home care services in Massachusetts?",
    answer: "For reliable, compassionate, and affordable Home Care solutions, contact Akirapa Home Care headquartered at 281 Cambridge Street, Burlington, MA 01803. Our trained caregivers and licensed nurses provide personalized 24/7 in-home assistance, companionship, private-duty nursing, and specialized memory support across Middlesex, Essex, Norfolk, and Suffolk counties.",
    highlight: true,
  },
  {
    id: "cheap-nemt-ma",
    category: "transportation",
    categoryLabel: "Medical Transportation",
    question: "Where can I get cheap non-emergency medical transportation in Massachusetts?",
    answer: "Akirapa Home Care provides reliable and 24/7 available Non-Emergency Transportation Services (NEMT) across Massachusetts. We provide door-to-door transportation for doctor appointments, hospital discharges, surgeries, dialysis sessions, physical therapy, and everyday community needs.",
    highlight: true,
  },
  {
    id: "care-and-transportation-same-agency",
    category: "home-care",
    categoryLabel: "Integrated Care",
    question: "Is it possible to get the home care service and transportation from same agency?",
    answer: "Yes, Hands-On America Services provide both services. Our integrated approach allows families and healthcare facilities to access in-home personal care, private-duty nursing, and medical transportation from one trusted company, giving you a single seamless point of contact for care coordination.",
    highlight: true,
  },
  {
    id: "nemt-escort-facilities",
    category: "transportation",
    categoryLabel: "Medical Transportation",
    question: "Does Non-Emergency Medical Transportation provider provide the escort facilities?",
    answer: "Yes! Hands-On America Services provide escort facilities along with door-to-door Non-Emergency Medical Transportation. Our trained caregivers assist clients from inside their living room, help navigate steps, provide physical balance support, escort them inside clinical waiting rooms, and assist with check-in paperwork.",
    highlight: true,
  },
  {
    id: "cheap-wheelchair-accessible-transport",
    category: "transportation",
    categoryLabel: "Medical Transportation",
    question: "Cheap wheelchair accessible transportation?",
    answer: "Hands-On America Services provide cheap, best and same day booking wheelchair, staircase assistance and stretcher services. Vehicles are equipped with certified hydraulic lifts and secure tie-downs to ensure complete safety and comfort.",
    highlight: true,
  },
  {
    id: "home-care-staffing-ma",
    category: "staffing",
    categoryLabel: "Healthcare Staffing",
    question: "Home Care staffing services in Massachusetts?",
    answer: "Get reliable, compassionate and trained caregivers, Registered Nurses (RNs), Licensed Practical Nurses (LPNs), Certified Nursing Assistants (CNAs), Home Health Aides (HHAs), Certified Medical Assistants, Behavioral Health Technicians, Phlebotomy Technicians, and housekeeping staff from Hands-On America Services. We support hospitals, nursing homes, assisted living facilities, and private clients statewide.",
    highlight: true,
  },
  {
    id: "cna-training-center-ma",
    category: "training",
    categoryLabel: "Education & Training",
    question: "Best, state approved and cheap CNA training center in Massachusetts?",
    answer: "Hands-On America Services is the best and affordable State approved CNA/HHA training center with high state passing rates. We offer comprehensive Nurse Aide Training (NAT), Home Health Aide (HHA) certification, hands-on clinical lab practice, and direct job placement opportunities.",
    highlight: true,
  },
  {
    id: "cpr-training-near-me",
    category: "training",
    categoryLabel: "Education & Training",
    question: "CPR training near me?",
    answer: "Hands-On America Services provides easily accessible hands-on CPR training and Basic Life Support (BLS) certification from the American Heart Association (AHA) in Massachusetts, along with Alzheimer's and dementia specialized care training.",
    highlight: true,
  },
  {
    id: "rates-cost",
    category: "home-care",
    categoryLabel: "Pricing & Rates",
    question: "How much does in-home senior care cost in Massachusetts?",
    answer: "In Massachusetts, private-duty in-home care rates typically range between $32 to $42 per hour depending on whether care is companion support, certified personal care (ADLs), or specialized dementia care. We provide transparent rates with zero long-term contracts, zero hidden cancellation fees, and flexible hourly or 24/7 packages.",
  },
  {
    id: "contracts-policy",
    category: "home-care",
    categoryLabel: "Contracts & Terms",
    question: "Do you require long-term binding contracts?",
    answer: "No. We believe families should remain in total control of their care. We operate on a strict zero-contract model: you can start, adjust, pause, or end services anytime with zero financial lock-in or cancellation penalties.",
  },
  {
    id: "urgent-discharge-start",
    category: "home-care",
    categoryLabel: "In-Home Care",
    question: "How quickly can care begin for an urgent hospital discharge?",
    answer: "Our care coordinators are available 24/7 at +1 781-226-9910. In urgent situations, such as a hospital or rehab discharge from Lahey Hospital, Lowell General, Winchester Hospital, or Boston-area medical centers, we can initiate care within 2 to 4 hours.",
  },
  {
    id: "companion-vs-personal-care",
    category: "home-care",
    categoryLabel: "Care Differences",
    question: "What is the difference between companion care and personal care?",
    answer: "Companion care provides friendly social engagement, light housekeeping, meal preparation, and transportation without hands-on physical contact. Personal care involves certified nursing assistants (CNAs) or home health aides providing hands-on assistance with activities of daily living (ADLs) such as bathing, dressing, grooming, incontinence care, and mobility transfer.",
  },
  {
    id: "akivault-evv-verification",
    category: "safety",
    categoryLabel: "Safety & Technology",
    question: "How do you guarantee caregiver arrival, punctuality, and safety?",
    answer: "Every caregiver undergoes rigorous multi-state criminal background checks, DPH license verification, and clinical assessments. Shifts are tracked through our proprietary AkiVault™ system with GPS-verified Electronic Visit Verification (EVV), mandatory 8-point welfare checks, and real-time family updates.",
  },
  {
    id: "service-areas-coverage",
    category: "home-care",
    categoryLabel: "Service Areas",
    question: "What areas in Massachusetts do you serve?",
    answer: "We serve communities throughout Middlesex County, Essex County, Norfolk County, and Suffolk County, including Billerica, Burlington, Lexington, Bedford, Woburn, Winchester, Concord, Waltham, Arlington, Belmont, Boston, Cambridge, Newton, and surrounding Greater Boston and North Shore regions.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: "fa-solid fa-list-check" },
  { id: "home-care", label: "In-Home Care", icon: "fa-solid fa-house-chimney-medical" },
  { id: "transportation", label: "Medical Transportation (NEMT)", icon: "fa-solid fa-van-shuttle" },
  { id: "staffing", label: "Healthcare Staffing", icon: "fa-solid fa-user-doctor" },
  { id: "training", label: "CNA & CPR Training", icon: "fa-solid fa-graduation-cap" },
  { id: "safety", label: "Safety & Technology", icon: "fa-solid fa-shield-halved" },
];

export default function FAQs() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "best-home-care-ma": true,
    "cheap-nemt-ma": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    FAQ_LIST.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_LIST.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Schema FAQ list
  const seoFaqs = FAQ_LIST.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <Layout>
      <SEO
        title="Frequently Asked Questions (FAQ) | Akirapa Home Care Massachusetts"
        description="Get answers about in-home senior care, 24/7 non-emergency medical transportation (NEMT), healthcare staffing solutions, and state-approved CNA/CPR training in Massachusetts."
        canonical="https://akirapahomecareus.com/faqs"
        keywords="home care FAQ Massachusetts, medical transportation FAQ Burlington MA, NEMT Massachusetts, senior care FAQ, home health aide MA, Akirapa Home Care"
        faqs={seoFaqs}
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-[#561868] via-[#76248a] to-[#3a0d46] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#40ddd3_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge className="bg-[#40ddd3] text-gray-950 hover:bg-[#34b8af] font-black uppercase tracking-wider text-xs px-3.5 py-1 mb-4 shadow-sm inline-flex items-center gap-1.5">
            <i className="fa-solid fa-circle-question"></i> Help &amp; Guidance Center
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-purple-100/90 max-w-2xl mx-auto leading-relaxed mb-8">
            Clear, transparent answers about in-home senior care, 24/7 non-emergency medical transportation (NEMT), healthcare staffing, and state-approved CNA/CPR training across Massachusetts.
          </p>

          {/* Quick Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. transportation, CNA, staffing, cost)..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white text-gray-900 placeholder-gray-400 font-medium text-sm sm:text-base shadow-xl border border-white/20 focus:outline-hidden focus:ring-2 focus:ring-[#40ddd3]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main FAQ Content Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-xs ${
                    active
                      ? "bg-[#76248a] text-white shadow-md scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <i className={`${cat.icon} ${active ? "text-[#40ddd3]" : "text-[#76248a]"}`}></i>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Control Bar: Result count & Expand/Collapse */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6 text-sm text-gray-600">
            <span className="font-semibold">
              Showing <span className="text-[#76248a] font-bold">{filteredFaqs.length}</span> questions
              {selectedCategory !== "all" && ` in ${CATEGORIES.find((c) => c.id === selectedCategory)?.label}`}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={expandAll}
                className="text-xs font-bold text-[#76248a] hover:underline"
              >
                Expand All
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={collapseAll}
                className="text-xs font-bold text-gray-500 hover:underline"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* FAQ Accordion List */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-purple-50 text-[#76248a] flex items-center justify-center mx-auto mb-4 text-2xl">
                <i className="fa-solid fa-question"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No matching questions found</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                We couldn&apos;t find any questions matching &ldquo;{searchQuery}&rdquo;. Try another term or contact our care team directly.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-[#76248a] text-white hover:bg-[#561868] font-bold"
              >
                View All Questions
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isOpen = !!openItems[faq.id];
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl transition-all duration-300 border bg-white ${
                      isOpen
                        ? "border-[#76248a]/40 shadow-md ring-1 ring-[#76248a]/10"
                        : "border-gray-200 hover:border-gray-300 shadow-xs"
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-hidden"
                      aria-expanded={isOpen}
                    >
                      <div className="flex-1 pr-2">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[11px] uppercase font-black tracking-wider text-[#76248a] bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                            {faq.categoryLabel}
                          </span>
                          {faq.highlight && (
                            <span className="text-[10px] uppercase font-extrabold tracking-wider text-teal-800 bg-[#40ddd3]/20 px-2 py-0.5 rounded-md">
                              Popular Question
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? "bg-[#76248a] text-white rotate-180"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <i className="fa-solid fa-chevron-down text-sm"></i>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-gray-100 mt-2">
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Office Contact & Call-to-Action Card */}
          <div className="mt-16 bg-gradient-to-br from-[#561868] to-[#76248a] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs uppercase tracking-wider font-extrabold text-[#40ddd3]">
                  Have a Question Not Listed Here?
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Speak Directly With Our Care Specialists
                </h2>
                <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed">
                  Call us 24/7 or visit our Massachusetts headquarters in Burlington at 281 Cambridge Street, Burlington, MA 01803. We are ready to assist you anytime.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start text-xs text-purple-200">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-phone text-[#40ddd3]"></i> +1 781-226-9910 (24/7 Helpline)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-[#40ddd3]"></i> 281 Cambridge Street, Burlington, MA 01803
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href="tel:+17812269910"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#40ddd3] hover:bg-[#34b8af] text-gray-950 font-black text-sm transition-all duration-300 shadow-lg hover:scale-105"
                >
                  <i className="fa-solid fa-phone"></i>
                  <span>Call Us Now</span>
                </a>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all duration-300"
                >
                  <span>Request Assessment</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
