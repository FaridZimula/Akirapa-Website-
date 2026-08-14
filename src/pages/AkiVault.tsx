import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const comparisonData = [
  {
    feature: "Clock-In & Attendance",
    traditional: "Paper time logs, manual signatures, zero proof of arrival",
    akirapa: "GPS Geofenced EVV with live distance offset verification & audit logs",
    advantage: "100% Punctuality Guarantee",
  },
  {
    feature: "Client Health & Welfare Tracking",
    traditional: "Basic verbal updates or weekly paper notes",
    akirapa: "Mandatory 8-Point Shift Welfare Checks (appetite, meds, mood, fatigue, mobility, pain)",
    advantage: "Early Risk & Fall Detection",
  },
  {
    feature: "Emergency Incident & Alerting",
    traditional: "Delayed phone calls hours or days after an incident",
    akirapa: "Instant automated Red-Flag Alerts sent immediately to Coordinators & Family",
    advantage: "Immediate Emergency Response",
  },
  {
    feature: "Caregiver Continuity & Familiarity",
    traditional: "Random unvetted strangers sent on short notice",
    akirapa: "Dedicated Care Pods (Primary + 2 Secondary Caregivers) matching client preferences",
    advantage: "98% Caregiver Retention & Trust",
  },
  {
    feature: "Family Visibility & Peace of Mind",
    traditional: "No access to care details unless calling during office hours",
    akirapa: "24/7 HIPAA-Compliant Live Family Portal with shift logs, notes, and direct messaging",
    advantage: "Real-Time Family Transparency",
  },
  {
    feature: "End-of-Shift Accountability",
    traditional: "Caregivers leave without structured shift debriefs",
    akirapa: "Mandatory Clock-Out Questionnaires & overtime tracking safeguards",
    advantage: "Zero Missed Care Steps",
  },
];

const technologyPillars = [
  {
    icon: "fa-location-dot",
    title: "GPS-Verified EVV & Geofencing",
    description:
      "Automated Electronic Visit Verification confirms caregivers are physically on site before clocking in, preventing shift fraud and ensuring punctuality.",
    badge: "Verification Engine",
  },
  {
    icon: "fa-clipboard-check",
    title: "8-Point Welfare Diagnostics",
    description:
      "Standardized end-of-shift questions track appetite drops, medication compliance, mood shifts, fall risks, and pain levels in real time.",
    badge: "Clinical Intelligence",
  },
  {
    icon: "fa-user-group",
    title: "Smart Care Pod Allocation",
    description:
      "Algorithmically assigns primary and backup caregivers to form consistent Care Pods, ensuring clients never receive a stranger at their door.",
    badge: "Care Continuity",
  },
  {
    icon: "fa-triangle-exclamation",
    title: "Instant Red-Flag Safeguards",
    description:
      "Any concerning welfare check response instantly triggers high-priority alerts to Care Coordinators and family members.",
    badge: "Real-Time Protection",
  },
  {
    icon: "fa-shield-halved",
    title: "HIPAA Family Portal & Messaging",
    description:
      "Encrypted messaging and real-time activity feeds keep family members informed of shift completions, vitals, and caregiver updates.",
    badge: "Family Transparency",
  },
  {
    icon: "fa-file-shield",
    title: "Immutable Compliance & Audits",
    description:
      "Complete timestamped audit logging tracks every shift modification, location override, and coordinator review for total compliance.",
    badge: "Regulatory Standard",
  },
];

