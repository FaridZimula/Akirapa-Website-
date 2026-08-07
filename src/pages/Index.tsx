import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { careServices } from "@/data/careServices";
import { testimonials } from "@/data/testimonials";
import { leaders } from "@/data/leadership";
import { CareQuoteCalculator } from "@/components/CareQuoteCalculator";

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Akirapa Home Care | In-Home Senior Care & 24/7 Services"
        description="Compassionate in-home senior care in Burlington, MA. Hourly care, 24/7 daily care, hospital to home recovery, respite care, and specialized Alzheimer's support. Care Your Way."
      />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-32 lg:pb-12 lg:h-[680px] lg:min-h-[680px] flex items-center bg-[#76248a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1600"
            alt="Akirapa Senior Home Care"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-left">
              Would you rather stay at home than go into a health care facility?
            </h1>

            <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed max-w-2xl text-left">
              We will come to your convenient location. Akirapa Home Care provides flexible, compassionate, and professional in-home care tailored around your daily routine.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-center pt-4">
              <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-[#76248a] font-extrabold text-lg h-14 px-8 rounded-2xl shadow-xl">
                <Link to="/contact">Schedule Free Assessment</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 font-bold text-lg h-14 px-8 rounded-2xl">
                <Link to="/services">Explore Care Programs</Link>
              </Button>
            </div>

            <div className="pt-6 border-t border-white/20 flex flex-wrap justify-start gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#40ddd3]"></i>
                <span>Licensed & Background Checked</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#40ddd3]"></i>
                <span>24/7 Helpline Assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#40ddd3]"></i>
                <span>Burlington, MA Headquarters</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High Impact Helpline Callout Banner */}
      <section className="bg-gray-50/80 pt-6 pb-4">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-6 -mt-14 sm:-mt-16 relative z-20">
            <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
              <div className="w-16 h-16 rounded-2xl bg-[#76248a] text-white flex items-center justify-center shrink-0 shadow-md">
                <i className="fa-solid fa-phone-volume text-2xl text-white"></i>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="bg-[#76248a] text-white text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full">24/7 Helpline</span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">Need Care Right Away?</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Speak directly with our senior care coordinator in Burlington, MA.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
              <a
                href="tel:3399701214"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#76248a] hover:bg-[#561868] text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition-all text-base"
              >
                <i className="fa-solid fa-phone text-lg text-[#40ddd3]"></i>
                <div className="text-left">
                  <span className="text-[10px] text-white/70 block uppercase leading-none">Main Hotline</span>
                  <span className="text-lg font-black text-[#40ddd3]">339 970 1214</span>
                </div>
              </a>

              <Button asChild size="lg" className="w-full sm:w-auto bg-[#40ddd3] hover:bg-[#34c4ba] text-[#76248a] font-extrabold text-base h-14 px-6 rounded-2xl shadow-md">
                <Link to="/contact">Request Immediate Callback</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section-padding bg-gray-50/80">
        <div className="container-narrow mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Our Core Home Care Services
            </h2>
            <p className="text-gray-600 text-lg">
              Designed to help seniors live safely, independently, and comfortably at home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#76248a] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <i className={`${service.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#76248a] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#76248a] font-semibold text-xs uppercase tracking-normal">
                    {service.tagline}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 pt-2">
                    {service.features.slice(0, 3).map((f, idx) => (
                      <li key={idx} className="text-xs font-medium text-gray-700 flex items-center gap-2">
                        <span className="text-[#40ddd3] font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-[#76248a] font-bold text-sm hover:text-[#561868] transition-colors"
                  >
                    <span>Learn More</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </Link>
                </div>
              </div>
            ))}

            {/* Quick Consultation Highlight Card */}
            <div className="bg-[#76248a] text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between border border-[#40ddd3]/30">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#40ddd3] text-[#76248a] flex items-center justify-center shadow-md">
                  <i className="fa-solid fa-award text-2xl text-[#76248a]"></i>
                </div>
                <h3 className="text-2xl font-black text-white">
                  Not Sure Which Care Plan Fits Best?
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Our licensed care managers in Burlington MA offer free, no-obligation in-home assessments to help you evaluate daily needs.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/20">
                <Button asChild className="w-full bg-[#40ddd3] hover:bg-[#34c4ba] text-[#76248a] font-bold h-12 rounded-xl text-base">
                  <Link to="/contact">Schedule Free Consultation</Link>
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

      {/* Founders & About Story Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Image / Founders */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1581579438747-1dc8d1e05842?auto=format&fit=crop&q=80&w=800"
                    alt="Cathy Akirapa & Stuart Ssemwogerere"
                    className="w-full h-[420px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#76248a] text-white p-6 rounded-2xl shadow-xl border border-[#40ddd3]/30 hidden sm:block max-w-xs">
                  <p className="text-2xl font-black text-[#40ddd3]">10+ Years</p>
                  <p className="text-xs text-white/90 font-medium">Of Compassionate Senior Care Excellence (Est. 2013)</p>
                </div>
              </div>
            </div>

            {/* Right Story */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                Founded on Personal Compassion & Dedicated Care
              </h2>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Akirapa Home Care was founded in 2013 by <strong>Cathy Akirapa</strong> (CNA & Financial Professional) alongside <strong>Stuart Ssemwogerere</strong> (Executive Director) with a singular mission: to ensure seniors can live comfortably and safely in their own homes.
              </p>

              <p className="text-gray-600 text-base leading-relaxed">
                Incorporated in 2015 and expanding regional healthcare partnerships in 2017, Akirapa Home Care has grown into a trusted home health care provider across Burlington, MA, and surrounding communities.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
                  <h4 className="font-bold text-[#76248a]">Cathy Akirapa</h4>
                  <p className="text-xs text-gray-600">Founder, CNA & Financial Professional</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
                  <h4 className="font-bold text-[#76248a]">Stuart Ssemwogerere</h4>
                  <p className="text-xs text-gray-600">Co-Founder & Executive Director</p>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild size="lg" className="bg-[#76248a] hover:bg-[#561868] text-white font-bold rounded-2xl">
                  <Link to="/about">Read Our Full Journey</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              What Families Say About Akirapa Home Care
            </h2>
            <p className="text-gray-600 text-lg">
              Trusted by families across Massachusetts and nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {testimonials.slice(0, 4).map((item) => (
              <div key={item.id} className="bg-gray-50/80 rounded-3xl p-6 border border-gray-100 space-y-4 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-sm"></i>
                    ))}
                  </div>
                  <p className="text-gray-700 italic text-sm leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-gray-900">{item.author}</p>
                    <p className="text-xs text-gray-500">{item.relation} • {item.location}</p>
                  </div>
                  {item.date && <span className="text-xs text-gray-400 shrink-0 ml-1">{item.date}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 24/7 Helpline Bottom Banner */}
      <section className="py-16 bg-[#76248a] text-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to Begin Your Home Care Journey?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Call our 24/7 helpline today or request a free, contract-free in-home assessment in Burlington, MA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <a
              href="tel:3399701214"
              className="inline-flex items-center gap-3 bg-[#40ddd3] hover:bg-[#34c4ba] text-[#76248a] font-extrabold text-xl px-8 py-4 rounded-2xl shadow-xl transition-all"
            >
              <i className="fa-solid fa-phone text-xl"></i>
              <span>Call 339 970 1214</span>
            </a>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-bold text-lg h-14 px-8 rounded-2xl">
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
