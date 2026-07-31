import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { careServices, CareService } from "@/data/careServices";
import { CareQuoteCalculator } from "@/components/CareQuoteCalculator";
import { Clock, ShieldCheck, Activity, HeartHandshake, Brain, CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Clock": return Clock;
    case "ShieldCheck": return ShieldCheck;
    case "Activity": return Activity;
    case "HeartHandshake": return HeartHandshake;
    case "Brain": return Brain;
    default: return ShieldCheck;
  }
};

const Projects = () => {
  const [selectedService, setSelectedService] = useState<CareService>(careServices[0]);

  return (
    <Layout>
      <SEO
        title="Our Care Services | Akirapa Home Care Burlington MA"
        description="Explore in-home care services by Akirapa Home Care: Hourly care, 24/7 daily care, hospital-to-home recovery, contract-free respite care, and specialized Alzheimer's support."
      />

      {/* Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-[#76248a] via-[#561868] to-[#40ddd3] text-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#40ddd3] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Tailored Care Programs • Contract-Free
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            In-Home Care Services Designed for You
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-medium">
            From flexible hourly visits to 24/7 around-the-clock specialized care, we come to your convenient location in Burlington, MA and surrounding areas.
          </p>
        </div>
      </section>

      {/* Service Filter Tabs & Details */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto">
          {/* Service Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {careServices.map((service) => {
              const Icon = getIconComponent(service.icon);
              const isSelected = selectedService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#76248a] text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-[#40ddd3]/20 border border-gray-200"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-[#40ddd3]" : "text-[#76248a]"}`} />
                  <span>{service.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Service Showcase */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#76248a] text-[#40ddd3] flex items-center justify-center shadow-md">
                  {(() => {
                    const Icon = getIconComponent(selectedService.icon);
                    return <Icon className="w-7 h-7" />;
                  })()}
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#76248a]">
                    {selectedService.tagline}
                  </span>
                  <h2 className="text-3xl font-black text-gray-900">{selectedService.title}</h2>
                </div>
              </div>

              <p className="text-gray-700 text-base leading-relaxed">
                {selectedService.detailedDescription}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-gray-900 text-base">Key Program Features:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 text-[#76248a] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-[#76248a] to-[#561868] text-white p-8 rounded-3xl space-y-6 shadow-lg border border-[#40ddd3]/30">
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
                  Ready to design a customized plan for {selectedService.title.toLowerCase()}?
                </p>
                <Button asChild className="w-full bg-[#40ddd3] hover:bg-[#34c4ba] text-[#76248a] font-bold text-base h-12">
                  <Link to="/contact">{selectedService.callToAction}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Calculator Section */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <CareQuoteCalculator />
        </div>
      </section>

      {/* 24/7 Helpline Banner */}
      <section className="py-16 bg-[#76248a] text-white border-t-4 border-[#40ddd3]">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black">
            Have Questions About Care Options in Burlington, MA?
          </h3>
          <p className="text-white/80 max-w-xl mx-auto text-base">
            Call our 24/7 Helpline at <a href="tel:3399701214" className="font-bold text-[#40ddd3] hover:underline">339 970 1214</a> or <a href="tel:7814729375" className="font-bold text-[#40ddd3] hover:underline">781 472 9375</a> to speak with a senior care specialist.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
