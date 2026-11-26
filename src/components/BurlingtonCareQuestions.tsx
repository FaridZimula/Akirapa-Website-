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
        return "Specialized Alzheimer's & dementia memory care in Burlington includes dedicated cognitive engagement and wandering safety support.";
      case "post-hospital":
        return "Post-hospital recovery in Burlington (such as discharge from Lahey Hospital or Winchester Hospital) focuses on safe mobility transfers and medication adherence.";
      case "24-hour":
        return "24-hour around-the-clock care in Burlington provides rotating awake CNAs or dedicated live-in care arrangements.";
      default:
        return "Standard hourly care across Burlington and Middlesex County is tailored to your loved one's daily care acuity.";
    }
  };

  const questions = [
    {
      id: "care-planning",
      badge: "Personalized Care",
      icon: "fa-solid fa-clipboard-list",
      question: "How is home care tailored in Burlington?",
      shortQuote: "Every care plan in Burlington, MA is customized around your loved one's health needs and delivered by licensed Certified Nursing Assistants (CNAs).",
      detailedAnswer: (
        <div className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p>
            In Burlington and surrounding Middlesex County communities, our clinical team designs individualized care plans matched with <strong className="text-gray-900 font-bold">certified nursing assistants (CNAs)</strong>.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 bg-purple-50/60 p-3 rounded-xl border border-[#76248a]/10">
            <strong className="text-[#76248a]">How plans adapt:</strong> {getConditionContext()} Companion care focuses on daily engagement and meals, while personal or memory care adds hands-on clinical support. Akirapa Home Care keeps onboarding simple with <strong className="text-gray-900">zero long-term lock-in and complimentary in-home assessments</strong>.
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
              You only sign a simple service agreement outlining agreed hours and personalized care tasks. We understand that senior health conditions change unexpectedly. You are never locked into a 30-, 60-, or 90-day commitment. If your loved one is hospitalized, goes on vacation, or transitions care, you can <strong className="text-gray-900">pause, adjust, or cancel with 24 to 48 hours notice</strong>.
            </p>
          </div>
        ),
      },
      {
        id: "coverage",
        badge: "Care Coordination",
        icon: "fa-solid fa-shield-heart",
        question: "What care programs and benefits are supported?",
        shortQuote: "Our care coordinates seamlessly alongside Long-Term Care Insurance (LTCI), Veterans Aid & Attendance, and family care plans.",
        detailedAnswer: (
          <div className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-gray-900 font-bold">Non-medical in-home care</strong> — including bathing, dressing, meal preparation, and 24/7 companionship — complements short-term skilled clinical recovery.
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              While traditional Medicare focuses on short-term, doctor-ordered clinical visits, <strong className="text-gray-900">our care works with Long-Term Care Insurance (LTCI)</strong> and <strong className="text-gray-900">Veterans Aid & Attendance support</strong>. We provide complete itemized documentation and shift records for your care team.
            </p>
          </div>
        ),
      },
  ];

  return (
    <section className={`py-12 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            Key Questions Every Family Asks in Burlington
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            When you need care for a parent, you need straight answers, not sales talk. Here is exactly how care plans, contracts, hours, and support work at Akirapa Home Care.
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
            <i className="fa-solid fa-shield-halved text-[#40ddd3]"></i>
            <span>Need more detail on our caregiver standards?</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/standards"
              className="font-bold text-[#76248a] hover:underline flex items-center gap-1"
            >
              <span>Review Our Care Standards</span>
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
