import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SampleShiftReport() {
  const [simulateRedFlag, setSimulateRedFlag] = useState(false);
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");

  const shiftSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sample AkiVault Shift Report | Akirapa Home Care",
    "description": "Explore an interactive realistic dummy AkiVault shift report showing GPS EVV verification, 8-point welfare checks, caregiver notes, and automated red-flag alerts.",
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Akirapa Home Care",
      "url": "https://akirapahomecareus.com",
      "telephone": "+1 781-226-9910",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "281 Cambridge Street",
        "addressLocality": "Burlington",
        "addressRegion": "MA",
        "postalCode": "01803",
        "addressCountry": "US"
      }
    }
  };

  return (
    <Layout>
      <SEO
        title="See a Real Shift Report | Realistic Dummy AkiVault Report | Akirapa Home Care"
        description="Experience complete family transparency. View a realistic dummy AkiVault shift report featuring GPS EVV arrival verification, 8-point welfare diagnostics, and instant red-flag alerts. Never real client data."
        keywords="home care shift report, AkiVault report, caregiver shift notes, GPS EVV verification Burlington MA, elder care transparency, family care portal"
        path="/sample-shift-report"
        schemaExtra={[shiftSchema]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "AkiVault Platform", path: "/akivault" },
          { name: "Sample Shift Report", path: "/sample-shift-report" }
        ]}
      />

      {/* Header Banner */}
      <section className="relative pt-28 pb-14 md:pt-36 md:pb-20 bg-gradient-to-b from-[#76248a] via-[#561868] to-[#3a0d48] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#40ddd3_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#40ddd3] text-gray-950 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-sm">
            <i className="fa-solid fa-file-waveform text-sm"></i>
            Real-Time Family Transparency
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            See Exactly What a Real Shift Report Looks Like
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Most agencies leave families guessing what happened all day. With Akirapa's <strong className="text-[#40ddd3]">AkiVault™ System</strong>, you see verified GPS arrival times, meals, vitals, mobility, and notes delivered straight to your phone.
          </p>

          {/* Privacy Disclaimer Callout */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-[#40ddd3]/40 rounded-2xl p-4 text-xs sm:text-sm text-white/90 flex items-start gap-3 text-left">
            <i className="fa-solid fa-shield-halved text-[#40ddd3] text-lg mt-0.5 shrink-0"></i>
            <div>
              <strong className="text-[#40ddd3] block uppercase tracking-wide text-xs">HIPAA & Privacy Guarantee</strong>
              <span>This is a realistic dummy report created to demonstrate our system. We never publish real client data or protected health information. Every real report is accessible exclusively to authorized family members inside our encrypted portal.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Toolbar */}
      <section className="bg-gray-100 border-b border-gray-200 py-4 sticky top-20 z-30 shadow-xs">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>AkiVault™ Live Simulation</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 font-normal">Shift #AV-8492 · Completed Today</span>
          </div>

          <div className="flex items-center gap-3">
            {/* View switcher */}
            <div className="inline-flex rounded-xl bg-gray-200 p-1 text-xs font-bold">
              <button
                onClick={() => setActiveTab("desktop")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "desktop" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <i className="fa-solid fa-desktop mr-1.5 text-xs"></i> Full Report View
              </button>
              <button
                onClick={() => setActiveTab("mobile")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "mobile" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <i className="fa-solid fa-mobile-screen mr-1.5 text-xs"></i> Daughter's Phone View
              </button>
            </div>

            {/* Red Flag Simulation Toggle */}
            <button
              onClick={() => setSimulateRedFlag(!simulateRedFlag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                simulateRedFlag
                  ? "bg-rose-600 text-white border-rose-700 shadow-sm animate-pulse"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <i className="fa-solid fa-triangle-exclamation text-amber-400"></i>
              <span>{simulateRedFlag ? "Simulating Red-Flag Active" : "Test Red-Flag Alert"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Shift Report Workspace */}
      <section className="py-12 bg-gray-50">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Red Flag Alert Simulation Banner if active */}
          {simulateRedFlag && (
            <div className="mb-8 bg-rose-50 border-2 border-rose-500 rounded-2xl p-5 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-bell text-lg animate-bounce"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-rose-900 text-base">AUTOMATED RED-FLAG PROTOCOL TRIGGERED</span>
                      <Badge className="bg-rose-600 text-white font-bold text-xs">Priority 1 Triage</Badge>
                    </div>
                    <p className="text-sm text-rose-800 mt-1">
                      <strong>Trigger Reason:</strong> Client finished less than 25% of lunch & mild temperature elevation (100.4°F) detected during 1:00 PM check.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs font-semibold text-rose-900">
                      <span><i className="fa-solid fa-check text-emerald-600 mr-1"></i> SMS Alert sent to Akirapa Clinical Supervisor (0.4s)</span>
                      <span><i className="fa-solid fa-check text-emerald-600 mr-1"></i> Push Notification sent to daughter Jennifer (0.6s)</span>
                      <span><i className="fa-solid fa-check text-emerald-600 mr-1"></i> Triage Nurse callback dispatched (1m 12s)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSimulateRedFlag(false)}
                  className="text-xs font-bold text-rose-700 bg-white hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-300 shrink-0"
                >
                  Reset Simulation
                </button>
              </div>
            </div>
          )}

          {activeTab === "desktop" ? (
            /* ================= FULL REPORT VIEW ================= */
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              
              {/* Report Header Card */}
              <div className="bg-gradient-to-r from-[#76248a] to-[#561868] text-white p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/15 pb-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#40ddd3] uppercase tracking-wider mb-1">
                      <i className="fa-solid fa-vault"></i> AkiVault™ Official Daily Shift Debrief
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black">
                      Shift Summary: Eleanor V. (Age 82)
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                      Care Location: Cambridge Street Residence, Burlington, MA 01803
                    </p>
                  </div>

                  {/* Shift Status Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <i className="fa-solid fa-circle-check text-xs"></i>
                      Shift Completed & Approved
                    </span>
                    <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-bold">
                      Care Pod: Burlington Team #2
                    </span>
                  </div>
                </div>

                {/* Key Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs sm:text-sm">
                  <div>
                    <span className="text-white/60 block text-[11px] uppercase tracking-wider">Assigned Caregiver</span>
                    <strong className="text-white font-bold flex items-center gap-1.5 mt-0.5">
                      <i className="fa-solid fa-user-nurse text-[#40ddd3]"></i>
                      Sarah Jenkins, CNA
                    </strong>
                    <span className="text-[#40ddd3] text-[11px] block">MA CNA #84920 · BLS Verified</span>
                  </div>

                  <div>
                    <span className="text-white/60 block text-[11px] uppercase tracking-wider">Scheduled Shift</span>
                    <strong className="text-white font-bold block mt-0.5">
                      8:00 AM – 4:00 PM EDT
                    </strong>
                    <span className="text-white/70 text-[11px]">8.0 Billable Hours</span>
                  </div>

                  <div>
                    <span className="text-white/60 block text-[11px] uppercase tracking-wider">Primary Condition</span>
                    <strong className="text-white font-bold block mt-0.5">
                      Post-Hip Surgery + Mild MCI
                    </strong>
                    <span className="text-white/70 text-[11px]">Fall Prevention Protocol</span>
                  </div>

                  <div>
                    <span className="text-white/60 block text-[11px] uppercase tracking-wider">Clinical Supervisor</span>
                    <strong className="text-white font-bold block mt-0.5">
                      Mary O'Connor, RN
                    </strong>
                    <span className="text-[#40ddd3] text-[11px]">Signed Off at 4:12 PM</span>
                  </div>
                </div>
              </div>

              {/* GPS Geofenced EVV Arrival Verification Bar */}
              <div className="bg-emerald-50 border-b border-emerald-100 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-location-dot text-base"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-emerald-950">GPS Electronic Visit Verification (EVV) Verified</span>
                      <Badge className="bg-emerald-600 text-white font-bold text-[10px]">100% Punctuality</Badge>
                    </div>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Caregiver arrival verified at <strong>8:02 AM</strong> (32 feet from residence · 42.5050° N, 71.1956° W). Departure verified at <strong>4:01 PM</strong> (28 feet). Compliant with Federal 21st Century Cures Act standards.
                    </p>
                  </div>
                </div>

                <div className="text-xs text-emerald-900 font-bold bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
                  <i className="fa-solid fa-lock text-emerald-600 mr-1.5"></i> Immutable GPS Hash Verified
                </div>
              </div>

              {/* 8-Point Shift Welfare Diagnostics Grid */}
              <div className="p-6 sm:p-8 space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                        <i className="fa-solid fa-clipboard-check text-[#76248a]"></i>
                        Mandatory 8-Point Shift Welfare Diagnostics
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Completed at clock-out. Every metric is evaluated and cross-checked against Eleanor's baseline care plan.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#76248a] bg-purple-50 px-2.5 py-1 rounded-lg">
                      8 of 8 Completed
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* 1. Nutrition & Hydration */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-gray-700 flex items-center gap-1.5">
                            <i className="fa-solid fa-utensils text-[#76248a]"></i> 1. Appetite & Fluids
                          </span>
                          <span className="font-extrabold text-emerald-600">Optimal</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Breakfast: Oatmeal + berries (100%). Lunch: Vegetable soup + half sandwich (85%).
                        </p>
                      </div>
                      <div className="bg-white p-2 rounded-xl text-xs font-semibold text-gray-800 border border-gray-100 flex items-center justify-between">
                        <span>Total Fluids:</span>
                        <span className="text-[#76248a] font-bold">48 oz Water + Tea</span>
                      </div>
                    </div>

                    {/* 2. Medication Adherence */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-gray-700 flex items-center gap-1.5">
                            <i className="fa-solid fa-pills text-[#76248a]"></i> 2. Medications
                          </span>
                          <span className="font-extrabold text-emerald-600">100% Taken</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Morning blister pack taken at 8:30 AM with water. Afternoon blood pressure dose confirmed at 1:00 PM.
                        </p>
                      </div>
                      <div className="bg-white p-2 rounded-xl text-xs font-semibold text-gray-800 border border-gray-100 flex items-center justify-between">
                        <span>Refusal/Missed:</span>
                        <span className="text-emerald-600 font-bold">None (0)</span>
                      </div>
                    </div>

                    {/* 3. Mobility & Physical Therapy */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-gray-700 flex items-center gap-1.5">
                            <i className="fa-solid fa-person-walking text-[#76248a]"></i> 3. Mobility & Transfer
                          </span>
                          <span className="font-extrabold text-emerald-600">Steady</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Assisted with rolling walker. Completed 2x 15-minute hall walking laps. Gait steady, zero loss of balance.
                        </p>
                      </div>
                      <div className="bg-white p-2 rounded-xl text-xs font-semibold text-gray-800 border border-gray-100 flex items-center justify-between">
                        <span>Fall Risk Check:</span>
                        <span className="text-emerald-600 font-bold">Passed / Clear</span>
                      </div>
                    </div>

                    {/* 4. Mood & Cognitive Engagement */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-gray-700 flex items-center gap-1.5">
                            <i className="fa-solid fa-brain text-[#76248a]"></i> 4. Mood & Cognition
                          </span>
                          <span className="font-extrabold text-purple-700">Engaged</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Alert and in good spirits. Enjoyed conversation about her favorite songs and solved 12 crossword clues together.
                        </p>
                      </div>
                      <div className="bg-white p-2 rounded-xl text-xs font-semibold text-gray-800 border border-gray-100 flex items-center justify-between">
                        <span>Agitation / Sundowning:</span>
                        <span className="text-emerald-600 font-bold">None Observed</span>
                      </div>
                    </div>

                    {/* 5. Pain & Comfort */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-gray-700 flex items-center gap-1.5">
                            <i className="fa-solid fa-heart-pulse text-[#76248a]"></i> 5. Pain Level
                          </span>
                          <span className="font-extrabold text-emerald-600">2 / 10 (Mild)</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Mild stiffness in left hip upon waking. Relieved within 20 minutes after warm compress and gentle leg extension.
                        </p>
                      </div>
                      <div className="bg-white p-2 rounded-xl text-xs font-semibold text-gray-800 border border-gray-100 flex items-center justify-between">
                        <span>Comfort Measures:</span>
                        <span className="text-gray-800 font-bold">Compress Applied</span>
                      </div>
                    </div>

                    {/* 6. Skin Integrity & Surgical Site */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-gray-700 flex items-center gap-1.5">
                            <i className="fa-solid fa-bandage text-[#76248a]"></i> 6. Skin & Wound Check
                          </span>
                          <span className="font-extrabold text-emerald-600">Intact</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Surgical incision on left hip inspected: clean, dry, intact. No redness, swelling, or drainage. Sacral skin clear.
                        </p>
                      </div>
                      <div className="bg-white p-2 rounded-xl text-xs font-semibold text-gray-800 border border-gray-100 flex items-center justify-between">
                        <span>Pressure Sore Risk:</span>
                        <span className="text-emerald-600 font-bold">Zero Breakdown</span>
                      </div>
                    </div>

                    {/* 7. Sleep & Fatigue */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-gray-700 flex items-center gap-1.5">
                            <i className="fa-solid fa-bed text-[#76248a]"></i> 7. Sleep & Rest
                          </span>
                          <span className="font-extrabold text-blue-600">7.5 hrs Night</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Reported restful night. Took a relaxing 35-minute post-lunch nap from 1:40 PM to 2:15 PM.
                        </p>
                      </div>
                      <div className="bg-white p-2 rounded-xl text-xs font-semibold text-gray-800 border border-gray-100 flex items-center justify-between">
                        <span>Daytime Lethargy:</span>
                        <span className="text-emerald-600 font-bold">Normal Energy</span>
                      </div>
                    </div>

                    {/* 8. Personal Care & Hygiene */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-gray-700 flex items-center gap-1.5">
                            <i className="fa-solid fa-shower text-[#76248a]"></i> 8. Personal Hygiene
                          </span>
                          <span className="font-extrabold text-emerald-600">Complete</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Assisted shower with shower chair and grab bars. Hair washed, fresh clothes selected, bed linens stripped and washed.
                        </p>
                      </div>
                      <div className="bg-white p-2 rounded-xl text-xs font-semibold text-gray-800 border border-gray-100 flex items-center justify-between">
                        <span>Laundry Completed:</span>
                        <span className="text-emerald-600 font-bold">1 Full Load</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Caregiver Narrative Shift Log */}
                <div className="bg-purple-50/50 rounded-2xl p-6 border border-[#76248a]/15">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="fa-solid fa-comment-medical text-[#76248a]"></i>
                    <h4 className="text-base font-bold text-gray-900">
                      Caregiver's Personal Shift Narrative — Written by Sarah Jenkins, CNA
                    </h4>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm text-gray-700 leading-relaxed italic">
                    "Eleanor had a wonderful, cheerful day today. When I arrived at 8:02 AM, she was already sitting up in bed with her morning radio playing. We safely transferred to the bathroom where I assisted with her shower, hair wash, and dressed in her lavender sweater which put a big smile on her face.
                    <br /><br />
                    She ate a full bowl of oatmeal with blueberries and drank a full glass of water. At 10:30 AM we did her physical therapy leg raises and walked down the hallway twice with her walker. She was very steady on her feet. In the afternoon, we sat by the sun porch and looked at pictures of her granddaughter's graduation in New York.
                    <br /><br />
                    Left dinner in the refrigerator: roasted chicken breast, steamed green beans, and mashed sweet potatoes, clearly labeled. Filled her bedside water pitcher with fresh ice water and checked all hallway nightlights. All door locks verified before departing."
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-gray-500">
                    <span>Logged in AkiVault at 3:58 PM EDT · Device: iPad Mini (AkiVault Encrypted App)</span>
                    <span className="text-[#76248a] font-bold">Family Read Receipt: Jennifer V. (Daughter) viewed at 4:06 PM</span>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* ================= DAUGHTER'S PHONE VIEW ================= */
            <div className="max-w-sm mx-auto bg-gray-900 rounded-[44px] p-3 shadow-2xl border-4 border-gray-800">
              <div className="bg-white rounded-[36px] overflow-hidden text-gray-900">
                {/* Simulated Phone Status Bar */}
                <div className="bg-[#76248a] text-white px-6 pt-3 pb-2 flex justify-between items-center text-xs">
                  <span className="font-bold">4:05 PM</span>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <i className="fa-solid fa-signal"></i>
                    <i className="fa-solid fa-wifi"></i>
                    <i className="fa-solid fa-battery-full"></i>
                  </div>
                </div>

                {/* App Header */}
                <div className="bg-[#76248a] text-white px-4 pb-4 pt-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#40ddd3] text-gray-950 flex items-center justify-center font-bold text-xs">
                      EV
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-tight">Mom (Eleanor V.)</h4>
                      <p className="text-[10px] text-white/70">Burlington, MA · Today's Shift</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5">
                    Shift Done
                  </Badge>
                </div>

                {/* Mobile Feed Body */}
                <div className="p-4 space-y-3 text-xs max-h-[560px] overflow-y-auto">
                  
                  {/* Push Alert Card */}
                  <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200">
                    <div className="flex items-center gap-2 font-bold text-[#76248a] text-xs">
                      <i className="fa-solid fa-bell text-xs"></i>
                      <span>Daily Shift Debrief Ready</span>
                    </div>
                    <p className="text-[11px] text-gray-600 mt-1">
                      Sarah Jenkins, CNA just finished Eleanor's 8:00 AM - 4:00 PM shift. All 8 welfare checks cleared.
                    </p>
                  </div>

                  {/* GPS Card */}
                  <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 flex items-center gap-3">
                    <i className="fa-solid fa-location-dot text-emerald-600 text-lg"></i>
                    <div>
                      <span className="font-bold text-emerald-950 block text-[11px]">GPS Punctuality Verified</span>
                      <span className="text-[10px] text-emerald-800">Clock-in: 8:02 AM · Clock-out: 4:01 PM (At Home)</span>
                    </div>
                  </div>

                  {/* Quick Vitals Snapshot */}
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
                    <span className="font-bold text-gray-800 block text-[11px] mb-2">Today's Welfare Snapshot</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="bg-white p-1.5 rounded-lg border border-gray-100">
                        <span className="text-gray-500 block">Appetite:</span>
                        <strong className="text-emerald-600">85% Meal Done</strong>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-gray-100">
                        <span className="text-gray-500 block">Pain Level:</span>
                        <strong className="text-gray-800">2/10 (Mild Hip)</strong>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-gray-100">
                        <span className="text-gray-500 block">Medications:</span>
                        <strong className="text-emerald-600">100% Taken</strong>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-gray-100">
                        <span className="text-gray-500 block">Mobility Walk:</span>
                        <strong className="text-[#76248a]">2 Hallway Laps</strong>
                      </div>
                    </div>
                  </div>

                  {/* Caregiver Note */}
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
                    <span className="font-bold text-gray-800 block text-[11px] mb-1">CNA Note from Sarah:</span>
                    <p className="text-[11px] text-gray-600 leading-relaxed italic">
                      "Mom was in great spirits today! We did her knee stretches and she enjoyed the afternoon sun. Dinner is prepped in the fridge and all doors are locked."
                    </p>
                  </div>

                  {/* Direct Coordinator Chat Button */}
                  <Button asChild size="sm" className="w-full bg-[#76248a] text-white font-bold text-xs h-9 rounded-xl">
                    <a href="tel:+17812269910">
                      <i className="fa-solid fa-phone mr-1.5 text-xs"></i> Call Supervisor Mary, RN
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Conversion Section */}
          <div className="mt-12 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-md text-center max-w-3xl mx-auto space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
              Imagine Having This Peace of Mind Every Single Day
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Whether you live down the street in Burlington or hundreds of miles away in another state, you should never have to wonder if Mom ate lunch or if her caregiver arrived on time.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button asChild size="lg" className="bg-[#76248a] hover:bg-[#561868] text-white font-black px-6 rounded-xl shadow-md button-shimmer">
                <Link to="/contact">Schedule Free In-Home Assessment</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-[#76248a] text-[#76248a] font-bold px-6 rounded-xl">
                <Link to="/pricing">See Transparent Pricing</Link>
              </Button>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
