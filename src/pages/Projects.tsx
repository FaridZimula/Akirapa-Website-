import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { careServices, CareService } from "@/data/careServices";
import { CareQuoteCalculator } from "@/components/CareQuoteCalculator";

const Projects = () => {
  const [selectedService, setSelectedService] = useState<CareService>(careServices[0]);

  return (
    <Layout>
      <SEO
        title="Our Care Services | Akirapa Home Care Burlington MA"
        description="Explore in-home care services by Akirapa Home Care: Hourly care, 24/7 daily care, hospital-to-home recovery, contract-free respite care, and specialized Alzheimer's support."
      />

      {/* Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            In-Home Care Services Designed for You
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-medium">
            From flexible hourly visits to 24/7 around-the-clock specialized care, we come to your convenient location in Burlington, MA and surrounding areas.
          </p>
        </div>
      </section>

      {/* Service Selection Tabs & Detail Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto">
          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {careServices.map((service) => {
              const isSelected = selectedService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#76248a] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <i className={`${service.icon} text-base ${isSelected ? "text-[#40ddd3]" : "text-[#76248a]"}`}></i>
                  <span>{service.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Service Showcase Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#76248a] text-white flex items-center justify-center shadow-md">
                  <i className={`${selectedService.icon} text-2xl`}></i>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                    {selectedService.title}
                  </h2>
                  <p className="text-[#76248a] font-bold text-xs uppercase tracking-wider">
                    {selectedService.tagline}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-base leading-relaxed">
                {selectedService.detailedDescription}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-gray-900 text-base">Key Program Features:</h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  {selectedService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <i className="fa-solid fa-circle-check text-[#76248a] text-base shrink-0 mt-0.5"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#76248a] text-white p-8 rounded-3xl space-y-6 shadow-lg border border-[#40ddd3]/30">
              <h3 className="text-xl font-bold text-white">Ideal For:</h3>
              <ul className="space-y-3 text-sm text-white/90">
                {selectedService.idealFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#40ddd3] font-bold">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/20 space-y-3">
                <p className="text-xs text-white/80">
                  Ready to set up {selectedService.title.toLowerCase()} for your family?
                </p>
                <Button asChild size="lg" className="w-full bg-[#40ddd3] hover:bg-[#34c4ba] text-[#76248a] font-extrabold rounded-xl">
                  <Link to="/contact">{selectedService.callToAction}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Care Cost Estimator */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <CareQuoteCalculator />
        </div>
      </section>

      {/* Hotline Assistance Banner */}
      <section className="py-14 bg-gray-900 text-white">
        <div className="container-narrow mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-black text-white">Have Questions About Senior Care Coverage?</h3>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Our Burlington care managers are ready to walk you through options, schedule assessments, and answer questions 24/7.
          </p>
          <div className="pt-2">
            <a
              href="tel:3399701214"
              className="inline-flex items-center gap-2 bg-[#76248a] hover:bg-[#561868] text-white font-bold px-6 py-3 rounded-xl text-lg shadow-md"
            >
              <i className="fa-solid fa-phone text-lg text-[#40ddd3]"></i>
              <span>Call Helpline: 339 970 1214</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
