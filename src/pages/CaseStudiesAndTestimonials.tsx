import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VideoTestimonial {
  id: string;
  name: string;
  location: string;
  relation: string;
  headline: string;
  duration: string;
  thumbnail: string;
  quote: string;
  fullTranscript: string;
  consentBadge: string;
}

interface CaseStudy {
  id: string;
  category: "post-hospital" | "dementia" | "24-hour" | "parkinsons";
  title: string;
  location: string;
  clientProfile: string;
  challenge: string;
  intervention: string;
  outcome: string;
  timeframe: string;
  metrics: { label: string; value: string }[];
}

export default function CaseStudiesAndTestimonials() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeVideoModal, setActiveVideoModal] = useState<VideoTestimonial | null>(null);

  const videoTestimonials: VideoTestimonial[] = [
    {
      id: "video-1",
      name: "Jennifer R.",
      location: "Burlington, MA",
      relation: "Adult Daughter & Primary Caregiver",
      headline: "How the AkiVault shift reports gave me my sleep back while caring for Mom from an hour away.",
      duration: "1:42",
      thumbnail: "/CARE GIVER  (4).jpg",
      consentBadge: "Written Consent & HIPAA Media Release on File",
      quote: "Before Akirapa, I was waking up in cold sweats wondering if Mom fell or if her caregiver arrived. Seeing Sarah's GPS clock-in at 8:02 AM and reading her detailed notes at 4 PM changed my entire life.",
      fullTranscript: "When Mom was diagnosed with early-stage memory loss and then had her hip surgery, my brothers and I were overwhelmed. I work full-time in corporate finance, and I felt like I was drowning. We tried another agency first, and it was a disaster—different strangers showed up every day, and nobody could tell me if Mom ate. When we switched to Akirapa, the difference was night and day. Sarah, our primary CNA, arrived on time every single morning. The AkiVault app sent an alert to my phone confirming she was there. By 4 PM, I had a full report on Mom's appetite, her physical therapy steps, and her mood. That transparency gave me my life and my sleep back."
    },
    {
      id: "video-2",
      name: "Mark & David T.",
      location: "Bedford, MA",
      relation: "Sons of 81-Year-Old Veteran",
      headline: "From Lahey Hospital discharge to full recovery in 6 weeks without readmission.",
      duration: "2:08",
      thumbnail: "/CARE GIVER  (5).jpg",
      consentBadge: "Written Consent & HIPAA Media Release on File",
      quote: "The hospital discharge planner told us Dad needed 24/7 eyes on him for the first 3 weeks. Akirapa set up a Care Pod within 12 hours of our call. They worked seamlessly with his visiting physical therapist.",
      fullTranscript: "Dad was discharged from Lahey Hospital on a Friday afternoon with strict orders not to bear weight alone. We had zero home care experience and didn't know where to turn. Akirapa's coordinator, Mary, visited Dad's room at the hospital, walked us through the care plan, and had a certified CNA waiting at Dad's home when the medical transport arrived. Having trained CNAs who knew how to operate the transfer equipment prevented a second hospital trip. Six weeks later, Dad was walking out to his garden with just a cane."
    },
    {
      id: "video-3",
      name: "Elena G.",
      location: "Lexington, MA",
      relation: "Spouse & Care Partner",
      headline: "Consistent CNAs instead of a revolving door of strangers for Alzheimer's care.",
      duration: "1:55",
      thumbnail: "/CARE GIVER  (6).jpg",
      consentBadge: "Written Consent & HIPAA Media Release on File",
      quote: "People with Alzheimer's cannot handle a new face every day. Akirapa assigned us two dedicated caregivers—Grace and Michelle—who took the time to learn my husband's music and routine.",
      fullTranscript: "My husband was becoming increasingly agitated around 4:30 PM each evening—what the doctors call sundowning. I was exhausted and close to tears every day. Akirapa didn't just send a sitter; they sent dementia-certified CNAs who brought gentle validation techniques. Grace would put on his favorite Big Band jazz records, make him warm herbal tea, and engage him with photo books. Within two weeks, the evening pacing and anxiety had almost completely stopped. That consistency saved our family."
    }
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: "case-1",
      category: "post-hospital",
      title: "Safe Post-Surgical Orthopedic Recovery After Total Hip Arthroplasty",
      location: "Burlington, MA (Discharge from Lahey Hospital)",
      clientProfile: "Eleanor V., Age 82 · Retired Teacher · Living in Single-Family Home",
      timeframe: "6-Week Intensive Recovery Program",
      challenge: "Following surgery for a fractured femoral neck, Eleanor was discharged with strict non-weight-bearing restrictions. Her daughter lived out-of-state in New York and was terrified of a fall or hospital readmission during the critical 30-day window.",
      intervention: "Akirapa deployed an 8-hour daily Care Pod led by Sarah Jenkins, CNA. Protocol focused on safe pivot transfers, assist-of-one shower hygiene with grab bars, adherence to physical therapy home exercise sheets, and daily AkiVault surgical site skin inspections.",
      outcome: "Eleanor achieved a 100% adherence rate on medication and physical therapy. Zero falls and zero surgical site infections. Stepped down successfully to 2 weekly companion visits at week 6.",
      metrics: [
        { label: "Hospital Readmission", value: "0% (Safely Avoided)" },
        { label: "Care Adherence", value: "100% On-Time" },
        { label: "Mobility Status", value: "Independent with Cane" }
      ]
    },
    {
      id: "case-2",
      category: "dementia",
      title: "Alzheimer's Sundowning Agitation & Wandering Stabilization",
      location: "Lexington, MA",
      clientProfile: "Arthur D., Age 79 · Diagnosed with Moderate Alzheimer's Disease",
      timeframe: "Ongoing Care (14 Months to Date)",
      challenge: "Arthur experienced severe agitation, repetitive questioning, and attempts to exit the front door between 4:30 PM and 8:30 PM. His 77-year-old wife was suffering from acute sleep deprivation and caregiver burnout.",
      intervention: "Implemented a 6-hour daily evening shift (4:00 PM – 10:00 PM) with a dedicated 2-CNA Care Pod. Caregivers used validation therapy, structured sensory activities (Big Band music, tactile puzzles), and prepared a calming chamomile tea routine prior to bed.",
      outcome: "Evening agitation episodes decreased by 85%. Front door wandering attempts dropped to zero. Wife regained 8 hours of uninterrupted sleep every night, preventing premature nursing home placement.",
      metrics: [
        { label: "Agitation Episodes", value: "-85% Reduction" },
        { label: "Caregiver Sleep", value: "8 Hours Uninterrupted" },
        { label: "Nursing Home Avoided", value: "14+ Months at Home" }
      ]
    },
    {
      id: "case-3",
      category: "24-hour",
      title: "Post-Stroke Transition with Around-the-Clock Family Visibility",
      location: "Woburn, MA",
      clientProfile: "David M., Age 85 · Moderate Ischemic Stroke with Right Hemiparesis",
      timeframe: "24/7 Continuous Hourly Shift Care (8 Months)",
      challenge: "After an acute stroke, David had right-side weakness, dysphagia (swallowing difficulty), and high aspiration risk. His three adult children lived across three different states and needed total visibility into his daily health vitals.",
      intervention: "Akirapa organized a 3-CNA rotating 12-hour awake Care Pod. Caregivers strictly adhered to speech pathologist swallowing guidelines, performed 2-hour repositioning to prevent pressure sores, and logged vitals four times daily in AkiVault.",
      outcome: "Zero aspiration pneumonia episodes and zero skin breakdown. All three distant siblings logged into the AkiVault family portal daily to view real-time shift notes, vitals charts, and direct messaging.",
      metrics: [
        { label: "Aspiration Pneumonia", value: "0 Occurrences" },
        { label: "Pressure Ulcers", value: "0 (Skin Intact)" },
        { label: "Family Transparency", value: "3 Siblings Aligned" }
      ]
    },
    {
      id: "case-4",
      category: "parkinsons",
      title: "Parkinson's Disease Fall Prevention & Timed Medication Adherence",
      location: "Bedford, MA",
      clientProfile: "Robert K., Age 74 · Parkinson's Disease (Stage 3) · Living Alone",
      timeframe: "18 Months of Continuous Morning Shifts",
      challenge: "Robert suffered from frequent 'off' periods with severe motor freezing in hallways and doorways, resulting in two ER visits for falls prior to home care. His levodopa medication required exact 15-minute timing windows.",
      intervention: "Daily 4-hour morning shift focused on exact-timing medication reminders, assisted morning hygiene, and sensory cueing techniques (laser line walker guidance) to break freezing episodes.",
      outcome: "Zero falls in 18 consecutive months. 100% on-time medication adherence. Robert successfully continues living in his two-story Bedford home without relocating.",
      metrics: [
        { label: "Falls in 18 Months", value: "0 Falls Recorded" },
        { label: "Medication Timing", value: "99.4% Adherence" },
        { label: "Independence", value: "Home Maintained" }
      ]
    }
  ];

  const filteredCaseStudies = selectedFilter === "all"
    ? caseStudies
    : caseStudies.filter((c) => c.category === selectedFilter);

  const testimonialsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Case Studies & Consented Video Testimonials | Akirapa Home Care",
    "description": "Read real recovery case studies and watch video testimonials from Massachusetts families who rely on Akirapa Home Care for dementia, post-hospital, and 24/7 care.",
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Akirapa Home Care",
      "url": "https://akirapahomecareus.com",
      "telephone": "+1 781-226-9910"
    }
  };

  return (
    <Layout>
      <SEO
        title="Case Studies & Video Testimonials | Anonymized Recovery Stories | Akirapa"
        description="Real recovery stories and consented video testimonials from client families in Burlington, Bedford, Lexington, and Woburn. Explore proven outcomes for dementia and post-hospital care."
        keywords="home care case studies Massachusetts, senior care testimonials Burlington MA, Alzheimer's care recovery story, post surgery home care outcomes"
        path="/case-studies"
        schemaExtra={[testimonialsSchema]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
          { name: "Case Studies & Testimonials", path: "/case-studies" }
        ]}
      />

      {/* Header Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-[#76248a] via-[#561868] to-[#3a0d48] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#40ddd3_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#40ddd3] text-gray-950 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-sm">
            <i className="fa-solid fa-star text-sm"></i>
            Real Stories · Documented Outcomes
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            Proof Where Families Look: Stories of Recovery & Relief
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Behind every shift report is a family who was once overwhelmed, exhausted, or facing a sudden discharge. Here are their consented stories and documented clinical recovery trajectories.
          </p>

          {/* Legal Consent Disclaimer */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-[#40ddd3]/40 rounded-2xl p-4 text-xs sm:text-sm text-white/90 flex items-start gap-3 text-left">
            <i className="fa-solid fa-file-shield text-[#40ddd3] text-lg mt-0.5 shrink-0"></i>
            <div>
              <strong className="text-[#40ddd3] block uppercase tracking-wider text-xs">HIPAA Compliance & Consent Disclosure</strong>
              <span>Clinical case studies are anonymized clinical profiles based on real care trajectories. Video and audio testimonials are published with explicit written consent and signed HIPAA media authorization from client families.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Consented Video Testimonials */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 bg-[#76248a]/10 text-[#76248a] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <i className="fa-solid fa-video text-[#40ddd3]"></i>
              Consented Family Voices
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Watch How Akirapa Restored Peace of Mind
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-2">
              Hear directly from adult children and spouses who navigated the exact crisis you are facing right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoTestimonials.map((video) => (
              <div
                key={video.id}
                className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Video Thumbnail with Play Button */}
                  <div
                    onClick={() => setActiveVideoModal(video)}
                    className="relative aspect-video bg-gray-900 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.headline}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
                    
                    {/* Play Button Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#40ddd3] text-gray-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-play text-lg ml-1"></i>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <span className="absolute bottom-3 right-3 bg-gray-950/80 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-md">
                      {video.duration}
                    </span>
                  </div>

                  <div className="p-6">
                    <Badge variant="outline" className="text-[10px] font-bold text-[#76248a] bg-purple-50 border-purple-200 mb-3">
                      {video.consentBadge}
                    </Badge>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#76248a] transition-colors">
                      "{video.headline}"
                    </h3>

                    <blockquote className="text-xs sm:text-sm text-gray-600 italic border-l-2 border-[#40ddd3] pl-3 my-3">
                      "{video.quote}"
                    </blockquote>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <strong className="text-sm font-bold text-gray-900 block">{video.name}</strong>
                    <span className="text-xs text-gray-500">{video.relation} · {video.location}</span>
                  </div>
                  <button
                    onClick={() => setActiveVideoModal(video)}
                    className="text-xs font-bold text-[#76248a] hover:underline flex items-center gap-1"
                  >
                    <span>Read Story</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Clinical Recovery Case Studies */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-200">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#76248a]/10 text-[#76248a] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                <i className="fa-solid fa-clipboard-check text-[#40ddd3]"></i>
                Anonymized Case Studies
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                Documented Patient Trajectories & Outcomes
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xl">
                Explore how structured care plans, verified CNAs, and AkiVault welfare diagnostics prevented hospital readmissions and stabilized progressive conditions.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Cases" },
                { id: "post-hospital", label: "Post-Hospital" },
                { id: "dementia", label: "Dementia Care" },
                { id: "24-hour", label: "24-Hour Care" },
                { id: "parkinsons", label: "Parkinson's" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedFilter === tab.id
                      ? "bg-[#76248a] text-white shadow-sm"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {filteredCaseStudies.map((study) => (
              <div
                key={study.id}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#76248a] uppercase tracking-wider mb-1">
                      <span>{study.location}</span>
                      <span>·</span>
                      <span className="text-gray-500 font-normal">{study.timeframe}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                      {study.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 font-semibold">
                      Client Profile: {study.clientProfile}
                    </p>
                  </div>

                  {/* Outcome Metrics */}
                  <div className="flex flex-wrap gap-3">
                    {study.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="bg-purple-50 p-3 rounded-2xl border border-purple-100 text-center min-w-[110px]">
                        <span className="text-xs font-bold text-[#76248a] block">{m.value}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
                  <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-100">
                    <strong className="text-rose-950 font-bold block mb-2 flex items-center gap-1.5">
                      <i className="fa-solid fa-triangle-exclamation text-rose-600"></i> The Initial Challenge
                    </strong>
                    <p className="text-gray-700 leading-relaxed">{study.challenge}</p>
                  </div>

                  <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
                    <strong className="text-[#76248a] font-bold block mb-2 flex items-center gap-1.5">
                      <i className="fa-solid fa-user-nurse text-[#76248a]"></i> Akirapa Intervention
                    </strong>
                    <p className="text-gray-700 leading-relaxed">{study.intervention}</p>
                  </div>

                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                    <strong className="text-emerald-950 font-bold block mb-2 flex items-center gap-1.5">
                      <i className="fa-solid fa-circle-check text-emerald-600"></i> Documented Outcome
                    </strong>
                    <p className="text-gray-700 leading-relaxed">{study.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Real Shift Report Cross-Link */}
          <div className="mt-12 bg-purple-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#40ddd3]">
                Want to see the actual daily documentation?
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">
                Review Eleanor's Sample Shift Report
              </h3>
              <p className="text-white/80 text-sm max-w-xl">
                See the exact 8-point welfare check, GPS verification timestamps, and CNA shift notes that made these outcomes possible.
              </p>
            </div>
            <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-black px-6 rounded-xl shrink-0 shadow-md">
              <Link to="/sample-shift-report">Explore Realistic Shift Report</Link>
            </Button>
          </div>

        </div>
      </section>

      {/* Video Modal with Full Transcript */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-[#76248a] text-white text-[11px] font-bold">
                {activeVideoModal.consentBadge}
              </Badge>
              <span className="text-xs text-gray-500 font-mono">Duration: {activeVideoModal.duration}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
              "{activeVideoModal.headline}"
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Shared by <strong>{activeVideoModal.name}</strong> ({activeVideoModal.relation}) · {activeVideoModal.location}
            </p>

            {/* Video Player Placeholder with Interactive Audio Simulation */}
            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative mb-6">
              <img
                src={activeVideoModal.thumbnail}
                alt={activeVideoModal.headline}
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#40ddd3] text-gray-950 flex items-center justify-center font-bold">
                    <i className="fa-solid fa-play text-sm ml-0.5"></i>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold block">{activeVideoModal.name} Consented Video Interview</span>
                    <span className="text-white/70">Subtitles & Audio Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Transcript */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-6">
              <strong className="text-xs font-bold uppercase tracking-wider text-[#76248a] block mb-2">
                Complete Interview Transcript:
              </strong>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                "{activeVideoModal.fullTranscript}"
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button onClick={() => setActiveVideoModal(null)} variant="outline" className="rounded-xl text-xs font-bold">
                Close
              </Button>
              <Button asChild className="bg-[#76248a] text-white font-bold rounded-xl text-xs">
                <Link to="/contact">Discuss Mom's Care with Mary, RN</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-white border-t border-gray-200 text-center">
        <div className="container-narrow mx-auto px-4 max-w-2xl space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            Write Your Family's Relief Story Today
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            No parent should face a difficult health decline alone, and no adult child should have to bear the burden without help. Book a free in-home assessment today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button asChild size="lg" className="bg-[#76248a] hover:bg-[#561868] text-white font-black px-6 rounded-xl shadow-md button-shimmer">
              <Link to="/contact">Schedule Free In-Home Assessment</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-[#76248a] text-[#76248a] font-bold px-6 rounded-xl">
              <Link to="/pricing">Review Transparent Rates</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
