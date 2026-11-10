import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Standards() {
  const standardsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Caregiver Standards & Clinical Accountability | Akirapa Home Care",
    "description": "Documented standards for in-home care in Massachusetts: CNA registry verification, red-flag alert response protocols, and GPS Electronic Visit Verification (EVV).",
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Akirapa Home Care",
      "url": "https://akirapahomecareus.com",
      "telephone": "+1 781-226-9910"
    }
  };

  const verificationSteps = [
    {
      step: "01",
      title: "Massachusetts State CNA Registry Check",
      description:
        "Before any caregiver is matched with a client, their credentials are directly verified with the Massachusetts Department of Public Health (DPH) Nurse Aide Registry. We verify an active, unencumbered license with zero findings of abuse, neglect, or misappropriation.",
      tag: "100% Verified Credentials",
      icon: "fa-solid fa-id-card-clip",
    },
    {
      step: "02",
      title: "7-Year Multi-Jurisdiction CORI & Background Checks",
      description:
        "Every candidate undergoes comprehensive Massachusetts Criminal Offender Record Information (CORI) checks, multi-state criminal court searches, National Sex Offender Public Registry checks, and Social Security number trace verifications.",
      tag: "Rigorous Screening",
      icon: "fa-solid fa-shield-check",
    },
    {
      step: "03",
      title: "10-Panel Drug Screen & RMV Driving Verification",
      description:
        "We mandate pre-employment 10-panel drug screenings and Massachusetts Registry of Motor Vehicles (RMV) driving record checks. Driving caregivers carry comprehensive commercial and auto insurance.",
      tag: "Safe & Insured",
      icon: "fa-solid fa-car-on",
    },
    {
      step: "04",
      title: "Hands-On Clinical Skills Assessment by an RN",
      description:
        "We do not rely solely on paper resumes. Each CNA must demonstrate core competency in safe transfer mechanics (pivot, slide board, Hoyer lift), vitals measurement, infection control, and Alzheimer's de-escalation in front of our Registered Nurse supervisor.",
      tag: "RN-Supervised",
      icon: "fa-solid fa-stethoscope",
    },
  ];

  const redFlagTriggers = [
    {
      category: "Nutrition & Hydration",
      trigger: "Client finishes less than 25% of two consecutive meals or refuses fluids for >4 hours.",
      response: "Coordinator investigates potential dehydration, medication nausea, or sudden oral discomfort; family alerted.",
    },
    {
      category: "Cognitive Status",
      trigger: "Sudden onset of acute confusion, disorientation, or hallucinations distinct from baseline dementia.",
      response: "Immediate clinical check for underlying Urinary Tract Infection (UTI) or medication adverse reaction.",
    },
    {
      category: "Mobility & Fall Risk",
      trigger: "Any fall, slip, near-fall, or sudden unsteadiness requiring secondary caregiver support.",
      response: "Caregiver performs immediate injury assessment. Nurse Coordinator notified; physician & family alerted within 15 minutes.",
    },
    {
      category: "Skin & Wound Integrity",
      trigger: "New redness over bony prominences (sacrum, heels) or skin tear observed during hygiene care.",
      response: "Documented in AkiVault with photographic audit (with client consent); clinical positioning protocol activated.",
    },
    {
      category: "Medication Refusal",
      trigger: "Client refuses or forgets prescribed critical medication (blood thinners, cardiac, insulin).",
      response: "Logged immediately; prescribing physician's triage nurse and designated family member notified.",
    },
  ];

  return (
    <Layout>
      <SEO
        title="Our Standards | CNA Verification, Red-Flag Alerts & GPS Proof | Akirapa Home Care"
        description="Transparent, documented standards for families in Burlington and Massachusetts: How caregivers are verified as CNAs, what red-flag alerts trigger, and how GPS EVV protects your loved one."
        keywords="CNA verification Massachusetts, home care standards Burlington MA, red flag alerts elder care, GPS EVV verification, verified home health aides"
        path="/standards"
        schemaExtra={[standardsSchema]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
          { name: "Our Standards", path: "/standards" }
        ]}
      />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-[#76248a] via-[#561868] to-[#3a0d48] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#40ddd3_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#40ddd3] text-gray-950 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-sm">
            <i className="fa-solid fa-file-contract text-sm"></i>
            Documented Accountability
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            Our Standards: Only What We Can Document
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Every home care agency claims to have "compassionate caregivers." At Akirapa Home Care, we believe families in crisis deserve verifiable proof: <strong className="text-[#40ddd3]">state-verified CNA credentials</strong>, <strong className="text-[#40ddd3]">immediate red-flag emergency response</strong>, and <strong className="text-[#40ddd3]">GPS-verified shift arrival</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-black px-6 rounded-xl shadow-md button-shimmer">
              <Link to="/sample-shift-report">See a Real Shift Report</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white/60 text-white hover:bg-white hover:text-[#76248a] font-bold px-6 rounded-xl">
              <Link to="/contact">Request Credential Verification</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pillar 1: How Caregivers are Verified as CNAs */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 bg-[#76248a]/10 text-[#76248a] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <i className="fa-solid fa-user-check text-[#40ddd3]"></i>
              Pillar 1 · Clinical Vetting
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              How Caregivers Are Verified as Certified Nurse Aides (CNAs)
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
              In Massachusetts, private-duty home care agencies are not legally required to send certified CNAs for non-medical shifts—meaning many agencies send untrained companions for difficult mobility transfers. <strong className="text-gray-900">At Akirapa Home Care, all hands-on personal care is provided by verified CNAs.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {verificationSteps.map((item) => (
              <div
                key={item.step}
                className="bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200/80 hover:border-[#76248a]/30 transition-all hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-3xl font-black text-[#76248a]/30 font-mono">
                      {item.step}
                    </span>
                    <Badge variant="outline" className="border-[#76248a]/20 bg-purple-50 text-[#76248a] font-bold text-xs">
                      {item.tag}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className={`${item.icon} text-[#40ddd3]`}></i>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Vetting Guarantee Callout */}
          <div className="mt-8 bg-purple-50/70 border border-[#76248a]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-file-shield text-2xl text-[#76248a] shrink-0"></i>
              <div className="text-sm text-gray-800">
                <strong className="text-gray-900 block">Our Open File Policy:</strong>
                Families can request a redacted compliance binder verifying their caregiver's current MA CNA license number, CPR certificate, and background clearance dates before shift one.
              </div>
            </div>
            <Button asChild size="sm" variant="outline" className="border-[#76248a] text-[#76248a] font-bold shrink-0">
              <Link to="/contact">Ask About Caregiver Credentials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pillar 2: What a Red-Flag Alert Triggers & Who Responds */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-200">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <i className="fa-solid fa-bell text-rose-600"></i>
              Pillar 2 · Emergency & Risk Escalation
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              What a Red-Flag Alert Triggers & Exactly Who Responds
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
              When an aging parent's health changes, hours matter. If a caregiver notices a subtle red flag during the mandatory 8-point welfare check, AkiVault does not wait for a weekly office review—it executes an automated clinical triage escalation.
            </p>
          </div>

          {/* Flowchart / Response Timeline */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm mb-12">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-timeline text-[#76248a]"></i>
              The 60-Second Red-Flag Response Timeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 relative">
                <div className="w-8 h-8 rounded-full bg-[#76248a] text-white flex items-center justify-center font-bold text-xs mb-3">
                  1
                </div>
                <strong className="text-gray-900 block text-sm mb-1">Caregiver Observes & Logs</strong>
                <p className="text-xs text-gray-600">
                  Caregiver logs a concerning metric (e.g. appetite &lt;25%, dizziness, or elevated temp) into the AkiVault app.
                </p>
                <span className="text-[11px] font-mono font-bold text-[#76248a] block mt-3">Time: 00:00</span>
              </div>

              <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 relative">
                <div className="w-8 h-8 rounded-full bg-[#76248a] text-white flex items-center justify-center font-bold text-xs mb-3">
                  2
                </div>
                <strong className="text-gray-900 block text-sm mb-1">Instant Automated Escalation</strong>
                <p className="text-xs text-gray-600">
                  AkiVault triggers high-priority SMS and push notifications simultaneously to the on-call Nurse Supervisor and designated family contact.
                </p>
                <span className="text-[11px] font-mono font-bold text-[#76248a] block mt-3">Time: +00:30s</span>
              </div>

              <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 relative">
                <div className="w-8 h-8 rounded-full bg-[#76248a] text-white flex items-center justify-center font-bold text-xs mb-3">
                  3
                </div>
                <strong className="text-gray-900 block text-sm mb-1">Clinical Triage Call</strong>
                <p className="text-xs text-gray-600">
                  Our On-Call Clinical Coordinator calls the caregiver directly to evaluate symptoms, check vitals, and determine next steps.
                </p>
                <span className="text-[11px] font-mono font-bold text-[#76248a] block mt-3">Time: &lt; 5 Minutes</span>
              </div>

              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 relative">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                  4
                </div>
                <strong className="text-gray-900 block text-sm mb-1">Action & Audit Trail</strong>
                <p className="text-xs text-gray-600">
                  Physician consulted, mobile triage dispatched, or family debriefed. Full resolution logged into Eleanor's immutable permanent chart.
                </p>
                <span className="text-[11px] font-mono font-bold text-emerald-700 block mt-3">Logged & Resolved</span>
              </div>
            </div>
          </div>

          {/* Trigger Criteria Table */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="p-6 bg-gray-50/80 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">
                Documented Red-Flag Alert Triggers
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                These objective clinical thresholds are hard-coded into our caregiver shift reporting software.
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {redFlagTriggers.map((item, idx) => (
                <div key={idx} className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="md:w-1/4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#76248a] block">
                      {item.category}
                    </span>
                  </div>
                  <div className="md:w-1/2">
                    <strong className="text-sm sm:text-base text-gray-900 font-semibold block">
                      {item.trigger}
                    </strong>
                  </div>
                  <div className="md:w-1/3 bg-gray-50 p-3 rounded-xl text-xs text-gray-700 border border-gray-100">
                    <strong className="text-gray-900 block mb-0.5">Clinical Response:</strong>
                    {item.response}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Pillar 3: What GPS Verification Does (and Does NOT Do) */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-200">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <i className="fa-solid fa-location-crosshairs text-emerald-600"></i>
              Pillar 3 · Punctuality & Privacy
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              What GPS Verification Does (and What It Does NOT Do)
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
              Families deserve 100% certainty that their caregiver arrived on time and stayed the full duration. Caregivers deserve respect and personal privacy. Here is the honest truth about our Electronic Visit Verification (EVV) system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What GPS DOES */}
            <div className="bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h3 className="text-xl font-black text-emerald-950">What GPS Verification DOES</h3>
                  <span className="text-xs text-emerald-700 font-bold">21st Century Cures Act Compliant</span>
                </div>
              </div>

              <ul className="space-y-4 text-sm sm:text-base text-gray-800">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-emerald-600 mt-1 shrink-0"></i>
                  <span><strong>Pinpoints arrival within 50 feet:</strong> Caregivers cannot clock in while driving, in traffic, or from a parking lot blocks away.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-emerald-600 mt-1 shrink-0"></i>
                  <span><strong>Guarantees full shift attendance:</strong> Proves exact departure timestamp so you are never billed for time a caregiver wasn't present.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-emerald-600 mt-1 shrink-0"></i>
                  <span><strong>Audit-ready for long-term care insurance:</strong> Insurers require verified EVV data before approving claims. We provide this automatically.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-emerald-600 mt-1 shrink-0"></i>
                  <span><strong>Early warning if late:</strong> If a caregiver is not geofence-verified within 10 minutes of scheduled start, our coordinator is automatically alerted to dispatch backup.</span>
                </li>
              </ul>
            </div>

            {/* What GPS DOES NOT DO */}
            <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gray-400 text-white flex items-center justify-center text-lg">
                  <i className="fa-solid fa-ban"></i>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">What GPS Verification Does NOT Do</h3>
                  <span className="text-xs text-gray-500 font-bold">Privacy & Dignity Safeguards</span>
                </div>
              </div>

              <ul className="space-y-4 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-xmark text-rose-500 mt-1 shrink-0"></i>
                  <span><strong>No continuous tracking:</strong> Location coordinates are recorded ONLY at the single instant of clock-in and clock-out.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-xmark text-rose-500 mt-1 shrink-0"></i>
                  <span><strong>No off-shift monitoring:</strong> Once clocked out, the AkiVault app shuts down location services completely.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-xmark text-rose-500 mt-1 shrink-0"></i>
                  <span><strong>No intrusive indoor cameras:</strong> We verify physical presence via mobile device geofencing, never through intrusive home surveillance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-xmark text-rose-500 mt-1 shrink-0"></i>
                  <span><strong>No selling of data:</strong> All client and caregiver location records are encrypted under strict HIPAA compliance rules.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Summary CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
            Demand Documented Proof for Your Loved One
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            Don't settle for unverified verbal promises. Let us show you how our certified CNAs, AkiVault shift reports, and transparent pricing deliver total peace of mind.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-[#76248a] hover:bg-[#561868] text-white font-black px-6 rounded-xl shadow-md button-shimmer">
              <Link to="/contact">Book a Free Clinical Assessment</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-[#76248a] text-[#76248a] font-bold px-6 rounded-xl">
              <Link to="/sample-shift-report">View Sample Shift Report</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
