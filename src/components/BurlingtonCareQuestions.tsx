import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface BurlingtonCareQuestionsProps {
  className?: string;
  conditionFocus?: "general" | "dementia" | "post-hospital" | "24-hour";
}

export const BurlingtonCareQuestions: React.FC<BurlingtonCareQuestionsProps> = ({
  className = "",
  conditionFocus = "general",
}) => {
  const getConditionContext = () => {
    switch (conditionFocus) {
      case "dementia":
        return "Specialized Alzheimer's & dementia memory care in Burlington typically falls in the $38 - $44/hr range due to specialized cognitive engagement training.";
      case "post-hospital":
        return "Post-hospital recovery in Burlington (such as discharge from Lahey Hospital or Winchester Hospital) typically ranges from $36 - $42/hr for surgical transfer and medication adherence support.";
      case "24-hour":
        return "24-hour around-the-clock care in Burlington ranges from $800 - $960 per 24-hr cycle for rotating awake CNAs, or $450 - $550/day for live-in care arrangements.";
      default:
        return "Standard hourly care across Burlington and Middlesex County ranges from $36 to $44 per hour depending on care acuity.";
    }
  };

  const questions = [
    {
      id: "cost",
      badge: "Cost & Transparency",
      icon: "fa-solid fa-dollar-sign",
      question: "What does home care cost in Burlington?",
      shortQuote: "Home care in Burlington, MA costs between $36 and $44 per hour for licensed Certified Nursing Assistants (CNAs).",
      detailedAnswer: (
        <div className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p>
            In Burlington and surrounding Middlesex County communities, private-duty home care by certified nursing assistants typically ranges between <strong className="text-gray-900 font-bold">$36 and $44 per hour</strong>.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 bg-purple-50/60 p-3 rounded-xl border border-[#76248a]/10">
            <strong className="text-[#76248a]">Why rates vary:</strong> {getConditionContext()} Companion care sits at the lower end, while intensive hands-on transfers or advanced memory care sits toward $42–$44/hr. Akirapa Home Care has <strong className="text-gray-900">zero hidden intake fees, zero assessment charges, and zero weekend surge fees</strong>.
          </p>
        </div>
      ),
    },
    {
      id: "minimum-hours",
      badge: "Scheduling Policy",
      icon: "fa-solid fa-clock",
      question: "Is there a minimum number of hours?",
      shortQuote: "Yes, Akirapa Home Care requires a 4-hour minimum per visit to ensure consistent, highly qualified CNAs.",
      detailedAnswer: (
        <div className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p>
            Yes. Our standard scheduling minimum is <strong className="text-gray-900 font-bold">4 hours per visit</strong>.
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            A 4-hour block is the industry gold standard because it allows us to attract, retain, and fairly compensate certified CNAs rather than transient casual workers. It also gives the caregiver enough time to accomplish meaningful personal hygiene, nutritious meal prep, mobility exercises, medication management, and companion engagement without rushing.
          </p>
        </div>
      ),
    },
    {
      id: "contract",
      badge: "Freedom & Flexibility",
      icon: "fa-solid fa-file-signature",
      question: "Do I have to sign a long-term contract?",
      shortQuote: "No long-term contracts. Families can adjust, pause, or cancel care at any time with 24 to 48 hours advance notice.",
      detailedAnswer: (
        <div className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p className="text-base sm:text-lg font-bold text-[#76248a]">
            No long-term contracts.
          </p>
          <p>
            You only sign a simple service agreement outlining agreed hours, care tasks, and hourly rates. We understand that senior health conditions change unexpectedly. You are never locked into a 30-, 60-, or 90-day commitment. If your loved one is hospitalized, goes on vacation, or transitions care, you can <strong className="text-gray-900">pause, adjust, or cancel with 24 to 48 hours notice</strong> without cancellation penalties.
          </p>
        </div>
      ),
    },
    {
      id: "medicare",
      badge: "Insurance & Coverage",
      icon: "fa-solid fa-shield-heart",
      question: "Does Medicare pay for home care?",
      shortQuote: "Traditional Medicare does not pay for non-medical personal home care or 24/7 companionship.",
      detailedAnswer: (
        <div className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p>
            <strong className="text-gray-900 font-bold">Traditional Medicare does not cover non-medical in-home care</strong>, such as assistance with bathing, dressing, meal preparation, or 24/7 companionship.
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            Medicare only covers short-term, intermittent skilled nursing or physical therapy ordered by a doctor following a qualifying hospital stay. However, <strong className="text-gray-900">our care is covered by Long-Term Care Insurance (LTCI)</strong>, <strong className="text-gray-900">Veterans Aid & Attendance benefits</strong> (which can provide up to $2,431+/month for eligible veterans or surviving spouses), Health Savings Accounts (HSA/FSA), and private pay. We provide complete itemized documentation for direct insurer reimbursement.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className={`py-12 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-[#76248a]/10 text-[#76248a] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <i className="fa-solid fa-circle-question text-[#40ddd3]"></i>
            Plain-Language Answers
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            Key Questions Every Family Asks in Burlington
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            When you need care for a parent, you need straight answers—not sales talk. Here is exactly how pricing, contracts, hours, and coverage work at Akirapa Home Care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questions.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200/70 hover:border-[#76248a]/30 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#76248a] flex items-center gap-1.5">
                    <i className={`${item.icon} text-sm text-[#40ddd3]`}></i>
                    {item.badge}
                  </span>
                  <Badge variant="outline" className="border-gray-200 text-[11px] font-semibold text-gray-500">
                    Plain-Language Fact
                  </Badge>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {item.question}
                </h3>
                {/* Quotable summary block for AI and quick scanning */}
                <div className="bg-white p-3 rounded-xl border-l-4 border-[#40ddd3] shadow-2xs mb-3 text-xs sm:text-sm font-semibold text-gray-900">
                  "{item.shortQuote}"
                </div>
                {item.detailedAnswer}
              </div>
            </div>
          ))}
        </div>

        {/* Helpful links bar */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shield-check text-[#40ddd3]"></i>
            <span>Need more detail on caregiver standards & rates?</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/pricing"
              className="font-bold text-[#76248a] hover:underline flex items-center gap-1"
            >
              <span>See Full Pricing Guide</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/questions-to-ask-a-home-care-agency"
              className="font-bold text-[#76248a] hover:underline flex items-center gap-1"
            >
              <span>10 Questions to Ask Any Agency</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