export default function AkiVault() {
  const [activeRoleTab, setActiveRoleTab] = useState<"family" | "caregiver" | "coordinator">("family");

  return (
    <Layout>
      <SEO
        title="AkiVault Technology Platform | Why Akirapa Leads In-Home Care"
        description="Explore AkiVault, the proprietary technology engine behind Akirapa Home Care. Discover GPS EVV, 8-point welfare checks, Care Pod scheduling, and real-time family portals."
      />

      {/* Hero Header matching main site aesthetic */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-[#76248a] via-[#561868] to-[#3a0d48] text-white overflow-hidden">
        {/* Glowing Decorative Backdrop Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#40ddd3]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#76248a]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[#40ddd3] border border-[#40ddd3]/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-6">
            <i className="fa-solid fa-vault text-base text-[#40ddd3]"></i>
            <span>Proprietary Care Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Inside <span className="text-[#40ddd3]">AkiVault</span>: Why Akirapa Redefines Senior In-Home Care
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 font-medium max-w-3xl mx-auto leading-relaxed mb-8">
            Traditional caregiving relies on paper logs and guesswork. Akirapa’s proprietary system combines <span className="text-[#40ddd3] font-bold">GPS Geofencing</span>, <span className="text-[#40ddd3] font-bold">Automated 8-Point Welfare Checks</span>, and <span className="text-[#40ddd3] font-bold">Dedicated Care Pods</span> to guarantee safety and total transparency.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-[#561868] font-extrabold text-base h-14 px-8 rounded-2xl shadow-lg border-none">
              <Link to="/contact">Experience Akirapa Care</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 border-white/30 text-white font-bold text-base h-14 px-8 rounded-2xl backdrop-blur-sm">
              <a href="#comparison">Compare vs Traditional Care</a>
            </Button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/15 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-black text-[#40ddd3]">100%</div>
              <div className="text-xs text-gray-300 font-semibold uppercase mt-1">GPS Verified Shifts</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-black text-[#40ddd3]">8 Points</div>
              <div className="text-xs text-gray-300 font-semibold uppercase mt-1">Welfare Check Each Shift</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-black text-[#40ddd3]">Instant</div>
              <div className="text-xs text-gray-300 font-semibold uppercase mt-1">Red-Flag Alerts</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-black text-[#40ddd3]">24/7</div>
              <div className="text-xs text-gray-300 font-semibold uppercase mt-1">Family Portal Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Side-by-Side Comparison Matrix Section */}
      <section id="comparison" className="py-16 md:py-24 bg-gray-50 border-b border-gray-100">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-[#76248a] font-extrabold text-sm uppercase tracking-wider bg-[#76248a]/10 px-3 py-1 rounded-full">
              Head-to-Head Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Why Akirapa Outperforms Traditional Caregiving Companies
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              See how our digital care infrastructure eliminates the uncertainties and risks of legacy home care agencies.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-200/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#76248a] text-white">
                    <th className="p-5 text-base font-bold w-1/4">Key Capability</th>
                    <th className="p-5 text-base font-bold w-1/3 bg-gray-900/30">Traditional Care Agencies</th>
                    <th className="p-5 text-base font-bold w-1/3 bg-[#40ddd3] text-gray-950">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-shield-halved text-gray-950 text-lg"></i>
                        <span>Akirapa Home Care System</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonData.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="p-5 font-bold text-gray-900 text-sm sm:text-base">
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-angle-right text-[#76248a]"></i>
                          <span>{item.feature}</span>
                        </div>
                        <span className="inline-block mt-1 text-[11px] font-bold text-[#76248a] bg-[#76248a]/10 px-2 py-0.5 rounded">
                          {item.advantage}
                        </span>
                      </td>
                      <td className="p-5 text-sm text-gray-600 bg-red-50/30">
                        <div className="flex items-start gap-2">
                          <i className="fa-solid fa-xmark text-red-500 mt-1 shrink-0"></i>
                          <span>{item.traditional}</span>
                        </div>
                      </td>
                      <td className="p-5 text-sm font-semibold text-gray-900 bg-[#40ddd3]/10 border-l-2 border-[#40ddd3]">
                        <div className="flex items-start gap-2">
                          <i className="fa-solid fa-circle-check text-[#218981] mt-1 shrink-0"></i>
                          <span>{item.akirapa}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Technology Pillars Grid */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#76248a] font-extrabold text-sm uppercase tracking-wider bg-[#76248a]/10 px-3 py-1 rounded-full">
              System Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              The 6 Technological Pillars of AkiVault
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Built ground-up with HIPAA-grade security, real-time telemetry, and clinical accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologyPillars.map((pillar, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#76248a] text-white flex items-center justify-center mb-6 shadow-md group-hover:bg-[#40ddd3] group-hover:text-gray-950 transition-colors">
                  <i className={`fa-solid ${pillar.icon} text-2xl`}></i>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#76248a] bg-[#76248a]/10 px-2.5 py-1 rounded-full">
                  {pillar.badge}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{pillar.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Interactive Experience Switcher */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-[#76248a] font-extrabold text-sm uppercase tracking-wider bg-[#76248a]/10 px-3 py-1 rounded-full">
              Tailored Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Designed for Everyone in the Care Ecosystem
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Switch roles to explore how AkiVault empowers families, caregivers, and care coordinators alike.
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveRoleTab("family")}
              className={`px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 ${
                activeRoleTab === "family"
                  ? "bg-[#76248a] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <i className="fa-solid fa-house-medical"></i>
              <span>For Families</span>
            </button>
            <button
              onClick={() => setActiveRoleTab("caregiver")}
              className={`px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 ${
                activeRoleTab === "caregiver"
                  ? "bg-[#76248a] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <i className="fa-solid fa-user-nurse"></i>
              <span>For Caregivers</span>
            </button>
            <button
              onClick={() => setActiveRoleTab("coordinator")}
              className={`px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 ${
                activeRoleTab === "coordinator"
                  ? "bg-[#76248a] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <i className="fa-solid fa-clipboard-user"></i>
              <span>For Coordinators</span>
            </button>
          </div>

          {/* Role Content Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200/80 max-w-4xl mx-auto">
            {activeRoleTab === "family" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#40ddd3]/20 text-[#218981] flex items-center justify-center font-bold text-xl">
                    <i className="fa-solid fa-heart"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900">Complete Peace of Mind for Families</h3>
                    <p className="text-gray-500 text-sm">Stay connected to your loved one's care from anywhere in the world.</p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-700 font-medium">
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#218981] mt-1"></i>
                    <span>Real-Time Notifications: Know the exact minute your caregiver arrives and clocks out via GPS.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#218981] mt-1"></i>
                    <span>Shift Notes & Vitals: Read caregiver daily updates, mood ratings, and meal logs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#218981] mt-1"></i>
                    <span>Red-Flag Early Warning: Get notified instantly if appetite drops, pain increases, or confusion occurs.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeRoleTab === "caregiver" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#76248a]/20 text-[#76248a] flex items-center justify-center font-bold text-xl">
                    <i className="fa-solid fa-user-nurse"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900">Streamlined Workflows for Certified Caregivers</h3>
                    <p className="text-gray-500 text-sm">Empowering caregivers with clear tasks and effortless mobile check-ins.</p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-700 font-medium">
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#76248a] mt-1"></i>
                    <span>One-Tap GPS Clock-In: Automatic location check-in without cumbersome paperwork.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#76248a] mt-1"></i>
                    <span>Structured Task Checklist: Personalized client care tasks (medication checks, meals, mobility).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#76248a] mt-1"></i>
                    <span>Guided Welfare Check: Simple 8-point check-off ensures every shift detail is safely documented.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeRoleTab === "coordinator" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#40ddd3]/20 text-gray-900 flex items-center justify-center font-bold text-xl">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900">Complete Control for Care Coordinators</h3>
                    <p className="text-gray-500 text-sm">Managing shifts, scheduling Care Pods, and resolving alerts in real time.</p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-700 font-medium">
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#218981] mt-1"></i>
                    <span>Live Shift Monitor: Instant dashboard view of confirmed, in-progress, and completed shifts.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#218981] mt-1"></i>
                    <span>Care Pod Matcher: Intelligent caregiver recommendations based on proximity, skills, and client history.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#218981] mt-1"></i>
                    <span>Audit & Compliance Logs: Full timestamped trail of overrides, distance metrics, and shift notes.</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-[#76248a] text-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready for Better, Safer In-Home Care?</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-medium">
            Contact our Burlington, MA senior care team to learn how the Akirapa Home Care System provides unparalleled peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-[#561868] font-extrabold text-base h-14 px-8 rounded-2xl shadow-xl border-none">
              <Link to="/contact">Schedule Free Consultation</Link>
            </Button>
            <a
              href="tel:3399701214"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-base h-14 px-8 rounded-2xl backdrop-blur-md border border-white/20"
            >
              <i className="fa-solid fa-phone text-[#40ddd3]"></i>
              <span>Call 24/7: (339) 970-1214</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
