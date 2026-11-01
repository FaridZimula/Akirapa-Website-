import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

const TermsOfService = () => {
  const lastUpdated = "November 2, 2026";

  return (
    <Layout>
      <SEO
        title="Terms of Service & Care Agreements | Akirapa Home Care Massachusetts"
        description="Official Terms of Service and Client Agreement Conditions for Akirapa Home Care. Review our service scope, medical disclaimer, caregiver employment protections, and Massachusetts governing law."
        keywords="Akirapa Home Care terms of service, home care client agreement, Massachusetts home care terms, caregiver non-solicitation, AkiVault terms, Burlington MA senior care"
        path="/terms"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ]}
      />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-[#76248a] via-[#5c1a6d] to-[#40124b] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#40ddd3] blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#40ddd3] font-bold text-xs uppercase tracking-wider mb-6 shadow-sm">
            <i className="fa-solid fa-scale-balanced text-sm"></i>
            <span>Client Agreement Standards & Commonwealth of Massachusetts Law</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-5">
            Terms of Service & Conditions of Care
          </h1>

          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            These terms define our mutual standards of care, client responsibilities, caregiver safety, and digital use for the Akirapa Home Care website and the AkiVault™ platform.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-clock-rotate-left text-[#40ddd3]"></i>
              Effective & Last Updated: <strong>{lastUpdated}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-landmark text-[#40ddd3]"></i>
              Governed by Laws of Massachusetts
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-shield-heart text-[#40ddd3]"></i>
              Bonded & Insured W-2 Caregivers
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Quick Navigation Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-list-check text-[#76248a]"></i>
                  Table of Contents
                </h2>

                <nav className="space-y-1 text-sm font-semibold">
                  {[
                    { id: "acceptance", title: "1. Acceptance of Terms" },
                    { id: "medical-disclaimer", title: "2. Scope & Emergency Disclaimer" },
                    { id: "service-initiation", title: "3. Service Agreements & Plans" },
                    { id: "scheduling-cancellation", title: "4. Scheduling & Cancellations" },
                    { id: "akivault-terms", title: "5. AkiVault™ Verification Portal" },
                    { id: "caregiver-protection", title: "6. Caregiver W-2 & Non-Solicitation" },
                    { id: "household-environment", title: "7. Safe Home Environment" },
                    { id: "billing-payment", title: "8. Billing, Rates & Insurance" },
                    { id: "intellectual-property", title: "9. Intellectual Property Rights" },
                    { id: "liability-governing-law", title: "10. Liability & Massachusetts Law" },
                    { id: "contact-legal", title: "11. Contact & Legal Notices" },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-2 px-3 rounded-lg text-gray-700 hover:text-[#76248a] hover:bg-[#76248a]/5 transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
                  <Link
                    to="/privacy"
                    className="flex items-center justify-between text-xs font-bold text-[#76248a] hover:underline"
                  >
                    <span>Read Privacy Policy (HIPAA)</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                  <Link
                    to="/consumer-rights"
                    className="flex items-center justify-between text-xs font-bold text-[#76248a] hover:underline"
                  >
                    <span>Massachusetts Client Bill of Rights</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              {/* Assessment Hotline Card */}
              <div className="bg-[#76248a] text-white rounded-2xl p-6 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#40ddd3] mb-3">
                  <i className="fa-solid fa-file-signature text-lg"></i>
                </div>
                <h3 className="font-extrabold text-base mb-1">Contract-Free Care Inquiries</h3>
                <p className="text-white/80 text-xs mb-4 leading-relaxed">
                  Requesting a quote or initial in-home assessment incurs zero obligation or cost. Speak with our care manager today.
                </p>
                <Link
                  to="/contact"
                  className="block w-full py-2.5 px-4 bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-black text-xs text-center rounded-xl transition-all"
                >
                  Schedule Free Assessment
                </Link>
              </div>
            </aside>

            {/* Right Document Content */}
            <main className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-gray-200 text-gray-800 space-y-12">
              
              {/* Emergency Alert Callout */}
              <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-2xl">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-triangle-exclamation text-red-600 text-lg mt-0.5"></i>
                  <div className="text-xs sm:text-sm leading-relaxed text-red-950">
                    <strong className="block font-bold text-red-700 mb-1">
                      CRITICAL MEDICAL EMERGENCY NOTICE: CALL 911 IMMEDIATELY
                    </strong>
                    Akirapa Home Care provides licensed non-medical and supportive personal in-home care services. 
                    <strong> We do NOT provide emergency medical responder or paramedic services.</strong> If a client suffers a medical emergency (such as sudden chest pain, stroke symptoms, loss of consciousness, or severe injury), 
                    <strong> call 911 immediately</strong>. Do not rely on website messages, chat forms, or scheduled shifts for urgent clinical care.
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <section id="acceptance" className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">01</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Acceptance of Terms
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Client&quot;, &quot;Family Representative&quot;, or &quot;User&quot;) and <strong>Akirapa Home Care Inc.</strong> (&quot;Akirapa&quot;, &quot;we&quot;, &quot;us&quot;), regarding your access to and use of our website (<a href="https://akirapahomecareus.com" className="text-[#76248a] font-semibold underline">akirapahomecareus.com</a>), our interactive quote calculators, online assessment forms, caregiver application portals, and our proprietary <strong>AkiVault™</strong> care coordination platform.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  By accessing the website, submitting an inquiry, or executing a formal Client Service Agreement, you acknowledge that you have read, understood, and agree to be bound by these Terms and our companion <Link to="/privacy" className="text-[#76248a] font-semibold underline">Privacy Policy</Link>.
                </p>
              </section>

              {/* Section 2 */}
              <section id="medical-disclaimer" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">02</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Scope of Services & Medical Disclaimer
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Akirapa Home Care delivers supportive, non-medical in-home care services designed to assist seniors and individuals with Activities of Daily Living (ADLs) and Instrumental Activities of Daily Living (IADLs). Our primary service categories include:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2">
                    <i className="fa-solid fa-hands-holding-child text-[#76248a]"></i>
                    <span>Personal Care & Bathing / Dressing ADLs</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2">
                    <i className="fa-solid fa-brain text-[#76248a]"></i>
                    <span>Alzheimer&apos;s & Certified Memory Care</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2">
                    <i className="fa-solid fa-clock text-[#76248a]"></i>
                    <span>24/7 Daily & Dedicated Live-In Care</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2">
                    <i className="fa-solid fa-hospital-user text-[#76248a]"></i>
                    <span>Post-Hospitalization Discharge Recovery</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2">
                    <i className="fa-solid fa-mug-hot text-[#76248a]"></i>
                    <span>Companion Care & Homemaking Assistance</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2">
                    <i className="fa-solid fa-user-nurse text-[#76248a]"></i>
                    <span>Registered Nurse (RN) Supervisory Oversight</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-3 text-xs sm:text-sm text-amber-950 space-y-2">
                  <strong className="block font-bold">Informational Website Disclaimer:</strong>
                  <p>
                    All content, articles, rate estimators, and health guides published on this website are for educational and informational purposes only. They do not constitute formal medical diagnosis, clinical treatment plans, or the establishment of a physician-patient relationship. Always consult a qualified medical provider regarding underlying medical diagnoses or acute symptoms.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section id="service-initiation" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">03</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Service Initiation, Assessment & Individualized Care Plans
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Submission of an inquiry or quote request through this website does not obligate Akirapa to provide services until the following mandatory steps are completed:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-sm sm:text-base text-gray-600">
                  <li><strong>Free In-Home Assessment:</strong> An in-person or clinical consultation conducted by our care management team to evaluate client mobility, environment, cognitive requirements, and schedule.</li>
                  <li><strong>Individualized Plan of Care:</strong> Development of a customized care document outlining specific daily tasks, emergency contacts, caregiver qualifications, and schedule.</li>
                  <li><strong>Executed Client Service Agreement:</strong> A formal, written contract signed by the client or legally authorized health care proxy specifying rates, hours, and payment terms.</li>
                </ol>
              </section>

              {/* Section 4 */}
              <section id="scheduling-cancellation" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">04</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Scheduling, Shift Minimums & Cancellation Policy
                  </h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-600">
                  <p>
                    To ensure the recruitment and retention of high-caliber certified CNAs and HHAs, the following operational standards apply:
                  </p>
                  <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm">
                    <li><strong>Hourly Shift Minimum:</strong> Standard hourly visits require a minimum of four (4) consecutive hours per scheduled shift.</li>
                    <li><strong>24/7 Live-In Care:</strong> Live-in arrangements require the provision of a private, furnished sleeping room, access to a bathroom, and reasonable opportunities for uninterrupted sleep and meals.</li>
                    <li><strong>Shift Cancellation Notice:</strong> Clients must provide a minimum of <strong>twenty-four (24) hours advance notice</strong> to our Burlington office to cancel or reschedule a scheduled shift without charge.</li>
                    <li><strong>Emergency Hospitalization Exception:</strong> In the event of an unplanned acute emergency hospitalization, cancellation fees are waived upon prompt notification to our care coordinator.</li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="akivault-terms" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">05</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    AkiVault™ Verification Engine & Family Portal Terms
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our proprietary AkiVault™ Electronic Visit Verification (EVV) platform is provided for authorized clients and family members to verify shift arrivals, review welfare questionnaires, and view real-time care notes.
                </p>
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs sm:text-sm text-teal-950 space-y-2">
                  <strong className="block font-bold">Portal Use Guidelines:</strong>
                  <p>
                    • You agree to maintain the strict confidentiality of your AkiVault™ portal login credentials and not share them with unauthorized parties.<br />
                    • EVV GPS timestamps are generated automatically to confirm caregiver presence at the residence and safeguard client safety.<br />
                    • Any attempt to reverse engineer, scrape, bypass security controls, or disrupt AkiVault™ is strictly prohibited and subject to civil prosecution.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="caregiver-protection" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">06</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Caregiver Employment Status & Strict Non-Solicitation Policy
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Every caregiver introduced by Akirapa Home Care is a vetted, fully covered <strong>W-2 employee of Akirapa</strong> (not an independent contractor or 1099 hire). Akirapa manages comprehensive Massachusetts state and federal payroll taxes, worker&apos;s compensation insurance, general liability, and bonding.
                </p>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-xs sm:text-sm text-purple-950 space-y-3">
                  <strong className="block font-bold text-sm text-[#76248a]">
                    ★ STRICT NON-SOLICITATION / DIRECT-HIRE RESTRICTION:
                  </strong>
                  <p className="leading-relaxed">
                    Akirapa invests substantial financial resources in recruiting, fingerprinting, CORI/SORI background checks, specialized dementia training, and vetting caregivers. 
                    <strong> The Client and their family members expressly covenant and agree not to privately solicit, recruit, employ, or contract with any Akirapa caregiver directly or through a third-party agency</strong> during the term of services and for a period of <strong>twelve (12) months</strong> following the termination of care.
                  </p>
                  <p className="leading-relaxed">
                    In the event of a breach of this provision, the Client agrees to pay Akirapa a liquidated recruitment and placement fee of <strong>$5,000.00</strong> to compensate for recruitment, onboarding, and training costs incurred.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="household-environment" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">07</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Safe In-Home Working Environment & Zero-Tolerance Policy
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our caregivers are entitled to a safe, respectful, and hygienic in-home workplace. The client and household members agree to:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <li>Maintain household premises free of recognized health hazards, unsecured firearms, or aggressive unrestrained animals.</li>
                  <li>Prohibit smoking in immediate caregiver presence where reasonable accommodations apply.</li>
                  <li><strong>Zero Tolerance for Abuse:</strong> Akirapa strictly enforces zero tolerance for verbal hostility, racial epithets, sexual harassment, or physical violence directed toward our staff. We reserve the right to immediately suspend or terminate care in any unsafe scenario.</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section id="billing-payment" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">08</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Billing, Rates, Payment & Long-Term Care Insurance
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Specific hourly, daily, and live-in rates are defined in your executed Client Service Agreement. General financial terms include:
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <p>• <strong>Payment Methods:</strong> We accept major credit cards, automated ACH direct debit, cashier checks, and approved Long-Term Care Insurance (LTCI) benefits.</p>
                  <p>• <strong>Billing Cadence:</strong> Invoices are generated bi-weekly or monthly based on verified AkiVault™ EVV shift logs.</p>
                  <p>• <strong>Long-Term Care Insurance:</strong> While Akirapa assists families with LTCI claim documentation, nursing assessments, and electronic timesheet submissions, the client remains ultimately responsible for balances not reimbursed by the insurer.</p>
                  <p>• <strong>Holiday Surcharges:</strong> Shifts worked on major federal/state holidays (e.g. Thanksgiving, Christmas, New Year&apos;s Day) are billed at time-and-a-half in compliance with Massachusetts labor standards.</p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="intellectual-property" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">09</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Intellectual Property Rights
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  All trademarks, service marks, software code, graphic designs, logos, and educational materials—including <strong>Akirapa Home Care™</strong>, <strong>AkiVault™</strong>, and site architecture—are the exclusive property of Akirapa Home Care Inc. You may not copy, reproduce, distribute, or modify any materials without express written authorization.
                </p>
              </section>

              {/* Section 10 */}
              <section id="liability-governing-law" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">10</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Limitation of Liability & Commonwealth of Massachusetts Law
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  To the maximum extent permitted under Massachusetts law:
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <p>
                    Akirapa shall not be liable for any indirect, punitive, or consequential damages resulting from website unavailability, power failures, natural disasters, or third-party telecommunications delays.
                  </p>
                  <p>
                    <strong>Governing Law:</strong> These Terms shall be construed, interpreted, and governed in accordance with the substantive laws of the <strong>Commonwealth of Massachusetts</strong>, without giving effect to conflicts of laws principles.
                  </p>
                  <p>
                    <strong>Dispute Resolution & Jurisdiction:</strong> Any dispute arising from these Terms or the provision of care shall first be submitted to good-faith mediation. Any remaining legal action shall be filed exclusively in the state or federal courts located in <strong>Middlesex County, Massachusetts</strong>.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section id="contact-legal" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">11</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Legal Department Contact Information
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  If you have questions regarding these Terms of Service or our Client Agreement policies, please contact our administrative headquarters:
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-3 text-sm">
                  <h3 className="font-extrabold text-[#76248a] text-base">Akirapa Home Care Inc. — Legal & Client Relations</h3>
                  <div className="space-y-1.5 text-gray-700">
                    <p><i className="fa-solid fa-location-dot text-[#76248a] w-5"></i> <strong>Headquarters:</strong> 281 Cambridge Street, Burlington, MA 01803</p>
                    <p><i className="fa-solid fa-phone text-[#76248a] w-5"></i> <strong>24/7 Telephone:</strong> <a href="tel:+17812269910" className="text-[#76248a] font-bold hover:underline">+1 781-226-9910</a></p>
                    <p><i className="fa-solid fa-envelope text-[#76248a] w-5"></i> <strong>Email:</strong> <a href="mailto:info@akirapahomecareus.com" className="text-[#76248a] font-bold hover:underline">info@akirapahomecareus.com</a></p>
                  </div>
                </div>
              </section>

              {/* Bottom Navigation Links */}
              <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
                <Link
                  to="/"
                  className="text-gray-500 hover:text-gray-900 flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  <span>Back to Homepage</span>
                </Link>

                <div className="flex items-center gap-4">
                  <Link
                    to="/privacy"
                    className="text-[#76248a] hover:text-[#561868] underline"
                  >
                    Privacy Policy & HIPAA Notice →
                  </Link>
                  <Link
                    to="/consumer-rights"
                    className="text-[#76248a] hover:text-[#561868] underline"
                  >
                    Consumer Rights →
                  </Link>
                </div>
              </div>

            </main>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
