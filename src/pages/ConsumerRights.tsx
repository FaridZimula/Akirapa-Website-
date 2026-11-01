import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

const ConsumerRights = () => {
  return (
    <Layout>
      <SEO
        title="Massachusetts Home Care Client Bill of Rights & Consumer Protections | Akirapa"
        description="Review the Akirapa Home Care Client Bill of Rights and Massachusetts Executive Office of Elder Affairs (EOEA) consumer protections, grievance procedures, and non-discrimination notice."
        keywords="Massachusetts home care bill of rights, elder consumer rights MA, Akirapa client protections, EOEA home care standards, Burlington MA senior rights"
        path="/consumer-rights"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Consumer Rights & Client Bill of Rights", path: "/consumer-rights" },
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
            <i className="fa-solid fa-award text-sm"></i>
            <span>Massachusetts Executive Office of Elder Affairs (EOEA) Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-5">
            Client Bill of Rights & Consumer Protections
          </h1>

          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Every senior and client receiving care from Akirapa Home Care is entitled to compassionate, dignified, and legally protected care in their home.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-hand-holding-heart text-[#40ddd3]"></i>
              Dignity, Autonomy & Respect Guaranteed
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-gavel text-[#40ddd3]"></i>
              Section 1557 ACA Non-Discrimination
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-gray-200 text-gray-800 space-y-10">
            
            {/* Introductory Statement */}
            <div className="border-b border-gray-100 pb-6 space-y-3">
              <h2 className="text-2xl font-black text-gray-900">
                Our Guarantee to Every Senior & Family in Massachusetts
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                At Akirapa Home Care, we believe quality home care is founded on trust, transparency, and unyielding respect for individual dignity. As a client or family representative, you possess specific consumer rights guaranteed under Massachusetts law and our company code of ethics.
              </p>
            </div>

            {/* 10 Core Rights */}
            <div className="space-y-6">
              <h3 className="text-lg font-black text-[#76248a] uppercase tracking-wider text-xs">
                The 10 Core Client Rights
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    num: "01",
                    title: "Right to Respect & Human Dignity",
                    desc: "To be treated with courtesy, kindness, and uncompromised respect for your personal property, privacy, culture, and lifestyle at all times.",
                  },
                  {
                    num: "02",
                    title: "Right to Active Care Participation",
                    desc: "To actively participate in the creation, evaluation, and revision of your individualized Plan of Care, and to be informed in advance of any schedule changes.",
                  },
                  {
                    num: "03",
                    title: "Right to Choice of Caregiver",
                    desc: "To request a change of assigned caregiver without discomfort or hesitation if personality, skills, or care compatibility does not meet your expectations.",
                  },
                  {
                    num: "04",
                    title: "Right to Confidentiality & Privacy",
                    desc: "To have all medical, personal, and financial records kept strictly confidential pursuant to HIPAA and Massachusetts 201 CMR 17.00 regulations.",
                  },
                  {
                    num: "05",
                    title: "Right to Financial Transparency",
                    desc: "To receive clear, itemized statements of all hourly or daily rates, shift minimums, and billing terms before services commence.",
                  },
                  {
                    num: "06",
                    title: "Right to Freedom from Abuse & Neglect",
                    desc: "To be completely free from physical, mental, emotional, verbal, or financial abuse, exploitation, and involuntary seclusion.",
                  },
                  {
                    num: "07",
                    title: "Right to EVV & Shift Verification",
                    desc: "To access real-time AkiVault™ Electronic Visit Verification logs confirming caregiver arrival and departure times at your residence.",
                  },
                  {
                    num: "08",
                    title: "Right to Refuse Services",
                    desc: "To refuse specific tasks or care recommendations and to be fully advised of the potential health or safety consequences of refusal.",
                  },
                  {
                    num: "09",
                    title: "Right to Voice Grievances Without Reprisal",
                    desc: "To voice complaints, grievances, or concerns without fear of retaliation, penalty, service reduction, or discrimination.",
                  },
                  {
                    num: "10",
                    title: "Right to Continuity & Advance Directives",
                    desc: "To have your Healthcare Proxy, DNR (Do Not Resuscitate), and MOLST (Massachusetts Medical Orders for Life-Sustaining Treatment) directives honored.",
                  },
                ].map((right) => (
                  <div key={right.num} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[#76248a] text-[#40ddd3] font-black text-xs flex items-center justify-center">
                        {right.num}
                      </span>
                      <h4 className="font-extrabold text-sm text-gray-900">{right.title}</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed pl-9">
                      {right.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Grievance & Complaint Resolution Procedure */}
            <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 space-y-4">
              <h3 className="font-extrabold text-base text-teal-950 flex items-center gap-2">
                <i className="fa-solid fa-headset text-teal-700"></i>
                Formal Grievance & Escalation Procedure
              </h3>
              <p className="text-xs sm:text-sm text-teal-900 leading-relaxed">
                If you or your family member ever experience dissatisfaction, safety concerns, or care disputes, we maintain a prompt 3-step escalation protocol:
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-teal-950">
                <p><strong>Step 1 — Immediate Care Coordinator Review:</strong> Call our 24/7 Burlington line at <a href="tel:+17812269910" className="underline font-bold">+1 781-226-9910</a>. Our team is alerted within 60 minutes.</p>
                <p><strong>Step 2 — Supervisory Nurse Investigation:</strong> Our Supervising Registered Nurse conducts an in-person or telephone review within 24 hours.</p>
                <p><strong>Step 3 — Written Resolution Conference:</strong> A formal action plan or caregiver replacement is presented within 48 to 72 hours.</p>
              </div>
            </div>

            {/* External Massachusetts Regulatory Contacts */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-700 flex items-center gap-2">
                <i className="fa-solid fa-landmark text-[#76248a]"></i>
                Massachusetts Elder Advocacy & State Helplines
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                You also have the unrestricted right to contact Massachusetts regulatory bodies directly:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <strong className="block text-gray-900 font-bold mb-0.5">MA Elder Abuse 24/7 Hotline</strong>
                  <span className="text-gray-600">Toll-Free:</span> <a href="tel:18009222275" className="text-[#76248a] font-bold">1-800-922-2275</a>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <strong className="block text-gray-900 font-bold mb-0.5">MA Executive Office of Elder Affairs</strong>
                  <span className="text-gray-600">Information:</span> <a href="tel:18002434636" className="text-[#76248a] font-bold">1-800-243-4636</a>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <strong className="block text-gray-900 font-bold mb-0.5">MA Long-Term Care Ombudsman</strong>
                  <span className="text-gray-600">Advocacy:</span> <a href="tel:16177277750" className="text-[#76248a] font-bold">1-617-727-7750</a>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <strong className="block text-gray-900 font-bold mb-0.5">Minuteman Senior Services (Local ASAP)</strong>
                  <span className="text-gray-600">Burlington & Middlesex:</span> <a href="tel:18882226171" className="text-[#76248a] font-bold">1-888-222-6171</a>
                </div>
              </div>
            </div>

            {/* Non-Discrimination Statement */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs sm:text-sm text-gray-700">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <i className="fa-solid fa-scale-balanced text-[#76248a]"></i>
                Non-Discrimination Policy (Section 1557 ACA)
              </h3>
              <p className="leading-relaxed">
                Akirapa Home Care Inc. complies with applicable Federal civil rights laws and does not discriminate, exclude people, or treat them differently on the basis of race, color, national origin, age, disability, sex, religion, sexual orientation, or gender identity in the provision of care, admission, or employment.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 flex items-center gap-1.5"
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span>Back to Homepage</span>
              </Link>

              <div className="flex items-center gap-4">
                <Link to="/privacy" className="text-[#76248a] hover:text-[#561868] underline">
                  Privacy Policy & HIPAA Notice →
                </Link>
                <Link to="/terms" className="text-[#76248a] hover:text-[#561868] underline">
                  Terms of Service →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ConsumerRights;
