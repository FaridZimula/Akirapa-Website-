import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  const lastUpdated = "November 2, 2026";

  return (
    <Layout>
      <SEO
        title="Privacy Policy & HIPAA Notice of Privacy Practices | Akirapa Home Care"
        description="Official Privacy Policy and HIPAA Notice of Privacy Practices for Akirapa Home Care. Learn how we safeguard Protected Health Information (PHI), EVV data, and client confidentiality under Massachusetts and federal laws."
        keywords="Akirapa Home Care privacy policy, HIPAA notice of privacy practices, home care PHI Massachusetts, 201 CMR 17.00, Burlington MA senior care privacy, EVV data policy"
        path="/privacy"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy & HIPAA Notice", path: "/privacy" },
        ]}
      />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-[#76248a] via-[#5c1a6d] to-[#40124b] text-white overflow-hidden">
        {/* Subtle background decorative shapes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#40ddd3] blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#40ddd3] font-bold text-xs uppercase tracking-wider mb-6 shadow-sm">
            <i className="fa-solid fa-shield-halved text-sm"></i>
            <span>HIPAA Notice of Privacy Practices & Massachusetts 201 CMR 17.00</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-5">
            Privacy Policy & Health Information Notice
          </h1>

          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Your dignity, health records, and family confidentiality are sacred to us. Learn how Akirapa Home Care protects your Protected Health Information (PHI) and digital data across our care services and AkiVault™ platform.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-clock-rotate-left text-[#40ddd3]"></i>
              Effective & Last Updated: <strong>{lastUpdated}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-location-dot text-[#40ddd3]"></i>
              Burlington, Massachusetts
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-file-shield text-[#40ddd3]"></i>
              Strict Non-Selling Guarantee
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
                  <i className="fa-solid fa-list-ul text-[#76248a]"></i>
                  Table of Contents
                </h2>

                <nav className="space-y-1 text-sm font-semibold">
                  {[
                    { id: "commitment", title: "1. Our Commitment & Scope" },
                    { id: "information-collected", title: "2. Information We Collect" },
                    { id: "akivault-evv", title: "3. AkiVault™ & EVV Location Data" },
                    { id: "how-we-use", title: "4. How We Use Information" },
                    { id: "hipaa-notice", title: "5. HIPAA & PHI Disclosures (TPO)" },
                    { id: "client-rights", title: "6. Your Health Privacy Rights" },
                    { id: "security-measures", title: "7. Massachusetts Data Safeguards" },
                    { id: "communications-tcpa", title: "8. Communications & SMS Policy" },
                    { id: "retention", title: "9. Medical Records Retention" },
                    { id: "contact-officer", title: "10. Privacy Officer Contact" },
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
                    to="/terms"
                    className="flex items-center justify-between text-xs font-bold text-[#76248a] hover:underline"
                  >
                    <span>View Terms of Service</span>
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

              {/* Need Immediate Help Card */}
              <div className="bg-[#76248a] text-white rounded-2xl p-6 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#40ddd3] mb-3">
                  <i className="fa-solid fa-phone-volume text-lg"></i>
                </div>
                <h3 className="font-extrabold text-base mb-1">Questions on Your Privacy?</h3>
                <p className="text-white/80 text-xs mb-4 leading-relaxed">
                  Our Burlington Compliance & Privacy Officer is here to address any questions regarding health information confidentiality.
                </p>
                <a
                  href="tel:+17812269910"
                  className="block w-full py-2.5 px-4 bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-black text-xs text-center rounded-xl transition-all"
                >
                  Call +1 781-226-9910
                </a>
              </div>
            </aside>

            {/* Right Document Content */}
            <main className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-gray-200 text-gray-800 space-y-12">
              
              {/* Important Legal Callout */}
              <div className="bg-[#76248a]/5 border-l-4 border-[#76248a] p-5 rounded-r-2xl">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-exclamation text-[#76248a] text-lg mt-0.5"></i>
                  <div className="text-xs sm:text-sm leading-relaxed text-gray-700">
                    <strong className="text-[#76248a] block font-bold mb-1">
                      THIS NOTICE DESCRIBES HOW MEDICAL AND PERSONAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION.
                    </strong>
                    Please review this document carefully. Under the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and Massachusetts General Laws (including 201 CMR 17.00), you have substantial rights regarding your Protected Health Information (PHI).
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <section id="commitment" className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">01</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Our Commitment & Scope of This Policy
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Akirapa Home Care Inc. (&quot;Akirapa&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates headquartered at <strong>281 Cambridge Street, Burlington, MA 01803</strong>. We provide licensed, professional in-home supportive care, companion care, personal care assistance (Activities of Daily Living), respite care, hospital-to-home recovery, and specialized Alzheimer&apos;s/dementia care to seniors and families across the Commonwealth of Massachusetts.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  This Privacy Policy applies to all individuals who interact with us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-gray-600">
                  <li><strong>Clients and Care Recipients</strong> receiving supportive or personal care in their homes.</li>
                  <li><strong>Family Members, Legal Guardians, and Health Care Proxies</strong> coordinating care.</li>
                  <li><strong>Caregiver and Nursing Job Applicants</strong> submitting employment applications.</li>
                  <li><strong>Visitors and Users</strong> of our website (<a href="https://akirapahomecareus.com" className="text-[#76248a] font-semibold underline">akirapahomecareus.com</a>) and our proprietary <strong>AkiVault™</strong> Electronic Visit Verification (EVV) portal.</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section id="information-collected" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">02</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Information We Collect
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  To provide compassionate, clinically safe, and highly personalized in-home care, we collect specific categories of personal and health data:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                    <h3 className="font-extrabold text-sm text-[#76248a] flex items-center gap-2">
                      <i className="fa-solid fa-notes-medical"></i>
                      Health & Clinical Information (PHI)
                    </h3>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1 list-disc pl-4">
                      <li>Activities of Daily Living (ADL) assessments</li>
                      <li>Mobility, transfer, and fall-risk evaluations</li>
                      <li>Dietary preferences and swallowing guidelines</li>
                      <li>Medication reminder schedules and logs</li>
                      <li>Cognitive health notes (dementia/memory care)</li>
                      <li>Primary physician and hospice/home health contacts</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                    <h3 className="font-extrabold text-sm text-[#76248a] flex items-center gap-2">
                      <i className="fa-solid fa-id-card"></i>
                      Identifying & Family Contact Data
                    </h3>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1 list-disc pl-4">
                      <li>Full legal names, physical addresses, and zip codes</li>
                      <li>Telephone numbers, cell numbers, and email addresses</li>
                      <li>Designated emergency contacts and relationship</li>
                      <li>Legal Healthcare Proxy & Power of Attorney documents</li>
                      <li>Billing addresses, payment methods, and LTCI policies</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                    <h3 className="font-extrabold text-sm text-[#76248a] flex items-center gap-2">
                      <i className="fa-solid fa-user-nurse"></i>
                      Caregiver Applicant Credentials
                    </h3>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1 list-disc pl-4">
                      <li>Resumes, employment histories, and reference letters</li>
                      <li>CNA, HHA, LPN, or RN license numbers & renewals</li>
                      <li>CORI/SORI criminal background check consents</li>
                      <li>CPR/First Aid certifications & TB test documentation</li>
                      <li>Valid Massachusetts driver&apos;s license and auto insurance</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                    <h3 className="font-extrabold text-sm text-[#76248a] flex items-center gap-2">
                      <i className="fa-solid fa-globe"></i>
                      Website & Technical Usage Data
                    </h3>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1 list-disc pl-4">
                      <li>IP addresses and generalized browser metadata</li>
                      <li>Page browsing actions, timestamps, and referral URLs</li>
                      <li>Essential session and cookie tokens</li>
                      <li>Care Quote Calculator parameters and estimate inputs</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="akivault-evv" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">03</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    AkiVault™ System & Electronic Visit Verification (EVV)
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  To protect vulnerable seniors, satisfy Massachusetts Executive Office of Elder Affairs (EOEA) standards, and guarantee accountability to families, Akirapa utilizes <strong>AkiVault™</strong>.
                </p>
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 space-y-3">
                  <h3 className="font-black text-sm text-teal-950 flex items-center gap-2">
                    <i className="fa-solid fa-location-crosshairs text-teal-700"></i>
                    What AkiVault™ Captures & How It Is Handled
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-900 leading-relaxed">
                    AkiVault™ records caregiver clock-in and clock-out timestamps alongside geofenced GPS coordinates. 
                    <strong> This verification confirms the assigned caregiver has physically arrived at the client&apos;s residence</strong>. 
                    Shift notes, 8-point welfare check responses (appetite, hydration, mobility, mood), and completed ADL checklists are securely synchronized into an encrypted cloud vault.
                  </p>
                  <p className="text-xs text-teal-800">
                    • Caregiver GPS is only tracked at points of arrival and departure (no continuous passive tracking).<br />
                    • Family portal accounts are restricted via two-factor authentication and role-based permissions.<br />
                    • All EVV data is encrypted in transit (TLS 1.3) and at rest (AES-256).
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section id="how-we-use" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">04</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    How We Use Your Information
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We use your personal and medical information solely for legitimate healthcare, operational, and regulatory objectives:
                </p>
                <ul className="space-y-2.5 text-sm sm:text-base text-gray-600">
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-[#76248a] mt-1 shrink-0"></i>
                    <span><strong>Formulating Individualized Care Plans:</strong> Matching appropriate certified caregivers based on language, personality, physical assistance needs, and specialized dementia experience.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-[#76248a] mt-1 shrink-0"></i>
                    <span><strong>Supervisory Nursing Oversight:</strong> Conducting periodic in-home evaluations by Registered Nurses to adjust care intensity and track health trajectory.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-[#76248a] mt-1 shrink-0"></i>
                    <span><strong>Emergency Response:</strong> Communicating vital baseline medical conditions to EMTs, 911 dispatchers, or emergency departments when an acute incident occurs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-[#76248a] mt-1 shrink-0"></i>
                    <span><strong>Billing & Insurance Processing:</strong> Invoicing private accounts and generating standardized shift timesheet documentation for Long-Term Care Insurance (LTCI) carriers.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-[#76248a] mt-1 shrink-0"></i>
                    <span><strong>Quality Assurance:</strong> Reviewing shift notes and welfare indicators to prevent readmissions and detect subtle declines early.</span>
                  </li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="hipaa-notice" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">05</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    HIPAA Notice of Privacy Practices: Treatment, Payment & Operations
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Under HIPAA, Akirapa Home Care may use and disclose your Protected Health Information (PHI) without your written authorization for three primary purposes:
                </p>

                <div className="space-y-3 pt-1">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">1. For Treatment & Care Coordination</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      We share relevant care details with our assigned CNAs, HHAs, supervising RNs, and upon request with your treating primary care physicians, physical therapists, hospice nurses, or hospital discharge coordinators.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">2. For Payment & Insurance Reimbursement</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      We may disclose necessary care documentation and verified timesheets to your Long-Term Care Insurance carrier, third-party payer, or financial guardian to secure payment for delivered services.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">3. For Healthcare Operations</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      We use health data internally to assess caregiver competency, perform clinical audits, improve training protocols, and maintain compliance with Massachusetts licensing bodies.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4 text-xs sm:text-sm text-amber-900 space-y-2">
                  <strong className="block font-bold">Special Legal Disclosures Allowed or Mandated by Law:</strong>
                  <p>
                    We may disclose PHI without consent when mandated by Massachusetts law: (a) for mandatory reporting of suspected elder abuse, neglect, or financial exploitation to the Massachusetts Executive Office of Elder Affairs; (b) in response to a lawful court order or subpoena; (c) to prevent an imminent and serious threat to health or safety.
                  </p>
                  <p className="font-bold text-amber-950">
                    ★ STRICT PROHIBITION: We will NEVER sell, lease, or rent your personal data, phone numbers, or health information to marketing firms, pharmaceutical companies, or third-party advertisers.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="client-rights" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">06</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Your Rights Regarding Your Health Information
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Under federal HIPAA regulations and Massachusetts law, you and your legally authorized representative hold explicit rights:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Right to Inspect & Copy</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      You have the right to inspect and obtain an electronic or paper copy of your care records and billing statements within 30 days of written request.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Right to Request Amendments</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      If you believe information in your care record is incorrect or incomplete, you may submit a written amendment request explaining the rationale.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Right to Request Restrictions</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      You may request limits on how your PHI is shared with certain family members or third parties. We will make every reasonable effort to honor valid requests.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Right to Confidential Channels</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      You can instruct us to reach you only at a specific telephone number, via email, or via written mail sent to a designated alternate address.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Right to Accounting of Disclosures</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      You have the right to request a formal list of certain disclosures of your PHI made by Akirapa for reasons other than treatment, payment, or operations.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Right to Paper Copy & No Retaliation</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      You may request a paper copy of this policy at any time. Exercising your privacy rights or filing a concern will NEVER compromise your care or prompt retaliation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section id="security-measures" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">07</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Massachusetts Data Security Standards (201 CMR 17.00)
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Massachusetts has enacted the nation&apos;s strictest data protection regulations (201 CMR 17.00). Akirapa maintains a comprehensive Written Information Security Program (WISP) incorporating:
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-lock text-[#76248a] mt-0.5"></i>
                    <span><strong>Advanced Encryption:</strong> AES-256 bit encryption on stored client databases and TLS 1.3 high-grade SSL encryption for all web transmission.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-user-shield text-[#76248a] mt-0.5"></i>
                    <span><strong>Role-Based Access:</strong> Only care managers and assigned caregivers assigned to a case have access to specific client health profiles.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-file-contract text-[#76248a] mt-0.5"></i>
                    <span><strong>Business Associate Agreements (BAAs):</strong> Every software vendor, cloud host, and electronic communication system executes a legally binding BAA under HIPAA.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-building-shield text-[#76248a] mt-0.5"></i>
                    <span><strong>Physical Office Security:</strong> Locked physical file cabinets, clean-desk policies, and alarm-monitored office premises at 281 Cambridge Street, Burlington.</span>
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section id="communications-tcpa" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">08</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Communications & SMS Policy (TCPA Compliance)
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  When you submit your phone number via our free assessment request form, quote calculator, or career portal, you provide explicit consent to be contacted by Akirapa Home Care:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <li>Care coordination calls, care quote confirmations, and shift arrival notices.</li>
                  <li>Job applicant interview confirmations and onboarding steps for caregivers.</li>
                  <li>Emergency care updates regarding your family member.</li>
                </ul>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  You may opt out of non-emergency text notifications at any time by replying <strong>STOP</strong>. For assistance, reply <strong>HELP</strong> or contact our Burlington office at <strong>+1 781-226-9910</strong>.
                </p>
              </section>

              {/* Section 9 */}
              <section id="retention" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">09</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Medical Records Retention & Disposal
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  In compliance with Massachusetts healthcare record guidelines (M.G.L. c. 111, § 70), Akirapa retains client health and care records for a minimum of <strong>seven (7) years</strong> following the date of service completion (or longer where required by applicable regulations).
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Upon the expiration of the statutory retention period, physical records are cross-shredded by certified destruction services, and digital records are purged using cryptographic erasure.
                </p>
              </section>

              {/* Section 10 */}
              <section id="contact-officer" className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">10</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Privacy Officer Contact & Formal Complaints
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  If you have questions about this Notice of Privacy Practices, wish to exercise any of your privacy rights, or believe your privacy rights have been violated, please contact our Privacy Officer immediately:
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-3 text-sm">
                  <h3 className="font-extrabold text-[#76248a] text-base">Akirapa Home Care Inc. — Privacy & Compliance Division</h3>
                  <div className="space-y-1.5 text-gray-700">
                    <p><i className="fa-solid fa-user-shield text-[#76248a] w-5"></i> <strong>Attn:</strong> Privacy & Compliance Officer</p>
                    <p><i className="fa-solid fa-location-dot text-[#76248a] w-5"></i> <strong>Address:</strong> 281 Cambridge Street, Burlington, MA 01803</p>
                    <p><i className="fa-solid fa-phone text-[#76248a] w-5"></i> <strong>24/7 Telephone:</strong> <a href="tel:+17812269910" className="text-[#76248a] font-bold hover:underline">+1 781-226-9910</a></p>
                    <p><i className="fa-solid fa-envelope text-[#76248a] w-5"></i> <strong>Email:</strong> <a href="mailto:info@akirapahomecareus.com" className="text-[#76248a] font-bold hover:underline">info@akirapahomecareus.com</a></p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm text-blue-950 space-y-2">
                  <strong className="block font-bold">Filing a Federal Complaint with HHS:</strong>
                  <p>
                    You also have the right to lodge a formal complaint with the Secretary of the U.S. Department of Health and Human Services (HHS) Office for Civil Rights:
                  </p>
                  <p className="font-mono text-xs">
                    Region I - Boston Office (Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont)<br />
                    Office for Civil Rights, U.S. Department of Health and Human Services<br />
                    Government Center, J.F.K. Federal Building - Room 1875, Boston, MA 02203<br />
                    Customer Response Center: (800) 368-1019 | TDD: (800) 537-7697
                  </p>
                  <p className="font-semibold text-blue-900">
                    Akirapa will not penalize or retaliate against you in any manner for filing a complaint.
                  </p>
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
                    to="/terms"
                    className="text-[#76248a] hover:text-[#561868] underline"
                  >
                    Terms of Service →
                  </Link>
                  <Link
                    to="/consumer-rights"
                    className="text-[#76248a] hover:text-[#561868] underline"
                  >
                    Client Bill of Rights →
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

export default PrivacyPolicy;
